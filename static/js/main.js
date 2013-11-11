
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
      var html = '<div>'+
                   '<b>'+currency+'</b><br />'+
                   'ask: ' + data.ask + '<br />'+
                   'bid: ' + data.bid + '<br />'+
                   'last: ' + data.last+
                 '</div>';
      ticker.append(html);
    });
  };
  bind('biticker:data-ready', createCurrenciesList);

  fetchData();
});