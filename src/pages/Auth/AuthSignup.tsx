import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import GetMessage from "../../utils/MessagesManager";
import { urlOTP } from "../../api/APIs";
import { getRequest, postRequest } from "../../api/APIManager";
import { type UserData, type User } from "../../models/modelUser";

type AuthSignupProps = {
  ShowMsg: (msg: string, color?: string) => void;
  SetUser: (user: User) => void;
  SetLoader: (isLoading: boolean) => void;
};

const AuthSignup = ({ ShowMsg, SetUser, SetLoader }: AuthSignupProps) => {
  const [isOtp, setIsOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const [email, setEmail] = useState("");
  const [isExiting, setIsExiting] = useState(false);

  const variants = {
    initial: { opacity: 0, scale: 0.8, x: 200 },
    animate: { opacity: 1, scale: 1, x: 0 },
    exit: { opacity: 0, scale: 0.8, x: -200 },
  };

  function getCssVar(variable: string) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variable)
      .trim();
  }

  const clrSuccess = getCssVar("--color-clr-success");
  const clrError = getCssVar("--color-clr-error");

  const inputStyle =
    "w-full p-3 text-size-sm rounded-md border border-clr-neutral-light-gray focus:outline-none focus:ring-2 focus:ring-clr-primary-teal bg-white text-clr-primary-teal placeholder-clr-primary-teal-2";

  async function ButtonContinue() {
    if (!otp || otp.length < 1) return ShowMsg(GetMessage("otpInvalid"), clrError);

    SetLoader(true);
    const { data, error } = await postRequest<UserData>(urlOTP, { email, otp });

    if (data) {
      localStorage.setItem("token", data.token);
      ShowMsg(GetMessage("otpVerified"), clrSuccess);
      setIsExiting(true);
      setTimeout(() => SetUser(data.user), 500);
    } else {
      ShowMsg(error, clrError);
    }

    SetLoader(false);
  }

  async function ButtonOTP() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return ShowMsg(GetMessage("emailInvalid"), clrError);

    SetLoader(true);
    const { data, error } = await getRequest<string>(`${urlOTP}?email=${email}`);

    if (data) {
      setIsOTP(true);
      ShowMsg(data, clrSuccess);
    } else {
      ShowMsg(error, clrError);
    }

    SetLoader(false);
  }

  return (
    <div className="absolute inset-0 h-screen overflow-y-auto flex items-center justify-center z-10 pointer-events-none select-none">
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            key="auth-modal"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-[90%] sm:w-96 px-4 sm:px-6 pt-6 pb-6 card pointer-events-auto relative overflow-hidden"
          >
            <div className="px-1">
              <label
                htmlFor="email"
                className="block text-clr-primary-teal text-size-base font-semibold mb-2"
              >
                Enter Your Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jaadu@titan.com"
                className={inputStyle}
              />
            </div>

            <AnimatePresence>
              {isOtp && (
                <motion.div
                  key="otp-input"
                  initial={{ opacity: 0, y: -20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto", marginTop: 16 }}
                  exit={{ opacity: 0, y: -20, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="px-1"
                  style={{ overflow: "visible", paddingBottom: "0.25rem" }}
                >
                  <label
                    htmlFor="otp"
                    className="block text-clr-primary-teal text-size-base font-semibold mb-2"
                  >
                    Enter OTP
                  </label>
                  <input
                    type="number"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                    placeholder="123456"
                    className={`${inputStyle} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="px-1 py-3 sm:py-0 mt-6 w-full flex flex-col-reverse sm:flex-row gap-4 sm:gap-3 sm:justify-between items-center">
              <button onClick={ButtonOTP} className="btn-ghost bg-clr-neutral-light-gray">
                {isOtp ? "Resend OTP" : "Send OTP"}
              </button>

              <AnimatePresence>
                {isOtp && (
                  <motion.button
                    key="continue-btn"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    onClick={ButtonContinue}
                    className="btn-primary bg-clr-neutral-light-gray text-clr-primary-teal"
                  >
                    Continue
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(AuthSignup);