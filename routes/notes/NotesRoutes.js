const express = require('express');
const router = express.Router();
const {getnotes,Addnote,updateNote, deletenote, getSinglenote} = require('../../controllers/notes/notesController');
const validateToken = require('../../middleware/validateTokenHandler');

router.use(validateToken);
router.route('/').get(getnotes).post(Addnote);
router.route('/:id').put(updateNote).delete(deletenote).get(getSinglenote);


//export router
module.exports = router;