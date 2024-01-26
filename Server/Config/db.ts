export const LocalURI = "mongodb://127.0.0.1/store";
export const RemoteURI = process.env.RemoteURI;

//localhost: connect to local database; remotehost: connect to cloud database
//export const HostName = (process.env.RemoteURI) ? "remotehost" : "localhost";
export const HostName = "remotehost";
export const Secret = "someSecret";