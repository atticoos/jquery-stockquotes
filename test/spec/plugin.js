var jsdom = require('jsdom');
var expect = require('chai').expect;

describe('jquery.stockquotes', function () {
  var window =  jsdom.jsdom().defaultView,
      $ = global.jQuery = require('jquery')(window),
      element;

  // load the plugin, which will bind to jQuery
  require('../../src/stockquotes.js');

  beforeEach(function () {
    element = $('<span class="stock-quote" data-symbol="TWTR"></span>');
  });
  it ('should support the pluralization form of the plign name', function () {
    expect(element.stockQuote).to.be.eql(element.stockQuotes);
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
  it ('should display the symbol as uppercase', function () {
    element = $('<span class="stock-quote" data-symbol="twtr"></span>');
    element.stockQuote();
    expect(element.text().trim()).to.be.eql('TWTR');
  });

  describe('options', function () {
    describe('includeSymbol', function () {
      it ('should not display the symbol if `false`', function () {
        element.stockQuote({
          includeSymbol: false
        });
        expect(element.text().trim()).to.be.eql('');
      });
    });
    describe('changeClass', function () {
      it ('should use the supplied class for the change element', function () {
        element.stockQuote({
          changeClass: 'foobar'
        });
        expect(element.children().first().hasClass('foobar')).to.be.eql(true);
      });
    });
    describe('quoteClass', function () {
      it ('should use the supplied class for the quote element', function () {
        element.stockQuote({
          quoteClass: 'foobar'
        });
        expect(element.children().last().hasClass('foobar')).to.be.eql(true);
      });
    });
  });
});
