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


var smpApp = smpApp || {};
smpApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            //bind the change event to pick the first file only
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

var smpApp = smpApp || {};
smpApp.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToSplit = function(file, uploadUrl, startPageNumber, endPageNumber, callBackAfterUpload, errorCallBackAfterSplitUpload){
        var fd = new FormData();

        if (file != undefined) {
            fd.append('fileUpload', file);
        }
        
        if(startPageNumber){
            fd.append('startPageNumber', startPageNumber);
        }
        
        if(endPageNumber){
            fd.append('endPageNumber', endPageNumber);
        }

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},
            responseType:'arraybuffer'
        })
        .success(function(response,status,headers){
            console.log("Successfully Finished");
            callBackAfterUpload(response,status,headers);
        })
        .error(function(data){
            console.log("Error Occured");
            errorCallBackAfterSplitUpload(data);
        });
    };

    this.uploadFilesToMerge = function(uploadedfiles, uploadUrl, callBackAfterMergeUpload, errorCallBackAfterMergeUpload){
        var fd = new FormData();

        if (uploadedfiles != undefined) {
            for (var i = 0 ; i < uploadedfiles.length ; i ++){
               fd.append('filesUpload', uploadedfiles[i]);
            }
        }
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},
            responseType:'arraybuffer'
        })
        .success(function(response,status,headers){
            console.log("Successfully Finished");
            callBackAfterMergeUpload(response,status,headers);
        })
        .error(function(data){
            console.log("Error Occured");
            errorCallBackAfterMergeUpload(data);
        });
    };

    this.uploadFileToBucket = function(file, uploadUrl){
        uploadPromise = $http({
            url: 'https://angular-file-upload.s3.amazonaws.com/', //S3 upload url including bucket name
            method: 'POST',
            data: {
                key: file.name, // the key to store the file on S3, could be file name or customized
                AWSAccessKeyId: YOURAWSAccessKeyId,
                acl: 'private', // sets the access to the uploaded file in the bucket: private, public-read, ...
                policy: $scope.policy, // base64-encoded json policy (see article below)
                signature: $scope.signature, // base64-encoded signature based on policy string (see article below)
                "Content-Type": file.type != '' ? file.type : 'application/octet-stream', // content type of the file (NotEmpty)
                filename: file.name, // this is needed for Flash polyfill IE8-9
                file: file
            }
        });
        return uploadPromise;
    };

}]);


/**
 * This is Items Tab Module..
 */
var smpApp = smpApp || {};
smpApp.split = angular.module('smp.splitmergepdfs.split', []);

var smpApp = smpApp || {};
smpApp.split.controller('splitCtrl', ['$scope', '$http','$state', '$rootScope', '$timeout', '$stateParams', '$state', 'fileUpload',
	function($scope, $http,$state,$rootScope, $timeout, $stateParams, $state, fileUpload) {

	console.log("updated code inside the splitCtrl");
	$scope.startPageNumber = '';
	$scope.endPageNumber = '';
	$scope.fileToImport = '';
	$scope.showErrorMessage = false;
	$scope.errorMessage = '';
	//save the file first 
	$scope.onFileSelect = function(element){
		var file = element.files[0];
		var sFileName = file.name;
		$scope.fileToImport = file;
		
		$timeout(function () {
	        var _validFileExtensions = [".pdf"];
	      
	        if (sFileName.length > 0) {
	        	var invalidFileExtUploaded = false;
	            var sCurExtension = _validFileExtensions[0];
	            //verify the uploaded file extension
	            if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
	                invalidFileExtUploaded = false;
	            }else{
	            	invalidFileExtUploaded = true;
	            }
	            if (invalidFileExtUploaded) {
	                $scope.fileValue = "";
					$scope.errorMessage = "Please upload a PDF file to split";
					$scope.showErrorMessage = true;
					console.log('Please upload a PDF file to split');
	            }else{
	            	$scope.showErrorMessage = false;
	            	$scope.errorMessage = '';
	                $scope.fileValue = sFileName;
	            }
	        }
    	});
     	
     	
		console.log('file is uploaded , now make rest call for split' );
	};

	$scope.callBackAfterUpload = function(response,status,headers){
		if(angular.isDefined(response) && status == 200){
			var anchorLink = document.createElement("a");
		    document.body.appendChild(anchorLink);
		    anchorLink.style = "display: none";
            var file = new Blob([response], {type: headers('content-type')});
            var contentDispositionHeader = headers('Content-Disposition');
            var fileName = contentDispositionHeader.split(';')[1].trim().split('=')[1];
            var fileUrl = URL.createObjectURL(file);
            anchorLink.href = fileUrl;
            anchorLink.target='_blank';
            anchorLink.download=fileName;
			$scope.downloadLinkName = fileName;
			var indexOfDashFromLast = $scope.downloadLinkName.lastIndexOf('-');
			$scope.downloadLinkName = $scope.downloadLinkName.substr(0, indexOfDashFromLast);
			$scope.successStatus = 'File ' + $scope.downloadLinkName + ' Splitted successfully.';
			$scope.showSuccessStatus = true;
            anchorLink.click();
        }else{
        	if(data!=null && data.messages){
        		$scope.errorMessage = data.messages;
        		$scope.showErrorMessage = true;
        	}else{
        		$scope.errorMessage = "Something Went Wrong , Please try again.";
        		$scope.showErrorMessage = true;
        	}
        }
	};

	$scope.errorCallBackAfterSplitUpload = function(data){
		if(data!=null && data.messages){
        	$scope.errorMessage = data.messages;
        	$scope.showErrorMessage = true;
    	}else{
    		$scope.errorMessage = "Something Went Wrong , Please try again.";
    		$scope.showErrorMessage = true;
    	}
	};

	$scope.split = function(startPageNumber, endPageNumber){
		if (!$scope.fileValue || $scope.fileValue == '' || !$scope.fileToImport) {
            $scope.errorMessage = "Please upload a file to split";
            $scope.showErrorMessage = true;
            console.log('Please upload a file to split');
            return;
        }

		var uploadUrl = _appContextUrl + "rest/smpaction/split";
        fileUpload.uploadFileToSplit($scope.fileToImport, uploadUrl,startPageNumber, endPageNumber, $scope.callBackAfterUpload, $scope.errorCallBackAfterSplitUpload);
	};
	
	

} // End of main function. 

]); // End of controller class.


