import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  Briefcase,
  Github,
  Linkedin,
  Mail,
  MapPin,
  ScanLine,
  SearchCheck,
  Send,
  ShieldCheck,
} from "lucide-react";

import heroPhoto from "@/assets/omar-mobile-developer-portrait.png.asset.json";
import heroCutout from "@/assets/omar-cutout.png.asset.json";
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
      { title: "Omar Mohamed Badawy — Mobile App Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Omar Mohamed Badawy, a mobile app engineer building polished Flutter experiences.",
      },
      { property: "og:title", content: "Omar Mohamed Badawy — Mobile App Engineer" },
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

const learningArchive = [
  "Mobile App Development using Flutter — ITI · Sep 2025 · 120hrs",
  "Gen AI — ITI · Dec 2025",
  "UI/UX Design — National Telecommunication Institute (NTI)",
  "Deep Dive into Clean Architecture in Flutter [Arabic] — Udemy",
  "Flutter Advanced: Bloc and MVVM Pattern [Arabic] — Udemy",
  "Flutter Payment Integration: Stripe, PayPal & More [Arabic] — Udemy",
  "Complete Flutter & Dart Development Course [Arabic] — Udemy",
  "The C++ Learning Guide — Udemy",
  "Building LLM Applications with Prompt Engineering",
  "AI for All: From Basics to GenAI Practice — NVIDIA",
  "Freelancing Basics — Mahara-Tech",
  "Python 101 — Satr/Tuwaiq Academy",
  "Python Programming Basics — Mahara-Tech AI Academy",
  "Data Structures & Algorithms",
  "Object Oriented Programming",
  "C++ (Level 1 & 2)",
  "Problem Solving",
  "Git & GitHub",
];

const achievements = [
  { title: "Mobile App Development · ITI", source: "ITI", topics: ["Dart", "OOP", "Flutter", "API Integration", "Bloc", "Firebase", "Git"] },
  { title: "Deep Dive into Clean Architecture in Flutter", source: "Udemy", topics: ["Dependency Injection", "Reactive Programming", "SOLID", "Maintainable Flutter"] },
  { title: "Flutter Payment Integration", source: "Udemy", topics: ["Stripe", "PayPal", "Payment Systems", "Gateway Selection"] },
  { title: "Flutter Advanced: Bloc and MVVM", source: "Udemy", topics: ["Bloc", "State Management", "MVVM", "Design Patterns"] },
  { title: "Gen AI", source: "ITI", topics: ["Python", "LangChain", "Prompt Engineering"] },
  { title: "HR Member · ICPC Tanta Community", source: "ICPC", topics: ["Problem Solving", "Teamwork"] },
];

