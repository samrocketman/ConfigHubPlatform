angular.module("configHub.repository.contextService",["monospaced.elastic","ngAnimate","puElasticInput"]).service("contextService",["$http","$q","$stateParams","toUtc",function(f,c,d,b){return({contextElements:e});
function e(h,g,l,k){var i=c.defer(),j=f({method:"GET",url:"/rest/contextHistory/"+l+"/"+k,params:{ts:b.toMS(h),tag:g},timeout:i.promise}),m=j.then(a);
m._httpTimeout=i;
return(m)
}function a(g){var h={depths:g.data.depthData,depthScores:g.data.depthScores,contextElements:{},selectableContext:{},tags:g.data.tags};
angular.forEach(g.data.depthScores,function(i){h.contextElements[i]=g.data.depthData[i].levels
});
h.selectableContext=angular.copy(h.contextElements);
return h
}}]);