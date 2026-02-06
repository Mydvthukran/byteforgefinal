import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Byte Forge | Tech Club</title>
        <meta
          name="description"
          content="Byte Forge - Where code meets creativity. A tech club forging the future of technology."
        />
        <meta name="theme-color" content="#0a0804" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
