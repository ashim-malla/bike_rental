function AuthIcon({ name, className = "h-5 w-5" }) {
  const paths = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    check: <path d="m5 12 4 4L19 6" />,
    shield: (
      <>
        <path d="M12 3 4.5 6v5.5c0 4.6 3.2 7.9 7.5 9.5 4.3-1.6 7.5-4.9 7.5-9.5V6L12 3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    spark: (
      <path d="m12 2 1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2ZM18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8L18 16Z" />
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

function BrandMark({ inverse = false }) {
  return (
    <>
      <span
        className={`grid h-10 w-10 place-items-center rounded-full border ${
          inverse ? "border-white/30" : "border-[#10231d]/20"
        }`}
      >
        <span
          className={`h-4 w-4 rounded-full border-[5px] ${
            inverse ? "border-[#d9ff57]" : "border-[#607a54]"
          }`}
        />
      </span>
      <span className="text-[22px] font-bold tracking-[-0.04em]">spoke.</span>
    </>
  )
}

export { AuthIcon }

export default function AuthLayout({ children, onHome }) {
  return (
    <main className="grid min-h-screen bg-[#f4f1e8] text-[#10231d] lg:grid-cols-[0.82fr_1.18fr]">
      <section className="relative hidden overflow-hidden bg-[#132a22] p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
        <div className="absolute -right-32 top-1/2 h-[460px] w-[460px] -translate-y-1/2 rounded-full border border-white/10" />
        <div className="absolute -right-16 top-1/2 h-[320px] w-[320px] -translate-y-1/2 rounded-full border border-[#d9ff57]/25" />
        <button
          onClick={onHome}
          className="relative z-10 flex w-fit items-center gap-3"
          aria-label="Back to Spoke home"
        >
          <BrandMark inverse />
        </button>

        <div className="relative z-10 max-w-lg">
          <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#d9ff57]">
            <AuthIcon name="spark" className="h-4 w-4" /> Your next ride starts
            here
          </p>
          <h1 className="text-6xl font-semibold leading-[0.96] tracking-[-0.055em] xl:text-7xl">
            Ride more.
            <br />
            <span className="font-serif italic text-[#d9ff57]">
              Worry less.
            </span>
          </h1>
          <p className="mt-7 max-w-md text-base leading-7 text-white/65">
            Save your details, manage bookings, and get on the road faster with
            your Spoke account.
          </p>
        </div>

        <div className="relative z-10 flex gap-6 text-xs text-white/55">
          <span className="flex items-center gap-2">
            <AuthIcon name="shield" className="h-4 w-4 text-[#d9ff57]" /> Secure
            account
          </span>
          <span className="flex items-center gap-2">
            <AuthIcon name="check" className="h-4 w-4 text-[#d9ff57]" /> Faster
            bookings
          </span>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-[510px]">
          <div className="mb-12 flex items-center justify-between lg:hidden">
            <button
              onClick={onHome}
              className="flex items-center gap-3"
              aria-label="Back to Spoke home"
            >
              <BrandMark />
            </button>
            <button
              onClick={onHome}
              className="flex items-center gap-2 text-sm font-semibold"
            >
              <AuthIcon name="arrow" className="h-4 w-4 rotate-180" /> Home
            </button>
          </div>
          {children}
        </div>
      </section>
    </main>
  )
}
