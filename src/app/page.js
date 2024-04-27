import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/Sectionheaders";

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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magni minima odit recusandae.
            Illum ipsa non repudiandae? Eum ipsam iste quos suscipit tempora? Aperiam esse fugiat
            inventore laboriosam officiis guam rem!
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magni minima odit recusandae.
            Illum ipsa non repudiandae? Eum ipsam iste quos suscipit tempora? Aperiam esse fugiat
            inventore laboriosam officiis guam rem!
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
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
