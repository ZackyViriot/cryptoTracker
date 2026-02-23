"use client";

const faqs = [
  {
    question: "How much does a website cost?",
    answer:
      "Every project is unique, so pricing is customized based on your specific needs, features, and complexity. We offer flexible payment plans and will work with you to find a solution that fits your budget. Contact us for a free consultation and quote.",
  },
  {
    question: "What is your development process?",
    answer:
      "We start with a discovery call to understand your goals, then move into design mockups for your approval. Once approved, we build your site using modern technologies like Next.js and React, with regular check-ins throughout. We handle deployment, testing, and provide ongoing support after launch.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Simple websites typically take 2-4 weeks, while more complex web applications can take 2-6 months depending on the scope. We prioritize fast delivery without sacrificing quality and will give you a clear timeline during our initial consultation.",
  },
  {
    question: "Do you offer ongoing maintenance and support?",
    answer:
      "Yes! We offer 24/7 support and maintenance packages to keep your site running smoothly. This includes security updates, performance monitoring, content updates, and technical support. We guarantee 100% satisfaction with our ongoing services.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We primarily work with React, Next.js, TypeScript, Tailwind CSS, and Node.js. We choose the best technology stack for each project to ensure optimal performance, scalability, and maintainability.",
  },
  {
    question: "Do you work with clients outside the US?",
    answer:
      "We work remotely and serve clients worldwide. No matter where you are, we can collaborate effectively through video calls, project management tools, and regular communication to deliver outstanding results.",
  },
  {
    question: "What is included in my website?",
    answer:
      "Every website includes responsive design, SEO optimization, fast loading speeds, mobile compatibility, and a modern tech stack. We also provide free hosting setup guidance, analytics integration, and a thorough walkthrough of your completed site.",
  },
  {
    question: "Do you offer a guarantee?",
    answer:
      "We offer a 100% satisfaction guarantee. We work closely with you throughout the process to make sure the final product exceeds your expectations. If you're not satisfied, we'll revise until you are.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="px-6 py-24 bg-stone-50">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16 text-center">
          <p className="text-sm font-medium text-stone-400 uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="faq-item bg-white border border-stone-200 rounded-2xl overflow-hidden group"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer">
                <span className="text-base font-medium text-stone-800 pr-4">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center text-stone-500 group-open:bg-stone-800 group-open:text-white transition-colors duration-200">
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-open:rotate-45"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v12M6 12h12"
                    />
                  </svg>
                </span>
              </summary>
              <div className="faq-content px-6 pb-6">
                <p className="text-stone-500 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
