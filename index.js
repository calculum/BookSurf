const GBOOK_SEARCH_URL = 'https://www.googleapis.com/books/v1/volumes?';

function getDataFromApi(searchTerm, callback) {
  const query = {
    fields: 'items',
    key: 'AIzaSyAouaY0zJ3VYlPM-iNeww5hQaUWEPAfOYM',
    q: `${searchTerm}, [subject, inauthor]`,
    filter:['partial , ebooks, paid-ebooks'],
    printType:['books'],
    orderBy: ['relevance'],
    maxResults: 28,
  }
  $.getJSON(GBOOK_SEARCH_URL, query, callback);
}

function renderResult(result) {
  // console.log(result.volumeInfo.imageLinks.thumbnail);

    return `
    <a href="${result.volumeInfo.infoLink}" target= blank id="card-link">
      <div class="flex-container">
        <div class="col-3">
          <img src="${result.volumeInfo.imageLinks ? result.volumeInfo.imageLinks.thumbnail : ''}" alt="Book thumbnail image" id="card-img">
          <div class="js-book-title" title="${result.volumeInfo.title}">${result.volumeInfo.title}</div>
          <div class="js-book-author" title="${result.volumeInfo.authors}">${result.volumeInfo.authors ? result.volumeInfo.authors : 'Author name not available.'}</div>
        </div>
      </div>
    </a>
    `
}

function displayBookSearchData(data) {
  const bookList = [];
//Iterate book information from API
  for (let i = 0; i < data.items.length; i++) {
      bookList.push(renderResult(data.items[i]));
  }

  $('.js-search-results').html(bookList);
}

function logoAnimation() {
  var logo = $('#mainLogo');
  setTimeout(function () {
    logo.html("B");
  },400);
  setTimeout(function () {
    logo.html("Bo");
  },600);
  setTimeout(function () {
    logo.html("Boo");
  },800);
  setTimeout(function () {
    logo.html("Book");
  },1000);
  setTimeout(function () {
    logo.html("BookS");
  },1200);
  setTimeout(function () {
    logo.html("BookSu");
  },1400);
  setTimeout(function () {
    logo.html("BookSur");
  },1600);
  setTimeout(function () {
    logo.html("BookSurf");
  },1800);
  setTimeout(function () {
    $('.js-search-form').show();
  },2200);
};

function watchSubmit() {
  $('.js-search-form').submit(
        function (event) {
            event.preventDefault();
            const query = $('.js-query').val();
            const queryClr = $(event.currentTarget).find(".js-query")
            getDataFromApi(query, displayBookSearchData);
            queryClr.val("");
        });
        
}
$(logoAnimation);
$(watchSubmit);
