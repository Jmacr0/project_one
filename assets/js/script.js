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

submitBtn.on('click', search);

function search() {

    event.preventDefault();
    $('.is-ancestor').empty();
    var keyword = $('#keyword').val();
    var title = $("#title").val();
    var author = $("#author").val();
    var subject = $('#subject').val();
    var queryURL = "https://www.googleapis.com/books/v1/volumes?key=AIzaSyCE7UNHs3V2amAd3v4vSFlCnY7_v-fx2ok&maxResults=40&q="

    if (keyword) {
        queryURL += keyword
    }
    if (title) {
        queryURL += `+intitle:${title}`
    };
    if (author) {
        queryURL += `+inauthor:${author}`
    }
    if (subject) {
        queryURL += `+subject:${subject}`
    }

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //store array to local storage so refresh will still have data
        const categoriesArray = [];
        const ancestor = $('<div>', { class: 'tile is-ancestor is-gapless' });
        const ancestor2 = $('<div>', { class: 'tile is-ancestor is-gapless' });
        const baseBook = $("#book-to-clone");

        for (let i = 0; i < 8; i++) {

            let category = response.items[i].volumeInfo.categories.toString();
            if (!categoriesArray.includes(category)) {
                $('#subject').append($('<option>', { value: category, text: category }));
                categoriesArray.push(category);
            }
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
