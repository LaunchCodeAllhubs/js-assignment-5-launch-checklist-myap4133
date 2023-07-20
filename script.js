// Write your JavaScript code here!

window.addEventListener("load", function() {

   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
       let planet = pickPlanet(listedPlanets);
       addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image);
   })
   
   let list = document.getElementById("faultyItems");
   list.style.visibility = "hidden";
   const submit = document.querySelector("form");

   submit.addEventListener("submit", function(event){
        event.preventDefault();
        const pilot = document.getElementById("pilotName");
        const copilot = document.querySelector("input[name='copilotName']");
        const fuelLevel = document.querySelector("input[name='fuelLevel']");
        const cargoLevel = document.querySelector("input[name='cargoMass']");

        formSubmission(document, list, pilot.value, copilot.value, fuelLevel.value, cargoLevel.value);
        
   });
});