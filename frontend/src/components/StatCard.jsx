function StatCard({ title, value, type }) {
  return (
    <div className={`stat-card ${type}`}>
      <div className="stat-card-top">
        <span className="stat-title">{title}</span>

        <div className="stat-icon">
          {type === "total" && "▣"}
          {type === "positive" && "✓"}
          {type === "negative" && "×"}
          {type === "neutral" && "—"}
        </div>
      </div>

      <div className="stat-value">{value}</div>
    </div>
  );
}

export default StatCard;