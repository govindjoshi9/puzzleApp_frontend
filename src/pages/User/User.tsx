import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import { Save, X } from "lucide-react";

import { urlUser, urlOTP } from "../../api/APIs";
import { getRequest, putRequest } from "../../api/APIManager";

import { type User } from "../../models/modelUser";
import { setUser, clearUser } from '../../redux/sliceUser';
import { setLoader } from '../../redux/sliceLoader';
import { setMessageBar } from '../../redux/sliceMessageBar';
import { useAppDispatch, useAppSelector } from '../../redux/hookStore';

import { routeAuth } from '../../utils/Routes';
import GetMessage from "../../utils/MessagesManager";

import { motion } from "framer-motion";

type EditableField = "username" | "email" | "about";

function User() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const reduxUser = useAppSelector(state => state.user);
    const [user, setUserData] = useState<User | null>(reduxUser);

    const [editField, setEditField] = useState<EditableField | null>(null);

    const [fieldValues, setFieldValues] = useState({
        username: "",
        email: "",
        otp: "",
        about: ""
    });

    useEffect(() => {
        setUserData(reduxUser);
    }, [reduxUser]);

    useEffect(() => {
        if (!user) return;
        setFieldValues({
            username: user.username || "",
            email: user.email || "",
            otp: "",
            about: user.about || ""
        });
    }, [user]);

    const fadeIn = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    const clrSuccess = useMemo(() => getComputedStyle(document.documentElement).getPropertyValue("--color-clr-success").trim(), []);
    const clrError = useMemo(() => getComputedStyle(document.documentElement).getPropertyValue("--color-clr-error").trim(), []);

    const ShowMsg = (message: string, color?: string) => dispatch(setMessageBar({ message, color }));
    const ShowLoader = (isLoading: boolean) => dispatch(setLoader({ isLoading }));
    const SetUser = (user: User) => { dispatch(setUser(user)); setUserData(user); };
    const ClearUser = () => { dispatch(clearUser()); setUserData(null); };
    const ButtonSetEditingField = (field: EditableField) => setEditField(field);

    const ButtonCancel = () => {
        setEditField(null);
        if (user) {
            setFieldValues({
                username: user.username || "",
                email: user.email || "",
                otp: "",
                about: user.about || ""
            });
        }
    };

    const ButtonLogout = () => {
        ClearUser();
        localStorage.removeItem('token');
        ShowMsg(GetMessage('logoutSuccess'), clrSuccess);
        navigate(routeAuth);
    };

    const ButtonSave = async (field: EditableField) => {
        const body: any = {};
        const value = fieldValues[field];
        if (!value) return;

        if (field === "username") {
            if (value.length < 2) return ShowMsg(GetMessage('userNameLess'), clrError);
            if (value.length > 20) return ShowMsg(GetMessage('userNameLarge'), clrError);
            body.username = value;
        }

        if (field === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) return ShowMsg(GetMessage('emailInvalid'), clrError);
            body.email = value;
            body.otp = fieldValues.otp;
        }

        if (field === "about") {
            if (value.length < 5) return ShowMsg(GetMessage('aboutLess'), clrError);
            if (value.length > 500) return ShowMsg(GetMessage('aboutLarge'), clrError);
            body.about = value;
        }

        ShowLoader(true);
        const { data, error } = await putRequest<User>(urlUser, body);
        ShowLoader(false);

        if (data) {
            SetUser(data);
            ShowMsg(`${field.charAt(0).toUpperCase() + field.slice(1)} updated`, clrSuccess);
            setEditField(null);
        } else ShowMsg(error, clrError);
    };

    const ButtonOTP = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!fieldValues.email || !emailRegex.test(fieldValues.email)) return ShowMsg(GetMessage("emailInvalid"), clrError);

        ShowLoader(true);
        const { data, error } = await getRequest<string>(`${urlOTP}?email=${fieldValues.email}`);
        ShowLoader(false);

        if (data) ShowMsg(data, clrSuccess);
        else ShowMsg(error, clrError);
    };

    if (!user) return <p className="text-center text-clr-primary-teal mt-10">Loading user info...</p>;

    return (
        <motion.div className="w-full px-4 sm:px-6 lg:px-8 mt-5" initial="hidden" animate="visible" variants={fadeIn}>
            <motion.div className="w-full max-w-2xl mx-auto bg-white/5 backdrop-blur-md text-clr-primary-teal rounded-2xl shadow-lg p-6 space-y-4 select-none font-body"
                initial="hidden" animate="visible" variants={fadeIn}>

                {/* Username */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex items-center gap-2 h-[40px] w-full">
                            {editField === "username" ? (
                                <>
                                    <input
                                        className="bg-white/10 text-clr-primary-teal text-xl sm:text-2xl font-bold rounded-xl h-full py-1 px-3 focus:outline-none placeholder:text-clr-primary-teal w-full sm:max-w-[80%]"
                                        type="text"
                                        value={fieldValues.username}
                                        onChange={(e) => setFieldValues({ ...fieldValues, username: e.target.value })}
                                        placeholder="Enter username"
                                    />
                                    <button onClick={() => ButtonSave("username")} className="text-clr-primary-teal hover:text-clr-primary-teal-2"><Save size={18} /></button>
                                    <button onClick={ButtonCancel} className="text-red-500 hover:text-red-400"><X size={18} /></button>
                                </>
                            ) : (
                                <h2 className="text-2xl font-bold cursor-pointer w-full h-full flex items-center select-text text-clr-primary-teal" onClick={() => ButtonSetEditingField("username")}>
                                    {user.username}
                                </h2>
                            )}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full mt-2">
                            {editField === "email" ? (
                                <>
                                    <input
                                        className="bg-white/10 text-clr-primary-teal text-sm rounded-xl py-1 px-2 focus:outline-none w-full sm:flex-grow placeholder:text-clr-primary-teal"
                                        value={fieldValues.email}
                                        type="email"
                                        onChange={(e) => setFieldValues({ ...fieldValues, email: e.target.value })}
                                        placeholder="Enter email"
                                    />
                                    <input
                                        type="number"
                                        value={fieldValues.otp}
                                        onChange={(e) => setFieldValues({ ...fieldValues, otp: e.target.value })}
                                        placeholder="123456"
                                        className="bg-white/10 text-clr-primary-teal text-sm rounded-xl py-1 px-2 w-full sm:w-24 placeholder:text-clr-primary-teal-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <div className="flex gap-2">
                                        <button onClick={ButtonOTP} className="bg-clr-neutral-light-gray hover:bg-clr-primary-teal-2 text-clr-primary-teal placeholder-clr-primary-teal-2 text-xs font-semibold py-1 px-3 rounded-xl sm:ml-1">
                                            Send OTP
                                        </button>
                                        <button onClick={() => ButtonSave("email")} className="text-clr-primary-teal hover:text-clr-primary-teal-2"><Save size={18} /></button>
                                        <button onClick={ButtonCancel} className="text-red-400 hover:text-red-300"><X size={18} /></button>
                                    </div>
                                </>
                            ) : (
                                <p className="text-sm text-clr-primary-teal cursor-pointer w-full h-full flex items-center select-text" onClick={() => ButtonSetEditingField("email")}>
                                    {user.email}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {editField === "about" ? (
                    <div className="relative mt-2">
                        <textarea
                            className="custom-scroll w-full bg-white/10 text-clr-primary-teal text-sm rounded-xl p-3 h-32 resize-y focus:outline-none placeholder:text-clr-primary-teal-2"
                            value={fieldValues.about}
                            onChange={(e) => setFieldValues({ ...fieldValues, about: e.target.value })}
                            placeholder="Write something about yourself..."
                        />
                        <div className="flex justify-end gap-2 mt-2">
                            <button onClick={() => ButtonSave("about")} className="text-clr-primary-teal hover:text-clr-primary-teal-2"><Save size={18} /></button>
                            <button onClick={ButtonCancel} className="text-red-400 hover:text-red-300"><X size={18} /></button>
                        </div>
                    </div>
                ) : (
                    <div
                        className="custom-scroll max-h-40 overflow-y-auto rounded-2xl bg-white/5 p-4 text-sm text-clr-primary-teal border border-white/10 cursor-pointer select-text break-words mt-2"
                        onClick={() => ButtonSetEditingField("about")}
                    >
                        {user.about || 'No about info provided.'}
                    </div>
                )}

                <hr className="border-white/10" />

                <div className="flex justify-between items-center text-xs text-clr-primary-teal">
                    <span>Joined on {new Date(user.created_at).toLocaleDateString()}</span>
                    <button className="text-red-400 hover:text-clr-accent-gold-2 transition-all" onClick={ButtonLogout}>
                        Logout
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default React.memo(User);