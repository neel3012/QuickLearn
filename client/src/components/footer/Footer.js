// import React from 'react';
import './Footer.css'
// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="column">
//         <h3>About Us</h3><br/>
//         <ul className="linkList">
//           <li>QuickLearn Limited</li>
//           <li>75 watline drive, Mississauga</li>
//           <li>+1(647)-928-4120</li>
//           <li>c0849568@mylambton.ca</li>
//         </ul>
//       </div>

//       <div className="column">
//         <h3>Useful Links</h3><br/>
//         <ul className="linkList">
//           <li>Home</li>
//           <li>Products</li>
//           <li>Services</li>
//           <li>Contact Us</li>
//         </ul>
//       </div>

//       <div className="column">
//         <h3>Follow Us</h3><br/>
//         <ul className="linkList">
//           <li>Facebook</li>
//           <li>Twitter</li>
//           <li>Instagram</li>
//         </ul>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="column">
        <h3>About Us</h3><br/>
        <ul className="linkList">
          <li>
            <span className="icon">📍</span>
            QuickLearn Limited
          </li>
          <li>
            <span className="icon">📞</span>
            +1(647)-928-4120
          </li>
          <li>
            <span className="icon">📧</span>
            c0849568@mylambton.ca
          </li>
        </ul>
      </div>

      <div className="column">
        <h3>Useful Links</h3><br/>
        <ul className="linkList">
          <li>
            <span className="icon">🏠</span>
            Home
          </li>
          <li>
            <span className="icon">🛍️</span>
            Products
          </li>
          <li>
            <span className="icon">🔧</span>
            Services
          </li>
          <li>
            <span className="icon">✉️</span>
            Contact Us
          </li>
        </ul>
      </div>

      <div className="column">
        <h3>Follow Us</h3><br/>
        <ul className="linkList">
          <li>
            <span className="icon">📘</span>
            Facebook
          </li>
          <li>
            <span className="icon">🐦</span>
            Twitter
          </li>
          <li>
            <span className="icon">📸</span>
            Instagram
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

