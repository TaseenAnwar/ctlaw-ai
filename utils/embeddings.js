// Handles creating embeddings using OpenAI API

async function createEmbedding(text, apiKey) {
  if (!apiKey) {
    throw new Error('OpenAI API key is required');
  }
  
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'text-embedding-3-large',
      input: text,
      dimensions: 1536
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
  }
  
  const data = await response.json();
  return data.data[0].embedding;
}

async function createEmbeddings(texts, apiKey) {
  // Batch create embeddings for multiple texts
  // OpenAI allows up to 2048 inputs per request
  const batchSize = 100;
  const embeddings = [];
  
  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'text-embedding-3-large',
        input: batch,
        dimensions: 1536
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    embeddings.push(...data.data.map(d => d.embedding));
  }
  
  return embeddings;
}

module.exports = {
  createEmbedding,
  createEmbeddings
};
