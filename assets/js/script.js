const submitBtn = $('#submitBtn');
const main = $('#main');
const displayBooks = $('#display-books');

submitBtn.on('click', test);

function test(){
    event.preventDefault();

    const ancestor = $('<div>', {class: 'tile is-ancestor is-gapless'});
    const parent = $('<div>', {class: 'tile is-parent is-3'});
    const child = $('<div>', {class: 'title is-child card'});
    const cardImage = $('<div>', {class: 'card-image'});
    const figure = $('<figure>', {class: 'image is-4by3'});
    const image = $('<img>');
    const cardContent = $('<card-content>');
    const title = $('<h3>');
    const content = $('<div>');

    displayBooks.append(ancestor);
    
    // <div class="tile is-ancestor is-gapless">
    //         <div class="tile is-parent is-3">
    //             <div class="tile is-child card">
    //                 <div class="card-image">
    //                     <figure class="image is-4by3"><img src="https://bulma.io/images/placeholders/1280x960.png"
    //                             alt=""></figure>
    //                 </div>
    //                 <div class="card-content">
    //                     <h3>Title of Book</h3>
    //                 </div>
    //                 <div class="content">
    //                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate tempore nesciunt saepe
    //                     sapiente veniam beatae enim sed ullam suscipit ea quaerat, esse tenetur eius laboriosam.
    //                     Exercitationem, nostrum reiciendis! Ratione, animi?
    //                 </div>
    //             </div>
    //         </div>


}