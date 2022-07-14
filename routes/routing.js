const express = require("express");
require("../db/conn")
const fs = require('fs')
const path = require('path')
const router = express.Router();
const Data= require("../model/UserSchema");
const upload = require('../Middlewares/upload').single('image')



router.post('/Submit',async(req,res)=>{
try{
    upload(req, res, async (err) => {
      if (err) {
        console.log(err);
      } 
      else {
        
        const name = req.body.name
        const email = req.body.email
        const title = req.body.title
        const author = req.body.author
        const Discription = req.body.Discription
        const image = req.file.filename
        
        console.log(image)
        console.log(req)
        
        
        
          const blog = new  Data({name,email,title,author,Discription,image});
          await blog.save();
          return res.status(201).json({ massge: "blog is stored in database" })

     } })
  } catch (error) {
    console.log(`Error Occurse :${error}`);
  }
})

router.post('/Update',async(req,res)=>{
  try{
    upload(req, res, async (err) => {
      if (err) {
        console.log(err);
      } 
      else {
        
        const email = req.body.email
        const title = req.body.title
        const author = req.body.author
        const Discription = req.body.Discription
        const image = req.file.filename
        
        
        const updateBlog=await Data.findOneAndUpdate({email:email},{title:title,author:author,Discription:Discription,image:image});
         if(!updateBlog){
           return res.status(404).send('User Not found')
         }
         else{
           return res.status(200).send('Data updated sucessfully')
         }

     } })
  } catch (error) {
    console.log(`Error Occurse :${error}`);
  }
})

router.post('/Delete',async(req,res)=>{
  try{
    upload(req, res, async (err) => {
      if (err) {
        console.log(err);
      } 
      else {
        const email=req.body.email
        console.log(email);
       const DeleteBlog=await Data.findOneAndDelete(email);
 if(DeleteBlog){
   return res.status(200).send('Blog deleted Sucessfully')
 }
 else{
   return res.status(404).send('error occured')
 }
      //   if(!DeleteBlog){
      //     return res.status(404).send('data not deleted')
      //    }
      //    else{
      //     return res.status(200).send('Blog Deleted sucessfully')
      //  }

     } })
  } catch (error) {
    console.log(`Error Occurse :${error}`);
  }
})



module.exports=router