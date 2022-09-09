import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

const registrationFormSchema = Yup.object().shape({
  email: Yup.string().email("It is not valid").required("Required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Must be longer than 4 characters")
    .max(10, "Good password, but it's so big")
    .minUppercase(1, "password must contain at least 1 upper case letter"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});
export default registrationFormSchema;