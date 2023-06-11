import type { NextPage } from "next";

export const AboutPage: NextPage = () => {
  return (
    <article className="flex flex-1 flex-col items-stretch justify-start space-y-2 p-2 text-justify">
      <h2 className="p-2 text-center text-2xl font-bold">About</h2>
      <section className="flex flex-col flex-nowrap items-stretch justify-start space-y-2 p-2">
        <h3 className="p-2 text-left text-lg font-bold">Employment</h3>
        <p className="p-2">
          Luis is a professional software engineer with experience in:
        </p>
        <ul className="flex list-disc flex-col flex-nowrap items-stretch justify-evenly p-6 py-2">
          {[
            "container virtualization and orchestration",
            "cloud-native application design and development",
            "continuous integration and deployment",
            "configuration management",
            "agile software development",
          ].map((text, i) => (
            <li key={i} className="m-2">
              {text}
            </li>
          ))}
        </ul>
        <p className="p-2">
          His professional interests primarily involve software development,
          specifically for education, music visualization and playback, and
          digital reading platforms. His professional roles of interest include
          mid-level to staff software engineer in application development or
          DevOps and platform engineering.
        </p>
      </section>
      <section className="flex flex-col flex-nowrap items-stretch justify-start space-y-2 p-2">
        <h3 className="p-2 text-left text-lg font-bold">Education</h3>
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
  );
};

export default AboutPage;
