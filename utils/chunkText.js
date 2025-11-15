// Utility to split legal documents into chunks for embedding
// This is important for RAG - we need to break large documents into searchable pieces

function chunkText(text, maxTokens = 800, overlap = 100) {
  // Rough estimate: 1 token ≈ 4 characters
  const maxChars = maxTokens * 4;
  const overlapChars = overlap * 4;
  
  // Split by paragraphs first
  const paragraphs = text.split(/\n\n+/);
  const chunks = [];
  let currentChunk = '';
  
  for (const paragraph of paragraphs) {
    // If adding this paragraph would exceed max size
    if ((currentChunk + paragraph).length > maxChars && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      
      // Start new chunk with overlap (last few sentences of previous chunk)
      const sentences = currentChunk.split(/[.!?]+\s+/);
      const overlapText = sentences.slice(-2).join('. ') + '.';
      currentChunk = overlapText + '\n\n' + paragraph;
    } else {
      currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
    }
  }
  
  // Add the last chunk
  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
}

// Smart chunking for legal documents that preserves structure
function chunkLegalDocument(text, metadata = {}) {
  const chunks = [];
  
  // Try to identify sections (common in statutes and opinions)
  const sectionPattern = /(?:^|\n)(?:§|Section|Sec\.|SECTION)\s*[\d\-\.]+/gi;
  const sections = text.split(sectionPattern);
  
  if (sections.length > 1) {
    // Document has clear sections - chunk by section
    sections.forEach((section, index) => {
      if (section.trim().length > 0) {
        const sectionChunks = chunkText(section, 800, 100);
        sectionChunks.forEach((chunk, chunkIndex) => {
          chunks.push({
            text: chunk,
            metadata: {
              ...metadata,
              section_index: index,
              chunk_index: chunkIndex
            }
          });
        });
      }
    });
  } else {
    // No clear sections - use standard chunking
    const textChunks = chunkText(text, 800, 100);
    textChunks.forEach((chunk, index) => {
      chunks.push({
        text: chunk,
        metadata: {
          ...metadata,
          chunk_index: index
        }
      });
    });
  }
  
  return chunks;
}

module.exports = {
  chunkText,
  chunkLegalDocument
};
