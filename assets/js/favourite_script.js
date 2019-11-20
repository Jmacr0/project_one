const FAVOURITE_KEY = 'favourite';

$(document).ready(function () {
    const localStorageFavouriteArray = localStorage.getItem(FAVOURITE_KEY);

    if (localStorageFavouriteArray) {
        const favouriteArray = JSON.parse(localStorageFavouriteArray);

        for (const favourite of favouriteArray) {
            const clonedFavourite = $("#favourite-book-to-clone").clone();

            clonedFavourite.find("img").attr("src", favourite.imageSrc);
            clonedFavourite.find(".title").text(favourite.title);

            $("#favourites-container").append(clonedFavourite);
        }
    }
});

