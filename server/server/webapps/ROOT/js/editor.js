angular.module("configHub.repository.editor",["configHub.repository.entry","configHub.repository.contextService"]).service("editorInit",["resolverService","store",function(C,k){return({setState:s,getState:u,initialize:a,isLiteral:j,isKeyOnly:E,isSpOnly:m,isFCOnly:e,setContext:x,getContext:l,setKeys:B,getKeys:b,setConfig:q,setContextOptions:w,updateTime:p});
var h,H,y=false,r={},F,n,z,A,g,f,G,v,D={};
function p(d,c){H.setDate(d);
H.setTag(c);
H.postTimeChange()
}function s(c){h=c;
y=h=="key"||h=="contextItem"
}function u(){return h
}function q(d,c){H.config=d;
H.date=c
}function j(){return y
}function E(){return h=="key"
}function m(){return h=="securityProfile"
}function e(){return h=="fileConf"
}function x(c){H.chosenContext=c
}function l(){return H.chosenContext
}function B(c){H.keys=c
}function b(){return H.keys
}function w(c){for(G in c){if(!c[G]){continue
}H.chosenContext[G]=[c[G]]
}}function a(i,d,o,c){if(d){H=i
}if(h=="editor"||"fileConf"==h){r={};
if(c){F=c.split(";");
for(n in F){A=F[n].split(":");
if(!A){continue
}z=parseInt(A[0]);
r[z]=[];
g=A[1].split(",");
for(f in g){r[z].push(g[f])
}}}else{n=k.get(i.ctxStoreName);
if(n){v=JSON.parse(n);
for(z in v){if(v[z]&&v[z].length>0){r[z]=v[z]
}}}}i.chosenContext=r
}else{if("key"==h){i.chosenContext={}
}else{if("contextItem"==h){D={};
D[i.ci.placement]=[];
D[i.ci.placement].push(i.ci.name);
for(z in i.ci.assignments){D[i.ci.placement].push(i.ci.assignments[z].name)
}i.chosenContext=D
}else{if("securityProfile"==h){i.chosenContext={}
}}}}}}]).service("resolverService",["$http","$q","$stateParams","toUtc",function(h,f,l,k){return({cancel:m,resolveProperties:b,resolveEntry:a,resolveSp:i,resolveEntries:c,search:n,resolveConfigFile:g});
var j,e,o;
function m(p){if(p&&p._httpTimeout&&p._httpTimeout.resolve){p._httpTimeout.resolve()
}}function c(t,r,p,v,q,u,s){j=f.defer();
e=h({method:"GET",url:"/rest/mergedKeyValues/"+u+"/"+s+"/"+t+","+r,params:{context:contextParam(v),includeSiblings:p,ts:k.toMS(q)},headers:{"Content-Type":"application/x-www-form-urlencoded"}});
o=e.then(d);
o._httpTimeout=j;
return(o)
}function a(x,p,u,v,q,y,r,w,t,s){j=f.defer();
e=h({method:"GET",url:"/rest/keyProperties/"+t+"/"+s,params:{key:x,context:contextParam(v),sk:r,allValues:p,keyView:u,ts:k.toMS(q),tag:y,literal:w},headers:{"Content-Type":"application/x-www-form-urlencoded"}});
o=e.then(d);
o._httpTimeout=j;
return(o)
}function i(q,p,s,r){j=f.defer();
e=h({method:"GET",url:"/rest/securityProfileAssignments/"+s+"/"+r,params:{profile:q,allKeys:p},headers:{"Content-Type":"application/x-www-form-urlencoded"}});
o=e.then(d);
o._httpTimeout=j;
return(o)
}function g(s,u,t,r,q,p){j=f.defer();
e=h({method:"POST",url:"/rest/getFileKeys/"+t+"/"+r,params:{keys:s,context:contextParam(u),ts:k.toMS(q),tag:p},headers:{"Content-Type":"application/x-www-form-urlencoded"}});
o=e.then(d);
o._httpTimeout=j;
return(o)
}function b(s,v,q,p,r,u,t){j=f.defer();
e=h({method:"GET",url:"/rest/editorResolver/"+u+"/"+t,params:{context:contextParam(v),ts:k.toMS(q),allKeys:s,tag:p,literal:r},timeout:j.promise});
o=e.then(d);
o._httpTimeout=j;
return(o)
}function n(r,p,t,s,q){j=f.defer();
e=h({method:"GET",url:"/rest/searchRepo/"+t+"/"+s,params:{ts:k.toMS(r),tag:p,searchTerm:q},timeout:j.promise});
o=e.then(d);
o._httpTimeout=j;
return(o)
}function d(p){return(p.data)
}}]).controller("EditorInitController",["$rootScope","editorInit",function(a,b){b.setState("editor");
a.selectedTab=0
}]).controller("EditorController",["$rootScope","$scope","$http","$stateParams","store","$filter","$timeout","contextService","resolverService","editorInit","$state","toUtc","focus",function(n,h,o,H,a,A,z,e,r,K,t,b,B){h.repoName=H.name;
h.account=H.owner;
h.ctxStoreName="c_"+h.account+"/"+h.repoName;
h.tsFormat=tsFormat;
h.loading=false;
h.tagLabel=h.selectedTag=H.tag;
h.hdcStoreName="hcd_"+h.account+"/"+h.repoName;
h.tagStoreName="tag_"+h.account+"/"+h.repoName;
var M,I,m,D,E,L,G,v,s,F=[],x,c,l,y,f,C,g=0,j=a.get("pageSize");
if(H.ts){h.date=new Date(JSON.parse(H.ts));
h.timeToSet=h.timeLabel=h.date
}else{M=a.get(h.hdcStoreName);
if(M){h.date=new Date(JSON.parse(M));
h.timeToSet=h.timeLabel=h.date;
t.go("repo.editor",{owner:h.account,name:h.repoName,tag:"",ts:b.toMS(h.date)},{notify:false})
}else{h.date=null
}h.now=Date.now()
}h.setDate=function(d){h.date=d
};
h.setTag=function(d){h.selectedTag=d
};
h.updateUrl=function(){t.go("repo.editor",{owner:h.account,name:h.repoName,tag:"",ts:b.toMS(h.date)},{notify:false})
};
h.postTimeChange=function(){h.updateUrl();
w();
if(!(!h.localSearch&&h.searchQuery&&h.searchQuery.length>0)){q()
}else{h.searchRepo(h.searchQuery)
}};
h.isLive=function(){return null==h.date&&null==h.selectedTag
};
h.getDate=function(){return h.date
};
K.initialize(h,true,h.date,H.ctx);
h.localSearch=false;
h.setRepoSearchMode=function(i,d){if(d){h.allKeys=false
}if(h.localSearch===i){B("searchTerm");
return
}h.localSearch=i;
if(d&&d.length>0){if(h.localSearch){q()
}else{h.searchRepo(d)
}}B("searchTerm")
};
h.searchRepo=function(i){if(h.localSearch){return
}if(!i||i.length==0){q(false,true)
}else{h.loading=true;
h.lastRequest=r.search(h.date,h.selectedTag,h.account,h.repoName,i);
h.lastRequest.then(function d(k){h.config=k.config;
h.propertiesLoaded=true;
h.loading=false
})
}};
h.contextSelectConfig=contextSelectConfig;
h.repoContext={loaded:false};
h.keySorters=[{lbl:"Context relevance",asc:true,srt:"score"},{lbl:"Value",asc:false,srt:"value"},{lbl:""}];
function w(){h.repoContext.loaded=false;
e.contextElements(h.date,h.selectedTag,h.account,h.repoName).then(function(d){h.repoContext=d;
for(I in h.repoContext.depthScores){m=h.repoContext.depthScores[I];
D=h.repoContext.depths[m].label;
h.keySorters.push({lbl:D,asc:false,srt:"levels["+I+"].n"})
}if(h.selectedTag){I=indexOf(h.repoContext.tags,"name",h.selectedTag);
if(I<0){h.selectedTag=""
}else{E=h.repoContext.tags[I];
L=E.ts;
h.timeLabel=h.timeToSet=new Date(E.ts);
h.date=new Date(JSON.parse(L))
}}h.repoContext.loaded=true;
if(K.isFCOnly()){p()
}})
}h.getRepoContext=function(){return h.repoContext
};
h.allKeys=false;
h.allKeyToggle=function(){h.allKeys=!h.allKeys;
if(h.allKeys){h.searchQuery=""
}q()
};
h.lineupContext=false;
h.toggleContextLineup=function(){h.lineupContext=!h.lineupContext
};
h.propertiesLoaded=false;
h.lastRequest;
n.removeKeys=function(d){for(I in d){G=d[I].replace(/\s/g,"");
v=indexOfEntry(h.config,G);
if(-1!=v){h.config.splice(v,1)
}}};
h.$watch("chosenContext",function(i,d){if(!K.isLiteral()&&h.repoContext.loaded){if(h.disabledContextSelector){M=a.get(h.ctxStoreName);
if(M){C=JSON.parse(M)
}else{C={}
}for(I in h.repoContext.depthScores){f=h.repoContext.depthScores[I];
if(!h.disabledContextSelector[f]){C[f]=h.chosenContext[f]
}}a.set(h.ctxStoreName,JSON.stringify(C))
}else{a.set(h.ctxStoreName,JSON.stringify(h.chosenContext))
}}h.now=Date.now();
if(!(!h.localSearch&&h.searchQuery&&h.searchQuery.length>0)){q(true)
}if(K.isFCOnly()&&h.repoContext.loaded){p()
}},true);
function p(){C=true;
for(I in h.repoContext.depthScores){if(!h.chosenContext[h.repoContext.depthScores[I]]||h.chosenContext[h.repoContext.depthScores[I]].length!=1){C=false;
break
}}h.fullContext=C
}h.$on("fileChanged",function(d){q(false)
});
function q(k,i){r.cancel(h.lastRequest);
if(K.isKeyOnly()){h.propertiesLoaded=false;
h.lastRequest=r.resolveEntry(H.key,true,K.isKeyOnly(),{},null,null,null,true,h.account,h.repoName);
h.lastRequest.then(function d(N){N.singleKey=true;
h.config=[];
h.config.push(N);
h.initialized=true;
h.propertiesLoaded=true
})
}else{if(K.isSpOnly()){h.propertiesLoaded=false;
h.lastRequest=r.resolveSp(H.profile,h.allKeys,h.account,h.repoName);
h.lastRequest.then(function d(N){h.config=N.config;
h.propertiesLoaded=true
})
}else{if(K.isFCOnly()){if(!h.localSearch&&h.searchQuery&&h.searchQuery.length>0){h.searchRepo(h.searchQuery);
return
}if(!h.initialized){h.propertiesLoaded=true;
return
}if(i){h.config=[];
F=h.$parent.getCurrentTokens();
s=F.join()
}else{if(k){F=[];
if(h.config){for(I in h.config){F.push(h.config[I].key)
}}s=F.join()
}else{s=K.getKeys()
}}if(k){h.propertiesLoaded=false
}h.lastRequest=r.resolveConfigFile(s,h.chosenContext,h.account,h.repoName,h.date,h.selectedTag);
h.lastRequest.then(function d(N){if(!N.success){if(g==0&&N.resetContext){g=1;
h.chosenContext={};
a.set(h.ctxStoreName,JSON.stringify(h.chosenContext));
q(k,i)
}else{h.error=N.message
}}else{h.canManageContext=N.canManageContext;
if(k){h.config=N.config;
h.propertiesLoaded=true
}else{if(!h.config){h.config=[]
}for(I in N.config){x=N.config[I];
v=indexOfEntry(h.config,x.key);
if(-1!=v){h.config.splice(v,1)
}x.f={k:{0:{},1:{},2:{}}};
h.config.push(x)
}}}})
}else{h.loading=true;
h.lastRequest=r.resolveProperties(h.allKeys,h.chosenContext,h.date,h.selectedTag,K.isLiteral(),h.account,h.repoName);
h.lastRequest.then(function d(N){if(N.error){if(g==0&&N.resetContext){g=1;
h.chosenContext={};
a.set(h.ctxStoreName,JSON.stringify(h.chosenContext));
q(k,i)
}else{h.error=N.error
}}else{h.canManageContext=N.canManageContext;
h.config=N.config;
g=0
}h.propertiesLoaded=true;
h.loading=false
})
}}}return(h.lastRequest)
}h.resolveEntries=function(O,k,d,N){r.cancel(lastRequest);
lastRequest=r.resolveEntries(O,k,d,h.chosenContext,h.date,h.account,h.repoName);
lastRequest.then(function i(P){for(c in P.properties){l=indexOfProperty(N.properties,P.properties[c]);
if(l>=0){if(N.properties[l].isEdited){N.properties[l].type=P.properties[c].type;
N.properties[l].score=P.properties[c].score;
N.properties[l].attr=P.properties[c].attr;
P.properties[c]=N.properties[l]
}}}N.properties=P.properties;
N.allValues=d
})
};
h.getAllValuesForDetachedEntry=function(k,N,d){if(!d){I=N.properties.length;
while(I--){if(!N.properties[I].stickyForm){N.properties.splice(I,1)
}}N.allValues=d;
return
}r.cancel(h.lastRequest);
h.lastRequest=r.resolveEntry(k,true,K.isKeyOnly(),h.chosenContext,h.date,h.selectedTag,null,K.isLiteral(),h.account,h.repoName);
h.lastRequest.then(function i(O){N.uses=O.uses;
for(c in O.properties){l=indexOfProperty(N.properties,O.properties[c]);
if(l>=0){if(N.properties[l].isEdited){N.properties[l].type=O.properties[c].type;
N.properties[l].score=O.properties[c].score;
N.properties[l].attr=O.properties[c].attr;
O.properties[c]=N.properties[l]
}}}I=N.properties.length;
while(I--){if(!N.properties[I].stickyForm){N.properties.splice(I,1)
}}if(!O.key){return
}for(I in O.properties){N.properties.push(O.properties[I])
}N.allValues=d
})
};
h.resolveEntry=function(k,d,N,O){h.lastRequest=r.resolveEntry(k,d||(!h.localSearch&&h.searchQuery&&h.searchQuery.length>0),K.isKeyOnly(),h.chosenContext,h.date,h.selectedTag,N,K.isLiteral(),h.account,h.repoName);
h.lastRequest.then(function i(P){z(function(){y=P.key&&P.properties.length>0?false:!h.allKeys;
if(P.no_key){y=true
}if(y&&K.isSpOnly()){y=P[1].spName!=H.profile
}if(y&&K.isFCOnly()){v=indexOfEntry(h.config,k);
if(v>-1){h.config[v].properties=[];
h.config[v][1].uses=P.no_key?0:P[1].uses;
if(!P.no_key){h.config[v][1].readme=P[1].readme;
h.config[v][1].deprecated=P[1].deprecated;
h.config[v][1].spName=P[1].spName;
h.config[v][1].spCipher=P[1].spCipher;
h.config[v][1].encrypted=P[1].encrypted;
h.config[v][1].vdt=P[1].vdt;
h.config[v][1].pushEnabled=P[1].pushEnabled
}else{h.config.splice(v,1)
}}else{h.config.push(P)
}return
}if(y){if(!k){return
}v=indexOfEntry(h.config,k);
if(v>-1){h.config.splice(v,1)
}return
}v=indexOfEntry(h.config,P.key);
if(v<0){P.f={k:{0:{},1:{},2:{}}};
h.config.push(P);
return
}h.config[v][1].uses=P[1].uses;
h.config[v][1].readme=P[1].readme;
h.config[v][1].deprecated=P[1].deprecated;
h.config[v][1].spName=P[1].spName;
h.config[v][1].spCipher=P[1].spCipher;
h.config[v][1].encrypted=P[1].encrypted;
h.config[v][1].vdt=P[1].vdt;
h.config[v][1].pushEnabled=P[1].pushEnabled;
for(c in P.properties){l=indexOfProperty(h.config[v].properties,P.properties[c]);
if(l>=0){if(h.config[v].properties[l].isEdited){h.config[v].properties[l].type=P.properties[c].type;
h.config[v].properties[l].score=P.properties[c].score;
h.config[v].properties[l].attr=P.properties[c].attr;
P.properties[c]=h.config[v].properties[l]
}}}h.config[v].properties=P.properties;
h.config[v].allValues=d;
if(O){O()
}},slideTime+20)
})
};
h.isValueEditable=function(d){if(h.ut==h.type.demo){return true
}if(h.ut<h.type.demo){return false
}return d.editable&&h.date==null&&null==h.selectedTag
};
h.postValueModification=function(i,d,k){h.resolveEntry(i,d,null,k)
};
h.currentPage=1;
h.pageSize=j?j:10;
h.pageSizes={sizes:[{id:10,name:"10"},{id:25,name:"25"},{id:50,name:"50"},{id:150,name:"150"}],selectedOption:{id:h.pageSize,name:h.pageSize}};
h.pageSizeUpdate=function(){a.set("pageSize",h.pageSizes.selectedOption.name)
};
h.reverse=false;
h.toggleReverse=function(){h.reverse=!h.reverse
};
h.enableNewPropertyForm=false;
h.showNewPropertyForm=function(){h.enableNewPropertyForm=true
};
h.hideNewPropertyForm=function(){h.enableNewPropertyForm=false
};
w();
h.$on("$destroy",function J(){r.cancel(h.lastRequest);
h.propertiesLoaded=false
});
h.compare=function(){t.go("repo.compare",{owner:h.account,name:h.repoName})
};
h.dts=dts;
h.DTConfig=DTConfig;
h.encryptionProfiles=[];
h.SGConfig=SGConfig;
h.CipherConfig=CipherConfig;
h.ciphers=[];
h.newEncriptionProfile=false;
o({method:"GET",url:"/rest/getSecurityProfiles/"+h.account+"/"+h.repoName}).then(function u(d){h.encryptionProfiles=d.data.groups;
h.ciphers=d.data.ciphers;
if(!h.encryptionProfiles||h.encryptionProfiles.length==0){h.newEncriptionProfile=true
}})
}]);