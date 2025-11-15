import { useState } from 'react';
import MessageBubble from './MessageBubble';
import LoadingSpinner from './LoadingSpinner';

export default function ChatInterface({ conversationId, initialMessages = [] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = {
      role: 'user',
      content: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      const response = await fetch('/api/rag-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: input,
          conversationId: conversationId
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response');
      }
      
      const data = await response.json();
      
      const assistantMessage = {
        role: 'assistant',
        content: data.answer,
        citations: data.citations || []
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, there was an error processing your request. Please try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '600px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
      }}>
        {messages.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: '#999',
            marginTop: '50px',
            fontSize: '16px'
          }}>
            Ask a question about Connecticut law...
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <MessageBubble 
            key={idx} 
            message={msg} 
            isUser={msg.role === 'user'} 
          />
        ))}
        
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '15px' }}>
            <LoadingSpinner size={30} />
          </div>
        )}
      </div>
      
      <div style={{
        padding: '20px',
        borderTop: '1px solid #eee',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about CT statutes, cases, regulations..."
            disabled={loading}
            style={{
              flex: 1,
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '15px',
              resize: 'none',
              height: '60px',
              fontFamily: 'inherit'
            }}
          />
          
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            style={{
              padding: '12px 30px',
              backgroundColor: loading ? '#95a5a6' : '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '15px',
              fontWeight: 'bold',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => !loading && (e.target.style.background = '#2980b9')}
            onMouseOut={(e) => !loading && (e.target.style.background = '#3498db')}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
