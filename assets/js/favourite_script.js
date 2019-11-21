const FAVOURITE_KEY = 'favourite';
const localStorageFavouriteArray = localStorage.getItem(FAVOURITE_KEY);



$("#favourite-book-to-clone").on('click', function () {
    event.preventDefault();
    const target = $(event.target);
    if (target.hasClass('far')) {

        console.log('deleted');
        const arr = JSON.parse(localStorageFavouriteArray);
        var name = $(this).find(".book-title").text();


        const { length } = arr;
        console.log(length)
        const id = length + 1;
        const found = arr.some(el => el.title === name);
        console.log(found)
        if (found) { }


        // const title = $(this).find(".book-title").text();
        // const author = $(this).find(".book-author").text();
        // const imageSrc = $(this).find(".book-image").attr("src");
        // const plotSummary = $(this).find(".book-content").text();
        // const localStorageFavouriteArray = localStorage.getItem(FAVOURITE_KEY);
        // const favouriteArray = localStorageFavouriteArray ? JSON.parse(localStorageFavouriteArray) : [];

        // favouriteArray.push({
        //     title,
        //     author,
        //     imageSrc,
        //     plotSummary,
        // });

        // localStorage.setItem(FAVOURITE_KEY, JSON.stringify(favouriteArray));
    }
})



if (localStorageFavouriteArray) {
    const favouriteArray = JSON.parse(localStorageFavouriteArray);
    $('#favourites-count').text(favouriteArray.length);

    const ancestor = $('<div>', { class: 'tile is-ancestor is-gapless' });
    for (const favourite of favouriteArray) {

        const clonedFavourite = $("#favourite-book-to-clone").clone(true);
        clonedFavourite.removeAttr('id');
        clonedFavourite.find("img").attr("src", favourite.imageSrc);
        clonedFavourite.find(".book-title").text(favourite.title);
        clonedFavourite.find(".book-author").text(favourite.author);
        clonedFavourite.find(".book-content").text(favourite.plotSummary);
        clonedFavourite.find(".book-content").attr("style", "height: 150px; overflow: scroll; padding: 0.5em;")

        ancestor.append(clonedFavourite);
    }
    $("#favourites-container").append(ancestor);
}