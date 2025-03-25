import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EditPaymentForm = (props: any) => {
  const paymentDetail = useSelector(
    (state: any) => state?.paymentReducer?.paymentDetail
  );

  const [payment, setNewpayment] = useState<any>({
    id: paymentDetail?.id,
    title: paymentDetail?.title,
  });

  useEffect(() => {
    props.handleGetData(payment);
  }, [payment]);

  return (
    <div className="md:w-1/2 px-3  md:mb-0">
      <label>Phương Thức Thanh Toán</label>
      <input
        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
        id="grid-first-name"
        type="text"
        value={payment.title}
        onChange={(e) => setNewpayment({ ...payment, title: e.target.value })}
      />
    </div>
  );
};

export default EditPaymentForm;
