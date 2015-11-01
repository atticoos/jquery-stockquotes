# jquery-stockquotes
![License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)
[![Build Status](http://img.shields.io/travis/ajwhite/jquery-stockquotes.svg?style=flat)](http://travis-ci.org/ajwhite/jquery-stockquotes)

## Example
```html
Tesla: <span class="stock-quote" data-symbol="TSLA"></span><br/>
Trip: <span class="stock-quote" data-symbol="TRIP"></span>
```
```js
$('.stock-quote').stockQuotes();
```
![example](https://cloud.githubusercontent.com/assets/656630/10867657/6355a748-803b-11e5-96f0-c7444c0b3f01.png)

## Installation
```
bower install jquery-stockquotes
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
