import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import FetchUser from "@/components/FetchUser";
import { ConfigProvider } from "antd";

export const metadata: Metadata = {
  title: "Flav-Ur",
  description: "Flavour of you good times..",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-dark`}>
        <Toaster position="top-center" />
        <div>
          <FetchUser />
          <Header />
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  hoverBorderColor: "none",
                  activeBorderColor: "#e5e7eb",
                  optionActiveBg: "#6b7280",
                  selectorBg: "#374151",
                  optionFontSize: 15,
                  fontSize: 17,
                },
                Switch: {
                  colorBgSolidActive: "#e5e7eb",
                },
              },
              token: {
                colorBorder: "none",
                colorTextPlaceholder: "#e5e7eb",
                colorBgElevated: "#4b5563",
                colorText: "#e5e7eb",
                colorPrimary: "#6b7280",
                colorIcon: "white", // Arrow (icon) color
                colorIconHover: "#f57c00", // Arrow color on hover
              },
            }}
          >
            {children}
          </ConfigProvider>
        </div>
      </body>
    </html>
  );
}
