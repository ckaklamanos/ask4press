function initPushwoosh()
{	
	var pushNotification = window.plugins.pushNotification;
    pushNotification.onDeviceReady();
 
    pushNotification.registerDevice({ projectid: myApp.google_project_number, appid : myApp.pushwoosh.appid },
        function(status) {
            var pushToken = status;
            console.warn('push token: ' + pushToken);
            //alert('push token: ' + pushToken);
           // console.log('push token: ' + pushToken);
        },
        function(status) {
            console.warn(JSON.stringify(['failed to register ', status]));
            //alert(JSON.stringify(['failed to register ', status]));
            //console.log(JSON.stringify(['failed to register ', status]));
			
        }
    );
 
    document.addEventListener('push-notification', function(event) {
        
		var title = event.notification.title;
        var userData = event.notification.userdata;
        //var msg = event.notification.message;                         
        
		if(typeof(userData) != "undefined") {
            console.warn('user data: ' + JSON.stringify(userData));
        }
                                     
        navigator.notification.alert(title,alertDismissed,fnLang('pushmessage_from',myApp.lang)+myApp.name,'Ok');
    });
}

function alertDismissed() {}