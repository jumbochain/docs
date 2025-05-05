import Heading from "@theme/Heading";
import React from "react";
import styles from "./styles.module.css";
import Node from "../../../static/img/docimg1.svg";
import Pen from "../../../static/img/doccardimg2.svg";
import Swap from "../../../static/img/docimg33.svg";
import Note from "../../../static/img/doccardimg44.svg";
import Link from "@docusaurus/Link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Card = ({ children, direction }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  React.useEffect(() => {
    if (inView) {
      controls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 1 },
      });
    }
  }, [controls, inView]);

  const variants = {
    hidden: {
      x: direction === "left" ? -400 : 400,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={styles.bentoC}
    >
      {children}
    </motion.div>
  );
};

export default function HomepageFeatures() {
  const [ref, inView] = useInView({ triggerOnce: true });
  return (
    <section className={styles.features}>
      <div className={styles.borderGradient}></div>
      <div className="container">
        <div className={styles.row}>
          <div className={styles.box1}>
            <div className={styles.wrapper}>
              <div className={styles.section}>
                <Card direction="left">
                  <div className={styles.imgContent}>
                    <div className={styles.imgContentInner}>
                      <Node className={styles.featureSvg} />
                    </div>
                  </div>
                  <div className={styles.content}>
                    <span className={styles.he}>Our Innovations</span>
                    <span className={styles.ce}>
                      Explore the Jumbo Blockchain’s pioneering Innovations.
                    </span>
                  </div>
                  <Link to="/docs/Our%20Innovations/Proof%20Of%20Nexus">
                    <button className={styles.bt}>Read More</button>
                  </Link>
                </Card>
                <Card direction="right">
                  <div className={styles.imgContent}>
                    <div className={styles.imgContentInner}>
                      <Pen className={styles.featureSvg} />
                    </div>
                  </div>
                  <div className={styles.content}>
                    <span className={styles.he}>Developer Tools</span>
                    <span className={styles.ce}>
                      Explore the developers tools for building on the Jumbo
                      Blockchain
                    </span>
                  </div>
                  <Link to="/docs/Developer%20Tools/Connect%20to%20Mainnet/Connect%20your%20Wallet/Connect">
                    <button className={styles.bt}>Read More</button>
                  </Link>
                </Card>
                <Card direction="left">
                  <div className={styles.imgContent}>
                    <div className={styles.imgContentInner}>
                      <Swap className={styles.featureSvg} />
                    </div>
                  </div>
                  <div className={styles.content}>
                    <span className={styles.he}>Jumbo APIs</span>
                    <span className={styles.ce}>
                      Explore the APIs empowering seamless integration with the
                      Jumbo Blockchain.
                    </span>
                  </div>
                  <Link to="/docs/Jumbo%20API/accounts">
                    <button className={styles.bt}>Read More</button>
                  </Link>
                </Card>
                <Card direction="right">
                  <div className={styles.imgContent}>
                    <div className={styles.imgContentInner}>
                      <Note className={styles.featureSvg} />
                    </div>
                  </div>
                  <div className={styles.content}>
                    <span className={styles.he}>Node Management</span>
                    <span className={styles.ce}>
                      Explore the Power of Efficient Node Management with the
                      Jumbo Blockchain
                    </span>
                  </div>
                  <Link to="/docs/Node%20Management/Configuring%20Soft%20Node">
                    <button className={styles.bt}>Read More</button>
                  </Link>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
