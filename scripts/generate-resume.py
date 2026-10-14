"""Build a single-column, ATS-readable resume from verified portfolio facts."""

from pathlib import Path
import sys

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


OUTPUT = Path(sys.argv[1])
PAGE_WIDTH, PAGE_HEIGHT = letter
INK = colors.HexColor("#202020")
RULE = colors.HexColor("#666666")
LEFT = 48
RIGHT = 48
WIDTH = PAGE_WIDTH - LEFT - RIGHT
BODY = ParagraphStyle("body", fontName="Helvetica", fontSize=9.5, leading=13.2, textColor=INK)
SMALL = ParagraphStyle("small", parent=BODY, fontSize=9.1, leading=12.2)


def paragraph(pdf: canvas.Canvas, text: str, top: float, style: ParagraphStyle = BODY, gap: float = 3) -> float:
    item = Paragraph(text, style)
    _, height = item.wrap(WIDTH, top)
    item.drawOn(pdf, LEFT, top - height)
    return top - height - gap


def section(pdf: canvas.Canvas, title: str, top: float) -> float:
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 9.5)
    pdf.drawString(LEFT, top, title.upper())
    pdf.setStrokeColor(RULE)
    pdf.setLineWidth(0.55)
    pdf.line(LEFT, top - 4, PAGE_WIDTH - RIGHT, top - 4)
    return top - 18


def entry(pdf: canvas.Canvas, title: str, date: str, top: float) -> float:
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 9.1)
    pdf.drawString(LEFT, top, title)
    pdf.setFont("Helvetica", 8.6)
    pdf.drawRightString(PAGE_WIDTH - RIGHT, top, date)
    return top - 13


OUTPUT.parent.mkdir(parents=True, exist_ok=True)
pdf = canvas.Canvas(str(OUTPUT), pagesize=letter, pageCompression=1)
pdf.setTitle("Angelo Pama Lacsao - Resume")
pdf.setAuthor("Angelo Pama Lacsao")
pdf.setSubject("Information Technology student resume")

pdf.setFillColor(INK)
pdf.setFont("Helvetica-Bold", 22)
pdf.drawString(LEFT, 747, "Angelo Pama Lacsao")
pdf.setFont("Helvetica-Bold", 9)
pdf.drawString(LEFT, 727, "FOURTH-YEAR BSIT STUDENT  |  IT SUPPORT  |  FULL-STACK DEVELOPMENT")
pdf.setFont("Helvetica", 9)
pdf.drawString(LEFT, 712, "Sipalay City, Philippines  |  angelopamalacsao@gmail.com")
pdf.setStrokeColor(RULE)
pdf.setLineWidth(0.8)
pdf.line(LEFT, 700, PAGE_WIDTH - RIGHT, 700)

y = section(pdf, "Professional Summary", 684)
y = paragraph(
    pdf,
    "I am a fourth-year BSIT student with practical exposure to full-stack development, UI/UX implementation, "
    "AI-assisted workflows, and IT hardware support. My customer-facing retail experience supports a patient, "
    "service-oriented approach to troubleshooting. I am open to internships and entry-level opportunities in "
    "IT support, development, and workflow automation.",
    y,
    gap=14,
)

y = section(pdf, "Skills", y)
skills = [
    ("IT Support", "Help Desk Concepts, Remote Troubleshooting, Technical Problem Solving, IT Hardware Support"),
    ("Customer Service", "Customer Service, End-user Communication, Issue Documentation, Critical Thinking"),
    ("Artificial Intelligence", "Generative AI, Prompt Engineering, AI-Assisted Writing, AI Models and Tools, AI Tool Evaluation, Business Productivity, Content Generation"),
    ("Responsible AI", "AI Ethics, Data Privacy, AI Security Awareness, Bias Detection, Human-in-the-Loop Review, Responsible AI"),
    ("Development &amp; Automation", "Full-stack Development, UI/UX Implementation, AI-powered Workflow Automation, foundational n8n exposure"),
]
for label, detail in skills:
    y = paragraph(pdf, f"<b>{label}:</b> {detail}", y, SMALL, gap=4)
y -= 9

y = section(pdf, "Experience & Leadership", y)
y = entry(pdf, "President, Computer Student Society Organization", "Aug 2025 - Jul 2026", y)
y = entry(pdf, "Sales Staff, Agustin Lacsao", "Mar 2021 - Dec 2022", y - 3)
y = paragraph(
    pdf,
    "- Supported daily retail operations and frontline customer service. Increased monthly sales by approximately "
    "15% through targeted upselling and product placement.<br/>"
    "- Managed inventory and supplier orders, processed POS transactions, and completed daily cash reconciliation.",
    y,
    SMALL,
    gap=14,
)

y = section(pdf, "Selected Project", y)
y = entry(pdf, "PESO Kabankalan Employment System", "Capstone project", y)
y = paragraph(
    pdf,
    "I developed a full-stack employment platform connecting job seekers, employers, and PESO personnel. "
    "My contributions covered system architecture, infrastructure, frontend and backend functionality, and UI/UX implementation.",
    y,
    SMALL,
    gap=2,
)
y = paragraph(
    pdf,
    "Live demo: <link href='https://pesokabankalanjobs.tech' color='#202020'>pesokabankalanjobs.tech</link>"
    "  |  Portfolio: <link href='https://angelolacsao-portfolio.vercel.app' color='#202020'>angelolacsao-portfolio.vercel.app</link>",
    y,
    SMALL,
    gap=14,
)

y = section(pdf, "Education", y)
y = paragraph(pdf, "<b>Bachelor of Science in Information Technology</b> - Fourth-year student, current", y, BODY, gap=2)
y = paragraph(pdf, "<b>Holy Rosary Academy</b> - Senior High School Graduate with Honors, Jul 2021 - May 2022", y, BODY, gap=14)

y = section(pdf, "Certificates & Achievements", y)
certificates = [
    "<b>IT Customer Support Basics</b> - Cisco Networking Academy, 14 Oct 2026",
    "<b>English for Career Development MOOC</b> - OPEN MOOCs / Online Professional English Network, 14 Oct 2026",
    "<b>Core Generative AI Skills</b> - Cisco Networking Academy, 5 Oct 2026",
    "<b>Introduction to AI Literacy and Responsible Use</b> - Mapua University / ACHIEVE, 14 Sep 2026",
]
for credential in certificates:
    y = paragraph(pdf, "- " + credential, y, SMALL, gap=4)
y -= 10

y = section(pdf, "Languages", y)
y = paragraph(pdf, "Tagalog  |  English  |  Hiligaynon", y, BODY, gap=0)

if y < 44:
    raise SystemExit(f"Resume content extends into the bottom margin: y={y:.1f}")

pdf.save()
