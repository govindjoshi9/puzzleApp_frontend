import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from '../../redux/hookStore';
import { useNavigate } from 'react-router-dom';
import { routePaymentFail } from "../../utils/Routes";

import { urlPayment } from "../../api/APIs";
import { postRequest } from "../../api/APIManager";

const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function Home() {
    const navigate = useNavigate();
    const reduxUser = useAppSelector(state => state.user);
    const [consentChecked, setConsentChecked] = useState<boolean>(false);

    async function Pay() {
        try {
            const id = 'price_1SCaYWK8pR7H1RDNHK3CeQkD';
            const body = JSON.stringify({ id });
            const { data } = await postRequest<{ url: string }>(urlPayment, body);
            if (data?.url) {
                window.location.href = data.url;
            } else {
                navigate(routePaymentFail);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <motion.div
            className="w-full h-full flex items-center justify-center bg-clr-neutral-light-gray p-4"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
        >
            <div className="max-w-md w-full bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8 space-y-6 text-clr-primary-teal">

                <h1 className="text-3xl sm:text-4xl font-bold text-center text-clr-primary-teal">
                    Puzzle Challenge
                </h1>

                <p className="text-center text-lg sm:text-xl font-medium">
                    Entries: {reduxUser?.entriescount || 0}
                </p>

                <div className="flex items-start gap-3">
                    <input
                        type="checkbox"
                        id="consent"
                        className="mt-1 w-5 h-5 accent-clr-primary-teal"
                        checked={consentChecked}
                        onChange={(e) => setConsentChecked(e.target.checked)}
                    />
                    <label htmlFor="consent" className="text-sm sm:text-base text-clr-primary-teal/90">
                        I confirm this is a skill-based contest. I am not using AI tools and will not use them during the contest. I understand that random checks may occur, and confirmed AI use may lead to disqualification and reversal of winnings.
                    </label>
                </div>

                <button
                    className={`w-full py-3 rounded-xl text-white font-semibold text-lg sm:text-xl transition-colors 
              ${consentChecked ? "bg-clr-primary-teal hover:bg-clr-primary-teal-2" : "bg-gray-400 cursor-not-allowed"}`}
                    disabled={!consentChecked}
                    onClick={() => Pay()}
                >
                    Pay $10 to Enter
                </button>
            </div>
        </motion.div>
    );
}

export default React.memo(Home);