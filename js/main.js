// Name: Andrei Birsan
// Course month: 05.2013
// File Purpose: Basic Start-up Template

//#homePage starts here
$(document).on('pageinit','#homePage', function() {
	
});//here ends #homePage

//#newsFeed starts here
$(document).on('pageinit', '#newsFeed', function(){
	
});//here ends #newsFeed

//#aboutPage starts here
$(document).on('pageinit', '#aboutPage', function(){
	
});//here ends #aboutPage

//#detailsPage starts here
$(document).on('pageinit', '#detailsPage', function(){
	
});//here ends #detailsPage

//#newEntryPage starts here
$(document).on('pageinit', '#newEntry', function(){
	
	//function to parse the form
	var $myFirstForm = $('#firstForm');
	
	//access the validation property (plugging)
	$myFirstForm.validate({
		//ignores the items that have the class "ignore" on them			
		ignore: ".ignore",
		invalidHandler: function() {},		
		submitHandler: function(randomId){
		
		//serialize the form data into an object 
		var data = $myFirstForm.serializeArray();
		
		//stringify the data from the form object
		var jsonObj = JSON.stringify(data);
		
		//add a random number for the key
		var randomId = genRandomId();
		
		//add the string conversion to the localStorage with a key-value
		localStorage.setItem(randomId,jsonObj);
		
		//reset the form after localStorage insertion
		$($myFirstForm)[0].reset();
		
		//refresh localStorage
		window.location = '#homePage';
				
		}
	}); //here ends the validation function
	
	//Refresh the '#homePage' to display all the local store changes
	$('#submitBt').click(function(){
		
});	
	
	
});//here ends #newEntryPage



//genRandomId function creates a random number and returns it to be caught by the validator 
var genRandomId = function(){
	var randomId = Math.floor(Math.random() * 10000001);
	return randomId;
};
