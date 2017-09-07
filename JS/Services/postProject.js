

app.service("postProject",function($q){
    var myProject={};
	this.objSend=function(obj){
		myProject=obj;
		};
                
                this.getObject=function(){return myProject};
                
});

