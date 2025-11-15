export default function CitationCard({ citation, status }) {
  const getStatusColor = () => {
    if (status === 'positive') return '#27ae60';
    if (status === 'negative') return '#e74c3c';
    return '#95a5a6';
  };
  
  const getStatusIcon = () => {
    if (status === 'positive') return '✅';
    if (status === 'negative') return '❌';
    return '⚠️';
  };
  
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginBottom: '12px',
      borderLeft: `4px solid ${getStatusColor()}`
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '8px'
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '15px',
            fontWeight: 'bold',
            color: '#2c3e50',
            marginBottom: '5px'
          }}>
            {citation.case_name || citation.title}
          </div>
          
          <div style={{
            fontSize: '13px',
            color: '#7f8c8d',
            fontStyle: 'italic'
          }}>
            {citation.citation}
          </div>
        </div>
        
        <div style={{
          fontSize: '20px',
          marginLeft: '15px'
        }}>
          {getStatusIcon()}
        </div>
      </div>
      
      {citation.snippet && (
        <div style={{
          fontSize: '13px',
          color: '#555',
          marginTop: '10px',
          padding: '10px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          lineHeight: '1.5'
        }}>
          "{citation.snippet}"
        </div>
      )}
      
      {status && status !== 'neutral' && (
        <div style={{
          marginTop: '10px',
          fontSize: '12px',
          color: getStatusColor(),
          fontWeight: '500'
        }}>
          {status === 'positive' ? 'Still good law' : 'May be questioned or overruled'}
        </div>
      )}
    </div>
  );
}
