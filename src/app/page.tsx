import Image from "next/image";
import { ArrowUpRight, Code2, Facebook, FileText, Github, Headset, Instagram, Languages, Linkedin, Mail, MessageCircle, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { CertificateGallery } from "@/components/certificate-gallery";
import { ContactForm } from "@/components/contact-form";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { DocumentDialog } from "@/components/document-dialog";
import { Header } from "@/components/header";
import { HeroLogoField } from "@/components/hero-logo-field";
import { HeroTitle } from "@/components/hero-title";
import { ProjectShowcase } from "@/components/project-showcase";
import { Reveal } from "@/components/reveal";

const skillGroups = [
  {
    id: "it-support",
    number: "01",
    title: "IT Support",
    summary: "Support fundamentals, troubleshooting, and practical problem solving.",
    icon: Headset,
    skills: [
      { label: "Help Desk Concepts" },
      { label: "Remote Troubleshooting" },
      { label: "Technical Problem Solving" },
      { label: "IT Hardware Support" },
    ],
  },
  {
    id: "customer-service",
    number: "02",
    title: "Customer Service",
    summary: "Clear, patient communication shaped by frontline retail experience.",
    icon: MessageCircle,
    skills: [
      { label: "Customer Service" },
      { label: "End-user Communication" },
      { label: "Issue Documentation" },
      { label: "Critical Thinking" },
    ],
  },
  {
    id: "artificial-intelligence",
    number: "03",
    title: "Artificial Intelligence",
    summary: "Generative AI and practical AI-assisted work and productivity.",
    icon: Sparkles,
    skills: [
      { label: "Generative AI" },
      { label: "Prompt Engineering" },
      { label: "AI-Assisted Writing" },
      { label: "AI Models and Tools" },
      { label: "AI Tool Evaluation" },
      { label: "Business Productivity" },
      { label: "Content Generation" },
    ],
  },
  {
    id: "responsible-ai",
    number: "04",
    title: "Responsible AI",
    summary: "Privacy, security awareness, and human review in AI-assisted work.",
    icon: ShieldCheck,
    skills: [
      { label: "AI Ethics" },
      { label: "Data Privacy" },
      { label: "AI Security Awareness" },
      { label: "Bias Detection" },
      { label: "Human-in-the-Loop Review" },
      { label: "Responsible AI" },
    ],
  },
  {
    id: "development-automation",
    number: "05",
    title: "Development & Automation",
    summary: "Building useful web experiences and exploring workflow automation.",
    icon: Code2,
    skills: [
      { label: "Full-stack Development" },
      { label: "UI/UX Implementation" },
      { label: "AI-powered Workflow Automation" },
      { label: "n8n (hands-on exposure)" },
      { label: "Make.com (hands-on exposure)" },
    ],
  },
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
        <p>I&apos;m a fourth-year BSIT student with practical exposure to AI-powered workflow automation using n8n and Make.com, full-stack development, IT support, and hardware support. I focus on building reliable technology that improves everyday work.</p>
        <a className="btn" href="#work">Explore my work <ArrowUpRight /></a>
      </Reveal>
      <Reveal className="heroCards" delay={0.1}>
        <div className="profileCard">
          <div className="profileMedia">
            <Image src="/images/lacsao-formal-photo.png" alt="Angelo Lacsao in formal business attire" fill priority sizes="(max-width: 700px) calc(100vw - 72px), (max-width: 1100px) 620px, 32vw" />
          </div>
          <div className="profileMeta"><span><b>Angelo Lacsao</b><small>Full-stack & Automation</small></span><small>Sipalay City, Philippines</small></div>
        </div>
        <div className="focus"><small>CURRENT FOCUS</small><b>I&apos;m exploring AI-powered workflow automation with n8n and Make.com for practical services and everyday work.</b></div>
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
      <div className="skillGroups">
        {skillGroups.map((group, index) => {
          const Icon = group.icon;
          return <Reveal className="skillCategory" delay={index * 0.04} key={group.id}>
            <div className="skillCategoryHeading">
              <span className="skillIcon"><Icon aria-hidden="true" /></span>
              <div><small>{group.number} / SKILL GROUP</small><h3>{group.title}</h3></div>
            </div>
            <p>{group.summary}</p>
            <ul aria-label={`${group.title} skills`}>
              {group.skills.map((skill) => <li key={skill.label}>
                <span>{skill.label}</span>
              </li>)}
            </ul>
          </Reveal>;
        })}
      </div>
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
        <a href="/privacy">Privacy <ArrowUpRight /></a>
      </div>
    </footer>
  </div></main>;
}

