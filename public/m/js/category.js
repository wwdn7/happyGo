window.addEventListener('load', function () {

  var letao = new Letao();
  letao.scroll();
  letao.getCategoryLeft();
  letao.getCategoryRight();
  letao.addSearchHistory();
})


var Letao = function () {

}

Letao.prototype = {

  //滚动初始化
  scroll: function () {
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  getCategoryLeft: function () {
    $.ajax({
      url: '/category/queryTopCategory',
      success: function (data) {
        var html = template('categoryLeftTmp', data)
        $('.category-left').html(html);
        $('.category-left ul li').eq(0).addClass('active');
      }
    })
  },
  getCategoryRight: function () {
    $('.category-left').on('click', 'ul li a', function () {
      // console.log($(this).parent().siblings());
      $('.category-left ul li').removeClass('active');
      $(this).parent().addClass('active');

      var id = $(this).data('id');
      // console.log(id);
      getData(id);
    });
    getData(1);

    function getData(id) {
      $.ajax({
        url: '/category/querySecondCategory',
        data: {
          'id': id
        },
        success: function (data) {
          // console.log(data);
          var html = template('categoryRightTmp', data);
          $('.category-right .mui-row').html(html);
        }
      })
    }
  },
  addSearchHistory: function () {
    $('a.fa-search').on('click', function () {
      
      var searchData = $('input[type=search]').val();
      var historyData = JSON.parse(localStorage.getItem('historyData')) || [];
      if(searchData){
        var id = 0;
        if (historyData.length == 0) {
          id = 1;
        } else {
          id = historyData[historyData.length - 1].id + 1;
        }
        var historyDataObj = {'id': id, 'searchData': searchData};
  
        historyData.push(historyDataObj);
  
        //把数组再存到本地 要先转成字符串
        localStorage.setItem('historyData',JSON.stringify(historyData));

        //最后再跳转到搜索页面
      }

        window.location.href = 'search.html';

    })
  }
}