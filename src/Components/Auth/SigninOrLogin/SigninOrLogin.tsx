import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// Local Imports
import logo from "../../../assets/cropped.png";
import CustomButton from "../../CustomButton/index";
import styles from "./styles.module.scss";
import GoogleSignin from "../GoogleSignup/GoogleSignup";

type Props = {};

const Welcome: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <Link to="/login">
        <CustomButton
          onClick={() => {}}
          isPurple={false}
          title="Login"
          small={false}
        />
      </Link>
      <Link to="/signup">
        <CustomButton
          onClick={() => {}}
          isPurple={true}
          title="Signup"
          small={false}
        />
      </Link>

      <h2>Or</h2>

      <GoogleSignin></GoogleSignin>
    </div>
  );
};

export default Welcome;
