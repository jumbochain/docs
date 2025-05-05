import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Blazing-Fast Transactions',
    // Svg: require('@site/static/img/jumboblockchain_speed.svg').default,
    description: (
      <>
        Experience unparalleled transaction speeds with JumboBlockchain! Our
        innovative consensus mechanism ensures near-instant confirmations,
        allowing for seamless and efficient transfers of value. Say goodbye to
        network congestion and hello to the future of fast transactions.
      </>
    ),
  },
  {
    title: 'Unbreakable Ledger',
    // Svg: require('@site/static/img/jumboblockchain_security.svg').default,
    description: (
      <>
        Built with cutting-edge cryptographic techniques, JumboBlockchain offers
        an immutable and highly secure ledger. Every transaction is permanently
        recorded and protected against tampering, providing a foundation of trust
        and transparency for all participants. Your data is safe with us.
      </>
    ),
  },
  {
    title: 'Massive Data Capacity',
    // Svg: require('@site/static/img/jumboblockchain_data.svg').default,
    description: (
      <>
        True to its name, JumboBlockchain boasts an exceptional capacity for
        storing vast amounts of data. From complex smart contracts to rich media,
        our architecture is designed to handle the demands of next-generation
        applications without compromising performance or security.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        {/* <div className="row"> */}
        {/*   {FeatureList.map((props, idx) => ( */}
        {/*     <Feature key={idx} {...props} /> */}
        {/*   ))} */}
        {/* </div> */}
      </div>
    </section>
  );
}
