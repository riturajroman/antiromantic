import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "Anti-Romantic",
  description: "A unique platform for personalized experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
