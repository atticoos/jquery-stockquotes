# jquery-stockquotes
![License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)
[![Build Status](http://img.shields.io/travis/ajwhite/jquery-stockquotes.svg?style=flat)](http://travis-ci.org/ajwhite/jquery-stockquotes)

![jquery-stockquotes](https://cloud.githubusercontent.com/assets/656630/10867761/357dbdcc-8042-11e5-9c35-6c560a6c4d9d.png)


## Usage
```html
Twitter:  <span class="stock-quote" data-symbol="TWTR"></span>
Facebook: <span class="stock-quote" data-symbol="FB"></span>
Google:   <span class="stock-quote" data-symbol="GOOGL"></span>
Netflix:  <span class="stock-quote" data-symbol="NTFLX"></span>
Yahoo:    <span class="stock-quote" data-symbol="YHOO"></span>
```
```js
$('.stock-quote').stockQuotes();
```

## Installation
Add the package via bower
```
bower install jquery-stockquotes --save
```
Link the resources
```html
<link rel="stylesheet" type="text/css" href="/bower_components/jquery-stockquotes/dist/jquery.stockquotes.css" />
<script type="text/javascript" src="/bower_components/jquery-stockquotes/dist/jquery.stockquotes.js"></script>
```

## Options
```js
$('.stock-quote').stockQuotes({
  changeClass: 'change', // css class for change arrow
  quoteClass: 'quote', // css class for quote
  precision: 2, // decimal precision of change
  includeSymbol: true // if the symbol should be added to the output
});
```


### Todo
- [ ] configure additional display items (mkt cap, etc)
- [ ] explore another API, as the current on rate-limits
- [ ] unit tests
