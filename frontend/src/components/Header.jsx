import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <header className="flex justify-between items-center">

      <div>
        <h1 className="text-4xl font-bold text-white">
          Enterprise Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          AI-powered Industrial Knowledge Intelligence
        </p>
      </div>

      <div className="flex items-center gap-5">

        <div className="relative">

          <FaSearch className="absolute left-3 top-3 text-slate-400"/>

          <input
            type="text"
            placeholder="Search documents..."
            className="bg-slate-900 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-white outline-none w-72"
          />

        </div>

        <button className="relative bg-slate-900 p-3 rounded-xl border border-slate-700">

          <FaBell className="text-white"/>

          <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3"></span>

        </button>

        <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2">

          <FaUserCircle size={34} className="text-blue-500"/>

          <div>

            <p className="text-white font-semibold">
              Vikas
            </p>

            <p className="text-slate-400 text-sm">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}