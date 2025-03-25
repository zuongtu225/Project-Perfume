import {
  PiCubeBold,
  PiScrollBold,
  PiStackBold,
  PiSignatureBold,
  PiWalletBold,
} from "react-icons/pi";
import { MdOutlinePayments } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { SlLogout } from "react-icons/sl";
import { FaUsers } from "react-icons/fa6";
import { GrCapacity } from "react-icons/gr";
export const MenuItem = [
  {
    id: 1,
    path: "/admin/product",
    title: "Sản phẩm",
    icon: <PiCubeBold />,
  },
  { id: 2, path: "/admin/category", title: "Loại", icon: <PiStackBold /> },
  {
    id: 3,
    path: "/admin/capacity",
    title: "Dung tích",
    icon: <GrCapacity />,
  },
  {
    id: 4,
    path: "/admin/brand",
    title: "Thương Hiệu",
    icon: <PiSignatureBold />,
  },
  { id: 5, path: "/admin/user", title: "Người dùng", icon: <FiUsers /> },
  {
    id: 6,
    path: "/admin/role",
    title: "Phân quyền",
    icon: <FaUsers />,
  },
  { id: 7, path: "/admin/order", title: "Đơn hàng", icon: <PiScrollBold /> },
  {
    id: 8,
    path: "/admin/payment",
    title: "Payment",
    icon: <MdOutlinePayments />,
  },
  {
    id: 9,
    path: "/auth/login",
    title: "Đăng Xuất",
    icon: <SlLogout />,
  },
];
