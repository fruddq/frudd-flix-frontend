export const Footer: React.FunctionComponent = () =>
(
  <>
    <footer className="footer">
      <ul className="footer-ul">
        <li className="footer-li">
          {/* rome-ignore lint/a11y/useAnchorContent: <explanation> */}
          <a
            href="https://www.linkedin.com/in/giang-dinh-99686ba6/"
            className="footer fa-linkedin fa-brands"
            target="_blank"
            aria-label="To linkedin profile"
            rel="noreferrer" />
        </li>
        <li className="footer-li">
          {/* rome-ignore lint/a11y/useAnchorContent: <explanation> */}
          <a
            href="https://github.com/fruddq"
            className="footer-link fa-brands fa-github-alt"
            target="_blank"
            aria-label="To github profile"
            rel="noreferrer" />
        </li>
        <li className="footer-li footer-name">&copy; Giang Dinh 2023</li>
      </ul>
    </footer>
  </>
)




