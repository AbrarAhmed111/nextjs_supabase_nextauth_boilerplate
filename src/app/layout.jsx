import "../assets/css/globals.css"; // CSS is now included here
import Providers from "@/store/Providers";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { AuthProvider } from "./sessionProvider";
import { Toaster } from "react-hot-toast";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className={` antialiased`}>
        <AuthProvider>
          <Providers>
            <Header />
            {children}
            <Footer />

          <Toaster position="top-center" />

          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
