var express = require("express")
var Sequelize = require("sequelize")
const bodyParser = require('body-parser')

var sequelize = new Sequelize('playlist','root','',{
    dialect:'mysql',
    host:'localhost',
    define: {
        freezeTableName: true,
        timestamps: false
    }
})

var app = express()
app.use(express.static('./react_playlist/build'))
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Credentials","true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    next();
})


sequelize.authenticate().then(function(){
    console.log("Autentificare efectuata cu succes")
})

var Categories = sequelize.define('categories',{
    name: Sequelize.STRING
})

var Videoclips = sequelize.define('videoclips',{
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    id_category: Sequelize.INTEGER
})

Videoclips.belongsTo(Categories,  {foreignKey: 'id_category', targetKey: 'id'})
//Categories.hasMany(Videoclips)


app.get('/categories', function(request,response){
    Categories.findAll().then(function(categories){
        response.status(200).send(categories)
    })
})

app.get('/categories/:id', function(request, response){
    Categories.findOne({where: {id:request.params.id}}).then(function(category){
        if(category){
            response.status(200).send(category)
        }else{
            response.status(404).send('Category not found')
        }
    })
})

app.post('/categories', function(request,response){
    Categories.create(request.body).then(function(category){
        response.status(201).send(category)
    })
})

app.put('/categories/:id', function(request,response){
    Categories.findById(request.params.id).then(function(category){
        if(category){
            category.update(request.body).then(function(category){
                    response.status(201).send(category)
                }).catch(function(error){
                    response.status(200).send(error)
                })
        }
        else{
            category.status(404).send('Category not found')
        }
    })
})

app.delete('/categories/:id', function(request, response){
    Categories.findById(request.params.id).then(function(category){
        if(category){
            category.destroy().then(function(){
                response.status(204).send('Category deleted')
            })
        }else{
            response.status(404).send('Category not found')
        }
    })
})

app.get('/videoclips', function(request,response){
    Videoclips.findAll().then(function(videoclips){
        response.status(200).send(videoclips)
    })
})

app.get('/videoclips/:id', function(request, response){
    Videoclips.findOne({where: {id:request.params.id}}).then(function(videoclip){
        if(videoclip){
            response.status(200).send(videoclip)
        }else{
            response.status(404).send('Videoclip not found')
        }
    })
})

app.post('/videoclips', function(request,response){
    Videoclips.create(request.body).then(function(videoclip){
        response.status(201).send(videoclip)
    })
})

app.put('/videoclips/:id', function(request,response){
    Videoclips.findById(request.params.id).then(function(videoclip){
        if(videoclip){
            videoclip.update(request.body).then(function(videoclip){
                response.status(201).send(videoclip)
            }).catch(function(error){
                response.status(200).send(error)
            })
        }
        else{
            videoclip.status(404).send('Videoclip not found')
        }
        
    })
})

app.delete('/videoclips/:id', function(request, response){
    Videoclips.findById(request.params.id).then(function(videoclip){
        if(videoclip){
            videoclip.destroy().then(function(){
                response.status(204).send('Videoclip deleted')
            })
        }else{
            response.status(404).send('Videoclip not found')
        }
    })
})

app.listen(8080)