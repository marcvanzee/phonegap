let AUTH_TYPE_WPA2_PSK = 0x0020;
let AUTH_TYPE_FIELD_ID = 0x1003;
let CREDENTIAL_FIELD_ID = 0x100e;
let SSID_FIELD_ID = 0x1045;
let NFC_TOKEN_MIME_TYPE = "application/vnd.wfa.wsc";
let NETWORK_KEY_FIELD_ID = 0x1027;

let outputBytes;
let curIndex = 0;

function addByte(byte) {
  outputBytes[curIndex] = byte;
  curIndex++;
}

function addBytes(bytes) {
  for (let i = 0; i<bytes.length; i++) {
    addByte(bytes[i]);
  }
}

function writeTag() {
    let ssid = network.SSID;
    let password = $("#password").val();

    /*

    var encoder = new TextEncoder();
    var ssidBytes = encoder.encode(ssid);
    let ssidSize = ssidBytes.length;

    let authType = AUTH_TYPE_WPA2_PSK;

    let networkKeyBytes = encoder.encode(networkKey);
    let networkKeySize = networkKeyBytes.length;

    let bufferSize = 18 + ssidSize + networkKeySize; // size of required credential attributes
    console.log("ssidSize", ssidSize);
    console.log("networkKeySize", networkKeySize);
    console.log("bufferSize", bufferSize);
    let output = new ArrayBuffer(bufferSize);

    outputBytes = new Int8Array(output);
    addByte(CREDENTIAL_FIELD_ID);
    addByte(bufferSize - 4);
    addByte(SSID_FIELD_ID);
    addByte(ssidSize);
    addBytes(ssidBytes);
    addByte(AUTH_TYPE_FIELD_ID);
    addByte(0x2);
    addByte(authType);
    addByte(NETWORK_KEY_FIELD_ID);
    addByte(networkKeySize);
    addBytes(networkKeyBytes);

    console.log("outputBytes", outputBytes);

    console.log(NFC_TOKEN_MIME_TYPE);
    nfc.stringToBytes(NFC_TOKEN_MIME_TYPE);
    */

    console.log("ssid:", ssid);
    console.log("password", password); // 07343031   

    let tnf = 2;
    // let type = [97,112,112,108,105,99,97,116,105,111,110,47,118,110,100,46,119,102,97,46,119,115,99]; // "application/vnd.wfa.wsc"
    let type = util.stringToBytes("application/vnd.wfa.wsc");
    let id = [];
    payload = [16,14,0].concat(ssid.length+password.length+30).concat([16,69,0]);
    payload = payload.concat(ssid.length).concat(util.stringToBytes(ssid));
    payload = payload.concat([16,32,0,6,0,0,0,0,0,2,16,39,0]);
    payload = payload.concat(password.length).concat(util.stringToBytes(password));
    payload = payload.concat([16,3,0,2,0,32,16,15,0,2,0,8,16,73,0,6,0,55,42,0,1,32]);

/*
    begin = [16,14,0,48,16,69,0]
    length ssid = [10]
    network = [75, 111, 112, 101, 110, 104, 97, 103, 101, 110] // Kopenhagen
    next =  [16,32,0,6,0,0,0,0,0,2,16,39,0]
    length password = [8]
    password = [48, 55, 51, 52, 51, 48, 51, 49]
    end = [16,3,0,2,0,32,16,15,0,2,0,8,16,73,0,6,0,55,42,0,1,32]

    payload = [16,14,0,48,16,69,0,10,75,111,112,101,110,104,97,103,101,110,16,32,0,6,0,0,0,0,0,2,16,39,0,8,48,55,51,52,51,48,51,49,16,3,0,2,0,32,16,15,0,2,0,8,16,73,0,6,0,55,42,0,1,32]
*/
    record = ndef.record(tnf, type, id, payload);

    nfc.write(
          [record], 
          function () {
              alert('Wrote NFC tag!');
              navigator.notification.vibrate(100);
          }, 
          function (reason) {
              console.log('Error writing', reason);
          }
    );
}

// FROM MY CODE

// Kopenhagen 07343031

// BEGIN      [16,14,0,48,16,69,0] 
// LEN SSID   [10]
// SSID       [75,111,112,101,110,104,97,103,101,110]
// MID        [16,32,0,6,0,0,0,0,0,2,16,39,0]
// LEN PWD    [8]
// PWD        [48,55,51,52,51,48,51,49]
// END        [16,3,0,2,0,32,16,15,0,2,0,8,16,73,0,6,0,55,42,0,1,32]


// Bonobo ajax

// BEGIN      [16,14,0,48,16,69,0] 
// LEN SSID   [6]
// SSID       [66,111,110,111,98,111]
// MID        [16,32,0,6,0,0,0,0,0,2,16,39,0]
// LEN PWD    [4]
// PWD        [97,106,97,120]
// END        [16,3,0,2,0,32,16,15,0,2,0,8,16,73,0,6,0,55,42,0,1,32]

// FROM READER

// Bonobo ajax

// BEGIN      [16,14,0,40,16,69,0] 
// LEN SSID   [6]
// SSID       [66,111,110,111,98,111]
// MID        [16,32,0,6,0,0,0,0,0,2,16,39,0]
// LEN PWD    [4]
// PWD        [97,106,97,120]
// END        [16,3,0,2,0,32,16,15,0,2,0,8,16,73,0,6,0,55,42,0,1,32]

// DIFFS:
// byte 4: 48 (with me), 40 (with reader)
// 


// 14 + ssidSize + networkKeySize
// Kopenhagen: 18
// Bonobo: 10
// Bytes = 30 + ssid.length + password.length

