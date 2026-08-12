import Image from 'next/image';
import SparksEffect from './SparksEffect';

const HeroApp = () => (
  <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
    {/* Immersive Background */}
    <div className="absolute inset-0 z-0">
      <Image
        src="/images/hero_main.webp"
        alt="Amanita Muscaria Premium"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center opacity-40 scale-105"
        quality={90}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/50" />
      <SparksEffect />
    </div>

    {/* Content */}
    <div className="relative z-10 text-center px-4 max-w-5xl">
      <p className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold mb-6 animate-fade-in">
        Nature's Most Potent Secret
      </p>
      <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter mb-12 text-white leading-[0.9]">
        THE <span className="text-gradient font-bold italic">MAGIC</span><br />
        OF AMANITA
      </h1>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
        <a href="/products" className="btn-premium">
          Explore Collection
        </a>
        <a href="/about" className="text-[10px] uppercase tracking-[0.3em] text-white hover:text-accent transition-colors">
          The Science
        </a>
      </div>
    </div>

    {/* Bottom Gradient / Scroll Indicator */}
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
      <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
      <span className="text-[8px] uppercase tracking-widest text-text-muted">Scroll to Discover</span>
    </div>
  </section>
);

export default HeroApp;
