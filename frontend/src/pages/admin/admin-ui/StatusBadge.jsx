

const StatusBadge = ({ type, value }) => {
  const v = (value || "").toString();
  if (type === "stock") {
    if (/out/i.test(v) || /0/.test(v)) {
      return (
        <span className="admin-badge" style={{ backgroundColor: "#FAEAEA", color: "#A73937" }}>
          Out of Stock
        </span>
      );
    }
    if (/low/i.test(v) || /low stock/i.test(v)) {
      return (
        <span className="admin-badge" style={{ backgroundColor: "#FAEBD9", color: "#A6713B" }}>
          Low Stock
        </span>
      );
    }
    return (
      <span className="admin-badge" style={{ backgroundColor: "#E2F1E0", color: "#2D612A" }}>
        In Stock
      </span>
    );
  }

  if (type === "order") {
    if (/processing/i.test(v)) {
      return (
        <span style={{ padding: "6px 12px", borderRadius: 9999, backgroundColor: "#FAEBD9", color: "#A6713B", fontSize: 12, fontWeight: 500 }}>
          Processing
        </span>
      );
    }
    if (/shipped/i.test(v)) {
      return (
        <span style={{ padding: "6px 12px", borderRadius: 9999, backgroundColor: "#EEF4ED", color: "#3C7741", fontSize: 12, fontWeight: 500 }}>
          Shipped
        </span>
      );
    }
    if (/delivered/i.test(v)) {
      return (
        <span style={{ padding: "6px 12px", borderRadius: 9999, backgroundColor: "#E2F1E0", color: "#2D612A", fontSize: 12, fontWeight: 500 }}>
          Delivered
        </span>
      );
    }
    if (/cancel/i.test(v)) {
      return (
        <span style={{ padding: "6px 12px", borderRadius: 9999, backgroundColor: "#FAEAEA", color: "#A73937", fontSize: 12, fontWeight: 500 }}>
          Cancelled
        </span>
      );
    }
    return (
      <span style={{ padding: "6px 12px", borderRadius: 9999, backgroundColor: "#FAF9F6", color: "#666", fontSize: 12, fontWeight: 500 }}>
        {v || "—"}
      </span>
    );
  }

  if (type === "member") {
    if (/vip/i.test(v)) {
      return (
        <span style={{ padding: "6px 12px", borderRadius: 9999, backgroundColor: "#EADCC4", color: "#6D5233", fontSize: 12, fontWeight: 500 }}>
          {v || "VIP"}
        </span>
      );
    }
    if (/new/i.test(v)) {
      return (
        <span style={{ padding: "6px 12px", borderRadius: 9999, backgroundColor: "#F6DCDB", color: "#8E3D3B", fontSize: 12, fontWeight: 500 }}>
          {v || "New"}
        </span>
      );
    }
    if (/member/i.test(v)) {
      return (
        <span style={{ padding: "6px 12px", borderRadius: 9999, backgroundColor: "#D6E9D3", color: "#3F6D3A", fontSize: 12, fontWeight: 500 }}>
          {v || "Member"}
        </span>
      );
    }
    return (
      <span style={{ padding: "6px 12px", borderRadius: 9999, backgroundColor: "#FAF9F6", color: "#666", fontSize: 12, fontWeight: 500 }}>
        {v || "—"}
      </span>
    );
  }

  return <span>{v}</span>;
};

export default StatusBadge;

