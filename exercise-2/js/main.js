// Main.js
$(function() {

	// Setup: Initialize Firebase using the configuration of your project

	  // Initialize Firebase
	  var config = {
	    apiKey: "AIzaSyDhpAsvoplG_GSw_zWXWcfhM7NxBu513SY",
	    authDomain: "m12-exercise-2.firebaseapp.com",
	    databaseURL: "https://m12-exercise-2.firebaseio.com",
	    storageBucket: "m12-exercise-2.appspot.com",
	    messagingSenderId: "910811822716"
	  };
	  firebase.initializeApp(config);



	// Set a reference to a "photos" point in your database
  var refPhotos = firebase.database().ref('photos');

	// Create a variable to store the firebase storage object
	var storage = firebase.storage();

	// Set listener: when an child is added, render each photo
	refPhotos.on('child_added', function(picture) {

		// Get the value of the data
		var data = picture.val();

		// Using jQuery, create a new img element with the URL of your data
		var img = $('<img>').attr('src', data.url)

		// Append your img to your element with id photos
		$('#photos').append(img);
	})

		// Reading Data: Form submission
		$('form').on('submit', function(event) {
			event.preventDefault();
			// Get the file
			var file = $("#file-upload")[0].files[0]

			// Create a reference on Firebase storage using the filename
			var fileRef = storage.ref(file.name);

			// // Put a file in the specified location, then...
			fileRef.put(file).then(function() {
				// Get the download URL from the reference, then...
				fileRef.getDownloadURL().then(function(url) {
					// Push the URL as a new child into your data structure
					refPhotos.push({
						url: url
					});
				});
			});

			// Reset the form
			this.reset();

			});
}); 
