(function(global) {
    var tabSelector = '.zytab-nav',
        contentSelector = '.zytab-content',
        dataTabIndex = 'tab-index',
        activeTabClass = 'zytab-nav-active',
        defOptions = {
            event: 'click',
            lastIndex: 0,
            defIndex: 0
        };

    function ZYTab(options) {
        var tabBox = $(options.tabBox);
        this.tabs = $(tabSelector, tabBox);
        this.contents = $(contentSelector, tabBox);
        $.extend(this, defOptions, options);
        tabBox.on(this.event, tabSelector, {context: this}, this.handler);
        this.onChange(this.defIndex);
    }

    $.extend(ZYTab.prototype, {
        handler: function(ev) {
            ev.data.context.onChange($(this).data(dataTabIndex));
        },

        onChange: function(index) {
            if (index !== this.lastIndex) {
                this.setTab(index);
                this.setContent(index);
                this.lastIndex = index;
            }
        },

        setTab: function(index) {
            this.tabs.eq(this.lastIndex).removeClass(activeTabClass);
            this.tabs.eq(index).addClass(activeTabClass);
        },

        setContent: function(index) {
            this.contents.eq(this.lastIndex).hide();
            this.contents.eq(index).show();
        }
    });

    global.ZYTab = ZYTab;
})(this);
