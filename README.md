# ReadMe 📚📖 
---

### Project One

**Monash University Full Stack Flex Coding Bootcamp**

**Live Version:** https://jmacr0.github.io/project_one

*- Jon, Andrew, Hiru, Mike*

---

## User Story
```
As A Reader

I Want to find good books to read

So That I can enjoy reading
```

## Project Description
The **ReadMe** Application allows users to search for books. The user is provided input areas to filter results. Inputs include:

* Keywords
* Title
* Author
* Genre

 
Once the user proceeds to search, **ReadMe** provides the following for each book result:

* Book Image
* Title
* Author
* Plot Summary

The books are displayed eight at a time, and is paginated to five pages. A total of 40 books per search. Upon executing a new search, the previous search results are cleared.

## Instructions

How to use the **ReadMe** Application:

---
1. Enter any combination of: *Keywords, Title, Author, Genre,* in the input area. Note, the more inputs, the narrower your search becomes.
---
2. To begin your search with the input, click the submit button.
---
3. Once the search has completed, the results will display at the bottom of the page
---
4. Books are displayed 8 per page, and is paginated to 5 pages, for a total of 40 books per search. User can go back and forth between pages.
---
## Features

#### Genre
The Genre dropdown starts of empty. As the user begins to search, the Genre begins to populate. This is then saved on to local storage. When the user exits the application and re-opens, the Genre will repopulate with the previous. 

#### Random

The **ReadMe** Application includes a random feature which allows the user to search for a list of random books. This works by randomly selecting a word and using the returned word as a keyword input. 

---
## Resources

**APIs**

* To retrieve book information we used Google Books API https://developers.google.com/books

* To display the current Date and Time we used Moment.js https://momentjs.com

* To simplify our Javascript we used jQuery https://jquery.com

**CSS Framework**

* To style the application we used Bulma https://bulma.io



