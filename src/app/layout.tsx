import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import { ConfigProvider } from "antd";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export const metadata: Metadata = {
  title: "Flav'Ur",
  description: "Flavour of you good times..",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={`antialiased`}>
          <Toaster position="top-center" />
          <div className="bg-dark bg-">
            <Header />
            <ConfigProvider
              theme={{
                components: {
                  Slider: {
                    railBg: "#9ca3af",
                    trackBg: "#ff9613",
                    trackHoverBg: "#ff9613",
                    railHoverBg: "#9ca3af",
                    handleColor: "#ff9613",
                    handleActiveColor: "#ff9613",
                    dotActiveBorderColor: "#ff9613",
                    dotBorderColor: "#ff9613",
                  },
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
                    colorBorder: "#ff9613",
                  },
                  Input: {
                    activeBorderColor: "#ff9613",
                    colorBgContainer: "#374151",
                  },
                },
                token: {
                  colorBorder: "#9ca3af",
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
    </ClerkProvider>
  );
}
