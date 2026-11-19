import { useState } from "react"
import AuthLayout, { AuthIcon } from "../components/AuthLayout"

export default function LoginPage({ onNavigate, onAuthenticated }) {
  const [formMessage, setFormMessage] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const emailName = String(formData.get("email"))
      .split("@")[0]
      .split(/[._-]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")

    onAuthenticated({ name: emailName || "Spoke Rider" })
  }

  return (
    <AuthLayout onHome={() => onNavigate("home")}>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#607a54]">
        Welcome back
      </p>
      <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
        Sign in to ride.
      </h2>
      <p className="mt-4 text-sm leading-6 text-[#66736d]">
        Access your bookings, saved details, and upcoming rides.
      </p>

      <form onSubmit={handleSubmit} className="mt-9 space-y-5">
        <label className="block">
          <span className="mb-2 block text-xs font-bold">Email address</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-xl border border-[#10231d]/15 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#8e9893] focus:border-[#607a54] focus:ring-4 focus:ring-[#607a54]/10"
          />
        </label>

        <label className="block">
          <span className="mb-2 flex items-center justify-between text-xs font-bold">
            Password
            <button
              type="button"
              onClick={() =>
                setFormMessage(
                  "Password reset instructions will be sent to your email.",
                )
              }
              className="font-semibold text-[#607a54] hover:underline"
            >
              Forgot password?
            </button>
          </span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            minLength={8}
            placeholder="Your password"
            className="w-full rounded-xl border border-[#10231d]/15 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#8e9893] focus:border-[#607a54] focus:ring-4 focus:ring-[#607a54]/10"
          />
        </label>

        {formMessage && (
          <p
            className="flex items-center gap-2 rounded-xl bg-[#e7f2df] px-4 py-3 text-sm font-semibold text-[#34552d]"
            role="status"
          >
            <AuthIcon name="check" className="h-4 w-4" /> {formMessage}
          </p>
        )}

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#10231d] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#1e3b31]"
        >
          Sign in
          <AuthIcon name="arrow" className="h-4 w-4" />
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-[#66736d]">
        New to Spoke?{" "}
        <button
          onClick={() => onNavigate("signup")}
          className="font-bold text-[#10231d] underline decoration-[#d9ff57] decoration-4 underline-offset-4"
        >
          Create an account
        </button>
      </p>
    </AuthLayout>
  )
}
