/**
 *  RxJS in Action
 *  Listing 5.3
 *  Note: make sure you have turned on CORS sharing in your browser so that you can make
 *  cross-site requests
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
const searchBox = document.querySelector('#search'); //-> <input>
const results = document.querySelector('#results');  //-> <ul>
const count = document.querySelector('#count');  //-> <ul>

const notEmpty = input => !!input && input.trim().length > 0;

// Proxy around CORS -> https://en.wikipedia.org wikipedia's API url
const URL = '/external/wikipedia/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=';

const search$ = Rx.Observable.fromEvent(searchBox, 'keyup')
  .pluck('target', 'value')
  .debounceTime(500)
  .filter(notEmpty)
  .do(term => console.log(`Searching with term ${term}`))
  .map(query => URL + query)
  // mapping an observable-returning function, flattenning and merging it into the source observable
  .mergeMap(query => Rx.Observable.ajax(query)
    .pluck('response', 'query', 'search')
    .defaultIfEmpty([])) // if the result of the request is an empty object, convert to an empty array
  .map(R.map(R.prop('title'))) // extract all title properties resulting from the response array
  .do(arr => count.innerHTML = `${arr.length} results`)
  .subscribe(arr => {
    clearResults(results);
    appendResults(arr, results);
  });


function clearResults(container) {
  while (container.childElementCount > 0) {
    container.removeChild(container.firstChild);
  }
}

function appendResults(results, container) {
  for (let result of results) {
    let li = document.createElement('li');
    let text = document.createTextNode(result);
    li.appendChild(text);
    container.appendChild(li);
  }
}
