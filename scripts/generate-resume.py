from pathlib import Path
import sys

from reportlab.lib import colors
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


OUTPUT = Path(sys.argv[1])
PAGE_WIDTH, PAGE_HEIGHT = letter
NAVY = colors.HexColor("#202e32")
TEAL = colors.HexColor("#247783")
MUTED = colors.HexColor("#667276")
RULE = colors.HexColor("#d4dddc")
LEFT = 42
RIGHT = 42
GAP = 22
CONTENT_WIDTH = PAGE_WIDTH - LEFT - RIGHT
LEFT_WIDTH = 226
RIGHT_X = LEFT + LEFT_WIDTH + GAP
RIGHT_WIDTH = CONTENT_WIDTH - LEFT_WIDTH - GAP

styles = {
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=9.2, leading=12.1, textColor=NAVY, spaceAfter=3),
    "small": ParagraphStyle("small", fontName="Helvetica", fontSize=8.4, leading=11.2, textColor=MUTED, spaceAfter=2),
    "category": ParagraphStyle("category", fontName="Helvetica-Bold", fontSize=8.9, leading=11, textColor=NAVY, spaceBefore=7, spaceAfter=1),
    "job": ParagraphStyle("job", fontName="Helvetica-Bold", fontSize=9.1, leading=11.4, textColor=NAVY),
    "date": ParagraphStyle("date", fontName="Helvetica", fontSize=7.7, leading=9.8, textColor=MUTED, alignment=TA_RIGHT),
    "credential": ParagraphStyle("credential", fontName="Helvetica-Bold", fontSize=8.3, leading=10.3, textColor=NAVY, spaceAfter=1),
}


def draw_section(pdf: canvas.Canvas, label: str, x: float, top: float, width: float) -> float:
    pdf.setFillColor(TEAL)
    pdf.setFont("Helvetica-Bold", 9.5)
    pdf.drawString(x, top, label.upper())
    rule_y = top - 5
    pdf.setStrokeColor(RULE)
    pdf.setLineWidth(0.7)
    pdf.line(x, rule_y, x + width, rule_y)
    return rule_y - 13


def draw_paragraph(pdf: canvas.Canvas, text: str, x: float, top: float, width: float, style: ParagraphStyle, gap: float = 2) -> float:
    paragraph = Paragraph(text, style)
    _, height = paragraph.wrap(width, top)
    paragraph.drawOn(pdf, x, top - height)
    return top - height - gap


def draw_heading(pdf: canvas.Canvas, title: str, date: str, x: float, top: float, width: float) -> float:
    title_width = width - 76
    title_paragraph = Paragraph(title, styles["job"])
    date_paragraph = Paragraph(date, styles["date"])
    _, title_height = title_paragraph.wrap(title_width, top)
    _, date_height = date_paragraph.wrap(76, top)
    row_height = max(title_height, date_height)
    title_paragraph.drawOn(pdf, x, top - title_height)
    date_paragraph.drawOn(pdf, x + title_width, top - date_height)
    return top - row_height - 3


pdf = canvas.Canvas(str(OUTPUT), pagesize=letter, pageCompression=1)
pdf.setTitle("Angelo Pama Lacsao - Resume")
pdf.setAuthor("Angelo Pama Lacsao")
pdf.setSubject("Information Technology student resume")

pdf.setFillColor(NAVY)
pdf.setFont("Helvetica-Bold", 25)
pdf.drawString(LEFT, 752, "Angelo Pama Lacsao")
pdf.setFillColor(TEAL)
pdf.setFont("Helvetica-Bold", 9.2)
pdf.drawString(LEFT, 733, "FOURTH-YEAR BSIT STUDENT  |  IT SUPPORT  |  FULL-STACK DEVELOPMENT")
pdf.setFillColor(MUTED)
pdf.setFont("Helvetica", 8.5)
pdf.drawString(LEFT, 716, "Sipalay City, Philippines  |  angelopamalacsao@gmail.com")
pdf.setStrokeColor(TEAL)
pdf.setLineWidth(1.2)
pdf.line(LEFT, 704, PAGE_WIDTH - RIGHT, 704)

summary_top = 686
summary_y = draw_section(pdf, "Professional Summary", LEFT, summary_top, CONTENT_WIDTH)
summary_y = draw_paragraph(
    pdf,
    "I am a fourth-year BSIT student with practical experience in full-stack development, UI/UX implementation, AI-assisted workflows, and IT hardware support. My customer-facing retail experience supports a patient, service-oriented approach to troubleshooting. I am open to internships and entry-level opportunities in IT support, development, and workflow automation.",
    LEFT,
    summary_y,
    CONTENT_WIDTH,
    styles["body"],
    0,
)

