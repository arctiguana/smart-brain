import React from 'react';

const Navigation = ({onroutechange, isSignin}) =>
{
	if (isSignin)
	{	
	  return(	 
	  <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
	     <p onClick= { () => onroutechange('signout')} className="f3 link dim black underline pa3 pointer" >Sign out</p>
	  </nav>)
	}
	else
	{
	return(
		<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
	     <p onClick= { () => onroutechange('signin')} className="f3 link dim black underline pa3 pointer" >Sign in</p>
	     <p onClick= { () => onroutechange('Register')} className="f3 link dim black underline pa3 pointer" >Register</p>
	  </nav>
	)}
    	
			
    
}

export default Navigation;