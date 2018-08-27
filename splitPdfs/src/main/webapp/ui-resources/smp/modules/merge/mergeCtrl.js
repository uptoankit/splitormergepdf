
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
