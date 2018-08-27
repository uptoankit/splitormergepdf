
var smpApp = smpApp || {};
smpApp.service('commonDataServ', [function () {
        var downloadLink;
        var downloadLinkName;
        var statusMessage;
        
        var self = this;
        self.setLocalizationMap = function(avlblLocalizedMap){
            localizationMap = avlblLocalizedMap;
        };

        self.getLocalizationMap = function(){
            return localizationMap;
        };
        
        self.setCurrentPage = function(newPage){
            currentPage = newPage;
        };

        self.getCurrentPage = function(){
            return currentPage;
        };

        self.setCbnActionQueue = function(newCbnActionQueue){
            cbnActionQueue = newCbnActionQueue;
        };

        self.getCbnActionQueue = function(){
            return cbnActionQueue;
        };

        return self;
}]);

