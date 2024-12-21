import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function ForgetPassword() {
  const [errorMessage, setErrorMessage] = useState(null);
  const Navigate = useNavigate();
  const emailReset = object({
    email: string().required("Email is Required").email("Email Must Be Valid"),
  });

  async function handleResetEmail(values) {
    const loadingId = toast.loading("Waiting");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      toast.success("OTP Send To Your Email");
      if (data.statusMsg === "success") {
        setTimeout(() => {
          Navigate("/confirmedmessage");
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setErrorMessage(error.response.data.message);
    } finally {
      toast.dismiss(loadingId);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailReset,
    onSubmit: handleResetEmail,
  });

  return (
   <>

   <Helmet>
<title> Forget Password</title>
   </Helmet>



    <div className="min-h-screen">
      <h1 className="text-gray-700 text-center font-bold text-3xl mb-9">
        Please write Your Email...
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            className="form-control w-full"
            type="email"
            name="email"
            placeholder="Write Your Email..."
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-800 text-sm">*{formik.errors.email}</p>
          )}
          {errorMessage && (
            <p className="text-red-800 text-sm mt-3">
              *{errorMessage}
              <Link to="/sinup">
                <span className="ml-8 text-black">Need To Register? </span>
              </Link>
            </p>
          )}
        </div>

        <button className="btn w-full mt-11" type="submite">
          {" "}
          Send
        </button>
      </form>
    </div>
   </>
  );
}
