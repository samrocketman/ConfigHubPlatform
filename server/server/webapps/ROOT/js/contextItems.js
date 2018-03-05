angular.module("configHub.repository.contextItems",[]).controller("ContextItemsController",["$stateParams","$scope","$http","$rootScope",function(d,c,e,b){c.depthData={};
c.depthScores=[];
c.initialized=false;
b.selectedTab=0;
c.repoName=d.name;
c.account=d.owner;
e.get("/rest/contextItems/"+d.owner+"/"+d.name).then(function a(f){c.depthData=f.data.depthData;
c.depthScores=f.data.depthScores;
c.canManageContext=f.data.canManageContext;
c.initialized=true
});
c.loadingIsDone=function(){return c.loadingIsDone
};
c.repoName=d.name
}]).filter("levelFilter",function(){return function(a,f,c){if(!f){return a
}var b=[],d=new RegExp(f,"i"),g=0,e;
for(;
g<a.length;
g++){e=a[g];
if(d.test(e.name)){b.push(e)
}}return b
}
});