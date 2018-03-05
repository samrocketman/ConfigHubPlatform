function gPropertyFilter(e,f,c,b){if(e.test(f.value)){c.push(b);
return true
}else{var a,d;
for(a in depthScores){d=f.levels[depthScores[a]];
if(d&&e.test(d.nm)){c.push(b);
return true
}}}return false
}angular.module("configHub.repository.filters",[]).filter("tokenFilter",function(){return function(h,e){if(!e||e.length==0){return h
}var g=[],k,j,d,l,a=0,f=[],b,c;
for(k=0;
k<e.length;
k++){j=e[k].replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&");
g.push(new RegExp(j,"i"))
}for(;
a<h.length;
a++){c=h[a];
for(d in g){l=g[d];
if(l.test(c.token)||l.test(c.name)||l.test(c.rulesTeam)||l.test(c.managingTeam)||l.test(c.user)){f.push(c);
break
}else{if(c.sps&&c.sps.length>0){for(b in c.sps){if(l.test(c.sps[b])){f.push(c);
break
}}}}}}return f
}
}).filter("propertyFilter",function(){return function(a,e,k,d){if(!d||!e||e.length==0){return a
}var g=[],n,j,h=false,b,m,f=[],c=0,l;
for(n=0;
n<e.length;
n++){j=e[n].replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&");
g.push(new RegExp(j,"i"))
}if(k.newProperty){h=true
}else{for(b in g){m=g[b];
if(m.test(k.key)||m.test(k[1].readme)||m.test(k[1].spName)){h=true
}}}if(!h){for(;
c<a.length;
c++){l=a[c];
for(b in g){m=g[b];
if(gPropertyFilter(m,l,f,l)){break
}}}return f
}return a
}
}).filter("cmpPropertyFilter",function(){return function(a,f,l,e){if(!e||!f||f.length==0){return a
}var h=[],n,k,j=false,c,m,g=[],d,b;
for(n=0;
n<f.length;
n++){k=f[n].replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&");
h.push(new RegExp(k,"i"))
}for(c in h){m=h[c];
if(m.test(l.key)||(l[0]&&m.test(l[0].readme))||(l[0]&&m.test(l[0].spName))||(l[2]&&m.test(l[2].readme))||(l[2]&&m.test(l[2].spName))){j=true;
break
}}if(!j){for(d=0;
d<a.length;
d++){b=a[d];
for(c in h){m=h[c];
if(!j){if(!j&&b[0]){j=gPropertyFilter(m,b[0],g,b)
}if(!j&&b[2]){j=gPropertyFilter(m,b[2],g,b)
}}}}return g
}return a
}
}).filter("keyFilter",function(){return function(h,e,d){if(!d||!e||e.length==0){return h
}var g=[],o,k,f=[],j=false,b=0,n,a,m,c=0,l;
for(o=0;
o<e.length;
o++){k=e[o].replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&");
g.push(new RegExp(k,"i"))
}for(;
b<h.length;
b++){n=h[b];
j=false;
for(a in g){m=g[a];
if(m.test(n.key)||m.test(n[1].readme)||m.test(n[1].spName)){f.push(n);
j=true;
break
}}if(j){continue
}for(a in g){m=g[a];
for(c=0;
c<n.properties.length;
c++){l=n.properties[c];
j=gPropertyFilter(m,l,f,n);
if(j){break
}}if(j){break
}}}return f
}
}).filter("cmpKeyFilter",function(){return function(j,e,d){if(!d||!e||e.length==0){return j
}var h=[],o=0,l,g=[],k=false,f=0,n,b,m,c=0,a;
for(;
o<e.length;
o++){l=e[o].replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&");
h.push(new RegExp(l,"i"))
}for(;
f<j.length;
f++){n=j[f];
k=false;
for(b in h){m=h[b];
if(m.test(n.key)||(n[0]&&m.test(n[0].readme))||(n[0]&&m.test(n[0].spName))||(n[2]&&m.test(n[2].readme))||(n[2]&&m.test(n[2].spName))){g.push(n);
k=true;
break
}}if(k){continue
}for(b in h){m=h[b];
for(;
c<n.properties.length;
c++){a=n.properties[c];
if(!k&&a[0]){k=gPropertyFilter(m,a[0],g,n)
}if(!k&&a[2]){k=gPropertyFilter(m,a[2],g,n)
}}}}return g
}
}).filter("orderMixObjectBy",function(){return function(a,d,c){var b=[];
angular.forEach(a,function(e){b.push(e)
});
b.sort(function(f,e){if(!f||!f[d]){return -1
}return(f[d]>e[d]?1:-1)
});
if(c){b.reverse()
}return b
}
}).filter("orderObjectBy",function(){return function(a,d,c){var b=[];
angular.forEach(a,function(e){b.push(e)
});
b.sort(function(f,e){if(!f||!f[d]){return -1
}return(f[d].toLowerCase()>e[d].toLowerCase()?1:-1)
});
if(c){b.reverse()
}return b
}
}).filter("orderObjectByInt",function(){return function(a,d,c){var b=[];
angular.forEach(a,function(e){b.push(e)
});
b.sort(function(f,e){if(!f||!f[d]){return -1
}return(f[d]>e[d]?1:-1)
});
if(c){b.reverse()
}return b
}
});