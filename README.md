# pager
前端分页插件。依赖jQuery。

引入pager.css,pager.js
在html页面中创建一个容器元素（div）,并为其设置自定义属性 data-type='pager'.
将插件绑定在创建的容器中，即可生成分页插件。

### html
`<div class="runway-pager" data-type="pager"></div>`

### js
`$(".runway-pager").paging({
    pageNo: pageNo,        //需要选中的页码
    totalPage: totalPage,  //总页数
    totalSize: totalSize,  //数据总数
    callback: function(page) {
          //每次点击页码执行的回调函数，page为当前选中的页码数字
    }
});`
