"use client";

export default function About() {
  return (
    <div className="bg-background min-h-screen">
      <title>About | Cut to Black Prize</title>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl md:text-6xl font-bold text-accent mb-8">
          About Cut to Black Prize
        </h1>

        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-bold text-accent mb-6">Our Mission</h2>
            <p className="text-lg text-foreground leading-relaxed">
              Cut to Black Prize exists to discover, celebrate, and support
              exceptional emerging screenwriters. In an industry often dominated
              by established voices, we believe new talent deserves a platform
              to share their stories with industry professionals and audiences
              alike.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-accent mb-6">Our History</h2>
            <div className="space-y-8">
              <div className="border-l-4 border-accent pl-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  2020 - The Beginning
                </h3>
                <p className="text-muted">
                  Cut to Black Prize was founded with a simple goal: to nurture
                  emerging screenwriting talent and connect writers with
                  industry professionals.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  2021-2022 - Growth
                </h3>
                <p className="text-muted">
                  We expanded our judging panel and increased prize offerings,
                  establishing ourselves as a respected voice in screenwriting
                  competitions.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  2023-Present - Excellence
                </h3>
                <p className="text-muted">
                  Today, Cut to Black Prize represents the highest standards of
                  screenwriting excellence and continues to champion emerging
                  voices in cinema.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-accent mb-6">
              The Organizers
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border border-accent/30 p-6 rounded">
                <h3 className="text-xl font-bold text-accent mb-2">
                  Industry Leadership
                </h3>
                <p className="text-foreground">
                  Our team includes award-winning producers, development
                  executives, and screenwriters committed to fostering new
                  talent.
                </p>
              </div>

              <div className="bg-card border border-accent/30 p-6 rounded">
                <h3 className="text-xl font-bold text-accent mb-2">
                  Expert Judges
                </h3>
                <p className="text-foreground">
                  Our judging panel consists of respected industry professionals
                  with decades of combined experience in film and television.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-accent mb-6">
              Why Choose Cut to Black?
            </h2>
            <ul className="space-y-4 text-foreground">
              <li className="flex gap-4">
                <span className="text-accent font-bold">✓</span>
                <span>Rigorous, fair evaluation by industry professionals</span>
              </li>
              <li className="flex gap-4">
                <span className="text-accent font-bold">✓</span>
                <span>
                  Genuine mentorship and industry connections for winners
                </span>
              </li>
              <li className="flex gap-4">
                <span className="text-accent font-bold">✓</span>
                <span>Transparent, anonymous judging process</span>
              </li>
              <li className="flex gap-4">
                <span className="text-accent font-bold">✓</span>
                <span>
                  Respect for screenwriter rights and intellectual property
                </span>
              </li>
              <li className="flex gap-4">
                <span className="text-accent font-bold">✓</span>
                <span>Commitment to discovering diverse, authentic voices</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
