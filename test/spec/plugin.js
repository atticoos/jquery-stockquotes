var jsdom = require('jsdom');
var expect = require('chai').expect;

describe('jquery.stockquotes', function () {
  var window =  jsdom.jsdom('<html><head><script></script></head><body></body></html>').defaultView,
      $ = global.jQuery = require('jquery')(window),
      element;

  // load the plugin, which will bind to jQuery
  require('../../src/stockquotes.js');

  beforeEach(function () {
    element = $('<span class="stock-quote" data-symbol="TWTR"></span>');
  });
  it ('should generate the intial child elements', function () {
    element.stockQuote();
    expect(element.find('span.change').length).to.be.eql(1);
    expect(element.find('span.quote').length).to.be.eql(1);
  });
  it ('should dispaly the symbol by default', function () {
    element.stockQuote();
    expect(element.text().trim()).to.be.eql('TWTR');
  });
});
