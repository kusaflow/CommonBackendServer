const express = require('express');
const dotenv = require('dotenv').config();
const Cors = require('cors');
const _errorhandler = require('./middleware/ErrorHandle.js');
const connectDB = require('./config/connectionMngr.js');

const port = process.env.PORT || 3000;

const app = express();

app.use(Cors())
app.use(express.json());
app.use(_errorhandler);

connectDB(process.env.MONGO_URI);
//connectDB(process.env.MONGO_URI_notes);

app.get('/', (req, res) => {
    res.send('Server is running');
  });
app.use('/api/task', require('./routes/Task_mngr/taskRoute'));
app.use("/api/users", require("./routes/UserRoutes"));
app.use("/api/notes", require("./routes/notes/NotesRoutes"));

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})