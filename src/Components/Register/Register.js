import React from 'react';

class Register extends React.Component{
	constructor(props){
    super(props);
    this.state = {
    	Email:"",
    	password:"",
    	name:""
    }}
     onnameChange=(event)=>
    {
    	this.setState({name:event.target.value})
    }
    onEmailChange=(event)=>
    {
    	this.setState({Email:event.target.value})
    }
    onpasswordChange=(event)=>
    {
    	this.setState({password:event.target.value})
    }

    onsubmitsignin=(event)=>
    {
    	fetch('http://localhost:2000/Register',{
    		method:'post',
    		headers:{'Content-Type':'application/json'},
    		body:JSON.stringify({
    			name:this.state.name,
    			email:this.state.Email,
    			password:this.state.password
    		})	
    		})
    	.then(response => response.json())
    	.then(user =>{
    		if (user.id)
    		{
    			this.props.loaduser(user)
    			this.props.onroutechange('home')
    		}
    	})
    }
	render()
	{
		const {onroutechange}=this.props;
	 return(
		<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Register</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f4" htmlFor="UserNameN">UserName</label>
			        <input 
			        onChange={this.onnameChange}
			        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="text" 
			        name="name"  
			        id="name" />
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
			        <input 
			        onChange={this.onEmailChange}
			        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="email" 
			        name="email-address"  
			        id="email-address" 
			        />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
			      <input 
			        onChange={this.onpasswordChange}
			        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="password" 
			        name="password"  
			        id="password" 
			      />
			      </div>
			    </fieldset>
			    <div>
			      <input 
			      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      type="submit" 
			      value="Register" 
			      onClick={ this.onsubmitsignin}/>
			    </div>
			    <p>Already have an accont?</p>
			    <div className="lh-copy mt3">
			      <p  onClick={ () => onroutechange('signin')} className="f5 link dim black db pointer">Signin</p>
			    </div>
			  </div>
			</main>
		</article>
		)}
}
export default Register;