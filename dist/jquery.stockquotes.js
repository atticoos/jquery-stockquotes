(function ($) {
  'use strict';

  var SYMBOL_ENDPOINT = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp';
  var PENDING_QUOTE_DELAY = 200;
  var DEFAULT_OPTIONS = {
    positiveClass: 'up',
    negativeClass: 'down',
    changeClass: 'change',
    quoteClass: 'quote',
    precision: 2,
    includeSymbol: true
  };
  var symbols = {};
  var pendingQuoteRequest;

  /**
   * Adds a symbol to track
   */
  function addSymbolElement (symbol, element) {
    if (!(symbol in symbols)) {
      symbols[symbol] = [];
    }
    symbols[symbol].push(element);

    // delay looking up the symbol to avoid duplicating requests as more symbols become added
    if (pendingQuoteRequest) {
      clearTimeout(pendingQuoteRequest);
    }
    pendingQuoteRequest = setTimeout(updateSymbols, PENDING_QUOTE_DELAY);
  }

  /**
   * Remotely fetchins a stock quote
   */
  function getQuote (symbol) {
    return $.ajax({
      url: SYMBOL_ENDPOINT,
      data: {symbol: symbol},
      dataType: 'jsonp',
      method: 'GET'
    }).then(function (response) {
      // return only the response
      // otherwise 3 arugments are provided to `.done` and will cause issues when dynamically mapping
      // multiple requests to responses
      return response;
    });
  }

  /**
   * Fetches all the symbol quotes and update the corresponding elements
   */
  function updateSymbols () {
    var requests = [],
        symbol;

    // fetch each quote and store the promise
    for (symbol in symbols) {
      requests.push(getQuote(symbol));
    }

    // resolve all pending promises
    // @TODO -- currently all must pass or all wil fail.
    $.when.apply($, requests).done(function () {
      // derive all the promise resolves
      var responses = Array.prototype.slice.call(arguments),
          symbol,
          i,
          j;

      // go through every resolve and update the corresponding symbol elements
      for (i = 0; i < responses.length; i++) {
        for (symbol in symbols) {
          if (responses[i].Symbol === symbol) {
            for (j = 0; j < symbols[symbol].length; j++) {
              symbols[symbol][j].updateQuote(responses[i]);
            }
          }
        }
      }
    }).fail(function (err) {
      // @TODO handle error
      console.log('err', err);
    });
  }

  function StockSymbolElement (element, symbol, options) {
    this.options = $.extend({}, DEFAULT_OPTIONS, options);
    this.$element = $(element);
    if (this.options.includeSymbol) {
      this.$element.append(symbol);
    }
    this.$element.append(' ');
    this.$change = $('<span />').addClass(this.options.changeClass);
    this.$quote = $('<span />').addClass(this.options.quoteClass);
    this.$element.append(this.$change);
    this.$element.append(this.$quote);
    addSymbolElement(symbol, this);
  }

  StockSymbolElement.prototype.updateQuote = function (quote) {
    this.$element
      .removeClass(this.options.positiveClass)
      .removeClass(this.options.negativeClass);

    if (quote.Change > 0) {
      this.$element.addClass(this.options.positiveClass);
    } else if (quote.Change < 0) {
      this.$element.addClass(this.options.negativeClass);
    }
    this.$quote.html(Math.abs(quote.Change).toFixed(this.options.precision));
  };

  $.fn.stockQuote = function (options) {
    options = $.isPlainObject(options) ? options : {};
    return this.each(function () {
      var symbol = $(this).attr('data-symbol');
      if (symbol) {
        symbol = symbol.toUpperCase().trim();
        $(this).data('stockquote', new StockSymbolElement(this, symbol, options));
      }
    });
  };
})(jQuery);
