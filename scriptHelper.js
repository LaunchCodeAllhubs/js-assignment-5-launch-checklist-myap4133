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
    let fuel = Number(fuelLevel.value);
    let cargo = Number(cargoLevel.value);
    let pilotCheck = validateInput(pilot.value);
    let copilotCheck = validateInput(copilot.value);
    let fuelCheck = validateInput(fuel);
    let cargoCheck = validateInput(cargo);

    if(pilotCheck === "Empty" || copilotCheck === "Empty" || fuelCheck === "Empty" || cargoCheck === "Empty"){
        window.alert("Please fill out all fields.");
    }
    else if (pilotCheck === "Is a Number" || copilotCheck === "Is a Number" || fuelCheck === "Not a Number" || cargoCheck === "Not a Number"){
        window.alert("Make sure that all fields have valid information.");
    }
    else {
        list.style.visibility = "visible";
        const pilotStatus = document.getElementById("pilotStatus");
        const copilotStatus = document.getElementById("copilotStatus");
        const fuelStatus = document.getElementById("fuelStatus");
        const cargoStatus = document.getElementById("cargoStatus");
        const head = document.getElementById("launchStatus");

        pilotStatus.innerHTML = `Pilot ${pilot.value} Ready`;
        copilotStatus.innerHTML = `Co-pilot ${copilot.value} Ready`;

        head.innerHTML = `Shuttle is Ready for Launch`;
        head.style.color = '#419F6A';

        if(fuel < 10000){
            fuelStatus.innerHTML = `Not Enough Fuel for the Journey`;
            head.innerHTML = `Shuttle not Ready for Launch`;
            head.style.color = 'red';
        }

        if(cargo > 10000){
            cargoStatus.innerHTML = `Too Much Mass for Shuttle to Take Off`;
            head.innerHTML = `Shuttle not Ready for Launch`;
            head.style.color = '#C7254E';
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
    console.log(selectedPlanet);
    return selectedPlanet;
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
