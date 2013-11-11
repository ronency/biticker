
var dataCenter = {};
function trigger(event, data) {
  $(document).trigger(event, data);
}
function bind(event, handler) {
  $(document).bind(event, handler);
}

$(function(){
  var fetchData = function(){
    $.ajax({
      url: 'https://api.bitcoinaverage.com/no-mtgox/all?v=' + Math.random(),
      type: 'GET',
      dataType: 'json',
      success: function(json){
        dataCenter = json;
        trigger('biticker:data-ready');
        setTimeout(fetchData, 10000);
      },
      error: function(){
        setTimeout(fetchData, 1000);
      }
    });
  };
  var ticker = $('#ticker');
  var createCurrenciesList = function(){
    var currenciesList = ticker.data('currencies').split(',');
    ticker.html('');
    $.each(currenciesList, function(i, currency){
      var data = dataCenter[currency].averages;
      var container = $('<div />');

      container.appendTo(ticker)
        .append('<b>'+currency+'</b><br />')
        .append('ask: ' + data.ask + '<br />')
        .append('bid: ' + data.bid + '<br />')
        .append('last: ' + data.last + '<br />');
    });
  };
  bind('biticker:data-ready', createCurrenciesList);

  fetchData();
});