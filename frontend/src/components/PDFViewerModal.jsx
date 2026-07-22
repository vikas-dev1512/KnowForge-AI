import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

export default function PDFViewerModal({
    file,
    isOpen,
    onClose,
    initialPage = 1,
}){

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(initialPage);
    useEffect(() => {
    setPageNumber(initialPage);
}, [initialPage, file]);


    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

            <div className="bg-slate-900 rounded-2xl w-[90%] h-[90%] p-6 flex flex-col">

                <div className="flex justify-between items-center mb-5">

                    <h2 className="text-white text-xl font-semibold">

                        {file}

                    </h2>

                    <button
                        onClick={onClose}
                        className="text-white text-2xl"
                    >
                        ✕

                    </button>

                </div>

                <div className="flex justify-center overflow-auto flex-1">

                    <Document
    file={`http://127.0.0.1:8000/uploads/${encodeURIComponent(file)}`}
    onLoadSuccess={({ numPages }) => {
        console.log("PDF Loaded");
        setNumPages(numPages);
    }}
    onLoadError={(error) => {
        console.error("PDF Error:", error);
    }}
    loading={<p className="text-white">Loading PDF...</p>}
    error={<p className="text-red-500">Unable to load PDF.</p>}
>
    <Page pageNumber={pageNumber} />
</Document>
                </div>

                <div className="flex justify-center gap-6 mt-5">

                    <button
                        onClick={() =>
                            setPageNumber(Math.max(pageNumber - 1, 1))
                        }
                        className="bg-blue-600 px-4 py-2 rounded-lg text-white"
                    >
                        ◀ Previous
                    </button>

                    <span className="text-white mt-2">

                        Page {pageNumber} / {numPages || 1}

                    </span>

                    <button
                        onClick={() =>
                            setPageNumber(
                                Math.min(pageNumber + 1, numPages || 1)
                            )
                        }
                        className="bg-blue-600 px-4 py-2 rounded-lg text-white"
                    >
                        Next ▶
                    </button>

                </div>

            </div>

        </div>

    );

}