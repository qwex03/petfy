// NavButton.js
import React from 'react';
import { Link } from 'react-router-dom';

function NavButton({ to, children }) {
  return (
    <Link to={to}>
      <button className='NavButton'>{children}</button>
    </Link>
  );
}

export default NavButton;