//Public Modules
var smpApp = smpApp || {};
smpApp = angular.module ('smp.main.splitmergepdfs', ['ngAnimate', 'ngResource', 'ui.router', 
    'ngRoute', 'ngSanitize', 'ngTouch', 'ui.bootstrap', 'ngStorage',
	'ngCookies','angularMoment','smp.splitmergepdfs.split','smp.splitmergepdfs.merge']); 

smpApp.config(
    ['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {
            $stateProvider
            .state('splitmergepdfs', {
                views: {
                	'header@': {
                        controller: 'headerCtrl',
                        templateUrl: _appContextUrl + 'ui-resources/smp/modules/common/header/header.html'
                    }
                }
            })
            .state('splitmergepdfs.split', {
                title: 'Cisco Commerce Workspace',
                url: '/split',
                views: {
                	'header@': {
                        controller: 'headerCtrl',
                        templateUrl: _appContextUrl + 'ui-resources/smp/modules/common/header/header.html'
                    },
                    'container@': {
                        title: 'Split',
                        controller: 'splitCtrl',
                        templateUrl: _appContextUrl + 'ui-resources/smp/modules/split/split.html'
                    },
                    'footer@': {
                        controller: 'headerCtrl',
                        templateUrl: _appContextUrl + 'ui-resources/smp/modules/common/footer/footer.html'
                    }
                }
            })
            .state('splitmergepdfs.merge', {
                title: 'Cisco Commerce Workspace',
                url: '/merge',
                views: {
                	'header@': {
                        controller: 'headerCtrl',
                        templateUrl: _appContextUrl + 'ui-resources/smp/modules/common/header/header.html'
                    },
                    'container@': {
                        title: 'Merge',
                        controller: 'mergeCtrl',
                        templateUrl: _appContextUrl + 'ui-resources/smp/modules/merge/merge.html'
                    },
                    'footer@': {
                        controller: 'headerCtrl',
                        templateUrl: _appContextUrl + 'ui-resources/smp/modules/common/footer/footer.html'
                    }
                }
            })
            .state('otherwise', {
            	title: 'Cisco Commerce Workspace',
                url: '',
                views: {
                    'header@': {
                        controller: 'headerCtrl',
                        templateUrl: _appContextUrl + 'ui-resources/smp/modules/common/header/header.html'
                    },
                    'container@': {
                        controller: 'baseCtrl',
                        templateUrl: _appContextUrl + 'ui-resources/smp/modules/split/split.html'
                    },
                    'footer@': {
                        controller: 'footerCtrl',
                        templateUrl: _appContextUrl + 'ui-resources/smp/modules/common/footer/footer.html'
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
    ['$rootScope', '$state', '$stateParams', '$location', '$log', '$localStorage','$anchorScroll',
        function($rootScope, $state, $stateParams, $location, $log, $localStorage, $anchorScroll) {
    		
    	    $rootScope.activateDealTab = true;
    	    $rootScope.activateQuoteTab = false;
    	    $rootScope.activateReviewTab = false;
    	    $rootScope.activateOrderTab = false;
    	    $rootScope.activateConsumtionSummTab = false;
    	    
            $rootScope.path = {
                modules : _appContextUrl + 'ui-resources/smp/modules/',
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

            
        }
    ]);