import useAuthHook from "../../../FirebaseCalls/useAuthHook";
import GoogleButton from "react-google-button";

export default function GoogleSignin() {
  const { googleAuthUser } = useAuthHook();

  return (
    <>
      <GoogleButton
        onClick={() => {
          googleAuthUser();
        }}
      />
    </>
  );
}
