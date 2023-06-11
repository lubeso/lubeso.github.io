import type { NextPage } from "next";
import Link from "next/link";

export const IndexPage: NextPage = () => {
  return (
    <article className="flex flex-1 flex-col items-stretch justify-start space-y-2 p-2 text-justify">
      <h2 className="p-2 text-center text-2xl font-bold">Welcome</h2>
      <ul className="flex flex-1 list-none flex-col flex-nowrap items-stretch justify-evenly p-6 py-2 text-center text-xl">
        {[
          {
            text: "About",
            href: "/about",
          },
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
              className="hover:underline hover:underline-offset-2"
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default IndexPage;
