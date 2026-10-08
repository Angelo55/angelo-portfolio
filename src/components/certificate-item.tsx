"use client";

import { ArrowUpRight, Award } from "lucide-react";
import { useState } from "react";
import { OverlayDialog } from "@/components/overlay-dialog";

type CertificateItemProps = {
  title: string;
  issuer: string;
  date: string;
};

export function CertificateItem({ title, issuer, date }: CertificateItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="cert" type="button" onClick={() => setOpen(true)}>
        <Award />
        <span><b>{title}</b><small>{issuer}</small></span>
        <time>{date}</time>
        <ArrowUpRight />
      </button>
      <OverlayDialog
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        description="Certificate details from Angelo's professional record."
      >
        <div className="credentialDetail">
          <Award />
          <dl>
            <div><dt>Issued by</dt><dd>{issuer}</dd></div>
            <div><dt>Date earned</dt><dd>{date}</dd></div>
            <div><dt>Evidence</dt><dd>Credential file or verification link can be added when supplied.</dd></div>
          </dl>
        </div>
      </OverlayDialog>
    </>
  );
}
