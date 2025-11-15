// Utility functions for formatting legal citations

function formatCitation(citation) {
  // Takes raw citation data and formats it properly
  if (!citation) return '';
  
  const { type, title, volume, reporter, page, court, year } = citation;
  
  if (type === 'case') {
    // Format: Case Name, Volume Reporter Page (Court Year)
    return `${title}, ${volume} ${reporter} ${page} (${court} ${year})`;
  }
  
  if (type === 'statute') {
    // Format: Conn. Gen. Stat. § XX-XX
    return `Conn. Gen. Stat. § ${citation.section}`;
  }
  
  if (type === 'regulation') {
    // Format: Conn. Agencies Regs. § XX-XX-XX
    return `Conn. Agencies Regs. § ${citation.section}`;
  }
  
  return citation.raw || '';
}

function parseCitation(text) {
  // Basic citation parser for CT cases
  // Pattern: XXX Conn. XXX or XXX A.2d XXX or XXX A.3d XXX
  const casePattern = /(\d+)\s+(Conn\.|A\.2d|A\.3d|A\.)\s+(\d+)/g;
  const matches = [];
  
  let match;
  while ((match = casePattern.exec(text)) !== null) {
    matches.push({
      raw: match[0],
      volume: match[1],
      reporter: match[2],
      page: match[3]
    });
  }
  
  // Pattern for statutes: § XX-XX or Sec. XX-XX
  const statutePattern = /(?:§|Sec\.)\s*([\d\-]+)/g;
  while ((match = statutePattern.exec(text)) !== null) {
    matches.push({
      raw: match[0],
      type: 'statute',
      section: match[1]
    });
  }
  
  return matches;
}

function extractCitations(text) {
  // More comprehensive citation extraction
  const citations = parseCitation(text);
  return citations;
}

module.exports = {
  formatCitation,
  parseCitation,
  extractCitations
};
