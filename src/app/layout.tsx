import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "./main.scss";

export const metadata: Metadata = {
  title: "Shotitz photography | Event, Potrait Photographer and Film Maker",
  description: " Event, Potrait photographer and film maker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      <ToastContainer />
    </html>
  );
}
