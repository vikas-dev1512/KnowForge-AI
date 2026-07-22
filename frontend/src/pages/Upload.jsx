import { useState } from "react";
import api from "../services/api";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const uploadFile = async () => {
    if (!file) {
      setMessage("Please select a PDF document.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setStatus("📤 Uploading document...");
      await new Promise((r) => setTimeout(r, 600));

      setStatus("📄 Extracting text...");
      await new Promise((r) => setTimeout(r, 800));

      setStatus("🧠 Generating AI embeddings...");
      await new Promise((r) => setTimeout(r, 800));

      setStatus("📚 Building Knowledge Base...");
      await new Promise((r) => setTimeout(r, 800));

      const res = await api.post("/upload", formData);

      setStatus("✅ Knowledge Base Updated");

      setMessage(
        `Successfully indexed "${res.data.filename}". Your document is now ready for AI search.`
      );

      setFile(null);
    } catch (err) {
      console.error(err);
      setStatus("");
      setMessage("❌ Upload failed.");
    }

    setLoading(false);
  };

  return (
    <div className="p-10 text-white">

      <h1 className="text-3xl font-bold">
        Upload Industrial Documents
      </h1>

      <p className="text-slate-400 mt-2 mb-8">
        Upload SOPs, manuals, maintenance guides and industrial documents to build your AI Knowledge Base.
      </p>

      <div className="max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-8">

        <label
          className="border-2 border-dashed border-slate-700 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition"
        >

          <div className="text-5xl mb-4">
            📄
          </div>

          <h2 className="text-xl font-semibold">
            {file ? file.name : "Choose PDF Document"}
          </h2>

          <p className="text-slate-400 mt-2">
            Click to browse your computer
          </p>

          {file && (
            <p className="text-green-400 mt-4">
              Ready to upload • {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          )}

          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />

        </label>

        <button
          onClick={uploadFile}
          disabled={loading}
          className={`w-full mt-8 py-4 rounded-xl font-semibold transition ${
            loading
              ? "bg-slate-700 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : "🚀 Build Knowledge Base"}
        </button>

        {loading && (

          <div className="mt-8">

            <div className="flex items-center gap-3">

              <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

              <span className="text-blue-400">
                {status}
              </span>

            </div>

            <div className="w-full bg-slate-700 rounded-full h-2 mt-5 overflow-hidden">

              <div className="bg-blue-500 h-2 animate-pulse w-full"></div>

            </div>

          </div>

        )}

        {message && (

          <div className="mt-8 bg-slate-800 border border-green-500 rounded-xl p-4">

            {message}

          </div>

        )}

      </div>

    </div>
  );
}