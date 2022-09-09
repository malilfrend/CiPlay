import React from "react";
import { Navigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Form, Formik } from "formik";
import { Button, TextField } from "@mui/material";
import newPasswordFormSchema from "../validationSchemes/newPasswordSchema";
import { resetPasswordThunk } from "../../redux/registrationReducer";
import c from "../StylesForAllMainComponents.module.css";

const ChangePassword = (props) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.registration.isAuth);
  const isLogged = useSelector((state) => state.registration.isLogged);
  const isFetching = useSelector((state) => state.registration.isFetching);
  const isError = useSelector((state) => state.registration.isError);

  if (!isAuth && !isLogged)
    return <Navigate replace={true} to="/registration" />;
  if (isAuth && !isLogged) return <Navigate replace={true} to="/login" />;

  return (
    <div className={c.container}>
      <h1>Change Password</h1>
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          repeatNewPassword: "",
        }}
        onSubmit={(values, { resetForm }) => {
          dispatch(resetPasswordThunk(values.newPassword, values.oldPassword));
          resetForm({ values: "" });
          setTimeout(() => {
            props.setShowAlert(true);
          }, 1000);
        }}
        validationSchema={newPasswordFormSchema}
      >
        {({ values, handleChange }) => (
          <Form className={c.form}>
            <div className={c.formItem}>
              <label htmlFor={"oldPassword"}> Old Password</label>
              <br />
              <TextField
                fullWidth
                value={values.oldPassword}
                variant="filled"
                onChange={handleChange}
                type={"password"}
                name={"oldPassword"}
                inputProps={{ style: { fontSize: 18 } }}
                size="small"
              />
              <ErrorMessage
                name="oldPassword"
                render={(msg) => <div className={c.error}>{msg}</div>}
              />
            </div>
            <div className={c.formItem}>
              <label htmlFor={"newPassword"}> Your new password</label>
              <br />
              <TextField
                fullWidth
                value={values.newPassword}
                variant="filled"
                onChange={handleChange}
                type={"password"}
                name={"newPassword"}
                inputProps={{ style: { fontSize: 18 } }}
                size="small"
              />
              <ErrorMessage
                name="newPassword"
                render={(msg) => <div className={c.error}>{msg}</div>}
              />
            </div>
            <div className={c.formItem}>
              <label htmlFor={"repeatNewPassword"}> Repeat new password</label>
              <br />
              <TextField
                fullWidth
                value={values.repeatNewPassword}
                variant="filled"
                onChange={handleChange}
                type={"password"}
                name={"repeatNewPassword"}
                inputProps={{ style: { fontSize: 18 } }}
                size="small"
              />
              <ErrorMessage
                name="repeatNewPassword"
                render={(msg) => <div className={c.error}>{msg}</div>}
              />
            </div>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={props.isFetching}
              fullWidth
            >
              Set new password
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    isAuth: state.registration.isAuth,
    isLogged: state.registration.isLogged,
    isFetching: state.registration.isFetching,
  };
};
export default connect(mapStateToProps, {resetPasswordThunk})(ChangePassword)