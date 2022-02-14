import React, { useState } from "react";
import styles from "./styles.module.scss";

import Nueplatformheader from "../../NUEPLATFORMHeader/nueplatformheader";
import { PhoneNumberLogin } from "../../PhoneNumberAuth/PhoneNumberLogin";


const SigninOrLogin: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* <Nueplatformheader></Nueplatformheader> */}

      <PhoneNumberLogin></PhoneNumberLogin>
    </div>
  );
};

export default SigninOrLogin;