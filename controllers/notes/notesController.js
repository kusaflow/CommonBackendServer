const asyncHandler = require("express-async-handler");

const Note = require("../../models/notesApp/notesModel");

//@dec get all notes
//routes GET /api/notes
//access private
const getnotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({user_id: req.user.id});
    res.status(200).json(notes); 
});

//@dec add notes
//routes POST /api/notes
//access private
const Addnote = asyncHandler(async (req, res) => {
    const {title, content, tag} = req.body;
    if(!title || !content){
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    if (!tag){
        tag = "Personal";
    }
    
    const newNote = await Note.create({
        user_id: req.user.id,
        title,
        content,
        tag
    }); 

    //save
    await newNote.save();
    res.status(200).json(newNote); 
});

//@dec update notes
//routes PUT /api/notes/:id
//access private
const updateNote = asyncHandler(async (req, res) => {
    const {title, content, tag} = req.body;
    if(!title || !content){
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    const newnote = await Note.findById(req.params.id);

    if(newnote.user_id.toString() !== req.user.id){
        res.status(401);
        throw new Error("Not authorized");
    }

    const updatedContact = await Note.findByIdAndUpdate(req.params.id, {
        title,
        content,
        tag
    }, {new:true});


    res.status(200).json(updatedContact); 
});

//@dec delete notes
//routes DELETE /api/notes/:id
//access private
const deletenote = asyncHandler(async (req, res) => {

    const newnote = await Note.findById(req.params.id);

    if(newnote.user_id.toString() !== req.user.id){
        res.status(401);
        throw new Error("Not authorized");
    }

    
    const deletededContact = await Note.findByIdAndDelete(req.params.id);
    if(!deletededContact){
        res.status(404);
        throw new Error("Note not found");
    }
    

    res.status(200).json(deletededContact); 
});

//@dec get note
//routes get /api/notes/:id
//access private
const getSinglenote = asyncHandler(async (req, res) => {
    const getContact = await Note.findById(req.params.id);
    if(!getContact){
        res.status(404);
        throw new Error("Note not found");
    }
    res.status(200).json(getContact); 
});

module.exports = {getnotes, Addnote, updateNote, deletenote, getSinglenote};