body_top = summary_y - 18
left_y = draw_section(pdf, "Skills", LEFT, body_top, LEFT_WIDTH)
left_y = draw_paragraph(pdf, "IT SUPPORT", LEFT, left_y, LEFT_WIDTH, styles["category"], 1)
left_y = draw_paragraph(pdf, "Help Desk Concepts, Remote Troubleshooting, Technical Problem Solving, and IT Hardware Support.", LEFT, left_y, LEFT_WIDTH, styles["small"], 2)
left_y = draw_paragraph(pdf, "CUSTOMER SERVICE", LEFT, left_y, LEFT_WIDTH, styles["category"], 1)
left_y = draw_paragraph(pdf, "Customer Service, End-user Communication, Issue Documentation, and Critical Thinking.", LEFT, left_y, LEFT_WIDTH, styles["small"], 2)
left_y = draw_paragraph(pdf, "ARTIFICIAL INTELLIGENCE", LEFT, left_y, LEFT_WIDTH, styles["category"], 1)
left_y = draw_paragraph(pdf, "Generative AI, Prompt Engineering, AI-Assisted Writing, AI Models and Tools, AI Tool Evaluation, Business Productivity, and Content Generation.", LEFT, left_y, LEFT_WIDTH, styles["small"], 2)
left_y = draw_paragraph(pdf, "RESPONSIBLE AI", LEFT, left_y, LEFT_WIDTH, styles["category"], 1)
left_y = draw_paragraph(pdf, "AI Ethics, Data Privacy, AI Security Awareness, Bias Detection, Human-in-the-Loop Review, and Responsible AI.", LEFT, left_y, LEFT_WIDTH, styles["small"], 2)
left_y = draw_paragraph(pdf, "DEVELOPMENT & AUTOMATION", LEFT, left_y, LEFT_WIDTH, styles["category"], 1)
left_y = draw_paragraph(pdf, "Full-stack Development, UI/UX Implementation, AI-powered Workflow Automation, and foundational n8n exposure.", LEFT, left_y, LEFT_WIDTH, styles["small"], 4)

left_y = draw_section(pdf, "Education", LEFT, left_y - 5, LEFT_WIDTH)
left_y = draw_paragraph(pdf, "<b>Bachelor of Science in Information Technology</b><br/>Fourth-year student | Current", LEFT, left_y, LEFT_WIDTH, styles["body"], 5)
left_y = draw_paragraph(pdf, "<b>Holy Rosary Academy</b><br/>Senior High School Graduate with Honors<br/>July 2021 - May 2022", LEFT, left_y, LEFT_WIDTH, styles["body"], 5)

left_y = draw_section(pdf, "Certificates & Achievements", LEFT, left_y - 9, LEFT_WIDTH)
certificates = [
    ("IT Customer Support Basics", "Cisco Networking Academy | 14 Oct 2026"),
    ("English for Career Development MOOC", "OPEN MOOCs / Online Professional English Network | 14 Oct 2026"),
    ("Core Generative AI Skills", "Cisco Networking Academy | 5 Oct 2026"),
    ("Introduction to AI Literacy and Responsible Use", "Mapua University / ACHIEVE | 14 Sep 2026"),
]
for title, details in certificates:
    left_y = draw_paragraph(pdf, title, LEFT, left_y, LEFT_WIDTH, styles["credential"], 0)
    left_y = draw_paragraph(pdf, details, LEFT, left_y, LEFT_WIDTH, styles["small"], 4)

right_y = draw_section(pdf, "Experience & Leadership", RIGHT_X, body_top, RIGHT_WIDTH)
right_y = draw_heading(pdf, "President, Computer Student Society Organization", "Aug 2025 - Jul 2026", RIGHT_X, right_y, RIGHT_WIDTH)
right_y -= 8
right_y = draw_heading(pdf, "Sales Staff, Agustin Lacsao", "Mar 2021 - Dec 2022", RIGHT_X, right_y, RIGHT_WIDTH)
right_y = draw_paragraph(pdf, "Supported daily retail operations and frontline customer service. Increased monthly sales by approximately 15% through targeted upselling and product placement.", RIGHT_X, right_y, RIGHT_WIDTH, styles["small"], 2)
right_y = draw_paragraph(pdf, "Managed inventory and supplier orders, processed POS transactions, and completed daily cash reconciliation.", RIGHT_X, right_y, RIGHT_WIDTH, styles["small"], 9)

right_y = draw_section(pdf, "Selected Project", RIGHT_X, right_y, RIGHT_WIDTH)
right_y = draw_heading(pdf, "PESO Kabankalan Employment System", "Capstone project", RIGHT_X, right_y, RIGHT_WIDTH)
right_y = draw_paragraph(pdf, "I developed a full-stack employment platform connecting job seekers, employers, and PESO personnel. My contributions covered system architecture, infrastructure, frontend and backend functionality, and UI/UX implementation.", RIGHT_X, right_y, RIGHT_WIDTH, styles["small"], 8)
right_y = draw_paragraph(pdf, "Live demo: <link href='https://pesokabankalanjobs.tech' color='#247783'>pesokabankalanjobs.tech</link><br/>Portfolio: <link href='https://angelolacsao-portfolio.vercel.app' color='#247783'>angelolacsao-portfolio.vercel.app</link>", RIGHT_X, right_y, RIGHT_WIDTH, styles["small"], 8)

right_y = draw_section(pdf, "Languages", RIGHT_X, right_y, RIGHT_WIDTH)
right_y = draw_paragraph(pdf, "Tagalog | English | Hiligaynon", RIGHT_X, right_y, RIGHT_WIDTH, styles["body"], 8)

pdf.setStrokeColor(RULE)
pdf.setLineWidth(0.6)
pdf.line(LEFT, 32, PAGE_WIDTH - RIGHT, 32)
pdf.setFillColor(MUTED)
pdf.setFont("Helvetica", 7)
pdf.drawString(LEFT, 20, "Portfolio: angelolacsao-portfolio.vercel.app")
pdf.drawRightString(PAGE_WIDTH - RIGHT, 20, "Resume | October 2026")
pdf.save()

if min(left_y, right_y) < 42:
    raise SystemExit(f"Resume content extends into footer: left={left_y:.1f}, right={right_y:.1f}")
