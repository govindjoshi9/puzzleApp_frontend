import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { routeHome } from "../../utils/Routes";

const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function PaymentSuccess() {
    const navigate = useNavigate();

    return (
        <motion.div
            className="w-full min-h-screen flex items-center justify-center bg-clr-neutral-light-gray p-4"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
        >
            <div className="max-w-md w-full bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8 text-center space-y-6 text-clr-primary-teal font-body">

                <div className="flex justify-center">
                    <CheckCircle2 className="w-16 h-16 text-green-700" />
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-clr-primary-teal">
                    Thank You
                </h1>

                <p className="text-base sm:text-lg text-clr-primary-teal/90">
                    Your entry has been recorded.
                </p>

                <div className="mt-4">
                    <button
                        className="bg-clr-primary-teal hover:bg-clr-primary-teal-2 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition-colors"
                        onClick={() => navigate(routeHome)}
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default React.memo(PaymentSuccess);