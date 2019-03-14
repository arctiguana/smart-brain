import React, { Component } from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from './Components/navigation/Navigation';
import Signin from './Components/Signin/signin';
import Register from './Components/Register/Register';
import Facerecongnizer from './Components/Facerecongnizer/Facerecongnizer';
import Logo from './Components/Logo/Logo';
import Imageadress from './Components/imageadress/imageadress';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';

const app = new Clarifai.App({
 apiKey: 'f87bedf956da44fb8e2fb48d0477b12e'
});

const Particule={
  
      "particles": {
          "number": {
              "value": 250
          },
          "size": {
              "value": 3
          }
      },
      "interactivity": {
          "events": {
              "onhover": {
                  "enable": true,
                  "mode": "repulse"
              }
          }
      }
  }

const initialstate={ input: '',
      imageurl:'',
      box:{},
      route:'Signin',
      isSignin:false,
      user:
      {

      id:"",
      name:"",
      email:"",
      entries:0,
      joined:""
      }}
class App extends Component {
  constructor(){
    super();
    this.state = initialstate;
  } 
  loaduser=(data)=>
  {
    this.setState(
      {user:
      {

      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
      }})
  }
  onInputChange = (event) =>
  {
    this.setState({input:event.target.value});
  }
 
  calculateface = (data) =>
  {
    const Clarifaiface=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width , height);
    return{
       topRow:Clarifaiface.top_row * height,
      leftCol:Clarifaiface.left_col * width,
      rightCol:width - (Clarifaiface.right_col * width),
      bottomRow:height - (Clarifaiface.bottom_row * height)
    }
  }
  displayfacebox = (box) =>
  {
    console.log(box);
    this.setState({box:box});
  }
  onsubmit = () =>
  {this.setState({imageurl:this.state.input});
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
    .then(response => {
      if (response) {
        fetch("http://localhost:2000/image",{
        method:'put',
        headers:{'Content-Type':'Application/json'},
        body:JSON.stringify({
          id:this.state.user.id
        })  
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user,{entries:count}))
      })
     }

       this.displayfacebox(this.calculateface(response))
       })
      .catch(err => console.log(err));
  }
  onroutechange = (route) =>
  {
    if(route === 'signout')
    {
      this.setState(initialstate)
    }else if(route === 'home')
    {
      this.setState({isSignin:true})
    } 
    this.setState({route:route});
  }
  render() { 
    const {isSignin,imageurl,route,box}=this.state;
    return (
      <div className="App">
      <Particles className="Particle" params={Particule}/>
        <Navigation isSignin={isSignin} onroutechange={this.onroutechange}/>
        {route === 'home' 
         ?<div>
         <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries}/> 
        <Imageadress onInputChange={this.onInputChange} onsubmit={this.onsubmit}/>
        <Facerecongnizer box={box} imageurl={imageurl}/>
        </div>
         :(
          this.state.route === 'signin'
          ?<Signin loadUser={this.loaduser} onroutechange={this.onroutechange} /> 
          :<Register loaduser={this.loaduser} onroutechange={this.onroutechange} /> 
          )
        
        }     
      </div>
    );
  }
}

export default App;
