import { Patcher } from "@zlibrary";
import BasePlugin from "@zlibrary/plugin";
import forceUpdateApp from "./forceUpdateApp.js";
import { set, get } from "./storage.js";
import { discordWebSocket, webSocketValid } from "./WebSocket.js";
import { getRealPlatform, updateSpoofPlatform } from "./platform.js";
import EtfDecoder from "./erlpack/decoder.js";
import EtfEncoder from "./erlpack/encoder.js";

let websocketInited = false;

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

export default class OsSpoof extends BasePlugin {
	onStart() {
		console.log("[OsSpoof] Initializing...");

		const spoofPlatform = get("platform") || getRealPlatform();
		updateSpoofPlatform(spoofPlatform);

		Patcher.before(WebSocket.prototype, "send", (that, args) => {
			if (!(args[0] instanceof ArrayBuffer)) return;

			const data = new EtfDecoder(args[0]).unpack();
			let payloadModified = false;

			if (that.url.startsWith("wss://gateway") && (that.url.indexOf("discord.gg") != -1))
			{
				// We're assuming that there's _only_ **one** WebSocket to Discord's server.
				if (!webSocketValid)
				{
					console.log("[OsSpoof]: Killing invalid WebSocket...");
					that.close(1000);
					webSocketValid = true;
					websocketInited = false;
					return args;
				}
			}

			if (data.op === 6 && !websocketInited) {
				console.log("[OsSpoof] Blocking resume with dumb session ID...");
				data.d.session_id = genRanHex(32);
				payloadModified = true;
			}

			if (data.op === 2) {
				console.log("[OsSpoof] Identifying as the desired platform...");
				switch (get("websocket")) {
					case "win32":
						data.d.properties = { browser: "Discord Client", os: "Windows" };
						break;
					case "darwin":
						data.d.properties = { browser: "Discord Client", os: "Mac OS X" };
						break;
					case "linux":
						data.d.properties = { browser: "Discord Client", os: "Linux" };
						break;
					case "temple":
						data.d.properties = { browser: "Discord Client", os: "TempleOS" };
						break;
					case "haiku":
						data.d.properties = { browser: "Discord Client", os: "HaikuOS" };
						break;
					case "web":
						data.d.properties = { browser: "Discord Web", os: "Other" };
						break;
					case "android":
						data.d.properties = { browser: "Discord Android", os: "Android" };
						break;
					case "ios":
						data.d.properties = { browser: "Discord iOS", os: "iOS" };
						break;
					case "wp":
						// There weren't any official Discord clients for Windows Phones...
						data.d.properties = { browser: "Discord Android", os: "Windows Phone" };
						break;
				}
				payloadModified = true;
				websocketInited = true;
				discordWebSocket = that;
			}

			if (payloadModified) {
				console.log("[OsSpoof] Re-encoding modified payload...");

				const encoder = new EtfEncoder();
				encoder.pack(data);
				args[0] = encoder.buffer.slice(0, encoder.offset);
			}

			return args;
		});

		forceUpdateApp();
	}
	onStop() {
		Patcher.unpatchAll();
		forceUpdateApp();
	}

	getSettingsPanel() {
		const panel = this.buildSettingsPanel();
		panel.addListener(this.updateSettings.bind(this));
		return panel.getElement();
	}

	updateSettings(group, id, value) {
		set(group, id);
		if (group == "websocket") {
			webSocketValid = false;
		}
		else if (group == "platform") {
			updateSpoofPlatform(id);
		}
	}
}
