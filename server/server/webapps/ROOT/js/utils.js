function indexOf(a,c,d){for(var b=0;
b<a.length;
b++){if(a[b][c]===d){return b
}}return -1
}function indexOfEntry(a,c){for(var b=0;
b<a.length;
b++){if(a[b].key===c){return b
}}return -1
}function indexOfProperty(a,c){for(var b=0;
b<a.length;
b++){if(a[b].id===c.id){return b
}}return -1
}function indexOfCmpProperty(a,d,c){for(var b=0;
b<a.length;
b++){if(a[b][c]&&d&&a[b][c].id===d.id){return b
}}return -1
}function diff(a,d){var c=[],b=[];
angular.forEach(a,function(e){c.push(e.toLowerCase())
});
angular.forEach(d,function(e){b.push(e.toLowerCase())
});
return c.filter(function(e){return b.indexOf(e)==-1
})
}Object.size=function(c){var b=0,a;
for(a in c){if(c.hasOwnProperty(a)){b++
}}return b
};
var tsFormat="ddd, MMM DD YYYY, hh:mm a",genRuleProcessTypes={"false":"Process all rules, last match determines access","true":"Stop processing rules on a first match"},tagSelectConfig={create:false,valueField:"name",labelField:"name",searchField:["name"],delimiter:",",placeholder:"--",sortField:{field:"name",direction:"asc"},maxItems:1,closeAfterSelect:true,openOnFocus:true},contextSelectConfig={create:false,plugins:["remove_button"],valueField:"name",labelField:"name",searchField:["name"],delimiter:",",placeholder:"*",openOnFocus:true,sortField:"name",render:{item:function(b,a){return"<div>"+(b.type?(b.type=="Group"?'<span class="lgroup node"></span>':'<span class="lmember node"></span>'):"")+(a(b.name))+"</div>"
},option:function(b,a){return"<div>"+(a(b.name))+(b.type?(b.type=="Group"?'<span class="pull-right lgroup drop"></span>':'<span class="pull-right lmember drop"></span>'):"")+"</div>"
}}},propContextSelectConfigNoEdit={create:false,valueField:"name",labelField:"name",searchField:["name"],delimiter:",",placeholder:"*",closeAfterSelect:true,openOnFocus:true,sortField:"name",maxItems:1,render:{item:function(b,a){return"<div>"+(b.type?(b.type=="Group"?'<span class="lgroup single"></span>':'<span class="lmember single"></span>'):"")+(a(b.name))+"</div>"
},option:function(b,a){return"<div>"+(a(b.name))+(b.type?(b.type=="Group"?'<span class="pull-right lgroup inline"></span>':'<span class="pull-right lmember inline"></span>'):"")+"</div>"
}}},propContextSelectConfig={create:true,valueField:"name",labelField:"name",searchField:["name"],delimiter:",",placeholder:"*",closeAfterSelect:true,openOnFocus:true,sortField:"name",maxItems:1,render:{item:function(b,a){return"<div>"+(b.type?(b.type=="Group"?'<span class="lgroup single"></span>':'<span class="lmember single"></span>'):"")+(a(b.name))+"</div>"
},option:function(b,a){return"<div>"+(a(b.name))+(b.type?(b.type=="Group"?'<span class="pull-right lgroup inline"></span>':'<span class="pull-right lmember inline"></span>'):"")+"</div>"
}}},dts=[{value:"Text",name:"Text"},{sep:true},{value:"Boolean",name:"Boolean"},{value:"Integer",name:"Integer"},{value:"Long",name:"Long"},{value:"Double",name:"Double"},{value:"Float",name:"Float"},{sep:true},{value:"FileRef",name:"File Reference"},{value:"FileEmbed",name:"File Embed"},{sep:true},{value:"JSON",name:"JSON"},{value:"Code",name:"Code/ML"},{sep:true},{value:"Map",name:"Map"},{value:"List",name:"List"}],DTConfig={create:false,valueField:"value",labelField:"name",optgroupField:"class",searchField:["name"],delimiter:",",placeholder:"",closeAfterSelect:false,openOnFocus:true,maxItems:1,optgroups:[{value:"Basic",label:"Basic"},{value:"Numbers",label:"Numbers"},{value:"Data Structures",label:"Data Structures"}],render:{optgroup_header:function(b,a){return'<div class="optgroup-header">'+a(b.label)+"</div>"
}}},ciphers=[{title:"No encryption",cipher:"None"},{title:"AES/CBC/PKCS5Padding",cipher:"AES/CBC/PKCS5Padding"},{title:"AES/ECB/PKCS5Padding",cipher:"AES/ECB/PKCS5Padding"},{title:"DES/CBC/PKCS5Padding",cipher:"DES/CBC/PKCS5Padding"},{title:"DES/ECB/PKCS5Padding",cipher:"DES/ECB/PKCS5Padding"},{title:"DESede/CBC/PKCS5Padding",cipher:"DESede/CBC/PKCS5Padding"},{title:"DESede/ECB/PKCS5Padding",cipher:"DESede/ECB/PKCS5Padding"}],CipherConfig={create:false,valueField:"cipher",labelField:"title",searchField:["title"],closeAfterSelect:false,openOnFocus:true,maxItems:1},SGConfig={create:false,valueField:"name",labelField:"name",searchField:["name"],delimiter:",",placeholder:"",closeAfterSelect:false,openOnFocus:true,sortField:"name",maxItems:1,render:{item:function(b,a){return"<div>"+('<span class="spnl">'+a(b.name)+"</span>")+(b.cipher?'<span class="spcl">| <i class="fa fa-lock"></i> '+a(b.cipher)+"</span>":'<span class="spcl">| Encryption: disabled</span>')+"</div>"
},option:function(d,c){var b=d.name,a=d.cipher?d.cipher:null;
return'<div><span class="spnl">'+c(b)+"</span>"+(a?'<span class="spcl">| <i class="fa fa-lock"></i> '+c(a)+"</span>":'<span class="spcl">| Encryption: disabled</span>')+"</div>"
}}},d0={score:5120,label:"Instance"},d1={score:2560,label:"Application"},d2={score:1280,label:"Environment"},d3={score:640,label:"Product"},d4={score:320,label:"Enterprise"},d5={score:160,label:"D5"},d6={score:80,label:"D6"},d7={score:40,label:"D7"},d8={score:20,label:"D8"},d9={score:10,label:"D9"},depthScores=[10,20,40,80,160,320,640,1280,2560,5120],scores=[5120,2560,1280,640,320,160,80,40,20,10],depths={5120:[d0],2560:[d1,d0],1280:[d2,d1,d0],640:[d3,d2,d1,d0],320:[d4,d3,d2,d1,d0],160:[d5,d4,d3,d2,d1,d0],80:[d6,d5,d4,d3,d2,d1,d0],40:[d7,d6,d5,d4,d3,d2,d1,d0],20:[d8,d7,d6,d5,d4,d3,d2,d1,d0],10:[d9,d8,d7,d6,d5,d4,d3,d2,d1,d0]},IntType=new RegExp(/^-?\d+$/),DecType=new RegExp(/^-?\d{0,}(\.\d{0,}){0,1}$/),slideTime=250,nameError="Name has to begin with a number or a letter. It may contain non-repeating period (.), dash (-) or a underscore (_), and it must end with a number or a letter.",keyError="Key can be made of letters, numbers and following characters: []()*_+-.",keyCannotChange="Access rules assigned for the team you belong to, prevent you from editing this key.",scopeLimit=10;
function contextParam(a){var b=[],c;
for(c in a){if(a[c]&&a[c].length>0){b.push(c+":"+a[c])
}}return b.join(";")
}function fullContextToHTML(a){var b=[],c;
for(c in a){if(a[c]&&a[c].length>0){b.push(a[c])
}}return b.join("<i></i>")
}function sameArrays(d,c,e){if(!d&&!c){return true
}if((d&&!c)||(!d&&c)){return false
}if(d.length!=c.length){return false
}d=e(d);
c=e(c);
return angular.equals(d,c)
};