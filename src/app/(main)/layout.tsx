import NavbarApp from "@/components/Navigation/NavbarApp";
import Footer from "@/components/Footer/Footer.component";
import CartDrawer from "@/components/Cart/CartDrawer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarApp />
      <CartDrawer />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
