app
 .controller(
  'createTasksController',
  function($scope, $window, $http, postService, $timeout) {
	  $scope.userTaskId;
  
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
   
   $scope.priorityValue="Medium";
  
   
   $scope.loadUsersTask = function() {
	    var url = 'http://localhost/Licenta/usersShortGet.php';
	    $http({
	     method: 'GET',
	     url: url

	    }).then(function successCallback(data) {

	     $scope.usersDataTask = data.data;

	    }, function errorCallback(response) {

	    }); // CallBack End

	   };

	   $scope.loadUsersTask();
   
   
	   $scope.deleteTaskUser = function() {

		    var message = $scope.taskUserName + " removed from Team Leader";

		    $scope.showSuccessMessage(message);

		    $(".deleteTeamLeadContainer")
		     .removeClass("fadeInClass");
		    $(".searchTeamContainer").removeClass("fadeOutClass");
		    $(".deleteTeamLeadContainer").addClass("fadeOutClass");
		    $(".searchTeamContainer").addClass("fadeInClass");
		    $scope.taskUserName = "empty";
		    $scope.taskUserId = 0;
		    $(".searchTeamContainer").css("display", "block");
		    $(".deleteTeamLeadContainer").css("display", "none");

		   }
   
   
	   $scope.addTaskUser = function(user_id, user_first_name,
			    user_last_name) {
			    $scope.taskUserName = user_first_name + " " + user_last_name;
			    $scope.userTaskId = user_id;
			    var message = $scope.taskUserName + " add as task target";

			    $scope.showSuccessMessage(message);

			    $(".deleteTeamLeadContainer").removeClass("fadeOutClass");
			    $(".searchTeamContainer").removeClass("fadeInClass");
			    $(".deleteTeamLeadContainer").addClass("fadeInClass");
			    $(".searchTeamContainer").addClass("fadeOutClass");
			    $(".deleteTeamLeadContainer").css("display", "block");
			    $(".searchTeamContainer").css("display", "none");
			   }
   
   
	   
	   
	   
	   
	   
	   $scope.createTask = function() {

		    if (!$scope.taskName) {
		    	
		     $scope.showErrorMessage("Please choose a task name!");
		     
		    } 
		    else if(!$scope.taskDate)
		    {$scope.showErrorMessage("Please choose a due date!");}
		    else{
		     var date = $scope.taskDate.getFullYear() + "-" + $scope.taskDate.getMonth() + "-" + $scope.taskDate.getDate();
		     
		     var estimatedTimes = Math.round($scope.estimatedTimeTask);
		     
		     var task = {
		      due_date: date,
		      task_name: $scope.taskName,
		      estimatedTime: estimatedTimes,
		      task_comment: tinyMCE.activeEditor.getContent(),
		      user_id:$scope.userTaskId ,
		      priority:$scope.priorityValue
		     };

		    
		     
		     
		     
		     
		     
		     
		     
		     var url = 'http://localhost/Licenta/createTask.php';

		     postService.objSend(url, task).then(function(data) {

		        var response = data.data.replace(/\s+/g, '');
		        var responseFinal = response.substring(0, 7);
		        console.log(response);
		      
		        
		       

		        if (responseFinal == "Success") {
		         sweetAlert("Succes!","Task Created!","success");

		         tinyMCE.activeEditor.setContent("");
		         $scope.taskName = null;
		         $scope.estimatedTime = null;
		         $scope.taskUserName = null;
		         $scope.userTaskId = null;
		        
		         $(".searchTeamContainer").css("display", "block");
		         $(".deleteTeamLeadContainer").css("display","none");

		        } else {
		         sweetAlert("Try again","Make sure everything is correct","error");

		        }
		       });

		    }

		   }
 
	   
	   
	   
	   
	   
	   
   
   
   

  });