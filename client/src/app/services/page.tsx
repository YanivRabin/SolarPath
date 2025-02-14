import Image from "next/image";

export default function Services() {
  return (
    <div>
      <section className="py-20 bg-bgPrimary text-center">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Title */}
          <h2 className="text-4xl font-serif font-semibold text-title">
            Light Quality and the Role of Color Temperature
          </h2>

          {/* Description */}
          <div className="mt-6 space-y-6  text-lg leading-relaxed">
            <p>
              There is ongoing confusion about how artificial lighting impacts
              human vision in darkness. Traditional lighting measurements focus
              only on lumen output, neglecting color temperature, which
              significantly affects visibility and perception.
            </p>

            <p>
              Researchers at UC Berkeley are developing a “cross-over chart” to
              compare different light spectrums and their effects on human
              vision. Full-spectrum white light enhances visibility better than
              monochromatic sources like HPS or LPS lamps, even if they have the
              same lumen output. The key factor in lighting effectiveness is not
              just the light generated at the source but how much reflected
              light reaches the eye.
            </p>

            <p>
              Color temperature, measured in Kelvin, plays a crucial role in
              vision. Natural sunlight at noon (5,250K) provides optimal
              visibility, while lower color temperatures at sunrise or sunset
              (1,000-2,000K) reduce detail perception. Artificial lights
              engineered to mimic sunlight improve visual clarity, even if they
              produce fewer lumens than traditional streetlights like HPS
              (2,200K) or SOX (1,700K).
            </p>

            <p>
              Excessive lumen output can also cause glare, reducing visual
              acuity by forcing the eye to contract. This is a major issue in
              current street lighting, where high-lumen, low-temperature sources
              impair visibility rather than improve it.
            </p>

            <p>
              Lighting engineers still rely on outdated lumen-based measurements
              without considering color temperature. Until a standardized system
              incorporating color temperature is developed, lighting
              applications will continue to be designed inefficiently.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 space-y-16">
          {/* Photovoltaic Technology Section */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
            {/* Left - Text */}
            <div className="lg:w-1/2 text-left">
              <h2 className="text-3xl font-serif text-title font-semibold">
                Photovoltaic Technology (Solar Cells)
              </h2>
              <p className="mt-4 text-xl  leading-relaxed">
                SolarPath utilizes photovoltaic technology where solar cells
                convert sunlight directly into electricity. These cells are
                vital for a variety of applications, from powering small devices
                like desk calculators and iPod chargers to larger systems such
                as satellites and solar street lighting.
              </p>
              <p className="mt-4 text-xl  leading-relaxed">
                Made from semiconducting silicone materials similar to those in
                computer chips, these cells generate electricity through the
                photovoltaic (PV) effect—when sunlight energizes electrons to
                flow as an electric current.
              </p>
            </div>

            {/* Right - Image */}
            <div className="lg:w-1/2 flex justify-center">
              <Image
                src="/services/solarcell.jpeg"
                alt="Solar Cell Technology"
                width={500}
                height={500}
                className="rounded-lg"
              />
            </div>
          </div>

          {/* LED Technology Section */}
          <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-10">
            {/* Left - Image */}
            <div className="lg:w-1/2 flex justify-center">
              <Image
                src="/services/led.jpeg"
                alt="LED Technology"
                width={500}
                height={500}
                className="rounded-lg"
              />
            </div>

            {/* Right - Text */}
            <div className="lg:w-1/2 text-left">
              <h2 className="text-3xl font-serif text-title font-semibold">
                LED (Light Emitting Diode) Technology
              </h2>
              <p className="mt-4 text-xl  leading-relaxed">
                LED technology has been transformative in the field of lighting,
                known for its efficiency and durability. SolarPath’s LEDs do not
                have filaments that burn out or emit harmful gases, making them
                more environmentally friendly compared to traditional lighting.
              </p>
              <p className="mt-4 text-xl  leading-relaxed">
                They are used in various applications, including our LightMark
                series products, offering longevity from 100,000 to 120,000
                hours of operation and minimal heat emission.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-bgPrimary">
        <div className="container mx-auto px-6  space-y-12">
          {/* Ultra-Capacitors Section */}
          <div>
            <h2 className="text-3xl font-serif text-title font-semibold">
              Ultra-Capacitors
            </h2>
            <p className="mt-4 text-xl  leading-relaxed">
              Our cutting-edge ultra-capacitor energy storage is employed in all
              our ground-installed LightMark™ and LightDeco™ series products.
            </p>
            <p className="mt-2 text-xl  leading-relaxed">
              Replacing conventional batteries, ultra-capacitors enhance energy
              efficiency and sustainability with their quick charge capabilities
              and robust temperature resistance.
            </p>
            <p className="mt-2 text-xl  leading-relaxed">
              These capacitors ensure prolonged operation and consistent
              performance under diverse environmental conditions.
            </p>
          </div>

          {/* VibraProof™ Technology Section */}
          <div>
            <h2 className="text-3xl font-serif text-title font-semibold">
              VibraProof™ Technology
            </h2>
            <p className="mt-4 text-xl  leading-relaxed">
              Addressing the challenges of road vibrations, SolarPath has
              developed VibraProof™ technology to protect solar panels and
              electronic circuitry in our lighting products.
            </p>
            <p className="mt-2 text-xl  leading-relaxed">
              This technology safeguards components from micro-flexing and
              micro-fractures, thereby extending the operational lifespan and
              efficiency of our installations in demanding environments.
            </p>
          </div>

          {/* Engagement and Certifications Section */}
          <div>
            <h2 className="text-3xl font-serif text-title font-semibold">
              Engagement and Certifications
            </h2>
            <p className="mt-4 text-xl  leading-relaxed">
              SolarPath is an active member of the U.S. Green Building Council
              and the National Wildlife Lighting Council and holds
              certifications from the International Dark-Sky Association.
            </p>
            <p className="mt-2 text-xl  leading-relaxed">
              These affiliations reflect our commitment to sustainable and
              wildlife-friendly lighting solutions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
