angular.module("configHub.repoCreate",[]).controller("CreateRepositoryController",["$state","$stateParams","$http","$scope","$rootScope","repositoryNameCheckService","$httpParamSerializer",function(a,l,h,m,j,f,g){m.administeredAccounts=[];
m.isNew=true;
h.get("/rest/getAdministeredAccounts").then(function(i){m.administeredAccounts=i.data
});
m.ownerSelectConfig={create:false,valueField:"un",labelField:"un",searchField:["un"],delimiter:",",placeholder:"Choose owner",closeAfterSelect:true,openOnFocus:true,sortField:"un",maxItems:1};
m.togglesDisabled=false;
m.repo={};
m.features={};
m.repo.owner=l.account?l.account:m.user().username;
m.features.accessControlEnabled=false;
m.features.securityProfilesEnabled=false;
m.features.valueTypeEnabled=false;
m.features.contextClustersEnabled=false;
m.hideFeaturesBtns=true;
var n=true,d=0,c={},e;
function k(){m.errorMessage="";
m.errorName="";
m.contextError="";
m.ctxLbl=[];
n=true;
if(!m.repo.owner){m.errorOwner="Select repository owner.";
n=false
}if(!m.repo.name){m.errorName="Repository name is not specified.";
n=false
}for(d in m.contexts){if(!m.contexts[d].label){m.contexts[d].bad=true;
m.contextError="Context labels have to be specified";
n=false
}else{delete m.contexts[d].bad
}}return n
}m.createRepository=function(){if(!k()){return
}c={owner:m.repo.owner,name:m.repo.name,description:m.repo.description,"private":true,contextSize:m.contexts.length,labels:b()};
h({method:"POST",url:"/rest/createRepository",data:g(c),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function i(o){if(!o.data.success){m.errorMessage=o.data.message;
if(o.data.hasOwnProperty("errors")){m.errorName=o.data.errors.name;
m.errorDepth=o.data.errors.depth
}}else{a.go("repo.editor",{owner:m.repo.owner,name:m.repo.name})
}})
};
function b(){return m.contexts.map(function(i){return i.label
}).join(",")
}m.contexts=[{label:"Product"},{label:"Environment"},{label:"Application"},{label:"Instance"}];
m.removeContext=function(i){m.contexts.splice(i,1)
};
m.addContext=function(){if(m.contexts.length<10){m.contexts.push({label:""})
}};
m.errorName="";
m.errorOwner="";
m.validateName=function(){if(!m.repo.owner){m.errorOwner=true
}else{f.cancel(e);
e=f.isValid(m.repo.owner,m.repo.name);
e.then(function i(o){switch(o){case"1":m.errorName="";
break;
case"2":m.errorName=nameError;
break;
case"3":m.errorName="You already own a repository with the same name";
break;
default:m.errorName="";
break
}});
return(e)
}}
}]);