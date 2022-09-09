import * as Yup from "yup";

const loginFormSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Must be longer than 4 characters")
    .max(10, "Good password, but it's so big")
    .minUppercase(1, "password must contain at least 1 upper case letter"),
});
export default loginFormSchema;