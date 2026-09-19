import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Mail,
  MapPin,
  Smartphone,
} from "lucide-react";

import heroPhoto from "@/assets/hero-photo.jpg.asset.json";
import bookeCover from "@/assets/covers-uploaded/booke-cover.png.asset.json";
import leoClinicCover from "@/assets/covers-uploaded/leoclinic-cover.png.asset.json";
import marketoCover from "@/assets/covers-uploaded/marketo-cover.png.asset.json";
import newsCover from "@/assets/covers-uploaded/newscloud-cover.png.asset.json";
import scanovaCover from "@/assets/covers-uploaded/scanova-cover.png.asset.json";
import chatCover from "@/assets/covers/chat.jpg";
import paymentCover from "@/assets/covers/payment.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Omar Badawy — Flutter Developer" },
      {
        name: "description",
        content:
          "Portfolio of Omar Badawy, a Flutter developer building polished mobile experiences.",
      },
      { property: "og:title", content: "Omar Badawy — Flutter Developer" },
      {
        property: "og:description",
        content: "Selected Flutter apps and mobile product work by Omar Badawy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const projects = [
  {
    title: "Leo Clinic",
    category: "Healthcare platform",
    description:
      "A connected healthcare experience for patients and doctors, with appointments, records, and essential health information in one place.",
    cover: leoClinicCover.url,
    repo: "https://github.com/omarbadawiii-91/LeoClinic_flutter",
    tags: ["Flutter", "Healthcare", "Dashboard"],
  },
  {
    title: "Marketo",
    category: "E-commerce app",
    description:
      "A complete shopping experience with discovery, favorites, cart management, and a smooth checkout flow.",
    cover: marketoCover.url,
    repo: "https://github.com/omarbadawiii-91/Marekto-E-commerce_App",
    tags: ["Flutter", "E-commerce", "REST API"],
  },
  {
    title: "Booke",
    category: "Digital library",
    description:
      "A personal digital library for browsing, reading, and discovering thousands of free books anytime.",
    cover: bookeCover.url,
    repo: "https://github.com/omarbadawiii-91/Books_App",
    tags: ["Flutter", "Firebase", "Dart"],
  },
  {
    title: "NewsCloud",
    category: "News application",
    description:
      "Real-time world news from trusted sources, organized into focused categories for fast, distraction-free reading.",
    cover: newsCover.url,
    repo: "https://github.com/omarbadawiii-91/NewsApp",
    tags: ["Flutter", "News API", "Clean UI"],
    contain: true,
  },
  {
    title: "Payment Field",
    category: "Payment experience",
    description:
      "A secure, focused payment interface built to make card entry and transaction feedback clear and effortless.",
    cover: paymentCover,
    repo: "https://github.com/omarbadawiii-91/Payment-Field",
    tags: ["Flutter", "Payments", "Form UX"],
  },
  {
    title: "Temporary Chat",
    category: "Real-time messaging",
    description:
      "A lightweight chat experience designed for fast, temporary conversations with a clean real-time interface.",
    cover: chatCover,
    repo: "https://github.com/omarbadawiii-91/Temporary-Chat-App",
    tags: ["Flutter", "Real-time", "Messaging"],
  },
  {
    title: "Scanova",
    category: "Security application",
    description:
      "A mobile security tool that scans QR codes and links, then presents a clear safety report before users continue.",
    cover: scanovaCover.url,
    tags: ["Flutter", "Security", "QR Scanner"],
  },
];

