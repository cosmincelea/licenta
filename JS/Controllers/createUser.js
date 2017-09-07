app
 .controller(
  'createUserController',
  function($scope, $window, $http, postService, $timeout) {
	
  
	  $scope.loadLocations = function() {
		    var url = 'http://localhost/Licenta/locationShortGet.php';
		    $http({
		     method: 'GET',
		     url: url

		    }).then(function successCallback(data) {

		     $scope.Locations = data.data;

		    }, function errorCallback(response) {

		    }); // 

		   };

		   $scope.loadLocations();
		   
		   $scope.loadRoles = function() {
			    var url = 'http://localhost/Licenta/rolesGet.php';
			    $http({
			     method: 'GET',
			     url: url

			    }).then(function successCallback(data) {

			     $scope.Roles = data.data;

			    }, function errorCallback(response) {

			    }); // 

			   };

			   $scope.loadRoles();
		   
   
		   $scope.location_id;
		   $scope.role_id
		   
		   $scope.addLocation = function(location_id, location_name) {
				    $scope.location_name = location_name;
				    $scope.location_id = location_id;
				   
				    
				    $(".deleteTeamLeadContainer").removeClass("fadeOutClass");
				    $(".searchTeamContainer").removeClass("fadeInClass");
				    $(".deleteTeamLeadContainer").addClass("fadeInClass");
				    $(".searchTeamContainer").addClass("fadeOutClass");
				    
				    $(".btnDeleteLocationCreateUser").css("display", "block");
				    $(".locationCreateContainer").css("display", "block")
				    $(".searchTeamContainer").css("display", "none");
				   }
	   
		   $scope.removeLocation = function() {
			    $scope.location_name = "";
			    $scope.location_id = null;
			
			    
			    $(".deleteTeamLeadContainer").removeClass("fadeOutClass");
			    $(".searchTeamContainer").removeClass("fadeInClass");
			    $(".deleteTeamLeadContainer").addClass("fadeInClass");
			    $(".searchTeamContainer").addClass("fadeOutClass");
			    $(".locationCreateContainer").css("display", "none");
			    $(".btnDeleteLocationCreateUser").css("display", "none");
			    $(".searchTeamContainer").css("display", "block");
			   }
		   
		   
		   $scope.addRole = function(role_id, role_name) {
			    $scope.role_name = role_name;
			    $scope.role_id = role_id;
			   
			    
			    $(".deleteTeamLeadContainer").removeClass("fadeOutClass");
			    $(".searchTeamContainer").removeClass("fadeInClass");
			    $(".deleteTeamLeadContainer").addClass("fadeInClass");
			    $(".searchTeamContainer").addClass("fadeOutClass");
			    
			    $(".btnDeleteRoleCreateUser").css("display", "block");
			    $(".roleCreateContainer").css("display", "block")
			    $(".searchRoleContainer").css("display", "none");
			   }
  
	   $scope.removeRole = function() {
		    $scope.role_name = "";
		    $scope.role_id = null;
		
		    
		    $(".deleteTeamLeadContainer").removeClass("fadeOutClass");
		    $(".searchTeamContainer").removeClass("fadeInClass");
		    $(".deleteTeamLeadContainer").addClass("fadeInClass");
		    $(".searchTeamContainer").addClass("fadeOutClass");
		    $(".roleCreateContainer").css("display", "none")
		    $(".btnDeleteLocationCreateUser").css("display", "none");
		    $(".searchRoleContainer").css("display", "block");
		   }
	   
		   
  
		   
		   $scope.showSuccessMessage = function(message) {
			    $scope.successMessageText = message;

			    if ($(".notificationBarSuccess").hasClass('hidden')) {

			     $(".notificationBarSuccess").removeClass('hidden');

			     $(".notificationBarSuccess").removeClass('visuallyhidden');

			    }

			    $(".notificationBarSuccess").css('display', 'block');
			    setTimeout(function() {
			     $(".notificationBarSuccess").addClass('visuallyhidden');

			     $(".notificationBarSuccess").one('transitionend',
			      function(e) {

			       $(".notificationBarSuccess").addClass('hidden');
			       $(".notificationBarSuccess").css('display', 'none');

			      });
			    }, 600);

			   }

			   $scope.showErrorMessage = function(message) {

			    $scope.errorMessageText = message;

			    if ($(".notificationBarError").hasClass('hidden')) {

			     $(".notificationBarError").removeClass('hidden');

			     $(".notificationBarError").removeClass('visuallyhidden');

			    }

			    $(".notificationBarError").css('display', 'block');
			    setTimeout(function() {
			     $(".notificationBarError").addClass('visuallyhidden');

			     $(".notificationBarError").one('transitionend',
			      function(e) {

			       $(".notificationBarError").addClass('hidden');
			       $(".notificationBarError").css('display', 'none');

			      });
			    }, 600);

			   }
		      
		   
		   
		   
		   
		   
		   
		   
		   
		   
		   
		   
		   $scope.createUser = function() {

			    if (!$scope.lastName) {
			    	
			     $scope.showErrorMessage("Please complete Last Name!");
			     
			    } 
			    else if(!$scope.startDate)
			    {$scope.showErrorMessage("Please choose a starting date!");}
			    else if(!$scope.email)
			    {$scope.showErrorMessage("Please add a email !");}
			    else if(!$scope.firstName){$scope.showErrorMessage("Please complete First Name!");}
			    else if(!$scope.birthDate)
			    {$scope.showErrorMessage("Please choose the birth date!");}
			    else if(!$scope.location_name)
			    {$scope.showErrorMessage("Please choose the location name!");}
			    else if(!$scope.password)
			    {$scope.showErrorMessage("Please choose a password!");}
			    else{
			     var startDate = $scope.startDate.getFullYear() + "-" + $scope.startDate.getMonth() + "-" + $scope.startDate.getDate();
			     var birthDate = $scope.birthDate.getFullYear() + "-" + $scope.birthDate.getMonth() + "-" + $scope.birthDate.getDate();
			  
			     

			    
			      
			     
			     var user = {
			      start_date: startDate,
			      birth_date: birthDate,
			      last_name: $scope.lastName,
			      first_name: $scope.firstName,
			      email: $scope.email,
			      phonenumber:$scope.phoneNumber,
			      location_id:$scope.location_id,
			      password:$scope.password,
			      role_id:$scope.role_id
			     };
			    

			     var url = 'http://localhost/Licenta/createUser.php';

			     postService.objSend(url, user).then(function(data) {

			        var response = data.data.replace(/\s+/g, '');
			        var responseFinal = response.substring(0, 7);
			        console.log(response)
			       
			        
			     

			        if (responseFinal == "Success") {
			         sweetAlert("Succes!","User Created!","success");

			         
			         $scope.lastName = null;
			         $scope.firstName = null;
			         $scope.email = null;
			         $scope.phoneNumber = null;
			         $scope.removeLocation();
			         $scope.removeRole();
			         $scope.password=null;
			         $(".searchTeamContainer").css("display","block");
			         $(".deleteTeamLeadContainer").css("display","none");

			        } else {
			         sweetAlert("Try again","Make sure everything is correct","error");

			        }
			       });

			    }

		   }
		   
		   
		   
		   
		   
		   
		 
		   
		   
		   
		   
		   
		   
   

  });