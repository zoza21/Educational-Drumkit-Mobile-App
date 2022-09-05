/*
Author: Zoe Arnold
JavaScript file for Assignment 2 - Final Project - INFT6009
Date Submitted: 25 July 2022
*/

"use strict";

//Code to access individual drumkit and drumpad elements from HTML once page loaded
window.addEventListener("load", () => 
{
const dkit = document.querySelectorAll(".drumkit div");     
const drumSounds = document.querySelectorAll(".sound"); 
const sndrum = document.querySelector("#snare");
const rtom = document.querySelector("#tom");
const chihat = document.querySelector("#hihat");
const ftom = document.querySelector("#bass"); 
const kdrum = document.querySelector("#kick"); 
const ohihat = document.querySelector("#openhihat"); 

/* Below code adds event listeners for each drumpad in the drumkit. 
Upon touch/click the audio for each drumpad plays, the currentTime resets to 0 so audio always plays from the start when drumpads are touched multiple times. 
Navigator.vibrate added so mobile device vibrates if available on device V*/

dkit.forEach((drum, index) => 
{
    drum.addEventListener("click", function() 
    {
        drumSounds[index].currentTime = 0;
        drumSounds[index].play();
        navigator.vibrate(500);
    });
});

/* The below code is for the "Play Game" function.

The method used to execute this function was sourced, but not directly 
copied from tutorials/github code for a JavaScript "Simon Game" 
found at: FreeCodeCamp.com, https://www.youtube.com/watch?v=n_ec3eowFLQ
https://github.com/beaucarnes/simon-game. 
The main concept used from this code was using 2 arrays (which I named 
userOrder and gameOrder), using these to check for equality to determine
if the user wins or loses the game */

/* The event listeners for each drumpad push a value to userOrder (an empty array)
These values will be used to compare to the gameOrder array */

ftom.addEventListener("click", (event) => 
{
    userOrder.push(1);  
});

sndrum.addEventListener("click", (event) => 
{
    userOrder.push(2);
});

kdrum.addEventListener("click", (event) => 
{
    userOrder.push(3);
});

ohihat.addEventListener("click", (event) => 
{
    userOrder.push(4);
});

rtom.addEventListener("click", (event) => 
{
    userOrder.push(5);
});

chihat.addEventListener("click", (event) => 
{
    userOrder.push(6);
});
});

/* The gameOrder array has values 1,2,3. The values pushed to the userOrder array
are based on which drumpad the user touches. If the user touches the Floor Tom (ftom), 
Snare Drum (sndrum) and Kick Drum (kdrum) in that order, the values 1,2,3 will be
pushed to the userOrder array, meaning the user has correctly copied the audio sample and wins.
If the user does not touch these drumpads in the correct order, the values in the userOrder 
array will not match gameOrder and the user loses the game. */

// Variables used for "Play Game" function
let userOrder = [];         
let gameOrder = [1,2,3];    
let trackIndex = 0;         // Variable to track the current index of the soundlist
let count = 1;              // Variable to track the number of sounds played 
let currentSound = document.createElement('audio'); // Variable to create Audio element for sounds 
const playButton = document.querySelector(".playbutton"); 

// Array with name/filepath values for each sound that makes up the drum sample audio and
//matches the number values in the gameOrder array. (1: FloorTom, 2: Snare, 3: Kick)

let soundList = [
    {
        name: "FloorTom", 
        path: "sounds/bass.wav"
    }, 
    {
        name: "Snare", 
        path: "sounds/snare.wav"
    },
    {
        name: "Kick", 
        path: "sounds/kick.wav"
    },
]; 

/* Several sources were used to write the following functions. 
The loadTrack(trackIndex) function and nextTrack() function are referenced from:
"Create A Music Player" https://www.geeksforgeeks.orgcreate-a-music-player-using-javascript/ 
I used this code as it helped solve the problem I was having with loading the audio, 
and having all 3 tracks in the soundList array play in a row when the user selects the "play" button  */

