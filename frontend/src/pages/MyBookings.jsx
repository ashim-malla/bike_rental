import { useEffect, useState } from "react"

const API = "http://127.0.0.1:8000"

const categoryBackgrounds = {
  scooter: "bg-[#d9e8ff]",
  street: "bg-[#e8e1ff]",
  adventure: "bg-[#dff1d8]",
}

const statusStyles = {
  upcoming: { label: "Upcoming", className: "bg-[#e7f2df] text-[#34552d]" },
  active: { label: "On the road", className: "bg-[#d9ff57] text-[#10231d]" },
  completed: {
    label: "Completed",
    className: "bg-[#10231d]/10 text-[#10231d]/60",
  },
  cancelled: { label: "Cancelled", className: "bg-[#ffe3df] text-[#8a2f25]" },
}

const filters = [
  { key: "all", label: "All" },
  { key: "upcoming", label: "Upcoming" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
]

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

function BookingIcon({ name, className = "h-5 w-5" }) {
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

export default function MyBookingsPage({
  onHome,
  onDashboard,
  onBrowse,
}) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState("all")
  const [cancellingId, setCancellingId] = useState(null)

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

  const cancelBooking = async (booking) => {
    if (!window.confirm(`Cancel booking ${booking.reference}?`)) return
    setCancellingId(booking.id)
    setError("")

    try {
      const res = await fetch(`${API}/api/bookings/${booking.id}/cancel/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("spokeToken")}`,
        },
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setError(data.detail || "Could not cancel this booking.")
        return
      }
      setBookings((list) => list.map((b) => (b.id === data.id ? data : b)))
    } catch {
      setError("Could not reach the server. Is Django running?")
    } finally {
      setCancellingId(null)
    }
  }

  const visibleBookings = bookings.filter((booking) => {
    if (filter === "all") return true
    const status = getStatus(booking)
    return filter === "upcoming"
      ? status === "upcoming" || status === "active"
      : status === filter
  })

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
            onClick={onDashboard}
            className="flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold transition hover:border-[#d9ff57] hover:text-[#d9ff57]"
          >
            <BookingIcon name="arrow" className="h-4 w-4 rotate-180" /> My
            dashboard
          </button>
        </nav>
        <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 sm:px-8 lg:px-12 lg:pb-20 lg:pt-16">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[#d9ff57]">
            My bookings
          </p>
          <h1 className="text-5xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-7xl">
            Your rides,
            <br />
            <span className="font-serif italic text-[#d9ff57]">
              all in one place.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/65">
            Every motorbike you have booked, with pickup dates, totals and
            status.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-[1100px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mb-8 flex flex-col justify-between gap-5 border-b border-[#10231d]/15 pb-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#607a54]">
              Your rentals
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em]">
              {visibleBookings.length}{" "}
              {visibleBookings.length === 1 ? "booking" : "bookings"}
            </h2>
          </div>
          <div className="flex flex-wrap gap-1">
            {filters.map((item) => (
              <button
                key={item.key}
                onClick={() => setFilter(item.key)}
                className={`rounded-full px-5 py-2 text-xs font-bold transition ${
                  filter === item.key
                    ? "bg-[#10231d] text-white"
                    : "text-[#627069] hover:bg-black/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <p className="text-sm text-[#718078]">Loading your bookings…</p>
        )}
        {error && (
          <p
            className="mb-5 rounded-xl bg-[#ffe3df] px-4 py-3 text-sm font-semibold text-[#8a2f25]"
            role="alert"
          >
            {error}
          </p>
        )}
        {!loading && !error && visibleBookings.length === 0 && (
          <div className="rounded-[24px] bg-white p-8 text-center shadow-[0_8px_30px_rgba(16,35,29,0.06)]">
            <p className="text-lg font-bold">
              {bookings.length === 0
                ? "No bookings yet."
                : "Nothing in this view."}
            </p>
            <p className="mt-2 text-sm text-[#718078]">
              {bookings.length === 0
                ? "Pick a motorbike and your reservation will show up here."
                : "Try a different filter."}
            </p>
            {bookings.length === 0 && (
              <button
                onClick={onBrowse}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#d9ff57] px-6 py-3 text-sm font-bold transition hover:bg-[#c7ef42]"
              >
                Book a motorbike
                <BookingIcon name="arrow" className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

        <div className="space-y-5">
          {visibleBookings.map((booking) => {
            const status = getStatus(booking)
            const style = statusStyles[status]

            return (
              <article
                key={booking.id}
                className="overflow-hidden rounded-[24px] bg-white shadow-[0_8px_30px_rgba(16,35,29,0.06)] sm:flex"
              >
                <div
                  className={`relative min-h-[170px] shrink-0 overflow-hidden sm:w-56 ${
                    categoryBackgrounds[booking.bike.category] || "bg-[#f1f5ec]"
                  }`}
                >
                  {booking.bike.image ? (
                    <img
                      src={booking.bike.image}
                      alt={`${booking.bike.brand} ${booking.bike.name}`}
                      className="absolute inset-0 h-full w-full object-cover mix-blend-multiply"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-sm font-semibold text-[#10231d]/40">
                      No photo yet
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#718078]">
                        {booking.reference}
                      </p>
                      <h3 className="mt-1 text-xl font-bold tracking-[-0.03em]">
                        {booking.bike.brand} {booking.bike.name}
                      </h3>
                      <p className="mt-1 text-xs text-[#718078]">
                        {booking.bike.engine}
                        {booking.bike.registration_number &&
                          ` · ${booking.bike.registration_number}`}
                      </p>
                    </div>
                    <span
                      className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] ${style.className}`}
                    >
                      {style.label}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-3 text-sm">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f1f5ec] text-[#607a54]">
                      <BookingIcon name="calendar" className="h-4 w-4" />
                    </span>
                    <p className="font-semibold">
                      {formatDate(booking.pickup_date)} –{" "}
                      {formatDate(booking.return_date)}
                      <span className="block text-xs font-normal text-[#718078]">
                        {booking.rental_days}{" "}
                        {booking.rental_days === 1 ? "day" : "days"} ·{" "}
                        {booking.payment_method === "pickup"
                          ? "Pay at pickup"
                          : "Pay online"}
                      </span>
                    </p>
                  </div>

                  <div className="mt-5 flex items-end justify-between gap-4 border-t border-[#10231d]/10 pt-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#718078]">
                        Total
                      </p>
                      <p className="text-xl font-bold tracking-[-0.03em]">
                        {formatNpr(booking.total_cost)}
                      </p>
                    </div>
                    {status === "upcoming" && (
                      <button
                        onClick={() => cancelBooking(booking)}
                        disabled={cancellingId === booking.id}
                        className="rounded-xl border border-[#10231d]/15 px-4 py-2.5 text-xs font-bold transition hover:bg-[#ffe3df] hover:text-[#8a2f25] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {cancellingId === booking.id
                          ? "Cancelling…"
                          : "Cancel booking"}
                      </button>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}