import React from 'react';
import './Facerecongnizer.css';

const Facerecongnizer= ({imageurl , box}) =>
{
	return(
      <div className="center ma">
      <div className="mt4 absolute">
      <img id="inputimage" alt='' src={imageurl} height="auto" width="500px"/>
      <div className="bounding-box" style={{top:box.topRow, right:box.rightCol, bottom:box.bottomRow, left:box.leftCol }}></div>
      </div>
      </div>
    )
}

export default Facerecongnizer;