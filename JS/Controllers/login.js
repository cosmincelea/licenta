app.controller('logIn', function ($scope, $window, postService) {
   $scope.login=function(){
        var url='http://localhost/Licenta/login.php';
        var dataLog={user:$scope.username,password:$scope.password};
       
       
       postService.objSend(url,dataLog).then(function(data){
        console.log(data.data);
           if(data.data==0)
           {
               $window.location.href="main.html"; 
              }
           else
           {
               sweetAlert("Oops...", "Password or Username is wrong!", "error"); 
                
           }
        });
   } ;

    $(".login-form input").focus(function () {
        var mydiv = this.id;
        var test = document.getElementById(mydiv).offsetWidth + 20;
        $('#'+mydiv).css("width",test+'px');
        

    });
$(".login-form input").focusout(function () {
        var mydiv = this.id;
        var test = document.getElementById(mydiv).offsetWidth - 20;
        $('#'+mydiv).css("width",test+'px');
        

    });




});

