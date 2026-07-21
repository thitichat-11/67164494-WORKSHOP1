

const FormTextarea = ({ label, name, value, onChange, placeholder, rows = 4, h }) => {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {label ? <span style={{ fontSize: 14, fontWeight: 600 }}>{label}</span> : null}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        style={{ width: "100%", height: h ?? "120px", padding: 12, border: "1px solid #e5e7eb", borderRadius: 6, backgroundColor: "#FDFDFD" }}
      />
    </label>
  );
};

export default FormTextarea;

