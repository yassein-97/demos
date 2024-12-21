import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ConfirmedMessage() {
  const [errorCode, setErrorCode] = useState(null);
  const navigate = useNavigate();

  async function handleConfirmedMessage(values) {
    const toastId = toast.loading("Waiting....");
    try {
      const options = {
        method: "POST",
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        data: values,
      };
      const { data } = await axios.request(options);
      console.log(data);
      if (data.status === "Success") {
        toast.success("Your OTP Has been Registered Successfully");
        setTimeout(() => {
          navigate("/resetpasswordform");
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setErrorCode(error.response.data.message);
    } finally {
      toast.dismiss(toastId);
    }
  }

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: handleConfirmedMessage,
  });

  return (
    <div className="mt-28">
      <h1 className="mb-6">Confirmed OTP...</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-7 text-center">
          <input
            className="form-control text-center"
            type="text"
            name="resetCode"
            placeholder="OTP..."
            value={formik.values.resetCode}
            onChange={formik.handleChange}
          />

          {errorCode && <p className="text-sm text-red-700">*{errorCode}</p>}
        </div>
        <button className="btn w-full" type="submite">
          {" "}
          SEND
        </button>
      </form>
    </div>
  );
}
