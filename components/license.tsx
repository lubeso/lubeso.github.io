import Link from "next/link";

export function License(): JSX.Element {
  return (
    <figure className="flex flex-col flex-nowrap items-center justify-between space-y-2 p-4">
      <Link
        rel="license"
        href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
      >
        <img
          alt="Creative Commons License"
          src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"
        />
      </Link>
      <figcaption className="hidden text-center text-sm md:block">
        This work is licensed under a
        <br />
        <Link
          rel="license"
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
        >
          Creative Commons Attribution-NonCommercial-ShareAlike 4.0
          International License
        </Link>
        .
      </figcaption>
    </figure>
  );
}

export default License;
