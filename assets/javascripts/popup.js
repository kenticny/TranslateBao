$(function() {
  var BG = chrome.extension.getBackgroundPage();

  function init() {
    $("#from").focus();
  }

  function parseResult(message) {
    var transResult = message["trans_result"];
    var showResult = "";
    if(transResult.length == 0) {
      showResult = "没有找到合适的解释";
    }
    for(var i = 0; i < transResult.length; i++) {
      showResult += transResult[i].dst + "\n";
    }
    return showResult;
  }

  function doTranslate() {
    var text = $("#from").val();
    BG.translate.quickTranslate(text, function(result) {
      $("#to").val(parseResult(result))
    });
  }

  init();
  
  $("#transform>i").click(function() {
    doTranslate();
  });
  $("#from").keypress(function(e) {
    if(e.keyCode === 13) {
      doTranslate();
    }
  })
});
