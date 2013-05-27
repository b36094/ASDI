// Name: Andrei Birsan
// Course month: 05.2013
// File Purpose: Basic Start-up Template


//#homePage starts here
$(document).on('pagebeforeshow', '#homePage', function(){
	
	
	
	//call outputData function
	outputData();
	
	//refresh ulListView
	$('#ulListView').listview().listview('refresh');		

	
	//Gets the id of <li> and displays it into an alert
	$('#ulListView').off('click', 'li').on('click', 'li', function(){
		
		//call displayDetails function with the obj.that was clicked on as argument
		displayDetails(this);
			
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
		
	//target the deleteButton
	$('.delBtn').click(function(){
		
		/*on-click calls deleteEntry function that takes the object's id 
		and delete the localStorage entry with the same key value*/
		deleteEntry(this.id);
		
		window.location = "#homePage";
	});
	
	//target the editButton
	$('.editBtn').click(function(){
		
		/*on-click calls editObject function that takes the object's id
		and inserts some of the object's properties into the newEntry page*/
		editObject(this.id);
		
		window.location = "#newEntry";
		window.location.reload(true);
	});

});//here ends #detailsPage

$(document).on('pagebeforeshow', '#detailsPage', function(){
	$('#ulTop').listview().listview('refresh');
});

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
		
			//serialize the form data into the data object 
			var data ={};
			data.mediaChoice = ["MediaChoice", $('#mediaChoice').val()];
			data.nameItem = ["NameItem", $('#nameItem').val()];
			data.genreItem = ["GenreItem", $('#genreItem').val()];
			data.lengthItem = ["LengthItem", $('#lengthItem').val()];
			data.pubDate = ["PubDate", $('#pubDate').val()];
			data.purchaseDate = ["PurchaseDate", $('#purchaseDate').val()];
			data.notesLabel = ["Notes", $('#notes').val()];
			
			
			//create data object with proper attributes
			
			//stringify the data from the form object
			var jsonObj = JSON.stringify(data);
			
			/*implement a switch based on this being the edit pass or the newEntry pass
			target the submitBt's value to check which one it is 
			*--> if is Submit generate a new key else overwrite the same key for edit*/
			if($('#submitBt').val() === "Submit") {
			
				//add a random number for the key
				var randomId = "entry: '+genRandomId()+'";
			    console.log(randomId);
			    //call ajax and record entry into the data-base
			    $.ajax ({
			    	headers: {
			    		'Accept':'application/json',
						'Content-Type':'application/json'

			    	},
			    	method: "post",
			    	url:  "/hml",
			    	data: {
			    		randomId: jsonObj,
			    	datatype: "json", 
			    	success: function() {
			    	
			    		console.log("Added Entry!");
			    	
			    	}
			    	
			    
			    
			    });
			
				//reset the form after localStorage insertion
				$($myFirstForm)[0].reset();
			
				//refresh localStorage
				window.location = '#homePage';
			}
			
			else {
				
				var randomId2 = $('#submitBt').data('key');
				
				
				//add the string conversion to the localStorage with the same key
				localStorage.setItem(randomId2,jsonObj);
				
				//reset the form after localStorage insertion
				$($myFirstForm)[0].reset();
				
				//refresh localStorage
				window.location = '#homePage';
			}
				
		}
	}); //here ends the validation function
	
	//Refresh the '#homePage' to display all the local store changes
		
	
	
});//here ends #newEntryPage



//genRandomId function creates a random number and returns it to be caught by the validator 
var genRandomId = function(){
	var randomId = Math.floor(Math.random() * 10000001);
	return randomId;
};

