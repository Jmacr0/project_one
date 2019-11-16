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

    var title = $("#title").val();
    var author = $("#author").val();
    var subject = $('select').val();
    var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" +
        (title || author) + "&subject:" + + "&key=AIzaSyCE7UNHs3V2amAd3v4vSFlCnY7_v-fx2ok";
    console.log(subject)
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
            // const parent = $('<div>', { class: 'tile is-parent is-3' });
            // const child = $('<div>', { class: 'title is-child card' });
            // const cardImage = $('<div>', { class: 'card-image' });
            // const figure = $('<figure>', { class: 'image is-4by3' });
            // const image = $('<img>', { src: response.items[i].volumeInfo.imageLinks });
            // const cardContent = $('<card-content>');
            // const title = $('<h3>', { text: response.items[i].volumeInfo.title });
            // const author = $('<p>', { text: response.items[i].volumeInfo.authors });
            // const content = $('<div>', { text: response.items[i].volumeInfo.description });

            // cardImage.append(figure);
            // cardContent.append(title, author);
            // child.append(cardImage, cardContent, content);
            // parent.append(child);
            // ancestor.append(parent)

        }


        displayBooks.append(ancestor);
        displayBooks.append(ancestor2);
    })
}
