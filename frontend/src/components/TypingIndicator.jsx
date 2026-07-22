import { useEffect, useState } from "react";
import { FaRobot, FaSearch, FaFileAlt, FaBrain } from "react-icons/fa";

export default function TypingIndicator() {

    const [step, setStep] = useState(0);

    const steps = [
        {
            icon: <FaSearch className="text-blue-400" />,
            text: "Searching relevant documents..."
        },
        {
            icon: <FaFileAlt className="text-amber-400" />,
            text: "Reading PDF knowledge..."
        },
        {
            icon: <FaBrain className="text-emerald-400" />,
            text: "Generating AI response..."
        }
    ];

    useEffect(() => {

        const interval = setInterval(() => {

            setStep(prev => (prev + 1) % steps.length);

        }, 1200);

        return () => clearInterval(interval);

    }, []);

    return (

        <div className="flex gap-3 mb-6">

            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">

                <FaRobot className="text-white"/>

            </div>

            <div className="bg-slate-800 rounded-2xl px-5 py-4 shadow-lg border border-slate-700 min-w-[320px]">

                <div className="flex items-center gap-3">

                    {steps[step].icon}

                    <span className="text-slate-200">

                        {steps[step].text}

                    </span>

                </div>

                <div className="flex gap-1 mt-3 ml-7">

                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:150ms]"></span>
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:300ms]"></span>

                </div>

            </div>

        </div>

    );

}