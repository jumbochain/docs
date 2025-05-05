import React from "react";
import styles from "./featureCard.module.css";
import InovationIcon from "../../../static/icon/InovationIcon";
import DeveloperIcon from "../../../static/icon/DeveloperIcon";
import IntegrationIcon from "../../../static/icon/IntegrationIcon";
import NodeIcon from "../../../static/icon/NodeIcon";
import ArrowIcon from "../../../static/icon/ArrowIcon";
import Link from "@docusaurus/Link";

const data = [
  {
    icon: <InovationIcon />,
    text: "Explore the Jumbo Blockchain’s pioneering Innovations.",
    href: "/docs/Our%20Innovations/Proof%20Of%20Nexus",
  },
  {
    icon: <DeveloperIcon />,
    text: "Explore the developers tools for building on the Jumbo Blockchain",
    href: "/docs/Developer%20Tools/Connect%20to%20Mainnet/Connect%20your%20Wallet/Connect",
  },
  {
    icon: <IntegrationIcon />,
    text: "Explore the APIs empowering seamless integration",
    href: "/docs/Jumbo%20API/accounts",
  },
  {
    icon: <NodeIcon />,
    text: "Explore the Power of Efficient Node Management",
    href: "/docs/Node%20Management/Configuring%20Soft%20Node",
  },
];

const FeaturesCard = () => {
  return (
    <>
      <div className={styles.cardDiv}>
        <div className={styles.featureCard}>
          {data.map((item, index) => (
            <div key={index} className={styles.cardWrapper}>
              <div className={styles.cardWrapperIcon}>{item.icon}</div>
              <div className={styles.cardWrapperText}>{item.text}</div>

              <Link target="_blank" to={item.href} aria-label={item.text} className={styles.arrow}>
                <ArrowIcon />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeaturesCard;
