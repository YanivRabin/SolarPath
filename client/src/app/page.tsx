import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section>
        <div className="relative w-full h-screen">
          {/* Background Image */}
          <Image
            src="/home/home-1.jpg"
            alt="Hero Background"
            fill={true}
            objectFit="cover"
            quality={100}
            priority
          />

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-50 text-white px-4">
            <h1 className="text-5xl font-bold">SolarPath Sun Solutions</h1>
            <p className="mt-4 text-2xl">
              The forefront of sustainability and safety.
              <br />
              industry leading solar outdoor lighting, innovative
              traffic-calming solutions and cutting-edge LED technology.
            </p>

            {/* Call-to-Action Button */}
            <Link href="/products">
              <button className="mt-16 bg-link hover:bg-linkHover text-subtitle font-bold py-3 px-6 rounded-lg text-lg">
                See Our Products
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {/* Feature 1 - Customizable */}
            <div className="flex flex-col items-center">
              <Image
                src="/home/customizable.jpeg"
                alt="Customizable"
                width={150}
                height={150}
                className="rounded-full"
              />
              <h3 className="mt-4 text-2xl font-semibold text-title">
                Customizable
              </h3>
              <p className="mt-2 text-lg  max-w-xs">
                SolarPath offers fully customizable solar lighting solutions
                tailored to meet each client’s unique technical and aesthetic
                requirements.
              </p>
            </div>

            {/* Feature 2 - Photometric */}
            <div className="flex flex-col items-center">
              <Image
                src="/home/photometric.jpeg"
                alt="Photometric"
                width={150}
                height={150}
                className="rounded-full"
              />
              <h3 className="mt-4 text-2xl font-semibold text-title">
                Photometric
              </h3>
              <p className="mt-2 text-lg  max-w-xs">
                We conduct photometric measurements on all our products to
                ensure optimal performance and compliance with industry
                standards.
              </p>
            </div>

            {/* Feature 3 - Innovative Technology */}
            <div className="flex flex-col items-center">
              <Image
                src="/home/technology.jpeg"
                alt="Innovative Technology"
                width={150}
                height={150}
                className="rounded-full"
              />
              <h3 className="mt-4 text-2xl font-semibold text-title">
                Innovative Technology
              </h3>
              <p className="mt-2 text-lg  max-w-xs">
                High-efficiency solar and advanced LEDs deliver superior
                performance, long life, and maximum ROI.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-bgPrimary">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <p className="text-3xl text-title leading-relaxed">
            At <span className="font-semibold">SolarPath Sun Solutions</span>,
            we light the way to a sustainable future with innovative
            solar-powered solutions designed to meet the unique needs of each
            community we serve.
          </p>
        </div>
      </section>

      <section className="py-20 min-h-screen flex justify-center items-center bg-white">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12 px-6">
          {/* Left Side - Text Content */}
          <div className="lg:w-1/2 text-left">
            <p className="text-sm uppercase tracking-widest text-subtitle">
              About Us
            </p>
            <h2 className="mt-2 text-4xl font-serif text-title leading-snug">
              Lighting the Future with <br /> Solar Innovation
            </h2>
            <p className="mt-6  max-w-lg leading-relaxed">
              Founded in 2005, SolarPath Sun Solutions is a leader in
              solar-powered lighting and sustainable infrastructure. With
              cutting-edge designs and customized solutions, we bring
              energy-efficient lighting to private pathways, public spaces, and
              beyond.
            </p>
            <p className="mt-4 ">
              Illuminate your world with innovation.
            </p>

            {/* Button */}
            <Link href="/about">
              <button className="mt-6 border border-title text-title px-6 py-3 rounded-md hover:bg-amber-400 hover:text-title transition">
                Find Out More
              </button>
            </Link>
          </div>

          {/* Right Side - Image */}
          <div className="lg:w-1/2 flex justify-center">
            <Image
              src="/home/about.jpeg"
              alt="Solar Innovation"
              width={400}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/questions-bg.jpg" // Make sure this image is inside /public/images/
            alt="Sustainable Energy"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-3xl">
          <h2 className="text-4xl font-bold">QUESTIONS?</h2>
          <p className="mt-4 text-lg leading-relaxed">
            Whether you’re curious about our solar lighting solutions, custom
            designs, or how we can brighten your space sustainably, we’re here
            to help with all your questions.
          </p>

          {/* Button */}
          <Link href="/contact">
            <button className="mt-6 border border-title text-title px-6 py-3 rounded-md hover:bg-amber-400 hover:text-title transition">
              Let's Talk Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
