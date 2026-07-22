import ReactMarkdown from "react-markdown";
import { FaRobot, FaUser, FaFileAlt } from "react-icons/fa";

export default function ChatBubble({
    message,
    onViewSource,
}) {

    const isUser = message.role === "user";

    return (

        <div
            className={`flex gap-3 mb-6 ${
                isUser ? "justify-end" : "justify-start"
            }`}
        >

            {!isUser && (
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                    <FaRobot className="text-white" />
                </div>
            )}

            <div
                className={`max-w-3xl rounded-2xl px-5 py-4 shadow-lg ${
                    isUser
                        ? "bg-blue-600 text-white"
                        : "bg-slate-800 text-slate-100"
                }`}
            >

                <ReactMarkdown>
                    {message.text}
                </ReactMarkdown>

                {!isUser && message.sources && (

                    <div className="mt-6 border-t border-slate-700 pt-4">

                        <h4 className="text-sm font-semibold text-slate-300 mb-3">

                            📄 Sources

                        </h4>

                        {message.sources.slice(0, 3).map((source, index) => (

                            <div
    key={index}
    className="bg-slate-900 border border-slate-700 rounded-2xl p-4 mb-4 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
>

    <div className="flex justify-between items-start">

        <div>

            <div className="flex items-center gap-2">

                <FaFileAlt className="text-blue-400"/>

                <span className="font-semibold text-white">

                    {source.file}

                </span>

            </div>

            <p className="text-sm text-slate-400 mt-3">

                📍 Page {source.page}

            </p>

        </div>

        <div className="bg-emerald-900/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold">

            {source.similarity ?? 0}% Match

        </div>

    </div>

    <div className="border-t border-slate-700 mt-4 pt-3">

       <button
    onClick={() =>
        onViewSource(
            source.file,
            source.page
        )
    }
    className="text-blue-400 hover:text-blue-300 text-sm font-medium"
>
    View Source →
</button>

    </div>

</div>

                        ))}

                    </div>

                )}

            </div>

            {isUser && (
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                    <FaUser className="text-white" />
                </div>
            )}

        </div>

    );

}