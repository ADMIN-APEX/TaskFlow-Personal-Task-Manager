export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-content" style={{ justifyContent: 'center' }}>
        <p className="footer-copyright">
          &copy; {currentYear} <strong>TaskFlow</strong>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
