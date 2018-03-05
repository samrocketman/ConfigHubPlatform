angular.module("configHub.organization.create",[]).controller("CreateOrganizationsController",["$scope","$rootScope","$stateParams","$http","$window","$state","accountNameCheckService",function(d,b,f,h,g,e,a){d.organization={};
d.errorName="";
var c;
d.validateNameChange=function(){if(!d.organization.name){d.errorName=""
}else{a.cancel(c);
c=a.isNameTaken(d.organization.name);
c.then(function i(j){switch(j){case 1:d.errorName="";
break;
case 2:d.errorName=nameError;
break;
case 3:d.errorName="Name is already taken";
break;
default:d.errorName="";
break
}});
return(c)
}};
d.createOrganization=function(){h({method:"POST",url:"/rest/createOrganization/"+d.organization.name,headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(i){if(!i.data.success){d.message=i.data.message
}else{d.organization=i.data.organization;
e.go("owner",{accountName:d.organization.un})
}})
}
}]);