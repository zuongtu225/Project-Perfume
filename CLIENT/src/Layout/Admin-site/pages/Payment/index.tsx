import { useEffect, useState } from "react";
import AdminHeader from "../../components/layout/Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { getDetailPayment, getPayments } from "../../../../store/action";
import { IPayment, IRole } from "../../../../Interface";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { EditModal } from "../../components/modal/EditModal";
import { Button } from "flowbite-react";
import { deleteRole } from "../../../../Api/role";
import Pagination from "../../components/pagination";
import { deletePayment } from "../../../../Api/payment";

const PaymentManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const payments = useSelector((state: any) => state?.paymentReducer?.payments);
  const [data, setData] = useState<IPayment[]>();
  const [open, setOpen] = useState<boolean>(false);

  const handlePage = (pagination: any) => {
    setData(pagination);
  };
  const handleClose = (open: boolean) => {
    setOpen(open);
  };
  const handleEdit = async (id: number) => {
    await dispatch(getDetailPayment(id));
    setOpen(!open);
  };

  const removePayment = async (id: number) => {
    const response = await deletePayment(id);
    if (response) {
      toast.success("Xóa thành công", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setTimeout(() => {
        dispatch(getPayments(null));
      }, 1000);
    } else {
      toast.error("Phải xóa các user đã tạo bởi Thương Hiệu này trước");
    }
  };

  useEffect(() => {
    dispatch(getPayments(null));
  }, []);

  return (
    <div>
      <AdminHeader title="PAYMENT" slug="PAYMENT" />
      <div className="content ">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-20 py-3">
                  STT
                </th>
                <th scope="col" className="px-20 py-3">
                  Phương Thức Thanh Toán
                </th>
                <th scope="col" className="px-1 py-3">
                  HÀNH ĐỘNG
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item: IPayment, index: number) => {
                return (
                  <tr className="p-10">
                    <td
                      scope="row"
                      className="px-20 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </td>
                    <td className="px-20 py-3">{item.title}</td>
                    <td className="align-baseline flex  pl-[290px]  py-3 ">
                      <EditModal
                        title={"PAYMENT"}
                        open={open}
                        handleClose={handleClose}
                      />
                      <Button
                        onClick={() => handleEdit(item.id)}
                        className=" bg-green-500 text-red-100 font-semibol mr-3 "
                      >
                        Sửa
                      </Button>
                      <Button
                        onClick={() => removePayment(item.id)}
                        className="bg-red-600 text-red-200 font-semibol"
                      >
                        Xoá
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination data={payments} handlePage={handlePage} />
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
};

export default PaymentManager;
