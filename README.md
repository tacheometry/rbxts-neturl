<h1 align="center">🌐 NetUrl 🌐</h1>

roblox-ts typings for the NetUrl library, a URL and Query string parser, builder, and normalizer for Lua. Some useful links:

-   [NetUrl's repository](https://github.com/golgote/neturl/tree/master)
-   [This package's repository](https://github.com/tacheometry/rbxts-neturl)

## Installation

[![NPM](https://nodei.co/npm/@rbxts/neturl.png)](https://npmjs.org/package/@rbxts/neturl)

Run `npm i @rbxts/neturl` in your project directory.

## Usage

To import:

```ts
import NetUrl from "@rbxts/neturl";
```

Below are some usage examples adapted from the NetUrl repository:

### URL parser

```ts
const u = NetUrl.parse("http://www.example.com/test/?start=10");

print(u.scheme); // http
print(u.host); // www.example.com
print(u.path); // /test/
```

### Querystring parser

```ts
const query = NetUrl.parseQuery("a=123&b=456");

print(query); // a=123&b=456
print(query.get("a")); // "123"
print(query.get("b")); // "456"
```

```ts
// Note: replace the type if using brackets in the query string:
const query = NetUrl.parseQuery<string | string[]>("first=abc&a[]=123&a[]=false&b[]=str&c[]=3.5&a[]=last");

print(query); // a[1]=123&a[2]=false&a[3]=last&b[1]=str&c[1]=3.5&first=abc
print(query.get("a")); // [ "3.5" ]
```
