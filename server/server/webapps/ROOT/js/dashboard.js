angular.module("configHub.dashboard",[]).run(["$rootScope",function(a){a.repository={}
}]).config(["$stateProvider",function(a){a.state("dashboard",{url:"/home/",controller:"DashboardCtrl",templateUrl:"dashboard/dashboard.html",data:{requireLogin:true}})
}]).controller("DashboardCtrl",["$http","$scope","$filter","store",function(f,d,e,c){d.repositories=null;
d.selectedRepo=null;
d.initialized=false;
d.account;
d.repoName;
f({method:"GET",url:"/rest/getDashboardElements"}).then(function a(g){d.sideBySide=c.get("splitView");
if(!d.sideBySide){d.sideBySide=false
}d.$on("sideBySide",function(k,l){d.sideBySide=l
});
d.repositories=g.data.repositories;
if(d.repositories){var j=e("orderBy"),h=0,i=c.get("lastRepo");
d.repositories=j(d.repositories,"name");
if(i){h=indexOf(d.repositories,"id",i.id);
if(h<0){h=0
}}d.selectRepo(d.repositories[h])
}d.initialized=true
},function b(g){console.log("Caught error:");
console.log(g)
});
d.auditRefreshCnt=0;
d.selectRepo=function(g){d.selectedRepo=g;
d.account=g.account;
d.repoName=g.name;
d.auditRefreshCnt++
}
}]);