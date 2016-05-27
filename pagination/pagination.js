function pagination(options, callback) {
    'use strict';

    var // 展示多少个页码
        pageSize = options.pageSize || 5,
        // 每页多少条
        pageLength = options.pageLength,
        // 当前页
        currentPage = parseInt(options.currentPage) || 1,
        // 总条数
        totalRecords = parseInt(options.totalRecords);
        
    var // 总页数
        totalPages = Math.ceil(totalRecords / pageLength),
        // 上一页
        prevPage = currentPage > 1 ? currentPage - 1 : currentPage,
        // 下一页
        nextPage = currentPage < totalPages ? currentPage + 1 : currentPage;
    

    var min = 1, max, pages = [];
    // 当前页码小于要显示的页码总数时，最大页码为 pageSize
    if ( currentPage <= pageSize ) {  
        // 但如果总页数小于了 pageSize, 最大页码为总页数
        max = pageSize >= totalPages ? totalPages : pageSize;
    } else {
        // 当前页码居中
        max = currentPage + Math.floor(pageSize / 2);
        if (max > totalPages) {
            max = totalPages;
        }
        min = max - pageSize + 1;    
    }

    for (; min <= max; min++) {
        pages.push(min);
    }


    var options = {
        pages: pages,
        prevPage: prevPage,
        nextPage: nextPage,
        totalPages: totalPages,
        currentPage: currentPage,
        pageLength: pageLength
    };

    if (typeof callback === 'function') {
        callback(options);    
    }

    return options;
}
















