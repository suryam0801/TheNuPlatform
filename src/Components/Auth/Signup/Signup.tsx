import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styled } from "@mui/material/styles";

// Local Imports
import logo from "../../../assets/gc-logo-symbol-nobg.png";
import CustomButton from "../../CustomButton/index";
import styles from "./styles.module.scss";
import useAuthHook from "../../../FirebaseCalls/useAuthHook";
import GoogleSignin from "../GoogleSignup/GoogleSignup";

type Props = {};

const Signup: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const { makeUser } = useAuthHook();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2, "Must be 2 characters at least")
        .required("Required")
        .max(12, "Can not exceed 12 characters"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be 6 characters at least")
        .required("Required")
        .max(20, "Can not exceed 20 characters"),
    }),
    onSubmit: (values) =>
      makeUser(values.username, values.email, values.password),
  });

  // type Props = {
  //   fontColor?: string;
  // };

  // const options = {
  //   shouldForwardProp: (prop:string) => prop !== "fontColor",
  // };

  // const StyledTextField = styled(
  //   TextField,
  //   options
  // )<Props>(({ fontColor }) => ({
  //   input: {
  //     color: fontColor,
  //   },
  // }));

  return (
    <div className={styles.container}>
      <TextField
        className={styles.input}
        id="username"
        label="Username"
        variant="outlined"
        color="success"
        focused
        helperText={formik.touched.username && formik.errors.username}
        error={formik.touched.username && !!formik.errors.username}
        {...formik.getFieldProps("username")}
        sx={{ input: { color: "white" } }}
      />
      <TextField
        className={styles.input}
        id="email"
        label="Email"
        variant="outlined"
        color="success"
        focused
        helperText={formik.touched.email && formik.errors.email}
        error={formik.touched.email && !!formik.errors.email}
        {...formik.getFieldProps("email")}
        sx={{ input: { color: "white" } }}
      />
      <TextField
        className={styles.input}
        id="password"
        label="Password"
        type="password"
        color="success"
        focused
        helperText={formik.touched.password && formik.errors.password}
        error={formik.touched.password && !!formik.errors.password}
        {...formik.getFieldProps("password")}
        sx={{ input: { color: "white" } }}
      />
      <CustomButton
        type="submit"
        onClick={formik.handleSubmit}
        isPurple
        title="Signup"
        small={false}
      />

      <h2>Or</h2>

      <GoogleSignin></GoogleSignin>
      
      <Link to="/login">
        <p className={styles.guest}>Already a member ? Login</p>
      </Link>

    </div>
  );
};

export default Signup;
