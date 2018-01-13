import axios from 'axios'
const SERVER='https://proiect-predaa.c9users.io:8080'

class ClipsStore{
    constructor(ee){
        this.emitter=ee;
        this.content=[];
    
    }
    
    getAll(){
        axios(SERVER+'/videoclips')
        .then((response)=>{this.content=response.data
        this.emitter.emit('CLIP LOAD')})
        .catch((error)=>console.warn(error))
    }
    addOne(clip){
        axios({
            method:'post',
            url:SERVER+'/videoclips',
            headers:{'Content-Type':'application/json'},
            data:clip
        })
        .then(()=>this.getAll())
        .catch((error)=>console.warn(error))
    }
    deleteOne(id){
        axios.delete(SERVER+'/videoclips/'+id)
        .then(()=>this.getAll())
        .catch((error)=>console.warn(error))
    }
    getOne(name){
        axios.get(SERVER+'/videoclips/'+name)
        .then((response)=>{this.content=response.data
        this.emitter.emit('CLIP FOUND')})
        .catch((error)=>console.warn(error))
    }
}

export default ClipsStore;