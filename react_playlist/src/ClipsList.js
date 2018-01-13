import React, { Component } from 'react';
import {EventEmitter} from 'fbemitter'
import ClipsStore from './stores/ClipsStore'

const emitter=new EventEmitter()
const store=new ClipsStore(emitter)

const addClip=(clip)=>{ store.addOne(clip)}
const deleteOne=(id)=>{store.deleteOne(id)}


class ClipsList extends Component {
  constructor(props){
      super(props)
      this.state={
          clips:[],
          clipName:'',
          clipId:'',
         
      }
      this.handleInputChange=this.handleInputChange.bind(this)
  }
  componentDidMount(){
      
      store.getAll();
      emitter.addListener('CLIP LOAD',()=>{
          this.setState({
              clips:store.content
          })
      })
  }
  
  handleInputChange(event){
    let name=event.target.name
    let value=event.target.value
    this.setState({
      [name]:value
    })
  }
  render() {
    return (
      <div>
        <ul>
           {this.state.clips.map((e)=>
               <p>
               <iframe type="text/html" width="400" height="100" frameBorder="0" src={ "https://www.youtube.com/embed/"+ e.description +"?autoplay=0&controls=0"} />
               <button type="button" className="btnDelete" onClick={()=>deleteOne(e.id)} >X</button> 
               </p>
           )} 
        </ul>
        <footer className="App-footer">
        <br/>
        <form>
          Video's name <input type="text" onChange={this.handleInputChange} name="clipName"/> &emsp;
          Video's youtube id <input type="text" onChange={this.handleInputChange} name="clipId"/> &emsp;
          <input type="button" className="btnDelete" value="Add" onClick={()=>addClip({name:this.state.clipName, 
          description: this.state.clipId, id_category:"1"
          })}/>
        </form>
        </footer>
      </div>
    );
  }
}

export default ClipsList;
