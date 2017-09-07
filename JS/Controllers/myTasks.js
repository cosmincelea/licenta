app.controller('myTasksController', function ($scope, $window,$http,postObject,postService) {
	$scope.task_id;
	$scope.index;
 $scope.loadTasks= function() { 
var url='http://localhost/Licenta/tasksGet.php';
	$http({
			method: 'GET',
			url: url
    
		}).then(function successCallback(data) {
			
                        $scope.myTasks=data.data;
                        
                        
                       
		},
		function errorCallback(response) {
    
});

  };
  
  setInterval($scope.loadTasks(), 9500);
  
$scope.loadTasks();
  
 $scope.viewTask=function(task_id,task_name,due_date,estimated_time,task_status,task_comment,priority,index,user_id){
      $(".taskPopUp").css( "display", "block" );
      $scope.task_name=task_name;
     $scope.messageText=task_comment;
     
     $scope.messageSubject=task_name;
     
     $scope.priority=priority;
    
     $scope.statusTaskValue=task_status;
     $scope.estimated_time=estimated_time;
     tinyMCE.activeEditor.setContent(task_comment);
   $scope.task_id=task_id;
   $scope.index=index;
   $scope.initial_status=task_status;
   $scope.initial_comment=tinyMCE.activeEditor.getContent();
    
 };
  
 $(document).mouseup(function (e)
			{
	
			    var container = $(".task_pop_content");

			    if (!container.is(e.target) // if the target of the click isn't
											// the container...
			        && container.has(e.target).length === 0) // ... nor a
																// descendant of
																// the container
			    {
			    	 
			        $("#taskPopUp").css( "display", "none" );
			    }
			});
 
 
 
  $scope.close_popup=function(){
    $(".taskPopUp").css( "display", "none" );
};
   

		 $scope.updateTask=function(index,status){
			 if($scope.initial_status!=status || $scope.initial_comment!=tinyMCE.activeEditor.getContent()){
			 var task={
				 task_id:$scope.task_id,
				 task_status:status,
				 task_comment:tinyMCE.activeEditor.getContent()
				 }
			 var url = 'http://localhost/Licenta/updateTask.php';

    	     postService.objSend(url, task).then(function(data) {
    	    	
    	        var response = data.data.replace(/\s+/g, '');
    	        var responseFinal = response.substring(0, 7);
   	        $scope.myTasks[$scope.index].task_status=status;
    	        if (responseFinal == "Success") {
       	         sweetAlert("Succes!","Task Updated!","success");

       	         

       	        } else {
       	         sweetAlert("Try again","Make sure everything is correct","error");

       	        }
			 
			 
		 });}
			 else{sweetAlert("Error!","Nothing Changed!","error");}
    	     
    	     
    	     
		 };
 

  


});
