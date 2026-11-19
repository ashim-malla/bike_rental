import { useState } from "react"
import Navbar from "./components/Navbar"
import CheckoutPage from "./pages/CheckoutPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"

function Icon({ name, className = "h-5 w-5" }) {
  const paths = {
    arrow: (
      <>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m8 10 4 4 4-4" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
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
    spark: (
      <path d="m12 2 1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2ZM18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8L18 16Z" />
    ),
    star: (
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
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

const motorbikeTypes = [
  {
    name: "The Scooter",
    page: "scooter",
    type: "Easy city rides",
    price: 1800,
    color: "bg-[#d9e8ff]",
    image:
      "https://images.unsplash.com/photo-1554223789-df81106a45ed?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "The Street",
    page: "street",
    type: "Everyday power",
    price: 2500,
    color: "bg-[#e8e1ff]",
    image:
      "https://images.unsplash.com/photo-1610886147082-2f8dfa0c1f1b?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "The Adventure",
    page: "adventure",
    type: "Beyond the city",
    price: 3500,
    color: "bg-[#dff1d8]",
    image:
      "https://images.unsplash.com/photo-1627028411626-e417caae90ac?auto=format&fit=crop&w=900&q=85",
  },
]

const availableCityMotorbikes = [
  {
    id: "SC-104",
    name: "Yamaha Ray ZR",
    station: "Thamel hub",
    distance: "2 min walk",
    engine: "125cc · Automatic",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1554223789-df81106a45ed?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "SC-118",
    name: "Honda Dio",
    station: "Thamel hub",
    distance: "2 min walk",
    engine: "110cc · Automatic",
    price: 1700,
    image:
      "https://images.unsplash.com/photo-1597755269789-89407cf1a199?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "ST-127",
    name: "Bajaj Pulsar",
    station: "Durbar Marg",
    distance: "6 min walk",
    engine: "150cc · 5-speed",
    price: 2400,
    image:
      "https://images.unsplash.com/photo-1610886147082-2f8dfa0c1f1b?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "ST-132",
    name: "TVS Apache",
    station: "Lazimpat",
    distance: "8 min walk",
    engine: "160cc · 5-speed",
    price: 2600,
    image:
      "https://images.unsplash.com/photo-1606837731961-c5211df9aa10?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "SC-145",
    name: "Aprilia SR",
    station: "Patan hub",
    distance: "11 min walk",
    engine: "125cc · Automatic",
    price: 2100,
    image:
      "https://images.unsplash.com/photo-1612163803167-530551f280ca?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "ST-151",
    name: "Yamaha FZ",
    station: "Boudha hub",
    distance: "14 min walk",
    engine: "150cc · 5-speed",
    price: 2800,
    image:
      "https://images.unsplash.com/photo-1627028411626-e417caae90ac?auto=format&fit=crop&w=900&q=85",
  },
]

const availableStreetMotorbikes = [
  {
    id: "ST-204",
    name: "Yamaha FZ V3",
    station: "Thamel hub",
    distance: "2 min walk",
    engine: "150cc · 5-speed",
    price: 2800,
    image:
      "https://images.unsplash.com/photo-1495480393121-409eb65c7fbe?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "ST-218",
    name: "TVS Apache RTR",
    station: "Thamel hub",
    distance: "2 min walk",
    engine: "160cc · 5-speed",
    price: 2900,
    image:
      "https://images.unsplash.com/photo-1784631912592-a21ac9d05984?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "ST-227",
    name: "Bajaj Pulsar N160",
    station: "Durbar Marg",
    distance: "6 min walk",
    engine: "160cc · 5-speed",
    price: 2700,
    image:
      "https://images.unsplash.com/photo-1776164020959-7a284d72db31?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "ST-232",
    name: "Honda Hornet",
    station: "Lazimpat",
    distance: "8 min walk",
    engine: "184cc · 5-speed",
    price: 3200,
    image:
      "https://images.unsplash.com/photo-1792178607072-bb8ef7276cf5?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "ST-245",
    name: "Suzuki Gixxer",
    station: "Patan hub",
    distance: "11 min walk",
    engine: "155cc · 5-speed",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1759770384302-8bc811e29acb?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "ST-251",
    name: "KTM Duke 200",
    station: "Boudha hub",
    distance: "14 min walk",
    engine: "200cc · 6-speed",
    price: 3800,
    image:
      "https://images.unsplash.com/photo-1763380270054-fad681b11348?auto=format&fit=crop&w=900&q=85",
  },
]

const availableAdventureMotorbikes = [
  {
    id: "AD-304",
    name: "Royal Enfield Himalayan",
    station: "Thamel hub",
    distance: "2 min walk",
    engine: "411cc · 5-speed",
    price: 4800,
    image:
      "https://images.unsplash.com/photo-1764748067741-1215f8975c22?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "AD-318",
    name: "KTM Adventure 250",
    station: "Thamel hub",
    distance: "2 min walk",
    engine: "250cc · 6-speed",
    price: 5200,
    image:
      "https://images.unsplash.com/photo-1771427795503-74fa80babf5d?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "AD-327",
    name: "Honda CRF 250L",
    station: "Balaju hub",
    distance: "9 min walk",
    engine: "250cc · 6-speed",
    price: 5500,
    image:
      "https://images.unsplash.com/photo-1771184031738-7ff9bae1965e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "AD-332",
    name: "BMW G 310 GS",
    station: "Patan hub",
    distance: "11 min walk",
    engine: "313cc · 6-speed",
    price: 6500,
    image:
      "https://images.unsplash.com/photo-1761415476148-4637cc80d5d0?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "AD-345",
    name: "Yezdi Adventure",
    station: "Boudha hub",
    distance: "14 min walk",
    engine: "334cc · 6-speed",
    price: 4600,
    image:
      "https://images.unsplash.com/photo-1781036725046-56d24290d1bd?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "AD-351",
    name: "Hero XPulse 200",
    station: "Bhaktapur hub",
    distance: "18 min walk",
    engine: "200cc · 5-speed",
    price: 3900,
    image:
      "https://images.unsplash.com/photo-1781036725018-51e4499354c6?auto=format&fit=crop&w=900&q=85",
  },
]

const availabilityPages = {
  scooter: {
    title: "City scooters,",
    accent: "ready to ride.",
    description:
      "Light, automatic, and easy to handle. Choose a city scooter for effortless everyday exploring.",
    inventory: availableCityMotorbikes,
    imageBackground: "bg-[#d9e8ff]",
  },
  street: {
    title: "Street motorbikes,",
    accent: "made to move.",
    description:
      "Responsive power and confident handling for city streets, ring roads, and everyday escapes.",
    inventory: availableStreetMotorbikes,
    imageBackground: "bg-[#e8e1ff]",
  },
  adventure: {
    title: "Adventure bikes,",
    accent: "go beyond.",
    description:
      "Tour-ready machines built for mountain roads, long days, and journeys beyond the valley.",
    inventory: availableAdventureMotorbikes,
    imageBackground: "bg-[#dff1d8]",
  },
}

const formatNpr = (price) => `NPR ${price.toLocaleString("en-NP")}`

function MotorbikeAvailabilityPage({ category, onBack, onViewMotorbike }) {
  const pageDetails = availabilityPages[category]
  const { inventory } = pageDetails
  const [selectedMotorbike, setSelectedMotorbike] = useState("")
  const [station, setStation] = useState("All rental hubs")
  const visibleMotorbikes =
    station === "All rental hubs"
      ? inventory
      : inventory.filter((motorbike) => motorbike.station === station)
  const stations = [...new Set(inventory.map((motorbike) => motorbike.station))]

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
                {pageDetails.title}
                <br />
                <span className="font-serif italic text-[#d9ff57]">
                  {pageDetails.accent}
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/65">
                {pageDetails.description}
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d9ff57] opacity-50" />
                <span className="relative h-3 w-3 rounded-full bg-[#d9ff57]" />
              </span>
              <div>
                <p className="text-sm font-bold">
                  {inventory.length} motorbikes available
                </p>
                <p className="text-xs text-white/55">Updated just now</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mb-9 flex flex-col justify-between gap-5 border-b border-[#10231d]/15 pb-7 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#607a54]">
              Available now
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em]">
              {visibleMotorbikes.length} motorbikes near you
            </h2>
          </div>
          <label className="flex min-w-[220px] items-center gap-3 rounded-xl border border-[#10231d]/15 bg-white px-4 py-3">
            <Icon name="location" className="h-4 w-4 text-[#607a54]" />
            <select
              value={station}
              onChange={(event) => setStation(event.target.value)}
              className="w-full appearance-none bg-transparent text-sm font-semibold outline-none"
            >
              <option>All rental hubs</option>
              {stations.map((rentalHub) => (
                <option key={rentalHub}>{rentalHub}</option>
              ))}
            </select>
            <Icon name="chevron" className="h-4 w-4" />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleMotorbikes.map((motorbike) => (
            <article
              key={motorbike.id}
              onClick={() => onViewMotorbike(motorbike, category)}
              className="group cursor-pointer overflow-hidden rounded-[24px] bg-white shadow-[0_8px_30px_rgba(16,35,29,0.06)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(16,35,29,0.1)]"
            >
              <div
                className={`relative aspect-[4/3] overflow-hidden ${pageDetails.imageBackground}`}
              >
                <img
                  src={motorbike.image}
                  alt={`${motorbike.name} motorbike available to rent`}
                  className="h-full w-full object-cover mix-blend-multiply transition duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.13em] text-[#44603b]">
                  Available
                </span>
                <span className="absolute right-4 top-4 rounded-full bg-[#10231d] px-3 py-1.5 text-[10px] font-bold text-white">
                  {motorbike.id}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold tracking-[-0.03em]">
                      {motorbike.name}
                    </h3>
                    <p className="mt-1 text-xs text-[#718078]">
                      {motorbike.engine} · Helmet included
                    </p>
                  </div>
                  <p className="whitespace-nowrap text-right text-lg font-bold">
                    {formatNpr(motorbike.price)}
                    <span className="block text-[10px] font-medium text-[#718078]">
                      per day
                    </span>
                  </p>
                </div>
                <div className="my-5 h-px bg-[#10231d]/10" />
                <div className="mb-5 flex items-center gap-3 text-sm">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#f1f5ec] text-[#607a54]">
                    <Icon name="location" className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-semibold">{motorbike.station}</p>
                    <p className="text-xs text-[#718078]">
                      {motorbike.distance}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(event) => {
                    event.stopPropagation()
                    setSelectedMotorbike(motorbike.id)
                  }}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold transition ${
                    selectedMotorbike === motorbike.id
                      ? "bg-[#10231d] text-white"
                      : "bg-[#d9ff57] hover:bg-[#c7ef42]"
                  }`}
                >
                  {selectedMotorbike === motorbike.id ? (
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
        {selectedMotorbike && (
          <div className="sticky bottom-5 mx-auto mt-8 flex max-w-2xl flex-col items-center justify-between gap-4 rounded-2xl bg-[#10231d] p-4 pl-6 text-white shadow-2xl sm:flex-row">
            <div>
              <p className="text-sm font-bold">
                {selectedMotorbike} is held for 10 minutes
              </p>
              <p className="text-xs text-white/55">
                Complete your booking to reserve it.
              </p>
            </div>
            <button className="w-full rounded-xl bg-[#d9ff57] px-6 py-3 text-sm font-bold text-[#10231d] sm:w-auto">
              Continue to booking
            </button>
          </div>
        )}
      </section>
    </main>
  )
}

function getMotorbikeSpecs(motorbike) {
  const serial = Number(motorbike.id.split("-")[1])
  const isAdventure = motorbike.id.startsWith("AD")

  return {
    seats: 2,
    model: isAdventure ? "2023 Touring" : "2024",
    fuelType: "Petrol",
    numberPlate: `BA ${Math.floor(serial / 10)} PA ${4000 + serial}`,
  }
}

function addDays(date, days) {
  const nextDate = new Date(date)
  nextDate.setDate(nextDate.getDate() + days)
  return nextDate
}

function isSameDay(firstDate, secondDate) {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  )
}

function getPreBookings(motorbike, today) {
  const serial = Number(motorbike.id.split("-")[1])
  const firstStart = addDays(today, 5 + (serial % 5))
  const firstEnd = addDays(firstStart, 2 + (serial % 3))
  const secondStart = addDays(firstEnd, 8 + (serial % 4))
  const secondEnd = addDays(secondStart, 2)

  return [
    { start: firstStart, end: firstEnd },
    { start: secondStart, end: secondEnd },
  ]
}

function MotorbikeDetailPage({
  motorbike,
  category,
  onBack,
  onHome,
  onCheckout,
}) {
  const [selectedStart, setSelectedStart] = useState(null)
  const [selectedEnd, setSelectedEnd] = useState(null)
  const [selectionError, setSelectionError] = useState("")
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const [calendarMonth, setCalendarMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  )
  const specs = getMotorbikeSpecs(motorbike)
  const pageDetails = availabilityPages[category]
  const preBookings = getPreBookings(motorbike, today)
  const nextPreBooking = preBookings.find((booking) => booking.start > today)
  const availableDays = nextPreBooking
    ? Math.round((nextPreBooking.start - today) / 86400000)
    : null
  const monthStart = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth(),
    1,
  )
  const calendarStart = addDays(monthStart, -monthStart.getDay())
  const calendarDays = Array.from({ length: 42 }, (_, index) =>
    addDays(calendarStart, index),
  )
  const formatBookingDate = (date) =>
    date.toLocaleDateString("en-NP", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  const isPreBooked = (date) =>
    preBookings.some((booking) => date >= booking.start && date <= booking.end)
  const rentalDays =
    selectedStart && selectedEnd
      ? Math.round((selectedEnd - selectedStart) / 86400000) + 1
      : 0
  const selectionComplete = rentalDays > 0
  const totalCost = motorbike.price * rentalDays
  const selectRentalDate = (date) => {
    setSelectionError("")

    if (!selectedStart || selectedEnd || date < selectedStart) {
      setSelectedStart(date)
      setSelectedEnd(null)
      return
    }

    const rangeIncludesBooking = preBookings.some(
      (booking) => selectedStart <= booking.end && date >= booking.start,
    )

    if (rangeIncludesBooking) {
      setSelectionError(
        "That date range overlaps a pre-booking. Please choose an earlier return date.",
      )
      return
    }

    setSelectedEnd(date)
  }
  const specificationItems = [
    ["Seats", `${specs.seats} people`],
    ["Model", specs.model],
    ["Fuel type", specs.fuelType],
    ["Number plate", specs.numberPlate],
  ]

  return (
    <main className="min-h-screen bg-[#f4f1e8] text-[#10231d]">
      <header className="bg-[#132a22] text-white">
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
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
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-sm font-semibold transition hover:border-[#d9ff57] hover:text-[#d9ff57] sm:px-5"
          >
            <Icon name="arrow" className="h-4 w-4 rotate-180" />
            <span className="hidden sm:inline">Back to availability</span>
            <span className="sm:hidden">Back</span>
          </button>
        </nav>
      </header>

      <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
        <button
          onClick={onBack}
          className="mb-7 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#607a54] transition hover:text-[#10231d]"
        >
          <Icon name="arrow" className="h-4 w-4 rotate-180" />
          {pageDetails.title.replace(",", "")}
        </button>

        <div className="grid overflow-hidden rounded-[30px] bg-white shadow-[0_18px_60px_rgba(16,35,29,0.09)] lg:grid-cols-[1.08fr_0.92fr]">
          <div
            className={`relative min-h-[380px] overflow-hidden sm:min-h-[520px] lg:min-h-[650px] ${pageDetails.imageBackground}`}
          >
            <img
              src={motorbike.image}
              alt={`${motorbike.name} rental motorbike`}
              className="absolute inset-0 h-full w-full object-cover mix-blend-multiply"
            />
            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#77a85f]" />
              Available now
            </div>
            <span className="absolute right-5 top-5 rounded-full bg-[#10231d] px-4 py-2 text-xs font-bold text-white">
              {motorbike.id}
            </span>
          </div>

          <div className="flex flex-col p-7 sm:p-10 lg:p-12 xl:p-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#607a54]">
                Spoke certified motorbike
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-none tracking-[-0.05em] sm:text-6xl">
                {motorbike.name}
              </h1>
              <p className="mt-4 text-sm text-[#718078]">
                {motorbike.engine} · Helmet included
              </p>
            </div>

            <div className="my-8 h-px bg-[#10231d]/10" />

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[#10231d]/10">
              {specificationItems.map(([label, value]) => (
                <div key={label} className="bg-[#f8f6ef] p-5 sm:p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#718078]">
                    {label}
                  </p>
                  <p className="mt-2 text-base font-bold tracking-[-0.02em] sm:text-lg">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-[#10231d]/10 p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f1f5ec] text-[#607a54]">
                <Icon name="location" className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold">{motorbike.station}</p>
                <p className="text-xs text-[#718078]">
                  {motorbike.distance} · Pick up from this rental hub
                </p>
              </div>
            </div>

            <div className="mt-auto pt-9">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#718078]">
                    {selectionComplete
                      ? `Total cost · ${rentalDays} ${
                          rentalDays === 1 ? "day" : "days"
                        }`
                      : "Daily rental"}
                  </p>
                  <p className="mt-1 text-3xl font-bold tracking-[-0.04em]">
                    {formatNpr(selectionComplete ? totalCost : motorbike.price)}
                  </p>
                </div>
                {selectionComplete ? (
                  <p className="text-right text-xs leading-5 text-[#718078]">
                    {formatNpr(motorbike.price)} × {rentalDays}
                    <br />
                    Helmet included
                  </p>
                ) : (
                  <p className="text-right text-xs leading-5 text-[#718078]">
                    Free cancellation
                    <br />
                    Helmet included
                  </p>
                )}
              </div>
              <button
                onClick={() =>
                  onCheckout({
                    motorbike,
                    category,
                    pickupDate: selectedStart,
                    returnDate: selectedEnd,
                    rentalDays,
                    totalCost,
                  })
                }
                disabled={!selectionComplete}
                className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-bold transition ${
                  !selectionComplete
                    ? "cursor-not-allowed bg-[#10231d]/10 text-[#10231d]/40"
                    : "bg-[#d9ff57] text-[#10231d] hover:bg-[#c7ef42]"
                }`}
              >
                {selectionComplete
                  ? "Continue to checkout"
                  : "Select rental dates first"}
                {selectionComplete && <Icon name="arrow" className="h-4 w-4" />}
              </button>
              {!selectionComplete && (
                <p className="mt-3 text-center text-xs text-[#718078]">
                  Select your pickup and return dates in the calendar below.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <section className="rounded-[26px] bg-white p-6 shadow-[0_10px_35px_rgba(16,35,29,0.06)] sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#607a54]">
                  Rental schedule
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em]">
                  Availability calendar
                </h2>
                <p className="mt-2 text-xs text-[#718078]">
                  {!selectedStart
                    ? "Select a pickup date, then choose your return date."
                    : !selectedEnd
                      ? `Pickup: ${formatBookingDate(selectedStart)} · Now select a return date.`
                      : `${rentalDays} ${
                          rentalDays === 1 ? "day" : "days"
                        } selected.`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCalendarMonth(
                      new Date(
                        calendarMonth.getFullYear(),
                        calendarMonth.getMonth() - 1,
                        1,
                      ),
                    )
                  }
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#10231d]/15 transition hover:bg-[#f4f1e8]"
                  aria-label="Previous month"
                >
                  <Icon name="arrow" className="h-4 w-4 rotate-180" />
                </button>
                <button
                  onClick={() =>
                    setCalendarMonth(
                      new Date(
                        calendarMonth.getFullYear(),
                        calendarMonth.getMonth() + 1,
                        1,
                      ),
                    )
                  }
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#10231d]/15 transition hover:bg-[#f4f1e8]"
                  aria-label="Next month"
                >
                  <Icon name="arrow" className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-7 flex items-center justify-between">
              <p className="text-lg font-bold">
                {calendarMonth.toLocaleDateString("en-NP", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <button
                onClick={() =>
                  setCalendarMonth(
                    new Date(today.getFullYear(), today.getMonth(), 1),
                  )
                }
                className="text-xs font-bold text-[#607a54] hover:underline"
              >
                Today
              </button>
            </div>

            <div className="mt-5 grid grid-cols-7 gap-1.5 text-center">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (weekday) => (
                  <span
                    key={weekday}
                    className="py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#839089]"
                  >
                    {weekday}
                  </span>
                ),
              )}
              {calendarDays.map((date) => {
                const outsideMonth =
                  date.getMonth() !== calendarMonth.getMonth()
                const pastDate = date < today
                const preBooked = isPreBooked(date)
                const currentDay = isSameDay(date, today)
                const selectedBoundary =
                  (selectedStart && isSameDay(date, selectedStart)) ||
                  (selectedEnd && isSameDay(date, selectedEnd))
                const selectedRange =
                  selectedStart &&
                  selectedEnd &&
                  date > selectedStart &&
                  date < selectedEnd
                const unavailable = outsideMonth || pastDate || preBooked

                return (
                  <button
                    type="button"
                    key={date.toISOString()}
                    onClick={() => selectRentalDate(date)}
                    disabled={unavailable}
                    className={`relative grid aspect-square place-items-center rounded-xl text-xs font-bold sm:text-sm ${
                      selectedBoundary
                        ? "bg-[#d9ff57] text-[#10231d] shadow-sm"
                        : selectedRange
                          ? "bg-[#efffc0] text-[#34552d]"
                          : outsideMonth
                            ? "text-[#10231d]/20"
                            : pastDate
                              ? "bg-[#10231d]/5 text-[#10231d]/30"
                              : preBooked
                                ? "bg-[#ffe3df] text-[#8a2f25]"
                                : "cursor-pointer bg-[#f1f5ec] text-[#34552d] transition hover:bg-[#d9ff57]"
                    } ${
                      currentDay ? "ring-2 ring-[#10231d] ring-offset-2" : ""
                    }`}
                    title={
                      preBooked
                        ? "Pre-booked"
                        : pastDate
                          ? "Past date"
                          : "Available"
                    }
                  >
                    {date.getDate()}
                    {preBooked && !outsideMonth && (
                      <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-[#c55b4c]" />
                    )}
                  </button>
                )
              })}
            </div>

            {selectionError && (
              <p
                className="mt-5 rounded-xl bg-[#ffe3df] px-4 py-3 text-sm font-semibold text-[#8a2f25]"
                role="alert"
              >
                {selectionError}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-5 border-t border-[#10231d]/10 pt-5 text-xs font-semibold text-[#66736d]">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded bg-[#d9ff57]" /> Selected
              </span>
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded bg-[#f1f5ec]" /> Available
              </span>
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded bg-[#ffe3df]" /> Pre-booked
              </span>
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded bg-[#10231d]/10" /> Past date
              </span>
            </div>
          </section>

          <aside className="flex flex-col rounded-[26px] bg-[#132a22] p-7 text-white shadow-[0_10px_35px_rgba(16,35,29,0.12)] sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#d9ff57]">
              Current availability
            </p>
            <div className="mt-7 border-b border-white/15 pb-7">
              <p className="text-5xl font-semibold tracking-[-0.055em] text-[#d9ff57]">
                {availableDays}
              </p>
              <p className="mt-2 text-xl font-bold">days available</p>
              <p className="mt-3 text-sm leading-6 text-white/60">
                This motorbike can be booked from today until the next
                pre-booking begins.
              </p>
            </div>

            {selectionComplete && (
              <div className="mt-7 rounded-2xl bg-white/8 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#d9ff57]">
                  Your rental
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.12em] text-white/40">
                      Pickup
                    </p>
                    <p className="mt-1 text-sm font-bold">
                      {formatBookingDate(selectedStart)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.12em] text-white/40">
                      Return
                    </p>
                    <p className="mt-1 text-sm font-bold">
                      {formatBookingDate(selectedEnd)}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-4">
                  <p className="text-sm text-white/60">
                    {rentalDays} {rentalDays === 1 ? "day" : "days"}
                  </p>
                  <p className="text-xl font-bold text-[#d9ff57]">
                    {formatNpr(totalCost)}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-7">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                Upcoming pre-bookings
              </p>
              <div className="mt-4 space-y-3">
                {preBookings.map((booking, index) => (
                  <div
                    key={booking.start.toISOString()}
                    className="rounded-xl bg-white/8 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-bold">
                        Reservation {index + 1}
                      </p>
                      {index === 0 && (
                        <span className="rounded-full bg-[#d9ff57] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#10231d]">
                          Next
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-xs leading-5 text-white/55">
                      {formatBookingDate(booking.start)} –{" "}
                      {formatBookingDate(booking.end)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-7">
              <div className="flex items-start gap-3 rounded-xl border border-white/15 p-4">
                <Icon
                  name="calendar"
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#d9ff57]"
                />
                <p className="text-xs leading-5 text-white/60">
                  Choose dates before the first red block to avoid overlapping
                  an existing reservation.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default function App() {
  const [rentalType, setRentalType] = useState("daily")
  const [bookingMessage, setBookingMessage] = useState("")
  const [page, setPage] = useState("home")
  const [currentUser, setCurrentUser] = useState(null)
  const [detailMotorbike, setDetailMotorbike] = useState(null)
  const [checkoutBooking, setCheckoutBooking] = useState(null)

  const openPage = (nextPage) => {
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const submitBooking = () => {
    setBookingMessage("Great choice — 12 motorbikes are available near Thamel.")
  }

  const completeAuthentication = (user) => {
    setCurrentUser(user)
    openPage("home")
  }

  const openMotorbikeDetail = (motorbike, category) => {
    setDetailMotorbike({ motorbike, category })
    openPage("motorbike-detail")
  }

  const openCheckout = (booking) => {
    setCheckoutBooking(booking)
    openPage("checkout")
  }

  if (page === "login") {
    return (
      <LoginPage
        onNavigate={openPage}
        onAuthenticated={completeAuthentication}
      />
    )
  }

  if (page === "signup") {
    return (
      <SignupPage
        onNavigate={openPage}
        onAuthenticated={completeAuthentication}
      />
    )
  }

  if (page === "checkout" && checkoutBooking) {
    return (
      <CheckoutPage
        booking={checkoutBooking}
        currentUser={currentUser}
        onBack={() => openPage("motorbike-detail")}
        onHome={() => openPage("home")}
      />
    )
  }

  if (page === "motorbike-detail" && detailMotorbike) {
    return (
      <MotorbikeDetailPage
        motorbike={detailMotorbike.motorbike}
        category={detailMotorbike.category}
        onBack={() => openPage(detailMotorbike.category)}
        onCheckout={openCheckout}
        onHome={() => openPage("home")}
      />
    )
  }

  if (availabilityPages[page]) {
    return (
      <MotorbikeAvailabilityPage
        category={page}
        onBack={() => openPage("home")}
        onViewMotorbike={openMotorbikeDetail}
      />
    )
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f1e8] text-[#10231d]">
      <section className="relative min-h-[780px] bg-[#132a22] text-white lg:min-h-[830px]">
        <div className="absolute inset-0 lg:left-[49%]">
          <img
            src="https://images.unsplash.com/photo-1674271641929-9a109157bf02?auto=format&fit=crop&w=1500&q=88"
            alt="Motorbike rider moving through the city"
            className="h-full w-full object-cover object-[center_37%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#132a22]/30 via-[#132a22]/25 to-[#132a22] lg:bg-gradient-to-r lg:from-[#132a22] lg:via-[#132a22]/20 lg:to-transparent" />
        </div>

        <Navbar currentUser={currentUser} onNavigate={openPage} />

        <div className="relative z-10 mx-auto max-w-[1440px] px-5 pt-14 sm:px-8 lg:px-12 lg:pt-20">
          <div className="max-w-[660px]">
            <p className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#d9ff57]">
              <Icon name="spark" className="h-4 w-4" /> Your city, your ride
            </p>
            <h1 className="max-w-[640px] text-[54px] font-semibold leading-[0.93] tracking-[-0.055em] sm:text-[76px] lg:text-[92px]">
              Go further.
              <br />
              <span className="font-serif italic text-[#d9ff57]">
                Ride easy.
              </span>
            </h1>
            <p className="mt-7 max-w-[500px] text-base leading-7 text-white/72 sm:text-lg">
              Premium motorbikes, ready when you are. Move through the city and
              beyond on your own terms.
            </p>
          </div>

          <div
            id="book"
            className="mt-10 w-full max-w-[1050px] rounded-[22px] bg-[#fffdf7] p-2 text-[#10231d] shadow-[0_24px_80px_rgba(0,0,0,0.22)] lg:mt-14"
          >
            <div className="flex gap-1 p-1 pb-2">
              {["daily", "hourly"].map((type) => (
                <button
                  key={type}
                  onClick={() => setRentalType(type)}
                  className={`rounded-full px-5 py-2 text-xs font-bold capitalize transition ${
                    rentalType === type
                      ? "bg-[#10231d] text-white"
                      : "text-[#627069] hover:bg-black/5"
                  }`}
                >
                  {type} rental
                </button>
              ))}
            </div>
            <div className="grid overflow-hidden rounded-2xl border border-[#10231d]/10 bg-white sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_auto]">
              <label className="flex items-center gap-4 border-b border-[#10231d]/10 px-5 py-4 sm:border-r lg:border-b-0">
                <Icon
                  name="location"
                  className="h-5 w-5 shrink-0 text-[#56704c]"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[#7b867f]">
                    Pick-up location
                  </span>
                  <select className="mt-1 w-full appearance-none bg-transparent text-sm font-semibold outline-none">
                    <option>Thamel hub</option>
                    <option>Durbar Marg</option>
                    <option>Patan hub</option>
                  </select>
                </span>
                <Icon name="chevron" className="h-4 w-4" />
              </label>
              <label className="flex items-center gap-4 border-b border-[#10231d]/10 px-5 py-4 sm:border-r lg:border-b-0">
                <Icon
                  name="calendar"
                  className="h-5 w-5 shrink-0 text-[#56704c]"
                />
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[#7b867f]">
                    Pick-up
                  </span>
                  <input
                    type="date"
                    defaultValue="2026-06-18"
                    className="mt-1 w-full bg-transparent text-sm font-semibold outline-none"
                  />
                </span>
              </label>
              <label className="flex items-center gap-4 px-5 py-4 sm:border-r">
                <Icon
                  name={rentalType === "daily" ? "calendar" : "clock"}
                  className="h-5 w-5 shrink-0 text-[#56704c]"
                />
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[#7b867f]">
                    {rentalType === "daily" ? "Return" : "Duration"}
                  </span>
                  {rentalType === "daily" ? (
                    <input
                      type="date"
                      defaultValue="2026-06-20"
                      className="mt-1 w-full bg-transparent text-sm font-semibold outline-none"
                    />
                  ) : (
                    <select className="mt-1 bg-transparent text-sm font-semibold outline-none">
                      <option>4 hours</option>
                      <option>8 hours</option>
                    </select>
                  )}
                </span>
              </label>
              <button
                onClick={submitBooking}
                className="m-2 flex items-center justify-center gap-3 rounded-xl bg-[#d9ff57] px-7 py-4 text-sm font-bold transition hover:bg-[#c7ef42]"
              >
                Find a motorbike <Icon name="arrow" className="h-4 w-4" />
              </button>
            </div>
            {bookingMessage && (
              <p className="px-4 py-3 text-sm font-semibold text-[#44603b]">
                {bookingMessage}
              </p>
            )}
          </div>
        </div>
      </section>

      <section
        id="motorbikes"
        className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#607a54]">
              Meet the fleet
            </p>
            <h2 className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-6xl">
              A motorbike for every journey.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[#5f6a65]">
            From quick coffee runs to all-day adventures, every ride is tuned,
            clean, and ready to roll.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {motorbikeTypes.map((motorbike, index) => (
            <article
              key={motorbike.name}
              onClick={() => openPage(motorbike.page)}
              className="group cursor-pointer overflow-hidden rounded-[26px] bg-white"
            >
              <div
                className={`relative aspect-[4/3] overflow-hidden ${motorbike.color}`}
              >
                <img
                  src={motorbike.image}
                  alt={`${motorbike.name} rental motorbike`}
                  className="h-full w-full object-cover mix-blend-multiply transition duration-700 group-hover:scale-105"
                />
                <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em]">
                  {motorbike.type}
                </span>
                <span className="absolute right-5 top-5 text-xs font-bold">
                  0{index + 1}
                </span>
              </div>
              <div className="flex items-end justify-between p-6">
                <div>
                  <h3 className="text-2xl font-bold tracking-[-0.03em]">
                    {motorbike.name}
                  </h3>
                  <p className="mt-1 text-sm text-[#748079]">
                    From {formatNpr(motorbike.price)} / day
                  </p>
                </div>
                <button
                  onClick={() => openPage(motorbike.page)}
                  aria-label={`View ${motorbike.name}`}
                  className="grid h-11 w-11 place-items-center rounded-full bg-[#10231d] text-white transition group-hover:bg-[#d9ff57] group-hover:text-[#10231d]"
                >
                  <Icon name="arrow" className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="how"
        className="bg-[#d9ff57] px-5 py-20 sm:px-8 lg:px-12 lg:py-24"
      >
        <div className="mx-auto grid max-w-[1344px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em]">
              How it works
            </p>
            <h2 className="text-4xl font-semibold leading-[1.03] tracking-[-0.045em] sm:text-6xl">
              Three steps.
              <br />
              <span className="font-serif italic">Zero hassle.</span>
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[24px] bg-[#10231d]/15 md:grid-cols-3">
            {[
              [
                "01",
                "Choose your ride",
                "Pick the motorbike that fits your plans, from easy scooters to adventure bikes.",
              ],
              [
                "02",
                "Book in seconds",
                "Select your rental hub and dates. No paperwork, no waiting around.",
              ],
              [
                "03",
                "Gear up and go",
                "Grab your helmet, collect your keys, and make the journey yours.",
              ],
            ].map(([number, title, text]) => (
              <div key={number} className="bg-[#d9ff57] p-7 lg:p-8">
                <span className="text-xs font-bold">{number}</span>
                <div className="my-8 h-px bg-[#10231d]/25" />
                <h3 className="text-xl font-bold tracking-[-0.025em]">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#3c4c40]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="locations"
        className="bg-[#10231d] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-24"
      >
        <div className="mx-auto grid max-w-[1344px] overflow-hidden rounded-[30px] bg-[#203a31] lg:grid-cols-2">
          <div className="p-8 sm:p-12 lg:p-16">
            <div className="flex items-center gap-1 text-[#d9ff57]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon key={star} name="star" className="h-4 w-4 fill-current" />
              ))}
              <span className="ml-3 text-xs font-bold text-white">
                4.9 from 2,000+ riders
              </span>
            </div>
            <blockquote className="mt-10 max-w-xl text-3xl font-medium leading-[1.2] tracking-[-0.035em] sm:text-4xl">
              “The easiest part of our trip. We picked up two motorbikes in
              minutes and explored more of the valley in one afternoon than we
              thought possible.”
            </blockquote>
            <div className="mt-9 flex items-center gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-[#d9ff57] font-bold text-[#10231d]">
                JM
              </div>
              <div>
                <p className="text-sm font-bold">Jamie & Morgan</p>
                <p className="text-xs text-white/55">Weekend riders</p>
              </div>
            </div>
          </div>
          <div className="relative min-h-[380px]">
            <img
              src="https://images.unsplash.com/photo-1650731657643-e602cbff9bad?auto=format&fit=crop&w=1200&q=85"
              alt="Motorbike riders exploring the city"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl bg-[#fffdf7] p-4 text-[#10231d] shadow-xl">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#d9ff57]">
                  <Icon name="location" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold">12 rental hubs citywide</p>
                  <p className="text-xs text-[#718078]">
                    There’s always a motorbike nearby
                  </p>
                </div>
              </div>
              <Icon name="arrow" className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-[1344px] flex-col items-start justify-between gap-8 border-t border-white/15 pt-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/30">
              <span className="h-3.5 w-3.5 rounded-full border-4 border-[#d9ff57]" />
            </span>
            <span className="text-xl font-bold tracking-[-0.04em]">spoke.</span>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs text-white/60">
            <span className="flex items-center gap-2">
              <Icon name="shield" className="h-4 w-4" /> Ride protected
            </span>
            <span className="flex items-center gap-2">
              <Icon name="check" className="h-4 w-4" /> Free cancellation
            </span>
            <span>© 2026 Spoke Motorbike Rentals</span>
          </div>
        </div>
      </section>
    </main>
  )
}
