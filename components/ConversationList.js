import { useRouter } from 'next/router';

export default function ConversationList({ conversations, activeId }) {
  const router = useRouter();
  
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      padding: '20px'
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '15px',
        color: '#2c3e50'
      }}>
        Recent Conversations
      </h3>
      
      {conversations.length === 0 ? (
        <p style={{ color: '#999', fontSize: '14px' }}>
          No conversations yet. Start a new research session!
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => router.push(`/chat?id=${conv.id}`)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: activeId === conv.id ? '#e3f2fd' : '#f8f9fa',
                border: activeId === conv.id ? '2px solid #3498db' : '1px solid #eee',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                if (activeId !== conv.id) {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                }
              }}
              onMouseOut={(e) => {
                if (activeId !== conv.id) {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                }
              }}
            >
              <div style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#2c3e50',
                marginBottom: '4px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {conv.title || 'Untitled Conversation'}
              </div>
              
              <div style={{
                fontSize: '12px',
                color: '#7f8c8d'
              }}>
                {new Date(conv.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <button
        onClick={() => router.push('/chat')}
        style={{
          width: '100%',
          marginTop: '15px',
          padding: '12px',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'background 0.2s'
        }}
        onMouseOver={(e) => e.target.style.background = '#2980b9'}
        onMouseOut={(e) => e.target.style.background = '#3498db'}
      >
        + New Conversation
      </button>
    </div>
  );
}
