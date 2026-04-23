import Image from "next/image"
import { Header } from "@/components/header"

const parkaPhotos = [
  {
    src: "/solidredparka.jpg",
    alt: "Solid red parka",
    title: "Solid Red Parka",
  },
  {
    src: "/redsantaparka.jpg",
    alt: "Red Santa parka",
    title: "Red Santa Parka",
  },
  {
    src: "/purpleparka.jpg",
    alt: "Purple parka",
    title: "Purple Parka",
  },
  {
    src: "/coloredparka.jpg",
    alt: "Colored parka",
    title: "Colored Parka",
  },
  {
    src: "/closeupred.jpg",
    alt: "Close up red parka",
    title: "Close Up Red",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />

      <main>
        <section className="relative h-[72vh] min-h-[540px] overflow-hidden">
          <Image
            src="/hero.jpg"
            alt="Goldenline View intro background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/45" />

          <div className="relative z-10 flex h-full items-center justify-center px-6">
            <div className="text-center text-white">
              <h1 className="text-4xl font-semibold tracking-[0.12em] md:text-7xl">
                GOLDENLINE VIEW
              </h1>
              <p className="mt-3 text-3xl font-light tracking-[0.18em] md:text-5xl">
                INC
              </p>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="rounded-3xl bg-slate-50 p-8 shadow-sm md:p-12">
            <h2 className="mb-6 text-center text-3xl font-semibold md:text-4xl">
              About Goldenline View, Inc.
            </h2>
            <p className="text-center text-lg leading-9 text-slate-700">
              Goldenline View, Inc. is working toward improving its organizational
              real estate investment opportunities. Research is also in progress
              for start up of tourism involving production of mining for gold and
              seasonal activities of interest.
            </p>
          </div>
        </section>

        <section id="parkas" className="mx-auto max-w-7xl px-6 py-8 md:py-12">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold md:text-4xl">
              Custom Parka Gallery
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              A selection of custom parka styles and designs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {parkaPhotos.map((photo) => (
              <div
                key={photo.src}
                className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {photo.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="rounded-3xl bg-slate-900 px-8 py-12 text-center text-white">
            <h2 className="text-3xl font-semibold md:text-4xl">
              Interested in a Custom Parka?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-200">
              Contact Goldenline View, Inc. to discuss custom parka designs,
              sizes, colors, and specialty requests.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}