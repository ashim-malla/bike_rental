import { useState } from "react"

function MenuIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export default function Navbar({ currentUser, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navigateTo = (page) => {
    setMenuOpen(false)
    onNavigate(page)
  }

  return (
    <>
      <nav className="relative z-20 mx-auto flex max-w-[1440px] items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <a href="#" className="flex items-center gap-3" aria-label="Spoke home">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/30">
            <span className="h-4 w-4 rounded-full border-[5px] border-[#d9ff57]" />
          </span>
          <span className="text-[22px] font-bold tracking-[-0.04em]">
            spoke.
          </span>
        </a>

        <div className="hidden items-center gap-10 text-sm font-medium lg:flex">
          <a className="transition hover:text-[#d9ff57]" href="#motorbikes">
            Our motorbikes
          </a>
          <a className="transition hover:text-[#d9ff57]" href="#how">
            How it works
          </a>
          <a className="transition hover:text-[#d9ff57]" href="#locations">
            Locations
          </a>
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          {currentUser ? (
            <div className="flex items-center gap-2.5 text-sm font-semibold">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xs text-[#d9ff57]">
                {currentUser.name.charAt(0).toUpperCase()}
              </span>
              <span className="max-w-36 truncate">{currentUser.name}</span>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigateTo("login")}
                className="text-sm font-semibold transition hover:text-[#d9ff57]"
              >
                Sign in
              </button>
              <button
                onClick={() => navigateTo("signup")}
                className="text-sm font-semibold transition hover:text-[#d9ff57]"
              >
                Sign up
              </button>
            </>
          )}
          <a
            href="#book"
            className="rounded-full bg-[#d9ff57] px-6 py-3 text-sm font-bold text-[#10231d] transition hover:bg-white"
          >
            Book a motorbike
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {currentUser ? (
            <span className="max-w-24 truncate text-xs font-bold text-[#d9ff57] sm:max-w-40">
              {currentUser.name}
            </span>
          ) : (
            <div className="flex items-center gap-2 text-xs font-bold">
              <button
                onClick={() => navigateTo("login")}
                className="rounded-full border border-white/30 px-3 py-2"
              >
                Log in
              </button>
              <button
                onClick={() => navigateTo("signup")}
                className="rounded-full bg-[#d9ff57] px-3 py-2 text-[#10231d]"
              >
                Sign up
              </button>
            </div>
          )}
          <button
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
            className="rounded-full border border-white/30 p-2.5"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <MenuIcon />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="absolute left-5 right-5 top-20 z-30 rounded-2xl bg-[#f4f1e8] p-6 text-[#10231d] shadow-2xl lg:hidden">
          <div className="flex flex-col gap-5 font-semibold">
            <a onClick={() => setMenuOpen(false)} href="#motorbikes">
              Our motorbikes
            </a>
            <a onClick={() => setMenuOpen(false)} href="#how">
              How it works
            </a>
            <a onClick={() => setMenuOpen(false)} href="#locations">
              Locations
            </a>
            {currentUser ? (
              <div className="flex items-center gap-3 rounded-xl bg-[#10231d]/5 p-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#10231d] text-xs text-[#d9ff57]">
                  {currentUser.name.charAt(0).toUpperCase()}
                </span>
                <span className="truncate">{currentUser.name}</span>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigateTo("login")}
                  className="text-left"
                >
                  Sign in
                </button>
                <button
                  onClick={() => navigateTo("signup")}
                  className="text-left"
                >
                  Sign up
                </button>
              </>
            )}
            <a
              onClick={() => setMenuOpen(false)}
              href="#book"
              className="rounded-full bg-[#d9ff57] px-5 py-3 text-center"
            >
              Book a motorbike
            </a>
          </div>
        </div>
      )}
    </>
  )
}
