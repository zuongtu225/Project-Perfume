import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IBrand,
  ICategory,
  IESizeStock,
  ISize,
  ISizeStock,
} from "../../../../../Interface";
import {
  getApiBrands,
  getApiCategories,
  getApiSizes,
} from "../../../../../store/action";
import { AppDispatch } from "../../../../../store";

const ProductFormAdd = (props: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const [images, setImages] = useState<any>([]);
  const [listSize, setlistSize] = useState<number[]>([]);
  const [listSizeStocks, setListSizeStocks] = useState<ISizeStock[]>([]);

  const categories = useSelector(
    (state: any) => state?.categoryReducer?.categories
  );
  const brands = useSelector((state: any) => state?.brandReducer?.brands);
  const sizes = useSelector((state: any) => state?.sizeReducer?.sizes);
  const [newProduct, setNewProduct] = useState<any>({
    title: "",
    brand: 0,
    category: 0,
    price: 0,
    status: true,
    isBestSeller: true,
    description: "",
  });
  const handleChangeImages = (e: any) => {
    setImages(e.target.files);
  };
  // xử lý array sizes
  const handleChangeSize = (sizeId: number) => {
    const isSelected = listSize.includes(sizeId);
    setlistSize((currentValue) => {
      if (isSelected) {
        // Nếu size đã được chọn, loại bỏ nó khỏi danh sách
        setListSizeStocks((list) =>
          list.filter((item) => item.sizeId !== sizeId)
        );
        // xoá size thì xoá lun sizeStock
        return currentValue.filter((id) => id !== sizeId);
      } else {
        return [...currentValue, sizeId];
      }
    });
  };
  // xử lý sizeStock
  const handleSizeStock = (sizeStock: IESizeStock) => {
    const valueStock = +sizeStock.e.target.value;
    const isExist = listSizeStocks.find(
      (item: ISizeStock) => item.sizeId == sizeStock.sizeIdClick
    );
    // check size nào đang click
    listSize.forEach((sizeId: number) => {
      if (sizeStock.sizeIdClick == sizeId) {
        // check sizeStock exist or update stock
        setListSizeStocks((list: ISizeStock[]) => {
          if (isExist) {
            return list.map((item: ISizeStock) => {
              if (item.sizeId == sizeId) {
                return { ...item, stock: valueStock };
              } else {
                return item;
              }
            });
          } else {
            return [
              ...listSizeStocks,
              { sizeId: sizeStock.sizeIdClick, stock: valueStock },
            ];
          }
        });
      }
    });
  };

  useEffect(() => {
    dispatch(getApiCategories(null));
    dispatch(getApiBrands(null));
    dispatch(getApiSizes());
  }, []);

  useEffect(() => {
    props.handleGetProduct(newProduct, images, listSizeStocks);
  }, [newProduct, images, listSizeStocks]);

  return (
    <div>
      <div className="bg-white   rounded   pt-6 pb-8 mb-4 flex flex-col my-2">
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <label>Tên sản phẩm</label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              id="grid-first-name"
              type="text"
              name="name"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  title: e.target.value,
                })
              }
            />
          </div>
          <div className="md:w-1/2 px-3 ">
            <div className="relative">
              <label>Thương hiệu</label>
              <select
                className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                id="grid-state"
                name="brand"
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    brand: Number(e.target.value),
                  })
                }
              >
                <option value="">Thương hiệu</option>;
                {brands?.map((item: IBrand) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="-mx-3 md:flex gap-7  ">
          <div className="md:w-[50%] px-3">
            <label>Mô tả</label>
            <textarea
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              id="grid-password"
              name="description"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div className="md:w-[50%] px-3 ">
            <div className="relative ">
              <label>Dung tích:</label>
              {sizes?.map((item: ISize) => {
                const size = item.size;
                console.log(size);
                return (
                  <div key={item.id} className=" flex items-center">
                    <label className="block">{size}</label>
                    <input
                      type="checkbox"
                      className="w-50 h-50 cursor-pointer ml-4 mr-2"
                      onChange={() => handleChangeSize(item.id)}
                      checked={listSize.includes(item.id)}
                    />
                    <label className="block mr-2"> Số lượng:</label>
                    {listSize.includes(item.id) ? (
                      <input
                        type="number"
                        className="w-[90px] h-[20px]"
                        onChange={(e) =>
                          handleSizeStock({ e, sizeIdClick: item.id })
                        }
                      />
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="-mx-3 md:flex mb-2">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <label>Giá</label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="grid-city"
              type="number"
              name="price"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: Number(e.target.value),
                })
              }
            />
          </div>
          <div className="md:w-1/2 px-3 ">
            <div className="relative">
              <label>Loại</label>
              <select
                className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                id="grid-state"
                name="category"
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    category: Number(e.target.value),
                  })
                }
              >
                <option>Loại</option>;
                {categories?.map((item: ICategory) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="-mx-3 md:flex mb-2">
          <div className="md:w-1/3 px-3 mb-6 md:mb-0">
            <input
              className="rounded-lg mt-3 border border-separate"
              onChange={handleChangeImages}
              type="file"
              multiple
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFormAdd;
