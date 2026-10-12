"use client";

import Image from "next/image";
import { ArrowUpRight, BriefcaseBusiness, CheckCircle2, Github, Landmark } from "lucide-react";
import { useState } from "react";
import { OverlayDialog } from "@/components/overlay-dialog";

const projects = [{
  id: "peso-kabankalan",
  title: "PESO Kabankalan Employment System",
  shortTitle: "PESO Kabankalan City",
  category: "Employment Services Platform",
  stage: "Capstone Project",
  summary: "I built a digital employment platform connecting job seekers, employers, and PESO personnel through clearer, more accessible service workflows.",
  role: "Architecture, Full-stack Development, UI/UX",
  tags: ["Full-stack", "UI/UX", "Infrastructure"],
  image: "/images/peso-kabankalan-preview.png",
  website: "https://pesokabankalanjobs.tech",
  repository: "https://github.com/Angelo55/angelo-portfolio",
  repositoryLabel: "Portfolio source",
  features: [
    "Verified vacancy discovery and job fair information",
    "Job seeker registration, email verification, and unified profiles",
    "AI assisted resume review, job compatibility, and smart matching",
    "Application, referral, and employment progress tracking",
    "Employer and PESO administration workflows",
    "Career guidance, messaging, and event administration",
  ],
}];

export function ProjectShowcase() {
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null);

  return (
    <>
      <div className="projectShowcaseList">
        {projects.map((project) => (
          <article className="projectShowcase" key={project.id}>
            <button className="projectPreview" type="button" onClick={() => setActiveProject(project)} aria-label={`View ${project.title} case study`}>
              <Image src={project.image} alt={`Public landing page of the ${project.title}`} fill sizes="(max-width: 800px) calc(100vw - 40px), 62vw" />
              <span>Explore case study <ArrowUpRight /></span>
            </button>
            <div className="projectInfo">
              <div>
                <p className="eyebrow projectCategory"><Landmark />{project.category}</p>
                <h3>{project.shortTitle}</h3>
                <p>{project.summary}</p>
              </div>
              <div className="projectInfoBottom">
                <div className="projectTags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="projectLinks" aria-label={`${project.title} links`}>
                  <a href={project.website} target="_blank" rel="noreferrer">Live demo <ArrowUpRight /></a>
                  <a href={project.repository} target="_blank" rel="noreferrer"><Github />{project.repositoryLabel} <ArrowUpRight /></a>
                </div>
                <button className="projectTextAction" type="button" onClick={() => setActiveProject(project)}>
                  View project details <ArrowUpRight />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {activeProject && <OverlayDialog
        open
        onClose={() => setActiveProject(null)}
        title={activeProject.title}
        description="I designed this digital employment portal around the real workflows of PESO Kabankalan City."
        size="large"
        actions={<div className="projectDialogActions">
          <a className="btn" href={activeProject.website} target="_blank" rel="noreferrer">Visit live demo <ArrowUpRight /></a>
          <a className="btn btnSecondary" href={activeProject.repository} target="_blank" rel="noreferrer"><Github />{activeProject.repositoryLabel} <ArrowUpRight /></a>
        </div>}
      >
        <div className="caseStudy">
          <div className="caseStudyCopy">
            <section><p className="eyebrow">PROJECT OVERVIEW</p><p>{activeProject.summary}</p></section>
            <section><p className="eyebrow">MY CONTRIBUTION</p><p>I contributed to system architecture and infrastructure, frontend and backend functionality, and the interface and experience design.</p></section>
            <section><p className="eyebrow">VERIFIED CAPABILITIES</p><ul>{activeProject.features.map((feature) => <li key={feature}><CheckCircle2 />{feature}</li>)}</ul></section>
            <div className="projectRole"><BriefcaseBusiness /><span><small>ROLE AREAS</small><b>{activeProject.role}</b></span></div>
          </div>
          <figure className="projectSnapshot">
            <Image src={activeProject.image} alt={`Full public homepage of the ${activeProject.title}`} width={1440} height={5000} sizes="(max-width: 800px) 92vw, 44vw" />
            <figcaption>Public website reference captured from the official deployment.</figcaption>
          </figure>
        </div>
      </OverlayDialog>}
    </>
  );
}
