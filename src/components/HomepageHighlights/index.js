import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css'; // Create this CSS file

const Highlight = ({ title, description, link, linkText }) => (
  <div className={styles.highlight}>
    <h3>{title}</h3>
    <p>{description}</p>
    <div className={styles.buttons}>
      <Link to={link} className="button button--primary">
        {linkText}
      </Link>
    </div>
  </div>
);

export default function HomepageHighlights() {
  const highlightData = [
    {
      title: 'Getting Started',
      description: 'Best place to begin your journey to understand Jumbo Blockchain.',
      link: '/docs/getting-started', // Replace with your actual link
      linkText: 'Start Here',
    },
    {
      title: 'Core Innovations',
      description: 'Understand the fundamental principles and architecture.',
      link: '/docs/category/our-innovations', // Replace with your actual link
      linkText: 'Our Innovations',
    },
    {
      title: 'Jumbo JSON-RPC',
      description: 'Explore the details of our JSON-RPC endpoints and usage.',
      link: '/docs/category/jumbo-json-rpc', // Replace with your actual link
      linkText: 'View Reference',
    },
    {
      title: 'Tutorials',
      description: 'Follow step-by-step guides to accomplish common tasks.',
      link: '/docs/category/tutorials', // Replace with your actual link
      linkText: 'See Tutorials',
    },
    // You can add more highlight objects here
  ];

  return (
    <section className={styles.highlights}>
      <div className="container">
        <div className={styles.highlightGrid}>
          {highlightData.map((highlight, index) => (
            <Highlight key={index} {...highlight} />
          ))}
        </div>
      </div>
    </section>
  );
}
