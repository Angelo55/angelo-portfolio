import Image from "next/image";
import type { CSSProperties } from "react";

const heroLogos = [
  { id: "python", name: "Python", src: "/icons/hero/python.svg", width: 64, height: 64, className: "heroLogoPython", duration: "9.8s", delay: "-3.1s", driftX: "7px", driftY: "-14px", midX: "-3px", midY: "5px", rotate: "2.2deg", scale: "1.035", easing: "cubic-bezier(.37,.02,.22,1)" },
  { id: "javascript", name: "JavaScript", src: "/icons/hero/javascript.svg", width: 56, height: 56, className: "heroLogoJavascript", duration: "13.1s", delay: "-7.2s", driftX: "-9px", driftY: "11px", midX: "4px", midY: "-3px", rotate: "-2.8deg", scale: ".97", easing: "cubic-bezier(.45,.05,.18,.96)" },
  { id: "typescript", name: "TypeScript", src: "/icons/hero/typescript.svg", width: 54, height: 54, className: "heroLogoTypescript", duration: "8.9s", delay: "-4.6s", driftX: "8px", driftY: "-9px", midX: "-4px", midY: "4px", rotate: "1.6deg", scale: "1.025", easing: "cubic-bezier(.33,.01,.17,1)" },
  { id: "react", name: "React", src: "/icons/hero/react.svg", width: 62, height: 62, className: "heroLogoReact", duration: "14.4s", delay: "-9.4s", driftX: "-6px", driftY: "-15px", midX: "3px", midY: "6px", rotate: "3deg", scale: "1.04", easing: "cubic-bezier(.42,.04,.2,.98)" },
  { id: "nodejs", name: "Node.js", src: "/icons/hero/nodejs.svg", width: 62, height: 62, className: "heroLogoNodejs", duration: "11.3s", delay: "-6.1s", driftX: "9px", driftY: "12px", midX: "-3px", midY: "-5px", rotate: "-2deg", scale: ".975", easing: "cubic-bezier(.36,.03,.24,1)" },
  { id: "php", name: "PHP", src: "/icons/hero/php.svg", width: 66, height: 66, className: "heroLogoPhp", duration: "15.2s", delay: "-8.7s", driftX: "-7px", driftY: "-12px", midX: "4px", midY: "4px", rotate: "1.4deg", scale: "1.03", easing: "cubic-bezier(.4,.02,.16,.97)" },
  { id: "nextjs", name: "Next.js", src: "/icons/hero/nextjs.svg", width: 58, height: 58, className: "heroLogoNextjs", duration: "10.6s", delay: "-2.3s", driftX: "6px", driftY: "13px", midX: "-4px", midY: "-4px", rotate: "-2.4deg", scale: ".965", easing: "cubic-bezier(.31,.04,.21,1)" },
  { id: "n8n", name: "n8n", src: "/icons/hero/n8n.svg", width: 144, height: 40, className: "heroLogoN8n", duration: "13.7s", delay: "-5.5s", driftX: "8px", driftY: "-9px", midX: "-3px", midY: "3px", rotate: ".8deg", scale: "1.018", easing: "cubic-bezier(.39,.03,.19,.99)" },
] as const;

export function HeroLogoField() {
  return (
    <div className="heroLogoField" aria-hidden="true">
      {heroLogos.map((logo) => {
        const style = {
          "--hero-logo-duration": logo.duration,
          "--hero-logo-delay": logo.delay,
          "--hero-logo-drift-x": logo.driftX,
          "--hero-logo-drift-y": logo.driftY,
          "--hero-logo-mid-x": logo.midX,
          "--hero-logo-mid-y": logo.midY,
          "--hero-logo-rotate": logo.rotate,
          "--hero-logo-scale": logo.scale,
          "--hero-logo-easing": logo.easing,
        } as CSSProperties;

        return (
          <span className={`heroLogo ${logo.className}`} style={style} key={logo.id}>
            <Image src={logo.src} alt="" width={logo.width} height={logo.height} />
          </span>
        );
      })}
    </div>
  );
}
