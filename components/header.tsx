import Link from "next/link"
import Image from "next/image"

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/goldenlineviewlogo.png"
            alt="Goldenline View logo"
            width={52}
            height={52}
            className="h-12 w-12 object-contain"
          />
          <span className="text-xl font-semibold tracking-wide text-slate-900">
            Goldenline View, Inc.
          </span>
        </Link>

        <nav className="hidden gap-8 text-sm font-medium text-slate-700 md:flex">
          <Link href="/" className="hover:text-slate-950">
            Home
          </Link>
          <Link href="#about" className="hover:text-slate-950">
            About
          </Link>
          <Link href="#parkas" className="hover:text-slate-950">
            Parkas
          </Link>
          <Link href="#contact" className="hover:text-slate-950">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}