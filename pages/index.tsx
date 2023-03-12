import type { NextPage } from "next";
import Link from "next/link";

export const IndexPage: NextPage = () => {
  return (
    <article className="flex flex-1 flex-col items-stretch justify-start space-y-2 p-2 text-justify">
      <h2 className="p-2 text-center text-2xl italic">Welcome</h2>
      <article className="flex flex-1 flex-col items-stretch justify-start space-y-2 p-2 text-justify">
        <h3 className="p-2 text-center text-xl italic">Links</h3>
        <section className="flex flex-col flex-nowrap items-stretch justify-start space-y-2 p-4">
          <ul className="flex list-none flex-col flex-nowrap items-stretch justify-evenly p-2 text-center sm:flex-row">
            {[
              {
                text: "Spotify",
                href: "https://open.spotify.com/user/ylhsi5owo374r6sy3f8fc3xm6",
              },
              {
                text: "Bandcamp",
                href: "https://podina.bandcamp.com",
              },
              {
                text: "GitHub",
                href: "https://github.com/lubeso",
              },
              {
                text: "LinkedIn",
                href: "https://linkedin.com/in/lubeso",
              },
            ].map(({ text, href }, i) => (
              <li key={i} className="p-2">
                <Link
                  href={href}
                  className="font-bold hover:underline hover:underline-offset-2"
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
      <article className="flex flex-1 flex-col items-stretch justify-start space-y-2 p-2 text-justify">
        <h3 className="p-2 text-center text-xl italic">About</h3>
        <section className="flex flex-col flex-nowrap items-stretch justify-start space-y-2 p-2">
          <h4 className="p-2 text-left text-lg italic">Employment</h4>
          <p className="p-2">
            Luis is a professional software engineer with experience in:
          </p>
          <ul className="flex list-disc flex-col flex-nowrap items-stretch justify-evenly px-4 py-2 pl-6">
            {[
              "container virtualization and orchestration",
              "cloud-native application design and development",
              "continuous integration and deployment",
              "agile software development",
              "configuration management",
            ].map((text, i) => (
              <li key={i} className="p-2">
                {text}
              </li>
            ))}
          </ul>
          <p className="p-2">
            His professional interests primarily involve software development,
            specifically for education, music visualization and playback, and
            digital reading platforms. His professional roles of interest
            include mid-level to staff software engineer in application
            development or DevOps and platform engineering.
          </p>
        </section>
        <section className="flex flex-col flex-nowrap items-stretch justify-start space-y-2 p-2">
          <h4 className="p-2 text-left text-lg italic">Education</h4>
          <p className="p-2">
            Luis graduated from the Massachusetts Institute of Technology with a
            Bachelor of Science in Urban Science and Computer Science. While at
            university, Luis completed projects across different disciplines,
            including:
          </p>
          <ul className="flex list-disc flex-col flex-nowrap items-stretch justify-evenly px-4 py-2 pl-6">
            {[
              "prototyping a smart home system for college dorms",
              "simulating fluid dynamics for coastal concrete structures",
              "prototyping an RFID-activated car door for ride-sharing fleets",
              "analyzing and visualizing global climate datasets",
              "researching political effects of racial tensions in France",
              "measuring and mapping school and food access in NYC",
              "developing an application for simulating rail network delays",
            ].map((text, i) => (
              <li key={i} className="p-2">
                {text}
              </li>
            ))}
          </ul>
          <p className="p-2">
            His academic interests naturally include the intersection of urban
            planning and computer science, for example using computer vision to
            measure visual stress across different built environments, or
            attaching accelerometers to bicycles to measure the quality of bike
            path infrastructure. Luis is also interested in linguistics,
            specifically studying syntactic structures and the universality of
            grammar across human languages. Finally, Luis is also interested in
            electronic music composition, especially using experimental methods.
          </p>
        </section>
      </article>
    </article>
  );
};

export default IndexPage;
