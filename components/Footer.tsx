import { Link } from "@nextui-org/link";

export default function Footer() {
  return (
    <div className="mt-32 flex flex-col gap-10">
      <Link isExternal href="" underline="hover" color="foreground">
        Source Code
      </Link>
      <small className="text-sm opacity-50">
        Built with Next.js, Supabase, NextUI, and Tailwind CSS
      </small>
    </div>
  );
}
