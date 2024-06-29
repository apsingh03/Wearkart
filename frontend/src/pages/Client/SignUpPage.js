import React from "react";
import Header from "../../components/Client/Header";
import Footer from "../../components/Client/Footer";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { FaUser, FaMobile } from "react-icons/fa";
import { MdEmail, MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(2, "Too Short!")
      .max(8, "Too Long!")
      .required("*Required"),

    fullName: Yup.string()
      .min(4, "Too Short!")
      .max(8, "Too Long!")
      .required("*Required"),

    emailAddress: Yup.string().email("Invalid email").required("*Required"),
  });

  return (
    <>
      <Header />
      <div className="d-flex flex-row justify-content-center align-items-center">
        <div className="authPage">
          <div className="authPage__header">
            <h3 className="authPage__header__title">Register</h3>
            <p className="authPage__header__subTitle">
              Please fill in the fields below
            </p>
          </div>
          <Formik
            initialValues={{
              emailAddress: "",
              fullName: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values, { setSubmitting }) => {
              // setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <div className="d-flex align-items-baseline">
                    <label htmlFor="fullName">Full Name</label>
                    <p className="authPage__inputFieldError px-3">
                      {errors.fullName && touched.fullName && errors.fullName}
                    </p>
                  </div>

                  <div className="authPage__inputContainer">
                    <div className="authPage__inputContainer__icon">
                      <FaUser />
                    </div>

                    <input
                      type="email"
                      className="form-control"
                      id="fullName"
                      name="fullName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fullName}
                    />
                  </div>
                </div>

                <div className="form-group mb-3">
                  <div className="d-flex align-items-baseline">
                    <label htmlFor="emailAddress">Email address</label>
                    <p className="authPage__inputFieldError px-3">
                      {errors.emailAddress &&
                        touched.emailAddress &&
                        errors.emailAddress}
                    </p>
                  </div>

                  <div className="authPage__inputContainer">
                    <div className="authPage__inputContainer__icon">
                      <MdEmail />
                    </div>

                    <input
                      type="email"
                      className="form-control"
                      id="emailAddress"
                      name="emailAddress"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.emailAddress}
                    />
                  </div>
                </div>

                <div className="form-group mb-3">
                  <div className="d-flex align-items-baseline justify-content-between">
                    <div className="d-flex align-items-baseline">
                      <label htmlFor="password">Password</label>
                      <p className="authPage__inputFieldError px-3">
                        {errors.password && touched.password && errors.password}
                      </p>
                    </div>
                  </div>

                  <div className="authPage__inputContainer">
                    <div className="authPage__inputContainer__icon">
                      <MdPassword />
                    </div>

                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="authPage__submitBtn mt-3"
                  disabled={isSubmitting}
                >
                  LOGIN
                </button>
              </form>
            )}
          </Formik>

          <div className="authPage__footer">
            <p>
              {" "}
              Already have an account? <Link to="/signin"> Login </Link>{" "}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUpPage;
