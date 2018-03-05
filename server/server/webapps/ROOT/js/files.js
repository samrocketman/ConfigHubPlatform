angular.module("fileEditor",["ui.ace","ngFileUpload"]).controller("FilesController",["$http","$scope","$stateParams","$httpParamSerializer","$rootScope","$window","focus","$state","store","toUtc","Upload","secretService","contextService","editorInit",function(w,s,K,h,v,J,G,D,b,g,S,e,l,P){s.repoName=K.name;
s.account=K.owner;
s.searchResult=false;
s.ctxStoreName="c_"+s.account+"/"+s.repoName;
v.selectedTab=0;
s.propContextSelectConfig=propContextSelectConfig;
var Q,B,M,a,R,L,y,t=b.get("pageSize"),O,u,m=false,q=0,A=[],x={},I,o,H,k,n=s.account+"_"+s.repoName+"_hiddenDirs";
s.importInto=function(c){s.toggleImport();
s.prefix=c
};
s.allFiles=false;
s.allFilesToggle=function(){s.allFiles=!s.allFiles;
z(s.searchQuery)
};
s.enableDirEditor=function(c){c.isEdited=true;
c.renaming=true
};
s.moveContent=function(c){c.isEdited=true;
c.moveTo=true
};
s.gotoCi=function(c){D.go("repo.contextItem",{owner:s.account,name:s.repoName,depthLabel:s.repoContext.depths[c.p].label,contextItem:c.n})
};
s.searchResolved=false;
s.setRepoSearchMode=function(d,c){if(s.searchResolved===d){G("searchTerm");
return
}s.searchResolved=d;
if(c&&c.length>0){z(c)
}G("searchTerm")
};
s.localSearch=false;
s.searchQuery="";
s.searchFiles=function(c){if(!s.initialized){return
}z(c)
};
s.getDirectories=function(c){return w.get("/rest/directorySearch/"+s.account+"/"+s.repoName,{params:{t:c}}).then(function(d){return d.data
})
};
s.initialized=false;
s.reverse=false;
s.showImport=false;
s.toggleImport=function(){s.showNewDirForm=false;
s.prefix=(s.currentPath&&s.currentPath.length>0)?s.currentPath.slice(0,s.currentPath.length+1).join("/")+"/":"";
s.showImport=!s.showImport
};
s.encryptionProfiles=[];
s.SGConfig=SGConfig;
s.CipherConfig=CipherConfig;
s.ciphers=[];
s.newEncriptionProfile=false;
w({method:"GET",url:"/rest/getSecurityProfiles/"+K.owner+"/"+K.name}).then(function E(c){m=true;
s.encryptionProfiles=c.groups;
s.ciphers=c.ciphers;
if(!s.encryptionProfiles||s.encryptionProfiles.length==0){s.newEncriptionProfile=true
}});
s.cancelImport=function(){s.showImport=false;
s.status={};
s.prefix="";
s.securityGroup="";
s.selectedFiles=[]
};
s.tagLabel=s.selectedTag=K.tag;
s.hdcStoreName="hcd_"+s.account+"/"+s.repoName;
s.tagStoreName="tag_"+s.account+"/"+s.repoName;
if(K.ts){s.date=new Date(JSON.parse(K.ts));
s.timeToSet=s.timeLabel=s.date
}else{Q=b.get(s.hdcStoreName);
if(Q){s.date=new Date(JSON.parse(Q));
s.timeToSet=s.timeLabel=s.date;
D.go("repo.files",{owner:s.account,name:s.repoName,tag:"",ts:g.toMS(s.date)},{notify:false})
}else{s.date=null
}s.now=Date.now()
}s.setDate=function(c){s.date=c
};
s.setTag=function(c){s.selectedTag=c
};
s.updateUrl=function(){D.go("repo.files",{owner:s.account,name:s.repoName,tag:s.selectedTag,ts:g.toMS(s.date),path:s.path},{notify:false})
};
s.postTimeChange=function(){z();
s.updateUrl()
};
P.setState("editor");
P.initialize(s,false,s.date,K.ctx);
s.contextSelectConfig=contextSelectConfig;
s.repoContext={loaded:false};
function F(){s.repoContext.loaded=false;
l.contextElements(s.date,s.selectedTag,s.account,s.repoName).then(function(c){s.repoContext=c;
for(M in s.repoContext.depthScores){u=s.repoContext.depthScores[M]
}if(s.selectedTag){M=indexOf(s.repoContext.tags,"name",s.selectedTag);
if(M<0){s.selectedTag=""
}else{tag=s.repoContext.tags[M];
ts=tag.ts;
s.timeLabel=s.timeToSet=new Date(tag.ts);
s.date=new Date(JSON.parse(ts))
}}s.repoContext.loaded=true
})
}s.getRepoContext=function(){return s.repoContext
};
F();
s.refresh=function(){z()
};
function r(c){if(!c){return
}A=[];
x={};
c.forEach(function(d){if(!d.path){s.rootFiles=d.files
}else{d.hidden=s.hidden.hasOwnProperty(d.path);
x[d.path]=d
}});
Object.keys(x).forEach(function(d){I=x[d];
Q=I.path.lastIndexOf("/");
o=-1==Q?"":I.path.substring(0,Q);
if(o===""){A.push(I)
}else{if(o in x){H=x[o];
if(!("subs" in H)){H.subs=[]
}H.subs.push(I)
}}});
return A
}Q=b.get(n);
s.hidden={};
if(Q){s.hidden=JSON.parse(Q)
}function z(d){s.rootFiles=[];
s.initialized=false;
s.directories=[];
w({method:"GET",url:"/rest/getRepoFiles/"+s.account+"/"+s.repoName,params:{context:contextParam(s.chosenContext),all:s.allFiles,ts:g.toMS(s.date),tag:s.selectedTag,searchTerm:d,searchResolved:s.searchResolved}}).then(function c(f){if(f.data.success){s.directories=r(f.data.data)
}else{if(q==0&&f.data.resetContext){q=1;
s.chosenContext={};
b.set(s.ctxStoreName,JSON.stringify(s.chosenContext));
z()
}else{s.message=f.data.message
}}s.initialized=true
})
}s.$watch("chosenContext",function(d,c){b.set(s.ctxStoreName,JSON.stringify(s.chosenContext));
z()
},true);
s.toggleDir=function(c){c.hidden=!c.hidden;
if(!c.hidden){delete s.hidden[c.path]
}else{s.hidden[c.path]=true
}b.set(n,JSON.stringify(s.hidden))
};
s.newFile=function(c){D.go("repo.file",{owner:s.account,name:s.repoName,id:"0",path:c})
};
s.getFile=function(c){J.getSelection().removeAllRanges();
D.go("repo.file",{owner:s.account,name:s.repoName,id:c.id,fullPath:c.fullPath,ts:g.toMS(s.date),sp:c.sp})
};
s.gotoSp=function(c){D.go("repo.security-profiles",{owner:s.account,name:s.repoName,profile:c})
};
s.status={};
s.prefix="";
s.securityGroup="";
s.uploadFiles=function(d,c){k=angular.element(document.querySelector("#changeCommentField")).length>0;
s.context=c;
s.message="";
s.status={};
if(s.securityGroup){e.authAndExec(s,null,s.securityGroup,function(){N(d,e.get(s.securityGroup))
})
}else{N(d)
}};
function N(d,c){for(M in d){B=d[M].name;
s.status[B]={percent:0,message:""}
}O=s.prefix;
a=[];
L=0;
C(L,d,c)
}function C(f,d,c){y=d[f];
a[f]=S.upload({url:"/rest/uploadFiles/"+s.account+"/"+s.repoName,data:{file:y},headers:{fileName:y.name,path:s.prefix,password:c,context:contextParam(s.context),changeComment:k?s.changeComment:"",sg:s.securityGroup}});
a[f].then(function(i){if(!i.data){s.status[i.config.data.file.name].message="Upload failed.  File size limit 2MB."
}else{if(i.data.success){}else{s.status[i.config.data.file.name].message=i.data.message
}}},function(i){},function(i){s.status[i.config.data.file.name].percent=parseInt(100*i.loaded/i.total)
});
a[f]["finally"](function(){f++;
if(f<d.length){C(f,d,c)
}else{R=0;
s.uploading=false;
angular.forEach(s.status,function(j,i){if(s.status[i].message){if(R>0){s.message+="<br>"
}s.message+="<b>"+i+"</b>: "+s.status[i].message;
R++
}});
s.status={};
s.cancelImport();
s.path=O;
z()
}})
}s.isUploading=function(){return S.isUploadInProgress()
};
s.toggleReverse=function(){s.reverse=!s.reverse
};
s.lineupContext=false;
s.toggleContextLineup=function(){s.lineupContext=!s.lineupContext
};
s.reverse=false;
s.currentPage=1;
s.pageSize=t?t:10;
s.pageSizes={sizes:[{id:10,name:"10"},{id:25,name:"25"},{id:50,name:"50"}],selectedOption:{id:s.pageSize,name:s.pageSize}};
s.pageSizeUpdate=function(){b.set("pageSize",s.pageSizes.selectedOption.name)
}
}]).directive("directoryEditor",function(){return{restrict:"A",templateUrl:"repo/files/directoryForm.tpl.html",scope:true,controller:["$rootScope","$scope","$http","focus","$httpParamSerializer",function(a,c,h,b,e){var g,d,f;
c.errorMessage="";
c.directory.f={name:c.directory.name,};
c.disableDirectoryEditor=function(){c.directory.isEdited=false;
c.directory.renaming=false
};
c.deleteDirectory=function(){console.log("++++ calling ****");
c.message="";
h({method:"POST",url:"/rest/deleteDir/"+c.account+"/"+c.repoName,data:e({path:c.directory.path}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(i){console.log(i);
if(i.data.success){c.refresh()
}else{c.message=i.data.message
}})
};
c.renameDir=function(){d=c.directory.path.lastIndexOf("/");
if(-1==d){f=c.directory.f.name
}else{f=c.directory.path.substring(0,d)+"/"+c.directory.f.name
}g={oldPath:c.directory.path,newPath:f};
c.message="";
h({method:"POST",url:"/rest/renameDir/"+c.account+"/"+c.repoName,data:e(g),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(i){if(i.data.success){c.refresh()
}else{c.message=i.data.message
}})
}
}]}
}).directive("contentMove",function(){return{restrict:"A",templateUrl:"repo/files/directoryContentMove.tpl.html",scope:true,controller:["$rootScope","$scope","$http","$timeout","$httpParamSerializer","$window",function(a,b,f,d,c,e){b.directory.f={path:b.directory.path};
d(function(){var g=e.document.getElementById("moveToFolder");
if(g){g.focus();
if(b.directory.path){setCaretPosition(g,b.directory.path.length)
}}},100);
b.getDirectories=function(g){return f.get("/rest/directorySearch/"+b.account+"/"+b.repoName,{params:{t:g}}).then(function(h){return h.data
})
};
b.cancelContentMove=function(){delete b.directory.f;
b.directory.isEdited=false;
b.directory.moveTo=false
};
b.moveContent=function(){var g={oldPath:b.directory.path,newPath:b.directory.f.path};
b.errorMessage="";
f({method:"POST",url:"/rest/renameDir/"+b.account+"/"+b.repoName,data:c(g),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(h){if(h.data.success){b.refresh()
}else{b.errorMessage=h.data.message
}})
}
}]}
}).controller("FileEditorCtrl",["$http","$scope","$stateParams","$httpParamSerializer","editorInit","$timeout","$rootScope","resolverService","toUtc","$state","store","secretService","$modal","$q",function(E,v,aa,l,ac,P,C,H,k,K,c,h,ad,g){v.fileEditor=true;
v.repoName=aa.name;
v.account=aa.owner;
v.id=aa.id;
v.fullPath=aa.fullPath?aa.fullPath:"";
v.ts=aa.ts;
v.spName=aa.sp;
v.active=true;
v.context={};
var Z={saved:false,fn:v.fullPath?v.fullPath:aa.path,ct:"",sp:""},af,ae,ab,e,w,a,t,Y="",J=[],I,U,ah,G,S,F,A,m,L,y,u,j,R,x,n,f,X,s,p,B=0,O,W,z,ag=false,N;
v.isDirty=function(){if(!Z.saved){try{f=a.getSession();
af=Z.active==v.active&&Z.filename==v.filename&&Z.fileContent===f.getValue()&&Z.sp===v.newSp&&angular.equals(Z.filePath,v.filePath)&&angular.equals(Z.context,v.context);
return !af
}catch(b){return false
}}return false
};
v.$on("$stateChangeStart",function(o,b,i,ai,d){if(!ag&&b.name!="repo.file"&&v.isDirty()){o.preventDefault();
T(b,i).show()
}});
v.disabledContextSelector={};
v.validateContext=function(){for(s in v.context){if(!v.context[s]){delete v.disabledContextSelector[s]
}else{v.disabledContextSelector[s]=true
}}ac.setContextOptions(v.context)
};
v.validateFileContext=function(){if(!v.active){return
}E({method:"POST",url:"/rest/contextChange/file/"+v.account+"/"+v.repoName,data:l({context:contextParam(v.context),path:v.filePath.join("/"),name:v.filename,fileId:v.fileId}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(b){if(b.data.success){v.conflict=b.data.conflict
}else{v.errorMessage=b.data.message
}})
};
function T(b,d){W=ad({template:"/repo/files/unsavedChanges.tpl.html",scope:v,show:false,controller:[function(){v.saveAndExit=function(){ag=true;
v.saveFile(v.filename)
};
v.ignoreChanges=function(){ag=true;
K.go(b.name,d)
}
}]});
z=W.show;
W.show=function(){O=g.defer();
P(function(){z()
},250);
return O.promise
};
return W
}function q(){W=ad({template:"/repo/files/lastSiblingFile.tpl.html",scope:v,show:false,controller:[function(){v.deleteAnyway=function(){ag=true;
v.deleteThisFile()
};
v.doNothing=function(){ag=true
}
}]});
z=W.show;
W.show=function(){O=g.defer();
P(function(){z()
},250);
return O.promise
};
return W
}v.updateFileName=function(b){v.filename=b;
M()
};
v.pendingContextPromise=false;
v.renamed=false;
function M(){if(v.fileId){v.renamed=v.orgAbsFilePath.path!=v.filePath.join("/")||v.orgAbsFilePath.name!=v.filename
}if(v.pendingContextPromise){P.cancel(v.pendingContextPromise)
}v.pendingContextPromise=P(function(){v.validateFileContext()
},1000)
}v.cancelFileEditor=function(){ag=true;
K.go("repo.files",{owner:v.account,name:v.repoName})
};
v.isPreview=false;
v.toggleFilePreview=function(){v.filePreview="";
if(v.isPreview){v.isPreview=false
}else{f=a.getSession();
N={password:v.sp?h.get(v.sp.name):"",context:contextParam(ac.getContext()),fileContent:f.getValue(),tag:v.selectedTag,ts:k.toMS(v.date)};
X=h.getAll();
for(var b in X){N[b]=X[b].secret
}E({method:"POST",url:"/rest/getFilePreview/"+v.account+"/"+v.repoName,data:l(N),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(d){if(d.data.success){v.filePreview=d.data.content;
v.isPreview=true
}else{v.message=d.data.message;
if(d.data.culprit){v.message+="<br>";
v.message+="Caused by: <span class='key'>"+d.data.culprit.key+"</span> with file value: <span class='value'>"+d.data.culprit.value+"</span>"
}}})
}};
v.filePath=v.fullPath?[]:aa.path?aa.path.split("/"):[];
v.filename="";
v.tagLabel=v.selectedTag=aa.tag;
v.hdcStoreName="hcd_"+v.account+"/"+v.repoName;
v.tagStoreName="tag_"+v.account+"/"+v.repoName;
if(aa.ts){v.date=new Date(JSON.parse(aa.ts));
v.timeToSet=v.timeLabel=v.date
}else{ae=c.get(v.hdcStoreName);
if(ae){v.date=new Date(JSON.parse(ae));
v.timeToSet=v.timeLabel=v.date;
K.go("repo.file",{owner:v.account,name:v.repoName,filename:v.filename,tag:v.selectedTag,ts:k.toMS(v.date)},{notify:false})
}else{v.date=null
}v.now=Date.now()
}v.setDate=function(b){v.date=b
};
v.setTag=function(b){v.selectedTag=b
};
v.updateUrl=function(){K.go("repo.file",{owner:v.account,name:v.repoName,filename:v.filename,tag:v.selectedTag,ts:k.toMS(v.date)},{notify:false})
};
v.postTimeChange=function(){Q();
ac.updateTime(v.date,v.selectedTag);
v.updateUrl()
};
v.darkTheme=c.get("darkTheme")===null?true:c.get("darkTheme");
v.expanded=false;
v.toggleExpand=function(){v.expanded=!v.expanded
};
v.toggleTheme=function(){if(v.darkTheme){a.setTheme("ace/theme/confighub")
}else{a.setTheme("ace/theme/confighub-dark")
}v.darkTheme=!v.darkTheme;
c.set("darkTheme",v.darkTheme)
};
C.selectedTab=0;
ac.setState("fileConf");
ac.initialize(v,false,v.date,aa.ctx);
v.initialized=false;
v.message="";
v.fileContent="";
v.fileId="";
v.newSp="";
v.editable=true;
v.loadAce=false;
E.get("/rest/canUserManageContext/"+v.account+"/"+v.repoName).then(function(b){v.propContextSelectConfig=b.data.canManageContext?propContextSelectConfig:propContextSelectConfigNoEdit
});
if(v.fullPath){Q(h.get(v.spName,v.date))
}else{v.loadAce=true
}v.aceLoaded=function(b){a=b;
if(v.darkTheme){a.setTheme("ace/theme/confighub-dark")
}else{a.setTheme("ace/theme/confighub")
}t=a.getSession();
t.setUseWrapMode(true);
a.setReadOnly(v.readOnly);
v.initialized=true;
E.get("/rest/getRepoKeys/"+v.account+"/"+v.repoName).then(function(d){a.setOptions({enableBasicAutocompletion:true});
I={getCompletions:function(ai,o,ak,i,aj){U=ai.getCursorPosition();
ah=ai.session.getTokenAt(U.row,U.column).type;
aj(null,d.data.map(function(al){if("key"==ah){return{caption:al,value:al}
}}))
}};
a.completers=[I]
})
};
v.acePreviewLoaded=function(b){v.contextHTML=fullContextToHTML(ac.getContext());
if(v.darkTheme){b.setTheme("ace/theme/confighub-dark")
}else{b.setTheme("ace/theme/confighub")
}t=b.getSession();
t.setUseWrapMode(true);
b.setReadOnly(true)
};
v.orgAbsFilePath={path:"",name:""};
v.renameAll=false;
v.updateRefs=false;
function Q(b){if(!v.id){return
}E.get("/rest/getFile/"+v.account+"/"+v.repoName,{params:{id:v.id,ts:k.toMS(v.date),tag:Y,password:b?b:""}}).then(function(d){if(d.data.success&&d.data.id){v.sp=d.data.sp;
v.siblings=d.data.siblings;
v.refs=d.data.refs;
v.orgAbsFilePath.path=d.data.path;
v.orgAbsFilePath.name=d.data.filename;
v.filePath=d.data.path?d.data.path.split("/"):[];
v.filename=d.data.filename;
v.context={};
v.readOnly=v.editable=d.data.editable;
v.active=d.data.active;
for(ab in d.data.levels){e=d.data.levels[ab].p;
w=d.data.levels[ab].n?d.data.levels[ab].n:undefined;
v.context[e]=w
}v.validateContext();
v.locked=false;
if(v.sp){Z.sp=v.newSp=v.sp.name;
if(d.data.unlocked){v.readOnly=null!=v.date;
v.loadAce=true
}else{v.locked=true;
v.readOnly=true;
v.loadAce=!v.sp.cipher
}}else{v.readOnly=null!=v.date;
v.loadAce=true
}if(!v.readOnly&&!v.editable){v.readOnly=true
}v.fileContent=d.data.content;
v.fileId=d.data.id;
v.message="";
Z.id=v.fileId;
Z.active=v.active;
Z.filePath=angular.copy(v.filePath);
Z.filename=v.filename;
Z.context=angular.copy(v.context);
Z.fileContent=v.fileContent
}else{v.message=d.data.message;
v.loadAce=true;
v.readOnly=true;
v.editable=true;
v.fileId=-1
}})
}v.aceChanged=function(){if(v.pendingPromise){P.cancel(v.pendingPromise)
}v.pendingPromise=P(function(){D();
B=1500
},B)
};
v.getCurrentTokens=function(){r();
if(S){return Object.keys(S)
}return[]
};
function r(){G=false;
S={};
F=0;
if(null==t){return
}for(A=0;
A<t.getLength();
A++){m=[];
try{m=t.getTokens(A)
}catch(b){return
}L=[];
for(ab=0;
ab<m.length;
ab++){y=m[ab];
if(y.type==="key"){if(m.length>ab+1&&m[ab+1].type==="closeBracket"){L.push(y.value.replace(/\s/g,""));
F++
}}else{if(y.type==="error"){L.pop();
F--;
G=true
}}}if(L){for(ab in L){S[L[ab]]=1
}}}}v.cloneFile=function(){v.fileId=undefined;
M()
};
v.hasErrors=false;
function D(){if(v.isPreview){return
}r();
u=Object.keys(S);
j=diff(u,J);
if(j.length>0){v.addKeys(j)
}R=diff(J,u);
if(R.length>0){C.removeKeys(R)
}v.hasErrors=G;
J=u
}v.authFile=function(){h.authAndExec(v,v.date,v.sp.name,function(){if(v.sp.cipher){Q(h.get(v.sp.name,v.date));
v.readOnly=false;
v.loadAce=true
}else{v.readOnly=false;
a.setReadOnly(v.readOnly)
}v.locked=false
})
};
v.chooseSP=function(b){v.newSp=b?b.name:""
};
v.updateActive=function(b){v.active=b;
v.validateFileContext()
};
v.saveFile=function(){x=v.newSp;
n=v.sp?v.sp.name:"";
if(!n&&!x){V()
}else{if(n===x){h.authAndExec(v,null,n,V)
}else{if(!n){h.authAndExec(v,null,x,V)
}else{if(!x){h.authAndExec(v,null,n,V)
}else{h.authSwitchAndExec(v,x,n,V)
}}}}};
function V(){f=a.getSession();
p=angular.element(document.querySelector("#changeCommentField")).length>0;
N={renameAll:v.renameAll,updateRefs:v.updateRefs,path:v.filePath.join("/"),name:v.filename,content:f.getValue(),id:v.fileId?v.fileId:-1,currentPassword:v.sp?h.get(v.sp.name):"",newProfilePassword:h.get(v.newSp),changeComment:p?v.changeComment:"",spName:v.newSp,active:v.active,context:contextParam(v.context)};
v.message="";
E({method:"POST",url:"/rest/saveConfigFile/"+v.account+"/"+v.repoName,data:l(N),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(b){if(b.data.success){Z.saved=true;
K.go("repo.files",{owner:v.account,name:v.repoName})
}else{if(b.data.circularRef){v.circularRef=b.data.circularRef;
v.errorMessage=null
}else{v.message=b.data.message
}Z.saved=false
}})
}v.deleteFile=function(){if(v.fileId<0){return
}if(v.siblings<=1&&v.refs>0){q().show()
}else{v.deleteThisFile()
}};
v.deleteThisFile=function(){N={id:v.fileId};
v.message="";
E({method:"POST",url:"/rest/deleteConfigFile/"+v.account+"/"+v.repoName,data:l(N),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(b){if(b.data.success){Z.saved=true;
t=null;
K.go("repo.files",{owner:v.account,name:v.repoName})
}else{v.message=b.data.message
}})
};
v.$on("keyUpdated",function(d,b){f=a.getSession();
E({method:"POST",url:"/rest/rekeyConfigFileContent",data:l({content:f.getValue(),from:b.from,to:b.to}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(i){a.setValue(i.data,1)
})
});
v.addKeys=function(b){if(b&&b.length>0){ac.setKeys(b.join());
v.$broadcast("fileChanged")
}};
v.setFilename=function(b){v.filename=b
};
v.encryptionProfiles=[];
v.SGConfig=SGConfig;
v.CipherConfig=CipherConfig;
v.ciphers=[];
v.newEncriptionProfile=false;
E.get("/rest/getSecurityProfiles/"+aa.owner+"/"+aa.name).then(function(b){v.encryptionProfiles=b.groups;
v.ciphers=b.ciphers;
if(!v.encryptionProfiles||v.encryptionProfiles.length==0){v.newEncriptionProfile=true
}})
}]).directive("dirNameInput",function(){return{restrict:"A",scope:true,link:function(c,a,b){if(!c.currPos){c.currPos=0
}a.on("keydown click",function(d){c.$apply(function(){c.currPos=getPos(a[0])
});
if(d.which===32){d.preventDefault()
}if(d.which===191){if(c.currPos==0){d.preventDefault()
}else{c.newPath.push(c.lastDirName.substring(0,c.currPos))
}}});
a.on("keyup",function(e){if(e.which===8&&c.currPos==0){if(c.newPath&&c.newPath.length>0){var d=c.newPath.pop();
c.$parent.lastDirName=d+c.lastDirName;
a.trigger("click");
setCaretPosition(a[0],d.length);
c.$apply(function(){c.currPos=d.length
})
}}if(e.which===191){if(c.currPos==0){e.preventDefault()
}else{c.$parent.lastDirName=c.lastDirName.substring(c.currPos+1,c.lastDirName.length);
a.trigger("click");
setCaretPosition(a[0],0);
c.$apply(function(){c.currPos=0
})
}}})
}}
}).directive("fileNameInput",function(){return{restrict:"A",scope:true,link:function(c,a,b){if(!c.currPos){c.currPos=0
}a.on("keydown click",function(d){c.$apply(function(){c.currPos=getPos(a[0])
});
if(d.which===32){d.preventDefault()
}if(d.which===191){if(c.currPos==0){d.preventDefault()
}else{c.filePath.push(c.filename.substring(0,c.currPos))
}}});
a.on("keyup",function(e){if(e.which===8&&c.currPos==0){if(c.filePath&&c.filePath.length>0){var d=c.filePath.pop();
c.$parent.filename=d+c.filename;
c.setFilename(c.$parent.filename);
a.trigger("click");
setCaretPosition(a[0],d.length);
c.$apply(function(){c.currPos=d.length
})
}}if(e.which===191){if(c.currPos==0){e.preventDefault()
}else{c.$parent.filename=c.filename.substring(c.currPos+1,c.filename.length);
c.setFilename(c.$parent.filename);
a.trigger("click");
setCaretPosition(a[0],0);
c.$apply(function(){c.currPos=0
})
}}})
}}
});
function getPos(b){if("selectionStart" in b){return b.selectionStart
}else{if(document.selection){b.focus();
var c=document.selection.createRange(),a=document.selection.createRange().text.length;
c.moveStart("character",-b.value.length);
return c.text.length-a
}}}function setCaretPosition(c,b){if(c!==null){if(c.createTextRange){var a=c.createTextRange();
a.move("character",b);
a.select()
}else{if(c.setSelectionRange){c.focus();
c.setSelectionRange(b,b)
}else{c.focus()
}}}};