//dsplayData function outputs the localStorage on the '#homePage'
var outputData = function(){
	
	$('#container').empty();
	
	//2. Create a <ul> filter that holds all the <li>
	var ulListView = $('#container').append('<ul data-role = "listview" data-filter="true" data-inset = "true" data-corners = "true" id = "ulListView"></ul>');

	
		//get data on #homePage init 	
	$.ajax ({
		url: "_view/entries",
		dataType: "json",
		success: function(data) {
					
		//2. Create a <ul> filter that holds all the <li>
		var ulListView = $('#container').append('<ul data-role = "listview" data-filter="true" data-inset = "true" data-corners = "true" id = "ulListView"></ul>');
		$.each(data.rows, function(index, entry) {
			var nameItem = entry.value.nameItem[1];
			var genreItem = entry.value.genreItem[1];
			var lengthItem = entry.value.lengthItem[1];
			var mediaChoice = entry.value.mediaChoice[1];
			var pubDate = entry.value.pubDate[1];
			var purchaseDate = entry.value.purchaseDate[1];
			var notes = entry.value.notesLabel[1];
			var id = entry.id;
			//console.log(id);
						
			//3.4. Create a <li> tag that holds the localStorage object
			var insideLi = $('#ulListView').append('<li id = "'+id+'" data-entryname ="'+nameItem+'" data-mediatype ="'+mediaChoice+'" data-genre ="'+genreItem+'" data-length = "'+lengthItem+'" data-rldate = "'+pubDate+'" data-prdate = "'+purchaseDate+'" data-notes = "'+notesLabel+'"><a href="#detailsPage" data-transition = "slide"><img src = "images/'+filterImage(mediaChoice)+'" class="ui-li-icon ui-corner-none"/><span><p><strong>'+nameItem+'</strong></p></span><p class = "ui-li-aside">'+mediaChoice+'</p></a></li>');
			
			//This line refreshes the listview attribute in jqm (there are some issues in the #homePage with the way they display)
			insideLi.listview().listview('refresh');
			});// here ends each()
			
			
			
			
				//window.location.reload(true);
		} //ends success function
	}); //ends ajax call
		
		//3.4. Create a <li> tag that holds the localStorage object
		//var insideLi = $('#ulListView').append('<li id = "'+parsedObj.id+'" data-entryname ="'+parsedObj.nameItem[1]+'" data-mediatype ="'+parsedObj.mediaChoice[1]+'" data-genre ="'+parsedObj.genreItem[1]+'" data-length = "'+parsedObj.lengthItem[1]+'" data-rldate = "'+parsedObj.pubDate[1]+'" data-prdate = "'+parsedObj.purchaseDate[1]+'" data-notes = "'+parsedObj.notesLabel[1]+'"><a href="#detailsPage" data-transition = "slide"><img src = "images/'+filterImage(parsedObj.mediaChoice[1])+'" class="ui-li-icon ui-corner-none"/><span><p><strong>'+parsedObj.nameItem[1]+'</strong></p></span><p class = "ui-li-aside">'+parsedObj.mediaChoice[1]+'</p></a></li>');

		

		//3.5. Check if a devider with the object's '<optgroup label> already exists, if not create one ["audio", "video", "data", "other"]

		//3.6. Add the localStorage object under the above category using the html format refferenced below (make sure the bbj. has an idea to target it later).

	
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

/*displayDetails function*/
var displayDetails = function (obj) {
	$('.delBtn').attr('id', obj.id);
	$('.editBtn').attr('id', obj.id);
	
	$('#contentSpace').empty();
	
	var ulTop = $('#contentSpace').append('<ul data-role="listview" data-inset="true" id="ulTop"></ul>');
	var devider = $('#ulTop').append('<li data-role = "devider" data-theme = "b"><h2>Name: &nbsp;'+$(obj).attr('data-entryname')+'</h2></li>');
	var lsMediaType = $('#ulTop').append('<li><p><strong>Media Type:</strong><span class = "ui-li-aside">'+$(obj).attr('data-mediatype')+'</span></p></li>');
	var lsMediaGenre = $('#ulTop').append('<li><p><strong>Genre/Type:</strong><span class = "ui-li-aside">'+$(obj).attr('data-genre')+'</span></p></li>');
	var lsMediaLength = $('#ulTop').append('<li><p><strong>Length:</strong><span class = "ui-li-aside">'+$(obj).attr('data-length')+'</span></p></li>');
	var lsMediaRelease = $('#ulTop').append('<li><p><strong>Release Date:</strong><span class = "ui-li-aside">'+$(obj).attr('data-rldate')+'</span></p></li>');
	var lsMediaPurchase = $('#ulTop').append('<li><p><strong>Purchase Date:</strong><span class = "ui-li-aside">'+$(obj).attr('data-prdate')+'</span></p></li>');
	var lsMediaNotes = $('#ulTop').append('<li><p><strong>Notes:</strong><span class = "ui-li-aside">'+$(obj).attr('data-notes')+'</span></p></li>');	
};

/*deleteEntry function */
var deleteEntry = function(obj) {
	var confirmation = confirm("Are you sure?");
	if(confirmation) {
		localStorage.removeItem(obj);
	}
	
	else {
		return;
	}
};

/*editObject function goes here
var editObject = function(keyObj) {
	
	window.location = '#newEntry';
	
	//Target the submitBt and change its value to Edit
	$('#submitBt').attr('value', 'Edit');
	
	//Add the attr key to the editBtn
	$('#submitBt').data('key', keyObj);
	
	//Get the value under the specified key
	var storedEditObj = localStorage.getItem(keyObj); 
	
	//Parse data back into an obj. to be able to access properties.
	var parsedEditObj = JSON.parse(storedEditObj);
	
	//Add data into nameItem form in '#newEntry' page
	 $('#nameItem').attr("value", parsedEditObj.nameItem[1]);
	 
	//Add data into #genreItem 
	 $('#genreItem').attr("value", parsedEditObj.genreItem[1]);
	 
	 //Add data into #lengthItem 
	 $('#lengthItem').attr("value", parsedEditObj.lengthItem[1]);
	 
	 //Add data into #pubLength 
	 $('#pubDate').attr("value", parsedEditObj.pubDate[1]);
	 
	 //Add data into #purchaseDate
	 $('#purchaseDate').attr("value", parsedEditObj.purchaseDate[1]);
	 
	 //Add data into #notes
	 $('textarea[id = notes]').val(parsedEditObj.notesLabel[1]);
	 
	 //Gets the medidType value of the parsed object and forces the dropdown 
	 //menu (from the edit page) to display the same mediaType, when editing an obj.
	 var mediaOption = parsedEditObj.mediaChoice[1];
	 $('#mediaChoice').val(mediaOption); 
};*/





