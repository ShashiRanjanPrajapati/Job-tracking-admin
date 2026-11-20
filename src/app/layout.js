import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";

export const metadata = {
  title: "Job Application Tracker",
  description: "Track and manage job applications with Next.js, Express, and MySQL",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
