function initPushwoosh() {
	
    var pushNotification = window.plugins.pushNotification;
    pushNotification.onDeviceReady();
     
    pushNotification.registerDevice({alert:true, badge:true, sound:true, pw_appid:myApp.pushwoosh.appid, appname:myApp.name},
        function(status) {
            var deviceToken = status['deviceToken'];
            console.warn('registerDevice: ' + deviceToken);
        },
        function(status) {
            console.warn('failed to register : ' + JSON.stringify(status));
             //navigator.notification.alert(JSON.stringify(['failed to register ', status]));
        }
    );
     
    pushNotification.setApplicationIconBadgeNumber(0);
     
    document.addEventListener('push-notification', function(event) {
        var notification = event.notification;
        //navigator.notification.alert(notification.aps.alert);
		navigator.notification.alert(notification.aps.alert,alertDismissed,'Message from '+myApp.alias,'Ok');
        pushNotification.setApplicationIconBadgeNumber(0);
    });
}

function alertDismissed() {}

