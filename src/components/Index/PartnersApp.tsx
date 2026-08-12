import Image from 'next/image';

const PARTNERS = [
  { name: 'Kopfnote', logo: '/partners/kopfonote.avif' },
  { name: 'Amanita Family', logo: '/partners/amanitafamilycom.png' },
  { name: 'uCars.pl', logo: '/partners/ucarspl.png' },
];

const PartnersApp = () => {
  return (
    <section className="py-24 bg-obsidian border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-6">
        <p className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold text-center mb-12">
          Strategic Partners &amp; Collaborations
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
          {PARTNERS.map((partner) => (
            <div 
              key={partner.name} 
              className="group relative transition-all duration-700 ease-out transform hover:scale-110"
            >
              <div className="absolute -inset-4 bg-accent/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative w-32 md:w-48 h-20 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersApp;
