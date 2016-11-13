//Auth Key for Walmart Shopping
var authKey = "wwrbpbwxmqp2me6d8hvubuhs";

//Variables that we can input information for the search query
var searchTerm = "";
var numResults = 20;
var minPrice = 0;
var maxPrice = 0;

//Query URL for the API search
var queryURL = "http://api.walmartlabs.com/v1/search?query=" + searchTerm + "&numItems=" + numResults + "&format=json&apiKey=" + authKey + "&sort=price&order=asc";

//Array to hold product info
var productInfo = 0;

//FUNCTIONS

//Function to run the query for results
function runQuery(queryURL){

	//Ajax to get informtion from Walmart
	$.ajax({
		url: queryURL,
	 	method: 'GET',
	 	dataType: "jsonp",
	 	crossDomain: true,
	})

	.done(function(wallData){

		//Console logging the URL for troubleshooting
		console.log("-------------");
		console.log("URL: " + queryURL);
		console.log("-------------");

		//Console logging wallData to show as an object
		console.log(wallData)
		console.log("-------------");

		//Loop through and provide the correct amount of products
		for (var i = 0; i < numResults.length; i++) {

			//increase productInfo by one each loop
			productInfo++;

			//Create HTML/Div well for product, price, description and price
			var wellSection = ("<div>");
			
			wellSection.addClass('well');

			//Display the title
			wellSection.append('<p>' + wallData.response.items[i].name + "</p>");

			//Display the product image
			var image = $('<img>').attr("src", wallData.response.items[i].thumbnailImage);

			//Append image
			wellSection.append(image);

			//Display the price
			wellSection.append($("<p>").html(wallData.response.items[i].salePrice));

			//Display the description
			wellSection.append($("<p>").html(wallData.response.items[i].shortDescription));

			//Append Div to home.html
			('#prodSection').append(wellSection);


			
		}
	});
}

//Methods

	//Run the click function on the search parameter
	$('#addCategoryButton').on('click', function(addCategory){

		//Initially set productInfo to zero
		productInfo = 0;

		//Empties the section associated with products
		// $('#prodSection').empty();

		//Set Search Term
		var searchTerm = $('#addCategory').val().trim();
		queryURL = "http://api.walmartlabs.com/v1/search?query=" + searchTerm + "&numItems=20&format=json&apiKey=wwrbpbwxmqp2me6d8hvubuhs&sort=price&order=asc";

		$('#prodSection').append(searchTerm);

		//Set Min Price
		var minPrice = $('#minPrice').val();

		//Set Max Price
		var maxPrice = $('#maxPrice').val();

		//Pass info into parameters to run function
		runQuery(queryURL);

		return false;


	});

	//Clear the products that are currently being shown
	$('#clearAll').on('click', function(){
		productInfo = 0;
		$('#prodSection').empty();
	});

