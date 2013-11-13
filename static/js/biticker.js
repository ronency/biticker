
function trigger(event, data) {
  $(document).trigger(event, data);
}
function bind(event, handler) {
  $(document).bind(event, handler);
}

$(function(){
  var fetchDataForCurrency = function(currency){
    $.ajax({
      url: 'https://api.bitcoinaverage.com/ticker/'+currency+'?v=' + Math.random(),
      type: 'GET',
      dataType: 'json',
      success: function(json){
        var data = {currency: currency, json: json};
        trigger('biticker:data-ready', data);
      }
    });
  };
  var tickers = $('div.biticker');
  tickers.each(function(){
    var ticker = $(this);
    var currency = ticker.data('currency');
    fetchDataForCurrency(currency);
    setInterval(function(){fetchDataForCurrency(currency);}, 10000);
  });


  var updateTicker = function(e, data){
    var ticker = tickers.filter('[data-currency='+data.currency+']');
    var currency = ticker.data('currency');
    var values = data.json;
    var html =  '<div>'+
                  '<span class="currency">BTC/'+currency+'</span>: ' +
                  '<span class="value">' + values.last +'</span>' +
          //      'ask: ' + values.ask + '<br />'+
          //      'bid: ' + values.bid + '<br />'+
                '</div>';
    ticker.html(html);
  };
  bind('biticker:data-ready', updateTicker);
});

