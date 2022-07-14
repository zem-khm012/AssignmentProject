const mongoose=require('mongoose')
const BlogSchema=new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    title: {
        type:String,
        required:true
    },
    author: {
        type:String,
        required:true
    },
    Discription: {
        type:String,
        required:true
    },
    image: {
        type:String,
        required:true
    }
});

const Data=mongoose.model('DATA',BlogSchema)

module.exports=Data