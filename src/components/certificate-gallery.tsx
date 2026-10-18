"use client";

import Image from "next/image";
import { ArrowUpRight, Award, BadgeCheck, CalendarDays, Download, ExternalLink } from "lucide-react";
import { useState } from "react";
import { OverlayDialog } from "@/components/overlay-dialog";

const certificates = [
  {
    id: "it-customer-support-basics",
    title: "IT Customer Support Basics",
    issuer: "Cisco Networking Academy",
    date: "14 October 2026",
    type: "Certificate of Course Completion - student-level credential",
    credentialId: null,
    verification: "The certificate includes a Cisco Networking Academy verified badge and a QR verification mark.",
    preview: "/images/certificates/it-customer-support-basics.webp",
    document: "/documents/certificates/it-customer-support-basics.pdf",
    tone: "cisco-support",
  },
  {
    id: "it-support-specialist-pathway-exam",
    title: "IT Support Specialist Pathway Exam",
    issuer: "Cisco Networking Academy",
    date: "18 October 2026",
    type: "Certificate of completion - pathway exam",
    credentialId: "87af25c7-d8fe-4579-a351-fe71b42ee861",
    verification: "The original certificate includes a QR verification mark and certificate ID.",
    preview: "/images/certificates/it-support-specialist-pathway-exam.webp",
    document: "/documents/certificates/it-support-specialist-pathway-exam.pdf",
    tone: "cisco-support",
  },
  {
    id: "generative-ai",
    title: "Core Generative AI Skills",
    issuer: "Cisco Networking Academy",
    date: "5 October 2026",
    type: "Student-level course credential",
    credentialId: null,
    verification: "The original credential includes a verified badge and QR verification.",
    preview: "/images/certificates/core-generative-ai-skills.webp",
    document: "/documents/certificates/core-generative-ai-skills.pdf",
    tone: "cisco",
  },
  {
    id: "ai-literacy",
    title: "Introduction to AI Literacy and Responsible Use",
    issuer: "Mapua University / ACHIEVE",
    date: "14 September 2026",
    type: "Micro-credentials course",
    credentialId: "0QOLN0OA4OYWA",
    verification: "Computer-generated credential issued through OpenLearning.",
    preview: "/images/certificates/introduction-ai-literacy.webp",
    document: "/documents/certificates/introduction-ai-literacy.pdf",
    tone: "mapua",
  },
  {
    id: "english-career-development",
    title: "English for Career Development MOOC",
    issuer: "OPEN MOOCs / Online Professional English Network",
    date: "14 October 2026",
    type: "Certificate of Award - MOOC completion",
    credentialId: null,
    verification: "OPEN is sponsored by the U.S. Department of State and administered by FHI 360; the original certificate includes a QR verification mark.",
    preview: "/images/certificates/english-career-development-mooc.webp",
    document: "/documents/certificates/english-career-development-mooc.pdf",
    tone: "open",
  },
] as const;

type Certificate = (typeof certificates)[number];

export function CertificateGallery() {
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null);

  return (
    <>
      <div className="certificateGallery">
        {certificates.map((certificate) => (
          <button
            className={`certificateCard certificateCard-${certificate.tone}`}
            type="button"
            key={certificate.id}
            onClick={() => setActiveCertificate(certificate)}
            aria-label={`View certificate: ${certificate.title}`}
          >
            <span className="certificatePreview">
              <Image
                src={certificate.preview}
                alt={`Preview of ${certificate.title} certificate awarded to Angelo Pama Lacsao`}
                fill
                sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1100px) 46vw, 32vw"
              />
              <span className="certificateView">View credential <ArrowUpRight /></span>
            </span>
            <span className="certificateCardBody">
              <span className="certificateIssuer"><BadgeCheck />{certificate.issuer}</span>
              <strong>{certificate.title}</strong>
              <span className="certificateMeta"><CalendarDays />{certificate.date}</span>
            </span>
          </button>
        ))}
      </div>

      {activeCertificate && (
        <OverlayDialog
          open
          onClose={() => setActiveCertificate(null)}
          title={activeCertificate.title}
          description={`${activeCertificate.issuer} credential awarded to Angelo Pama Lacsao.`}
          size="large"
          actions={
            <>
              <a className="textLink" href={activeCertificate.document} target="_blank" rel="noreferrer">
                Open PDF <ExternalLink />
              </a>
              <a className="btn" href={activeCertificate.document} download>
                Download <Download />
              </a>
            </>
          }
        >
          <div className="certificateDialog">
            <div className="certificateDocumentFrame">
              <iframe src={activeCertificate.document} title={`${activeCertificate.title} certificate`} />
            </div>
            <aside className="certificateDetails" aria-label="Certificate details">
              <div className="certificateSeal"><Award /></div>
              <dl>
                <div><dt>Recipient</dt><dd>Angelo Pama Lacsao</dd></div>
                <div><dt>Issued by</dt><dd>{activeCertificate.issuer}</dd></div>
                <div><dt>Date issued</dt><dd>{activeCertificate.date}</dd></div>
                <div><dt>Credential</dt><dd>{activeCertificate.type}</dd></div>
                {activeCertificate.credentialId && <div><dt>Credential ID</dt><dd>{activeCertificate.credentialId}</dd></div>}
                <div><dt>Verification</dt><dd>{activeCertificate.verification}</dd></div>
              </dl>
            </aside>
          </div>
        </OverlayDialog>
      )}
    </>
  );
}
