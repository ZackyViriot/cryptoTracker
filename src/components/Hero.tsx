import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-[85vh] flex flex-col justify-center px-6 py-20 max-w-6xl mx-auto">
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-stone-800 leading-[1.05] tracking-tight">
          <span className="animate-slide-up block">We create</span>
          <span className="animate-slide-up-delay-1 block">websites</span>
          <span className="animate-slide-up-delay-2 block text-stone-400">apps</span>
          <span className="animate-slide-up-delay-3 block">software</span>
        </h1>

        <p className="mt-8 text-lg md:text-xl text-stone-500 max-w-xl animate-slide-up-delay-3">
          MGT Techware specializes in fast, modern, high-performance websites
          that deliver measurable results. Have a project in mind?{" "}
          <Link href="/contact" className="text-stone-800 font-medium link-underline">
            Contact us
          </Link>{" "}
          for a free consultation.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 animate-slide-up-delay-3">
          <Link
            href="/contact"
            className="btn-primary inline-flex items-center gap-2 bg-stone-800 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-stone-700"
          >
            Get a Free Demo
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <a
            href="#services"
            className="inline-flex items-center gap-2 text-stone-600 px-8 py-3.5 rounded-full text-sm font-medium border border-stone-300 hover:border-stone-400 hover:text-stone-800 transition-colors"
          >
            Explore Services
          </a>
        </div>

        <div className="mt-16 flex items-center gap-8 text-sm text-stone-400 animate-slide-up-delay-3">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            No credit card required
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Response within 24hrs
          </div>
        </div>
      </div>
    </section>
  );
}
