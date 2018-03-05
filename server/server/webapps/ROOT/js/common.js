angular.module("configHub.common",[]).directive("changeComment",function(){return{restrict:"EA",scope:true,controller:["$scope","$rootScope","focus","$timeout",function(c,a,b,d){d(function(){b("changeCommentFieldText")
},1500);
c.commitComment=a.changeComment;
c.updateComment=function(e){c.setCommitComment(e)
}
}]}
}).service("accountNameCheckService",["$http","$q",function(h,a){return({cancel:d,isNameTaken:g});
function d(i){if(i&&i._httpTimeout&&i._httpTimeout.resolve){i._httpTimeout.resolve()
}}var b,c,f;
function g(i){b=a.defer();
c=h({method:"GET",url:"/rest/isNameTaken",params:{t:i},timeout:b.promise});
f=c.then(e);
f._httpTimeout=b;
return(f)
}function e(i){return(i.data)
}}]).service("repositoryNameCheckService",["$http","$q",function(h,a){return({cancel:d,isValid:e});
function d(i){if(i&&i._httpTimeout&&i._httpTimeout.resolve){i._httpTimeout.resolve()
}}var b,c,g;
function e(j,i){b=a.defer();
c=h({method:"GET",url:"/rest/isRepoNameValid/"+j,params:{t:i},timeout:b.promise});
g=c.then(f);
g._httpTimeout=b;
return(g)
}function f(i){return(i.data)
}}]).animation(".slider",function(){return{enter:function(b,a){jQuery(b).hide().slideDown(slideTime)
},leave:function(b,a){jQuery(b).slideUp(slideTime)
},removeClass:function(b,c,a){if(c==="ng-hide"){jQuery(b).hide().slideDown(slideTime)
}},addClass:function(b,c,a){if(c==="ng-hide"){jQuery(b).slideUp(slideTime)
}}}
}).factory("focus",["$timeout","$window",function(a,b){return function(c){a(function(){var d=b.document.getElementById(c);
if(d){d.focus()
}},300)
}
}]).service("toUtc",["$filter",function(c){var e=c("amUtc"),a;
return({convert:b,toMS:d});
function b(f){if(null==f){return""
}a=moment(f);
return e(a).format("MM/DD/YYYY hh:mm a")
}function d(f){if(null==f){return null
}a=moment(f);
return e(a).valueOf()
}}]).service("auth",["$interval","$modal","$q","$timeout","$http","focus",function(j,n,k,h,l,q){var d={},e,i,m,p,c,b;
j(function(){e=Date.now();
for(i in d){m=e-d[i].ts;
if(m>600000){delete d[i]
}}},60000);
return({authAndExec:f,get:g});
function g(r){if(d[r]){d[r].now=Date.now();
return d[r].secret
}return null
}function a(s,r){d[s]={secret:r,ts:Date.now()}
}function f(r,s){if(g(r.user().username)){s(g(r.user().username))
}else{o(r,s).show()
}}function o(r,s){c=n({template:"/common/authUser.tpl.html",scope:r,show:false,controller:["$httpParamSerializer",function(t){q("password");
r.validate=function(u,v){l({method:"POST",url:"/rest/authenticateUser",data:t({password:u}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(w){if(w.data.success){a(r.user().username,u);
v();
s(u)
}else{if(w.data.message){r.validationMessage=w.data.message
}else{r.validationMessage="Invalid password"
}}})
}
}]});
b=c.show;
c.show=function(){p=k.defer();
h(function(){b()
},250);
return p.promise
};
return c
}}]).directive("eatClickIf",["$parse","$rootScope",function(b,a){return{priority:100,restrict:"A",compile:function(d,c){var f=b(c.eatClickIf),e,h;
return{pre:function g(j,i){if(f(j)){i.addClass("disabled")
}e="click";
i.on(e,function(k){h=function(){if(f(j,{$event:k})){k.stopImmediatePropagation();
k.preventDefault();
return false
}};
if(a.$$phase){j.$evalAsync(h)
}else{j.$apply(h)
}})
},post:function(){}}
}}
}]).directive("selectOnClick",["$window",function(a){return{restrict:"A",link:function(d,c,b){c.on("click",function(){var f=a.getSelection();
var e=document.createRange();
e.selectNodeContents(c[0]);
f.removeAllRanges();
f.addRange(e)
})
}}
}]);