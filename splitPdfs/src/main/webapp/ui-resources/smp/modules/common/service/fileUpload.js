
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

