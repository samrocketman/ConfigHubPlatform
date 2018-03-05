angular.module("configHub.signup",[]).controller("SignupCtrl",["$http","$state","$scope","store","jwtHelper","$rootScope","$httpParamSerializer",function(g,e,c,b,f,a,d){c.name="";
c.email="";
c.username="";
c.password="";
c.signup=function(){var h={email:c.email,username:c.username,password:c.password};
g({method:"POST",url:"/rest/signup",data:d(h),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(i){if(!i.data.success){c.errorEmail=i.data.error_email;
c.errorUsername=i.data.error_username;
c.errorPassword=i.data.error_password;
c.message=i.data.message
}else{c.processLoginToken(i.data.token);
if(!a.goToLastLocation()){e.go("dashboard")
}}})
}
}]);