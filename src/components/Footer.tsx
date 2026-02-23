import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-800 text-stone-400 border-t border-stone-700">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-bold text-white tracking-tight">
              MGT Techware
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-sm">
              Professional web development specializing in fast, modern,
              high-performance websites that deliver measurable results. Built
              with Next.js, TypeScript, and Tailwind CSS.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="mailto:mgttechware@gmail.com"
                className="text-stone-500 hover:text-white transition-colors"
                aria-label="Email"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a
                href="tel:+18178801882"
                className="text-stone-500 hover:text-white transition-colors"
                aria-label="Phone"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              <Link href="/" className="text-sm hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-sm hover:text-white transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-sm hover:text-white transition-colors">
                Contact
              </Link>
              <a href="#services" className="text-sm hover:text-white transition-colors">
                Services
              </a>
              <a href="#work" className="text-sm hover:text-white transition-colors">
                Work
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-3 text-sm">
              <a href="mailto:mgttechware@gmail.com" className="hover:text-white transition-colors">
                mgttechware@gmail.com
              </a>
              <a href="tel:+18178801882" className="hover:text-white transition-colors">
                (817) 880-1882
              </a>
              <a href="tel:+12142634875" className="hover:text-white transition-colors">
                (214) 263-4875
              </a>
              <p>Remote &mdash; Worldwide</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-stone-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500">
            &copy; {new Date().getFullYear()} MGT Techware. All rights reserved.
          </p>
          <p className="text-xs text-stone-500">
            Built with Next.js, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
