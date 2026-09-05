import Link from "next/link";
import { FaHandshake, FaMapPin, FaEnvelope, FaPhone, FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { MdInfo, MdShoppingCart, MdBook, MdLocalDining, MdEmergency, MdLocalHospital, MdSchool } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import { TbLock } from "react-icons/tb";

export default function Footer() {
  return (
    <footer className="border-t-2 border-neutral-200 bg-linear-to-b from-white to-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <FaHandshake className="text-2xl text-sky-600" />
              <p className="text-lg font-bold bg-linear-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                One World Hands
              </p>
            </div>
            <p className="mt-3 text-sm leading-6 text-neutral-700">
              For the world, with a magic touch. We empower individuals and
              support communities through education, direct action, and
              collaboration.
            </p>
            <p className="mt-6 text-sm leading-6 text-neutral-700">
              <span className="font-bold text-neutral-900">One World Hands</span>{" "}
              — A global initiative for humanity, unity, and hope.
            </p>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-neutral-900">Quick Links</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="text-sm font-medium text-neutral-700 transition-all hover:text-sky-600 hover:translate-x-1 flex items-center gap-1"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="text-sm font-medium text-neutral-700 transition-all hover:text-sky-600 hover:translate-x-1 flex items-center gap-1"
                >
                  <MdInfo className="text-base" /> About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/programs"
                  className="text-sm font-medium text-neutral-700 transition-all hover:text-sky-600 hover:translate-x-1 flex items-center gap-1"
                >
                  <MdShoppingCart className="text-base" /> Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/donation-funds"
                  className="text-sm font-medium text-neutral-700 transition-all hover:text-sky-600 hover:translate-x-1 flex items-center gap-1"
                >
                  <GiMoneyStack className="text-base" /> Donation Funds
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-sm font-medium text-neutral-700 transition-all hover:text-sky-600 hover:translate-x-1 flex items-center gap-1"
                >
                  <MdBook className="text-base" /> Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/updates"
                  className="text-sm font-medium text-neutral-700 transition-all hover:text-sky-600 hover:translate-x-1 flex items-center gap-1"
                >
                  Updates
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm font-medium text-neutral-700 transition-all hover:text-sky-600 hover:translate-x-1 flex items-center gap-1"
                >
                  <FaEnvelope className="text-base" /> Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-neutral-900">Programs</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/programs#food-assistance"
                  className="text-sm font-medium text-neutral-700 transition-all hover:text-sky-600 hover:translate-x-1"
                >
                  <MdLocalDining className="inline mr-2" /> Food Assistance
                </Link>
              </li>
              <li>
                <Link
                  href="/programs#emergency-relief"
                  className="text-sm font-medium text-neutral-700 transition-all hover:text-sky-600 hover:translate-x-1"
                >
                  <MdEmergency className="inline mr-2" /> Emergency Relief
                </Link>
              </li>
              <li>
                <Link
                  href="/programs#medical-assistance"
                  className="text-sm font-medium text-neutral-700 transition-all hover:text-sky-600 hover:translate-x-1"
                >
                  <MdLocalHospital className="inline mr-2" /> Medical Assistance
                </Link>
              </li>
              <li>
                <Link
                  href="/programs#winter-support"
                  className="text-sm font-medium text-neutral-700 transition-all hover:text-sky-600 hover:translate-x-1"
                >
                  Winter Support
                </Link>
              </li>
              <li>
                <Link
                  href="/programs#education-support"
                  className="text-sm font-medium text-neutral-700 transition-all hover:text-sky-600 hover:translate-x-1"
                >
                  <MdSchool className="inline mr-2" /> Education Support
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-2 text-sm font-bold text-sky-600 transition-all hover:text-sky-800 hover:translate-x-1"
                >
                  View all programs →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-neutral-900">Donation Funds</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/donation-funds#hunger-relief"
                  className="text-sm font-medium text-neutral-700 transition-all hover:text-sky-600 hover:translate-x-1"
                >
                  <MdLocalDining className="inline mr-2" /> Hunger Relief
                </Link>
              </li>
              <li>
                <Link
                  href="/donation-funds#emergency-relief"
                  className="text-sm font-medium text-neutral-700 transition-all hover:text-sky-600 hover:translate-x-1"
                >
                  <MdEmergency className="inline mr-2" /> Emergency Relief
                </Link>
              </li>
              <li>
                <Link
                  href="/donation-funds#medical-aid"
                  className="text-sm font-medium text-neutral-700 transition-all hover:text-sky-600 hover:translate-x-1"
                >
                  <MdLocalHospital className="inline mr-2" /> Medical Aid
                </Link>
              </li>
              <li>
                <Link
                  href="/donation-funds#winter-support"
                  className="text-sm font-medium text-neutral-700 transition-all hover:text-sky-600 hover:translate-x-1"
                >
                  Winter Support
                </Link>
              </li>
              <li>
                <Link
                  href="/donation-funds#general-donation"
                  className="text-sm font-medium text-neutral-700 transition-all hover:text-sky-600 hover:translate-x-1"
                >
                  General Donation
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/donation-funds"
                  className="inline-flex items-center gap-2 text-sm font-bold text-sky-600 transition-all hover:text-sky-800 hover:translate-x-1"
                >
                  View all funds →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-neutral-900 flex items-center gap-2"><FaEnvelope className="text-base" /> Contact</p>
            <ul className="mt-4 space-y-3">
              <li className="text-sm text-neutral-700 flex items-center">
                <FaEnvelope className="mr-2 text-sky-600" />
                <a
                  className="font-bold text-sky-600 underline-offset-4 hover:underline transition-colors"
                  href="mailto:hello@oneworldhands.org"
                >
                  hello@oneworldhands.org
                </a>
              </li>
              <li className="text-sm text-neutral-700 flex items-center">
                <FaPhone className="mr-2 text-sky-600" />
                <a
                  className="font-bold text-sky-600 underline-offset-4 hover:underline transition-colors"
                  href="tel:+10000000000"
                >
                  +1 (000) 000-0000
                </a>
              </li>
              <li className="text-sm text-neutral-700 flex items-center">
                <FaMapPin className="mr-2 text-sky-600" />
                <span className="font-bold">City, Country</span>
              </li>
            </ul>

            <div className="mt-6">
              <p className="text-sm font-bold uppercase tracking-widest text-neutral-900">Social</p>
              <div className="mt-3 flex flex-wrap gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg transition-transform hover:scale-125 hover:text-sky-600"
                  title="Facebook"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg transition-transform hover:scale-125 hover:text-sky-600"
                  title="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg transition-transform hover:scale-125 hover:text-sky-600"
                  title="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg transition-transform hover:scale-125 hover:text-sky-600"
                  title="YouTube"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t-2 border-neutral-200 pt-8 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium">© {new Date().getFullYear()} <span className="font-bold text-neutral-900">One World Hands</span>. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="font-medium transition-all hover:text-sky-600 hover:translate-x-1 flex items-center gap-1"
              aria-label="Privacy policy"
            >
              <TbLock className="text-base" /> Privacy
            </Link>
            <Link
              href="/contact"
              className="font-medium transition-all hover:text-sky-600 hover:translate-x-1 flex items-center gap-1"
            >
              <FaEnvelope className="text-base" /> Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

