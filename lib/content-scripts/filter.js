chrome.storage.sync.get(['stupids', 'anonymity-filter'], (items) => {
  // stupid
  var stupids = items.stupids;
  var stupid_answer_number = 0;
  var anonymous_answer_number = 0;

  if (items['anonymity-filter'])
    stupids.push("匿名用户");

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

  // filters
  function modify_answer_num() {
    if (stupid_answer_number === 0 && anonymous_answer_number === 0)
      return;

    var answer_node = document.getElementById("zh-question-answer-num");
    var answer_num = answer_node.getAttribute("data-num");
    var remain_answer_number = answer_num - stupid_answer_number - anonymous_answer_number;

    var stupid_filter_result = " ";
    var anonymous_filter_result = " ";
    if (stupid_answer_number !== 0)
      stupid_filter_result = stupid_answer_number + " 个蠢货被阻挡";
    if (anonymous_answer_number !== 0)
      anonymous_filter_result = anonymous_answer_number + " 个匿名用户被阻挡";

    answer_node.innerHTML = remain_answer_number + " 个回答(" + stupid_filter_result + " " + anonymous_filter_result + " )";
  }

  function filter_answer(ele) {
    var who = ele.children[3].getAttribute("data-author-name");
    if (stupids.find((x) => x == who) && ele.parentNode){
      ele.parentNode.removeChild(ele);
      if (who != "匿名用户")
        stupid_answer_number ++;
      else
        anonymous_answer_number ++;
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

  // observer handler
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
});
