import { useEffect, useState } from "react"

const API = "http://127.0.0.1:8000"

const categoryBackgrounds = {
  scooter: "bg-[#d9e8ff]",
  street: "bg-[#e8e1ff]",
  adventure: "bg-[#dff1d8]",
}

const formatNpr = (value) => `NPR ${Number(value).toLocaleString("en-NP")}`
const toDate = (value) => new Date(`${value}T00:00:00`)
const formatDate = (value) =>
  toDate(value).toLocaleDateString("en-NP", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

function getStatus(booking) {
  if (booking.status === "cancelled") return "cancelled"
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (toDate(booking.return_date) < today) return "completed"
  if (toDate(booking.pickup_date) <= today) return "active"
  return "upcoming"
}

function DashIcon({ name, className = "h-5 w-5" }) {
  const paths = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
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

export default function DashboardPage({
  currentUser,
  onHome,
  onBookings,
  onBrowse,
  onLogout,
}) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("spokeToken")
    let ignore = false

    fetch(`${API}/api/bookings/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Request failed")
        return res.json()
      })
      .then((data) => {
        if (!ignore) setBookings(data)
      })
      .catch(() => {
        if (!ignore)
          setError("Could not load your bookings. Is the Django server running?")
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [])

  const counts = bookings.reduce(
    (total, booking) => {
      total[getStatus(booking)] += 1
      return total
    },
    { upcoming: 0, active: 0, completed: 0, cancelled: 0 },
  )
  const nextBooking = bookings
    .filter((b) => ["upcoming", "active"].includes(getStatus(b)))
    .sort((a, b) => toDate(a.pickup_date) - toDate(b.pickup_date))[0]
  const firstName = currentUser.name.split(" ")[0]

  return (
    <main className="min-h-screen bg-[#f4f1e8] text-[#10231d]">
      <header className="bg-[#132a22] text-white">
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
          <button
            onClick={onHome}
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
            onClick={onHome}
            className="flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold transition hover:border-[#d9ff57] hover:text-[#d9ff57]"
          >
            <DashIcon name="arrow" className="h-4 w-4 rotate-180" /> Back home
          </button>
        </nav>
        <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 sm:px-8 lg:px-12 lg:pb-20 lg:pt-16">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[#d9ff57]">
            My dashboard
          </p>
          <h1 className="text-5xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-7xl">
            Hello, {firstName},
            <br />
            <span className="font-serif italic text-[#d9ff57]">
              ready to ride?
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/65">
            Your details, your next trip and a quick look at your rentals.
          </p>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1440px] gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:px-12 lg:py-16">
        <aside className="rounded-[26px] bg-white p-6 shadow-[0_10px_35px_rgba(16,35,29,0.06)] sm:p-8 lg:sticky lg:top-6">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-[#10231d] text-lg font-bold text-[#d9ff57]">
              {currentUser.name.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#607a54]">
                Customer details
              </p>
              <h2 className="mt-1 truncate text-2xl font-bold tracking-[-0.035em]">
                {currentUser.name}
              </h2>
            </div>
          </div>

          <div className="mt-6 space-y-4 border-t border-[#10231d]/10 pt-6 text-sm">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#718078]">
                Full name
              </p>
              <p className="mt-1 font-semibold">{currentUser.name}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#718078]">
                Email
              </p>
              <p className="mt-1 break-all font-semibold">
                {currentUser.email}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#718078]">
                Phone
              </p>
              <p className="mt-1 font-semibold">
                {currentUser.phone || "Not added"}
              </p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="mt-8 w-full rounded-xl border border-[#10231d]/15 px-5 py-3 text-sm font-bold transition hover:bg-[#f4f1e8]"
          >
            Sign out
          </button>
        </aside>

        <div className="space-y-6">
          {error && (
            <p
              className="rounded-xl bg-[#ffe3df] px-4 py-3 text-sm font-semibold text-[#8a2f25]"
              role="alert"
            >
              {error}
            </p>
          )}

          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-[#10231d]/10">
            {[
              ["Upcoming", counts.upcoming + counts.active],
              ["Completed", counts.completed],
              ["Cancelled", counts.cancelled],
            ].map(([label, value]) => (
              <div key={label} className="bg-[#f8f6ef] p-5 sm:p-6">
                <p className="text-3xl font-semibold tracking-[-0.045em]">
                  {loading ? "–" : value}
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#718078]">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <section className="overflow-hidden rounded-[26px] bg-white shadow-[0_10px_35px_rgba(16,35,29,0.06)]">
            <div className="p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#607a54]">
                Next trip
              </p>
            </div>

            {nextBooking ? (
              <div className="sm:flex">
                <div
                  className={`relative min-h-[170px] shrink-0 overflow-hidden sm:w-56 ${
                    categoryBackgrounds[nextBooking.bike.category] ||
                    "bg-[#f1f5ec]"
                  }`}
                >
                  {nextBooking.bike.image ? (
                    <img
                      src={nextBooking.bike.image}
                      alt={`${nextBooking.bike.brand} ${nextBooking.bike.name}`}
                      className="absolute inset-0 h-full w-full object-cover mix-blend-multiply"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-sm font-semibold text-[#10231d]/40">
                      No photo yet
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8 sm:pt-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#718078]">
                    {nextBooking.reference}
                  </p>
                  <h3 className="mt-1 text-2xl font-bold tracking-[-0.035em]">
                    {nextBooking.bike.brand} {nextBooking.bike.name}
                  </h3>
                  <div className="mt-4 flex items-center gap-3 text-sm">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f1f5ec] text-[#607a54]">
                      <DashIcon name="calendar" className="h-4 w-4" />
                    </span>
                    <p className="font-semibold">
                      {formatDate(nextBooking.pickup_date)} –{" "}
                      {formatDate(nextBooking.return_date)}
                      <span className="block text-xs font-normal text-[#718078]">
                        {nextBooking.rental_days}{" "}
                        {nextBooking.rental_days === 1 ? "day" : "days"} ·{" "}
                        {formatNpr(nextBooking.total_cost)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-6 pb-8 sm:px-8">
                <p className="text-lg font-bold">
                  {loading ? "Loading…" : "No upcoming trips."}
                </p>
                {!loading && (
                  <p className="mt-2 text-sm text-[#718078]">
                    Pick a motorbike and your next trip will show up here.
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-3 border-t border-[#10231d]/10 p-6 sm:px-8">
              <button
                onClick={onBookings}
                className="flex items-center gap-2 rounded-full bg-[#10231d] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1e3b31]"
              >
                View all my bookings
                <DashIcon name="arrow" className="h-4 w-4" />
              </button>
              <button
                onClick={onBrowse}
                className="flex items-center gap-2 rounded-full bg-[#d9ff57] px-6 py-3 text-sm font-bold transition hover:bg-[#c7ef42]"
              >
                Book a motorbike
                <DashIcon name="arrow" className="h-4 w-4" />
              </button>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}