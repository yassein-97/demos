/* eslint-disable no-unused-vars */
import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";
import { userContext } from "../../Components/Context/UserContext/User.context";
import { Helmet } from "react-helmet";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState(null);
  const Navigate = useNavigate();
  const { token, setToken } = useContext(userContext);

  async function handleDataSubmit(values) {
    const toastId = toast.loading("Loading...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };

      const { data } = await axios.request(options);
      if (data.message === "success") {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success("Successfully Login");
        setTimeout(() => {
          Navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setErrorMessage(error.response.data.message);
    } finally {
      toast.dismiss(toastId);
    }
  }

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const validate = object({
    email: string()
      .required("You Must Enter Your Email")
      .email("Your Email Not Valid"),
    password: string()
      .required("Your Password Is Required")
      .matches(
        passwordRegex,
        "Minimum 8 characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleDataSubmit,
    validationSchema: validate,
  });

  return (
    <>

<Helmet>
  <title> Login Page</title>
</Helmet>


      <h2 className="mb-4 font-bold">
        {" "}
        <i className="fa-solid fa-user mr-3"></i>Login Now
      </h2>

      <form className="space-y-5" onSubmit={formik.handleSubmit}>
        <div>
          <input
            className="form-control w-full"
            type="email"
            name="email"
            value={formik.values.email}
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-600 text-sm">*{formik.errors.email} </p>
          )}
        </div>

        <div>
          <input
            className="form-control w-full"
            type="password"
            name="password"
            value={formik.values.password}
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-600 text-sm">*{formik.errors.password} </p>
          )}
          {errorMessage && (
            <p className="text-red-600 text-sm">{errorMessage}</p>
          )}
        </div>

        <button className="btn w-full" type="submit">
          Login
        </button>
        <Link to="/forgetpassword">
          <p className="mt-4 text-red-700">Forget Password ?</p>
        </Link>
      </form>
    </>
  );
}
