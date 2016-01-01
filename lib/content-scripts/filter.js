// stupid
var stupids = [];

chrome.storage.sync.get('stupids', (item) => {
  stupids = item.stupids;
  outer_filter(stupids);
});

outer_filter =  function(stupids) {

  var stupid_answer_number = 0;
  // filters

  function modify_answer_num() {
    if (stupid_answer_number === 0)
      return;

    var answer_node = document.getElementById("zh-question-answer-num");
    var answer_num = answer_node.getAttribute("data-num");
    answer_node.innerHTML = (answer_num - stupid_answer_number) + " 个回答（" + stupid_answer_number + " 个蠢货被屏蔽）";
  }

  function filter_answer(ele) {
    var who = ele.children[3].getAttribute("data-author-name");
    if (stupids.find((x) => x == who) && ele.parentNode){
      ele.parentNode.removeChild(ele);
      stupid_answer_number ++;
      return true;
    }
    return false;
  }

  function filter_comment(ele) {
    var children = ele.children;
    // filter reply
    if (stupids.find((x) => x == children[0].innerHTML)){
      ele.parentNode.parentNode.parentNode.removeChild(ele.parentNode.parentNode);
      return true;
    }
    if (children.length == 4 && stupids.find((x) => x == children[3].innerHTML)) {
      ele.parentNode.parentNode.parentNode.removeChild(ele.parentNode.parentNode);
      return true;
    }
    return false;
  }

  // at the first load

  var answers = document.getElementsByClassName("zm-item-answer");
  for (var i = 0; i < answers.length; i++) {
    if (filter_answer(answers[i]))
      i--;
  }
  modify_answer_num();

  // add listener to the DOM change

  var observer = new MutationSummary({
    callback: filter_handler,
    rootNode: document,
    observeOwnChanges: false,
    queries: [{
      element: "div.zm-item-answer"
    }, {
      element: "div.zm-comment-hd"
    }]
  });

  function filter_handler(summaries) {
    var answers = summaries[0];
    var comments = summaries[1];

    // filter answers
    stupid_answer_number = 0;
    answers.added.forEach((ele) => filter_answer(ele));
    modify_answer_num();

    // filter comments
    comments.added.forEach((ele) => {
      filter_comment(ele);
    });
  }

};
