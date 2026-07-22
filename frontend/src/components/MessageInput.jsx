import { FaPaperPlane } from "react-icons/fa";

export default function MessageInput({

    question,
    setQuestion,
    sendQuestion,
    loading

}) {

    return (

        <div className="flex gap-3">

            <input

                value={question}

                onChange={(e)=>setQuestion(e.target.value)}

                onKeyDown={(e)=>{

                    if(e.key==="Enter"){

                        sendQuestion();

                    }

                }}

                placeholder="Ask a question about your uploaded knowledge base..."

                className="flex-1 rounded-xl bg-slate-800 border border-slate-700 text-white px-5 py-4 outline-none"

            />

            <button

                onClick={sendQuestion}

                disabled={loading}

                className="bg-blue-600 hover:bg-blue-700 px-6 rounded-xl text-white"

            >

                <FaPaperPlane/>

            </button>

        </div>

    );

}