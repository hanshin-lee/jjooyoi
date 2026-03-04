// ─────────────────────────────────────────────────────────────────────────────
// Add your projects below. Each project has these fields:
//   title:       Project name
//   year:        Year as a string, e.g. "2026"
//   category:    Type of work, e.g. "Exhibition", "Research", "Writing", "Editorial"
//   description: A short description (1–3 sentences)
//   image:       (optional) Path to image in /public, e.g. "/projects/image.jpg"
//   link:        (optional) URL to a related page or document
// ─────────────────────────────────────────────────────────────────────────────

type Project = {
  title: string;
  year: string;
  category: string;
  description: string;
  image?: string;
  link?: string;
};

const projects: Project[] = [
  {
    title: "Ha Chong-Hyun: Conjunctions",
    year: "2026",
    category: "Editorial",
    description:
      "Proofreading, copy-editing, and artwork fact-checking for a monograph on Ha Chong-Hyun published by Rizzoli New York — the first major English-language survey of the artist's work.",
    image: "/projects/ha-chong-hyun-conjunctions.jpg",
  },
];

export default function ProjectsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-16">
        <h1 className="font-serif text-4xl font-light text-[#2c2c2c]">
          Projects
        </h1>
        <div className="w-full h-px bg-[#d4cfc8] mt-5" />
      </div>

      {projects.length === 0 ? (
        <div className="py-28 text-center">
          <p className="font-serif text-2xl font-light text-[#c8bfaf]">
            Projects coming soon.
          </p>
          <p className="font-sans text-xs text-[#aaa098] mt-4 leading-relaxed">
            Add your projects in{" "}
            <span className="font-mono bg-beige-200 px-1.5 py-0.5 rounded text-[#8b7355]">
              app/projects/page.tsx
            </span>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#d4cfc8] border border-[#d4cfc8]">
          {projects.map((project, i) => (
            <div
              key={i}
              className="bg-beige-50 hover:bg-beige-100 transition-colors group"
            >
              {project.image && (
                <div className="overflow-hidden border-b border-[#d4cfc8]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-8">
                <div className="flex justify-between items-start mb-5">
                  <span className="font-sans text-xs tracking-widest uppercase text-[#8b7355]">
                    {project.category}
                  </span>
                  <span className="font-sans text-xs text-[#aaa098]">
                    {project.year}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-light text-[#2c2c2c] mb-3 group-hover:text-[#8b7355] transition-colors leading-tight">
                  {project.title}
                </h3>
                <p className="font-sans text-sm text-[#555555] leading-relaxed">
                  {project.description}
                </p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-5 font-sans text-xs tracking-widest uppercase text-[#8b7355] hover:text-[#2c2c2c] transition-colors border-b border-[#c8bfaf] pb-0.5"
                  >
                    View →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
