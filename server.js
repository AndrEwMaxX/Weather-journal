// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;

const server = app.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
});


app.get('/all',getData)

function getData(req,res) {
  res.send(projectData);
  console.log(projectData);
}


/* POST */

app.post('/addZipCode',addZipCode);

function addZipCode(req,res) {

  newEntry = {
    temp: req.body.Tempreture,
    feelings: req.body.feelings
  }

  projectData.temp = newEntry.temp;
  projectData.feelings = newEntry.feelings;
  res.send(projectData)
  console.log(projectData)
};
