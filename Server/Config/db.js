"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Secret = exports.HostName = exports.RemoteURI = exports.LocalURI = void 0;
exports.LocalURI = "mongodb://127.0.0.1/store";
exports.RemoteURI = process.env.RemoteURI;
//localhost: connect to local database; remotehost: connect to cloud database
//export const HostName = (process.env.RemoteURI) ? "remotehost" : "localhost";
exports.HostName = "remotehost";
exports.Secret = "someSecret";
//# sourceMappingURL=db.js.map