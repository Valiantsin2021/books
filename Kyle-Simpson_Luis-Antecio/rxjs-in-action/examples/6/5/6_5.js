/**
 *  RxJS in Action
 *  Listing 6.5, 6.6, and 6.7
 *  @author Paul Daniels
 *  @author Luis Atencio
 */

 const API = 'https://api-ssl.bitly.com';
 const LOGIN = 'o_5l52m15f2e';
 const KEY = 'R_9413bdcbaf224aaa924e7169bd7e5950';

 const GAPI = 'https://www.googleapis.com/urlshortener/v1/url';
 const GKEY = 'AIzaSyCHECv88DaOLkMmeMKgZyAiDvQshrjgMs8';
 
 const example_url = 'https://www.manning.com/books/rxjs-in-action';

 // many APIs still use callbacks. Callback based APIs can be adapted to RxJS with bindCallback (analogous to fromPromise)
 // Rx.Observable.bindCallback(callbackFn)
 

 const getJSONAsObservable = Rx.Observable.bindCallback($.getJSON);

 const bitly$ = url => Rx.Observable.of(url)
    .filter(R.compose(R.not, R.isEmpty))
    .map(encodeURIComponent) // native function to encode a string as URI
    .map(encodedUrl => `${API}/v3/shorten?longUrl=${encodedUrl}&login=${LOGIN}&apiKey=${KEY}`) // build API path
    .switchMap(url => getJSONAsObservable(url).map(R.head)) // switchMap() cancels the first steram .of(url) when a new one starts emitting
    .filter(obj => obj.status_code === 200 && obj.status_txt === 'OK')
    .pluck('data', 'url');

 const gAPILoadAsObservable = Rx.Observable.bindCallback(gapi.load);

  const goog$ = url => Rx.Observable.of(url)
    .filter(R.compose(R.not, R.isEmpty))
    .switchMap(
      encodedUri => gAPILoadAsObservable('client') // loads the client library
        .do(() => gapi.client.setApiKey(GKEY)) // pass the api key
        .switchMap(() => Rx.Observable.fromPromise(gapi.client.load('urlshortener', 'v1'))) // load the url shortener API
        .switchMap(() => Rx.Observable.fromPromise( // shortens the url and inserts it into your personal list of urls
          gapi.client.urlshortener.url.insert({'longUrl': encodedUri}))
        )
    )
    .filter(obj => obj.status === 200)
    .pluck('result', 'id');


 const urlField = document.querySelector('#url');

 const isUrl = str => {
   var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
   '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
   '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
   '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
   '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
   '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
   return pattern.test(str);
 };

 const url$ = Rx.Observable.fromEvent(urlField, 'blur')
    .pluck('target', 'value')
    .filter(isUrl)
    .switchMap(input =>
          Rx.Observable.combineLatest(bitly$(input), goog$(input), (b, g) => b.length > g.length ? b : g))
 //    .subscribe(([bitly, goog]) => {
 //      console.log(`From Bitly: ${bitly}`);
 //      console.log(`From Google: ${goog}`)
 //   });

     .subscribe(shortUrl => {
      console.log(`The shorter URL is: ${shortUrl}`);
   });
