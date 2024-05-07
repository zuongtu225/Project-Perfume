import React, { useEffect, useState } from "react";
import {
  getApiProducts,
  getCartByUser,
  getDetailUser,
  getOrderApi,
} from "../../../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { useNavigate } from "react-router-dom";
import { IoMdCash } from "react-icons/io";
import { IProduct } from "../../../../Interface";
import { createOrder } from "../../../../Api/order";
import { ToastContainer, toast } from "react-toastify";
import { deleteCart, updateProduct } from "../../../../Api";
import { createOrderItem } from "../../../../Api/orderItem";
import { createAddress } from "../../../../Api/address";
import { BiUser } from "react-icons/bi";
import { FiPhoneCall } from "react-icons/fi";
import { io } from "socket.io-client";
const socket = io("http://localhost:9000");

const Checkout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [total, setTotal] = useState(0);
  const dataProduct = useSelector(
    (state: any) => state?.productReducer?.products
  );
  const carts: any = useSelector((state: any) => state?.cartReducer?.carts);
  const hasErrorQuantity = carts?.some(
    (item: any) => item.quantity > item.productSizeId?.productId?.stock
  );

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    if (carts) {
      for (const item of carts) {
        const product = item?.productSizeId;
        const quantity = item?.quantity;
        if (product) {
          totalPrice += product.productId.price * quantity;
        }
      }
    }
    return totalPrice + 20000;
  };

  const paymentCOD = async () => {
    if (hasErrorQuantity) {
      return toast.error("Sản phẩm không đủ số lượng trong kho");
    }
    const infoAddress = {
      fullName: name,
      phoneNumber: phone,
      address: address,
    };
    if (name == "" || phone == "" || address == "") {
      return toast.error("Vui lòng điền đầy đủ thông tin");
    }
    const resAddress: any = await createAddress(infoAddress);
    const addressId = resAddress?.data?.data.id;
    const code = Number("2" + (Math.random() * 100000000).toFixed(0));
    const date = new Date();
    const deliveryDate = new Date(date.getTime() + 3 * 24 * 60 * 60 * 1000);
    const expectedDelivery = deliveryDate
      .toISOString() // change => định dạng ISO 8601.
      .slice(0, 19)
      .replace("T", " ");
    const newOrder = {
      codeOrder: code,
      paymentId: 1,
      orderDate: date.toISOString().slice(0, 19).replace("T", " "),
      expectedDeliveryDate: expectedDelivery,
      addressId: addressId,
      total,
      status: "Pending",
    };
    const resOrder: any = await createOrder(newOrder);
    if (resOrder?.data?.success === true) {
      const newOrderItems = carts.map((item: any) => ({
        codeOrder: resOrder.data.data.codeOrder,
        quantity: item.quantity,
        productSizeId: item.productSizeId,
        userId: item.userId,
      }));
      const productIds = newOrderItems.map((item: any) => ({
        id: item.productSizeId.productId.id,
      }));
      const quantities = newOrderItems.map((item: any) => ({
        quantity: item.quantity,
      }));
      const orderItem: any = await createOrderItem(newOrderItems);
      if (orderItem?.data?.success === true) {
        socket.emit("renderStockProduct", "");
        await updateStock(productIds, quantities);
        toast.success(resOrder.data.message);
        await deleteCart();
        await dispatch(getCartByUser());
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error(orderItem.data.message);
      }
    } else {
      toast.error(resOrder.data.message);
    }
  };

  const updateStock = async (productIds: IProduct[], quantities: any[]) => {
    for (let i = 0; i < productIds.length; i++) {
      const productId = productIds[i];
      const quantity = quantities[i].quantity;
      const product = dataProduct.find(
        (item: IProduct) => item.id === productId.id
      );
      if (!product) {
        return toast.error("Id sản phẩm không đúng");
      }
      const updateStock = { id: product.id, stock: product.stock - quantity };
      await updateProduct(updateStock);
    }
  };

  useEffect(() => {
    setTotal(calculateTotalPrice());
  }, [carts]);

  useEffect(() => {
    dispatch(getOrderApi());
    dispatch(getCartByUser());
    dispatch(getDetailUser());
    dispatch(getApiProducts(null));
    setTotal(calculateTotalPrice());
  }, []);

  useEffect(() => {
    socket.on("renderStockProduct", (newMessage) => {
      dispatch(getCartByUser());
    });
  }, []);

  return (
    <div>
      <>
        <ToastContainer />
        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          <div className="px-4 pt-8">
            <p className="text-xl font-medium">Tất cả đơn hàng</p>
            {/* // LIST PRODUCTS */}
            <div className="mt-2 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
              {carts?.map((item: any) => {
                return (
                  <div
                    key={item.id}
                    className="flex flex-col rounded-lg bg-white sm:flex-row"
                  >
                    <img
                      className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                      alt=""
                      src={`${item.productSizeId?.productId?.images[0].url}`}
                    />
                    <div className="flex w-full flex-col px-4 py-4">
                      <span className="font-semibold">
                        {item.productSizeId?.productId?.title}
                      </span>
                      <span className="">
                        Dung tích: {item.productSizeId?.sizeId?.size.slice(13)}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-black-500">Số lượng:</span>
                        <span className="text-black">{item.quantity}</span>
                      </div>

                      {item.quantity > item.productSizeId?.productId?.stock ? (
                        <p className="pt-2 text-red-600">
                          Số lượng trong kho không đủ
                        </p>
                      ) : (
                        <p className="text-lg text-red-600  ">
                          Giá:
                          {item.productSizeId?.productId?.price?.toLocaleString()}
                          đ
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium flex gap-3 items-center">
              Chi tiết thanh toán
              <IoMdCash className="text-green-400 text-[30px]" />
            </p>
            <div className="">
              <div>
                <div className="relative mt-2">
                  <input
                    type="text"
                    id="card-holder"
                    name="card-holder"
                    className="w-full  border border-gray-200 px-4 py-3 pl-11 text-sm  shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Tên người nhận"
                    onChange={(e: any) => setName(e.target.value)}
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <BiUser />
                  </div>
                </div>
                {/* phone */}
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-5 w-full mb-2 border border-gray-200  py-3 pl-20 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Số điện thoại người nhận  "
                    onChange={(e: any) => setPhone(e.target.value)}
                  />
                  <div className="pointer-events-none absolute inset-y-0 mt-5 left-0 inline-flex items-center px-3">
                    <FiPhoneCall />
                    <p className="pl-2">+84</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row">
                  <div className="relative flex-shrink-0 w-full">
                    <input
                      type="text"
                      id="billing-address"
                      name="billing-address"
                      className="w-full pl-[41px]  border border-gray-200 px-4 py-3   text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Địa chỉ nhận hàng"
                      onChange={(e: any) => setAddress(e.target.value)}
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <img
                        className="h-5 w-5 object-contain "
                        src="https://seeklogo.com/images/V/viet-nam-logo-3D78D597F9-seeklogo.com.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between py-2">
                  <p className="text-sm font-medium text-gray-900">
                    Phí vận chuyển
                  </p>
                  <p className=" text-gray-900">20.000 ₫</p>
                </div>
              </div>
              <div className="mt-6 mb-5 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Tổng tiền</p>
                <p className="text-2xl font-semibold  text-red-500">
                  {total.toLocaleString()} ₫
                </p>
              </div>
            </div>
            <button
              onClick={paymentCOD}
              className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
            >
              ĐẶT HÀNG
            </button>
          </div>
        </div>
      </>
    </div>
  );
};

export default Checkout;