function Portfolio() {
  const heroRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const tintRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<Array<HTMLElement | null>>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    let animationFrame = 0;

    const updatePhoto = () => {
      const hero = heroRef.current;
      const photo = photoRef.current;
      const tint = tintRef.current;
      if (!hero || !photo || !tint) return;

      const bounds = hero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -bounds.top / (bounds.height * 0.62)));
      photo.style.setProperty("--photo-progress", String(progress));
      tint.style.setProperty("--photo-progress", String(progress));
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updatePhoto);
    };

    updatePhoto();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.projectIndex);
        if (!Number.isNaN(index)) setActiveProject(index);
      },
      { rootMargin: "-28% 0px -38% 0px", threshold: [0.15, 0.35, 0.6] },
    );

    projectRefs.current.forEach((project) => {
      if (project) observer.observe(project);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const progress = progressRef.current;
    if (!progress) return;
    progress.style.height = `${(activeProject / (projects.length - 1)) * 100}%`;
  }, [activeProject]);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="font-mono text-sm font-semibold text-foreground">
            OMAR<span className="text-primary">.</span>
          </a>
          <nav aria-label="Main navigation" className="flex items-center gap-5 sm:gap-8">
            <a className="text-sm text-muted-foreground transition-colors hover:text-foreground" href="#work">
              Work
            </a>
            <a className="text-sm text-muted-foreground transition-colors hover:text-foreground" href="#about">
              About
            </a>
            <Button asChild size="sm">
              <a href="mailto:omarbadawiii91@gmail.com">Let&apos;s talk</a>
            </Button>
          </nav>
        </div>
      </header>

      <section ref={heroRef} id="top" className="relative flex min-h-[92vh] items-center border-b border-border pt-16">
        <div className="pointer-events-none absolute inset-0 portfolio-grid opacity-40" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
          <div>
            <p className="section-label">Flutter developer · Cairo, Egypt</p>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.04] sm:text-7xl lg:text-8xl">
              Building mobile products that feel <span className="text-primary">effortless.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              I&apos;m Omar Badawy, a Flutter developer focused on thoughtful interfaces,
              reliable architecture, and experiences people enjoy using.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="#work">
                  View selected work <ArrowDown />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="https://github.com/omarbadawiii-91" target="_blank" rel="noreferrer">
                  <Github /> GitHub
                </a>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:justify-self-end">
            <div className="absolute -inset-5 border border-primary/20" />
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              <img
                ref={photoRef}
                src={heroPhoto.url}
                alt="Portrait of Omar Badawy"
                className="hero-photo h-full w-full object-cover"
              />
              <div ref={tintRef} aria-hidden="true" className="hero-photo-tint pointer-events-none absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-background/85 px-5 py-4 backdrop-blur-md">
                <span className="text-sm font-medium">Available for opportunities</span>
                <span className="size-2 rounded-full bg-primary shadow-[0_0_14px_var(--glow)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-col justify-between gap-6 border-b border-border pb-10 sm:flex-row sm:items-end">
          <div>
            <p className="section-label">01 / Selected work</p>
            <h2 className="mt-4 text-4xl font-semibold sm:text-6xl">Projects built to matter.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted-foreground">
            Mobile products spanning healthcare, commerce, media, security, and communication.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-[18px_minmax(0,1fr)] gap-4 sm:grid-cols-[24px_minmax(0,1fr)] sm:gap-8">
          <aside aria-label="Project scroll progress" className="relative">
            <div className="sticky top-[30vh] h-72">
              <div className="absolute left-1/2 top-1 bottom-1 w-px -translate-x-1/2 bg-border">
                <div ref={progressRef} className="w-full bg-primary shadow-[0_0_12px_var(--glow)] transition-[height] duration-500" />
              </div>
              <div className="relative flex h-full flex-col items-center justify-between">
                {projects.map((project, index) => (
                  <a
                    key={project.title}
                    href={`#project-${index + 1}`}
                    aria-label={`Jump to ${project.title}`}
                    aria-current={index === activeProject ? "step" : undefined}
                    className={`z-10 size-3 rounded-full border transition-all duration-300 ${index <= activeProject ? "dot-active" : "dot-idle"}`}
                  />
                ))}
              </div>
            </div>
          </aside>
          <div className="space-y-20 sm:space-y-28">
          {projects.map((project, index) => (
            <article
              key={project.title}
              id={`project-${index + 1}`}
              data-project-index={index}
              ref={(element) => { projectRefs.current[index] = element; }}
              className="group grid scroll-mt-28 items-center gap-8 lg:grid-cols-12 lg:gap-12"
            >
              <div className={`lg:col-span-8 ${index % 2 ? "lg:order-2" : ""}`}>
                <div className="aspect-[16/10] overflow-hidden border border-border bg-card">
                  <img
                    src={project.cover}
                    alt={`${project.title} app cover`}
                    className={`h-full w-full transition-transform duration-700 group-hover:scale-[1.02] ${project.contain ? "object-contain" : "object-cover"}`}
                    loading={index > 1 ? "lazy" : "eager"}
                  />
                </div>
              </div>
              <div className={`lg:col-span-4 ${index % 2 ? "lg:order-1" : ""}`}>
                <div className="flex items-center gap-3 font-mono text-xs text-primary">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span className="h-px w-8 bg-primary/50" />
                  <span className="uppercase">{project.category}</span>
                </div>
                <h3 className="mt-5 text-3xl font-semibold sm:text-4xl">{project.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="border border-border bg-secondary px-3 py-1.5 font-mono text-[11px] text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                {project.repo ? (
                  <Button asChild variant="outline" className="mt-7">
                    <a href={project.repo} target="_blank" rel="noreferrer" aria-label={`View ${project.title} on GitHub`}>
                      View on GitHub <ArrowUpRight />
                    </a>
                  </Button>
                ) : (
                  <p className="mt-7 flex items-center gap-2 text-xs text-muted-foreground">
                    <Smartphone className="size-4 text-primary" /> Mobile app case study
                  </p>
                )}
              </div>
            </article>
          ))}
          </div>
        </div>
      </section>

      <section id="about" className="border-y border-border bg-card/40">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="section-label">02 / About</p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
              Code with purpose.<br />Design with empathy.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-8 text-muted-foreground">
            <p>
              I build cross-platform mobile applications with Flutter and Dart, turning product ideas into fast,
              clear, and maintainable experiences.
            </p>
            <p>
              My work combines clean architecture, API integration, Firebase, and careful interface design—from
              the first screen to the final interaction.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-3 font-mono text-xs text-foreground">
              <span>Flutter</span><span>Dart</span><span>Firebase</span><span>REST APIs</span><span>Git</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <p className="section-label">03 / Contact</p>
        <div className="mt-5 flex flex-col justify-between gap-10 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-4xl font-semibold sm:text-6xl">Let&apos;s build something good.</h2>
            <a className="mt-6 inline-flex items-center gap-2 text-primary hover:underline" href="mailto:omarbadawiii91@gmail.com">
              <Mail className="size-4" /> omarbadawiii91@gmail.com
            </a>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground sm:text-right">
            <p className="flex items-center gap-2 sm:justify-end"><MapPin className="size-4" /> Cairo, Egypt</p>
            <p>© 2026 Omar Badawy</p>
          </div>
        </div>
      </footer>
    </main>
  );
}