// app/components/ClientLogosFinal.tsx

export default function ClientLogosFinal() {
  // Define logos with correct public paths
  const logos = [
    { name: "ABH Partners", src: "/images/duka-interiors-client-logos/abh-partners-duka-interiors.svg" },
    { name: "Tajir Real Estate", src: "/images/duka-interiors-client-logos/tajir-real-estate-duka-interiors.svg" },
    { name: "Africa Jobs", src: "/images/duka-interiors-client-logos/africa-jobs-duka-interiors-01.svg" },
    { name: "Afro Sweden", src: "/images/duka-interiors-client-logos/afro-sweden-duka-interiors.svg" },
    { name: "Alta Computec", src: "/images/duka-interiors-client-logos/alta-computec-duka-interiors.svg" },
    { name: "Awash Wine", src: "/images/duka-interiors-client-logos/awash-wine-duka-interiors.svg" },
    { name: "Axum Metals", src: "/images/duka-interiors-client-logos/axum-metals-duka-interiors.svg" },
    { name: "Besh Gebeya", src: "/images/duka-interiors-client-logos/besh-gebeya-duka-interiors.svg" },
    { name: "Dereja Academy", src: "/images/duka-interiors-client-logos/dereja-academy-duka-interiors.svg" },
    { name: "Ethio Jobs", src: "/images/duka-interiors-client-logos/ethio-jobs-duka-interiors.svg" },
    { name: "Geneva Global", src: "/images/duka-interiors-client-logos/geneva-global-duka-interiors.svg" },
    { name: "GoFigure Fitness", src: "/images/duka-interiors-client-logos/gofigure-fitness-duka-interiors.svg" },
    { name: "Habesha Breweries", src: "/images/duka-interiors-client-logos/habesha-breweries-duka-interiors.svg" },
    { name: "Habesha Cement", src: "/images/duka-interiors-client-logos/habesha-cement-duka-interiors.svg" },
    { name: "Kifiya Financial", src: "/images/duka-interiors-client-logos/kifiya-financial-duka-interiors.svg" },
    { name: "Marubeni", src: "/images/duka-interiors-client-logos/marubeni-duka-interiors.svg" },
    { name: "Precise Consult", src: "/images/duka-interiors-client-logos/precise-consult-duka-interiors.svg" },
    { name: "Prime Media", src: "/images/duka-interiors-client-logos/prime-media-duka-interiors.svg" },
    { name: "Qatar Airways", src: "/images/duka-interiors-client-logos/qatar-airways-duka-interiors.svg" },
    { name: "Ries Engineering", src: "/images/duka-interiors-client-logos/ries-engineering-duka-interiors.svg" },
    { name: "Schneider Electric", src: "/images/duka-interiors-client-logos/schneider-electric-duka-interiors.svg" },
    { name: "Sunpeak", src: "/images/duka-interiors-client-logos/sunpeak-duka-interiors.svg" }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-[90vw] mx-auto">
        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left Text Column */}
          <div className="lg:col-span-1 flex flex-col justify-center">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
              Trusted by our<br />customers &<br />partners
            </h3>
          </div>

          {/* Right Logo Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-8 justify-items-center">
              {logos.map((logo, index) => (
                <div key={index} className="flex items-center justify-center h-20 sm:h-24">
                  <img
                    src={logo.src}
                    alt={`${logo.name} logo`}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}