import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { routeHome } from "../../utils/Routes";

const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function PaymentFail() {
    const navigate = useNavigate();
    const [counter, setCounter] = useState(5);

    useEffect(() => {
        if (counter === 0) {
            window.location.href = "/";
            return;
        }
        const timer = setTimeout(() => setCounter((prev) => prev - 1), 1000);
        return () => clearTimeout(timer);
    }, [counter]);

    return (
        <motion.div
            className="w-full min-h-screen flex items-center justify-center bg-clr-neutral-light-gray p-4"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
        >
            <div className="max-w-md w-full bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8 text-center space-y-6 text-clr-primary-teal font-body">

                <div className="flex justify-center">
                    <XCircle className="w-16 h-16 text-red-500" />
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-red-500">
                    Payment Failed
                </h1>

                <p className="text-base sm:text-lg text-clr-primary-teal/90">
                    Going to home page in <span className="font-bold">{counter}</span> sec...
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

export default React.memo(PaymentFail);