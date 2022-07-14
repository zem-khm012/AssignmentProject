const mongoose=require('mongoose')



const DB=process.env.DATABASE;

mongoose.connect(DB).then(()=>{
    console.log('connection sucessfull')
}).catch((err)=>{
    console.log('Error occured connection failed',err);
})