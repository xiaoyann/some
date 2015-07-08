;(function(global, factory) {
    if (typeof module !== 'undefined' && module.exports !== undefined) {
        var $ = require('jquery');
        module.exports = factory($);

    } else if (typeof define === 'function' && define.amd) {
        define(['jquery'], function($) {
            return factory($);
        });
        
    } else {
        global.ZYTab = factory(global.jQuery || global.Zepto || global.$);    
    }
})(this, function($) {
    var tabDataName = 'zt',
        defOptions = {
            lastTab: '',
            defTab: '',
            event: 'click',
            activeClass: 'zt-active'
        };

    function ZYTab(options) {
        this.tabs = {};
        this.bodies = {};

        $.extend(this, defOptions, options);

        $(options.selector).each($.proxy(
            function(k, el) {
                var $el = $(el), 
                    s = $el.data(tabDataName),
                    k = createKey(s);

                if (this.defTab === '') {
                    this.defTab = k;
                }

                this.tabs[k] = $el;
                this.bodies[k] = $(s);
            }

        , this)).parent().on(
            this.event, 
            this.selector, 
            {context: this}, 
            this.handler
        );

        this.whenChange(this.defTab);
    }

    ZYTab.prototype = {
        constructor: ZYTab,

        handler: function(ev) {
            ev.data.context.whenChange($(this).data(tabDataName));
        },

        whenChange: function(curTab) {
            var lastTab = createKey(this.lastTab);
            curTab = createKey(curTab);
            if (curTab !== this.lastTab) {
                this.setTab(curTab, lastTab);
                this.setBody(curTab, lastTab);
                this.lastTab = curTab;
            }
        },

        setTab: function(curTab, lastTab) {
            lastTab = this.tabs[lastTab];
            curTab = this.tabs[curTab];
            if (lastTab) {
                lastTab.removeClass(this.activeClass);
            }
            if (curTab) {
                curTab.addClass(this.activeClass);
            }
        },

        setBody: function(curTab, lastTab) {
            lastTab = this.bodies[lastTab];
            curTab = this.bodies[curTab];
            if (lastTab) {
                lastTab.hide();    
            }
            if (curTab) {
                curTab.show();    
            }
        }
    };

    function createKey(s) {
        return s.replace(/[\s-#\.\[\]]+/g, '');
    }

    return ZYTab;
});







