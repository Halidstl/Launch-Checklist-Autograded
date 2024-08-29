// Write your helper functions here!

require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}"> 
        `;
 }
 
 function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
 }
 
 function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" ||
        validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("All fields are required!");
        return;
    }
    if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number") {
        alert("Make sure to enter valid information for each field!");
        return;
    }
    if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alert("Make sure to enter valid information for each field!");
        return;
    }

    //SHUTTLE VARIABLES FOR SHORT HAND
    let fuelStatus = "Fuel level high enough for launch";
    let cargoStatus = "Cargo mass low enough for launch";
    let launchStatus = "Shuttle is Ready for Launch";
    let launchStatusColor = "green";

    if (fuelLevel < 10000) {
        list.style.visibility = "visible";
        fuelStatus = "Fuel level too low for launch";
        launchStatus = "Shuttle Not Ready for Launch";
        launchStatusColor = "red";
    }
    if (cargoLevel > 10000) {
        list.style.visibility = "visible";
        cargoStatus = "Cargo mass too heavy for launch";
        launchStatus = "Shuttle Not Ready for Launch";
        launchStatusColor = "red";
    } else {
        list.style.visibility = "visible";
    }

    //Shuttle ID's from HTML
    document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot} is ready for launch`;
    document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilot} is ready for launch`
    document.getElementById("fuelStatus").innerHTML = fuelStatus;
    document.getElementById("cargoStatus").innerHTML = cargoStatus;
    document.getElementById("launchStatus").style.color = launchStatusColor;
    document.getElementById("launchStatus").innerHTML = launchStatus;
}
 
async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
            return response.json();
        });

    return planetsReturned;
}
 
 function pickPlanet(planets) {
        let random = Math.floor(Math.random() * planets.length);
        return planets[random];
    }

 
 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet; 
 module.exports.myFetch = myFetch;