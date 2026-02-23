"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to an API
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main>
        <section className="px-6 py-24 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Info */}
            <div>
              <p className="text-sm font-medium text-stone-400 uppercase tracking-widest mb-3 animate-slide-up">
                Contact us
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-stone-800 leading-tight tracking-tight mb-6 animate-slide-up-delay-1">
                Let&apos;s build something
                <br />
                together.
              </h1>
              <p className="text-lg text-stone-500 leading-relaxed mb-12 animate-slide-up-delay-2">
                Get a free custom demo with no credit card required. We respond
                within 24 hours and offer flexible payment plans with a 100%
                satisfaction guarantee.
              </p>

              <div className="space-y-6 animate-slide-up-delay-3">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center text-stone-600 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-800">Email</p>
                    <a
                      href="mailto:mgttechware@gmail.com"
                      className="text-sm text-stone-500 hover:text-stone-800 transition-colors"
                    >
                      mgttechware@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center text-stone-600 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-800">Phone</p>
                    <a
                      href="tel:+18178801882"
                      className="text-sm text-stone-500 hover:text-stone-800 transition-colors block"
                    >
                      (817) 880-1882
                    </a>
                    <a
                      href="tel:+12142634875"
                      className="text-sm text-stone-500 hover:text-stone-800 transition-colors block"
                    >
                      (214) 263-4875
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center text-stone-600 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-800">Location</p>
                    <p className="text-sm text-stone-500">
                      Remote &mdash; Serving clients worldwide
                    </p>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="mt-12 p-6 bg-stone-50 rounded-2xl border border-stone-200 animate-slide-up-delay-3">
                <h3 className="text-sm font-semibold text-stone-800 mb-4">
                  What you get
                </h3>
                <div className="space-y-3">
                  {[
                    "Free custom demo",
                    "No credit card required",
                    "Response within 24 hours",
                    "Flexible payment plans",
                    "100% satisfaction guarantee",
                    "24/7 support & maintenance",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-stone-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-stone-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              {submitted ? (
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-10 text-center">
                  <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-stone-800 mb-2">
                    Message sent!
                  </h3>
                  <p className="text-stone-500">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white border border-stone-200 rounded-2xl p-8 md:p-10"
                >
                  <h2 className="text-2xl font-bold text-stone-800 mb-2">
                    Get your free demo
                  </h2>
                  <p className="text-sm text-stone-500 mb-8">
                    Fill out the form below and we&apos;ll be in touch.
                  </p>

                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-stone-700 mb-1.5"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-800 focus:border-transparent transition-all"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-stone-700 mb-1.5"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-800 focus:border-transparent transition-all"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-stone-700 mb-1.5"
                      >
                        Company{" "}
                        <span className="text-stone-400 font-normal">
                          (optional)
                        </span>
                      </label>
                      <input
                        type="text"
                        id="company"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-800 focus:border-transparent transition-all"
                        placeholder="Your company"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-stone-700 mb-1.5"
                      >
                        Tell us about your project
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-800 focus:border-transparent transition-all resize-none"
                        placeholder="Describe what you're looking to build..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full bg-stone-800 text-white py-3.5 rounded-xl text-sm font-medium hover:bg-stone-700"
                    >
                      Send Message
                    </button>

                    <p className="text-xs text-stone-400 text-center">
                      No credit card required. We&apos;ll respond within 24 hours.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
