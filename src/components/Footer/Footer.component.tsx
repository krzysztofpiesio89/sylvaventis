import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-obsidian border-t border-white/5 pt-24 pb-12">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-20">
          
          {/* Brand Column */}
          <div className="space-y-8">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-serif text-text tracking-widest uppercase">
                Sylvaventis
              </h2>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs font-sans">
              Die Brücke zwischen altem botanischem Wissen und modernen Qualitätsstandards. Handverlesene Naturprodukte.
            </p>
            <div className="flex items-center gap-6">
              {/* Social Icons - SVGs */}
              <a href="#" className="text-text-muted hover:text-accent transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="text-text-muted hover:text-accent transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
              </a>
              <a href="#" className="text-text-muted hover:text-accent transition-colors">
                <span className="sr-only">X (Twitter)</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="space-y-8">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-accent font-bold text-accent">Kollektion</h3>
            <ul className="space-y-4">
              <li><Link href="/products" className="text-sm text-text-muted hover:text-text transition-colors font-sans">Alle Produkte</Link></li>
              <li><Link href="/categories" className="text-sm text-text-muted hover:text-text transition-colors font-sans">Kategorien</Link></li>
              <li><Link href="/new-arrivals" className="text-sm text-text-muted hover:text-text transition-colors font-sans">Neuheiten</Link></li>
              <li><Link href="/limited-editions" className="text-sm text-text-muted hover:text-text transition-colors font-sans">Limitierte Editionen</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-8">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-accent font-bold text-accent">Unternehmen</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-sm text-text-muted hover:text-text transition-colors font-sans">Über uns</Link></li>
              <li><Link href="/process" className="text-sm text-text-muted hover:text-text transition-colors font-sans">Unser Prozess</Link></li>
              <li><Link href="/science" className="text-sm text-text-muted hover:text-text transition-colors font-sans">Wissenschaft & Sicherheit</Link></li>
              <li><Link href="/contact" className="text-sm text-text-muted hover:text-text transition-colors font-sans">Kontakt</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-8">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-accent font-bold text-accent">Rechtliches</h3>
            <ul className="space-y-4">
              <li><Link href="/pages/agb" className="text-sm text-text-muted hover:text-text transition-colors font-sans">AGB</Link></li>
              <li><Link href="/pages/datenschutz" className="text-sm text-text-muted hover:text-text transition-colors font-sans">Datenschutzerklärung</Link></li>
              <li><Link href="/pages/impressum" className="text-sm text-text-muted hover:text-text transition-colors font-sans">Impressum</Link></li>
              <li><Link href="/pages/widerruf" className="text-sm text-text-muted hover:text-text transition-colors font-sans">Widerrufsrecht</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] uppercase tracking-[0.4em] text-text-muted font-sans" suppressHydrationWarning>
            &copy; {currentYear} Sylvaventis. Schätze der Natur.
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-success" />
              <span className="text-[9px] uppercase tracking-widest text-text-muted">Global Operations Active</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
