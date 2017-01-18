angular.module('bloomApp.services', ['angularModalService','bloomApp.controllers'])



 /*$       /$$                                   /$$      /$$                 /$$           /$$
| $$      | $$                                  | $$$    /$$$                | $$          | $$
| $$$$$$$ | $$  /$$$$$$   /$$$$$$  /$$$$$$/$$$$ | $$$$  /$$$$  /$$$$$$   /$$$$$$$  /$$$$$$ | $$
| $$__  $$| $$ /$$__  $$ /$$__  $$| $$_  $$_  $$| $$ $$/$$ $$ /$$__  $$ /$$__  $$ |____  $$| $$
| $$  \ $$| $$| $$  \ $$| $$  \ $$| $$ \ $$ \ $$| $$  $$$| $$| $$  \ $$| $$  | $$  /$$$$$$$| $$
| $$  | $$| $$| $$  | $$| $$  | $$| $$ | $$ | $$| $$\  $ | $$| $$  | $$| $$  | $$ /$$__  $$| $$
| $$$$$$$/| $$|  $$$$$$/|  $$$$$$/| $$ | $$ | $$| $$ \/  | $$|  $$$$$$/|  $$$$$$$|  $$$$$$$| $$
|_______/ |__/ \______/  \______/ |__/ |__/ |__/|__/     |__/ \______/  \_______/ \_______/|_*/

.factory('bloomModal', function(ModalService){

	return {
		createModal: function(data, ctrl){

			console.log(data);
			  ModalService.showModal({
	            templateUrl: data,
	            controller: ctrl
	        }).then(function(modal) {
	            modal.element.modal();
	            modal.close.then(function(result) {
	                $scope.message = "You said " + result;
	            });
	        });
		}

	}

})


 /*$                  /$$$$$$  /$$                      /$$$$$$              /$$$$$           /$$          
| $$                 /$$__  $$|__/                     /$$__  $$            |__  $$          |__/          
| $$$$$$$  /$$   /$$| $$  \__/ /$$  /$$$$$$  /$$$$$$$ | $$  \ $$  /$$$$$$      | $$  /$$$$$$  /$$ /$$$$$$$ 
| $$__  $$| $$  | $$|  $$$$$$ | $$ /$$__  $$| $$__  $$| $$  | $$ /$$__  $$     | $$ /$$__  $$| $$| $$__  $$
| $$  \ $$| $$  | $$ \____  $$| $$| $$  \ $$| $$  \ $$| $$  | $$| $$  \__//$$  | $$| $$  \ $$| $$| $$  \ $$
| $$  | $$| $$  | $$ /$$  \ $$| $$| $$  | $$| $$  | $$| $$  | $$| $$     | $$  | $$| $$  | $$| $$| $$  | $$
| $$$$$$$/|  $$$$$$/|  $$$$$$/| $$|  $$$$$$$| $$  | $$|  $$$$$$/| $$     |  $$$$$$/|  $$$$$$/| $$| $$  | $$
|_______/  \______/  \______/ |__/ \____  $$|__/  |__/ \______/ |__/      \______/  \______/ |__/|__/  |__/
                                   /$$  \ $$                                                               
                                  |  $$$$$$/                                                               
                                   \_____*/                                                    

.factory('buSignOrJoin', function(ModalService, $rootScope, bloomModal){

	return {
		testThing: function(){
			console.log("Your test was a success");
		},

		introModal: function(data, controller){
			console.log(data);
			console.log(controller);
			bloomModal.createModal(data, controller);
		}
	}

});




