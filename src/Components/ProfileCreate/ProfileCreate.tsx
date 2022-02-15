import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  equalTo,
  onChildAdded,
  orderByChild,
  query,
  ref,
  set,
} from "firebase/database";
import { db, auth } from "../../firebase";
import { User } from "../../Models/User";
import useAuthHook from "../../CustomHooks/useAuthHook";
import { useDispatch } from "react-redux";
import { SetUserExistsACtion } from "../../Redux/Actions/LoginActions";
import { SetInfluencerAction } from "../../Redux/Actions/UserActions";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export default function ProfileCreate() {
  const [userNameAvailable, setUserNameAvailable] = useState(true);
  const dispatch = useDispatch();

  function writeNewUser(user: User) {
    set(ref(db, "users/" + user.UserId), user)
      .then(() => {
        dispatch(SetUserExistsACtion(true));
        dispatch(SetInfluencerAction(user));
      })
      .catch((error) => {
        // The write failed...
      });
  }

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      {
        userNameAvailable &&
          writeNewUser({
            UserId: auth.currentUser?.uid,
            Username: formik.values.username,
          } as User);
      }
    },
  });

  useEffect(() => {
    setUserNameAvailable(true);

    const usersRef = query(
      ref(db, "users"),
      orderByChild("Username"),
      equalTo(formik.values.username)
    );

    onChildAdded(usersRef, (data) => {
      if (data) {
        setUserNameAvailable(false);
      } else {
        setUserNameAvailable(true);
      }
    });
  }, [formik.values.username]);

  return (
    <div className="main">
      <div style={{ alignItems: "center", justifyContent: "center" }}>
        <TextField
          id="email"
          label="Username"
          color={userNameAvailable ? "success" : "error"}
          focused
          helperText={formik.touched.username && formik.errors.username}
          error={formik.touched.username && !!formik.errors.username}
          {...formik.getFieldProps("username")}
          sx={{ input: { color: "white" } }}
        />

        {formik.values.username && (
          <>
            {userNameAvailable ? (
              <CheckIcon
                style={{ width: 40, height: 40, color: "green" }}
              ></CheckIcon>
            ) : (
              <CloseIcon
                style={{ width: 40, height: 40, color: "red" }}
              ></CloseIcon>
            )}
          </>
        )}
      </div>

      <Button
        variant="contained"

        onClick={() => formik.handleSubmit()}
        style={{ marginLeft: 100, marginRight: 100, marginTop: 20 }}
      >
        Create
      </Button>
    </div>
  );
}
