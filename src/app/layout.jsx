import "../assets/css/globals.css"; // CSS is now included here
import Providers from "@/store/Providers";
import { AuthProvider } from "./sessionProvider";
import { Toaster } from "react-hot-toast";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className={` antialiased`}>
        <AuthProvider>
          <Providers>
            {children}

          <Toaster position="top-center" />

          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
