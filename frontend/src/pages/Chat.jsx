import PDFViewerModal from "../components/PDFViewerModal";
import { useState, useRef, useEffect } from "react";
import api from "../services/api";

import ChatBubble from "../components/ChatBubble";
import MessageInput from "../components/MessageInput";
import TypingIndicator from "../components/TypingIndicator";

export default function Chat() {

    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
const [selectedPage, setSelectedPage] = useState(1);
    const messagesEndRef = useRef(null);
    useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
    });
}, [messages, loading]);
    const sendQuestion = async () => {

        if (!question.trim()) return;

        const userMessage = {
            role: "user",
            text: question
        };

        setMessages(prev => [...prev, userMessage]);

        setLoading(true);

        try {

            const response = await api.post(
                "/chat",
                {
                    question
                }
            );

        setMessages(prev => [
    ...prev,
    {
        role: "assistant",
        text: response.data.answer,
        sources: response.data.sources
    }
]);

        } catch {

            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    text: "Unable to contact KnowForge AI."
                }
            ]);

        }

        setQuestion("");
        setLoading(false);

    };

    return (

        <div className="bg-slate-900 text-white min-h-screen flex flex-col">

            {/* Header */}

            <div className="border-b border-slate-800 px-8 py-5">

                <h1 className="text-3xl font-bold">

                    KnowForge AI Assistant

                </h1>

                <p className="text-slate-400 mt-2">

                  Ask questions about your uploaded knowledge base.

                </p>

            </div>

            {/* Chat Area */}

            <div className="flex-1 overflow-y-auto px-8 py-8">

                {messages.length === 0 && (

                    <div className="flex flex-wrap justify-center gap-4 mt-10">

<button
onClick={() => setQuestion("What are the expected deliverables?")}
className="bg-slate-800 hover:bg-slate-700 px-5 py-3 rounded-xl"
>
📘 What are the expected deliverables?
</button>

<button
onClick={() => setQuestion("What technologies are suggested?")}
className="bg-slate-800 hover:bg-slate-700 px-5 py-3 rounded-xl"
>
⚙️ Suggested technologies
</button>

<button
onClick={() => setQuestion("What is the evaluation criteria?")}
className="bg-slate-800 hover:bg-slate-700 px-5 py-3 rounded-xl"
>
📊 Evaluation criteria
</button>

<button
onClick={() => setQuestion("What problem is described in the uploaded documents?")}
className="bg-slate-800 hover:bg-slate-700 px-5 py-3 rounded-xl"
>
🧠 Explain uploaded document
</button>

</div>

                )}

                {messages.map((message, index) => (

                    <ChatBubble
    key={index}
    message={message}
    onViewSource={(file, page) => {
        setSelectedFile(file);
        setSelectedPage(page);
    }}
/>

                ))}

                {loading && <TypingIndicator />}
                 <div ref={messagesEndRef}></div>
            </div>

            {/* Input */}

            <div className="border-t border-slate-800 p-6">

                <MessageInput

                    question={question}

                    setQuestion={setQuestion}

                    sendQuestion={sendQuestion}

                    loading={loading}

                />

            </div>
           <PDFViewerModal
    file={selectedFile}
    initialPage={selectedPage}
    isOpen={selectedFile !== null}
    onClose={() => setSelectedFile(null)}
/>
        </div>

    );

}