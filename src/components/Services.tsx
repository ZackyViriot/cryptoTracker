const services = [
  {
    title: "Custom Website Development",
    description:
      "Built with Next.js, React, and TypeScript for unmatched performance and scalability. We craft bespoke designs combining aesthetics with technical proficiency, ensuring your site is visually appealing, fast, and fully responsive.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "SEO Optimization",
    description:
      "Technical and content strategies to boost your visibility and drive organic traffic. We implement on-page and off-page techniques to improve your search rankings and get your business found online.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    title: "UI/UX Design",
    description:
      "User-focused interfaces ensuring seamless navigation and engagement. We balance visual appeal with navigational ease, creating intuitive experiences that keep users coming back.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: "Web Hosting & Maintenance",
    description:
      "24/7 reliable hosting and ongoing support to keep your site running smoothly. We handle the technical side so you can focus on growing your business with peace of mind.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
  },
  {
    title: "Mobile App Development",
    description:
      "Top-tier mobile development for iOS, Android, or cross-platform solutions. We focus on intuitive, efficient user experiences that perform flawlessly on every device.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="px-6 py-24 max-w-6xl mx-auto">
      <div className="mb-16">
        <p className="text-sm font-medium text-stone-400 uppercase tracking-widest mb-3">
          What we do
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-stone-800">
          Our Services
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.title}
            className="service-card bg-white border border-stone-200 rounded-2xl p-8 hover:border-stone-300"
          >
            <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-stone-600 mb-6">
              {service.icon}
            </div>
            <h3 className="text-lg font-semibold text-stone-800 mb-3">
              {service.title}
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
