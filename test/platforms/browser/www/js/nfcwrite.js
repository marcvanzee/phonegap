function writeTag(nfcEvent) {
  for (var key in network) {
    if (network.hasOwnProperty(key)) {
        str += key + " -> " + network[key] + "\n";
    }
    }
    
  var mimeType = str,
    payload = str,
    record = ndef.mimeMediaRecord(mimeType, nfc.stringToBytes(payload));

  nfc.write(
        [record], 
        function () {
            alert('Wrote NFC tag!');
            navigator.notification.vibrate(100);
        }, 
        function (reason) {
            alert('Error writing');
        }
  );   
}

let NFC_TOKEN_MIME_TYPE = "application/vnd.wfa.wsc";

let NETWORK_INDEX_FIELD_ID = 0x1026;
let NETWORK_INDEX_DEFAULT_VALUE = 0x01; // This should be byte, rest is short

let SSID_FIELD_ID = 0x1045;

let AUTH_TYPE_EXPECTED_SIZE = 2;
let AUTH_TYPE_OPEN = 0x0001;
let AUTH_TYPE_WPA_PSK = 0x0002;
let AUTH_TYPE_WPA_EAP = 0x0008;
let AUTH_TYPE_WPA2_EAP = 0x0010;
let AUTH_TYPE_WPA2_PSK = 0x0020;

let ENC_TYPE_FIELD_ID = 0x100f;
let ENC_TYPE_NONE = 0x0001;
let ENC_TYPE_WEP = 0x0002; // deprecated
let ENC_TYPE_TKIP = 0x0004; // deprecated -> only with mixed mode (0x000c)
let ENC_TYPE_AES = 0x0008; // includes CCMP and GCMP
let ENC_TYPE_AES_TKIP = 0x000c; // mixed mode


// WPA2-personal (passphrase): 8-63 ASCII characters
// WPA2-personal: 64 hex characters

let MAC_ADDRESS_FIELD_ID = 0x1020;

let MAX_SSID_SIZE_BYTES = 32;
let MAX_MAC_ADDRESS_SIZE_BYTES = 6;
let MAX_NETWORK_KEY_SIZE_BYTES = 64;

let str = "";

var buffer = new ArrayBuffer(16);

