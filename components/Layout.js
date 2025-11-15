import Header from './Header';

export default function Layout({ children, user }) {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header user={user} />
      
      <main style={{
        flex: 1,
        maxWidth: '1400px',
        width: '100%',
        margin: '0 auto',
        padding: '20px'
      }}>
        {children}
      </main>
      
      <footer style={{
        padding: '20px',
        textAlign: 'center',
        borderTop: '1px solid rgba(0,0,0,0.1)',
        backgroundColor: 'rgba(255,255,255,0.8)',
        fontSize: '14px',
        color: '#666'
      }}>
        <p style={{ margin: '5px 0' }}>
          <strong>Disclaimer:</strong> CTLaw.AI is not a law firm and does not provide legal advice. 
          This service is for informational purposes only. Always verify citations and consult a licensed attorney.
        </p>
        <p style={{ margin: '5px 0', fontSize: '12px' }}>
          © 2025 CTLaw.AI • Connecticut Legal Research Assistant
        </p>
      </footer>
    </div>
  );
}
