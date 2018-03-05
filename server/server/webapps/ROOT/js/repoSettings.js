angular.module("configHub.repository.settings",["puElasticInput"]).controller("CleanupController",["$rootScope","$http","$scope","$stateParams","$state","$httpParamSerializer","auth","$timeout","$alert",function(h,g,j,i,a,e,d,c,f){j.account=i.owner;
j.repoName=i.name;
h.selectedTab=5;
j.initialized=false;
b();
function b(){g.get("/rest/cleanup/"+j.account+"/"+j.repoName+"/keys").then(function(k){j.unusedKeys=k.data.keys;
j.initialized=true
})
}j.allKeys=false;
j.allKeyToggle=function(){j.allKeys=!j.allKeys;
angular.forEach(j.unusedKeys,function(k){k.selected=j.allKeys
})
};
j.deleteSelectedKeys=function(){var k=[];
angular.forEach(j.unusedKeys,function(l){if(l.selected){k.push(l.key)
}});
g({method:"POST",url:"/rest/deleteUnusedKeys/"+i.owner+"/"+i.name,data:e({keys:k.join(",")}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(l){if(l.data.success){b();
j.errorMessage=null
}else{j.errorMessage=l.data.message
}})
}
}]).controller("SettingsController",["$rootScope","$http","$scope","$stateParams","$state","$httpParamSerializer","auth","$timeout","$alert",function(k,j,m,l,a,g,d,c,h){m.account=l.owner;
m.repoName=l.name;
k.selectedTab=5;
m.settings=[{name:"Name & Description",s:"name"},{name:"Configuration",s:"features"},{name:"Context Scope",s:"context"},{name:"Cleanup",s:"cleanup"},{name:"Visibility",s:"visibility"},{name:"Transfer Ownership",s:"transfer"},{name:"Delete Repository",s:"delete"}];
var f,b;
m.selectedIndex=0;
m.selectSetting=function(i){m.settings[m.selectedIndex].selected=false;
m.settings[i].selected=true;
m.selectedIndex=i;
a.go("repo.settings",{owner:m.account,name:m.repoName,s:m.settings[i].s},{notify:false})
};
m.repo={};
m.initialized=false;
function e(){j.get("/rest/repositoryInfo/"+m.account+"/"+m.repoName).then(function(i){f=0;
if(l.s){f=indexOf(m.settings,"s",l.s)
}m.repo=i.data;
m.features={accessControlEnabled:m.repo.accessControlEnabled,securityProfilesEnabled:m.repo.securityProfilesEnabled,valueTypeEnabled:m.repo.valueTypeEnabled,contextClustersEnabled:m.repo.contextClustersEnabled,isPersonal:m.repo.isPersonal,adminContextControlled:m.repo.adminContextControlled,tokenlessAPIPull:m.repo.tokenlessAPIPull,tokenlessAPIPush:m.repo.tokenlessAPIPush};
m.isPrivate=m.repo.isPrivate;
m.initialized=true;
m.selectSetting(f==-1?0:f)
})
}e();
m.nameMessage="";
m.updateNameAndDescription=function(i,n){j({method:"POST",url:"/rest/updateRepository/"+l.owner+"/"+l.name,data:g({name:i,description:n}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(o){if(o.data.success){k.repository=o.data.repository;
m.nameMessage="";
a.go("repo.settings",{owner:o.data.repository.owner,name:o.data.repository.name,s:"name"})
}else{m.nameMessage=o.data.message
}})
};
m.togglesDisabled=false;
m.saveFeatures=function(){d.authAndExec(m,function(i){b={accessControl:m.features.accessControlEnabled,securityProfiles:m.features.securityProfilesEnabled,valueType:m.features.valueTypeEnabled,contextClusters:m.features.contextClustersEnabled,adminContextControlled:m.features.adminContextControlled,tokenlessAPIPull:m.features.tokenlessAPIPull,tokenlessAPIPush:m.features.tokenlessAPIPush,password:i};
j({method:"POST",url:"/rest/updateRepositoryFeatures/"+m.account+"/"+m.repoName,data:g(b),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(n){if(n.data.success){k.repository=n.data.repository
}else{m.featureMessage=n.data.message;
m.cancelFeatures();
if(n.data.err){for(f in n.data.err){switch(n.data.err[f].type){case"valueType":m.vdtMessage=n.data.err[f].message;
m.keys=n.data.err[f].keys;
break;
case"contextClusters":m.ccMessage=n.data.err[f].message;
break;
case"adminContextControlled":m.ccMessage=n.data.err[f].message;
break
}}}}})
})
};
m.cancelFeatures=function(){m.features={accessControlEnabled:m.repo.accessControlEnabled,securityProfilesEnabled:m.repo.securityProfilesEnabled,valueTypeEnabled:m.repo.valueTypeEnabled,contextClustersEnabled:m.repo.contextClustersEnabled,isPersonal:m.repo.isPersonal,adminContextControlled:m.repo.adminContextControlled}
};
m.transferMessage="";
m.transferOwnership=function(i){d.authAndExec(m,function(n){j({method:"POST",url:"/rest/transferOwnership/"+m.account+"/"+m.repoName,data:g({password:n,toAccount:i}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(o){if(o.data.success){if(o.data.hasOwnProperty("repository")){k.repository=o.data.repository;
a.go("repo.settings",{owner:o.data.repository.owner,name:o.data.repository.name})
}else{k.repository={};
a.go("home")
}}else{m.transferMessage=o.data.message
}})
})
};
m.visibilityMessage="";
m.togglePrivacy=function(i){d.authAndExec(m,function(n){j({method:"POST",url:"/rest/togglePrivacy/"+m.account+"/"+m.repoName,data:g({isPrivate:i}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(o){if(o.data.success){k.repository=o.data.repository
}else{m.visibilityMessage=o.data.message
}})
})
};
m.deleteRepository=function(){m.deleteError="";
d.authAndExec(m,function(i){j({method:"POST",url:"/rest/deleteRepository/"+m.account+"/"+m.repoName,data:g({password:i}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(n){if(n.data.success){a.go("dashboard")
}else{m.deleteError=n.data.message
}})
})
}
}]).controller("SetupContextController",["$rootScope","$http","$scope","$stateParams","$state","$httpParamSerializer","auth","$timeout","$alert",function(h,g,j,i,a,e,c,b,f){var d=[],l,k;
j.getContextSize=function(){return Object.size(j.repo.labels)
};
j.updateContextLabels=function(){d=[];
for(l in depthScores){if(j.repo.labels[depthScores[l]]){d.push(j.repo.labels[depthScores[l]])
}}g({method:"POST",url:"/rest/updateContextLabels/"+i.owner+"/"+i.name,data:e({labels:d.join()}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(m){if(!m.data.success){j.errorMessage=m.data.message
}else{j.repo=m.data.repo;
f({title:"Context labels updated.",container:"#labelSuccess",type:"success",duration:5,show:true})
}})
};
j.scopeLimit=scopeLimit;
j.getContextExpansionMap=function(){if(j.repo.scopeSize==scopeLimit){return[]
}k=[];
k.push(null);
for(l in depthScores){if(j.repo.labels[depthScores[l]]){k.push(j.repo.labels[depthScores[l]]);
k.push(null)
}}return k
};
j.insertLevel=-1;
j.insertContext=function(m){j.insertLevel=m
};
j.cancelCtxExpand=function(){j.insertLevel=-1
};
j.inserting=false;
j.expandContext=function(m){j.inserting=true;
c.authAndExec(j,function(n){g({method:"POST",url:"/rest/addContextLevel/"+i.owner+"/"+i.name,data:e({label:m,index:j.insertLevel,password:n}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(o){if(!o.data.success){j.errorMessage=o.data.message
}else{j.repo=o.data.repo;
j.cancelCtxExpand();
f({title:"Context scope updated.",container:"#contextSuccess",type:"success",duration:5,show:true})
}j.inserting=false
})
})
};
j.removing=[];
j.shrinkMessage="";
j.removeContextRank=function(m){j.removing[m]=true;
c.authAndExec(j,function(n){g({method:"POST",url:"/rest/removeContextLevel/"+i.owner+"/"+i.name,data:e({rank:m,password:n}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(o){if(!o.data.success){j.shrinkMessage=o.data.message
}else{j.shrinkMessage="";
j.repo=o.data.repo;
f({title:"Context scope updated.",container:"#contextSuccess",type:"success",duration:5,show:true})
}j.removing[m]=false
})
})
}
}]);