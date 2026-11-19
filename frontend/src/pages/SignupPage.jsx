import { useState } from "react"
import AuthLayout, { AuthIcon } from "../components/AuthLayout"

export default function SignupPage({ onNavigate, onAuthenticated }) {
  const [formError, setFormError] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    setFormError("")

    const formData = new FormData(event.currentTarget)
    if (formData.get("password") !== formData.get("confirmPassword")) {
      setFormError("Your passwords do not match. Please try again.")
      return
    }

    onAuthenticated({ name: String(formData.get("fullName")).trim() })
  }

  return (
    <AuthLayout onHome={() => onNavigate("home")}>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#607a54]">
        Join Spoke
      </p>
      <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
        Create your account.
      </h2>
      <p className="mt-4 text-sm leading-6 text-[#66736d]">
        Set up your account and reserve your next motorbike in minutes.
      </p>

      <form onSubmit={handleSubmit} className="mt-9 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-xs font-bold">Full name</span>
            <input
              name="fullName"
              type="text"
              autoComplete="name"
              required
              placeholder="Your name"
              className="w-full rounded-xl border border-[#10231d]/15 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#8e9893] focus:border-[#607a54] focus:ring-4 focus:ring-[#607a54]/10"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-bold">Phone number</span>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              placeholder="+977 98XXXXXXXX"
              className="w-full rounded-xl border border-[#10231d]/15 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#8e9893] focus:border-[#607a54] focus:ring-4 focus:ring-[#607a54]/10"
            />
          </label>
        </div>

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
          <span className="mb-2 block text-xs font-bold">Password</span>
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="At least 8 characters"
            className="w-full rounded-xl border border-[#10231d]/15 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#8e9893] focus:border-[#607a54] focus:ring-4 focus:ring-[#607a54]/10"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold">Confirm password</span>
          <input
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="Enter your password again"
            className="w-full rounded-xl border border-[#10231d]/15 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#8e9893] focus:border-[#607a54] focus:ring-4 focus:ring-[#607a54]/10"
          />
        </label>

        <label className="flex items-start gap-3 text-xs leading-5 text-[#66736d]">
          <input
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 accent-[#10231d]"
          />
          <span>
            I agree to the rental terms, privacy policy, and rider safety
            guidelines.
          </span>
        </label>

        {formError && (
          <p
            className="rounded-xl bg-[#ffe3df] px-4 py-3 text-sm font-semibold text-[#8a2f25]"
            role="alert"
          >
            {formError}
          </p>
        )}
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#10231d] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#1e3b31]"
        >
          Create account
          <AuthIcon name="arrow" className="h-4 w-4" />
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-[#66736d]">
        Already have an account?{" "}
        <button
          onClick={() => onNavigate("login")}
          className="font-bold text-[#10231d] underline decoration-[#d9ff57] decoration-4 underline-offset-4"
        >
          Sign in
        </button>
      </p>
    </AuthLayout>
  )
}
