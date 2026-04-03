import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-100 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <p className="text-sm font-semibold text-foreground">
              One World Hands
            </p>
            <p className="mt-3 text-sm leading-6 text-neutral-700">
              For the world, with a magic touch. We empower individuals and
              support communities through education, direct action, and
              collaboration.
            </p>
            <p className="mt-6 text-sm leading-6 text-neutral-700">
              <span className="font-semibold text-neutral-900">One World Hands</span>{" "}
              — A global initiative for humanity, unity, and hope. With every
              magic touch, we make our world a little brighter.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Quick Links</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-neutral-700 transition-colors hover:text-sky-700"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="text-sm text-neutral-700 transition-colors hover:text-sky-700"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/programs"
                  className="text-sm text-neutral-700 transition-colors hover:text-sky-700"
                >
                  Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/donation-funds"
                  className="text-sm text-neutral-700 transition-colors hover:text-sky-700"
                >
                  Donation Funds
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-sm text-neutral-700 transition-colors hover:text-sky-700"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/updates"
                  className="text-sm text-neutral-700 transition-colors hover:text-sky-700"
                >
                  Updates
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-neutral-700 transition-colors hover:text-sky-700"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Programs</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/programs#food-assistance"
                  className="text-sm text-neutral-700 transition-colors hover:text-sky-700"
                >
                  Food Assistance Program
                </Link>
              </li>
              <li>
                <Link
                  href="/programs#emergency-relief"
                  className="text-sm text-neutral-700 transition-colors hover:text-sky-700"
                >
                  Emergency Relief Program
                </Link>
              </li>
              <li>
                <Link
                  href="/programs#medical-assistance"
                  className="text-sm text-neutral-700 transition-colors hover:text-sky-700"
                >
                  Medical Assistance Program
                </Link>
              </li>
              <li>
                <Link
                  href="/programs#winter-support"
                  className="text-sm text-neutral-700 transition-colors hover:text-sky-700"
                >
                  Winter Support Program
                </Link>
              </li>
              <li>
                <Link
                  href="/programs#education-support"
                  className="text-sm text-neutral-700 transition-colors hover:text-sky-700"
                >
                  Education Support Program
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/programs"
                  className="inline-flex items-center text-sm font-semibold text-sky-700 transition-colors hover:text-sky-800"
                >
                  View all programs
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="ml-1 h-4 w-4"
                    fill="none"
                  >
                    <path
                      d="M5 12h12M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Donation Funds</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/donation-funds#hunger-relief"
                  className="text-sm text-neutral-700 transition-colors hover:text-sky-700"
                >
                  Hunger Relief Fund
                </Link>
              </li>
              <li>
                <Link
                  href="/donation-funds#emergency-relief"
                  className="text-sm text-neutral-700 transition-colors hover:text-sky-700"
                >
                  Emergency Relief Fund
                </Link>
              </li>
              <li>
                <Link
                  href="/donation-funds#medical-aid"
                  className="text-sm text-neutral-700 transition-colors hover:text-sky-700"
                >
                  Medical Aid Fund
                </Link>
              </li>
              <li>
                <Link
                  href="/donation-funds#winter-support"
                  className="text-sm text-neutral-700 transition-colors hover:text-sky-700"
                >
                  Winter Support Fund
                </Link>
              </li>
              <li>
                <Link
                  href="/donation-funds#general-donation"
                  className="text-sm text-neutral-700 transition-colors hover:text-sky-700"
                >
                  General Donation Fund
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/donation-funds"
                  className="inline-flex items-center text-sm font-semibold text-sky-700 transition-colors hover:text-sky-800"
                >
                  View all donation funds
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="ml-1 h-4 w-4"
                    fill="none"
                  >
                    <path
                      d="M5 12h12M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Contact</p>
            <ul className="mt-3 space-y-2">
              <li className="text-sm text-neutral-700">
                Email:{" "}
                <a
                  className="font-medium text-neutral-900 underline-offset-4 hover:underline"
                  href="mailto:hello@oneworldhands.org"
                >
                  hello@oneworldhands.org
                </a>
              </li>
              <li className="text-sm text-neutral-700">
                Phone:{" "}
                <a
                  className="font-medium text-neutral-900 underline-offset-4 hover:underline"
                  href="tel:+10000000000"
                >
                  +1 (000) 000-0000
                </a>
              </li>
              <li className="text-sm text-neutral-700">
                Address: <span className="font-medium">City, Country</span>{" "}
                (Placeholder)
              </li>
            </ul>

            <div className="mt-6">
              <p className="text-sm font-semibold text-foreground">Social</p>
              <div className="mt-3 flex flex-wrap gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-neutral-700 transition-colors hover:text-sky-700"
                >
                  Facebook
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-neutral-700 transition-colors hover:text-sky-700"
                >
                  Instagram
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-neutral-700 transition-colors hover:text-sky-700"
                >
                  LinkedIn
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-neutral-700 transition-colors hover:text-sky-700"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-neutral-200 pt-6 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} One World Hands. All rights reserved.</p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="transition-colors hover:text-sky-700"
              aria-label="Privacy policy"
            >
              Privacy
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-sky-700"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

