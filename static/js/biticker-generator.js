

$(function(){
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

  var singleTemplate = '<div class="biticker-container" data-currency="#currency#"></div>';
  var currencySelector = $('#currency-selector');
  var singleTickerCode = $('#biticker-single');
  var tickerContainer = $('#ticker-container');
  var createTickerCode = function(currency){
    return singleTemplate.replace('#currency#', currency);
  };

  var updateTickerCode = function(){
    var currency = currencySelector.val();
    var tickerCode = createTickerCode(currency);
    singleTickerCode.html(tickerCode);
    var ticker = $(tickerCode);
    tickerContainer.html(ticker);
    trigger('biticker:new-ticker-created', ticker)
  };
  updateTickerCode();
  currencySelector.change(updateTickerCode);
});

