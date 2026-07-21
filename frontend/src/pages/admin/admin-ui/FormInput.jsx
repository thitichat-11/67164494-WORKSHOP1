

const FormInput = ({ label, name, value, onChange, placeholder, type = "text" }) => {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {label ? <span style={{ fontSize: 14, fontWeight: 600 }}>{label}</span> : null}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ width: "100%", padding: "12px 12px", border: "1px solid #e5e7eb", borderRadius: 6, backgroundColor: "#FDFDFD" }}
      />
    </label>
  );
};

export default FormInput;

