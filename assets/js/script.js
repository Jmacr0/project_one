$(document).ready(function () {

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function () {

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

    });
});

function updateTime() {
    $('#time').text(moment().format("dddd, MMMM Do h:mm:ss a"));
};
updateTime();
setInterval(updateTime, 1000);

const submitBtn = $('#submitBtn');
const main = $('#main');
const displayBooks = $('#display-books');
const randomBtn = $("#randomBtn");

submitBtn.on('click', search);
randomBtn.on('click',randomSearch);

function search() {
    if (event) {
        event.preventDefault();
    }
    $('.is-ancestor').empty();
    var keyword = $('#keyword').val();
    var title = $("#title").val();
    var author = $("#author").val();
    var subject = $('#subject').val();
    var queryURL = "https://www.googleapis.com/books/v1/volumes?key=AIzaSyCE7UNHs3V2amAd3v4vSFlCnY7_v-fx2ok&q="

    if (keyword) {
        // queryURL = `${queryURL}${keyword}`
        queryURL += keyword;
    }
    if (title) {
        queryURL = `${queryURL}+intitle:${title}`;
        console.log(queryURL);
    };
    if (author) {
        queryURL = `${queryURL}+inauthor:${author}`
        console.log(queryURL)
    }
    if (subject) {
        queryURL = `${queryURL}+subject:${subject}`
        console.log(queryURL)
    }

    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        const ancestor = $('<div>', { class: 'tile is-ancestor is-gapless' });
        const ancestor2 = $('<div>', { class: 'tile is-ancestor is-gapless' });
        const baseBook = $("#book-to-clone");

        for (var i = 0; i < 8; i++) {
            const cloneBook = baseBook.clone();

            cloneBook.removeAttr("id");

            cloneBook.find(".book-image").attr("src", response.items[i].volumeInfo.imageLinks.thumbnail);
            cloneBook.find(".book-title").text(response.items[i].volumeInfo.title);
            cloneBook.find(".book-author").text(response.items[i].volumeInfo.authors);
            cloneBook.find(".book-content").text(response.items[i].volumeInfo.description);
            cloneBook.find(".book-content").attr("style", "height: 150px; overflow: scroll; padding: 0.5em;");

            if (i > 3) {
                ancestor2.append(cloneBook);
            } else {
                ancestor.append(cloneBook);
            }
        }

        displayBooks.append(ancestor);
        displayBooks.append(ancestor2);
    })
} 



function randomSearch() {

    var random = $('#random').val();
    var queryURL = "https://random-word-api.herokuapp.com/word?key=JKAP6XDP&number=1"

    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response[0]);

        $('#keyword').val("");
        $('#title').val("");
        $('#author').val("");
        // var random = $('#keyword').val();

        $('#keyword').val(response[0]);
        search();  
        
        
    })
}
