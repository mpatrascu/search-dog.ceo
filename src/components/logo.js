import React from 'react';

import logo from './svg/body.svg';
import tail from './svg/tail.svg'; 

const Logo = (props) => 
<div>
    <img className="dog-body" src={logo} alt="logo" />
    <img className={"dog-tail " + (props.animated ? "tail-animate" : "")} src={tail}  alt="logo" />
</div>

export default Logo;