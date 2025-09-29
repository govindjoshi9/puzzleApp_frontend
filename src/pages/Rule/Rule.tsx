import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Facebook, Instagram, Twitter, Music, Youtube, type LucideIcon } from "lucide-react";

const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

type SocialIconProps = {
    Icon: LucideIcon;
    link: string;
    title: string;
};

const SocialIcon: React.FC<SocialIconProps> = ({ Icon, link, title }) => (
    <a href={link} target="_blank" rel="noopener noreferrer" title={title}>
        <Icon className="text-clr-primary-teal hover:text-clr-primary-teal-2 transition-colors" size={24} />
    </a>
);

function Rules() {
    const socialLinks = [
        { Icon: Linkedin, link: "https://www.linkedin.com/in/dhiraj-karangale-464ab91bb/", title: "LinkedIn" },
        { Icon: Facebook, link: "https://www.facebook.com/dhiraj.karangale.02/", title: "Meta" },
        { Icon: Instagram, link: "https://www.instagram.com/dhiraj_karangale/", title: "Instagram" },
        { Icon: Twitter, link: "https://x.com/dhirajkarangale", title: "Twitter/X" },
        { Icon: Music, link: "https://www.instagram.com/dhiraj_karangale/", title: "TikTok" },
        { Icon: Youtube, link: "https://www.youtube.com/@dhirajkarangale", title: "YouTube" },
    ];

    return (
        <motion.div
            className="w-full px-4 sm:px-6 lg:px-8 mt-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
        >
            <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-sm text-clr-primary-teal rounded-2xl shadow-lg p-6 sm:p-8 space-y-6">
                <h1 className="text-3xl font-bold text-clr-primary-teal text-size-xl text-center">
                    Puzzle Challenge - Contest Rules
                </h1>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Judging Formula</h2>
                    <p className="text-base">
                        Accuracy and skill will be judged as follows:
                    </p>
                    <ul className="list-disc list-inside text-base space-y-1">
                        <li>AI: 1/3</li>
                        <li>Expert Review: 1/3</li>
                        <li>Community Voting: 1/3</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Important Notice</h2>
                    <p className="text-base">
                        This is a skill-based contest. No element of chance or lottery is
                        involved. Use of AI tools is at your own risk. Random sample checks
                        may occur. Confirmed AI use may lead to disqualification and
                        reversal of winnings. By participating, you confirm you are not and
                        will not be using AI for this contest.
                    </p>
                </section>

                <footer className="grid grid-cols-3 sm:flex justify-center gap-6 mt-6">
                    {socialLinks.map(({ Icon, link, title }) => (
                        <SocialIcon key={title} Icon={Icon} link={link} title={title} />
                    ))}
                </footer>
            </div>
        </motion.div>
    );
}

export default React.memo(Rules);