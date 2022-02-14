import { createRef } from "react";
import useAuthHook from "../../CustomHooks/useAuthHook";
import { useDispatch } from "react-redux";
import {
  SetOtpAction
} from "../../Redux/Actions/LoginActions";


export default function OtpEntry() {

  const {otp} = useAuthHook();

  const dispatch = useDispatch();

  const ref0 = createRef();
  const ref1 = createRef();
  const ref2 = createRef();
  const ref3 = createRef();
  const ref4 = createRef();
  const ref5 = createRef();
  
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        borderRadius: 5,
        justifyContent: "center",
        marginTop: 0
      }}
    >
      <input
        placeholder="•"
        ref={ref0}
        maxLength="1"
        value={otp.slice(0, 1)}
        type="number"
        style={{
          fontSize: 24,
          width: 15,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifySelf: "center",
          textAlign: "center",
          marginRight: 5,
          borderRadius: 5,
          fontSize: 20,
          fontWeight: "bold"
        }}
        onChange={(event) => {
          if (isNumeric(event.target.value)) {
            dispatch(SetOtpAction(otp + event.target.value))
            ref1.current.focus();
          } else {
            if (event.target.value.length > 1) {
              dispatch(SetOtpAction(event.target.value.slice(1, 2) + otp.slice(1)));
              ref1.current.focus();
            } else {
              dispatch(SetOtpAction(otp.slice(1)));
            }
          }
        }}
      />

      <input
        placeholder="•"
        ref={ref1}
        maxLength="1"
        type="number"
        value={otp.slice(1, 2)}
        style={{
          fontSize: 24,
          width: 15,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifySelf: "center",
          textAlign: "center",
          marginRight: 5,
          borderRadius: 5,
          fontSize: 20,
          fontWeight: "bold"
        }}
        onChange={(event) => {
          if (isNumeric(event.target.value)) {
            dispatch(SetOtpAction(otp + event.target.value));
            ref2.current.focus();
          } else {
            if (event.target.value.length > 1) {
              dispatch(SetOtpAction(otp.slice(0, 1) + event.target.value.slice(1, 2) + otp.slice(2)));
              ref2.current.focus();
            } else {
              dispatch(SetOtpAction(otp.slice(0, 1) + otp.slice(2)));
              ref0.current.focus();
            }
          }
        }}
      />

      <input
        placeholder="•"
        ref={ref2}
        maxLength="1"
        type="number"
        value={otp.slice(2, 3)}
        style={{
          fontSize: 24,
          width: 15,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifySelf: "center",
          textAlign: "center",
          marginRight: 5,
          borderRadius: 5,
          fontSize: 20,
          fontWeight: "bold"
        }}
        onChange={(event) => {
          if (isNumeric(event.target.value)) {
            dispatch(SetOtpAction(otp + event.target.value));
            ref3.current.focus();
          } else {
            if (event.target.value.length > 1) {
              dispatch(SetOtpAction(otp.slice(0, 2) + event.target.value.slice(1, 2) + otp.slice(3)));
              ref3.current.focus();
            } else {
              dispatch(SetOtpAction(otp.slice(0, 2) + otp.slice(3)));
              ref1.current.focus();
            }
          }
        }}
      />

      <input
        placeholder="•"
        ref={ref3}
        maxLength="1"
        type="number"
        value={otp.slice(3, 4)}
        style={{
          fontSize: 24,
          width: 15,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifySelf: "center",
          textAlign: "center",
          marginRight: 5,
          borderRadius: 5,
          fontSize: 20,
          fontWeight: "bold"
        }}
        onChange={(event) => {
          if (isNumeric(event.target.value)) {
            dispatch(SetOtpAction(otp + event.target.value));
            ref4.current.focus();
          } else {
            if (event.target.value.length > 1) {
              dispatch(SetOtpAction(otp.slice(0, 3) + event.target.value.slice(1, 2) + otp.slice(4)));
              ref4.current.focus();
            } else {
              dispatch(SetOtpAction(otp.slice(0, 3) + otp.slice(4)));
              ref2.current.focus();
            }
          }
        }}
      />

      <input
        placeholder="•"
        ref={ref4}
        maxLength="1"
        type="number"
        value={otp.slice(4, 5)}
        style={{
          fontSize: 24,
          width: 15,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifySelf: "center",
          textAlign: "center",
          marginRight: 5,
          borderRadius: 5,
          fontSize: 20,
          fontWeight: "bold"
        }}
        onChange={(event) => {
          if (isNumeric(event.target.value)) {
            dispatch(SetOtpAction(otp + event.target.value));
            ref5.current.focus();
          } else {
            if (event.target.value.length > 1) {
              dispatch(SetOtpAction(otp.slice(0, 4) + event.target.value.slice(1, 2) + otp.slice(5)));
              ref5.current.focus();
            } else {
              dispatch(SetOtpAction(otp.slice(0, 4) + otp.slice(5)));
              ref3.current.focus();
            }
          }
        }}
      />

      <input
        placeholder="•"
        ref={ref5}
        maxLength="1"
        type="number"
        value={otp.slice(5)}
        style={{
          fontSize: 24,
          width: 15,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifySelf: "center",
          textAlign: "center",
          borderRadius: 5,
          fontSize: 20,
          fontWeight: "bold"
        }}
        onChange={(event) => {
          if (
            event.target.value.length === 1 &&
            isNumeric(event.target.value)
          ) {
            dispatch(SetOtpAction(otp + event.target.value));
            ref5.current.blur();
          } else {
            if (event.target.value.length > 1) {
              dispatch(SetOtpAction(otp.slice(0, 5) + event.target.value.slice(1, 2)));
              ref5.current.blur();
            } else {
              dispatch(SetOtpAction(otp.slice(0, 5)));
              ref4.current.focus();
            }
          }
        }}
      />
    </div>
  );
}