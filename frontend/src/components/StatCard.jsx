export default function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-700">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-400">{title}</p>

          <h2 className="text-3xl font-bold text-white mt-2">
            {value}
          </h2>
        </div>

        <div
          className="text-3xl"
          style={{ color }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}