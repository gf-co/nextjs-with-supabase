import { Link } from "@nextui-org/link";

export default function Footer() {
  return (
    <div className="mt-32 flex flex-col gap-10">
      <div className="flex flex-wrap gap-5">
        <Link
          isExternal
          href="https://github.com/gf-co/nextjs-with-supabase"
          underline="hover"
          color="foreground"
        >
          Source Code
        </Link>
        <Link
          isExternal
          href="https://gf-co.github.io/"
          underline="hover"
          color="foreground"
        >
          Portfolio
        </Link>
        <Link
          isExternal
          href="https://www.linkedin.com/in/gf-co/"
          underline="hover"
          color="foreground"
        >
          LinkedIn
        </Link>
      </div>
      <small className="text-sm opacity-50">
        Built with Next.js, Supabase, NextUI, and Tailwind CSS
      </small>
    </div>
  );
}
