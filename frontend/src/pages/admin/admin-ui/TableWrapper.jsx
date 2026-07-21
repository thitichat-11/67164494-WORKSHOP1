

const TableWrapper = ({ colHeaders, colTemplate, rows, children }) => {
  return (
    <div
      style={{
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: "#ffffff",
        borderRadius: 6,
        overflow: "hidden",
        border: "1px solid #eee7da",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: colTemplate,
          backgroundColor: "#FAF9F6",
          color: "#666666",
          fontSize: 14,
          fontWeight: 600,
          borderBottom: "1px solid #eee7da",
          padding: "12px 16px",
        }}
      >
        {colHeaders.map((h, idx) => (
          <div key={`${h}-${idx}`}>{h}</div>
        ))}
      </div>
      <div style={{ backgroundColor: "#ffffff" }}>{children ?? rows}</div>
    </div>
  );
};

export default TableWrapper;

