import 'whatwg-fetch';

const apiKey = "ad1fdbb0dcebf0d1cf8ffbfd5c0eb777";
const baseUrl = "https://api.themoviedb.org/3";

let movieRow = {
  movieDatabase: function(search) {
    let databaseUrl = baseUrl + '/search/movie?api_key=' + apiKey + '&query=' + search;
    return fetch(databaseUrl)
    .then(function(element) { 
        return element.json();
    });
  }
}
export default movieRow;


