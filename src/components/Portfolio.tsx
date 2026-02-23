const projects = [
  {
    title: "360 PDR",
    category: "Web Development",
    description:
      "Modern website for a paintless dent repair service featuring animations, responsive design, and optimized performance. Built with Next.js and Tailwind CSS.",
    tags: ["Next.js", "Tailwind CSS", "Animations"],
  },
  {
    title: "Business Portal",
    category: "Web Application",
    description:
      "Full-stack web application with user authentication, dashboard analytics, and real-time data processing for business clients.",
    tags: ["React", "TypeScript", "API"],
  },
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    description:
      "Scalable e-commerce solution with custom product management, payment integration, and SEO optimization for maximum visibility.",
    tags: ["Next.js", "SEO", "Responsive"],
  },
  {
    title: "Brand Identity Site",
    category: "UI/UX Design",
    description:
      "Clean, modern brand website with engaging user interface design, smooth transitions, and mobile-first responsive layout.",
    tags: ["UI/UX", "Design", "Mobile-First"],
  },
];

export default function Portfolio() {
  return (
    <section id="work" className="px-6 py-24 max-w-6xl mx-auto">
      <div className="mb-16">
        <p className="text-sm font-medium text-stone-400 uppercase tracking-widest mb-3">
          Our work
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-stone-800">
          Featured Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.title}
            className="service-card group bg-stone-50 border border-stone-200 rounded-2xl overflow-hidden hover:border-stone-300"
          >
            {/* Project Preview */}
            <div className="h-52 bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center group-hover:from-stone-300 group-hover:to-stone-400 transition-all duration-500">
              <span className="text-3xl font-bold text-white/80 tracking-tight">
                {project.title}
              </span>
            </div>

            <div className="p-8">
              <p className="text-xs font-medium text-stone-400 uppercase tracking-widest mb-2">
                {project.category}
              </p>
              <h3 className="text-lg font-semibold text-stone-800 mb-3">
                {project.title}
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white border border-stone-200 rounded-full text-xs text-stone-500 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
