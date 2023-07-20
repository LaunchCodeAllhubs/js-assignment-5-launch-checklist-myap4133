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
    console.log(testInput);
   if(testInput === ""){
    return "Empty";
   }
   else if (isNaN(Number(testInput))){
    return "Not a Number";
   }
   else {
    return "Is a Number";
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let fuelTotal = Number(fuelLevel);
    let cargoMass = Number(cargoLevel);
    let pilotCheck = validateInput(pilot);
    let copilotCheck = validateInput(copilot);
    let fuelCheck = validateInput(fuelLevel);
    let cargoCheck = validateInput(cargoLevel);

    const head = document.getElementById("launchStatus");

    if(pilotCheck === "Empty" || copilotCheck === "Empty" || fuelCheck === "Empty" || cargoCheck === "Empty"){
        list.style.visibility = "hidden";
        head.innerHTML = `Awaiting Information Before Launch`;
        head.style.color = 'black';
        window.alert("Please fill out all fields.");
    }
    else if (pilotCheck === "Is a Number" || copilotCheck === "Is a Number" || fuelCheck === "Not a Number" || cargoCheck === "Not a Number"){
        list.style.visibility = "hidden";
        head.innerHTML = `Awaiting Information Before Launch`;
        head.style.color = 'black';
        window.alert("Make sure to enter valid information for each field!");
    }
    else {
        list.style.visibility = "visible";
        const pilotStatus = document.getElementById("pilotStatus");
        const copilotStatus = document.getElementById("copilotStatus");
        const fuelStatus = document.getElementById("fuelStatus");
        const cargoStatus = document.getElementById("cargoStatus");

        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

        if(fuelTotal < 10000 && cargoMass > 10000){
            fuelStatus.innerHTML = `Fuel level too low for launch`;
            cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
            head.innerHTML = `Shuttle Not Ready for Launch`;
            head.style.color = 'rgb(199, 37, 78)';
        }
        else if(fuelTotal >= 10000 && cargoMass > 10000){
            fuelStatus.innerHTML = `Fuel level high enough for launch`;
            cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
            head.innerHTML = `Shuttle Not Ready for Launch`;
            head.style.color = 'rgb(199, 37, 78)';
        }
        else if(fuelTotal < 10000 && cargoMass <= 10000){
            fuelStatus.innerHTML = `Fuel level too low for launch`;
            cargoStatus.innerHTML = `Cargo mass low enough for launch`;
            head.innerHTML = `Shuttle Not Ready for Launch`;
            head.style.color = 'rgb(199, 37, 78)';
        }
        else{
            fuelStatus.innerHTML = `Fuel level high enough for launch`;
            cargoStatus.innerHTML = `Cargo mass low enough for launch`;
            head.innerHTML = `Shuttle is Ready for Launch`;
            head.style.color = 'rgb(65, 159, 106)';
        }
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
    return selectedPlanet;
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
