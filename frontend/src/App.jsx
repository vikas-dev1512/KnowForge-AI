import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Chat from "./pages/Chat";
import Knowledge from "./pages/Knowledge";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";

import "./index.css";

function App() {

  const [page, setPage] = useState("dashboard");

  return (

    <div className="flex">

      <Sidebar setPage={setPage} />

      <div className="flex-1">

        {page === "dashboard" && <Dashboard setPage={setPage} />}
        {page === "upload" && <Upload />}
        {page === "chat" && <Chat />}
        {page === "knowledge" && <Knowledge />}
        {page === "analytics" && <Analytics />}
        {page === "settings" && <Settings />}

      </div>

    </div>

  );

}

export default App;