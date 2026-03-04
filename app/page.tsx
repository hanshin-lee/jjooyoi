export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 md:gap-20 items-start">
        {/* Left: Identity */}
        <div>
          <h1 className="font-serif text-6xl md:text-7xl font-light leading-[1.05] text-[#2c2c2c]">
            Jooyoung
            <br />
            Kim
          </h1>
          <p className="font-sans text-sm text-[#8b7355] tracking-widest mt-3">
            김주영
          </p>
          <div className="w-10 h-px bg-[#c8bfaf] mt-8 mb-6" />
          <div className="space-y-1">
            <p className="font-sans text-xs tracking-widest uppercase text-[#8b7355]">
              Art Historian
            </p>
            <p className="font-sans text-xs tracking-widest uppercase text-[#8b7355]">
              Gallery Professional
            </p>
            <p className="font-sans text-xs tracking-widest uppercase text-[#aaa098]">
              Seoul · London · Philadelphia
            </p>
          </div>
        </div>

        {/* Right: Bio */}
        <div className="space-y-6 pt-1">
          <p className="font-serif text-[1.35rem] font-light leading-relaxed text-[#2c2c2c]">
            I am an art historian and gallery professional working across
            exhibition planning, archival research, and editorial writing.
          </p>
          <p className="font-sans text-sm leading-relaxed text-[#555555]">
            Holding an MA in History of Art from the Courtauld Institute of Art
            (London) and a BA from the University of Pennsylvania (Philadelphia),
            my research centers on postwar European and Korean abstraction —
            particularly the material and biographical dimensions of trauma in
            the work of Alberto Burri, Manolo Millares, and Ha Chong-Hyun.
          </p>
          <p className="font-sans text-sm leading-relaxed text-[#555555]">
            I have worked with Tina Kim Gallery (Seoul), Victoria Miro (London),
            and Guildhall Art Gallery (London), contributing to exhibitions,
            institutional publications, and artist archives across international
            contexts.
          </p>
          <div className="flex gap-6 pt-2">
            <a
              href="mailto:jooyoungkim19@gmail.com"
              className="font-sans text-xs tracking-widest uppercase text-[#8b7355] hover:text-[#2c2c2c] transition-colors border-b border-[#c8bfaf] pb-0.5"
            >
              Get in touch
            </a>
            <a
              href="/resume"
              className="font-sans text-xs tracking-widest uppercase text-[#aaa098] hover:text-[#2c2c2c] transition-colors border-b border-[#ddd6c8] pb-0.5"
            >
              View CV
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
