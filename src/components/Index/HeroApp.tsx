import Image from 'next/image';

const HeroApp = () => (
  <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
    {/* Immersive Background */}
    <div className="absolute inset-0 z-0">
      <Image
        src="/images/sylvaventis_hero.png"
        alt="Sylvaventis Wald"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center opacity-80"
        quality={90}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-kn-cream/40 via-transparent to-kn-cream" />
    </div>

    {/* Content */}
    <div className="relative z-10 text-center px-4 max-w-5xl mt-16">
      <p className="text-[10px] uppercase tracking-[0.5em] text-kn-cream/90 font-bold mb-6 animate-fade-in drop-shadow-sm">
        Aus den Wäldern zu Dir
      </p>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-8 text-kn-cream leading-[1.1] drop-shadow-md">
        Finde zurück zu <span className="text-kn-mint italic">wahrer Natur</span><br />
        und innerer Ruhe.
      </h1>
      <p className="text-kn-cream/90 max-w-2xl mx-auto mb-12 font-sans text-lg drop-shadow-sm">
        Sylvaventis ist die Brücke zwischen altem Wissen und modernen Qualitätsstandards. Erlebe botanische Schätze in ihrer reinsten Form.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
        <a href="/products" className="bg-kn-forest text-kn-cream px-8 py-4 font-accent tracking-widest text-[10px] font-bold uppercase transition-all duration-300 hover:bg-kn-moss hover:scale-105 shadow-md">
          JETZT ENTDECKEN
        </a>
      </div>
    </div>

    {/* Bottom Gradient / Scroll Indicator */}
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
      <div className="w-px h-12 bg-gradient-to-b from-kn-forest to-transparent" />
      <span className="text-[8px] uppercase tracking-widest text-kn-stone font-bold">Scroll to Discover</span>
    </div>
  </section>
);

export default HeroApp;
