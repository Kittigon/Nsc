
import "./globals.css";
import Navbar from "@/component/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen overflow-auto ">
        <Navbar/>
        {children } 
      </body>
    </html> 
  );
}
