// stupid
var stupid = ["陈玲玲", "ZJ Ye", "龙少", "彼岸小棠", "大海", "望息", "黄轶轩", "蛟羽", "behow", "罗小鼎", "赵一凡", "嘎巴贴", "陈虹", "米兰鸭子", "李尚泽", "王义德", "離娮", "马鑫", "侯铁", "doriko", "范遥", "邢汉语", "煙花释", "Lyn Misery", "ZJ Ye", "沈少Neo", "楚莫敖", "君莫笑", "不想说不知道", "冯路", "Sunny", "宫本刀", "李鼎", "庸人·沈在河", "木吉啦", "贾敬贤", "Zu Zwei", "蔡小帅", "莎朗班多", "杰克斯派瑞特", "任飞", "瓜子", "方律师", "战忽局特工", "胡若得", "messy messy", "哈皮", "郭小闲", "苏书", "sn su", "啊哈", "爱丽的好爸爸", "曾胖"];

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
  if (stupid.find((x) => x == who) && ele.parentNode){
    ele.parentNode.removeChild(ele);
    stupid_answer_number ++;
    return true;
  }
  return false;
}

function filter_comment(ele) {
  var children = ele.children;
  // filter reply
  if (stupid.find((x) => x == children[0].innerHTML)){
    ele.parentNode.parentNode.parentNode.removeChild(ele.parentNode.parentNode);
    return true;
  }
  if (children.length == 4 && stupid.find((x) => x == children[3].innerHTML)) {
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
