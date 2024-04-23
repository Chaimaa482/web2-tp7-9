var express = require('express');

const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const uri = 'mongodb://127.0.0.1:27017/tpWeb'; // MongoDB connection URI
mongoose.connect(uri).then(console.log('Connected to MongoDb'))

const Schema = mongoose.Schema;

// Define a schema for the user collection
const userSchema = new Schema({
    name: String,
    age: Number
});

// Create a Mongoose model based on the schema
const User = mongoose.model('User', userSchema);


var r = require("./express.js");
//app.use("/etudiant", r);
var path = require('path');
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));



let persons = [];

// Route to serve the form
app.get('/form', (req, res) => {
    res.render('p.ejs', { persons });
});

//Route to handle form submission
app.post('/addUser', (req, res) => {
    const { name, age } = req.body;
    persons.push({ name, age });
    res.redirect('/form');

});
app.post('/addAUser', async (req, res) => {
    const { name, age } = req.body;
    
    try {
        // Create a new user document based on the submitted data
        const newUser = new User({ name, age });
        // Save the new user to the database
        await newUser.save();
        console.log('User added:', newUser);
        res.json(newUser);
    } catch (err) {
        console.error('Error adding user:', err);
        res.status(500).send('Error adding user');
    }
});

app.get("/etudiants", (req, res) => {
    User.find().then(function(e){
        res.json(e)
    })
})


// Route to delete a user
app.delete('/deleteUser/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        // Find the user by ID and delete it
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).send('User not found');
        }
        console.log('User deleted:', deletedUser);
        res.send('User deleted successfully');
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).send('Error deleting user');
    }
});

app.patch('/student/:id', (req, res) => {
    const studentId = req.params.id;
    const updates = req.body;
    
    User.findByIdAndUpdate(studentId, updates, { new: true })
        .then((updatedStudent) => {
            if (!updatedStudent) {
                return res.status(404).json({ message: "Student not found" });
            }
            res.json(updatedStudent);
            console.log(updatedStudent)
        })
        .catch((error) => {
            console.error("Error updating student:", error);
            res.status(500).json({ message: "Internal server error" });
        });
});



app.listen(3031);
console.log("serveur http démarré sur le port 3031");

