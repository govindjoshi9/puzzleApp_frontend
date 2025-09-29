import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import loaderMessages from "../data/loader.json";
import { useAppSelector } from "../redux/hookStore";

function Loader() {
  const { isLoading } = useAppSelector((state) => state.loader);
  const [tip, setTip] = useState("");
  const [loadingText, setLoadingText] = useState("Loading");

  function getCssVar(variable: string) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variable)
      .trim();
  }

  const clrPrimary = getCssVar("--color-clr-primary-teal");

  useEffect(() => {
    if (isLoading) {
      setTip(loaderMessages[Math.floor(Math.random() * loaderMessages.length)]);

      const dots = ["", ".", "..", "..."];
      let index = 0;

      const interval = setInterval(() => {
        setLoadingText(`Loading${dots[index]}`);
        index = (index + 1) % dots.length;
      }, 400);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-99 flex flex-col items-center justify-center px-4 pointer-events-none select-none"
          style={{
            backgroundColor: "rgba(0,0,0,0.2)",
            backdropFilter: "blur(6px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            {/* Spinner */}
            <div
              className="w-12 h-12 sm:w-16 sm:h-16 border-[3px] sm:border-4 rounded-full animate-spin"
              style={{
                borderColor: clrPrimary,
                borderTopColor: "transparent",
              }}
            />
            {/* Loading text */}
            <p
              className="text-size-base font-semibold select-none"
              style={{ color: clrPrimary }}
            >
              {loadingText}
            </p>
          </motion.div>

          {/* Tip text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-8 sm:bottom-10 text-size-sm italic max-w-xs sm:max-w-md text-center select-none px-4"
            style={{ color: clrPrimary }}
          >
            {tip}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default React.memo(Loader);