function Portfolio() {
  const projectRefs = useRef<Array<HTMLElement | null>>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const heroPortraitRef = useRef<HTMLDivElement>(null);

  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset["projectIndex"]);
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

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const portrait = heroPortraitRef.current;
    if (!portrait) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    let frame = 0;
    const onMove = (event: MouseEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const x = (event.clientX / window.innerWidth - 0.5) * 18;
        const y = (event.clientY / window.innerHeight - 0.5) * 12;
        portrait.style.setProperty("--parallax-x", `${x.toFixed(2)}px`);
        portrait.style.setProperty("--parallax-y", `${y.toFixed(2)}px`);
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);



  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <a href="#top" className="min-w-0">
            <span className="block truncate text-sm font-semibold text-foreground sm:text-base">Omar Mohamed Badawy</span>
            <span className="mt-1 flex items-center gap-1.5 font-mono text-[9px] uppercase text-primary sm:text-[10px]">
              <Smartphone className="size-3" /> Mobile App <span className="engineer-glow">Engineer</span>
            </span>
          </a>
          <nav aria-label="Main navigation" className="flex shrink-0 items-center gap-4 sm:gap-8">
            <a className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:block" href="#work">
              Work
            </a>
            <a className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground md:block" href="#about">
              Learning
            </a>
            <Button asChild size="sm">
              <a href="#contact">Let&apos;s talk</a>
            </Button>
          </nav>
        </div>
      </header>

      <section
        id="top"
        className="hero-canvas relative isolate flex min-h-screen flex-col overflow-hidden px-6 pt-28 pb-10 sm:px-10 sm:pt-32 lg:px-16"
      >
        {/* Cyan spotlight glow */}
        <div
          aria-hidden="true"
          className="hero-glow pointer-events-none absolute left-1/2 top-[30%] -z-10 h-[55%] w-[65%] max-w-3xl -translate-x-1/2 rounded-full"
        />

        {/* Portrait container — full height center */}
        <div className="relative mt-1 flex flex-1 flex-col">
          <h1 className="sr-only">Omar Badawy — Mobile App Engineer</h1>

          {/* Portrait — absolutely centered, layered in front of name */}
          <div
            ref={heroPortraitRef}
            className="hero-parallax hero-portrait absolute inset-x-0 bottom-0 flex items-end justify-center"
          >
            {/* Composite wrapper: Flutter bg behind, person cutout in front */}
            <div className="relative block h-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              {/* Flutter logo background layer */}
              <img
                src="/flutter-bg.jpg"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-contain opacity-80 [mask-image:linear-gradient(to_bottom,#000_60%,transparent_100%)]"
              />
              {/* Person cutout on top */}
              <img
                src={heroCutout.url}
                alt="Omar Mohamed Badawy, mobile app engineer"
                className="relative block h-auto w-full object-contain object-bottom [mask-image:linear-gradient(to_bottom,#000_70%,transparent_100%)]"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative z-20 mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="hero-in hero-in-3 space-y-1.5">
            <a
              className="block text-sm text-muted-foreground transition-colors hover:text-primary"
              href="mailto:omarbadawiii91@gmail.com"
            >
              omarbadawiii91@gmail.com
            </a>
            <p className="text-sm text-muted-foreground">Cairo, Egypt</p>
          </div>

          <div className="hero-in hero-in-4 space-y-4 lg:text-right">
            <p className="text-sm leading-6 text-muted-foreground max-w-sm lg:ml-auto">
              I&apos;m Omar Badawy, a Flutter developer focused on thoughtful interfaces,
              reliable architecture, and experiences people enjoy using.
            </p>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <a
                href="https://www.linkedin.com/in/omar-mohamed-badawy/"
                target="_blank"
                rel="noreferrer"
                className="hero-tab-link"
              >
                <Linkedin className="size-3.5" />
                LinkedIn
              </a>
              <a
                href="https://github.com/omarbadawiii-91"
                target="_blank"
                rel="noreferrer"
                className="hero-tab-link"
              >
                <Github className="size-3.5" />
                GitHub
              </a>
              <a href="#work" className="hero-tab-link">
                <Briefcase className="size-3.5" />
                Work
              </a>
              <a href="#contact" className="hero-tab-link">
                <Mail className="size-3.5" />
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#work"
          aria-label="Scroll to selected work"
          className="hero-in hero-in-4 absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 text-muted-foreground transition-colors hover:text-primary lg:flex"
        >
          <span className="h-16 w-px bg-border" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">Scroll</span>
          <ArrowDown className="size-3" />
        </a>
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
            <div className="sticky top-[23vh] h-[54vh] max-h-[520px] min-h-80">
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
              data-reveal
              className="reveal group grid scroll-mt-28 items-center gap-8 lg:grid-cols-12 lg:gap-12"
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

      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <div data-reveal className="reveal grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="section-label">02 / My own product</p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">Scanova.<br /><span className="text-primary">Scan with confidence.</span></h2>
              <p className="mt-6 max-w-md leading-7 text-muted-foreground">
                I created Scanova to make suspicious QR codes and links easier to understand before people open them.
                It turns complex security signals into one clear, actionable report.
              </p>
            </div>
            <div className="overflow-hidden border border-border bg-background">
              <img src={scanovaCover.url} alt="Scanova mobile security product" className="aspect-[16/9] w-full object-cover transition-transform duration-700 hover:scale-[1.025]" />
              <div className="grid sm:grid-cols-3">
                {[
                  { icon: ScanLine, title: "Scan", copy: "Use the camera, gallery, or a pasted link to check a source." },
                  { icon: SearchCheck, title: "Analyze", copy: "Classify every result as safe, warning, or dangerous." },
                  { icon: ShieldCheck, title: "Protect", copy: "Open verified links in an isolated five-minute sandbox." },
                ].map((step, index) => (
                  <div key={step.title} className="border-t border-border p-6 sm:border-l sm:first:border-l-0">
                    <div className="flex items-center justify-between font-mono text-[10px] text-primary">
                      <span>0{index + 1}</span><step.icon className="size-4" />
                    </div>
                    <h3 className="mt-8 text-xl font-semibold">{step.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div data-reveal className="reveal grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="section-label">03 / Always learning</p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">The roadmap is part of the product.</h2>
            <p className="mt-7 max-w-lg leading-8 text-muted-foreground">
              I keep a close eye on the fundamentals: architecture, accessibility, performance, and the habits that make a codebase a better place to return to.
            </p>
          </div>
          <div className="border-t border-border">
            {[
              ["Now", "Deepening Flutter architecture", "Clean boundaries, scalable state, and better testing habits."],
              ["Next", "Building stronger product instincts", "Learning to ask sharper questions before writing the first widget."],
              ["Always", "Shipping, reviewing, refining", "The loop that keeps the work honest and the learning practical."],
            ].map(([label, title, copy]) => (
              <div key={label} className="grid gap-3 border-b border-border py-7 sm:grid-cols-[72px_1fr]">
                <span className="font-mono text-[10px] uppercase text-primary">{label}</span>
                <div><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <div data-reveal className="reveal flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="section-label">04 / Learning achievements</p><h2 className="mt-5 text-4xl font-semibold sm:text-6xl">Proof of steady progress.</h2></div>
            <p className="font-mono text-[10px] uppercase text-muted-foreground">18 certificates & courses</p>
          </div>
          <div className="mt-14 grid gap-3 md:grid-cols-2">
            {achievements.map((achievement, index) => (
              <article data-reveal key={achievement.title} className="reveal achievement-card border border-border p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="max-w-md text-sm font-semibold leading-6">{achievement.title}</h3>
                  <span className="rounded-full border border-primary/40 px-2 py-1 font-mono text-[9px] uppercase text-primary">{achievement.source}</span>
                </div>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 font-mono text-[9px] uppercase text-muted-foreground">
                  {achievement.topics.map((topic) => <span key={topic}>{topic}</span>)}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-16 flex items-center justify-between border-t border-border pt-8">
            <p className="section-label">Learning archive</p>
            <Award className="size-5 text-primary" />
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {learningArchive.map((course, index) => (
              <div key={course} className="group flex min-h-16 items-center gap-4 border border-border px-5 py-4 transition-colors hover:border-primary/40 hover:bg-secondary/60">
                <span className="font-mono text-[10px] text-primary">{String(index + 1).padStart(2, "0")}</span>
                <p className="text-sm leading-6 text-muted-foreground transition-colors group-hover:text-foreground">{course}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div data-reveal className="reveal grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <p className="section-label">05 / Contact</p>
            <h2 className="mt-6 text-5xl font-semibold leading-[1.05] sm:text-7xl">Have a real problem <span className="text-primary">worth solving?</span></h2>
            <p className="mt-8 max-w-lg leading-8 text-muted-foreground">Tell me what you&apos;re building, what&apos;s getting in the way, or simply where you&apos;re headed. I&apos;ll get back to you with a thoughtful answer.</p>
            <div className="mt-9 space-y-4 text-sm">
              <a className="flex items-center gap-3 transition-colors hover:text-primary" href="mailto:omarbadawiii91@gmail.com"><Mail className="size-4 text-primary" /> omarbadawiii91@gmail.com <ArrowUpRight className="size-3" /></a>
              <p className="flex items-center gap-3 text-muted-foreground"><MapPin className="size-4 text-primary" /> Cairo, Egypt · Open for junior roles, internships, and freelance work</p>
              <div className="flex gap-3 pt-2">
                <Button asChild size="icon" variant="outline"><a href="https://github.com/omarbadawiii-91" target="_blank" rel="noreferrer" aria-label="Omar on GitHub"><Github /></a></Button>
                <Button asChild size="icon" variant="outline"><a href="https://www.linkedin.com/in/omar-mohamed-badawy/" target="_blank" rel="noreferrer" aria-label="Omar on LinkedIn"><Linkedin /></a></Button>
              </div>
            </div>
          </div>
          <form className="border border-border p-6 sm:p-8" action="mailto:omarbadawiii91@gmail.com" method="post" encType="text/plain">
            <div className="grid gap-7 sm:grid-cols-2">
              <label className="space-y-3 font-mono text-[10px] uppercase text-muted-foreground">Your name<input name="name" required placeholder="How should I call you?" className="w-full border-0 border-b border-border bg-transparent py-3 font-sans text-sm normal-case text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary" /></label>
              <label className="space-y-3 font-mono text-[10px] uppercase text-muted-foreground">Email<input name="email" type="email" required placeholder="you@company.com" className="w-full border-0 border-b border-border bg-transparent py-3 font-sans text-sm normal-case text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary" /></label>
            </div>
            <label className="mt-8 block space-y-3 font-mono text-[10px] uppercase text-muted-foreground">What are you working on?<textarea name="message" required rows={5} placeholder="A few details go a long way..." className="w-full resize-none border-0 border-b border-border bg-transparent py-3 font-sans text-sm normal-case text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary" /></label>
            <Button type="submit" size="lg" className="mt-8">Send message <Send /></Button>
          </form>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-5 px-5 py-8 text-xs sm:flex-row sm:items-center sm:px-8">
          <p className="font-semibold">Omar Mohamed Badawy</p>
          <p className="font-mono text-[9px] uppercase text-muted-foreground">Built with Flutter thinking & passion · Cairo, Egypt</p>
          <div className="flex items-center gap-4 text-muted-foreground"><a href="https://github.com/omarbadawiii-91" aria-label="GitHub"><Github className="size-4" /></a><a href="https://www.linkedin.com/in/omar-mohamed-badawy/" aria-label="LinkedIn"><Linkedin className="size-4" /></a><span>© 2026</span></div>
        </div>
      </footer>
    </main>
  );
}