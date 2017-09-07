app.controller('mailController', function($scope, $window, $http, $rootScope,
		postService) {
	$scope.userMail;
	$scope.loadMail = function() {
		var url = 'http://localhost/Licenta/messageGet.php';
		$http({
			method : 'GET',
			url : url

		}).then(function successCallback(data) {

			$scope.userMail = data.data;

		}, function errorCallback(response) {

		});

	};
	
	$scope.messageTextReply = "Reply to message...";
	$scope.sendFromId;
	$scope.messageReplySubject;
	$scope.messageId;
	$scope.messageIndex;
	setInterval(function() {
		$scope.loadMail();
	}, 15000);
	$scope.loadMail();
	$scope.viewMail = function(mailId, sentToId, sendFromId, first_name,
			last_name, messageText, messageSubject, messageIndex, messageId) {
		$(".mailPopUp").css("display", "block");
		$scope.sentFromUser = first_name + " " + last_name;
		$scope.messageTextView = messageText;
		$scope.messageId = messageId;
		$scope.sendFromId=sendFromId;
	
		console.log($scope.sentFromUser);
		$scope.messageSubject = messageSubject;
		$scope.messageIndex=messageIndex;
		if($scope.sentFromUser=="System ")
			{
			$(".switchMail").css("display","none");
			}
		else{$(".switchMail").css("display","block");}
		$scope.sentFromId = sendFromId;
		$scope.messageReplySubject = messageSubject;
		$scope.userMail.MESSAGES[messageIndex].message_status = 2;
		$rootScope.messageNumber = $rootScope.messageNumber - 1;
		var message = {
			messageId : messageId,
			messageStatus : 2
		};

		var url = 'http://localhost/Licenta/emailStatus.php';

		postService.objSend(url, message).then(function(data) {
			console.log("Message is read");
		});

	};

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

$scope.emptyText=function(){
	$scope.messageTextReply="";
}
	
	
	
	$scope.replyMessage = function(messageText) {
		user_from_id = getCookie("user_id");
		var messageSubject = "Re: " + $scope.messageReplySubject;
		var message = {
			sent_from_id : user_from_id,
			sent_to_id : $scope.sentFromId,
			message_text : messageText,
			message_subject : messageSubject
		};

		var url = 'http://localhost/Licenta/messageSend.php';

		postService.objSend(url, message)
				.then(
						function(data) {

							if (data.data) {
								sweetAlert("Succes!", "Message Sent!",
										"success");
								$scope.messageTextReply="Reply to message";

							} else {
								sweetAlert("Try again",
										"Make sure you have selected a person",
										"error");

							}
						});

	}

	$scope.close_popup = function() {
		$(".mailPopUp").css("display", "none");
	};

	$(document).mouseup(function(e) {
		var container = $(".mail_pop_content");

		if (!container.is(e.target) // if the target of the click isn't the
									// container...
				&& container.has(e.target).length === 0) // ... nor a
															// descendant of the
															// container
		{
			$(".mailPopUp").css("display", "none");
		}
	});
	
	
	
	$scope.deleteMessage=function(message){
	
		
		var messageId={message_id:$scope.messageId};
		var url2 = 'http://localhost/Licenta/deleteMessage.php';

		 
		         postService.objSend(url2,messageId).then(function(data){
		            
		           if(data.data)
		           { 	
		        	   sweetAlert("Succes!", "Message Deleted!", "success");
		        	   $(".mailPopUp").css("display", "none");
		        	   $scope.userMail.MESSAGES.splice($scope.messageIndex,1);
		        	  
		              
		 
		              }
		           else
		           {
		               sweetAlert("Try again", "Something went wrong!", "error"); 
		                
		           }
		        });
		
	}

});
