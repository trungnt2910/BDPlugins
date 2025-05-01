/**
 * @name OsSpoof
 * @author Kyza, AduMaster
 * @version 1.0.4
 * @description Spoofs your client's operating system! Based on Kyza's PlatformEmulator.
 * @source https://github.com/trungnt2910/BDPlugins/tree/master/plugins/OsSpoof
 * @updateUrl https://raw.githubusercontent.com/trungnt2910/BDPlugins/compiled/OsSpoof/OsSpoof.plugin.js
 */
/*@cc_on
@if (@_jscript)
    
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();
@else@*/
/* Generated Code */
const config = {
	"info": {
		"name": "OsSpoof",
		"authors": [{
				"name": "Kyza",
				"discord_id": "220584715265114113",
				"github_username": "Kyza"
			},
			{
				"name": "AduMaster",
				"discord_id": "380638507955257345",
				"github_username": "trungnt2910"
			}
		],
		"version": "1.0.4",
		"description": "Spoofs your client's operating system! Based on Kyza's PlatformEmulator.",
		"github": "https://github.com/trungnt2910/BDPlugins/tree/master/plugins/OsSpoof",
		"github_raw": "https://raw.githubusercontent.com/trungnt2910/BDPlugins/compiled/OsSpoof/OsSpoof.plugin.js"
	},
	"defaultConfig": [{
			"type": "radio",
			"id": "platform",
			"name": "UI Spoof platform",
			"note": "Fools the user agent processor library of the Discord client to match the selected platform.",
			"value": null,
			"options": [{
					"name": "Windows",
					"value": "win32"
				},
				{
					"name": "OSX",
					"value": "darwin"
				},
				{
					"name": "Linux",
					"value": "linux"
				}
			]
		},
		{
			"type": "radio",
			"id": "websocket",
			"name": "WebSocket Spoof platform",
			"note": "Fools the Discord WebSocket client to report the selected platform.",
			"value": null,
			"options": [{
					"name": "Default",
					"value": "default"
				},
				{
					"name": "Windows",
					"value": "win32"
				},
				{
					"name": "OSX",
					"value": "darwin"
				},
				{
					"name": "Linux",
					"value": "linux"
				},
				{
					"name": "TempleOS",
					"value": "temple"
				},
				{
					"name": "HaikuOS",
					"value": "haiku"
				},
				{
					"name": "Web",
					"value": "web"
				},
				{
					"name": "Android",
					"value": "android"
				},
				{
					"name": "iOS",
					"value": "ios"
				},
				{
					"name": "Windows 10 Mobile",
					"value": "wp"
				}
			]
		}
	],
	"changelog": [{
		"title": "Bugfixes",
		"type": "fixed",
		"items": [
			"Fixed a bug that affects activity timestamps."
		]
	}],
	"build": {
		"copy": true,
		"zlibrary": true,
		"watch": true,
		"release": {
			"source": true,
			"public": true
		}
	}
};
function buildPlugin([BasePlugin, PluginApi]) {
	const module = {
		exports: {}
	};
	(() => {
		"use strict";
		class StyleLoader {
			static styles = "";
			static element = null;
			static append(module, css) {
				this.styles += `/* ${module} */\n${css}`;
			}
			static inject(name = config.info.name) {
				if (this.element) this.element.remove();
				this.element = document.head.appendChild(Object.assign(document.createElement("style"), {
					id: name,
					textContent: this.styles
				}));
			}
			static remove() {
				if (this.element) {
					this.element.remove();
					this.element = null;
				}
			}
		}
		function ___createMemoize___(instance, name, value) {
			value = value();
			Object.defineProperty(instance, name, {
				value,
				configurable: true
			});
			return value;
		};
		const Modules = {
			get 'react-spring'() {
				return ___createMemoize___(this, 'react-spring', () => BdApi.findModuleByProps('useSpring'))
			},
			'@discord/utils': {
				get 'joinClassNames'() {
					return ___createMemoize___(this, 'joinClassNames', () => BdApi.findModule(e => e.toString().indexOf('return e.join(" ")') > 200))
				},
				get 'useForceUpdate'() {
					return ___createMemoize___(this, 'useForceUpdate', () => BdApi.findModuleByProps('useForceUpdate')?.useForceUpdate)
				},
				get 'Logger'() {
					return ___createMemoize___(this, 'Logger', () => BdApi.findModuleByProps('setLogFn')?.default)
				},
				get 'Navigation'() {
					return ___createMemoize___(this, 'Navigation', () => BdApi.findModuleByProps('replaceWith', 'currentRouteIsPeekView'))
				}
			},
			'@discord/components': {
				get 'Tooltip'() {
					return ___createMemoize___(this, 'Tooltip', () => BdApi.findModuleByDisplayName('Tooltip'))
				},
				get 'TooltipContainer'() {
					return ___createMemoize___(this, 'TooltipContainer', () => BdApi.findModuleByProps('TooltipContainer')?.TooltipContainer)
				},
				get 'TextInput'() {
					return ___createMemoize___(this, 'TextInput', () => BdApi.findModuleByDisplayName('TextInput'))
				},
				get 'SlideIn'() {
					return ___createMemoize___(this, 'SlideIn', () => BdApi.findModuleByDisplayName('SlideIn'))
				},
				get 'SettingsNotice'() {
					return ___createMemoize___(this, 'SettingsNotice', () => BdApi.findModuleByDisplayName('SettingsNotice'))
				},
				get 'TransitionGroup'() {
					return ___createMemoize___(this, 'TransitionGroup', () => BdApi.findModuleByDisplayName('TransitionGroup'))
				},
				get 'Button'() {
					return ___createMemoize___(this, 'Button', () => BdApi.findModule(m => 'DropdownSizes' in m && typeof(m) === 'function'))
				},
				get 'Popout'() {
					return ___createMemoize___(this, 'Popout', () => BdApi.findModuleByDisplayName('Popout'))
				},
				get 'Flex'() {
					return ___createMemoize___(this, 'Flex', () => BdApi.findModuleByDisplayName('Flex'))
				},
				get 'Text'() {
					return ___createMemoize___(this, 'Text', () => BdApi.findModuleByDisplayName('LegacyText'))
				},
				get 'Card'() {
					return ___createMemoize___(this, 'Card', () => BdApi.findModuleByDisplayName('Card'))
				}
			},
			'@discord/modules': {
				get 'Dispatcher'() {
					return ___createMemoize___(this, 'Dispatcher', () => BdApi.findModuleByProps('dispatch', 'isDispatching'))
				},
				get 'ComponentDispatcher'() {
					return ___createMemoize___(this, 'ComponentDispatcher', () => BdApi.findModuleByProps('ComponentDispatch')?.ComponentDispatch)
				},
				get 'EmojiUtils'() {
					return ___createMemoize___(this, 'EmojiUtils', () => BdApi.findModuleByProps('uploadEmoji'))
				},
				get 'PermissionUtils'() {
					return ___createMemoize___(this, 'PermissionUtils', () => BdApi.findModuleByProps('computePermissions', 'canManageUser'))
				},
				get 'DMUtils'() {
					return ___createMemoize___(this, 'DMUtils', () => BdApi.findModuleByProps('openPrivateChannel'))
				}
			},
			'@discord/stores': {
				get 'Messages'() {
					return ___createMemoize___(this, 'Messages', () => BdApi.findModuleByProps('getMessage', 'getMessages'))
				},
				get 'Channels'() {
					return ___createMemoize___(this, 'Channels', () => BdApi.findModuleByProps('getChannel', 'getDMFromUserId'))
				},
				get 'Guilds'() {
					return ___createMemoize___(this, 'Guilds', () => BdApi.findModuleByProps('getGuild'))
				},
				get 'SelectedGuilds'() {
					return ___createMemoize___(this, 'SelectedGuilds', () => BdApi.findModuleByProps('getGuildId', 'getLastSelectedGuildId'))
				},
				get 'SelectedChannels'() {
					return ___createMemoize___(this, 'SelectedChannels', () => BdApi.findModuleByProps('getChannelId', 'getLastSelectedChannelId'))
				},
				get 'Info'() {
					return ___createMemoize___(this, 'Info', () => BdApi.findModuleByProps('getSessionId'))
				},
				get 'Status'() {
					return ___createMemoize___(this, 'Status', () => BdApi.findModuleByProps('getStatus', 'getActivities', 'getState'))
				},
				get 'Users'() {
					return ___createMemoize___(this, 'Users', () => BdApi.findModuleByProps('getUser', 'getCurrentUser'))
				},
				get 'SettingsStore'() {
					return ___createMemoize___(this, 'SettingsStore', () => BdApi.findModuleByProps('afkTimeout', 'status'))
				},
				get 'UserProfile'() {
					return ___createMemoize___(this, 'UserProfile', () => BdApi.findModuleByProps('getUserProfile'))
				},
				get 'Members'() {
					return ___createMemoize___(this, 'Members', () => BdApi.findModuleByProps('getMember'))
				},
				get 'Activities'() {
					return ___createMemoize___(this, 'Activities', () => BdApi.findModuleByProps('getActivities'))
				},
				get 'Games'() {
					return ___createMemoize___(this, 'Games', () => BdApi.findModuleByProps('getGame', 'games'))
				},
				get 'Auth'() {
					return ___createMemoize___(this, 'Auth', () => BdApi.findModuleByProps('getId', 'isGuest'))
				},
				get 'TypingUsers'() {
					return ___createMemoize___(this, 'TypingUsers', () => BdApi.findModuleByProps('isTyping'))
				}
			},
			'@discord/actions': {
				get 'ProfileActions'() {
					return ___createMemoize___(this, 'ProfileActions', () => BdApi.findModuleByProps('fetchProfile'))
				},
				get 'GuildActions'() {
					return ___createMemoize___(this, 'GuildActions', () => BdApi.findModuleByProps('requestMembersById'))
				}
			},
			get '@discord/i18n'() {
				return ___createMemoize___(this, '@discord/i18n', () => BdApi.findModule(m => m.Messages?.CLOSE && typeof(m.getLocale) === 'function'))
			},
			get '@discord/constants'() {
				return ___createMemoize___(this, '@discord/constants', () => BdApi.findModuleByProps('API_HOST'))
			},
			get '@discord/contextmenu'() {
				return ___createMemoize___(this, '@discord/contextmenu', () => {
					const ctx = Object.assign({}, BdApi.findModuleByProps('openContextMenu'), BdApi.findModuleByProps('MenuItem'));
					ctx.Menu = ctx.default;
					return ctx;
				})
			},
			get '@discord/forms'() {
				return ___createMemoize___(this, '@discord/forms', () => BdApi.findModuleByProps('FormItem'))
			},
			get '@discord/scrollbars'() {
				return ___createMemoize___(this, '@discord/scrollbars', () => BdApi.findModuleByProps('ScrollerAuto'))
			},
			get '@discord/native'() {
				return ___createMemoize___(this, '@discord/native', () => BdApi.findModuleByProps('requireModule'))
			},
			get '@discord/flux'() {
				return ___createMemoize___(this, '@discord/flux', () => Object.assign({}, BdApi.findModuleByProps('useStateFromStores').default, BdApi.findModuleByProps('useStateFromStores')))
			},
			get '@discord/modal'() {
				return ___createMemoize___(this, '@discord/modal', () => Object.assign({}, BdApi.findModuleByProps('ModalRoot'), BdApi.findModuleByProps('openModal', 'closeAllModals')))
			},
			get '@discord/connections'() {
				return ___createMemoize___(this, '@discord/connections', () => BdApi.findModuleByProps('get', 'isSupported', 'map'))
			},
			get '@discord/sanitize'() {
				return ___createMemoize___(this, '@discord/sanitize', () => BdApi.findModuleByProps('stringify', 'parse', 'encode'))
			},
			get '@discord/icons'() {
				return ___createMemoize___(this, '@discord/icons', () => BdApi.findAllModules(m => m.displayName && ~m.toString().indexOf('currentColor')).reduce((icons, icon) => (icons[icon.displayName] = icon, icons), {}))
			},
			'@discord/classes': {
				get 'Timestamp'() {
					return ___createMemoize___(this, 'Timestamp', () => BdApi.findModuleByPrototypes('toDate', 'month'))
				},
				get 'Message'() {
					return ___createMemoize___(this, 'Message', () => BdApi.findModuleByPrototypes('getReaction', 'isSystemDM'))
				},
				get 'User'() {
					return ___createMemoize___(this, 'User', () => BdApi.findModuleByPrototypes('tag'))
				},
				get 'Channel'() {
					return ___createMemoize___(this, 'Channel', () => BdApi.findModuleByPrototypes('isOwner', 'isCategory'))
				}
			}
		};
		var __webpack_require__ = {};
		(() => {
			__webpack_require__.n = module => {
				var getter = module && module.__esModule ? () => module["default"] : () => module;
				__webpack_require__.d(getter, {
					a: getter
				});
				return getter;
			};
		})();
		(() => {
			__webpack_require__.d = (exports, definition) => {
				for (var key in definition)
					if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) Object.defineProperty(exports, key, {
						enumerable: true,
						get: definition[key]
					});
			};
		})();
		(() => {
			__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
		})();
		(() => {
			__webpack_require__.r = exports => {
				if ("undefined" !== typeof Symbol && Symbol.toStringTag) Object.defineProperty(exports, Symbol.toStringTag, {
					value: "Module"
				});
				Object.defineProperty(exports, "__esModule", {
					value: true
				});
			};
		})();
		var __webpack_exports__ = {};
		__webpack_require__.r(__webpack_exports__);
		__webpack_require__.d(__webpack_exports__, {
			default: () => OsSpoof
		});
		const external_PluginApi_namespaceObject = PluginApi;
		const external_BasePlugin_namespaceObject = BasePlugin;
		var external_BasePlugin_default = __webpack_require__.n(external_BasePlugin_namespaceObject);
		function forceUpdateApp() {
			let root = document.getElementById("app-mount")?._reactRootContainer?._internalRoot?.current;
			while (null != root && "App" !== root?.type?.displayName) {
				root?.stateNode?.forceUpdate?.();
				root = root.child;
			}
		}
		var storage = external_PluginApi_namespaceObject.Utilities.loadData("OsSpoof", "settings", {
			platform: "win32",
			websocket: "default"
		});
		function set(path, value) {
			storage[path] = value;
			external_PluginApi_namespaceObject.Utilities.saveData("OsSpoof", "settings", storage);
			return storage;
		}
		function get(path, defaultValue) {
			storage = external_PluginApi_namespaceObject.Utilities.loadData("OsSpoof", "settings");
			if (void 0 === storage[path]) return defaultValue;
			return storage[path];
		}
		let webSocketValid = false;
		let discordWebSocket;
		const Platform = external_PluginApi_namespaceObject.WebpackModules.getModule((m => m.platformName && m.platformVersion));
		function updateSpoofPlatform(spoofPlatform) {
			console.log("[OsSpoof] Setting UI spoof platform to " + spoofPlatform + "...");
			Platform.platformName = translatePlatform(spoofPlatform);
			Platform.platformVersion = versionForPlatform(spoofPlatform);
			Platform.platformFullVersion = fullVersionForPlatform(spoofPlatform);
			forceUpdateApp();
		}
		function getRealPlatform() {
			return codeFromPlatform(Platform.platformName);
		}
		function translatePlatform(platform) {
			switch (platform) {
				case "win32":
					return "Windows";
				case "darwin":
					return "Mac OS X";
				case "linux":
					return "Linux";
			}
		}
		function codeFromPlatform(platform) {
			switch (platform) {
				case "Windows":
					return "win32";
				case "Mac OS X":
				case "Mac OS":
					return "darwin";
				case "Linux":
					return "linux";
			}
		}
		function versionForPlatform(platform) {
			switch (platform) {
				case "win32":
					return "10";
				case "darwin":
					return "12";
				case "linux":
					return "6";
			}
		}
		function fullVersionForPlatform(platform) {
			switch (platform) {
				case "win32":
					return "10";
				case "darwin":
					return "12.0";
				case "linux":
					return "6.0";
			}
		}
		const constants = {
			FORMAT_VERSION: 131,
			NEW_FLOAT_EXT: 70,
			BIT_BINARY_EXT: 77,
			SMALL_INTEGER_EXT: 97,
			INTEGER_EXT: 98,
			FLOAT_EXT: 99,
			ATOM_EXT: 100,
			REFERENCE_EXT: 101,
			PORT_EXT: 102,
			PID_EXT: 103,
			SMALL_TUPLE_EXT: 104,
			LARGE_TUPLE_EXT: 105,
			NIL_EXT: 106,
			STRING_EXT: 107,
			LIST_EXT: 108,
			BINARY_EXT: 109,
			SMALL_BIG_EXT: 110,
			LARGE_BIG_EXT: 111,
			NEW_FUN_EXT: 112,
			EXPORT_EXT: 113,
			NEW_REFERENCE_EXT: 114,
			SMALL_ATOM_EXT: 115,
			MAP_EXT: 116,
			FUN_EXT: 117,
			COMPRESSED: 80
		};
		function _defineProperty(obj, key, value) {
			if (key in obj) Object.defineProperty(obj, key, {
				value,
				enumerable: true,
				configurable: true,
				writable: true
			});
			else obj[key] = value;
			return obj;
		}
		const {
			FORMAT_VERSION,
			NEW_FLOAT_EXT,
			SMALL_INTEGER_EXT,
			INTEGER_EXT,
			FLOAT_EXT,
			ATOM_EXT,
			SMALL_TUPLE_EXT,
			LARGE_TUPLE_EXT,
			NIL_EXT,
			STRING_EXT,
			LIST_EXT,
			BINARY_EXT,
			SMALL_BIG_EXT,
			LARGE_BIG_EXT,
			SMALL_ATOM_EXT,
			MAP_EXT
		} = constants;
		const processAtom = atom => {
			if (!atom) return;
			if ("nil" === atom || "null" === atom) return null;
			if ("true" === atom) return true;
			if ("false" === atom) return false;
			return atom;
		};
		class EtfDecoder {
			constructor(buffer, bigintToString) {
				_defineProperty(this, "buffer", void 0);
				_defineProperty(this, "view", void 0);
				_defineProperty(this, "offset", void 0);
				_defineProperty(this, "decoder", void 0);
				_defineProperty(this, "bigintToString", void 0);
				this.buffer = new Uint8Array(buffer);
				this.view = new DataView(this.buffer.buffer);
				this.offset = 0;
				this.decoder = new TextDecoder("utf8");
				this.bigintToString = bigintToString;
				const version = this.read8();
				if (version !== FORMAT_VERSION) throw new Error("Invalid version header");
			}
			read8() {
				const val = this.view.getUint8(this.offset);
				this.offset++;
				return val;
			}
			readi8() {
				const val = this.view.getInt8(this.offset);
				this.offset++;
				return val;
			}
			read16() {
				const val = this.view.getUint16(this.offset);
				this.offset += 2;
				return val;
			}
			read32() {
				const val = this.view.getUint32(this.offset);
				this.offset += 4;
				return val;
			}
			readi32() {
				const val = this.view.getInt32(this.offset);
				this.offset += 4;
				return val;
			}
			readDouble() {
				const val = this.view.getFloat64(this.offset);
				this.offset += 8;
				return val;
			}
			readString(length) {
				const sub = this.buffer.subarray(this.offset, this.offset + length);
				const str = this.decoder.decode(sub);
				this.offset += length;
				return str;
			}
			decodeArray(length) {
				const array = [];
				for (let i = 0; i < length; i++) array.push(this.unpack());
				return array;
			}
			decodeBigNumber(digits) {
				const sign = this.read8();
				let value = 0;
				let b = 1;
				for (let i = 0; i < digits; i++) {
					const digit = this.read8();
					value += digit * b;
					b <<= 8;
				}
				if (digits < 4) {
					if (0 === sign) return value;
					const isSignBitAvailable = 0 === (value & 1 << 31);
					if (isSignBitAvailable) return -value;
				}
				return 0 === sign ? value : -value;
			}
			decodeBigInt(digits) {
				const sign = this.read8();
				let value = 0n;
				let b = 1n;
				for (let i = 0; i < digits; i++) {
					const digit = BigInt(this.read8());
					value += digit * b;
					b <<= 8n;
				}
				const v = 0 === sign ? value : -value;
				if (this.bigintToString) return v.toString();
				return v;
			}
			unpack() {
				const type = this.read8();
				switch (type) {
					case SMALL_INTEGER_EXT:
						return this.readi8();
					case INTEGER_EXT:
						return this.readi32();
					case FLOAT_EXT:
						return Number.parseFloat(this.readString(31));
					case NEW_FLOAT_EXT:
						return this.readDouble();
					case ATOM_EXT:
						return processAtom(this.readString(this.read16()));
					case SMALL_ATOM_EXT:
						return processAtom(this.readString(this.read8()));
					case SMALL_TUPLE_EXT:
						return this.decodeArray(this.read8());
					case LARGE_TUPLE_EXT:
						return this.decodeArray(this.read32());
					case NIL_EXT:
						return [];
					case STRING_EXT: {
						const length = this.read16();
						const sub = this.buffer.subarray(this.offset, this.offset + length);
						this.offset += length;
						return [...sub];
					}
					case LIST_EXT: {
						const length = this.read32();
						const array = this.decodeArray(length);
						if (this.read8() !== NIL_EXT) throw new Error("Expected tail marker after list");
						return array;
					}
					case MAP_EXT: {
						const length = this.read32();
						const map = {};
						for (let i = 0; i < length; i++) map[this.unpack()] = this.unpack();
						return map;
					}
					case BINARY_EXT: {
						const length = this.read32();
						return this.readString(length);
					}
					case SMALL_BIG_EXT: {
						const digits = this.read8();
						return digits >= 3 ? this.decodeBigInt(digits) : this.decodeBigNumber(digits);
					}
					case LARGE_BIG_EXT: {
						const digits = this.read32();
						return this.decodeBigInt(digits);
					}
					default:
						throw new Error(`Unsupported etf type ${type}`);
				}
			}
		}
		function encoder_defineProperty(obj, key, value) {
			if (key in obj) Object.defineProperty(obj, key, {
				value,
				enumerable: true,
				configurable: true,
				writable: true
			});
			else obj[key] = value;
			return obj;
		}
		const {
			FORMAT_VERSION: encoder_FORMAT_VERSION,
			NEW_FLOAT_EXT: encoder_NEW_FLOAT_EXT,
			SMALL_INTEGER_EXT: encoder_SMALL_INTEGER_EXT,
			INTEGER_EXT: encoder_INTEGER_EXT,
			ATOM_EXT: encoder_ATOM_EXT,
			NIL_EXT: encoder_NIL_EXT,
			LIST_EXT: encoder_LIST_EXT,
			BINARY_EXT: encoder_BINARY_EXT,
			LARGE_BIG_EXT: encoder_LARGE_BIG_EXT,
			SMALL_ATOM_EXT: encoder_SMALL_ATOM_EXT,
			MAP_EXT: encoder_MAP_EXT
		} = constants;
		const BUFFER_CHUNK = 2048;
		class EtfEncoder {
			constructor() {
				encoder_defineProperty(this, "buffer", void 0);
				encoder_defineProperty(this, "view", void 0);
				encoder_defineProperty(this, "encoder", void 0);
				encoder_defineProperty(this, "offset", void 0);
				this.buffer = new Uint8Array(BUFFER_CHUNK);
				this.view = new DataView(this.buffer.buffer);
				this.encoder = new TextEncoder;
				this.buffer[0] = encoder_FORMAT_VERSION;
				this.offset = 1;
			}
			grow(length) {
				if (this.offset + length < this.buffer.length) return;
				const chunks = Math.ceil(length / BUFFER_CHUNK) * BUFFER_CHUNK;
				const old = this.buffer;
				this.buffer = new Uint8Array(old.length + chunks);
				this.buffer.set(old);
				this.view = new DataView(this.buffer.buffer);
			}
			write(array) {
				this.grow(array.length);
				this.buffer.set(array, this.offset);
				this.offset += array.length;
			}
			write8(value) {
				this.grow(1);
				this.view.setUint8(this.offset, value);
				this.offset++;
			}
			write16(value) {
				this.grow(2);
				this.view.setUint16(this.offset, value);
				this.offset += 2;
			}
			write32(value) {
				this.grow(4);
				this.view.setUint32(this.offset, value);
				this.offset += 4;
			}
			writeFloat(value) {
				this.grow(8);
				this.view.setFloat64(this.offset, value);
				this.offset += 8;
			}
			appendAtom(atom) {
				const a = this.encoder.encode(atom);
				if (a.length < 255) {
					this.write8(encoder_SMALL_ATOM_EXT);
					this.write8(a.length);
				} else {
					this.write8(encoder_ATOM_EXT);
					this.write16(a.length);
				}
				this.write(a);
			}
			pack(value) {
				if (null === value || void 0 === value) {
					this.appendAtom("nil");
					return;
				}
				if ("boolean" === typeof value) {
					this.appendAtom(value ? "true" : "false");
					return;
				}
				if ("number" === typeof value) {
					if ((0 | value) === value)
						if (value > -128 && value < 128) {
							this.write8(encoder_SMALL_INTEGER_EXT);
							this.write8(value);
						} else {
							this.write8(encoder_INTEGER_EXT);
							this.write32(value);
						}
					else {
						this.write8(encoder_NEW_FLOAT_EXT);
						this.writeFloat(value);
					}
					return;
				}
				if ("bigint" === typeof value) {
					this.write8(encoder_LARGE_BIG_EXT);
					const byteCountIndex = this.offset;
					this.offset += 4;
					this.write8(value < 0n ? 1 : 0);
					let ull = value < 0n ? -value : value;
					let byteCount = 0;
					while (ull > 0) {
						byteCount++;
						this.write8(Number(0xffn & ull));
						ull >>= 8n;
					}
					this.view.setUint32(byteCountIndex, byteCount);
					return;
				}
				if ("string" === typeof value) {
					this.write8(encoder_BINARY_EXT);
					const a = this.encoder.encode(value);
					this.write32(a.length);
					this.write(a);
					return;
				}
				if (Array.isArray(value)) {
					const {
						length
					} = value;
					if (0 === length) {
						this.write8(encoder_NIL_EXT);
						return;
					}
					this.write8(encoder_LIST_EXT);
					this.write32(length);
					value.forEach((v => {
						this.pack(v);
					}));
					this.write8(encoder_NIL_EXT);
					return;
				}
				if ("object" === typeof value) {
					this.write8(encoder_MAP_EXT);
					const properties = Object.keys(value);
					this.write32(properties.length);
					properties.forEach((p => {
						this.pack(p);
						this.pack(value[p]);
					}));
					return;
				}
				throw new Error("Could not pack value");
			}
		}
		let websocketInited = false;
		const genRanHex = size => [...Array(size)].map((() => Math.floor(16 * Math.random()).toString(16))).join("");
		class OsSpoof extends(external_BasePlugin_default()) {
			onStart() {
				console.log("[OsSpoof] Initializing...");
				const spoofPlatform = get("platform") || getRealPlatform();
				updateSpoofPlatform(spoofPlatform);
				external_PluginApi_namespaceObject.Patcher.before(WebSocket.prototype, "send", ((that, args) => {
					if (!(args[0] instanceof ArrayBuffer)) return;
					const data = new EtfDecoder(args[0]).unpack();
					let payloadModified = false;
					if (that.url.startsWith("wss://gateway") && -1 != that.url.indexOf("discord.gg"))
						if (!webSocketValid) {
							console.log("[OsSpoof]: Killing invalid WebSocket...");
							that.close(1e3);
							webSocketValid = true;
							websocketInited = false;
							return args;
						}
					if (6 === data.op && !websocketInited) {
						console.log("[OsSpoof] Blocking resume with dumb session ID...");
						data.d.session_id = genRanHex(32);
						payloadModified = true;
					}
					if (2 === data.op) {
						console.log("[OsSpoof] Identifying as the desired platform...");
						switch (get("websocket")) {
							case "win32":
								data.d.properties = {
									browser: "Discord Client",
									os: "Windows"
								};
								break;
							case "darwin":
								data.d.properties = {
									browser: "Discord Client",
									os: "Mac OS X"
								};
								break;
							case "linux":
								data.d.properties = {
									browser: "Discord Client",
									os: "Linux"
								};
								break;
							case "temple":
								data.d.properties = {
									browser: "Discord Client",
									os: "TempleOS"
								};
								break;
							case "haiku":
								data.d.properties = {
									browser: "Discord Client",
									os: "HaikuOS"
								};
								break;
							case "web":
								data.d.properties = {
									browser: "Discord Web",
									os: "Other"
								};
								break;
							case "android":
								data.d.properties = {
									browser: "Discord Android",
									os: "Android"
								};
								break;
							case "ios":
								data.d.properties = {
									browser: "Discord iOS",
									os: "iOS"
								};
								break;
							case "wp":
								data.d.properties = {
									browser: "Discord Android",
									os: "Windows Phone"
								};
								break;
						}
						payloadModified = true;
						websocketInited = true;
						discordWebSocket = that;
					}
					if (payloadModified) {
						console.log("[OsSpoof] Re-encoding modified payload...");
						const encoder = new EtfEncoder;
						encoder.pack(data);
						args[0] = encoder.buffer.slice(0, encoder.offset);
					}
					return args;
				}));
				forceUpdateApp();
			}
			onStop() {
				external_PluginApi_namespaceObject.Patcher.unpatchAll();
				forceUpdateApp();
			}
			getSettingsPanel() {
				const panel = this.buildSettingsPanel();
				panel.addListener(this.updateSettings.bind(this));
				return panel.getElement();
			}
			updateSettings(group, id) {
				set(group, id);
				if ("websocket" == group) webSocketValid = false;
				else if ("platform" == group) updateSpoofPlatform(id);
			}
		}
		module.exports.LibraryPluginHack = __webpack_exports__;
	})();
	const PluginExports = module.exports.LibraryPluginHack;
	return PluginExports?.__esModule ? PluginExports.default : PluginExports;
}
module.exports = window.hasOwnProperty("ZeresPluginLibrary") ?
	buildPlugin(window.ZeresPluginLibrary.buildPlugin(config)) :
	class {
		getName() {
			return config.info.name;
		}
		getAuthor() {
			return config.info.authors.map(a => a.name).join(", ");
		}
		getDescription() {
			return `${config.info.description}. __**ZeresPluginLibrary was not found! This plugin will not work!**__`;
		}
		getVersion() {
			return config.info.version;
		}
		load() {
			BdApi.showConfirmationModal(
				"Library plugin is needed",
				[`The library plugin needed for ${config.info.name} is missing. Please click Download to install it.`], {
					confirmText: "Download",
					cancelText: "Cancel",
					onConfirm: () => {
						require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
							if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
							await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
						});
					}
				}
			);
		}
		start() {}
		stop() {}
	};
/*@end@*/