var aqiData = [
  ["北京", 90],
  ["上海", 50],
  ["福州", 10],
  ["广州", 50],
  ["成都", 90],
  ["西安", 100]
];

  var validData = aqiData.filter(function(item){
    if (item[1]>60) {
      return true;
    } else {
      return false;
    };
  });

  function compare(a,b){
    return b[1]-a[1];
  };

  validData.sort(compare);
    //通过查询将阿拉伯数字转换为中文的数字
    var number = ["一","二","三","四","五","六"];

    var ul = document.getElementById("aqi-list");
    //用文档片段减少频繁向文档添加内容
    var fragment = document.createDocumentFragment();
      //通过循环创建li并添加到文档片段
    for(var i=0; i<validData.length; i++){

      var li = document.createElement("li");
      var item = document.createTextNode("第"+number[i]+"名："+validData[i][0]+"--"+validData[i][1]);
      li.appendChild(item); 
      fragment.appendChild(li);
    };
//最后将文档片段一次性添加到列表中
    ul.appendChild(fragment);