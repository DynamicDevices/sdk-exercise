import { Application } from "./lib/view";

import { ViewEnd } from "./views/end";
import { ViewExercise } from "./views/exercise";
import { ViewSelect } from "./views/select";

import * as messaging from "messaging";
import * as document from "document";

import * as config from "./config";

class MultiScreenApp extends Application {
  screens = { ViewSelect, ViewExercise, ViewEnd };
}

messaging.peerSocket.addEventListener("open", (evt) => {
  console.log("Ready to send or receive messages");
});

messaging.peerSocket.addEventListener("error", (err) => {
  console.error(`Connection error: ${err.code} - ${err.message}`);
});

messaging.peerSocket.addEventListener("message", (evt) => {
  if (evt && evt.data) {
    let data = JSON.stringify(evt.data);
    console.log(`MESSAGE: ${data}`);
    if(evt.data.key === "minPace")
      config.paceOptions.minPace = evt.data.value;
    else if(evt.data.key === "maxPace")
      config.paceOptions.maxPace = evt.data.value;
  }
});

MultiScreenApp.start("ViewSelect");