// Function to load the correct track/audio from the soundList array
function loadTrack(trackIndex) 
{
    currentSound.src = soundList[trackIndex].path;
    currentSound.load(); 
    currentSound.playbackRate = 2.0;        // Increasing the playback rate as the default was very slow. 
    currentSound.addEventListener("ended", nextTrack); // When each track has ended, the nextTrack function is called 
}
loadTrack(trackIndex); // Calls the loadTrack function with the track/audio held at trackIndex

// Function to load and play the next track in the array until the end of the array
function nextTrack()
{
    if (trackIndex < soundList.length-1) 
        trackIndex +=1; // If trackIndex is less than soundList array length-1, trackIndex is incremented by 1
        count +=1; // Count is incremented by 1, used in the if statment in playTrack() function 
        loadTrack(trackIndex); 
        playTrack(); //Calls the playTrack function which plays the correct track
}

// Function to play the audio
function playTrack() 
{
    document.getElementById("playbutton").innerHTML = "Play"; // Access "playbutton" element to update the button text to "Play"
    document.getElementById("drumkit").style.display="none"; // Hides drumkit element while audio is actively playing
    if (count < 4) // audio tracks will continue playing while count < 4 
    currentSound.play();
    else 
    resetValues(); // If count == 4, all tracks in soundList have played, then resetValues() function is called
}

/* Function called after all audio tracks in soundList have played
Enables user to listen to sounds again or take their turn and check their answer */
function resetValues() 
{
    count = 1;              // reset count to 1 
    trackIndex = 0;         // reset trackIndex to 0 so soundList replays from start if 'listen again' selected
    loadTrack(trackIndex);  // load the audio at trackIndex = 0 
    document.getElementById("playbutton").innerHTML = "Listen again";  // Offer user option to listen to sounds again
    document.getElementById("drumkit").style.display="grid"; // Re-display drumkit so user can have their turn 
    document.getElementById("instructions").innerHTML="It's your turn!"; // Instructions for user to try to copy the sounds
    document.getElementById("check").style.display = "inline"; // Offer user option to check their answer
}
 
// Function to check user input (when user selects 'check your answer')
function checkCorrect()
{
    document.getElementById("playagain").style.display="inline";  // Offer user option to play again
    document.getElementById("playagain").innerHTML = "Play Again"; 
    document.getElementById("check").style.display = "none"; // Check button is hidden 
    document.getElementById("playbutton").style.display = "none"; // Play button is now hidden
    document.getElementById("menu").style.display = "inline"; 
    document.getElementById("play").style.display="none";

    if (gameOrder.length !== userOrder.length) //Checks userOrder and gameOrder array. If not equal, user is incorrect and checkCorrect() returns false
    {
    document.getElementById("instructions").innerHTML = "Oops. Not quite!"; //Lose message
    document.getElementById("instructions").style.color="lightblue"; //Change message font colour
    document.getElementById("instructions").style.fontSize="130%"; //Change message font size
    return false; 
    }

    // Loop to check each value in each array
    for (var i = 0, len = gameOrder.length; i < len; i++) 
    {
        if (gameOrder[i] !== userOrder[i]) // If values in gameOrder and userOrder are not equal, user is incorrect and checkCorrect() returns false
        {
            //console.log("false"); 
            document.getElementById("instructions").innerHTML = "Oops. Not quite!"; //Lose message
            document.getElementById("instructions").style.color="lightblue"; //Change message font colour
            document.getElementById("instructions").style.fontSize="130%"; //Change message font size
            return false;
        }
    }

    // If the length and values in gameOrder and userOrder arrays are equal, user is correct and checkCorrect() returns true. 
    document.getElementById("instructions").innerHTML = "You got it right, drumming superstar!"; // Win message
    document.getElementById("instructions").style.color="lightblue";  // Change message font colour
    document.getElementById("instructions").style.fontSize="130%"; // Change message font size
    return true;
}  


/* The code used for the "learn" menu function references the code from Week 8 lab.
I used this code as a guide so I could correctly implement a search function using 
the MusicBrainz web API found at:  https://musicbrainz.org/doc/MusicBrainz_API. 
All functions are from Week 8 with changes made to variable names and general formatting */


