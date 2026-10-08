"use client";

import { ArrowUpRight, Download, FileText } from "lucide-react";
import { ReactNode, useState } from "react";
import { OverlayDialog } from "@/components/overlay-dialog";

type DocumentDialogProps = {
  src: string;
  title: string;
  children?: ReactNode;
  className?: string;
  iconOnly?: boolean;
};

export function DocumentDialog({ src, title, children, className = "btn", iconOnly }: DocumentDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className={className}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={iconOnly ? `View ${title}` : undefined}
      >
        {children ?? <FileText />}
      </button>
      <OverlayDialog
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        description="View the document without leaving the portfolio."
        size="large"
        actions={
          <>
            <a className="textLink" href={src} target="_blank" rel="noreferrer">
              Open in a new tab <ArrowUpRight />
            </a>
            <a className="btn" href={src} download>
              Download PDF <Download />
            </a>
          </>
        }
      >
        <div className="documentFrame">
          <iframe src={src} title={title} />
          <p>
            Your browser may not display embedded PDFs. Use the open or download action below.
          </p>
        </div>
      </OverlayDialog>
    </>
  );
}
