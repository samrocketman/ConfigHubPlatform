angular.module("configHub.repository.timeTagSelect",[]).directive("timeSelect",function(){return{restrict:"EA",templateUrl:"repo/timeTagSelect.tpl.html",scope:true,controller:["$scope","$stateParams","store","$http",function(h,f,g,d){d({method:"GET",url:"/rest/getTags/"+f.owner+"/"+f.name}).then(function a(i){if(i.data.success){h.tags=i.data.tags
}});
h.repoName=f.name;
h.account=f.owner;
h.tagSelectConfig=tagSelectConfig;
h.tsFormat=tsFormat;
function e(i){h.date=i;
h.setDate(i)
}function b(i){h.selectedTag=i;
h.setTag(i)
}h.getRepoTs=function(){if(null===h.date){return h.now
}return h.date
};
h.goLive=function(){b(null);
h.timeLabel=null;
h.tagLabel=null;
h.timeToSet=null;
h.updateUrl();
if(null!=h.date){e(null);
h.now=Date.now();
h.postTimeChange();
g.remove(h.hdcStoreName);
g.remove(h.tagStoreName)
}};
h.changeDate=function(i){b(null);
h.timeToSet=i
};
var c,j;
h.tagChange=function(i){c=indexOf(h.tags,"name",i);
if(-1==c){h.postTimeChange();
return
}j=h.tags[c];
h.timeToSet=new Date(j.ts);
b(i);
g.set(h.tagStoreName,JSON.stringify(i))
};
h.setDayTime=function(){h.tagLabel=h.selectedTag;
h.timeLabel=h.timeToSet;
e(h.timeToSet);
g.set(h.hdcStoreName,JSON.stringify(h.timeToSet));
h.postTimeChange()
}
}]}
});