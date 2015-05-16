document.addEventListener("deviceready", onDeviceReady, false);
//document.addEventListener("deviceready", initPushwoosh, true);

function onDeviceReady() 
{
	
	
	if (device.platform=="Android"){
		document.addEventListener("backbutton", backButtonClick, true);
		document.addEventListener("menubutton", onMenuKeyDown, false);
				
	}
	
	if(isOnline())
		initPushwoosh();
	
	navigator.splashscreen.hide();
	
	if(myApp.updatedataonhomeload)
		initCheckForUpdates();	

}

function isOnline(){
	
	if(window.device)
		return (navigator.connection.type=='none'||navigator.connection.type=='unknown')?false:true;
	else	
		return true;	
}
	
function backButtonClick(){

	var myEvt = document.createEvent('MouseEvents');
	myEvt.initEvent(
		'click'     // event type
		,true      // can bubble?
		,true      // cancelable?
	);
	document.getElementById('customBack').dispatchEvent(myEvt);

}

function onExitConfirm(button) {
     if(button==1){
		navigator.app.exitApp();
/* 		if(device.version=='2.3.3' ){
			window.localStorage.clear();
		} */
	}
}

function exitAppDialog(){

	navigator.notification.confirm(
		myLang[myApp.lang].exit_message,  
		onExitConfirm,              
		myLang[myApp.lang].exit_title,            
		[myLang[myApp.lang].yes,myLang[myApp.lang].no]          
	);
}

function onMenuKeyDown(){

	jq.ui.toggleSideMenu()
}


