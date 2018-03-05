angular.module("configHub.info",[]).controller("ConfigHubInfoController",["$scope","$http",function(a,b){a.initialized=false;
a.errorMessage="";
a.data=[];
b.get("/rest/info/all").then(function(c){a.data=c.data;
a.initialized=true
},function(c){a.errorMessage="Something went wrong";
a.initialized=true
});
b.get("/rest/info/system").then(function(c){a.system=c.data
},function(c){a.errorMessage="Something went wrong"
})
}]);