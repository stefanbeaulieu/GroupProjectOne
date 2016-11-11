function displaySearchResults(){

var product = $("#productSearch").val();
var queryURL = "http://api.walmartlabs.com/v1/search?query=" + product + "&format=json&apiKey=wwrbpbwxmqp2me6d8hvubuhs"

//Creates AJAX call for product being searched
$.ajax({url: queryURL, method: 'GET'}).done(function(response){

	//Creates generic div to hold the product
	var product = $('<div class="prod">')

	//Display the title
	product.append($("<p>".html(response.name)));

	//Display the product image
	var image = $('<img>').attr("src", response.thumbnailImage);

	//Append image
	product.append(image);

	//Display the price
	product.append($("<p>".html(response.salePrice)));

	//Display the description
	product.append($("<p>".html(response.shortDescription)));



});
displaySearchResults();
console.log(response.name);


};


