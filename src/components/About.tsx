const team = [
  {
    name: "Zacky Viriot",
    role: "Full Stack Developer & Co-Founder",
    description:
      "Specializes in Next.js and React, building performant and scalable web applications with modern frameworks.",
  },
  {
    name: "Raider Levie",
    role: "Full Stack Developer & Co-Founder",
    description:
      "Expert in backend architecture and frontend design, creating robust systems that power seamless user experiences.",
  },
];

const values = [
  {
    title: "Mission-Driven",
    description: "Every project is guided by your goals and our commitment to delivering real results.",
  },
  {
    title: "Innovation",
    description: "We stay on the cutting edge of web technology to give you a competitive advantage.",
  },
  {
    title: "Quality Assurance",
    description: "Rigorous testing and attention to detail ensure your product is reliable and polished.",
  },
  {
    title: "Fast Delivery",
    description: "Efficient workflows and clear communication mean your project launches on time.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="px-6 py-24 bg-stone-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-sm font-medium text-stone-400 uppercase tracking-widest mb-3">
            Who we are
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6">
            About MGT Techware
          </h2>
          <p className="text-stone-500 max-w-2xl text-lg leading-relaxed">
            Founded by two full-stack developers, MGT Techware builds modern,
            scalable solutions optimized for speed and user experience. We
            combine technical expertise with creative design to deliver websites
            that perform.
          </p>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {values.map((value) => (
            <div key={value.title} className="bg-white rounded-2xl p-6 border border-stone-200">
              <h3 className="text-base font-semibold text-stone-800 mb-2">
                {value.title}
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="mb-4">
          <p className="text-sm font-medium text-stone-400 uppercase tracking-widest mb-3">
            The Team
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-stone-800 mb-10">
            Meet the Founders
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className="service-card bg-white border border-stone-200 rounded-2xl p-8"
            >
              <div className="w-14 h-14 bg-stone-800 rounded-full flex items-center justify-center text-white text-lg font-bold mb-6">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h4 className="text-xl font-semibold text-stone-800 mb-1">
                {member.name}
              </h4>
              <p className="text-sm font-medium text-stone-400 mb-4">
                {member.role}
              </p>
              <p className="text-stone-500 text-sm leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="mt-20">
          <p className="text-sm font-medium text-stone-400 uppercase tracking-widest mb-6">
            Technologies we use
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "JavaScript",
              "Tailwind CSS",
              "Node.js",
              "API Integration",
              "Responsive Design",
              "SEO",
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white border border-stone-200 rounded-full text-sm text-stone-600 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
