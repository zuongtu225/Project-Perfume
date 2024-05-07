import React, { useEffect, useState } from "react";

const AddCapacityForm = (props: any) => {
  const [size, setSize] = useState<any>();
  const [percent, setPercent] = useState<any>();
  useEffect(() => {
    props.handleGetSize({ size, percent });
  }, [size, percent]);

  return (
    <div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div className="-mx-3 md:flex mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              id="grid-first-name"
              type="text"
              name="name"
              placeholder="Dung tích"
              onChange={(e) => setSize(e.target.value)}
            />
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              id="grid-first-name"
              type="text"
              name="name"
              placeholder="Phần trăm"
              onChange={(e) => setPercent(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCapacityForm;
