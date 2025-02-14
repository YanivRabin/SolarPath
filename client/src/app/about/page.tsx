import Image from "next/image";

export default function About() {
  return (
    <div>
      <section className="py-20 bg-bgPrimary">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          {/* Vision Statement */}
          <h2 className="text-4xl font-serif text-title font-semibold leading-snug">
            We’re a highly collaborative and innovative team, <br />
            committed to delivering customized solar solutions <br />
            that meet our clients’ unique needs.
          </h2>

          {/* About Section - Two Column Layout */}
          <div className="mt-12 flex flex-col lg:flex-row items-center gap-12 text-left">
            {/* Left - Text */}
            <div className="lg:w-3/5">
              <p className="text-xl  leading-relaxed">
                Founded in 2005 and headquartered in New Jersey, with an
                additional office in North Miami Beach, FL, SolarPath Sun
                Solutions is a leader in the solar energy industry. We
                specialize in solar-powered lighting, traffic calming solutions,
                and LED fixtures, delivering customized, grid-independent
                infrastructure solutions.
              </p>
              <p className="text-xl  mt-4 leading-relaxed">
                Under the leadership of our founder, Roy Warshavsky, we innovate
                with products ranging from pathway lighting to advanced LED
                roadway systems, blending functionality with aesthetic appeal.
                As members of the U.S. Green Building Council and certified by
                the International Dark-Sky Association, we prioritize
                environmentally friendly and energy-efficient designs.
              </p>
              <p className="text-xl  mt-4 leading-relaxed">
                Our extensive lineup includes solar streetlights, parking and
                pathway lighting, traffic signs, and security cameras. At
                SolarPath, we’re dedicated to creating sustainable, high-quality
                solutions that illuminate a better future.
              </p>
            </div>

            {/* Right - Image */}
            <div className="lg:w-2/5 flex justify-center">
              <Image
                src="/about/headquarters.jpeg"
                alt="SolarPath Headquarters"
                width={450}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Mission & Values Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
            {/* Mission */}
            <div>
              <h3 className="text-2xl font-serif text-title font-semibold">
                Our Mission
              </h3>
              <p className="text-xl  mt-4 leading-relaxed">
                To create exceptional value through solar-powered lighting and
                sustainable solutions, inspiring environmentally friendly
                advancements in every project.
              </p>
            </div>

            {/* Values */}
            <div>
              <h3 className="text-2xl font-serif text-title font-semibold">
                Our Values
              </h3>
              <p className="text-xl  mt-4 leading-relaxed">
                We strive to go above and beyond, delivering our very best work
                daily while promoting eco-friendly and aesthetically appealing
                designs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          {/* Profile Image */}
          <div className="flex justify-center">
            <div className="w-40 h-40 rounded-full border-2 border-title p-2">
              <Image
                src="/about/roy.jpeg"
                alt="Roy Warshavsky"
                width={200}
                height={200}
                className="rounded-full"
              />
            </div>
          </div>

          {/* Name & Title */}
          <h2 className="text-3xl font-serif text-title font-semibold mt-6">
            Roy Warshavsky
          </h2>
          <p className="text-xl text-subtitle mt-2">
            Founder & CEO of Solarpath
          </p>

          {/* Description */}
          <p className="text-xl  mt-6 leading-relaxed">
            Roy Warshavsky, experienced founder of both SolarPath and M.S.L USA,
            is a recognized pioneer in the solar energy sector. Roy has been
            instrumental in driving sustainable solar lighting solutions
            internationally. With a profound commitment to developing
            eco-friendly, grid-independent infrastructure, Roy’s visionary
            leadership has positioned both companies as leaders in renewable
            energy, catalyzing innovation in the United States and
            internationally.
          </p>
        </div>
      </section>
    </div>
  );
}
