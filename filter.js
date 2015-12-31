var observer = new MutationSummary({
  callback: filter,
  rootNode: document,
  observeOwnChanges: false,
  queries: [{
    element: "div.zm-item-answer"
  }]
});

function filter(summaries) {
  var summary = summaries[0];

  summary.added.forEach(function(ele){
    if (ele.parentNode)
      ele.parentNode.removeChild(ele);
  });

}


var element = document.getElementById("zh-question-answer-wrap");
element.innerHTML = "";
