import "./globals.css";

export const metadata = {
  title: "Prescription AI",
  description: "AI Prescription Analyzer"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
