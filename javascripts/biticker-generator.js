

(function(){
  var script = document.createElement("SCRIPT");
  script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js';
  script.type = 'text/javascript';
  var bitickerScript = document.createElement("SCRIPT");
  bitickerScript.src = 'https://raw.github.com/ronency/biticker/master/static/js/biticker.js';
  bitickerScript.type = 'text/javascript';
  document.getElementsByTagName("head")[0].appendChild(bitickerScript);
  var checkReady = function(callback) {
    if (window.jQuery) {
      callback(jQuery);
    }
    else {
      window.setTimeout(function() { checkReady(callback); }, 20);
    }
  };
  checkReady(function($) {

    function trigger(event, data) {
      $(document).trigger(event, data);
    }
    function bind(event, handler) {
      $(document).bind(event, handler);
    }

    var symbolsRepo = {SGD: '$', ZAR: 'R',
      USD: '$', AUD: '$', BRL: 'R$', CAD: '$', CNY: '¥',
      CZK: 'Kč', EUR: '€', GBP: '£', ILS: '₪', JPY: '¥',
      NOK: 'kr', NZD: '$', PLN: 'zł', RUB: 'RUB', SEK: 'kr'
    };

    var singleTemplate = '<div class="biticker-container #theme#" data-currency="#currency#"></div>';
    var jsCode = '\n<script type="text/javascript" src="https://raw.github.com/ronency/biticker/master/static/js/biticker.js"></script>';
    var currencySelector = $('#currency-selector');
    var themeSelector = $('#theme-selector');
    var singleTickerCode = $('#biticker-single');
    var tickerContainer = $('#ticker-container');
    var createTickerCode = function(currency, theme){
      return singleTemplate.replace('#currency#', currency).replace('#theme#', theme);
    };

    var generateTickerCode = function(){
      var currency = currencySelector.val();
      var theme = themeSelector.val();
      var tickerCode = createTickerCode(currency, theme);

      var installationCode = tickerCode + jsCode;
      singleTickerCode.text(installationCode);
    };
    var createTicker = function(){
      var currency = currencySelector.val();
      var theme = themeSelector.val();
      var tickerCode = createTickerCode(currency, theme);

      var ticker = $(tickerCode);
      tickerContainer.html(ticker);
      trigger('biticker:new-ticker-created', ticker)
    };
    generateTickerCode();
    createTicker();

    currencySelector.change(function(){
      generateTickerCode();
      createTicker();
    });
    themeSelector.change(function(){
      generateTickerCode();
      $('.biticker-container', tickerContainer).attr('class', 'biticker-container ' + themeSelector.val());
    });
  });
})();

