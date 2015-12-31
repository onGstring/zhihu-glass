// stupid
var stupid = ["陈玲玲", "ZJ Ye", "龙少", "彼岸小棠", "大海", "望息", "黄轶轩", "蛟羽", "behow", "罗小鼎", "赵一凡", "嘎巴贴", "陈虹", "米兰鸭子", "李尚泽", "王义德", "離娮", "马鑫", "侯铁", "doriko", "范遥", "邢汉语", "煙花释", "Lyn Misery", "ZJ Ye", "沈少Neo", "楚莫敖", "君莫笑", "不想说不知道", "冯路", "Sunny", "宫本刀", "李鼎", "庸人·沈在河", "木吉啦", "贾敬贤", "Zu Zwei", "蔡小帅", "莎朗班多", "杰克斯派瑞特", "任飞", "瓜子", "方律师", "战忽局特工", "胡若得", "messy messy", "哈皮"];

var stupid_answer_number = 0;

// filters

function modify_answer_num() {
  if (stupid_answer_number === 0)
    return;

  var answer_node = document.getElementById("zh-question-answer-num");
  var answer_num = answer_node.getAttribute("data-num");
  answer_node.innerHTML = (answer_num - stupid_answer_number) + " 个回答（" + stupid_answer_number + " 个蠢人被屏蔽）";
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

// at the first load

var elements = document.getElementsByClassName("zm-item-answer");
for (var i = 0; i < elements.length; i++) {
  var ele = elements[i];
  if (filter_answer(ele))
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
  }]
});

function filter_handler(summaries) {
  var summary = summaries[0];
  stupid_answer_number = 0;
  summary.added.forEach(filter_answer(ele));
  modify_answer_num();
}
