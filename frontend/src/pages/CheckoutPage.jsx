import { useState } from "react"

function CheckoutIcon({ name, className = "h-5 w-5" }) {
  const paths = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 4.5 6v5.5c0 4.6 3.2 7.9 7.5 9.5 4.3-1.6 7.5-4.9 7.5-9.5V6L12 3Z" />
        <path d="m9 12 2 2 4-4" />
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

const inputClassName =
  "w-full rounded-xl border border-[#10231d]/15 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#8e9893] focus:border-[#607a54] focus:ring-4 focus:ring-[#607a54]/10"

const API = "http://127.0.0.1:8000"

// Local date as YYYY-MM-DD (toISOString would shift the day in Nepal's timezone)
const toDateString = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${date.getFullYear()}-${month}-${day}`
}

export default function CheckoutPage({
  booking,
  currentUser,
  onBack,
  onHome,
  onNavigate,
}) {
  const [paymentMethod, setPaymentMethod] = useState("pickup")
  const [confirmedBooking, setConfirmedBooking] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const confirmed = confirmedBooking !== null
  const { motorbike, pickupDate, returnDate, rentalDays, totalCost } = booking
  const formatNpr = (rate) => `NPR ${Number(rate).toLocaleString("en-NP")}`
  const formatDate = (date) =>
    date.toLocaleDateString("en-NP", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  const bookingReference = confirmedBooking?.reference ?? ""

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitError("")

    const token = localStorage.getItem("spokeToken")
    if (!currentUser || !token) {
      setSubmitError("Please sign in to complete your booking.")
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`${API}/api/bookings/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          bike: motorbike.id,
          pickup_date: toDateString(pickupDate),
          return_date: toDateString(returnDate),
          payment_method: paymentMethod,
        }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setSubmitError(data.detail || "Could not save your booking.")
        return
      }
      setConfirmedBooking(data)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch {
      setSubmitError("Could not reach the server. Is Django running?")
    } finally {
      setSubmitting(false)
    }
  }

  if (confirmed) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f4f1e8] px-5 py-12 text-[#10231d]">
        <section className="w-full max-w-2xl overflow-hidden rounded-[30px] bg-white text-center shadow-[0_20px_70px_rgba(16,35,29,0.12)]">
          <div className="bg-[#132a22] px-8 py-12 text-white">
            <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#d9ff57] text-[#10231d]">
              <CheckoutIcon name="check" className="h-9 w-9" />
            </span>
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#d9ff57]">
              Booking confirmed
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              You’re ready to ride.
            </h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/60">
              Your {motorbike.brand} {motorbike.name} is reserved. Bring your
              driving licence and booking reference to the rental hub.
            </p>
          </div>

          <div className="p-7 sm:p-10">
            <div className="rounded-2xl bg-[#f4f1e8] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#718078]">
                Booking reference
              </p>
              <p className="mt-2 text-2xl font-bold tracking-[0.08em]">
                {bookingReference}
              </p>
            </div>
            <div className="mt-6 grid gap-4 text-left sm:grid-cols-2">
              <div className="rounded-2xl border border-[#10231d]/10 p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#718078]">
                  Pickup
                </p>
                <p className="mt-2 text-sm font-bold">
                  {formatDate(pickupDate)}
                </p>
              </div>
              <div className="rounded-2xl border border-[#10231d]/10 p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#718078]">
                  Payment
                </p>
                <p className="mt-2 text-sm font-bold">
                  {paymentMethod === "pickup"
                    ? `${formatNpr(totalCost)} at pickup`
                    : formatNpr(totalCost)}
                </p>
              </div>
            </div>
            <button
              onClick={onHome}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#d9ff57] px-6 py-4 text-sm font-bold transition hover:bg-[#c7ef42]"
            >
              Back to home
              <CheckoutIcon name="arrow" className="h-4 w-4" />
            </button>
            <button
              onClick={() => onNavigate("bookings")}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#10231d]/15 px-6 py-4 text-sm font-bold transition hover:bg-[#f4f1e8]"
            >
              View my bookings
            </button>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f4f1e8] text-[#10231d]">
      <header className="bg-[#132a22] text-white">
        <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
          <button
            onClick={onHome}
            className="flex items-center gap-3"
            aria-label="Back to Spoke home"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/30">
              <span className="h-4 w-4 rounded-full border-[5px] border-[#d9ff57]" />
            </span>
            <span className="text-[22px] font-bold tracking-[-0.04em]">
              spoke.
            </span>
          </button>
          <div className="hidden items-center gap-3 text-xs font-semibold text-white/45 sm:flex">
            <span>Choose dates</span>
            <span className="h-px w-7 bg-white/20" />
            <span className="text-[#d9ff57]">Checkout</span>
            <span className="h-px w-7 bg-white/20" />
            <span>Confirmed</span>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-sm font-semibold transition hover:border-[#d9ff57] hover:text-[#d9ff57]"
          >
            <CheckoutIcon name="arrow" className="h-4 w-4 rotate-180" />
            Back
          </button>
        </nav>
      </header>

      <div className="mx-auto max-w-[1280px] px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
        <div className="mb-9">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#607a54]">
            Complete your reservation
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            Checkout.
          </h1>
        </div>

        <form
          id="checkout-form"
          onSubmit={handleSubmit}
          className="grid gap-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-start"
        >
          <div className="space-y-6">
            <section className="rounded-[24px] bg-white p-6 shadow-[0_8px_30px_rgba(16,35,29,0.06)] sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#607a54]">
                    Step 1
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em]">
                    Rider details
                  </h2>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#f1f5ec] text-[#607a54]">
                  <CheckoutIcon name="shield" className="h-5 w-5" />
                </span>
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-bold">
                    Full name
                  </span>
                  <input
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    defaultValue={currentUser?.name || ""}
                    placeholder="Your legal name"
                    className={inputClassName}
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-bold">
                    Phone number
                  </span>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    placeholder="+977 98XXXXXXXX"
                    className={inputClassName}
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-bold">
                    Email address
                  </span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    className={inputClassName}
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-bold">
                    Driving licence number
                  </span>
                  <input
                    name="licence"
                    type="text"
                    required
                    placeholder="Licence number"
                    className={inputClassName}
                  />
                </label>
              </div>
            </section>

            <section className="rounded-[24px] bg-white p-6 shadow-[0_8px_30px_rgba(16,35,29,0.06)] sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#607a54]">
                Step 2
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em]">
                Payment method
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <label
                  className={`cursor-pointer rounded-2xl border p-5 transition ${
                    paymentMethod === "pickup"
                      ? "border-[#10231d] bg-[#f1f5ec]"
                      : "border-[#10231d]/10"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="pickup"
                    checked={paymentMethod === "pickup"}
                    onChange={() => setPaymentMethod("pickup")}
                    className="accent-[#10231d]"
                  />
                  <span className="ml-3 text-sm font-bold">Pay at pickup</span>
                  <p className="mt-3 text-xs leading-5 text-[#718078]">
                    Pay by cash or card when collecting the motorbike.
                  </p>
                </label>
                <label
                  className={`cursor-pointer rounded-2xl border p-5 transition ${
                    paymentMethod === "online"
                      ? "border-[#10231d] bg-[#f1f5ec]"
                      : "border-[#10231d]/10"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                    className="accent-[#10231d]"
                  />
                  <span className="ml-3 text-sm font-bold">Pay online</span>
                  <p className="mt-3 text-xs leading-5 text-[#718078]">
                    Use your debit or credit card securely.
                  </p>
                </label>
              </div>

              {paymentMethod === "online" && (
                <div className="mt-5 grid gap-5 rounded-2xl bg-[#f8f6ef] p-5 sm:grid-cols-2">
                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-xs font-bold">
                      Card number
                    </span>
                    <input
                      name="cardNumber"
                      type="text"
                      inputMode="numeric"
                      required
                      placeholder="0000 0000 0000 0000"
                      className={inputClassName}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold">Expiry</span>
                    <input
                      name="expiry"
                      type="text"
                      required
                      placeholder="MM / YY"
                      className={inputClassName}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold">CVC</span>
                    <input
                      name="cvc"
                      type="text"
                      inputMode="numeric"
                      required
                      placeholder="123"
                      className={inputClassName}
                    />
                  </label>
                </div>
              )}
            </section>
          </div>

          <aside className="overflow-hidden rounded-[24px] bg-white shadow-[0_12px_40px_rgba(16,35,29,0.09)] lg:sticky lg:top-6">
            <div className="relative aspect-[16/9] overflow-hidden bg-[#e8e1ff]">
              {motorbike.image ? (
                <img
                  src={motorbike.image}
                  alt={`${motorbike.brand} ${motorbike.name} booking summary`}
                  className="h-full w-full object-cover mix-blend-multiply"
                />
              ) : (
                <div className="grid h-full w-full place-items-center text-sm font-semibold text-[#10231d]/40">
                  No photo yet
                </div>
              )}
              <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em]">
                Held for 10 minutes
              </span>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#607a54]">
                Booking summary
              </p>
              <div className="mt-3 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-[-0.035em]">
                    {motorbike.brand} {motorbike.name}
                  </h2>
                  <p className="mt-1 text-xs text-[#718078]">
                    {motorbike.engine} · Helmet included
                  </p>
                </div>
                <p className="whitespace-nowrap text-sm font-bold">
                  {formatNpr(motorbike.rate)}/day
                </p>
              </div>

              <div className="my-6 h-px bg-[#10231d]/10" />

              <div className="flex gap-3">
                <CheckoutIcon
                  name="calendar"
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#607a54]"
                />
                <div className="grid flex-1 grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-[#718078]">Pickup</p>
                    <p className="mt-1 font-bold">{formatDate(pickupDate)}</p>
                  </div>
                  <div>
                    <p className="text-[#718078]">Return</p>
                    <p className="mt-1 font-bold">{formatDate(returnDate)}</p>
                  </div>
                </div>
              </div>

              <div className="my-6 h-px bg-[#10231d]/10" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-[#718078]">
                    {formatNpr(motorbike.rate)} × {rentalDays}{" "}
                    {rentalDays === 1 ? "day" : "days"}
                  </span>
                  <span className="font-semibold">{formatNpr(totalCost)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#718078]">Booking fee</span>
                  <span className="font-semibold text-[#607a54]">Free</span>
                </div>
                <div className="flex justify-between gap-4 border-t border-[#10231d]/10 pt-4 text-lg font-bold">
                  <span>Total</span>
                  <span>{formatNpr(totalCost)}</span>
                </div>
              </div>

              {!currentUser && (
                <p className="mt-6 rounded-xl bg-[#f8f6ef] px-4 py-3 text-xs leading-5 text-[#66736d]">
                  You need an account to book.{" "}
                  <button
                    type="button"
                    onClick={() => onNavigate("login")}
                    className="font-bold text-[#10231d] underline decoration-[#d9ff57] decoration-2 underline-offset-4"
                  >
                    Sign in
                  </button>
                </p>
              )}
              {submitError && (
                <p
                  className="mt-6 rounded-xl bg-[#ffe3df] px-4 py-3 text-sm font-semibold text-[#8a2f25]"
                  role="alert"
                >
                  {submitError}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting || !currentUser}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#d9ff57] px-6 py-4 text-sm font-bold transition hover:bg-[#c7ef42] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting
                  ? "Saving your booking…"
                  : paymentMethod === "pickup"
                    ? "Confirm booking"
                    : `Pay ${formatNpr(totalCost)}`}
                {!submitting && (
                  <CheckoutIcon name="arrow" className="h-4 w-4" />
                )}
              </button>
              <p className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] text-[#718078]">
                <CheckoutIcon name="shield" className="h-4 w-4" />
                Your personal details are protected.
              </p>
            </div>
          </aside>
        </form>
      </div>
    </main>
  )
}