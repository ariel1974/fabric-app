
function initPushwoosh() {
    var pushNotification = cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");

    //set push notification callback before we initialize the plugin
    document.addEventListener('push-notification', function(event) {
                                //get the notification payload
                                var notification = event.notification;

                                //display alert to the user for example
                                alert(notification.aps.alert);

                                //clear the app badge
                                pushNotification.setApplicationIconBadgeNumber(0);
                            });

    //initialize the plugin
    pushNotification.onDeviceReady({pw_appid:"F23C8-926FD"});

    //register for pushes
    pushNotification.registerDevice(
        function(status) {
            var deviceToken = status['deviceToken'];
            console.warn('registerDevice: ' + deviceToken);
        },
        function(status) {
            console.warn('failed to register : ' + JSON.stringify(status));
            alert(JSON.stringify(['failed to register ', status]));
        }
    );

    //reset badges on app start
    pushNotification.setApplicationIconBadgeNumber(0);
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        //document.addEventListener('deviceready', this.onDeviceReady, true);

        document.addEventListener("deviceready", function(){
            alert("deviceready");
            initPushwoosh();
         }, true);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        alert('onDeviceReady');
        app.receivedEvent('deviceready');
        initPushwoosh();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        alert('receivedEvent');
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
