var config = {
    apiKey: "AIzaSyAjPAauIcoxFMJkXhN6MDPqw_wqbhNIXh0",
    authDomain: "train-scheduler-6701b.firebaseapp.com",
    databaseURL: "https://train-scheduler-6701b.firebaseio.com",
    projectId: "train-scheduler-6701b",
    storageBucket: "",
    messagingSenderId: "872700730821"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit").on("click", function(event) {
    
    event.preventDefault();

    var trainName = $("#name-input").val().trim();
    var destinationName = $("#destination-input").val().trim();
    var time = moment($("#time-input").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: destinationName,
        time: time,
        frequency: frequency
      };

      database.ref().push(newTrain);

        $("#name-input").val("");
        $("#destination-input").val("");
        $("#time-input").val("");
        $("#frequency-input").val("");

    
  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
  
    var trainName = childSnapshot.val().name;
    var destinationName = childSnapshot.val().destination;
    var time = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;

//   // Prettify the employee start
//   var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

//   // Calculate the months worked using hardcore math
//   // To calculate the months worked
//   var empMonths = moment().diff(moment(empStart, "X"), "months");
//   console.log(empMonths);

//   // Calculate the total billed rate
//   var empBilled = empMonths * empRate;
//   console.log(empBilled);

    // Assumptions
    var tFrequency = frequency;

    

    // Time is 3:30 AM
    var firstTime = time;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destinationName + "</td><td>" +
  nextTrain + "</td><td>" + frequency + "</td><td>");
});

  