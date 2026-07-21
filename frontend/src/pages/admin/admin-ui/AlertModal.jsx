import { useEffect, useRef } from "react";

const AlertModal = ({
  open,
  onClose,
  onConfirm,
  title = "ยืนยันการดำเนินการ",
  message = "คุณแน่ใจหรือไม่?",
  confirmText = "ยืนยัน",
  cancelText = "ยกเลิก",
  type = "confirm", // "confirm" | "alert" | "danger"
  icon,
}) => {
  const confirmRef = useRef(null);

  useEffect(() => {
    if (open && confirmRef.current) {
      confirmRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const isDanger = type === "danger";

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    animation: "fadeIn 0.15s ease",
  };

  const modalStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "28px 32px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
    animation: "scaleIn 0.2s ease",
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <div style={overlayStyle} onClick={onClose}>
        <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
          {/* Icon */}
          {icon && (
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
              {icon}
            </div>
          )}

          {!icon && isDanger && (
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "#FAEAEA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A73937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
          )}

          {!icon && type === "alert" && (
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "#EEF4ED",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3C7741" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
          )}

          {!icon && type === "confirm" && (
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "#FAEBD9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A6713B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
          )}

          {/* Title */}
          <h3
            style={{
              fontSize: "17px",
              fontWeight: 600,
              color: "#1A1714",
              textAlign: "center",
              margin: "0 0 8px",
            }}
          >
            {title}
          </h3>

          {/* Message */}
          <p
            style={{
              fontSize: "13px",
              color: "#666",
              textAlign: "center",
              margin: "0 0 24px",
              lineHeight: 1.5,
            }}
          >
            {message}
          </p>

          {/* Actions */}
          <div style={{ display: "flex", gap: "10px" }}>
            {type !== "alert" && (
              <button
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  backgroundColor: "#ffffff",
                  color: "#1A1714",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "background-color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FAF9F6")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
              >
                {cancelText}
              </button>
            )}

            <button
              ref={confirmRef}
              onClick={() => {
                onConfirm?.();
                onClose?.();
              }}
              style={{
                flex: 1,
                padding: "10px 0",
                backgroundColor: isDanger ? "#A73937" : "#1A1714",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "background-color 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = isDanger ? "#8e2d2b" : "#2d2620")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = isDanger ? "#A73937" : "#1A1714")
              }
            >
              {confirmText}
            </button>

            {type === "alert" && (
              <button
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  backgroundColor: "#1A1714",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                ตกลง
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AlertModal;

