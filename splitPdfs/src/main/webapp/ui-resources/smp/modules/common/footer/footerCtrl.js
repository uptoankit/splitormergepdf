
var smpApp = smpApp || {};
smpApp.split.controller('baseCtrl', ['$scope','$state',
	function($scope,$state) {

	console.log("updated code inside the splitCtrl");
	$scope.init = function(){
		$state.go('splitmergepdfs.split');
	}();
	
	
} // End of main function. 

]); // End of controller class.
