//Auth Key for Walmart Shopping
var authKey = "wwrbpbwxmqp2me6d8hvubuhs";

//Variables that we can input information for the search query
var searchTerm = "";
var numResults = 21;
var minPrice = 0;
var maxPrice = 0;

//Query URL for the API search
var queryURL = "https://api.walmartlabs.com/v1/search?query=" + searchTerm + "&numItems=" + numResults + "&format=json&apiKey=" + authKey + "&sort=price&order=asc";

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
		console.log(wallData);
		console.log("-------------");

						//Populating Add To dropdown (before for loop, was recreating the list for walmart items length)
							firebase.auth().onAuthStateChanged(function(user) {
								if (user) {
									//Parent pathing for user
									var parent = database.ref().child("users").child(user.uid);

									parent.once("value")
									.then(function(snapshot) {
										//Loops through parent for every child
										snapshot.forEach(function (childSnapshot) {
											var key = childSnapshot.key;
											//Grabs the data for each child, in our case the name of the friend
											var childData = childSnapshot.val();

											//Populate Add to list with friends
												//New list item for each name
												var newListItem = $('<li>');
												var a = $('<a>');
												a.attr("href", "#");
												a.text(childData);

												//append person to list item
												newListItem.append(a);

												//append list item to list
												$("#unorderedList").append(newListItem);

												$(newListItem).on('click', function() {
													var friendPath = database.ref().child("users").child(user.uid).child(key);
													console.log(key);
													console.log(friendPath);

													var newItemKey = friendPath.push().key;
													var newChildPath = friendPath.child(newItemKey);

													//get walmart info from product div
													var productName = $("#prodName").html();

													newChildPath.push(productName);
												});

										});
									});
								}
							});

		//Loop through and provide the correct amount of products
		for (var i = 0; i < wallData.items.length; i++) {

			//increase productInfo by one each loop
			productInfo++;

			//Create HTML/Div well for product, price, description and price
			var wellSection = $('<div class="productWell col-sm-3"></div>');

			//Display the title
			var title = $('<p class="prodHeading" id="prodName">' + wallData.items[i].name.substr(0,40) + '...</p>');

			//Display the product image
			var image = $('<img>').attr('src', wallData.items[i].thumbnailImage);

			//Display the price
			var price = $('<p class="prodPrice">$' + wallData.items[i].salePrice + '</p>');

			//Display Buy Now Button
			var buyNow = $('<a href="' + wallData.items[i].productUrl + '" class="btn btn-success prodButton" target="_blank">Click Here for More Info</a>');

					//display add to list 
					// var addList = $('<button class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Add to ...</button>');

					//creating Add to dropdown div
					var n = $('<div>');
					n.addClass("dropdown");

					//dropdown button, with corresponding bootstrap attributes
					var b = $('<button>')
					b.addClass("btn btn-default dropdown-toggle")
					b.attr("type", "button");
					b.attr("data-toggle", "dropdown");
					b.attr("aria-haspopup", "true");
					b.attr("aria-expanded", "true");
					b.text("Add to");

					//append button to div, ensures following items do not go inside button
					n.append(b);

					//Creating unordered list for dropdown
					var newUnorderedList = $('<ul>');
					newUnorderedList.addClass("dropdown-menu");
					newUnorderedList.attr('id', "unorderedList");

					// //New list item for each name
					// var newListItem = $('<li>');
					// var a = $('<a>');
					// a.attr("href", "#");
					// a.text("Person Name");

					// //append href to person
					// newListItem.append(a);

					// //append person to list
					// newUnorderedList.append(newListItem);

					// //append list to div
					// n.append(newUnorderedList);


					//append list to div
					n.append(newUnorderedList);

			//Display the description
			// var description = $('<p>' + wallData.items[i].longDescription + '</p>');
			// if (i%5 === 0) {
			// 	$('</div><div class="row">')
			// } else {
			//Append Div to home.html
			wellSection.append(title);
			wellSection.append(image);
			wellSection.append(price);
			wellSection.append(buyNow);
			wellSection.append(n);
			// wellSection.append(description);

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
		queryURL = "http://api.walmartlabs.com/v1/search?query=" + searchTerm + "&numItems=21&format=json&apiKey=wwrbpbwxmqp2me6d8hvubuhs&facet=on&facet.range=price:[" + minPrice + " TO " + maxPrice + "]&sort=price&order=asc";

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
