app.controller('usersSearchController', function ($scope, $window,$http,postObject,postService) {
 $scope.usersData={};
    $scope.loadUsers=function(){ 
var url='http://localhost/Licenta/users.php';
	$http({
			method: 'GET',
			url: url
    
		}).then(function successCallback(data) {
			
                       
                     $scope.usersData= data.data;
//                        postObject.objSend($scope.userData);
                        
                       
		},
		function errorCallback(response) {
    
});

  };
  
  var user_send_to;
 
  $scope.loadUsers();
 
  $scope.tags = [];
  
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
  
 
$scope.viewDetails=function(id){
    var userSearched={user_id:id,request_role:"admin"};
    postObject.objSend(userSearched);
  
 window.location.href = "#friendUser";
};
 
 
 
 $scope.sendMessagePop=function(user_send_id){
       $(".popup_block_message").css( "display", "block" );
     user_send_to=user_send_id;
 };
 
 $scope.close_popup=function(){
    $(".popup_block_message").css( "display", "none" );
};
 
 $(document).mouseup(function (e)
{
    var container = $(".pop_content_message");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        $(".popup_block_message").css( "display", "none" );
    }
});
 
 
 $scope.sendMessage=function(messageText,messageSubject){
     user_from_id=getCookie("user_id");
     if(!messageText)
      messageText=" ";
      if(!messageSubject)
          messageSubject=" ";
     var message={sent_from_id:user_from_id,sent_to_id:user_send_to,message_text:messageText,message_subject:messageSubject};
     
 var url='http://localhost/Licenta/messageSend.php';
       console.log(message);
         postService.objSend(url,message).then(function(data){
            
           if(data.data)
           {
              sweetAlert("Succes!", "Message Sent!", "success"); 
 
              }
           else
           {
               sweetAlert("Try again", "Make sure you have selected a person", "error"); 
                
           }
        });
     
     
     
     
 };
 
 
 
 $scope.loadSkills=function(){ 
	 var url='http://localhost/Licenta/skillsAllSearch.php';
	 	$http({
	 			method: 'GET',
	 			url: url
	     
	 		}).then(function successCallback(data) {
	 			
	                      
	                      $scope.skills= data.data;

	                         
	                        
	 		},
	 		function errorCallback(response) {
	     
	 });

	   };
 
	   $scope.loadSkills();
	   
	   
 
 $scope.addSkillFilter=function(skill_name){
	 $scope.tags.push(skill_name);
	 $('.skillsToggle').slideDown("fast", "linear");
	 $scope.searchSkill="";
	 
 }
 $scope.remove=function(index){
	 $scope.tags.splice(index, 1);
 }
 $scope.toggle = function(par1, par2) {

	    var selectie = par1;
	    var selectie2 = par2;
	    $('.' + selectie2).slideToggle("fast", "linear");
	    $('.' + selectie).toggleClass("glyphicon glyphicon-menu-down glyphicon glyphicon-menu-up ",300);
	    

	   };
 
 
 
  });
