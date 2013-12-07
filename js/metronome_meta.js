(function() {
  var htmlSourceCode;

  MetronomeApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/metronome/about', {
      templateUrl: '/metronome/tmpl/about.html',
      controller: AboutCtrl
    }).when('/metronome/show-html', {
      templateUrl: '/metronome/tmpl/show-html.html',
      controller: ShowHtmlCtrl
    }).when('/metronome/show-js', {
      templateUrl: '/metronome/tmpl/show-js.html',
      controller: ShowJsCtrl
    }).when('/metronome/show-css', {
      templateUrl: '/metronome/tmpl/show-css.html',
      controller: ShowCssCtrl
    });
    
    $locationProvider.html5Mode(true);
  
    // Before Angular starts manipulating the HTML, we need to get to it for our source code view...
    // DOM ready
    var dummy = $('[metronome]').clone(false);
    dummy.find('.metronomeMeta').remove();
    htmlSourceCode = dummy.html().replace(/=""/g, '');
  });
  
  /**
   * navItem directive helps with responsive font size.
   */
  MetronomeApp.directive('navItem', function($window) {
    return function(scope, elem) {
      var $jqWindow = $($window);
      $jqWindow.resize(function() {
        elem.css('font-size', elem.height() * 0.9 + 'px');
      });
      
      // Do it on DOM ready to initialize display properly (since font size depends on element height)
      $(function() {
        $jqWindow.resize();
      });
    };
  });
  
  /**
   * metaPage directive controls meta page fade transition.
   */
  MetronomeApp.directive('metaPage', function($location) {
    return function(scope, elem) {
      // Initialize visibility as appropriate
      if($location.path() == '/metronome/') {
        elem.hide();
      } else {
        elem.show();
      }
      
      // Path change
      var dummy;
      scope.$watch(function() { return $location.path(); }, function(newPath, oldPath) {
        if(newPath != oldPath) {
          // Opened meta page
          if(newPath != '/metronome/') {
            dummy && dummy.length && dummy.remove();
            elem.fadeIn('fast');
          // Closed meta page
          } else {
            // Fade out a dummy
            dummy = elem.clone(false).insertAfter(elem).scrollTop(elem.scrollTop());
            elem.hide();
            setTimeout(function() {
              dummy && dummy.length && dummy.fadeOut('fast', function() {
                dummy.remove();
              });
            }, 0);
          }
        }
      });
    };
  });
  
  window.MetronomeMetaCtrl = function($scope, $location) {
    // Path change
    $scope.$watch(function() { return $location.path(); }, function(path) {
      // Track active nav item name
      switch(path) {
        case '/metronome/about':
          $scope.activeNav = 'about';
          break;
        case '/metronome/show-html':
          $scope.activeNav = 'show-html';
          break;
        case '/metronome/show-js':
          $scope.activeNav = 'show-js';
          break;
        case '/metronome/show-css':
          $scope.activeNav = 'show-css';
          break;
        default:
          $scope.activeNav = null;
          break;
      }
    });
  };
  
  /**
   * A delegate for meta page controllers.
   */
  var MetaPageCtrlBase = function() {
    this.initFullPageWidget = function() {
      SyntaxHighlighter.highlight({
        gutter: false,
        'class-name': 'fullMetaPage',
        toolbar: false,
        'auto-links': false
      });
    };
  };
  
  window.AboutCtrl = function($scope) {
  };
  
  window.ShowHtmlCtrl = function($scope) {
    var BaseCtrl = new MetaPageCtrlBase();
    
    $scope.sourceCode = htmlSourceCode;
    
    setTimeout(function() {
      BaseCtrl.initFullPageWidget();
    }, 0);
  };
  
  window.ShowJsCtrl = function($scope, $http) {
    var BaseCtrl = new MetaPageCtrlBase();
    
    $http.get('js/metronome.js').success(function(resp) {
      setTimeout(function() {
        BaseCtrl.initFullPageWidget();
      }, 0);
      
      $scope.sourceCode = resp;
    });
  };
  
  window.ShowCssCtrl = function($scope, $http) {
    var BaseCtrl = new MetaPageCtrlBase();
    
    $http.get('css/style.css').success(function(resp) {
      setTimeout(function() {
        BaseCtrl.initFullPageWidget();
      }, 0);
      
      $scope.sourceCode = resp;
    });
  };
})();