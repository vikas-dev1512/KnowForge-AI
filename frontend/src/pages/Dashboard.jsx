import Header from "../components/Header";
import StatCard from "../components/StatCard";

import { useEffect, useState } from "react";
import api from "../services/api";

import {
  FaFileAlt,
  FaRobot,
  FaLayerGroup,
  FaBook,
  FaExclamationTriangle,
} from "react-icons/fa";
export default function Dashboard({ setPage }) {
  const [documents, setDocuments] = useState([]);

useEffect(() => {
  fetchDashboard();
}, []);

const [dashboard, setDashboard] = useState({
  documents: 0,
  pages: 0,
  chunks: 0,
  queries: 0,
});

const fetchDashboard = async () => {
  try {
    const [docsRes, dashboardRes] = await Promise.all([
      api.get("/documents"),
      api.get("/dashboard"),
    ]);

    setDocuments(docsRes.data);
    setDashboard(dashboardRes.data);
  } catch (err) {
    console.error(err);
  }
};

  const stats = [
      {
    title: "Documents",
    value: dashboard.documents,
    icon: <FaFileAlt />,
    color: "#2563eb",
  },
  {
    title: "Knowledge Pages",
    value: dashboard.pages,
    icon: <FaBook />,
    color: "#9333ea",
  },
  {
    title: "Knowledge Chunks",
    value: dashboard.chunks,
    icon: <FaLayerGroup />,
    color: "#22c55e",
  },
  {
    title: "AI Queries",
    value: dashboard.queries,
    icon: <FaRobot />,
    color: "#f59e0b",
  },
    
  ];
return (
    <main className="flex-1 min-h-screen bg-slate-950 p-8">

        <Header />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

          {stats.map((item, index) => (
            <StatCard
              key={index}
              title={item.title}
              value={item.value}
              icon={item.icon}
              color={item.color}
            />
          ))}

        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-8">

         <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

<h2 className="text-xl font-semibold text-white mb-5">
Recent Documents
</h2>

<ul className="space-y-4 text-slate-300">

  {documents.length === 0 ? (

    <li>No documents uploaded yet.</li>

  ) : (

    documents.map((doc, index) => (

      <li
key={index}
className="truncate"
title={doc.name}
>
📄 {doc.name}
</li>

    ))

  )}

</ul>

</div>
<div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

<h2 className="text-xl font-semibold text-white mb-5">
AI Assistant
</h2>

<p className="text-slate-300 leading-7">
Ask natural language questions about your uploaded knowledge base.
KnowForge AI retrieves the most relevant information and provides explainable source references.
</p>

<button
onClick={() => setPage("chat")}
className="mt-8 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-medium transition"
>

Open AI Assistant

</button>

</div>
<div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

  <h2 className="text-xl font-semibold text-white mb-5">
    System Status
  </h2>

  <div className="space-y-5">

    <div className="flex justify-between">
      <span className="text-slate-300">
        Documents Indexed
      </span>

      <span className="text-green-400 font-semibold">
        {dashboard.documents}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-slate-300">
        Knowledge Pages
      </span>

      <span className="text-blue-400 font-semibold">
        {dashboard.pages}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-slate-300">
        Knowledge Chunks
      </span>

      <span className="text-purple-400 font-semibold">
        {dashboard.chunks}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-slate-300">
        AI Queries
      </span>

      <span className="text-yellow-400 font-semibold">
        {dashboard.queries}
      </span>
    </div>

  </div>

</div>
        </div>

      </main>
  );
}