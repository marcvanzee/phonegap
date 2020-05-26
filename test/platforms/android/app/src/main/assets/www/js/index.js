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
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        console.log("Device is ready, scanning network...");

        // function callback(result) {
        //     console.log(result);
        //     console.log("payload", result.tag.ndefMessage[0].payload.join());
        //     console.log("type", result.tag.ndefMessage[0].type.join());
        // }

        // function win() {
        //         console.log("Listening for NDEF tags");
        //       }
              
        //       function fail() {
        //         alert('Failed to register NFC Listener');
        //       }
        // nfc.addNdefListener(callback, win, fail);


        app.startScan();

        $('#write-btn').click(function() {
            network = allNetworks[$('#networks').val()];
            console.log('selected network:', network);
            console.log('all networks', allNetworks);
            console.log('info from array:', network);

             function win() {
                console.log("Listening for NDEF tags");
              }
              
              function fail() {
                alert('Failed to register NFC Listener');
              }

            nfc.addTagDiscoveredListener(writeTag, win, fail);
        });
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    },
    startScan: function() {
        var WifiManager = window.cordova.plugins.WifiManager;

        WifiManager.startScan(function (err, enabled) {
           WifiManager.getScanResults(function (err, networks) {
               console.log('getScanResults', err, networks);
               allNetworks = networks;
               var dropdown = $('#networks');
               $.each(networks, function(id, network) {
                    dropdown.append(
                        $('<option></option>').val("" + id).html(network.SSID));
               });
            }); 
        }); 
    }
};

var allNetworks;
var network;
var password = "07343031";