app
 .controller(
  'projectCreateController',
  function($scope, $window, $http, postService, $timeout) {

   $scope.teamMembersCreate = [];
   $scope.project_id = null;
   $scope.teamLeadId
   $scope.createProject = function() {

    if (!$scope.projectName) {
    	
     $scope.showErrorMessage("Please choose a project name!");
     
    } 
    else if(!$scope.myDate)
    {$scope.showErrorMessage("Please choose a starting date!");}
    else{
     var date = $scope.myDate.getFullYear() + "-" + $scope.myDate.getMonth() + "-" + $scope.myDate.getDate();
     
     var estimatedTimes = Math.round($scope.estimatedTime);
     
     var project = {
      start_date: date,
      project_name: $scope.projectName,
      estimatedTime: estimatedTimes,
      project_description: tinyMCE.activeEditor.getContent(),
      project_teamlead_id:$scope.teamLeadId
     };

     var url = 'http://localhost/Licenta/createProject.php';

     postService.objSend(url, project).then(function(data) {

        var response = data.data.replace(/\s+/g, '');
        var responseFinal = response.substring(0, 7);
        console.log(response)
        $scope.projectCreatedid = response.substring(7);
        
        angular.forEach($scope.teamMembersCreate, function(value,key) {
           value.project_id = $scope.projectCreatedid;
           value.project_name = $scope.projectName;
         
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
         sweetAlert("Succes!","Project Created!","success");

         tinyMCE.activeEditor.setContent("");
         $scope.projectName = null;
         $scope.estimatedTime = null;
         $scope.teamLeadName = null;
         $scope.teamLeadId = null;
         $scope.teamMembersCreate.length = 0
         $(".searchTeamContainer").css("display","block");
         $(".deleteTeamLeadContainer").css("display","none");

        } else {
         sweetAlert("Try again","Make sure everything is correct","error");

        }
       });

    }

   }

   $scope.addTeamLead = function(user_id, user_first_name,
    user_last_name) {
    $scope.teamLeadName = user_first_name + " " + user_last_name;
    $scope.teamLeadId = user_id;
    var message = $scope.teamLeadName + " added as Team Leader";

    $scope.showSuccessMessage(message);

    $(".deleteTeamLeadContainer").removeClass("fadeOutClass");
    $(".searchTeamContainer").removeClass("fadeInClass");
    $(".deleteTeamLeadContainer").addClass("fadeInClass");
    $(".searchTeamContainer").addClass("fadeOutClass");
    $(".deleteTeamLeadContainer").css("display", "block");
    $(".searchTeamContainer").css("display", "none");
   }

   $scope.loadUsers = function() {
    var url = 'http://localhost/Licenta/usersShortGet.php';
    $http({
     method: 'GET',
     url: url

    }).then(function successCallback(data) {

     $scope.usersData = data.data;

    }, function errorCallback(response) {

    }); // CallBack End

   };

   $scope.loadUsers();

   $scope.deleteTeamLead = function() {

    var message = $scope.teamLeadName + " removed from Team Leader";

    $scope.showSuccessMessage(message);

    $(".deleteTeamLeadContainer")
     .removeClass("fadeInClass");
    $(".searchTeamContainer").removeClass("fadeOutClass");
    $(".deleteTeamLeadContainer").addClass("fadeOutClass");
    $(".searchTeamContainer").addClass("fadeInClass");
    $scope.teamLeadName = "empty";
    $scope.teamLeadId = 0;
    $(".searchTeamContainer").css("display", "block");
    $(".deleteTeamLeadContainer").css("display", "none");

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

   $scope.addTeamMember = function(user_id, first_name,
    last_name, role_name) {
    var user = {
     user_id: user_id,
     FIRST_NAME: first_name,
     LAST_NAME: last_name,
     role_name: role_name,
     project_id: null,
     project_name:null
    };

    $scope.teamMembersCreate.push(user);
    $('.teamMembersToggle').slideDown("fast", "linear");
    $scope.showSuccessMessage(first_name + " " + last_name + " added to team!");

   };

   $scope.toggle = function(par1, par2) {

    var selectie = par1;
    var selectie2 = par2;
    $('.' + selectie2).slideToggle("fast", "linear");
    $('.' + selectie).toggleClass("glyphicon glyphicon-menu-down glyphicon glyphicon-menu-up ",300);
    

   };

   $scope.deleteTeamMember = function(user_id, first_name,
    last_name, index) {
    $scope.teamMembersCreate.splice(index, 1);
    $scope.showSuccessMessage(first_name + " " + last_name + " removed from team!");

   }

  });