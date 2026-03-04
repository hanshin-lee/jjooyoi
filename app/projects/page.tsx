// ─────────────────────────────────────────────────────────────────────────────
// Add your projects below. Each project has these fields:
//   title:       Project name
//   year:        Year as a string, e.g. "2024"
//   category:    Type of work, e.g. "Exhibition", "Research", "Writing", "Curation"
//   description: A short description (1–3 sentences)
//   link:        (optional) URL to a related page or document
// ─────────────────────────────────────────────────────────────────────────────

type Project = {
  title: string;
  year: string;
  category: string;
  description: string;
  link?: string;
};

const projects: Project[] = [
  // Example — uncomment and edit to add a project:
  // {
  //   title: "Ha Chong-Hyun Monograph",
  //   year: "2026",
  //   category: "Editorial",
  //   description:
  //     "Proofreading and fact-checking for a Rizzoli monograph on Ha Chong-Hyun, one of Korea's foremost postwar painters.",
  // },
  // {
  //   title: "Lee Shinja: Drawn with Thread",
  //   year: "2025",
  //   category: "Exhibition",
  //   description:
  //     "Archive documentation and subtitle translation for the exhibition video accompanying Lee Shinja's first U.S. solo exhibition at BAMPFA, Berkeley.",
  // },
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
              className="bg-beige-50 p-8 hover:bg-beige-100 transition-colors group"
            >
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
          ))}
        </div>
      )}
    </div>
  );
}
