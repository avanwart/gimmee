(function(){var e;MetronomeApp.config(function(t,n){t.when("/metronome/about",{templateUrl:"/metronome/tmpl/about.html",controller:AboutCtrl}).when("/metronome/show-html",{templateUrl:"/metronome/tmpl/show-html.html",controller:ShowHtmlCtrl}).when("/metronome/show-js",{templateUrl:"/metronome/tmpl/show-js.html",controller:ShowJsCtrl}).when("/metronome/show-css",{templateUrl:"/metronome/tmpl/show-css.html",controller:ShowCssCtrl});n.html5Mode(!0);var r=$("[metronome]").clone(!1);r.find(".metronomeMeta").remove();e=r.html().replace(/=""/g,"")});MetronomeApp.directive("navItem",function(e){return function(t,n){var r=$(e);r.resize(function(){n.css("font-size",n.height()*.9+"px")});$(function(){r.resize()})}});MetronomeApp.directive("metaPage",function(e){return function(t,n){e.path()=="/metronome/"?n.hide():n.show();var r;t.$watch(function(){return e.path()},function(e,t){if(e!=t)if(e!="/metronome/"){r&&r.length&&r.remove();n.fadeIn("fast")}else{r=n.clone(!1).insertAfter(n).scrollTop(n.scrollTop());n.hide();setTimeout(function(){r&&r.length&&r.fadeOut("fast",function(){r.remove()})},0)}})}});window.MetronomeMetaCtrl=function(e,t){e.$watch(function(){return t.path()},function(t){switch(t){case"/metronome/about":e.activeNav="about";break;case"/metronome/show-html":e.activeNav="show-html";break;case"/metronome/show-js":e.activeNav="show-js";break;case"/metronome/show-css":e.activeNav="show-css";break;default:e.activeNav=null}})};var t=function(){this.initFullPageWidget=function(){SyntaxHighlighter.highlight({gutter:!1,"class-name":"fullMetaPage",toolbar:!1,"auto-links":!1})}};window.AboutCtrl=function(e){};window.ShowHtmlCtrl=function(n){var r=new t;n.sourceCode=e;setTimeout(function(){r.initFullPageWidget()},0)};window.ShowJsCtrl=function(e,n){var r=new t;n.get("js/metronome.js").success(function(t){setTimeout(function(){r.initFullPageWidget()},0);e.sourceCode=t})};window.ShowCssCtrl=function(e,n){var r=new t;n.get("css/style.css").success(function(t){setTimeout(function(){r.initFullPageWidget()},0);e.sourceCode=t})}})();