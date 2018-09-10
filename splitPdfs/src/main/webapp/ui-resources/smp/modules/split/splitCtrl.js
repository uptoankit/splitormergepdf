
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
