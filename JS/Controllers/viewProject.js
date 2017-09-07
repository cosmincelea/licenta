app.controller('viewProjectController', function ($scope, $window,$http,postProject,postService) {
 
	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ')
				c = c.substring(1);
			if (c.indexOf(name) == 0)
				return c.substring(name.length, c.length);
		}
		return "";
	}
  
	project_id_val=getCookie("project_id");
	var project={project_id:project_id_val};
	$scope.teamLeadName=" ";
	$scope.teamLeadIdView;
if(project_id_val==""){
    window.location.href = "#projectSearch";
}
 

$scope.deletedMembers=[];
$scope.projectTeam=[];
 
$scope.projectDetails=function(obj_send){
  
    
    var url='http://localhost/Licenta/projectGet.php';
       
         postService.objSend(url,obj_send).then(function(data){
            
           if(data.data)
           {
        	   
               
               $scope.projectData=data.data;
              
               console.log(data.data);
               setTimeout(function(){  tinyMCE.activeEditor.setContent($scope.projectData.project_description) }, 900);
               $scope.initialDate =  $scope.projectData.start_date;
               $scope.projectStatusValue=$scope.projectData.finalised;
               $scope.projectNameView=$scope.projectData.project_name;
               $scope.projectTeam=$scope.projectData.PROJECT_TEAM;
               $scope.teamLeadIdView=$scope.projectData.user_id;
              
               $scope.estimatedTimeView=parseInt($scope.projectData.estimatedTime);
              
               $scope.teamLeadName=$scope.projectData.LAST_NAME +" "+$scope.projectData.FIRST_NAME;
              }
           else
           {
               sweetAlert("Try again", "Make sure you have selected a project", "error"); 
                
           }
        });
    
       

    
 };
 $scope.loadUsersView = function() {
	    var url = 'http://localhost/Licenta/usersShortGet.php';
	    $http({
	     method: 'GET',
	     url: url

	    }).then(function successCallback(data) {

	     $scope.usersDataView = data.data;
	     

	    }, function errorCallback(response) {

	    }); // CallBack End

	   };

	   $scope.loadUsersView();
   
    $scope.projectDetails(project);
    
    
   $scope.toggle = function (par1, par2) {
        
        var selectie = par1;
        var selectie2 = par2;
        $('.' + selectie2).slideToggle("fast", "linear");
        $('.' + selectie).toggleClass("glyphicon glyphicon-menu-down glyphicon glyphicon-menu-up ", 300);

    };
    
 

    
    $scope.editTeamLead = function(user_id, user_first_name,
    	    user_last_name) {
    	if($scope.showAdmin==false){
   		 sweetAlert("Error!","You are not allowed to make changes!","error");
   	}
   	else{
    	    $scope.teamLeadName = user_first_name + " " + user_last_name;
    	    $scope.teamLeadIdView = user_id;
    	    var message = $scope.teamLeadName + " added as Team Leader";
    	    
    	    $scope.showSuccessMessage(message);

    	    $(".deleteTeamLeadContainerView").removeClass("fadeOutClass");
    	    $(".searchTeamLeadContainerView").removeClass("fadeInClass");
    	    $(".deleteTeamLeadContainerView").addClass("fadeInClass");
    	    $(".searchTeamLeadContainerView").addClass("fadeOutClass");
    	    $(".deleteTeamLeadContainerView").css("display", "block");
    	    $(".searchTeamLeadContainerView").css("display","none");
   	}
    	   }
    
    
    $scope.deleteTeamLeadView = function() {
    	if($scope.showAdmin==false){
   		 sweetAlert("Error!","You are not allowed to make changes!","error");
   	}
   	else{
        var message = $scope.teamLeadName + " removed from Team Leader";

        $scope.showSuccessMessage(message);
       
        $(".searchTeamLeadContainerView").css("display", "block");
        $(".deleteTeamLeadContainerView")
         .removeClass("fadeInClass");
        
        $(".searchTeamLeadContainerView").removeClass("fadeOutClass");
        $(".deleteTeamLeadContainerView").addClass("fadeOutClass");
        $(".searchTeamLeadContainerView").addClass("fadeInClass");
        $scope.teamLeadName = " ";
        $scope.teamLeadId = 0;
     	$(".deleteTeamLeadContainerView").css("display", "none");
	    $(".searchTeamLeadContainerView").css("display","block");
   	}

       }
    
    
    
   
    
    
	$scope.deleteTeamMemberView = function(user_id, first_name,
		    last_name, index,user_projectID) {
		if($scope.showAdmin==false){
   		 sweetAlert("Error!","You are not allowed to make changes!","error");
   	}
   	else{
		    $scope.projectTeam.splice(index, 1);
		    
		    $scope.showSuccessMessage(first_name + " " + last_name + " removed from team!");
		    var userProjectId={user_project_id:user_projectID}
		    $scope.deletedMembers.push(userProjectId);
   	}

		   }
    
    
    
	 $scope.addTeamMemberView = function(user_id, first_name,
			    last_name, role_name) {
		 if($scope.showAdmin==false){
    		 sweetAlert("Error!","You are not allowed to make changes!","error");
    	}
    	else{
		 var user = {
			     user_id: user_id,
			     FIRST_NAME: first_name,
			     LAST_NAME: last_name,
			     role_name: role_name,
			     project_id: project_id_val
			    };

			    $scope.projectTeam.push(user);
			    $('.teamMembersToggle').slideDown("fast", "linear");
			    $scope.showSuccessMessage(first_name + " " + last_name + " added to team!");
			    
    	}

			   };
    
    
    
    
    
    
    $scope.updateProject=function(projectNameView,myDateView,estimatedTimeView,projectStatusValue)
    {
    	
    	var finalDate;
    	if($scope.showAdmin==false){
    		 sweetAlert("Error!","You are not allowed to make changes!","error");
    	}
    	else{
    	
    	 if (!$scope.projectNameView) {
    	    	
    	     $scope.showErrorMessage("Please choose a project name!");
    	     
    	    } 

    	    else{
    	    
    	     if(!myDateView)
    	    	 {
    	    	 finalDate=$scope.initialDate;
    	    	 
    	    	 }
    	     else{
    	    	 var dateView = myDateView.getFullYear() + "-" + myDateView.getMonth() + "-" + myDateView.getDate();
    	    	 finalDate=dateView;
    	    	 
    	     }
    	     var estimatedTimeViewFinal = Math.round(estimatedTimeView);
    	    
    	    
    	     var project = {
    	      finalised:projectStatusValue,
    	      start_date: finalDate,
    	      project_name: projectNameView,
    	      estimatedTime: estimatedTimeViewFinal,
    	      project_description: tinyMCE.activeEditor.getContent(),
    	      project_teamlead_id:$scope.teamLeadIdView,
    	      project_id:project_id_val
    	     };

    	     var url = 'http://localhost/Licenta/updateProject.php';

    	     postService.objSend(url, project).then(function(data) {
    	    	 
    	        var response = data.data.replace(/\s+/g, '');
    	        var responseFinal = response.substring(0, 7);
    	      
    	      
    	        angular.forEach($scope.deletedMembers, function(value,key) {
     	           
       	         
     	           var url2 = 'http://localhost/Licenta/deleteTeamMember.php';

     	           $http.post(url2,value, {
     	              header: {
     	               "Content-Type": "application/json"
     	              }
     	             })
     	            .then(
     	             function(data) {
     	            	 
     	          
     	              
     	             });

     	          })
    	        
    	        
    	        
    	        
    	        
    	        
    	        
    	        
    	        
    	        angular.forEach($scope.projectTeam, function(value,key) {
           
         
           var url2 = 'http://localhost/Licenta/insertTeamMember.php';

           $http.post(url2,value, {
              header: {
               "Content-Type": "application/json"
              }
             })
            .then(
             function(data) {
            	 
              
             });

          });

    	        if (responseFinal == "Success") {
    	         sweetAlert("Succes!","Project Updated!","success");

    	        
    	       
    	         	$(".deleteTeamLeadContainerView").css("display", "block");
    	    	    $(".searchTeamLeadContainerView").css("display","none");

    	        } else {
    	         sweetAlert("Try again","Make sure everything is correct","error");

    	        }
    	       });

    	    }
    }
    	
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
       
       
       
       
 
  });
