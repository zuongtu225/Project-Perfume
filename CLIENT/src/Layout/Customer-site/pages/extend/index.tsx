import React from "react";
import { Outlet } from "react-router-dom";
import CustomerHeader from "../../components/layout/Header/CustomerHeader";
import CustomerFooter from "../../components/layout/Footer/CustomerFooter";
import { createRole } from "../../../../Api/role";

const CustomerExtend = () => {
  const roles = [
    { id: 1, role: 1 },
    { id: 2, role: 2 },
  ];

  roles.map((role) => {
    createRole(role);
  });

  return (
    <div>
      <CustomerHeader />
      <Outlet />
      <CustomerFooter />
    </div>
  );
};

export default CustomerExtend;
