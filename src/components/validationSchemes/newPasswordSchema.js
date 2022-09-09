import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

const newPasswordFormSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Required"),
  newPassword: Yup.string()
    .required("Password is required")
    .min(4, "Must be longer than 4 characters")
    .max(10, "Good password, but it's so big")
    .minUppercase(1, "password must contain at least 1 upper case letter"),
  repeatNewPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), null],
    "Passwords must match"
  ),
});
export default newPasswordFormSchema;