// /*
//  * BSD 3-Clause License
//  *
//  * Copyright © 2022, Jacob B. Sanders, IaC-Factory & Affiliates
//  *
//  * All Rights Reserved
//  */
//
// import url from "url";
// import { HTTP } from "@iac-factory/api-schema";
// const parse = url.parse;
// const Url = url.URL;
//
// /**
//  * Module exports.
//  * @public
//  */
//
// module.exports = parseurl;
// module.exports.original = originalurl;
//
// /***
//  * Parse the `req` url with memoization.
//  *
//  * @param {HTTP.Request} req
//  * @returns {object}
//  */
// function parseurl(req: HTTP.Request): object | undefined {
//   var url = req.url;
//
//   if ( url === undefined ) {
//     // URL is undefined
//     return undefined;
//   }
//
//   // @ts-ignore
//   var parsed = req["_parsedUrl"];
//
//   if ( fresh( url, parsed ) ) {
//     // Return cached URL parse
//     return parsed;
//   }
//
//   // Parse the URL
//   parsed = fastparse( url );
//   parsed._raw = url;
//
//   // @ts-ignore
//   return ( req._parsedUrl = parsed );
// };
//
// /***
//  * Parse the `req` original url with fallback and memoization.
//  *
//  * @param {HTTP.Request} req
//  * @returns {any}
//  */
// function originalurl(req: HTTP.Request) {
//   var url = req.originalUrl;
//
//   if ( typeof url !== "string" ) {
//     // Fallback
//     return parseurl( req );
//   }
//
//   // @ts-ignore
//   var parsed = req["_parsedOriginalUrl"];
//
//   if ( fresh( url, parsed ) ) {
//     // Return cached URL parse
//     return parsed;
//   }
//
//   // Parse the URL
//   parsed = fastparse( url );
//   parsed._raw = url;
//
//   // @ts-ignore
//   return ( req._parsedOriginalUrl = parsed );
// };
//
// /**
//  * Parse the `str` url with fast-path short-cut.
//  *
//  * @param {string} str
//  * @return {Object}
//  * @private
//  */
//
// function fastparse(str: url.UrlWithStringQuery | string) {
//   if ( typeof str !== "string" || str.charCodeAt( 0 ) !== 0x2f /* / */ ) {
//     return parse( str as string );
//   }
//
//   var pathname = str;
//   var query = null;
//   var search = null;
//
//   // This takes the regexp from https://github.com/joyent/node/pull/7878
//   // Which is /^(\/[^?#\s]*)(\?[^#\s]*)?$/
//   // And unrolls it into a for loop
//   for ( var i = 1; i < str.length; i++ ) {
//     switch ( str.charCodeAt( i ) ) {
//       case 0x3f: /* ?  */
//         if ( search === null ) {
//           pathname = str.substring( 0, i );
//           // @ts-ignore
//           query = str.substring( i + 1 );
//           // @ts-ignore
//           search = str.substring( i );
//         }
//         break;
//       case 0x09: /* \t */
//       case 0x0a: /* \n */
//       case 0x0c: /* \f */
//       case 0x0d: /* \r */
//       case 0x20: /*    */
//       case 0x23: /* #  */
//       case 0xa0:
//       case 0xfeff:
//         return parse( str );
//     }
//   }
//
//   var url = Url !== undefined
//     ? new Url( str )
//     : {
//       path: undefined
//     };
//
//   // @ts-ignore
//   url[ "path" ] = str;
//   // @ts-ignore
//   url[ "href" ] = str;
//   // @ts-ignore
//   url[ "pathname" ] = pathname;
//
//   if ( search !== null ) {
//     // @ts-ignore
//     url[ "query" ] = query;
//     // @ts-ignore
//     url[ "search" ] = search;
//   }
//
//   return url;
// }
//
// /**
//  * Determine if parsed is still fresh for url.
//  *
//  * @param {string} url
//  * @param {object} parsedUrl
//  * @return {boolean}
//  * @private
//  */
//
// function fresh(url: any, parsedUrl: any) {
//   return typeof parsedUrl === "object" &&
//     parsedUrl !== null &&
//     ( Url === undefined || parsedUrl instanceof Url ) &&
//     parsedUrl._raw === url;
// }
//
// /**
//  * Get pathname of request.
//  *
//  * @param {IncomingMessage} req
//  * @private
//  */
//
// export const Path = function (req: HTTP.Request & { pathname?: string} ) {
//   try {
//     // @ts-ignore
//     return parseurl( req )?.pathname;
//   } catch ( err ) {
//     return undefined;
//   }
// };
//
// export default Path;

