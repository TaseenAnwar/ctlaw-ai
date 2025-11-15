import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Header({ user }) {
  const router = useRouter();
  
  return (
    <header style={{
      backgroundColor: '#2c3e50',
      padding: '15px 30px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div 
        onClick={() => router.push('/')}
        style={{ 
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}
      >
        <img 
          src="/logo.png" 
          alt="CTLaw.AI Logo" 
          style={{ height: '50px' }}
        />
      </div>
      
      {user && (
        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button
            onClick={() => router.push('/dashboard')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '16px',
              padding: '8px 16px',
              borderRadius: '4px',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
            onMouseOut={(e) => e.target.style.background = 'transparent'}
          >
            Dashboard
          </button>
          
          <button
            onClick={() => router.push('/chat')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '16px',
              padding: '8px 16px',
              borderRadius: '4px',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
            onMouseOut={(e) => e.target.style.background = 'transparent'}
          >
            Research
          </button>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginLeft: '20px',
            paddingLeft: '20px',
            borderLeft: '1px solid rgba(255,255,255,0.3)'
          }}>
            <span style={{ color: 'white', fontSize: '14px' }}>
              {user.name || user.email}
            </span>
            
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              style={{
                background: '#e74c3c',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                padding: '8px 16px',
                borderRadius: '4px',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.target.style.background = '#c0392b'}
              onMouseOut={(e) => e.target.style.background = '#e74c3c'}
            >
              Sign Out
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
