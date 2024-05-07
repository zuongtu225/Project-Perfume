import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { createProduct, createProductSize } from "../../../../Api";
import { createImages } from "../../../../Api/images";
import {
  IBrand,
  IProduct,
  IProductSize,
  IRole,
  ISize,
  ISizeStock,
} from "../../../../Interface";
import AddBrandForm from "./FormAdd/AddBrandForm";
import { createBrand } from "../../../../Api/brands";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import {
  getApiBrands,
  getApiCategories,
  getApiProducts,
  getApiRoles,
  getApiSizes,
} from "../../../../store/action";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { createCategory } from "../../../../Api/categories";
import AddCategoryForm from "./FormAdd/AddCategoryForm";
import LoadingComponent from "../../../Customer-site/components/lazy-loading";
import ProductFormAdd from "./FormAdd/AddProductForm";
import AddRoleForm from "./FormAdd/AddRoleForm";
import { createRole } from "../../../../Api/role";
import AddCapacityForm from "./FormAdd/AddCapacityForm";
import { createSizes } from "../../../../Api/capacity";

export function AddModal(props: any): any {
  const dispatch = useDispatch<AppDispatch>();
  const [product, setProduct] = useState<any>();
  const [category, setCategory] = useState<any>();
  const [images, setImages] = useState<any>();
  const [brand, setBrand] = useState<any>();
  const [listSizeStocks, setListSizeStocks] = useState<ISizeStock[]>();
  const [open, setOpen] = useState(props.open);
  const [role, setRole] = useState<any>();
  const [size, setSize] = useState<any>();
  const [openLoading, setOpenLoading] = useState<boolean>(false);

  const ClickClose = (e: any) => {
    if (e) {
      props.handleClose(false);
    }
  };
  const handleGetProduct = (
    data: IProduct,
    formData: any,
    listSizeStocks: ISizeStock[]
  ) => {
    setProduct(data);
    setImages(formData);
    setListSizeStocks(listSizeStocks);
  };
  const handleGetBrand = (data: IBrand) => {
    setBrand({ title: data });
  };
  const handleGetCategory = (data: IBrand) => {
    setCategory({ title: data });
  };
  const handleGetRole = (data: IRole) => {
    setRole({ role: +data });
  };
  const handleGetSize = (data: ISize) => {
    setSize({ size: data.size, percent: +data.percent });
  };

  const handleAdd = async () => {
    switch (props.title) {
      case "PRODUCTS":
        props.handleClose(false);
        setOpenLoading(true);
        const resProduct: any = await createProduct(product);
        if (resProduct?.data?.success === true) {
          const listProductSize =
            listSizeStocks?.map((item: ISizeStock) => {
              return { ...item, productId: resProduct.data?.data?.id };
            }) || [];
          await createProductSize(listProductSize);
          const formData = new FormData();
          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
          for (let img of images) formData.append("images", img);
          formData.append("productId", resProduct?.data?.data?.id);
          const resImage: any = await createImages(formData, config);
          if (resImage?.data?.success === true) {
            setOpenLoading(false);
          }
          toast.success(resProduct?.data?.message, {
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
            dispatch(getApiProducts(null));
          }, 1000);
        } else {
          props.handleClose(false);
          toast.error("Tên sản phẩm đã được tạo vui lòng nhập tên khác");
          setOpenLoading(false);
        }
        break;
      case "BRANDS":
        const responseBrand: any = await createBrand(brand);
        if (responseBrand?.data?.success === true) {
          props.handleClose(false);
          toast.success(responseBrand?.data.message, {
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
            dispatch(getApiBrands(null));
          }, 1000);
        } else {
          props.handleClose(false);
          toast.error("Trùng tên thương hiệu");
        }
        break;
      case "CATEGORY":
        const responseCategory: any = await createCategory(category);
        if (responseCategory?.data.success === true) {
          props.handleClose(false);
          toast.success(responseCategory.data.message, {
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
            dispatch(getApiCategories(null));
          }, 1000);
        } else {
          props.handleClose(false);
          toast.error("Loại nước hoa đã tồn tại");
        }
        break;
      case "ROLES":
        const responseRole: any = await createRole(role);
        if (responseRole?.data.success === true) {
          props.handleClose(false);
          toast.success(responseRole?.data.message, {
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
            dispatch(getApiRoles());
          }, 1000);
        } else {
          props.handleClose(false);
          toast.error("LEVEL đã tồn tại");
        }
        break;
      case "CAPACITY":
        const responseSize: any = await createSizes(size);
        if (responseSize?.data?.success === true) {
          props.handleClose(false);
          toast.success(responseSize?.data.message, {
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
            dispatch(getApiSizes());
          }, 1000);
        } else {
          props.handleClose(false);
          toast.error("Dung tích đã tồn tại");
        }
        break;
    }
  };

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  return (
    // Form  chung
    // Submit chung
    <div className="formAdd">
      {openLoading ? <LoadingComponent /> : null}
      <Dialog open={open} handler={(e: any) => ClickClose(e)}>
        <DialogHeader> Form Thêm </DialogHeader>
        <DialogBody divider>
          {props.title === "PRODUCTS" && (
            <div>
              <ProductFormAdd handleGetProduct={handleGetProduct} />
            </div>
          )}
          {props.title === "BRANDS" && (
            <div>
              <AddBrandForm handleGetBrand={handleGetBrand} />
            </div>
          )}
          {props.title === "CATEGORY" && (
            <div>
              <AddCategoryForm handleGetCategory={handleGetCategory} />
            </div>
          )}
          {props.title === "ROLES" && (
            <div>
              <AddRoleForm handleGetRole={handleGetRole} />
            </div>
          )}
          {props.title === "CAPACITY" && (
            <div>
              <AddCapacityForm handleGetSize={handleGetSize} />
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={ClickClose}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button color="green" onClick={handleAdd}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
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
}
