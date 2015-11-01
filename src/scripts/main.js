(function ($) {
  var SYMBOL_ENDPOINT = 'http://dev.markitondemand.com/Api/v2/Quote/json';

  var symbols = {};

  function getQuote (symbol) {
    return $.ajax({
      url: SYMBOL_ENDPOINT,
      data: {symbol: symbol},
      method: 'GET'
    };
  }

  function addSymbolElement (symbol, element) {
    if (!(symbol in symbols)) {
      symbols[symbol] = [];
    }
    symbols[symbol].push(element);
  }

  function updateSymbols () {
    var requests = [],
        symbol;
    for (symbol in symbols) {
      requests.push(getQuote(symbol));
    }

    $.when.apply($, requests).done(function (a, b, c) {
      console.log('a', a);
      console.log('b', b);
    });
  }


  function StockSymbolElement (element, symbol, options) {
    addSymbolElement(symbol, this);
  }

  $.fn.stockQuote = function (options) {
    return this.each(function () {
      var symbol = $(this).attr('data-symbol');
      $(this).data('stockquote', new StockSymbolElement(this, symbol, options));
    });
  };
}).call(this, jQuery);
