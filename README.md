## ZYTab
依赖jQuery，支持CMD、AMD。每个Tab使用`data-zt`属性指定对应的内容，对应关系非常明确。

### 基本用法
Tab 通过`data-zt`指定对应内容的选择器
```html
<ul class="zytab-nav-box">
	<li class="zt-nav zt-active" data-zt=".zt-bd-c1">TAB 1</li>
	<li class="zt-nav" data-zt=".zt-bd-c2">TAB 2</li>
</ul>
<div class="content">
	<div class="c c1 show zt-bd-c1">Content 1</div>
	<div class="c c2 zt-bd-c2">Content 2</div>
</div>
```


```javascript
new ZYTab({
    // Tab选择器，必须
    selector: '.zt-nav',
    // 默认Tab，可选，默认为第一个
    defTab: '.zt-bd-c2',
    // 事件类型，可选，默认为 click
    event: 'mouseover',
    // Tab选中后的样式，可选，默认为 zt-active
    activeClass: 'zt-active',
    // 该方法默认为切换选中的Tab的样式，可根据需求重写
    setTab: function() {
        this.yourFunction();
    },
    // 该方法默认为显示选中的Tab内容，可根据需求重写
    setBody: function() {},
    // 可以直接这样扩展自定义方法，上下文为当前新建的对象
    yourFunction: function() {}
});

```
