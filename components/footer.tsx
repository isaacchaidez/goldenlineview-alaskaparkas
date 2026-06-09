import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="mt-20 border-t bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/goldenlineviewlogo.png"
              alt="Goldenline View logo"
              width={52}
              height={52}
              className="h-12 w-12 rounded-xl object-contain"
            />
            <span className="text-xl font-semibold">
              Goldenline View, Inc.
            </span>
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
            Custom parkas, seasonal opportunities, and Goldenline View business
            ventures.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Navigation
          </h3>

          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <Link href="/#about" className="hover:text-white">
              About
            </Link>
            <Link href="/#parkas" className="hover:text-white">
              Parkas
            </Link>
            <Link href="/shop" className="hover:text-white">
              Shop
            </Link>
            <Link href="/cart" className="hover:text-white">
              Cart
            </Link>
            <Link href="/#contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Contact
          </h3>

          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
            <p>907-378-2991</p>
            <p>goldenline.view@gmail.com</p>
            <p>1369 N Becker Ridge Rd</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Goldenline View, Inc. All rights reserved.
      </div>
    </footer>
  )
}