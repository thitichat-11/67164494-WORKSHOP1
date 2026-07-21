import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("[ErrorBoundary] Caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          fontFamily: "'Inter', sans-serif",
        }}>
          <div style={{ textAlign: "center", maxWidth: "400px" }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "#FAEAEA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d14343" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#1A1714", margin: "0 0 8px" }}>
              {this.props.title || "เกิดข้อผิดพลาด"}
            </h2>
            <p style={{ fontSize: "13px", color: "#666", margin: "0 0 20px", lineHeight: "1.5" }}>
              {this.props.message || "กรุณาลองใหม่อีกครั้งหรือติดต่อผู้ดูแลระบบ"}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                if (this.props.onRetry) this.props.onRetry();
              }}
              style={{
                padding: "8px 20px",
                backgroundColor: "#1A1714",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              {this.props.retryLabel || "ลองใหม่"}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

