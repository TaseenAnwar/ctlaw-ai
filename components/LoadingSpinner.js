export default function LoadingSpinner({ size = 40 }) {
  return (
    <div style={{
      display: 'inline-block',
      width: size,
      height: size,
      border: '4px solid rgba(0,0,0,0.1)',
      borderTopColor: '#3498db',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}>
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
