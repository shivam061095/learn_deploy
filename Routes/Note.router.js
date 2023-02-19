const express=require("express")

const noteRouter=express.Router()
const {NoteModel}=require("../model/note.model")

noteRouter.get("/",async(req,res)=>{
    const notes=await NoteModel.find()
    res.send(notes)
    
})
noteRouter.post("/create",async(req,res)=>{
    payload=req.body
    const note=new NoteModel(payload)
    await note.save()
    res.send({"msg":"succesfully created"})
    
})


noteRouter.delete("/delete/:id",async(req,res)=>{
    const noteID=req.params.id
    const user=await new NoteModel.findByIdAndDelete({_id:noteID})
    res.send({"msg":`note with id :${noteID} is deleted`})

})


module.exports={
    noteRouter
}