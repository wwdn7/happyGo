window.addEventListener('load', function () {

  var letao = new Letao();
  letao.scroll();
  letao.getCategoryLeft();
})


var Letao = function () {


}

Letao.prototype = {

  //滚动初始化
  scroll: function(){
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  getCategoryLeft: function(){
    $.ajax({
      url: "/category/queryTopCategory",
      success: function (data) {
        console.log(data);
        
      }
    })
  },
  getCategoryRight: function () {
    //  $("category")
  }

}