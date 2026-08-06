import jsPDF from 'jspdf';
import { contactInfo, workExperiences, educationList } from '../data/resumeData';

export const handleDownloadCV = () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = 18;

  // Header Background
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Name
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text(contactInfo.name.toUpperCase(), margin, 16);

  // Title
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(226, 232, 240); // slate-200
  doc.text(contactInfo.title.toUpperCase(), margin, 24);

  // Contact Info Line
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184); // slate-400
  const contactStr = `Phone: ${contactInfo.phone}  |  Email: ${contactInfo.email}  |  Location: ${contactInfo.location}`;
  doc.text(contactStr, margin, 33);

  y = 52;

  // Helper for Section Headers
  const drawSectionHeader = (title: string) => {
    doc.setFillColor(241, 245, 249); // slate-100
    doc.rect(margin, y - 4, contentWidth, 7, 'F');
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(title.toUpperCase(), margin + 2, y + 1);
    y += 8;
  };

  // 1. EXECUTIVE SUMMARY
  drawSectionHeader('Executive Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85);

  const summaryLines = doc.splitTextToSize(
    'Data Analyst & Scientist with 4+ years of experience at Bank of Abyssinia HQ. Specialized in converting multi-million row financial transaction data into strategic executive clarity. Proven track record in developing automated PowerPoint generators, Outlook email distribution systems, SQL desktop analytics, Power BI & Tableau dashboards, and high-volume ETL pipelines.',
    contentWidth
  );
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 5 + 4;

  // 2. WORK EXPERIENCE
  drawSectionHeader('Professional Experience');

  workExperiences.forEach((exp) => {
    // Check page space
    if (y > 250) {
      doc.addPage();
      y = 18;
    }

    // Role & Company Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`${exp.title}`, margin, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`${exp.company} (${exp.duration})`, pageWidth - margin, y, { align: 'right' });

    y += 5;

    // Location
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`${exp.location}`, margin, y);
    y += 5;

    // Built Projects / Deliverables
    if (exp.whatIBuilt && exp.whatIBuilt.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(30, 41, 59);
      doc.text('Key Systems & Automation Built:', margin, y);
      y += 4.5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      exp.whatIBuilt.forEach((builtItem) => {
        if (y > 270) {
          doc.addPage();
          y = 18;
        }
        const bulletLines = doc.splitTextToSize(`• ${builtItem}`, contentWidth - 4);
        doc.text(bulletLines, margin + 2, y);
        y += bulletLines.length * 4;
      });
      y += 2;
    }

    // Skills Used
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`Core Tooling: ${exp.skills.join(', ')}`, margin, y);
    y += 7;
  });

  // 3. EDUCATION
  if (y > 240) {
    doc.addPage();
    y = 18;
  }

  drawSectionHeader('Education');

  educationList.forEach((edu) => {
    if (y > 270) {
      doc.addPage();
      y = 18;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(edu.degree, margin, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(`${edu.institution} (${edu.duration})`, pageWidth - margin, y, { align: 'right' });

    y += 4.5;

    if (edu.gpa) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(16, 185, 129); // emerald-600
      doc.text(`Cumulative GPA: ${edu.gpa}`, margin, y);
      y += 4.5;
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    const eduDesc = doc.splitTextToSize(edu.description, contentWidth);
    doc.text(eduDesc, margin, y);
    y += eduDesc.length * 4.5 + 4;
  });

  // Save the generated PDF directly to the user's browser
  doc.save('Daniel_Yetesha_CV.pdf');
};
