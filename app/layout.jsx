
import "./globals.css";
import Navbar from "@/component/Navbar";
import { AuthProvider } from "./Provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className="flex flex-col min-h-screen overflow-auto ">
        <header>
          <title>LLM CHATBOT DEPRESSION</title>
        </header>
        <AuthProvider >
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
