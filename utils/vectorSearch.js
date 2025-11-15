// Vector search utilities for RAG queries

async function searchVectors(db, queryEmbedding, limit = 10, filters = {}) {
  // Build the SQL query with pgvector
  let query = `
    SELECT 
      id,
      content,
      metadata,
      citation,
      1 - (embedding <=> $1) as similarity
    FROM legal_embeddings
    WHERE 1=1
  `;
  
  const params = [JSON.stringify(queryEmbedding)];
  let paramCount = 1;
  
  // Add filters if provided
  if (filters.type) {
    paramCount++;
    query += ` AND metadata->>'type' = $${paramCount}`;
    params.push(filters.type);
  }
  
  if (filters.court) {
    paramCount++;
    query += ` AND metadata->>'court' = $${paramCount}`;
    params.push(filters.court);
  }
  
  if (filters.year_min) {
    paramCount++;
    query += ` AND (metadata->>'year')::int >= $${paramCount}`;
    params.push(filters.year_min);
  }
  
  if (filters.year_max) {
    paramCount++;
    query += ` AND (metadata->>'year')::int <= $${paramCount}`;
    params.push(filters.year_max);
  }
  
  // Order by similarity and limit results
  query += `
    ORDER BY similarity DESC
    LIMIT $${paramCount + 1}
  `;
  params.push(limit);
  
  const result = await db.query(query, params);
  return result.rows;
}

async function hybridSearch(db, queryText, queryEmbedding, limit = 10) {
  // Combines vector search with keyword search for better results
  const query = `
    WITH vector_results AS (
      SELECT 
        id,
        content,
        metadata,
        citation,
        1 - (embedding <=> $1) as vector_score
      FROM legal_embeddings
      ORDER BY vector_score DESC
      LIMIT 20
    ),
    keyword_results AS (
      SELECT 
        id,
        content,
        metadata,
        citation,
        ts_rank(to_tsvector('english', content), plainto_tsquery('english', $2)) as keyword_score
      FROM legal_embeddings
      WHERE to_tsvector('english', content) @@ plainto_tsquery('english', $2)
      ORDER BY keyword_score DESC
      LIMIT 20
    )
    SELECT DISTINCT
      COALESCE(v.id, k.id) as id,
      COALESCE(v.content, k.content) as content,
      COALESCE(v.metadata, k.metadata) as metadata,
      COALESCE(v.citation, k.citation) as citation,
      COALESCE(v.vector_score, 0) * 0.7 + COALESCE(k.keyword_score, 0) * 0.3 as combined_score
    FROM vector_results v
    FULL OUTER JOIN keyword_results k ON v.id = k.id
    ORDER BY combined_score DESC
    LIMIT $3
  `;
  
  const result = await db.query(query, [
    JSON.stringify(queryEmbedding),
    queryText,
    limit
  ]);
  
  return result.rows;
}

module.exports = {
  searchVectors,
  hybridSearch
};
