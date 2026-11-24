import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-lg font-bold">
      <span aria-hidden className="grid size-9 place-items-center rounded-2xl bg-primary text-primary-foreground">
        <PiggyIcon />
      </span>
      <span>
        Happy<span className="text-primary">Budget</span>
      </span>
    </Link>
  );
}

function PiggyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 9c1 0 2 .5 2 2v2h-2c-.5 1.5-1.5 2.5-3 3.2V19h-3v-2h-2v2H8v-2.8C5.6 15 4 12.8 4 10.5 4 7 7.6 5 11.5 5c2.6 0 4.8.9 6 2.4L19 6z" />
      <circle cx="15.5" cy="10" r=".8" fill="currentColor" />
    </svg>
  );
}
