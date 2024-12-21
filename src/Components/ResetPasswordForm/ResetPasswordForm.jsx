/* eslint-disable no-unused-vars */
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState(null);
  const Navigate = useNavigate();
  async function handleDataSubmit(values) {
    const toastId = toast.loading("Loading...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "PUT",
        data: values,
      };

      const { data } = await axios.request(options);
      console.log(data);
      if (data.token) {
        toast.success("Successfully Updated Password");
        setTimeout(() => {
          Navigate("/login");
        }, 1000);
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
    newPassword: string()
      .required("Your Password Is Required")
      .matches(
        passwordRegex,
        "Minimum 8 characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: handleDataSubmit,
    validationSchema: validate,
  });

  return (
    <>
      <h2 className="mb-4 font-bold">
        {" "}
        <i className="fa-solid fa-user mr-3"></i> Reset Your Password
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
            name="newPassword"
            value={formik.values.newPassword}
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.newPassword && formik.touched.newPassword && (
            <p className="text-red-600 text-sm">*{formik.errors.newPassword}</p>
          )}
          {errorMessage && (
            <p className="text-red-600 text-sm">{errorMessage}</p>
          )}
        </div>

        <button className="btn w-full" type="submit">
          Send
        </button>
      </form>
    </>
  );
}
