export default function Contact() {
  return (
    <div>
      <section className="py-10 bg-bgPrimary">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl f text-primary leading-snug ">
            We are actively looking for resellers in the US and around the world
            to have a better regional coverage for our products.
          </h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div>
            <h2 className="text-4xl font-serif text-primary">
              You can find us at
            </h2>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary uppercase">
                Email
              </h3>
              <p className="text-xl text-secondary">contact@solarpathusa.com</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary uppercase">
                Phone Number
              </h3>
              <p className="text-xl text-secondary">
                Toll free: 1.888.333.SOLAR(7652) <br />
                International: +1.201.490.4499
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary uppercase">
                Location
              </h3>
              <p className="text-xl text-secondary">
                USA <br />
                123 Town Square Pl. #333 <br />
                Jersey City, NJ 07310 USA
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex  gap-4">
              <a
                href="https://www.linkedin.com/company/solarpath-sun-solutions"
                className="flex items-center justify-center text-black text-xl font-semibold bg-white border-2 border-black rounded-full px-4 py-2 w-fit"
              >
                Linkedin{" "}
                <span className="ml-2 p-2 bg-blue-900 text-white rounded-full flex items-center justify-center w-8 h-8">
                  in
                </span>
              </a>
              <a
                href="https://www.facebook.com/solarpathsunsolutions/?fref=ts"
                className="flex items-center justify-center text-black text-xl font-semibold bg-white border-2 border-black rounded-full px-4 py-2 w-fit"
              >
                Facebook{" "}
                <span className="ml-2 p-2 bg-blue-900 text-white rounded-full flex items-center justify-center w-8 h-8">
                  f
                </span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-4xl font-serif text-primary">
              Let's get in touch
            </h2>

            <form className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                placeholder="Message"
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                rows={4}
              ></textarea>
              <button
                type="submit"
                className="mt-4 bg-link hover:bg-linkHover text-secondary font-bold py-3 px-6 rounded-lg text-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
