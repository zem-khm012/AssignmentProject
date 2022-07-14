const express=require('express')
const path=require('path')
const app=express()
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cors = require('cors')
const expresshandlebars=require('express-handlebars')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
var hbs=expresshandlebars.create({ handlebars: allowInsecurePrototypeAccess(Handlebars)})

app.engine('handlebars',hbs.engine);
app.set('view engine', 'handlebars');


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'))


dotenv.config({ path: './Config.env' });

require('./db/conn');

app.use(express.json());

app.use(require('./routes/routing'));

const PORT = process.env.PORT;

app.get('/',(req,res)=>{
res.sendFile(path.join(__dirname,'./views/Home.html'))
})

app.get('/Create',(req,res)=>{
    res.sendFile(path.join(__dirname,'./views/Form.html'))
    })

app.get('/UpdateForm',(req,res)=>{
        res.sendFile(path.join(__dirname,'./views/update.html'))
        })

const Data = require("./model/UserSchema");
const { title } = require('process');

app.get('/Blog',async(req,res)=>{
    try {
      const blog= await Data.find()
      if(blog){
          console.log(blog)
          res.render(path.join(__dirname,'./views/layouts/blog.handlebars'),{blog:blog})
          }else{
          res.send("Invalid user")
      }
  
    } catch (error) {
      console.log(`Error Occurse :${error}`)
      res.send("error occurse")
    }
})

app.get('/BlogPost/:author',async(req,res)=>{
    try {
        const blog= await Data.find()
        const MyBlog=blog.filter((e)=>{
         return   e.author == req.params.author
        })
        const Title=MyBlog[0].title
        const picture=MyBlog[0].image
        const Discription=MyBlog[0].Discription
        
        console.log(Title)
        console.log(Discription)
        console.log(picture)
        res.render(path.join(__dirname,'./views/layouts/SingleBlogPage.handlebars'),{Title,picture,Discription})

    
      } catch (error) {
        console.log(`Error Occurse :${error}`)
        res.send("error occurse")
      }  
})

app.get('/DeleteForm',(req,res)=>{
    res.sendFile(path.join(__dirname,'./views/DeleteForm.html'))
    })

app.listen(PORT,()=>{
    console.log('server started at PORT');
})