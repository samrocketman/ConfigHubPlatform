angular.module("configHub.repository.tags",[]).controller("TagsController",["$scope","$rootScope","$stateParams","$httpParamSerializer","$http","toUtc",function(c,a,e,d,g,b){c.account=e.owner;
c.repoName=e.name;
c.day=moment();
a.selectedTab=0;
c.selectedLabel="Date";
c.selectedField="ts";
c.asc=false;
c.sortBy=function(h,i){if(c.selectedField===i){return
}else{c.selectedField=i;
c.selectedLabel=h
}};
c.toggleSortOrder=function(){c.asc=!c.asc
};
c.showNewTagForm=function(){c.ts=new Date();
c.newTagForm=true
};
c.edit=function(h){var i=angular.copy(h);
h.f=i;
h.edit=true
};
c.cancelEdit=function(h){delete h.f;
h.edit=false
};
c.newTagForm=false;
c.cancelNew=function(){c.newTagForm=false
};
c.tsFormat=tsFormat;
c.createTag=function(h,j,i){g({method:"POST",url:"/rest/createTag/"+c.account+"/"+c.repoName,data:d({name:h,readme:j,ts:b.toMS(i)}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(k){if(k.data.success){f();
c.newTagForm=false
}else{c.message=k.data.message
}})
};
c.updateTag=function(h){g({method:"POST",url:"/rest/updateTag/"+c.account+"/"+c.repoName,data:d({name:h.name,newName:h.f.name,readme:h.f.readme,ts:b.toMS(h.f.ts)}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(i){if(i.data.success){f()
}else{c.message=i.data.message
}})
};
c.deleteTag=function(h){g({method:"POST",url:"/rest/deleteTag/"+c.account+"/"+c.repoName,data:d({name:h}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(i){if(i.data.success){f()
}else{c.message=i.data.message
}})
};
c.tags=[];
function f(){g.get("/rest/getTags/"+c.account+"/"+c.repoName).then(function(h){if(h.data.success){c.tags=h.data.tags
}else{c.message=h.data.message
}})
}f()
}]);