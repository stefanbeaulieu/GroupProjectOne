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
		for (var i = 0; i < wallData.items.length; i++) {

			//increase productInfo by one each loop
			productInfo++;

			//Create HTML/Div well for product, price, description and price
			var wellSection = $('<div class="productWell">');
			
			//Display the title
			var title = $('<p>' + wallData.items[i].name + '</p>');

			//Display the product image
			var image = $('<img>').attr('src', wallData.items[i].thumbnailImage);

			//Display the price
			var price = $('<p>' + wallData.items[i].salePrice + '</p>');

			//Display Buy Now Button
			var buyNow = $('<a href="' + wallData.items[i].productUrl + '" class="btn btn-success" target="_blank">Buy Now</a>');

			//display add to list
			// var addList = $()

			//Display the description
			var description = $('<p>' + wallData.items[i].longDescription + '</p>');

			//Append Div to home.html
			wellSection.append(title);
			wellSection.append(image);
			wellSection.append(price);
			wellSection.append(buyNow);
			wellSection.append(description);

			$('#prodSection').append(wellSection);


			
		}
	});
}

//Methods

	//Run the click function on the search parameter
	$('#addCategoryButton').on('click', function(addCategory){

		//Initially set productInfo to zero
		productInfo = 0;

		//Empties the section associated with products
		$('#prodSection').empty();

		//Set Search Term
		var searchTerm = $('#addCategory').val().trim();

		//Set Min Price
		var minPrice = $('#minPrice').val();

		//Set Max Price
		var maxPrice = $('#maxPrice').val();

		//API Query
		queryURL = "http://api.walmartlabs.com/v1/search?query=" + searchTerm + "&numItems=20&format=json&apiKey=wwrbpbwxmqp2me6d8hvubuhs&facet=on&facet.range=price:[" + minPrice + " TO " + maxPrice + "]&sort=price&order=asc";

		// $('#prodSection').append(wellSection);

		// //Set Min Price
		// var minPrice = $('#minPrice').val();

		// //Set Max Price
		// var maxPrice = $('#maxPrice').val();


		//Pass info into parameters to run function
		runQuery(queryURL);

		return false;


	});

	//Clear the products that are currently being shown
	$('#clearAll').on('click', function(){
		
		productInfo = 0;
		
		$('#prodSection').empty();

		$('#addCategory').val("");

		return false;
	});

