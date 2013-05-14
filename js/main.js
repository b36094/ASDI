// Name: Andrei Birsan
// Course month: 05.2013
// File Purpose: Basic Start-up Template

//#homePage starts here
$(document).on('pagebeforeshow','#homePage', function() {
	
	//call outputData function
	outputData();
	
	//Gets the id of <li> and displays it into an alert
	$('#ulListView').on('click', 'li', function(){
		
		alert("Entry ID: "+this.id);
		
		console.log(this);
		
		//call displayDetails function
		
				
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
		
		//3.3. Add the id property to parsedObj for future refference
		parsedObj.id = storedKey;
		
		//call function displayDetails();
		displayDetails(parsedObj);
		
		//3.4. Create a <li> tag that holds the localStorage object
		var insideLi = $('#ulListView').append('<li id = "'+parsedObj.id+'"><a href="#detailsPage" data-transition = "slide"><img src = "images/'+filterImage(parsedObj[0].value)+'" class="ui-li-icon ui-corner-none"/><span><p><strong>'+parsedObj[1].value+'</strong></p></span><p class = "ui-li-aside">'+parsedObj[0].value+'</p></a></li>');
		
		//call filterImage with an input of groupMedia
		
		
		//This line refreshes the listview attribute in jqm (there are some issues in the #homePage with the way they display)
		insideLi.listview().listview('refresh');
		
		//3.5. Check if a devider with the object's '<optgroup label> already exists, if not create one ["audio", "video", "data", "other"]
		
		//3.6. Add the localStorage object under the above category using the html format refferenced below (make sure the bbj. has an idea to target it later).
		
		console.log(parsedObj);
	} //the for loops ends here

};

/*filterImage is in charge of figuring out what type of image we display in the <li>. 
  It returns a file name based on the obj. parameter it receives*/
var filterImage = function(input) {
	//1. if the input is audio output smAudio.png
	if (input.indexOf("Audio") == 0) {
		
		return "smAudio.png";
	}
	else if(input.indexOf("Video") == 0) {
	
		return "smVideo.png";
	}
	else if(input.indexOf("Data") == 0) {
		
		return "smData.png";
	}
	else if(input.indexOf("eBook") == 0) {
		
		return "smBook.png";
	}
	else if(input.indexOf("eDoc") == 0) {
		
		return "smDocument.png";
	}
	else if(input.indexOf("MemoryStick") == 0) {
		
		return "smMemoryStick.png";
	}
	
};

//createPage is in charge of creating all the dynamic pages with details.
var createPages = function () {
	
	
}; 

/* Refference code for the display function
<ul data-role = "listview" data-filter="true" data-inset = "true" data-corners = "true">
	<li data-role="list-divider" data-link="audio"><span class = "marginLeft">Audio Entries</span><span class="ui-icon ui-icon-plus ui-icon-shadow listIcon"></span></li>
	<li><a href="#detailsPage" data-transition = "slide"><img src = "images/smAudio.png" class="ui-li-icon ui-corner-none"/><span><p><strong>Love Is Perfect</strong></p></span><p class = "ui-li-aside">Audio Cd</p></a></li>
</ul>*/

/* Refference code for 
<ul data-role = "listview" data-inset = "true"> 
					<li data-role = "devider" data-theme = "b"><h2>Example Name</h2></li> 
					<li><p><strong>Media Type:</strong><span class = "ui-li-aside">AudioCd</span></p></li> 
					<li><p><strong>Genre/Type:</strong><span class = "ui-li-aside">Disco</span></p></li> 
					<li><p><strong>Length:</strong><span class = "ui-li-aside">60 Minutes</span></p></li>     
					<li><p><strong>Release Date:</strong><span class = "ui-li-aside">02-02-1999</span></p></li>     
					<li><p><strong>Purchase Date:</strong><span class = "ui-li-aside">11-11-2001</span></p></li>     
					<li><p><strong>Notes:</strong><span class = "ui-li-aside">This is a great CD.</span></p></li>     
</ul>*/

/*displayDetails function*/
var displayDetails = function (obj) {
	
	var ulTop = $('#contentSpace').append('<ul data-role = "listview" data-inset = "true" id = "ulTop"></ul>');
	var devider = $('#ulTop').append('<li data-role = "devider" data-theme = "b"><h2>'+obj[1].value+'</h2></li>')
	var lsMediaType = $('#ulTop').append('<li><p><strong>Media Type:</strong><span class = "ui-li-aside">'+obj[0].value+'</span></p></li>');
	var lsMediaGenre = $('#ulTop').append('<li><p><strong>Genre/Type:</strong><span class = "ui-li-aside">'+obj[2].value+'</span></p></li>');
	var lsMediaLength = $('#ulTop').append('<li><p><strong>Length:</strong><span class = "ui-li-aside">'+obj[3].value+' Minutes</span></p></li>');
	var lsMediaRelease = $('#ulTop').append('<li><p><strong>Release Date:</strong><span class = "ui-li-aside">'+obj[4].value+'</span></p></li>');
	var lsMediaPurchase = $('#ulTop').append('<li><p><strong>Purchase Date:</strong><span class = "ui-li-aside">'+obj[5].value+'</span></p></li>');
	var lsMediaNotes = $('#ulTop').append('<li><p><strong>Notes:</strong><span class = "ui-li-aside">'+obj[6].value+'</span></p></li>');
};
