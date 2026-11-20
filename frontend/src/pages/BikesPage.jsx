import { useEffect, useState } from "react"

const API = "http://127.0.0.1:8000"

const categoryBackgrounds = {
  scooter: "bg-[#d9e8ff]",
  street: "bg-[#e8e1ff]",
  adventure: "bg-[#dff1d8]",
}

const categoryTabs = [
  { key: "all", label: "All" },
  { key: "scooter", label: "Scooters" },
  { key: "street", label: "Street" },
  { key: "adventure", label: "Adventure" },
]

const formatNpr = (rate) => `NPR ${Number(rate).toLocaleString("en-NP")}`

function Icon({ name, className = "h-5 w-5" }) {
  const paths = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m8 10 4 4 4-4" />,
    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  }

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

export default function MotorbikesPage({ onBack, onViewMotorbike }) {
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedId, setSelectedId] = useState(null)
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [brand, setBrand] = useState("All brands")

  useEffect(() => {
    let ignore = false
    fetch(`${API}/api/bikes/`)
      .then((res) => {
        if (!res.ok) throw new Error("Request failed")
        return res.json()
      })
      .then((data) => {
        if (!ignore) setInventory(data)
      })
      .catch(() => {
        if (!ignore)
          setError("Could not load motorbikes. Is the Django server running?")
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })
    return () => {
      ignore = true
    }
  }, [])

  const availableCount = inventory.filter((m) => m.availability).length
  const brands = [...new Set(inventory.map((m) => m.brand))]
  const visibleMotorbikes = inventory.filter(
    (m) =>
      (categoryFilter === "all" || m.category === categoryFilter) &&
      (brand === "All brands" || m.brand === brand),
  )
  const selected = inventory.find((m) => m.id === selectedId)

  return (
    <main className="min-h-screen bg-[#f4f1e8] text-[#10231d]">
      <header className="bg-[#132a22] text-white">
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
          <button
            onClick={onBack}
            className="flex items-center gap-3"
            aria-label="Back to home"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/30">
              <span className="h-4 w-4 rounded-full border-[5px] border-[#d9ff57]" />
            </span>
            <span className="text-[22px] font-bold tracking-[-0.04em]">
              spoke.
            </span>
          </button>
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold transition hover:border-[#d9ff57] hover:text-[#d9ff57]"
          >
            <Icon name="arrow" className="h-4 w-4 rotate-180" /> Back home
          </button>
        </nav>
        <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 sm:px-8 lg:px-12 lg:pb-20 lg:pt-16">
          <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#d9ff57]">
            <Icon name="location" className="h-4 w-4" /> Kathmandu Valley
          </p>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-5xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-7xl">
                Our motorbikes,
                <br />
                <span className="font-serif italic text-[#d9ff57]">
                  every ride in one place.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/65">
                Browse the full fleet, from easy city scooters to tour-ready
                adventure bikes, and pick the one that fits your plans.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d9ff57] opacity-50" />
                <span className="relative h-3 w-3 rounded-full bg-[#d9ff57]" />
              </span>
              <div>
                <p className="text-sm font-bold">
                  {availableCount} motorbikes available
                </p>
                <p className="text-xs text-white/55">Updated just now</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mb-9 flex flex-col justify-between gap-5 border-b border-[#10231d]/15 pb-7 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#607a54]">
              Choose your ride
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em]">
              {visibleMotorbikes.length} motorbikes
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-wrap gap-1">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setCategoryFilter(tab.key)}
                  className={`rounded-full px-5 py-2 text-xs font-bold transition ${
                    categoryFilter === tab.key
                      ? "bg-[#10231d] text-white"
                      : "text-[#627069] hover:bg-black/5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <label className="flex min-w-[220px] items-center gap-3 rounded-xl border border-[#10231d]/15 bg-white px-4 py-3">
              <Icon name="location" className="h-4 w-4 text-[#607a54]" />
              <select
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
                className="w-full appearance-none bg-transparent text-sm font-semibold outline-none"
              >
                <option>All brands</option>
                {brands.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
              <Icon name="chevron" className="h-4 w-4" />
            </label>
          </div>
        </div>

        {loading && (
          <p className="text-sm text-[#718078]">Loading motorbikes…</p>
        )}
        {error && (
          <p className="rounded-xl bg-[#ffe3df] px-4 py-3 text-sm font-semibold text-[#8a2f25]">
            {error}
          </p>
        )}
        {!loading && !error && visibleMotorbikes.length === 0 && (
          <p className="text-sm text-[#718078]">No motorbikes found.</p>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleMotorbikes.map((motorbike) => (
            <article
              key={motorbike.id}
              onClick={() =>
                motorbike.availability &&
                onViewMotorbike(motorbike, motorbike.category, "motorbikes")
              }
              className={`group overflow-hidden rounded-[24px] bg-white shadow-[0_8px_30px_rgba(16,35,29,0.06)] transition ${
                motorbike.availability
                  ? "cursor-pointer hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(16,35,29,0.1)]"
                  : "opacity-60"
              }`}
            >
              <div
                className={`relative aspect-[4/3] overflow-hidden ${
                  categoryBackgrounds[motorbike.category] || "bg-[#f1f5ec]"
                }`}
              >
                {motorbike.image ? (
                  <img
                    src={motorbike.image}
                    alt={`${motorbike.brand} ${motorbike.name} motorbike`}
                    className="h-full w-full object-cover mix-blend-multiply transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center text-sm font-semibold text-[#10231d]/40">
                    No photo yet
                  </div>
                )}
                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.13em] text-[#44603b]">
                  {motorbike.availability ? "Available" : "Unavailable"}
                </span>
                <span className="absolute right-4 top-4 rounded-full bg-[#10231d] px-3 py-1.5 text-[10px] font-bold capitalize text-white">
                  {motorbike.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold tracking-[-0.03em]">
                      {motorbike.brand} {motorbike.name}
                    </h3>
                    <p className="mt-1 text-xs text-[#718078]">
                      {motorbike.engine} · Helmet included
                    </p>
                  </div>
                  <p className="whitespace-nowrap text-right text-lg font-bold">
                    {formatNpr(motorbike.rate)}
                    <span className="block text-[10px] font-medium text-[#718078]">
                      per day
                    </span>
                  </p>
                </div>
                <div className="my-5 h-px bg-[#10231d]/10" />
                <button
                  disabled={!motorbike.availability}
                  onClick={(event) => {
                    event.stopPropagation()
                    setSelectedId(motorbike.id)
                  }}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold transition disabled:cursor-not-allowed disabled:bg-[#10231d]/10 disabled:text-[#10231d]/40 ${
                    selectedId === motorbike.id
                      ? "bg-[#10231d] text-white"
                      : "bg-[#d9ff57] hover:bg-[#c7ef42]"
                  }`}
                >
                  {!motorbike.availability ? (
                    "Unavailable"
                  ) : selectedId === motorbike.id ? (
                    <>
                      <Icon name="check" className="h-4 w-4" /> Selected
                    </>
                  ) : (
                    <>
                      Choose this motorbike{" "}
                      <Icon name="arrow" className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </article>
          ))}
        </div>

        {selected && (
          <div className="sticky bottom-5 mx-auto mt-8 flex max-w-2xl flex-col items-center justify-between gap-4 rounded-2xl bg-[#10231d] p-4 pl-6 text-white shadow-2xl sm:flex-row">
            <div>
              <p className="text-sm font-bold">
                {selected.brand} {selected.name} selected
              </p>
              <p className="text-xs text-white/55">
                {formatNpr(selected.rate)} per day · Pick your dates next.
              </p>
            </div>
            <button
              onClick={() =>
                onViewMotorbike(selected, selected.category, "motorbikes")
              }
              className="w-full rounded-xl bg-[#d9ff57] px-6 py-3 text-sm font-bold text-[#10231d] sm:w-auto"
            >
              Continue to booking
            </button>
          </div>
        )}
      </section>
    </main>
  )
}