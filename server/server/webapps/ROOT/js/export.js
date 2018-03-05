angular.module("configHub.repository.export",["configHub.repository.contextService","ngAnimate","puElasticInput","monospaced.elastic"]).directive("selectOnClick",["$window",function(a){return{link:function(c,b){b.on("dblclick",function(){var e=a.getSelection(),d=document.createRange();
d.selectNodeContents(b[0]);
e.removeAllRanges();
e.addRange(d)
})
}}
}]).controller("ExportController",["$timeout","$stateParams","$scope","$http","contextService","store","$filter","$httpParamSerializer",function(w,v,n,z,B,g,k,y){var j="c_"+v.owner+"/"+v.name,u="hcd_"+v.owner+"/"+v.name,l={},h=g.get(j),m,q,x,r,A,p,b,s=g.get(u);
if(h){m=JSON.parse(h);
for(q in m){if(m[q]&&m[q].length==1){l[q]=m[q][0]
}}}n.commonFormats=[{f:"Text",name:"Text",type:"text"},{f:"JSON_Array",name:"JSON Array",type:"json"},{f:"JSON_Map",name:"JSON Map",type:"json"},{f:"JSON_Simple_Map",name:"JSON Map (Simple)",type:"json"}];
n.format=n.commonFormats[1];
n.includeComments=true;
n.setFormat=function(a){n.format=a;
n.updateContext()
};
n.context=l;
n.configFile="";
n.errorMessage="";
n.downloadFile=function(){A=n.configFile;
if(!A){return
}p="config";
if(n.format.type==="json"){p=p+".json"
}else{p=p+".cfg"
}b=new Blob([A],{type:"text/json;charset=utf-8",name:p,lastModifiedDate:new Date()}),r=new MouseEvent("click",{view:window,bubbles:true,cancelable:false}),x=document.createElement("a");
x.download=p;
x.href=window.URL.createObjectURL(b);
x.dataset.downloadurl=["text/json;charset=utf-8",x.download,x.href].join(":");
x.dispatchEvent(r)
};
function c(){z({method:"POST",url:"/rest/generateConfigFile/"+v.owner+"/"+v.name,data:y({context:contextParam(n.context),formatType:n.format.f,comments:n.includeComments}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(a){if(a.data.success){if(n.format.type==="json"){n.configFile=JSON.stringify(a.data.file,undefined,2)
}else{n.configFile=a.data.file
}n.errorMessage=""
}else{n.errorMessage=a.data.message;
n.configFile=null
}})
}n.date=s?new Date(JSON.parse(s)):null;
n.isLive=function(){return null===n.date
};
n.getHistoryLabel=function(){if(null==n.date){return"Live"
}else{return k("date")(n.date,"MMMM d, y @ h:mm a")
}};
n.clearDate=function(){n.date=null;
f()
};
n.changeDate=function(){f()
};
n.contextSelectConfig=propContextSelectConfig;
n.contextSelectConfig.create=true;
n.repoContext={loaded:false};
n.isFullContext=false;
n.updateContext=function(){Object.keys(n.context).forEach(function(a){if(!n.context[a]){delete n.context[a]
}});
if(Object.keys(n.context).length==n.repoContext.depthScores.length){n.isFullContext=true;
c()
}else{n.isFullContext=false
}};
function f(){n.repoContext.loaded=false;
B.contextElements(n.date).then(function(a){n.repoContext=a;
n.repoContext.loaded=true;
n.updateContext()
})
}f()
}]);