angular.module("configHub.account",[]).controller("AccountController",["$http","$scope","$stateParams","$httpParamSerializer","$alert","auth","$state","$rootScope",function(f,j,h,d,e,b,a,g){j.account={};
j.initialized=false;
j.error="";
j.isPersonal=false;
var c=0;
f.get("/rest/getAccount/"+h.accountName).then(function(i){if(i.data.success){j.account=i.data;
j.initialized=true;
j.isPersonal=j.account.t==="u";
for(c=0;
c<j.account.repos.length;
c++){switch(j.account.repos[c].ut){case"owner":j.account.repos[c].ut=g.type.owner;
break;
case"admin":j.account.repos[c].ut=g.type.admin;
break;
case"member":j.account.repos[c].ut=g.type.member;
break;
case"nonMember":j.account.repos[c].ut=g.type.nonMember;
break
}if(j.account.repos[c].demo&&j.account.repos[c].ut<g.type.member){j.account.repos[c].ut=g.type.demo
}}}else{j.error=i.data.message
}});
j.getUsers=function(i){return f.get("/rest/userSearch",{params:{t:i}}).then(function(k){return k.data
})
};
j.countries=countries;
j.countryConfig=countryConfig;
j.profileMessageSuccess=false;
j.updatePublicProfile=function(){f({method:"POST",url:"/rest/updatePublicProfile",data:d({account:j.account.un,name:j.account.name,company:j.account.company,website:j.account.website,city:j.account.city,country:j.account.country}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(i){if(i.data.success){j.profileMessage="";
j.profileMessageSuccess=true;
e({title:"Profile saved.",content:"",container:"#profileMessages",type:"success",duration:5,show:true})
}else{j.profileMessage=i.data.message;
j.profileMessageSuccess=false
}})
};
j.nameMessage="";
j.changeUsername=function(i){b.authAndExec(j,function(k){f({method:"POST",url:"/rest/changeUsername",data:d({account:j.account.un,newName:i,password:k}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(l){if(l.data.success){j.account.un=i;
if(l.data.token){j.processLoginToken(l.token);
a.go("owner",{accountName:j.account.un,s:"unp"},{notify:false});
j.nameMessage="";
e({title:"Change saved.",container:"#nameSuccess",type:"success",duration:5,show:true})
}}else{j.nameMessage=l.data.message
}})
})
}
}]).directive("organizationAccount",function(){return{restrict:"A",templateUrl:"/public/orgAccount.html",scope:true,controller:["$http","$scope","$stateParams","$state","$httpParamSerializer","auth","$alert",function(j,l,k,a,f,b,h){l.selectedTabIndex=0;
l.s=k.s;
if(l.s){switch(l.s){case"repo":l.selectedTabIndex=0;
break;
case"mgr":l.selectedTabIndex=1;
break;
case"opp":l.selectedTabIndex=2;
break;
case"oac":l.selectedTabIndex=3;
break;
default:l.selectedTabIndex=0
}}function d(i){switch(i){case 0:return"repo";
case 1:return"mgr";
case 2:return"opp";
case 3:return"oac";
default:return""
}}l.upTb=function(i){a.go("owner",{accountName:l.account.un,s:d(i)},{notify:false})
};
l.showSettings=l.account.own&&l.account.own==="own";
if(l.showSettings){l.accUserName=l.account.un;
l.email=l.account.email
}var e,g,c;
l.selected="";
l.ownerError="";
l.addAdminOrOwner=function(i,m){l.ownerError="";
e=i.un?i.un:i;
j({method:"POST",url:"/rest/addAdminOrOwner/"+l.account.un,data:f({un:e,role:m}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(n){if(n.data.success){if(m==="adm"){l.account.admins.push(n.data.no)
}else{l.account.owners.push(n.data.no)
}l.selected=""
}else{l.ownerError=n.data.message
}})
};
l.removeAdminOrOwner=function(i,m){j({method:"POST",url:"/rest/removeAdminOrOwner/"+l.account.un,data:f({un:i}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(n){if(n.data.success){if(m==="adm"){g=l.account.admins
}else{g=l.account.owners
}c=indexOf(g,"un",i);
if(c!=-1){g.splice(c,1)
}l.selected=""
}else{l.ownerError=n.data.message
}})
};
l.deleteOrganization=function(){b.authAndExec(l,function(i){j({method:"POST",url:"/rest/deleteOrganization/"+l.account.un,data:f({password:i}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(m){console.log(m);
if(m.data.success){}else{l.orgDeleteError=m.data.message
}})
})
}
}]}
}).directive("personalAccount",function(){return{restrict:"A",templateUrl:"/public/userAccount.html",scope:true,controller:["$http","$scope","$stateParams","$state","$httpParamSerializer","auth","$alert",function(g,i,h,a,d,b,e){i.selectedTabIndex=0;
i.s=h.s;
if(i.s){switch(i.s){case"repo":i.selectedTabIndex=0;
break;
case"org":i.selectedTabIndex=1;
break;
case"upp":i.selectedTabIndex=2;
break;
case"uac":i.selectedTabIndex=3;
break;
default:i.selectedTabIndex=0
}}function c(j){switch(j){case 0:return"repo";
case 1:return"org";
case 2:return"upp";
case 3:return"uac";
default:return""
}}i.upTb=function(j){a.go("owner",{accountName:i.account.un,s:c(j)},{notify:false})
};
i.showSettings=i.account.own;
if(i.showSettings){i.accUserName=i.account.un;
i.email=i.account.email
}i.passMessage="";
i.oldPass=i.newPass=i.newPass2="";
i.changePassword=function(l,k,j){g({method:"POST",url:"/rest/changePassword",data:d({password:l,newPassword1:k,newPassword2:j}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(m){if(m.data.success){e({title:"Password updated.",container:"#passSuccess",type:"success",duration:5,show:true});
i.passMessage="";
i.oldPass,i.newPass,i.newPass2=""
}else{i.passMessage=m.data.message
}})
};
i.changeEmail=function(j){g({method:"POST",url:"/rest/changeEmail",data:d({email:j}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(k){if(k.data.success){i.processLoginToken(k.data.token);
a.go("owner",{accountName:i.account.un,s:"em"},{notify:false});
i.emailMessage="";
e({title:"Email updated.",container:"#emailSuccess",type:"success",duration:5,show:true})
}else{i.emailMessage=k.data.message
}})
};
i.emailRepo=function(){f("repo",i.account.repoSub)
};
i.emailBlog=function(){f("blog",i.account.blogSub)
};
function f(k,j){g({method:"POST",url:"/rest/updateEmailPrefField",data:d({field:k,val:j}),headers:{"Content-Type":"application/x-www-form-urlencoded"}})
}i.reposMessage="";
i.leaveRepository=function(j){g({method:"POST",url:"/rest/leaveRepository",data:d({account:j.owner,repositoryName:j.name}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(k){if(k.data.success){if(k.data.removed){var l=0;
for(;
l<i.account.repos.length;
l++){if(i.account.repos[l].name===j.name&&i.account.repos[l].owner===j.owner){i.account.repos.splice(l,1);
break
}}}i.reposMessage=""
}else{i.reposMessage=k.data.message
}})
}
}]}
});