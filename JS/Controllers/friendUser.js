app.controller('friendUserSearchController', function ($scope, $window,$http,postObject,postService,postProject) {
 
 var user_friend=postObject.getObject();
  

 


 $scope.close_popup = function() {
		$(".popup_block_project").css("display", "none");
	};
 
	
	$(document).mouseup(function(e) {
		var container = $(".popup_block_project");

		if (!container.is(e.target) // if the target of the click isn't the
									// container...
				&& container.has(e.target).length === 0) // ... nor a
															// descendant of the
															// container
		{
			$(".popup_block_project").css("display", "none");
		}
	});
	
	
 
$scope.friendDetails=function(obj_send){
	if(jQuery.isEmptyObject(user_friend)){
	    window.location.href = "#usersSearch";
	} else{
    
    var url='http://localhost/Licenta/friendUser.php';
       
         postService.objSend(url,obj_send).then(function(data){
            
           if(data.data)
           {
               console.log(data.data);
               $scope.userFriendData=data.data;
 
              }
           else
           {
               sweetAlert("Try again", "Make sure you have selected a person", "error"); 
                
           }
        });
    
	}  

    
 };
    
   
    $scope.friendDetails(user_friend);
    
    $scope.loadProjects=function(){ if(jQuery.isEmptyObject(user_friend)){
	    window.location.href = "#usersSearch";
	} else{
    	
    	var dataFriend={friend_user_id:user_friend.user_id};
    	console.log(dataFriend);
    	var url3='http://localhost/Licenta/friendProjectAssigned.php';
    


        $http.post(url3,dataFriend, {
           header: {
            "Content-Type": "application/json"
           }
          })
         .then(
          function(data) {$scope.projectsAssigned=data.data;})
	}
    	  };
    	  
    	  var user_send_to;
    	 
    	  $scope.loadProjects();
    
    	  function setCookie(cname, cvalue, exdays) {
    			var d = new Date();
    			d.setTime(d.getTime() + (exdays * 60 * 60 * 1000));
    			var expires = "expires=" + d.toUTCString();
    			document.cookie = cname + "=" + cvalue + "; " + expires;
    		}
    
    	  $scope.viewProject = function(id) {
    			setCookie('project_id', id, 2);
    			var projectSearched = {
    				project_id : id,
    				request_role : "admin"
    			};
    			postProject.objSend(projectSearched);
    			window.location.href = "#viewProject";
    		};
    
    		
    		
    		 $scope.loadProjects=function(){ 
    			 var url='http://localhost/Licenta/projects.php';
    			 	$http({
    			 			method: 'GET',
    			 			url: url
    			     
    			 		}).then(function successCallback(data) {
    			 			
    			                        
    			                      $scope.projects= data.data;
//    			                         postObject.objSend($scope.userData);
    			                         
    			                        
    			 		},
    			 		function errorCallback(response) {
    			     
    			 });

    			   };
    			   
    			   var user_send_to;
    			  
    			   $scope.loadProjects();
    		
    		
    		
    			   
    			    
    			   
    		
    		
    
   $scope.toggle = function (par1, par2) {
        
        var selectie = par1;
        var selectie2 = par2;
        $('.' + selectie2).slideToggle("fast", "linear");
        $('.' + selectie).toggleClass("glyphicon glyphicon-menu-down glyphicon glyphicon-menu-up ", 300);

    };
    
    $scope.addToProject=function(){
        $(".popup_block_project").css( "display", "block" );
    
         
     };

     $scope.addOnProject=function(project_id,project_name,project){
    	 var counter=0;
    	 var keepGoing = true;
    	
    	  angular.forEach($scope.projectsAssigned, function(value, key) {
    	
			
			   if(value.project_id==project_id  )
				   {
				   sweetAlert("Error", "User "+$scope.userFriendData.FIRST_NAME+" "+$scope.userFriendData.LAST_NAME+" is allready on project "+ project_name, "error");
				   keepGoing=false;
				   }
			   else{
				   if(keepGoing){
					   counter=counter+1;}
				   
			   }
    	  });
    	  
			
			 if($scope.projectsAssigned.length==counter){
    	 
				 $scope.projectsAssigned.push(project);
    	 
    	 
    	 var url2 = 'http://localhost/Licenta/insertTeamMember.php';
var value={
		project_id:project_id,
		project_name:project_name,
		user_id:$scope.userFriendData.USER_ID,
		role_name:$scope.userFriendData.role_name

}
    	 
         $http.post(url2,value, {
            header: {
             "Content-Type": "application/json"
            }
           })
          .then(
           function(data) {
        	  
        	   var responseFinal = data.data.substring(2, 9);
        	   if (responseFinal == "Success") {
        		   sweetAlert("Succes", "User "+$scope.userFriendData.FIRST_NAME+" "+$scope.userFriendData.LAST_NAME+" added on project "+ project_name, "success"); 
                   
        	   }
        	   else{
        	   sweetAlert("Error", "Something went wrong", "error"); }
            
           });
    	 
         $(".popup_block_project").css( "display", "none" );
			   }
			  
			 	
          
      };
 
  });
