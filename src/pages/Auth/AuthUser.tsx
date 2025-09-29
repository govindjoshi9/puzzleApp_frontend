import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GetMessage from "../../utils/MessagesManager";
import { type User } from "../../models/modelUser";

type AuthUserProps = {
    ShowMsg: (msg: string, color?: string) => void;
    SetUser: (user: User) => void;
    user: User;
};

const inputStyleClass =
    "w-full p-3 text-size-base rounded-md border border-clr-neutral-light-gray focus:outline-none focus:ring-2 focus:ring-clr-primary-teal bg-white text-clr-primary-teal placeholder-clr-primary-teal-2";

const containerVariants = {
    initial: { opacity: 0, scale: 0.8, x: 200 },
    animate: { opacity: 1, scale: 1, x: 0 },
    exit: { opacity: 0, scale: 0.8, x: -200 },
};

function AuthUser({ ShowMsg, SetUser, user }: AuthUserProps) {
    const [about, setAbout] = useState<string>(user.about);
    const [username, setUsername] = useState<string>(user.username);
    const [isExiting, setIsExiting] = useState(false);

    function getCssVar(variable: string) {
        return getComputedStyle(document.documentElement)
            .getPropertyValue(variable)
            .trim();
    }
    const clrError = getCssVar("--color-clr-error");

    function Validate(): boolean {
        if (!username) {
            ShowMsg(GetMessage("usernameMandatory"), clrError);
            return false;
        }
        if (username.length < 2) {
            ShowMsg(GetMessage("userNameLess"), clrError);
            return false;
        } else if (username.length > 20) {
            ShowMsg(GetMessage("userNameLarge"), clrError);
            return false;
        }
        if (about) {
            if (about.length < 5) {
                ShowMsg(GetMessage("aboutLess"), clrError);
                return false;
            } else if (about.length > 1000) {
                ShowMsg(GetMessage("aboutLarge"), clrError);
                return false;
            }
        }
        return true;
    }

    function ButtonContinue() {
        if (!Validate()) return;
        setIsExiting(true);
        const updatedUser = { ...user, about, username };
        setTimeout(() => SetUser(updatedUser), 500);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none select-none px-2 sm:px-0">
            <AnimatePresence>
                {!isExiting && (
                    <motion.div
                        key="auth-user"
                        variants={containerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="card pointer-events-auto relative overflow-hidden w-[90%] sm:w-96 px-4 sm:px-6 pt-6 pb-6"
                    >
                        <div className="px-1">
                            <label
                                htmlFor="username"
                                className="block text-clr-primary-teal text-size-base font-semibold mb-2"
                            >
                                Enter Your Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="jaadu"
                                className={inputStyleClass}
                            />
                        </div>

                        {/* About */}
                        <div className="px-1 mt-4">
                            <label
                                htmlFor="about"
                                className="block text-clr-primary-teal text-size-base font-semibold mb-2"
                            >
                                About
                            </label>
                            <textarea
                                id="about"
                                onChange={(e) => setAbout(e.target.value)}
                                placeholder="I am an Alien"
                                value={about}
                                rows={5}
                                className={`${inputStyleClass} max-h-48 overflow-y-auto resize-none custom-scroll`}
                            />
                        </div>

                        <div className="px-1 mt-6 flex justify-center">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.03 }}
                                onClick={ButtonContinue}
                                className="btn-primary bg-clr-neutral-light-gray text-clr-primary-teal"
                            >
                                Continue
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default React.memo(AuthUser);