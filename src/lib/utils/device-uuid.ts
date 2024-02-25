/**
 * modified from
 * device-uuid.js v1.0.4 (https://github.com/biggora/device-uuid/)
 * Copyright 2016-2017 Alexey Gordeyev
 * Licensed under MIT (https://github.com/biggora/device-uuid/blob/master/LICENSE)
 */

export const DeviceUuid = class {
  uuid: string;

  constructor(options) {
    this.uuid = "";

    if (!navigator || !window || !screen) {
      throw new Error("This environment is not supported.");
    }

    const BOTS = [
      "\\+https:\\/\\/developers.google.com\\/\\+\\/web\\/snippet\\/",
      "googlebot",
      "baiduspider",
      "gurujibot",
      "yandexbot",
      "slurp",
      "msnbot",
      "bingbot",
      "facebookexternalhit",
      "linkedinbot",
      "twitterbot",
      "slackbot",
      "telegrambot",
      "applebot",
      "pingdom",
      "tumblr ",
      "Embedly",
      "spbot",
    ];
    const IS_BOT_REGEXP = new RegExp("^.*(" + BOTS.join("|") + ").*$");
  }

  get() {
    return this.uuid;
  }
};

// WIP

// https://stackoverflow.com/a/48161723/1022765
async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);

  // hash the message
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

// https://stackoverflow.com/a/52171480/1022765
const cyrb53 = (str, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

const getDeviceUuid = async () => {
  const ua = navigator.userAgent;
  const screen = window.screen;
  const navigator = window.navigator;
  const device = {
    screen: {
      width: screen.width,
      height: screen.height,
      colorDepth: screen.colorDepth,
    },
    navigator: {
      cookieEnabled: navigator.cookieEnabled,
      language: navigator.language,
      platform: navigator.platform,
      userAgent: navigator.userAgent,
    },
  };
  const deviceString = JSON.stringify(device);
  const hash = await sha256(deviceString);
  const uuid = cyrb53(hash);
  return uuid;
};
