function initPushwoosh()
{
	if (device.platform=="Android"){
		var pushNotification = window.plugins.pushNotification;
		pushNotification.onDeviceReady();
 
		pushNotification.registerDevice({ projectid: myApp.google_project_number, appid : myApp.pushwoosh.appid },
			function(status) {
				var pushToken = status;
				console.log('push token: ' + pushToken);
			},
			function(status) {
				console.log(JSON.stringify(['failed to register ', status]));
			}
		);
 
		document.addEventListener('push-notification', function(event) {
				var title = event.notification.title;
				var userData = event.notification.userdata;
 
				if(typeof(userData) != "undefined") {
					console.log('user data: ' + JSON.stringify(userData));
			}
 
			navigator.notification.alert(title,pushAlertDismissed,myLang[myApp.lang].pushmessage_title,myLang[myApp.lang].ok);
		});
	}
	if (device.platform=="iOS"){

		var pushNotification = window.plugins.pushNotification;
		pushNotification.onDeviceReady();
 
		pushNotification.registerDevice({alert:true, badge:true, sound:true, pw_appid:myApp.pushwoosh.appid, appname: myApp.name},
			function(status) {
				var deviceToken = status['deviceToken'];
				console.warn('registerDevice: ' + deviceToken);
			},
			function(status) {
				console.warn('failed to register : ' + JSON.stringify(status));
				navigator.notification.alert(JSON.stringify(['failed to register ', status]));
			}
		);
 
		pushNotification.setApplicationIconBadgeNumber(0);
 
		document.addEventListener('push-notification', function(event) {
			var notification = event.notification;
			navigator.notification.alert(notification.aps.alert,pushAlertDismissed,myLang[myApp.lang].pushmessage_title,myLang[myApp.lang].ok);
			pushNotification.setApplicationIconBadgeNumber(0);
		});
	}
}


function pushAlertDismissed(){}