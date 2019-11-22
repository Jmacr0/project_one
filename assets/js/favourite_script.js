const FAVOURITE_KEY = 'favourite';
const localStorageFavouriteArray = localStorage.getItem(FAVOURITE_KEY);


$("#favourite-book-to-clone").on('click', function () {
    event.preventDefault();
    const target = $(event.target);
    if (target.hasClass('far')) {

        console.log('deleted');
        var title = $(this).find(".book-title").text();
        var favouriteArray = JSON.parse(localStorage.getItem(FAVOURITE_KEY));
        // var favouriteArray = JSON.parse(localStorageFavouriteArray);

        for (let i = 0; i < favouriteArray.length; i++) {
            if (favouriteArray[i].title === title) {
                favouriteArray.splice(i, 1)
                console.log(favouriteArray);
                localStorage.setItem(FAVOURITE_KEY, JSON.stringify(favouriteArray));
                refreshFavourites();
            }
        }

    }
})

function refreshFavourites() {
    $('#favourites-container').empty();
    if (localStorageFavouriteArray) {
        const favouriteArray = JSON.parse(localStorage.getItem(FAVOURITE_KEY));
        $('#favourites-count').text(favouriteArray.length);

        const ancestor = $('<div>', { class: 'tile is-ancestor is-gapless' });
        for (const favourite of favouriteArray) {

            const clonedFavourite = $("#favourite-book-to-clone").clone(true);
            clonedFavourite.removeAttr('id');
            clonedFavourite.find("img").attr("src", favourite.imageSrc);
            clonedFavourite.find(".book-title").text(favourite.title);
            clonedFavourite.find(".book-subtitle").text(favourite.subtitle);
            clonedFavourite.find(".book-author").text(favourite.author);
            clonedFavourite.find(".book-content").text(favourite.plotSummary);
            clonedFavourite.find(".book-content").attr("style", "height: 150px; overflow: scroll; padding: 0.5em;")

            ancestor.append(clonedFavourite);
        }
        $("#favourites-container").append(ancestor);
    }
}
refreshFavourites();