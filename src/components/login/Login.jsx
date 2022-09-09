import React from "react";
import { ErrorMessage, Form, Formik } from "formik";
import loginFormSchema from "./../validationSchemes/loginFormSchema";
import { Button, TextField } from "@mui/material";
import { connect, useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../redux/registrationReducer";
import { useNavigate } from "react-router-dom";
import c from "../StylesForAllMainComponents.module.css";

const Login = (props) => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.registration.isLogged);
  const isFetching = useSelector((state) => state.registration.isFetching);

  let navigate = useNavigate();
  if (isLogged) {
    setTimeout(() => {
      navigate("/changePassword", { replace: true });
    }, 1000);
  }
  const onInput = (e) => {
    localStorage.setItem(`${e.target.name}LogginingIn`, `${e.target.value}`);
  };

  return (
    <div className={c.container}>
      <h1>Login</h1>
      <Formik
        initialValues={{
          email: localStorage.getItem("emailLogginingIn") || "",
          password: localStorage.getItem("passwordLogginingIn") || "",
        }}
        onSubmit={(values, { resetForm }) => {
          dispatch(loginThunk(values.email, values.password));
          setTimeout(() => {
            props.setShowAlert(true);
          }, 1000);
          localStorage.clear();
          resetForm({ values: "" });
        }}
        validationSchema={loginFormSchema}
      >
        {({ values, handleChange }) => (
          <Form className={c.form}>
            <div className={c.formItem}>
              <label htmlFor={"email"}> Your email</label>
              <br />
              <TextField
                fullWidth
                value={values.email}
                variant="filled"
                onChange={handleChange}
                onInput={onInput}
                type={"text"}
                name={"email"}
                inputProps={{ style: { fontSize: 18 } }}
                size="small"
              />
              <ErrorMessage
                name="email"
                render={(msg) => <div className={c.error}>{msg}</div>}
              />
            </div>
            <div className={c.formItem}>
              <label htmlFor={"password"}> Your password</label>
              <br />
              <TextField
                fullWidth
                value={values.password}
                variant="filled"
                onChange={handleChange}
                onInput={onInput}
                type={"password"}
                name={"password"}
                inputProps={{ style: { fontSize: 18 } }}
                size="small"
              />
              <ErrorMessage
                name="password"
                render={(msg) => <div className={c.error}>{msg}</div>}
              />
            </div>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={isFetching || isLogged}
              fullWidth
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login