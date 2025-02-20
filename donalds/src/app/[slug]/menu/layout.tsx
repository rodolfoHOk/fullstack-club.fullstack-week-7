import { CartProvider } from './contexts/cart';

export default function MenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}
