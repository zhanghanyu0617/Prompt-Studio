
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "4.1.4";globalThis.nextVersion = "14.2.35";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCookie = parseCookie;
    exports.parse = parseCookie;
    exports.stringifyCookie = stringifyCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    exports.parseSetCookie = parseSetCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var maxAgeRegExp = /^-?\d+$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parseCookie(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1)
          break;
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const key = valueSlice(str, index, eqIdx);
        if (obj[key] === void 0) {
          obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function stringifyCookie(cookie, options) {
      const enc = options?.encode || encodeURIComponent;
      const cookieStrings = [];
      for (const name of Object.keys(cookie)) {
        const val = cookie[name];
        if (val === void 0)
          continue;
        if (!cookieNameRegExp.test(name)) {
          throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
          throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
      }
      return cookieStrings.join("; ");
    }
    function stringifySetCookie(_name, _val, _opts) {
      const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
      const options = typeof _val === "object" ? _val : _opts;
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
      }
      const value = cookie.value ? enc(cookie.value) : "";
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
      }
      let str = cookie.name + "=" + value;
      if (cookie.maxAge !== void 0) {
        if (!Number.isInteger(cookie.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += "; Max-Age=" + cookie.maxAge;
      }
      if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
          throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += "; Domain=" + cookie.domain;
      }
      if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
          throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += "; Path=" + cookie.path;
      }
      if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += "; Expires=" + cookie.expires.toUTCString();
      }
      if (cookie.httpOnly) {
        str += "; HttpOnly";
      }
      if (cookie.secure) {
        str += "; Secure";
      }
      if (cookie.partitioned) {
        str += "; Partitioned";
      }
      if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
      }
      if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
      }
      return str;
    }
    function parseSetCookie(str, options) {
      const dec = options?.decode || decode;
      const len = str.length;
      const endIdx = endIndex(str, 0, len);
      const eqIdx = eqIndex(str, 0, endIdx);
      const setCookie = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
      };
      let index = endIdx + 1;
      while (index < len) {
        const endIdx2 = endIndex(str, index, len);
        const eqIdx2 = eqIndex(str, index, endIdx2);
        const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
        const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
        switch (attr.toLowerCase()) {
          case "httponly":
            setCookie.httpOnly = true;
            break;
          case "secure":
            setCookie.secure = true;
            break;
          case "partitioned":
            setCookie.partitioned = true;
            break;
          case "domain":
            setCookie.domain = val;
            break;
          case "path":
            setCookie.path = val;
            break;
          case "max-age":
            if (val && maxAgeRegExp.test(val))
              setCookie.maxAge = Number(val);
            break;
          case "expires":
            if (!val)
              break;
            const date = new Date(val);
            if (Number.isFinite(date.valueOf()))
              setCookie.expires = date;
            break;
          case "priority":
            if (!val)
              break;
            const priority = val.toLowerCase();
            if (priority === "low" || priority === "medium" || priority === "high") {
              setCookie.priority = priority;
            }
            break;
          case "samesite":
            if (!val)
              break;
            const sameSite = val.toLowerCase();
            if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
              setCookie.sameSite = sameSite;
            }
            break;
        }
        index = endIdx2 + 1;
      }
      return setCookie;
    }
    function endIndex(str, min, len) {
      const index = str.indexOf(";", min);
      return index === -1 ? len : index;
    }
    function eqIndex(str, min, max) {
      const index = str.indexOf("=", min);
      return index < max ? index : -1;
    }
    function valueSlice(str, min, max) {
      let start = min;
      let end = max;
      do {
        const code = str.charCodeAt(start);
        if (code !== 32 && code !== 9)
          break;
      } while (++start < end);
      while (end > start) {
        const code = str.charCodeAt(end - 1);
        if (code !== 32 && code !== 9)
          break;
        end--;
      }
      return str.slice(start, end);
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
var cachedOrigins, cachedPatterns, initialized, envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream as ReadableStream2 } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream2({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream2({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream2({
    start(controller) {
      controller.close();
    }
  });
}
var maybeSomethingBuffer;
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          const cur = responseHeaders[key];
          if (cur === void 0) {
            responseHeaders[key] = value;
          } else if (Array.isArray(cur)) {
            cur.push(value);
          } else {
            responseHeaders[key] = [cur, value];
          }
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// .next/server/edge-runtime-webpack.js
var require_edge_runtime_webpack = __commonJS({
  ".next/server/edge-runtime-webpack.js"() {
    "use strict";
    (() => {
      "use strict";
      var e = {}, r = {};
      function t(o) {
        var n = r[o];
        if (void 0 !== n) return n.exports;
        var i = r[o] = { exports: {} }, l = true;
        try {
          e[o](i, i.exports, t), l = false;
        } finally {
          l && delete r[o];
        }
        return i.exports;
      }
      t.m = e, t.amdO = {}, (() => {
        var e2 = [];
        t.O = (r2, o, n, i) => {
          if (o) {
            i = i || 0;
            for (var l = e2.length; l > 0 && e2[l - 1][2] > i; l--) e2[l] = e2[l - 1];
            e2[l] = [o, n, i];
            return;
          }
          for (var a = 1 / 0, l = 0; l < e2.length; l++) {
            for (var [o, n, i] = e2[l], f = true, u = 0; u < o.length; u++) a >= i && Object.keys(t.O).every((e3) => t.O[e3](o[u])) ? o.splice(u--, 1) : (f = false, i < a && (a = i));
            if (f) {
              e2.splice(l--, 1);
              var s = n();
              void 0 !== s && (r2 = s);
            }
          }
          return r2;
        };
      })(), t.d = (e2, r2) => {
        for (var o in r2) t.o(r2, o) && !t.o(e2, o) && Object.defineProperty(e2, o, { enumerable: true, get: r2[o] });
      }, t.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
          return this || Function("return this")();
        } catch (e2) {
          if ("object" == typeof window) return window;
        }
      }(), t.o = (e2, r2) => Object.prototype.hasOwnProperty.call(e2, r2), t.r = (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      }, (() => {
        var e2 = { 993: 0 };
        t.O.j = (r3) => 0 === e2[r3];
        var r2 = (r3, o2) => {
          var n, i, [l, a, f] = o2, u = 0;
          if (l.some((r4) => 0 !== e2[r4])) {
            for (n in a) t.o(a, n) && (t.m[n] = a[n]);
            if (f) var s = f(t);
          }
          for (r3 && r3(o2); u < l.length; u++) i = l[u], t.o(e2, i) && e2[i] && e2[i][0](), e2[i] = 0;
          return t.O(s);
        }, o = self.webpackChunk_N_E = self.webpackChunk_N_E || [];
        o.forEach(r2.bind(null, 0)), o.push = r2.bind(null, o.push.bind(o));
      })();
    })();
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// .next/server/src/middleware.js
var require_middleware = __commonJS({
  ".next/server/src/middleware.js"() {
    "use strict";
    (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[727], { 67: (e) => {
      "use strict";
      e.exports = (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports));
    }, 195: (e) => {
      "use strict";
      e.exports = (init_node_buffer(), __toCommonJS(node_buffer_exports));
    }, 728: (e, t, r) => {
      "use strict";
      let s;
      r.r(t), r.d(t, { default: () => eW });
      var i, n, a, o, l, u, c, h, d, p, f, g, m = {};
      async function b() {
        let e2 = "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && (await _ENTRIES.middleware_instrumentation).register;
        if (e2) try {
          await e2();
        } catch (e3) {
          throw e3.message = `An error occurred while loading instrumentation hook: ${e3.message}`, e3;
        }
      }
      r.r(m), r.d(m, { config: () => eq, middleware: () => eB });
      let y = null;
      function w() {
        return y || (y = b()), y;
      }
      function v(e2) {
        return `The edge runtime does not support Node.js '${e2}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== r.g.process && (process.env = r.g.process.env, r.g.process = process), Object.defineProperty(globalThis, "__import_unsupported", { value: function(e2) {
        let t2 = new Proxy(function() {
        }, { get(t3, r2) {
          if ("then" === r2) return {};
          throw Error(v(e2));
        }, construct() {
          throw Error(v(e2));
        }, apply(r2, s2, i2) {
          if ("function" == typeof i2[0]) return i2[0](t2);
          throw Error(v(e2));
        } });
        return new Proxy({}, { get: () => t2 });
      }, enumerable: false, configurable: false }), w();
      class _ extends Error {
        constructor({ page: e2 }) {
          super(`The middleware "${e2}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class S extends Error {
        constructor() {
          super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        }
      }
      class k extends Error {
        constructor() {
          super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        }
      }
      let T = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", api: "api", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", appMetadataRoute: "app-metadata-route", appRouteHandler: "app-route-handler" };
      function E(e2) {
        var t2, r2, s2, i2, n2, a2 = [], o2 = 0;
        function l2() {
          for (; o2 < e2.length && /\s/.test(e2.charAt(o2)); ) o2 += 1;
          return o2 < e2.length;
        }
        for (; o2 < e2.length; ) {
          for (t2 = o2, n2 = false; l2(); ) if ("," === (r2 = e2.charAt(o2))) {
            for (s2 = o2, o2 += 1, l2(), i2 = o2; o2 < e2.length && "=" !== (r2 = e2.charAt(o2)) && ";" !== r2 && "," !== r2; ) o2 += 1;
            o2 < e2.length && "=" === e2.charAt(o2) ? (n2 = true, o2 = i2, a2.push(e2.substring(t2, s2)), t2 = o2) : o2 = s2 + 1;
          } else o2 += 1;
          (!n2 || o2 >= e2.length) && a2.push(e2.substring(t2, e2.length));
        }
        return a2;
      }
      function O(e2) {
        let t2 = {}, r2 = [];
        if (e2) for (let [s2, i2] of e2.entries()) "set-cookie" === s2.toLowerCase() ? (r2.push(...E(i2)), t2[s2] = 1 === r2.length ? r2[0] : r2) : t2[s2] = i2;
        return t2;
      }
      function R(e2) {
        try {
          return String(new URL(String(e2)));
        } catch (t2) {
          throw Error(`URL is malformed "${String(e2)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t2 });
        }
      }
      ({ ...T, GROUP: { serverOnly: [T.reactServerComponents, T.actionBrowser, T.appMetadataRoute, T.appRouteHandler, T.instrument], clientOnly: [T.serverSideRendering, T.appPagesBrowser], nonClientServerTarget: [T.middleware, T.api], app: [T.reactServerComponents, T.actionBrowser, T.appMetadataRoute, T.appRouteHandler, T.serverSideRendering, T.appPagesBrowser, T.shared, T.instrument] } });
      let C = Symbol("response"), A = Symbol("passThrough"), P = Symbol("waitUntil");
      class x {
        constructor(e2) {
          this[P] = [], this[A] = false;
        }
        respondWith(e2) {
          this[C] || (this[C] = Promise.resolve(e2));
        }
        passThroughOnException() {
          this[A] = true;
        }
        waitUntil(e2) {
          this[P].push(e2);
        }
      }
      class I extends x {
        constructor(e2) {
          super(e2.request), this.sourcePage = e2.page;
        }
        get request() {
          throw new _({ page: this.sourcePage });
        }
        respondWith() {
          throw new _({ page: this.sourcePage });
        }
      }
      function j(e2) {
        return e2.replace(/\/$/, "") || "/";
      }
      function N(e2) {
        let t2 = e2.indexOf("#"), r2 = e2.indexOf("?"), s2 = r2 > -1 && (t2 < 0 || r2 < t2);
        return s2 || t2 > -1 ? { pathname: e2.substring(0, s2 ? r2 : t2), query: s2 ? e2.substring(r2, t2 > -1 ? t2 : void 0) : "", hash: t2 > -1 ? e2.slice(t2) : "" } : { pathname: e2, query: "", hash: "" };
      }
      function L(e2, t2) {
        if (!e2.startsWith("/") || !t2) return e2;
        let { pathname: r2, query: s2, hash: i2 } = N(e2);
        return "" + t2 + r2 + s2 + i2;
      }
      function $(e2, t2) {
        if (!e2.startsWith("/") || !t2) return e2;
        let { pathname: r2, query: s2, hash: i2 } = N(e2);
        return "" + r2 + t2 + s2 + i2;
      }
      function U(e2, t2) {
        if ("string" != typeof e2) return false;
        let { pathname: r2 } = N(e2);
        return r2 === t2 || r2.startsWith(t2 + "/");
      }
      function D(e2, t2) {
        let r2;
        let s2 = e2.split("/");
        return (t2 || []).some((t3) => !!s2[1] && s2[1].toLowerCase() === t3.toLowerCase() && (r2 = t3, s2.splice(1, 1), e2 = s2.join("/") || "/", true)), { pathname: e2, detectedLocale: r2 };
      }
      let M = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
      function B(e2, t2) {
        return new URL(String(e2).replace(M, "localhost"), t2 && String(t2).replace(M, "localhost"));
      }
      let q = Symbol("NextURLInternal");
      class F {
        constructor(e2, t2, r2) {
          let s2, i2;
          "object" == typeof t2 && "pathname" in t2 || "string" == typeof t2 ? (s2 = t2, i2 = r2 || {}) : i2 = r2 || t2 || {}, this[q] = { url: B(e2, s2 ?? i2.base), options: i2, basePath: "" }, this.analyze();
        }
        analyze() {
          var e2, t2, r2, s2, i2;
          let n2 = function(e3, t3) {
            var r3, s3;
            let { basePath: i3, i18n: n3, trailingSlash: a3 } = null != (r3 = t3.nextConfig) ? r3 : {}, o3 = { pathname: e3, trailingSlash: "/" !== e3 ? e3.endsWith("/") : a3 };
            i3 && U(o3.pathname, i3) && (o3.pathname = function(e4, t4) {
              if (!U(e4, t4)) return e4;
              let r4 = e4.slice(t4.length);
              return r4.startsWith("/") ? r4 : "/" + r4;
            }(o3.pathname, i3), o3.basePath = i3);
            let l2 = o3.pathname;
            if (o3.pathname.startsWith("/_next/data/") && o3.pathname.endsWith(".json")) {
              let e4 = o3.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/"), r4 = e4[0];
              o3.buildId = r4, l2 = "index" !== e4[1] ? "/" + e4.slice(1).join("/") : "/", true === t3.parseData && (o3.pathname = l2);
            }
            if (n3) {
              let e4 = t3.i18nProvider ? t3.i18nProvider.analyze(o3.pathname) : D(o3.pathname, n3.locales);
              o3.locale = e4.detectedLocale, o3.pathname = null != (s3 = e4.pathname) ? s3 : o3.pathname, !e4.detectedLocale && o3.buildId && (e4 = t3.i18nProvider ? t3.i18nProvider.analyze(l2) : D(l2, n3.locales)).detectedLocale && (o3.locale = e4.detectedLocale);
            }
            return o3;
          }(this[q].url.pathname, { nextConfig: this[q].options.nextConfig, parseData: true, i18nProvider: this[q].options.i18nProvider }), a2 = function(e3, t3) {
            let r3;
            if ((null == t3 ? void 0 : t3.host) && !Array.isArray(t3.host)) r3 = t3.host.toString().split(":", 1)[0];
            else {
              if (!e3.hostname) return;
              r3 = e3.hostname;
            }
            return r3.toLowerCase();
          }(this[q].url, this[q].options.headers);
          this[q].domainLocale = this[q].options.i18nProvider ? this[q].options.i18nProvider.detectDomainLocale(a2) : function(e3, t3, r3) {
            if (e3) for (let n3 of (r3 && (r3 = r3.toLowerCase()), e3)) {
              var s3, i3;
              if (t3 === (null == (s3 = n3.domain) ? void 0 : s3.split(":", 1)[0].toLowerCase()) || r3 === n3.defaultLocale.toLowerCase() || (null == (i3 = n3.locales) ? void 0 : i3.some((e4) => e4.toLowerCase() === r3))) return n3;
            }
          }(null == (t2 = this[q].options.nextConfig) ? void 0 : null == (e2 = t2.i18n) ? void 0 : e2.domains, a2);
          let o2 = (null == (r2 = this[q].domainLocale) ? void 0 : r2.defaultLocale) || (null == (i2 = this[q].options.nextConfig) ? void 0 : null == (s2 = i2.i18n) ? void 0 : s2.defaultLocale);
          this[q].url.pathname = n2.pathname, this[q].defaultLocale = o2, this[q].basePath = n2.basePath ?? "", this[q].buildId = n2.buildId, this[q].locale = n2.locale ?? o2, this[q].trailingSlash = n2.trailingSlash;
        }
        formatPathname() {
          var e2;
          let t2;
          return t2 = function(e3, t3, r2, s2) {
            if (!t3 || t3 === r2) return e3;
            let i2 = e3.toLowerCase();
            return !s2 && (U(i2, "/api") || U(i2, "/" + t3.toLowerCase())) ? e3 : L(e3, "/" + t3);
          }((e2 = { basePath: this[q].basePath, buildId: this[q].buildId, defaultLocale: this[q].options.forceLocale ? void 0 : this[q].defaultLocale, locale: this[q].locale, pathname: this[q].url.pathname, trailingSlash: this[q].trailingSlash }).pathname, e2.locale, e2.buildId ? void 0 : e2.defaultLocale, e2.ignorePrefix), (e2.buildId || !e2.trailingSlash) && (t2 = j(t2)), e2.buildId && (t2 = $(L(t2, "/_next/data/" + e2.buildId), "/" === e2.pathname ? "index.json" : ".json")), t2 = L(t2, e2.basePath), !e2.buildId && e2.trailingSlash ? t2.endsWith("/") ? t2 : $(t2, "/") : j(t2);
        }
        formatSearch() {
          return this[q].url.search;
        }
        get buildId() {
          return this[q].buildId;
        }
        set buildId(e2) {
          this[q].buildId = e2;
        }
        get locale() {
          return this[q].locale ?? "";
        }
        set locale(e2) {
          var t2, r2;
          if (!this[q].locale || !(null == (r2 = this[q].options.nextConfig) ? void 0 : null == (t2 = r2.i18n) ? void 0 : t2.locales.includes(e2))) throw TypeError(`The NextURL configuration includes no locale "${e2}"`);
          this[q].locale = e2;
        }
        get defaultLocale() {
          return this[q].defaultLocale;
        }
        get domainLocale() {
          return this[q].domainLocale;
        }
        get searchParams() {
          return this[q].url.searchParams;
        }
        get host() {
          return this[q].url.host;
        }
        set host(e2) {
          this[q].url.host = e2;
        }
        get hostname() {
          return this[q].url.hostname;
        }
        set hostname(e2) {
          this[q].url.hostname = e2;
        }
        get port() {
          return this[q].url.port;
        }
        set port(e2) {
          this[q].url.port = e2;
        }
        get protocol() {
          return this[q].url.protocol;
        }
        set protocol(e2) {
          this[q].url.protocol = e2;
        }
        get href() {
          let e2 = this.formatPathname(), t2 = this.formatSearch();
          return `${this.protocol}//${this.host}${e2}${t2}${this.hash}`;
        }
        set href(e2) {
          this[q].url = B(e2), this.analyze();
        }
        get origin() {
          return this[q].url.origin;
        }
        get pathname() {
          return this[q].url.pathname;
        }
        set pathname(e2) {
          this[q].url.pathname = e2;
        }
        get hash() {
          return this[q].url.hash;
        }
        set hash(e2) {
          this[q].url.hash = e2;
        }
        get search() {
          return this[q].url.search;
        }
        set search(e2) {
          this[q].url.search = e2;
        }
        get password() {
          return this[q].url.password;
        }
        set password(e2) {
          this[q].url.password = e2;
        }
        get username() {
          return this[q].url.username;
        }
        set username(e2) {
          this[q].url.username = e2;
        }
        get basePath() {
          return this[q].basePath;
        }
        set basePath(e2) {
          this[q].basePath = e2.startsWith("/") ? e2 : `/${e2}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new F(String(this), this[q].options);
        }
      }
      var H = r(945);
      let V = Symbol("internal request");
      class W extends Request {
        constructor(e2, t2 = {}) {
          let r2 = "string" != typeof e2 && "url" in e2 ? e2.url : String(e2);
          R(r2), e2 instanceof Request ? super(e2, t2) : super(r2, t2);
          let s2 = new F(r2, { headers: O(this.headers), nextConfig: t2.nextConfig });
          this[V] = { cookies: new H.RequestCookies(this.headers), geo: t2.geo || {}, ip: t2.ip, nextUrl: s2, url: s2.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, geo: this.geo, ip: this.ip, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[V].cookies;
        }
        get geo() {
          return this[V].geo;
        }
        get ip() {
          return this[V].ip;
        }
        get nextUrl() {
          return this[V].nextUrl;
        }
        get page() {
          throw new S();
        }
        get ua() {
          throw new k();
        }
        get url() {
          return this[V].url;
        }
      }
      class z {
        static get(e2, t2, r2) {
          let s2 = Reflect.get(e2, t2, r2);
          return "function" == typeof s2 ? s2.bind(e2) : s2;
        }
        static set(e2, t2, r2, s2) {
          return Reflect.set(e2, t2, r2, s2);
        }
        static has(e2, t2) {
          return Reflect.has(e2, t2);
        }
        static deleteProperty(e2, t2) {
          return Reflect.deleteProperty(e2, t2);
        }
      }
      let J = Symbol("internal response"), G = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function K(e2, t2) {
        var r2;
        if (null == e2 ? void 0 : null == (r2 = e2.request) ? void 0 : r2.headers) {
          if (!(e2.request.headers instanceof Headers)) throw Error("request.headers must be an instance of Headers");
          let r3 = [];
          for (let [s2, i2] of e2.request.headers) t2.set("x-middleware-request-" + s2, i2), r3.push(s2);
          t2.set("x-middleware-override-headers", r3.join(","));
        }
      }
      class X extends Response {
        constructor(e2, t2 = {}) {
          super(e2, t2);
          let r2 = this.headers, s2 = new Proxy(new H.ResponseCookies(r2), { get(e3, s3, i2) {
            switch (s3) {
              case "delete":
              case "set":
                return (...i3) => {
                  let n2 = Reflect.apply(e3[s3], e3, i3), a2 = new Headers(r2);
                  return n2 instanceof H.ResponseCookies && r2.set("x-middleware-set-cookie", n2.getAll().map((e4) => (0, H.stringifyCookie)(e4)).join(",")), K(t2, a2), n2;
                };
              default:
                return z.get(e3, s3, i2);
            }
          } });
          this[J] = { cookies: s2, url: t2.url ? new F(t2.url, { headers: O(r2), nextConfig: t2.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[J].cookies;
        }
        static json(e2, t2) {
          let r2 = Response.json(e2, t2);
          return new X(r2.body, r2);
        }
        static redirect(e2, t2) {
          let r2 = "number" == typeof t2 ? t2 : (null == t2 ? void 0 : t2.status) ?? 307;
          if (!G.has(r2)) throw RangeError('Failed to execute "redirect" on "response": Invalid status code');
          let s2 = "object" == typeof t2 ? t2 : {}, i2 = new Headers(null == s2 ? void 0 : s2.headers);
          return i2.set("Location", R(e2)), new X(null, { ...s2, headers: i2, status: r2 });
        }
        static rewrite(e2, t2) {
          let r2 = new Headers(null == t2 ? void 0 : t2.headers);
          return r2.set("x-middleware-rewrite", R(e2)), K(t2, r2), new X(null, { ...t2, headers: r2 });
        }
        static next(e2) {
          let t2 = new Headers(null == e2 ? void 0 : e2.headers);
          return t2.set("x-middleware-next", "1"), K(e2, t2), new X(null, { ...e2, headers: t2 });
        }
      }
      function Y(e2, t2) {
        let r2 = "string" == typeof t2 ? new URL(t2) : t2, s2 = new URL(e2, t2), i2 = r2.protocol + "//" + r2.host;
        return s2.protocol + "//" + s2.host === i2 ? s2.toString().replace(i2, "") : s2.toString();
      }
      let Z = [["RSC"], ["Next-Router-State-Tree"], ["Next-Router-Prefetch"]], Q = ["__nextFallback", "__nextLocale", "__nextInferredLocaleFromDefault", "__nextDefaultLocale", "__nextIsNotFound", "_rsc"], ee = ["__nextDataReq"];
      class et extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new et();
        }
      }
      class er extends Headers {
        constructor(e2) {
          super(), this.headers = new Proxy(e2, { get(t2, r2, s2) {
            if ("symbol" == typeof r2) return z.get(t2, r2, s2);
            let i2 = r2.toLowerCase(), n2 = Object.keys(e2).find((e3) => e3.toLowerCase() === i2);
            if (void 0 !== n2) return z.get(t2, n2, s2);
          }, set(t2, r2, s2, i2) {
            if ("symbol" == typeof r2) return z.set(t2, r2, s2, i2);
            let n2 = r2.toLowerCase(), a2 = Object.keys(e2).find((e3) => e3.toLowerCase() === n2);
            return z.set(t2, a2 ?? r2, s2, i2);
          }, has(t2, r2) {
            if ("symbol" == typeof r2) return z.has(t2, r2);
            let s2 = r2.toLowerCase(), i2 = Object.keys(e2).find((e3) => e3.toLowerCase() === s2);
            return void 0 !== i2 && z.has(t2, i2);
          }, deleteProperty(t2, r2) {
            if ("symbol" == typeof r2) return z.deleteProperty(t2, r2);
            let s2 = r2.toLowerCase(), i2 = Object.keys(e2).find((e3) => e3.toLowerCase() === s2);
            return void 0 === i2 || z.deleteProperty(t2, i2);
          } });
        }
        static seal(e2) {
          return new Proxy(e2, { get(e3, t2, r2) {
            switch (t2) {
              case "append":
              case "delete":
              case "set":
                return et.callable;
              default:
                return z.get(e3, t2, r2);
            }
          } });
        }
        merge(e2) {
          return Array.isArray(e2) ? e2.join(", ") : e2;
        }
        static from(e2) {
          return e2 instanceof Headers ? e2 : new er(e2);
        }
        append(e2, t2) {
          let r2 = this.headers[e2];
          "string" == typeof r2 ? this.headers[e2] = [r2, t2] : Array.isArray(r2) ? r2.push(t2) : this.headers[e2] = t2;
        }
        delete(e2) {
          delete this.headers[e2];
        }
        get(e2) {
          let t2 = this.headers[e2];
          return void 0 !== t2 ? this.merge(t2) : null;
        }
        has(e2) {
          return void 0 !== this.headers[e2];
        }
        set(e2, t2) {
          this.headers[e2] = t2;
        }
        forEach(e2, t2) {
          for (let [r2, s2] of this.entries()) e2.call(t2, s2, r2, this);
        }
        *entries() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = e2.toLowerCase(), r2 = this.get(t2);
            yield [t2, r2];
          }
        }
        *keys() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = e2.toLowerCase();
            yield t2;
          }
        }
        *values() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = this.get(e2);
            yield t2;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      let es = Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
      class ei {
        disable() {
          throw es;
        }
        getStore() {
        }
        run() {
          throw es;
        }
        exit() {
          throw es;
        }
        enterWith() {
          throw es;
        }
      }
      let en = globalThis.AsyncLocalStorage;
      function ea() {
        return en ? new en() : new ei();
      }
      let eo = ea();
      class el extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options");
        }
        static callable() {
          throw new el();
        }
      }
      class eu {
        static seal(e2) {
          return new Proxy(e2, { get(e3, t2, r2) {
            switch (t2) {
              case "clear":
              case "delete":
              case "set":
                return el.callable;
              default:
                return z.get(e3, t2, r2);
            }
          } });
        }
      }
      let ec = Symbol.for("next.mutated.cookies");
      class eh {
        static wrap(e2, t2) {
          let r2 = new H.ResponseCookies(new Headers());
          for (let t3 of e2.getAll()) r2.set(t3);
          let s2 = [], i2 = /* @__PURE__ */ new Set(), n2 = () => {
            let e3 = eo.getStore();
            if (e3 && (e3.pathWasRevalidated = true), s2 = r2.getAll().filter((e4) => i2.has(e4.name)), t2) {
              let e4 = [];
              for (let t3 of s2) {
                let r3 = new H.ResponseCookies(new Headers());
                r3.set(t3), e4.push(r3.toString());
              }
              t2(e4);
            }
          };
          return new Proxy(r2, { get(e3, t3, r3) {
            switch (t3) {
              case ec:
                return s2;
              case "delete":
                return function(...t4) {
                  i2.add("string" == typeof t4[0] ? t4[0] : t4[0].name);
                  try {
                    e3.delete(...t4);
                  } finally {
                    n2();
                  }
                };
              case "set":
                return function(...t4) {
                  i2.add("string" == typeof t4[0] ? t4[0] : t4[0].name);
                  try {
                    return e3.set(...t4);
                  } finally {
                    n2();
                  }
                };
              default:
                return z.get(e3, t3, r3);
            }
          } });
        }
      }
      !function(e2) {
        e2.handleRequest = "BaseServer.handleRequest", e2.run = "BaseServer.run", e2.pipe = "BaseServer.pipe", e2.getStaticHTML = "BaseServer.getStaticHTML", e2.render = "BaseServer.render", e2.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", e2.renderToResponse = "BaseServer.renderToResponse", e2.renderToHTML = "BaseServer.renderToHTML", e2.renderError = "BaseServer.renderError", e2.renderErrorToResponse = "BaseServer.renderErrorToResponse", e2.renderErrorToHTML = "BaseServer.renderErrorToHTML", e2.render404 = "BaseServer.render404";
      }(i || (i = {})), function(e2) {
        e2.loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", e2.loadComponents = "LoadComponents.loadComponents";
      }(n || (n = {})), function(e2) {
        e2.getRequestHandler = "NextServer.getRequestHandler", e2.getServer = "NextServer.getServer", e2.getServerRequestHandler = "NextServer.getServerRequestHandler", e2.createServer = "createServer.createServer";
      }(a || (a = {})), function(e2) {
        e2.compression = "NextNodeServer.compression", e2.getBuildId = "NextNodeServer.getBuildId", e2.createComponentTree = "NextNodeServer.createComponentTree", e2.clientComponentLoading = "NextNodeServer.clientComponentLoading", e2.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", e2.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", e2.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", e2.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", e2.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", e2.sendRenderResult = "NextNodeServer.sendRenderResult", e2.proxyRequest = "NextNodeServer.proxyRequest", e2.runApi = "NextNodeServer.runApi", e2.render = "NextNodeServer.render", e2.renderHTML = "NextNodeServer.renderHTML", e2.imageOptimizer = "NextNodeServer.imageOptimizer", e2.getPagePath = "NextNodeServer.getPagePath", e2.getRoutesManifest = "NextNodeServer.getRoutesManifest", e2.findPageComponents = "NextNodeServer.findPageComponents", e2.getFontManifest = "NextNodeServer.getFontManifest", e2.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", e2.getRequestHandler = "NextNodeServer.getRequestHandler", e2.renderToHTML = "NextNodeServer.renderToHTML", e2.renderError = "NextNodeServer.renderError", e2.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", e2.render404 = "NextNodeServer.render404", e2.startResponse = "NextNodeServer.startResponse", e2.route = "route", e2.onProxyReq = "onProxyReq", e2.apiResolver = "apiResolver", e2.internalFetch = "internalFetch";
      }(o || (o = {})), (l || (l = {})).startServer = "startServer.startServer", function(e2) {
        e2.getServerSideProps = "Render.getServerSideProps", e2.getStaticProps = "Render.getStaticProps", e2.renderToString = "Render.renderToString", e2.renderDocument = "Render.renderDocument", e2.createBodyResult = "Render.createBodyResult";
      }(u || (u = {})), function(e2) {
        e2.renderToString = "AppRender.renderToString", e2.renderToReadableStream = "AppRender.renderToReadableStream", e2.getBodyResult = "AppRender.getBodyResult", e2.fetch = "AppRender.fetch";
      }(c || (c = {})), (h || (h = {})).executeRoute = "Router.executeRoute", (d || (d = {})).runHandler = "Node.runHandler", (p || (p = {})).runHandler = "AppRouteRouteHandlers.runHandler", function(e2) {
        e2.generateMetadata = "ResolveMetadata.generateMetadata", e2.generateViewport = "ResolveMetadata.generateViewport";
      }(f || (f = {})), (g || (g = {})).execute = "Middleware.execute";
      let ed = ["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"], ep = ["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"], { context: ef, propagation: eg, trace: em, SpanStatusCode: eb, SpanKind: ey, ROOT_CONTEXT: ew } = s = r(439), ev = (e2) => null !== e2 && "object" == typeof e2 && "function" == typeof e2.then, e_ = (e2, t2) => {
        (null == t2 ? void 0 : t2.bubble) === true ? e2.setAttribute("next.bubble", true) : (t2 && e2.recordException(t2), e2.setStatus({ code: eb.ERROR, message: null == t2 ? void 0 : t2.message })), e2.end();
      }, eS = /* @__PURE__ */ new Map(), ek = s.createContextKey("next.rootSpanId"), eT = 0, eE = () => eT++;
      class eO {
        getTracerInstance() {
          return em.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return ef;
        }
        getActiveScopeSpan() {
          return em.getSpan(null == ef ? void 0 : ef.active());
        }
        withPropagatedContext(e2, t2, r2) {
          let s2 = ef.active();
          if (em.getSpanContext(s2)) return t2();
          let i2 = eg.extract(s2, e2, r2);
          return ef.with(i2, t2);
        }
        trace(...e2) {
          var t2;
          let [r2, s2, i2] = e2, { fn: n2, options: a2 } = "function" == typeof s2 ? { fn: s2, options: {} } : { fn: i2, options: { ...s2 } }, o2 = a2.spanName ?? r2;
          if (!ed.includes(r2) && "1" !== process.env.NEXT_OTEL_VERBOSE || a2.hideSpan) return n2();
          let l2 = this.getSpanContext((null == a2 ? void 0 : a2.parentSpan) ?? this.getActiveScopeSpan()), u2 = false;
          l2 ? (null == (t2 = em.getSpanContext(l2)) ? void 0 : t2.isRemote) && (u2 = true) : (l2 = (null == ef ? void 0 : ef.active()) ?? ew, u2 = true);
          let c2 = eE();
          return a2.attributes = { "next.span_name": o2, "next.span_type": r2, ...a2.attributes }, ef.with(l2.setValue(ek, c2), () => this.getTracerInstance().startActiveSpan(o2, a2, (e3) => {
            let t3 = "performance" in globalThis ? globalThis.performance.now() : void 0, s3 = () => {
              eS.delete(c2), t3 && process.env.NEXT_OTEL_PERFORMANCE_PREFIX && ep.includes(r2 || "") && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(r2.split(".").pop() || "").replace(/[A-Z]/g, (e4) => "-" + e4.toLowerCase())}`, { start: t3, end: performance.now() });
            };
            u2 && eS.set(c2, new Map(Object.entries(a2.attributes ?? {})));
            try {
              if (n2.length > 1) return n2(e3, (t5) => e_(e3, t5));
              let t4 = n2(e3);
              if (ev(t4)) return t4.then((t5) => (e3.end(), t5)).catch((t5) => {
                throw e_(e3, t5), t5;
              }).finally(s3);
              return e3.end(), s3(), t4;
            } catch (t4) {
              throw e_(e3, t4), s3(), t4;
            }
          }));
        }
        wrap(...e2) {
          let t2 = this, [r2, s2, i2] = 3 === e2.length ? e2 : [e2[0], {}, e2[1]];
          return ed.includes(r2) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e3 = s2;
            "function" == typeof e3 && "function" == typeof i2 && (e3 = e3.apply(this, arguments));
            let n2 = arguments.length - 1, a2 = arguments[n2];
            if ("function" != typeof a2) return t2.trace(r2, e3, () => i2.apply(this, arguments));
            {
              let s3 = t2.getContext().bind(ef.active(), a2);
              return t2.trace(r2, e3, (e4, t3) => (arguments[n2] = function(e5) {
                return null == t3 || t3(e5), s3.apply(this, arguments);
              }, i2.apply(this, arguments)));
            }
          } : i2;
        }
        startSpan(...e2) {
          let [t2, r2] = e2, s2 = this.getSpanContext((null == r2 ? void 0 : r2.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t2, r2, s2);
        }
        getSpanContext(e2) {
          return e2 ? em.setSpan(ef.active(), e2) : void 0;
        }
        getRootSpanAttributes() {
          let e2 = ef.active().getValue(ek);
          return eS.get(e2);
        }
      }
      let eR = (() => {
        let e2 = new eO();
        return () => e2;
      })(), eC = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(eC);
      class eA {
        constructor(e2, t2, r2, s2) {
          var i2;
          let n2 = e2 && function(e3, t3) {
            let r3 = er.from(e3.headers);
            return { isOnDemandRevalidate: r3.get("x-prerender-revalidate") === t3.previewModeId, revalidateOnlyGenerated: r3.has("x-prerender-revalidate-if-generated") };
          }(t2, e2).isOnDemandRevalidate, a2 = null == (i2 = r2.get(eC)) ? void 0 : i2.value;
          this.isEnabled = !!(!n2 && a2 && e2 && a2 === e2.previewModeId), this._previewModeId = null == e2 ? void 0 : e2.previewModeId, this._mutableCookies = s2;
        }
        enable() {
          if (!this._previewModeId) throw Error("Invariant: previewProps missing previewModeId this should never happen");
          this._mutableCookies.set({ name: eC, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" });
        }
        disable() {
          this._mutableCookies.set({ name: eC, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) });
        }
      }
      function eP(e2, t2) {
        if ("x-middleware-set-cookie" in e2.headers && "string" == typeof e2.headers["x-middleware-set-cookie"]) {
          let r2 = e2.headers["x-middleware-set-cookie"], s2 = new Headers();
          for (let e3 of E(r2)) s2.append("set-cookie", e3);
          for (let e3 of new H.ResponseCookies(s2).getAll()) t2.set(e3);
        }
      }
      let ex = { wrap(e2, { req: t2, res: r2, renderOpts: s2 }, i2) {
        let n2;
        function a2(e3) {
          r2 && r2.setHeader("Set-Cookie", e3);
        }
        s2 && "previewProps" in s2 && (n2 = s2.previewProps);
        let o2 = {}, l2 = { get headers() {
          return o2.headers || (o2.headers = function(e3) {
            let t3 = er.from(e3);
            for (let e4 of Z) t3.delete(e4.toString().toLowerCase());
            return er.seal(t3);
          }(t2.headers)), o2.headers;
        }, get cookies() {
          if (!o2.cookies) {
            let e3 = new H.RequestCookies(er.from(t2.headers));
            eP(t2, e3), o2.cookies = eu.seal(e3);
          }
          return o2.cookies;
        }, get mutableCookies() {
          if (!o2.mutableCookies) {
            let e3 = function(e4, t3) {
              let r3 = new H.RequestCookies(er.from(e4));
              return eh.wrap(r3, t3);
            }(t2.headers, (null == s2 ? void 0 : s2.onUpdateCookies) || (r2 ? a2 : void 0));
            eP(t2, e3), o2.mutableCookies = e3;
          }
          return o2.mutableCookies;
        }, get draftMode() {
          return o2.draftMode || (o2.draftMode = new eA(n2, t2, this.cookies, this.mutableCookies)), o2.draftMode;
        }, reactLoadableManifest: (null == s2 ? void 0 : s2.reactLoadableManifest) || {}, assetPrefix: (null == s2 ? void 0 : s2.assetPrefix) || "" };
        return e2.run(l2, i2, l2);
      } }, eI = ea();
      function ej() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID, previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      class eN extends W {
        constructor(e2) {
          super(e2.input, e2.init), this.sourcePage = e2.page;
        }
        get request() {
          throw new _({ page: this.sourcePage });
        }
        respondWith() {
          throw new _({ page: this.sourcePage });
        }
        waitUntil() {
          throw new _({ page: this.sourcePage });
        }
      }
      let eL = { keys: (e2) => Array.from(e2.keys()), get: (e2, t2) => e2.get(t2) ?? void 0 }, e$ = (e2, t2) => eR().withPropagatedContext(e2.headers, t2, eL), eU = false;
      async function eD(e2) {
        let t2, s2;
        !function() {
          if (!eU && (eU = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: e3, wrapRequestHandler: t3 } = r(177);
            e3(), e$ = t3(e$);
          }
        }(), await w();
        let i2 = void 0 !== self.__BUILD_MANIFEST;
        e2.request.url = e2.request.url.replace(/\.rsc($|\?)/, "$1");
        let n2 = new F(e2.request.url, { headers: e2.request.headers, nextConfig: e2.request.nextConfig });
        for (let e3 of [...n2.searchParams.keys()]) {
          let t3 = n2.searchParams.getAll(e3);
          !function(e4, t4) {
            for (let r2 of ["nxtP", "nxtI"]) e4 !== r2 && e4.startsWith(r2) && t4(e4.substring(r2.length));
          }(e3, (r2) => {
            for (let e4 of (n2.searchParams.delete(r2), t3)) n2.searchParams.append(r2, e4);
            n2.searchParams.delete(e3);
          });
        }
        let a2 = n2.buildId;
        n2.buildId = "";
        let o2 = e2.request.headers["x-nextjs-data"];
        o2 && "/index" === n2.pathname && (n2.pathname = "/");
        let l2 = function(e3) {
          let t3 = new Headers();
          for (let [r2, s3] of Object.entries(e3)) for (let e4 of Array.isArray(s3) ? s3 : [s3]) void 0 !== e4 && ("number" == typeof e4 && (e4 = e4.toString()), t3.append(r2, e4));
          return t3;
        }(e2.request.headers), u2 = /* @__PURE__ */ new Map();
        if (!i2) for (let e3 of Z) {
          let t3 = e3.toString().toLowerCase();
          l2.get(t3) && (u2.set(t3, l2.get(t3)), l2.delete(t3));
        }
        let c2 = new eN({ page: e2.page, input: function(e3, t3) {
          let r2 = "string" == typeof e3, s3 = r2 ? new URL(e3) : e3;
          for (let e4 of Q) s3.searchParams.delete(e4);
          if (t3) for (let e4 of ee) s3.searchParams.delete(e4);
          return r2 ? s3.toString() : s3;
        }(n2, true).toString(), init: { body: e2.request.body, geo: e2.request.geo, headers: l2, ip: e2.request.ip, method: e2.request.method, nextConfig: e2.request.nextConfig, signal: e2.request.signal } });
        o2 && Object.defineProperty(c2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && e2.IncrementalCache && (globalThis.__incrementalCache = new e2.IncrementalCache({ appDir: true, fetchCache: true, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: e2.request.headers, requestProtocol: "https", getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: ej() }) }));
        let h2 = new I({ request: c2, page: e2.page });
        if ((t2 = await e$(c2, () => "/middleware" === e2.page || "/src/middleware" === e2.page ? eR().trace(g.execute, { spanName: `middleware ${c2.method} ${c2.nextUrl.pathname}`, attributes: { "http.target": c2.nextUrl.pathname, "http.method": c2.method } }, () => ex.wrap(eI, { req: c2, renderOpts: { onUpdateCookies: (e3) => {
          s2 = e3;
        }, previewProps: ej() } }, () => e2.handler(c2, h2))) : e2.handler(c2, h2))) && !(t2 instanceof Response)) throw TypeError("Expected an instance of Response to be returned");
        t2 && s2 && t2.headers.set("set-cookie", s2);
        let d2 = null == t2 ? void 0 : t2.headers.get("x-middleware-rewrite");
        if (t2 && d2 && !i2) {
          let r2 = new F(d2, { forceLocale: true, headers: e2.request.headers, nextConfig: e2.request.nextConfig });
          r2.host === c2.nextUrl.host && (r2.buildId = a2 || r2.buildId, t2.headers.set("x-middleware-rewrite", String(r2)));
          let s3 = Y(String(r2), String(n2));
          o2 && t2.headers.set("x-nextjs-rewrite", s3);
        }
        let p2 = null == t2 ? void 0 : t2.headers.get("Location");
        if (t2 && p2 && !i2) {
          let r2 = new F(p2, { forceLocale: false, headers: e2.request.headers, nextConfig: e2.request.nextConfig });
          t2 = new Response(t2.body, t2), r2.host === c2.nextUrl.host && (r2.buildId = a2 || r2.buildId, t2.headers.set("Location", String(r2))), o2 && (t2.headers.delete("Location"), t2.headers.set("x-nextjs-redirect", Y(String(r2), String(n2))));
        }
        let f2 = t2 || X.next(), m2 = f2.headers.get("x-middleware-override-headers"), b2 = [];
        if (m2) {
          for (let [e3, t3] of u2) f2.headers.set(`x-middleware-request-${e3}`, t3), b2.push(e3);
          b2.length > 0 && f2.headers.set("x-middleware-override-headers", m2 + "," + b2.join(","));
        }
        return { response: f2, waitUntil: Promise.all(h2[P]), fetchMetrics: c2.fetchMetrics };
      }
      var eM = r(261);
      async function eB(e2) {
        let t2 = X.next(), r2 = (0, eM.createMiddlewareClient)({ req: e2, res: t2 }), { data: { session: s2 } } = await r2.auth.getSession();
        if (["/dashboard", "/chat", "/image", "/video", "/gallery", "/quota", "/pricing", "/profile"].some((t3) => e2.nextUrl.pathname === t3 || e2.nextUrl.pathname.startsWith(t3 + "/")) && !s2) return X.redirect(new URL("/login", e2.url));
        if (["/admin"].some((t3) => e2.nextUrl.pathname === t3 || e2.nextUrl.pathname.startsWith(t3 + "/")) && s2) {
          let { data: t3 } = await r2.from("admin_users").select("*").eq("user_id", s2.user.id).single();
          if (!t3) return X.redirect(new URL("/dashboard", e2.url));
        }
        return ["/login", "/register"].some((t3) => e2.nextUrl.pathname === t3) && s2 ? X.redirect(new URL("/dashboard", e2.url)) : t2;
      }
      r(340), "undefined" == typeof URLPattern || URLPattern;
      let eq = { matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"] }, eF = { ...m }, eH = eF.middleware || eF.default, eV = "/src/middleware";
      if ("function" != typeof eH) throw Error(`The Middleware "${eV}" must export a \`middleware\` or a \`default\` function`);
      function eW(e2) {
        return eD({ ...e2, page: eV, handler: eH });
      }
    }, 261: (e, t, r) => {
      "use strict";
      var s, i = Object.defineProperty, n = Object.getOwnPropertyDescriptor, a = Object.getOwnPropertyNames, o = Object.prototype.hasOwnProperty, l = {};
      ((e2, t2) => {
        for (var r2 in t2) i(e2, r2, { get: t2[r2], enumerable: true });
      })(l, { createBrowserSupabaseClient: () => R, createClientComponentClient: () => c, createMiddlewareClient: () => w, createMiddlewareSupabaseClient: () => A, createPagesBrowserClient: () => h, createPagesServerClient: () => g, createRouteHandlerClient: () => E, createServerActionClient: () => O, createServerComponentClient: () => S, createServerSupabaseClient: () => C }), e.exports = ((e2, t2, r2, s2) => {
        if (t2 && "object" == typeof t2 || "function" == typeof t2) for (let l2 of a(t2)) o.call(e2, l2) || l2 === r2 || i(e2, l2, { get: () => t2[l2], enumerable: !(s2 = n(t2, l2)) || s2.enumerable });
        return e2;
      })(i({}, "__esModule", { value: true }), l);
      var u = r(126);
      function c({ supabaseUrl: e2 = "https://afyeslpcmqyzajasxssh.supabase.co", supabaseKey: t2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmeWVzbHBjbXF5emFqYXN4c3NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwNTA3NTAsImV4cCI6MjEwMjYyNjc1MH0.2eURUOOM0eeFmfH_yrRuMqRdkJrLWBZdNU0WzgIqFAc", options: r2, cookieOptions: i2, isSingleton: n2 = true } = {}) {
        if (!e2 || !t2) throw Error("either NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env variables or supabaseUrl and supabaseKey are required!");
        let a2 = () => {
          var s2;
          return (0, u.createSupabaseClient)(e2, t2, { ...r2, global: { ...null == r2 ? void 0 : r2.global, headers: { ...null == (s2 = null == r2 ? void 0 : r2.global) ? void 0 : s2.headers, "X-Client-Info": "@supabase/auth-helpers-nextjs@0.8.7" } }, auth: { storage: new u.BrowserCookieAuthStorageAdapter(i2) } });
        };
        if (n2) {
          let e3 = s ?? a2();
          return "undefined" == typeof window ? e3 : (s || (s = e3), s);
        }
        return a2();
      }
      var h = c, d = r(126), p = r(426), f = class extends d.CookieAuthStorageAdapter {
        constructor(e2, t2) {
          super(t2), this.context = e2;
        }
        getCookie(e2) {
          var t2, r2, s2;
          return (0, p.splitCookiesString)((null == (r2 = null == (t2 = this.context.res) ? void 0 : t2.getHeader("set-cookie")) ? void 0 : r2.toString()) ?? "").map((t3) => (0, d.parseCookies)(t3)[e2]).find((e3) => !!e3) ?? (null == (s2 = this.context.req) ? void 0 : s2.cookies[e2]);
        }
        setCookie(e2, t2) {
          this._setCookie(e2, t2);
        }
        deleteCookie(e2) {
          this._setCookie(e2, "", { maxAge: 0 });
        }
        _setCookie(e2, t2, r2) {
          var s2;
          let i2 = (0, p.splitCookiesString)((null == (s2 = this.context.res.getHeader("set-cookie")) ? void 0 : s2.toString()) ?? "").filter((t3) => !(e2 in (0, d.parseCookies)(t3))), n2 = (0, d.serializeCookie)(e2, t2, { ...this.cookieOptions, ...r2, httpOnly: false });
          this.context.res.setHeader("set-cookie", [...i2, n2]);
        }
      };
      function g(e2, { supabaseUrl: t2 = "https://afyeslpcmqyzajasxssh.supabase.co", supabaseKey: r2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmeWVzbHBjbXF5emFqYXN4c3NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwNTA3NTAsImV4cCI6MjEwMjYyNjc1MH0.2eURUOOM0eeFmfH_yrRuMqRdkJrLWBZdNU0WzgIqFAc", options: s2, cookieOptions: i2 } = {}) {
        var n2;
        if (!t2 || !r2) throw Error("either NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env variables or supabaseUrl and supabaseKey are required!");
        return (0, d.createSupabaseClient)(t2, r2, { ...s2, global: { ...null == s2 ? void 0 : s2.global, headers: { ...null == (n2 = null == s2 ? void 0 : s2.global) ? void 0 : n2.headers, "X-Client-Info": "@supabase/auth-helpers-nextjs@0.8.7" } }, auth: { storage: new f(e2, i2) } });
      }
      var m = r(126), b = r(426), y = class extends m.CookieAuthStorageAdapter {
        constructor(e2, t2) {
          super(t2), this.context = e2;
        }
        getCookie(e2) {
          var t2;
          return (0, b.splitCookiesString)((null == (t2 = this.context.res.headers.get("set-cookie")) ? void 0 : t2.toString()) ?? "").map((t3) => (0, m.parseCookies)(t3)[e2]).find((e3) => !!e3) || (0, m.parseCookies)(this.context.req.headers.get("cookie") ?? "")[e2];
        }
        setCookie(e2, t2) {
          this._setCookie(e2, t2);
        }
        deleteCookie(e2) {
          this._setCookie(e2, "", { maxAge: 0 });
        }
        _setCookie(e2, t2, r2) {
          let s2 = (0, m.serializeCookie)(e2, t2, { ...this.cookieOptions, ...r2, httpOnly: false });
          this.context.res.headers && this.context.res.headers.append("set-cookie", s2);
        }
      };
      function w(e2, { supabaseUrl: t2 = "https://afyeslpcmqyzajasxssh.supabase.co", supabaseKey: r2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmeWVzbHBjbXF5emFqYXN4c3NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwNTA3NTAsImV4cCI6MjEwMjYyNjc1MH0.2eURUOOM0eeFmfH_yrRuMqRdkJrLWBZdNU0WzgIqFAc", options: s2, cookieOptions: i2 } = {}) {
        var n2;
        if (!t2 || !r2) throw Error("either NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env variables or supabaseUrl and supabaseKey are required!");
        return (0, m.createSupabaseClient)(t2, r2, { ...s2, global: { ...null == s2 ? void 0 : s2.global, headers: { ...null == (n2 = null == s2 ? void 0 : s2.global) ? void 0 : n2.headers, "X-Client-Info": "@supabase/auth-helpers-nextjs@0.8.7" } }, auth: { storage: new y(e2, i2) } });
      }
      var v = r(126), _ = class extends v.CookieAuthStorageAdapter {
        constructor(e2, t2) {
          super(t2), this.context = e2;
        }
        getCookie(e2) {
          var t2;
          return null == (t2 = this.context.cookies().get(e2)) ? void 0 : t2.value;
        }
        setCookie(e2, t2) {
        }
        deleteCookie(e2) {
        }
      };
      function S(e2, { supabaseUrl: t2 = "https://afyeslpcmqyzajasxssh.supabase.co", supabaseKey: r2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmeWVzbHBjbXF5emFqYXN4c3NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwNTA3NTAsImV4cCI6MjEwMjYyNjc1MH0.2eURUOOM0eeFmfH_yrRuMqRdkJrLWBZdNU0WzgIqFAc", options: s2, cookieOptions: i2 } = {}) {
        var n2;
        if (!t2 || !r2) throw Error("either NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env variables or supabaseUrl and supabaseKey are required!");
        return (0, v.createSupabaseClient)(t2, r2, { ...s2, global: { ...null == s2 ? void 0 : s2.global, headers: { ...null == (n2 = null == s2 ? void 0 : s2.global) ? void 0 : n2.headers, "X-Client-Info": "@supabase/auth-helpers-nextjs@0.8.7" } }, auth: { storage: new _(e2, i2) } });
      }
      var k = r(126), T = class extends k.CookieAuthStorageAdapter {
        constructor(e2, t2) {
          super(t2), this.context = e2;
        }
        getCookie(e2) {
          var t2;
          return null == (t2 = this.context.cookies().get(e2)) ? void 0 : t2.value;
        }
        setCookie(e2, t2) {
          this.context.cookies().set(e2, t2, this.cookieOptions);
        }
        deleteCookie(e2) {
          this.context.cookies().set(e2, "", { ...this.cookieOptions, maxAge: 0 });
        }
      };
      function E(e2, { supabaseUrl: t2 = "https://afyeslpcmqyzajasxssh.supabase.co", supabaseKey: r2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmeWVzbHBjbXF5emFqYXN4c3NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwNTA3NTAsImV4cCI6MjEwMjYyNjc1MH0.2eURUOOM0eeFmfH_yrRuMqRdkJrLWBZdNU0WzgIqFAc", options: s2, cookieOptions: i2 } = {}) {
        var n2;
        if (!t2 || !r2) throw Error("either NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env variables or supabaseUrl and supabaseKey are required!");
        return (0, k.createSupabaseClient)(t2, r2, { ...s2, global: { ...null == s2 ? void 0 : s2.global, headers: { ...null == (n2 = null == s2 ? void 0 : s2.global) ? void 0 : n2.headers, "X-Client-Info": "@supabase/auth-helpers-nextjs@0.8.7" } }, auth: { storage: new T(e2, i2) } });
      }
      var O = E;
      function R({ supabaseUrl: e2 = "https://afyeslpcmqyzajasxssh.supabase.co", supabaseKey: t2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmeWVzbHBjbXF5emFqYXN4c3NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwNTA3NTAsImV4cCI6MjEwMjYyNjc1MH0.2eURUOOM0eeFmfH_yrRuMqRdkJrLWBZdNU0WzgIqFAc", options: r2, cookieOptions: s2 } = {}) {
        return console.warn("Please utilize the `createPagesBrowserClient` function instead of the deprecated `createBrowserSupabaseClient` function. Learn more: https://supabase.com/docs/guides/auth/auth-helpers/nextjs-pages"), h({ supabaseUrl: e2, supabaseKey: t2, options: r2, cookieOptions: s2 });
      }
      function C(e2, { supabaseUrl: t2 = "https://afyeslpcmqyzajasxssh.supabase.co", supabaseKey: r2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmeWVzbHBjbXF5emFqYXN4c3NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwNTA3NTAsImV4cCI6MjEwMjYyNjc1MH0.2eURUOOM0eeFmfH_yrRuMqRdkJrLWBZdNU0WzgIqFAc", options: s2, cookieOptions: i2 } = {}) {
        return console.warn("Please utilize the `createPagesServerClient` function instead of the deprecated `createServerSupabaseClient` function. Learn more: https://supabase.com/docs/guides/auth/auth-helpers/nextjs-pages"), g(e2, { supabaseUrl: t2, supabaseKey: r2, options: s2, cookieOptions: i2 });
      }
      function A(e2, { supabaseUrl: t2 = "https://afyeslpcmqyzajasxssh.supabase.co", supabaseKey: r2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmeWVzbHBjbXF5emFqYXN4c3NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwNTA3NTAsImV4cCI6MjEwMjYyNjc1MH0.2eURUOOM0eeFmfH_yrRuMqRdkJrLWBZdNU0WzgIqFAc", options: s2, cookieOptions: i2 } = {}) {
        return console.warn("Please utilize the `createMiddlewareClient` function instead of the deprecated `createMiddlewareSupabaseClient` function. Learn more: https://supabase.com/docs/guides/auth/auth-helpers/nextjs#middleware"), w(e2, { supabaseUrl: t2, supabaseKey: r2, options: s2, cookieOptions: i2 });
      }
    }, 945: (e) => {
      "use strict";
      var t = Object.defineProperty, r = Object.getOwnPropertyDescriptor, s = Object.getOwnPropertyNames, i = Object.prototype.hasOwnProperty, n = {};
      function a(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), s2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? s2 : `${s2}; ${r2.join("; ")}`;
      }
      function o(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [s2, i2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(s2, decodeURIComponent(null != i2 ? i2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function l(e2) {
        var t2, r2;
        if (!e2) return;
        let [[s2, i2], ...n2] = o(e2), { domain: a2, expires: l2, httponly: h2, maxage: d2, path: p, samesite: f, secure: g, partitioned: m, priority: b } = Object.fromEntries(n2.map(([e3, t3]) => [e3.toLowerCase(), t3]));
        return function(e3) {
          let t3 = {};
          for (let r3 in e3) e3[r3] && (t3[r3] = e3[r3]);
          return t3;
        }({ name: s2, value: decodeURIComponent(i2), domain: a2, ...l2 && { expires: new Date(l2) }, ...h2 && { httpOnly: true }, ..."string" == typeof d2 && { maxAge: Number(d2) }, path: p, ...f && { sameSite: u.includes(t2 = (t2 = f).toLowerCase()) ? t2 : void 0 }, ...g && { secure: true }, ...b && { priority: c.includes(r2 = (r2 = b).toLowerCase()) ? r2 : void 0 }, ...m && { partitioned: true } });
      }
      ((e2, r2) => {
        for (var s2 in r2) t(e2, s2, { get: r2[s2], enumerable: true });
      })(n, { RequestCookies: () => h, ResponseCookies: () => d, parseCookie: () => o, parseSetCookie: () => l, stringifyCookie: () => a }), e.exports = ((e2, n2, a2, o2) => {
        if (n2 && "object" == typeof n2 || "function" == typeof n2) for (let l2 of s(n2)) i.call(e2, l2) || l2 === a2 || t(e2, l2, { get: () => n2[l2], enumerable: !(o2 = r(n2, l2)) || o2.enumerable });
        return e2;
      })(t({}, "__esModule", { value: true }), n);
      var u = ["strict", "lax", "none"], c = ["low", "medium", "high"], h = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let t2 = e2.get("cookie");
          if (t2) for (let [e3, r2] of o(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let s2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === s2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, s2 = this._parsed;
          return s2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(s2).map(([e3, t3]) => a(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => a(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, d = class {
        constructor(e2) {
          var t2, r2, s2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let i2 = null != (s2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? s2 : [];
          for (let e3 of Array.isArray(i2) ? i2 : function(e4) {
            if (!e4) return [];
            var t3, r3, s3, i3, n2, a2 = [], o2 = 0;
            function l2() {
              for (; o2 < e4.length && /\s/.test(e4.charAt(o2)); ) o2 += 1;
              return o2 < e4.length;
            }
            for (; o2 < e4.length; ) {
              for (t3 = o2, n2 = false; l2(); ) if ("," === (r3 = e4.charAt(o2))) {
                for (s3 = o2, o2 += 1, l2(), i3 = o2; o2 < e4.length && "=" !== (r3 = e4.charAt(o2)) && ";" !== r3 && "," !== r3; ) o2 += 1;
                o2 < e4.length && "=" === e4.charAt(o2) ? (n2 = true, o2 = i3, a2.push(e4.substring(t3, s3)), t3 = o2) : o2 = s3 + 1;
              } else o2 += 1;
              (!n2 || o2 >= e4.length) && a2.push(e4.substring(t3, e4.length));
            }
            return a2;
          }(i2)) {
            let t3 = l(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let s2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === s2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, s2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, i2 = this._parsed;
          return i2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...s2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = a(r3);
              t3.append("set-cookie", e4);
            }
          }(i2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2, s2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0].path, e2[0].domain];
          return this.set({ name: t2, path: r2, domain: s2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(a).join("; ");
        }
      };
    }, 439: (e, t, r) => {
      (() => {
        "use strict";
        var t2 = { 491: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ContextAPI = void 0;
          let s2 = r2(223), i2 = r2(172), n2 = r2(930), a = "context", o = new s2.NoopContextManager();
          class l {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new l()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, i2.registerGlobal)(a, e3, n2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e3, t4, r3, ...s3) {
              return this._getContextManager().with(e3, t4, r3, ...s3);
            }
            bind(e3, t4) {
              return this._getContextManager().bind(e3, t4);
            }
            _getContextManager() {
              return (0, i2.getGlobal)(a) || o;
            }
            disable() {
              this._getContextManager().disable(), (0, i2.unregisterGlobal)(a, n2.DiagAPI.instance());
            }
          }
          t3.ContextAPI = l;
        }, 930: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagAPI = void 0;
          let s2 = r2(56), i2 = r2(912), n2 = r2(957), a = r2(172);
          class o {
            constructor() {
              function e3(e4) {
                return function(...t5) {
                  let r3 = (0, a.getGlobal)("diag");
                  if (r3) return r3[e4](...t5);
                };
              }
              let t4 = this;
              t4.setLogger = (e4, r3 = { logLevel: n2.DiagLogLevel.INFO }) => {
                var s3, o2, l;
                if (e4 === t4) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t4.error(null !== (s3 = e5.stack) && void 0 !== s3 ? s3 : e5.message), false;
                }
                "number" == typeof r3 && (r3 = { logLevel: r3 });
                let u = (0, a.getGlobal)("diag"), c = (0, i2.createLogLevelDiagLogger)(null !== (o2 = r3.logLevel) && void 0 !== o2 ? o2 : n2.DiagLogLevel.INFO, e4);
                if (u && !r3.suppressOverrideMessage) {
                  let e5 = null !== (l = Error().stack) && void 0 !== l ? l : "<failed to generate stacktrace>";
                  u.warn(`Current logger will be overwritten from ${e5}`), c.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, a.registerGlobal)("diag", c, t4, true);
              }, t4.disable = () => {
                (0, a.unregisterGlobal)("diag", t4);
              }, t4.createComponentLogger = (e4) => new s2.DiagComponentLogger(e4), t4.verbose = e3("verbose"), t4.debug = e3("debug"), t4.info = e3("info"), t4.warn = e3("warn"), t4.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new o()), this._instance;
            }
          }
          t3.DiagAPI = o;
        }, 653: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.MetricsAPI = void 0;
          let s2 = r2(660), i2 = r2(172), n2 = r2(930), a = "metrics";
          class o {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new o()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, i2.registerGlobal)(a, e3, n2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, i2.getGlobal)(a) || s2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t4, r3) {
              return this.getMeterProvider().getMeter(e3, t4, r3);
            }
            disable() {
              (0, i2.unregisterGlobal)(a, n2.DiagAPI.instance());
            }
          }
          t3.MetricsAPI = o;
        }, 181: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.PropagationAPI = void 0;
          let s2 = r2(172), i2 = r2(874), n2 = r2(194), a = r2(277), o = r2(369), l = r2(930), u = "propagation", c = new i2.NoopTextMapPropagator();
          class h {
            constructor() {
              this.createBaggage = o.createBaggage, this.getBaggage = a.getBaggage, this.getActiveBaggage = a.getActiveBaggage, this.setBaggage = a.setBaggage, this.deleteBaggage = a.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new h()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, s2.registerGlobal)(u, e3, l.DiagAPI.instance());
            }
            inject(e3, t4, r3 = n2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t4, r3);
            }
            extract(e3, t4, r3 = n2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e3, t4, r3);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, s2.unregisterGlobal)(u, l.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, s2.getGlobal)(u) || c;
            }
          }
          t3.PropagationAPI = h;
        }, 997: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceAPI = void 0;
          let s2 = r2(172), i2 = r2(846), n2 = r2(139), a = r2(607), o = r2(930), l = "trace";
          class u {
            constructor() {
              this._proxyTracerProvider = new i2.ProxyTracerProvider(), this.wrapSpanContext = n2.wrapSpanContext, this.isSpanContextValid = n2.isSpanContextValid, this.deleteSpan = a.deleteSpan, this.getSpan = a.getSpan, this.getActiveSpan = a.getActiveSpan, this.getSpanContext = a.getSpanContext, this.setSpan = a.setSpan, this.setSpanContext = a.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new u()), this._instance;
            }
            setGlobalTracerProvider(e3) {
              let t4 = (0, s2.registerGlobal)(l, this._proxyTracerProvider, o.DiagAPI.instance());
              return t4 && this._proxyTracerProvider.setDelegate(e3), t4;
            }
            getTracerProvider() {
              return (0, s2.getGlobal)(l) || this._proxyTracerProvider;
            }
            getTracer(e3, t4) {
              return this.getTracerProvider().getTracer(e3, t4);
            }
            disable() {
              (0, s2.unregisterGlobal)(l, o.DiagAPI.instance()), this._proxyTracerProvider = new i2.ProxyTracerProvider();
            }
          }
          t3.TraceAPI = u;
        }, 277: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.deleteBaggage = t3.setBaggage = t3.getActiveBaggage = t3.getBaggage = void 0;
          let s2 = r2(491), i2 = (0, r2(780).createContextKey)("OpenTelemetry Baggage Key");
          function n2(e3) {
            return e3.getValue(i2) || void 0;
          }
          t3.getBaggage = n2, t3.getActiveBaggage = function() {
            return n2(s2.ContextAPI.getInstance().active());
          }, t3.setBaggage = function(e3, t4) {
            return e3.setValue(i2, t4);
          }, t3.deleteBaggage = function(e3) {
            return e3.deleteValue(i2);
          };
        }, 993: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.BaggageImpl = void 0;
          class r2 {
            constructor(e3) {
              this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            }
            getEntry(e3) {
              let t4 = this._entries.get(e3);
              if (t4) return Object.assign({}, t4);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e3, t4]) => [e3, t4]);
            }
            setEntry(e3, t4) {
              let s2 = new r2(this._entries);
              return s2._entries.set(e3, t4), s2;
            }
            removeEntry(e3) {
              let t4 = new r2(this._entries);
              return t4._entries.delete(e3), t4;
            }
            removeEntries(...e3) {
              let t4 = new r2(this._entries);
              for (let r3 of e3) t4._entries.delete(r3);
              return t4;
            }
            clear() {
              return new r2();
            }
          }
          t3.BaggageImpl = r2;
        }, 830: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataSymbol = void 0, t3.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataFromString = t3.createBaggage = void 0;
          let s2 = r2(930), i2 = r2(993), n2 = r2(830), a = s2.DiagAPI.instance();
          t3.createBaggage = function(e3 = {}) {
            return new i2.BaggageImpl(new Map(Object.entries(e3)));
          }, t3.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (a.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: n2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 67: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.context = void 0;
          let s2 = r2(491);
          t3.context = s2.ContextAPI.getInstance();
        }, 223: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopContextManager = void 0;
          let s2 = r2(780);
          class i2 {
            active() {
              return s2.ROOT_CONTEXT;
            }
            with(e3, t4, r3, ...s3) {
              return t4.call(r3, ...s3);
            }
            bind(e3, t4) {
              return t4;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          }
          t3.NoopContextManager = i2;
        }, 780: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ROOT_CONTEXT = t3.createContextKey = void 0, t3.createContextKey = function(e3) {
            return Symbol.for(e3);
          };
          class r2 {
            constructor(e3) {
              let t4 = this;
              t4._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map(), t4.getValue = (e4) => t4._currentContext.get(e4), t4.setValue = (e4, s2) => {
                let i2 = new r2(t4._currentContext);
                return i2._currentContext.set(e4, s2), i2;
              }, t4.deleteValue = (e4) => {
                let s2 = new r2(t4._currentContext);
                return s2._currentContext.delete(e4), s2;
              };
            }
          }
          t3.ROOT_CONTEXT = new r2();
        }, 506: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.diag = void 0;
          let s2 = r2(930);
          t3.diag = s2.DiagAPI.instance();
        }, 56: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagComponentLogger = void 0;
          let s2 = r2(172);
          class i2 {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return n2("debug", this._namespace, e3);
            }
            error(...e3) {
              return n2("error", this._namespace, e3);
            }
            info(...e3) {
              return n2("info", this._namespace, e3);
            }
            warn(...e3) {
              return n2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return n2("verbose", this._namespace, e3);
            }
          }
          function n2(e3, t4, r3) {
            let i3 = (0, s2.getGlobal)("diag");
            if (i3) return r3.unshift(t4), i3[e3](...r3);
          }
          t3.DiagComponentLogger = i2;
        }, 972: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagConsoleLogger = void 0;
          let r2 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          class s2 {
            constructor() {
              for (let e3 = 0; e3 < r2.length; e3++) this[r2[e3].n] = /* @__PURE__ */ function(e4) {
                return function(...t4) {
                  if (console) {
                    let r3 = console[e4];
                    if ("function" != typeof r3 && (r3 = console.log), "function" == typeof r3) return r3.apply(console, t4);
                  }
                };
              }(r2[e3].c);
            }
          }
          t3.DiagConsoleLogger = s2;
        }, 912: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createLogLevelDiagLogger = void 0;
          let s2 = r2(957);
          t3.createLogLevelDiagLogger = function(e3, t4) {
            function r3(r4, s3) {
              let i2 = t4[r4];
              return "function" == typeof i2 && e3 >= s3 ? i2.bind(t4) : function() {
              };
            }
            return e3 < s2.DiagLogLevel.NONE ? e3 = s2.DiagLogLevel.NONE : e3 > s2.DiagLogLevel.ALL && (e3 = s2.DiagLogLevel.ALL), t4 = t4 || {}, { error: r3("error", s2.DiagLogLevel.ERROR), warn: r3("warn", s2.DiagLogLevel.WARN), info: r3("info", s2.DiagLogLevel.INFO), debug: r3("debug", s2.DiagLogLevel.DEBUG), verbose: r3("verbose", s2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagLogLevel = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.ERROR = 30] = "ERROR", e3[e3.WARN = 50] = "WARN", e3[e3.INFO = 60] = "INFO", e3[e3.DEBUG = 70] = "DEBUG", e3[e3.VERBOSE = 80] = "VERBOSE", e3[e3.ALL = 9999] = "ALL";
          }(t3.DiagLogLevel || (t3.DiagLogLevel = {}));
        }, 172: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.unregisterGlobal = t3.getGlobal = t3.registerGlobal = void 0;
          let s2 = r2(200), i2 = r2(521), n2 = r2(130), a = i2.VERSION.split(".")[0], o = Symbol.for(`opentelemetry.js.api.${a}`), l = s2._globalThis;
          t3.registerGlobal = function(e3, t4, r3, s3 = false) {
            var n3;
            let a2 = l[o] = null !== (n3 = l[o]) && void 0 !== n3 ? n3 : { version: i2.VERSION };
            if (!s3 && a2[e3]) {
              let t5 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r3.error(t5.stack || t5.message), false;
            }
            if (a2.version !== i2.VERSION) {
              let t5 = Error(`@opentelemetry/api: Registration of version v${a2.version} for ${e3} does not match previously registered API v${i2.VERSION}`);
              return r3.error(t5.stack || t5.message), false;
            }
            return a2[e3] = t4, r3.debug(`@opentelemetry/api: Registered a global for ${e3} v${i2.VERSION}.`), true;
          }, t3.getGlobal = function(e3) {
            var t4, r3;
            let s3 = null === (t4 = l[o]) || void 0 === t4 ? void 0 : t4.version;
            if (s3 && (0, n2.isCompatible)(s3)) return null === (r3 = l[o]) || void 0 === r3 ? void 0 : r3[e3];
          }, t3.unregisterGlobal = function(e3, t4) {
            t4.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${i2.VERSION}.`);
            let r3 = l[o];
            r3 && delete r3[e3];
          };
        }, 130: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.isCompatible = t3._makeCompatibilityCheck = void 0;
          let s2 = r2(521), i2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function n2(e3) {
            let t4 = /* @__PURE__ */ new Set([e3]), r3 = /* @__PURE__ */ new Set(), s3 = e3.match(i2);
            if (!s3) return () => false;
            let n3 = { major: +s3[1], minor: +s3[2], patch: +s3[3], prerelease: s3[4] };
            if (null != n3.prerelease) return function(t5) {
              return t5 === e3;
            };
            function a(e4) {
              return r3.add(e4), false;
            }
            return function(e4) {
              if (t4.has(e4)) return true;
              if (r3.has(e4)) return false;
              let s4 = e4.match(i2);
              if (!s4) return a(e4);
              let o = { major: +s4[1], minor: +s4[2], patch: +s4[3], prerelease: s4[4] };
              return null != o.prerelease || n3.major !== o.major ? a(e4) : 0 === n3.major ? n3.minor === o.minor && n3.patch <= o.patch ? (t4.add(e4), true) : a(e4) : n3.minor <= o.minor ? (t4.add(e4), true) : a(e4);
            };
          }
          t3._makeCompatibilityCheck = n2, t3.isCompatible = n2(s2.VERSION);
        }, 886: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.metrics = void 0;
          let s2 = r2(653);
          t3.metrics = s2.MetricsAPI.getInstance();
        }, 901: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ValueType = void 0, function(e3) {
            e3[e3.INT = 0] = "INT", e3[e3.DOUBLE = 1] = "DOUBLE";
          }(t3.ValueType || (t3.ValueType = {}));
        }, 102: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createNoopMeter = t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t3.NOOP_OBSERVABLE_GAUGE_METRIC = t3.NOOP_OBSERVABLE_COUNTER_METRIC = t3.NOOP_UP_DOWN_COUNTER_METRIC = t3.NOOP_HISTOGRAM_METRIC = t3.NOOP_COUNTER_METRIC = t3.NOOP_METER = t3.NoopObservableUpDownCounterMetric = t3.NoopObservableGaugeMetric = t3.NoopObservableCounterMetric = t3.NoopObservableMetric = t3.NoopHistogramMetric = t3.NoopUpDownCounterMetric = t3.NoopCounterMetric = t3.NoopMetric = t3.NoopMeter = void 0;
          class r2 {
            constructor() {
            }
            createHistogram(e3, r3) {
              return t3.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r3) {
              return t3.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r3) {
              return t3.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r3) {
              return t3.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t4) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t3.NoopMeter = r2;
          class s2 {
          }
          t3.NoopMetric = s2;
          class i2 extends s2 {
            add(e3, t4) {
            }
          }
          t3.NoopCounterMetric = i2;
          class n2 extends s2 {
            add(e3, t4) {
            }
          }
          t3.NoopUpDownCounterMetric = n2;
          class a extends s2 {
            record(e3, t4) {
            }
          }
          t3.NoopHistogramMetric = a;
          class o {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t3.NoopObservableMetric = o;
          class l extends o {
          }
          t3.NoopObservableCounterMetric = l;
          class u extends o {
          }
          t3.NoopObservableGaugeMetric = u;
          class c extends o {
          }
          t3.NoopObservableUpDownCounterMetric = c, t3.NOOP_METER = new r2(), t3.NOOP_COUNTER_METRIC = new i2(), t3.NOOP_HISTOGRAM_METRIC = new a(), t3.NOOP_UP_DOWN_COUNTER_METRIC = new n2(), t3.NOOP_OBSERVABLE_COUNTER_METRIC = new l(), t3.NOOP_OBSERVABLE_GAUGE_METRIC = new u(), t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new c(), t3.createNoopMeter = function() {
            return t3.NOOP_METER;
          };
        }, 660: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NOOP_METER_PROVIDER = t3.NoopMeterProvider = void 0;
          let s2 = r2(102);
          class i2 {
            getMeter(e3, t4, r3) {
              return s2.NOOP_METER;
            }
          }
          t3.NoopMeterProvider = i2, t3.NOOP_METER_PROVIDER = new i2();
        }, 200: function(e2, t3, r2) {
          var s2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, s3) {
            void 0 === s3 && (s3 = r3), Object.defineProperty(e3, s3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, s3) {
            void 0 === s3 && (s3 = r3), e3[s3] = t4[r3];
          }), i2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3) "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || s2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), i2(r2(46), t3);
        }, 651: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3._globalThis = void 0, t3._globalThis = "object" == typeof globalThis ? globalThis : r.g;
        }, 46: function(e2, t3, r2) {
          var s2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, s3) {
            void 0 === s3 && (s3 = r3), Object.defineProperty(e3, s3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, s3) {
            void 0 === s3 && (s3 = r3), e3[s3] = t4[r3];
          }), i2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3) "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || s2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), i2(r2(651), t3);
        }, 939: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.propagation = void 0;
          let s2 = r2(181);
          t3.propagation = s2.PropagationAPI.getInstance();
        }, 874: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTextMapPropagator = void 0;
          class r2 {
            inject(e3, t4) {
            }
            extract(e3, t4) {
              return e3;
            }
            fields() {
              return [];
            }
          }
          t3.NoopTextMapPropagator = r2;
        }, 194: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.defaultTextMapSetter = t3.defaultTextMapGetter = void 0, t3.defaultTextMapGetter = { get(e3, t4) {
            if (null != e3) return e3[t4];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t3.defaultTextMapSetter = { set(e3, t4, r2) {
            null != e3 && (e3[t4] = r2);
          } };
        }, 845: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.trace = void 0;
          let s2 = r2(997);
          t3.trace = s2.TraceAPI.getInstance();
        }, 403: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NonRecordingSpan = void 0;
          let s2 = r2(476);
          class i2 {
            constructor(e3 = s2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t4) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t4) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t4) {
            }
          }
          t3.NonRecordingSpan = i2;
        }, 614: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracer = void 0;
          let s2 = r2(491), i2 = r2(607), n2 = r2(403), a = r2(139), o = s2.ContextAPI.getInstance();
          class l {
            startSpan(e3, t4, r3 = o.active()) {
              if (null == t4 ? void 0 : t4.root) return new n2.NonRecordingSpan();
              let s3 = r3 && (0, i2.getSpanContext)(r3);
              return "object" == typeof s3 && "string" == typeof s3.spanId && "string" == typeof s3.traceId && "number" == typeof s3.traceFlags && (0, a.isSpanContextValid)(s3) ? new n2.NonRecordingSpan(s3) : new n2.NonRecordingSpan();
            }
            startActiveSpan(e3, t4, r3, s3) {
              let n3, a2, l2;
              if (arguments.length < 2) return;
              2 == arguments.length ? l2 = t4 : 3 == arguments.length ? (n3 = t4, l2 = r3) : (n3 = t4, a2 = r3, l2 = s3);
              let u = null != a2 ? a2 : o.active(), c = this.startSpan(e3, n3, u), h = (0, i2.setSpan)(u, c);
              return o.with(h, l2, void 0, c);
            }
          }
          t3.NoopTracer = l;
        }, 124: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracerProvider = void 0;
          let s2 = r2(614);
          class i2 {
            getTracer(e3, t4, r3) {
              return new s2.NoopTracer();
            }
          }
          t3.NoopTracerProvider = i2;
        }, 125: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracer = void 0;
          let s2 = new (r2(614)).NoopTracer();
          class i2 {
            constructor(e3, t4, r3, s3) {
              this._provider = e3, this.name = t4, this.version = r3, this.options = s3;
            }
            startSpan(e3, t4, r3) {
              return this._getTracer().startSpan(e3, t4, r3);
            }
            startActiveSpan(e3, t4, r3, s3) {
              let i3 = this._getTracer();
              return Reflect.apply(i3.startActiveSpan, i3, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : s2;
            }
          }
          t3.ProxyTracer = i2;
        }, 846: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracerProvider = void 0;
          let s2 = r2(125), i2 = new (r2(124)).NoopTracerProvider();
          class n2 {
            getTracer(e3, t4, r3) {
              var i3;
              return null !== (i3 = this.getDelegateTracer(e3, t4, r3)) && void 0 !== i3 ? i3 : new s2.ProxyTracer(this, e3, t4, r3);
            }
            getDelegate() {
              var e3;
              return null !== (e3 = this._delegate) && void 0 !== e3 ? e3 : i2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t4, r3) {
              var s3;
              return null === (s3 = this._delegate) || void 0 === s3 ? void 0 : s3.getTracer(e3, t4, r3);
            }
          }
          t3.ProxyTracerProvider = n2;
        }, 996: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SamplingDecision = void 0, function(e3) {
            e3[e3.NOT_RECORD = 0] = "NOT_RECORD", e3[e3.RECORD = 1] = "RECORD", e3[e3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
          }(t3.SamplingDecision || (t3.SamplingDecision = {}));
        }, 607: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.getSpanContext = t3.setSpanContext = t3.deleteSpan = t3.setSpan = t3.getActiveSpan = t3.getSpan = void 0;
          let s2 = r2(780), i2 = r2(403), n2 = r2(491), a = (0, s2.createContextKey)("OpenTelemetry Context Key SPAN");
          function o(e3) {
            return e3.getValue(a) || void 0;
          }
          function l(e3, t4) {
            return e3.setValue(a, t4);
          }
          t3.getSpan = o, t3.getActiveSpan = function() {
            return o(n2.ContextAPI.getInstance().active());
          }, t3.setSpan = l, t3.deleteSpan = function(e3) {
            return e3.deleteValue(a);
          }, t3.setSpanContext = function(e3, t4) {
            return l(e3, new i2.NonRecordingSpan(t4));
          }, t3.getSpanContext = function(e3) {
            var t4;
            return null === (t4 = o(e3)) || void 0 === t4 ? void 0 : t4.spanContext();
          };
        }, 325: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceStateImpl = void 0;
          let s2 = r2(564);
          class i2 {
            constructor(e3) {
              this._internalState = /* @__PURE__ */ new Map(), e3 && this._parse(e3);
            }
            set(e3, t4) {
              let r3 = this._clone();
              return r3._internalState.has(e3) && r3._internalState.delete(e3), r3._internalState.set(e3, t4), r3;
            }
            unset(e3) {
              let t4 = this._clone();
              return t4._internalState.delete(e3), t4;
            }
            get(e3) {
              return this._internalState.get(e3);
            }
            serialize() {
              return this._keys().reduce((e3, t4) => (e3.push(t4 + "=" + this.get(t4)), e3), []).join(",");
            }
            _parse(e3) {
              !(e3.length > 512) && (this._internalState = e3.split(",").reverse().reduce((e4, t4) => {
                let r3 = t4.trim(), i3 = r3.indexOf("=");
                if (-1 !== i3) {
                  let n2 = r3.slice(0, i3), a = r3.slice(i3 + 1, t4.length);
                  (0, s2.validateKey)(n2) && (0, s2.validateValue)(a) && e4.set(n2, a);
                }
                return e4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let e3 = new i2();
              return e3._internalState = new Map(this._internalState), e3;
            }
          }
          t3.TraceStateImpl = i2;
        }, 564: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.validateValue = t3.validateKey = void 0;
          let r2 = "[_0-9a-z-*/]", s2 = `[a-z]${r2}{0,255}`, i2 = `[a-z0-9]${r2}{0,240}@[a-z]${r2}{0,13}`, n2 = RegExp(`^(?:${s2}|${i2})$`), a = /^[ -~]{0,255}[!-~]$/, o = /,|=/;
          t3.validateKey = function(e3) {
            return n2.test(e3);
          }, t3.validateValue = function(e3) {
            return a.test(e3) && !o.test(e3);
          };
        }, 98: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createTraceState = void 0;
          let s2 = r2(325);
          t3.createTraceState = function(e3) {
            return new s2.TraceStateImpl(e3);
          };
        }, 476: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.INVALID_SPAN_CONTEXT = t3.INVALID_TRACEID = t3.INVALID_SPANID = void 0;
          let s2 = r2(475);
          t3.INVALID_SPANID = "0000000000000000", t3.INVALID_TRACEID = "00000000000000000000000000000000", t3.INVALID_SPAN_CONTEXT = { traceId: t3.INVALID_TRACEID, spanId: t3.INVALID_SPANID, traceFlags: s2.TraceFlags.NONE };
        }, 357: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanKind = void 0, function(e3) {
            e3[e3.INTERNAL = 0] = "INTERNAL", e3[e3.SERVER = 1] = "SERVER", e3[e3.CLIENT = 2] = "CLIENT", e3[e3.PRODUCER = 3] = "PRODUCER", e3[e3.CONSUMER = 4] = "CONSUMER";
          }(t3.SpanKind || (t3.SpanKind = {}));
        }, 139: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.wrapSpanContext = t3.isSpanContextValid = t3.isValidSpanId = t3.isValidTraceId = void 0;
          let s2 = r2(476), i2 = r2(403), n2 = /^([0-9a-f]{32})$/i, a = /^[0-9a-f]{16}$/i;
          function o(e3) {
            return n2.test(e3) && e3 !== s2.INVALID_TRACEID;
          }
          function l(e3) {
            return a.test(e3) && e3 !== s2.INVALID_SPANID;
          }
          t3.isValidTraceId = o, t3.isValidSpanId = l, t3.isSpanContextValid = function(e3) {
            return o(e3.traceId) && l(e3.spanId);
          }, t3.wrapSpanContext = function(e3) {
            return new i2.NonRecordingSpan(e3);
          };
        }, 847: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanStatusCode = void 0, function(e3) {
            e3[e3.UNSET = 0] = "UNSET", e3[e3.OK = 1] = "OK", e3[e3.ERROR = 2] = "ERROR";
          }(t3.SpanStatusCode || (t3.SpanStatusCode = {}));
        }, 475: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceFlags = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.SAMPLED = 1] = "SAMPLED";
          }(t3.TraceFlags || (t3.TraceFlags = {}));
        }, 521: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.VERSION = void 0, t3.VERSION = "1.6.0";
        } }, s = {};
        function i(e2) {
          var r2 = s[e2];
          if (void 0 !== r2) return r2.exports;
          var n2 = s[e2] = { exports: {} }, a = true;
          try {
            t2[e2].call(n2.exports, n2, n2.exports, i), a = false;
          } finally {
            a && delete s[e2];
          }
          return n2.exports;
        }
        i.ab = "//";
        var n = {};
        (() => {
          Object.defineProperty(n, "__esModule", { value: true }), n.trace = n.propagation = n.metrics = n.diag = n.context = n.INVALID_SPAN_CONTEXT = n.INVALID_TRACEID = n.INVALID_SPANID = n.isValidSpanId = n.isValidTraceId = n.isSpanContextValid = n.createTraceState = n.TraceFlags = n.SpanStatusCode = n.SpanKind = n.SamplingDecision = n.ProxyTracerProvider = n.ProxyTracer = n.defaultTextMapSetter = n.defaultTextMapGetter = n.ValueType = n.createNoopMeter = n.DiagLogLevel = n.DiagConsoleLogger = n.ROOT_CONTEXT = n.createContextKey = n.baggageEntryMetadataFromString = void 0;
          var e2 = i(369);
          Object.defineProperty(n, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
            return e2.baggageEntryMetadataFromString;
          } });
          var t3 = i(780);
          Object.defineProperty(n, "createContextKey", { enumerable: true, get: function() {
            return t3.createContextKey;
          } }), Object.defineProperty(n, "ROOT_CONTEXT", { enumerable: true, get: function() {
            return t3.ROOT_CONTEXT;
          } });
          var r2 = i(972);
          Object.defineProperty(n, "DiagConsoleLogger", { enumerable: true, get: function() {
            return r2.DiagConsoleLogger;
          } });
          var s2 = i(957);
          Object.defineProperty(n, "DiagLogLevel", { enumerable: true, get: function() {
            return s2.DiagLogLevel;
          } });
          var a = i(102);
          Object.defineProperty(n, "createNoopMeter", { enumerable: true, get: function() {
            return a.createNoopMeter;
          } });
          var o = i(901);
          Object.defineProperty(n, "ValueType", { enumerable: true, get: function() {
            return o.ValueType;
          } });
          var l = i(194);
          Object.defineProperty(n, "defaultTextMapGetter", { enumerable: true, get: function() {
            return l.defaultTextMapGetter;
          } }), Object.defineProperty(n, "defaultTextMapSetter", { enumerable: true, get: function() {
            return l.defaultTextMapSetter;
          } });
          var u = i(125);
          Object.defineProperty(n, "ProxyTracer", { enumerable: true, get: function() {
            return u.ProxyTracer;
          } });
          var c = i(846);
          Object.defineProperty(n, "ProxyTracerProvider", { enumerable: true, get: function() {
            return c.ProxyTracerProvider;
          } });
          var h = i(996);
          Object.defineProperty(n, "SamplingDecision", { enumerable: true, get: function() {
            return h.SamplingDecision;
          } });
          var d = i(357);
          Object.defineProperty(n, "SpanKind", { enumerable: true, get: function() {
            return d.SpanKind;
          } });
          var p = i(847);
          Object.defineProperty(n, "SpanStatusCode", { enumerable: true, get: function() {
            return p.SpanStatusCode;
          } });
          var f = i(475);
          Object.defineProperty(n, "TraceFlags", { enumerable: true, get: function() {
            return f.TraceFlags;
          } });
          var g = i(98);
          Object.defineProperty(n, "createTraceState", { enumerable: true, get: function() {
            return g.createTraceState;
          } });
          var m = i(139);
          Object.defineProperty(n, "isSpanContextValid", { enumerable: true, get: function() {
            return m.isSpanContextValid;
          } }), Object.defineProperty(n, "isValidTraceId", { enumerable: true, get: function() {
            return m.isValidTraceId;
          } }), Object.defineProperty(n, "isValidSpanId", { enumerable: true, get: function() {
            return m.isValidSpanId;
          } });
          var b = i(476);
          Object.defineProperty(n, "INVALID_SPANID", { enumerable: true, get: function() {
            return b.INVALID_SPANID;
          } }), Object.defineProperty(n, "INVALID_TRACEID", { enumerable: true, get: function() {
            return b.INVALID_TRACEID;
          } }), Object.defineProperty(n, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
            return b.INVALID_SPAN_CONTEXT;
          } });
          let y = i(67);
          Object.defineProperty(n, "context", { enumerable: true, get: function() {
            return y.context;
          } });
          let w = i(506);
          Object.defineProperty(n, "diag", { enumerable: true, get: function() {
            return w.diag;
          } });
          let v = i(886);
          Object.defineProperty(n, "metrics", { enumerable: true, get: function() {
            return v.metrics;
          } });
          let _ = i(939);
          Object.defineProperty(n, "propagation", { enumerable: true, get: function() {
            return _.propagation;
          } });
          let S = i(845);
          Object.defineProperty(n, "trace", { enumerable: true, get: function() {
            return S.trace;
          } }), n.default = { context: y.context, diag: w.diag, metrics: v.metrics, propagation: _.propagation, trace: S.trace };
        })(), e.exports = n;
      })();
    }, 133: (e) => {
      (() => {
        "use strict";
        "undefined" != typeof __nccwpck_require__ && (__nccwpck_require__.ab = "//");
        var t = {};
        (() => {
          t.parse = function(t2, r2) {
            if ("string" != typeof t2) throw TypeError("argument str must be a string");
            for (var i2 = {}, n = t2.split(s), a = (r2 || {}).decode || e2, o = 0; o < n.length; o++) {
              var l = n[o], u = l.indexOf("=");
              if (!(u < 0)) {
                var c = l.substr(0, u).trim(), h = l.substr(++u, l.length).trim();
                '"' == h[0] && (h = h.slice(1, -1)), void 0 == i2[c] && (i2[c] = function(e3, t3) {
                  try {
                    return t3(e3);
                  } catch (t4) {
                    return e3;
                  }
                }(h, a));
              }
            }
            return i2;
          }, t.serialize = function(e3, t2, s2) {
            var n = s2 || {}, a = n.encode || r;
            if ("function" != typeof a) throw TypeError("option encode is invalid");
            if (!i.test(e3)) throw TypeError("argument name is invalid");
            var o = a(t2);
            if (o && !i.test(o)) throw TypeError("argument val is invalid");
            var l = e3 + "=" + o;
            if (null != n.maxAge) {
              var u = n.maxAge - 0;
              if (isNaN(u) || !isFinite(u)) throw TypeError("option maxAge is invalid");
              l += "; Max-Age=" + Math.floor(u);
            }
            if (n.domain) {
              if (!i.test(n.domain)) throw TypeError("option domain is invalid");
              l += "; Domain=" + n.domain;
            }
            if (n.path) {
              if (!i.test(n.path)) throw TypeError("option path is invalid");
              l += "; Path=" + n.path;
            }
            if (n.expires) {
              if ("function" != typeof n.expires.toUTCString) throw TypeError("option expires is invalid");
              l += "; Expires=" + n.expires.toUTCString();
            }
            if (n.httpOnly && (l += "; HttpOnly"), n.secure && (l += "; Secure"), n.sameSite) switch ("string" == typeof n.sameSite ? n.sameSite.toLowerCase() : n.sameSite) {
              case true:
              case "strict":
                l += "; SameSite=Strict";
                break;
              case "lax":
                l += "; SameSite=Lax";
                break;
              case "none":
                l += "; SameSite=None";
                break;
              default:
                throw TypeError("option sameSite is invalid");
            }
            return l;
          };
          var e2 = decodeURIComponent, r = encodeURIComponent, s = /; */, i = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        })(), e.exports = t;
      })();
    }, 340: (e, t, r) => {
      var s;
      (() => {
        var i = { 226: function(i2, n2) {
          !function(a2, o2) {
            "use strict";
            var l = "function", u = "undefined", c = "object", h = "string", d = "major", p = "model", f = "name", g = "type", m = "vendor", b = "version", y = "architecture", w = "console", v = "mobile", _ = "tablet", S = "smarttv", k = "wearable", T = "embedded", E = "Amazon", O = "Apple", R = "ASUS", C = "BlackBerry", A = "Browser", P = "Chrome", x = "Firefox", I = "Google", j = "Huawei", N = "Microsoft", L = "Motorola", $ = "Opera", U = "Samsung", D = "Sharp", M = "Sony", B = "Xiaomi", q = "Zebra", F = "Facebook", H = "Chromium OS", V = "Mac OS", W = function(e2, t2) {
              var r2 = {};
              for (var s2 in e2) t2[s2] && t2[s2].length % 2 == 0 ? r2[s2] = t2[s2].concat(e2[s2]) : r2[s2] = e2[s2];
              return r2;
            }, z = function(e2) {
              for (var t2 = {}, r2 = 0; r2 < e2.length; r2++) t2[e2[r2].toUpperCase()] = e2[r2];
              return t2;
            }, J = function(e2, t2) {
              return typeof e2 === h && -1 !== G(t2).indexOf(G(e2));
            }, G = function(e2) {
              return e2.toLowerCase();
            }, K = function(e2, t2) {
              if (typeof e2 === h) return e2 = e2.replace(/^\s\s*/, ""), typeof t2 === u ? e2 : e2.substring(0, 350);
            }, X = function(e2, t2) {
              for (var r2, s2, i3, n3, a3, u2, h2 = 0; h2 < t2.length && !a3; ) {
                var d2 = t2[h2], p2 = t2[h2 + 1];
                for (r2 = s2 = 0; r2 < d2.length && !a3 && d2[r2]; ) if (a3 = d2[r2++].exec(e2)) for (i3 = 0; i3 < p2.length; i3++) u2 = a3[++s2], typeof (n3 = p2[i3]) === c && n3.length > 0 ? 2 === n3.length ? typeof n3[1] == l ? this[n3[0]] = n3[1].call(this, u2) : this[n3[0]] = n3[1] : 3 === n3.length ? typeof n3[1] !== l || n3[1].exec && n3[1].test ? this[n3[0]] = u2 ? u2.replace(n3[1], n3[2]) : void 0 : this[n3[0]] = u2 ? n3[1].call(this, u2, n3[2]) : void 0 : 4 === n3.length && (this[n3[0]] = u2 ? n3[3].call(this, u2.replace(n3[1], n3[2])) : void 0) : this[n3] = u2 || o2;
                h2 += 2;
              }
            }, Y = function(e2, t2) {
              for (var r2 in t2) if (typeof t2[r2] === c && t2[r2].length > 0) {
                for (var s2 = 0; s2 < t2[r2].length; s2++) if (J(t2[r2][s2], e2)) return "?" === r2 ? o2 : r2;
              } else if (J(t2[r2], e2)) return "?" === r2 ? o2 : r2;
              return e2;
            }, Z = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, Q = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [b, [f, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [b, [f, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [f, b], [/opios[\/ ]+([\w\.]+)/i], [b, [f, $ + " Mini"]], [/\bopr\/([\w\.]+)/i], [b, [f, $]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [f, b], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [b, [f, "UC" + A]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [b, [f, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [b, [f, "WeChat"]], [/konqueror\/([\w\.]+)/i], [b, [f, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [b, [f, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [b, [f, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[f, /(.+)/, "$1 Secure " + A], b], [/\bfocus\/([\w\.]+)/i], [b, [f, x + " Focus"]], [/\bopt\/([\w\.]+)/i], [b, [f, $ + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [b, [f, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [b, [f, "Dolphin"]], [/coast\/([\w\.]+)/i], [b, [f, $ + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [b, [f, "MIUI " + A]], [/fxios\/([-\w\.]+)/i], [b, [f, x]], [/\bqihu|(qi?ho?o?|360)browser/i], [[f, "360 " + A]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[f, /(.+)/, "$1 " + A], b], [/(comodo_dragon)\/([\w\.]+)/i], [[f, /_/g, " "], b], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [f, b], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [f], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[f, F], b], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [f, b], [/\bgsa\/([\w\.]+) .*safari\//i], [b, [f, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [b, [f, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [b, [f, P + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[f, P + " WebView"], b], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [b, [f, "Android " + A]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [f, b], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [b, [f, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [b, f], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [f, [b, Y, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [f, b], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[f, "Netscape"], b], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [b, [f, x + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [f, b], [/(cobalt)\/([\w\.]+)/i], [f, [b, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[y, "amd64"]], [/(ia32(?=;))/i], [[y, G]], [/((?:i[346]|x)86)[;\)]/i], [[y, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[y, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[y, "armhf"]], [/windows (ce|mobile); ppc;/i], [[y, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[y, /ower/, "", G]], [/(sun4\w)[;\)]/i], [[y, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[y, G]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [p, [m, U], [g, _]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [p, [m, U], [g, v]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [p, [m, O], [g, v]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [p, [m, O], [g, _]], [/(macintosh);/i], [p, [m, O]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [p, [m, D], [g, v]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [p, [m, j], [g, _]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [p, [m, j], [g, v]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[p, /_/g, " "], [m, B], [g, v]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[p, /_/g, " "], [m, B], [g, _]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [p, [m, "OPPO"], [g, v]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [p, [m, "Vivo"], [g, v]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [p, [m, "Realme"], [g, v]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [p, [m, L], [g, v]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [p, [m, L], [g, _]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [p, [m, "LG"], [g, _]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [p, [m, "LG"], [g, v]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [p, [m, "Lenovo"], [g, _]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[p, /_/g, " "], [m, "Nokia"], [g, v]], [/(pixel c)\b/i], [p, [m, I], [g, _]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [p, [m, I], [g, v]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [p, [m, M], [g, v]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[p, "Xperia Tablet"], [m, M], [g, _]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [p, [m, "OnePlus"], [g, v]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [p, [m, E], [g, _]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[p, /(.+)/g, "Fire Phone $1"], [m, E], [g, v]], [/(playbook);[-\w\),; ]+(rim)/i], [p, m, [g, _]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [p, [m, C], [g, v]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [p, [m, R], [g, _]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [p, [m, R], [g, v]], [/(nexus 9)/i], [p, [m, "HTC"], [g, _]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [m, [p, /_/g, " "], [g, v]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [p, [m, "Acer"], [g, _]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [p, [m, "Meizu"], [g, v]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [m, p, [g, v]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [m, p, [g, _]], [/(surface duo)/i], [p, [m, N], [g, _]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [p, [m, "Fairphone"], [g, v]], [/(u304aa)/i], [p, [m, "AT&T"], [g, v]], [/\bsie-(\w*)/i], [p, [m, "Siemens"], [g, v]], [/\b(rct\w+) b/i], [p, [m, "RCA"], [g, _]], [/\b(venue[\d ]{2,7}) b/i], [p, [m, "Dell"], [g, _]], [/\b(q(?:mv|ta)\w+) b/i], [p, [m, "Verizon"], [g, _]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [p, [m, "Barnes & Noble"], [g, _]], [/\b(tm\d{3}\w+) b/i], [p, [m, "NuVision"], [g, _]], [/\b(k88) b/i], [p, [m, "ZTE"], [g, _]], [/\b(nx\d{3}j) b/i], [p, [m, "ZTE"], [g, v]], [/\b(gen\d{3}) b.+49h/i], [p, [m, "Swiss"], [g, v]], [/\b(zur\d{3}) b/i], [p, [m, "Swiss"], [g, _]], [/\b((zeki)?tb.*\b) b/i], [p, [m, "Zeki"], [g, _]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[m, "Dragon Touch"], p, [g, _]], [/\b(ns-?\w{0,9}) b/i], [p, [m, "Insignia"], [g, _]], [/\b((nxa|next)-?\w{0,9}) b/i], [p, [m, "NextBook"], [g, _]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[m, "Voice"], p, [g, v]], [/\b(lvtel\-)?(v1[12]) b/i], [[m, "LvTel"], p, [g, v]], [/\b(ph-1) /i], [p, [m, "Essential"], [g, v]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [p, [m, "Envizen"], [g, _]], [/\b(trio[-\w\. ]+) b/i], [p, [m, "MachSpeed"], [g, _]], [/\btu_(1491) b/i], [p, [m, "Rotor"], [g, _]], [/(shield[\w ]+) b/i], [p, [m, "Nvidia"], [g, _]], [/(sprint) (\w+)/i], [m, p, [g, v]], [/(kin\.[onetw]{3})/i], [[p, /\./g, " "], [m, N], [g, v]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [p, [m, q], [g, _]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [p, [m, q], [g, v]], [/smart-tv.+(samsung)/i], [m, [g, S]], [/hbbtv.+maple;(\d+)/i], [[p, /^/, "SmartTV"], [m, U], [g, S]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[m, "LG"], [g, S]], [/(apple) ?tv/i], [m, [p, O + " TV"], [g, S]], [/crkey/i], [[p, P + "cast"], [m, I], [g, S]], [/droid.+aft(\w)( bui|\))/i], [p, [m, E], [g, S]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [p, [m, D], [g, S]], [/(bravia[\w ]+)( bui|\))/i], [p, [m, M], [g, S]], [/(mitv-\w{5}) bui/i], [p, [m, B], [g, S]], [/Hbbtv.*(technisat) (.*);/i], [m, p, [g, S]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[m, K], [p, K], [g, S]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[g, S]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [m, p, [g, w]], [/droid.+; (shield) bui/i], [p, [m, "Nvidia"], [g, w]], [/(playstation [345portablevi]+)/i], [p, [m, M], [g, w]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [p, [m, N], [g, w]], [/((pebble))app/i], [m, p, [g, k]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [p, [m, O], [g, k]], [/droid.+; (glass) \d/i], [p, [m, I], [g, k]], [/droid.+; (wt63?0{2,3})\)/i], [p, [m, q], [g, k]], [/(quest( 2| pro)?)/i], [p, [m, F], [g, k]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [m, [g, T]], [/(aeobc)\b/i], [p, [m, E], [g, T]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [p, [g, v]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [p, [g, _]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[g, _]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[g, v]], [/(android[-\w\. ]{0,9});.+buil/i], [p, [m, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [b, [f, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [b, [f, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [f, b], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [b, f]], os: [[/microsoft (windows) (vista|xp)/i], [f, b], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [f, [b, Y, Z]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[f, "Windows"], [b, Y, Z]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[b, /_/g, "."], [f, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[f, V], [b, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [b, f], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [f, b], [/\(bb(10);/i], [b, [f, C]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [b, [f, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [b, [f, x + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [b, [f, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [b, [f, "watchOS"]], [/crkey\/([\d\.]+)/i], [b, [f, P + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[f, H], b], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [f, b], [/(sunos) ?([\w\.\d]*)/i], [[f, "Solaris"], b], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [f, b]] }, ee = function(e2, t2) {
              if (typeof e2 === c && (t2 = e2, e2 = o2), !(this instanceof ee)) return new ee(e2, t2).getResult();
              var r2 = typeof a2 !== u && a2.navigator ? a2.navigator : o2, s2 = e2 || (r2 && r2.userAgent ? r2.userAgent : ""), i3 = r2 && r2.userAgentData ? r2.userAgentData : o2, n3 = t2 ? W(Q, t2) : Q, w2 = r2 && r2.userAgent == s2;
              return this.getBrowser = function() {
                var e3, t3 = {};
                return t3[f] = o2, t3[b] = o2, X.call(t3, s2, n3.browser), t3[d] = typeof (e3 = t3[b]) === h ? e3.replace(/[^\d\.]/g, "").split(".")[0] : o2, w2 && r2 && r2.brave && typeof r2.brave.isBrave == l && (t3[f] = "Brave"), t3;
              }, this.getCPU = function() {
                var e3 = {};
                return e3[y] = o2, X.call(e3, s2, n3.cpu), e3;
              }, this.getDevice = function() {
                var e3 = {};
                return e3[m] = o2, e3[p] = o2, e3[g] = o2, X.call(e3, s2, n3.device), w2 && !e3[g] && i3 && i3.mobile && (e3[g] = v), w2 && "Macintosh" == e3[p] && r2 && typeof r2.standalone !== u && r2.maxTouchPoints && r2.maxTouchPoints > 2 && (e3[p] = "iPad", e3[g] = _), e3;
              }, this.getEngine = function() {
                var e3 = {};
                return e3[f] = o2, e3[b] = o2, X.call(e3, s2, n3.engine), e3;
              }, this.getOS = function() {
                var e3 = {};
                return e3[f] = o2, e3[b] = o2, X.call(e3, s2, n3.os), w2 && !e3[f] && i3 && "Unknown" != i3.platform && (e3[f] = i3.platform.replace(/chrome os/i, H).replace(/macos/i, V)), e3;
              }, this.getResult = function() {
                return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
              }, this.getUA = function() {
                return s2;
              }, this.setUA = function(e3) {
                return s2 = typeof e3 === h && e3.length > 350 ? K(e3, 350) : e3, this;
              }, this.setUA(s2), this;
            };
            ee.VERSION = "1.0.35", ee.BROWSER = z([f, b, d]), ee.CPU = z([y]), ee.DEVICE = z([p, m, g, w, v, S, _, k, T]), ee.ENGINE = ee.OS = z([f, b]), typeof n2 !== u ? (i2.exports && (n2 = i2.exports = ee), n2.UAParser = ee) : r.amdO ? void 0 !== (s = function() {
              return ee;
            }.call(t, r, t, e)) && (e.exports = s) : typeof a2 !== u && (a2.UAParser = ee);
            var et = typeof a2 !== u && (a2.jQuery || a2.Zepto);
            if (et && !et.ua) {
              var er = new ee();
              et.ua = er.getResult(), et.ua.get = function() {
                return er.getUA();
              }, et.ua.set = function(e2) {
                er.setUA(e2);
                var t2 = er.getResult();
                for (var r2 in t2) et.ua[r2] = t2[r2];
              };
            }
          }("object" == typeof window ? window : this);
        } }, n = {};
        function a(e2) {
          var t2 = n[e2];
          if (void 0 !== t2) return t2.exports;
          var r2 = n[e2] = { exports: {} }, s2 = true;
          try {
            i[e2].call(r2.exports, r2, r2.exports, a), s2 = false;
          } finally {
            s2 && delete n[e2];
          }
          return r2.exports;
        }
        a.ab = "//";
        var o = a(226);
        e.exports = o;
      })();
    }, 488: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { getTestReqInfo: function() {
        return a;
      }, withRequest: function() {
        return n;
      } });
      let s = new (r(67)).AsyncLocalStorage();
      function i(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (r2) return { url: t2.url(e2), proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function n(e2, t2, r2) {
        let n2 = i(e2, t2);
        return n2 ? s.run(n2, r2) : r2();
      }
      function a(e2, t2) {
        return s.getStore() || (e2 && t2 ? i(e2, t2) : void 0);
      }
    }, 375: (e, t, r) => {
      "use strict";
      var s = r(195).Buffer;
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { handleFetch: function() {
        return o;
      }, interceptFetch: function() {
        return l;
      }, reader: function() {
        return n;
      } });
      let i = r(488), n = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function a(e2, t2) {
        let { url: r2, method: i2, headers: n2, body: a2, cache: o2, credentials: l2, integrity: u, mode: c, redirect: h, referrer: d, referrerPolicy: p } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: i2, headers: [...Array.from(n2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: a2 ? s.from(await t2.arrayBuffer()).toString("base64") : null, cache: o2, credentials: l2, integrity: u, mode: c, redirect: h, referrer: d, referrerPolicy: p } };
      }
      async function o(e2, t2) {
        let r2 = (0, i.getTestReqInfo)(t2, n);
        if (!r2) return e2(t2);
        let { testData: o2, proxyPort: l2 } = r2, u = await a(o2, t2), c = await e2(`http://localhost:${l2}`, { method: "POST", body: JSON.stringify(u), next: { internal: true } });
        if (!c.ok) throw Error(`Proxy request failed: ${c.status}`);
        let h = await c.json(), { api: d } = h;
        switch (d) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Error(`Proxy request aborted [${t2.method} ${t2.url}]`);
        }
        return function(e3) {
          let { status: t3, headers: r3, body: i2 } = e3.response;
          return new Response(i2 ? s.from(i2, "base64") : null, { status: t3, headers: new Headers(r3) });
        }(h);
      }
      function l(e2) {
        return r.g.fetch = function(t2, r2) {
          var s2;
          return (null == r2 ? void 0 : null == (s2 = r2.next) ? void 0 : s2.internal) ? e2(t2, r2) : o(e2, new Request(t2, r2));
        }, () => {
          r.g.fetch = e2;
        };
      }
    }, 177: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { interceptTestApis: function() {
        return n;
      }, wrapRequestHandler: function() {
        return a;
      } });
      let s = r(488), i = r(375);
      function n() {
        return (0, i.interceptFetch)(r.g.fetch);
      }
      function a(e2) {
        return (t2, r2) => (0, s.withRequest)(t2, i.reader, () => e2(t2, r2));
      }
    }, 426: (e) => {
      "use strict";
      var t = { decodeValues: true, map: false, silent: false };
      function r(e2) {
        return "string" != typeof e2 || e2 in {};
      }
      function s() {
        return /* @__PURE__ */ Object.create(null);
      }
      function i(e2) {
        return "string" == typeof e2 && !!e2.trim();
      }
      function n(e2, n2) {
        var a2, o, l, u, c = e2.split(";").filter(i), h = (a2 = c.shift(), o = "", l = "", (u = a2.split("=")).length > 1 ? (o = u.shift(), l = u.join("=")) : l = a2, { name: o, value: l }), d = h.name, p = h.value;
        if (n2 = n2 ? Object.assign({}, t, n2) : t, r(d)) return null;
        try {
          p = n2.decodeValues ? decodeURIComponent(p) : p;
        } catch (e3) {
          console.error("set-cookie-parser: failed to decode cookie value. Set options.decodeValues=false to disable decoding.", e3);
        }
        var f = s();
        return f.name = d, f.value = p, c.forEach(function(e3) {
          var t2 = e3.split("="), s2 = t2.shift().trimLeft().toLowerCase();
          if (!r(s2)) {
            var i2 = t2.join("=");
            if ("expires" === s2) f.expires = new Date(i2);
            else if ("max-age" === s2) {
              var n3 = parseInt(i2, 10);
              Number.isNaN(n3) || (f.maxAge = n3);
            } else "secure" === s2 ? f.secure = true : "httponly" === s2 ? f.httpOnly = true : "samesite" === s2 ? f.sameSite = i2 : "partitioned" === s2 ? f.partitioned = true : s2 && (f[s2] = i2);
          }
        }), f;
      }
      function a(e2, a2) {
        if (a2 = a2 ? Object.assign({}, t, a2) : t, !e2) return a2.map ? s() : [];
        if (e2.headers) {
          if ("function" == typeof e2.headers.getSetCookie) e2 = e2.headers.getSetCookie();
          else if (e2.headers["set-cookie"]) e2 = e2.headers["set-cookie"];
          else {
            var o = e2.headers[Object.keys(e2.headers).find(function(e3) {
              return "set-cookie" === e3.toLowerCase();
            })];
            o || !e2.headers.cookie || a2.silent || console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."), e2 = o;
          }
        }
        if (Array.isArray(e2) || (e2 = [e2]), !a2.map) return e2.filter(i).map(function(e3) {
          return n(e3, a2);
        }).filter(Boolean);
        var l = s();
        return e2.filter(i).reduce(function(e3, t2) {
          var s2 = n(t2, a2);
          return s2 && !r(s2.name) && (e3[s2.name] = s2), e3;
        }, l);
      }
      e.exports = a, e.exports.parse = a, e.exports.parseString = n, e.exports.splitCookiesString = function(e2) {
        if (Array.isArray(e2)) return e2;
        if ("string" != typeof e2) return [];
        var t2, r2, s2, i2, n2, a2 = [], o = 0;
        function l() {
          for (; o < e2.length && /\s/.test(e2.charAt(o)); ) o += 1;
          return o < e2.length;
        }
        for (; o < e2.length; ) {
          for (t2 = o, n2 = false; l(); ) if ("," === (r2 = e2.charAt(o))) {
            for (s2 = o, o += 1, l(), i2 = o; o < e2.length && "=" !== (r2 = e2.charAt(o)) && ";" !== r2 && "," !== r2; ) o += 1;
            o < e2.length && "=" === e2.charAt(o) ? (n2 = true, o = i2, a2.push(e2.substring(t2, s2)), t2 = o) : o = s2 + 1;
          } else o += 1;
          (!n2 || o >= e2.length) && a2.push(e2.substring(t2, e2.length));
        }
        return a2;
      };
    }, 126: (e, t, r) => {
      "use strict";
      let s, i, n, a, o;
      r.r(t), r.d(t, { BrowserCookieAuthStorageAdapter: () => sN, CookieAuthStorageAdapter: () => sj, DEFAULT_COOKIE_OPTIONS: () => sx, createSupabaseClient: () => sL, isBrowser: () => sP, parseCookies: () => s$, parseSupabaseCookie: () => sC, serializeCookie: () => sU, stringifySupabaseSession: () => sA }), new TextEncoder();
      let l = new TextDecoder(), u = (e10) => {
        let t10 = atob(e10), r10 = new Uint8Array(t10.length);
        for (let e11 = 0; e11 < t10.length; e11++) r10[e11] = t10.charCodeAt(e11);
        return r10;
      }, c = (e10) => {
        let t10 = e10;
        t10 instanceof Uint8Array && (t10 = l.decode(t10)), t10 = t10.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
        try {
          return u(t10);
        } catch (e11) {
          throw TypeError("The input to be decoded is not correctly encoded.");
        }
      }, h = Symbol.for("@supabase/supabase-js.traceContextExtractor");
      function d(e10, t10) {
        var r10 = {};
        for (var s2 in e10) Object.prototype.hasOwnProperty.call(e10, s2) && 0 > t10.indexOf(s2) && (r10[s2] = e10[s2]);
        if (null != e10 && "function" == typeof Object.getOwnPropertySymbols) for (var i2 = 0, s2 = Object.getOwnPropertySymbols(e10); i2 < s2.length; i2++) 0 > t10.indexOf(s2[i2]) && Object.prototype.propertyIsEnumerable.call(e10, s2[i2]) && (r10[s2[i2]] = e10[s2[i2]]);
        return r10;
      }
      Object.create, Object.create, "function" == typeof SuppressedError && SuppressedError;
      let p = (e10) => e10 ? (...t10) => e10(...t10) : (...e11) => fetch(...e11);
      class f extends Error {
        constructor(e10, t10 = "FunctionsError", r10) {
          super(e10), this.name = t10, this.context = r10;
        }
        toJSON() {
          return { name: this.name, message: this.message, context: this.context };
        }
      }
      class g extends f {
        constructor(e10) {
          super("Failed to send a request to the Edge Function", "FunctionsFetchError", e10);
        }
      }
      class m extends f {
        constructor(e10) {
          super("Relay Error invoking the Edge Function", "FunctionsRelayError", e10);
        }
      }
      class b extends f {
        constructor(e10) {
          super("Edge Function returned a non-2xx status code", "FunctionsHttpError", e10);
        }
      }
      !function(e10) {
        e10.Any = "any", e10.ApNortheast1 = "ap-northeast-1", e10.ApNortheast2 = "ap-northeast-2", e10.ApSouth1 = "ap-south-1", e10.ApSoutheast1 = "ap-southeast-1", e10.ApSoutheast2 = "ap-southeast-2", e10.CaCentral1 = "ca-central-1", e10.EuCentral1 = "eu-central-1", e10.EuWest1 = "eu-west-1", e10.EuWest2 = "eu-west-2", e10.EuWest3 = "eu-west-3", e10.SaEast1 = "sa-east-1", e10.UsEast1 = "us-east-1", e10.UsWest1 = "us-west-1", e10.UsWest2 = "us-west-2";
      }(S || (S = {}));
      class y {
        constructor(e10, { headers: t10 = {}, customFetch: r10, region: s2 = S.Any } = {}) {
          this.url = e10, this.headers = t10, this.region = s2, this.fetch = p(r10);
        }
        setAuth(e10) {
          this.headers.Authorization = `Bearer ${e10}`;
        }
        invoke(e10) {
          var t10, r10, s2, i2;
          return t10 = this, r10 = arguments, s2 = void 0, i2 = function* (e11, t11 = {}) {
            var r11, s3;
            let i3, n2, a2;
            try {
              let s4;
              let { headers: o2, method: l2, body: u2, signal: c2, timeout: h2 } = t11, d2 = {}, { region: p2 } = t11;
              p2 || (p2 = this.region);
              let f2 = new URL(`${this.url}/${e11}`);
              p2 && "any" !== p2 && (d2["x-region"] = p2, f2.searchParams.set("forceFunctionRegion", p2));
              let y2 = !!o2 && Object.keys(o2).some((e12) => "content-type" === e12.toLowerCase());
              u2 && !y2 ? "undefined" != typeof Blob && u2 instanceof Blob || u2 instanceof ArrayBuffer ? (d2["Content-Type"] = "application/octet-stream", s4 = u2) : "string" == typeof u2 ? (d2["Content-Type"] = "text/plain", s4 = u2) : "undefined" != typeof FormData && u2 instanceof FormData ? s4 = u2 : (d2["Content-Type"] = "application/json", s4 = JSON.stringify(u2)) : !u2 || "string" == typeof u2 || "undefined" != typeof Blob && u2 instanceof Blob || u2 instanceof ArrayBuffer || "undefined" != typeof FormData && u2 instanceof FormData ? s4 = u2 : s4 = JSON.stringify(u2);
              let w2 = c2;
              h2 && (n2 = new AbortController(), i3 = setTimeout(() => n2.abort(), h2), c2 ? (w2 = n2.signal, a2 = () => n2.abort(), c2.addEventListener("abort", a2)) : w2 = n2.signal);
              let v2 = yield this.fetch(f2.toString(), { method: l2 || "POST", headers: Object.assign(Object.assign(Object.assign({}, d2), this.headers), o2), body: s4, signal: w2 }).catch((e12) => {
                throw new g(e12);
              }), _2 = v2.headers.get("x-relay-error");
              if (_2 && "true" === _2) throw new m(v2);
              if (!v2.ok) throw new b(v2);
              let S2 = (null !== (r11 = v2.headers.get("Content-Type")) && void 0 !== r11 ? r11 : "text/plain").split(";")[0].trim().toLowerCase();
              return { data: "application/json" === S2 ? yield v2.json() : "application/octet-stream" === S2 || "application/pdf" === S2 ? yield v2.blob() : "text/event-stream" === S2 ? v2 : "multipart/form-data" === S2 ? yield v2.formData() : yield v2.text(), error: null, response: v2 };
            } catch (e12) {
              return { data: null, error: e12, response: e12 instanceof b || e12 instanceof m ? e12.context : void 0 };
            } finally {
              i3 && clearTimeout(i3), a2 && (null === (s3 = t11.signal) || void 0 === s3 || s3.removeEventListener("abort", a2));
            }
          }, new (s2 || (s2 = Promise))(function(e11, n2) {
            function a2(e12) {
              try {
                l2(i2.next(e12));
              } catch (e13) {
                n2(e13);
              }
            }
            function o2(e12) {
              try {
                l2(i2.throw(e12));
              } catch (e13) {
                n2(e13);
              }
            }
            function l2(t11) {
              var r11;
              t11.done ? e11(t11.value) : ((r11 = t11.value) instanceof s2 ? r11 : new s2(function(e12) {
                e12(r11);
              })).then(a2, o2);
            }
            l2((i2 = i2.apply(t10, r10 || [])).next());
          });
        }
      }
      let w = (e10) => Math.min(1e3 * 2 ** e10, 3e4), v = [520, 503], _ = ["GET", "HEAD", "OPTIONS"];
      var S, k, T, E, O, R, C, A, P = class extends Error {
        constructor(e10) {
          super(e10.message), this.name = "PostgrestError", this.details = e10.details, this.hint = e10.hint, this.code = e10.code;
        }
        toJSON() {
          return { name: this.name, message: this.message, details: this.details, hint: this.hint, code: this.code };
        }
      };
      function x(e10) {
        return (x = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e11) {
          return typeof e11;
        } : function(e11) {
          return e11 && "function" == typeof Symbol && e11.constructor === Symbol && e11 !== Symbol.prototype ? "symbol" : typeof e11;
        })(e10);
      }
      function I(e10, t10) {
        var r10 = Object.keys(e10);
        if (Object.getOwnPropertySymbols) {
          var s2 = Object.getOwnPropertySymbols(e10);
          t10 && (s2 = s2.filter(function(t11) {
            return Object.getOwnPropertyDescriptor(e10, t11).enumerable;
          })), r10.push.apply(r10, s2);
        }
        return r10;
      }
      function j(e10) {
        for (var t10 = 1; t10 < arguments.length; t10++) {
          var r10 = null != arguments[t10] ? arguments[t10] : {};
          t10 % 2 ? I(Object(r10), true).forEach(function(t11) {
            !function(e11, t12, r11) {
              var s2;
              (s2 = function(e12, t13) {
                if ("object" != x(e12) || !e12) return e12;
                var r12 = e12[Symbol.toPrimitive];
                if (void 0 !== r12) {
                  var s3 = r12.call(e12, t13 || "default");
                  if ("object" != x(s3)) return s3;
                  throw TypeError("@@toPrimitive must return a primitive value.");
                }
                return ("string" === t13 ? String : Number)(e12);
              }(t12, "string"), (t12 = "symbol" == x(s2) ? s2 : s2 + "") in e11) ? Object.defineProperty(e11, t12, { value: r11, enumerable: true, configurable: true, writable: true }) : e11[t12] = r11;
            }(e10, t11, r10[t11]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e10, Object.getOwnPropertyDescriptors(r10)) : I(Object(r10)).forEach(function(t11) {
            Object.defineProperty(e10, t11, Object.getOwnPropertyDescriptor(r10, t11));
          });
        }
        return e10;
      }
      function N(e10, t10) {
        return new Promise((r10) => {
          if (null == t10 ? void 0 : t10.aborted) {
            r10();
            return;
          }
          let s2 = setTimeout(() => {
            null == t10 || t10.removeEventListener("abort", i2), r10();
          }, e10);
          function i2() {
            clearTimeout(s2), r10();
          }
          null == t10 || t10.addEventListener("abort", i2);
        });
      }
      var L = class {
        constructor(e10) {
          var t10, r10, s2, i2, n2;
          this.shouldThrowOnError = false, this.retryEnabled = true, this.method = e10.method, this.url = e10.url, this.headers = new Headers(e10.headers), this.schema = e10.schema, this.body = e10.body, this.shouldThrowOnError = null !== (t10 = e10.shouldThrowOnError) && void 0 !== t10 && t10, this.signal = e10.signal, this.isMaybeSingle = null !== (r10 = e10.isMaybeSingle) && void 0 !== r10 && r10, this.shouldStripNulls = null !== (s2 = e10.shouldStripNulls) && void 0 !== s2 && s2, this.urlLengthLimit = null !== (i2 = e10.urlLengthLimit) && void 0 !== i2 ? i2 : 8e3, this.retryEnabled = null === (n2 = e10.retry) || void 0 === n2 || n2, e10.fetch ? this.fetch = e10.fetch : this.fetch = fetch;
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        stripNulls() {
          if ("text/csv" === this.headers.get("Accept")) throw Error("stripNulls() cannot be used with csv()");
          return this.shouldStripNulls = true, this;
        }
        setHeader(e10, t10) {
          return this.headers = new Headers(this.headers), this.headers.set(e10, t10), this;
        }
        retry(e10) {
          return this.retryEnabled = e10, this;
        }
        then(e10, t10) {
          var r10 = this;
          if (void 0 === this.schema || (["GET", "HEAD"].includes(this.method) ? this.headers.set("Accept-Profile", this.schema) : this.headers.set("Content-Profile", this.schema)), "GET" !== this.method && "HEAD" !== this.method && this.headers.set("Content-Type", "application/json"), this.shouldStripNulls) {
            let e11 = this.headers.get("Accept");
            "application/vnd.pgrst.object+json" === e11 ? this.headers.set("Accept", "application/vnd.pgrst.object+json;nulls=stripped") : e11 && "application/json" !== e11 || this.headers.set("Accept", "application/vnd.pgrst.array+json;nulls=stripped");
          }
          let s2 = this.fetch, i2 = (async () => {
            let e11 = 0;
            for (; ; ) {
              var t11, i3, n2, a2, o2;
              let l2;
              let u2 = {};
              r10.headers.forEach((e12, t12) => {
                u2[t12] = e12;
              }), e11 > 0 && (u2["X-Retry-Count"] = String(e11));
              try {
                l2 = await s2(r10.url.toString(), { method: r10.method, headers: u2, body: JSON.stringify(r10.body, (e12, t12) => "bigint" == typeof t12 ? t12.toString() : t12), signal: r10.signal });
              } catch (t12) {
                if ((null == t12 ? void 0 : t12.name) === "AbortError" || (null == t12 ? void 0 : t12.code) === "ABORT_ERR" || !_.includes(r10.method)) throw t12;
                if (r10.retryEnabled && e11 < 3) {
                  let t13 = w(e11);
                  e11++, await N(t13, r10.signal);
                  continue;
                }
                throw t12;
              }
              if (t11 = r10.method, i3 = l2.status, n2 = e11, r10.retryEnabled && !(n2 >= 3) && _.includes(t11) && v.includes(i3)) {
                let t12 = null !== (a2 = null === (o2 = l2.headers) || void 0 === o2 ? void 0 : o2.get("Retry-After")) && void 0 !== a2 ? a2 : null, s3 = null !== t12 ? 1e3 * Math.max(0, parseInt(t12, 10) || 0) : w(e11);
                await l2.text(), e11++, await N(s3, r10.signal);
                continue;
              }
              return await r10.processResponse(l2);
            }
          })();
          return this.shouldThrowOnError || (i2 = i2.catch((e11) => {
            var t11, r11, s3, i3, n2, a2;
            let o2 = "", l2 = "", u2 = "", c2 = null == e11 ? void 0 : e11.cause;
            if (c2) {
              let t12 = null !== (r11 = null == c2 ? void 0 : c2.message) && void 0 !== r11 ? r11 : "", a3 = null !== (s3 = null == c2 ? void 0 : c2.code) && void 0 !== s3 ? s3 : "";
              o2 = `${null !== (i3 = null == e11 ? void 0 : e11.name) && void 0 !== i3 ? i3 : "FetchError"}: ${null == e11 ? void 0 : e11.message}

Caused by: ${null !== (n2 = null == c2 ? void 0 : c2.name) && void 0 !== n2 ? n2 : "Error"}: ${t12}`, a3 && (o2 += ` (${a3})`), (null == c2 ? void 0 : c2.stack) && (o2 += `
${c2.stack}`);
            } else o2 = null !== (a2 = null == e11 ? void 0 : e11.stack) && void 0 !== a2 ? a2 : "";
            let h2 = this.url.toString().length;
            return (null == e11 ? void 0 : e11.name) === "AbortError" || (null == e11 ? void 0 : e11.code) === "ABORT_ERR" ? (u2 = "", l2 = "Request was aborted (timeout or manual cancellation)", h2 > this.urlLengthLimit && (l2 += `. Note: Your request URL is ${h2} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)) : ((null == c2 ? void 0 : c2.name) === "HeadersOverflowError" || (null == c2 ? void 0 : c2.code) === "UND_ERR_HEADERS_OVERFLOW") && (u2 = "", l2 = "HTTP headers exceeded server limits (typically 16KB)", h2 > this.urlLengthLimit && (l2 += `. Your request URL is ${h2} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)), { success: false, error: { message: `${null !== (t11 = null == e11 ? void 0 : e11.name) && void 0 !== t11 ? t11 : "FetchError"}: ${null == e11 ? void 0 : e11.message}`, details: o2, hint: l2, code: u2 }, data: null, count: null, status: 0, statusText: "" };
          })), i2.then(e10, t10);
        }
        async processResponse(e10) {
          var t10, r10, s2, i2;
          let n2 = null, a2 = null, o2 = null, l2 = e10.status, u2 = e10.statusText;
          if (e10.ok) {
            if ("HEAD" !== this.method) {
              let t11 = await e10.text();
              if ("" === t11) ;
              else if ("text/csv" === this.headers.get("Accept")) a2 = t11;
              else if (this.headers.get("Accept") && (null === (s2 = this.headers.get("Accept")) || void 0 === s2 ? void 0 : s2.includes("application/vnd.pgrst.plan+text"))) a2 = t11;
              else try {
                a2 = JSON.parse(t11);
              } catch (e11) {
                if (n2 = { message: t11 }, a2 = null, this.shouldThrowOnError) throw new P({ message: t11, details: "", hint: "", code: "" });
              }
            }
            let c2 = null === (t10 = this.headers.get("Prefer")) || void 0 === t10 ? void 0 : t10.match(/count=(exact|planned|estimated)/), h2 = null === (r10 = e10.headers.get("content-range")) || void 0 === r10 ? void 0 : r10.split("/");
            if (c2 && h2 && h2.length > 1 && (o2 = parseInt(h2[1])), this.isMaybeSingle && Array.isArray(a2)) {
              if (a2.length > 1) {
                if (n2 = { code: "PGRST116", details: `Results contain ${a2.length} rows, application/vnd.pgrst.object+json requires 1 row`, hint: null, message: "JSON object requested, multiple (or no) rows returned" }, a2 = null, o2 = null, l2 = 406, u2 = "Not Acceptable", this.shouldThrowOnError) throw new P(j(j({}, n2), {}, { hint: null !== (i2 = n2.hint) && void 0 !== i2 ? i2 : "" }));
              } else a2 = 1 === a2.length ? a2[0] : null;
            }
          } else {
            let t11 = await e10.text();
            try {
              n2 = JSON.parse(t11), Array.isArray(n2) && 404 === e10.status && (a2 = [], n2 = null, l2 = 200, u2 = "OK");
            } catch (r11) {
              404 === e10.status && "" === t11 ? (l2 = 204, u2 = "No Content") : n2 = { message: t11 };
            }
            if (n2 && this.shouldThrowOnError) throw new P(n2);
          }
          return { success: null === n2, error: n2, data: a2, count: o2, status: l2, statusText: u2 };
        }
        returns() {
          return this;
        }
        overrideTypes() {
          return this;
        }
      }, $ = class extends L {
        throwOnError() {
          return super.throwOnError();
        }
        select(e10) {
          let t10 = false, r10 = (null != e10 ? e10 : "*").split("").map((e11) => /\s/.test(e11) && !t10 ? "" : ('"' === e11 && (t10 = !t10), e11)).join("");
          return this.url.searchParams.set("select", r10), this.headers.append("Prefer", "return=representation"), this;
        }
        order(e10, { ascending: t10 = true, nullsFirst: r10, foreignTable: s2, referencedTable: i2 = s2 } = {}) {
          let n2 = i2 ? `${i2}.order` : "order", a2 = this.url.searchParams.get(n2);
          return this.url.searchParams.set(n2, `${a2 ? `${a2},` : ""}${e10}.${t10 ? "asc" : "desc"}${void 0 === r10 ? "" : r10 ? ".nullsfirst" : ".nullslast"}`), this;
        }
        limit(e10, { foreignTable: t10, referencedTable: r10 = t10 } = {}) {
          let s2 = void 0 === r10 ? "limit" : `${r10}.limit`;
          return this.url.searchParams.set(s2, `${e10}`), this;
        }
        range(e10, t10, { foreignTable: r10, referencedTable: s2 = r10 } = {}) {
          let i2 = void 0 === s2 ? "offset" : `${s2}.offset`, n2 = void 0 === s2 ? "limit" : `${s2}.limit`;
          return this.url.searchParams.set(i2, `${e10}`), this.url.searchParams.set(n2, `${t10 - e10 + 1}`), this;
        }
        abortSignal(e10) {
          return this.signal = e10, this;
        }
        single() {
          return this.headers.set("Accept", "application/vnd.pgrst.object+json"), this;
        }
        maybeSingle() {
          return this.isMaybeSingle = true, this;
        }
        csv() {
          return this.headers.set("Accept", "text/csv"), this;
        }
        geojson() {
          return this.headers.set("Accept", "application/geo+json"), this;
        }
        explain({ analyze: e10 = false, verbose: t10 = false, settings: r10 = false, buffers: s2 = false, wal: i2 = false, format: n2 = "text" } = {}) {
          var a2;
          let o2 = [e10 ? "analyze" : null, t10 ? "verbose" : null, r10 ? "settings" : null, s2 ? "buffers" : null, i2 ? "wal" : null].filter(Boolean).join("|"), l2 = null !== (a2 = this.headers.get("Accept")) && void 0 !== a2 ? a2 : "application/json";
          return this.headers.set("Accept", `application/vnd.pgrst.plan+${n2}; for="${l2}"; options=${o2};`), this;
        }
        rollback() {
          return this.headers.append("Prefer", "tx=rollback"), this;
        }
        returns() {
          return this;
        }
        maxAffected(e10) {
          return this.headers.append("Prefer", "handling=strict"), this.headers.append("Prefer", `max-affected=${e10}`), this;
        }
      };
      let U = RegExp("[,()]");
      var D = class extends $ {
        throwOnError() {
          return super.throwOnError();
        }
        eq(e10, t10) {
          return this.url.searchParams.append(e10, `eq.${t10}`), this;
        }
        neq(e10, t10) {
          return this.url.searchParams.append(e10, `neq.${t10}`), this;
        }
        gt(e10, t10) {
          return this.url.searchParams.append(e10, `gt.${t10}`), this;
        }
        gte(e10, t10) {
          return this.url.searchParams.append(e10, `gte.${t10}`), this;
        }
        lt(e10, t10) {
          return this.url.searchParams.append(e10, `lt.${t10}`), this;
        }
        lte(e10, t10) {
          return this.url.searchParams.append(e10, `lte.${t10}`), this;
        }
        like(e10, t10) {
          return this.url.searchParams.append(e10, `like.${t10}`), this;
        }
        likeAllOf(e10, t10) {
          return this.url.searchParams.append(e10, `like(all).{${t10.join(",")}}`), this;
        }
        likeAnyOf(e10, t10) {
          return this.url.searchParams.append(e10, `like(any).{${t10.join(",")}}`), this;
        }
        ilike(e10, t10) {
          return this.url.searchParams.append(e10, `ilike.${t10}`), this;
        }
        ilikeAllOf(e10, t10) {
          return this.url.searchParams.append(e10, `ilike(all).{${t10.join(",")}}`), this;
        }
        ilikeAnyOf(e10, t10) {
          return this.url.searchParams.append(e10, `ilike(any).{${t10.join(",")}}`), this;
        }
        regexMatch(e10, t10) {
          return this.url.searchParams.append(e10, `match.${t10}`), this;
        }
        regexIMatch(e10, t10) {
          return this.url.searchParams.append(e10, `imatch.${t10}`), this;
        }
        is(e10, t10) {
          return this.url.searchParams.append(e10, `is.${t10}`), this;
        }
        isDistinct(e10, t10) {
          return this.url.searchParams.append(e10, `isdistinct.${t10}`), this;
        }
        in(e10, t10) {
          let r10 = Array.from(new Set(t10)).map((e11) => "string" == typeof e11 && U.test(e11) ? `"${e11}"` : `${e11}`).join(",");
          return this.url.searchParams.append(e10, `in.(${r10})`), this;
        }
        notIn(e10, t10) {
          let r10 = Array.from(new Set(t10)).map((e11) => "string" == typeof e11 && U.test(e11) ? `"${e11}"` : `${e11}`).join(",");
          return this.url.searchParams.append(e10, `not.in.(${r10})`), this;
        }
        contains(e10, t10) {
          return "string" == typeof t10 ? this.url.searchParams.append(e10, `cs.${t10}`) : Array.isArray(t10) ? this.url.searchParams.append(e10, `cs.{${t10.join(",")}}`) : this.url.searchParams.append(e10, `cs.${JSON.stringify(t10)}`), this;
        }
        containedBy(e10, t10) {
          return "string" == typeof t10 ? this.url.searchParams.append(e10, `cd.${t10}`) : Array.isArray(t10) ? this.url.searchParams.append(e10, `cd.{${t10.join(",")}}`) : this.url.searchParams.append(e10, `cd.${JSON.stringify(t10)}`), this;
        }
        rangeGt(e10, t10) {
          return this.url.searchParams.append(e10, `sr.${t10}`), this;
        }
        rangeGte(e10, t10) {
          return this.url.searchParams.append(e10, `nxl.${t10}`), this;
        }
        rangeLt(e10, t10) {
          return this.url.searchParams.append(e10, `sl.${t10}`), this;
        }
        rangeLte(e10, t10) {
          return this.url.searchParams.append(e10, `nxr.${t10}`), this;
        }
        rangeAdjacent(e10, t10) {
          return this.url.searchParams.append(e10, `adj.${t10}`), this;
        }
        overlaps(e10, t10) {
          return "string" == typeof t10 ? this.url.searchParams.append(e10, `ov.${t10}`) : this.url.searchParams.append(e10, `ov.{${t10.join(",")}}`), this;
        }
        textSearch(e10, t10, { config: r10, type: s2 } = {}) {
          let i2 = "";
          "plain" === s2 ? i2 = "pl" : "phrase" === s2 ? i2 = "ph" : "websearch" === s2 && (i2 = "w");
          let n2 = void 0 === r10 ? "" : `(${r10})`;
          return this.url.searchParams.append(e10, `${i2}fts${n2}.${t10}`), this;
        }
        match(e10) {
          return Object.entries(e10).filter(([e11, t10]) => void 0 !== t10).forEach(([e11, t10]) => {
            this.url.searchParams.append(e11, `eq.${t10}`);
          }), this;
        }
        not(e10, t10, r10) {
          return this.url.searchParams.append(e10, `not.${t10}.${r10}`), this;
        }
        or(e10, { foreignTable: t10, referencedTable: r10 = t10 } = {}) {
          let s2 = r10 ? `${r10}.or` : "or";
          return this.url.searchParams.append(s2, `(${e10})`), this;
        }
        filter(e10, t10, r10) {
          return this.url.searchParams.append(e10, `${t10}.${r10}`), this;
        }
      }, M = class {
        constructor(e10, { headers: t10 = {}, schema: r10, fetch: s2, urlLengthLimit: i2 = 8e3, retry: n2 }) {
          this.url = e10, this.headers = new Headers(t10), this.schema = r10, this.fetch = s2, this.urlLengthLimit = i2, this.retry = n2;
        }
        cloneRequestState() {
          return { url: new URL(this.url.toString()), headers: new Headers(this.headers) };
        }
        select(e10, t10) {
          let { head: r10 = false, count: s2 } = null != t10 ? t10 : {}, i2 = false, n2 = (null != e10 ? e10 : "*").split("").map((e11) => /\s/.test(e11) && !i2 ? "" : ('"' === e11 && (i2 = !i2), e11)).join(""), { url: a2, headers: o2 } = this.cloneRequestState();
          return a2.searchParams.set("select", n2), s2 && o2.append("Prefer", `count=${s2}`), new D({ method: r10 ? "HEAD" : "GET", url: a2, headers: o2, schema: this.schema, fetch: this.fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
        }
        insert(e10, { count: t10, defaultToNull: r10 = true } = {}) {
          var s2;
          let { url: i2, headers: n2 } = this.cloneRequestState();
          if (t10 && n2.append("Prefer", `count=${t10}`), r10 || n2.append("Prefer", "missing=default"), Array.isArray(e10)) {
            let t11 = e10.reduce((e11, t12) => e11.concat(Object.keys(t12)), []);
            if (t11.length > 0) {
              let e11 = [...new Set(t11)].map((e12) => `"${e12}"`);
              i2.searchParams.set("columns", e11.join(","));
            }
          }
          return new D({ method: "POST", url: i2, headers: n2, schema: this.schema, body: e10, fetch: null !== (s2 = this.fetch) && void 0 !== s2 ? s2 : fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
        }
        upsert(e10, { onConflict: t10, ignoreDuplicates: r10 = false, count: s2, defaultToNull: i2 = true } = {}) {
          var n2;
          let { url: a2, headers: o2 } = this.cloneRequestState();
          if (o2.append("Prefer", `resolution=${r10 ? "ignore" : "merge"}-duplicates`), void 0 !== t10 && a2.searchParams.set("on_conflict", t10), s2 && o2.append("Prefer", `count=${s2}`), i2 || o2.append("Prefer", "missing=default"), Array.isArray(e10)) {
            let t11 = e10.reduce((e11, t12) => e11.concat(Object.keys(t12)), []);
            if (t11.length > 0) {
              let e11 = [...new Set(t11)].map((e12) => `"${e12}"`);
              a2.searchParams.set("columns", e11.join(","));
            }
          }
          return new D({ method: "POST", url: a2, headers: o2, schema: this.schema, body: e10, fetch: null !== (n2 = this.fetch) && void 0 !== n2 ? n2 : fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
        }
        update(e10, { count: t10 } = {}) {
          var r10;
          let { url: s2, headers: i2 } = this.cloneRequestState();
          return t10 && i2.append("Prefer", `count=${t10}`), new D({ method: "PATCH", url: s2, headers: i2, schema: this.schema, body: e10, fetch: null !== (r10 = this.fetch) && void 0 !== r10 ? r10 : fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
        }
        delete({ count: e10 } = {}) {
          var t10;
          let { url: r10, headers: s2 } = this.cloneRequestState();
          return e10 && s2.append("Prefer", `count=${e10}`), new D({ method: "DELETE", url: r10, headers: s2, schema: this.schema, fetch: null !== (t10 = this.fetch) && void 0 !== t10 ? t10 : fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
        }
      }, B = class e10 {
        constructor(e11, { headers: t10 = {}, schema: r10, fetch: s2, timeout: i2, urlLengthLimit: n2 = 8e3, retry: a2 } = {}) {
          this.url = e11, this.headers = new Headers(t10), this.schemaName = r10, this.urlLengthLimit = n2;
          let o2 = null != s2 ? s2 : globalThis.fetch;
          void 0 !== i2 && i2 > 0 ? this.fetch = (e12, t11) => {
            let r11 = new AbortController(), s3 = setTimeout(() => r11.abort(), i2), n3 = null == t11 ? void 0 : t11.signal;
            if (n3) {
              if (n3.aborted) return clearTimeout(s3), o2(e12, t11);
              let i3 = () => {
                clearTimeout(s3), r11.abort();
              };
              return n3.addEventListener("abort", i3, { once: true }), o2(e12, j(j({}, t11), {}, { signal: r11.signal })).finally(() => {
                clearTimeout(s3), n3.removeEventListener("abort", i3);
              });
            }
            return o2(e12, j(j({}, t11), {}, { signal: r11.signal })).finally(() => clearTimeout(s3));
          } : this.fetch = o2, this.retry = a2;
        }
        from(e11) {
          if (!e11 || "string" != typeof e11 || "" === e11.trim()) throw Error("Invalid relation name: relation must be a non-empty string.");
          return new M(new URL(`${this.url}/${e11}`), { headers: new Headers(this.headers), schema: this.schemaName, fetch: this.fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
        }
        schema(t10) {
          return new e10(this.url, { headers: this.headers, schema: t10, fetch: this.fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
        }
        rpc(e11, t10 = {}, { head: r10 = false, get: s2 = false, count: i2 } = {}) {
          var n2;
          let a2, o2;
          let l2 = new URL(`${this.url}/rpc/${e11}`), u2 = (e12) => null !== e12 && "object" == typeof e12 && (!Array.isArray(e12) || e12.some(u2)), c2 = r10 && Object.values(t10).some(u2);
          c2 ? (a2 = "POST", o2 = t10) : r10 || s2 ? (a2 = r10 ? "HEAD" : "GET", Object.entries(t10).filter(([e12, t11]) => void 0 !== t11).map(([e12, t11]) => [e12, Array.isArray(t11) ? `{${t11.join(",")}}` : `${t11}`]).forEach(([e12, t11]) => {
            l2.searchParams.append(e12, t11);
          })) : (a2 = "POST", o2 = t10);
          let h2 = new Headers(this.headers);
          return c2 ? h2.set("Prefer", i2 ? `count=${i2},return=minimal` : "return=minimal") : i2 && h2.set("Prefer", `count=${i2}`), new D({ method: a2, url: l2, headers: h2, schema: this.schemaName, body: o2, fetch: null !== (n2 = this.fetch) && void 0 !== n2 ? n2 : fetch, urlLengthLimit: this.urlLengthLimit, retry: this.retry });
        }
      };
      class q {
        constructor() {
        }
        static detectEnvironment() {
          var e10;
          if ("undefined" != typeof WebSocket) return { type: "native", wsConstructor: WebSocket };
          let t10 = globalThis;
          if ("undefined" != typeof globalThis && void 0 !== t10.WebSocket) return { type: "native", wsConstructor: t10.WebSocket };
          let s2 = void 0 !== r.g ? r.g : void 0;
          if (s2 && void 0 !== s2.WebSocket) return { type: "native", wsConstructor: s2.WebSocket };
          if ("undefined" != typeof globalThis && void 0 !== t10.WebSocketPair && void 0 === globalThis.WebSocket) return { type: "cloudflare", error: "Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.", workaround: "Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime." };
          if ("undefined" != typeof globalThis && t10.EdgeRuntime || "undefined" != typeof navigator && (null === (e10 = navigator.userAgent) || void 0 === e10 ? void 0 : e10.includes("Vercel-Edge"))) return { type: "unsupported", error: "Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.", workaround: "Use serverless functions or a different deployment target for WebSocket functionality." };
          let i2 = globalThis.process;
          if (i2) {
            let e11 = i2.versions;
            if (e11 && e11.node) return { type: "unsupported", error: "Node.js detected but native WebSocket not found.", workaround: "Ensure you are running Node.js 22+ or provide a WebSocket implementation via the transport option." };
          }
          return { type: "unsupported", error: "Unknown JavaScript runtime without WebSocket support.", workaround: "Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation." };
        }
        static getWebSocketConstructor() {
          let e10 = this.detectEnvironment();
          if (e10.wsConstructor) return e10.wsConstructor;
          let t10 = e10.error || "WebSocket not supported in this environment.";
          throw e10.workaround && (t10 += `

Suggested solution: ${e10.workaround}`), Error(t10);
        }
        static isWebSocketSupported() {
          try {
            let e10 = this.detectEnvironment();
            return "native" === e10.type;
          } catch (e10) {
            return false;
          }
        }
      }
      let F = "2.0.0", H = { closed: "closed", errored: "errored", joined: "joined", joining: "joining", leaving: "leaving" }, V = { close: "phx_close", error: "phx_error", join: "phx_join", reply: "phx_reply", leave: "phx_leave", access_token: "access_token" }, W = { connecting: "connecting", closing: "closing", closed: "closed" };
      class z {
        constructor(e10) {
          this.HEADER_LENGTH = 1, this.USER_BROADCAST_PUSH_META_LENGTH = 6, this.KINDS = { userBroadcastPush: 3, userBroadcast: 4 }, this.BINARY_ENCODING = 0, this.JSON_ENCODING = 1, this.BROADCAST_EVENT = "broadcast", this.allowedMetadataKeys = [], this.allowedMetadataKeys = null != e10 ? e10 : [];
        }
        encode(e10, t10) {
          return e10.event !== this.BROADCAST_EVENT || e10.payload instanceof ArrayBuffer || "string" != typeof e10.payload.event ? t10(JSON.stringify([e10.join_ref, e10.ref, e10.topic, e10.event, e10.payload])) : t10(this._binaryEncodeUserBroadcastPush(e10));
        }
        _binaryEncodeUserBroadcastPush(e10) {
          var t10;
          return this._isArrayBuffer(null === (t10 = e10.payload) || void 0 === t10 ? void 0 : t10.payload) ? this._encodeBinaryUserBroadcastPush(e10) : this._encodeJsonUserBroadcastPush(e10);
        }
        _encodeBinaryUserBroadcastPush(e10) {
          var t10, r10;
          let s2 = null !== (r10 = null === (t10 = e10.payload) || void 0 === t10 ? void 0 : t10.payload) && void 0 !== r10 ? r10 : new ArrayBuffer(0);
          return this._encodeUserBroadcastPush(e10, this.BINARY_ENCODING, s2);
        }
        _encodeJsonUserBroadcastPush(e10) {
          var t10, r10;
          let s2 = null !== (r10 = null === (t10 = e10.payload) || void 0 === t10 ? void 0 : t10.payload) && void 0 !== r10 ? r10 : {}, i2 = new TextEncoder().encode(JSON.stringify(s2)).buffer;
          return this._encodeUserBroadcastPush(e10, this.JSON_ENCODING, i2);
        }
        _encodeUserBroadcastPush(e10, t10, r10) {
          let s2 = new TextEncoder(), i2 = s2.encode(e10.topic), n2 = s2.encode(null !== (g2 = e10.ref) && void 0 !== g2 ? g2 : ""), a2 = s2.encode(null !== (m2 = e10.join_ref) && void 0 !== m2 ? m2 : ""), o2 = s2.encode(e10.payload.event), l2 = this.allowedMetadataKeys ? this._pick(e10.payload, this.allowedMetadataKeys) : {}, u2 = s2.encode(0 === Object.keys(l2).length ? "" : JSON.stringify(l2));
          if (a2.length > 255) throw Error(`joinRef length ${a2.length} exceeds maximum of 255`);
          if (n2.length > 255) throw Error(`ref length ${n2.length} exceeds maximum of 255`);
          if (i2.length > 255) throw Error(`topic length ${i2.length} exceeds maximum of 255`);
          if (o2.length > 255) throw Error(`userEvent length ${o2.length} exceeds maximum of 255`);
          if (u2.length > 255) throw Error(`metadata length ${u2.length} exceeds maximum of 255`);
          let c2 = this.USER_BROADCAST_PUSH_META_LENGTH + a2.length + n2.length + i2.length + o2.length + u2.length, h2 = new ArrayBuffer(this.HEADER_LENGTH + c2), d2 = new DataView(h2), p2 = new Uint8Array(h2), f2 = 0;
          d2.setUint8(f2++, this.KINDS.userBroadcastPush), d2.setUint8(f2++, a2.length), d2.setUint8(f2++, n2.length), d2.setUint8(f2++, i2.length), d2.setUint8(f2++, o2.length), d2.setUint8(f2++, u2.length), d2.setUint8(f2++, t10), p2.set(a2, f2), f2 += a2.length, p2.set(n2, f2), f2 += n2.length, p2.set(i2, f2), f2 += i2.length, p2.set(o2, f2), f2 += o2.length, p2.set(u2, f2), f2 += u2.length;
          var g2, m2, b2 = new Uint8Array(h2.byteLength + r10.byteLength);
          return b2.set(new Uint8Array(h2), 0), b2.set(new Uint8Array(r10), h2.byteLength), b2.buffer;
        }
        decode(e10, t10) {
          if (this._isArrayBuffer(e10)) return t10(this._binaryDecode(e10));
          if ("string" == typeof e10) {
            let [r10, s2, i2, n2, a2] = JSON.parse(e10);
            return t10({ join_ref: r10, ref: s2, topic: i2, event: n2, payload: a2 });
          }
          return t10({});
        }
        _binaryDecode(e10) {
          let t10 = new DataView(e10), r10 = t10.getUint8(0), s2 = new TextDecoder();
          if (r10 === this.KINDS.userBroadcast) return this._decodeUserBroadcast(e10, t10, s2);
        }
        _decodeUserBroadcast(e10, t10, r10) {
          let s2 = t10.getUint8(1), i2 = t10.getUint8(2), n2 = t10.getUint8(3), a2 = t10.getUint8(4), o2 = this.HEADER_LENGTH + 4, l2 = r10.decode(e10.slice(o2, o2 + s2));
          o2 += s2;
          let u2 = r10.decode(e10.slice(o2, o2 + i2));
          o2 += i2;
          let c2 = r10.decode(e10.slice(o2, o2 + n2));
          o2 += n2;
          let h2 = e10.slice(o2, e10.byteLength), d2 = a2 === this.JSON_ENCODING ? JSON.parse(r10.decode(h2)) : h2, p2 = { type: this.BROADCAST_EVENT, event: u2, payload: d2 };
          return n2 > 0 && (p2.meta = JSON.parse(c2)), { join_ref: null, ref: null, topic: l2, event: this.BROADCAST_EVENT, payload: p2 };
        }
        _isArrayBuffer(e10) {
          var t10;
          return e10 instanceof ArrayBuffer || (null === (t10 = null == e10 ? void 0 : e10.constructor) || void 0 === t10 ? void 0 : t10.name) === "ArrayBuffer";
        }
        _pick(e10, t10) {
          return e10 && "object" == typeof e10 ? Object.fromEntries(Object.entries(e10).filter(([e11]) => t10.includes(e11))) : {};
        }
      }
      !function(e10) {
        e10.abstime = "abstime", e10.bool = "bool", e10.date = "date", e10.daterange = "daterange", e10.float4 = "float4", e10.float8 = "float8", e10.int2 = "int2", e10.int4 = "int4", e10.int4range = "int4range", e10.int8 = "int8", e10.int8range = "int8range", e10.json = "json", e10.jsonb = "jsonb", e10.money = "money", e10.numeric = "numeric", e10.oid = "oid", e10.reltime = "reltime", e10.text = "text", e10.time = "time", e10.timestamp = "timestamp", e10.timestamptz = "timestamptz", e10.timetz = "timetz", e10.tsrange = "tsrange", e10.tstzrange = "tstzrange";
      }(k || (k = {}));
      let J = (e10, t10, r10 = {}) => {
        var s2;
        let i2 = null !== (s2 = r10.skipTypes) && void 0 !== s2 ? s2 : [];
        return t10 ? Object.keys(t10).reduce((r11, s3) => (r11[s3] = G(s3, e10, t10, i2), r11), {}) : {};
      }, G = (e10, t10, r10, s2) => {
        let i2 = t10.find((t11) => t11.name === e10), n2 = null == i2 ? void 0 : i2.type, a2 = r10[e10];
        return n2 && !s2.includes(n2) ? K(n2, a2) : X(a2);
      }, K = (e10, t10) => {
        if ("_" === e10.charAt(0)) return ee(t10, e10.slice(1, e10.length));
        switch (e10) {
          case k.bool:
            return Y(t10);
          case k.float4:
          case k.float8:
          case k.int2:
          case k.int4:
          case k.int8:
          case k.numeric:
          case k.oid:
            return Z(t10);
          case k.json:
          case k.jsonb:
            return Q(t10);
          case k.timestamp:
            return et(t10);
          case k.abstime:
          case k.date:
          case k.daterange:
          case k.int4range:
          case k.int8range:
          case k.money:
          case k.reltime:
          case k.text:
          case k.time:
          case k.timestamptz:
          case k.timetz:
          case k.tsrange:
          case k.tstzrange:
          default:
            return X(t10);
        }
      }, X = (e10) => e10, Y = (e10) => {
        switch (e10) {
          case "t":
            return true;
          case "f":
            return false;
          default:
            return e10;
        }
      }, Z = (e10) => {
        if ("string" == typeof e10) {
          let t10 = parseFloat(e10);
          if (!Number.isNaN(t10)) return t10;
        }
        return e10;
      }, Q = (e10) => {
        if ("string" == typeof e10) try {
          return JSON.parse(e10);
        } catch (e11) {
        }
        return e10;
      }, ee = (e10, t10) => {
        if ("string" != typeof e10) return e10;
        let r10 = e10.length - 1, s2 = e10[r10];
        if ("{" === e10[0] && "}" === s2) {
          let s3;
          let i2 = e10.slice(1, r10);
          try {
            s3 = JSON.parse("[" + i2 + "]");
          } catch (e11) {
            s3 = i2 ? i2.split(",") : [];
          }
          return s3.map((e11) => K(t10, e11));
        }
        return e10;
      }, et = (e10) => "string" == typeof e10 ? e10.replace(" ", "T") : e10, er = (e10) => {
        let t10 = new URL(e10);
        return t10.protocol = t10.protocol.replace(/^ws/i, "http"), t10.pathname = t10.pathname.replace(/\/+$/, "").replace(/\/socket\/websocket$/i, "").replace(/\/socket$/i, "").replace(/\/websocket$/i, ""), "" === t10.pathname || "/" === t10.pathname ? t10.pathname = "/api/broadcast" : t10.pathname = t10.pathname + "/api/broadcast", t10.href;
      };
      var es = (e10) => "function" == typeof e10 ? e10 : function() {
        return e10;
      }, ei = "undefined" != typeof window ? window : null, en = ("undefined" != typeof self ? self : null) || ei || globalThis, ea = { connecting: 0, open: 1, closing: 2, closed: 3 }, eo = { closed: "closed", errored: "errored", joined: "joined", joining: "joining", leaving: "leaving" }, el = { close: "phx_close", error: "phx_error", join: "phx_join", reply: "phx_reply", leave: "phx_leave" }, eu = { longpoll: "longpoll", websocket: "websocket" }, ec = { complete: 4 }, eh = "base64url.bearer.phx.", ed = class {
        constructor(e10, t10, r10, s2) {
          this.channel = e10, this.event = t10, this.payload = r10 || function() {
            return {};
          }, this.receivedResp = null, this.timeout = s2, this.timeoutTimer = null, this.recHooks = [], this.sent = false, this.ref = void 0;
        }
        resend(e10) {
          this.timeout = e10, this.reset(), this.send();
        }
        send() {
          this.hasReceived("timeout") || (this.startTimeout(), this.sent = true, this.channel.socket.push({ topic: this.channel.topic, event: this.event, payload: this.payload(), ref: this.ref, join_ref: this.channel.joinRef() }));
        }
        receive(e10, t10) {
          return this.hasReceived(e10) && t10(this.receivedResp.response), this.recHooks.push({ status: e10, callback: t10 }), this;
        }
        reset() {
          this.cancelRefEvent(), this.ref = null, this.refEvent = null, this.receivedResp = null, this.sent = false;
        }
        destroy() {
          this.cancelRefEvent(), this.cancelTimeout();
        }
        matchReceive({ status: e10, response: t10, _ref: r10 }) {
          this.recHooks.filter((t11) => t11.status === e10).forEach((e11) => e11.callback(t10));
        }
        cancelRefEvent() {
          this.refEvent && this.channel.off(this.refEvent);
        }
        cancelTimeout() {
          clearTimeout(this.timeoutTimer), this.timeoutTimer = null;
        }
        startTimeout() {
          this.timeoutTimer && this.cancelTimeout(), this.ref = this.channel.socket.makeRef(), this.refEvent = this.channel.replyEventName(this.ref), this.channel.on(this.refEvent, (e10) => {
            this.cancelRefEvent(), this.cancelTimeout(), this.receivedResp = e10, this.matchReceive(e10);
          }), this.timeoutTimer = setTimeout(() => {
            this.trigger("timeout", {});
          }, this.timeout);
        }
        hasReceived(e10) {
          return this.receivedResp && this.receivedResp.status === e10;
        }
        trigger(e10, t10) {
          this.channel.trigger(this.refEvent, { status: e10, response: t10 });
        }
      }, ep = class {
        constructor(e10, t10) {
          this.callback = e10, this.timerCalc = t10, this.timer = void 0, this.tries = 0;
        }
        reset() {
          this.tries = 0, clearTimeout(this.timer);
        }
        scheduleTimeout() {
          clearTimeout(this.timer), this.timer = setTimeout(() => {
            this.tries = this.tries + 1, this.callback();
          }, this.timerCalc(this.tries + 1));
        }
      }, ef = class {
        constructor(e10, t10, r10) {
          this.state = eo.closed, this.topic = e10, this.params = es(t10 || {}), this.socket = r10, this.bindings = [], this.bindingRef = 0, this.timeout = this.socket.timeout, this.joinedOnce = false, this.joinPush = new ed(this, el.join, this.params, this.timeout), this.pushBuffer = [], this.stateChangeRefs = [], this.rejoinTimer = new ep(() => {
            this.socket.isConnected() && this.rejoin();
          }, this.socket.rejoinAfterMs), this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset())), this.stateChangeRefs.push(this.socket.onOpen(() => {
            this.rejoinTimer.reset(), this.isErrored() && this.rejoin();
          })), this.joinPush.receive("ok", () => {
            this.state = eo.joined, this.rejoinTimer.reset(), this.pushBuffer.forEach((e11) => e11.send()), this.pushBuffer = [];
          }), this.joinPush.receive("error", (e11) => {
            this.state = eo.errored, this.socket.hasLogger() && this.socket.log("channel", `error ${this.topic}`, e11), this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
          }), this.onClose(() => {
            this.rejoinTimer.reset(), this.socket.hasLogger() && this.socket.log("channel", `close ${this.topic}`), this.state = eo.closed, this.socket.remove(this);
          }), this.onError((e11) => {
            this.socket.hasLogger() && this.socket.log("channel", `error ${this.topic}`, e11), this.isJoining() && this.joinPush.reset(), this.state = eo.errored, this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
          }), this.joinPush.receive("timeout", () => {
            this.socket.hasLogger() && this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout), new ed(this, el.leave, es({}), this.timeout).send(), this.state = eo.errored, this.joinPush.reset(), this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
          }), this.on(el.reply, (e11, t11) => {
            this.trigger(this.replyEventName(t11), e11);
          });
        }
        join(e10 = this.timeout) {
          if (!this.joinedOnce) return this.timeout = e10, this.joinedOnce = true, this.rejoin(), this.joinPush;
          throw Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
        }
        teardown() {
          this.pushBuffer.forEach((e10) => e10.destroy()), this.pushBuffer = [], this.rejoinTimer.reset(), this.joinPush.destroy(), this.state = eo.closed, this.bindings = [];
        }
        onClose(e10) {
          this.on(el.close, e10);
        }
        onError(e10) {
          return this.on(el.error, (t10) => e10(t10));
        }
        on(e10, t10) {
          let r10 = this.bindingRef++;
          return this.bindings.push({ event: e10, ref: r10, callback: t10 }), r10;
        }
        off(e10, t10) {
          this.bindings = this.bindings.filter((r10) => !(r10.event === e10 && (void 0 === t10 || t10 === r10.ref)));
        }
        canPush() {
          return this.socket.isConnected() && this.isJoined();
        }
        push(e10, t10, r10 = this.timeout) {
          if (t10 = t10 || {}, !this.joinedOnce) throw Error(`tried to push '${e10}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
          let s2 = new ed(this, e10, function() {
            return t10;
          }, r10);
          return this.canPush() ? s2.send() : (s2.startTimeout(), this.pushBuffer.push(s2)), s2;
        }
        leave(e10 = this.timeout) {
          this.rejoinTimer.reset(), this.joinPush.cancelTimeout(), this.state = eo.leaving;
          let t10 = () => {
            this.socket.hasLogger() && this.socket.log("channel", `leave ${this.topic}`), this.trigger(el.close, "leave");
          }, r10 = new ed(this, el.leave, es({}), e10);
          return r10.receive("ok", () => t10()).receive("timeout", () => t10()), r10.send(), this.canPush() || r10.trigger("ok", {}), r10;
        }
        onMessage(e10, t10, r10) {
          return t10;
        }
        filterBindings(e10, t10, r10) {
          return true;
        }
        isMember(e10, t10, r10, s2) {
          return this.topic === e10 && (!s2 || s2 === this.joinRef() || (this.socket.hasLogger() && this.socket.log("channel", "dropping outdated message", { topic: e10, event: t10, payload: r10, joinRef: s2 }), false));
        }
        joinRef() {
          return this.joinPush.ref;
        }
        rejoin(e10 = this.timeout) {
          this.isLeaving() || (this.socket.leaveOpenTopic(this.topic), this.state = eo.joining, this.joinPush.resend(e10));
        }
        trigger(e10, t10, r10, s2) {
          let i2 = this.onMessage(e10, t10, r10, s2);
          if (t10 && !i2) throw Error("channel onMessage callbacks must return the payload, modified or unmodified");
          let n2 = this.bindings.filter((s3) => s3.event === e10 && this.filterBindings(s3, t10, r10));
          for (let e11 = 0; e11 < n2.length; e11++) n2[e11].callback(i2, r10, s2 || this.joinRef());
        }
        replyEventName(e10) {
          return `chan_reply_${e10}`;
        }
        isClosed() {
          return this.state === eo.closed;
        }
        isErrored() {
          return this.state === eo.errored;
        }
        isJoined() {
          return this.state === eo.joined;
        }
        isJoining() {
          return this.state === eo.joining;
        }
        isLeaving() {
          return this.state === eo.leaving;
        }
      }, eg = class {
        static request(e10, t10, r10, s2, i2, n2, a2) {
          if (en.XDomainRequest) {
            let r11 = new en.XDomainRequest();
            return this.xdomainRequest(r11, e10, t10, s2, i2, n2, a2);
          }
          if (en.XMLHttpRequest) {
            let o2 = new en.XMLHttpRequest();
            return this.xhrRequest(o2, e10, t10, r10, s2, i2, n2, a2);
          }
          if (en.fetch && en.AbortController) return this.fetchRequest(e10, t10, r10, s2, i2, n2, a2);
          throw Error("No suitable XMLHttpRequest implementation found");
        }
        static fetchRequest(e10, t10, r10, s2, i2, n2, a2) {
          let o2 = { method: e10, headers: r10, body: s2 }, l2 = null;
          return i2 && (l2 = new AbortController(), setTimeout(() => l2.abort(), i2), o2.signal = l2.signal), en.fetch(t10, o2).then((e11) => e11.text()).then((e11) => this.parseJSON(e11)).then((e11) => a2 && a2(e11)).catch((e11) => {
            "AbortError" === e11.name && n2 ? n2() : a2 && a2(null);
          }), l2;
        }
        static xdomainRequest(e10, t10, r10, s2, i2, n2, a2) {
          return e10.timeout = i2, e10.open(t10, r10), e10.onload = () => {
            let t11 = this.parseJSON(e10.responseText);
            a2 && a2(t11);
          }, n2 && (e10.ontimeout = n2), e10.onprogress = () => {
          }, e10.send(s2), e10;
        }
        static xhrRequest(e10, t10, r10, s2, i2, n2, a2, o2) {
          for (let [i3, a3] of (e10.open(t10, r10, true), e10.timeout = n2, Object.entries(s2))) e10.setRequestHeader(i3, a3);
          return e10.onerror = () => o2 && o2(null), e10.onreadystatechange = () => {
            e10.readyState === ec.complete && o2 && o2(this.parseJSON(e10.responseText));
          }, a2 && (e10.ontimeout = a2), e10.send(i2), e10;
        }
        static parseJSON(e10) {
          if (!e10 || "" === e10) return null;
          try {
            return JSON.parse(e10);
          } catch {
            return console && console.log("failed to parse JSON response", e10), null;
          }
        }
        static serialize(e10, t10) {
          let r10 = [];
          for (var s2 in e10) {
            if (!Object.prototype.hasOwnProperty.call(e10, s2)) continue;
            let i2 = t10 ? `${t10}[${s2}]` : s2, n2 = e10[s2];
            "object" == typeof n2 ? r10.push(this.serialize(n2, i2)) : r10.push(encodeURIComponent(i2) + "=" + encodeURIComponent(n2));
          }
          return r10.join("&");
        }
        static appendParams(e10, t10) {
          if (0 === Object.keys(t10).length) return e10;
          let r10 = e10.match(/\?/) ? "&" : "?";
          return `${e10}${r10}${this.serialize(t10)}`;
        }
      }, em = (e10) => {
        let t10 = "", r10 = new Uint8Array(e10), s2 = r10.byteLength;
        for (let e11 = 0; e11 < s2; e11++) t10 += String.fromCharCode(r10[e11]);
        return btoa(t10);
      }, eb = class {
        constructor(e10, t10) {
          t10 && 2 === t10.length && t10[1].startsWith(eh) && (this.authToken = atob(t10[1].slice(eh.length))), this.endPoint = null, this.token = null, this.skipHeartbeat = true, this.reqs = /* @__PURE__ */ new Set(), this.awaitingBatchAck = false, this.currentBatch = null, this.currentBatchTimer = null, this.batchBuffer = [], this.onopen = function() {
          }, this.onerror = function() {
          }, this.onmessage = function() {
          }, this.onclose = function() {
          }, this.pollEndpoint = this.normalizeEndpoint(e10), this.readyState = ea.connecting, setTimeout(() => this.poll(), 0);
        }
        normalizeEndpoint(e10) {
          return e10.replace("ws://", "http://").replace("wss://", "https://").replace(RegExp("(.*)/" + eu.websocket), "$1/" + eu.longpoll);
        }
        endpointURL() {
          return eg.appendParams(this.pollEndpoint, { token: this.token });
        }
        closeAndRetry(e10, t10, r10) {
          this.close(e10, t10, r10), this.readyState = ea.connecting;
        }
        ontimeout() {
          this.onerror("timeout"), this.closeAndRetry(1005, "timeout", false);
        }
        isActive() {
          return this.readyState === ea.open || this.readyState === ea.connecting;
        }
        poll() {
          let e10 = { Accept: "application/json" };
          this.authToken && (e10["X-Phoenix-AuthToken"] = this.authToken), this.ajax("GET", e10, null, () => this.ontimeout(), (e11) => {
            if (e11) {
              var { status: t10, token: r10, messages: s2 } = e11;
              if (410 === t10 && null !== this.token) {
                this.onerror(410), this.closeAndRetry(3410, "session_gone", false);
                return;
              }
              this.token = r10;
            } else t10 = 0;
            switch (t10) {
              case 200:
                s2.forEach((e12) => {
                  setTimeout(() => this.onmessage({ data: e12 }), 0);
                }), this.poll();
                break;
              case 204:
                this.poll();
                break;
              case 410:
                this.readyState = ea.open, this.onopen({}), this.poll();
                break;
              case 403:
                this.onerror(403), this.close(1008, "forbidden", false);
                break;
              case 0:
              case 500:
                this.onerror(500), this.closeAndRetry(1011, "internal server error", 500);
                break;
              default:
                throw Error(`unhandled poll status ${t10}`);
            }
          });
        }
        send(e10) {
          "string" != typeof e10 && (e10 = em(e10)), this.currentBatch ? this.currentBatch.push(e10) : this.awaitingBatchAck ? this.batchBuffer.push(e10) : (this.currentBatch = [e10], this.currentBatchTimer = setTimeout(() => {
            this.batchSend(this.currentBatch), this.currentBatch = null;
          }, 0));
        }
        batchSend(e10, t10 = 0) {
          this.awaitingBatchAck = true;
          let r10 = t10 + 100, s2 = e10.slice(t10, r10);
          this.ajax("POST", { "Content-Type": "application/x-ndjson" }, s2.join("\n"), () => this.onerror("timeout"), (t11) => {
            t11 && 200 === t11.status ? r10 < e10.length ? this.batchSend(e10, r10) : this.batchBuffer.length > 0 ? (this.batchSend(this.batchBuffer), this.batchBuffer = []) : this.awaitingBatchAck = false : (this.awaitingBatchAck = false, this.onerror(t11 && t11.status), this.closeAndRetry(1011, "internal server error", false));
          });
        }
        close(e10, t10, r10) {
          for (let e11 of this.reqs) e11.abort();
          this.readyState = ea.closed;
          let s2 = Object.assign({ code: 1e3, reason: void 0, wasClean: true }, { code: e10, reason: t10, wasClean: r10 });
          this.batchBuffer = [], clearTimeout(this.currentBatchTimer), this.currentBatchTimer = null, "undefined" != typeof CloseEvent ? this.onclose(new CloseEvent("close", s2)) : this.onclose(s2);
        }
        ajax(e10, t10, r10, s2, i2) {
          let n2;
          n2 = eg.request(e10, this.endpointURL(), t10, r10, this.timeout, () => {
            this.reqs.delete(n2), s2();
          }, (e11) => {
            this.reqs.delete(n2), this.isActive() && i2(e11);
          }), this.reqs.add(n2);
        }
      }, ey = class e10 {
        constructor(t10, r10 = {}) {
          let s2 = r10.events || { state: "presence_state", diff: "presence_diff" };
          this.state = /* @__PURE__ */ Object.create(null), this.pendingDiffs = [], this.channel = t10, this.joinRef = null, this.caller = { onJoin: function() {
          }, onLeave: function() {
          }, onSync: function() {
          } }, this.channel.on(s2.state, (t11) => {
            let { onJoin: r11, onLeave: s3, onSync: i2 } = this.caller;
            this.joinRef = this.channel.joinRef(), this.state = e10.syncState(this.state, t11, r11, s3), this.pendingDiffs.forEach((t12) => {
              this.state = e10.syncDiff(this.state, t12, r11, s3);
            }), this.pendingDiffs = [], i2();
          }), this.channel.on(s2.diff, (t11) => {
            let { onJoin: r11, onLeave: s3, onSync: i2 } = this.caller;
            this.inPendingSyncState() ? this.pendingDiffs.push(t11) : (this.state = e10.syncDiff(this.state, t11, r11, s3), i2());
          });
        }
        onJoin(e11) {
          this.caller.onJoin = e11;
        }
        onLeave(e11) {
          this.caller.onLeave = e11;
        }
        onSync(e11) {
          this.caller.onSync = e11;
        }
        list(t10) {
          return e10.list(this.state, t10);
        }
        inPendingSyncState() {
          return !this.joinRef || this.joinRef !== this.channel.joinRef();
        }
        static syncState(e11, t10, r10, s2) {
          let i2 = this.toNullProtoObj(this.clone(e11));
          t10 = this.toNullProtoObj(t10);
          let n2 = /* @__PURE__ */ Object.create(null), a2 = /* @__PURE__ */ Object.create(null);
          return this.map(i2, (e12, r11) => {
            t10[e12] || (a2[e12] = r11);
          }), this.map(t10, (e12, t11) => {
            let r11 = i2[e12];
            if (r11) {
              let s3 = t11.metas.map((e13) => e13.phx_ref), i3 = r11.metas.map((e13) => e13.phx_ref), o2 = t11.metas.filter((e13) => 0 > i3.indexOf(e13.phx_ref)), l2 = r11.metas.filter((e13) => 0 > s3.indexOf(e13.phx_ref));
              o2.length > 0 && (n2[e12] = t11, n2[e12].metas = o2), l2.length > 0 && (a2[e12] = this.clone(r11), a2[e12].metas = l2);
            } else n2[e12] = t11;
          }), this.syncDiff(i2, { joins: n2, leaves: a2 }, r10, s2);
        }
        static syncDiff(e11, t10, r10, s2) {
          e11 = this.toNullProtoObj(e11);
          let { joins: i2, leaves: n2 } = this.clone(t10);
          return r10 || (r10 = function() {
          }), s2 || (s2 = function() {
          }), this.map(i2, (t11, s3) => {
            let i3 = e11[t11];
            if (e11[t11] = this.clone(s3), i3) {
              let r11 = e11[t11].metas.map((e12) => e12.phx_ref), s4 = i3.metas.filter((e12) => 0 > r11.indexOf(e12.phx_ref));
              e11[t11].metas.unshift(...s4);
            }
            r10(t11, i3, s3);
          }), this.map(n2, (t11, r11) => {
            let i3 = e11[t11];
            if (!i3) return;
            let n3 = r11.metas.map((e12) => e12.phx_ref);
            i3.metas = i3.metas.filter((e12) => 0 > n3.indexOf(e12.phx_ref)), s2(t11, i3, r11), 0 === i3.metas.length && delete e11[t11];
          }), e11;
        }
        static list(e11, t10) {
          return t10 || (t10 = function(e12, t11) {
            return t11;
          }), this.map(e11, (e12, r10) => t10(e12, r10));
        }
        static map(e11, t10) {
          return Object.getOwnPropertyNames(e11).map((r10) => t10(r10, e11[r10]));
        }
        static toNullProtoObj(e11) {
          if (null === Object.getPrototypeOf(e11)) return e11;
          let t10 = /* @__PURE__ */ Object.create(null);
          return Object.getOwnPropertyNames(e11).forEach((r10) => {
            t10[r10] = e11[r10];
          }), t10;
        }
        static clone(e11) {
          return JSON.parse(JSON.stringify(e11));
        }
      }, ew = { HEADER_LENGTH: 1, META_LENGTH: 4, KINDS: { push: 0, reply: 1, broadcast: 2 }, encode(e10, t10) {
        return e10.payload.constructor === ArrayBuffer ? t10(this.binaryEncode(e10)) : t10(JSON.stringify([e10.join_ref, e10.ref, e10.topic, e10.event, e10.payload]));
      }, decode(e10, t10) {
        if (e10.constructor === ArrayBuffer) return t10(this.binaryDecode(e10));
        {
          let [r10, s2, i2, n2, a2] = JSON.parse(e10);
          return t10({ join_ref: r10, ref: s2, topic: i2, event: n2, payload: a2 });
        }
      }, binaryEncode(e10) {
        let { join_ref: t10, ref: r10, event: s2, topic: i2, payload: n2 } = e10, a2 = new TextEncoder(), o2 = a2.encode(t10), l2 = a2.encode(r10), u2 = a2.encode(i2), c2 = a2.encode(s2);
        this.assertFieldSize(o2.byteLength, "join_ref"), this.assertFieldSize(l2.byteLength, "ref"), this.assertFieldSize(u2.byteLength, "topic"), this.assertFieldSize(c2.byteLength, "event");
        let h2 = this.META_LENGTH + o2.byteLength + l2.byteLength + u2.byteLength + c2.byteLength, d2 = new ArrayBuffer(this.HEADER_LENGTH + h2), p2 = new Uint8Array(d2), f2 = new DataView(d2), g2 = 0;
        f2.setUint8(g2++, this.KINDS.push), f2.setUint8(g2++, o2.byteLength), f2.setUint8(g2++, l2.byteLength), f2.setUint8(g2++, u2.byteLength), f2.setUint8(g2++, c2.byteLength), p2.set(o2, g2), g2 += o2.byteLength, p2.set(l2, g2), g2 += l2.byteLength, p2.set(u2, g2), g2 += u2.byteLength, p2.set(c2, g2), g2 += c2.byteLength;
        var m2 = new Uint8Array(d2.byteLength + n2.byteLength);
        return m2.set(p2, 0), m2.set(new Uint8Array(n2), d2.byteLength), m2.buffer;
      }, assertFieldSize(e10, t10) {
        if (e10 > 255) throw Error(`unable to convert ${t10} to binary: must be less than or equal to 255 bytes, but is ${e10} bytes`);
      }, binaryDecode(e10) {
        let t10 = new DataView(e10), r10 = t10.getUint8(0), s2 = new TextDecoder();
        switch (r10) {
          case this.KINDS.push:
            return this.decodePush(e10, t10, s2);
          case this.KINDS.reply:
            return this.decodeReply(e10, t10, s2);
          case this.KINDS.broadcast:
            return this.decodeBroadcast(e10, t10, s2);
        }
      }, decodePush(e10, t10, r10) {
        let s2 = t10.getUint8(1), i2 = t10.getUint8(2), n2 = t10.getUint8(3), a2 = this.HEADER_LENGTH + this.META_LENGTH - 1, o2 = r10.decode(e10.slice(a2, a2 + s2));
        a2 += s2;
        let l2 = r10.decode(e10.slice(a2, a2 + i2));
        a2 += i2;
        let u2 = r10.decode(e10.slice(a2, a2 + n2));
        return a2 += n2, { join_ref: o2, ref: null, topic: l2, event: u2, payload: e10.slice(a2, e10.byteLength) };
      }, decodeReply(e10, t10, r10) {
        let s2 = t10.getUint8(1), i2 = t10.getUint8(2), n2 = t10.getUint8(3), a2 = t10.getUint8(4), o2 = this.HEADER_LENGTH + this.META_LENGTH, l2 = r10.decode(e10.slice(o2, o2 + s2));
        o2 += s2;
        let u2 = r10.decode(e10.slice(o2, o2 + i2));
        o2 += i2;
        let c2 = r10.decode(e10.slice(o2, o2 + n2));
        o2 += n2;
        let h2 = r10.decode(e10.slice(o2, o2 + a2));
        o2 += a2;
        let d2 = e10.slice(o2, e10.byteLength);
        return { join_ref: l2, ref: u2, topic: c2, event: el.reply, payload: { status: h2, response: d2 } };
      }, decodeBroadcast(e10, t10, r10) {
        let s2 = t10.getUint8(1), i2 = t10.getUint8(2), n2 = this.HEADER_LENGTH + 2, a2 = r10.decode(e10.slice(n2, n2 + s2));
        n2 += s2;
        let o2 = r10.decode(e10.slice(n2, n2 + i2));
        return n2 += i2, { join_ref: null, ref: null, topic: a2, event: o2, payload: e10.slice(n2, e10.byteLength) };
      } }, ev = class {
        constructor(e10, t10 = {}) {
          this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] }, this.channels = [], this.sendBuffer = [], this.ref = 0, this.fallbackRef = null, this.timeout = t10.timeout || 1e4, this.transport = t10.transport || en.WebSocket || eb, this.conn = void 0, this.primaryPassedHealthCheck = false, this.longPollFallbackMs = t10.longPollFallbackMs, this.fallbackTimer = null;
          let r10 = null;
          try {
            r10 = en && en.sessionStorage;
          } catch {
          }
          this.sessionStore = t10.sessionStorage || r10, this.establishedConnections = 0, this.defaultEncoder = ew.encode.bind(ew), this.defaultDecoder = ew.decode.bind(ew), this.closeWasClean = true, this.disconnecting = false, this.binaryType = t10.binaryType || "arraybuffer", this.connectClock = 1, this.pageHidden = false, this.encode = void 0, this.decode = void 0, this.transport !== eb ? (this.encode = t10.encode || this.defaultEncoder, this.decode = t10.decode || this.defaultDecoder) : (this.encode = this.defaultEncoder, this.decode = this.defaultDecoder);
          let s2 = null;
          ei && ei.addEventListener && (ei.addEventListener("pagehide", (e11) => {
            this.conn && (this.disconnect(), s2 = this.connectClock);
          }), ei.addEventListener("pageshow", (e11) => {
            s2 === this.connectClock && (s2 = null, this.connect());
          }), ei.addEventListener("visibilitychange", () => {
            "hidden" === document.visibilityState ? this.pageHidden = true : (this.pageHidden = false, this.isConnected() || this.closeWasClean || this.teardown(() => this.connect()));
          })), this.heartbeatIntervalMs = t10.heartbeatIntervalMs || 3e4, this.autoSendHeartbeat = t10.autoSendHeartbeat ?? true, this.heartbeatCallback = t10.heartbeatCallback ?? (() => {
          }), this.rejoinAfterMs = (e11) => t10.rejoinAfterMs ? t10.rejoinAfterMs(e11) : [1e3, 2e3, 5e3][e11 - 1] || 1e4, this.reconnectAfterMs = (e11) => t10.reconnectAfterMs ? t10.reconnectAfterMs(e11) : [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][e11 - 1] || 5e3, this.logger = t10.logger || null, !this.logger && t10.debug && (this.logger = (e11, t11, r11) => {
            console.log(`${e11}: ${t11}`, r11);
          }), this.longpollerTimeout = t10.longpollerTimeout || 2e4, this.params = es(t10.params || {}), this.endPoint = `${e10}/${eu.websocket}`, this.vsn = t10.vsn || "2.0.0", this.heartbeatTimeoutTimer = null, this.heartbeatTimer = null, this.heartbeatSentAt = null, this.pendingHeartbeatRef = null, this.reconnectTimer = new ep(() => {
            if (this.pageHidden) {
              this.log("Not reconnecting as page is hidden!"), this.teardown();
              return;
            }
            this.teardown(async () => {
              t10.beforeReconnect && await t10.beforeReconnect(), this.connect();
            });
          }, this.reconnectAfterMs), this.authToken = t10.authToken && es(t10.authToken);
        }
        getLongPollTransport() {
          return eb;
        }
        replaceTransport(e10) {
          this.connectClock++, this.closeWasClean = true, clearTimeout(this.fallbackTimer), this.reconnectTimer.reset(), this.conn && (this.conn.close(), this.conn = null), this.transport = e10;
        }
        protocol() {
          return location.protocol.match(/^https/) ? "wss" : "ws";
        }
        endPointURL() {
          let e10 = eg.appendParams(eg.appendParams(this.endPoint, this.params()), { vsn: this.vsn });
          return "/" !== e10.charAt(0) ? e10 : "/" === e10.charAt(1) ? `${this.protocol()}:${e10}` : `${this.protocol()}://${location.host}${e10}`;
        }
        disconnect(e10, t10, r10) {
          this.connectClock++, this.disconnecting = true, this.closeWasClean = true, clearTimeout(this.fallbackTimer), this.reconnectTimer.reset(), this.teardown(() => {
            this.disconnecting = false, e10 && e10();
          }, t10, r10);
        }
        connect(e10) {
          e10 && (console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"), this.params = es(e10)), (!this.conn || this.disconnecting) && (this.longPollFallbackMs && this.transport !== eb ? this.connectWithFallback(eb, this.longPollFallbackMs) : this.transportConnect());
        }
        log(e10, t10, r10) {
          this.logger && this.logger(e10, t10, r10);
        }
        hasLogger() {
          return null !== this.logger;
        }
        onOpen(e10) {
          let t10 = this.makeRef();
          return this.stateChangeCallbacks.open.push([t10, e10]), t10;
        }
        onClose(e10) {
          let t10 = this.makeRef();
          return this.stateChangeCallbacks.close.push([t10, e10]), t10;
        }
        onError(e10) {
          let t10 = this.makeRef();
          return this.stateChangeCallbacks.error.push([t10, e10]), t10;
        }
        onMessage(e10) {
          let t10 = this.makeRef();
          return this.stateChangeCallbacks.message.push([t10, e10]), t10;
        }
        onHeartbeat(e10) {
          this.heartbeatCallback = e10;
        }
        ping(e10) {
          if (!this.isConnected()) return false;
          let t10 = this.makeRef(), r10 = Date.now();
          this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: t10 });
          let s2 = this.onMessage((i2) => {
            i2.ref === t10 && (this.off([s2]), e10(Date.now() - r10));
          });
          return true;
        }
        transportName(e10) {
          return e10 === eb ? "LongPoll" : e10.name;
        }
        transportConnect() {
          let e10;
          this.connectClock++, this.closeWasClean = false, this.authToken && (e10 = ["phoenix", `${eh}${btoa(this.authToken()).replace(/=/g, "")}`]), this.conn = new this.transport(this.endPointURL(), e10), this.conn.binaryType = this.binaryType, this.conn.timeout = this.longpollerTimeout, this.conn.onopen = () => this.onConnOpen(), this.conn.onerror = (e11) => this.onConnError(e11), this.conn.onmessage = (e11) => this.onConnMessage(e11), this.conn.onclose = (e11) => this.onConnClose(e11);
        }
        getSession(e10) {
          return this.sessionStore && this.sessionStore.getItem(e10);
        }
        storeSession(e10, t10) {
          this.sessionStore && this.sessionStore.setItem(e10, t10);
        }
        connectWithFallback(e10, t10 = 2500) {
          let r10, s2;
          clearTimeout(this.fallbackTimer);
          let i2 = false, n2 = true, a2 = this.transportName(e10), o2 = (t11) => {
            this.log("transport", `falling back to ${a2}...`, t11), this.off([r10, s2]), n2 = false, this.replaceTransport(e10), this.transportConnect();
          };
          if (this.getSession(`phx:fallback:${a2}`)) return o2("memorized");
          this.fallbackTimer = setTimeout(o2, t10), s2 = this.onError((e11) => {
            this.log("transport", "error", e11), n2 && !i2 && (clearTimeout(this.fallbackTimer), o2(e11));
          }), this.fallbackRef && this.off([this.fallbackRef]), this.fallbackRef = this.onOpen(() => {
            if (i2 = true, !n2) {
              let t11 = this.transportName(e10);
              return this.primaryPassedHealthCheck || this.storeSession(`phx:fallback:${t11}`, "true"), this.log("transport", `established ${t11} fallback`);
            }
            clearTimeout(this.fallbackTimer), this.fallbackTimer = setTimeout(o2, t10), this.ping((e11) => {
              this.log("transport", "connected to primary after", e11), this.primaryPassedHealthCheck = true, clearTimeout(this.fallbackTimer);
            });
          }), this.transportConnect();
        }
        clearHeartbeats() {
          clearTimeout(this.heartbeatTimer), clearTimeout(this.heartbeatTimeoutTimer);
        }
        onConnOpen() {
          this.hasLogger() && this.log("transport", `connected to ${this.endPointURL()}`), this.closeWasClean = false, this.disconnecting = false, this.establishedConnections++, this.flushSendBuffer(), this.reconnectTimer.reset(), this.autoSendHeartbeat && this.resetHeartbeat(), this.triggerStateCallbacks("open");
        }
        heartbeatTimeout() {
          if (this.pendingHeartbeatRef) {
            this.pendingHeartbeatRef = null, this.heartbeatSentAt = null, this.hasLogger() && this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
            try {
              this.heartbeatCallback("timeout");
            } catch (e10) {
              this.log("error", "error in heartbeat callback", e10);
            }
            this.triggerChanError(Error("heartbeat timeout")), this.closeWasClean = false, this.teardown(() => this.reconnectTimer.scheduleTimeout(), 1e3, "heartbeat timeout");
          }
        }
        resetHeartbeat() {
          this.conn && this.conn.skipHeartbeat || (this.pendingHeartbeatRef = null, this.clearHeartbeats(), this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs));
        }
        teardown(e10, t10, r10) {
          if (!this.conn) return e10 && e10();
          let s2 = this.conn;
          this.waitForBufferDone(s2, () => {
            t10 ? s2.close(t10, r10 || "") : s2.close(), this.waitForSocketClosed(s2, () => {
              this.conn === s2 && (this.conn.onopen = function() {
              }, this.conn.onerror = function() {
              }, this.conn.onmessage = function() {
              }, this.conn.onclose = function() {
              }, this.conn = null), e10 && e10();
            });
          });
        }
        waitForBufferDone(e10, t10, r10 = 1) {
          if (5 === r10 || !e10.bufferedAmount) {
            t10();
            return;
          }
          setTimeout(() => {
            this.waitForBufferDone(e10, t10, r10 + 1);
          }, 150 * r10);
        }
        waitForSocketClosed(e10, t10, r10 = 1) {
          if (5 === r10 || e10.readyState === ea.closed) {
            t10();
            return;
          }
          setTimeout(() => {
            this.waitForSocketClosed(e10, t10, r10 + 1);
          }, 150 * r10);
        }
        onConnClose(e10) {
          this.conn && (this.conn.onclose = () => {
          }), this.hasLogger() && this.log("transport", "close", e10), this.triggerChanError(e10), this.clearHeartbeats(), this.closeWasClean || this.reconnectTimer.scheduleTimeout(), this.triggerStateCallbacks("close", e10);
        }
        onConnError(e10) {
          this.hasLogger() && this.log("transport", "error", e10);
          let t10 = this.transport, r10 = this.establishedConnections;
          this.triggerStateCallbacks("error", e10, t10, r10), (t10 === this.transport || r10 > 0) && this.triggerChanError(e10);
        }
        triggerChanError(e10) {
          this.channels.forEach((t10) => {
            t10.isErrored() || t10.isLeaving() || t10.isClosed() || t10.trigger(el.error, e10);
          });
        }
        connectionState() {
          switch (this.conn && this.conn.readyState) {
            case ea.connecting:
              return "connecting";
            case ea.open:
              return "open";
            case ea.closing:
              return "closing";
            default:
              return "closed";
          }
        }
        isConnected() {
          return "open" === this.connectionState();
        }
        remove(e10) {
          this.off(e10.stateChangeRefs), this.channels = this.channels.filter((t10) => t10 !== e10);
        }
        off(e10) {
          for (let t10 in this.stateChangeCallbacks) this.stateChangeCallbacks[t10] = this.stateChangeCallbacks[t10].filter(([t11]) => -1 === e10.indexOf(t11));
        }
        channel(e10, t10 = {}) {
          let r10 = new ef(e10, t10, this);
          return this.channels.push(r10), r10;
        }
        push(e10) {
          if (this.hasLogger()) {
            let { topic: t10, event: r10, payload: s2, ref: i2, join_ref: n2 } = e10;
            this.log("push", `${t10} ${r10} (${n2}, ${i2})`, s2);
          }
          this.isConnected() ? this.encode(e10, (e11) => this.conn.send(e11)) : this.sendBuffer.push(() => this.encode(e10, (e11) => this.conn.send(e11)));
        }
        makeRef() {
          let e10 = this.ref + 1;
          return e10 === this.ref ? this.ref = 0 : this.ref = e10, this.ref.toString();
        }
        sendHeartbeat() {
          if (!this.isConnected()) {
            try {
              this.heartbeatCallback("disconnected");
            } catch (e10) {
              this.log("error", "error in heartbeat callback", e10);
            }
            return;
          }
          if (this.pendingHeartbeatRef) {
            this.heartbeatTimeout();
            return;
          }
          this.pendingHeartbeatRef = this.makeRef(), this.heartbeatSentAt = Date.now(), this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef });
          try {
            this.heartbeatCallback("sent");
          } catch (e10) {
            this.log("error", "error in heartbeat callback", e10);
          }
          this.heartbeatTimeoutTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs);
        }
        flushSendBuffer() {
          this.isConnected() && this.sendBuffer.length > 0 && (this.sendBuffer.forEach((e10) => e10()), this.sendBuffer = []);
        }
        onConnMessage(e10) {
          this.decode(e10.data, (e11) => {
            let { topic: t10, event: r10, payload: s2, ref: i2, join_ref: n2 } = e11;
            if (i2 && i2 === this.pendingHeartbeatRef) {
              let e12 = this.heartbeatSentAt ? Date.now() - this.heartbeatSentAt : void 0;
              this.clearHeartbeats();
              try {
                this.heartbeatCallback("ok" === s2.status ? "ok" : "error", e12);
              } catch (e13) {
                this.log("error", "error in heartbeat callback", e13);
              }
              this.pendingHeartbeatRef = null, this.heartbeatSentAt = null, this.autoSendHeartbeat && (this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs));
            }
            this.hasLogger() && this.log("receive", `${s2.status || ""} ${t10} ${r10} ${i2 && "(" + i2 + ")" || ""}`.trim(), s2);
            for (let e12 = 0; e12 < this.channels.length; e12++) {
              let a2 = this.channels[e12];
              a2.isMember(t10, r10, s2, n2) && a2.trigger(r10, s2, i2, n2);
            }
            this.triggerStateCallbacks("message", e11);
          });
        }
        triggerStateCallbacks(e10, ...t10) {
          try {
            this.stateChangeCallbacks[e10].forEach(([r10, s2]) => {
              try {
                s2(...t10);
              } catch (t11) {
                this.log("error", `error in ${e10} callback`, t11);
              }
            });
          } catch (t11) {
            this.log("error", `error triggering ${e10} callbacks`, t11);
          }
        }
        leaveOpenTopic(e10) {
          let t10 = this.channels.find((t11) => t11.topic === e10 && (t11.isJoined() || t11.isJoining()));
          t10 && (this.hasLogger() && this.log("transport", `leaving duplicate topic "${e10}"`), t10.leave());
        }
      };
      class e_ {
        constructor(e10, t10) {
          let r10 = function(e11) {
            return (null == e11 ? void 0 : e11.events) && { events: e11.events };
          }(t10);
          this.presence = new ey(e10.getChannel(), r10), this.presence.onJoin((t11, r11, s2) => {
            let i2 = e_.onJoinPayload(t11, r11, s2);
            e10.getChannel().trigger("presence", i2);
          }), this.presence.onLeave((t11, r11, s2) => {
            let i2 = e_.onLeavePayload(t11, r11, s2);
            e10.getChannel().trigger("presence", i2);
          }), this.presence.onSync(() => {
            e10.getChannel().trigger("presence", { event: "sync" });
          });
        }
        get state() {
          return e_.transformState(this.presence.state);
        }
        static transformState(e10) {
          return Object.getOwnPropertyNames(e10 = JSON.parse(JSON.stringify(e10))).reduce((t10, r10) => {
            let s2 = e10[r10];
            return t10[r10] = eS(s2), t10;
          }, {});
        }
        static onJoinPayload(e10, t10, r10) {
          return { event: "join", key: e10, currentPresences: ek(t10), newPresences: eS(r10) };
        }
        static onLeavePayload(e10, t10, r10) {
          return { event: "leave", key: e10, currentPresences: ek(t10), leftPresences: eS(r10) };
        }
      }
      function eS(e10) {
        return e10.metas.map((e11) => {
          let t10 = Object.defineProperties({}, Object.getOwnPropertyDescriptors(e11));
          return t10.presence_ref = t10.phx_ref, delete t10.phx_ref, delete t10.phx_ref_prev, t10;
        });
      }
      function ek(e10) {
        return (null == e10 ? void 0 : e10.metas) ? eS(e10) : [];
      }
      !function(e10) {
        e10.SYNC = "sync", e10.JOIN = "join", e10.LEAVE = "leave";
      }(T || (T = {}));
      class eT {
        get state() {
          return this.presenceAdapter.state;
        }
        constructor(e10, t10) {
          this.channel = e10, this.presenceAdapter = new e_(this.channel.channelAdapter, t10);
        }
      }
      class eE {
        constructor(e10, t10, r10) {
          let s2 = { config: Object.assign({ broadcast: { ack: false, self: false }, presence: { key: "", enabled: false }, private: false }, r10.config) };
          this.channel = e10.getSocket().channel(t10, s2), this.socket = e10;
        }
        get state() {
          return this.channel.state;
        }
        set state(e10) {
          this.channel.state = e10;
        }
        get joinedOnce() {
          return this.channel.joinedOnce;
        }
        get joinPush() {
          return this.channel.joinPush;
        }
        get rejoinTimer() {
          return this.channel.rejoinTimer;
        }
        on(e10, t10) {
          return this.channel.on(e10, t10);
        }
        off(e10, t10) {
          this.channel.off(e10, t10);
        }
        subscribe(e10) {
          return this.channel.join(e10);
        }
        unsubscribe(e10) {
          return this.channel.leave(e10);
        }
        teardown() {
          this.channel.teardown();
        }
        onClose(e10) {
          this.channel.onClose(e10);
        }
        onError(e10) {
          return this.channel.onError(e10);
        }
        push(e10, t10, r10) {
          let s2;
          try {
            s2 = this.channel.push(e10, t10, r10);
          } catch (t11) {
            throw Error(`tried to push '${e10}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`);
          }
          if (this.channel.pushBuffer.length > 100) {
            let e11 = this.channel.pushBuffer.shift();
            e11.cancelTimeout(), this.socket.log("channel", `discarded push due to buffer overflow: ${e11.event}`, e11.payload());
          }
          return s2;
        }
        updateJoinPayload(e10) {
          let t10 = this.channel.joinPush.payload();
          this.channel.joinPush.payload = () => Object.assign(Object.assign({}, t10), e10);
        }
        canPush() {
          return this.socket.isConnected() && this.state === H.joined;
        }
        isJoined() {
          return this.state === H.joined;
        }
        isJoining() {
          return this.state === H.joining;
        }
        isClosed() {
          return this.state === H.closed;
        }
        isLeaving() {
          return this.state === H.leaving;
        }
        updateFilterBindings(e10) {
          this.channel.filterBindings = e10;
        }
        updatePayloadTransform(e10) {
          this.channel.onMessage = e10;
        }
        getChannel() {
          return this.channel;
        }
      }
      let eO = /[,()"\\]/, eR = (e10) => eO.test(e10) || e10 !== e10.trim(), eC = (e10) => `"${e10.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`, eA = (e10) => {
        let t10 = null === e10 ? "null" : String(e10);
        return eR(t10) ? eC(t10) : t10;
      }, eP = (e10) => null === e10 ? "null" : String(e10), ex = (e10, t10) => {
        if ("in" === e10) {
          let e11 = Array.isArray(t10) ? t10 : [t10];
          if (0 === e11.length) throw Error("Realtime `in` filter requires at least one value.");
          let r10 = Array.from(new Set(e11)).map((e12) => eA(e12)).join(",");
          return `in.(${r10})`;
        }
        return "is" === e10 ? `is.${eP(t10)}` : `${e10}.${eA(t10)}`;
      };
      class eI {
        constructor() {
          this.filters = [];
        }
        add(e10, t10, r10, s2 = false) {
          return this.filters.push(`${e10}=${s2 ? "not." : ""}${ex(t10, r10)}`), this;
        }
        eq(e10, t10) {
          return this.add(e10, "eq", t10);
        }
        neq(e10, t10) {
          return this.add(e10, "neq", t10);
        }
        gt(e10, t10) {
          return this.add(e10, "gt", t10);
        }
        gte(e10, t10) {
          return this.add(e10, "gte", t10);
        }
        lt(e10, t10) {
          return this.add(e10, "lt", t10);
        }
        lte(e10, t10) {
          return this.add(e10, "lte", t10);
        }
        in(e10, t10) {
          return this.add(e10, "in", t10);
        }
        like(e10, t10) {
          return this.add(e10, "like", t10);
        }
        ilike(e10, t10) {
          return this.add(e10, "ilike", t10);
        }
        match(e10, t10) {
          return this.add(e10, "match", t10);
        }
        imatch(e10, t10) {
          return this.add(e10, "imatch", t10);
        }
        is(e10, t10) {
          return this.add(e10, "is", t10);
        }
        isDistinct(e10, t10) {
          return this.add(e10, "isdistinct", t10);
        }
        not(e10, t10, r10) {
          return this.add(e10, t10, r10, true);
        }
        build() {
          return this.filters.join(",");
        }
        toString() {
          return this.build();
        }
      }
      !function(e10) {
        e10.ALL = "*", e10.INSERT = "INSERT", e10.UPDATE = "UPDATE", e10.DELETE = "DELETE";
      }(E || (E = {})), function(e10) {
        e10.BROADCAST = "broadcast", e10.PRESENCE = "presence", e10.POSTGRES_CHANGES = "postgres_changes", e10.SYSTEM = "system";
      }(O || (O = {})), function(e10) {
        e10.SUBSCRIBED = "SUBSCRIBED", e10.TIMED_OUT = "TIMED_OUT", e10.CLOSED = "CLOSED", e10.CHANNEL_ERROR = "CHANNEL_ERROR";
      }(R || (R = {}));
      class ej {
        get state() {
          return this.channelAdapter.state;
        }
        set state(e10) {
          this.channelAdapter.state = e10;
        }
        get joinedOnce() {
          return this.channelAdapter.joinedOnce;
        }
        get timeout() {
          return this.socket.timeout;
        }
        get joinPush() {
          return this.channelAdapter.joinPush;
        }
        get rejoinTimer() {
          return this.channelAdapter.rejoinTimer;
        }
        constructor(e10, t10 = { config: {} }, r10) {
          var s2, i2;
          if (this.topic = e10, this.params = t10, this.socket = r10, this.bindings = {}, this.subTopic = e10.replace(/^realtime:/i, ""), this.params.config = Object.assign({ broadcast: { ack: false, self: false }, presence: { key: "", enabled: false }, private: false }, t10.config), this.channelAdapter = new eE(this.socket.socketAdapter, e10, this.params), this.presence = new eT(this), this._onClose(() => {
            this.socket._remove(this);
          }), this._updateFilterTransform(), this.broadcastEndpointURL = er(this.socket.socketAdapter.endPointURL()), this.private = this.params.config.private || false, !this.private && (null === (i2 = null === (s2 = this.params.config) || void 0 === s2 ? void 0 : s2.broadcast) || void 0 === i2 ? void 0 : i2.replay)) throw Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`);
        }
        subscribe(e10, t10 = this.timeout) {
          var r10, s2, i2;
          if (this.socket.isConnected() || this.socket.connect(), this.channelAdapter.isClosed()) {
            let { config: { broadcast: n2, presence: a2, private: o2 } } = this.params, l2 = null !== (s2 = null === (r10 = this.bindings.postgres_changes) || void 0 === r10 ? void 0 : r10.map((e11) => e11.filter)) && void 0 !== s2 ? s2 : [], u2 = !!this.bindings[O.PRESENCE] && this.bindings[O.PRESENCE].length > 0 || (null === (i2 = this.params.config.presence) || void 0 === i2 ? void 0 : i2.enabled) === true, c2 = {}, h2 = { broadcast: n2, presence: Object.assign(Object.assign({}, a2), { enabled: u2 }), postgres_changes: l2, private: o2 };
            this.socket.accessTokenValue && (c2.access_token = this.socket.accessTokenValue), this._onError((t11) => {
              null == e10 || e10(R.CHANNEL_ERROR, function(e11) {
                if (e11 instanceof Error) return e11;
                if ("string" == typeof e11) return Error(e11);
                if (e11 && "object" == typeof e11) {
                  if ("number" == typeof e11.code) {
                    let t12 = "string" == typeof e11.reason && e11.reason ? ` (${e11.reason})` : "";
                    return Error(`socket closed: ${e11.code}${t12}`, { cause: e11 });
                  }
                  return Error("channel error: transport failure", { cause: e11 });
                }
                return Error("channel error: connection lost");
              }(t11));
            }), this._onClose(() => null == e10 ? void 0 : e10(R.CLOSED)), this.updateJoinPayload(Object.assign({ config: h2 }, c2)), this._updateFilterMessage(), this.channelAdapter.subscribe(t10).receive("ok", async ({ postgres_changes: t11 }) => {
              if (this.socket._isManualToken() || this.socket.setAuth(), void 0 === t11) {
                null == e10 || e10(R.SUBSCRIBED);
                return;
              }
              this._updatePostgresBindings(t11, e10);
            }).receive("error", (t11) => {
              this.state = H.errored;
              let r11 = Object.values(t11).join(", ") || "error";
              null == e10 || e10(R.CHANNEL_ERROR, Error(r11, { cause: t11 }));
            }).receive("timeout", () => {
              null == e10 || e10(R.TIMED_OUT);
            });
          }
          return this;
        }
        _updatePostgresBindings(e10, t10) {
          var r10;
          let s2 = this.bindings.postgres_changes, i2 = null !== (r10 = null == s2 ? void 0 : s2.length) && void 0 !== r10 ? r10 : 0, n2 = [];
          for (let r11 = 0; r11 < i2; r11++) {
            let i3 = s2[r11], { filter: { event: a2, schema: o2, table: l2, filter: u2 } } = i3, c2 = e10 && e10[r11];
            if (c2 && c2.event === a2 && ej.isFilterValueEqual(c2.schema, o2) && ej.isFilterValueEqual(c2.table, l2) && ej.isFilterValueEqual(c2.filter, u2)) n2.push(Object.assign(Object.assign({}, i3), { id: c2.id }));
            else {
              this.unsubscribe(), this.state = H.errored, null == t10 || t10(R.CHANNEL_ERROR, Error("mismatch between server and client bindings for postgres changes"));
              return;
            }
          }
          this.bindings.postgres_changes = n2, this.state != H.errored && t10 && t10(R.SUBSCRIBED);
        }
        presenceState() {
          return this.presence.state;
        }
        async track(e10, t10 = {}) {
          return await this.send({ type: "presence", event: "track", payload: e10 }, t10);
        }
        async untrack(e10 = {}) {
          return await this.send({ type: "presence", event: "untrack" }, e10);
        }
        on(e10, t10, r10) {
          let s2 = this.channelAdapter.isJoined() || this.channelAdapter.isJoining(), i2 = e10 === O.PRESENCE || e10 === O.POSTGRES_CHANGES;
          if (s2 && i2) throw this.socket.log("channel", `cannot add \`${e10}\` callbacks for ${this.topic} after \`subscribe()\`.`), Error(`cannot add \`${e10}\` callbacks for ${this.topic} after \`subscribe()\`.`);
          return this._on(e10, t10, r10);
        }
        async httpSend(e10, t10, r10 = {}) {
          var s2;
          if (null == t10) return Promise.reject(Error("Payload is required for httpSend()"));
          let i2 = t10 instanceof ArrayBuffer || ArrayBuffer.isView(t10), n2 = { apikey: this.socket.apiKey ? this.socket.apiKey : "", "Content-Type": i2 ? "application/octet-stream" : "application/json" };
          this.socket.accessTokenValue && (n2.Authorization = `Bearer ${this.socket.accessTokenValue}`);
          let a2 = new URL(this.broadcastEndpointURL);
          a2.pathname += `/${encodeURIComponent(this.subTopic)}/events/${encodeURIComponent(e10)}`, this.private && a2.searchParams.set("private", "true");
          let o2 = { method: "POST", headers: n2, body: i2 ? t10 : JSON.stringify(t10) }, l2 = await this._fetchWithTimeout(a2.toString(), o2, null !== (s2 = r10.timeout) && void 0 !== s2 ? s2 : this.timeout);
          if (202 === l2.status) return { success: true };
          if (404 === l2.status) return Promise.reject(Error("httpSend() requires Realtime server v2.97.0 or newer; the endpoint returned 404. Update your Supabase CLI to a recent version, or upgrade the Realtime server in your self-hosted setup. See https://github.com/supabase/supabase-js/blob/master/packages/core/realtime-js/migrations/httpsend-server-version.md"));
          let u2 = l2.statusText;
          try {
            let e11 = await l2.json();
            u2 = e11.error || e11.message || u2;
          } catch (e11) {
          }
          return Promise.reject(Error(u2));
        }
        async send(e10, t10 = {}) {
          var r10, s2;
          if (this.channelAdapter.canPush() || "broadcast" !== e10.type) return new Promise((r11) => {
            var s3, i2, n2;
            let a2 = this.channelAdapter.push(e10.type, e10, t10.timeout || this.timeout);
            "broadcast" !== e10.type || (null === (n2 = null === (i2 = null === (s3 = this.params) || void 0 === s3 ? void 0 : s3.config) || void 0 === i2 ? void 0 : i2.broadcast) || void 0 === n2 ? void 0 : n2.ack) || r11("ok"), a2.receive("ok", () => r11("ok")), a2.receive("error", () => r11("error")), a2.receive("timeout", () => r11("timed out"));
          });
          {
            console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");
            let { event: i2, payload: n2 } = e10, a2 = { apikey: this.socket.apiKey ? this.socket.apiKey : "", "Content-Type": "application/json" };
            this.socket.accessTokenValue && (a2.Authorization = `Bearer ${this.socket.accessTokenValue}`);
            let o2 = { method: "POST", headers: a2, body: JSON.stringify({ messages: [{ topic: this.subTopic, event: i2, payload: n2, private: this.private }] }) };
            try {
              let e11 = await this._fetchWithTimeout(this.broadcastEndpointURL, o2, null !== (r10 = t10.timeout) && void 0 !== r10 ? r10 : this.timeout);
              return await (null === (s2 = e11.body) || void 0 === s2 ? void 0 : s2.cancel()), e11.ok ? "ok" : "error";
            } catch (e11) {
              if (e11 instanceof Error && "AbortError" === e11.name) return "timed out";
              return "error";
            }
          }
        }
        updateJoinPayload(e10) {
          this.channelAdapter.updateJoinPayload(e10);
        }
        async unsubscribe(e10 = this.timeout) {
          return new Promise((t10) => {
            this.channelAdapter.unsubscribe(e10).receive("ok", () => t10("ok")).receive("timeout", () => t10("timed out")).receive("error", () => t10("error"));
          });
        }
        teardown() {
          this.channelAdapter.teardown();
        }
        async _fetchWithTimeout(e10, t10, r10) {
          let s2 = new AbortController(), i2 = setTimeout(() => s2.abort(), r10), n2 = await this.socket.fetch(e10, Object.assign(Object.assign({}, t10), { signal: s2.signal }));
          return clearTimeout(i2), n2;
        }
        _on(e10, t10, r10) {
          var s2;
          let i2 = e10.toLocaleLowerCase(), n2 = null == t10 ? void 0 : t10.filter;
          if ((n2 instanceof eI || "object" == typeof n2 && null !== n2 && "function" == typeof n2.build) && (t10 = Object.assign(Object.assign({}, t10), { filter: n2.build() })), i2 === O.POSTGRES_CHANGES && (null === (s2 = this.bindings[i2]) || void 0 === s2 ? void 0 : s2.find((e11) => ej.isSamePostgresFilter(e11.filter, t10)))) return this.socket.log("error", `duplicate \`postgres_changes\` binding for ${this.topic} ignored`, t10), this;
          let a2 = this.channelAdapter.on(e10, r10), o2 = { type: i2, filter: t10, callback: r10, ref: a2 };
          return this.bindings[i2] ? this.bindings[i2].push(o2) : this.bindings[i2] = [o2], this._updateFilterMessage(), this;
        }
        _onClose(e10) {
          this.channelAdapter.onClose(e10);
        }
        _onError(e10) {
          this.channelAdapter.onError(e10);
        }
        _updateFilterMessage() {
          this.channelAdapter.updateFilterBindings((e10, t10, r10) => {
            var s2, i2, n2, a2, o2, l2, u2;
            let c2 = e10.event.toLocaleLowerCase();
            if (this._notThisChannelEvent(c2, r10)) return false;
            let h2 = null === (s2 = this.bindings[c2]) || void 0 === s2 ? void 0 : s2.find((t11) => t11.ref === e10.ref);
            if (!h2) return true;
            if (!["broadcast", "presence", "postgres_changes"].includes(c2)) return h2.type.toLocaleLowerCase() === c2;
            if ("id" in h2) {
              let e11 = h2.id, r11 = null === (i2 = h2.filter) || void 0 === i2 ? void 0 : i2.event;
              return e11 && (null === (n2 = t10.ids) || void 0 === n2 ? void 0 : n2.includes(e11)) && ("*" === r11 || (null == r11 ? void 0 : r11.toLocaleLowerCase()) === (null === (a2 = t10.data) || void 0 === a2 ? void 0 : a2.type.toLocaleLowerCase()));
            }
            {
              let e11 = null === (l2 = null === (o2 = null == h2 ? void 0 : h2.filter) || void 0 === o2 ? void 0 : o2.event) || void 0 === l2 ? void 0 : l2.toLocaleLowerCase();
              return "*" === e11 || e11 === (null === (u2 = null == t10 ? void 0 : t10.event) || void 0 === u2 ? void 0 : u2.toLocaleLowerCase());
            }
          });
        }
        _notThisChannelEvent(e10, t10) {
          let { close: r10, error: s2, leave: i2, join: n2 } = V;
          return t10 && [r10, s2, i2, n2].includes(e10) && t10 !== this.joinPush.ref;
        }
        _updateFilterTransform() {
          this.channelAdapter.updatePayloadTransform((e10, t10, r10) => {
            if ("object" == typeof t10 && "ids" in t10) {
              let e11 = t10.data, { schema: r11, table: s2, commit_timestamp: i2, type: n2, errors: a2 } = e11;
              return Object.assign(Object.assign({}, { schema: r11, table: s2, commit_timestamp: i2, eventType: n2, new: {}, old: {}, errors: a2 }), this._getPayloadRecords(e11));
            }
            return t10;
          });
        }
        copyBindings(e10) {
          if (this.joinedOnce) throw Error("cannot copy bindings into joined channel");
          for (let t10 in e10.bindings) for (let r10 of e10.bindings[t10]) this._on(r10.type, r10.filter, r10.callback);
        }
        static isFilterValueEqual(e10, t10) {
          return (null != e10 ? e10 : void 0) === (null != t10 ? t10 : void 0);
        }
        static isSamePostgresFilter(e10, t10) {
          var r10, s2, i2, n2;
          let a2 = null !== (s2 = null === (r10 = null == e10 ? void 0 : e10.select) || void 0 === r10 ? void 0 : r10.join()) && void 0 !== s2 ? s2 : void 0, o2 = null !== (n2 = null === (i2 = null == t10 ? void 0 : t10.select) || void 0 === i2 ? void 0 : i2.join()) && void 0 !== n2 ? n2 : void 0;
          return (null == e10 ? void 0 : e10.event) === (null == t10 ? void 0 : t10.event) && ej.isFilterValueEqual(null == e10 ? void 0 : e10.schema, null == t10 ? void 0 : t10.schema) && ej.isFilterValueEqual(null == e10 ? void 0 : e10.table, null == t10 ? void 0 : t10.table) && ej.isFilterValueEqual(null == e10 ? void 0 : e10.filter, null == t10 ? void 0 : t10.filter) && a2 === o2;
        }
        _getPayloadRecords(e10) {
          let t10 = { new: {}, old: {} };
          return ("INSERT" === e10.type || "UPDATE" === e10.type) && (t10.new = J(e10.columns, e10.record)), ("UPDATE" === e10.type || "DELETE" === e10.type) && (t10.old = J(e10.columns, e10.old_record)), t10;
        }
      }
      class eN {
        constructor(e10, t10) {
          this.socket = new ev(e10, t10);
        }
        get timeout() {
          return this.socket.timeout;
        }
        get endPoint() {
          return this.socket.endPoint;
        }
        get transport() {
          return this.socket.transport;
        }
        get heartbeatIntervalMs() {
          return this.socket.heartbeatIntervalMs;
        }
        get heartbeatCallback() {
          return this.socket.heartbeatCallback;
        }
        set heartbeatCallback(e10) {
          this.socket.heartbeatCallback = e10;
        }
        get heartbeatTimer() {
          return this.socket.heartbeatTimer;
        }
        get pendingHeartbeatRef() {
          return this.socket.pendingHeartbeatRef;
        }
        get reconnectTimer() {
          return this.socket.reconnectTimer;
        }
        get vsn() {
          return this.socket.vsn;
        }
        get encode() {
          return this.socket.encode;
        }
        get decode() {
          return this.socket.decode;
        }
        get reconnectAfterMs() {
          return this.socket.reconnectAfterMs;
        }
        get sendBuffer() {
          return this.socket.sendBuffer;
        }
        get stateChangeCallbacks() {
          return this.socket.stateChangeCallbacks;
        }
        connect() {
          this.socket.connect();
        }
        disconnect(e10, t10, r10, s2 = 1e4) {
          return new Promise((i2) => {
            setTimeout(() => i2("timeout"), s2), this.socket.disconnect(() => {
              e10(), i2("ok");
            }, t10, r10);
          });
        }
        push(e10) {
          this.socket.push(e10);
        }
        log(e10, t10, r10) {
          this.socket.log(e10, t10, r10);
        }
        makeRef() {
          return this.socket.makeRef();
        }
        onOpen(e10) {
          this.socket.onOpen(e10);
        }
        onClose(e10) {
          this.socket.onClose(e10);
        }
        onError(e10) {
          this.socket.onError(e10);
        }
        onMessage(e10) {
          this.socket.onMessage(e10);
        }
        isConnected() {
          return this.socket.isConnected();
        }
        isConnecting() {
          return this.socket.connectionState() == W.connecting;
        }
        isDisconnecting() {
          return this.socket.connectionState() == W.closing;
        }
        connectionState() {
          return this.socket.connectionState();
        }
        endPointURL() {
          return this.socket.endPointURL();
        }
        sendHeartbeat() {
          this.socket.sendHeartbeat();
        }
        getSocket() {
          return this.socket;
        }
      }
      let eL = { HEARTBEAT_INTERVAL: 25e3 }, e$ = [1e3, 2e3, 5e3, 1e4], eU = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
      class eD {
        get endPoint() {
          return this.socketAdapter.endPoint;
        }
        get timeout() {
          return this.socketAdapter.timeout;
        }
        get transport() {
          return this.socketAdapter.transport;
        }
        get heartbeatCallback() {
          return this.socketAdapter.heartbeatCallback;
        }
        get heartbeatIntervalMs() {
          return this.socketAdapter.heartbeatIntervalMs;
        }
        get heartbeatTimer() {
          return this.worker ? this._workerHeartbeatTimer : this.socketAdapter.heartbeatTimer;
        }
        get pendingHeartbeatRef() {
          return this.worker ? this._pendingWorkerHeartbeatRef : this.socketAdapter.pendingHeartbeatRef;
        }
        get reconnectTimer() {
          return this.socketAdapter.reconnectTimer;
        }
        get vsn() {
          return this.socketAdapter.vsn;
        }
        get encode() {
          return this.socketAdapter.encode;
        }
        get decode() {
          return this.socketAdapter.decode;
        }
        get reconnectAfterMs() {
          return this.socketAdapter.reconnectAfterMs;
        }
        get sendBuffer() {
          return this.socketAdapter.sendBuffer;
        }
        get stateChangeCallbacks() {
          return this.socketAdapter.stateChangeCallbacks;
        }
        constructor(e10, t10) {
          var r10;
          if (this.channels = [], this.accessTokenValue = null, this.accessToken = null, this.apiKey = null, this.httpEndpoint = "", this.headers = {}, this.params = {}, this.ref = 0, this.serializer = new z(), this._manuallySetToken = false, this._authPromise = null, this._authGeneration = 0, this._workerHeartbeatTimer = void 0, this._pendingWorkerHeartbeatRef = null, this._pendingDisconnectTimer = null, this._disconnectOnEmptyChannelsAfterMs = 0, this._resolveFetch = (e11) => e11 ? (...t11) => e11(...t11) : (...e12) => fetch(...e12), !(null === (r10 = null == t10 ? void 0 : t10.params) || void 0 === r10 ? void 0 : r10.apikey)) throw Error("API key is required to connect to Realtime");
          this.apiKey = t10.params.apikey;
          let s2 = this._initializeOptions(t10);
          this.socketAdapter = new eN(e10, s2), this.httpEndpoint = er(e10), this.fetch = this._resolveFetch(null == t10 ? void 0 : t10.fetch);
        }
        connect() {
          if (!(this.isConnecting() || this.isDisconnecting() || this.isConnected())) {
            this.accessToken && !this._authPromise && this._setAuthSafely("connect"), this._setupConnectionHandlers();
            try {
              this.socketAdapter.connect();
            } catch (t10) {
              let e10 = t10.message;
              throw Error(`WebSocket not available: ${e10}`);
            }
            this._handleNodeJsRaceCondition();
          }
        }
        endpointURL() {
          return this.socketAdapter.endPointURL();
        }
        async disconnect(e10, t10) {
          return (this._cancelPendingDisconnect(), this.isDisconnecting()) ? "ok" : await this.socketAdapter.disconnect(() => {
            clearInterval(this._workerHeartbeatTimer), this._terminateWorker();
          }, e10, t10);
        }
        getChannels() {
          return this.channels;
        }
        async removeChannel(e10) {
          let t10 = await e10.unsubscribe();
          return "ok" === t10 && e10.teardown(), t10;
        }
        async removeAllChannels() {
          let e10 = this.channels.map(async (e11) => {
            let t11 = await e11.unsubscribe();
            return e11.teardown(), t11;
          }), t10 = await Promise.all(e10);
          return await this.disconnect(), t10;
        }
        log(e10, t10, r10) {
          this.socketAdapter.log(e10, t10, r10);
        }
        connectionState() {
          return this.socketAdapter.connectionState() || W.closed;
        }
        isConnected() {
          return this.socketAdapter.isConnected();
        }
        isConnecting() {
          return this.socketAdapter.isConnecting();
        }
        isDisconnecting() {
          return this.socketAdapter.isDisconnecting();
        }
        channel(e10, t10 = { config: {} }) {
          let r10 = `realtime:${e10}`, s2 = this.getChannels().find((e11) => e11.topic === r10);
          if (s2) return s2;
          {
            let r11 = new ej(`realtime:${e10}`, t10, this);
            return this._cancelPendingDisconnect(), this.channels.push(r11), r11;
          }
        }
        push(e10) {
          this.socketAdapter.push(e10);
        }
        async setAuth(e10 = null) {
          let t10 = ++this._authGeneration, r10 = this._performAuth(e10, t10);
          t10 === this._authGeneration && (this._authPromise = r10);
          try {
            await r10;
          } finally {
            this._authPromise === r10 && (this._authPromise = null);
          }
        }
        _isManualToken() {
          return this._manuallySetToken;
        }
        async sendHeartbeat() {
          this.socketAdapter.sendHeartbeat();
        }
        onHeartbeat(e10) {
          this.socketAdapter.heartbeatCallback = this._wrapHeartbeatCallback(e10);
        }
        _makeRef() {
          return this.socketAdapter.makeRef();
        }
        _remove(e10) {
          this.channels = this.channels.filter((t10) => t10.topic !== e10.topic), 0 === this.channels.length && (this.log("transport", "no channels remaining, scheduling disconnect"), this._schedulePendingDisconnect());
        }
        _schedulePendingDisconnect() {
          if (this._cancelPendingDisconnect(), 0 === this._disconnectOnEmptyChannelsAfterMs) {
            this.log("transport", "disconnecting immediately - no channels"), this.disconnect();
            return;
          }
          this._pendingDisconnectTimer = setTimeout(() => {
            this._pendingDisconnectTimer = null, 0 === this.channels.length && (this.log("transport", "deferred disconnect fired - no channels, disconnecting"), this.disconnect());
          }, this._disconnectOnEmptyChannelsAfterMs), this.log("transport", `deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`);
        }
        _cancelPendingDisconnect() {
          null !== this._pendingDisconnectTimer && (this.log("transport", "pending disconnect cancelled - channel activity detected"), clearTimeout(this._pendingDisconnectTimer), this._pendingDisconnectTimer = null);
        }
        async _performAuth(e10, t10) {
          let r10;
          let s2 = false;
          if (e10) r10 = e10, s2 = true;
          else if (this.accessToken) try {
            r10 = await this.accessToken();
          } catch (e11) {
            this.log("error", "Error fetching access token from callback", e11), r10 = this.accessTokenValue;
          }
          else r10 = this.accessTokenValue;
          t10 === this._authGeneration && (this.accessToken ? this._manuallySetToken = false : s2 && (this._manuallySetToken = true), this.accessTokenValue != r10 && (this.accessTokenValue = r10, this.channels.forEach((e11) => {
            let t11 = { access_token: r10, version: "realtime-js/2.112.3" };
            e11.updateJoinPayload(t11), e11.joinedOnce && e11.channelAdapter.isJoined() && e11.channelAdapter.push(V.access_token, { access_token: r10 });
          })));
        }
        async _waitForAuthIfNeeded() {
          this._authPromise && await this._authPromise;
        }
        _setAuthSafely(e10 = "general") {
          this._isManualToken() || this.setAuth().catch((t10) => {
            this.log("error", `Error setting auth in ${e10}`, t10);
          });
        }
        _setupConnectionHandlers() {
          this.socketAdapter.onOpen(() => {
            (this._authPromise || (this.accessToken && !this.accessTokenValue ? this.setAuth() : Promise.resolve())).catch((e10) => {
              this.log("error", "error waiting for auth on connect", e10);
            }), this.worker && !this.workerRef && this._startWorkerHeartbeat();
          }), this.socketAdapter.onClose(() => {
            this.worker && this.workerRef && this._terminateWorker();
          }), this.socketAdapter.onMessage((e10) => {
            e10.ref && e10.ref === this._pendingWorkerHeartbeatRef && (this._pendingWorkerHeartbeatRef = null);
          });
        }
        _handleNodeJsRaceCondition() {
          this.socketAdapter.isConnected() && this.socketAdapter.getSocket().onConnOpen();
        }
        _wrapHeartbeatCallback(e10) {
          return (t10, r10) => {
            "disconnected" !== t10 && ("sent" == t10 && this._setAuthSafely(), e10 && e10(t10, r10));
          };
        }
        _startWorkerHeartbeat() {
          this.workerUrl ? this.log("worker", `starting worker for from ${this.workerUrl}`) : this.log("worker", "starting default worker");
          let e10 = this._workerObjectUrl(this.workerUrl);
          this.workerRef = new Worker(e10), this.workerRef.onerror = (e11) => {
            this.log("worker", "worker error", e11.message), this._terminateWorker(), this.disconnect();
          }, this.workerRef.onmessage = (e11) => {
            "keepAlive" === e11.data.event && this.sendHeartbeat();
          }, this.workerRef.postMessage({ event: "start", interval: this.heartbeatIntervalMs });
        }
        _terminateWorker() {
          this.workerRef && (this.log("worker", "terminating worker"), this.workerRef.terminate(), this.workerRef = void 0);
        }
        _workerObjectUrl(e10) {
          let t10;
          if (e10) t10 = e10;
          else {
            let e11 = new Blob([eU], { type: "application/javascript" });
            t10 = URL.createObjectURL(e11);
          }
          return t10;
        }
        _initializeOptions(e10) {
          var t10, r10, s2, i2, n2, a2, o2, l2, u2, c2, h2, d2;
          let p2, f2;
          this.worker = null !== (t10 = null == e10 ? void 0 : e10.worker) && void 0 !== t10 && t10, this.accessToken = null !== (r10 = null == e10 ? void 0 : e10.accessToken) && void 0 !== r10 ? r10 : null;
          let g2 = {};
          g2.timeout = null !== (s2 = null == e10 ? void 0 : e10.timeout) && void 0 !== s2 ? s2 : 1e4, g2.heartbeatIntervalMs = null !== (i2 = null == e10 ? void 0 : e10.heartbeatIntervalMs) && void 0 !== i2 ? i2 : eL.HEARTBEAT_INTERVAL, this._disconnectOnEmptyChannelsAfterMs = null !== (n2 = null == e10 ? void 0 : e10.disconnectOnEmptyChannelsAfterMs) && void 0 !== n2 ? n2 : 2 * (null !== (a2 = null == e10 ? void 0 : e10.heartbeatIntervalMs) && void 0 !== a2 ? a2 : eL.HEARTBEAT_INTERVAL), g2.transport = null !== (o2 = null == e10 ? void 0 : e10.transport) && void 0 !== o2 ? o2 : q.getWebSocketConstructor(), g2.params = null == e10 ? void 0 : e10.params, g2.logger = null == e10 ? void 0 : e10.logger, g2.heartbeatCallback = this._wrapHeartbeatCallback(null == e10 ? void 0 : e10.heartbeatCallback), g2.sessionStorage = null !== (l2 = null == e10 ? void 0 : e10.sessionStorage) && void 0 !== l2 ? l2 : function() {
            try {
              if ("undefined" != typeof globalThis && globalThis.sessionStorage) return globalThis.sessionStorage;
            } catch (e11) {
            }
            return /* @__PURE__ */ function() {
              let e11 = /* @__PURE__ */ new Map();
              return { get length() {
                return e11.size;
              }, clear() {
                e11.clear();
              }, getItem: (t11) => e11.has(t11) ? e11.get(t11) : null, key(t11) {
                var r11;
                return null !== (r11 = Array.from(e11.keys())[t11]) && void 0 !== r11 ? r11 : null;
              }, removeItem(t11) {
                e11.delete(t11);
              }, setItem(t11, r11) {
                e11.set(t11, String(r11));
              } };
            }();
          }(), g2.reconnectAfterMs = null !== (u2 = null == e10 ? void 0 : e10.reconnectAfterMs) && void 0 !== u2 ? u2 : (e11) => e$[e11 - 1] || 1e4;
          let m2 = null !== (c2 = null == e10 ? void 0 : e10.vsn) && void 0 !== c2 ? c2 : F;
          switch (m2) {
            case "1.0.0":
              p2 = (e11, t11) => t11(JSON.stringify(e11)), f2 = (e11, t11) => t11(JSON.parse(e11));
              break;
            case F:
              p2 = this.serializer.encode.bind(this.serializer), f2 = this.serializer.decode.bind(this.serializer);
              break;
            default:
              throw Error(`Unsupported serializer version: ${g2.vsn}`);
          }
          if (g2.vsn = m2, g2.encode = null !== (h2 = null == e10 ? void 0 : e10.encode) && void 0 !== h2 ? h2 : p2, g2.decode = null !== (d2 = null == e10 ? void 0 : e10.decode) && void 0 !== d2 ? d2 : f2, g2.beforeReconnect = this._reconnectAuth.bind(this), ((null == e10 ? void 0 : e10.logLevel) || (null == e10 ? void 0 : e10.log_level)) && (this.logLevel = e10.logLevel || e10.log_level, g2.params = Object.assign(Object.assign({}, g2.params), { log_level: this.logLevel })), this.worker) {
            if ("undefined" != typeof window && !window.Worker) throw Error("Web Worker is not supported");
            this.workerUrl = null == e10 ? void 0 : e10.workerUrl, g2.autoSendHeartbeat = !this.worker;
          }
          return g2;
        }
        async _reconnectAuth() {
          await this._waitForAuthIfNeeded(), this.isConnected() || this.connect();
        }
      }
      var eM = class extends Error {
        constructor(e10, t10) {
          super(e10), this.name = "IcebergError", this.status = t10.status, this.icebergType = t10.icebergType, this.icebergCode = t10.icebergCode, this.details = t10.details, this.isCommitStateUnknown = "CommitStateUnknownException" === t10.icebergType || [500, 502, 504].includes(t10.status) && t10.icebergType?.includes("CommitState") === true;
        }
        isNotFound() {
          return 404 === this.status;
        }
        isConflict() {
          return 409 === this.status;
        }
        isAuthenticationTimeout() {
          return 419 === this.status;
        }
      };
      async function eB(e10) {
        return e10 && "none" !== e10.type ? "bearer" === e10.type ? { Authorization: `Bearer ${e10.token}` } : "header" === e10.type ? { [e10.name]: e10.value } : "custom" === e10.type ? await e10.getHeaders() : {} : {};
      }
      function eq(e10) {
        return e10.join("");
      }
      var eF = class {
        constructor(e10, t10 = "") {
          this.client = e10, this.prefix = t10;
        }
        async listNamespaces(e10) {
          let t10 = e10 ? { parent: eq(e10.namespace) } : void 0;
          return (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces`, query: t10 })).data.namespaces.map((e11) => ({ namespace: e11 }));
        }
        async createNamespace(e10, t10) {
          let r10 = { namespace: e10.namespace, properties: t10?.properties };
          return (await this.client.request({ method: "POST", path: `${this.prefix}/namespaces`, body: r10 })).data;
        }
        async dropNamespace(e10) {
          await this.client.request({ method: "DELETE", path: `${this.prefix}/namespaces/${eq(e10.namespace)}` });
        }
        async loadNamespaceMetadata(e10) {
          return { properties: (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces/${eq(e10.namespace)}` })).data.properties };
        }
        async namespaceExists(e10) {
          try {
            return await this.client.request({ method: "HEAD", path: `${this.prefix}/namespaces/${eq(e10.namespace)}` }), true;
          } catch (e11) {
            if (e11 instanceof eM && 404 === e11.status) return false;
            throw e11;
          }
        }
        async createNamespaceIfNotExists(e10, t10) {
          try {
            return await this.createNamespace(e10, t10);
          } catch (e11) {
            if (e11 instanceof eM && 409 === e11.status) return;
            throw e11;
          }
        }
      };
      function eH(e10) {
        return e10.join("");
      }
      var eV = class {
        constructor(e10, t10 = "", r10) {
          this.client = e10, this.prefix = t10, this.accessDelegation = r10;
        }
        async listTables(e10) {
          return (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces/${eH(e10.namespace)}/tables` })).data.identifiers;
        }
        async createTable(e10, t10) {
          let r10 = {};
          return this.accessDelegation && (r10["X-Iceberg-Access-Delegation"] = this.accessDelegation), (await this.client.request({ method: "POST", path: `${this.prefix}/namespaces/${eH(e10.namespace)}/tables`, body: t10, headers: r10 })).data.metadata;
        }
        async updateTable(e10, t10) {
          let r10 = await this.client.request({ method: "POST", path: `${this.prefix}/namespaces/${eH(e10.namespace)}/tables/${e10.name}`, body: t10 });
          return { "metadata-location": r10.data["metadata-location"], metadata: r10.data.metadata };
        }
        async dropTable(e10, t10) {
          await this.client.request({ method: "DELETE", path: `${this.prefix}/namespaces/${eH(e10.namespace)}/tables/${e10.name}`, query: { purgeRequested: String(t10?.purge ?? false) } });
        }
        async loadTable(e10) {
          let t10 = {};
          return this.accessDelegation && (t10["X-Iceberg-Access-Delegation"] = this.accessDelegation), (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces/${eH(e10.namespace)}/tables/${e10.name}`, headers: t10 })).data.metadata;
        }
        async tableExists(e10) {
          let t10 = {};
          this.accessDelegation && (t10["X-Iceberg-Access-Delegation"] = this.accessDelegation);
          try {
            return await this.client.request({ method: "HEAD", path: `${this.prefix}/namespaces/${eH(e10.namespace)}/tables/${e10.name}`, headers: t10 }), true;
          } catch (e11) {
            if (e11 instanceof eM && 404 === e11.status) return false;
            throw e11;
          }
        }
        async createTableIfNotExists(e10, t10) {
          try {
            return await this.createTable(e10, t10);
          } catch (r10) {
            if (r10 instanceof eM && 409 === r10.status) return await this.loadTable({ namespace: e10.namespace, name: t10.name });
            throw r10;
          }
        }
      }, eW = class {
        constructor(e10) {
          let t10 = "v1";
          e10.catalogName && (t10 += `/${e10.catalogName}`);
          let r10 = e10.baseUrl.endsWith("/") ? e10.baseUrl : `${e10.baseUrl}/`;
          this.client = function(e11) {
            let t11 = e11.fetchImpl ?? globalThis.fetch;
            return { async request({ method: r11, path: s2, query: i2, body: n2, headers: a2 }) {
              let o2 = function(e12, t12, r12) {
                let s3 = new URL(t12, e12);
                if (r12) for (let [e13, t13] of Object.entries(r12)) void 0 !== t13 && s3.searchParams.set(e13, t13);
                return s3.toString();
              }(e11.baseUrl, s2, i2), l2 = await eB(e11.auth), u2 = await t11(o2, { method: r11, headers: { ...n2 ? { "Content-Type": "application/json" } : {}, ...l2, ...a2 }, body: n2 ? JSON.stringify(n2) : void 0 }), c2 = await u2.text(), h2 = (u2.headers.get("content-type") || "").includes("application/json"), d2 = h2 && c2 ? JSON.parse(c2) : c2;
              if (!u2.ok) {
                let e12 = h2 ? d2 : void 0, t12 = e12?.error;
                throw new eM(t12?.message ?? `Request failed with status ${u2.status}`, { status: u2.status, icebergType: t12?.type, icebergCode: t12?.code, details: e12 });
              }
              return { status: u2.status, headers: u2.headers, data: d2 };
            } };
          }({ baseUrl: r10, auth: e10.auth, fetchImpl: e10.fetch }), this.accessDelegation = e10.accessDelegation?.join(","), this.namespaceOps = new eF(this.client, t10), this.tableOps = new eV(this.client, t10, this.accessDelegation);
        }
        async listNamespaces(e10) {
          return this.namespaceOps.listNamespaces(e10);
        }
        async createNamespace(e10, t10) {
          return this.namespaceOps.createNamespace(e10, t10);
        }
        async dropNamespace(e10) {
          await this.namespaceOps.dropNamespace(e10);
        }
        async loadNamespaceMetadata(e10) {
          return this.namespaceOps.loadNamespaceMetadata(e10);
        }
        async listTables(e10) {
          return this.tableOps.listTables(e10);
        }
        async createTable(e10, t10) {
          return this.tableOps.createTable(e10, t10);
        }
        async updateTable(e10, t10) {
          return this.tableOps.updateTable(e10, t10);
        }
        async dropTable(e10, t10) {
          await this.tableOps.dropTable(e10, t10);
        }
        async loadTable(e10) {
          return this.tableOps.loadTable(e10);
        }
        async namespaceExists(e10) {
          return this.namespaceOps.namespaceExists(e10);
        }
        async tableExists(e10) {
          return this.tableOps.tableExists(e10);
        }
        async createNamespaceIfNotExists(e10, t10) {
          return this.namespaceOps.createNamespaceIfNotExists(e10, t10);
        }
        async createTableIfNotExists(e10, t10) {
          return this.tableOps.createTableIfNotExists(e10, t10);
        }
      }, ez = r(195).Buffer;
      function eJ(e10) {
        return (eJ = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e11) {
          return typeof e11;
        } : function(e11) {
          return e11 && "function" == typeof Symbol && e11.constructor === Symbol && e11 !== Symbol.prototype ? "symbol" : typeof e11;
        })(e10);
      }
      function eG(e10, t10) {
        var r10 = Object.keys(e10);
        if (Object.getOwnPropertySymbols) {
          var s2 = Object.getOwnPropertySymbols(e10);
          t10 && (s2 = s2.filter(function(t11) {
            return Object.getOwnPropertyDescriptor(e10, t11).enumerable;
          })), r10.push.apply(r10, s2);
        }
        return r10;
      }
      function eK(e10) {
        for (var t10 = 1; t10 < arguments.length; t10++) {
          var r10 = null != arguments[t10] ? arguments[t10] : {};
          t10 % 2 ? eG(Object(r10), true).forEach(function(t11) {
            !function(e11, t12, r11) {
              var s2;
              (s2 = function(e12, t13) {
                if ("object" != eJ(e12) || !e12) return e12;
                var r12 = e12[Symbol.toPrimitive];
                if (void 0 !== r12) {
                  var s3 = r12.call(e12, t13 || "default");
                  if ("object" != eJ(s3)) return s3;
                  throw TypeError("@@toPrimitive must return a primitive value.");
                }
                return ("string" === t13 ? String : Number)(e12);
              }(t12, "string"), (t12 = "symbol" == eJ(s2) ? s2 : s2 + "") in e11) ? Object.defineProperty(e11, t12, { value: r11, enumerable: true, configurable: true, writable: true }) : e11[t12] = r11;
            }(e10, t11, r10[t11]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e10, Object.getOwnPropertyDescriptors(r10)) : eG(Object(r10)).forEach(function(t11) {
            Object.defineProperty(e10, t11, Object.getOwnPropertyDescriptor(r10, t11));
          });
        }
        return e10;
      }
      var eX = class extends Error {
        constructor(e10, t10 = "storage", r10, s2) {
          super(e10), this.__isStorageError = true, this.namespace = t10, this.name = "vectors" === t10 ? "StorageVectorsError" : "StorageError", this.status = r10, this.statusCode = s2;
        }
        toJSON() {
          return { name: this.name, message: this.message, status: this.status, statusCode: this.statusCode };
        }
      };
      function eY(e10) {
        return "object" == typeof e10 && null !== e10 && "__isStorageError" in e10;
      }
      var eZ = class extends eX {
        constructor(e10, t10, r10, s2 = "storage", i2) {
          super(e10, s2, t10, r10), this.name = "vectors" === s2 ? "StorageVectorsApiError" : "StorageApiError", this.status = t10, this.statusCode = r10, this.code = i2;
        }
        toJSON() {
          return eK(eK({}, super.toJSON()), {}, { code: this.code });
        }
      }, eQ = class extends eX {
        constructor(e10, t10, r10 = "storage") {
          super(e10, r10), this.name = "vectors" === r10 ? "StorageVectorsUnknownError" : "StorageUnknownError", this.originalError = t10;
        }
      };
      function e0(e10, t10, r10) {
        let s2 = eK({}, e10), i2 = t10.toLowerCase();
        for (let e11 of Object.keys(s2)) e11.toLowerCase() === i2 && delete s2[e11];
        return s2[i2] = r10, s2;
      }
      let e1 = (e10) => e10 ? (...t10) => e10(...t10) : (...e11) => fetch(...e11), e2 = (e10) => {
        if ("object" != typeof e10 || null === e10) return false;
        let t10 = Object.getPrototypeOf(e10);
        return (null === t10 || t10 === Object.prototype || null === Object.getPrototypeOf(t10)) && !(Symbol.toStringTag in e10) && !(Symbol.iterator in e10);
      }, e3 = (e10) => {
        if (Array.isArray(e10)) return e10.map((e11) => e3(e11));
        if ("function" == typeof e10 || e10 !== Object(e10)) return e10;
        let t10 = {};
        return Object.entries(e10).forEach(([e11, r10]) => {
          t10[e11.replace(/([-_][a-z])/gi, (e12) => e12.toUpperCase().replace(/[-_]/g, ""))] = e3(r10);
        }), t10;
      }, e4 = (e10) => !(!e10 || "string" != typeof e10 || 0 === e10.length || e10.length > 100 || e10.trim() !== e10 || e10.includes("/") || e10.includes("\\")) && /^[\w!.\*'() &$@=;:+,?-]+$/.test(e10), e6 = (e10) => e10.split("/").map(encodeURIComponent).join("/"), e5 = (e10) => {
        if ("object" == typeof e10 && null !== e10) {
          if ("string" == typeof e10.msg) return e10.msg;
          if ("string" == typeof e10.message) return e10.message;
          if ("string" == typeof e10.error_description) return e10.error_description;
          if ("string" == typeof e10.error) return e10.error;
          if ("object" == typeof e10.error && null !== e10.error) {
            let t10 = e10.error;
            if ("string" == typeof t10.message) return t10.message;
          }
        }
        return JSON.stringify(e10);
      }, e8 = async (e10, t10, r10, s2) => {
        if (null !== e10 && "object" == typeof e10 && "json" in e10 && "function" == typeof e10.json) {
          let r11 = parseInt(String(e10.status), 10);
          Number.isFinite(r11) || (r11 = 500), e10.json().then((e11) => {
            let i2 = (null == e11 ? void 0 : e11.statusCode) || (null == e11 ? void 0 : e11.code) || r11 + "";
            t10(new eZ(e5(e11), r11, i2, s2, null == e11 ? void 0 : e11.code));
          }).catch(() => {
            let i2 = r11 + "";
            t10(new eZ(e10.statusText || `HTTP ${r11} error`, r11, i2, s2));
          });
        } else t10(new eQ(e5(e10), e10, s2));
      }, e9 = (e10, t10, r10, s2) => {
        let i2 = { method: e10, headers: (null == t10 ? void 0 : t10.headers) || {} };
        if ("GET" === e10 || "HEAD" === e10 || !s2) return eK(eK({}, i2), r10);
        if (e2(s2)) {
          var n2;
          let e11;
          let r11 = (null == t10 ? void 0 : t10.headers) || {};
          for (let [t11, s3] of Object.entries(r11)) "content-type" === t11.toLowerCase() && (e11 = s3);
          i2.headers = e0(r11, "Content-Type", null !== (n2 = e11) && void 0 !== n2 ? n2 : "application/json"), i2.body = JSON.stringify(s2);
        } else i2.body = s2;
        return (null == t10 ? void 0 : t10.duplex) && (i2.duplex = t10.duplex), eK(eK({}, i2), r10);
      };
      async function e7(e10, t10, r10, s2, i2, n2, a2) {
        return new Promise((o2, l2) => {
          e10(r10, e9(t10, s2, i2, n2)).then((e11) => {
            if (!e11.ok) throw e11;
            if (null == s2 ? void 0 : s2.noResolveJson) return e11;
            if ("vectors" === a2) {
              let t11 = e11.headers.get("content-type");
              if ("0" === e11.headers.get("content-length") || 204 === e11.status || !t11 || !t11.includes("application/json")) return {};
            }
            return e11.json();
          }).then((e11) => o2(e11)).catch((e11) => e8(e11, l2, s2, a2));
        });
      }
      function te(e10 = "storage") {
        return { get: async (t10, r10, s2, i2) => e7(t10, "GET", r10, s2, i2, void 0, e10), post: async (t10, r10, s2, i2, n2) => e7(t10, "POST", r10, i2, n2, s2, e10), put: async (t10, r10, s2, i2, n2) => e7(t10, "PUT", r10, i2, n2, s2, e10), head: async (t10, r10, s2, i2) => e7(t10, "HEAD", r10, eK(eK({}, s2), {}, { noResolveJson: true }), i2, void 0, e10), remove: async (t10, r10, s2, i2, n2) => e7(t10, "DELETE", r10, i2, n2, s2, e10) };
      }
      let { get: tt, post: tr, put: ts, head: ti, remove: tn } = te("storage"), ta = te("vectors");
      var to = class {
        constructor(e10, t10 = {}, r10, s2 = "storage") {
          this.shouldThrowOnError = false, this.url = e10, this.headers = function(e11) {
            let t11 = {};
            for (let [r11, s3] of Object.entries(e11)) t11[r11.toLowerCase()] = s3;
            return t11;
          }(t10), this.fetch = e1(r10), this.namespace = s2;
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        setHeader(e10, t10) {
          return this.headers = e0(this.headers, e10, t10), this;
        }
        async handleOperation(e10) {
          try {
            return { data: await e10(), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (eY(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
      };
      s = Symbol.toStringTag;
      var tl = class {
        constructor(e10, t10) {
          this.downloadFn = e10, this.shouldThrowOnError = t10, this[s] = "StreamDownloadBuilder", this.promise = null;
        }
        then(e10, t10) {
          return this.getPromise().then(e10, t10);
        }
        catch(e10) {
          return this.getPromise().catch(e10);
        }
        finally(e10) {
          return this.getPromise().finally(e10);
        }
        getPromise() {
          return this.promise || (this.promise = this.execute()), this.promise;
        }
        async execute() {
          try {
            return { data: (await this.downloadFn()).body, error: null };
          } catch (e10) {
            if (this.shouldThrowOnError) throw e10;
            if (eY(e10)) return { data: null, error: e10 };
            throw e10;
          }
        }
      };
      i = Symbol.toStringTag;
      var tu = class {
        constructor(e10, t10) {
          this.downloadFn = e10, this.shouldThrowOnError = t10, this[i] = "BlobDownloadBuilder", this.promise = null;
        }
        asStream() {
          return new tl(this.downloadFn, this.shouldThrowOnError);
        }
        then(e10, t10) {
          return this.getPromise().then(e10, t10);
        }
        catch(e10) {
          return this.getPromise().catch(e10);
        }
        finally(e10) {
          return this.getPromise().finally(e10);
        }
        getPromise() {
          return this.promise || (this.promise = this.execute()), this.promise;
        }
        async execute() {
          try {
            return { data: await (await this.downloadFn()).blob(), error: null };
          } catch (e10) {
            if (this.shouldThrowOnError) throw e10;
            if (eY(e10)) return { data: null, error: e10 };
            throw e10;
          }
        }
      };
      let tc = { limit: 100, offset: 0, sortBy: { column: "name", order: "asc" } }, th = { cacheControl: "3600", contentType: "text/plain;charset=UTF-8", upsert: false };
      var td = class extends to {
        constructor(e10, t10 = {}, r10, s2) {
          super(e10, t10, s2, "storage"), this.bucketId = r10;
        }
        async uploadOrUpdate(e10, t10, r10, s2) {
          var i2 = this;
          return i2.handleOperation(async () => {
            let n2;
            let a2 = eK(eK({}, th), s2), o2 = eK(eK({}, i2.headers), "POST" === e10 && { "x-upsert": String(a2.upsert) }), l2 = a2.metadata;
            if ("undefined" != typeof Blob && r10 instanceof Blob ? ((n2 = new FormData()).append("cacheControl", a2.cacheControl), l2 && n2.append("metadata", i2.encodeMetadata(l2)), n2.append("", r10)) : "undefined" != typeof FormData && r10 instanceof FormData ? ((n2 = r10).has("cacheControl") || n2.append("cacheControl", a2.cacheControl), l2 && !n2.has("metadata") && n2.append("metadata", i2.encodeMetadata(l2))) : (n2 = r10, o2["cache-control"] = `max-age=${a2.cacheControl}`, o2["content-type"] = a2.contentType, l2 && (o2["x-metadata"] = i2.toBase64(i2.encodeMetadata(l2))), ("undefined" != typeof ReadableStream && n2 instanceof ReadableStream || n2 && "object" == typeof n2 && "pipe" in n2 && "function" == typeof n2.pipe) && !a2.duplex && (a2.duplex = "half")), null == s2 ? void 0 : s2.headers) for (let [e11, t11] of Object.entries(s2.headers)) o2 = e0(o2, e11, t11);
            let u2 = i2._removeEmptyFolders(t10), c2 = i2._getFinalPath(u2), h2 = await ("PUT" == e10 ? ts : tr)(i2.fetch, `${i2.url}/object/${c2}`, n2, eK({ headers: o2 }, (null == a2 ? void 0 : a2.duplex) ? { duplex: a2.duplex } : {}));
            return { path: u2, id: h2.Id, fullPath: h2.Key };
          });
        }
        async upload(e10, t10, r10) {
          return this.uploadOrUpdate("POST", e10, t10, r10);
        }
        async uploadToSignedUrl(e10, t10, r10, s2) {
          var i2 = this;
          let n2 = i2._removeEmptyFolders(e10), a2 = i2._getFinalPath(n2), o2 = new URL(i2.url + `/object/upload/sign/${a2}`);
          return o2.searchParams.set("token", t10), i2.handleOperation(async () => {
            let e11;
            let t11 = eK(eK({}, th), s2), a3 = eK(eK({}, i2.headers), { "x-upsert": String(t11.upsert) }), l2 = t11.metadata;
            if ("undefined" != typeof Blob && r10 instanceof Blob ? ((e11 = new FormData()).append("cacheControl", t11.cacheControl), l2 && e11.append("metadata", i2.encodeMetadata(l2)), e11.append("", r10)) : "undefined" != typeof FormData && r10 instanceof FormData ? ((e11 = r10).has("cacheControl") || e11.append("cacheControl", t11.cacheControl), l2 && !e11.has("metadata") && e11.append("metadata", i2.encodeMetadata(l2))) : (e11 = r10, a3["cache-control"] = `max-age=${t11.cacheControl}`, a3["content-type"] = t11.contentType, l2 && (a3["x-metadata"] = i2.toBase64(i2.encodeMetadata(l2))), ("undefined" != typeof ReadableStream && e11 instanceof ReadableStream || e11 && "object" == typeof e11 && "pipe" in e11 && "function" == typeof e11.pipe) && !t11.duplex && (t11.duplex = "half")), null == s2 ? void 0 : s2.headers) for (let [e12, t12] of Object.entries(s2.headers)) a3 = e0(a3, e12, t12);
            return { path: n2, fullPath: (await ts(i2.fetch, o2.toString(), e11, eK({ headers: a3 }, (null == t11 ? void 0 : t11.duplex) ? { duplex: t11.duplex } : {}))).Key };
          });
        }
        async createSignedUploadUrl(e10, t10) {
          var r10 = this;
          return r10.handleOperation(async () => {
            let s2 = r10._getFinalPath(e10), i2 = eK({}, r10.headers);
            (null == t10 ? void 0 : t10.upsert) && (i2["x-upsert"] = "true");
            let n2 = await tr(r10.fetch, `${r10.url}/object/upload/sign/${s2}`, {}, { headers: i2 }), a2 = new URL(r10.url + n2.url), o2 = a2.searchParams.get("token");
            if (!o2) throw new eX("No token returned by API");
            return { signedUrl: a2.toString(), path: e10, token: o2 };
          });
        }
        async update(e10, t10, r10) {
          return this.uploadOrUpdate("PUT", e10, t10, r10);
        }
        async move(e10, t10, r10) {
          var s2 = this;
          return s2.handleOperation(async () => await tr(s2.fetch, `${s2.url}/object/move`, { bucketId: s2.bucketId, sourceKey: e10, destinationKey: t10, destinationBucket: null == r10 ? void 0 : r10.destinationBucket }, { headers: s2.headers }));
        }
        async copy(e10, t10, r10) {
          var s2 = this;
          return s2.handleOperation(async () => ({ path: (await tr(s2.fetch, `${s2.url}/object/copy`, { bucketId: s2.bucketId, sourceKey: e10, destinationKey: t10, destinationBucket: null == r10 ? void 0 : r10.destinationBucket }, { headers: s2.headers })).Key }));
        }
        async createSignedUrl(e10, t10, r10) {
          var s2 = this;
          return s2.handleOperation(async () => {
            let i2 = s2._getFinalPath(e10), n2 = "object" == typeof (null == r10 ? void 0 : r10.transform) && null !== r10.transform && Object.keys(r10.transform).length > 0, a2 = await tr(s2.fetch, `${s2.url}/object/sign/${i2}`, eK({ expiresIn: t10 }, n2 ? { transform: r10.transform } : {}), { headers: s2.headers }), o2 = new URLSearchParams();
            (null == r10 ? void 0 : r10.download) && o2.set("download", true === r10.download ? "" : r10.download), (null == r10 ? void 0 : r10.cacheNonce) != null && o2.set("cacheNonce", String(r10.cacheNonce));
            let l2 = o2.toString();
            return { signedUrl: encodeURI(`${s2.url}${a2.signedURL}${l2 ? `&${l2}` : ""}`) };
          });
        }
        async createSignedUrls(e10, t10, r10) {
          var s2 = this;
          return s2.handleOperation(async () => {
            let i2 = await tr(s2.fetch, `${s2.url}/object/sign/${s2.bucketId}`, { expiresIn: t10, paths: e10 }, { headers: s2.headers }), n2 = new URLSearchParams();
            (null == r10 ? void 0 : r10.download) && n2.set("download", true === r10.download ? "" : r10.download), (null == r10 ? void 0 : r10.cacheNonce) != null && n2.set("cacheNonce", String(r10.cacheNonce));
            let a2 = n2.toString();
            return i2.map((e11) => eK(eK({}, e11), {}, { signedUrl: e11.signedURL ? encodeURI(`${s2.url}${e11.signedURL}${a2 ? `&${a2}` : ""}`) : null }));
          });
        }
        download(e10, t10, r10) {
          let s2 = "object" == typeof (null == t10 ? void 0 : t10.transform) && null !== t10.transform && Object.keys(t10.transform).length > 0 ? "render/image/authenticated" : "object", i2 = new URLSearchParams();
          (null == t10 ? void 0 : t10.transform) && this.applyTransformOptsToQuery(i2, t10.transform), (null == t10 ? void 0 : t10.cacheNonce) != null && i2.set("cacheNonce", String(t10.cacheNonce));
          let n2 = i2.toString(), a2 = this._getFinalPath(e10);
          return new tu(() => tt(this.fetch, `${this.url}/${s2}/${a2}${n2 ? `?${n2}` : ""}`, { headers: this.headers, noResolveJson: true }, r10), this.shouldThrowOnError);
        }
        async info(e10) {
          var t10 = this;
          let r10 = t10._getFinalPath(e10);
          return t10.handleOperation(async () => e3(await tt(t10.fetch, `${t10.url}/object/info/${r10}`, { headers: t10.headers })));
        }
        async exists(e10) {
          var t10;
          let r10 = this._getFinalPath(e10);
          try {
            return await ti(this.fetch, `${this.url}/object/${r10}`, { headers: this.headers }), { data: true, error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (eY(e11)) {
              let r11 = e11 instanceof eZ ? e11.status : e11 instanceof eQ ? null === (t10 = e11.originalError) || void 0 === t10 ? void 0 : t10.status : void 0;
              if (void 0 !== r11 && [400, 404].includes(r11)) return { data: false, error: e11 };
            }
            throw e11;
          }
        }
        getPublicUrl(e10, t10) {
          let r10 = this._getFinalPath(e10), s2 = new URLSearchParams();
          (null == t10 ? void 0 : t10.download) && s2.set("download", true === t10.download ? "" : t10.download), (null == t10 ? void 0 : t10.transform) && this.applyTransformOptsToQuery(s2, t10.transform), (null == t10 ? void 0 : t10.cacheNonce) != null && s2.set("cacheNonce", String(t10.cacheNonce));
          let i2 = s2.toString(), n2 = "object" == typeof (null == t10 ? void 0 : t10.transform) && null !== t10.transform && Object.keys(t10.transform).length > 0 ? "render/image" : "object";
          return { data: { publicUrl: encodeURI(`${this.url}/${n2}/public/${r10}`) + (i2 ? `?${i2}` : "") } };
        }
        async remove(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await tn(t10.fetch, `${t10.url}/object/${t10.bucketId}`, { prefixes: e10 }, { headers: t10.headers }));
        }
        async purgeCache(e10, t10, r10) {
          var s2 = this;
          return s2.handleOperation(async () => {
            let i2 = e6(s2._getFinalPath(e10)), n2 = new URLSearchParams();
            (null == t10 ? void 0 : t10.transformations) && n2.set("transformations", "true");
            let a2 = n2.toString();
            return await tn(s2.fetch, `${s2.url}/cdn/${i2}${a2 ? `?${a2}` : ""}`, {}, { headers: s2.headers }, r10);
          });
        }
        async list(e10, t10, r10) {
          var s2 = this;
          return s2.handleOperation(async () => {
            let i2 = (null == t10 ? void 0 : t10.sortBy) ? eK(eK({}, tc.sortBy), t10.sortBy) : tc.sortBy, n2 = eK(eK(eK({}, tc), t10), {}, { sortBy: i2, prefix: e10 || "" });
            return await tr(s2.fetch, `${s2.url}/object/list/${s2.bucketId}`, n2, { headers: s2.headers }, r10);
          });
        }
        async listV2(e10, t10) {
          var r10 = this;
          return r10.handleOperation(async () => {
            let s2 = eK({}, e10);
            return await tr(r10.fetch, `${r10.url}/object/list-v2/${r10.bucketId}`, s2, { headers: r10.headers }, t10);
          });
        }
        encodeMetadata(e10) {
          return JSON.stringify(e10);
        }
        toBase64(e10) {
          return void 0 !== ez ? ez.from(e10).toString("base64") : btoa(e10);
        }
        _getFinalPath(e10) {
          return `${this.bucketId}/${e10.replace(/^\/+/, "")}`;
        }
        _removeEmptyFolders(e10) {
          return e10.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
        }
        applyTransformOptsToQuery(e10, t10) {
          return t10.width && e10.set("width", t10.width.toString()), t10.height && e10.set("height", t10.height.toString()), t10.resize && e10.set("resize", t10.resize), t10.format && e10.set("format", t10.format), t10.quality && e10.set("quality", t10.quality.toString()), e10;
        }
      };
      let tp = { "X-Client-Info": "storage-js/2.112.3" };
      var tf = class extends to {
        constructor(e10, t10 = {}, r10, s2) {
          let i2 = new URL(e10);
          (null == s2 ? void 0 : s2.useNewHostname) && /supabase\.(co|in|red)$/.test(i2.hostname) && !i2.hostname.includes("storage.supabase.") && (i2.hostname = i2.hostname.replace("supabase.", "storage.supabase.")), super(i2.href.replace(/\/$/, ""), eK(eK({}, tp), t10), r10, "storage");
        }
        async listBuckets(e10) {
          var t10 = this;
          return t10.handleOperation(async () => {
            let r10 = t10.listBucketOptionsToQueryString(e10);
            return await tt(t10.fetch, `${t10.url}/bucket${r10}`, { headers: t10.headers });
          });
        }
        async getBucket(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await tt(t10.fetch, `${t10.url}/bucket/${e10}`, { headers: t10.headers }));
        }
        async createBucket(e10, t10 = { public: false }) {
          var r10 = this;
          return r10.handleOperation(async () => await tr(r10.fetch, `${r10.url}/bucket`, { id: e10, name: e10, type: t10.type, public: t10.public, file_size_limit: t10.fileSizeLimit, allowed_mime_types: t10.allowedMimeTypes }, { headers: r10.headers }));
        }
        async updateBucket(e10, t10) {
          var r10 = this;
          return r10.handleOperation(async () => await ts(r10.fetch, `${r10.url}/bucket/${e10}`, { id: e10, name: e10, public: t10.public, file_size_limit: t10.fileSizeLimit, allowed_mime_types: t10.allowedMimeTypes }, { headers: r10.headers }));
        }
        async emptyBucket(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await tr(t10.fetch, `${t10.url}/bucket/${e10}/empty`, {}, { headers: t10.headers }));
        }
        async deleteBucket(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await tn(t10.fetch, `${t10.url}/bucket/${e10}`, {}, { headers: t10.headers }));
        }
        async purgeBucketCache(e10, t10, r10) {
          var s2 = this;
          return s2.handleOperation(async () => {
            let i2 = new URLSearchParams();
            (null == t10 ? void 0 : t10.transformations) && i2.set("transformations", "true");
            let n2 = i2.toString();
            return await tn(s2.fetch, `${s2.url}/cdn/${e6(e10)}${n2 ? `?${n2}` : ""}`, {}, { headers: s2.headers }, r10);
          });
        }
        listBucketOptionsToQueryString(e10) {
          let t10 = {};
          return e10 && ("limit" in e10 && (t10.limit = String(e10.limit)), "offset" in e10 && (t10.offset = String(e10.offset)), e10.search && (t10.search = e10.search), e10.sortColumn && (t10.sortColumn = e10.sortColumn), e10.sortOrder && (t10.sortOrder = e10.sortOrder)), Object.keys(t10).length > 0 ? "?" + new URLSearchParams(t10).toString() : "";
        }
      }, tg = class extends to {
        constructor(e10, t10 = {}, r10) {
          super(e10.replace(/\/$/, ""), eK(eK({}, tp), t10), r10, "storage");
        }
        async createBucket(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await tr(t10.fetch, `${t10.url}/bucket`, { name: e10 }, { headers: t10.headers }));
        }
        async listBuckets(e10) {
          var t10 = this;
          return t10.handleOperation(async () => {
            let r10 = new URLSearchParams();
            (null == e10 ? void 0 : e10.limit) !== void 0 && r10.set("limit", e10.limit.toString()), (null == e10 ? void 0 : e10.offset) !== void 0 && r10.set("offset", e10.offset.toString()), (null == e10 ? void 0 : e10.sortColumn) && r10.set("sortColumn", e10.sortColumn), (null == e10 ? void 0 : e10.sortOrder) && r10.set("sortOrder", e10.sortOrder), (null == e10 ? void 0 : e10.search) && r10.set("search", e10.search);
            let s2 = r10.toString(), i2 = s2 ? `${t10.url}/bucket?${s2}` : `${t10.url}/bucket`;
            return await tt(t10.fetch, i2, { headers: t10.headers });
          });
        }
        async deleteBucket(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await tn(t10.fetch, `${t10.url}/bucket/${e10}`, {}, { headers: t10.headers }));
        }
        from(e10) {
          var t10 = this;
          if (!e4(e10)) throw new eX("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");
          let r10 = new eW({ baseUrl: this.url, catalogName: e10, auth: { type: "custom", getHeaders: async () => t10.headers }, fetch: this.fetch }), s2 = this.shouldThrowOnError;
          return new Proxy(r10, { get(e11, t11) {
            let r11 = e11[t11];
            return "function" != typeof r11 ? r11 : async (...t12) => {
              try {
                return { data: await r11.apply(e11, t12), error: null };
              } catch (e12) {
                if (s2) throw e12;
                return { data: null, error: e12 };
              }
            };
          } });
        }
      }, tm = class extends to {
        constructor(e10, t10 = {}, r10) {
          super(e10.replace(/\/$/, ""), eK(eK({}, tp), {}, { "Content-Type": "application/json" }, t10), r10, "vectors");
        }
        async createIndex(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await ta.post(t10.fetch, `${t10.url}/CreateIndex`, e10, { headers: t10.headers }) || {});
        }
        async getIndex(e10, t10) {
          var r10 = this;
          return r10.handleOperation(async () => await ta.post(r10.fetch, `${r10.url}/GetIndex`, { vectorBucketName: e10, indexName: t10 }, { headers: r10.headers }));
        }
        async listIndexes(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await ta.post(t10.fetch, `${t10.url}/ListIndexes`, e10, { headers: t10.headers }));
        }
        async deleteIndex(e10, t10) {
          var r10 = this;
          return r10.handleOperation(async () => await ta.post(r10.fetch, `${r10.url}/DeleteIndex`, { vectorBucketName: e10, indexName: t10 }, { headers: r10.headers }) || {});
        }
      }, tb = class extends to {
        constructor(e10, t10 = {}, r10) {
          super(e10.replace(/\/$/, ""), eK(eK({}, tp), {}, { "Content-Type": "application/json" }, t10), r10, "vectors");
        }
        async putVectors(e10) {
          var t10 = this;
          if (e10.vectors.length < 1 || e10.vectors.length > 500) throw Error("Vector batch size must be between 1 and 500 items");
          return t10.handleOperation(async () => await ta.post(t10.fetch, `${t10.url}/PutVectors`, e10, { headers: t10.headers }) || {});
        }
        async getVectors(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await ta.post(t10.fetch, `${t10.url}/GetVectors`, e10, { headers: t10.headers }));
        }
        async listVectors(e10) {
          var t10 = this;
          if (void 0 !== e10.segmentCount) {
            if (e10.segmentCount < 1 || e10.segmentCount > 16) throw Error("segmentCount must be between 1 and 16");
            if (void 0 !== e10.segmentIndex && (e10.segmentIndex < 0 || e10.segmentIndex >= e10.segmentCount)) throw Error(`segmentIndex must be between 0 and ${e10.segmentCount - 1}`);
          }
          return t10.handleOperation(async () => await ta.post(t10.fetch, `${t10.url}/ListVectors`, e10, { headers: t10.headers }));
        }
        async queryVectors(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await ta.post(t10.fetch, `${t10.url}/QueryVectors`, e10, { headers: t10.headers }));
        }
        async deleteVectors(e10) {
          var t10 = this;
          if (e10.keys.length < 1 || e10.keys.length > 500) throw Error("Keys batch size must be between 1 and 500 items");
          return t10.handleOperation(async () => await ta.post(t10.fetch, `${t10.url}/DeleteVectors`, e10, { headers: t10.headers }) || {});
        }
      }, ty = class extends to {
        constructor(e10, t10 = {}, r10) {
          super(e10.replace(/\/$/, ""), eK(eK({}, tp), {}, { "Content-Type": "application/json" }, t10), r10, "vectors");
        }
        async createBucket(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await ta.post(t10.fetch, `${t10.url}/CreateVectorBucket`, { vectorBucketName: e10 }, { headers: t10.headers }) || {});
        }
        async getBucket(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await ta.post(t10.fetch, `${t10.url}/GetVectorBucket`, { vectorBucketName: e10 }, { headers: t10.headers }));
        }
        async listBuckets(e10 = {}) {
          var t10 = this;
          return t10.handleOperation(async () => await ta.post(t10.fetch, `${t10.url}/ListVectorBuckets`, e10, { headers: t10.headers }));
        }
        async deleteBucket(e10) {
          var t10 = this;
          return t10.handleOperation(async () => await ta.post(t10.fetch, `${t10.url}/DeleteVectorBucket`, { vectorBucketName: e10 }, { headers: t10.headers }) || {});
        }
      }, tw = class extends ty {
        constructor(e10, t10 = {}) {
          super(e10, t10.headers || {}, t10.fetch);
        }
        from(e10) {
          return new tv(this.url, this.headers, e10, this.fetch);
        }
        async createBucket(e10) {
          return super.createBucket.call(this, e10);
        }
        async getBucket(e10) {
          return super.getBucket.call(this, e10);
        }
        async listBuckets(e10 = {}) {
          return super.listBuckets.call(this, e10);
        }
        async deleteBucket(e10) {
          return super.deleteBucket.call(this, e10);
        }
      }, tv = class extends tm {
        constructor(e10, t10, r10, s2) {
          super(e10, t10, s2), this.vectorBucketName = r10;
        }
        async createIndex(e10) {
          return super.createIndex.call(this, eK(eK({}, e10), {}, { vectorBucketName: this.vectorBucketName }));
        }
        async listIndexes(e10 = {}) {
          return super.listIndexes.call(this, eK(eK({}, e10), {}, { vectorBucketName: this.vectorBucketName }));
        }
        async getIndex(e10) {
          return super.getIndex.call(this, this.vectorBucketName, e10);
        }
        async deleteIndex(e10) {
          return super.deleteIndex.call(this, this.vectorBucketName, e10);
        }
        index(e10) {
          return new t_(this.url, this.headers, this.vectorBucketName, e10, this.fetch);
        }
      }, t_ = class extends tb {
        constructor(e10, t10, r10, s2, i2) {
          super(e10, t10, i2), this.vectorBucketName = r10, this.indexName = s2;
        }
        async putVectors(e10) {
          return super.putVectors.call(this, eK(eK({}, e10), {}, { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        }
        async getVectors(e10) {
          return super.getVectors.call(this, eK(eK({}, e10), {}, { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        }
        async listVectors(e10 = {}) {
          return super.listVectors.call(this, eK(eK({}, e10), {}, { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        }
        async queryVectors(e10) {
          return super.queryVectors.call(this, eK(eK({}, e10), {}, { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        }
        async deleteVectors(e10) {
          return super.deleteVectors.call(this, eK(eK({}, e10), {}, { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        }
      }, tS = class extends tf {
        constructor(e10, t10 = {}, r10, s2) {
          super(e10, t10, r10, s2);
        }
        from(e10) {
          return new td(this.url, this.headers, e10, this.fetch);
        }
        get vectors() {
          return new tw(this.url + "/vector", { headers: this.headers, fetch: this.fetch });
        }
        get analytics() {
          return new tg(this.url + "/iceberg", this.headers, this.fetch);
        }
      };
      let tk = "2.112.3", tT = { "X-Client-Info": `gotrue-js/${tk}` }, tE = "X-Supabase-Api-Version", tO = { "2024-01-01": { timestamp: Date.parse("2024-01-01T00:00:00.0Z"), name: "2024-01-01" } }, tR = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i, tC = "sb_flow_id";
      class tA extends Error {
        constructor(e10, t10, r10) {
          super(e10), this.__isAuthError = true, this.name = "AuthError", this.status = t10, this.code = r10;
        }
        toJSON() {
          return { name: this.name, message: this.message, status: this.status, code: this.code };
        }
      }
      function tP(e10) {
        return "object" == typeof e10 && null !== e10 && "__isAuthError" in e10;
      }
      class tx extends tA {
        constructor(e10, t10, r10) {
          super(e10, t10, r10), this.name = "AuthApiError", this.status = t10, this.code = r10;
        }
      }
      function tI(e10) {
        return tP(e10) && "AuthApiError" === e10.name;
      }
      class tj extends tA {
        constructor(e10, t10) {
          super(e10), this.name = "AuthUnknownError", this.originalError = t10;
        }
      }
      class tN extends tA {
        constructor(e10, t10, r10, s2) {
          super(e10, r10, s2), this.name = t10, this.status = r10;
        }
      }
      class tL extends tN {
        constructor() {
          super("Auth session missing!", "AuthSessionMissingError", 400, void 0);
        }
      }
      function t$(e10) {
        return tP(e10) && "AuthSessionMissingError" === e10.name;
      }
      class tU extends tN {
        constructor() {
          super("Auth session or user missing", "AuthInvalidTokenResponseError", 500, void 0);
        }
      }
      class tD extends tN {
        constructor(e10) {
          super(e10, "AuthInvalidCredentialsError", 400, void 0);
        }
      }
      class tM extends tN {
        constructor(e10, t10 = null) {
          super(e10, "AuthImplicitGrantRedirectError", 500, void 0), this.details = null, this.details = t10;
        }
        toJSON() {
          return Object.assign(Object.assign({}, super.toJSON()), { details: this.details });
        }
      }
      class tB extends tN {
        constructor(e10, t10 = null) {
          super(e10, "AuthPKCEGrantCodeExchangeError", 500, void 0), this.details = null, this.details = t10;
        }
        toJSON() {
          return Object.assign(Object.assign({}, super.toJSON()), { details: this.details });
        }
      }
      class tq extends tN {
        constructor() {
          super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.", "AuthPKCECodeVerifierMissingError", 400, "pkce_code_verifier_not_found");
        }
      }
      class tF extends tN {
        constructor(e10, t10) {
          super(e10, "AuthRetryableFetchError", t10, void 0);
        }
      }
      function tH(e10) {
        return tP(e10) && "AuthRetryableFetchError" === e10.name;
      }
      class tV extends tN {
        constructor(e10 = "Refresh result discarded: session state changed mid-flight (e.g., concurrent signOut)") {
          super(e10, "AuthRefreshDiscardedError", 409, void 0);
        }
      }
      class tW extends tN {
        constructor(e10, t10, r10) {
          super(e10, "AuthWeakPasswordError", t10, "weak_password"), this.reasons = r10;
        }
        toJSON() {
          return Object.assign(Object.assign({}, super.toJSON()), { reasons: this.reasons });
        }
      }
      class tz extends tN {
        constructor(e10) {
          super(e10, "AuthInvalidJwtError", 400, "invalid_jwt");
        }
      }
      let tJ = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""), tG = " 	\n\r=".split(""), tK = (() => {
        let e10 = Array(128);
        for (let t10 = 0; t10 < e10.length; t10 += 1) e10[t10] = -1;
        for (let t10 = 0; t10 < tG.length; t10 += 1) e10[tG[t10].charCodeAt(0)] = -2;
        for (let t10 = 0; t10 < tJ.length; t10 += 1) e10[tJ[t10].charCodeAt(0)] = t10;
        return e10;
      })();
      function tX(e10, t10, r10) {
        if (null !== e10) for (t10.queue = t10.queue << 8 | e10, t10.queuedBits += 8; t10.queuedBits >= 6; ) r10(tJ[t10.queue >> t10.queuedBits - 6 & 63]), t10.queuedBits -= 6;
        else if (t10.queuedBits > 0) for (t10.queue = t10.queue << 6 - t10.queuedBits, t10.queuedBits = 6; t10.queuedBits >= 6; ) r10(tJ[t10.queue >> t10.queuedBits - 6 & 63]), t10.queuedBits -= 6;
      }
      function tY(e10, t10, r10) {
        let s2 = tK[e10];
        if (s2 > -1) for (t10.queue = t10.queue << 6 | s2, t10.queuedBits += 6; t10.queuedBits >= 8; ) r10(t10.queue >> t10.queuedBits - 8 & 255), t10.queuedBits -= 8;
        else if (-2 === s2) return;
        else throw Error(`Invalid Base64-URL character "${String.fromCharCode(e10)}"`);
      }
      function tZ(e10) {
        let t10 = [], r10 = (e11) => {
          t10.push(String.fromCodePoint(e11));
        }, s2 = { utf8seq: 0, codepoint: 0 }, i2 = { queue: 0, queuedBits: 0 }, n2 = (e11) => {
          !function(e12, t11, r11) {
            if (0 === t11.utf8seq) {
              if (e12 <= 127) {
                r11(e12);
                return;
              }
              for (let r12 = 1; r12 < 6; r12 += 1) if ((e12 >> 7 - r12 & 1) == 0) {
                t11.utf8seq = r12;
                break;
              }
              if (2 === t11.utf8seq) t11.codepoint = 31 & e12;
              else if (3 === t11.utf8seq) t11.codepoint = 15 & e12;
              else if (4 === t11.utf8seq) t11.codepoint = 7 & e12;
              else throw Error("Invalid UTF-8 sequence");
              t11.utf8seq -= 1;
            } else if (t11.utf8seq > 0) {
              if (e12 <= 127) throw Error("Invalid UTF-8 sequence");
              t11.codepoint = t11.codepoint << 6 | 63 & e12, t11.utf8seq -= 1, 0 === t11.utf8seq && r11(t11.codepoint);
            }
          }(e11, s2, r10);
        };
        for (let t11 = 0; t11 < e10.length; t11 += 1) tY(e10.charCodeAt(t11), i2, n2);
        return t10.join("");
      }
      function tQ(e10) {
        let t10 = [], r10 = { queue: 0, queuedBits: 0 }, s2 = (e11) => {
          t10.push(e11);
        };
        for (let t11 = 0; t11 < e10.length; t11 += 1) tY(e10.charCodeAt(t11), r10, s2);
        return new Uint8Array(t10);
      }
      function t0(e10) {
        let t10 = [], r10 = { queue: 0, queuedBits: 0 }, s2 = (e11) => {
          t10.push(e11);
        };
        return e10.forEach((e11) => tX(e11, r10, s2)), tX(null, r10, s2), t10.join("");
      }
      let t1 = () => "undefined" != typeof window && "undefined" != typeof document, t2 = { tested: false, writable: false }, t3 = () => {
        if (!t1()) return false;
        try {
          if ("object" != typeof globalThis.localStorage) return false;
        } catch (e11) {
          return false;
        }
        if (t2.tested) return t2.writable;
        let e10 = `lswt-${Math.random()}${Math.random()}`;
        try {
          globalThis.localStorage.setItem(e10, e10), globalThis.localStorage.removeItem(e10), t2.tested = true, t2.writable = true;
        } catch (e11) {
          t2.tested = true, t2.writable = false;
        }
        return t2.writable;
      };
      function t4(e10) {
        let t10 = {}, r10 = new URL(e10);
        if (r10.hash && "#" === r10.hash[0]) try {
          new URLSearchParams(r10.hash.substring(1)).forEach((e11, r11) => {
            t10[r11] = e11;
          });
        } catch (e11) {
        }
        return r10.searchParams.forEach((e11, r11) => {
          t10[r11] = e11;
        }), t10;
      }
      let t6 = (e10) => e10 ? (...t10) => e10(...t10) : (...e11) => fetch(...e11), t5 = (e10) => "object" == typeof e10 && null !== e10 && "status" in e10 && "ok" in e10 && "json" in e10 && "function" == typeof e10.json, t8 = async (e10, t10, r10) => {
        await e10.setItem(t10, JSON.stringify(r10));
      }, t9 = async (e10, t10) => {
        let r10 = await e10.getItem(t10);
        if (!r10) return null;
        try {
          return JSON.parse(r10);
        } catch (e11) {
          return null;
        }
      }, t7 = async (e10, t10) => {
        await e10.removeItem(t10);
      };
      class re {
        constructor() {
          this.promise = new re.promiseConstructor((e10, t10) => {
            this.resolve = e10, this.reject = t10;
          });
        }
      }
      function rt(e10) {
        let t10 = e10.split(".");
        if (3 !== t10.length) throw new tz("Invalid JWT structure");
        for (let e11 = 0; e11 < t10.length; e11++) if (!tR.test(t10[e11])) throw new tz("JWT not in base64url format");
        return { header: JSON.parse(tZ(t10[0])), payload: JSON.parse(tZ(t10[1])), signature: tQ(t10[2]), raw: { header: t10[0], payload: t10[1] } };
      }
      async function rr(e10) {
        return await new Promise((t10) => {
          setTimeout(() => t10(null), e10);
        });
      }
      function rs(e10) {
        return ("0" + e10.toString(16)).substr(-2);
      }
      async function ri(e10) {
        let t10 = new TextEncoder().encode(e10);
        return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", t10))).map((e11) => String.fromCharCode(e11)).join("");
      }
      async function rn(e10) {
        return "undefined" != typeof crypto && void 0 !== crypto.subtle && "undefined" != typeof TextEncoder ? btoa(await ri(e10)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") : (console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."), e10);
      }
      re.promiseConstructor = Promise;
      let ra = /^[a-zA-Z0-9_-]{8,64}$/;
      function ro(e10) {
        return "string" == typeof e10 && ra.test(e10) ? e10 : null;
      }
      let rl = (e10, t10) => `${e10}-flow-${t10}-code-verifier`, ru = (e10) => `${e10}-flows-code-verifier`;
      async function rc(e10, t10) {
        let r10 = await t9(e10, ru(t10));
        return Array.isArray(r10) ? r10.filter((e11) => null !== ro(e11)) : [];
      }
      async function rh(e10, t10, r10, s2, i2) {
        await t8(e10, rl(t10, r10), s2);
        let n2 = (await rc(e10, t10)).filter((e11) => e11 !== r10);
        for (n2.push(r10); n2.length > 5; ) {
          let r11 = n2.shift();
          await t7(e10, rl(t10, r11)), null == i2 || i2(r11);
        }
        await t8(e10, ru(t10), n2), await t8(e10, `${t10}-code-verifier`, s2);
      }
      async function rd(e10, t10, r10) {
        if (r10) {
          let s3 = await t9(e10, rl(t10, r10));
          return { verifier: "string" == typeof s3 ? s3 : null, flowId: r10 };
        }
        let s2 = await t9(e10, `${t10}-code-verifier`);
        return { verifier: "string" == typeof s2 ? s2 : null, flowId: null };
      }
      async function rp(e10, t10, r10) {
        let s2 = `${t10}-code-verifier`;
        if (!r10) {
          await t7(e10, s2);
          return;
        }
        let i2 = rl(t10, r10), n2 = await t9(e10, i2);
        await t7(e10, i2);
        let a2 = await rc(e10, t10), o2 = a2.filter((e11) => e11 !== r10);
        o2.length !== a2.length && (o2.length > 0 ? await t8(e10, ru(t10), o2) : await t7(e10, ru(t10))), null != n2 && n2 === await t9(e10, s2) && await t7(e10, s2);
      }
      async function rf(e10, t10) {
        for (let r10 of await rc(e10, t10)) await t7(e10, rl(t10, r10));
        await t7(e10, ru(t10)), await t7(e10, `${t10}-code-verifier`);
      }
      async function rg(e10, t10, r10 = false, s2) {
        let i2 = function() {
          let e11 = new Uint32Array(56);
          if ("undefined" == typeof crypto) {
            let e12 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~", t11 = e12.length, r11 = "";
            for (let s3 = 0; s3 < 56; s3++) r11 += e12.charAt(Math.floor(Math.random() * t11));
            return r11;
          }
          return crypto.getRandomValues(e11), Array.from(e11, rs).join("");
        }(), n2 = i2;
        r10 && (n2 += "/recovery");
        let a2 = function() {
          if ("undefined" != typeof crypto && "function" == typeof crypto.getRandomValues) {
            let e12 = new Uint8Array(16);
            return crypto.getRandomValues(e12), Array.from(e12, rs).join("");
          }
          let e11 = "";
          for (let t11 = 0; t11 < 32; t11++) e11 += Math.floor(16 * Math.random()).toString(16);
          return e11;
        }();
        await rh(e10, t10, a2, n2, s2);
        let o2 = await rn(i2), l2 = i2 === o2 ? "plain" : "s256";
        return [o2, l2, a2];
      }
      let rm = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i, rb = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      function ry(e10) {
        if (!rb.test(e10)) throw Error("@supabase/auth-js: Expected parameter to be UUID but is not");
      }
      function rw(e10) {
        if (!e10.passkey) throw Error("@supabase/auth-js: the passkey API is experimental and disabled by default. Enable it by passing `auth: { experimental: { passkey: true } }` to createClient (or to the GoTrueClient constructor).");
      }
      function rv() {
        return new Proxy({}, { get: (e10, t10) => {
          if ("__isUserNotAvailableProxy" === t10) return true;
          if ("symbol" == typeof t10) {
            let e11 = t10.toString();
            if ("Symbol(Symbol.toPrimitive)" === e11 || "Symbol(Symbol.toStringTag)" === e11 || "Symbol(util.inspect.custom)" === e11) return;
          }
          throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t10}" property of the session object is not supported. Please use getUser() instead.`);
        }, set: (e10, t10) => {
          throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t10}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
        }, deleteProperty: (e10, t10) => {
          throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t10}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
        } });
      }
      function r_(e10) {
        return JSON.parse(JSON.stringify(e10));
      }
      let rS = (e10) => {
        if ("object" == typeof e10 && null !== e10) {
          if ("string" == typeof e10.msg) return e10.msg;
          if ("string" == typeof e10.message) return e10.message;
          if ("string" == typeof e10.error_description) return e10.error_description;
          if ("string" == typeof e10.error) return e10.error;
        }
        return JSON.stringify(e10);
      }, rk = [500, 501, 502, 503, 504, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530];
      async function rT(e10) {
        var t10;
        let r10, s2;
        if (!t5(e10)) throw new tF(rS(e10), 0);
        try {
          r10 = await e10.json();
        } catch (t11) {
          if (rk.includes(e10.status)) throw new tF(e10.statusText || `HTTP ${e10.status}`, e10.status);
          throw new tj(rS(t11), t11);
        }
        if (rk.includes(e10.status)) throw new tF(rS(r10), e10.status);
        let i2 = function(e11) {
          let t11 = e11.headers.get(tE);
          if (!t11 || !t11.match(rm)) return null;
          try {
            return /* @__PURE__ */ new Date(`${t11}T00:00:00.0Z`);
          } catch (e12) {
            return null;
          }
        }(e10);
        if (i2 && i2.getTime() >= tO["2024-01-01"].timestamp && "object" == typeof r10 && r10 && "string" == typeof r10.code ? s2 = r10.code : "object" == typeof r10 && r10 && "string" == typeof r10.error_code && (s2 = r10.error_code), s2) {
          if ("weak_password" === s2) throw new tW(rS(r10), e10.status, (null === (t10 = r10.weak_password) || void 0 === t10 ? void 0 : t10.reasons) || []);
          if ("session_not_found" === s2) throw new tL();
        } else if ("object" == typeof r10 && r10 && "object" == typeof r10.weak_password && r10.weak_password && Array.isArray(r10.weak_password.reasons) && r10.weak_password.reasons.length && r10.weak_password.reasons.reduce((e11, t11) => e11 && "string" == typeof t11, true)) throw new tW(rS(r10), e10.status, r10.weak_password.reasons);
        throw new tx(rS(r10), e10.status || 500, s2);
      }
      let rE = (e10, t10, r10, s2) => {
        let i2 = { method: e10, headers: (null == t10 ? void 0 : t10.headers) || {} };
        return "GET" === e10 ? i2 : (i2.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, null == t10 ? void 0 : t10.headers), i2.body = JSON.stringify(s2), Object.assign(Object.assign({}, i2), r10));
      };
      async function rO(e10, t10, r10, s2) {
        var i2;
        let n2 = Object.assign({}, null == s2 ? void 0 : s2.headers);
        n2[tE] || (n2[tE] = tO["2024-01-01"].name), (null == s2 ? void 0 : s2.jwt) && (n2.Authorization = `Bearer ${s2.jwt}`);
        let a2 = null !== (i2 = null == s2 ? void 0 : s2.query) && void 0 !== i2 ? i2 : {};
        (null == s2 ? void 0 : s2.redirectTo) && (a2.redirect_to = s2.redirectTo);
        let o2 = Object.keys(a2).length ? "?" + new URLSearchParams(a2).toString() : "", l2 = await rR(e10, t10, r10 + o2, { headers: n2, noResolveJson: null == s2 ? void 0 : s2.noResolveJson }, {}, null == s2 ? void 0 : s2.body);
        return (null == s2 ? void 0 : s2.xform) ? null == s2 ? void 0 : s2.xform(l2) : { data: Object.assign({}, l2), error: null };
      }
      async function rR(e10, t10, r10, s2, i2, n2) {
        let a2;
        let o2 = rE(t10, s2, i2, n2);
        try {
          a2 = await e10(r10, Object.assign({}, o2));
        } catch (e11) {
          throw new tF(rS(e11), 0);
        }
        if (a2.ok || await rT(a2), null == s2 ? void 0 : s2.noResolveJson) return a2;
        try {
          return await a2.json();
        } catch (e11) {
          await rT(e11);
        }
      }
      function rC(e10) {
        var t10, r10;
        let s2 = null;
        return e10.access_token && e10.refresh_token && e10.expires_in && (s2 = Object.assign({}, e10), !e10.expires_at) && (s2.expires_at = (r10 = e10.expires_in, Math.round(Date.now() / 1e3) + r10)), { data: { session: s2, user: null !== (t10 = e10.user) && void 0 !== t10 ? t10 : "string" == typeof (null == e10 ? void 0 : e10.id) ? e10 : null }, error: null };
      }
      function rA(e10) {
        let t10 = rC(e10);
        return !t10.error && e10.weak_password && "object" == typeof e10.weak_password && Array.isArray(e10.weak_password.reasons) && e10.weak_password.reasons.length && e10.weak_password.message && "string" == typeof e10.weak_password.message && e10.weak_password.reasons.reduce((e11, t11) => e11 && "string" == typeof t11, true) && (t10.data.weak_password = e10.weak_password), t10;
      }
      function rP(e10) {
        var t10;
        return { data: { user: null !== (t10 = e10.user) && void 0 !== t10 ? t10 : e10 }, error: null };
      }
      function rx(e10) {
        return { data: e10, error: null };
      }
      function rI(e10) {
        let { action_link: t10, email_otp: r10, hashed_token: s2, redirect_to: i2, verification_type: n2 } = e10;
        return { data: { properties: { action_link: t10, email_otp: r10, hashed_token: s2, redirect_to: i2, verification_type: n2 }, user: Object.assign({}, d(e10, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"])) }, error: null };
      }
      function rj(e10) {
        return e10;
      }
      let rN = ["global", "local", "others"];
      class rL {
        constructor({ url: e10 = "", headers: t10 = {}, fetch: r10, experimental: s2 }) {
          this.url = e10, this.headers = t10, this.fetch = t6(r10), this.experimental = null != s2 ? s2 : {}, this.mfa = { listFactors: this._listFactors.bind(this), deleteFactor: this._deleteFactor.bind(this) }, this.oauth = { listClients: this._listOAuthClients.bind(this), createClient: this._createOAuthClient.bind(this), getClient: this._getOAuthClient.bind(this), updateClient: this._updateOAuthClient.bind(this), deleteClient: this._deleteOAuthClient.bind(this), regenerateClientSecret: this._regenerateOAuthClientSecret.bind(this) }, this.customProviders = { listProviders: this._listCustomProviders.bind(this), createProvider: this._createCustomProvider.bind(this), getProvider: this._getCustomProvider.bind(this), updateProvider: this._updateCustomProvider.bind(this), deleteProvider: this._deleteCustomProvider.bind(this) }, this.passkey = { listPasskeys: this._adminListPasskeys.bind(this), deletePasskey: this._adminDeletePasskey.bind(this) };
        }
        async signOut(e10, t10 = rN[0]) {
          if (0 > rN.indexOf(t10)) throw Error(`@supabase/auth-js: Parameter scope must be one of ${rN.join(", ")}`);
          try {
            return await rO(this.fetch, "POST", `${this.url}/logout?scope=${t10}`, { headers: this.headers, jwt: e10, noResolveJson: true }), { data: null, error: null };
          } catch (e11) {
            if (tP(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async inviteUserByEmail(e10, t10 = {}) {
          try {
            return await rO(this.fetch, "POST", `${this.url}/invite`, { body: { email: e10, data: t10.data }, headers: this.headers, redirectTo: t10.redirectTo, xform: rP });
          } catch (e11) {
            if (tP(e11)) return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async generateLink(e10) {
          try {
            let { options: t10 } = e10, r10 = d(e10, ["options"]), s2 = Object.assign(Object.assign({}, r10), t10);
            return "newEmail" in r10 && (s2.new_email = null == r10 ? void 0 : r10.newEmail, delete s2.newEmail), await rO(this.fetch, "POST", `${this.url}/admin/generate_link`, { body: s2, headers: this.headers, xform: rI, redirectTo: null == t10 ? void 0 : t10.redirectTo });
          } catch (e11) {
            if (tP(e11)) return { data: { properties: null, user: null }, error: e11 };
            throw e11;
          }
        }
        async createUser(e10) {
          try {
            return await rO(this.fetch, "POST", `${this.url}/admin/users`, { body: e10, headers: this.headers, xform: rP });
          } catch (e11) {
            if (tP(e11)) return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async listUsers(e10) {
          var t10, r10, s2, i2, n2, a2, o2;
          try {
            let l2 = { nextPage: null, lastPage: 0, total: 0 }, u2 = await rO(this.fetch, "GET", `${this.url}/admin/users`, { headers: this.headers, noResolveJson: true, query: { page: null !== (r10 = null === (t10 = null == e10 ? void 0 : e10.page) || void 0 === t10 ? void 0 : t10.toString()) && void 0 !== r10 ? r10 : "", per_page: null !== (i2 = null === (s2 = null == e10 ? void 0 : e10.perPage) || void 0 === s2 ? void 0 : s2.toString()) && void 0 !== i2 ? i2 : "" }, xform: rj });
            if (u2.error) throw u2.error;
            let c2 = await u2.json(), h2 = null !== (n2 = u2.headers.get("x-total-count")) && void 0 !== n2 ? n2 : 0, d2 = null !== (o2 = null === (a2 = u2.headers.get("link")) || void 0 === a2 ? void 0 : a2.split(",")) && void 0 !== o2 ? o2 : [];
            return d2.length > 0 && (d2.forEach((e11) => {
              let t11 = parseInt(e11.split(";")[0].split("=")[1].substring(0, 1)), r11 = JSON.parse(e11.split(";")[1].split("=")[1]);
              l2[`${r11}Page`] = t11;
            }), l2.total = parseInt(h2)), { data: Object.assign(Object.assign({}, c2), l2), error: null };
          } catch (e11) {
            if (tP(e11)) return { data: { users: [] }, error: e11 };
            throw e11;
          }
        }
        async getUserById(e10) {
          ry(e10);
          try {
            return await rO(this.fetch, "GET", `${this.url}/admin/users/${e10}`, { headers: this.headers, xform: rP });
          } catch (e11) {
            if (tP(e11)) return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async updateUserById(e10, t10) {
          ry(e10);
          try {
            return await rO(this.fetch, "PUT", `${this.url}/admin/users/${e10}`, { body: t10, headers: this.headers, xform: rP });
          } catch (e11) {
            if (tP(e11)) return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async deleteUser(e10, t10 = false) {
          ry(e10);
          try {
            return await rO(this.fetch, "DELETE", `${this.url}/admin/users/${e10}`, { headers: this.headers, body: { should_soft_delete: t10 }, xform: rP });
          } catch (e11) {
            if (tP(e11)) return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async _listFactors(e10) {
          ry(e10.userId);
          try {
            let { data: t10, error: r10 } = await rO(this.fetch, "GET", `${this.url}/admin/users/${e10.userId}/factors`, { headers: this.headers, xform: (e11) => ({ data: { factors: e11 }, error: null }) });
            return { data: t10, error: r10 };
          } catch (e11) {
            if (tP(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _deleteFactor(e10) {
          ry(e10.userId), ry(e10.id);
          try {
            return { data: await rO(this.fetch, "DELETE", `${this.url}/admin/users/${e10.userId}/factors/${e10.id}`, { headers: this.headers }), error: null };
          } catch (e11) {
            if (tP(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _listOAuthClients(e10) {
          var t10, r10, s2, i2, n2, a2, o2;
          try {
            let l2 = { nextPage: null, lastPage: 0, total: 0 }, u2 = await rO(this.fetch, "GET", `${this.url}/admin/oauth/clients`, { headers: this.headers, noResolveJson: true, query: { page: null !== (r10 = null === (t10 = null == e10 ? void 0 : e10.page) || void 0 === t10 ? void 0 : t10.toString()) && void 0 !== r10 ? r10 : "", per_page: null !== (i2 = null === (s2 = null == e10 ? void 0 : e10.perPage) || void 0 === s2 ? void 0 : s2.toString()) && void 0 !== i2 ? i2 : "" }, xform: rj });
            if (u2.error) throw u2.error;
            let c2 = await u2.json(), h2 = null !== (n2 = u2.headers.get("x-total-count")) && void 0 !== n2 ? n2 : 0, d2 = null !== (o2 = null === (a2 = u2.headers.get("link")) || void 0 === a2 ? void 0 : a2.split(",")) && void 0 !== o2 ? o2 : [];
            return d2.length > 0 && (d2.forEach((e11) => {
              let t11 = parseInt(e11.split(";")[0].split("=")[1].substring(0, 1)), r11 = JSON.parse(e11.split(";")[1].split("=")[1]);
              l2[`${r11}Page`] = t11;
            }), l2.total = parseInt(h2)), { data: Object.assign(Object.assign({}, c2), l2), error: null };
          } catch (e11) {
            if (tP(e11)) return { data: { clients: [] }, error: e11 };
            throw e11;
          }
        }
        async _createOAuthClient(e10) {
          try {
            return await rO(this.fetch, "POST", `${this.url}/admin/oauth/clients`, { body: e10, headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (tP(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _getOAuthClient(e10) {
          try {
            return await rO(this.fetch, "GET", `${this.url}/admin/oauth/clients/${e10}`, { headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (tP(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _updateOAuthClient(e10, t10) {
          try {
            return await rO(this.fetch, "PUT", `${this.url}/admin/oauth/clients/${e10}`, { body: t10, headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (tP(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _deleteOAuthClient(e10) {
          try {
            return await rO(this.fetch, "DELETE", `${this.url}/admin/oauth/clients/${e10}`, { headers: this.headers, noResolveJson: true }), { data: null, error: null };
          } catch (e11) {
            if (tP(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _regenerateOAuthClientSecret(e10) {
          try {
            return await rO(this.fetch, "POST", `${this.url}/admin/oauth/clients/${e10}/regenerate_secret`, { headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (tP(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _listCustomProviders(e10) {
          try {
            let t10 = {};
            return (null == e10 ? void 0 : e10.type) && (t10.type = e10.type), await rO(this.fetch, "GET", `${this.url}/admin/custom-providers`, { headers: this.headers, query: t10, xform: (e11) => {
              var t11;
              return { data: { providers: null !== (t11 = null == e11 ? void 0 : e11.providers) && void 0 !== t11 ? t11 : [] }, error: null };
            } });
          } catch (e11) {
            if (tP(e11)) return { data: { providers: [] }, error: e11 };
            throw e11;
          }
        }
        async _createCustomProvider(e10) {
          try {
            return await rO(this.fetch, "POST", `${this.url}/admin/custom-providers`, { body: e10, headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (tP(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _getCustomProvider(e10) {
          try {
            return await rO(this.fetch, "GET", `${this.url}/admin/custom-providers/${e10}`, { headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (tP(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _updateCustomProvider(e10, t10) {
          try {
            return await rO(this.fetch, "PUT", `${this.url}/admin/custom-providers/${e10}`, { body: t10, headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (tP(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _deleteCustomProvider(e10) {
          try {
            return await rO(this.fetch, "DELETE", `${this.url}/admin/custom-providers/${e10}`, { headers: this.headers, noResolveJson: true }), { data: null, error: null };
          } catch (e11) {
            if (tP(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _adminListPasskeys(e10) {
          rw(this.experimental), ry(e10.userId);
          try {
            return await rO(this.fetch, "GET", `${this.url}/admin/users/${e10.userId}/passkeys`, { headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (tP(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _adminDeletePasskey(e10) {
          rw(this.experimental), ry(e10.userId), ry(e10.passkeyId);
          try {
            return await rO(this.fetch, "DELETE", `${this.url}/admin/users/${e10.userId}/passkeys/${e10.passkeyId}`, { headers: this.headers, noResolveJson: true }), { data: null, error: null };
          } catch (e11) {
            if (tP(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
      }
      function r$(e10 = {}) {
        return { getItem: (t10) => e10[t10] || null, setItem: (t10, r10) => {
          e10[t10] = r10;
        }, removeItem: (t10) => {
          delete e10[t10];
        } };
      }
      globalThis && t3() && globalThis.localStorage && globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug");
      class rU extends Error {
        constructor(e10) {
          super(e10), this.isAcquireTimeout = true;
        }
      }
      function rD(e10) {
        if (!/^0x[a-fA-F0-9]{40}$/.test(e10)) throw Error(`@supabase/auth-js: Address "${e10}" is invalid.`);
        return e10.toLowerCase();
      }
      class rM extends Error {
        constructor({ message: e10, code: t10, cause: r10, name: s2 }) {
          var i2;
          super(e10, { cause: r10 }), this.__isWebAuthnError = true, this.name = null !== (i2 = null != s2 ? s2 : r10 instanceof Error ? r10.name : void 0) && void 0 !== i2 ? i2 : "Unknown Error", this.code = t10;
        }
        toJSON() {
          return { name: this.name, message: this.message, code: this.code };
        }
      }
      class rB extends rM {
        constructor(e10, t10) {
          super({ code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: t10, message: e10 }), this.name = "WebAuthnUnknownError", this.originalError = t10;
        }
      }
      class rq {
        createNewAbortSignal() {
          if (this.controller) {
            let e11 = Error("Cancelling existing WebAuthn API call for new one");
            e11.name = "AbortError", this.controller.abort(e11);
          }
          let e10 = new AbortController();
          return this.controller = e10, e10.signal;
        }
        cancelCeremony() {
          if (this.controller) {
            let e10 = Error("Manually cancelling existing WebAuthn API call");
            e10.name = "AbortError", this.controller.abort(e10), this.controller = void 0;
          }
        }
      }
      let rF = new rq();
      function rH(e10) {
        if (!e10) throw Error("Credential creation options are required");
        if ("undefined" != typeof PublicKeyCredential && "parseCreationOptionsFromJSON" in PublicKeyCredential && "function" == typeof PublicKeyCredential.parseCreationOptionsFromJSON) return PublicKeyCredential.parseCreationOptionsFromJSON(e10);
        let { challenge: t10, user: r10, excludeCredentials: s2 } = e10, i2 = d(e10, ["challenge", "user", "excludeCredentials"]), n2 = tQ(t10).buffer, a2 = Object.assign(Object.assign({}, r10), { id: tQ(r10.id).buffer }), o2 = Object.assign(Object.assign({}, i2), { challenge: n2, user: a2 });
        if (s2 && s2.length > 0) {
          o2.excludeCredentials = Array(s2.length);
          for (let e11 = 0; e11 < s2.length; e11++) {
            let t11 = s2[e11];
            o2.excludeCredentials[e11] = Object.assign(Object.assign({}, t11), { id: tQ(t11.id).buffer, type: t11.type || "public-key", transports: t11.transports });
          }
        }
        return o2;
      }
      function rV(e10) {
        if (!e10) throw Error("Credential request options are required");
        if ("undefined" != typeof PublicKeyCredential && "parseRequestOptionsFromJSON" in PublicKeyCredential && "function" == typeof PublicKeyCredential.parseRequestOptionsFromJSON) return PublicKeyCredential.parseRequestOptionsFromJSON(e10);
        let { challenge: t10, allowCredentials: r10 } = e10, s2 = d(e10, ["challenge", "allowCredentials"]), i2 = tQ(t10).buffer, n2 = Object.assign(Object.assign({}, s2), { challenge: i2 });
        if (r10 && r10.length > 0) {
          n2.allowCredentials = Array(r10.length);
          for (let e11 = 0; e11 < r10.length; e11++) {
            let t11 = r10[e11];
            n2.allowCredentials[e11] = Object.assign(Object.assign({}, t11), { id: tQ(t11.id).buffer, type: t11.type || "public-key", transports: t11.transports });
          }
        }
        return n2;
      }
      function rW(e10) {
        var t10;
        return "toJSON" in e10 && "function" == typeof e10.toJSON ? e10.toJSON() : { id: e10.id, rawId: e10.id, response: { attestationObject: t0(new Uint8Array(e10.response.attestationObject)), clientDataJSON: t0(new Uint8Array(e10.response.clientDataJSON)) }, type: "public-key", clientExtensionResults: e10.getClientExtensionResults(), authenticatorAttachment: null !== (t10 = e10.authenticatorAttachment) && void 0 !== t10 ? t10 : void 0 };
      }
      function rz(e10) {
        var t10;
        if ("toJSON" in e10 && "function" == typeof e10.toJSON) return e10.toJSON();
        let r10 = e10.getClientExtensionResults(), s2 = e10.response;
        return { id: e10.id, rawId: e10.id, response: { authenticatorData: t0(new Uint8Array(s2.authenticatorData)), clientDataJSON: t0(new Uint8Array(s2.clientDataJSON)), signature: t0(new Uint8Array(s2.signature)), userHandle: s2.userHandle ? t0(new Uint8Array(s2.userHandle)) : void 0 }, type: "public-key", clientExtensionResults: r10, authenticatorAttachment: null !== (t10 = e10.authenticatorAttachment) && void 0 !== t10 ? t10 : void 0 };
      }
      function rJ(e10) {
        return "localhost" === e10 || /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(e10);
      }
      function rG() {
        var e10, t10;
        return !!(t1() && "PublicKeyCredential" in window && window.PublicKeyCredential && "credentials" in navigator && "function" == typeof (null === (e10 = null == navigator ? void 0 : navigator.credentials) || void 0 === e10 ? void 0 : e10.create) && "function" == typeof (null === (t10 = null == navigator ? void 0 : navigator.credentials) || void 0 === t10 ? void 0 : t10.get));
      }
      async function rK(e10) {
        try {
          let t10 = await navigator.credentials.create(e10);
          if (!t10) return { data: null, error: new rB("Empty credential response", t10) };
          if (!(t10 instanceof PublicKeyCredential)) return { data: null, error: new rB("Browser returned unexpected credential type", t10) };
          return { data: t10, error: null };
        } catch (t10) {
          return { data: null, error: function({ error: e11, options: t11 }) {
            var r10, s2, i2;
            let { publicKey: n2 } = t11;
            if (!n2) throw Error("options was missing required publicKey property");
            if ("AbortError" === e11.name) {
              if (t11.signal instanceof AbortSignal) return new rM({ message: "Registration ceremony was sent an abort signal", code: "ERROR_CEREMONY_ABORTED", cause: e11 });
            } else if ("ConstraintError" === e11.name) {
              if ((null === (r10 = n2.authenticatorSelection) || void 0 === r10 ? void 0 : r10.requireResidentKey) === true) return new rM({ message: "Discoverable credentials were required but no available authenticator supported it", code: "ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT", cause: e11 });
              if ("conditional" === t11.mediation && (null === (s2 = n2.authenticatorSelection) || void 0 === s2 ? void 0 : s2.userVerification) === "required") return new rM({ message: "User verification was required during automatic registration but it could not be performed", code: "ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE", cause: e11 });
              if ((null === (i2 = n2.authenticatorSelection) || void 0 === i2 ? void 0 : i2.userVerification) === "required") return new rM({ message: "User verification was required but no available authenticator supported it", code: "ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT", cause: e11 });
            } else if ("InvalidStateError" === e11.name) return new rM({ message: "The authenticator was previously registered", code: "ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED", cause: e11 });
            else if ("NotAllowedError" === e11.name) return new rM({ message: e11.message, code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: e11 });
            else if ("NotSupportedError" === e11.name) return new rM(0 === n2.pubKeyCredParams.filter((e12) => "public-key" === e12.type).length ? { message: 'No entry in pubKeyCredParams was of type "public-key"', code: "ERROR_MALFORMED_PUBKEYCREDPARAMS", cause: e11 } : { message: "No available authenticator supported any of the specified pubKeyCredParams algorithms", code: "ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG", cause: e11 });
            else if ("SecurityError" === e11.name) {
              let t12 = window.location.hostname;
              if (!rJ(t12)) return new rM({ message: `${window.location.hostname} is an invalid domain`, code: "ERROR_INVALID_DOMAIN", cause: e11 });
              if (n2.rp.id !== t12) return new rM({ message: `The RP ID "${n2.rp.id}" is invalid for this domain`, code: "ERROR_INVALID_RP_ID", cause: e11 });
            } else if ("TypeError" === e11.name) {
              if (n2.user.id.byteLength < 1 || n2.user.id.byteLength > 64) return new rM({ message: "User ID was not between 1 and 64 characters", code: "ERROR_INVALID_USER_ID_LENGTH", cause: e11 });
            } else if ("UnknownError" === e11.name) return new rM({ message: "The authenticator was unable to process the specified options, or could not create a new credential", code: "ERROR_AUTHENTICATOR_GENERAL_ERROR", cause: e11 });
            return new rM({ message: "a Non-Webauthn related error has occurred", code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: e11 });
          }({ error: t10, options: e10 }) };
        }
      }
      async function rX(e10) {
        try {
          let t10 = await navigator.credentials.get(e10);
          if (!t10) return { data: null, error: new rB("Empty credential response", t10) };
          if (!(t10 instanceof PublicKeyCredential)) return { data: null, error: new rB("Browser returned unexpected credential type", t10) };
          return { data: t10, error: null };
        } catch (t10) {
          return { data: null, error: function({ error: e11, options: t11 }) {
            let { publicKey: r10 } = t11;
            if (!r10) throw Error("options was missing required publicKey property");
            if ("AbortError" === e11.name) {
              if (t11.signal instanceof AbortSignal) return new rM({ message: "Authentication ceremony was sent an abort signal", code: "ERROR_CEREMONY_ABORTED", cause: e11 });
            } else if ("NotAllowedError" === e11.name) return new rM({ message: e11.message, code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: e11 });
            else if ("SecurityError" === e11.name) {
              let t12 = window.location.hostname;
              if (!rJ(t12)) return new rM({ message: `${window.location.hostname} is an invalid domain`, code: "ERROR_INVALID_DOMAIN", cause: e11 });
              if (r10.rpId !== t12) return new rM({ message: `The RP ID "${r10.rpId}" is invalid for this domain`, code: "ERROR_INVALID_RP_ID", cause: e11 });
            } else if ("UnknownError" === e11.name) return new rM({ message: "The authenticator was unable to process the specified options, or could not create a new assertion signature", code: "ERROR_AUTHENTICATOR_GENERAL_ERROR", cause: e11 });
            return new rM({ message: "a Non-Webauthn related error has occurred", code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: e11 });
          }({ error: t10, options: e10 }) };
        }
      }
      let rY = { hints: ["security-key"], authenticatorSelection: { authenticatorAttachment: "cross-platform", requireResidentKey: false, userVerification: "preferred", residentKey: "discouraged" }, attestation: "direct" }, rZ = { userVerification: "preferred", hints: ["security-key"], attestation: "direct" };
      function rQ(...e10) {
        let t10 = (e11) => null !== e11 && "object" == typeof e11 && !Array.isArray(e11), r10 = (e11) => e11 instanceof ArrayBuffer || ArrayBuffer.isView(e11), s2 = {};
        for (let i2 of e10) if (i2) for (let e11 in i2) {
          let n2 = i2[e11];
          if (void 0 !== n2) {
            if (Array.isArray(n2)) s2[e11] = n2;
            else if (r10(n2)) s2[e11] = n2;
            else if (t10(n2)) {
              let r11 = s2[e11];
              t10(r11) ? s2[e11] = rQ(r11, n2) : s2[e11] = rQ(n2);
            } else s2[e11] = n2;
          }
        }
        return s2;
      }
      class r0 {
        constructor(e10) {
          this.client = e10, this.enroll = this._enroll.bind(this), this.challenge = this._challenge.bind(this), this.verify = this._verify.bind(this), this.authenticate = this._authenticate.bind(this), this.register = this._register.bind(this);
        }
        async _enroll(e10) {
          return this.client.mfa.enroll(Object.assign(Object.assign({}, e10), { factorType: "webauthn" }));
        }
        async _challenge({ factorId: e10, webauthn: t10, friendlyName: r10, signal: s2 }, i2) {
          var n2, a2, o2, l2, u2;
          try {
            let { data: c2, error: h2 } = await this.client.mfa.challenge({ factorId: e10, webauthn: t10 });
            if (!c2) return { data: null, error: h2 };
            let d2 = null != s2 ? s2 : rF.createNewAbortSignal();
            if ("create" === c2.webauthn.type) {
              let { user: e11 } = c2.webauthn.credential_options.publicKey;
              if (!e11.name) {
                if (r10) e11.name = `${e11.id}:${r10}`;
                else {
                  let t11 = (await this.client.getUser()).data.user, r11 = (null === (n2 = null == t11 ? void 0 : t11.user_metadata) || void 0 === n2 ? void 0 : n2.name) || (null == t11 ? void 0 : t11.email) || (null == t11 ? void 0 : t11.id) || "User";
                  e11.name = `${e11.id}:${r11}`;
                }
              }
              e11.displayName || (e11.displayName = e11.name);
            }
            switch (c2.webauthn.type) {
              case "create": {
                let t11 = (a2 = c2.webauthn.credential_options.publicKey, o2 = null == i2 ? void 0 : i2.create, rQ(rY, a2, o2 || {})), { data: r11, error: s3 } = await rK({ publicKey: t11, signal: d2 });
                if (r11) return { data: { factorId: e10, challengeId: c2.id, webauthn: { type: c2.webauthn.type, credential_response: r11 } }, error: null };
                return { data: null, error: s3 };
              }
              case "request": {
                let t11 = (l2 = c2.webauthn.credential_options.publicKey, u2 = null == i2 ? void 0 : i2.request, rQ(rZ, l2, u2 || {})), { data: r11, error: s3 } = await rX(Object.assign(Object.assign({}, c2.webauthn.credential_options), { publicKey: t11, signal: d2 }));
                if (r11) return { data: { factorId: e10, challengeId: c2.id, webauthn: { type: c2.webauthn.type, credential_response: r11 } }, error: null };
                return { data: null, error: s3 };
              }
            }
          } catch (e11) {
            if (tP(e11)) return { data: null, error: e11 };
            return { data: null, error: new tj("Unexpected error in challenge", e11) };
          }
        }
        async _verify({ challengeId: e10, factorId: t10, webauthn: r10 }) {
          return this.client.mfa.verify({ factorId: t10, challengeId: e10, webauthn: r10 });
        }
        async _authenticate({ factorId: e10, webauthn: { rpId: t10 = "undefined" != typeof window ? window.location.hostname : void 0, rpOrigins: r10 = "undefined" != typeof window ? [window.location.origin] : void 0, signal: s2 } = {} }, i2) {
          if (!t10) return { data: null, error: new tA("rpId is required for WebAuthn authentication") };
          try {
            if (!rG()) return { data: null, error: new tj("Browser does not support WebAuthn", null) };
            let { data: n2, error: a2 } = await this.challenge({ factorId: e10, webauthn: { rpId: t10, rpOrigins: r10 }, signal: s2 }, { request: i2 });
            if (!n2) return { data: null, error: a2 };
            let { webauthn: o2 } = n2;
            return this._verify({ factorId: e10, challengeId: n2.challengeId, webauthn: { type: o2.type, rpId: t10, rpOrigins: r10, credential_response: o2.credential_response } });
          } catch (e11) {
            if (tP(e11)) return { data: null, error: e11 };
            return { data: null, error: new tj("Unexpected error in authenticate", e11) };
          }
        }
        async _register({ friendlyName: e10, webauthn: { rpId: t10 = "undefined" != typeof window ? window.location.hostname : void 0, rpOrigins: r10 = "undefined" != typeof window ? [window.location.origin] : void 0, signal: s2 } = {} }, i2) {
          if (!t10) return { data: null, error: new tA("rpId is required for WebAuthn registration") };
          try {
            if (!rG()) return { data: null, error: new tj("Browser does not support WebAuthn", null) };
            let { data: n2, error: a2 } = await this._enroll({ friendlyName: e10 });
            if (!n2) return await this.client.mfa.listFactors().then((t11) => {
              var r11;
              return null === (r11 = t11.data) || void 0 === r11 ? void 0 : r11.all.find((t12) => "webauthn" === t12.factor_type && t12.friendly_name === e10 && "unverified" !== t12.status);
            }).then((e11) => e11 ? this.client.mfa.unenroll({ factorId: null == e11 ? void 0 : e11.id }) : void 0), { data: null, error: a2 };
            let { data: o2, error: l2 } = await this._challenge({ factorId: n2.id, friendlyName: n2.friendly_name, webauthn: { rpId: t10, rpOrigins: r10 }, signal: s2 }, { create: i2 });
            if (!o2) return { data: null, error: l2 };
            return this._verify({ factorId: n2.id, challengeId: o2.challengeId, webauthn: { rpId: t10, rpOrigins: r10, type: o2.webauthn.type, credential_response: o2.webauthn.credential_response } });
          } catch (e11) {
            if (tP(e11)) return { data: null, error: e11 };
            return { data: null, error: new tj("Unexpected error in register", e11) };
          }
        }
      }
      !function() {
        if ("object" != typeof globalThis) try {
          Object.defineProperty(Object.prototype, "__magic__", { get: function() {
            return this;
          }, configurable: true }), __magic__.globalThis = __magic__, delete Object.prototype.__magic__;
        } catch (e10) {
          "undefined" != typeof self && (self.globalThis = self);
        }
      }();
      let r1 = { url: "http://localhost:9999", storageKey: "supabase.auth.token", autoRefreshToken: true, persistSession: true, detectSessionInUrl: true, headers: tT, flowType: "implicit", debug: false, hasCustomAuthorizationHeader: false, throwOnError: false, lockAcquireTimeout: 5e3, skipAutoInitialize: false, experimental: {} }, r2 = {};
      class r3 {
        get jwks() {
          var e10, t10;
          return null !== (t10 = null === (e10 = r2[this.storageKey]) || void 0 === e10 ? void 0 : e10.jwks) && void 0 !== t10 ? t10 : { keys: [] };
        }
        set jwks(e10) {
          r2[this.storageKey] = Object.assign(Object.assign({}, r2[this.storageKey]), { jwks: e10 });
        }
        get jwks_cached_at() {
          var e10, t10;
          return null !== (t10 = null === (e10 = r2[this.storageKey]) || void 0 === e10 ? void 0 : e10.cachedAt) && void 0 !== t10 ? t10 : Number.MIN_SAFE_INTEGER;
        }
        set jwks_cached_at(e10) {
          r2[this.storageKey] = Object.assign(Object.assign({}, r2[this.storageKey]), { cachedAt: e10 });
        }
        constructor(e10) {
          var t10, r10, s2;
          this.userStorage = null, this.memoryStorage = null, this.stateChangeEmitters = /* @__PURE__ */ new Map(), this.autoRefreshTicker = null, this.autoRefreshTickTimeout = null, this.visibilityChangedCallback = null, this.refreshingDeferred = null, this.lastRefreshFailure = null, this._sessionRemovalEpoch = 0, this.initializePromise = null, this._pendingInitNotifications = null, this.detectSessionInUrl = true, this.hasCustomAuthorizationHeader = false, this.suppressGetSessionWarning = false, this.lock = null, this.lockAcquired = false, this.pendingInLock = [], this.broadcastChannel = null, this.logger = console.log;
          let i2 = Object.assign(Object.assign({}, r1), e10);
          if (this.storageKey = i2.storageKey, this.instanceID = null !== (t10 = r3.nextInstanceID[this.storageKey]) && void 0 !== t10 ? t10 : 0, r3.nextInstanceID[this.storageKey] = this.instanceID + 1, this.logDebugMessages = !!i2.debug, "function" == typeof i2.debug && (this.logger = i2.debug), this.instanceID > 0 && t1()) {
            let e11 = `${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;
            console.warn(e11), this.logDebugMessages && console.trace(e11);
          }
          if (this.persistSession = i2.persistSession, this.autoRefreshToken = i2.autoRefreshToken, this.experimental = null !== (r10 = i2.experimental) && void 0 !== r10 ? r10 : {}, this.admin = new rL({ url: i2.url, headers: i2.headers, fetch: i2.fetch, experimental: this.experimental }), this.url = i2.url, this.headers = i2.headers, this.fetch = t6(i2.fetch), this.detectSessionInUrl = i2.detectSessionInUrl, this.flowType = i2.flowType, this.hasCustomAuthorizationHeader = i2.hasCustomAuthorizationHeader, this.throwOnError = i2.throwOnError, this.lockAcquireTimeout = i2.lockAcquireTimeout, null != i2.lock && (this.lock = i2.lock), this.jwks || (this.jwks = { keys: [] }, this.jwks_cached_at = Number.MIN_SAFE_INTEGER), this.mfa = { verify: this._verify.bind(this), enroll: this._enroll.bind(this), unenroll: this._unenroll.bind(this), challenge: this._challenge.bind(this), listFactors: this._listFactors.bind(this), challengeAndVerify: this._challengeAndVerify.bind(this), getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this), webauthn: new r0(this) }, this.oauth = { getAuthorizationDetails: this._getAuthorizationDetails.bind(this), approveAuthorization: this._approveAuthorization.bind(this), denyAuthorization: this._denyAuthorization.bind(this), listGrants: this._listOAuthGrants.bind(this), revokeGrant: this._revokeOAuthGrant.bind(this) }, this.passkey = { startRegistration: this._startPasskeyRegistration.bind(this), verifyRegistration: this._verifyPasskeyRegistration.bind(this), startAuthentication: this._startPasskeyAuthentication.bind(this), verifyAuthentication: this._verifyPasskeyAuthentication.bind(this), list: this._listPasskeys.bind(this), update: this._updatePasskey.bind(this), delete: this._deletePasskey.bind(this) }, this.persistSession ? (i2.storage ? this.storage = i2.storage : t3() ? this.storage = globalThis.localStorage : (this.memoryStorage = {}, this.storage = r$(this.memoryStorage)), i2.userStorage && (this.userStorage = i2.userStorage)) : (this.memoryStorage = {}, this.storage = r$(this.memoryStorage)), t1() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
            try {
              this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
            } catch (e11) {
              console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available", e11);
            }
            null === (s2 = this.broadcastChannel) || void 0 === s2 || s2.addEventListener("message", async (e11) => {
              this._debug("received broadcast notification from other tab or client", e11), ("TOKEN_REFRESHED" === e11.data.event || "SIGNED_IN" === e11.data.event) && (this.lastRefreshFailure = null);
              try {
                await this._notifyAllSubscribers(e11.data.event, e11.data.session, false);
              } catch (e12) {
                this._debug("#broadcastChannel", "error", e12);
              }
            });
          }
          i2.skipAutoInitialize || this.initialize().catch((e11) => {
            this._debug("#initialize()", "error", e11);
          });
        }
        isThrowOnErrorEnabled() {
          return this.throwOnError;
        }
        _returnResult(e10) {
          if (this.throwOnError && e10 && e10.error) throw e10.error;
          return e10;
        }
        _logPrefix() {
          return `GoTrueClient@${this.storageKey}:${this.instanceID} (${tk}) ${(/* @__PURE__ */ new Date()).toISOString()}`;
        }
        _debug(...e10) {
          return this.logDebugMessages && this.logger(this._logPrefix(), ...e10), this;
        }
        async initialize() {
          var e10;
          if (this.initializePromise) return await this.initializePromise;
          this._pendingInitNotifications = [], this.initializePromise = (async () => null != this.lock ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._initialize()) : await this._initialize())();
          let t10 = await this.initializePromise, r10 = null !== (e10 = this._pendingInitNotifications) && void 0 !== e10 ? e10 : [];
          for (let e11 of (this._pendingInitNotifications = null, r10)) await this._notifyAllSubscribers(e11.event, e11.session, e11.broadcast);
          return t10;
        }
        async _initialize() {
          var e10;
          try {
            let t10 = {}, r10 = "none";
            if (t1() && (t10 = t4(window.location.href), this._isImplicitGrantCallback(t10) ? r10 = "implicit" : await this._isPKCECallback(t10) && (r10 = "pkce")), t1() && this.detectSessionInUrl && "none" !== r10) {
              let { data: s2, error: i2 } = await this._getSessionFromURL(t10, r10);
              if (i2) return this._debug("#_initialize()", "error detecting session from URL", i2), tP(i2) && "AuthImplicitGrantRedirectError" === i2.name && (null === (e10 = i2.details) || void 0 === e10 || e10.code), { error: i2 };
              let { session: n2, redirectType: a2 } = s2;
              return this._debug("#_initialize()", "detected session in URL", n2, "redirect type", a2), await this._saveSession(n2), setTimeout(async () => {
                "recovery" === a2 ? await this._notifyAllSubscribers("PASSWORD_RECOVERY", n2) : await this._notifyAllSubscribers("SIGNED_IN", n2);
              }, 0), { error: null };
            }
            return await this._recoverAndRefresh(), { error: null };
          } catch (e11) {
            if (tP(e11)) return this._returnResult({ error: e11 });
            return this._returnResult({ error: new tj("Unexpected error during initialization", e11) });
          } finally {
            await this._handleVisibilityChange(), this._debug("#_initialize()", "end");
          }
        }
        async signInAnonymously(e10) {
          var t10, r10, s2;
          try {
            let { data: i2, error: n2 } = await rO(this.fetch, "POST", `${this.url}/signup`, { headers: this.headers, body: { data: null !== (r10 = null === (t10 = null == e10 ? void 0 : e10.options) || void 0 === t10 ? void 0 : t10.data) && void 0 !== r10 ? r10 : {}, gotrue_meta_security: { captcha_token: null === (s2 = null == e10 ? void 0 : e10.options) || void 0 === s2 ? void 0 : s2.captchaToken } }, xform: rC });
            if (n2 || !i2) return this._returnResult({ data: { user: null, session: null }, error: n2 });
            let a2 = i2.session, o2 = i2.user;
            return i2.session && (await this._saveSession(i2.session), await this._notifyAllSubscribers("SIGNED_IN", a2)), this._returnResult({ data: { user: o2, session: a2 }, error: null });
          } catch (e11) {
            if (tP(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signUp(e10) {
          var t10, r10, s2;
          let i2 = null;
          try {
            let n2;
            if ("email" in e10) {
              let { email: r11, password: s3, options: a3 } = e10, o3 = null, l3 = null;
              "pkce" === this.flowType && ([o3, l3, i2] = await this._getCodeChallengeAndMethod()), n2 = await rO(this.fetch, "POST", `${this.url}/signup`, { headers: this.headers, redirectTo: this._maybeAppendFlowIdToRedirect(null == a3 ? void 0 : a3.emailRedirectTo, i2), body: { email: r11, password: s3, data: null !== (t10 = null == a3 ? void 0 : a3.data) && void 0 !== t10 ? t10 : {}, gotrue_meta_security: { captcha_token: null == a3 ? void 0 : a3.captchaToken }, code_challenge: o3, code_challenge_method: l3 }, xform: rC });
            } else if ("phone" in e10) {
              let { phone: t11, password: i3, options: a3 } = e10;
              n2 = await rO(this.fetch, "POST", `${this.url}/signup`, { headers: this.headers, body: { phone: t11, password: i3, data: null !== (r10 = null == a3 ? void 0 : a3.data) && void 0 !== r10 ? r10 : {}, channel: null !== (s2 = null == a3 ? void 0 : a3.channel) && void 0 !== s2 ? s2 : "sms", gotrue_meta_security: { captcha_token: null == a3 ? void 0 : a3.captchaToken } }, xform: rC });
            } else throw new tD("You must provide either an email or phone number and a password");
            let { data: a2, error: o2 } = n2;
            if (o2 || !a2) return await rp(this.storage, this.storageKey, i2), this._returnResult({ data: { user: null, session: null }, error: o2 });
            let l2 = a2.session, u2 = a2.user;
            return a2.session && (await this._saveSession(a2.session), await this._notifyAllSubscribers("SIGNED_IN", l2)), this._returnResult({ data: { user: u2, session: l2 }, error: null });
          } catch (e11) {
            if (await rp(this.storage, this.storageKey, i2), tP(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithPassword(e10) {
          try {
            let t10;
            if ("email" in e10) {
              let { email: r11, password: s3, options: i2 } = e10;
              t10 = await rO(this.fetch, "POST", `${this.url}/token?grant_type=password`, { headers: this.headers, body: { email: r11, password: s3, gotrue_meta_security: { captcha_token: null == i2 ? void 0 : i2.captchaToken } }, xform: rA });
            } else if ("phone" in e10) {
              let { phone: r11, password: s3, options: i2 } = e10;
              t10 = await rO(this.fetch, "POST", `${this.url}/token?grant_type=password`, { headers: this.headers, body: { phone: r11, password: s3, gotrue_meta_security: { captcha_token: null == i2 ? void 0 : i2.captchaToken } }, xform: rA });
            } else throw new tD("You must provide either an email or phone number and a password");
            let { data: r10, error: s2 } = t10;
            if (s2) return this._returnResult({ data: { user: null, session: null }, error: s2 });
            if (!r10 || !r10.session || !r10.user) {
              let e11 = new tU();
              return this._returnResult({ data: { user: null, session: null }, error: e11 });
            }
            return r10.session && (await this._saveSession(r10.session), await this._notifyAllSubscribers("SIGNED_IN", r10.session)), this._returnResult({ data: Object.assign({ user: r10.user, session: r10.session }, r10.weak_password ? { weakPassword: r10.weak_password } : null), error: s2 });
          } catch (e11) {
            if (tP(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithOAuth(e10) {
          var t10, r10, s2, i2;
          return await this._handleProviderSignIn(e10.provider, { redirectTo: null === (t10 = e10.options) || void 0 === t10 ? void 0 : t10.redirectTo, scopes: null === (r10 = e10.options) || void 0 === r10 ? void 0 : r10.scopes, queryParams: null === (s2 = e10.options) || void 0 === s2 ? void 0 : s2.queryParams, skipBrowserRedirect: null === (i2 = e10.options) || void 0 === i2 ? void 0 : i2.skipBrowserRedirect });
        }
        async exchangeCodeForSession(e10, t10) {
          return (await this.initializePromise, null != this.lock) ? this._acquireLock(this.lockAcquireTimeout, async () => this._exchangeCodeForSession(e10, t10)) : this._exchangeCodeForSession(e10, t10);
        }
        async signInWithWeb3(e10) {
          let { chain: t10 } = e10;
          switch (t10) {
            case "ethereum":
              return await this.signInWithEthereum(e10);
            case "solana":
              return await this.signInWithSolana(e10);
            default:
              throw Error(`@supabase/auth-js: Unsupported chain "${t10}"`);
          }
        }
        async signInWithEthereum(e10) {
          var t10, r10, s2, i2, n2, a2, o2, l2, u2, c2, h2, d2;
          let p2, f2;
          if ("message" in e10) p2 = e10.message, f2 = e10.signature;
          else {
            let c3;
            let { chain: h3, wallet: g2, statement: m2, options: b2 } = e10;
            if (t1()) {
              if ("object" == typeof g2) c3 = g2;
              else {
                let e11 = window;
                if ("ethereum" in e11 && "object" == typeof e11.ethereum && "request" in e11.ethereum && "function" == typeof e11.ethereum.request) c3 = e11.ethereum;
                else throw Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.");
              }
            } else {
              if ("object" != typeof g2 || !(null == b2 ? void 0 : b2.url)) throw Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
              c3 = g2;
            }
            let y2 = new URL(null !== (t10 = null == b2 ? void 0 : b2.url) && void 0 !== t10 ? t10 : window.location.href), w2 = await c3.request({ method: "eth_requestAccounts" }).then((e11) => e11).catch(() => {
              throw Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid");
            });
            if (!w2 || 0 === w2.length) throw Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");
            let v2 = rD(w2[0]), _2 = null === (r10 = null == b2 ? void 0 : b2.signInWithEthereum) || void 0 === r10 ? void 0 : r10.chainId;
            _2 || (_2 = parseInt(await c3.request({ method: "eth_chainId" }), 16)), p2 = function(e11) {
              var t11;
              let { chainId: r11, domain: s3, expirationTime: i3, issuedAt: n3 = /* @__PURE__ */ new Date(), nonce: a3, notBefore: o3, requestId: l3, resources: u3, scheme: c4, uri: h4, version: d3 } = e11;
              if (!Number.isInteger(r11)) throw Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${r11}`);
              if (!s3) throw Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');
              if (a3 && a3.length < 8) throw Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${a3}`);
              if (!h4) throw Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');
              if ("1" !== d3) throw Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${d3}`);
              if (null === (t11 = e11.statement) || void 0 === t11 ? void 0 : t11.includes("\n")) throw Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${e11.statement}`);
              let p3 = rD(e11.address), f3 = c4 ? `${c4}://${s3}` : s3, g3 = e11.statement ? `${e11.statement}
` : "", m3 = `${f3} wants you to sign in with your Ethereum account:
${p3}

${g3}`, b3 = `URI: ${h4}
Version: ${d3}
Chain ID: ${r11}${a3 ? `
Nonce: ${a3}` : ""}
Issued At: ${n3.toISOString()}`;
              if (i3 && (b3 += `
Expiration Time: ${i3.toISOString()}`), o3 && (b3 += `
Not Before: ${o3.toISOString()}`), l3 && (b3 += `
Request ID: ${l3}`), u3) {
                let e12 = "\nResources:";
                for (let t12 of u3) {
                  if (!t12 || "string" != typeof t12) throw Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${t12}`);
                  e12 += `
- ${t12}`;
                }
                b3 += e12;
              }
              return `${m3}
${b3}`;
            }({ domain: y2.host, address: v2, statement: m2, uri: y2.href, version: "1", chainId: _2, nonce: null === (s2 = null == b2 ? void 0 : b2.signInWithEthereum) || void 0 === s2 ? void 0 : s2.nonce, issuedAt: null !== (n2 = null === (i2 = null == b2 ? void 0 : b2.signInWithEthereum) || void 0 === i2 ? void 0 : i2.issuedAt) && void 0 !== n2 ? n2 : /* @__PURE__ */ new Date(), expirationTime: null === (a2 = null == b2 ? void 0 : b2.signInWithEthereum) || void 0 === a2 ? void 0 : a2.expirationTime, notBefore: null === (o2 = null == b2 ? void 0 : b2.signInWithEthereum) || void 0 === o2 ? void 0 : o2.notBefore, requestId: null === (l2 = null == b2 ? void 0 : b2.signInWithEthereum) || void 0 === l2 ? void 0 : l2.requestId, resources: null === (u2 = null == b2 ? void 0 : b2.signInWithEthereum) || void 0 === u2 ? void 0 : u2.resources }), f2 = await c3.request({ method: "personal_sign", params: [(d2 = p2, "0x" + Array.from(new TextEncoder().encode(d2), (e11) => e11.toString(16).padStart(2, "0")).join("")), v2] });
          }
          try {
            let { data: t11, error: r11 } = await rO(this.fetch, "POST", `${this.url}/token?grant_type=web3`, { headers: this.headers, body: Object.assign({ chain: "ethereum", message: p2, signature: f2 }, (null === (c2 = e10.options) || void 0 === c2 ? void 0 : c2.captchaToken) ? { gotrue_meta_security: { captcha_token: null === (h2 = e10.options) || void 0 === h2 ? void 0 : h2.captchaToken } } : null), xform: rC });
            if (r11) throw r11;
            if (!t11 || !t11.session || !t11.user) {
              let e11 = new tU();
              return this._returnResult({ data: { user: null, session: null }, error: e11 });
            }
            return t11.session && (await this._saveSession(t11.session), await this._notifyAllSubscribers("SIGNED_IN", t11.session)), this._returnResult({ data: Object.assign({}, t11), error: r11 });
          } catch (e11) {
            if (tP(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithSolana(e10) {
          var t10, r10, s2, i2, n2, a2, o2, l2, u2, c2, h2, d2;
          let p2, f2;
          if ("message" in e10) p2 = e10.message, f2 = e10.signature;
          else {
            let h3;
            let { chain: d3, wallet: g2, statement: m2, options: b2 } = e10;
            if (t1()) {
              if ("object" == typeof g2) h3 = g2;
              else {
                let e11 = window;
                if ("solana" in e11 && "object" == typeof e11.solana && ("signIn" in e11.solana && "function" == typeof e11.solana.signIn || "signMessage" in e11.solana && "function" == typeof e11.solana.signMessage)) h3 = e11.solana;
                else throw Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.");
              }
            } else {
              if ("object" != typeof g2 || !(null == b2 ? void 0 : b2.url)) throw Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
              h3 = g2;
            }
            let y2 = new URL(null !== (t10 = null == b2 ? void 0 : b2.url) && void 0 !== t10 ? t10 : window.location.href);
            if ("signIn" in h3 && h3.signIn) {
              let e11;
              let t11 = await h3.signIn(Object.assign(Object.assign(Object.assign({ issuedAt: (/* @__PURE__ */ new Date()).toISOString() }, null == b2 ? void 0 : b2.signInWithSolana), { version: "1", domain: y2.host, uri: y2.href }), m2 ? { statement: m2 } : null));
              if (Array.isArray(t11) && t11[0] && "object" == typeof t11[0]) e11 = t11[0];
              else if (t11 && "object" == typeof t11 && "signedMessage" in t11 && "signature" in t11) e11 = t11;
              else throw Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");
              if ("signedMessage" in e11 && "signature" in e11 && ("string" == typeof e11.signedMessage || e11.signedMessage instanceof Uint8Array) && e11.signature instanceof Uint8Array) p2 = "string" == typeof e11.signedMessage ? e11.signedMessage : new TextDecoder().decode(e11.signedMessage), f2 = e11.signature;
              else throw Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields");
            } else {
              if (!("signMessage" in h3) || "function" != typeof h3.signMessage || !("publicKey" in h3) || "object" != typeof h3 || !h3.publicKey || !("toBase58" in h3.publicKey) || "function" != typeof h3.publicKey.toBase58) throw Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");
              p2 = [`${y2.host} wants you to sign in with your Solana account:`, h3.publicKey.toBase58(), ...m2 ? ["", m2, ""] : [""], "Version: 1", `URI: ${y2.href}`, `Issued At: ${null !== (s2 = null === (r10 = null == b2 ? void 0 : b2.signInWithSolana) || void 0 === r10 ? void 0 : r10.issuedAt) && void 0 !== s2 ? s2 : (/* @__PURE__ */ new Date()).toISOString()}`, ...(null === (i2 = null == b2 ? void 0 : b2.signInWithSolana) || void 0 === i2 ? void 0 : i2.notBefore) ? [`Not Before: ${b2.signInWithSolana.notBefore}`] : [], ...(null === (n2 = null == b2 ? void 0 : b2.signInWithSolana) || void 0 === n2 ? void 0 : n2.expirationTime) ? [`Expiration Time: ${b2.signInWithSolana.expirationTime}`] : [], ...(null === (a2 = null == b2 ? void 0 : b2.signInWithSolana) || void 0 === a2 ? void 0 : a2.chainId) ? [`Chain ID: ${b2.signInWithSolana.chainId}`] : [], ...(null === (o2 = null == b2 ? void 0 : b2.signInWithSolana) || void 0 === o2 ? void 0 : o2.nonce) ? [`Nonce: ${b2.signInWithSolana.nonce}`] : [], ...(null === (l2 = null == b2 ? void 0 : b2.signInWithSolana) || void 0 === l2 ? void 0 : l2.requestId) ? [`Request ID: ${b2.signInWithSolana.requestId}`] : [], ...(null === (c2 = null === (u2 = null == b2 ? void 0 : b2.signInWithSolana) || void 0 === u2 ? void 0 : u2.resources) || void 0 === c2 ? void 0 : c2.length) ? ["Resources", ...b2.signInWithSolana.resources.map((e12) => `- ${e12}`)] : []].join("\n");
              let e11 = await h3.signMessage(new TextEncoder().encode(p2), "utf8");
              if (!e11 || !(e11 instanceof Uint8Array)) throw Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");
              f2 = e11;
            }
          }
          try {
            let { data: t11, error: r11 } = await rO(this.fetch, "POST", `${this.url}/token?grant_type=web3`, { headers: this.headers, body: Object.assign({ chain: "solana", message: p2, signature: t0(f2) }, (null === (h2 = e10.options) || void 0 === h2 ? void 0 : h2.captchaToken) ? { gotrue_meta_security: { captcha_token: null === (d2 = e10.options) || void 0 === d2 ? void 0 : d2.captchaToken } } : null), xform: rC });
            if (r11) throw r11;
            if (!t11 || !t11.session || !t11.user) {
              let e11 = new tU();
              return this._returnResult({ data: { user: null, session: null }, error: e11 });
            }
            return t11.session && (await this._saveSession(t11.session), await this._notifyAllSubscribers("SIGNED_IN", t11.session)), this._returnResult({ data: Object.assign({}, t11), error: r11 });
          } catch (e11) {
            if (tP(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async _exchangeCodeForSession(e10, t10) {
          let r10 = (null == t10 ? void 0 : t10.flowId) != null, s2 = r10 ? ro(null == t10 ? void 0 : t10.flowId) : t1() ? ro(t4(window.location.href)[tC]) : null;
          r10 && !s2 && this._debug("#_exchangeCodeForSession()", "provided flowId is not a valid flow id", null == t10 ? void 0 : t10.flowId);
          let { verifier: i2, flowId: n2 } = r10 && !s2 ? { verifier: null, flowId: null } : await rd(this.storage, this.storageKey, s2), [a2, o2] = (null != i2 ? i2 : "").split("/");
          try {
            if (!a2 && "pkce" === this.flowType) throw new tq();
            let { data: t11, error: r11 } = await rO(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, { headers: this.headers, body: { auth_code: e10, code_verifier: a2 }, xform: rC });
            if (await rp(this.storage, this.storageKey, n2), r11) throw r11;
            if (!t11 || !t11.session || !t11.user) {
              let e11 = new tU();
              return this._returnResult({ data: { user: null, session: null, redirectType: null }, error: e11 });
            }
            return t11.session && (await this._saveSession(t11.session), await this._notifyAllSubscribers("recovery" === o2 ? "PASSWORD_RECOVERY" : "SIGNED_IN", t11.session)), this._returnResult({ data: Object.assign(Object.assign({}, t11), { redirectType: null != o2 ? o2 : null }), error: r11 });
          } catch (e11) {
            if (await rp(this.storage, this.storageKey, n2), tP(e11)) return this._returnResult({ data: { user: null, session: null, redirectType: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithIdToken(e10) {
          try {
            let { options: t10, provider: r10, token: s2, access_token: i2, nonce: n2 } = e10, { data: a2, error: o2 } = await rO(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, { headers: this.headers, body: { provider: r10, id_token: s2, access_token: i2, nonce: n2, gotrue_meta_security: { captcha_token: null == t10 ? void 0 : t10.captchaToken } }, xform: rC });
            if (o2) return this._returnResult({ data: { user: null, session: null }, error: o2 });
            if (!a2 || !a2.session || !a2.user) {
              let e11 = new tU();
              return this._returnResult({ data: { user: null, session: null }, error: e11 });
            }
            return a2.session && (await this._saveSession(a2.session), await this._notifyAllSubscribers("SIGNED_IN", a2.session)), this._returnResult({ data: a2, error: o2 });
          } catch (e11) {
            if (tP(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithOtp(e10) {
          var t10, r10, s2, i2, n2;
          let a2 = null;
          try {
            if ("email" in e10) {
              let { email: s3, options: i3 } = e10, n3 = null, o2 = null;
              "pkce" === this.flowType && ([n3, o2, a2] = await this._getCodeChallengeAndMethod());
              let { error: l2 } = await rO(this.fetch, "POST", `${this.url}/otp`, { headers: this.headers, body: { email: s3, data: null !== (t10 = null == i3 ? void 0 : i3.data) && void 0 !== t10 ? t10 : {}, create_user: null === (r10 = null == i3 ? void 0 : i3.shouldCreateUser) || void 0 === r10 || r10, gotrue_meta_security: { captcha_token: null == i3 ? void 0 : i3.captchaToken }, code_challenge: n3, code_challenge_method: o2 }, redirectTo: this._maybeAppendFlowIdToRedirect(null == i3 ? void 0 : i3.emailRedirectTo, a2) });
              return this._returnResult({ data: { user: null, session: null }, error: l2 });
            }
            if ("phone" in e10) {
              let { phone: t11, options: r11 } = e10, { data: a3, error: o2 } = await rO(this.fetch, "POST", `${this.url}/otp`, { headers: this.headers, body: { phone: t11, data: null !== (s2 = null == r11 ? void 0 : r11.data) && void 0 !== s2 ? s2 : {}, create_user: null === (i2 = null == r11 ? void 0 : r11.shouldCreateUser) || void 0 === i2 || i2, gotrue_meta_security: { captcha_token: null == r11 ? void 0 : r11.captchaToken }, channel: null !== (n2 = null == r11 ? void 0 : r11.channel) && void 0 !== n2 ? n2 : "sms" } });
              return this._returnResult({ data: { user: null, session: null, messageId: null == a3 ? void 0 : a3.message_id }, error: o2 });
            }
            throw new tD("You must provide either an email or phone number.");
          } catch (e11) {
            if (await rp(this.storage, this.storageKey, a2), tP(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async verifyOtp(e10) {
          var t10, r10;
          try {
            let s2, i2;
            "options" in e10 && (s2 = null === (t10 = e10.options) || void 0 === t10 ? void 0 : t10.redirectTo, i2 = null === (r10 = e10.options) || void 0 === r10 ? void 0 : r10.captchaToken);
            let { data: n2, error: a2 } = await rO(this.fetch, "POST", `${this.url}/verify`, { headers: this.headers, body: Object.assign(Object.assign({}, e10), { gotrue_meta_security: { captcha_token: i2 } }), redirectTo: s2, xform: rC });
            if (a2) throw a2;
            if (!n2) throw Error("An error occurred on token verification.");
            let o2 = n2.session, l2 = n2.user;
            return (null == o2 ? void 0 : o2.access_token) && (await this._saveSession(o2), await this._notifyAllSubscribers("recovery" == e10.type ? "PASSWORD_RECOVERY" : "SIGNED_IN", o2)), this._returnResult({ data: { user: l2, session: o2 }, error: null });
          } catch (e11) {
            if (tP(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithSSO(e10) {
          var t10, r10, s2, i2;
          let n2 = null;
          try {
            let a2 = null, o2 = null;
            "pkce" === this.flowType && ([a2, o2, n2] = await this._getCodeChallengeAndMethod());
            let l2 = await rO(this.fetch, "POST", `${this.url}/sso`, { body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in e10 ? { provider_id: e10.providerId } : null), "domain" in e10 ? { domain: e10.domain } : null), { redirect_to: this._maybeAppendFlowIdToRedirect(null === (t10 = e10.options) || void 0 === t10 ? void 0 : t10.redirectTo, n2) }), (null === (r10 = null == e10 ? void 0 : e10.options) || void 0 === r10 ? void 0 : r10.captchaToken) ? { gotrue_meta_security: { captcha_token: e10.options.captchaToken } } : null), { skip_http_redirect: true, code_challenge: a2, code_challenge_method: o2 }), headers: this.headers, xform: rx });
            return (null === (s2 = l2.data) || void 0 === s2 ? void 0 : s2.url) && t1() && !(null === (i2 = e10.options) || void 0 === i2 ? void 0 : i2.skipBrowserRedirect) && window.location.assign(l2.data.url), this._returnResult(l2);
          } catch (e11) {
            if (await rp(this.storage, this.storageKey, n2), tP(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async reauthenticate() {
          return (await this.initializePromise, null != this.lock) ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._reauthenticate()) : await this._reauthenticate();
        }
        async _reauthenticate() {
          try {
            return await this._useSession(async (e10) => {
              let { data: { session: t10 }, error: r10 } = e10;
              if (r10) throw r10;
              if (!t10) throw new tL();
              let { error: s2 } = await rO(this.fetch, "GET", `${this.url}/reauthenticate`, { headers: this.headers, jwt: t10.access_token });
              return this._returnResult({ data: { user: null, session: null }, error: s2 });
            });
          } catch (e10) {
            if (tP(e10)) return this._returnResult({ data: { user: null, session: null }, error: e10 });
            throw e10;
          }
        }
        async resend(e10) {
          let t10 = null;
          try {
            let r10 = `${this.url}/resend`;
            if ("email" in e10) {
              let { email: s2, type: i2, options: n2 } = e10, a2 = null, o2 = null;
              "pkce" === this.flowType && ([a2, o2, t10] = await this._getCodeChallengeAndMethod());
              let { error: l2 } = await rO(this.fetch, "POST", r10, { headers: this.headers, body: { email: s2, type: i2, gotrue_meta_security: { captcha_token: null == n2 ? void 0 : n2.captchaToken }, code_challenge: a2, code_challenge_method: o2 }, redirectTo: this._maybeAppendFlowIdToRedirect(null == n2 ? void 0 : n2.emailRedirectTo, t10) });
              return l2 && await rp(this.storage, this.storageKey, t10), this._returnResult({ data: { user: null, session: null }, error: l2 });
            }
            if ("phone" in e10) {
              let { phone: t11, type: s2, options: i2 } = e10, { data: n2, error: a2 } = await rO(this.fetch, "POST", r10, { headers: this.headers, body: { phone: t11, type: s2, gotrue_meta_security: { captcha_token: null == i2 ? void 0 : i2.captchaToken } } });
              return this._returnResult({ data: { user: null, session: null, messageId: null == n2 ? void 0 : n2.message_id }, error: a2 });
            }
            throw new tD("You must provide either an email or phone number and a type");
          } catch (e11) {
            if (await rp(this.storage, this.storageKey, t10), tP(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async getSession() {
          return (await this.initializePromise, null != this.lock) ? await this._acquireLock(this.lockAcquireTimeout, async () => this._useSession(async (e10) => e10)) : await this._useSession(async (e10) => e10);
        }
        async _acquireLock(e10, t10) {
          this._debug("#_acquireLock", "begin", e10);
          try {
            if (this.lockAcquired) {
              let e11 = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve(), r10 = (async () => (await e11, await t10()))();
              return this.pendingInLock.push((async () => {
                try {
                  await r10;
                } catch (e12) {
                }
              })()), r10;
            }
            return await this.lock(`lock:${this.storageKey}`, e10, async () => {
              this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
              try {
                this.lockAcquired = true;
                let e11 = t10();
                for (this.pendingInLock.push((async () => {
                  try {
                    await e11;
                  } catch (e12) {
                  }
                })()), await e11; this.pendingInLock.length; ) {
                  let e12 = [...this.pendingInLock];
                  await Promise.all(e12), this.pendingInLock.splice(0, e12.length);
                }
                return await e11;
              } finally {
                this._debug("#_acquireLock", "lock released for storage key", this.storageKey), this.lockAcquired = false;
              }
            });
          } finally {
            this._debug("#_acquireLock", "end");
          }
        }
        async _useSession(e10) {
          this._debug("#_useSession", "begin");
          try {
            let t10 = await this.__loadSession();
            return await e10(t10);
          } finally {
            this._debug("#_useSession", "end");
          }
        }
        async __loadSession() {
          this._debug("#__loadSession()", "begin"), null == this.lock || this.lockAcquired || this._debug("#__loadSession()", "used outside of an acquired lock!", Error().stack);
          try {
            let t10 = null, r10 = await t9(this.storage, this.storageKey);
            if (this._debug("#getSession()", "session from storage", r10), null !== r10 && (this._isValidSession(r10) ? t10 = r10 : (this._debug("#getSession()", "session from storage is not valid"), await this._removeSession())), !t10) return { data: { session: null }, error: null };
            let s2 = !!t10.expires_at && 1e3 * t10.expires_at - Date.now() < 9e4;
            if (this._debug("#__loadSession()", `session has${s2 ? "" : " not"} expired`, "expires_at", t10.expires_at), !s2) {
              if (this.userStorage) {
                let e11 = await t9(this.userStorage, this.storageKey + "-user");
                (null == e11 ? void 0 : e11.user) ? t10.user = e11.user : t10.user = rv();
              }
              if (this.storage.isServer && t10.user && !t10.user.__isUserNotAvailableProxy) {
                var e10;
                let r11 = { value: this.suppressGetSessionWarning };
                t10.user = (e10 = t10.user, new Proxy(e10, { get: (e11, t11, s3) => {
                  if ("__isInsecureUserWarningProxy" === t11) return true;
                  if ("symbol" == typeof t11) {
                    let r12 = t11.toString();
                    if ("Symbol(Symbol.toPrimitive)" === r12 || "Symbol(Symbol.toStringTag)" === r12 || "Symbol(util.inspect.custom)" === r12 || "Symbol(nodejs.util.inspect.custom)" === r12) return Reflect.get(e11, t11, s3);
                  }
                  return r11.value || "string" != typeof t11 || (console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."), r11.value = true), Reflect.get(e11, t11, s3);
                } })), r11.value && (this.suppressGetSessionWarning = true);
              }
              return { data: { session: t10 }, error: null };
            }
            let { data: i2, error: n2 } = await this._callRefreshToken(t10.refresh_token);
            if (n2) {
              if (t10.expires_at && 1e3 * t10.expires_at > Date.now()) {
                let e11 = await t9(this.storage, this.storageKey);
                if (e11 && e11.refresh_token === t10.refresh_token) return this._returnResult({ data: { session: t10 }, error: null });
              }
              return this._returnResult({ data: { session: null }, error: n2 });
            }
            return this._returnResult({ data: { session: i2 }, error: null });
          } finally {
            this._debug("#__loadSession()", "end");
          }
        }
        async getUser(e10) {
          let t10;
          return e10 ? await this._getUser(e10) : (await this.initializePromise, (t10 = null != this.lock ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._getUser()) : await this._getUser()).data.user && (this.suppressGetSessionWarning = true), t10);
        }
        async _getUser(e10) {
          try {
            if (e10) return await rO(this.fetch, "GET", `${this.url}/user`, { headers: this.headers, jwt: e10, xform: rP });
            return await this._useSession(async (e11) => {
              var t10, r10, s2;
              let { data: i2, error: n2 } = e11;
              if (n2) throw n2;
              return (null === (t10 = i2.session) || void 0 === t10 ? void 0 : t10.access_token) || this.hasCustomAuthorizationHeader ? await rO(this.fetch, "GET", `${this.url}/user`, { headers: this.headers, jwt: null !== (s2 = null === (r10 = i2.session) || void 0 === r10 ? void 0 : r10.access_token) && void 0 !== s2 ? s2 : void 0, xform: rP }) : { data: { user: null }, error: new tL() };
            });
          } catch (e11) {
            if (tP(e11)) return t$(e11) && await this._removeSession(), this._returnResult({ data: { user: null }, error: e11 });
            throw e11;
          }
        }
        async updateUser(e10, t10 = {}) {
          return (await this.initializePromise, null != this.lock) ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._updateUser(e10, t10)) : await this._updateUser(e10, t10);
        }
        async _updateUser(e10, t10 = {}) {
          let r10 = null;
          try {
            return await this._useSession(async (s2) => {
              let { data: i2, error: n2 } = s2;
              if (n2) throw n2;
              if (!i2.session) throw new tL();
              let a2 = i2.session, o2 = null, l2 = null;
              "pkce" === this.flowType && null != e10.email && ([o2, l2, r10] = await this._getCodeChallengeAndMethod());
              let { data: u2, error: c2 } = await rO(this.fetch, "PUT", `${this.url}/user`, { headers: this.headers, redirectTo: this._maybeAppendFlowIdToRedirect(null == t10 ? void 0 : t10.emailRedirectTo, r10), body: Object.assign(Object.assign({}, e10), { code_challenge: o2, code_challenge_method: l2 }), jwt: a2.access_token, xform: rP });
              if (c2) throw c2;
              return a2.user = u2.user, await this._saveSession(a2), await this._notifyAllSubscribers("USER_UPDATED", a2), this._returnResult({ data: { user: a2.user }, error: null });
            });
          } catch (e11) {
            if (await rp(this.storage, this.storageKey, r10), tP(e11)) return this._returnResult({ data: { user: null }, error: e11 });
            throw e11;
          }
        }
        async setSession(e10) {
          return (await this.initializePromise, null != this.lock) ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._setSession(e10)) : await this._setSession(e10);
        }
        async _setSession(e10) {
          try {
            if (!e10.access_token || !e10.refresh_token) throw new tL();
            let t10 = Date.now() / 1e3, r10 = t10, s2 = true, i2 = null, { payload: n2 } = rt(e10.access_token);
            if (n2.exp && (s2 = (r10 = n2.exp) <= t10), s2) {
              let { data: t11, error: r11 } = await this._callRefreshToken(e10.refresh_token);
              if (r11) return this._returnResult({ data: { user: null, session: null }, error: r11 });
              if (!t11) return { data: { user: null, session: null }, error: null };
              i2 = t11;
            } else {
              let { data: s3, error: n3 } = await this._getUser(e10.access_token);
              if (n3) return this._returnResult({ data: { user: null, session: null }, error: n3 });
              i2 = { access_token: e10.access_token, refresh_token: e10.refresh_token, user: s3.user, token_type: "bearer", expires_in: r10 - t10, expires_at: r10 }, await this._saveSession(i2), await this._notifyAllSubscribers("SIGNED_IN", i2);
            }
            return this._returnResult({ data: { user: i2.user, session: i2 }, error: null });
          } catch (e11) {
            if (tP(e11)) return this._returnResult({ data: { session: null, user: null }, error: e11 });
            throw e11;
          }
        }
        async refreshSession(e10) {
          return (await this.initializePromise, null != this.lock) ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._refreshSession(e10)) : await this._refreshSession(e10);
        }
        async _refreshSession(e10) {
          try {
            return await this._useSession(async (t10) => {
              var r10;
              if (!e10) {
                let { data: s3, error: i3 } = t10;
                if (i3) throw i3;
                e10 = null !== (r10 = s3.session) && void 0 !== r10 ? r10 : void 0;
              }
              if (!(null == e10 ? void 0 : e10.refresh_token)) throw new tL();
              let { data: s2, error: i2 } = await this._callRefreshToken(e10.refresh_token);
              return i2 ? this._returnResult({ data: { user: null, session: null }, error: i2 }) : s2 ? this._returnResult({ data: { user: s2.user, session: s2 }, error: null }) : this._returnResult({ data: { user: null, session: null }, error: null });
            });
          } catch (e11) {
            if (tP(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async _getSessionFromURL(e10, t10) {
          var r10;
          try {
            if (!t1()) throw new tM("No browser detected.");
            if (e10.error || e10.error_description || e10.error_code) throw new tM(e10.error_description || "Error in URL with unspecified error_description", { error: e10.error || "unspecified_error", code: e10.error_code || "unspecified_code" });
            switch (t10) {
              case "implicit":
                if ("pkce" === this.flowType) throw new tB("Not a valid PKCE flow url.");
                break;
              case "pkce":
                if ("implicit" === this.flowType) throw new tM("Not a valid implicit grant flow url.");
            }
            if ("pkce" === t10) {
              if (this._debug("#_initialize()", "begin", "is PKCE flow", true), !e10.code) throw new tB("No code detected.");
              let { data: t11, error: s3 } = await this._exchangeCodeForSession(e10.code, { flowId: e10[tC] });
              if (s3) throw s3;
              let i3 = new URL(window.location.href);
              return i3.searchParams.delete("code"), i3.searchParams.delete(tC), window.history.replaceState(window.history.state, "", i3.toString()), { data: { session: t11.session, redirectType: null !== (r10 = t11.redirectType) && void 0 !== r10 ? r10 : null }, error: null };
            }
            let { provider_token: s2, provider_refresh_token: i2, access_token: n2, refresh_token: a2, expires_in: o2, expires_at: l2, token_type: u2 } = e10;
            if (!n2 || !o2 || !a2 || !u2) throw new tM("No session defined in URL");
            let c2 = Math.round(Date.now() / 1e3), h2 = parseInt(o2), d2 = c2 + h2;
            l2 && (d2 = parseInt(l2));
            let p2 = d2 - c2;
            1e3 * p2 <= 3e4 && console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${p2}s, should have been closer to ${h2}s`);
            let f2 = d2 - h2;
            c2 - f2 >= 120 ? console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale", f2, d2, c2) : c2 - f2 < 0 && console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew", f2, d2, c2);
            let { data: g2, error: m2 } = await this._getUser(n2);
            if (m2) throw m2;
            let b2 = { provider_token: s2, provider_refresh_token: i2, access_token: n2, expires_in: h2, expires_at: d2, refresh_token: a2, token_type: u2, user: g2.user };
            return window.location.hash = "", this._debug("#_getSessionFromURL()", "clearing window.location.hash"), this._returnResult({ data: { session: b2, redirectType: e10.type }, error: null });
          } catch (e11) {
            if (tP(e11)) return this._returnResult({ data: { session: null, redirectType: null }, error: e11 });
            throw e11;
          }
        }
        _isImplicitGrantCallback(e10) {
          return "function" == typeof this.detectSessionInUrl ? this.detectSessionInUrl(new URL(window.location.href), e10) : !!(e10.access_token || e10.error || e10.error_description || e10.error_code);
        }
        async _isPKCECallback(e10) {
          if (!e10.code) return false;
          let t10 = ro(e10[tC]);
          return !!(t10 && await t9(this.storage, rl(this.storageKey, t10))) || !!await t9(this.storage, `${this.storageKey}-code-verifier`);
        }
        async signOut(e10 = { scope: "global" }) {
          return (await this.initializePromise, null != this.lock) ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._signOut(e10)) : await this._signOut(e10);
        }
        async _signOut({ scope: e10 } = { scope: "global" }) {
          return await this._useSession(async (t10) => {
            var r10;
            let s2 = async () => {
              await this._removeSession();
            }, { data: i2, error: n2 } = t10;
            if (n2 && !t$(n2)) return this._returnResult({ error: n2 });
            let a2 = null === (r10 = i2.session) || void 0 === r10 ? void 0 : r10.access_token;
            if (a2) {
              let { error: t11 } = await this.admin.signOut(a2, e10);
              if (t11 && !(tI(t11) && (404 === t11.status || 401 === t11.status || 403 === t11.status) || t$(t11))) return "others" !== e10 && await s2(), this._returnResult({ error: t11 });
            }
            return "others" !== e10 && await s2(), this._returnResult({ error: null });
          });
        }
        onAuthStateChange(e10) {
          let t10 = Symbol("auth-callback"), r10 = { id: t10, callback: e10, unsubscribe: () => {
            this._debug("#unsubscribe()", "state change callback with id removed", t10), this.stateChangeEmitters.delete(t10);
          } };
          return this._debug("#onAuthStateChange()", "registered callback with id", t10), this.stateChangeEmitters.set(t10, r10), (async () => {
            await this.initializePromise, null != this.lock ? await this._acquireLock(this.lockAcquireTimeout, async () => {
              this._emitInitialSession(t10);
            }) : await this._emitInitialSession(t10);
          })(), { data: { subscription: r10 } };
        }
        async _emitInitialSession(e10) {
          return await this._useSession(async (t10) => {
            var r10, s2;
            try {
              let { data: { session: s3 }, error: i2 } = t10;
              if (i2) throw i2;
              await (null === (r10 = this.stateChangeEmitters.get(e10)) || void 0 === r10 ? void 0 : r10.callback("INITIAL_SESSION", s3)), this._debug("INITIAL_SESSION", "callback id", e10, "session", s3);
            } catch (t11) {
              await (null === (s2 = this.stateChangeEmitters.get(e10)) || void 0 === s2 ? void 0 : s2.callback("INITIAL_SESSION", null)), this._debug("INITIAL_SESSION", "callback id", e10, "error", t11), t$(t11) || tH(t11) || tI(t11) && ("refresh_token_not_found" === t11.code || "refresh_token_already_used" === t11.code || "session_expired" === t11.code) ? console.warn(t11) : console.error(t11);
            }
          });
        }
        async resetPasswordForEmail(e10, t10 = {}) {
          let r10 = null, s2 = null, i2 = null;
          "pkce" === this.flowType && ([r10, s2, i2] = await this._getCodeChallengeAndMethod(true));
          try {
            return await rO(this.fetch, "POST", `${this.url}/recover`, { body: { email: e10, code_challenge: r10, code_challenge_method: s2, gotrue_meta_security: { captcha_token: t10.captchaToken } }, headers: this.headers, redirectTo: this._maybeAppendFlowIdToRedirect(t10.redirectTo, i2) });
          } catch (e11) {
            if (await rp(this.storage, this.storageKey, i2), tP(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async getUserIdentities() {
          var e10;
          try {
            let { data: t10, error: r10 } = await this.getUser();
            if (r10) throw r10;
            return this._returnResult({ data: { identities: null !== (e10 = t10.user.identities) && void 0 !== e10 ? e10 : [] }, error: null });
          } catch (e11) {
            if (tP(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async linkIdentity(e10) {
          return "token" in e10 ? this.linkIdentityIdToken(e10) : this.linkIdentityOAuth(e10);
        }
        async linkIdentityOAuth(e10) {
          var t10;
          let r10 = null;
          try {
            let { data: s2, error: i2 } = await this._useSession(async (t11) => {
              var s3, i3, n2, a2, o2;
              let { data: l2, error: u2 } = t11;
              if (u2) throw u2;
              let { url: c2, flowId: h2 } = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, e10.provider, { redirectTo: null === (s3 = e10.options) || void 0 === s3 ? void 0 : s3.redirectTo, scopes: null === (i3 = e10.options) || void 0 === i3 ? void 0 : i3.scopes, queryParams: null === (n2 = e10.options) || void 0 === n2 ? void 0 : n2.queryParams, skipBrowserRedirect: true });
              return r10 = h2, await rO(this.fetch, "GET", c2, { headers: this.headers, jwt: null !== (o2 = null === (a2 = l2.session) || void 0 === a2 ? void 0 : a2.access_token) && void 0 !== o2 ? o2 : void 0 });
            });
            if (i2) throw i2;
            return !t1() || (null === (t10 = e10.options) || void 0 === t10 ? void 0 : t10.skipBrowserRedirect) || window.location.assign(null == s2 ? void 0 : s2.url), this._returnResult({ data: { provider: e10.provider, url: null == s2 ? void 0 : s2.url, flowId: r10 }, error: null });
          } catch (t11) {
            if (tP(t11)) return this._returnResult({ data: { provider: e10.provider, url: null, flowId: r10 }, error: t11 });
            throw t11;
          }
        }
        async linkIdentityIdToken(e10) {
          return await this._useSession(async (t10) => {
            var r10;
            try {
              let { error: s2, data: { session: i2 } } = t10;
              if (s2) throw s2;
              let { options: n2, provider: a2, token: o2, access_token: l2, nonce: u2 } = e10, { data: c2, error: h2 } = await rO(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, { headers: this.headers, jwt: null !== (r10 = null == i2 ? void 0 : i2.access_token) && void 0 !== r10 ? r10 : void 0, body: { provider: a2, id_token: o2, access_token: l2, nonce: u2, link_identity: true, gotrue_meta_security: { captcha_token: null == n2 ? void 0 : n2.captchaToken } }, xform: rC });
              if (h2) return this._returnResult({ data: { user: null, session: null }, error: h2 });
              if (!c2 || !c2.session || !c2.user) return this._returnResult({ data: { user: null, session: null }, error: new tU() });
              return c2.session && (await this._saveSession(c2.session), await this._notifyAllSubscribers("USER_UPDATED", c2.session)), this._returnResult({ data: c2, error: h2 });
            } catch (e11) {
              if (await rp(this.storage, this.storageKey, null), tP(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
              throw e11;
            }
          });
        }
        async unlinkIdentity(e10) {
          try {
            return await this._useSession(async (t10) => {
              var r10, s2;
              let { data: i2, error: n2 } = t10;
              if (n2) throw n2;
              return await rO(this.fetch, "DELETE", `${this.url}/user/identities/${e10.identity_id}`, { headers: this.headers, jwt: null !== (s2 = null === (r10 = i2.session) || void 0 === r10 ? void 0 : r10.access_token) && void 0 !== s2 ? s2 : void 0 });
            });
          } catch (e11) {
            if (tP(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _refreshAccessToken(e10) {
          let t10 = "#_refreshAccessToken()";
          this._debug(t10, "begin");
          try {
            var r10, s2;
            let i2 = Date.now();
            return await (r10 = async (r11) => (r11 > 0 && await rr(200 * Math.pow(2, r11 - 1)), this._debug(t10, "refreshing attempt", r11), await rO(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, { body: { refresh_token: e10 }, headers: this.headers, xform: rC })), s2 = (e11, t11) => t11 && tH(t11) && Date.now() + 200 * Math.pow(2, e11) - i2 < 3e4, new Promise((e11, t11) => {
              (async () => {
                for (let i3 = 0; i3 < 1 / 0; i3++) try {
                  let t12 = await r10(i3);
                  if (!s2(i3, null, t12)) {
                    e11(t12);
                    return;
                  }
                } catch (e12) {
                  if (!s2(i3, e12)) {
                    t11(e12);
                    return;
                  }
                }
              })();
            }));
          } catch (e11) {
            if (this._debug(t10, "error", e11), tP(e11)) return this._returnResult({ data: { session: null, user: null }, error: e11 });
            throw e11;
          } finally {
            this._debug(t10, "end");
          }
        }
        _isValidSession(e10) {
          return "object" == typeof e10 && null !== e10 && "access_token" in e10 && "refresh_token" in e10 && "expires_at" in e10;
        }
        async _handleProviderSignIn(e10, t10) {
          let { url: r10, flowId: s2 } = await this._getUrlForProvider(`${this.url}/authorize`, e10, { redirectTo: t10.redirectTo, scopes: t10.scopes, queryParams: t10.queryParams });
          return this._debug("#_handleProviderSignIn()", "provider", e10, "options", t10, "url", r10), t1() && !t10.skipBrowserRedirect && window.location.assign(r10), { data: { provider: e10, url: r10, flowId: s2 }, error: null };
        }
        async _recoverAndRefresh() {
          var e10, t10;
          let r10 = "#_recoverAndRefresh()";
          this._debug(r10, "begin");
          try {
            let s2 = await t9(this.storage, this.storageKey);
            if (s2 && this.userStorage) {
              let t11 = await t9(this.userStorage, this.storageKey + "-user");
              !this.storage.isServer && Object.is(this.storage, this.userStorage) && !t11 && (t11 = { user: s2.user }, await t8(this.userStorage, this.storageKey + "-user", t11)), s2.user = null !== (e10 = null == t11 ? void 0 : t11.user) && void 0 !== e10 ? e10 : rv();
            } else if (s2 && !s2.user && !s2.user) {
              let e11 = await t9(this.storage, this.storageKey + "-user");
              e11 && (null == e11 ? void 0 : e11.user) ? (s2.user = e11.user, await t7(this.storage, this.storageKey + "-user"), await t8(this.storage, this.storageKey, s2)) : s2.user = rv();
            }
            if (this._debug(r10, "session from storage", s2), !this._isValidSession(s2)) {
              this._debug(r10, "session is not valid"), null !== s2 && await this._removeSession();
              return;
            }
            let i2 = (null !== (t10 = s2.expires_at) && void 0 !== t10 ? t10 : 1 / 0) * 1e3 - Date.now() < 9e4;
            if (this._debug(r10, `session has${i2 ? "" : " not"} expired with margin of 90000s`), i2) {
              if (this.autoRefreshToken && s2.refresh_token) {
                let { error: e11 } = await this._callRefreshToken(s2.refresh_token);
                e11 && (tP(e11) && "AuthRefreshDiscardedError" === e11.name ? this._debug(r10, "refresh discarded by commit guard", e11) : this._debug(r10, "refresh failed", e11));
              }
            } else if (s2.user && true === s2.user.__isUserNotAvailableProxy) try {
              let { data: e11, error: t11 } = await this._getUser(s2.access_token);
              !t11 && (null == e11 ? void 0 : e11.user) ? (s2.user = e11.user, await this._saveSession(s2), await this._notifyAllSubscribers("SIGNED_IN", s2)) : this._debug(r10, "could not get user data, skipping SIGNED_IN notification");
            } catch (e11) {
              console.error("Error getting user data:", e11), this._debug(r10, "error getting user data, skipping SIGNED_IN notification", e11);
            }
            else await this._notifyAllSubscribers("SIGNED_IN", s2);
          } catch (e11) {
            this._debug(r10, "error", e11), tH(e11) ? console.warn(e11) : console.error(e11);
            return;
          } finally {
            this._debug(r10, "end");
          }
        }
        async _callRefreshToken(e10) {
          var t10, r10;
          if (!e10) throw new tL();
          if (this.refreshingDeferred) return this.refreshingDeferred.promise;
          if (this.lastRefreshFailure && this.lastRefreshFailure.refreshToken === e10 && Date.now() < this.lastRefreshFailure.expiresAt) return this._debug("#_callRefreshToken()", "returning cached failure (cooldown active)"), this.lastRefreshFailure.result;
          let s2 = "#_callRefreshToken()";
          this._debug(s2, "begin");
          try {
            this.refreshingDeferred = new re();
            let t11 = await t9(this.storage, this.storageKey), { data: r11, error: i2 } = await this._refreshAccessToken(e10);
            if (i2) throw i2;
            if (!r11.session) throw new tL();
            let n2 = await t9(this.storage, this.storageKey);
            if (null !== t11 && (null === n2 || n2.refresh_token !== t11.refresh_token)) {
              this._debug(s2, "commit guard: storage changed since refresh started, discarding rotated tokens", { startedWith: "present", nowHolds: n2 ? "replaced" : "cleared" });
              let e11 = { data: null, error: new tV() };
              return this.refreshingDeferred.resolve(e11), e11;
            }
            let a2 = this._sessionRemovalEpoch;
            if (await this._saveSession(r11.session), this._sessionRemovalEpoch !== a2) {
              this._debug(s2, "commit guard (post-save): _removeSession ran during _saveSession, undoing write"), await t7(this.storage, this.storageKey), this.userStorage && await t7(this.userStorage, this.storageKey + "-user");
              let e11 = { data: null, error: new tV() };
              return this.refreshingDeferred.resolve(e11), e11;
            }
            await this._notifyAllSubscribers("TOKEN_REFRESHED", r11.session);
            let o2 = { data: r11.session, error: null };
            return this.lastRefreshFailure = null, this.refreshingDeferred.resolve(o2), o2;
          } catch (i2) {
            if (this._debug(s2, "error", i2), tP(i2)) {
              let r11 = { data: null, error: i2 };
              if (!tH(i2)) {
                let e11 = await t9(this.storage, this.storageKey);
                (null == e11 ? void 0 : e11.expires_at) && 1e3 * e11.expires_at > Date.now() ? this._debug(s2, "proactive refresh failed, access token still valid \u2014 preserving session") : await this._removeSession();
              }
              return this.lastRefreshFailure = { refreshToken: e10, result: r11, expiresAt: Date.now() + 6e4 }, null === (t10 = this.refreshingDeferred) || void 0 === t10 || t10.resolve(r11), r11;
            }
            throw null === (r10 = this.refreshingDeferred) || void 0 === r10 || r10.reject(i2), i2;
          } finally {
            this.refreshingDeferred = null, this._debug(s2, "end");
          }
        }
        async _notifyAllSubscribers(e10, t10, r10 = true) {
          if (null !== this._pendingInitNotifications && r10) {
            this._pendingInitNotifications.push({ event: e10, session: t10, broadcast: r10 });
            return;
          }
          let s2 = `#_notifyAllSubscribers(${e10})`;
          this._debug(s2, "begin", t10, `broadcast = ${r10}`);
          try {
            this.broadcastChannel && r10 && this.broadcastChannel.postMessage({ event: e10, session: t10 });
            let s3 = [], i2 = Array.from(this.stateChangeEmitters.values()).map(async (r11) => {
              try {
                await r11.callback(e10, t10);
              } catch (e11) {
                s3.push(e11);
              }
            });
            if (await Promise.all(i2), s3.length > 0) {
              for (let e11 = 0; e11 < s3.length; e11 += 1) console.error(s3[e11]);
              throw s3[0];
            }
          } finally {
            this._debug(s2, "end");
          }
        }
        async _saveSession(e10) {
          this._debug("#_saveSession()", e10), this.suppressGetSessionWarning = true;
          let t10 = Object.assign({}, e10), r10 = t10.user && true === t10.user.__isUserNotAvailableProxy;
          if (this.userStorage) {
            !r10 && t10.user && await t8(this.userStorage, this.storageKey + "-user", { user: t10.user });
            let e11 = Object.assign({}, t10);
            delete e11.user;
            let s2 = r_(e11);
            await t8(this.storage, this.storageKey, s2);
          } else {
            let e11 = r_(t10);
            await t8(this.storage, this.storageKey, e11);
          }
        }
        async _removeSession() {
          this._sessionRemovalEpoch += 1, this._debug("#_removeSession()"), this.lastRefreshFailure = null, this.suppressGetSessionWarning = false, await t7(this.storage, this.storageKey), await rf(this.storage, this.storageKey), await t7(this.storage, this.storageKey + "-user"), this.userStorage && await t7(this.userStorage, this.storageKey + "-user"), await this._notifyAllSubscribers("SIGNED_OUT", null);
        }
        _removeVisibilityChangedCallback() {
          this._debug("#_removeVisibilityChangedCallback()");
          let e10 = this.visibilityChangedCallback;
          this.visibilityChangedCallback = null;
          try {
            e10 && t1() && (null == window ? void 0 : window.removeEventListener) && window.removeEventListener("visibilitychange", e10);
          } catch (e11) {
            console.error("removing visibilitychange callback failed", e11);
          }
        }
        async _startAutoRefresh() {
          await this._stopAutoRefresh(), this._debug("#_startAutoRefresh()");
          let e10 = setInterval(() => this._autoRefreshTokenTick(), 3e4);
          this.autoRefreshTicker = e10, e10 && "object" == typeof e10 && "function" == typeof e10.unref ? e10.unref() : "undefined" != typeof Deno && "function" == typeof Deno.unrefTimer && Deno.unrefTimer(e10);
          let t10 = setTimeout(async () => {
            await this.initializePromise, await this._autoRefreshTokenTick();
          }, 0);
          this.autoRefreshTickTimeout = t10, t10 && "object" == typeof t10 && "function" == typeof t10.unref ? t10.unref() : "undefined" != typeof Deno && "function" == typeof Deno.unrefTimer && Deno.unrefTimer(t10);
        }
        async _stopAutoRefresh() {
          this._debug("#_stopAutoRefresh()");
          let e10 = this.autoRefreshTicker;
          this.autoRefreshTicker = null, e10 && clearInterval(e10);
          let t10 = this.autoRefreshTickTimeout;
          this.autoRefreshTickTimeout = null, t10 && clearTimeout(t10);
        }
        async startAutoRefresh() {
          this._removeVisibilityChangedCallback(), await this._startAutoRefresh();
        }
        async stopAutoRefresh() {
          this._removeVisibilityChangedCallback(), await this._stopAutoRefresh();
        }
        async dispose() {
          var e10;
          this._removeVisibilityChangedCallback(), await this._stopAutoRefresh(), null === (e10 = this.broadcastChannel) || void 0 === e10 || e10.close(), this.broadcastChannel = null, this.stateChangeEmitters.clear();
        }
        async _autoRefreshTokenTick() {
          if (this._debug("#_autoRefreshTokenTick()", "begin"), null != this.lock) {
            try {
              await this._acquireLock(0, async () => {
                try {
                  let e10 = Date.now();
                  try {
                    return await this._useSession(async (t10) => {
                      let { data: { session: r10 } } = t10;
                      if (!r10 || !r10.refresh_token || !r10.expires_at) {
                        this._debug("#_autoRefreshTokenTick()", "no session");
                        return;
                      }
                      let s2 = Math.floor((1e3 * r10.expires_at - e10) / 3e4);
                      this._debug("#_autoRefreshTokenTick()", `access token expires in ${s2} ticks, a tick lasts 30000ms, refresh threshold is 3 ticks`), s2 <= 3 && await this._callRefreshToken(r10.refresh_token);
                    });
                  } catch (e11) {
                    console.error("Auto refresh tick failed with error. This is likely a transient error.", e11);
                  }
                } finally {
                  this._debug("#_autoRefreshTokenTick()", "end");
                }
              });
            } catch (e10) {
              if (e10 instanceof rU) this._debug("auto refresh token tick lock not available");
              else throw e10;
            }
            return;
          }
          if (null !== this.refreshingDeferred) {
            this._debug("#_autoRefreshTokenTick()", "refresh already in flight, skipping");
            return;
          }
          try {
            let e10 = Date.now();
            try {
              await this._useSession(async (t10) => {
                let { data: { session: r10 } } = t10;
                if (!r10 || !r10.refresh_token || !r10.expires_at) {
                  this._debug("#_autoRefreshTokenTick()", "no session");
                  return;
                }
                let s2 = Math.floor((1e3 * r10.expires_at - e10) / 3e4);
                this._debug("#_autoRefreshTokenTick()", `access token expires in ${s2} ticks, a tick lasts 30000ms, refresh threshold is 3 ticks`), s2 <= 3 && await this._callRefreshToken(r10.refresh_token);
              });
            } catch (e11) {
              console.error("Auto refresh tick failed with error. This is likely a transient error.", e11);
            }
          } finally {
            this._debug("#_autoRefreshTokenTick()", "end");
          }
        }
        async _handleVisibilityChange() {
          if (this._debug("#_handleVisibilityChange()"), !t1() || !(null == window ? void 0 : window.addEventListener)) return this.autoRefreshToken && this.startAutoRefresh(), false;
          try {
            this.visibilityChangedCallback = async () => {
              try {
                await this._onVisibilityChanged(false);
              } catch (e10) {
                this._debug("#visibilityChangedCallback", "error", e10);
              }
            }, null == window || window.addEventListener("visibilitychange", this.visibilityChangedCallback), await this._onVisibilityChanged(true);
          } catch (e10) {
            console.error("_handleVisibilityChange", e10);
          }
        }
        async _onVisibilityChanged(e10) {
          let t10 = `#_onVisibilityChanged(${e10})`;
          if (this._debug(t10, "visibilityState", document.visibilityState), "visible" === document.visibilityState) {
            if (this.autoRefreshToken && this._startAutoRefresh(), !e10) {
              if (await this.initializePromise, null != this.lock) await this._acquireLock(this.lockAcquireTimeout, async () => {
                if ("visible" !== document.visibilityState) {
                  this._debug(t10, "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");
                  return;
                }
                await this._recoverAndRefresh();
              });
              else {
                if ("visible" !== document.visibilityState) {
                  this._debug(t10, "visibilityState is no longer visible, skipping recovery");
                  return;
                }
                await this._recoverAndRefresh();
              }
            }
          } else "hidden" === document.visibilityState && this.autoRefreshToken && this._stopAutoRefresh();
        }
        async _getUrlForProvider(e10, t10, r10) {
          let s2 = null == r10 ? void 0 : r10.redirectTo, i2 = null, n2 = null, a2 = null;
          "pkce" === this.flowType && ([i2, n2, a2] = await this._getCodeChallengeAndMethod(), s2 = this._maybeAppendFlowIdToRedirect(s2, a2));
          let o2 = [`provider=${encodeURIComponent(t10)}`];
          if (s2 && o2.push(`redirect_to=${encodeURIComponent(s2)}`), (null == r10 ? void 0 : r10.scopes) && o2.push(`scopes=${encodeURIComponent(r10.scopes)}`), null != i2 && null != n2) {
            let e11 = new URLSearchParams({ code_challenge: `${encodeURIComponent(i2)}`, code_challenge_method: `${encodeURIComponent(n2)}` });
            o2.push(e11.toString());
          }
          if (null == r10 ? void 0 : r10.queryParams) {
            let e11 = new URLSearchParams(r10.queryParams);
            o2.push(e11.toString());
          }
          return (null == r10 ? void 0 : r10.skipBrowserRedirect) && o2.push(`skip_http_redirect=${r10.skipBrowserRedirect}`), { url: `${e10}?${o2.join("&")}`, flowId: a2 };
        }
        _maybeAppendFlowIdToRedirect(e10, t10) {
          return e10 && t10 && this.experimental.appendPkceFlowIdToRedirects ? function(e11, t11) {
            let r10 = e11.indexOf("#"), s2 = -1 === r10 ? e11 : e11.slice(0, r10), i2 = -1 === r10 ? "" : e11.slice(r10), n2 = s2.indexOf("?");
            if (-1 !== n2) {
              let e12 = s2.slice(0, n2), t12 = s2.slice(n2 + 1).split("&").filter((e13) => "" !== e13 && e13 !== tC && !e13.startsWith(`${tC}=`));
              s2 = t12.length > 0 ? `${e12}?${t12.join("&")}` : e12;
            }
            let a2 = s2.includes("?") ? "&" : "?";
            return `${s2}${a2}${tC}=${encodeURIComponent(t11)}${i2}`;
          }(e10, t10) : null != e10 ? e10 : void 0;
        }
        async _getCodeChallengeAndMethod(e10 = false) {
          return rg(this.storage, this.storageKey, e10, (e11) => this._debug("#_getCodeChallengeAndMethod()", "evicted oldest pending PKCE verifier slot", e11));
        }
        async _unenroll(e10) {
          try {
            return await this._useSession(async (t10) => {
              var r10;
              let { data: s2, error: i2 } = t10;
              return i2 ? this._returnResult({ data: null, error: i2 }) : await rO(this.fetch, "DELETE", `${this.url}/factors/${e10.factorId}`, { headers: this.headers, jwt: null === (r10 = null == s2 ? void 0 : s2.session) || void 0 === r10 ? void 0 : r10.access_token });
            });
          } catch (e11) {
            if (tP(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _enroll(e10) {
          try {
            return await this._useSession(async (t10) => {
              var r10, s2;
              let { data: i2, error: n2 } = t10;
              if (n2) return this._returnResult({ data: null, error: n2 });
              let a2 = Object.assign({ friendly_name: e10.friendlyName, factor_type: e10.factorType }, "phone" === e10.factorType ? { phone: e10.phone } : "totp" === e10.factorType ? { issuer: e10.issuer } : {}), { data: o2, error: l2 } = await rO(this.fetch, "POST", `${this.url}/factors`, { body: a2, headers: this.headers, jwt: null === (r10 = null == i2 ? void 0 : i2.session) || void 0 === r10 ? void 0 : r10.access_token });
              return l2 ? this._returnResult({ data: null, error: l2 }) : ("totp" === e10.factorType && "totp" === o2.type && (null === (s2 = null == o2 ? void 0 : o2.totp) || void 0 === s2 ? void 0 : s2.qr_code) && (o2.totp.qr_code = `data:image/svg+xml;utf-8,${o2.totp.qr_code}`), this._returnResult({ data: o2, error: null }));
            });
          } catch (e11) {
            if (tP(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _verify(e10) {
          let t10 = async () => {
            try {
              return await this._useSession(async (t11) => {
                var r10;
                let { data: s2, error: i2 } = t11;
                if (i2) return this._returnResult({ data: null, error: i2 });
                let n2 = Object.assign({ challenge_id: e10.challengeId }, "webauthn" in e10 ? { webauthn: Object.assign(Object.assign({}, e10.webauthn), { credential_response: "create" === e10.webauthn.type ? rW(e10.webauthn.credential_response) : rz(e10.webauthn.credential_response) }) } : { code: e10.code }), { data: a2, error: o2 } = await rO(this.fetch, "POST", `${this.url}/factors/${e10.factorId}/verify`, { body: n2, headers: this.headers, jwt: null === (r10 = null == s2 ? void 0 : s2.session) || void 0 === r10 ? void 0 : r10.access_token });
                return o2 ? this._returnResult({ data: null, error: o2 }) : (await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + a2.expires_in }, a2)), await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", a2), this._returnResult({ data: a2, error: o2 }));
              });
            } catch (e11) {
              if (tP(e11)) return this._returnResult({ data: null, error: e11 });
              throw e11;
            }
          };
          return null != this.lock ? this._acquireLock(this.lockAcquireTimeout, t10) : t10();
        }
        async _challenge(e10) {
          let t10 = async () => {
            try {
              return await this._useSession(async (t11) => {
                var r10;
                let { data: s2, error: i2 } = t11;
                if (i2) return this._returnResult({ data: null, error: i2 });
                let n2 = await rO(this.fetch, "POST", `${this.url}/factors/${e10.factorId}/challenge`, { body: e10, headers: this.headers, jwt: null === (r10 = null == s2 ? void 0 : s2.session) || void 0 === r10 ? void 0 : r10.access_token });
                if (n2.error) return n2;
                let { data: a2 } = n2;
                if ("webauthn" !== a2.type) return { data: a2, error: null };
                switch (a2.webauthn.type) {
                  case "create":
                    return { data: Object.assign(Object.assign({}, a2), { webauthn: Object.assign(Object.assign({}, a2.webauthn), { credential_options: Object.assign(Object.assign({}, a2.webauthn.credential_options), { publicKey: rH(a2.webauthn.credential_options.publicKey) }) }) }), error: null };
                  case "request":
                    return { data: Object.assign(Object.assign({}, a2), { webauthn: Object.assign(Object.assign({}, a2.webauthn), { credential_options: Object.assign(Object.assign({}, a2.webauthn.credential_options), { publicKey: rV(a2.webauthn.credential_options.publicKey) }) }) }), error: null };
                }
              });
            } catch (e11) {
              if (tP(e11)) return this._returnResult({ data: null, error: e11 });
              throw e11;
            }
          };
          return null != this.lock ? this._acquireLock(this.lockAcquireTimeout, t10) : t10();
        }
        async _challengeAndVerify(e10) {
          let { data: t10, error: r10 } = await this._challenge({ factorId: e10.factorId });
          return r10 ? this._returnResult({ data: null, error: r10 }) : await this._verify({ factorId: e10.factorId, challengeId: t10.id, code: e10.code });
        }
        async _listFactors() {
          var e10;
          let { data: { user: t10 }, error: r10 } = await this.getUser();
          if (r10) return { data: null, error: r10 };
          let s2 = { all: [], phone: [], totp: [], webauthn: [] };
          for (let r11 of null !== (e10 = null == t10 ? void 0 : t10.factors) && void 0 !== e10 ? e10 : []) s2.all.push(r11), "verified" === r11.status && s2[r11.factor_type].push(r11);
          return { data: s2, error: null };
        }
        async _getAuthenticatorAssuranceLevel(e10) {
          var t10, r10, s2, i2;
          if (e10) try {
            let { payload: s3 } = rt(e10), i3 = null;
            s3.aal && (i3 = s3.aal);
            let n3 = i3, { data: { user: a3 }, error: o3 } = await this.getUser(e10);
            if (o3) return this._returnResult({ data: null, error: o3 });
            (null !== (r10 = null === (t10 = null == a3 ? void 0 : a3.factors) || void 0 === t10 ? void 0 : t10.filter((e11) => "verified" === e11.status)) && void 0 !== r10 ? r10 : []).length > 0 && (n3 = "aal2");
            let l3 = s3.amr || [];
            return { data: { currentLevel: i3, nextLevel: n3, currentAuthenticationMethods: l3 }, error: null };
          } catch (e11) {
            if (tP(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
          let { data: { session: n2 }, error: a2 } = await this.getSession();
          if (a2) return this._returnResult({ data: null, error: a2 });
          if (!n2) return { data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] }, error: null };
          let { payload: o2 } = rt(n2.access_token), l2 = null;
          o2.aal && (l2 = o2.aal);
          let u2 = l2;
          return (null !== (i2 = null === (s2 = n2.user.factors) || void 0 === s2 ? void 0 : s2.filter((e11) => "verified" === e11.status)) && void 0 !== i2 ? i2 : []).length > 0 && (u2 = "aal2"), { data: { currentLevel: l2, nextLevel: u2, currentAuthenticationMethods: o2.amr || [] }, error: null };
        }
        async _getAuthorizationDetails(e10) {
          try {
            return await this._useSession(async (t10) => {
              let { data: { session: r10 }, error: s2 } = t10;
              return s2 ? this._returnResult({ data: null, error: s2 }) : r10 ? await rO(this.fetch, "GET", `${this.url}/oauth/authorizations/${e10}`, { headers: this.headers, jwt: r10.access_token, xform: (e11) => ({ data: e11, error: null }) }) : this._returnResult({ data: null, error: new tL() });
            });
          } catch (e11) {
            if (tP(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _approveAuthorization(e10, t10) {
          try {
            return await this._useSession(async (r10) => {
              let { data: { session: s2 }, error: i2 } = r10;
              if (i2) return this._returnResult({ data: null, error: i2 });
              if (!s2) return this._returnResult({ data: null, error: new tL() });
              let n2 = await rO(this.fetch, "POST", `${this.url}/oauth/authorizations/${e10}/consent`, { headers: this.headers, jwt: s2.access_token, body: { action: "approve" }, xform: (e11) => ({ data: e11, error: null }) });
              return n2.data && n2.data.redirect_url && t1() && !(null == t10 ? void 0 : t10.skipBrowserRedirect) && window.location.assign(n2.data.redirect_url), n2;
            });
          } catch (e11) {
            if (tP(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _denyAuthorization(e10, t10) {
          try {
            return await this._useSession(async (r10) => {
              let { data: { session: s2 }, error: i2 } = r10;
              if (i2) return this._returnResult({ data: null, error: i2 });
              if (!s2) return this._returnResult({ data: null, error: new tL() });
              let n2 = await rO(this.fetch, "POST", `${this.url}/oauth/authorizations/${e10}/consent`, { headers: this.headers, jwt: s2.access_token, body: { action: "deny" }, xform: (e11) => ({ data: e11, error: null }) });
              return n2.data && n2.data.redirect_url && t1() && !(null == t10 ? void 0 : t10.skipBrowserRedirect) && window.location.assign(n2.data.redirect_url), n2;
            });
          } catch (e11) {
            if (tP(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _listOAuthGrants() {
          try {
            return await this._useSession(async (e10) => {
              let { data: { session: t10 }, error: r10 } = e10;
              return r10 ? this._returnResult({ data: null, error: r10 }) : t10 ? await rO(this.fetch, "GET", `${this.url}/user/oauth/grants`, { headers: this.headers, jwt: t10.access_token, xform: (e11) => ({ data: e11, error: null }) }) : this._returnResult({ data: null, error: new tL() });
            });
          } catch (e10) {
            if (tP(e10)) return this._returnResult({ data: null, error: e10 });
            throw e10;
          }
        }
        async _revokeOAuthGrant(e10) {
          try {
            return await this._useSession(async (t10) => {
              let { data: { session: r10 }, error: s2 } = t10;
              return s2 ? this._returnResult({ data: null, error: s2 }) : r10 ? (await rO(this.fetch, "DELETE", `${this.url}/user/oauth/grants`, { headers: this.headers, jwt: r10.access_token, query: { client_id: e10.clientId }, noResolveJson: true }), { data: {}, error: null }) : this._returnResult({ data: null, error: new tL() });
            });
          } catch (e11) {
            if (tP(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async fetchJwk(e10, t10 = { keys: [] }) {
          let r10 = t10.keys.find((t11) => t11.kid === e10);
          if (r10) return r10;
          let s2 = Date.now();
          if ((r10 = this.jwks.keys.find((t11) => t11.kid === e10)) && this.jwks_cached_at + 6e5 > s2) return r10;
          let { data: i2, error: n2 } = await rO(this.fetch, "GET", `${this.url}/.well-known/jwks.json`, { headers: this.headers });
          if (n2) throw n2;
          return i2.keys && 0 !== i2.keys.length && (this.jwks = i2, this.jwks_cached_at = s2, r10 = i2.keys.find((t11) => t11.kid === e10)) ? r10 : null;
        }
        async getClaims(e10, t10 = {}) {
          try {
            let r10 = e10;
            if (!r10) {
              let { data: e11, error: t11 } = await this.getSession();
              if (t11 || !e11.session) return this._returnResult({ data: null, error: t11 });
              r10 = e11.session.access_token;
            }
            let { header: s2, payload: i2, signature: n2, raw: { header: a2, payload: o2 } } = rt(r10);
            if (!(null == t10 ? void 0 : t10.allowExpired)) try {
              !function(e11) {
                if (!e11) throw Error("Missing exp claim");
                if (e11 <= Math.floor(Date.now() / 1e3)) throw Error("JWT has expired");
              }(i2.exp);
            } catch (e11) {
              throw new tz(e11 instanceof Error ? e11.message : "JWT validation failed");
            }
            let l2 = !s2.alg || s2.alg.startsWith("HS") || !s2.kid || !("crypto" in globalThis && "subtle" in globalThis.crypto) ? null : await this.fetchJwk(s2.kid, (null == t10 ? void 0 : t10.keys) ? { keys: t10.keys } : null == t10 ? void 0 : t10.jwks);
            if (!l2) {
              let { error: e11 } = await this.getUser(r10);
              if (e11) throw e11;
              return { data: { claims: i2, header: s2, signature: n2 }, error: null };
            }
            let u2 = function(e11) {
              switch (e11) {
                case "RS256":
                  return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } };
                case "ES256":
                  return { name: "ECDSA", namedCurve: "P-256", hash: { name: "SHA-256" } };
                default:
                  throw Error("Invalid alg claim");
              }
            }(s2.alg), c2 = await crypto.subtle.importKey("jwk", l2, u2, true, ["verify"]);
            if (!await crypto.subtle.verify(u2, c2, n2, function(e11) {
              let t11 = [];
              return function(e12, t12) {
                for (let r11 = 0; r11 < e12.length; r11 += 1) {
                  let s3 = e12.charCodeAt(r11);
                  if (s3 > 55295 && s3 <= 56319) {
                    let t13 = (s3 - 55296) * 1024 & 65535;
                    s3 = (e12.charCodeAt(r11 + 1) - 56320 & 65535 | t13) + 65536, r11 += 1;
                  }
                  !function(e13, t13) {
                    if (e13 <= 127) {
                      t13(e13);
                      return;
                    }
                    if (e13 <= 2047) {
                      t13(192 | e13 >> 6), t13(128 | 63 & e13);
                      return;
                    }
                    if (e13 <= 65535) {
                      t13(224 | e13 >> 12), t13(128 | e13 >> 6 & 63), t13(128 | 63 & e13);
                      return;
                    }
                    if (e13 <= 1114111) {
                      t13(240 | e13 >> 18), t13(128 | e13 >> 12 & 63), t13(128 | e13 >> 6 & 63), t13(128 | 63 & e13);
                      return;
                    }
                    throw Error(`Unrecognized Unicode codepoint: ${e13.toString(16)}`);
                  }(s3, t12);
                }
              }(e11, (e12) => t11.push(e12)), new Uint8Array(t11);
            }(`${a2}.${o2}`))) throw new tz("Invalid JWT signature");
            return { data: { claims: i2, header: s2, signature: n2 }, error: null };
          } catch (e11) {
            if (tP(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async signInWithPasskey(e10) {
          var t10, r10, s2;
          rw(this.experimental);
          try {
            if (!rG()) return this._returnResult({ data: null, error: new tj("Browser does not support WebAuthn", null) });
            let { data: i2, error: n2 } = await this._startPasskeyAuthentication({ options: { captchaToken: null === (t10 = null == e10 ? void 0 : e10.options) || void 0 === t10 ? void 0 : t10.captchaToken } });
            if (n2 || !i2) return this._returnResult({ data: null, error: n2 });
            let a2 = rV(i2.options), o2 = null !== (s2 = null === (r10 = null == e10 ? void 0 : e10.options) || void 0 === r10 ? void 0 : r10.signal) && void 0 !== s2 ? s2 : rF.createNewAbortSignal(), { data: l2, error: u2 } = await rX({ publicKey: a2, signal: o2 });
            if (u2 || !l2) return this._returnResult({ data: null, error: null != u2 ? u2 : new tj("WebAuthn ceremony failed", null) });
            let c2 = rz(l2);
            return this._verifyPasskeyAuthentication({ challengeId: i2.challenge_id, credential: c2 });
          } catch (e11) {
            if (tP(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async registerPasskey(e10) {
          var t10, r10;
          rw(this.experimental);
          try {
            if (!rG()) return this._returnResult({ data: null, error: new tj("Browser does not support WebAuthn", null) });
            let { data: s2, error: i2 } = await this._startPasskeyRegistration();
            if (i2 || !s2) return this._returnResult({ data: null, error: i2 });
            let n2 = rH(s2.options), a2 = null !== (r10 = null === (t10 = null == e10 ? void 0 : e10.options) || void 0 === t10 ? void 0 : t10.signal) && void 0 !== r10 ? r10 : rF.createNewAbortSignal(), { data: o2, error: l2 } = await rK({ publicKey: n2, signal: a2 });
            if (l2 || !o2) return this._returnResult({ data: null, error: null != l2 ? l2 : new tj("WebAuthn ceremony failed", null) });
            let u2 = rW(o2);
            return this._verifyPasskeyRegistration({ challengeId: s2.challenge_id, credential: u2 });
          } catch (e11) {
            if (tP(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _startPasskeyRegistration() {
          rw(this.experimental);
          try {
            return await this._useSession(async (e10) => {
              let { data: { session: t10 }, error: r10 } = e10;
              if (r10) return this._returnResult({ data: null, error: r10 });
              if (!t10) return this._returnResult({ data: null, error: new tL() });
              let { data: s2, error: i2 } = await rO(this.fetch, "POST", `${this.url}/passkeys/registration/options`, { headers: this.headers, jwt: t10.access_token, body: {} });
              return i2 ? this._returnResult({ data: null, error: i2 }) : this._returnResult({ data: s2, error: null });
            });
          } catch (e10) {
            if (tP(e10)) return this._returnResult({ data: null, error: e10 });
            throw e10;
          }
        }
        async _verifyPasskeyRegistration(e10) {
          rw(this.experimental);
          try {
            return await this._useSession(async (t10) => {
              let { data: { session: r10 }, error: s2 } = t10;
              if (s2) return this._returnResult({ data: null, error: s2 });
              if (!r10) return this._returnResult({ data: null, error: new tL() });
              let { data: i2, error: n2 } = await rO(this.fetch, "POST", `${this.url}/passkeys/registration/verify`, { headers: this.headers, jwt: r10.access_token, body: { challenge_id: e10.challengeId, credential: e10.credential } });
              return n2 ? this._returnResult({ data: null, error: n2 }) : this._returnResult({ data: i2, error: null });
            });
          } catch (e11) {
            if (tP(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _startPasskeyAuthentication(e10) {
          var t10;
          rw(this.experimental);
          try {
            let { data: r10, error: s2 } = await rO(this.fetch, "POST", `${this.url}/passkeys/authentication/options`, { headers: this.headers, body: { gotrue_meta_security: { captcha_token: null === (t10 = null == e10 ? void 0 : e10.options) || void 0 === t10 ? void 0 : t10.captchaToken } } });
            if (s2) return this._returnResult({ data: null, error: s2 });
            return this._returnResult({ data: r10, error: null });
          } catch (e11) {
            if (tP(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _verifyPasskeyAuthentication(e10) {
          rw(this.experimental);
          try {
            let { data: t10, error: r10 } = await rO(this.fetch, "POST", `${this.url}/passkeys/authentication/verify`, { headers: this.headers, body: { challenge_id: e10.challengeId, credential: e10.credential }, xform: rC });
            if (r10) return this._returnResult({ data: null, error: r10 });
            return t10.session && (await this._saveSession(t10.session), await this._notifyAllSubscribers("SIGNED_IN", t10.session)), this._returnResult({ data: t10, error: null });
          } catch (e11) {
            if (tP(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _listPasskeys() {
          rw(this.experimental);
          try {
            return await this._useSession(async (e10) => {
              let { data: { session: t10 }, error: r10 } = e10;
              if (r10) return this._returnResult({ data: null, error: r10 });
              if (!t10) return this._returnResult({ data: null, error: new tL() });
              let { data: s2, error: i2 } = await rO(this.fetch, "GET", `${this.url}/passkeys`, { headers: this.headers, jwt: t10.access_token, xform: (e11) => ({ data: e11, error: null }) });
              return i2 ? this._returnResult({ data: null, error: i2 }) : this._returnResult({ data: s2, error: null });
            });
          } catch (e10) {
            if (tP(e10)) return this._returnResult({ data: null, error: e10 });
            throw e10;
          }
        }
        async _updatePasskey(e10) {
          rw(this.experimental);
          try {
            return await this._useSession(async (t10) => {
              let { data: { session: r10 }, error: s2 } = t10;
              if (s2) return this._returnResult({ data: null, error: s2 });
              if (!r10) return this._returnResult({ data: null, error: new tL() });
              let { data: i2, error: n2 } = await rO(this.fetch, "PATCH", `${this.url}/passkeys/${e10.passkeyId}`, { headers: this.headers, jwt: r10.access_token, body: { friendly_name: e10.friendlyName } });
              return n2 ? this._returnResult({ data: null, error: n2 }) : this._returnResult({ data: i2, error: null });
            });
          } catch (e11) {
            if (tP(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _deletePasskey(e10) {
          rw(this.experimental);
          try {
            return await this._useSession(async (t10) => {
              let { data: { session: r10 }, error: s2 } = t10;
              if (s2) return this._returnResult({ data: null, error: s2 });
              if (!r10) return this._returnResult({ data: null, error: new tL() });
              let { error: i2 } = await rO(this.fetch, "DELETE", `${this.url}/passkeys/${e10.passkeyId}`, { headers: this.headers, jwt: r10.access_token, noResolveJson: true });
              return i2 ? this._returnResult({ data: null, error: i2 }) : this._returnResult({ data: null, error: null });
            });
          } catch (e11) {
            if (tP(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
      }
      r3.nextInstanceID = {};
      let r4 = r3, r6 = "";
      if ("undefined" != typeof Deno) r6 = "deno", n = null === (C = Deno.version) || void 0 === C ? void 0 : C.deno;
      else if ("undefined" != typeof document) r6 = "web";
      else if ("undefined" != typeof navigator && "ReactNative" === navigator.product) r6 = "react-native";
      else {
        r6 = "node";
        let e10 = globalThis.process;
        n = null == e10 || null === (A = e10.version) || void 0 === A ? void 0 : A.replace(/^v/, "");
      }
      let r5 = [`runtime=${r6}`];
      n && r5.push(`runtime-version=${n}`);
      let r8 = { headers: { "X-Client-Info": `supabase-js/2.112.3; ${r5.join("; ")}` } }, r9 = { schema: "public" }, r7 = { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true, flowType: "implicit" }, se = {}, st = { enabled: false, respectSamplingDecision: true };
      function sr(e10) {
        return (sr = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e11) {
          return typeof e11;
        } : function(e11) {
          return e11 && "function" == typeof Symbol && e11.constructor === Symbol && e11 !== Symbol.prototype ? "symbol" : typeof e11;
        })(e10);
      }
      function ss(e10, t10) {
        var r10 = Object.keys(e10);
        if (Object.getOwnPropertySymbols) {
          var s2 = Object.getOwnPropertySymbols(e10);
          t10 && (s2 = s2.filter(function(t11) {
            return Object.getOwnPropertyDescriptor(e10, t11).enumerable;
          })), r10.push.apply(r10, s2);
        }
        return r10;
      }
      function si(e10) {
        for (var t10 = 1; t10 < arguments.length; t10++) {
          var r10 = null != arguments[t10] ? arguments[t10] : {};
          t10 % 2 ? ss(Object(r10), true).forEach(function(t11) {
            !function(e11, t12, r11) {
              var s2;
              (s2 = function(e12, t13) {
                if ("object" != sr(e12) || !e12) return e12;
                var r12 = e12[Symbol.toPrimitive];
                if (void 0 !== r12) {
                  var s3 = r12.call(e12, t13 || "default");
                  if ("object" != sr(s3)) return s3;
                  throw TypeError("@@toPrimitive must return a primitive value.");
                }
                return ("string" === t13 ? String : Number)(e12);
              }(t12, "string"), (t12 = "symbol" == sr(s2) ? s2 : s2 + "") in e11) ? Object.defineProperty(e11, t12, { value: r11, enumerable: true, configurable: true, writable: true }) : e11[t12] = r11;
            }(e10, t11, r10[t11]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e10, Object.getOwnPropertyDescriptors(r10)) : ss(Object(r10)).forEach(function(t11) {
            Object.defineProperty(e10, t11, Object.getOwnPropertyDescriptor(r10, t11));
          });
        }
        return e10;
      }
      let sn = (e10) => e10 ? (...t10) => e10(...t10) : (...e11) => fetch(...e11), sa = () => Headers, so = (e10) => e10.startsWith("sb_publishable_") || e10.startsWith("sb_secret_"), sl = /* @__PURE__ */ new Set(), su = (e10) => {
        var t10, r10;
        if (!e10.startsWith("sb_") || so(e10) || e10.startsWith("sb_temp_")) return;
        let s2 = null !== (t10 = null === (r10 = e10.match(/^sb_[a-zA-Z0-9]+_/)) || void 0 === r10 ? void 0 : r10[0]) && void 0 !== t10 ? t10 : "unknown";
        sl.has(s2) || (sl.add(s2), console.warn("@supabase/supabase-js: Unrecognized Supabase API key format. The client will proceed and send this key as-is; if you see authentication errors you may need to upgrade @supabase/supabase-js to a version that recognizes this key type."));
      }, sc = (e10, t10, r10, s2, i2, n2) => {
        let a2 = sn(s2), o2 = sa(), l2 = (null == i2 ? void 0 : i2.enabled) === true, u2 = (null == i2 ? void 0 : i2.respectSamplingDecision) !== false, c2 = l2 ? function(e11) {
          let t11 = [];
          try {
            let r11 = new URL(e11);
            t11.push(r11.hostname);
          } catch (e12) {
          }
          return t11.push("*.supabase.co", "*.supabase.in"), t11.push("localhost", "127.0.0.1", "[::1]"), t11;
        }(t10) : null, d2 = !((null == n2 ? void 0 : n2.omitApiKeyAsBearer) && so(e10));
        return async (t11, s3) => {
          let i3 = await r10(), n3 = new o2(null == s3 ? void 0 : s3.headers);
          if (n3.has("apikey") || n3.set("apikey", e10), !n3.has("Authorization")) {
            let t12 = null != i3 ? i3 : d2 ? e10 : null;
            t12 && n3.set("Authorization", `Bearer ${t12}`);
          }
          if (c2) {
            let e11 = function(e12, t12, r11) {
              let s4 = globalThis[h];
              if (!s4) return sh || (sh = true, console.warn("@supabase/supabase-js: tracePropagation is enabled but the tracing runtime is not loaded, so trace headers will not be attached. Add `import '@supabase/supabase-js/tracing'` at your application entry point (requires the OpenTelemetry API package to be installed). The CDN/UMD build does not support trace propagation.")), null;
              if (!function(e13, t13) {
                let r12;
                if (!e13 || !t13 || 0 === t13.length) return false;
                if (e13 instanceof URL) r12 = e13;
                else try {
                  r12 = new URL(e13);
                } catch (e14) {
                  return false;
                }
                for (let e14 of t13) try {
                  if ("string" == typeof e14) {
                    if (function(e15, t14) {
                      if (t14 === e15) return true;
                      if (t14.startsWith("*.")) {
                        let r13 = t14.slice(2);
                        if (e15.endsWith(r13) && (e15 === r13 || e15.endsWith("." + r13))) return true;
                      }
                      return false;
                    }(r12.hostname, e14)) return true;
                  } else if (e14 instanceof RegExp) {
                    if (e14.test(r12.hostname)) return true;
                  } else if ("function" == typeof e14 && e14(r12)) return true;
                } catch (e15) {
                  continue;
                }
                return false;
              }("string" == typeof e12 ? e12 : e12 instanceof URL ? e12 : e12.url, t12)) return null;
              let i4 = s4();
              if (!i4 || !i4.traceparent) {
                var n4;
                if ((null == i4 || null === (n4 = i4.carrierKeys) || void 0 === n4 ? void 0 : n4.length) && !sd) {
                  sd = true;
                  let e13 = i4.carrierKeys.includes("sentry-trace") ? " Sentry detected: set `propagateTraceparent: true` in Sentry.init() to emit it." : " Configure your tracing SDK to emit W3C trace context on outgoing requests.";
                  console.warn(`@supabase/supabase-js: tracePropagation is enabled and a tracing SDK is active, but its propagator wrote [${i4.carrierKeys.join(", ")}] and no W3C traceparent header, so trace headers will not be attached.` + e13);
                }
                return null;
              }
              if (r11) {
                let e13 = function(e14) {
                  if (!e14 || "string" != typeof e14) return null;
                  let t13 = e14.split("-");
                  if (4 !== t13.length) return null;
                  let [r12, s5, i5, n5] = t13;
                  if (2 !== r12.length || 32 !== s5.length || 16 !== i5.length || 2 !== n5.length) return null;
                  let a3 = /^[0-9a-f]+$/i;
                  return a3.test(r12) && a3.test(s5) && a3.test(i5) && a3.test(n5) && "00000000000000000000000000000000" !== s5 && "0000000000000000" !== i5 ? { version: r12, traceId: s5, parentId: i5, traceFlags: n5, isSampled: (1 & parseInt(n5, 16)) == 1 } : null;
                }(i4.traceparent);
                if (e13 && !e13.isSampled) return { traceparent: i4.traceparent };
              }
              return i4;
            }(t11, c2, u2);
            e11 && (e11.traceparent && !n3.has("traceparent") && n3.set("traceparent", e11.traceparent), e11.tracestate && !n3.has("tracestate") && n3.set("tracestate", e11.tracestate), e11.baggage && !n3.has("baggage") && n3.set("baggage", e11.baggage));
          }
          return a2(t11, si(si({}, s3), {}, { headers: n3 }));
        };
      }, sh = false, sd = false;
      function sp(e10) {
        return "boolean" == typeof e10 ? { enabled: e10 } : e10;
      }
      var sf = class extends r4 {
        constructor(e10) {
          super(e10);
        }
      }, sg = class {
        constructor(e10, t10, r10) {
          var s2, i2, n2;
          this.supabaseUrl = e10, this.supabaseKey = t10;
          let a2 = function(e11) {
            let t11 = null == e11 ? void 0 : e11.trim();
            if (!t11) throw Error("supabaseUrl is required.");
            if (!t11.match(/^https?:\/\//i)) throw Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");
            try {
              return new URL(t11.endsWith("/") ? t11 : t11 + "/");
            } catch (e12) {
              throw Error("Invalid supabaseUrl: Provided URL is malformed.");
            }
          }(e10);
          if (!t10) throw Error("supabaseKey is required.");
          su(t10), this.realtimeUrl = new URL("realtime/v1", a2), this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace("http", "ws"), this.authUrl = new URL("auth/v1", a2), this.storageUrl = new URL("storage/v1", a2), this.functionsUrl = new URL("functions/v1", a2);
          let o2 = `sb-${a2.hostname.split(".")[0]}-auth-token`, l2 = function(e11, t11) {
            var r11, s3, i3, n3, a3, o3;
            let { db: l3, auth: u2, realtime: c2, global: h2 } = e11, { db: d2, auth: p2, realtime: f2, global: g2 } = t11, m2 = sp(e11.tracePropagation), b2 = sp(t11.tracePropagation), y2 = { db: si(si({}, d2), l3), auth: si(si({}, p2), u2), realtime: si(si({}, f2), c2), storage: {}, global: si(si(si({}, g2), h2), {}, { headers: si(si({}, null !== (r11 = null == g2 ? void 0 : g2.headers) && void 0 !== r11 ? r11 : {}), null !== (s3 = null == h2 ? void 0 : h2.headers) && void 0 !== s3 ? s3 : {}) }), tracePropagation: { enabled: null !== (i3 = null !== (n3 = null == m2 ? void 0 : m2.enabled) && void 0 !== n3 ? n3 : null == b2 ? void 0 : b2.enabled) && void 0 !== i3 && i3, respectSamplingDecision: null === (a3 = null !== (o3 = null == m2 ? void 0 : m2.respectSamplingDecision) && void 0 !== o3 ? o3 : null == b2 ? void 0 : b2.respectSamplingDecision) || void 0 === a3 || a3 }, accessToken: async () => "" };
            return e11.accessToken ? y2.accessToken = e11.accessToken : delete y2.accessToken, y2;
          }(null != r10 ? r10 : {}, { db: r9, realtime: se, auth: si(si({}, r7), {}, { storageKey: o2 }), global: r8, tracePropagation: st });
          this.settings = l2, this.storageKey = null !== (s2 = l2.auth.storageKey) && void 0 !== s2 ? s2 : "", this.headers = null !== (i2 = l2.global.headers) && void 0 !== i2 ? i2 : {}, l2.accessToken ? (this.accessToken = l2.accessToken, this.auth = new Proxy({}, { get: (e11, t11) => {
            throw Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(t11)} is not possible`);
          } })) : this.auth = this._initSupabaseAuthClient(null !== (n2 = l2.auth) && void 0 !== n2 ? n2 : {}, this.headers, l2.global.fetch), this.fetch = sc(t10, e10, this._getSessionToken.bind(this), l2.global.fetch, l2.tracePropagation), this.functionsFetch = sc(t10, e10, this._getSessionToken.bind(this), l2.global.fetch, l2.tracePropagation, { omitApiKeyAsBearer: true }), this.realtime = this._initRealtimeClient(si({ headers: this.headers, accessToken: this._getAccessToken.bind(this), fetch: this.fetch }, l2.realtime)), this.accessToken && Promise.resolve(this.accessToken()).then((e11) => this.realtime.setAuth(e11)).catch((e11) => console.warn("Failed to set initial Realtime auth token:", e11)), this.rest = new B(new URL("rest/v1", a2).href, { headers: this.headers, schema: l2.db.schema, fetch: this.fetch, timeout: l2.db.timeout, urlLengthLimit: l2.db.urlLengthLimit, retry: l2.db.retry }), this.storage = new tS(this.storageUrl.href, this.headers, this.fetch, null == r10 ? void 0 : r10.storage), l2.accessToken || this._listenForAuthEvents();
        }
        get functions() {
          return new y(this.functionsUrl.href, { headers: this.headers, customFetch: this.functionsFetch });
        }
        from(e10) {
          return this.rest.from(e10);
        }
        schema(e10) {
          return this.rest.schema(e10);
        }
        rpc(e10, t10 = {}, r10 = { head: false, get: false, count: void 0 }) {
          return this.rest.rpc(e10, t10, r10);
        }
        channel(e10, t10 = { config: {} }) {
          return this.realtime.channel(e10, t10);
        }
        getChannels() {
          return this.realtime.getChannels();
        }
        removeChannel(e10) {
          return this.realtime.removeChannel(e10);
        }
        removeAllChannels() {
          return this.realtime.removeAllChannels();
        }
        async _getSessionToken() {
          var e10, t10;
          if (this.accessToken) return await this.accessToken();
          let { data: r10 } = await this.auth.getSession();
          return null !== (e10 = null === (t10 = r10.session) || void 0 === t10 ? void 0 : t10.access_token) && void 0 !== e10 ? e10 : null;
        }
        async _getAccessToken() {
          var e10;
          return null !== (e10 = await this._getSessionToken()) && void 0 !== e10 ? e10 : this.supabaseKey;
        }
        _initSupabaseAuthClient({ autoRefreshToken: e10, persistSession: t10, detectSessionInUrl: r10, storage: s2, userStorage: i2, storageKey: n2, flowType: a2, lock: o2, debug: l2, throwOnError: u2, experimental: c2, lockAcquireTimeout: h2, skipAutoInitialize: d2 }, p2, f2) {
          let g2 = { Authorization: `Bearer ${this.supabaseKey}`, apikey: `${this.supabaseKey}` };
          return new sf({ url: this.authUrl.href, headers: si(si({}, g2), p2), storageKey: n2, autoRefreshToken: e10, persistSession: t10, detectSessionInUrl: r10, storage: s2, userStorage: i2, flowType: a2, lock: o2, debug: l2, throwOnError: u2, experimental: c2, fetch: f2, lockAcquireTimeout: h2, skipAutoInitialize: d2, hasCustomAuthorizationHeader: Object.keys(this.headers).some((e11) => "authorization" === e11.toLowerCase()) });
        }
        _initRealtimeClient(e10) {
          return new eD(this.realtimeUrl.href, si(si({}, e10), {}, { params: si(si({}, { apikey: this.supabaseKey }), null == e10 ? void 0 : e10.params) }));
        }
        _listenForAuthEvents() {
          return this.auth.onAuthStateChange((e10, t10) => {
            this._handleTokenChanged(e10, "CLIENT", null == t10 ? void 0 : t10.access_token);
          });
        }
        _handleTokenChanged(e10, t10, r10) {
          ("TOKEN_REFRESHED" === e10 || "SIGNED_IN" === e10 || "INITIAL_SESSION" === e10) && this.changedAccessToken !== r10 ? (this.changedAccessToken = r10, this.realtime.setAuth(r10)) : "SIGNED_OUT" === e10 && (this.realtime.setAuth(), "STORAGE" == t10 && this.auth.signOut(), this.changedAccessToken = void 0);
        }
      };
      let sm = (e10, t10, r10) => new sg(e10, t10, r10);
      (function() {
        if ("undefined" != typeof window || void 0 !== globalThis.Deno) return false;
        let e10 = globalThis.process;
        if (!e10) return false;
        let t10 = e10.version;
        if (null == t10) return false;
        let r10 = t10.match(/^v(\d+)\./);
        return !!r10 && 20 >= parseInt(r10[1], 10);
      })() && console.warn("\u26A0\uFE0F  Node.js 20 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 22 or later. For more information, visit: https://github.com/orgs/supabase/discussions/45715");
      var sb = Object.create, sy = Object.defineProperty, sw = Object.getOwnPropertyDescriptor, sv = Object.getOwnPropertyNames, s_ = Object.getPrototypeOf, sS = Object.prototype.hasOwnProperty, sk = (e10, t10, r10, s2) => {
        if (t10 && "object" == typeof t10 || "function" == typeof t10) for (let i2 of sv(t10)) sS.call(e10, i2) || i2 === r10 || sy(e10, i2, { get: () => t10[i2], enumerable: !(s2 = sw(t10, i2)) || s2.enumerable });
        return e10;
      }, sT = (e10, t10, r10) => (r10 = null != e10 ? sb(s_(e10)) : {}, sk(!t10 && e10 && e10.__esModule ? r10 : sy(r10, "default", { value: e10, enumerable: true }), e10)), sE = (a = { "../../node_modules/.pnpm/cookie@0.5.0/node_modules/cookie/index.js"(e10) {
        e10.parse = function(e11, t11) {
          if ("string" != typeof e11) throw TypeError("argument str must be a string");
          for (var r11 = {}, i3 = (t11 || {}).decode || s2, n2 = 0; n2 < e11.length; ) {
            var a2 = e11.indexOf("=", n2);
            if (-1 === a2) break;
            var o2 = e11.indexOf(";", n2);
            if (-1 === o2) o2 = e11.length;
            else if (o2 < a2) {
              n2 = e11.lastIndexOf(";", a2 - 1) + 1;
              continue;
            }
            var l2 = e11.slice(n2, a2).trim();
            if (void 0 === r11[l2]) {
              var u2 = e11.slice(a2 + 1, o2).trim();
              34 === u2.charCodeAt(0) && (u2 = u2.slice(1, -1)), r11[l2] = function(e12, t12) {
                try {
                  return t12(e12);
                } catch (t13) {
                  return e12;
                }
              }(u2, i3);
            }
            n2 = o2 + 1;
          }
          return r11;
        }, e10.serialize = function(e11, s3, n2) {
          var a2 = n2 || {}, o2 = a2.encode || i2;
          if ("function" != typeof o2) throw TypeError("option encode is invalid");
          if (!r10.test(e11)) throw TypeError("argument name is invalid");
          var l2 = o2(s3);
          if (l2 && !r10.test(l2)) throw TypeError("argument val is invalid");
          var u2 = e11 + "=" + l2;
          if (null != a2.maxAge) {
            var c2 = a2.maxAge - 0;
            if (isNaN(c2) || !isFinite(c2)) throw TypeError("option maxAge is invalid");
            u2 += "; Max-Age=" + Math.floor(c2);
          }
          if (a2.domain) {
            if (!r10.test(a2.domain)) throw TypeError("option domain is invalid");
            u2 += "; Domain=" + a2.domain;
          }
          if (a2.path) {
            if (!r10.test(a2.path)) throw TypeError("option path is invalid");
            u2 += "; Path=" + a2.path;
          }
          if (a2.expires) {
            var h2 = a2.expires;
            if ("[object Date]" !== t10.call(h2) && !(h2 instanceof Date) || isNaN(h2.valueOf())) throw TypeError("option expires is invalid");
            u2 += "; Expires=" + h2.toUTCString();
          }
          if (a2.httpOnly && (u2 += "; HttpOnly"), a2.secure && (u2 += "; Secure"), a2.priority) switch ("string" == typeof a2.priority ? a2.priority.toLowerCase() : a2.priority) {
            case "low":
              u2 += "; Priority=Low";
              break;
            case "medium":
              u2 += "; Priority=Medium";
              break;
            case "high":
              u2 += "; Priority=High";
              break;
            default:
              throw TypeError("option priority is invalid");
          }
          if (a2.sameSite) switch ("string" == typeof a2.sameSite ? a2.sameSite.toLowerCase() : a2.sameSite) {
            case true:
            case "strict":
              u2 += "; SameSite=Strict";
              break;
            case "lax":
              u2 += "; SameSite=Lax";
              break;
            case "none":
              u2 += "; SameSite=None";
              break;
            default:
              throw TypeError("option sameSite is invalid");
          }
          return u2;
        };
        var t10 = Object.prototype.toString, r10 = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        function s2(e11) {
          return -1 !== e11.indexOf("%") ? decodeURIComponent(e11) : e11;
        }
        function i2(e11) {
          return encodeURIComponent(e11);
        }
      } }, function() {
        return o || (0, a[sv(a)[0]])((o = { exports: {} }).exports, o), o.exports;
      }), sO = sT(sE()), sR = sT(sE());
      function sC(e10) {
        if (!e10) return null;
        try {
          let t10 = JSON.parse(e10);
          if (!t10) return null;
          if ("Object" === t10.constructor.name) return t10;
          if ("Array" !== t10.constructor.name) throw Error(`Unexpected format: ${t10.constructor.name}`);
          let [r10, s2, i2] = t10[0].split("."), n2 = c(s2), a2 = new TextDecoder(), { exp: o2, sub: l2, ...u2 } = JSON.parse(a2.decode(n2));
          return { expires_at: o2, expires_in: o2 - Math.round(Date.now() / 1e3), token_type: "bearer", access_token: t10[0], refresh_token: t10[1], provider_token: t10[2], provider_refresh_token: t10[3], user: { id: l2, factors: t10[4], ...u2 } };
        } catch (e11) {
          return console.warn("Failed to parse cookie string:", e11), null;
        }
      }
      function sA(e10) {
        var t10;
        return JSON.stringify([e10.access_token, e10.refresh_token, e10.provider_token, e10.provider_refresh_token, (null == (t10 = e10.user) ? void 0 : t10.factors) ?? null]);
      }
      function sP() {
        return "undefined" != typeof window && void 0 !== window.document;
      }
      var sx = { path: "/", sameSite: "lax", maxAge: 31536e6 }, sI = RegExp(".{1,3180}", "g"), sj = class {
        constructor(e10) {
          this.cookieOptions = { ...sx, ...e10, maxAge: sx.maxAge };
        }
        getItem(e10) {
          let t10 = this.getCookie(e10);
          if (e10.endsWith("-code-verifier") && t10) return t10;
          if (t10) return JSON.stringify(sC(t10));
          let r10 = function(e11, t11 = () => null) {
            let r11 = [];
            for (let s2 = 0; ; s2++) {
              let i2 = t11(`${e11}.${s2}`);
              if (!i2) break;
              r11.push(i2);
            }
            return r11.length ? r11.join("") : null;
          }(e10, (e11) => this.getCookie(e11));
          return null !== r10 ? JSON.stringify(sC(r10)) : null;
        }
        setItem(e10, t10) {
          if (e10.endsWith("-code-verifier")) {
            this.setCookie(e10, t10);
            return;
          }
          (function(e11, t11, r10) {
            if (1 === Math.ceil(t11.length / 3180)) return [{ name: e11, value: t11 }];
            let s2 = [], i2 = t11.match(sI);
            return null == i2 || i2.forEach((t12, r11) => {
              let i3 = `${e11}.${r11}`;
              s2.push({ name: i3, value: t12 });
            }), s2;
          })(e10, sA(JSON.parse(t10))).forEach((e11) => {
            this.setCookie(e11.name, e11.value);
          });
        }
        removeItem(e10) {
          this._deleteSingleCookie(e10), this._deleteChunkedCookies(e10);
        }
        _deleteSingleCookie(e10) {
          this.getCookie(e10) && this.deleteCookie(e10);
        }
        _deleteChunkedCookies(e10, t10 = 0) {
          for (let r10 = t10; ; r10++) {
            let t11 = `${e10}.${r10}`;
            if (void 0 === this.getCookie(t11)) break;
            this.deleteCookie(t11);
          }
        }
      }, sN = class extends sj {
        constructor(e10) {
          super(e10);
        }
        getCookie(e10) {
          return sP() ? (0, sO.parse)(document.cookie)[e10] : null;
        }
        setCookie(e10, t10) {
          if (!sP()) return null;
          document.cookie = (0, sO.serialize)(e10, t10, { ...this.cookieOptions, httpOnly: false });
        }
        deleteCookie(e10) {
          if (!sP()) return null;
          document.cookie = (0, sO.serialize)(e10, "", { ...this.cookieOptions, maxAge: 0, httpOnly: false });
        }
      };
      function sL(e10, t10, r10) {
        var s2;
        let i2 = sP();
        return sm(e10, t10, { ...r10, auth: { flowType: "pkce", autoRefreshToken: i2, detectSessionInUrl: i2, persistSession: true, storage: r10.auth.storage, ...(null == (s2 = r10.auth) ? void 0 : s2.storageKey) ? { storageKey: r10.auth.storageKey } : {} } });
      }
      var s$ = sR.parse, sU = sR.serialize;
    } }, (e) => {
      var t = e(e.s = 728);
      (_ENTRIES = "undefined" == typeof _ENTRIES ? {} : _ENTRIES)["middleware_src/middleware"] = t;
    }]);
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(path3);
  } catch {
  }
  const correspondingRoute = routes.find((route) => route.regex.some((r) => {
    const regex = new RegExp(r);
    return regex.test(path3) || decodedPath !== void 0 && regex.test(decodedPath);
  }));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "src/middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/static|_next\\/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*))(.json)?[\\/#\\?]?$"] }];
    require_edge_runtime_webpack();
    require_middleware();
  }
});

// node_modules/@opennextjs/aws/dist/utils/cacheHeaders.js
var CACHE_CONTROL_HEADER = "cache-control";
var OPEN_NEXT_CACHE_HEADER = "x-opennext-cache";
var CACHE_TAGS_HEADER = "x-next-cache-tags";
var ISR_HEADER = "x-isr";
var PRERENDER_REVALIDATE_HEADER = "x-prerender-revalidate";
var NO_STORE_CACHE_CONTROL = "private, no-cache, no-store, max-age=0, must-revalidate";
function fixCacheControlForError(headers, statusCode) {
  if (process.env.OPEN_NEXT_DANGEROUSLY_SET_ERROR_HEADERS === "true") {
    return;
  }
  if (statusCode === 404 || statusCode === 500) {
    headers[CACHE_CONTROL_HEADER] = NO_STORE_CACHE_CONTROL;
  }
}

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();

// node_modules/@opennextjs/aws/dist/utils/requestCache.js
var RequestCache = class {
  _caches = /* @__PURE__ */ new Map();
  /**
   * Returns the Map registered under `key`.
   * If no Map exists yet for that key, a new empty Map is created, stored, and returned.
   * Repeated calls with the same key always return the **same** Map instance.
   */
  getOrCreate(key) {
    let cache = this._caches.get(key);
    if (!cache) {
      cache = /* @__PURE__ */ new Map();
      this._caches.set(key, cache);
    }
    return cache;
  }
};

// node_modules/@opennextjs/aws/dist/utils/promise.js
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set(),
    requestCache: new RequestCache()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "eslint": { "ignoreDuringBuilds": false }, "typescript": { "ignoreBuildErrors": false, "tsconfigPath": "tsconfig.json" }, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.js", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "analyticsId": "", "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [16, 32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 60, "formats": ["image/webp"], "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "inline", "remotePatterns": [], "unoptimized": true }, "devIndicators": { "buildActivity": true, "buildActivityPosition": "bottom-right" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "amp": { "canonicalBase": "" }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "optimizeFonts": true, "excludeDefaultMomentLocales": true, "serverRuntimeConfig": {}, "publicRuntimeConfig": {}, "reactProductionProfiling": false, "reactStrictMode": true, "httpAgentOptions": { "keepAlive": true }, "outputFileTracing": true, "staticPageGenerationTimeout": 60, "swcMinify": true, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "experimental": { "multiZoneDraftMode": false, "prerenderEarlyExit": false, "serverMinification": true, "serverSourceMaps": false, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "middlewarePrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 1, "memoryBasedWorkersCount": false, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "outputFileTracingRoot": "/home/user/Doubao/chats/38444079574579458/Prompt-Studio", "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "adjustFontFallbacks": false, "adjustFontFallbacksWithSizeAdjust": false, "typedRoutes": false, "instrumentationHook": false, "bundlePagesExternals": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "missingSuspenseWithCSRBailout": true, "optimizeServerReact": true, "useEarlyImport": false, "staleTimes": { "dynamic": 30, "static": 300 }, "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "configFileName": "next.config.js" };
var BuildId = "_io9JwMBVMjhNQr9bJiw1";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/admin", "regex": "^/admin(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin(?:/)?$" }, { "page": "/admin/invite-codes", "regex": "^/admin/invite\\-codes(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/invite\\-codes(?:/)?$" }, { "page": "/admin/models", "regex": "^/admin/models(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/models(?:/)?$" }, { "page": "/admin/orders", "regex": "^/admin/orders(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/orders(?:/)?$" }, { "page": "/admin/settings", "regex": "^/admin/settings(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/settings(?:/)?$" }, { "page": "/admin/tasks", "regex": "^/admin/tasks(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/tasks(?:/)?$" }, { "page": "/admin/users", "regex": "^/admin/users(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/users(?:/)?$" }, { "page": "/chat", "regex": "^/chat(?:/)?$", "routeKeys": {}, "namedRegex": "^/chat(?:/)?$" }, { "page": "/dashboard", "regex": "^/dashboard(?:/)?$", "routeKeys": {}, "namedRegex": "^/dashboard(?:/)?$" }, { "page": "/forgot-password", "regex": "^/forgot\\-password(?:/)?$", "routeKeys": {}, "namedRegex": "^/forgot\\-password(?:/)?$" }, { "page": "/gallery", "regex": "^/gallery(?:/)?$", "routeKeys": {}, "namedRegex": "^/gallery(?:/)?$" }, { "page": "/image", "regex": "^/image(?:/)?$", "routeKeys": {}, "namedRegex": "^/image(?:/)?$" }, { "page": "/invite", "regex": "^/invite(?:/)?$", "routeKeys": {}, "namedRegex": "^/invite(?:/)?$" }, { "page": "/login", "regex": "^/login(?:/)?$", "routeKeys": {}, "namedRegex": "^/login(?:/)?$" }, { "page": "/orders", "regex": "^/orders(?:/)?$", "routeKeys": {}, "namedRegex": "^/orders(?:/)?$" }, { "page": "/pricing", "regex": "^/pricing(?:/)?$", "routeKeys": {}, "namedRegex": "^/pricing(?:/)?$" }, { "page": "/profile", "regex": "^/profile(?:/)?$", "routeKeys": {}, "namedRegex": "^/profile(?:/)?$" }, { "page": "/quota", "regex": "^/quota(?:/)?$", "routeKeys": {}, "namedRegex": "^/quota(?:/)?$" }, { "page": "/register", "regex": "^/register(?:/)?$", "routeKeys": {}, "namedRegex": "^/register(?:/)?$" }, { "page": "/reset-password", "regex": "^/reset\\-password(?:/)?$", "routeKeys": {}, "namedRegex": "^/reset\\-password(?:/)?$" }, { "page": "/video", "regex": "^/video(?:/)?$", "routeKeys": {}, "namedRegex": "^/video(?:/)?$" }], "dynamic": [], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/api/admin/stats": { "initialHeaders": { "content-type": "application/json", "x-next-cache-tags": "_N_T_/layout,_N_T_/api/layout,_N_T_/api/admin/layout,_N_T_/api/admin/stats/layout,_N_T_/api/admin/stats/route,_N_T_/api/admin/stats" }, "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/api/admin/stats", "dataRoute": null }, "/admin/models": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/models", "dataRoute": "/admin/models.rsc" }, "/admin/invite-codes": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/invite-codes", "dataRoute": "/admin/invite-codes.rsc" }, "/admin/settings": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/settings", "dataRoute": "/admin/settings.rsc" }, "/admin/orders": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/orders", "dataRoute": "/admin/orders.rsc" }, "/admin/tasks": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/tasks", "dataRoute": "/admin/tasks.rsc" }, "/admin/users": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/users", "dataRoute": "/admin/users.rsc" }, "/dashboard": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/dashboard", "dataRoute": "/dashboard.rsc" }, "/chat": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/chat", "dataRoute": "/chat.rsc" }, "/admin": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin", "dataRoute": "/admin.rsc" }, "/forgot-password": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/forgot-password", "dataRoute": "/forgot-password.rsc" }, "/image": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/image", "dataRoute": "/image.rsc" }, "/gallery": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/gallery", "dataRoute": "/gallery.rsc" }, "/login": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/login", "dataRoute": "/login.rsc" }, "/invite": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/invite", "dataRoute": "/invite.rsc" }, "/orders": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/orders", "dataRoute": "/orders.rsc" }, "/pricing": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/pricing", "dataRoute": "/pricing.rsc" }, "/": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/", "dataRoute": "/index.rsc" }, "/profile": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/profile", "dataRoute": "/profile.rsc" }, "/quota": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/quota", "dataRoute": "/quota.rsc" }, "/register": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/register", "dataRoute": "/register.rsc" }, "/reset-password": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/reset-password", "dataRoute": "/reset-password.rsc" }, "/video": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/video", "dataRoute": "/video.rsc" } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "daf16bf90542ad8c62fc784de754dbd1", "previewModeSigningKey": "a4ca6dc205ddd5aaca02c4b3ce62c3632fa3f3d62c113b6549c5974ef339af0b", "previewModeEncryptionKey": "c69f368abc1c86b7be1472fd3bcaf957cab6456ddf0e34c289e4928862a08117" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge-runtime-webpack.js", "server/src/middleware.js"], "name": "src/middleware", "page": "/", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/static|_next\\/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*))(.json)?[\\/#\\?]?$", "originalSource": "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "_io9JwMBVMjhNQr9bJiw1", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "Xrr0M/g5AFHyrBDeKvjXRmu9tQj2L9xerM3GuzuNEQA=", "__NEXT_PREVIEW_MODE_ID": "daf16bf90542ad8c62fc784de754dbd1", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "c69f368abc1c86b7be1472fd3bcaf957cab6456ddf0e34c289e4928862a08117", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a4ca6dc205ddd5aaca02c4b3ce62c3632fa3f3d62c113b6549c5974ef339af0b" } } }, "functions": {}, "sortedMiddleware": ["/"] };
var AppPathRoutesManifest = { "/_not-found/page": "/_not-found", "/api/admin/models/route": "/api/admin/models", "/api/admin/stats/route": "/api/admin/stats", "/api/admin/invite-codes/route": "/api/admin/invite-codes", "/api/admin/orders/route": "/api/admin/orders", "/api/admin/settings/route": "/api/admin/settings", "/api/admin/users/route": "/api/admin/users", "/api/admin/tasks/route": "/api/admin/tasks", "/api/payment/create/route": "/api/payment/create", "/api/payment/query/route": "/api/payment/query", "/chat/page": "/chat", "/invite/page": "/invite", "/gallery/page": "/gallery", "/forgot-password/page": "/forgot-password", "/dashboard/page": "/dashboard", "/login/page": "/login", "/image/page": "/image", "/orders/page": "/orders", "/page": "/", "/profile/page": "/profile", "/api/payment/notify/route": "/api/payment/notify", "/pricing/page": "/pricing", "/quota/page": "/quota", "/register/page": "/register", "/video/page": "/video", "/api/chat/route": "/api/chat", "/api/image/route": "/api/image", "/api/video/route": "/api/video", "/reset-password/page": "/reset-password", "/admin/orders/page": "/admin/orders", "/admin/models/page": "/admin/models", "/admin/settings/page": "/admin/settings", "/admin/tasks/page": "/admin/tasks", "/admin/invite-codes/page": "/admin/invite-codes", "/admin/page": "/admin", "/admin/users/page": "/admin/users" };
var FunctionsConfigManifest = { "version": 1, "functions": {} };
var PagesManifest = { "/_app": "pages/_app.js", "/_error": "pages/_error.js", "/_document": "pages/_document.js", "/404": "pages/404.html" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.OPEN_NEXT_BUILD_ID = NextConfig.deploymentId ?? BuildId;
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
import { Transform } from "node:stream";
init_util();

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream3 } from "node:stream/web";

// node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    const nextUrl = constructNextUrl(internalEvent.url, `/${detectedLocale}${NextConfig.trailingSlash ? "/" : ""}`);
    const queryString = convertToQueryString(internalEvent.query);
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: `${nextUrl}${queryString}`
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (!pattern.test(url))
    return false;
  if (host) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host !== host;
    } catch {
      return !url.includes(host);
    }
  }
  return true;
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: url.startsWith("/") ? `/${match3?.[1] ?? ""}` : "",
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s?]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream3({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
function normalizeLocationHeader(location2, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location2)) {
    return location2;
  }
  const locationURL = new URL(location2);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();

// node_modules/@opennextjs/aws/dist/utils/semver.js
function compareSemver(v1, operator, v2) {
  let versionDiff = 0;
  if (v1 === "latest") {
    versionDiff = 1;
  } else {
    if (/^[^\d]/.test(v1)) {
      v1 = v1.substring(1);
    }
    if (/^[^\d]/.test(v2)) {
      v2 = v2.substring(1);
    }
    const [major1, minor1 = 0, patch1 = 0] = v1.split(".").map(Number);
    const [major2, minor2 = 0, patch2 = 0] = v2.split(".").map(Number);
    if (Number.isNaN(major1) || Number.isNaN(major2)) {
      throw new Error("The major version is required.");
    }
    if (major1 !== major2) {
      versionDiff = major1 - major2;
    } else if (minor1 !== minor2) {
      versionDiff = minor1 - minor2;
    } else if (patch1 !== patch2) {
      versionDiff = patch1 - patch2;
    }
  }
  switch (operator) {
    case "=":
      return versionDiff === 0;
    case ">=":
      return versionDiff >= 0;
    case "<=":
      return versionDiff <= 0;
    case ">":
      return versionDiff > 0;
    case "<":
      return versionDiff < 0;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

// node_modules/@opennextjs/aws/dist/utils/cache.js
async function isStale(key, tags, lastModified) {
  if (!compareSemver(globalThis.nextVersion, ">=", "16.0.0")) {
    return false;
  }
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.isStale?.(tags, lastModified) ?? false;
  }
  return await globalThis.tagCache.isStale?.(key, lastModified) ?? false;
}
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.[CACHE_TAGS_HEADER]?.split(",") ?? [];
    delete value.meta?.headers?.[CACHE_TAGS_HEADER];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
var NEXT_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
var NEXT_PRERENDER_HEADER = "x-nextjs-prerender";
var NEXT_POSTPONED_HEADER = "x-nextjs-postponed";
async function computeCacheControl(path3, body, host, revalidate, lastModified, isStaleFromTagCache = false) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest?.routes ?? {}).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      [CACHE_CONTROL_HEADER]: NO_STORE_CACHE_CONTROL,
      [OPEN_NEXT_CACHE_HEADER]: "ERROR",
      etag
    };
  }
  const isSSG = finalRevalidate === CACHE_ONE_YEAR;
  const remainingTtl = Math.max(finalRevalidate - age, 1);
  const isStaleFromTime = !isSSG && remainingTtl === 1;
  const isStale2 = isStaleFromTime || isStaleFromTagCache;
  if (!isSSG || isStaleFromTagCache) {
    const sMaxAge = isStaleFromTagCache ? 1 : remainingTtl;
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate,
      isStaleFromTagCache
    });
    if (isStale2) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      [CACHE_CONTROL_HEADER]: `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      [OPEN_NEXT_CACHE_HEADER]: isStale2 ? "STALE" : "HIT",
      etag
    };
  }
  return {
    [CACHE_CONTROL_HEADER]: `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    [OPEN_NEXT_CACHE_HEADER]: "HIT",
    etag
  };
}
function getBodyForAppRouter(event, cachedValue) {
  if (cachedValue.type !== "app") {
    throw new Error("getBodyForAppRouter called with non-app cache value");
  }
  const segmentHeader = `${event.headers[NEXT_SEGMENT_PREFETCH_HEADER]}`;
  const isSegmentResponse = Boolean(segmentHeader) && segmentHeader in (cachedValue.segmentData || {}) && !NextConfig.experimental?.prefetchInlining;
  if (isSegmentResponse) {
    return {
      body: cachedValue.segmentData[segmentHeader],
      additionalHeaders: {
        [NEXT_PRERENDER_HEADER]: "1",
        [NEXT_POSTPONED_HEADER]: "2"
      }
    };
  }
  if (cachedValue.rsc === void 0) {
    return void 0;
  }
  return { body: cachedValue.rsc, additionalHeaders: {} };
}
async function generateResult(event, localizedPath, cachedValue, lastModified, isStaleFromTagCache = false) {
  debug("Returning result from experimental cache");
  let body;
  let type = "application/octet-stream";
  let isDataRequest = false;
  let additionalHeaders = {};
  if (cachedValue.type === "app") {
    isDataRequest = event.headers.rsc === "1";
    if (isDataRequest) {
      const appRouterResult = getBodyForAppRouter(event, cachedValue);
      body = appRouterResult?.body;
      additionalHeaders = appRouterResult?.additionalHeaders ?? {};
    } else {
      body = cachedValue.html;
    }
    type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
  } else if (cachedValue.type === "page") {
    isDataRequest = Boolean(event.query.__nextDataReq);
    body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
    type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
  } else {
    throw new Error("generateResult called with unsupported cache value type, only 'app' and 'page' are supported");
  }
  if (body === void 0) {
    debug("Missing body in the cache entry, falling back to the server");
    return void 0;
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified, isStaleFromTagCache);
  const statusCode = computeStatusCode(event.rewriteStatusCode, cachedValue.meta?.status);
  const headers = {
    ...cacheControl,
    "content-type": type,
    ...cachedValue.meta?.headers,
    vary: VARY_HEADER,
    ...additionalHeaders
  };
  fixCacheControlForError(headers, statusCode);
  return {
    type: "core",
    statusCode,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers
  };
}
function computeStatusCode(rewriteStatusCode, cachedStatusCode) {
  if (cachedStatusCode !== void 0 && cachedStatusCode !== 200) {
    return cachedStatusCode;
  }
  return rewriteStatusCode ?? cachedStatusCode ?? 200;
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => escapePathDelimiters(decodeURIComponent(segment), true)).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers[PRERENDER_REVALIDATE_HEADER]))
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  try {
    localizedPath = decodePathParams(localizedPath) || "/";
  } catch {
    return event;
  }
  const cacheKey = localizedPath === "/" ? "/index" : localizedPath;
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest?.routes ?? {}).includes(localizedPath) || Object.values(PrerenderManifest?.dynamicRoutes ?? {}).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(cacheKey);
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      const tags = getTagsFromValue(cachedData.value);
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const _hasBeenRevalidated = cachedData.shouldBypassTagCache ? false : await hasBeenRevalidated(cacheKey, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const _isStale = cachedData.shouldBypassTagCache ? false : await isStale(cacheKey, tags, cachedData.lastModified ?? Date.now());
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page": {
          const result = await generateResult(event, localizedPath, cachedData.value, cachedData.lastModified, _isStale);
          return result ?? event;
        }
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          const statusCode = computeStatusCode(event.rewriteStatusCode, cachedData.value.meta?.status);
          const headers = {
            ...cacheControl,
            ...cachedData.value.meta?.headers,
            vary: VARY_HEADER
          };
          fixCacheControlForError(headers, statusCode);
          return {
            type: "core",
            statusCode,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers,
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !(event.query.__nextDataReq === "1") && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      headers: {
        ...internalEvent.headers,
        "x-nextjs-data": "1"
      },
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes = {}, routes = {} } = prerenderManifest ?? {};
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers[ISR_HEADER] && headers[PRERENDER_REVALIDATE_HEADER] === PrerenderManifest?.preview?.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(normalizedPath);
  } catch {
  }
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath) || decodedPath !== void 0 && r.test(decodedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie")
        return;
      if (REDIRECTS.has(statusCode) && key.toLowerCase() === "location") {
        resHeaders[key] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const setCookies = responseHeaders.getSetCookie();
  if (setCookies.length > 0) {
    resHeaders["set-cookie"] = setCookies;
  }
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
var NEXT_INTERNAL_HEADERS = [
  "x-middleware-rewrite",
  "x-middleware-redirect",
  "x-middleware-set-cookie",
  "x-middleware-skip",
  "x-middleware-override-headers",
  "x-middleware-next",
  "x-now-route-matches",
  "x-matched-path",
  "x-nextjs-data",
  "x-next-resume-state-length"
];
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      const lowerCaseKey = key.toLowerCase();
      if (lowerCaseKey.startsWith(INTERNAL_HEADER_PREFIX) || lowerCaseKey.startsWith(MIDDLEWARE_HEADER_PREFIX) || NEXT_INTERNAL_HEADERS.includes(lowerCaseKey)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    if (middlewareHeadersPrioritized) {
      headers = {
        ...headers,
        ...middlewareEventOrResult.responseHeaders
      };
    } else {
      headers = {
        ...middlewareEventOrResult.responseHeaders,
        ...headers
      };
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": NO_STORE_CACHE_CONTROL
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers[ISR_HEADER] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
