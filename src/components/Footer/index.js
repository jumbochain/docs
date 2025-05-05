import React from "react";
import styles from "./footer.module.css";
import Hero from "/static/img/footerLogo.png";

const Footer = () => {
  return (
    <div className={styles.body}>
        <div className={styles.footercontainer}>
          <div className={styles.footercontent}>
            <div className={styles.logosection}>
              <div className={styles.logo}>
                <img
                  src={Hero}
                  alt="Jumbologo"
                />
              </div>
              <div className={styles.copyrightdesktop}>
                &copy; Jumbo Blockchain 2024 All Rights Reserved
              </div>
            </div>
            <div className={styles.linkssection}>
              <div className={styles.pagescolumn}>
                <div className={styles.columntitle}>Pages</div>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="https://jumboscan.jumbochain.org/" target="_blank">Explorer</a>
                  </li>
                  <li>
                    <a href="https://docs.jumbochain.org/" target="_blank">Documentation</a>
                  </li>
                  <li>
                    <a href="https://jumbochain.org/whitePaper" target="_blank">White Paper</a>
                  </li>
                  <li>
                    <a href="https://jumbochain.org/validator" target="_blank">Become Validator</a>
                  </li>
                  <li>
                    <a href="https://portfolio.jumbochain.org/" target="_blank">
                      Investment Portfolio
                    </a>
                  </li>
                  <li>
                    <a href="https://jumbochain.org/news" target="_blank">News & Media</a>
                  </li>
                </ul>
              </div>
              <div className={styles.pagescolumn} >
                <div className={styles.columntitle}>Community</div>
                <ul>
                  <li>
                    <a href="https://x.com/jumboblockchain" target="_blank">X (Twitter)</a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/jumboblockchain/" target="_blank">
                      Linkedin
                    </a>
                  </li>
                  <li>
                    <a href="https://jumbochain.medium.com" target="_blank">Medium</a>
                  </li>
                  <li>
                    <a href="https://discord.com/invite/CXhPJvhR9b" target="_blank">Discord</a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/jumbochainglob" target="_blank">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/jumboblockchain/" target="_blank">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="https://t.me/jumbochainofficial" target="_blank">Telegram</a>
                  </li>
                </ul>
              </div>
              <div>
                <div className={styles.columntitle}>Legal</div>
                <ul>
                  <li>
                    <a href="https://jumbochain.org/privacy" target="_blank">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="https://jumbochain.org/terms" target="_blank">Terms of Use</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.gradientline}></div>
          <div className={styles.copyrightmobile}>
            &copy; Jumbo Blockchain 2024 All Rights Reserved
          </div>
        </div>
    </div>
  );
};

export default Footer;