import { Paper, TextField, IconButton, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import useGeoLocation from "../../CustomHooks/useGeoLocation";
import Otp from "./OTP";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SignInWithPhoneNumberHelper } from "../../FirebaseCalls/useAuthHook";

export const PhoneNumberLogin: React.FC = () => {
  const [code, setCode] = useState("");
  const [pno, setPno] = useState("");
  const [otpShow, setOtpShow] = useState(false);
  const [otp, setOtp] = useState("");

  const { countryCode } = useGeoLocation();

  useEffect(() => {
    setCode(countryCode);
  }, [countryCode]);

  function isNumeric(n: any) {
    return !isNaN(parseInt(n)) && isFinite(n);
  }

  return (
    <div>
      <Paper style={{ padding: 20, width: 300 }}>
        <h3 style={{ marginLeft: 10, color: "#9f9f9f", marginTop: 7, marginBottom: 0 }}>
          N E U P L A T F O R M
        </h3>
        <Divider
          variant="middle"
          style={{ marginBottom: 10, marginTop: 10, backgroundColor: "black"}}
        />
        <h5 style={{ color: "black", letterSpacing: 2, marginTop: 0, fontSize: 12, marginBottom: 60 }}>
          Real People | Anonymous Chat
        </h5>
        
        {!otpShow ? <h3>Enter your Phone Number</h3> : <h3>Enter the OTP</h3>}
        <div>
          {!otpShow ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  alignItems: "flex-end",
                  justifyContent: "center",
                  display: "flex",
                  marginRight: 10,
                  width: 60,
                }}
              >
                <TextField
                  id="code"
                  label="Code"
                  color="secondary"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                />
              </div>
              <div>
                <TextField
                  id="phone"
                  label="Phone"
                  color="secondary"
                  value={pno}
                  onChange={(e) => {
                    if (
                      (e.target.value[e.target.value.length - 1] >= "0" &&
                        e.target.value[e.target.value.length - 1] <= "9") ||
                      !e.target.value
                    ) {
                      setPno(e.target.value);
                    }
                  }}
                  inputProps={{ maxLength: 10 }}
                />
              </div>
            </div>
          ) : (
            <Otp otp={otp} setOtp={(val: any) => setOtp(val)} />
          )}
          {otpShow ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 5,
                fontSize: 13,
              }}
            >
              Didn't receive an OTP?{" "}
              <Button
                onClick={() => null}
                color="primary"
                style={{ textTransform: "none", fontSize: 13 }}
              >
                Resend OTP
              </Button>
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 20,
              marginRight: 15,
              marginLeft: 15,
            }}
          >
            <IconButton
              onClick={() => {
                setOtpShow(false);
                setOtp("");
              }}
              size="small"
              style={{ fontSize: 15 }}
            >
              <ArrowBackIcon
                style={{ width: 18, height: 18, marginRight: 5 }}
              />
              PhoneNumber
            </IconButton>

            <Button
              variant="contained"
              disabled={
                pno.length !== 10 ||
                code === null ||
                !isNumeric(pno) ||
                (otpShow && otp.length !== 6)
              }
              color="secondary"
              style={{
                color: "white",
                marginLeft: "auto",
                textTransform: "none",
              }}
              onClick={() => {
                if (otpShow) {
                  // VerifyOtp(otp)
                } else {
                  SignInWithPhoneNumberHelper(countryCode + "" + pno)
                }
              }}
            >
              Verify
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};
