import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EditCapacityForm = (props: any) => {
  const sizeDetail = useSelector(
    (state: any) => state?.sizeReducer?.sizeDetail
  );

  const [size, setNewSize] = useState<any>({
    id: sizeDetail?.id,
    size: sizeDetail?.size,
    percent: +sizeDetail?.percent,
  });

  useEffect(() => {
    props.handleGetData(size);
  }, [size]);

  return (
    <div className="md:w-1/2 px-3  md:mb-0">
      <label>Dung tích</label>
      <input
        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
        id="grid-first-name"
        type="text"
        value={size.size}
        onChange={(e) => setNewSize({ ...size, size: e.target.value })}
      />
      <label>Phần trăm</label>
      <input
        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
        id="grid-first-name"
        type="text"
        value={size.percent}
        onChange={(e) => setNewSize({ ...size, percent: e.target.value })}
      />
    </div>
  );
};

export default EditCapacityForm;
