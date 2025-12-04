export const metadata = {
  title: 'Perfume Review App',
  description: 'DIT312 mini project – perfume reviews with Next.js, Node.js and MySQL',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
