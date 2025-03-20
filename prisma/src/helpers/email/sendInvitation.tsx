import React from "react";

interface SendInvitationProps {
  firstName: string;
  role: string;
  token: string;
}

const SendInvitation = ({ firstName, role, token }: SendInvitationProps) => {
  const companyName = "K-Prep";
  const tokenValidity = "15 minutes";

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <header
        style={{
          textAlign: "center",
          padding: "10px 0",
          borderBottom: "1px solid #ddd",
        }}
      >
        <h1 style={{ margin: "0", color: "#333" }}>{companyName}</h1>
      </header>
      <main style={{ padding: "20px" }}>
        <h2 style={{ color: "#333" }}>Hello {firstName},</h2>
        <p style={{ fontSize: "16px", lineHeight: "1.5", color: "#555" }}>
          Welcome to <strong>{companyName}</strong>! We’re excited to have you
          join as a <strong>{role}</strong>.
        </p>
        <p style={{ fontSize: "16px", lineHeight: "1.5", color: "#555" }}>
          Use the token below to activate your account:
        </p>
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <a
            href={token}
            style={{
              display: "inline-block",
              padding: "12px 24px",
              backgroundColor: "#1a73e8",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "bold",
              textDecoration: "none",
              borderRadius: "5px",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#135abe")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1a73e8")}
          >
            Activate Now
          </a>
        </div>
        <p style={{ fontSize: "16px", lineHeight: "1.5", color: "#555" }}>
          This token is valid for the next <strong>{tokenValidity}</strong>. If
          you have any issues, feel free to contact our support team.
        </p>
      </main>
      <footer
        style={{
          textAlign: "center",
          padding: "10px 0",
          borderTop: "1px solid #ddd",
          fontSize: "14px",
          color: "#999",
        }}
      >
        <p style={{ margin: "0" }}>
          © {new Date().getFullYear()} {companyName}. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default SendInvitation;
