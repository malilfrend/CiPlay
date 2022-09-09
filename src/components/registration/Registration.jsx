import React from "react";
import { ErrorMessage, Form, Formik } from "formik";
import { Button, TextField } from "@mui/material";
import registrationFormSchema from "../validationSchemes/registrationFormSchema";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { registrationThunk } from "../../redux/registrationReducer";
import c from "../StylesForAllMainComponents.module.css";

const Registration = (props) => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.registration.isLogged);
  const isFetching = useSelector((state) => state.registration.isFetching);
  const isAuth = useSelector((state) => state.registration.isAuth);

  if (isLogged) return <Navigate replace={true} to="/changePassword" />;

  const onInput = (e) => {
    localStorage.setItem(`${e.target.name}SingingIn`, `${e.target.value}`);
  };

  return (
    <div className={c.container}>
      <h1>Registration</h1>
      <Formik
        initialValues={{
          email: localStorage.getItem("emailSingingIn") || "",
          password: localStorage.getItem("passwordSingingIn") || "",
          repeatPassword: localStorage.getItem("repeatPasswordSingingIn") || "",
        }}
        onSubmit={(values, { resetForm }) => {
          dispatch(registrationThunk(values.email, values.password));
          setTimeout(() => {
            props.setShowAlert(true);
          }, 2500);
          localStorage.clear();
          resetForm({ values: "" });
        }}
        validationSchema={registrationFormSchema}
      >
        {({ values, handleChange }) => (
          <Form className={c.form}>
            <div className={c.formItem}>
              <label htmlFor={"email"}>Your email</label>
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
            <div className={c.formItem}>
              <label htmlFor={"repeatPassword"}>Repeat password</label>
              <br />
              <TextField
                fullWidth
                value={values.repeatPassword}
                variant="filled"
                onChange={handleChange}
                onInput={onInput}
                type={"password"}
                name={"repeatPassword"}
                inputProps={{ style: { fontSize: 18 } }}
                size="small"
              />
              <ErrorMessage
                name="repeatPassword"
                component="div"
                render={(msg) => <div className={c.error}>{msg}</div>}
              />
            </div>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={isFetching || isAuth}
              fullWidth
            >
              Sign in
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registration