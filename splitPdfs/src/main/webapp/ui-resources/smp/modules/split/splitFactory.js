/**
 * This is a factory call to handle Import bom action.
 */

smpApp.split.factory('splitFactory', [ '$http', '$log',
        function($http, $log) {
            var returnObj = {}, initPromise, solutionList;

            returnObj.getInitPromise = function(inputdata) {

                initPromise = $http({
                    url : _quotingContext + 'rest/importBom/init',
                    method : 'post',
                    data : inputdata,
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).error(function(data, status) {
                    // TODO: Show error message.
                    $log.error('Error fired init print call!');
                });

                // return promise.
                return initPromise;
            };
            

            return returnObj;

        } 
// End of factory function.
]); // End of factory

