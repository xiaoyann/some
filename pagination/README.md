# pagination
简单，实用。

### 用法
一、直接给个回调，爱干嘛干嘛

```javascript
pagination({
    // 总条数
    totalRecords: 100,
    // 当前页
    currentPage: 7,
    // 每页多少条
    pageLength: 10,
    // 显示多少个页码
    pageSize: 5

}, function(options) {
    var html = [], page;
    for (var i = 0, l = options.pages.length; i < l; i++) {
        page = options.pages[i];
        if (page === options.currentPage) {
            html.push('<a class="current" href="#page='+ page +'">'+ page +'</a>');
        } else {
            html.push('<a href="#page='+ page +'">'+ page +'</a>');
        }
    }
    html.unshift('<a href="#page='+ options.prevPage +'"><</a>');
    html.push('<a href="#page='+ options.nextPage +'">></a>');
    document.getElementById('js-pagination').innerHTML = html.join('');
});

```
二、封装一下

```javascript
function paging(element, options) {
    var data = pagination(options), html = [], page;

    for (var i = 0, l = data.pages.length; i < l; i++) {
        page = data.pages[i];
        if (page === data.currentPage) {
            html.push('<a class="current" href="#page='+ page +'">'+ page +'</a>');
        } else {
            html.push('<a href="#page='+ page +'">'+ page +'</a>');
        }
    }

    html.unshift('<a href="#page='+ data.prevPage +'"><</a>');
    html.push('<a href="#page='+ data.nextPage +'">></a>');
    
    element.innerHTML = html.join('');
}

paging(document.getElementById('js-pagination'), {
    // 总条数
    totalRecords: 100,
    // 当前页
    currentPage: 7,
    // 每页多少条
    pageLength: 10,
    // 显示多少个页码
    pageSize: 5
});

```






