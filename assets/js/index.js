function updateTime() {
    $('#time').text(moment().format("dddd, MMMM Do h:mm:ss a"));
};
updateTime();
setInterval(updateTime, 1000);

const submitBtn = $('#submitBtn');
const randomBtn = $("#randomBtn");
const main = $('#main');
const displayBooks = $('#display-books');
const pagination = $('.pagination');
let categoriesArray = [];
const localStorageGenres = localStorage.getItem('genres');
if (localStorageGenres !== null) {
    categoriesArray = JSON.parse(localStorageGenres);
    $.each(categoriesArray, function (i, val) {
        $('#subject').append($('<option>', { value: val, text: val }));
    })
}
var currentPage = 1;
var currentPageDisplay;
var startingIncrement;

pagination.hide();
submitBtn.on('click', search);
randomBtn.on('click', randomSearch);
$("#keyword,#title,#author").keydown(function (event) {
    // 13 = enter
    if (event.keyCode == 13) {
        search();
    }
});

const FAVOURITE_KEY = 'favourite';

$("#book-to-clone").click((function () {
    event.preventDefault();
    const target = $(event.target);
    if (target.hasClass('far')) {
        target.removeClass('far');
        target.addClass('fas')
        console.log('saving favourite');

        const title = $(this).find(".book-title").text();
        const subtitle = $(this).find(".book-subtitle").text();
        const author = $(this).find(".book-author").text();
        const imageSrc = $(this).find(".book-image").attr("src");
        const plotSummary = $(this).find(".book-content").text();
        const localStorageFavouriteArray = localStorage.getItem(FAVOURITE_KEY);
        const favouriteArray = localStorageFavouriteArray ? JSON.parse(localStorageFavouriteArray) : [];

        favouriteArray.push({
            title,
            subtitle,
            author,
            imageSrc,
            plotSummary,
        });

        localStorage.setItem(FAVOURITE_KEY, JSON.stringify(favouriteArray));
    }


}));


function search() {
    if (event) {
        event.preventDefault();
    }
    $('.loader').show();
    $('#display-books').empty();
    var keyword = $('#keyword').val();
    var title = $("#title").val();
    var subtitle =$("subtitle").val();
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

        const ancestor = $('<div>', { class: 'tile is-ancestor is-gapless' });
        const ancestor2 = $('<div>', { class: 'tile is-ancestor is-gapless' });
        const baseBook = $("#book-to-clone");
        var favouriteArray = JSON.parse(localStorage.getItem(FAVOURITE_KEY) || "[]");
        currentPageDisplay = currentPage * 8;
        startingIncrement = currentPageDisplay - 8;
        for (let i = startingIncrement; i < currentPageDisplay; i++) {
            if (response.items[i].volumeInfo.categories) {
                var category = response.items[i].volumeInfo.categories.toString();
            }
            if (!categoriesArray.includes(category)) {
                if (category !== undefined) {
                    $('#subject').append($('<option>', { value: category, text: category }));
                    categoriesArray.push(category);
                }
            }
            localStorage.setItem('genres', JSON.stringify(categoriesArray));

            const cloneBook = baseBook.clone(true);

            cloneBook.removeAttr("id");
            if (response.items[i].volumeInfo.imageLinks) {
                cloneBook.find(".book-image").attr("src", response.items[i].volumeInfo.imageLinks.thumbnail);
            } else {
                cloneBook.find(".book-image").attr("src", "https://via.placeholder.com/300x400");
            }
            var responseTitle = response.items[i].volumeInfo.title;
            for (let i = 0; i < favouriteArray.length; i++) {
        
                if (favouriteArray[i].title === responseTitle){
                    cloneBook.find(".heart-icon").removeClass("far").addClass("fas");                    
                }
            }
            
            cloneBook.find(".book-title").text(response.items[i].volumeInfo.title);
            cloneBook.find(".book-subtitle").text(response.items[i].volumeInfo.subtitle);
            cloneBook.find(".book-author").text(response.items[i].volumeInfo.authors);
            cloneBook.find(".book-content").text(response.items[i].volumeInfo.description);
            cloneBook.find(".book-content").attr("style", "height: 150px; overflow: scroll; padding: 0.5em;");

            if (i > currentPageDisplay - 5) {
                ancestor2.append(cloneBook);
            } else {
                ancestor.append(cloneBook);
            }
        }
        $('.loader').hide();
        displayBooks.append(ancestor).fadeIn('slow');
        displayBooks.append(ancestor2).fadeIn('slow');
        pagination.show();
    })
}

$('.pagination').on('click', paginate);

function paginate() {
    event.preventDefault();
    let clickedItem = $(event.target);
    let activePage = $('.is-current');
    if (clickedItem.hasClass('is-current')) {
        return;
    } else if (clickedItem.hasClass('pagination-link')) {
        activePage.removeClass('is-current');
        clickedItem.addClass('is-current');
        currentPage = parseInt(clickedItem.text());
        search();
    } else if (clickedItem.hasClass('pagination-next')) {
        currentPage = parseInt($(this).find('.is-current').text()) + 1;
        if (currentPage > 5) {
            currentPage = 5
            return;
        }
        activePage.removeClass('is-current');
        $(`a:contains(${currentPage})`).addClass('is-current');
        search();
    } else if (clickedItem.hasClass('pagination-previous')) {
        currentPage = parseInt($(this).find('.is-current').text()) - 1;
        if (currentPage < 1) {
            currentPage = 1;
            return;
        }
        activePage.removeClass('is-current');
        $(`a:contains(${currentPage})`).addClass('is-current');
        search();
    }

}


function randomSearch() {

    var queryURL = "https://random-word-api.herokuapp.com/word?key=FRM2Z0DZ&number=1"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        $('#keyword').val("");
        $('#title').val("");        
        $('#author').val("");

        $('#keyword').val(response[0]);
        search();
    })
}
