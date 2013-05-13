// Name: Andrei Birsan
// Course month: 05.2013
// File Purpose: Basic Start-up Template

//#homePage starts here
$(document).on('pagebeforeshow','#homePage', function() {
	//call outputData function
	outputData();
	
	$('#ulListView').on('click', 'li', function(){
		
		alert("Entry ID: "+this.id);
		
		
	});
});//here ends #homePage

$(document).on('pageinit', '#homePage', function(){

});

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

//dsplayData function outputs the localStorage on the '#homePage'
var outputData = function(){
	//1. Get the lenght of the localStorage
	var localStL = localStorage.length;
	
	//2. Create a <ul> filter that holds all the <li>
	var ulListView = $('#container').append('<ul data-role = "listview" data-filter="true" data-inset = "true" data-corners = "true" id = "ulListView"></ul>');
	
	//3. Loop through the length of localStorage
	for(var i = 0, j = localStL; i < j; i ++) {
		
		//3.1. Get key-value pare
		var storedKey = localStorage.key(i); //get the key to refference for the value
		var storedObj = localStorage.getItem(storedKey); //get the value under the specified key
		
		//3.2. Parse data back into an obj. to be able to access properties.
		var parsedObj = JSON.parse(storedObj);
		
		
		
		//3.3. Create a <li> tag that holds the localStorage object
		var insideLi = $('#ulListView').append('<li><a href="#detailsPage" data-transition = "slide"><img src = "images/smAudio.png" class="ui-li-icon ui-corner-none" id = "'+storedKey+'"/><span><p><strong>'+parsedObj[1].value+'</strong></p></span><p class = "ui-li-aside">'+parsedObj[0].value+'</p></a></li>');
		//3.4. Check if a devider with the object's '<optgroup label> already exists, if not create one ["audio", "video", "data", "other"]
		
		//3.5. Add the localStorage object under the above category using the html format refferenced below (make sure the bbj. has an idea to target it later).
		
	} //the for loops ends here
	
	
	
	
	 
	 
	
};


/* Refference code for the display function
<ul data-role = "listview" data-filter="true" data-inset = "true" data-corners = "true">
	<li data-role="list-divider" data-link="audio"><span class = "marginLeft">Audio Entries</span><span class="ui-icon ui-icon-plus ui-icon-shadow listIcon"></span></li>
	<li><a href="#detailsPage" data-transition = "slide"><img src = "images/smAudio.png" class="ui-li-icon ui-corner-none"/><span><p><strong>Love Is Perfect</strong></p></span><p class = "ui-li-aside">Audio Cd</p></a></li>
</ul>*/