// Code below for "learn" function 
function instrumentSearch(sform)
{
    let userSearch = sform.inputbox.value; //userSearch variable access HTML element for the word the user enters into the search form
    let formatUserSearch = userSearch.replace(/ /g, "+"); //To be correctly formatted for REST, spaces in the user search are removed and replaced with "+"
    searchMusBrainz(formatUserSearch); 
}


function searchMusBrainz(userSearch)
{
//The below url accesses the MusicBrainz API, specifically data about musical instruments ("instrument")
//Guidance for formatting the url found in the MusicBrainz API Documentation and 
//https://developpaper.com/an-article-playing-with-the-musicbrainz-api/

const musBrainzUrl = 'https://musicbrainz.org/ws/2/instrument/?query=description:' + userSearch + '&fmt=json'; 
window.xmlReq = new XMLHttpRequest(); 
window.xmlReq.open('GET', musBrainzUrl, true);
window.xmlReq.addEventListener("load", transferComplete); 
window.xmlReq.addEventListener("error", transferFailed); 
window.xmlReq.addEventListener("abort", transferCanceled);
window.xmlReq.send();
}

//Function to format response once data transfer is successful/complete
function transferComplete(evt)
{
  let text = window.xmlReq.responseText; 
  window.xmlReq = JSON.parse(text);  //Parse the response text to convert into JSON format 
  formatResponse(); //Calls the formatResponse() function to display the response in a user friendly way
}

//Function called if transfer fails 
function transferFailed(evt)
{
alert("There was an error when transferring the file.");
}

//Function called if transfer is cancelled 
function transferCanceled(evt)
{
alert("The transfer was cancelled."); 
}

//Function to format the JSON response to a list of search results where each result can be selected/touched to display further details/information
function formatResponse()
{
let learnResults = window.xmlReq.instruments; //Variable for the array of results returned 
let numResults = learnResults.length; //Variable numResults is equal to the length of the learnResults array
let stringResults = ""; 
for (let index = 0; index < numResults; index++) // Loops through each result item
{
    let instrumentName = learnResults[index].name;   
    if (instrumentName.length > 0)
    {
      stringResults += '<div class="container" onclick="selectResult(' + index + ')">'; //Each search item on the list can be touched for further information
      stringResults += '- ' + instrumentName + '</div></div><br />'; //Formatting to display search results as a list with a line break between each result
    }
}

//Below code is for setting the display/messages/controls when search results are returned
stringResults += '<button type="button" class="button" id="backbutton" onclick="learn()">Back</button>'; 
document.getElementById("instsearch").style.display = "none"; 
document.getElementById("searchResults").style.display = "inline";
document.getElementById("learninstruc").innerHTML = "Results";
document.getElementById("learn").style.display = "none"; 
document.getElementById("instructions").style.display="inline";
document.getElementById("searchResults").innerHTML = stringResults; 
document.getElementById("instructions").innerHTML="Here are some results.</br> Tap to learn more"; //User instructions to tap any result item for more info
}

//Function to display more details/information about each item from list of search results
function selectResult(index)
{
let resultIndex = window.xmlReq.instruments[index];
let stringResults = '<div class="resultstext">';
stringResults += '<p>Name:  ' + resultIndex.name + '</p>' + '</br>'; //Name of searched musical instrument is displayed
stringResults += '<p>Type:  ' + resultIndex.type + '</p>' + '</br>'; //Type of searched musical instrument is displayed 
stringResults += '<p>Description:  ' + resultIndex.description + '</p>'  + '</br>'; //Description of searched musical instrument is disaplyed
stringResults += '</div>';
stringResults += '<div><button type="button" class="button" id="backbutton" onclick="formatResponse()">Back</button></div>'; //User can return to previous screen
document.getElementById("instsearch").style.display = "none"; 
document.getElementById("searchResults").style.display = "inline";
document.getElementById("searchResults").innerHTML = stringResults; 
document.getElementById("instructions").style.display="none";
document.getElementById("learn").style.display = "none"; 
}


