import PDFViewerModal from "../components/PDFViewerModal";
import { useEffect, useState } from "react";
import api from "../services/api";
import {
    FaFilePdf,
    FaBook,
    FaLayerGroup,
    FaClock,
    FaEye,
    FaTrash
} from "react-icons/fa";

export default function Knowledge() {

    const [documents, setDocuments] = useState([]);
    const [selectedFile, setSelectedFile] = useState("");
const [isViewerOpen, setIsViewerOpen] = useState(false);
    useEffect(() => {

        fetchDocuments();

    }, []);

 const fetchDocuments = async () => {
    try {

        const res = await api.get("/documents");

        setDocuments(res.data);

    } catch (err) {

        console.error(err);

    }
};
    const deleteDocument = async (filename) => {
    try {

        await api.delete(`/documents/${encodeURIComponent(filename)}`);

        fetchDocuments();

    } catch (err) {

        console.error(err);

    }
}; 
    const totalPages = documents.reduce(
        (sum, doc) => sum + doc.pages,
        0
    );

    const totalChunks = documents.reduce(
        (sum, doc) => sum + doc.chunks,
        0
    );

    return (

        <div className="p-8 text-white">

            <h1 className="text-3xl font-bold mb-8">

                Knowledge Base

            </h1>

            {/* Stats */}

            <div className="grid grid-cols-3 gap-6 mb-10">

                <div className="bg-slate-800 rounded-2xl p-6">

                    <h2 className="text-slate-400">

                        Documents

                    </h2>

                    <p className="text-3xl font-bold mt-2">

                        {documents.length}

                    </p>

                </div>

                <div className="bg-slate-800 rounded-2xl p-6">

                    <h2 className="text-slate-400">

                        Total Pages

                    </h2>

                    <p className="text-3xl font-bold mt-2">

                        {totalPages}

                    </p>

                </div>

                <div className="bg-slate-800 rounded-2xl p-6">

                    <h2 className="text-slate-400">

                        Knowledge Chunks

                    </h2>

                    <p className="text-3xl font-bold mt-2">

                        {totalChunks}

                    </p>

                </div>

            </div>

            {/* Documents */}

            <div className="space-y-5">

                {documents.map((doc, index) => (

                    <div
                        key={index}
                        className="bg-slate-800 rounded-2xl border border-slate-700 hover:border-blue-500 transition p-6"
                    >

                        <div className="flex justify-between">

                            <div>

                                <div className="flex items-center gap-3">

                                    <FaFilePdf className="text-red-500 text-2xl"/>

                                    <h2 className="text-xl font-semibold">

                                        {doc.name}

                                    </h2>

                                </div>

                                <div className="flex gap-8 mt-5 text-slate-300">

                                    <span className="flex items-center gap-2">

                                        <FaBook />

                                        {doc.pages} Pages

                                    </span>

                                    <span className="flex items-center gap-2">

                                        <FaLayerGroup />

                                        {doc.chunks} Chunks

                                    </span>

                                    <span className="flex items-center gap-2">

                                        <FaClock />

                                        {doc.uploaded}

                                    </span>

                                </div>

                            </div>

                            <div className="flex gap-3">

                               <button
    onClick={() => {
        setSelectedFile(doc.name);
        setIsViewerOpen(true);
    }}
    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2"
>
    <FaEye />
    Preview
</button>
<button
    onClick={() => deleteDocument(doc.name)}
    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2"
>
    <FaTrash />
    Delete
</button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>
           <PDFViewerModal
    file={selectedFile}
    isOpen={isViewerOpen}
    onClose={() => setIsViewerOpen(false)}
/>
        </div>

    );

}