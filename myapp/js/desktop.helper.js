if(!((window.DocumentTouch&&document instanceof DocumentTouch)||'ontouchstart' in window)){
	var script=document.createElement("script");

	script.src="jqmobi/js/plugins/jq.desktopBrowsers.js";
	var tag=$("head").append(script);
	if(!$.os.ie){
	//	$.os.desktop=true;
	//	$.feat.nativeTouchScroll=true;
	}
}
var oldElem="default";

function setActiveStyleSheet(title) {
   var a = document.getElementsByTagName("link");
   var currElem;
   
   if(title==oldElem.getAttribute("title")||oldElem=="default")
      return;
   for(i=0; i<a.length; i++) {
   
       if(a[i].getAttribute("title")==title){
         currElem=a[i];
       }
       else if(!a[i].getAttribute("disabled")&&a[i].getAttribute("title"))
          oldElem=a[i];
   }
   
   currElem.removeAttribute("disabled");
   jq.ui.showMask();
   window.setTimeout(function(){
      jq.ui.hideMask();
      oldElem.setAttribute("disabled","true");
   },500);
}
$(document).ready(function(){
	oldElem=document.getElementsByTagName("link")[0];
});
