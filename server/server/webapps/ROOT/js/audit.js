angular.module("configHub.repository.audit",[]).controller("AuditController",["$scope","$stateParams","$rootScope",function(b,c,a){b.repoName=c.name;
b.account=c.owner;
a.selectedTab=6
}]).controller("RepoAuditController",["$scope","$stateParams",function(a,b){a.repoName=b.name;
a.account=b.owner
}]).directive("repoAudit",["store",function(a){return{restrict:"A",templateUrl:"repo/audit/repositoryAudit.tpl.html",scope:true,controller:["$scope","$http","$stateParams","$httpParamSerializer","$filter","store","contextService",function(m,i,j,f,g,k,d){var n=k.get("repoAuditTypes"),b=0,c=0,h=g("orderBy"),l=k.get("splitView");
m.sideBySide=l?true:false;
m.toggleSideBySide=function(){m.sideBySide=!m.sideBySide;
m.$emit("sideBySide",m.sideBySide);
k.set("splitView",m.sideBySide);
e(false)
};
m.repoContext={loaded:false};
d.contextElements(m.date,null,m.account,m.repoName).then(function(o){m.repoContext=o;
m.repoContext.loaded=true
});
m.tsFormat=tsFormat;
if(!m.mode){m.mode="all"
}m.$watch("auditRefreshCnt",function(p,o){m.goToLatest()
},true);
m.labels={};
m.attention=false;
m.toggleAttention=function(){m.attention=!m.attention;
m.goToLatest()
};
if(n){m.selectedTypes=JSON.parse(n)
}else{m.selectedTypes=["Config"];
k.set("repoAuditTypes",JSON.stringify(m.selectedTypes))
}m.recordTypes=[{value:"Config",label:"<i class='dlbl props'></i> Properties"},{value:"Files",label:"<i class='dlbl files'></i> Files"},{value:"Tokens",label:"<i class='dlbl token'></i> Tokens"},{value:"Security",label:"<i class='dlbl security'></i> Security"},{value:"Tags",label:"<i class='dlbl tags'></i> Tags"},{value:"Teams",label:"<i class='dlbl team'></i> Teams"},{value:"RepoSettings",label:"<i class='dlbl repo'></i> Settings"}];
m.goToLatest=function(){b=0;
c=0;
e()
};
m.move=function(o){e(o)
};
m.updateSearch=function(){k.set("repoAuditTypes",JSON.stringify(m.selectedTypes));
b=0;
c=0;
e()
};
m.audit=[];
m.lastCommitNo=-1;
m.loadMore=function(o){n=Math.floor(o.count/10);
if(n>500){n=500
}if(n<100){n=100
}o.limit+=n
};
m.getCommitModifications=function(p){p.loading=true;
i({method:"GET",url:"/rest/getCommit/"+m.account+"/"+m.repoName,params:{rev:p.rev},headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function o(q){p.records=q.data.audit[0].records;
p.overloaded=false
})
};
function e(p){if(!m.account||!m.repoName){return
}switch(m.mode){case"all":i({method:"POST",url:"/rest/getRepositoryAudit/"+m.account+"/"+m.repoName,data:f({recordTypes:m.selectedTypes.join(","),max:10,starting:null==p?b:p?c:b,direction:null==p?0:p?1:-1,attention:m.attention}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function o(q){if(q.data.success){m.labels=q.data.labels;
m.audit=h(q.data.audit,"-ts");
if(m.audit&&m.audit.length>0){b=m.audit[0].rev;
c=m.audit[m.audit.length-1].rev
}}});
break;
case"key":i({method:"POST",url:"/rest/getKeyAudit/"+m.account+"/"+m.repoName,data:f({key:m.key,max:10,starting:null==p?b:p?c:b,direction:null==p?0:p?1:-1}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function o(q){if(q.data.success){m.labels=q.data.labels;
m.audit=h(q.data.audit,"-ts");
if(m.audit&&m.audit.length>0){b=m.audit[0].rev;
c=m.audit[m.audit.length-1].rev
}}});
break
}}m.getLabel=function(o){if(m.labels[o]){return m.labels[o]
}return"Label not found"
};
m.editComment=function(p,q){i({method:"POST",url:"/rest/editCommitComment/"+m.account+"/"+m.repoName,data:f({commitId:p.rev,comment:q}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function o(r){if(r.data.success){p.comment=q;
p.editComment=false
}else{p.error=r.data.message
}})
}
}]}
}]).directive("tagDiff",function(){return{restrict:"A",templateUrl:"repo/audit/tagDiff.tpl.html",scope:true,controller:["$scope","$filter",function(a,c){a.entry=a.record.entry;
a.diff=a.entry.diff;
var b,d=c("amDateFormat");
if(a.record.revType==="Modify"){b=a.objKeyPresent(a.diff,"readme");
a.showReadme=b||a.entry.readme;
a.readmeDiff=b&&a.diff.readme!=a.entry.readme;
a.nameChange=a.objKeyPresent(a.diff,"name");
a.tsChange=a.objKeyPresent(a.diff,"ts");
if(a.tsChange){a.ot=d(a.diff.ts,tsFormat)+" (Local time)";
a.ct=d(a.entry.ts,tsFormat)+" (Local time)"
}}}]}
}).directive("differ",[function(){return{restrict:"A",replace:true,link:function(c,d){var b=c.oldContent,e=c.currContent;
var a=difflib.unifiedDiff(angular.isArray(b)?b:b.split("\n"),angular.isArray(e)?e:e.split("\n"),{fromfile:"Original",tofile:"Current",lineterm:""});
c.contentModified=a.length>0;
if(c.contentModified){var f=new Diff2HtmlUI({diff:a.join("\n")});
f.draw(d,{outputFormat:c.sideBySide?"side-by-side":"line-by-line",showFiles:false,matching:"none"});
if(null==c.noHighlight||!c.noHighlight){f.highlightCode(d)
}}else{c.currContent=angular.isArray(e)?e:e.split("\n")
}}}
}]).directive("dirDiff",function(){return{restrict:"A",templateUrl:"repo/audit/dirDiff.tpl.html",scope:true,controller:["$scope",function(a){a.entry=a.record.entry;
a.diff=a.entry.diff
}]}
}).directive("fileDiff",function(){return{restrict:"A",templateUrl:"repo/audit/fileDiff.tpl.html",scope:true,controller:["$scope","$http","$httpParamSerializer","secretService",function(j,g,f,d){j.entry=j.record.entry;
j.diff=j.entry.diff;
j.oldContent="";
j.currContent="";
j.oldSpName="";
j.currSpName="";
var c,b,h,e;
j.mod=false;
if(j.record.revType==="Modify"){j.mod=true;
j.pathChange=j.objKeyPresent(j.diff,"absPath");
j.nameChange=j.objKeyPresent(j.diff,"fileName");
j.contentModified=true;
j.oldContext=j.diff?j.diff.context:null;
j.currContext=j.entry.levels;
j.currActive=j.entry.active;
j.spNameMatch=j.diff.spName===j.entry.spName;
if(j.spNameMatch){j.currSpName=j.oldSpName=j.entry.spName;
j.encrypted=j.entry.encryptionState==1
}else{j.currSpName=j.entry.spName;
j.oldSpName=j.diff.spName;
j.encrypted=j.diff.encrypted||j.entry.encryptionState==1
}if(!j.encrypted){if(j.diff.content){j.oldContent=j.diff.content
}else{j.oldContent=j.entry.content
}j.currContent=j.entry.content
}for(e in j.currContext){c=j.currContext[e].n?j.currContext[e].n:"";
if(j.oldContext){b=j.currContext[e].p;
h=indexOf(j.oldContext,"p",b);
if(-1!=h){c=j.oldContext[h].n?j.oldContext[h].n:""
}}j.currContext[e].on=c;
if(!j.currContext[e].n){j.currContext[e].n=""
}}}else{if(j.record.revType=="Delete"){j.encrypted=j.entry.encryptionState==1;
j.currSpName=j.oldSpName=j.entry.spName;
j.oldContent=j.entry.content.split("\n");
j.currContext=j.entry.levels;
j.currActive=j.entry.active
}else{j.currContext=j.entry.levels;
j.encrypted=j.entry.encryptionState==1;
j.currSpName=j.oldSpName=j.entry.spName;
j.currContent=j.entry.content.split("\n");
j.currActive=j.entry.active
}}var a;
j.decrypt=function(){if(!j.diff){j.diff={name:j.entry.spName}
}else{if(!j.diff.name){j.diff.name=j.entry.spName
}}if(j.spNameMatch||((!j.diff||!j.diff.spName)&&j.entry.spName)){d.authAndExecAudit(j,j.commit.ts,j.entry.spName,function(k){a={id:j.entry.id,revId:j.commit.rev,password:k,oldSpName:j.diff.spName,ts:j.commit.ts};
g({method:"POST",url:"/rest/decryptAuditFile/"+j.account+"/"+j.repoName,data:f(a),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function i(l){if(l.data.success){if(j.record.revType=="Delete"){j.oldContent=l.data.content.split("\n")
}else{if(j.record.revType=="Add"){j.currContent=l.data.content.split("\n")
}else{j.oldContent=l.data.old;
j.currContent=l.data.content
}}j.encrypted=false
}})
})
}else{if(j.diff.spName&&j.entry.spName){d.authSwitchAndExecAudit(j,j.currSpName,j.oldSpName,j.commit.ts,function(){a={id:j.entry.id,revId:j.commit.rev,password:d.get(j.currSpName,j.commit.ts),oldPass:d.get(j.oldSpName,j.commit.ts),oldSpName:j.diff.spName,ts:j.commit.ts};
g({method:"POST",url:"/rest/decryptAuditFile/"+j.account+"/"+j.repoName,data:f(a),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function i(k){if(k.data.success){if(j.record.revType=="Delete"){j.oldContent=k.data.content
}else{if(j.record.revType=="Add"){j.currContent=k.data.content.split("\n")
}else{j.oldContent=k.data.old;
j.currContent=k.data.content
}}j.encrypted=false
}})
})
}else{if(j.diff.spName&&!j.entry.spName){d.authAndExecAudit(j,j.commit.ts,j.diff.spName,function(k){a={id:j.entry.id,revId:j.commit.rev,oldPass:k,oldSpName:j.diff.spName,ts:j.commit.ts};
g({method:"POST",url:"/rest/decryptAuditFile/"+j.account+"/"+j.repoName,data:f(a),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function i(l){if(l.data.success){if(j.record.revType=="Delete"){j.oldContent=l.data.content
}else{if(j.record.revType=="Add"){j.currContent=l.data.content.split("\n")
}else{j.oldContent=l.data.old;
j.currContent=l.data.content
}}j.encrypted=false
}})
})
}}}}
}]}
}).directive("repositoryDiff",function(){return{restrict:"A",templateUrl:"repo/audit/repositoryDiff.tpl.html",scope:true,controller:["$scope",function(c){c.entry=c.record.entry;
c.diff=c.entry.diff;
c.oldCtx="";
c.newCtx="";
c.depthScores=depthScores;
c.contextScopeChanged=c.objKeyPresent(c.diff,"depth");
if(c.objKeyPresent(c.diff,"labels")){var a=false,e,d;
for(e in c.depthScores){d=c.depthScores[e];
if(c.diff.labels[d]){if(a){c.oldCtx+=" > "
}c.oldCtx+=c.diff.labels[d];
a=true
}}a=false;
for(e in c.depthScores){d=c.depthScores[e];
if(c.entry.labels[d]){if(a){c.newCtx+=" > "
}c.newCtx+=c.entry.labels[d];
a=true
}}}}]}
}).directive("securityProfileDiff",function(){return{restrict:"A",templateUrl:"repo/audit/securityProfileDiff.tpl.html",scope:true,controller:["$scope",function(a){a.entry=a.record.entry;
a.diff=a.entry.diff;
if(a.record.revType==="Modify"){a.nameDiffSet=a.objKeyPresent(a.diff,"name");
a.encDiffSet=a.objKeyPresent(a.diff,"encrypted");
a.cipherDiffSet=a.objKeyPresent(a.diff,"cipher")
}}]}
}).directive("keyDiff",function(){return{restrict:"A",templateUrl:"repo/audit/keyDiff.tpl.html",scope:true,controller:["$scope",function(b){b.entry=b.record.entry;
b.diff=b.entry.diff;
var d,a,c;
if(b.record.revType==="Modify"){d=b.objKeyPresent(b.diff,"readme");
b.showReadme=d||b.entry[1].readme;
b.readmeDiff=d&&b.diff.readme!=b.entry[1].readme;
a=b.objKeyPresent(b.diff,"vdt");
b.showVdt=a||(b.entry[1].vdt&&b.entry[1].vdt!="Text");
b.vdtDiff=a&&b.diff.vdt!=b.entry[1].vdt;
c=b.objKeyPresent(b.diff,"spName");
b.showSp=c||b.entry[1].spName;
b.spDiff=c&&b.diff.spName!=b.entry[1].spName;
b.keyDiffSet=b.objKeyPresent(b.diff,"key")
}}]}
}).directive("contextItemDiff",function(){return{restrict:"A",templateUrl:"repo/audit/contextItemDiff.tpl.html",scope:true,controller:["$scope",function(b){b.entry=b.record.entry;
b.diff=b.entry.diff;
b.assignmentDiff=b.objKeyPresent(b.diff,"assignments");
if(b.assignmentDiff){b.diffAssignments=[];
var e=b.entry.assignments?b.entry.assignments:[],a=b.diff.assignments?b.diff.assignments:[],d=0,c;
for(;
d<e.length;
d++){c=a.indexOf(e[d]);
if(c>=0){b.diffAssignments.push({m:0,n:a[c]});
a.splice(c,1)
}}for(d=0;
d<b.diffAssignments.length;
d++){e.splice(e.indexOf(b.diffAssignments[d].n),1)
}for(d=0;
d<e.length;
d++){b.diffAssignments.push({m:1,n:e[d]})
}for(d=0;
d<a.length;
d++){b.diffAssignments.push({m:-1,n:a[d]})
}}}]}
}).directive("propertyDiff",function(){return{restrict:"A",templateUrl:"repo/audit/valueDiff.tpl.html",scope:true,controller:["$scope","$http","$httpParamSerializer","secretService",function(l,h,e,c){var k=l.record.entry,j=k.diff,f=l.record.revType,d,b,a,g;
l.oldContent="";
l.currContent="";
l.oldContext=j?j.context:null;
l.currContext=k.levels;
l.commit.hasKey=false;
l.showKey=function(){if(l.commit.hasKey){return false
}for(d in l.commit.records){if(l.commit.records[d].type==="propertyKey"){l.commit.hasKey=true;
return false
}}return true
};
l.mod=false;
l.encryptionState=k.encryptionState;
if(f=="Modify"){l.mod=true;
if(j.hasOwnProperty("active")){l.oldActive=j.active
}else{l.oldActive=k.active
}l.currActive=k.active;
for(d in l.currContext){b=l.currContext[d].n?l.currContext[d].n:"";
if(l.oldContext){a=l.currContext[d].p;
g=indexOf(l.oldContext,"p",a);
if(-1!=g){b=l.oldContext[g].n?l.oldContext[g].n:""
}}l.currContext[d].on=b;
if(!l.currContext[d].n){l.currContext[d].n=""
}}if(j.value){if(angular.isObject(j.value)||angular.isArray(j.value)){l.oldContent=JSON.stringify(j.value,null,4).split("\n")
}else{l.oldContent=j.value.split("\n")
}}else{if(angular.isObject(k.value)||angular.isArray(k.value)){l.oldContent=JSON.stringify(k.value,null,4)
}else{l.oldContent=k.value.split("\n")
}}if(angular.isObject(k.value)||angular.isArray(k.value)){l.currContent=JSON.stringify(k.value,null,4).split("\n")
}else{l.currContent=k.value?k.value.split("\n"):""
}}else{if(f=="Delete"){l.oldContext=k.levels;
if(angular.isObject(k.value)||angular.isArray(k.value)){l.oldContent=JSON.stringify(k.value,null,4).split("\n")
}else{l.oldContent=k.value.split("\n")
}l.currActive=k.active
}else{l.currContext=k.levels;
if(angular.isObject(k.value)||angular.isArray(k.value)){l.currContent=JSON.stringify(k.value,null,4).split("\n")
}else{l.currContent=k.value.split("\n")
}l.currActive=k.active
}}l.decrypt=function(){c.authAndExecAudit(l,l.commit.ts,k.spName,function(m){h({method:"POST",url:"/rest/decryptAuditValue/"+l.account+"/"+l.repoName,data:e({id:k.id,revId:l.commit.rev,password:m}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function i(n){if(n.data.success){if(f=="Delete"){l.oldContent=n.data.value
}else{l.oldContent=n.data.old;
l.currContent=n.data.value
}l.encryptionState=0
}})
})
}
}]}
}).directive("tokenDiff",function(){return{restrict:"A",templateUrl:"repo/audit/tokenDiff.tpl.html",scope:true,controller:["$scope",function(b){b.entry=b.record.entry;
b.diff=b.entry.diff;
b.diff_active=b.diff&&b.diff.hasOwnProperty("active")&&b.diff.active!=b.entry.active;
b.diff_forceKeyPushEnabled=b.diff&&b.diff.hasOwnProperty("forceKeyPushEnabled")&&b.diff.forceKeyPushEnabled!=b.entry.forceKeyPushEnabled;
b.diff_rulesTeam=b.diff&&b.diff.hasOwnProperty("rulesTeam")&&b.diff.rulesTeam!=b.entry.rulesTeam;
b.diff_managingTeam=b.diff&&b.diff.hasOwnProperty("managingTeam")&&b.diff.managingTeam!=b.entry.managingTeam;
b.diff_user=b.diff&&b.diff.hasOwnProperty("user")&&b.diff.user!=b.entry.user;
b.diff_managedBy=b.diff_user||(b.diff&&b.diff.hasOwnProperty("managedBy")&&b.diff.managedBy!=b.entry.managedBy);
b.usedByWas=b.usedByIs="";
if(b.diff_managedBy){switch(b.diff.managedBy?b.diff.managedBy:b.entry.managedBy){case"User":b.usedByWas=b.diff.user;
break;
case"Admins":b.usedByWas="Admins / Owners";
break;
case"Team":b.usedByWas=b.diff.managingTeam;
break;
case"All":b.usedByWas="Everyone";
break
}}switch(b.entry.managedBy){case"User":b.usedByIs=b.entry.user;
break;
case"Admins":b.usedByIs="Admins / Owners";
break;
case"Team":b.usedByIs=b.entry.managingTeam;
break;
case"All":b.usedByIs="Everyone";
break
}b.spsDiff=b.objKeyPresent(b.diff,"sps");
if(b.spsDiff){b.diffSps=[];
var e=b.entry.sps?b.entry.sps:[],a=b.diff.sps?b.diff.sps:[],d=0,c;
for(;
d<e.length;
d++){c=a.indexOf(e[d]);
if(c>=0){b.diffSps.push({m:0,n:a[c]});
a.splice(c,1)
}}for(d=0;
d<b.diffSps.length;
d++){e.splice(e.indexOf(b.diffSps[d].n),1)
}for(d=0;
d<e.length;
d++){b.diffSps.push({m:1,n:e[d]})
}for(d=0;
d<a.length;
d++){b.diffSps.push({m:-1,n:a[d]})
}}}]}
}).directive("teamDiff",function(){return{restrict:"A",templateUrl:"repo/audit/teamDiff.tpl.html",scope:true,controller:["$scope",function(a){a.entry=a.record.entry;
a.diff=a.entry.diff;
a.genRuleProcessTypes=genRuleProcessTypes
}]}
}).directive("ruleDiff",function(){return{restrict:"A",templateUrl:"repo/audit/ruleDiff.tpl.html",scope:true,controller:["$scope",function(a){a.entry=a.record.entry;
a.diff=a.entry.diff;
a.oldContent="";
a.currContent="";
var d,e,c,b;
d="#"+a.entry.priority+". ";
d+=("rw"===a.entry.access?"Read/Write ":"Read-Only ")+"when ";
if("Key"===a.entry.type){d+="key ";
switch(a.entry.match){case"Is":d+="is ";
break;
case"StartsWith":d+="starts with ";
break;
case"EndsWith":d+="ends with ";
break;
case"Contains":d+="contains ";
break
}d+="'"+a.entry.key+"'"
}else{d+="context ";
switch(a.entry.match){case"Resolves":d+="resolves ";
break;
case"DoesNotResolve":d+="does not resolve ";
break;
case"ContainsAny":d+="contains any ";
break;
case"ContainsAll":d+="contains all ";
break;
case"DoesNotContain":d+="does not contain ";
break
}for(c in a.repoContext.depthScores){d+="[ ";
if(a.entry.context[a.repoContext.depthScores[c]]){d+=a.entry.context[a.repoContext.depthScores[c]]
}else{d+="*"
}d+=" ]";
if(a.repoContext.depthScores.length-1>parseInt(c)){d+=" > "
}}}a.currContent=d;
if(!a.diff){a.oldContent=d
}else{b=a.objKeyPresent(a.diff,"priority")?a.diff.priority:a.entry.priority;
e="#"+b+". ";
b=a.objKeyPresent(a.diff,"access")?a.diff.access:a.entry.access;
e+=("rw"===b?"Read/Write ":"Read-Only ")+"when ";
b=a.objKeyPresent(a.diff,"type")?a.diff.type:a.entry.type;
if("Key"===b){e+="key ";
b=a.objKeyPresent(a.diff,"match")?a.diff.match:a.entry.match;
switch(b){case"Is":e+="is ";
break;
case"StartsWith":e+="starts with ";
break;
case"EndsWith":e+="ends with ";
break;
case"Contains":e+="contains ";
break
}b=a.objKeyPresent(a.diff,"key")?a.diff.key:a.entry.key;
e+="'"+b+"'"
}else{e+="context ";
b=a.objKeyPresent(a.diff,"match")?a.diff.match:a.entry.match;
switch(b){case"Resolves":e+="resolves ";
break;
case"DoesNotResolve":e+="does not resolve ";
break;
case"ContainsAny":e+="contains any ";
break;
case"ContainsAll":e+="contains all ";
break;
case"DoesNotContain":e+="does not contain ";
break
}b=a.diff.context?a.diff.context:a.entry.context;
for(c in a.repoContext.depthScores){e+="[ ";
if(b[a.repoContext.depthScores[c]]){e+=b[a.repoContext.depthScores[c]]
}else{e+="*"
}e+=" ]";
if(a.repoContext.depthScores.length-1>parseInt(c)){e+=" > "
}}}a.oldContent=e
}a.noHighlight=true;
a.genRuleProcessTypes=genRuleProcessTypes
}]}
});