function onMainLoad(what){

	if(isDesktop())	{

		if(myApp.updatedataonhomeload)
			initCheckForUpdates();
	}
	
	$("#header .hide").hide();
	$("#customBack").hide().unbind().bind("click",function(evt){
		exitAppDialog();
	});
	
}

function onMainUnLoad(what){

	
}
function onSecondLevelLoad(what){
	
	$("#customBack").unbind().bind("click",function(evt){
		loadMainPanel();
	}).text(myApp.alias);
	
	$("#customBack").show();
}
function onAboutLoad(what){
	
	$("#customBack").unbind().bind("click",function(evt){
		loadMainPanel();
	}).text(myApp.alias);
	
	$("#customBack").show();
	
	$("#version .label").text(myLang[myApp.lang].version_label);
	$("#version .local").text(myApp.version);
	$("#version .api").text(myApp.api.version);
	
	if(!isDesktop()){
		$("#device .label").text(myLang[myApp.lang].device_label);
		$("#device .name").text(device.name);
		$("#device .platform").text(device.platform);
		$("#device .version").text(device.version);
		$("#device .model").text(device.model);

	}
	

}


function loadMainPanel(){
	$.ui.loadContent("#main",false,false,'down')
}

function showTimedMask(text,timeout){
	
	$('.ui-icon-loading').hide();
	$.ui.showMask(text);
	
	window.setTimeout(function(){
		
			$.ui.hideMask();
			$('.ui-icon-loading').show();
			return;
		},
		timeout
	);
}

