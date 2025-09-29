import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Facebook, Twitter, Globe } from "lucide-react";

const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const socialLinks = [
    { icon: Linkedin, url: "https://www.linkedin.com/in/dhiraj-karangale-464ab91bb/", title: "LinkedIn" },
    { icon: Github, url: "https://github.com/DhirajKarangale", title: "GitHub" },
    { icon: Globe, url: "https://dhirajkarangale.netlify.app/", title: "Portfolio" },
    { icon: Facebook, url: "https://www.facebook.com/dhiraj.karangale.02/", title: "Facebook" },
    { icon: Twitter, url: "https://x.com/dhirajkarangale", title: "Twitter/X" },
];

function About() {
    return (
        <motion.div
            className="w-full h-full flex items-center justify-center bg-clr-neutral-light-gray p-4"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
        >
            <div className="max-w-3xl w-full bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8 space-y-6 text-clr-primary-teal font-body">

                <h1 className="text-3xl sm:text-4xl font-bold text-center text-clr-primary-teal">
                    Dhiraj Karangale
                </h1>

                <p className="text-base sm:text-lg text-clr-primary-teal/90 leading-relaxed text-justify">
                    Full Stack Developer with 1 year of experience specializing in the MERN stack. Proficient in modern React (Hooks, Redux Toolkit), backend development with Node.js, and secure authentication using JWT. Experienced in both NoSQL and relational databases, including PostgreSQL, with a strong focus on data modeling and API security. Skilled in building responsive UI/UX, optimizing performance, and delivering scalable end-to-end products. Contributed to apps with 160K+ downloads on the Play Store. HackWithInfy Finalist passionate about creating impactful, user-centric solutions.
                </p>

                <div className="grid grid-cols-3 sm:flex justify-center gap-6 mt-4">
                    {socialLinks.map(({ icon: Icon, url, title }) => (
                        <a
                            key={title}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={title}
                            className="text-clr-primary-teal hover:text-clr-primary-teal-2 transition-colors"
                        >
                            <Icon size={28} />
                        </a>
                    ))}
                </div>

            </div>
        </motion.div>
    );
}

export default React.memo(About);