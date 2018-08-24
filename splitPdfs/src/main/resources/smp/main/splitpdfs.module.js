//Public Modules
var smpApp = smpApp || {};
smpApp = angular.module ('smp.main.splitpdfs', ['ngAnimate', 'ngResource', 'ui.router', 'ngRoute', 'ngSanitize', 'ngTouch', 'ui.bootstrap', 
	'ngCookies','angular-click-outside','angularMoment','splitpdfs.split','splitpdfs.merge']); 

smpApp.config(
    ['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {
            $stateProvider
            .state('splitpdfs.split', {
                title: 'Cisco Commerce Workspace',
                url: '/split',
                views: {
                    'container@': {
                        title: 'Split',
                        controller: 'splitCtrl',
                        templateUrl: _appContextUrl + 'resources/smp/modules/split.html'
                    }
                }
            })
            .state('splitpdfs.merge', {
                title: 'Cisco Commerce Workspace',
                url: '/merge',
                views: {
                    'container@': {
                        title: 'Merge',
                        controller: 'mergeCtrl',
                        templateUrl: _appContextUrl + 'resources/smp/modules/merge.html'
                    }
                }
            })
            .state('otherwise', {
            	title: 'Cisco Commerce Workspace',
                url: '/split',
                views: {
                    'container@': {
                        title: 'Split',
                        controller: 'splitCtrl',
                        templateUrl: _appContextUrl + 'resources/smp/modules/split.html'
                    }
                }
            });
        }
    ]);


smpApp.config(['$uibTooltipProvider', function($uibTooltipProvider) {
    $uibTooltipProvider.options({
        trigger: 'mouseenter',
        appendToBody: true
    });
}]);

smpApp.config(['$logProvider', function($logProvider){
	//Always make sure this flag is set to false in PROD environment, individual developer need to make this true in local environments if they want to see $log. statements.
    $logProvider.debugEnabled(false);
}]);

smpApp.run(
    ['$rootScope', '$state', '$stateParams', '$location', '$log', '$localStorage', 'isProdMode','$anchorScroll',
        function($rootScope, $state, $stateParams, $location, $log, $localStorage, isProdMode, $anchorScroll) {
    		//TODO: Remove it. Debug statements when isProdMode is false
    		if(!isProdMode){
    			$log.debug("isProdMode: ", isProdMode);
        		$log.debug("Date: ", new Date());
    		}
            // Adding all the content from main controller. Need to revisit 
            var jQ = angular.element;
            
    	    $rootScope.activateDealTab = true;
    	    $rootScope.activateQuoteTab = false;
    	    $rootScope.activateReviewTab = false;
    	    $rootScope.activateOrderTab = false;
    	    $rootScope.activateConsumtionSummTab = false;
    	    
    	    $rootScope.resetTabs = function(){
    	    	$rootScope.activateDealTab = false;
    		    $rootScope.activateQuoteTab = false;
    		    $rootScope.activateReviewTab = false;
    		    $rootScope.activateApprovalsTab = false;
    		    $rootScope.activateOrderTab = false;
    		    $rootScope.activateDealConsumptionTab = false;
        	    $rootScope.activateConsumtionSummTab = false;
    	    };

            $rootScope.path = {
                modules : _appContextUrl + 'resources/quoting/modules/',
            };            

            $rootScope.$state = $state;
            
            $rootScope.continueClick = false;
            $rootScope.sQuoteModelHeading = 'LABEL.CHANGE.DEAL.NAME';
            $rootScope.sQuoteModelLabel = 'LABEL.DEAL.DEALNAME';
            $rootScope.bWhoisInvolvedLeadPartner = false;
            
            $rootScope.bIsFixedLayout = false;

            $rootScope.regExpName = new RegExp("^[-_. a-zA-Z0-9\u00C0-\u00ff\u4E00-\u9FFF\u2E80-\u2EFF\u3040-\u309F\u30A0-\u30FF\u3200-\u32FF\u3300-\u33FF\u4E00-\u9FFF\uF900-\uFAFF\uFE30-\uFE4F]+$");
            $rootScope.regExpTitle = new RegExp("^[-_.&/’';(), a-zA-Z0-9\u00C0-\u00ff\u4E00-\u9FFF\u2E80-\u2EFF\u3040-\u309F\u30A0-\u30FF\u3200-\u32FF\u3300-\u33FF\u4E00-\u9FFF\uF900-\uFAFF\uFE30-\uFE4F]+$");
            $rootScope.regExpEmail=/^[^\s@]+@[^\s@]+\.([^\s@\u00C0-\u00ff\u4E00-\u9FFF\u2E80-\u2EFF\u3040-\u309F\u30A0-\u30FF\u3200-\u32FF\u3300-\u33FF\u4E00-\u9FFF\uF900-\uFAFF\uFE30-\uFE4F]{2,})+$/i;

            $rootScope.checkAll = function(c, a) {
                angular.forEach(a, function(o) {
                    o.selected = c;
                });
            };

            $rootScope.isOneSelected = function(a) {
                var s = false;
                angular.forEach(a, function(o) {
                    if (o.selected) {
                        s = true;
                        return;
                    }
                });
                return s;
            };

            $rootScope.viewLink = function(link) {
                $location.path(link);
                 $anchorScroll(0)
            };

            $rootScope.isLink = function(link) {
                return (link === $location.path() || $location.path().indexOf(link + '/') > -1);
            };

            $rootScope.closeAlert = function(i, a) {
                a.splice(i, 1);
            };

            $rootScope.niceScrollOptions = {
                autohidemode: false,
                cursorborder: 0,
                cursoropacitymax: 0.6,
                cursorwidth: '6px'
            };

            jQ(window).scroll(function() {
                var pS = false;
                if (jQ(this).scrollTop() > 0) {
                    pS = true;
                }
                $rootScope.$apply(function() {
                    $rootScope.pageScrolled = pS;
                });
            });


            $rootScope.backToTop = function() {
                jQ("html, body").animate({
                    scrollTop: 0
                });
            };
            
            $rootScope.containsObject= function (obj, list) {
                var i;
                for (i = 0; i < list.length; i++) {
                    if (angular.equals(list[i],obj)) {
                        return i;
                    }
                }
                return -1;
            };
            
            $rootScope.navigate = function (stateName, quoteId, dealId) {
            	// resetting the roadmap icons. 
            	//$rootScope.resetAllErrors();
            	// now navigate.
            	$state.go(stateName, {quoteId : quoteId,  
            		dealId : dealId}, {location: true, inherit: false});
            };
            
            $rootScope.typeOf = function(value) {
                return typeof value;
            };
            
            /***
            * Checks if the object is empty.
            */
            $rootScope.isEmpty = function (obj) {
        	  for (var i in obj) if (obj.hasOwnProperty(i)) return false;
        	  return true;
            };
          
            /*this function will return the array which has only unique data*/
            $rootScope.uniq = function(a) {
                var seen = {};
                return a.filter(function(item) {
                    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
                });
            };

            /*to freeze the table header*/
            $rootScope.tableFixers =[];
            $rootScope.getFreezeHeaderFlag=function(tableType){
                return $rootScope.tableFixers[tableType];
            };
          
            $rootScope.navigateToSDG = function (stateName, quoteId, dealId, fromPage) {
                $state.go(stateName, {quoteId : quoteId,  
                dealId : dealId, fromPage: fromPage}, {location: true, inherit: false});
            }; 
        }
    ]);