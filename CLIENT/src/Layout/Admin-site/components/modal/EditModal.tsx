import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import EditProductForm from "./FormEdit/EditProductForm";
import {
  IBrand,
  ICategory,
  INewProductSize,
  IProduct,
  IRole,
  ISize,
} from "../../../../Interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import {
  getApiBrands,
  getApiCategories,
  getApiProducts,
  getApiRoles,
  getApiSizes,
  getPayments,
} from "../../../../store/action";
import { toast } from "react-toastify";
import EditBrandForm from "./FormEdit/EditBrandForm";
import { updateBrand } from "../../../../Api/brands";
import EditCategoryForm from "./FormEdit/EditCategoryForm";
import { updateCategory } from "../../../../Api/categories";
import { updateRole } from "../../../../Api/role";
import EditRoleForm from "./FormEdit/EditRoleForm";
import EditCapacityForm from "./FormEdit/EditCapacityForm";
import { updateSize } from "../../../../Api/capacity";
import { updateProduct } from "../../../../Api";
import EditPaymentForm from "./FormEdit/EditPaymentForm";
import { updatePayment } from "../../../../Api/payment";

export function EditModal(props: any) {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(props.open);
  const [productUpdate, setProductUpdate] = useState<IProduct>();
  const [brandUpdate, setBrandUpdate] = useState<IBrand>();
  const [categoryUpdate, setCategoryUpdate] = useState<ICategory>();
  const [roleUpdate, setRoleUpdate] = useState<IRole>();
  const [sizeUpdate, setSizeUpdate] = useState<ISize>();
  const [paymentUpdate, setPaymentUpdate] = useState<ISize>();
  const [isErrorStock, setError] = useState<boolean>(false);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const ClickClose = (e: any) => {
    if (e) {
      props.handleClose(false);
    }
  };
  const handleGetData = (dataUpdate: any, isErrorStock: boolean) => {
    setProductUpdate(dataUpdate);
    setBrandUpdate(dataUpdate);
    setCategoryUpdate(dataUpdate);
    setRoleUpdate(dataUpdate);
    setSizeUpdate(dataUpdate);
    setError(isErrorStock);
    setPaymentUpdate(dataUpdate);
  };

  const handleUpdate = async () => {
    switch (props.title) {
      case "PRODUCTS":
        if (isErrorStock === false) {
          const responseProduct: any = await updateProduct(productUpdate);
          if (responseProduct?.data?.success === true) {
            toast.success(responseProduct.data.message);
            props.handleClose(false);
            setTimeout(() => {
              dispatch(getApiProducts(null));
            }, 1000);
          } else {
            props.handleClose(false);
            toast.error("Tên sản phẩm đã được tạo vui lòng nhập tên khác");
          }
        }
        break;
      case "BRANDS":
        const responseBrand: any = await updateBrand(brandUpdate);
        if (responseBrand?.data?.success === true) {
          toast.success(responseBrand.data.message);
          props.handleClose(false);
          setTimeout(() => {
            dispatch(getApiBrands(null));
          }, 2000);
        } else {
          props.handleClose(false);
          toast.error("Tên thương hiệu đã được tạo vui lòng nhập tên khác");
        }
        break;
      case "CATEGORY":
        const responseCategory: any = await updateCategory(categoryUpdate);
        if (responseCategory?.data?.success === true) {
          toast.success(responseCategory?.data?.message);
          props.handleClose(false);
          setTimeout(() => {
            dispatch(getApiCategories(null));
          }, 2000);
        } else {
          props.handleClose(false);
          toast.error("Loại sai hoặc đã tồn tại ");
        }
        break;
      case "ROLES":
        const responseRole: any = await updateRole(roleUpdate);
        if (responseRole?.data?.success === true) {
          toast.success(responseRole?.data?.message);
          props.handleClose(false);
          setTimeout(() => {
            dispatch(getApiRoles());
          }, 2000);
        } else {
          props.handleClose(false);
          toast.error("LEVEL sai hoặc đã tồn tại");
        }
        break;
      case "CAPACITY":
        const responseSize: any = await updateSize(sizeUpdate);
        if (responseSize?.data?.success === true) {
          toast.success(responseSize?.data?.message);
          props.handleClose(false);
          setTimeout(() => {
            dispatch(getApiSizes());
          }, 2000);
        } else {
          props.handleClose(false);
          toast.error("Dung tích sai hoặc đã tồn tại");
        }
        break;
      case "PAYMENT":
        const responsePayment: any = await updatePayment(paymentUpdate);
        if (responsePayment?.data?.success === true) {
          toast.success(responsePayment?.data?.message);
          props.handleClose(false);
          setTimeout(() => {
            dispatch(getPayments(null));
          }, 2000);
        } else {
          props.handleClose(false);
          toast.error("Phương Thức sai hoặc đã tồn tại");
        }
        break;
    }
  };

  return (
    <div>
      <Dialog open={open} handler={(e) => ClickClose(e)}>
        <DialogBody divider>
          {props.title === "PRODUCTS" && (
            <div>
              <EditProductForm handleGetData={handleGetData} />
            </div>
          )}
          {props.title === "BRANDS" && (
            <div>
              <EditBrandForm handleGetData={handleGetData} />
            </div>
          )}
          {props.title === "CATEGORY" && (
            <div>
              <EditCategoryForm handleGetData={handleGetData} />
            </div>
          )}
          {props.title === "ROLES" && (
            <div>
              <EditRoleForm handleGetData={handleGetData} />
            </div>
          )}
          {props.title === "CAPACITY" && (
            <div>
              <EditCapacityForm handleGetData={handleGetData} />
            </div>
          )}
          {props.title === "PAYMENT" && (
            <div>
              <EditPaymentForm handleGetData={handleGetData} />
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
          <Button color="green" onClick={handleUpdate}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
