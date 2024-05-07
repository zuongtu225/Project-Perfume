import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const EditRoleForm = (props: any) => {
  const roleDetail = useSelector(
    (state: any) => state?.roleReducer?.roleDetail
  );

  const [role, setNewRole] = useState<any>({
    id: roleDetail?.id,
    role: roleDetail?.role,
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewRole({
      id: roleDetail?.id,
      [name]: +value,
    });
  };

  useEffect(() => {
    props.handleGetData(role);
  }, [role]);
  return (
    <div className="md:w-1/2 px-3  md:mb-0">
      <label>Level</label>
      <input
        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
        id="grid-first-name"
        type="text"
        name="role"
        value={role.role}
        onChange={handleChange}
      />
    </div>
  );
};

export default EditRoleForm;
