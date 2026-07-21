

const FormSelect = ({ label, name, value, onChange, options }) => {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {label ? <span style={{ fontSize: 14, fontWeight: 600 }}>{label}</span> : null}
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={{ width: "100%", padding: "12px 12px", border: "1px solid #e5e7eb", borderRadius: 6, backgroundColor: "#FDFDFD" }}
      >
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default FormSelect;

