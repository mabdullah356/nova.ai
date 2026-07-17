import React from "react";

interface OTPSendProps {
  name: string;
  otp: string;
  expiryMinutes?: number;
}

export const OTPSendTemplate: React.FC<OTPSendProps> = ({
  name,
  otp,
  expiryMinutes = 10,
}) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#f4f4f5",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <table
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={{ backgroundColor: "#f4f4f5", padding: "40px 0" }}
        >
          <tr>
            <td align="center">
              <table
                width={600}
                cellPadding={0}
                cellSpacing={0}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                {/* Header */}
                <tr>
                  <td
                    style={{
                      background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                      padding: "32px 40px",
                      textAlign: "center" as const,
                    }}
                  >
                    <h1
                      style={{
                        color: "#ffffff",
                        fontSize: "28px",
                        fontWeight: 700,
                        margin: 0,
                        letterSpacing: "-0.5px",
                      }}
                    >
                      nova.ai
                    </h1>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.85)",
                        fontSize: "14px",
                        margin: "6px 0 0",
                      }}
                    >
                      Your AI-Powered Creative Assistant
                    </p>
                  </td>
                </tr>

                {/* Body */}
                <tr>
                  <td style={{ padding: "40px" }}>
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#18181b",
                        margin: "0 0 8px",
                      }}
                    >
                      Hi {name},
                    </p>
                    <p
                      style={{
                        fontSize: "15px",
                        color: "#52525b",
                        margin: "0 0 24px",
                        lineHeight: "1.6",
                      }}
                    >
                      Welcome to <strong>nova.ai</strong> — your go-to tool for
                      generating chat responses, code, images, and videos. Please
                      use the OTP below to verify your email address.
                    </p>

                    {/* OTP Box */}
                    <table
                      width="100%"
                      cellPadding={0}
                      cellSpacing={0}
                    >
                      <tr>
                        <td
                          style={{
                            backgroundColor: "#faf5ff",
                            border: "2px dashed #a855f7",
                            borderRadius: "12px",
                            padding: "28px 24px",
                            textAlign: "center" as const,
                          }}
                        >
                          <p
                            style={{
                              fontSize: "13px",
                              color: "#71717a",
                              margin: "0 0 12px",
                              textTransform: "uppercase" as const,
                              letterSpacing: "1.5px",
                              fontWeight: 600,
                            }}
                          >
                            Your Verification Code
                          </p>
                          <p
                            style={{
                              fontSize: "36px",
                              fontWeight: 700,
                              color: "#7c3aed",
                              margin: 0,
                              letterSpacing: "8px",
                              fontFamily: "monospace",
                            }}
                          >
                            {otp}
                          </p>
                          <p
                            style={{
                              fontSize: "13px",
                              color: "#a1a1aa",
                              margin: "12px 0 0",
                            }}
                          >
                            This code expires in{" "}
                            <strong style={{ color: "#52525b" }}>
                              {expiryMinutes} minutes
                            </strong>
                          </p>
                        </td>
                      </tr>
                    </table>

                    <p
                      style={{
                        fontSize: "14px",
                        color: "#71717a",
                        margin: "28px 0 0",
                        lineHeight: "1.6",
                      }}
                    >
                      If you didn&apos;t request this, you can safely ignore this
                      email. Do not share this code with anyone.
                    </p>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td
                    style={{
                      padding: "20px 40px",
                      borderTop: "1px solid #e4e4e7",
                      textAlign: "center" as const,
                    }}
                  >
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#a1a1aa",
                        margin: 0,
                      }}
                    >
                      &copy; {new Date().getFullYear()} nova.ai &mdash; All
                      rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
};
