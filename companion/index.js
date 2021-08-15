
import { settingsStorage } from "settings";
import * as messaging from "messaging";
import { me as companion } from "companion";

let KEY_MAX_PACE = "maxPace";
let KEY_MIN_PACE = "minPace";

// Settings have been changed
settingsStorage.addEventListener("change", (evt) => {
  console.log("Sending change");
  sendValue(evt.key, evt.newValue);
});

// Settings were changed while the companion was not running
if (companion.launchReasons.settingsChanged) {
  console.log("Sending initial values");
  // Send the value of the setting
  sendValue(KEY_MIN_PACE, settingsStorage.getItem(KEY_MIN_PACE));
  sendValue(KEY_MAX_PACE, settingsStorage.getItem(KEY_MAX_PACE));
}

function sendValue(key, val) {
  if (val) {
    sendSettingData({
      key: key,
      value: JSON.parse(val).name
    });
  }
}
function sendSettingData(data) {
  // If we have a MessageSocket, send the data to the device
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.log("No peerSocket connection");
  }
}
