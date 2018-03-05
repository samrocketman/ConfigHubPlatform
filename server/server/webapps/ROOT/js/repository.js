angular.module("configHub.repository",["configHub.repository.compare","configHub.repository.contextItem","configHub.repository.contextItems","configHub.repository.editor","configHub.repository.export","configHub.repository.newProperty","configHub.repository.filters","configHub.repository.tags","configHub.repository.settings","configHub.repository.teams","configHub.repository.tokens","configHub.repository.profiles","configHub.repository.secretStore","configHub.repository.key","configHub.repository.audit","ui.keypress","diff-match-patch","fileEditor"]).config(["$stateProvider",function(a){a.state("repo",{templateUrl:"repository/templates/repositoryHeader.tpl.html","abstract":true}).state("repo.editor",{url:"/r/:owner/:name?tag&ts&ctx",templateUrl:"repo/editor/editor.html",pageTitle:"Editor"}).state("repo.compare",{url:"/:owner/:name/compare?at&ats&bt&bts",templateUrl:"repo/compare/compare.html",pageTitle:"Compare"}).state("repo.tokens",{url:"/:owner/:name/tokens",templateUrl:"repo/tokens/tokens.html",pageTitle:"Tokens"}).state("repo.key",{url:"/:owner/:name/key?key",templateUrl:"repo/key/key.html",pageTitle:"Editor"}).state("repo.security-profiles",{url:"/:owner/:name/security-groups",templateUrl:"repo/security/profiles.html",pageTitle:"Security Groups"}).state("repo.security-profile",{url:"/:owner/:name/security-group?profile",templateUrl:"repo/security/profile.html",pageTitle:"Security Group"}).state("repo.new-security-group",{url:"/:owner/:name/create-security-group",templateUrl:"repo/security/newProfile.html",pageTitle:"New Security Group"}).state("repo.export",{url:"/:owner/:name/export",templateUrl:"repo/export/export.html",pageTitle:"Configuration Export"}).state("repo.audit",{url:"/:owner/:name/revisions",templateUrl:"repo/audit/audit.html",pageTitle:"Revisions"}).state("repo.tags",{url:"/:owner/:name/edit/tags?s",templateUrl:"repo/tags/tags.html",pageTitle:"Tags"}).state("repo.settings",{url:"/:owner/:name/edit/settings?s",templateUrl:"repo/settings/settings.html",pageTitle:"Settings"}).state("repo.teams",{url:"/:owner/:name/teams?team",templateUrl:"repo/team/teams.html",pageTitle:"Teams"}).state("repo.context",{url:"/:owner/:name/edit/context",templateUrl:"repo/context/contextItems.html",pageTitle:"Context Items"}).state("repo.contextItem",{url:"/:owner/:name/edit/context/:depthLabel/item/:contextItem",templateUrl:"repo/context/contextItem.html",pageTitle:"Context Item"}).state("repo.newContextItem",{url:"/:owner/:name/new/:depthLabel",templateUrl:"repo/context/contextItem.html",pageTitle:"New Context Item"}).state("createRepo",{url:"/r/create?account",templateUrl:"repo/create/createRepo.html",pageTitle:"New Repository",data:{requireLogin:true}}).state("repo.files",{url:"/r/:owner/:name/files/{path:any}?tag&ts",templateUrl:"repo/files/files.html",pageTitle:"Config Files"}).state("repo.file",{url:"/:owner/:name/edit/file/{id:[0-9]{1,15}}/{fullPath:any}?tag&ts&sp&path",templateUrl:"repo/files/fileEditor.html",pageTitle:"Config File"})
}]).controller("RepositoryInfoController",["$scope","$http","$stateParams","$rootScope","store","$state",function(d,h,f,b,c,e){b.repository=null;
b.ut=0;
b.isAdminOrOwner=false;
d.repoName=f.name;
d.account=f.owner;
var g="props";
b.keys=function(i){return i?Object.keys(i):[]
};
b.gotoConf=function(){if(g==="props"){d.gotoEditor()
}else{d.gotoFiles()
}};
b.gotoEditor=function(){e.go("repo.editor",{owner:d.account,name:d.repoName});
g="props"
};
b.gotoFiles=function(){e.go("repo.files",{owner:d.account,name:d.repoName});
g="files"
};
h({method:"GET",url:"/rest/repositoryInfo/"+f.owner+"/"+f.name}).then(function a(i){switch(i.data.ut){case"owner":b.isAdminOrOwner=true;
b.ut=b.type.owner;
break;
case"admin":b.isAdminOrOwner=true;
b.ut=b.type.admin;
break;
case"member":b.isAdminOrOwner=false;
b.ut=b.type.member;
break;
case"nonMember":b.isAdminOrOwner=false;
b.ut=b.type.nonMember;
break;
default:b.isAdminOrOwner=false;
break
}if(i.data.demo&&b.ut<b.type.member){b.ut=b.type.demo
}c.set("lastRepo",{id:i.data.id,acc:i.data.owner,name:i.data.name});
b.repository=i.data
})
}]).directive("repositoryHeader",function(){return{templateUrl:"repository/templates/repositoryHeader.tpl.html"}
});