/*
 * BSD 3-Clause License
 *
 * Copyright © 2022, Jacob B. Sanders, IaC-Factory & Affiliates
 *
 * All Rights Reserved
 */
/*!
 * parseurl
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module dependencies.
 * @private
 */

var url = require('url')
var parse = url.parse // eslint-disable-line
var Url = url.Url

/**
 * Module exports.
 * @public
 */

module.exports = parseurl
module.exports.original = originalurl

/**
 * Parse the `req` url with memoization.
 *
 * @param {ServerRequest} req
 * @return {Object}
 * @public
 */

function parseurl (req) {
  var url = req.url

  if (url === undefined) {
    // URL is undefined
    return undefined
  }

  var parsed = req._parsedUrl

  if (fresh(url, parsed)) {
    // Return cached URL parse
    return parsed
  }

  // Parse the URL
  parsed = fastparse(url)
  parsed._raw = url

  return (req._parsedUrl = parsed)
};

/**
 * Parse the `req` original url with fallback and memoization.
 *
 * @param {ServerRequest} req
 * @return {Object}
 * @public
 */

function originalurl (req) {
  var url = req.originalUrl

  if (typeof url !== 'string') {
    // Fallback
    return parseurl(req)
  }

  var parsed = req._parsedOriginalUrl

  if (fresh(url, parsed)) {
    // Return cached URL parse
    return parsed
  }

  // Parse the URL
  parsed = fastparse(url)
  parsed._raw = url

  return (req._parsedOriginalUrl = parsed)
};

/**
 * Parse the `str` url with fast-path short-cut.
 *
 * @param {string} str
 * @return {Object}
 * @private
 */

function fastparse (str) {
  if (typeof str !== 'string' || str.charCodeAt(0) !== 0x2f /* / */) {
    return parse(str)
  }

  var pathname = str
  var query = null
  var search = null

  // This takes the regexp from https://github.com/joyent/node/pull/7878
  // Which is /^(\/[^?#\s]*)(\?[^#\s]*)?$/
  // And unrolls it into a for loop
  for (var i = 1; i < str.length; i++) {
    switch (str.charCodeAt(i)) {
      case 0x3f: /* ?  */
        if (search === null) {
          pathname = str.substring(0, i)
          query = str.substring(i + 1)
          search = str.substring(i)
        }
        break
      case 0x09: /* \t */
      case 0x0a: /* \n */
      case 0x0c: /* \f */
      case 0x0d: /* \r */
      case 0x20: /*    */
      case 0x23: /* #  */
      case 0xa0:
      case 0xfeff:
        return parse(str)
    }
  }

  var url = Url !== undefined
    ? new Url()
    : {}

  url.path = str
  url.href = str
  url.pathname = pathname

  if (search !== null) {
    url.query = query
    url.search = search
  }

  return url
}

/**
 * Determine if parsed is still fresh for url.
 *
 * @param {string} url
 * @param {object} parsedUrl
 * @return {boolean}
 * @private
 */

function fresh (url, parsedUrl) {
  return typeof parsedUrl === 'object' &&
    parsedUrl !== null &&
    (Url === undefined || parsedUrl instanceof Url) &&
    parsedUrl._raw === url
}
