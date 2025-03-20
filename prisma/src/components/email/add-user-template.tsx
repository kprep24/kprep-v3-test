import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  role: string;
  setupUrl: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  role,
  setupUrl,
}) => (
  <div
    style={{
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      padding: '20px',
      lineHeight: '1.6',
    }}
  >
    <h1 style={{ color: '#4CAF50' }}>Welcome to K-Prep, {firstName}!</h1>
    <p>
      Congratulations on being invited to join K-Prep as a <strong>{role}</strong>! This role offers an incredible chance to grow, collaborate, and make a meaningful impact within our dynamic community.
    </p>
    <p>
      To begin your journey, please set up your account within the next 
      <strong> 1 hour</strong>. Note that the link will expire after this time.
    </p>
    <p style={{ color: '#D32F2F' }}>
      <strong>Important:</strong> This link is unique to you. To maintain security, please do not share it with anyone else.
    </p>
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <a
        href={setupUrl}
        style={{
          textDecoration: 'none',
          backgroundColor: '#4CAF50',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '5px',
          fontSize: '16px',
          display: 'inline-block',
        }}
      >
        Set Up Your Account
      </a>
    </div>
    <p style={{ marginTop: '20px', fontSize: '14px', color: '#555' }}>
      If you have any questions or encounter any challenges, our support team is here to help you.
    </p>
  </div>
);
