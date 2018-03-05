var lastFrom="",lastFromParams="",ignoreFrom=["login","signup","emailVerification","404","500","repo.newContextItem","home","api","terms","blog"];
angular.module("configHub",["ui.router","angular-storage","angular-jwt","configHub.account","configHub.login","configHub.dashboard","configHub.signup","configHub.repoCreate","configHub.organization","configHub.repository","configHub.download","configHub.common","configHub.info","configHub.repository.timeTagSelect","ngAnimate","ngSanitize","nzToggle","mgcrea.ngStrap","angularMoment","hljs","btford.markdown"]).config(["hljsServiceProvider","$locationProvider","$urlRouterProvider","$stateProvider","$httpProvider","$datepickerProvider",function(e,b,a,f,c,d){e.setOptions({tabReplace:"    "});
angular.extend(d.defaults,{dateFormat:"MM/dd/yy"});
a.when("/{owner}/{name}/files","/{owner}/{name}/files/").when("/info/","/info").when("/download/","/download").when("/api/","/api").when("/terms/","/terms").when("/login/","/login").when("/signup/","/signup").when("/forgot/","/forgot").when("/repository/create/","/repository/create").when("/404/","/404").when("/500/","/500").when("/email-verification/","/email-verification").when("/passwordReset/","/passwordReset").otherwise(function(g,i){var h=g.get("$state");
h.go("404",{notify:false});
return i.path()
});
f.state("login",{url:"/login",templateUrl:"login/login.html",pageTitle:"Sign In"}).state("signup",{url:"/signup",templateUrl:"signup/signup.html",pageTitle:"Sign Up"}).state("forgot",{url:"/forgot",templateUrl:"login/forgot.html",pageTitle:"Sign In"}).state("info",{url:"/info",templateUrl:"info/info.html",pageTitle:"System Info"}).state("api",{url:"/api",templateUrl:"api/api.html",pageTitle:"API"}).state("download",{url:"/download",templateUrl:"download/download.html",pageTitle:"Downloads"}).state("terms",{url:"/terms",templateUrl:"terms/terms.html",pageTitle:"Terms of Use"}).state("privacy",{url:"/privacy",templateUrl:"terms/privacy.html",pageTitle:"Privacy Policy"}).state("401",{url:"/401",templateUrl:"401.html",pageTitle:"401"}).state("404",{templateUrl:"404.html",pageTitle:"404"}).state("500",{url:"/500",templateUrl:"500.html",pageTitle:"500"}).state("passwordReset",{url:"/passwordReset?t",templateUrl:"user/passwordReset.html",pageTitle:"Password Reset"}).state("home",{url:"/",pageTitle:"Home"}).state("owner",{url:"/account/:accountName?s",templateUrl:"public/owner.html",pageTitle:"Account"});
b.html5Mode(true);
c.interceptors.push(["$timeout","$q","$injector","store","jwtHelper","$rootScope",function(i,l,q,p,o,n){function k(){return null!=p.get("token")
}var m,h,t=new RegExp("^/rest/","i"),g,j,r,s;
i(function(){m=q.get("$http");
h=q.get("$state")
});
return{request:function(u){n.notAuthorized=false;
if(!t.test(u.url)){g=l.defer();
u.timeout=g.promise;
return u
}j=p.get("token");
if(j){if(o.isTokenExpired(j)){n.logout()
}else{u.headers=u.headers||{};
u.headers.Authorization=j;
r=p.get("user");
if(r){u.headers.CHUser=r.username
}}}return u
},responseError:function(u){switch(u.status){case 400:case 406:s=l.defer();
if(k()){h.go("dashboard")
}else{h.go("login")
}return s.promise;
case 401:case 403:s=l.defer();
n.notAuthorized=true;
return s.promise;
case 404:s=l.defer();
h.go("404");
return s.promise;
case 500:s=l.defer();
h.go("500");
return s.promise;
case 0:s=l.defer();
return s.promise
}return u
}}
}])
}]).run(["$rootScope","$state",function(a,b){a.notAuthorized=false;
a.type={owner:4,admin:3,member:2,demo:1,nonMember:0};
a.$on("$stateChangeStart",function(g,d,f,i,e){if(i&&i.name){if(ignoreFrom.indexOf(i.name)===-1){lastFrom=i;
lastFromParams=e
}}else{if(ignoreFrom.indexOf(d.name)===-1){lastFrom=d;
lastFromParams=f
}}var h=d.data&&d.data.requireLogin?true:false,c=a.isLoggedIn();
if(h&&!c){g.preventDefault();
b.go("login")
}else{if(d.name==="home"){g.preventDefault();
if(c){b.go("dashboard")
}else{b.go("login")
}}}})
}]).controller("AppCtrl",["$http","$state","$scope","$rootScope","store","$interval","jwtHelper",function(d,a,i,e,h,c,f){i.closeNotAuthWarning=function(){e.notAuthorized=false
};
i.tzOffset=moment().utcOffset();
e.changeComment;
i.setCommitComment=function(j){e.changeComment=j
};
i.objKeyPresent=function(k,j){if(!k){return false
}return k.hasOwnProperty(j)
};
function g(){var l=h.get("token"),j,k;
if(l){try{j=f.getTokenExpirationDate(l);
if(!j||j.getTime()-(new Date()).getTime()<(432000000)){d.get("/rest/refreshToken").then(function(n){if(n.data&&n.data.token){i.processLoginToken(n.data.token)
}})
}}catch(m){console.log(m);
e.logout()
}}}i.upgrade=null;
function b(){d.get("/rest/upgradeCheck").then(function(j){if(j.data&&j.data.hasUpgrade){i.upgrade=j.data
}else{i.upgrade=null
}})
}g();
b();
i.processLoginToken=function(j){i._u=f.decodeToken(j);
h.set("user",i._u);
h.set("token",j)
};
c(function(){g()
},3600000);
c(function(){b()
},3600000*6);
e.isLoggedIn=function(){return null!=h.get("token")
};
i._u=h.get("user");
i.user=function(){return i._u
};
e.logout=function(){h.remove("user");
h.remove("token");
e.globalWarnings=[];
a.go("home")
};
e.getLastLocation=function(){return lastFrom
};
e.getLastInfo=function(){return{name:lastFrom.name,params:lastFromParams}
};
e.goToLastLocation=function(){if(lastFrom.name){a.go(lastFrom.name,lastFromParams);
return true
}return false
}
}]).directive("updateTitle",["$rootScope","$timeout",function(a,b){return{link:function(d,c){var e,f;
e=function(h,g){f="ConfigHub";
if(g.pageTitle){f="ConfigHub "+g.pageTitle
}b(function(){c.text(f)
},0,false)
};
a.$on("$stateChangeSuccess",e)
}}
}]).directive("myTarget",function(){return{restrict:"A",link:function(c,b,a){if(true){b.attr("target","_blank")
}}}
});