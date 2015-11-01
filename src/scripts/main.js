(function ($) {
  var SYMBOL_ENDPOINT = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp';
  var DEFAULT_OPTIONS = {
    positiveClass: 'up',
    negativeClass: 'down'
  };
  var symbols = {};

  function getQuote (symbol) {
    return $.ajax({
      url: SYMBOL_ENDPOINT,
      data: {symbol: symbol},
      dataType: 'jsonp',
      method: 'GET'
    }).then(function (response) {
      return response;
    });
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

    // @TODO -- currently all must pass or all wil fail.
    $.when.apply($, requests).done(function (a, b, c) {
      var responses = Array.prototype.slice.call(arguments),
          symbol,
          i,
          j;

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
      console.log('err', err);
    });
  }


  function StockSymbolElement (element, symbol, options) {
    this.$element = $(element);
    this.options = $.extend({}, DEFAULT_OPTIONS, options);
    addSymbolElement(symbol, this);
    updateSymbols(symbol);
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
    this.$element.html(Math.abs(quote.Change));
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
}).call(this, jQuery);