var smpApp = smpApp || {};
smpApp.controller('headerCtrl', ['$scope','$state',
	function($scope,$state) {

	console.log("updated code inside the splitCtrl");
	
} // End of main function. 

]); // End of controller class.


var smpApp = smpApp || {};
smpApp.split.controller('baseCtrl', ['$scope','$state',
	function($scope,$state) {

	console.log("updated code inside the splitCtrl");
	$scope.init = function(){
		$state.go('splitmergepdfs.split');
	}();
	
	
} // End of main function. 

]); // End of controller class.


var smpApp = smpApp || {};
smpApp.split.controller('footerCtrl', ['$scope', '$http','$state', '$rootScope', '$timeout', '$stateParams', '$log','$window', '$state',
	function($scope, $http,$state,$rootScope, $timeout, $stateParams, $log, $window, $state) {

	console.log("updated code inside the splitCtrl");
	
	
	
} // End of main function. 

]); // End of controller class.


var smpApp = smpApp || {};
smpApp.merge = angular.module('smp.splitmergepdfs.merge', []);

var smpApp = smpApp || {};
smpApp.merge.controller('mergeCtrl', ['$scope', '$state','fileUpload',
	function($scope, $state, fileUpload) {

	$scope.filesToImport = [];
	//save the file first 
	$scope.onFileSelect = function(element){
		console.log("uploading files to merge");
		var file = '';
		file = element.files[0];
		$scope.filesToImport.push(file);
		var sFileName = file.name;
		
		$timeout(function () {
	        var _validFileExtensions = [".pdf"];
	        if (sFileName.length > 0) {
	        	var invalidFileExtUploaded = false;
	            var sCurExtension = _validFileExtensions[0];
	            //verify the uploaded file extension
	            if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
	                invalidFileExtUploaded = false;
	            }else{
	            	invalidFileExtUploaded = true;
	            }
	            if (invalidFileExtUploaded) {
	                $scope.fileValue = "";
					$scope.mergeUploadErrorMessage = "Please upload a PDF file to split";
	            }else{
	                $scope.fileValue = sFileName;
	            }
	        }
	    });
        console.log('file is uploaded , now validate and make rest call for merge' );
	};

	$scope.callBackAfterMergeUpload = function(response,status,headers){
		if(angular.isDefined(response) && status == 200){
			var anchorLink = document.createElement("a");
		    document.body.appendChild(anchorLink);
		    anchorLink.style = "display: none";
            var file = new Blob([response], {type: headers('content-type')});
            var contentDispositionHeader = headers('Content-Disposition');
            var fileName = contentDispositionHeader.split(';')[1].trim().split('=')[1];
            var fileUrl = URL.createObjectURL(file);
            anchorLink.href = fileUrl;
            anchorLink.target='_blank';
            anchorLink.download=fileName;
			$scope.downloadLinkName = fileName;
			var indexOfDashFromLast = $scope.downloadLinkName.lastIndexOf('-');
			$scope.downloadLinkName = $scope.downloadLinkName.substr(0, indexOfDashFromLast);
			$scope.successStatusMessage = 'Successfully merged the uploaded  ' + $scope.uploadedFileName + '   Files.';
            anchorLink.click();
        }else{
        	if(data!=null && data.messages){
        		$scope.mergeUploadErrorMessage = data.messages;
        	}else{
        		$scope.mergeUploadErrorMessage = "Something Went Wrong , Please try again.";
        	}
        }
	};
	
	$scope.errorCallBackAfterMergeUpload =function(data){
		if(data!=null && data.messages){
        	$scope.mergeUploadErrorMessage = data.messages;
    	}else{
    		$scope.mergeUploadErrorMessage = "Something Went Wrong , Please try again.";
    	}
	};

	$scope.merge = function(){
		if (!$scope.filesToImport || ($scope.filesToImport && $scope.filesToImport.length < 2)){
			$scope.mergeUploadErrorMessage = "Please upload at least two files to merge";
            return;
		}

		var uploadUrl = _appContextUrl + "rest/smpaction/uploadForMerge";
		var fileNames = [];
		angular.forEach($scope.filesToImport, function(value, key){
			fileNames.push(value.name);
		});
		$scope.uploadedFileName = fileNames.join();

        fileUpload.uploadFilesToMerge($scope.filesToImport, uploadUrl, $scope.callBackAfterMergeUpload,$scope.errorCallBackAfterMergeUpload);
	};

}]); // End of controller class.
