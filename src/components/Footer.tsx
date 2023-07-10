import React from 'react';
import '../styles/components/Footer.scss';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="l-copyright">
        Copyright &copy;2022 <b>ssu-commerce</b> All rights reserved.
        <br />
        We welcome contributors. Please contribute to the project!
      </div>
    </footer>
  );
};
export default Footer;
