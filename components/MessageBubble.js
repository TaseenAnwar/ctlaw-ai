export default function MessageBubble({ message, isUser }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: '15px'
    }}>
      <div style={{
        maxWidth: '70%',
        padding: '12px 18px',
        borderRadius: '18px',
        backgroundColor: isUser ? '#3498db' : 'white',
        color: isUser ? 'white' : '#333',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        fontSize: '15px',
        lineHeight: '1.5'
      }}>
        {message.role === 'assistant' && message.citations && message.citations.length > 0 && (
          <div style={{
            marginTop: '10px',
            paddingTop: '10px',
            borderTop: '1px solid rgba(0,0,0,0.1)',
            fontSize: '13px'
          }}>
            <strong>Citations:</strong>
            <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
              {message.citations.map((cite, idx) => (
                <li key={idx} style={{ marginBottom: '3px' }}>
                  {cite}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div style={{ whiteSpace: 'pre-wrap' }}>
          {message.content}
        </div>
      </div>
    </div>
  );
}
