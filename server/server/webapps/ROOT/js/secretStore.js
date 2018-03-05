angular.module("configHub.repository.secretStore",[]).service("secretService",["$interval","$modal","$q","$timeout","$http","focus","toUtc",function(s,g,x,A,B,n,i){var q={},d,e,j,t,b,a,C,f,o;
s(function(){d=Date.now();
for(e in q){j=d-q[e].ts;
if(j>600000){delete q[e]
}}},60000);
return({cache:l,get:z,clear:p,getSKModal:y,updateSPPassword:c,authAndExec:u,authAndExecAudit:w,authSwitchAndExec:v,authSwitchAndExecAudit:h,getAll:m});
function m(){return q
}function p(k){if(q[k]){delete q[k]
}}function l(E,k,D){t=D?E+"_"+D:E;
q[t]={secret:k,ts:Date.now()}
}function z(D,k){t=k?D+"_"+k:D;
if(q[t]){q[t].now=Date.now();
return q[t].secret
}return null
}function v(E,D,k,F){b=z(D);
a=z(k);
if(b&&a){F()
}else{if(b&&!a){y(E,null,k,F).show()
}else{if(!b&&a){y(E,null,D,F).show()
}else{y(E,null,D,function(){y(E,null,k,F).show()
}).show()
}}}}function h(E,D,k,F,G){b=z(D,F);
a=z(k,F);
if(b&&a){G()
}else{if(b&&!a){y(E,F,k,G).show()
}else{if(!b&&a){y(E,F,D,G).show()
}else{y(E,F,D,function(){y(E,F,k,G).show()
}).show()
}}}}function u(D,E,F,G,k){if(!F){G()
}else{if(z(F,E)){G()
}else{y(D,E,F,G,k).show()
}}}function w(k,E,D,F){r(k,E,D,F).show()
}function r(k,E,D,F){k.profile=D;
f=g({template:"/repo/security/confirm.tpl.html",scope:k,show:false,controller:["$httpParamSerializer",function(G){n("spPassInput");
k.validate=function(H,I){B({method:"POST",url:"/rest/validateSPSecret/"+k.account+"/"+k.repoName,data:G({ts:E,spName:D,spPassword:H}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(J){k.decodeMessage=J.data.message;
if(J.data.success){I();
F(H)
}})
}
}]});
o=f.show;
f.show=function(){C=x.defer();
A(function(){o()
},250);
return C.promise
};
return f
}function c(k,D,E){k.profile=D;
f=g({template:"/repo/security/securityGroupPasswordOverride.tpl.html",scope:k,show:false,controller:["$httpParamSerializer",function(F){n("currentPassword");
k.updatePassword=function(K,H,G,I,J){B({method:"POST",url:"/rest/updateSPPassword/"+k.account+"/"+k.repoName,data:F({groupName:D,currentPass:K,newPassword1:H,newPassword2:G,ownerPass:I}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(L){k.decodeMessage=L.data.message;
if(L.data.success){J();
E()
}})
}
}]});
o=f.show;
f.show=function(){C=x.defer();
A(function(){o()
},250);
return C.promise
};
return f
}function y(D,E,F,G,k){D.profile=F;
f=g({template:"/repo/security/confirm.tpl.html",scope:D,show:false,onHide:function(){if(k&&!z(F,E)){k()
}},controller:["$httpParamSerializer",function(H){n("spPassInput");
D.validate=function(I,J){B({method:"POST",url:"/rest/validateSPSecret/"+D.account+"/"+D.repoName,data:H({ts:i.toMS(E),spName:F,spPassword:I}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(K){D.decodeMessage=K.data.message;
if(K.data.success){l(F,I,E);
J();
G()
}})
}
}]});
o=f.show;
f.show=function(){C=x.defer();
A(function(){o()
},250);
return C.promise
};
return f
}}]);