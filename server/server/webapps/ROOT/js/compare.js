angular.module("configHub.repository.compare",["angularUtils.directives.dirPagination","configHub.repository.contextService","selectize","monospaced.elastic","ngAnimate","ui.keypress","puElasticInput"]).service("diffService",["toUtc","$http","$q","$stateParams","$httpParamSerializer",function(b,h,d,f,e){return({cancel:g,getDiff:a,getJSONDiff:c});
function g(i){if(i&&i._httpTimeout&&i._httpTimeout.resolve){i._httpTimeout.resolve()
}}function a(n,r,k,i,s,j,q,o){var p=d.defer(),l={aContext:contextParam(k.chosenContext),aTag:k.selectedTag,aTs:b.toMS(k.date),bContext:contextParam(i.chosenContext),bTag:i.selectedTag,bTs:b.toMS(i.date),allKeys:n,diffOnly:r,allValues:j,key:s,aPass:q,bPass:o},m=h({method:"GET",url:"/rest/compareResolver/"+f.owner+"/"+f.name,params:l,timeout:p.promise}),t=m.then(function(u){return u.data
});
t._httpTimeout=p;
return(t)
}function c(i,n){var j=d.defer(),m={aContext:contextParam(i.chosenContext),aTag:i.selectedTag,aTs:b.toMS(i.date),bContext:contextParam(n.chosenContext),bTag:n.selectedTag,bTs:b.toMS(n.date)},k=h({method:"POST",url:"/rest/getJSONDiff/"+f.owner+"/"+f.name,data:e(m),timeout:j.promise,headers:{"Content-Type":"application/x-www-form-urlencoded"}}),l=k.then(function(o){return o.data
});
l._httpTimeout=j;
return(l)
}}]).controller("CompareController",["$timeout","$stateParams","$scope","$rootScope","$http","store","diffService","contextService","$filter","$state","toUtc","secretService",function(D,L,o,r,s,a,P,h,F,x,f,e){o.comparisonView=true;
o.tsFormat=tsFormat;
o.loading=false;
o.repoName=L.name;
o.account=L.owner;
r.selectedTab=0;
o.ctxStoreName="c_"+L.owner+"/"+L.name;
o.hdcStoreName="hcd_"+L.owner+"/"+L.name;
o.config={};
o.updateJSONDiff=0;
var v="dfo_"+o.account+"/"+o.repoName,u,K,g=false,l=F("orderBy"),N,M,b,m,G={},E={},I=a.get(o.ctxStoreName),w=false,B,q,c,C,J,O,H,n=0,p=a.get("pageSize");
function z(){o.initialized=false;
if(K){D.cancel(K)
}K=D(function(){P.cancel(u);
o.loading=true;
u=P.getJSONDiff(o.A,o.B);
u.then(function i(j){if(j.error){if(n==0&&j.resetContext){n=1;
o.left={};
o.right={};
a.set(o.ctxStoreName,JSON.stringify(o.A.chosenContext));
z()
}else{o.error=j.error;
o.left={};
o.right={}
}}else{o.left=j.left;
o.right=j.right;
o.initialized=true;
g=true;
o.propertiesLoaded=true;
o.loading=false;
o.error="";
o.updateJSONDiff++
}o.isJSONDiff=true
});
return(u)
},K?500:0)
}function k(){o.initialized=false;
if(K){D.cancel(K)
}K=D(function(){P.cancel(u);
o.loading=true;
u=P.getDiff(o.allKeys,o.diffOnly,o.A,o.B);
u.then(function i(j){if(j.error){if(n==0&&j.resetContext){n=1;
o.A.chosenContext={};
o.B.chosenContext={};
a.set(o.ctxStoreName,JSON.stringify(o.A.chosenContext));
k()
}else{o.error=j.error
}}else{o.config=j.diff;
o.dateCmp=j.date;
o.initialized=true;
g=true;
o.propertiesLoaded=true;
o.loading=false;
o.error=""
}o.isJSONDiff=false
});
return(u)
},K?500:0)
}o.aContextSelectConfig=angular.copy(contextSelectConfig);
o.bContextSelectConfig=angular.copy(contextSelectConfig);
o.aTagSelectConfig=angular.copy(tagSelectConfig);
o.bTagSelectConfig=angular.copy(tagSelectConfig);
o.allKeys=false;
o.allKeyToggle=function(){o.allKeys=!o.allKeys;
k()
};
o.diffOnly=a.get(v);
o.diffOnlyToggle=function(){o.diffOnly=!o.diffOnly;
a.set(v,o.diffOnly);
k();
o.allKeys=false
};
o.now=Date.now();
o.ctxEq={};
function y(){for(N in scores){b=scores[N];
o.ctxEq[b]=sameArrays(o.A.chosenContext[b],o.B.chosenContext[b],l)
}M=true;
for(N in o.A.repoContext.depthScores){if(!o.A.chosenContext[o.A.repoContext.depthScores[N]]||o.A.chosenContext[o.A.repoContext.depthScores[N]].length!=1){M=false;
break
}}if(M){for(N in o.B.repoContext.depthScores){if(!o.B.chosenContext[o.B.repoContext.depthScores[N]]||o.B.chosenContext[o.B.repoContext.depthScores[N]].length!=1){M=false;
break
}}}o.fullContext=M
}m=function(S){this.id=S;
this.selectedTag=null;
this.repoContext={loaded:false};
this.chosenContext={};
this.tagLabel=null;
this.timeToSet=null;
this.timeLabel=null;
var R="A"===this.id?"ats":"bts",t="A"===this.id?"at":"bt",Q,j;
this.tagLabel=this.selectedTag=L[t];
if(L[R]){this.date=new Date(JSON.parse(L[R]));
this.timeToSet=this.timeLabel=this.date
}else{this.date=null
}this.getRepoTs=function(){if(null===this.date){return o.now
}return this.date
};
this.goLive=function(){this.selectedTag=null;
this.timeLabel=null;
this.tagLabel=null;
this.timeToSet=null;
if("A"===this.id){x.go("repo.compare",{owner:o.account,name:o.repoName,at:"",ats:""},{notify:false})
}else{x.go("repo.compare",{owner:o.account,name:o.repoName,bt:"",bts:""},{notify:false})
}if(null!=this.date){this.date=null;
o.now=Date.now();
d(this);
if(o.isJSONDiff){z()
}else{k()
}}};
this.changeDate=function(i){this.selectedTag=null;
this.timeToSet=i
};
this.tagChange=function(i){Q=indexOf(this.repoContext.tags,"name",i);
if(-1==Q){d(this);
if(o.isJSONDiff){z()
}else{k()
}return
}j=this.repoContext.tags[Q];
this.timeToSet=new Date(j.ts);
this.selectedTag=i
};
this.setDayTime=function(){if("A"===this.id){x.go("repo.compare",{owner:o.account,name:o.repoName,at:this.selectedTag,ats:f.toMS(this.timeToSet)},{notify:false})
}else{x.go("repo.compare",{owner:o.account,name:o.repoName,bt:this.selectedTag,bts:f.toMS(this.timeToSet)},{notify:false})
}this.tagLabel=this.selectedTag;
this.date=this.timeLabel=this.timeToSet;
d(this);
if(o.isJSONDiff){z()
}else{k()
}};
this.getDate=function(i){return this.date
};
this.isLive=function(){return null==this.date&&null==this.selectedTag
}
};
o.isValueEditable=function(j,i){if(o.ut==o.type.demo){return true
}if(o.ut<o.type.demo){return false
}if(!j.editable){return false
}if(0==i){return o.A.date==null
}if(2==i){return o.B.date==null
}return false
};
o.A=new m("A");
o.B=new m("B");
o.now=Date.now();
o.getDate=function(i){if(0==i){return o.A.date
}if(2==i){return o.B.date
}return null
};
if(I){H=JSON.parse(I);
for(N in H){if(H[N]&&H[N].length>0){if(H[N].length==2){G[N]=[H[N][0]];
E[N]=[H[N][1]]
}else{w=true;
G[N]=H[N];
E[N]=angular.copy(H[N])
}}}}o.A.chosenContext=G;
o.B.chosenContext=E;
o.$watch(o.A.id+".chosenContext",function(j,i){if(!o.A.repoContext.loaded){return
}if(g){y();
if(o.isJSONDiff){z()
}else{k()
}}},true);
o.$watch(o.B.id+".chosenContext",function(j,i){if(!o.B.repoContext.loaded){return
}if(g){y();
if(o.isJSONDiff){z()
}else{k()
}}},true);
o.propertiesLoaded=false;
o.isLive=function(i){if(0==i){return o.A.date==null&&null==o.A.selectedTag
}if(2==i){return o.B.date==null&&null==o.B.selectedTag
}return false
};
o.lineupContext=false;
o.toggleContextLineup=function(){o.lineupContext=!o.lineupContext
};
o.resolveEntries=function(Q,j,i,t){console.log("compare.js :: resolveEntries")
};
o.getAllValuesForDetachedEntry=function(j,t,i){console.log("compare.js :: getAllValuesForDetachedEntry "+j)
};
o.resolveEntry=function(Q,i,t,R){if(o.isJSONDiff){z()
}else{B=indexOfEntry(o.config,Q);
if(o.config[B][0].encrypted&&t){q=e.get(o.config[B][0].spName,o.A.date)
}if(o.config[B][2].encrypted&&t){c=e.get(o.config[B][2].spName,o.B.date)
}u=P.getDiff(o.allKeys,o.diffOnly,o.A,o.B,Q,i,q?q:t,c?c:t);
u.then(function j(S){if(S.error){if(n==0&&S.resetContext){n=1;
o.A.chosenContext={};
o.B.chosenContext={};
a.set(o.ctxStoreName,JSON.stringify(o.A.chosenContext));
k()
}else{o.error=S.error
}}else{if(!S.diff||!S.diff[0]){if(!Q){return
}B=indexOfEntry(o.config,Q);
if(B>-1){o.config.splice(B,1)
}return
}C=S.diff[0];
B=indexOfEntry(o.config,C.key);
o.config[B].f.k[0].decrypted=S.aDecrypted;
o.config[B].f.k[2].decrypted=S.bDecrypted;
if(B<0){o.config.push(C);
return
}if(!C[0]){delete o.config[B][0]
}else{if(!o.config[B][0]){o.config[B][0]=C[0]
}else{o.config[B][0].readme=C[0].readme;
o.config[B][0].deprecated=C[0].deprecated;
o.config[B][0].uses=C[0].uses;
o.config[B][0].spName=C[0].spName;
o.config[B][0].spCipher=C[0].spCipher;
o.config[B][0].encrypted=C[0].encrypted;
o.config[B][0].vdt=C[0].vdt
}}if(!C[2]){delete o.config[B][2]
}else{if(!o.config[B][2]){o.config[B][2]=C[2]
}else{o.config[B][2].readme=C[2].readme;
o.config[B][2].deprecated=C[2].deprecated;
o.config[B][2].uses=C[2].uses;
o.config[B][2].spName=C[2].spName;
o.config[B][2].spCipher=C[2].spCipher;
o.config[B][2].encrypted=C[2].encrypted;
o.config[B][2].vdt=C[2].vdt
}}o.config[B].properties=C.properties;
o.config[B].allValues=i;
if(R){R()
}}})
}};
o.postValueModification=function(j,i,t){o.resolveEntry(j,i,null,t)
};
u=k();
d(o.A);
d(o.B);
y();
o.getRepoContext=function(i){if("A"===i.side){return o.A.repoContext
}return o.B.repoContext
};
function d(i){i.repoContext.loaded=false;
h.contextElements(i.date,i.selectedTag,o.account,o.repoName).then(function(j){i.repoContext=j;
if(i.selectedTag){N=indexOf(i.repoContext.tags,"name",i.selectedTag);
if(N<0){i.selectedTag=""
}else{J=i.repoContext.tags[N];
O=J.ts;
i.timeLabel=i.timeToSet=new Date(J.ts);
i.date=new Date(JSON.parse(O))
}}i.repoContext.loaded=true
})
}o.isJSONDiff=false;
o.sideBySide=a.get("splitView");
if(!o.sideBySide){o.sideBySide=false
}o.jsonDiff=function(i,j){if(i){o.sideBySide=j;
a.set("splitView",o.sideBySide);
console.log(o.sideBySide)
}if(i){z()
}else{k()
}};
o.single=function(){x.go("repo.editor",{owner:o.account,name:o.repoName})
};
o.currentPage=1;
o.pageSize=p?p:10;
o.pageSizes={sizes:[{id:10,name:"10"},{id:25,name:"25"},{id:50,name:"50"},{id:150,name:"150"}],selectedOption:{id:o.pageSize,name:o.pageSize}};
o.pageSizeUpdate=function(){a.set("pageSize",o.pageSizes.selectedOption.name)
};
o.reverse=false;
o.toggleReverse=function(){o.reverse=!o.reverse
};
o.enableNewPropertyForm=false;
o.showNewPropertyForm=function(){o.enableNewPropertyForm=true
};
o.hideNewPropertyForm=function(){o.enableNewPropertyForm=false
};
o.dts=dts;
o.DTConfig=DTConfig;
o.encryptionProfiles=[];
o.SGConfig=SGConfig;
o.CipherConfig=CipherConfig;
o.ciphers=[];
o.newEncriptionProfile=false;
s({method:"GET",url:"/rest/getSecurityProfiles/"+L.owner+"/"+L.name}).then(function A(i){o.encryptionProfiles=i.data.groups;
o.ciphers=i.data.ciphers;
if(!o.encryptionProfiles||o.encryptionProfiles.length==0){o.newEncriptionProfile=true
}})
}]).directive("jsonDiff",["$compile",function(a){return{restrict:"A",replace:true,link:function(b,c){b.$watch("updateJSONDiff",function(){e()
});
var d=false;
function e(){if(d){c.empty()
}var f=difflib.unifiedDiff((angular.toJson(b.left,true)).split("\n"),(angular.toJson(b.right,true)).split("\n"),{fromfile:"file.json",tofile:"file.json",lineterm:""});
var g=new Diff2HtmlUI({diff:f.join("\n")});
g.draw(c,{outputFormat:b.sideBySide?"side-by-side":"line-by-line",showFiles:false,matching:"none"});
g.highlightCode(c);
d=true
}}}
}]);