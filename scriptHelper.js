// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
  const mission = document.getElementById('missionTarget');
  mission.innerHTML = `<h2>Mission Destination</h2>
  <ol>
      <li>Name: ${name}</li>
      <li>Diameter: ${diameter}</li>
      <li>Star: ${star}</li>
      <li>Distance from Earth: ${distance}</li>
      <li>Number of Moons: ${moons}</li>
  </ol>
  <img src="${imageUrl}">`;

}

function validateInput(testInput) {
   if(!testInput){
    return "Empty";
   }
   else if (isNaN(testInput)){
    return "Not a Number";
   }
   else {
    return "Is a Number";
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotCheck = validateInput(pilot.value);
    let copilotCheck = validateInput(copilot.value);
    let fuelCheck = validateInput(Number(fuelLevel.value));
    let cargoCheck = validateInput(Number(cargoLevel.value));

    if(pilotCheck === "Empty" || copilotCheck === "Empty" || fuelCheck === "Empty" || cargoCheck === "Empty"){
        window.alert("Please fill out all fields.");
    }
    else if (pilotCheck === "Is a Number" || copilotCheck === "Is a Number" || fuelCheck === "Not a Number" || cargoCheck === "Not a Number"){
        window.alert("Make sure that all fields have valid information.");
    }
    else {
        list.style.visibility = "visible";
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let rand = Math.floor(Math.random() * planets.length);
    let selectedPlanet = planets[rand];
    console.log(selectedPlanet);
    return selectedPlanet;
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
