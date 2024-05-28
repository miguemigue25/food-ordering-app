import SectionHeaders from "@/components/layout/Sectionheaders";
import HomeMenu from "@/components/layout/HomeMenu";
import Hero from "@/components/layout/Hero";


export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders
          subHeader={'Our Story'}
          mainHeader={'About Us'}
        />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Here at Twin&apos;s Pizza we are dedicated to
            more than just crafting delicious pies we are committed to
            delivering an outstanding experience to every customer, every time.
            With a focus on quality ingredients, mouthwatering flavors, and
            timely delivery,
          </p>
          <p>
            We aim to be your top choice for satisfying your pizza cravings. Our
            team consists of passionate pizza enthusiasts who take pride in
            every pie we create. Whether you are enjoying a classic pepperoni or
            exploring one of our unique specialties, we strive to exceed your
            expectations with every bite.
          </p>
          <p>
            At Twin&apos;s Pizza, our mission is simple: to deliver happiness, one slice
            at a time.
          </p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={'Don\'t hesitate'}
          mainHeader={'Contact Us'}
        />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500"
            href="tel:18001112222">
            1(800) 111 - 2222
          </a>
        </div>
      </section>
    </>
  );
}