// The below functions are used to access HTML elements to display correct and relevant information and controls for each page of the app 

// Function to display/user messages/controls so user can select main-menu and return to home screen at any time
function menu()
{
document.getElementById("instructions").style.display="none";
document.getElementById("playgame").style.display="inline";
document.getElementById("play").style.display="inline";
document.getElementById("learn").style.display = "inline"; 
document.getElementById("drumplay").style.display = "inline"; 
document.getElementById("instsearch").style.display = "none"; 
document.getElementById("searchResults").style.display = "none";
document.getElementById("menu").style.display = "inline";
document.getElementById("playbutton").style.display = "none";
document.getElementById("check").style.display = "none";
}

// Function to set the display/messages/controls for the "drumkit" menu option
function drums()
{
document.getElementById("instructions").style.display="inline";   
document.getElementById("instructions").innerHTML="Drumming time!<br/><br/>Tap to play";
document.getElementById("playgame").style.display="inline";
document.getElementById("play").style.display="none";
document.getElementById("learn").style.display = "none"; 
document.getElementById("drumplay").style.display = "none"; 
document.getElementById("searchResults").style.display = "none";
document.getElementById("menu").style.display = "inline";
document.getElementById("playbutton").style.display = "none";
document.getElementById("check").style.display = "none";
document.getElementById("playagain").style.display="none"; 
}

// Function to set initial display/messages/controls for the "playgame" menu option
function game()
{
document.getElementById("instructions").style.display="inline";   
document.getElementById("instructions").innerHTML="Can you copy the drum pattern?<br/><br/>Press play to listen<br/>then tap the correct drums";
document.getElementById("play").style.display="none";
document.getElementById("playgame").style.display="inline";
document.getElementById("learn").style.display = "none"; 
document.getElementById("searchResults").style.display = "none";
document.getElementById("drumplay").style.display = "none"; 
document.getElementById("menu").style.display = "inline";
document.getElementById("playbutton").style.display = "inline";
document.getElementById("check").style.display = "none";
}

// Function to re-set the display/messages/controls so user can select to play again in the "playgame" menu option
function playAgain()
{
userOrder = [];   
document.getElementById("instructions").innerHTML="Can you copy the drum pattern?<br/>Press play to listen then tap the correct drums";
document.getElementById("instructions").style.color="white"; 
document.getElementById("instructions").style.fontSize="100%"; 
document.getElementById("play").style.display="none";
document.getElementById("learn").style.display = "none"; 
document.getElementById("playbutton").style.display = "inline";
document.getElementById("playbutton").innerHTML = "Play"; 
document.getElementById("playagain").style.display="none"; 
document.getElementById("drumplay").style.display = "none"; 
document.getElementById("menu").style.display = "inline";
document.getElementById("check").style.display = "none";
}

// Function to set display/messages/controls when user selects back button from results page in "learn" menu option
function back()
{
document.getElementById("play").style.display="none";
document.getElementById("playbutton").style.display = "none";
document.getElementById("playgame").style.display="none";
document.getElementById("playagain").style.display="none"; 
document.getElementById("learn").style.display = "none"; 
document.getElementById("instsearch").style.display = "inline"; 
document.getElementById("drumplay").style.display = "none";
document.getElementById("menu").style.display = "inline";
document.getElementById("check").style.display = "none";
document.getElementById("learninstruc").innerHTML = "Search here"; 
}

// Function to set display/messages/controls for "learn" menu option
function learn() 
{
document.getElementById("instructions").style.display="none";   
document.getElementById("play").style.display="none";
document.getElementById("playbutton").style.display = "none";
document.getElementById("playgame").style.display="none";
document.getElementById("playagain").style.display="none"; 
document.getElementById("learn").style.display = "none"; 
document.getElementById("instsearch").style.display = "inline"; 
document.getElementById("searchResults").style.display = "none";
document.getElementById("drumplay").style.display = "none"; 
document.getElementById("menu").style.display = "inline";
document.getElementById("check").style.display = "none";
document.getElementById("learninstruc").style.display="none";
}

//End of script