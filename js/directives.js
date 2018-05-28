/***
GLobal Directives
***/

// Route State Load Spinner(used on page or content load)路由状态负载旋转器（用于页面或内容加载）
MetronicApp.directive('ngSpinnerBar', ['$rootScope',//ngSpinnerBar自定义指令名称
    function($rootScope) {
        return {
            link: function(scope, element, attrs) {
                // by defult hide the spinner bar
                element.addClass('hide'); // hide spinner bar by default默认情况下隐藏旋转加载棒

                // display the spinner bar whenever the route changes(the content part started loading)每当路径改变（内容部分开始加载）时显示旋转棒
                $rootScope.$on('$stateChangeStart', function() {
                    element.removeClass('hide'); // show spinner bar  
                });

                // hide the spinner bar on rounte change success(after the content loaded)
                $rootScope.$on('$stateChangeSuccess', function() {
                    element.addClass('hide'); // hide spinner bar
                    $('body').removeClass('page-on-load'); // remove page loading indicator
                    Layout.setSidebarMenuActiveLink('match'); // activate selected link in the sidebar menu

                    // auto scorll to page top
                    setTimeout(function () {
                        Metronic.scrollTop(); // scroll to the top on content load
                    }, $rootScope.settings.layout.pageAutoScrollOnLoad);                    
                });

                // handle errors
                $rootScope.$on('$stateNotFound', function() {
                    element.addClass('hide'); // hide spinner bar
                });

                // handle errors
                $rootScope.$on('$stateChangeError', function() {
                    element.addClass('hide'); // hide spinner bar
                });
            }
        };
    }
])

// Handle global LINK click处理全局链接单击
MetronicApp.directive('a',//a自定义指令名称
    function() {
        return {
            restrict: 'E',//元素名称
            //指令定义中的 link 函数，它有三个参数：scope, elem, attrs
            /*// scope – 指令的scope。在我们的例子中，指令的scope就是父controller的scope。
             //elem – 指令的jQLite(jQuery的子集)包装DOM元素。如果你在引入AngularJS之前引入了jQuery，
             // 那么这个元素就是jQuery元素，而不是jQLite元素。由于这个元素已经被jQuery/jQLite包装了，
             // 所以我们就在进行DOM操作的时候就不需要再使用 $()来进行包装。*/
            /*attr – 一个包含了指令所在元素的属性的标准化的参数对象。
            举个例子，你给一个HTML元素添加了一些属性：，那么可以在 link 函数中通过 attrs.someAttribute 来使用它。*/
            link: function(scope, elem, attrs) {
                if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                    elem.on('click', function(e) {
                        e.preventDefault(); // prevent link click for above criteria阻止元素发生默认的行为这里指a标签的默认跳转（打开新标签）事件
                    });
                }
            }
        };
    });

// Handle Dropdown Hover Plugin Integration
MetronicApp.directive('dropdownMenuHover', function () {//dropdownMenuHover自定义指令名称
  return {
    link: function (scope, elem) {
      elem.dropdownHover();
    }
  };  
});