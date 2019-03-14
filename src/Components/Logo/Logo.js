import React from 'react'
import Tilt from 'react-tilt';
import  './logo.css';
import Brain from './Brain.png';

const Logo = () =>
{
	return(
		<div className="ma4 mt0 "> 
			<Tilt className="Tilt br3 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
			 <div className="Tilt-inner"><img alt="logo" src={Brain} /></div>
			</Tilt>
		</div>
		);
} 

export default Logo; 