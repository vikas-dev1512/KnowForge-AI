import {
  FaIndustry,
  FaChartPie,
  FaUpload,
  FaRobot,
  FaBook,
  FaChartLine,
  FaCog,
} from "react-icons/fa";

const menu = [
  { icon: <FaChartPie />, label: "Dashboard", page: "dashboard" },
  { icon: <FaUpload />, label: "Upload Documents", page: "upload" },
  { icon: <FaRobot />, label: "AI Assistant", page: "chat" },
  { icon: <FaBook />, label: "Knowledge Base", page: "knowledge" },
  { icon: <FaChartLine />, label: "Analytics", page: "analytics" },
  { icon: <FaCog />, label: "Settings", page: "settings" },
];

export default function Sidebar({ setPage }) {
  return (
    <aside className="w-72 min-h-screen bg-slate-900 border-r border-slate-800 text-white flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-3 rounded-xl">
            <FaIndustry size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold">KnowForge AI</h1>
            <p className="text-slate-400 text-sm">
              Industrial Knowledge Platform
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => (
         <button
  key={item.label}
  onClick={() => setPage(item.page)}
  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition"
>
  {item.icon}
  <span>{item.label}</span>
</button>
        ))}
      </nav>
    </aside>
  );
}