import Header from "@/components/Header";
import Footer from "@/components/Footer";

const team = [
  {
    name: "Zacky Viriot",
    role: "Full Stack Developer & Co-Founder",
    description:
      "Specializes in Next.js and React, building performant and scalable web applications with modern frameworks. Passionate about creating seamless user experiences and writing clean, maintainable code.",
    skills: ["Next.js", "React", "TypeScript", "Frontend Architecture"],
  },
  {
    name: "Raider Levie",
    role: "Full Stack Developer & Co-Founder",
    description:
      "Expert in backend architecture and frontend design, creating robust systems that power seamless user experiences. Focused on scalable solutions and delivering high-quality products.",
    skills: ["Backend Architecture", "API Design", "Frontend Design", "DevOps"],
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="px-6 py-24 max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-stone-400 uppercase tracking-widest mb-3 animate-slide-up">
              About us
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-stone-800 leading-tight tracking-tight animate-slide-up-delay-1">
              We build digital
              <br />
              experiences that matter.
            </h1>
            <p className="mt-8 text-lg text-stone-500 max-w-xl leading-relaxed animate-slide-up-delay-2">
              MGT Techware was founded by two full-stack developers with a
              shared vision: to build modern, scalable solutions optimized for
              speed and user experience. We combine technical expertise with
              creative design to deliver websites that perform and delight.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="px-6 py-24 bg-stone-50">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm font-medium text-stone-400 uppercase tracking-widest mb-3">
              Our values
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-12">
              What drives us
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 border border-stone-200">
                <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center text-stone-600 mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-stone-800 mb-2">Mission-Driven</h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  Every project is guided by your goals and our commitment to
                  delivering real, measurable results. We don&apos;t just build
                  websites &mdash; we build tools for your success.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-stone-200">
                <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center text-stone-600 mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-stone-800 mb-2">Innovation</h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  We stay on the cutting edge of web technology to give you a
                  competitive advantage. From the latest frameworks to
                  performance optimizations, we use the best tools available.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-stone-200">
                <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center text-stone-600 mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-stone-800 mb-2">Quality Assurance</h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  Rigorous testing and attention to detail ensure your product is
                  reliable and polished. We don&apos;t cut corners &mdash; every
                  line of code is crafted with care.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-stone-200">
                <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center text-stone-600 mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-stone-800 mb-2">Fast Delivery</h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  Efficient workflows and clear communication mean your project
                  launches on time. We value your time and work diligently to
                  meet every deadline.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="px-6 py-24 max-w-6xl mx-auto">
          <p className="text-sm font-medium text-stone-400 uppercase tracking-widest mb-3">
            The team
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-12">
            Meet the Founders
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="service-card bg-white border border-stone-200 rounded-2xl p-8"
              >
                <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center text-white text-xl font-bold mb-6">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="text-xl font-semibold text-stone-800 mb-1">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-stone-400 mb-4">
                  {member.role}
                </p>
                <p className="text-stone-500 text-sm leading-relaxed mb-6">
                  {member.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-stone-50 border border-stone-200 rounded-full text-xs text-stone-500 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="px-6 py-24 bg-stone-50">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm font-medium text-stone-400 uppercase tracking-widest mb-3">
              Our stack
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-12">
              Technologies We Use
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                "Next.js",
                "React",
                "TypeScript",
                "JavaScript",
                "Tailwind CSS",
                "Node.js",
                "API Integration",
                "Responsive Design",
                "SEO Optimization",
                "Git & CI/CD",
              ].map((tech) => (
                <div
                  key={tech}
                  className="bg-white border border-stone-200 rounded-2xl p-6 text-center service-card"
                >
                  <p className="text-sm font-medium text-stone-700">{tech}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
