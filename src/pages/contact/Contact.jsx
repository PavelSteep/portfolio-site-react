import React, { useState } from 'react';
import Layout from '../../components/Layouts/Layout';
import useReveal from '../../hooks/useReveal';

import '../../styles/ContactStyle.css';

function Contact() {

  useReveal();

  const [copied, setCopied] = useState(null);

  const contacts = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/pavlo-biriukov-8ab59b368',
      copy: 'linkedin.com/in/pavlo-biriukov',
    },

    {
      label: 'Telegram',
      href: 'https://t.me/pavlobiriukov21',
      copy: '@pavlobiriukov21',
    },

    {
      label: 'WhatsApp',
      href: 'https://wa.me/380664637942',
      copy: '+380664637942',
    },
  ];

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);

      setCopied(text);

      setTimeout(() => {
        setCopied(null);
      }, 1500);

    } catch (err) {
      console.log('Copy failed');
    }
  };

  return (
    <Layout>

      <section className="contact_section reveal">

        <div className="container contact_wrapper glass glow">

          {/* HEADER */}
          <div className="contact_header reveal">

            <h1>Contact Me</h1>

            <p>
              Let’s build something amazing together 🚀
            </p>

          </div>

          {/* CONTACT LINKS */}
          <div className="contact_links">

            {contacts.map((item) => (

              <div
                key={item.href}
                className="contact_item reveal"
              >

                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>

                <button
                  onClick={() => handleCopy(item.copy)}
                  className="copy_btn"
                >
                  {
                    copied === item.copy
                      ? 'Copied ✓'
                      : 'Copy'
                  }
                </button>

              </div>

            ))}

          </div>

        </div>

      </section>

    </Layout>
  );
}

export default Contact;