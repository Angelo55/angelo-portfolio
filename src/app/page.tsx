import Image from "next/image";
import { ArrowUpRight, Code2, Facebook, FileText, Github, Instagram, Languages, Linkedin, Mail, Sparkles, Wrench } from "lucide-react";
import { CertificateGallery } from "@/components/certificate-gallery";
import { ContactForm } from "@/components/contact-form";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { DocumentDialog } from "@/components/document-dialog";
import { Header } from "@/components/header";
import { HeroLogoField } from "@/components/hero-logo-field";
import { HeroTitle } from "@/components/hero-title";
import { ProjectShowcase } from "@/components/project-showcase";
import { Reveal } from "@/components/reveal";

const capabilities = [
  ["01", "Full-stack Development", "Frontend and backend implementation, system architecture, and infrastructure for practical web applications."],
  ["02", "UI/UX Implementation", "Clear, intuitive interfaces designed around usability, accessibility, and real service workflows."],
  ["03", "Workflow Automation", "Foundational hands-on exposure to n8n and AI-assisted workflows for connecting tools, reducing repetitive steps, and improving everyday processes."],
  ["04", "IT Hardware Support", "Hands-on troubleshooting for electrical, computer hardware, and common technical problems."],
];

const experience = [
  ["Fourth-year student", "Bachelor of Science in Information Technology", "Current"],
  ["Computer Student Society Organization", "President", "Aug 2025 - Jul 2026"],
  ["Agustin Lacsao", "Sales Staff", "Mar 2021 - Dec 2022"],
  ["Holy Rosary Academy", "Senior High School Graduate with Honors", "Jul 2021 - May 2022"],
];

const socials = [
  ["LinkedIn", "https://www.linkedin.com/in/angelo-pama-lacsao-0aa681353/?isSelfProfile=true", Linkedin],
  ["Facebook", "https://www.facebook.com/angelopamalacsao", Facebook],
  ["Instagram", "https://www.instagram.com/angelolacsao/?hl=en", Instagram],
  ["GitHub", "https://github.com/Angelo55", Github],
] as const;

export default function Home() {
  return <main id="top"><AnalyticsTracker /><div className="shell">
    <Header />
    <section className="hero pad">
      <HeroLogoField />
      <Reveal className="heroCopy">
        <div className="available"><i />Open to internships & entry-level roles</div>
        <HeroTitle />
        <p>A fourth-year BSIT student with practical exposure to AI-powered workflow automation, n8n, full-stack development, IT support, and hardware support—focused on building reliable technology that improves everyday work.</p>
        <a className="btn" href="#work">Explore my work <ArrowUpRight /></a>
      </Reveal>
      <Reveal className="heroCards" delay={0.1}>
        <div className="profileCard">
          <div className="profileMedia">
            <Image src="/images/lacsao-formal-photo.png" alt="Angelo Lacsao in formal business attire" fill priority sizes="(max-width: 700px) calc(100vw - 72px), (max-width: 1100px) 620px, 32vw" />
          </div>
          <div className="profileMeta"><span><b>Angelo Lacsao</b><small>Full-stack & Automation</small></span><small>Sipalay City, Philippines</small></div>
        </div>
        <div className="focus"><small>CURRENT FOCUS</small><b>Exploring AI-powered workflow automation and n8n integrations for practical services and everyday work.</b></div>
        <div className="social">
          <a href="mailto:angelopamalacsao@gmail.com" aria-label="Email Angelo"><Mail /></a>
          <DocumentDialog src="/documents/Angelo_Lacsao_Resume.pdf" title="Angelo Lacsao Resume" className="iconButton" iconOnly><FileText /></DocumentDialog>
        </div>
      </Reveal>
    </section>

    <Reveal><section className="mission">
      <p>I combine <em>design thinking</em>, full-stack development, workflow automation, and practical problem-solving to build technology people can use with confidence.</p>
      <div><span><Code2 />Full-stack web</span><span><Sparkles />Automation</span><span><Wrench />Hardware support</span></div>
    </section></Reveal>

    <section id="skills" className="split pad">
      <Reveal className="intro"><small>01 / CAPABILITIES</small><h2>How I can<br />contribute.</h2></Reveal>
      <div className="cards">{capabilities.map((capability, index) => <Reveal className="cap" delay={index * 0.05} key={capability[0]}><p>{capability[2]}</p><div><b>{capability[1]}</b><span>{capability[0]}</span></div></Reveal>)}</div>
    </section>

    <section id="work" className="split pad work">
      <Reveal className="intro"><small>02 / SELECTED WORK</small><h2>Technology built<br />for local impact.</h2></Reveal>
      <div className="projects"><Reveal><ProjectShowcase /></Reveal></div>
    </section>

    <section id="certificates" className="split pad">
      <Reveal className="intro"><small>03 / CREDENTIALS</small><h2>Certificates &<br />continuous learning.</h2></Reveal>
      <Reveal><CertificateGallery /></Reveal>
    </section>

    <section id="experience" className="experience pad">
      <Reveal>
        <small>04 / JOURNEY</small><h2>Experience,<br />education & leadership.</h2>
        <DocumentDialog src="/documents/Angelo_Lacsao_Resume.pdf" title="Angelo Lacsao Resume">View resume <ArrowUpRight /></DocumentDialog>
      </Reveal>
      <div className="expgrid">{experience.map((item, index) => <Reveal className="exp" key={item[1]} delay={index * 0.05}><small>{item[0]}</small><h3>{item[1]}</h3><p>{item[2]}</p></Reveal>)}</div>
    </section>

    <section id="contact" className="contact">
      <Reveal className="contactBox">
        <div><small>05 / GET IN TOUCH</small><h2>Have a project or<br />opportunity in mind?</h2><p>I&apos;m open to AI automation, IT support, hardware support, development internships, entry-level roles, collaborations, and conversations about useful technology.</p></div>
        <ContactForm />
      </Reveal>
    </section>

    <footer>
      <div className="connect">
        <h2>Let&apos;s connect<br />and create.</h2>
        <a href="mailto:angelopamalacsao@gmail.com">ANGELOPAMALACSAO@GMAIL.COM <ArrowUpRight /></a>
      </div>
      <div className="follow">
        <small>FOLLOW ALONG</small>
        {socials.map(([label, href, Icon]) => <a key={label} href={href} target="_blank" rel="noreferrer"><Icon />{label}</a>)}
        <a href="mailto:angelopamalacsao@gmail.com"><Mail />Gmail</a>
      </div>
      <div className="footbar">
        <span className="brand"><b>A</b> ANGELO LACSAO</span>
        <span className="languages"><Languages /> Tagalog / English / Hiligaynon</span>
        <span>Copyright 2026</span>
        <a href="#top">Back to top <ArrowUpRight /></a>
      </div>
    </footer>
  </div></main>;
}

