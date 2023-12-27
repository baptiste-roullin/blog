(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["src/_templates/components/posts_list_item.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<li\tclass=\"relative flex flex-col items-start md:items-center md:flex-row card-shadow-hover card-base \">\n  <img\n\t\tonclick=\"window.location.href='";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"url"), env.opts.autoescape);
output += "'\"\n\t\tdata-responsiver=\"postList\"\n\t\talt=\"\"\n\t\tclass=\"\n\t\t\tcursor-pointer object-cover w-full h-auto sm:max-h-52 md:min-h-[10rem] min-h-[12rem] xl:max-h-44\n\t\t\trounded-t-md md:w-1/3 max-h-40 md:rounded-l-md md:rounded-r-none \"\n\t\tloading=\"lazy\"\n   \t\tsrc=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"data")),"collatedHeroImage"), env.opts.autoescape);
output += "\"\n              >\n\n  <div\n\tclass=\"flex flex-col m-6 mt-0 sm:gap-6 md:my-0 md:ml-0 md:mr-4 md:w-2/3 \">\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "page")),"fileSlug") == "home") {
output += "\n      ";
var t_1;
t_1 = "3";
frame.set("hx", t_1, true);
if(frame.topLevel) {
context.setVariable("hx", t_1);
}
if(frame.topLevel) {
context.addExport("hx", t_1);
}
output += "\n    ";
;
}
else {
output += "\n      ";
var t_2;
t_2 = "2";
frame.set("hx", t_2, true);
if(frame.topLevel) {
context.setVariable("hx", t_2);
}
if(frame.topLevel) {
context.addExport("hx", t_2);
}
output += "\n    ";
;
}
output += "\n\n    <h";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "hx"), env.opts.autoescape);
output += " class=\" ";
output += runtime.suppressValue((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "page")),"fileSlug") == "home"?"cta-heading":"cta-heading2"), env.opts.autoescape);
output += "\">\n      <a\n\t\t\thref=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"url"), env.opts.autoescape);
output += "\"\n\t\t\tclass=\"block link-hover hover:text-brown-light\">\n        ";
output += runtime.suppressValue(env.getFilter("safe").call(context, env.getFilter("removeMD").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"data")),"title"))), env.opts.autoescape);
output += "\n      </a>\n    </h";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "hx"), env.opts.autoescape);
output += ">\n\n    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "postListItemStyle")),"complete")) {
output += "\n\n      <div class=\"\">\n        <time class=\"text-base label lg:my-2\" datetime=\"";
output += runtime.suppressValue(env.getFilter("dateHumanFormat").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"data")),"page")),"date"),"yyyy-MM-dd"), env.opts.autoescape);
output += "\">\n          ";
output += runtime.suppressValue(env.getFilter("dateHumanFormat").call(context, runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"data")),"page")),"date"),"dd LLLL yyyy"), env.opts.autoescape);
output += "\n        </time>\n        ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"data")),"description") || runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"data")),"page")),"description")) {
output += "\n          <span aria-hidden=\"true\" class=\"inline mx-1 text-xl font-light text-gray-500 md:mx-2 \" >~</span>\n          <span class=\"text-base label \">\n            ";
output += runtime.suppressValue(env.getFilter("removeMD").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "post")),"data")),"description")), env.opts.autoescape);
output += "\n          </span>\n        ";
;
}
output += "\n      </div>\n    ";
;
}
output += "\n\n  </div>\n</li>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
