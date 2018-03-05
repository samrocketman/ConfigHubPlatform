angular.module("configHub.repository.contextItem",[]).controller("ExistingCiController",["$state","$scope","$rootScope","$http","$stateParams","$httpParamSerializer","editorInit",function(a,p,m,l,n,j,c){p.labels=[];
p.series=[];
p.data=[];
p.charOptions={};
p.isNew=null==n.contextItem?true:false;
m.selectedTab=0;
p.repoName=n.name;
p.account=n.owner;
p.initialized=false;
p.message="";
p.newName="";
p.ci={};
p.standalone=true;
p.usageLoaded=false;
p.assigned={Group:[],Member:[]};
p.validateNameChange=function(){if(p.isNew){return
}};
if(p.isNew){l.get("/rest/canUserManageContext/"+p.account+"/"+p.repoName).then(function(e){p.ci={name:"",type:"Standalone",depthLabel:n.depthLabel,contextClustersEnabled:p.repository.contextClustersEnabled};
p.canManageContext=e.data.canManageContext;
p.standalone=true;
p.ciCount=0;
p.newName="";
p.initialized=true
})
}else{c.setState("contextItem");
l.get("/rest/getContextItem/"+p.account+"/"+p.repoName+"/"+n.depthLabel+"/"+n.contextItem).then(function(e){if(e.data.success){p.ci=e.data.ci;
p.newName=p.ci.name;
p.standalone=p.ci.type=="Standalone";
p.canManageContext=e.data.canManageContext;
if(!p.standalone){p.assigned[p.ci.type]=p.ci.assignments
}p.ciCount=p.ci.assignments?p.ci.assignments.length:0;
c.initialize(p)
}else{p.message=e.data.message
}p.initialized=true
})
}var b,g,h,d=[],k;
p.cancel=function(){b=m.getLastInfo();
if(b&&b.name==="repo.contextItem"&&b.params.depthLabel===n.depthLabel&&b.params.contextItem===n.contextItem){a.go("repo.context",{owner:p.account,name:p.repoName})
}else{if(!m.goToLastLocation()){a.go("repo.context",{owner:p.account,name:p.repoName})
}}};
p.deleteCi=function(){l({method:"POST",url:"/rest/deleteContextItem/"+p.account+"/"+p.repoName,data:j({id:p.ci.id}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(e){if(e.data.success){if(!m.goToLastLocation()){a.go("repo.context",{owner:p.account,name:p.repoName})
}}else{p.errorMessage=e.data.message
}})
};
p.getCiType=function(){if(p.ci.type=="Group"){return"Context Group"
}if(p.ci.type=="Member"){return"Group Member"
}return"Default"
};
p.setType=function(e){p.ci.type=e;
p.standalone=p.ci.type=="Standalone";
f()
};
p.showAllCis=false;
p.toggleAllCis=function(){p.showAllCis=!p.showAllCis;
f()
};
p.iterableAssignments=function(){if(p.showAllCis){return p.ci.assignments
}return p.assigned[p.ci.type]
};
function f(){l({method:"POST",url:"/rest/allDepthLevels/"+p.account+"/"+p.repoName,data:j({id:p.ci.id,type:p.ci.type,depthLabel:n.depthLabel,all:p.showAllCis}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(e){if(e.data.success){p.ci.assignments=e.data.levels;
for(g in p.assigned[p.ci.type]){b=p.assigned[p.ci.type][g];
h=indexOf(p.ci.assignments,"id",b.id);
if(-1!=h){p.ci.assignments[h].state=b.state
}}p.ciCount=p.ci.assignments?p.ci.assignments.length:0
}else{p.message=e.data.message
}})
}p.assignMessage="";
p.isCluster=function(){return p.ci.type==="Group"
};
p.isNode=function(){return p.ci.type==="Member"
};
p.save=function(){if(p.ci.type!="Standalone"){k=p.assigned[p.ci.type];
for(g in k){d.push(k[g].id)
}}l({method:"POST",url:"/rest/saveOrUpdateContextItem/"+p.account+"/"+p.repoName,data:j({id:p.ci.id,name:p.newName,type:p.ci.type,assignments:d.join(","),depthLabel:n.depthLabel}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(e){if(e.data.success){p.cancel()
}else{p.errorMessage=e.data.message
}})
};
p.assign=function(e,i){if(p.ci.type=="Standalone"){return
}if("add"===i){p.assigned[p.ci.type].push(e);
e.state=2
}else{h=indexOf(p.assigned[p.ci.type],"id",e.id);
if(-1!=h){p.assigned[p.ci.type].splice(h,1);
e.state=1
}}};
p.ciReverse=false;
p.ciCurrentPage=1;
p.ciPageSizes={sizes:[{id:10,name:"10"},{id:25,name:"25"},{id:50,name:"50"}],selectedOption:{id:10,name:"10"}};
p.ciCount=0
}]);