import Link from "next/link";

export default function ContactSection() {
  return (
    <section id="contact" className="px-6 py-24 max-w-6xl mx-auto">
      <div className="bg-stone-800 rounded-3xl p-10 md:p-16 text-center">
        <p className="text-sm font-medium text-stone-400 uppercase tracking-widest mb-3">
          Get started
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to build something great?
        </h2>
        <p className="text-stone-400 max-w-xl mx-auto mb-10 text-lg leading-relaxed">
          Get a free custom demo with no credit card required. We respond within
          24 hours and offer flexible payment plans with a 100% satisfaction
          guarantee.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-stone-800 px-8 py-3.5 rounded-full text-sm font-medium hover:bg-stone-100 transition-colors"
          >
            Contact Us
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <a
            href="mailto:mgttechware@gmail.com"
            className="inline-flex items-center gap-2 text-stone-400 px-8 py-3.5 rounded-full text-sm font-medium border border-stone-600 hover:border-stone-400 hover:text-white transition-colors"
          >
            mgttechware@gmail.com
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-stone-400">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (817) 880-1882
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (214) 263-4875
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Serving clients worldwide
          </div>
        </div>
      </div>
    </section>
  );
}
