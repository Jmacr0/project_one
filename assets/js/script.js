var submitBtn = $('#submitBtn');
var main = $('#main');
var displayBooks = $('#display-books');


submitBtn.on('click', search); 

function search() {
    var title = $("#title").val()
    var author = $("#author").val();
    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" +
        title + author + "&key=AIzaSyCE7UNHs3V2amAd3v4vSFlCnY7_v-fx2ok";

    console.log(queryURL)


    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {// After the data comes back from the API {

               
        for (var i = 0; i < 5; i++) {

            var title = $("<p>").text(response.items[i].volumeInfo.title);
            var image = $("<img>").text(response.items[i].volumeInfo.imageLinks);
            var author = $("<p>").text(response.items[i].volumeInfo.authors);
            var summary = $("<p>").text(response.items[i].volumeInfo.description);


            $("#display-books").append(title, image, author,summary);
            // console.log(title, image, author, summary)


    //         $(textarea).append(title);
    //         $(".searchResults").append(img);
    //         $(".searchResults").append(author);
    //         console.log(title);
        }

    });

    // Storing an array of results in the results variable
    // var results = response.data;

    // // Looping over every result item
    // for (var i = 0; i < results.length; i++) {

    //     // Only taking action if the photo has an appropriate rating
    //     if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
    //         // Creating a div for the gif
    //         var gifDiv = $("<div>");

    //         // Storing the result item's rating
    //         var rating = results[i].rating;

    //         // Creating a paragraph tag with the result item's rating
    //         var p = $("<p>").text("Rating: " + rating);

    //         // Creating an image tag
    //         var bookImage = $("<img>");

    //         // Giving the image tag an src attribute of a proprty pulled off the
    //         // result item
    //         bookImage.attr("src", results[i].images.fixed_height.url);

    //         // Appending the paragraph and personImage we created to the "gifDiv" div we created
    //         gifDiv.append(p);
    //         gifDiv.append(personImage);

    //         // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
    //         $("#gifs-appear-here").prepend(gifDiv);
    //     }
    // }


});




