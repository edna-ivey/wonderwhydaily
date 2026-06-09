export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-projects" aria-labelledby="footer-projects-heading">
        <p className="footer-projects-title" id="footer-projects-heading">
          Explore More Projects
        </p>
        <nav className="footer-project-list" aria-label="Explore more projects">
          <a className="footer-project" href="https://blackhistoryinrealtime.com">
            <strong>Black History In Real Time</strong>
            <span>Daily stories from Black history.</span>
          </a>
          <span className="footer-project footer-project-coming-soon">
            <strong>Bible In Real Time</strong>
            <span>Coming Soon.</span>
          </span>
        </nav>
      </div>
      <div className="shell footer-founder">
        <p>Started as an 11th birthday gift. Built for curious minds.</p>
      </div>
    </footer>
  );
}
