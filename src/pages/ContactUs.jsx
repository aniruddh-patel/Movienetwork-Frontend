import React, { useContext } from 'react';
import './ContactUs.css';
import contactbanner from '../images/content/contact-us-banner.jpg'
import { Context } from '..';

const ContactUs = () => {
  const { user} = useContext(Context);
  return (
    <div className="contact-page">
      <div className="contact-banner">
        <img
          src={contactbanner} 
          alt="Movie Background"
        />
        <div className="banner-text">
          <h1>Contact <span>Us</span></h1>
          <p>Let us know how we can help you. We’re just a message away.</p>
        </div>
      </div>
      <div className="contact-section">
        <div className="contact-info">
          <h2>Get in Touch.</h2>
          <p>Feel free to contact us for any assistance or information you need.</p>
          <ul>
            <li>
              <i className="fas fa-map-marker-alt"></i>
              Headquarter: bengaluru, Karnataka - India
            </li>
            <li>
              <i className="fas fa-envelope"></i>
              Email Us: support@gmail.com
            </li>
            <li>
              <i className="fas fa-phone"></i>
              Call to Us: +91(21) 2002-2024
            </li>
          </ul>
        </div>

        <div className="contact-form">
          <form>
            <input type="text" value={user.username} name="name" placeholder="Name" required />
            <input type="email" value={user.email} name="email" placeholder="Email" required />
            <input type="text" name="subject" placeholder="Subject" />
            <textarea name="message" placeholder="Message" rows="5" required></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
