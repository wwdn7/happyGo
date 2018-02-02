var letao;
$(function () {
  letao = new Letao();
  letao.addSearchHistory();
  letao.queryHistory();
  letao.deleteHistory();
  letao.clearHistory();
});

function Letao() {

};

Letao.prototype = {
  addSearchHistory: function () {
    $('.btn-search').on('click', function () {
      var searchData = $('.search-input input').val();
      var historyData = JSON.parse(localStorage.getItem('historyData')) || [];

      //如果没填输入内容就提示输入
      if (!searchData) {
        mui.toast('请输入搜索内容', {
          duration: 'long',
          type: 'div'
        });
        return;
      }
      //如果搜索历史为空 就存储到本地
      var id = 0;
      if (historyData.length == 0) {
        id = 1;
      } else {
        id = historyData[historyData.length - 1].id + 1;
      }
      var historyDataObj = {
        'id': id,
        'searchData': searchData
      };

      historyData.push(historyDataObj);

      //把数组再存到本地 要先转成字符串
      localStorage.setItem('historyData', JSON.stringify(historyData));

      //最后重新渲染数据
      letao.queryHistory();

      //清空input
      $('.search-input input').val('');

    })
  },
  queryHistory: function () {
    var historyData = JSON.parse(localStorage.getItem('historyData')) || [];
    console.log(historyData);
    
    // console.log(historyData);
    historyData = historyData.reverse();
    //模板引擎需要的数据 转成一个对象
    //模板引擎渲染
    var html = template('searchHistoryTmp', {
      rows: historyData
    });
    $('.search-history-body').html(html);

  },
  deleteHistory: function () {
    $('.search-history-body').on('click', '.icon_delete', function () {
      var id = $(this).parent().data('id');
      var historyData = JSON.parse(localStorage.getItem('historyData')) || [];
      //遍历数组 删除当前id的元素

      for (var i = 0; i < historyData.length; i++) {
        if (historyData[i].id == id) {
          historyData.splice(i, 1);
        }
      }
      //重新再把数组存到本地
      localStorage.setItem('historyData', JSON.stringify(historyData));

      //重新渲染页面

      letao.queryHistory();

    })
  },
  clearHistory: function () {
    $('.clear-history').on('click', function () {
      localStorage.removeItem('historyData');
      letao.queryHistory();
    })
  }
}