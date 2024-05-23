// Needed for dotenv
require("dotenv").config();

// Needed for Express
var express = require('express')
var app = express()

// Setting where the location of your EJS files are
app.set('views', '.')

// Needed for EJS
app.set('view engine', 'ejs');

// Needed for public directory
app.use(express.static(__dirname + '/public'));

// Needed for parsing form data
app.use(express.json());      
app.use(express.urlencoded({extended: true}));

// root page
app.get('/', function(req, res) {
   res.render('index');
});

// More info page
app.get('/MoreInfo', function(req, res) {
   res.render('MoreInfo');
});

// Tells the app which port to run on
app.listen(8080);



function LaunchApp() {
   // Launch alert message
   alert("Get ready to tilt the balance!");
   // Redirect to a different page
   window.location.href="public/TiltThisText.html";
 } 

function PageMoreInfo() {
   // Redirect to a different page
   window.location.href="public/MoreInfo.html";
}

async function processInput() {
   const userInput = document.getElementById("userInput").value;
   const responseElement = document.getElementById("response");
   responseElement.innerHTML = "Loading...";

// Send a POST request to the local server 
   try {
       const response = await fetch('http://localhost:3000/api/chatgpt', 
       {
           method: "POST",
           headers: {"Content-Type": "application/json"},
           body: JSON.stringify({ userInput })
       });
       const data = await response.json();
       
       // Recieve response. Assuming response contains the AI response in the 'choices' array with only one choice, value should be 0
       const message = data.choices[0].message.content;
       responseElement.innerHTML = message;
   } 
   
   catch (error) {
       console.error('Error:', error);
       responseElement.innerHTML = 'An error occurred. Please try again.';
   }
}