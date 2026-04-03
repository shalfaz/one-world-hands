import React from 'react';

export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'One World Hands',
    description: 'A humanitarian NGO empowering individuals and communities through education, direct action, and collaboration.',
    url: 'https://oneworldhands.org',
    logo: 'https://oneworldhands.org/logo.png',
    sameAs: [
      'https://facebook.com/oneworldhands',
      'https://instagram.com/oneworldhands',
      'https://linkedin.com/company/oneworldhands',
      'https://youtube.com/@oneworldhands',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-000-000-0000',
      contactType: 'Customer Support',
      email: 'hello@oneworldhands.org',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'City, Country',
      addressCountry: 'Global',
    },
    foundingDate: '2020',
    areaServed: 'Worldwide',
    knowsAbout: [
      'Humanitarian Aid',
      'Community Development',
      'Education',
      'Emergency Relief',
      'Food Assistance',
      'Medical Assistance',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Humanitarian Programs',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Food Assistance Program',
          description: 'Providing nutritious food and meal support to communities in need.',
        },
        {
          '@type': 'Offer',
          name: 'Emergency Relief Program',
          description: 'Swift response to humanitarian crises and disasters.',
        },
        {
          '@type': 'Offer',
          name: 'Medical Assistance Program',
          description: 'Healthcare and medical support for vulnerable populations.',
        },
        {
          '@type': 'Offer',
          name: 'Education Support Program',
          description: 'Educational resources and training for community empowerment.',
        },
        {
          '@type': 'Offer',
          name: 'Winter Support Program',
          description: 'Essential aid during winter months for survival and warmth.',
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
