/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/* ========================================================================
 * Bootstrap: transition.js v3.3.6
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.3.6
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.6'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.3.6
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.6'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.3.6
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.6'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.6
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.6'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.3.6
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.6'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.3.6
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.6'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.3.6
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.6'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.3.6
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.6'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.3.6
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.6'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.3.6
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.6'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: affix.js v3.3.6
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.6'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);












/*!
 * Datepicker for Bootstrap v1.6.4 (https://github.com/eternicode/bootstrap-datepicker)
 *
 * Copyright 2012 Stefan Petre
 * Improvements by Andrew Rowls
 * Licensed under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 */
(function(factory){
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($, undefined){

	function UTCDate(){
		return new Date(Date.UTC.apply(Date, arguments));
	}
	function UTCToday(){
		var today = new Date();
		return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
	}
	function isUTCEquals(date1, date2) {
		return (
			date1.getUTCFullYear() === date2.getUTCFullYear() &&
			date1.getUTCMonth() === date2.getUTCMonth() &&
			date1.getUTCDate() === date2.getUTCDate()
		);
	}
	function alias(method){
		return function(){
			return this[method].apply(this, arguments);
		};
	}
	function isValidDate(d) {
		return d && !isNaN(d.getTime());
	}

	var DateArray = (function(){
		var extras = {
			get: function(i){
				return this.slice(i)[0];
			},
			contains: function(d){
				// Array.indexOf is not cross-browser;
				// $.inArray doesn't work with Dates
				var val = d && d.valueOf();
				for (var i=0, l=this.length; i < l; i++)
					if (this[i].valueOf() === val)
						return i;
				return -1;
			},
			remove: function(i){
				this.splice(i,1);
			},
			replace: function(new_array){
				if (!new_array)
					return;
				if (!$.isArray(new_array))
					new_array = [new_array];
				this.clear();
				this.push.apply(this, new_array);
			},
			clear: function(){
				this.length = 0;
			},
			copy: function(){
				var a = new DateArray();
				a.replace(this);
				return a;
			}
		};

		return function(){
			var a = [];
			a.push.apply(a, arguments);
			$.extend(a, extras);
			return a;
		};
	})();


	// Picker object

	var Datepicker = function(element, options){
		$(element).data('datepicker', this);
		this._process_options(options);

		this.dates = new DateArray();
		this.viewDate = this.o.defaultViewDate;
		this.focusDate = null;

		this.element = $(element);
		this.isInput = this.element.is('input');
		this.inputField = this.isInput ? this.element : this.element.find('input');
		this.component = this.element.hasClass('date') ? this.element.find('.add-on, .input-group-addon, .btn') : false;
		this.hasInput = this.component && this.inputField.length;
		if (this.component && this.component.length === 0)
			this.component = false;
		this.isInline = !this.component && this.element.is('div');

		this.picker = $(DPGlobal.template);

		// Checking templates and inserting
		if (this._check_template(this.o.templates.leftArrow)) {
			this.picker.find('.prev').html(this.o.templates.leftArrow);
		}
		if (this._check_template(this.o.templates.rightArrow)) {
			this.picker.find('.next').html(this.o.templates.rightArrow);
		}

		this._buildEvents();
		this._attachEvents();

		if (this.isInline){
			this.picker.addClass('datepicker-inline').appendTo(this.element);
		}
		else {
			this.picker.addClass('datepicker-dropdown dropdown-menu');
		}

		if (this.o.rtl){
			this.picker.addClass('datepicker-rtl');
		}

		this.viewMode = this.o.startView;

		if (this.o.calendarWeeks)
			this.picker.find('thead .datepicker-title, tfoot .today, tfoot .clear')
						.attr('colspan', function(i, val){
							return parseInt(val) + 1;
						});

		this._allow_update = false;

		this.setStartDate(this._o.startDate);
		this.setEndDate(this._o.endDate);
		this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);
		this.setDaysOfWeekHighlighted(this.o.daysOfWeekHighlighted);
		this.setDatesDisabled(this.o.datesDisabled);

		this.fillDow();
		this.fillMonths();

		this._allow_update = true;

		this.update();
		this.showMode();

		if (this.isInline){
			this.show();
		}
	};

	Datepicker.prototype = {
		constructor: Datepicker,

		_resolveViewName: function(view, default_value){
			if (view === 0 || view === 'days' || view === 'month') {
				return 0;
			}
			if (view === 1 || view === 'months' || view === 'year') {
				return 1;
			}
			if (view === 2 || view === 'years' || view === 'decade') {
				return 2;
			}
			if (view === 3 || view === 'decades' || view === 'century') {
				return 3;
			}
			if (view === 4 || view === 'centuries' || view === 'millennium') {
				return 4;
			}
			return default_value === undefined ? false : default_value;
		},

		_check_template: function(tmp){
			try {
				// If empty
				if (tmp === undefined || tmp === "") {
					return false;
				}
				// If no html, everything ok
				if ((tmp.match(/[<>]/g) || []).length <= 0) {
					return true;
				}
				// Checking if html is fine
				var jDom = $(tmp);
				return jDom.length > 0;
			}
			catch (ex) {
				return false;
			}
		},

		_process_options: function(opts){
			// Store raw options for reference
			this._o = $.extend({}, this._o, opts);
			// Processed options
			var o = this.o = $.extend({}, this._o);

			// Check if "de-DE" style date is available, if not language should
			// fallback to 2 letter code eg "de"
			var lang = o.language;
			if (!dates[lang]){
				lang = lang.split('-')[0];
				if (!dates[lang])
					lang = defaults.language;
			}
			o.language = lang;

			// Retrieve view index from any aliases
			o.startView = this._resolveViewName(o.startView, 0);
			o.minViewMode = this._resolveViewName(o.minViewMode, 0);
			o.maxViewMode = this._resolveViewName(o.maxViewMode, 4);

			// Check that the start view is between min and max
			o.startView = Math.min(o.startView, o.maxViewMode);
			o.startView = Math.max(o.startView, o.minViewMode);

			// true, false, or Number > 0
			if (o.multidate !== true){
				o.multidate = Number(o.multidate) || false;
				if (o.multidate !== false)
					o.multidate = Math.max(0, o.multidate);
			}
			o.multidateSeparator = String(o.multidateSeparator);

			o.weekStart %= 7;
			o.weekEnd = (o.weekStart + 6) % 7;

			var format = DPGlobal.parseFormat(o.format);
			if (o.startDate !== -Infinity){
				if (!!o.startDate){
					if (o.startDate instanceof Date)
						o.startDate = this._local_to_utc(this._zero_time(o.startDate));
					else
						o.startDate = DPGlobal.parseDate(o.startDate, format, o.language, o.assumeNearbyYear);
				}
				else {
					o.startDate = -Infinity;
				}
			}
			if (o.endDate !== Infinity){
				if (!!o.endDate){
					if (o.endDate instanceof Date)
						o.endDate = this._local_to_utc(this._zero_time(o.endDate));
					else
						o.endDate = DPGlobal.parseDate(o.endDate, format, o.language, o.assumeNearbyYear);
				}
				else {
					o.endDate = Infinity;
				}
			}

			o.daysOfWeekDisabled = o.daysOfWeekDisabled||[];
			if (!$.isArray(o.daysOfWeekDisabled))
				o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/);
			o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function(d){
				return parseInt(d, 10);
			});

			o.daysOfWeekHighlighted = o.daysOfWeekHighlighted||[];
			if (!$.isArray(o.daysOfWeekHighlighted))
				o.daysOfWeekHighlighted = o.daysOfWeekHighlighted.split(/[,\s]*/);
			o.daysOfWeekHighlighted = $.map(o.daysOfWeekHighlighted, function(d){
				return parseInt(d, 10);
			});

			o.datesDisabled = o.datesDisabled||[];
			if (!$.isArray(o.datesDisabled)) {
				o.datesDisabled = [
					o.datesDisabled
				];
			}
			o.datesDisabled = $.map(o.datesDisabled,function(d){
				return DPGlobal.parseDate(d, format, o.language, o.assumeNearbyYear);
			});

			var plc = String(o.orientation).toLowerCase().split(/\s+/g),
				_plc = o.orientation.toLowerCase();
			plc = $.grep(plc, function(word){
				return /^auto|left|right|top|bottom$/.test(word);
			});
			o.orientation = {x: 'auto', y: 'auto'};
			if (!_plc || _plc === 'auto')
				; // no action
			else if (plc.length === 1){
				switch (plc[0]){
					case 'top':
					case 'bottom':
						o.orientation.y = plc[0];
						break;
					case 'left':
					case 'right':
						o.orientation.x = plc[0];
						break;
				}
			}
			else {
				_plc = $.grep(plc, function(word){
					return /^left|right$/.test(word);
				});
				o.orientation.x = _plc[0] || 'auto';

				_plc = $.grep(plc, function(word){
					return /^top|bottom$/.test(word);
				});
				o.orientation.y = _plc[0] || 'auto';
			}
			if (o.defaultViewDate) {
				var year = o.defaultViewDate.year || new Date().getFullYear();
				var month = o.defaultViewDate.month || 0;
				var day = o.defaultViewDate.day || 1;
				o.defaultViewDate = UTCDate(year, month, day);
			} else {
				o.defaultViewDate = UTCToday();
			}
		},
		_events: [],
		_secondaryEvents: [],
		_applyEvents: function(evs){
			for (var i=0, el, ch, ev; i < evs.length; i++){
				el = evs[i][0];
				if (evs[i].length === 2){
					ch = undefined;
					ev = evs[i][1];
				}
				else if (evs[i].length === 3){
					ch = evs[i][1];
					ev = evs[i][2];
				}
				el.on(ev, ch);
			}
		},
		_unapplyEvents: function(evs){
			for (var i=0, el, ev, ch; i < evs.length; i++){
				el = evs[i][0];
				if (evs[i].length === 2){
					ch = undefined;
					ev = evs[i][1];
				}
				else if (evs[i].length === 3){
					ch = evs[i][1];
					ev = evs[i][2];
				}
				el.off(ev, ch);
			}
		},
		_buildEvents: function(){
            var events = {
                keyup: $.proxy(function(e){
                    if ($.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) === -1)
                        this.update();
                }, this),
                keydown: $.proxy(this.keydown, this),
                paste: $.proxy(this.paste, this)
            };

            if (this.o.showOnFocus === true) {
                events.focus = $.proxy(this.show, this);
            }

            if (this.isInput) { // single input
                this._events = [
                    [this.element, events]
                ];
            }
            else if (this.component && this.hasInput) { // component: input + button
                this._events = [
                    // For components that are not readonly, allow keyboard nav
                    [this.inputField, events],
                    [this.component, {
                        click: $.proxy(this.show, this)
                    }]
                ];
            }
			else {
				this._events = [
					[this.element, {
						click: $.proxy(this.show, this),
						keydown: $.proxy(this.keydown, this)
					}]
				];
			}
			this._events.push(
				// Component: listen for blur on element descendants
				[this.element, '*', {
					blur: $.proxy(function(e){
						this._focused_from = e.target;
					}, this)
				}],
				// Input: listen for blur on element
				[this.element, {
					blur: $.proxy(function(e){
						this._focused_from = e.target;
					}, this)
				}]
			);

			if (this.o.immediateUpdates) {
				// Trigger input updates immediately on changed year/month
				this._events.push([this.element, {
					'changeYear changeMonth': $.proxy(function(e){
						this.update(e.date);
					}, this)
				}]);
			}

			this._secondaryEvents = [
				[this.picker, {
					click: $.proxy(this.click, this)
				}],
				[$(window), {
					resize: $.proxy(this.place, this)
				}],
				[$(document), {
					mousedown: $.proxy(function(e){
						// Clicked outside the datepicker, hide it
						if (!(
							this.element.is(e.target) ||
							this.element.find(e.target).length ||
							this.picker.is(e.target) ||
							this.picker.find(e.target).length ||
							this.isInline
						)){
							this.hide();
						}
					}, this)
				}]
			];
		},
		_attachEvents: function(){
			this._detachEvents();
			this._applyEvents(this._events);
		},
		_detachEvents: function(){
			this._unapplyEvents(this._events);
		},
		_attachSecondaryEvents: function(){
			this._detachSecondaryEvents();
			this._applyEvents(this._secondaryEvents);
		},
		_detachSecondaryEvents: function(){
			this._unapplyEvents(this._secondaryEvents);
		},
		_trigger: function(event, altdate){
			var date = altdate || this.dates.get(-1),
				local_date = this._utc_to_local(date);

			this.element.trigger({
				type: event,
				date: local_date,
				dates: $.map(this.dates, this._utc_to_local),
				format: $.proxy(function(ix, format){
					if (arguments.length === 0){
						ix = this.dates.length - 1;
						format = this.o.format;
					}
					else if (typeof ix === 'string'){
						format = ix;
						ix = this.dates.length - 1;
					}
					format = format || this.o.format;
					var date = this.dates.get(ix);
					return DPGlobal.formatDate(date, format, this.o.language);
				}, this)
			});
		},

		show: function(){
			if (this.inputField.prop('disabled') || (this.inputField.prop('readonly') && this.o.enableOnReadonly === false))
				return;
			if (!this.isInline)
				this.picker.appendTo(this.o.container);
			this.place();
			this.picker.show();
			this._attachSecondaryEvents();
			this._trigger('show');
			if ((window.navigator.msMaxTouchPoints || 'ontouchstart' in document) && this.o.disableTouchKeyboard) {
				$(this.element).blur();
			}
			return this;
		},

		hide: function(){
			if (this.isInline || !this.picker.is(':visible'))
				return this;
			this.focusDate = null;
			this.picker.hide().detach();
			this._detachSecondaryEvents();
			this.viewMode = this.o.startView;
			this.showMode();

			if (this.o.forceParse && this.inputField.val())
				this.setValue();
			this._trigger('hide');
			return this;
		},

		destroy: function(){
			this.hide();
			this._detachEvents();
			this._detachSecondaryEvents();
			this.picker.remove();
			delete this.element.data().datepicker;
			if (!this.isInput){
				delete this.element.data().date;
			}
			return this;
		},

		paste: function(evt){
			var dateString;
			if (evt.originalEvent.clipboardData && evt.originalEvent.clipboardData.types
				&& $.inArray('text/plain', evt.originalEvent.clipboardData.types) !== -1) {
				dateString = evt.originalEvent.clipboardData.getData('text/plain');
			}
			else if (window.clipboardData) {
				dateString = window.clipboardData.getData('Text');
			}
			else {
				return;
			}
			this.setDate(dateString);
			this.update();
			evt.preventDefault();
		},

		_utc_to_local: function(utc){
			return utc && new Date(utc.getTime() + (utc.getTimezoneOffset()*60000));
		},
		_local_to_utc: function(local){
			return local && new Date(local.getTime() - (local.getTimezoneOffset()*60000));
		},
		_zero_time: function(local){
			return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
		},
		_zero_utc_time: function(utc){
			return utc && new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()));
		},

		getDates: function(){
			return $.map(this.dates, this._utc_to_local);
		},

		getUTCDates: function(){
			return $.map(this.dates, function(d){
				return new Date(d);
			});
		},

		getDate: function(){
			return this._utc_to_local(this.getUTCDate());
		},

		getUTCDate: function(){
			var selected_date = this.dates.get(-1);
			if (typeof selected_date !== 'undefined') {
				return new Date(selected_date);
			} else {
				return null;
			}
		},

		clearDates: function(){
			if (this.inputField) {
				this.inputField.val('');
			}

			this.update();
			this._trigger('changeDate');

			if (this.o.autoclose) {
				this.hide();
			}
		},
		setDates: function(){
			var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
			this.update.apply(this, args);
			this._trigger('changeDate');
			this.setValue();
			return this;
		},

		setUTCDates: function(){
			var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
			this.update.apply(this, $.map(args, this._utc_to_local));
			this._trigger('changeDate');
			this.setValue();
			return this;
		},

		setDate: alias('setDates'),
		setUTCDate: alias('setUTCDates'),
		remove: alias('destroy'),

		setValue: function(){
			var formatted = this.getFormattedDate();
			this.inputField.val(formatted);
			return this;
		},

		getFormattedDate: function(format){
			if (format === undefined)
				format = this.o.format;

			var lang = this.o.language;
			return $.map(this.dates, function(d){
				return DPGlobal.formatDate(d, format, lang);
			}).join(this.o.multidateSeparator);
		},

		getStartDate: function(){
			return this.o.startDate;
		},

		setStartDate: function(startDate){
			this._process_options({startDate: startDate});
			this.update();
			this.updateNavArrows();
			return this;
		},

		getEndDate: function(){
			return this.o.endDate;
		},

		setEndDate: function(endDate){
			this._process_options({endDate: endDate});
			this.update();
			this.updateNavArrows();
			return this;
		},

		setDaysOfWeekDisabled: function(daysOfWeekDisabled){
			this._process_options({daysOfWeekDisabled: daysOfWeekDisabled});
			this.update();
			this.updateNavArrows();
			return this;
		},

		setDaysOfWeekHighlighted: function(daysOfWeekHighlighted){
			this._process_options({daysOfWeekHighlighted: daysOfWeekHighlighted});
			this.update();
			return this;
		},

		setDatesDisabled: function(datesDisabled){
			this._process_options({datesDisabled: datesDisabled});
			this.update();
			this.updateNavArrows();
		},

		place: function(){
			if (this.isInline)
				return this;
			var calendarWidth = this.picker.outerWidth(),
				calendarHeight = this.picker.outerHeight(),
				visualPadding = 10,
				container = $(this.o.container),
				windowWidth = container.width(),
				scrollTop = this.o.container === 'body' ? $(document).scrollTop() : container.scrollTop(),
				appendOffset = container.offset();

			var parentsZindex = [];
			this.element.parents().each(function(){
				var itemZIndex = $(this).css('z-index');
				if (itemZIndex !== 'auto' && itemZIndex !== 0) parentsZindex.push(parseInt(itemZIndex));
			});
			var zIndex = Math.max.apply(Math, parentsZindex) + this.o.zIndexOffset;
			var offset = this.component ? this.component.parent().offset() : this.element.offset();
			var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
			var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
			var left = offset.left - appendOffset.left,
				top = offset.top - appendOffset.top;

			if (this.o.container !== 'body') {
				top += scrollTop;
			}

			this.picker.removeClass(
				'datepicker-orient-top datepicker-orient-bottom '+
				'datepicker-orient-right datepicker-orient-left'
			);

			if (this.o.orientation.x !== 'auto'){
				this.picker.addClass('datepicker-orient-' + this.o.orientation.x);
				if (this.o.orientation.x === 'right')
					left -= calendarWidth - width;
			}
			// auto x orientation is best-placement: if it crosses a window
			// edge, fudge it sideways
			else {
				if (offset.left < 0) {
					// component is outside the window on the left side. Move it into visible range
					this.picker.addClass('datepicker-orient-left');
					left -= offset.left - visualPadding;
				} else if (left + calendarWidth > windowWidth) {
					// the calendar passes the widow right edge. Align it to component right side
					this.picker.addClass('datepicker-orient-right');
					left += width - calendarWidth;
				} else {
					// Default to left
					this.picker.addClass('datepicker-orient-left');
				}
			}

			// auto y orientation is best-situation: top or bottom, no fudging,
			// decision based on which shows more of the calendar
			var yorient = this.o.orientation.y,
				top_overflow;
			if (yorient === 'auto'){
				top_overflow = -scrollTop + top - calendarHeight;
				yorient = top_overflow < 0 ? 'bottom' : 'top';
			}

			this.picker.addClass('datepicker-orient-' + yorient);
			if (yorient === 'top')
				top -= calendarHeight + parseInt(this.picker.css('padding-top'));
			else
				top += height;

			if (this.o.rtl) {
				var right = windowWidth - (left + width);
				this.picker.css({
					top: top,
					right: right,
					zIndex: zIndex
				});
			} else {
				this.picker.css({
					top: top,
					left: left,
					zIndex: zIndex
				});
			}
			return this;
		},

		_allow_update: true,
		update: function(){
			if (!this._allow_update)
				return this;

			var oldDates = this.dates.copy(),
				dates = [],
				fromArgs = false;
			if (arguments.length){
				$.each(arguments, $.proxy(function(i, date){
					if (date instanceof Date)
						date = this._local_to_utc(date);
					dates.push(date);
				}, this));
				fromArgs = true;
			}
			else {
				dates = this.isInput
						? this.element.val()
						: this.element.data('date') || this.inputField.val();
				if (dates && this.o.multidate)
					dates = dates.split(this.o.multidateSeparator);
				else
					dates = [dates];
				delete this.element.data().date;
			}

			dates = $.map(dates, $.proxy(function(date){
				return DPGlobal.parseDate(date, this.o.format, this.o.language, this.o.assumeNearbyYear);
			}, this));
			dates = $.grep(dates, $.proxy(function(date){
				return (
					!this.dateWithinRange(date) ||
					!date
				);
			}, this), true);
			this.dates.replace(dates);

			if (this.dates.length)
				this.viewDate = new Date(this.dates.get(-1));
			else if (this.viewDate < this.o.startDate)
				this.viewDate = new Date(this.o.startDate);
			else if (this.viewDate > this.o.endDate)
				this.viewDate = new Date(this.o.endDate);
			else
				this.viewDate = this.o.defaultViewDate;

			if (fromArgs){
				// setting date by clicking
				this.setValue();
			}
			else if (dates.length){
				// setting date by typing
				if (String(oldDates) !== String(this.dates))
					this._trigger('changeDate');
			}
			if (!this.dates.length && oldDates.length)
				this._trigger('clearDate');

			this.fill();
			this.element.change();
			return this;
		},

		fillDow: function(){
			var dowCnt = this.o.weekStart,
				html = '<tr>';
			if (this.o.calendarWeeks){
				this.picker.find('.datepicker-days .datepicker-switch')
					.attr('colspan', function(i, val){
						return parseInt(val) + 1;
					});
				html += '<th class="cw">&#160;</th>';
			}
			while (dowCnt < this.o.weekStart + 7){
				html += '<th class="dow';
        if ($.inArray(dowCnt, this.o.daysOfWeekDisabled) > -1)
          html += ' disabled';
        html += '">'+dates[this.o.language].daysMin[(dowCnt++)%7]+'</th>';
			}
			html += '</tr>';
			this.picker.find('.datepicker-days thead').append(html);
		},

		fillMonths: function(){
      var localDate = this._utc_to_local(this.viewDate);
			var html = '',
			i = 0;
			while (i < 12){
        var focused = localDate && localDate.getMonth() === i ? ' focused' : '';
				html += '<span class="month' + focused + '">' + dates[this.o.language].monthsShort[i++]+'</span>';
			}
			this.picker.find('.datepicker-months td').html(html);
		},

		setRange: function(range){
			if (!range || !range.length)
				delete this.range;
			else
				this.range = $.map(range, function(d){
					return d.valueOf();
				});
			this.fill();
		},

		getClassNames: function(date){
			var cls = [],
				year = this.viewDate.getUTCFullYear(),
				month = this.viewDate.getUTCMonth(),
				today = new Date();
			if (date.getUTCFullYear() < year || (date.getUTCFullYear() === year && date.getUTCMonth() < month)){
				cls.push('old');
			}
			else if (date.getUTCFullYear() > year || (date.getUTCFullYear() === year && date.getUTCMonth() > month)){
				cls.push('new');
			}
			if (this.focusDate && date.valueOf() === this.focusDate.valueOf())
				cls.push('focused');
			// Compare internal UTC date with local today, not UTC today
			if (this.o.todayHighlight &&
				date.getUTCFullYear() === today.getFullYear() &&
				date.getUTCMonth() === today.getMonth() &&
				date.getUTCDate() === today.getDate()){
				cls.push('today');
			}
			if (this.dates.contains(date) !== -1)
				cls.push('active');
			if (!this.dateWithinRange(date)){
				cls.push('disabled');
			}
			if (this.dateIsDisabled(date)){
				cls.push('disabled', 'disabled-date');	
			} 
			if ($.inArray(date.getUTCDay(), this.o.daysOfWeekHighlighted) !== -1){
				cls.push('highlighted');
			}

			if (this.range){
				if (date > this.range[0] && date < this.range[this.range.length-1]){
					cls.push('range');
				}
				if ($.inArray(date.valueOf(), this.range) !== -1){
					cls.push('selected');
				}
				if (date.valueOf() === this.range[0]){
          cls.push('range-start');
        }
        if (date.valueOf() === this.range[this.range.length-1]){
          cls.push('range-end');
        }
			}
			return cls;
		},

		_fill_yearsView: function(selector, cssClass, factor, step, currentYear, startYear, endYear, callback){
			var html, view, year, steps, startStep, endStep, thisYear, i, classes, tooltip, before;

			html      = '';
			view      = this.picker.find(selector);
			year      = parseInt(currentYear / factor, 10) * factor;
			startStep = parseInt(startYear / step, 10) * step;
			endStep   = parseInt(endYear / step, 10) * step;
			steps     = $.map(this.dates, function(d){
				return parseInt(d.getUTCFullYear() / step, 10) * step;
			});

			view.find('.datepicker-switch').text(year + '-' + (year + step * 9));

			thisYear = year - step;
			for (i = -1; i < 11; i += 1) {
				classes = [cssClass];
				tooltip = null;

				if (i === -1) {
					classes.push('old');
				} else if (i === 10) {
					classes.push('new');
				}
				if ($.inArray(thisYear, steps) !== -1) {
					classes.push('active');
				}
				if (thisYear < startStep || thisYear > endStep) {
					classes.push('disabled');
				}
        if (thisYear === this.viewDate.getFullYear()) {
				  classes.push('focused');
        }

				if (callback !== $.noop) {
					before = callback(new Date(thisYear, 0, 1));
					if (before === undefined) {
						before = {};
					} else if (typeof(before) === 'boolean') {
						before = {enabled: before};
					} else if (typeof(before) === 'string') {
						before = {classes: before};
					}
					if (before.enabled === false) {
						classes.push('disabled');
					}
					if (before.classes) {
						classes = classes.concat(before.classes.split(/\s+/));
					}
					if (before.tooltip) {
						tooltip = before.tooltip;
					}
				}

				html += '<span class="' + classes.join(' ') + '"' + (tooltip ? ' title="' + tooltip + '"' : '') + '>' + thisYear + '</span>';
				thisYear += step;
			}
			view.find('td').html(html);
		},

		fill: function(){
			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth(),
				startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
				startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
				endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
				endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
				todaytxt = dates[this.o.language].today || dates['en'].today || '',
				cleartxt = dates[this.o.language].clear || dates['en'].clear || '',
				titleFormat = dates[this.o.language].titleFormat || dates['en'].titleFormat,
				tooltip,
				before;
			if (isNaN(year) || isNaN(month))
				return;
			this.picker.find('.datepicker-days .datepicker-switch')
						.text(DPGlobal.formatDate(d, titleFormat, this.o.language));
			this.picker.find('tfoot .today')
						.text(todaytxt)
						.toggle(this.o.todayBtn !== false);
			this.picker.find('tfoot .clear')
						.text(cleartxt)
						.toggle(this.o.clearBtn !== false);
			this.picker.find('thead .datepicker-title')
						.text(this.o.title)
						.toggle(this.o.title !== '');
			this.updateNavArrows();
			this.fillMonths();
			var prevMonth = UTCDate(year, month-1, 28),
				day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
			prevMonth.setUTCDate(day);
			prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7)%7);
			var nextMonth = new Date(prevMonth);
			if (prevMonth.getUTCFullYear() < 100){
        nextMonth.setUTCFullYear(prevMonth.getUTCFullYear());
      }
			nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
			nextMonth = nextMonth.valueOf();
			var html = [];
			var clsName;
			while (prevMonth.valueOf() < nextMonth){
				if (prevMonth.getUTCDay() === this.o.weekStart){
					html.push('<tr>');
					if (this.o.calendarWeeks){
						// ISO 8601: First week contains first thursday.
						// ISO also states week starts on Monday, but we can be more abstract here.
						var
							// Start of current week: based on weekstart/current date
							ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),
							// Thursday of this week
							th = new Date(Number(ws) + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
							// First Thursday of year, year from thursday
							yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay())%7*864e5),
							// Calendar week: ms between thursdays, div ms per day, div 7 days
							calWeek =  (th - yth) / 864e5 / 7 + 1;
						html.push('<td class="cw">'+ calWeek +'</td>');
					}
				}
				clsName = this.getClassNames(prevMonth);
				clsName.push('day');

				if (this.o.beforeShowDay !== $.noop){
					before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
					if (before === undefined)
						before = {};
					else if (typeof(before) === 'boolean')
						before = {enabled: before};
					else if (typeof(before) === 'string')
						before = {classes: before};
					if (before.enabled === false)
						clsName.push('disabled');
					if (before.classes)
						clsName = clsName.concat(before.classes.split(/\s+/));
					if (before.tooltip)
						tooltip = before.tooltip;
				}

				//Check if uniqueSort exists (supported by jquery >=1.12 and >=2.2)
				//Fallback to unique function for older jquery versions
				if ($.isFunction($.uniqueSort)) {
					clsName = $.uniqueSort(clsName);
				} else {
					clsName = $.unique(clsName);
				}

				html.push('<td class="'+clsName.join(' ')+'"' + (tooltip ? ' title="'+tooltip+'"' : '') + '>'+prevMonth.getUTCDate() + '</td>');
				tooltip = null;
				if (prevMonth.getUTCDay() === this.o.weekEnd){
					html.push('</tr>');
				}
				prevMonth.setUTCDate(prevMonth.getUTCDate()+1);
			}
			this.picker.find('.datepicker-days tbody').empty().append(html.join(''));

			var monthsTitle = dates[this.o.language].monthsTitle || dates['en'].monthsTitle || 'Months';
			var months = this.picker.find('.datepicker-months')
						.find('.datepicker-switch')
							.text(this.o.maxViewMode < 2 ? monthsTitle : year)
							.end()
						.find('span').removeClass('active');

			$.each(this.dates, function(i, d){
				if (d.getUTCFullYear() === year)
					months.eq(d.getUTCMonth()).addClass('active');
			});

			if (year < startYear || year > endYear){
				months.addClass('disabled');
			}
			if (year === startYear){
				months.slice(0, startMonth).addClass('disabled');
			}
			if (year === endYear){
				months.slice(endMonth+1).addClass('disabled');
			}

			if (this.o.beforeShowMonth !== $.noop){
				var that = this;
				$.each(months, function(i, month){
          var moDate = new Date(year, i, 1);
          var before = that.o.beforeShowMonth(moDate);
					if (before === undefined)
						before = {};
					else if (typeof(before) === 'boolean')
						before = {enabled: before};
					else if (typeof(before) === 'string')
						before = {classes: before};
					if (before.enabled === false && !$(month).hasClass('disabled'))
					    $(month).addClass('disabled');
					if (before.classes)
					    $(month).addClass(before.classes);
					if (before.tooltip)
					    $(month).prop('title', before.tooltip);
				});
			}

			// Generating decade/years picker
			this._fill_yearsView(
				'.datepicker-years',
				'year',
				10,
				1,
				year,
				startYear,
				endYear,
				this.o.beforeShowYear
			);

			// Generating century/decades picker
			this._fill_yearsView(
				'.datepicker-decades',
				'decade',
				100,
				10,
				year,
				startYear,
				endYear,
				this.o.beforeShowDecade
			);

			// Generating millennium/centuries picker
			this._fill_yearsView(
				'.datepicker-centuries',
				'century',
				1000,
				100,
				year,
				startYear,
				endYear,
				this.o.beforeShowCentury
			);
		},

		updateNavArrows: function(){
			if (!this._allow_update)
				return;

			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth();
			switch (this.viewMode){
				case 0:
					if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth()){
						this.picker.find('.prev').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth()){
						this.picker.find('.next').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
				case 1:
				case 2:
				case 3:
				case 4:
					if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() || this.o.maxViewMode < 2){
						this.picker.find('.prev').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() || this.o.maxViewMode < 2){
						this.picker.find('.next').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
			}
		},

		click: function(e){
			e.preventDefault();
			e.stopPropagation();

			var target, dir, day, year, month, monthChanged, yearChanged;
			target = $(e.target);

			// Clicked on the switch
			if (target.hasClass('datepicker-switch')){
				this.showMode(1);
			}

			// Clicked on prev or next
			var navArrow = target.closest('.prev, .next');
			if (navArrow.length > 0) {
				dir = DPGlobal.modes[this.viewMode].navStep * (navArrow.hasClass('prev') ? -1 : 1);
				if (this.viewMode === 0){
					this.viewDate = this.moveMonth(this.viewDate, dir);
					this._trigger('changeMonth', this.viewDate);
				} else {
					this.viewDate = this.moveYear(this.viewDate, dir);
					if (this.viewMode === 1){
						this._trigger('changeYear', this.viewDate);
					}
				}
				this.fill();
			}

			// Clicked on today button
			if (target.hasClass('today') && !target.hasClass('day')){
				this.showMode(-2);
				this._setDate(UTCToday(), this.o.todayBtn === 'linked' ? null : 'view');
			}

			// Clicked on clear button
			if (target.hasClass('clear')){
				this.clearDates();
			}

			if (!target.hasClass('disabled')){
				// Clicked on a day
				if (target.hasClass('day')){
					day = parseInt(target.text(), 10) || 1;
					year = this.viewDate.getUTCFullYear();
					month = this.viewDate.getUTCMonth();

					// From last month
					if (target.hasClass('old')){
						if (month === 0) {
							month = 11;
							year = year - 1;
							monthChanged = true;
							yearChanged = true;
						} else {
							month = month - 1;
							monthChanged = true;
 						}
 					}

					// From next month
					if (target.hasClass('new')) {
						if (month === 11){
							month = 0;
							year = year + 1;
							monthChanged = true;
							yearChanged = true;
 						} else {
							month = month + 1;
							monthChanged = true;
 						}
					}
					this._setDate(UTCDate(year, month, day));
					if (yearChanged) {
						this._trigger('changeYear', this.viewDate);
					}
					if (monthChanged) {
						this._trigger('changeMonth', this.viewDate);
					}
				}

				// Clicked on a month
				if (target.hasClass('month')) {
					this.viewDate.setUTCDate(1);
					day = 1;
					month = target.parent().find('span').index(target);
					year = this.viewDate.getUTCFullYear();
					this.viewDate.setUTCMonth(month);
					this._trigger('changeMonth', this.viewDate);
					if (this.o.minViewMode === 1){
						this._setDate(UTCDate(year, month, day));
						this.showMode();
					} else {
						this.showMode(-1);
					}
					this.fill();
				}

				// Clicked on a year
				if (target.hasClass('year')
						|| target.hasClass('decade')
						|| target.hasClass('century')) {
					this.viewDate.setUTCDate(1);

					day = 1;
					month = 0;
					year = parseInt(target.text(), 10)||0;
					this.viewDate.setUTCFullYear(year);

					if (target.hasClass('year')){
						this._trigger('changeYear', this.viewDate);
						if (this.o.minViewMode === 2){
							this._setDate(UTCDate(year, month, day));
						}
					}
					if (target.hasClass('decade')){
						this._trigger('changeDecade', this.viewDate);
						if (this.o.minViewMode === 3){
							this._setDate(UTCDate(year, month, day));
						}
					}
					if (target.hasClass('century')){
						this._trigger('changeCentury', this.viewDate);
						if (this.o.minViewMode === 4){
							this._setDate(UTCDate(year, month, day));
						}
					}

					this.showMode(-1);
					this.fill();
				}
			}

			if (this.picker.is(':visible') && this._focused_from){
				$(this._focused_from).focus();
			}
			delete this._focused_from;
		},

		_toggle_multidate: function(date){
			var ix = this.dates.contains(date);
			if (!date){
				this.dates.clear();
			}

			if (ix !== -1){
				if (this.o.multidate === true || this.o.multidate > 1 || this.o.toggleActive){
					this.dates.remove(ix);
				}
			} else if (this.o.multidate === false) {
				this.dates.clear();
				this.dates.push(date);
			}
			else {
				this.dates.push(date);
			}

			if (typeof this.o.multidate === 'number')
				while (this.dates.length > this.o.multidate)
					this.dates.remove(0);
		},

		_setDate: function(date, which){
			if (!which || which === 'date')
				this._toggle_multidate(date && new Date(date));
			if (!which || which === 'view')
				this.viewDate = date && new Date(date);

			this.fill();
			this.setValue();
			if (!which || which !== 'view') {
				this._trigger('changeDate');
			}
			if (this.inputField){
				this.inputField.change();
			}
			if (this.o.autoclose && (!which || which === 'date')){
				this.hide();
			}
		},

		moveDay: function(date, dir){
			var newDate = new Date(date);
			newDate.setUTCDate(date.getUTCDate() + dir);

			return newDate;
		},

		moveWeek: function(date, dir){
			return this.moveDay(date, dir * 7);
		},

		moveMonth: function(date, dir){
			if (!isValidDate(date))
				return this.o.defaultViewDate;
			if (!dir)
				return date;
			var new_date = new Date(date.valueOf()),
				day = new_date.getUTCDate(),
				month = new_date.getUTCMonth(),
				mag = Math.abs(dir),
				new_month, test;
			dir = dir > 0 ? 1 : -1;
			if (mag === 1){
				test = dir === -1
					// If going back one month, make sure month is not current month
					// (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
					? function(){
						return new_date.getUTCMonth() === month;
					}
					// If going forward one month, make sure month is as expected
					// (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
					: function(){
						return new_date.getUTCMonth() !== new_month;
					};
				new_month = month + dir;
				new_date.setUTCMonth(new_month);
				// Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
				if (new_month < 0 || new_month > 11)
					new_month = (new_month + 12) % 12;
			}
			else {
				// For magnitudes >1, move one month at a time...
				for (var i=0; i < mag; i++)
					// ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
					new_date = this.moveMonth(new_date, dir);
				// ...then reset the day, keeping it in the new month
				new_month = new_date.getUTCMonth();
				new_date.setUTCDate(day);
				test = function(){
					return new_month !== new_date.getUTCMonth();
				};
			}
			// Common date-resetting loop -- if date is beyond end of month, make it
			// end of month
			while (test()){
				new_date.setUTCDate(--day);
				new_date.setUTCMonth(new_month);
			}
			return new_date;
		},

		moveYear: function(date, dir){
			return this.moveMonth(date, dir*12);
		},

		moveAvailableDate: function(date, dir, fn){
			do {
				date = this[fn](date, dir);

				if (!this.dateWithinRange(date))
					return false;

				fn = 'moveDay';
			}
			while (this.dateIsDisabled(date));

			return date;
		},

		weekOfDateIsDisabled: function(date){
			return $.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1;
		},

		dateIsDisabled: function(date){
			return (
				this.weekOfDateIsDisabled(date) ||
				$.grep(this.o.datesDisabled, function(d){
					return isUTCEquals(date, d);
				}).length > 0
			);
		},

		dateWithinRange: function(date){
			return date >= this.o.startDate && date <= this.o.endDate;
		},

		keydown: function(e){
			if (!this.picker.is(':visible')){
				if (e.keyCode === 40 || e.keyCode === 27) { // allow down to re-show picker
					this.show();
					e.stopPropagation();
        }
				return;
			}
			var dateChanged = false,
				dir, newViewDate,
				focusDate = this.focusDate || this.viewDate;
			switch (e.keyCode){
				case 27: // escape
					if (this.focusDate){
						this.focusDate = null;
						this.viewDate = this.dates.get(-1) || this.viewDate;
						this.fill();
					}
					else
						this.hide();
					e.preventDefault();
					e.stopPropagation();
					break;
				case 37: // left
				case 38: // up
				case 39: // right
				case 40: // down
					if (!this.o.keyboardNavigation || this.o.daysOfWeekDisabled.length === 7)
						break;
					dir = e.keyCode === 37 || e.keyCode === 38 ? -1 : 1;
          if (this.viewMode === 0) {
  					if (e.ctrlKey){
  						newViewDate = this.moveAvailableDate(focusDate, dir, 'moveYear');

  						if (newViewDate)
  							this._trigger('changeYear', this.viewDate);
  					}
  					else if (e.shiftKey){
  						newViewDate = this.moveAvailableDate(focusDate, dir, 'moveMonth');

  						if (newViewDate)
  							this._trigger('changeMonth', this.viewDate);
  					}
  					else if (e.keyCode === 37 || e.keyCode === 39){
  						newViewDate = this.moveAvailableDate(focusDate, dir, 'moveDay');
  					}
  					else if (!this.weekOfDateIsDisabled(focusDate)){
  						newViewDate = this.moveAvailableDate(focusDate, dir, 'moveWeek');
  					}
          } else if (this.viewMode === 1) {
            if (e.keyCode === 38 || e.keyCode === 40) {
              dir = dir * 4;
            }
            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveMonth');
          } else if (this.viewMode === 2) {
            if (e.keyCode === 38 || e.keyCode === 40) {
              dir = dir * 4;
            }
            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveYear');
          }
					if (newViewDate){
						this.focusDate = this.viewDate = newViewDate;
						this.setValue();
						this.fill();
						e.preventDefault();
					}
					break;
				case 13: // enter
					if (!this.o.forceParse)
						break;
					focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;
					if (this.o.keyboardNavigation) {
						this._toggle_multidate(focusDate);
						dateChanged = true;
					}
					this.focusDate = null;
					this.viewDate = this.dates.get(-1) || this.viewDate;
					this.setValue();
					this.fill();
					if (this.picker.is(':visible')){
						e.preventDefault();
						e.stopPropagation();
						if (this.o.autoclose)
							this.hide();
					}
					break;
				case 9: // tab
					this.focusDate = null;
					this.viewDate = this.dates.get(-1) || this.viewDate;
					this.fill();
					this.hide();
					break;
			}
			if (dateChanged){
				if (this.dates.length)
					this._trigger('changeDate');
				else
					this._trigger('clearDate');
				if (this.inputField){
					this.inputField.change();
				}
			}
		},

		showMode: function(dir){
			if (dir){
				this.viewMode = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, this.viewMode + dir));
			}
			this.picker
				.children('div')
				.hide()
				.filter('.datepicker-' + DPGlobal.modes[this.viewMode].clsName)
					.show();
			this.updateNavArrows();
		}
	};

	var DateRangePicker = function(element, options){
		$(element).data('datepicker', this);
		this.element = $(element);
		this.inputs = $.map(options.inputs, function(i){
			return i.jquery ? i[0] : i;
		});
		delete options.inputs;

		datepickerPlugin.call($(this.inputs), options)
			.on('changeDate', $.proxy(this.dateUpdated, this));

		this.pickers = $.map(this.inputs, function(i){
			return $(i).data('datepicker');
		});
		this.updateDates();
	};
	DateRangePicker.prototype = {
		updateDates: function(){
			this.dates = $.map(this.pickers, function(i){
				return i.getUTCDate();
			});
			this.updateRanges();
		},
		updateRanges: function(){
			var range = $.map(this.dates, function(d){
				return d.valueOf();
			});
			$.each(this.pickers, function(i, p){
				p.setRange(range);
			});
		},
		dateUpdated: function(e){
			// `this.updating` is a workaround for preventing infinite recursion
			// between `changeDate` triggering and `setUTCDate` calling.  Until
			// there is a better mechanism.
			if (this.updating)
				return;
			this.updating = true;

			var dp = $(e.target).data('datepicker');

			if (typeof(dp) === "undefined") {
				return;
			}

			var new_date = dp.getUTCDate(),
				i = $.inArray(e.target, this.inputs),
				j = i - 1,
				k = i + 1,
				l = this.inputs.length;
			if (i === -1)
				return;

			$.each(this.pickers, function(i, p){
				if (!p.getUTCDate())
					p.setUTCDate(new_date);
			});

			if (new_date < this.dates[j]){
				// Date being moved earlier/left
				while (j >= 0 && new_date < this.dates[j]){
					this.pickers[j--].setUTCDate(new_date);
				}
			}
			else if (new_date > this.dates[k]){
				// Date being moved later/right
				while (k < l && new_date > this.dates[k]){
					this.pickers[k++].setUTCDate(new_date);
				}
			}
			this.updateDates();

			delete this.updating;
		},
		remove: function(){
			$.map(this.pickers, function(p){ p.remove(); });
			delete this.element.data().datepicker;
		}
	};

	function opts_from_el(el, prefix){
		// Derive options from element data-attrs
		var data = $(el).data(),
			out = {}, inkey,
			replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');
		prefix = new RegExp('^' + prefix.toLowerCase());
		function re_lower(_,a){
			return a.toLowerCase();
		}
		for (var key in data)
			if (prefix.test(key)){
				inkey = key.replace(replace, re_lower);
				out[inkey] = data[key];
			}
		return out;
	}

	function opts_from_locale(lang){
		// Derive options from locale plugins
		var out = {};
		// Check if "de-DE" style date is available, if not language should
		// fallback to 2 letter code eg "de"
		if (!dates[lang]){
			lang = lang.split('-')[0];
			if (!dates[lang])
				return;
		}
		var d = dates[lang];
		$.each(locale_opts, function(i,k){
			if (k in d)
				out[k] = d[k];
		});
		return out;
	}

	var old = $.fn.datepicker;
	var datepickerPlugin = function(option){
		var args = Array.apply(null, arguments);
		args.shift();
		var internal_return;
		this.each(function(){
			var $this = $(this),
				data = $this.data('datepicker'),
				options = typeof option === 'object' && option;
			if (!data){
				var elopts = opts_from_el(this, 'date'),
					// Preliminary otions
					xopts = $.extend({}, defaults, elopts, options),
					locopts = opts_from_locale(xopts.language),
					// Options priority: js args, data-attrs, locales, defaults
					opts = $.extend({}, defaults, locopts, elopts, options);
				if ($this.hasClass('input-daterange') || opts.inputs){
					$.extend(opts, {
						inputs: opts.inputs || $this.find('input').toArray()
					});
					data = new DateRangePicker(this, opts);
				}
				else {
					data = new Datepicker(this, opts);
				}
				$this.data('datepicker', data);
			}
			if (typeof option === 'string' && typeof data[option] === 'function'){
				internal_return = data[option].apply(data, args);
			}
		});

		if (
			internal_return === undefined ||
			internal_return instanceof Datepicker ||
			internal_return instanceof DateRangePicker
		)
			return this;

		if (this.length > 1)
			throw new Error('Using only allowed for the collection of a single element (' + option + ' function)');
		else
			return internal_return;
	};
	$.fn.datepicker = datepickerPlugin;

	var defaults = $.fn.datepicker.defaults = {
		assumeNearbyYear: false,
		autoclose: false,
		beforeShowDay: $.noop,
		beforeShowMonth: $.noop,
		beforeShowYear: $.noop,
		beforeShowDecade: $.noop,
		beforeShowCentury: $.noop,
		calendarWeeks: false,
		clearBtn: false,
		toggleActive: false,
		daysOfWeekDisabled: [],
		daysOfWeekHighlighted: [],
		datesDisabled: [],
		endDate: Infinity,
		forceParse: true,
		format: 'mm/dd/yyyy',
		keyboardNavigation: true,
		language: 'en',
		minViewMode: 0,
		maxViewMode: 4,
		multidate: false,
		multidateSeparator: ',',
		orientation: "auto",
		rtl: false,
		startDate: -Infinity,
		startView: 0,
		todayBtn: false,
		todayHighlight: false,
		weekStart: 0,
		disableTouchKeyboard: false,
		enableOnReadonly: true,
		showOnFocus: true,
		zIndexOffset: 10,
		container: 'body',
		immediateUpdates: false,
		title: '',
		templates: {
			leftArrow: '&laquo;',
			rightArrow: '&raquo;'
		}
	};
	var locale_opts = $.fn.datepicker.locale_opts = [
		'format',
		'rtl',
		'weekStart'
	];
	$.fn.datepicker.Constructor = Datepicker;
	var dates = $.fn.datepicker.dates = {
		en: {
			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			today: "Today",
			clear: "Clear",
			titleFormat: "MM yyyy"
		}
	};

	var DPGlobal = {
		modes: [
			{
				clsName: 'days',
				navFnc: 'Month',
				navStep: 1
			},
			{
				clsName: 'months',
				navFnc: 'FullYear',
				navStep: 1
			},
			{
				clsName: 'years',
				navFnc: 'FullYear',
				navStep: 10
			},
			{
				clsName: 'decades',
				navFnc: 'FullDecade',
				navStep: 100
			},
			{
				clsName: 'centuries',
				navFnc: 'FullCentury',
				navStep: 1000
		}],
		isLeapYear: function(year){
			return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
		},
		getDaysInMonth: function(year, month){
			return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
		},
		validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
		nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
		parseFormat: function(format){
			if (typeof format.toValue === 'function' && typeof format.toDisplay === 'function')
                return format;
            // IE treats \0 as a string end in inputs (truncating the value),
			// so it's a bad format delimiter, anyway
			var separators = format.replace(this.validParts, '\0').split('\0'),
				parts = format.match(this.validParts);
			if (!separators || !separators.length || !parts || parts.length === 0){
				throw new Error("Invalid date format.");
			}
			return {separators: separators, parts: parts};
		},
		parseDate: function(date, format, language, assumeNearby){
			if (!date)
				return undefined;
			if (date instanceof Date)
				return date;
			if (typeof format === 'string')
				format = DPGlobal.parseFormat(format);
			if (format.toValue)
                return format.toValue(date, format, language);
            var part_re = /([\-+]\d+)([dmwy])/,
				parts = date.match(/([\-+]\d+)([dmwy])/g),
				fn_map = {
					d: 'moveDay',
					m: 'moveMonth',
					w: 'moveWeek',
					y: 'moveYear'
				},
				dateAliases = {
					yesterday: '-1d',
					today: '+0d',
					tomorrow: '+1d'
				},
				part, dir, i, fn;
			if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)){
				date = new Date();
				for (i=0; i < parts.length; i++){
					part = part_re.exec(parts[i]);
					dir = parseInt(part[1]);
					fn = fn_map[part[2]];
					date = Datepicker.prototype[fn](date, dir);
				}
				return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
			}

			if (typeof dateAliases[date] !== 'undefined') {
				date = dateAliases[date];
				parts = date.match(/([\-+]\d+)([dmwy])/g);

				if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)){
					date = new Date();
				  	for (i=0; i < parts.length; i++){
						part = part_re.exec(parts[i]);
						dir = parseInt(part[1]);
						fn = fn_map[part[2]];
						date = Datepicker.prototype[fn](date, dir);
				  	}

			  		return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
				}
			}

			parts = date && date.match(this.nonpunctuation) || [];
			date = new Date();

			function applyNearbyYear(year, threshold){
				if (threshold === true)
					threshold = 10;

				// if year is 2 digits or less, than the user most likely is trying to get a recent century
				if (year < 100){
					year += 2000;
					// if the new year is more than threshold years in advance, use last century
					if (year > ((new Date()).getFullYear()+threshold)){
						year -= 100;
					}
				}

				return year;
			}

			var parsed = {},
				setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
				setters_map = {
					yyyy: function(d,v){
						return d.setUTCFullYear(assumeNearby ? applyNearbyYear(v, assumeNearby) : v);
					},
					yy: function(d,v){
						return d.setUTCFullYear(assumeNearby ? applyNearbyYear(v, assumeNearby) : v);
					},
					m: function(d,v){
						if (isNaN(d))
							return d;
						v -= 1;
						while (v < 0) v += 12;
						v %= 12;
						d.setUTCMonth(v);
						while (d.getUTCMonth() !== v)
							d.setUTCDate(d.getUTCDate()-1);
						return d;
					},
					d: function(d,v){
						return d.setUTCDate(v);
					}
				},
				val, filtered;
			setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
			setters_map['dd'] = setters_map['d'];
			date = UTCToday();
			var fparts = format.parts.slice();
			// Remove noop parts
			if (parts.length !== fparts.length){
				fparts = $(fparts).filter(function(i,p){
					return $.inArray(p, setters_order) !== -1;
				}).toArray();
			}
			// Process remainder
			function match_part(){
				var m = this.slice(0, parts[i].length),
					p = parts[i].slice(0, m.length);
				return m.toLowerCase() === p.toLowerCase();
			}
			if (parts.length === fparts.length){
				var cnt;
				for (i=0, cnt = fparts.length; i < cnt; i++){
					val = parseInt(parts[i], 10);
					part = fparts[i];
					if (isNaN(val)){
						switch (part){
							case 'MM':
								filtered = $(dates[language].months).filter(match_part);
								val = $.inArray(filtered[0], dates[language].months) + 1;
								break;
							case 'M':
								filtered = $(dates[language].monthsShort).filter(match_part);
								val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
								break;
						}
					}
					parsed[part] = val;
				}
				var _date, s;
				for (i=0; i < setters_order.length; i++){
					s = setters_order[i];
					if (s in parsed && !isNaN(parsed[s])){
						_date = new Date(date);
						setters_map[s](_date, parsed[s]);
						if (!isNaN(_date))
							date = _date;
					}
				}
			}
			return date;
		},
		formatDate: function(date, format, language){
			if (!date)
				return '';
			if (typeof format === 'string')
				format = DPGlobal.parseFormat(format);
			if (format.toDisplay)
                return format.toDisplay(date, format, language);
            var val = {
				d: date.getUTCDate(),
				D: dates[language].daysShort[date.getUTCDay()],
				DD: dates[language].days[date.getUTCDay()],
				m: date.getUTCMonth() + 1,
				M: dates[language].monthsShort[date.getUTCMonth()],
				MM: dates[language].months[date.getUTCMonth()],
				yy: date.getUTCFullYear().toString().substring(2),
				yyyy: date.getUTCFullYear()
			};
			val.dd = (val.d < 10 ? '0' : '') + val.d;
			val.mm = (val.m < 10 ? '0' : '') + val.m;
			date = [];
			var seps = $.extend([], format.separators);
			for (var i=0, cnt = format.parts.length; i <= cnt; i++){
				if (seps.length)
					date.push(seps.shift());
				date.push(val[format.parts[i]]);
			}
			return date.join('');
		},
		headTemplate: '<thead>'+
			              '<tr>'+
			                '<th colspan="7" class="datepicker-title"></th>'+
			              '</tr>'+
							'<tr>'+
								'<th class="prev">&laquo;</th>'+
								'<th colspan="5" class="datepicker-switch"></th>'+
								'<th class="next">&raquo;</th>'+
							'</tr>'+
						'</thead>',
		contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
		footTemplate: '<tfoot>'+
							'<tr>'+
								'<th colspan="7" class="today"></th>'+
							'</tr>'+
							'<tr>'+
								'<th colspan="7" class="clear"></th>'+
							'</tr>'+
						'</tfoot>'
	};
	DPGlobal.template = '<div class="datepicker">'+
							'<div class="datepicker-days">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									'<tbody></tbody>'+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-months">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-years">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-decades">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-centuries">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
						'</div>';

	$.fn.datepicker.DPGlobal = DPGlobal;


	/* DATEPICKER NO CONFLICT
	* =================== */

	$.fn.datepicker.noConflict = function(){
		$.fn.datepicker = old;
		return this;
	};

	/* DATEPICKER VERSION
	 * =================== */
	$.fn.datepicker.version = '1.6.4';

	/* DATEPICKER DATA-API
	* ================== */

	$(document).on(
		'focus.datepicker.data-api click.datepicker.data-api',
		'[data-provide="datepicker"]',
		function(e){
			var $this = $(this);
			if ($this.data('datepicker'))
				return;
			e.preventDefault();
			// component click requires us to explicitly show it
			datepickerPlugin.call($this, 'show');
		}
	);
	$(function(){
		datepickerPlugin.call($('[data-provide="datepicker-inline"]'));
	});

}));
/**
 * Arabic translation for bootstrap-datepicker
 * Mohammed Alshehri <alshehri866@gmail.com>
 */

;(function($){
    $.fn.datepicker.dates['ar'] = {
        days: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"],
        daysShort: ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت", "أحد"],
        daysMin: ["ح", "ن", "ث", "ع", "خ", "ج", "س", "ح"],
        months: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
        monthsShort: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
        today: "هذا اليوم",
        rtl: true
    };
}(jQuery));
// Azerbaijani
;(function($){
    $.fn.datepicker.dates['az'] = {
        days: ["Bazar", "Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə"],
        daysShort: ["B.", "B.e", "Ç.a", "Ç.", "C.a", "C.", "Ş."],
        daysMin: ["B.", "B.e", "Ç.a", "Ç.", "C.a", "C.", "Ş."],
        months: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun", "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"],
        monthsShort: ["Yan", "Fev", "Mar", "Apr", "May", "İyun", "İyul", "Avq", "Sen", "Okt", "Noy", "Dek"],
        today: "Bu gün",
        weekStart: 1
    };
}(jQuery));
/**
 * Bulgarian translation for bootstrap-datepicker
 * Apostol Apostolov <apostol.s.apostolov@gmail.com>
 */

;(function($){
	$.fn.datepicker.dates['bg'] = {
		days: ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота"],
		daysShort: ["Нед", "Пон", "Вто", "Сря", "Чет", "Пет", "Съб"],
		daysMin: ["Н", "П", "В", "С", "Ч", "П", "С"],
		months: ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"],
		monthsShort: ["Ян", "Фев", "Мар", "Апр", "Май", "Юни", "Юли", "Авг", "Сеп", "Окт", "Ное", "Дек"],
		today: "днес"
	};
}(jQuery));
/**
 * Bosnian translation for bootstrap-datepicker
 */

;(function($){
	$.fn.datepicker.dates['bs'] = {
		days: ["Nedjelja","Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"],
		daysShort: ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"],
		daysMin: ["N", "Po", "U", "Sr", "Č", "Pe", "Su"],
		months: ["Januar", "Februar", "Mart", "April", "Maj", "Juni", "Juli", "August", "Septembar", "Oktobar", "Novembar", "Decembar"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
		today: "Danas",
		weekStart: 1,
		format: "dd.mm.yyyy"
	};
}(jQuery));
/**
 * Catalan translation for bootstrap-datepicker
 * J. Garcia <jogaco.en@gmail.com>
 */

;(function($){
	$.fn.datepicker.dates['ca'] = {
		days: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"],
		daysShort: ["Diu",  "Dil", "Dmt", "Dmc", "Dij", "Div", "Dis"],
		daysMin: ["dg", "dl", "dt", "dc", "dj", "dv", "ds"],
		months: ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"],
		monthsShort: ["Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des"],
		today: "Avui",
		monthsTitle: "Mesos",
		clear: "Esborrar",
		weekStart: 1,
		format: "dd/mm/yyyy"
	};
}(jQuery));
/**
 * Czech translation for bootstrap-datepicker
 * Matěj Koubík <matej@koubik.name>
 * Fixes by Michal Remiš <michal.remis@gmail.com>
 */

;(function($){
	$.fn.datepicker.dates['cs'] = {
		days: ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"],
		daysShort: ["Ned", "Pon", "Úte", "Stř", "Čtv", "Pát", "Sob"],
		daysMin: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"],
		months: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"],
		monthsShort: ["Led", "Úno", "Bře", "Dub", "Kvě", "Čer", "Čnc", "Srp", "Zář", "Říj", "Lis", "Pro"],
		today: "Dnes",
		clear: "Vymazat",
		weekStart: 1,
		format: "dd.m.yyyy"
	};
}(jQuery));
/**
 * Welsh translation for bootstrap-datepicker
 * S. Morris <s.morris@bangor.ac.uk>
 */

;(function($){
	$.fn.datepicker.dates['cy'] = {
		days: ["Sul", "Llun", "Mawrth", "Mercher", "Iau", "Gwener", "Sadwrn"],
		daysShort: ["Sul", "Llu", "Maw", "Mer", "Iau", "Gwe", "Sad"],
		daysMin: ["Su", "Ll", "Ma", "Me", "Ia", "Gwe", "Sa"],
		months: ["Ionawr", "Chewfror", "Mawrth", "Ebrill", "Mai", "Mehefin", "Gorfennaf", "Awst", "Medi", "Hydref", "Tachwedd", "Rhagfyr"],
		monthsShort: ["Ion", "Chw", "Maw", "Ebr", "Mai", "Meh", "Gor", "Aws", "Med", "Hyd", "Tach", "Rha"],
		today: "Heddiw"
	};
}(jQuery));
/**
 * Danish translation for bootstrap-datepicker
 * Christian Pedersen <http://github.com/chripede>
 * Ivan Mylyanyk <https://github.com/imylyanyk>
 */

;(function($){
	$.fn.datepicker.dates['da'] = {
		days: ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"],
		daysShort: ["søn", "man", "tir", "ons", "tor", "fre", "lør"],
		daysMin: ["sø", "ma", "ti", "on", "to", "fr", "lø"],
		months: ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"],
		monthsShort: ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
		today: "I Dag",
		clear: "Nulstil"
	};
}(jQuery));
/**
 * German translation for bootstrap-datepicker
 * Sam Zurcher <sam@orelias.ch>
 */

;(function($){
	$.fn.datepicker.dates['de'] = {
		days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
		daysShort: ["Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam"],
		daysMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
		months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
		monthsShort: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
		today: "Heute",
		monthsTitle: "Monate",
		clear: "Löschen",
		weekStart: 1,
		format: "dd.mm.yyyy"
	};
}(jQuery));
/**
 * Greek translation for bootstrap-datepicker
 */

;(function($){
  $.fn.datepicker.dates['el'] = {
    days: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"],
    daysShort: ["Κυρ", "Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ"],
    daysMin: ["Κυ", "Δε", "Τρ", "Τε", "Πε", "Πα", "Σα"],
    months: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"],
    monthsShort: ["Ιαν", "Φεβ", "Μαρ", "Απρ", "Μάι", "Ιουν", "Ιουλ", "Αυγ", "Σεπ", "Οκτ", "Νοε", "Δεκ"],
    today: "Σήμερα",
    clear: "Καθαρισμός",
    weekStart: 1,
    format: "d/m/yyyy"
  };
}(jQuery));
/**
 * Australian English translation for bootstrap-datepicker
 * Steve Chapman <steven.p.chapman@gmail.com>
 */

;(function($){
	$.fn.datepicker.dates['en-AU'] = {
		days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
		months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		today: "Today",
		monthsTitle: "Months",
		clear: "Clear",
		weekStart: 1,
		format: "d/mm/yyyy"
	};
}(jQuery));
/**
 * British English translation for bootstrap-datepicker
 * Xavier Dutreilh <xavier@dutreilh.com>
 */

;(function($){
	$.fn.datepicker.dates['en-GB'] = {
		days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
		months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		today: "Today",
		monthsTitle: "Months",
		clear: "Clear",
		weekStart: 1,
		format: "dd/mm/yyyy"
	};
}(jQuery));
/**
 * Irish English translation for bootstrap-datepicker
 */

;(function($){
	$.fn.datepicker.dates['en-IE'] = {
		days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
		months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		today: "Today",
		monthsTitle: "Months",
		clear: "Clear",
		weekStart: 1,
		format: "dd/mm/yyyy"
	};
}(jQuery));
/**
 * New Zealand English translation for bootstrap-datepicker
 */

;(function($){
	$.fn.datepicker.dates['en-NZ'] = {
		days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
		months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		today: "Today",
		monthsTitle: "Months",
		clear: "Clear",
		weekStart: 1,
		format: "d/mm/yyyy"
	};
}(jQuery));
/**
 * South African English translation for bootstrap-datepicker
 */

;(function($){
	$.fn.datepicker.dates['en-ZA'] = {
		days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
		months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		today: "Today",
		monthsTitle: "Months",
		clear: "Clear",
		weekStart: 1,
		format: "yyyy/mm/d"
	};
}(jQuery));
/**
 * Esperanto translation for bootstrap-datepicker
 * Emmanuel Debanne <https://github.com/debanne>
 */

;(function($){
	$.fn.datepicker.dates['eo'] = {
		days: ["dimanĉo", "lundo", "mardo", "merkredo", "ĵaŭdo", "vendredo", "sabato"],
		daysShort: ["dim.", "lun.", "mar.", "mer.", "ĵaŭ.", "ven.", "sam."],
		daysMin: ["d", "l", "ma", "me", "ĵ", "v", "s"],
		months: ["januaro", "februaro", "marto", "aprilo", "majo", "junio", "julio", "aŭgusto", "septembro", "oktobro", "novembro", "decembro"],
		monthsShort: ["jan.", "feb.", "mar.", "apr.", "majo", "jun.", "jul.", "aŭg.", "sep.", "okt.", "nov.", "dec."],
		today: "Hodiaŭ",
		clear: "Nuligi",
		weekStart: 1,
		format: "yyyy-mm-dd"
	};
}(jQuery));
/**
 * Spanish translation for bootstrap-datepicker
 * Bruno Bonamin <bruno.bonamin@gmail.com>
 */

;(function($){
	$.fn.datepicker.dates['es'] = {
		days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
		daysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
		daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
		months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
		monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
		today: "Hoy",
		monthsTitle: "Meses",
		clear: "Borrar",
		weekStart: 1,
		format: "dd/mm/yyyy"
	};
}(jQuery));
/**
 * Estonian translation for bootstrap-datepicker
 * Ando Roots <https://github.com/anroots>
 * Fixes by Illimar Tambek <<https://github.com/ragulka>
 */

;(function($){
	$.fn.datepicker.dates['et'] = {
		days: ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"],
		daysShort: ["Pühap", "Esmasp", "Teisip", "Kolmap", "Neljap", "Reede", "Laup"],
		daysMin: ["P", "E", "T", "K", "N", "R", "L"],
		months: ["Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"],
		monthsShort: ["Jaan", "Veebr", "Märts", "Apr", "Mai", "Juuni", "Juuli", "Aug", "Sept", "Okt", "Nov", "Dets"],
		today: "Täna",
		clear: "Tühjenda",
		weekStart: 1,
		format: "dd.mm.yyyy"
	};
}(jQuery));
/**
 * Basque translation for bootstrap-datepicker
 * Arkaitz Etxeberria <kondi80@gmail.com>
 */

;(function($){
    $.fn.datepicker.dates['eu'] = {
        days: ['Igandea', 'Astelehena', 'Asteartea', 'Asteazkena', 'Osteguna', 'Ostirala', 'Larunbata'],
        daysShort: ['Ig', 'Al', 'Ar', 'Az', 'Og', 'Ol', 'Lr'],
        daysMin: ['Ig', 'Al', 'Ar', 'Az', 'Og', 'Ol', 'Lr'],
        months: ['Urtarrila', 'Otsaila', 'Martxoa', 'Apirila', 'Maiatza', 'Ekaina', 'Uztaila', 'Abuztua', 'Iraila', 'Urria', 'Azaroa', 'Abendua'],
        monthsShort: ['Urt', 'Ots', 'Mar', 'Api', 'Mai', 'Eka', 'Uzt', 'Abu', 'Ira', 'Urr', 'Aza', 'Abe'],
        today: "Gaur"
    };
}(jQuery));

/**
 * Persian translation for bootstrap-datepicker
 * Mostafa Rokooie <mostafa.rokooie@gmail.com>
 */

;(function($){
	$.fn.datepicker.dates['fa'] = {
		days: ["یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه", "یک‌شنبه"],
		daysShort: ["یک", "دو", "سه", "چهار", "پنج", "جمعه", "شنبه", "یک"],
		daysMin: ["ی", "د", "س", "چ", "پ", "ج", "ش", "ی"],
		months: ["ژانویه", "فوریه", "مارس", "آوریل", "مه", "ژوئن", "ژوئیه", "اوت", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"],
		monthsShort: ["ژان", "فور", "مار", "آور", "مه", "ژون", "ژوی", "اوت", "سپت", "اکت", "نوا", "دسا"],
		today: "امروز",
		clear: "پاک کن",
		weekStart: 1,
		format: "yyyy/mm/dd"
	};
}(jQuery));
/**
 * Finnish translation for bootstrap-datepicker
 * Jaakko Salonen <https://github.com/jsalonen>
 */

;(function($){
	$.fn.datepicker.dates['fi'] = {
		days: ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"],
		daysShort: ["sun", "maa", "tii", "kes", "tor", "per", "lau"],
		daysMin: ["su", "ma", "ti", "ke", "to", "pe", "la"],
		months: ["tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu", "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu"],
		monthsShort: ["tam", "hel", "maa", "huh", "tou", "kes", "hei", "elo", "syy", "lok", "mar", "jou"],
		today: "tänään",
		clear: "Tyhjennä",
		weekStart: 1,
		format: "d.m.yyyy"
	};
}(jQuery));
/**
 * Faroese translation for bootstrap-datepicker
 * Theodor Johannesen <http://github.com/theodorjohannesen>
 */

;(function($){
	$.fn.datepicker.dates['fo'] = {
		days: ["Sunnudagur", "Mánadagur", "Týsdagur", "Mikudagur", "Hósdagur", "Fríggjadagur", "Leygardagur"],
		daysShort: ["Sun", "Mán", "Týs", "Mik", "Hós", "Frí", "Ley"],
		daysMin: ["Su", "Má", "Tý", "Mi", "Hó", "Fr", "Le"],
		months: ["Januar", "Februar", "Marts", "Apríl", "Mei", "Juni", "Juli", "August", "Septembur", "Oktobur", "Novembur", "Desembur"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"],
		today: "Í Dag",
		clear: "Reinsa"
	};
}(jQuery));
/**
 * French (Switzerland) translation for bootstrap-datepicker
 * Christoph Jossi <c.jossi@ascami.ch>
 * Based on 
 * French translation for bootstrap-datepicker
 * Nico Mollet <nico.mollet@gmail.com>
 */

;(function($){
	$.fn.datepicker.dates['fr'] = {
		days: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
		daysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
		daysMin: ["D", "L", "Ma", "Me", "J", "V", "S"],
		months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
		monthsShort: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jui", "Jul", "Aou", "Sep", "Oct", "Nov", "Déc"],
		today: "Aujourd'hui",
		monthsTitle: "Mois",
		clear: "Effacer",
		weekStart: 1,
		format: "dd.mm.yyyy"
	};
}(jQuery));
/**
 * French translation for bootstrap-datepicker
 * Nico Mollet <nico.mollet@gmail.com>
 */

;(function($){
	$.fn.datepicker.dates['fr'] = {
		days: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
		daysShort: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
		daysMin: ["d", "l", "ma", "me", "j", "v", "s"],
		months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
		monthsShort: ["janv.", "févr.", "mars", "avril", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
		today: "Aujourd'hui",
		monthsTitle: "Mois",
		clear: "Effacer",
		weekStart: 1,
		format: "dd/mm/yyyy"
	};
}(jQuery));
;(function($){
	$.fn.datepicker.dates['gl'] = {
		days: ["Domingo", "Luns", "Martes", "Mércores", "Xoves", "Venres", "Sábado"],
		daysShort: ["Dom", "Lun", "Mar", "Mér", "Xov", "Ven", "Sáb"],
		daysMin: ["Do", "Lu", "Ma", "Me", "Xo", "Ve", "Sa"],
		months: ["Xaneiro", "Febreiro", "Marzo", "Abril", "Maio", "Xuño", "Xullo", "Agosto", "Setembro", "Outubro", "Novembro", "Decembro"],
		monthsShort: ["Xan", "Feb", "Mar", "Abr", "Mai", "Xun", "Xul", "Ago", "Sep", "Out", "Nov", "Dec"],
		today: "Hoxe",
		clear: "Limpar",
		weekStart: 1,
		format: "dd/mm/yyyy"
	};
}(jQuery));
/**
 * Hebrew translation for bootstrap-datepicker
 * Sagie Maoz <sagie@maoz.info>
 */

;(function($){
  $.fn.datepicker.dates['he'] = {
      days: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת", "ראשון"],
      daysShort: ["א", "ב", "ג", "ד", "ה", "ו", "ש", "א"],
      daysMin: ["א", "ב", "ג", "ד", "ה", "ו", "ש", "א"],
      months: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
      monthsShort: ["ינו", "פבר", "מרץ", "אפר", "מאי", "יונ", "יול", "אוג", "ספט", "אוק", "נוב", "דצמ"],
      today: "היום",
      rtl: true
  };
}(jQuery));
/**
 * Croatian localisation
 */

;(function($){
	$.fn.datepicker.dates['hr'] = {
		days: ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"],
		daysShort: ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"],
		daysMin: ["Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su"],
		months: ["Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"],
		monthsShort: ["Sij", "Velj", "Ožu", "Tra", "Svi", "Lip", "Srp", "Kol", "Ruj", "Lis", "Stu", "Pro"],
		today: "Danas"
	};
}(jQuery));
/**
 * Hungarian translation for bootstrap-datepicker
 * Sotus László <lacisan@gmail.com>
 */

;(function($){
  $.fn.datepicker.dates['hu'] = {
		days: ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"],
		daysShort: ["vas", "hét", "ked", "sze", "csü", "pén", "szo"],
		daysMin: ["V", "H", "K", "Sze", "Cs", "P", "Szo"],
		months: ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"],
		monthsShort: ["jan", "feb", "már", "ápr", "máj", "jún", "júl", "aug", "sze", "okt", "nov", "dec"],
		today: "ma",
		weekStart: 1,
		clear: "töröl",
		titleFormat: "yyyy. MM",
		format: "yyyy.mm.dd"
	};
}(jQuery));
/**
 * Armenian translation for bootstrap-datepicker
 * Hayk Chamyan <hamshen@gmail.com>
 */

;(function($){
	$.fn.datepicker.dates['hy'] = {
		days: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"],
		daysShort: ["Կրկ", "Երկ", "Երք", "Չրք", "Հնգ", "Ուր", "Շբթ"],
		daysMin: ["Կրկ", "Երկ", "Երք", "Չրք", "Հնգ", "Ուր", "Շբթ"],
		months: ["Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս", "Հուլիս", "Օգոստոս", "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր"],
		monthsShort: ["Հուն", "Փետ", "Մար", "Ապր", "Մայ", "Հնս", "Հլս", "Օգս", "Սեպ", "Հոկ", "Նմբ", "Դեկ"],
		today: "Այսօր",
		clear: "Ջնջել",
		format: "dd.mm.yyyy",
		weekStart: 1
	};
}(jQuery));
/**
 * Bahasa translation for bootstrap-datepicker
 * Azwar Akbar <azwar.akbar@gmail.com>
 */

;(function($){
	$.fn.datepicker.dates['id'] = {
		days: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
		daysShort: ["Mgu", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
		daysMin: ["Mg", "Sn", "Sl", "Ra", "Ka", "Ju", "Sa"],
		months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"],
		today: "Hari Ini",
		clear: "Kosongkan"
	};
}(jQuery));
/**
 * Icelandic translation for bootstrap-datepicker
 * Hinrik Örn Sigurðsson <hinrik.sig@gmail.com>
 */

;(function($){
	$.fn.datepicker.dates['is'] = {
		days: ["Sunnudagur", "Mánudagur", "Þriðjudagur", "Miðvikudagur", "Fimmtudagur", "Föstudagur", "Laugardagur"],
		daysShort: ["Sun", "Mán", "Þri", "Mið", "Fim", "Fös", "Lau"],
		daysMin: ["Su", "Má", "Þr", "Mi", "Fi", "Fö", "La"],
		months: ["Janúar", "Febrúar", "Mars", "Apríl", "Maí", "Júní", "Júlí", "Ágúst", "September", "Október", "Nóvember", "Desember"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maí", "Jún", "Júl", "Ágú", "Sep", "Okt", "Nóv", "Des"],
		today: "Í Dag"
	};
}(jQuery));
/**
 * Italian (Switzerland) translation for bootstrap-datepicker
 * Christoph Jossi <c.jossi@ascami.ch>
 * Based on 
 * Italian translation for bootstrap-datepicker
 * Enrico Rubboli <rubboli@gmail.com>
 */

;(function($){
	$.fn.datepicker.dates['it'] = {
		days: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
		daysShort: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
		daysMin: ["Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa"],
		months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
		monthsShort: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
		today: "Oggi",
		clear: "Cancella",
		weekStart: 1,
		format: "dd.mm.yyyy"
	};
}(jQuery));
/**
 * Italian translation for bootstrap-datepicker
 * Enrico Rubboli <rubboli@gmail.com>
 */

;(function($){
	$.fn.datepicker.dates['it'] = {
		days: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
		daysShort: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
		daysMin: ["Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa"],
		months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
		monthsShort: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
		today: "Oggi",
		monthsTitle: "Mesi",
		clear: "Cancella",
		weekStart: 1,
		format: "dd/mm/yyyy"
	};
}(jQuery));
/**
 * Japanese translation for bootstrap-datepicker
 * Norio Suzuki <https://github.com/suzuki/>
 */

;(function($){
	$.fn.datepicker.dates['ja'] = {
		days: ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"],
		daysShort: ["日", "月", "火", "水", "木", "金", "土"],
		daysMin: ["日", "月", "火", "水", "木", "金", "土"],
		months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
		monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
		today: "今日",
		format: "yyyy/mm/dd",
		titleFormat: "yyyy年mm月",
		clear: "クリア"
	};
}(jQuery));
/**
 * Georgian translation for bootstrap-datepicker
 * Levan Melikishvili <levani0101@yahoo.com>
 */

;(function($){
    $.fn.datepicker.dates['ka'] = {
        days: ["კვირა", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი"],
        daysShort: ["კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"],
        daysMin: ["კვ", "ორ", "სა", "ოთ", "ხუ", "პა", "შა"],
        months: ["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომები", "ნოემბერი", "დეკემბერი"],
        monthsShort: ["იან", "თებ", "მარ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ"],
        today: "დღეს",
        clear: "გასუფთავება",
        weekStart: 1,
        format: "dd.mm.yyyy"
    };
}(jQuery));
/**
 * Cambodia (Khmer) translation for bootstrap-datepicker
 * Lytay TOUCH <lytaytouch@gmail.com>
 */

;(function($){
	$.fn.datepicker.dates['kh'] = {
		days: ["អាទិត្យ", "ចន្ទ", "អង្គារ", "ពុធ", "ព្រហស្បតិ៍", "សុក្រ", "សៅរ៍", "អាទិត្យ"],
		daysShort: ["អា.ទិ", "ចន្ទ", "អង្គារ", "ពុធ", "ព្រ.ហ", "សុក្រ", "សៅរ៍", "អា.ទិ"],
		daysMin: ["អា.ទិ", "ចន្ទ", "អង្គារ", "ពុធ", "ព្រ.ហ", "សុក្រ", "សៅរ៍", "អា.ទិ"],
		months: ["មករា", "កុម្ភះ", "មិនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"],
		monthsShort: ["មករា", "កុម្ភះ", "មិនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"],
		today: "ថ្ងៃនេះ",
		clear: "សំអាត"
	};
}(jQuery));
/**
 * Kazakh translation for bootstrap-datepicker
 * Yerzhan Tolekov <era.tolekov@gmail.com>
 */

;(function($){
	$.fn.datepicker.dates['kk'] = {
		days: ["Жексенбі", "Дүйсенбі", "Сейсенбі", "Сәрсенбі", "Бейсенбі", "Жұма", "Сенбі"],
		daysShort: ["Жек", "Дүй", "Сей", "Сәр", "Бей", "Жұм", "Сен"],
		daysMin: ["Жк", "Дс", "Сс", "Ср", "Бс", "Жм", "Сн"],
		months: ["Қаңтар", "Ақпан", "Наурыз", "Сәуір", "Мамыр", "Маусым", "Шілде", "Тамыз", "Қыркүйек", "Қазан", "Қараша", "Желтоқсан"],
		monthsShort: ["Қаң", "Ақп", "Нау", "Сәу", "Мам", "Мау", "Шіл", "Там", "Қыр", "Қаз", "Қар", "Жел"],
		today: "Бүгін",
		weekStart: 1
	};
}(jQuery));
/**
 * Korean translation for bootstrap-datepicker
 * This is a port from https://github.com/moment/moment/blob/develop/src/locale/ko.js
 */

;(function($){
	$.fn.datepicker.dates['ko'] = {
		days: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
		daysShort: ["일", "월", "화", "수", "목", "금", "토"],
		daysMin: ["일", "월", "화", "수", "목", "금", "토"],
		months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
		monthsShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
		today: "오늘",
		clear: "삭제",
		format: "yyyy-mm-dd",
		titleFormat: "yyyy년mm월",
		weekStart: 0
	};
}(jQuery));
/**
 * Korean translation for bootstrap-datepicker
 * Gu Youn <http://github.com/guyoun>
 *
 * DEPRECATED: This language code 'kr' is deprecated and will be removed in 2.0.
 * Korean support is now in a 'ko' translation file to follow the ISO language
 * code - http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
 */

;(function($){
	$.fn.datepicker.dates['kr'] = {
		days: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
		daysShort: ["일", "월", "화", "수", "목", "금", "토"],
		daysMin: ["일", "월", "화", "수", "목", "금", "토"],
		months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
		monthsShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
	};
}(jQuery));
/**
 * Lithuanian translation for bootstrap-datepicker
 * Šarūnas Gliebus <ssharunas@yahoo.co.uk>
 */


;(function($){
    $.fn.datepicker.dates['lt'] = {
        days: ["Sekmadienis", "Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis"],
        daysShort: ["S", "Pr", "A", "T", "K", "Pn", "Š"],
        daysMin: ["Sk", "Pr", "An", "Tr", "Ke", "Pn", "Št"],
        months: ["Sausis", "Vasaris", "Kovas", "Balandis", "Gegužė", "Birželis", "Liepa", "Rugpjūtis", "Rugsėjis", "Spalis", "Lapkritis", "Gruodis"],
        monthsShort: ["Sau", "Vas", "Kov", "Bal", "Geg", "Bir", "Lie", "Rugp", "Rugs", "Spa", "Lap", "Gru"],
        today: "Šiandien",
        monthsTitle:"Mėnesiai",
        clear:"Išvalyti",
        weekStart: 1,
        format:"yyyy-mm-dd"
    };
}(jQuery));
/**
 * Latvian translation for bootstrap-datepicker
 * Artis Avotins <artis@apit.lv>
 */


;(function($){
    $.fn.datepicker.dates['lv'] = {
        days: ["Svētdiena", "Pirmdiena", "Otrdiena", "Trešdiena", "Ceturtdiena", "Piektdiena", "Sestdiena"],
        daysShort: ["Sv", "P", "O", "T", "C", "Pk", "S"],
        daysMin: ["Sv", "Pr", "Ot", "Tr", "Ce", "Pk", "Se"],
        months: ["Janvāris", "Februāris", "Marts", "Aprīlis", "Maijs", "Jūnijs", "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jūn", "Jūl", "Aug", "Sep", "Okt", "Nov", "Dec"],
        today: "Šodien",
        weekStart: 1
    };
}(jQuery));
/**
 * Montenegrin translation for bootstrap-datepicker
 * Miodrag Nikač <miodrag@restartit.me>
 */

;(function($){
	$.fn.datepicker.dates['me'] = {
		days: ["Nedjelja","Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"],
		daysShort: ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"],
		daysMin: ["Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su"],
		months: ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"],
		today: "Danas",
		weekStart: 1,
		clear: "Izbriši",
		format: "dd.mm.yyyy"
	};
}(jQuery));
/**
 * Macedonian translation for bootstrap-datepicker
 * Marko Aleksic <psybaron@gmail.com>
 */

;(function($){
    $.fn.datepicker.dates['mk'] = {
        days: ["Недела", "Понеделник", "Вторник", "Среда", "Четврток", "Петок", "Сабота"],
        daysShort: ["Нед", "Пон", "Вто", "Сре", "Чет", "Пет", "Саб"],
        daysMin: ["Не", "По", "Вт", "Ср", "Че", "Пе", "Са"],
        months: ["Јануари", "Февруари", "Март", "Април", "Мај", "Јуни", "Јули", "Август", "Септември", "Октомври", "Ноември", "Декември"],
        monthsShort: ["Јан", "Фев", "Мар", "Апр", "Мај", "Јун", "Јул", "Авг", "Сеп", "Окт", "Ное", "Дек"],
        today: "Денес",
        format: "dd.mm.yyyy"
    };
}(jQuery));
/**
 * Mongolian translation for bootstrap-datepicker
 * Andrey Torsunov <andrey.torsunov@gmail.com>
 */

;(function($){
    $.fn.datepicker.dates['mn'] = {
        days: ["Ням", "Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба"],
        daysShort: ["Ням", "Дав", "Мяг", "Лха", "Пүр", "Баа", "Бям"],
        daysMin: ["Ня", "Да", "Мя", "Лх", "Пү", "Ба", "Бя"],
        months: ["Хулгана", "Үхэр", "Бар", "Туулай", "Луу", "Могой", "Морь", "Хонь", "Бич", "Тахиа", "Нохой", "Гахай"],
        monthsShort: ["Хул", "Үхэ", "Бар", "Туу", "Луу", "Мог", "Мор", "Хон", "Бич", "Тах", "Нох", "Гах"],
        today: "Өнөөдөр",
        clear: "Тодорхой",
        format: "yyyy.mm.dd",
        weekStart: 1
    };
}(jQuery));
/**
 * Malay translation for bootstrap-datepicker
 * Ateman Faiz <noorulfaiz@gmail.com>
 */

;(function($){
	$.fn.datepicker.dates['ms'] = {
		days: ["Ahad", "Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu"],
		daysShort: ["Aha", "Isn", "Sel", "Rab", "Kha", "Jum", "Sab"],
		daysMin: ["Ah", "Is", "Se", "Ra", "Kh", "Ju", "Sa"],
		months: ["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ogo", "Sep", "Okt", "Nov", "Dis"],
		today: "Hari Ini",
        clear: "Bersihkan"
	};
}(jQuery));
/**
 * Norwegian (bokmål) translation for bootstrap-datepicker
 * Fredrik Sundmyhr <http://github.com/fsundmyhr>
 */

;(function($){
	$.fn.datepicker.dates['nb'] = {
		days: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"],
		daysShort: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"],
		daysMin: ["Sø", "Ma", "Ti", "On", "To", "Fr", "Lø"],
		months: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"],
		today: "I Dag",
		format: "dd.mm.yyyy"
	};
}(jQuery));
/**
 * Belgium-Dutch translation for bootstrap-datepicker
 * Julien Poulin <poulin_julien@hotmail.com>
 */

;(function($){
  $.fn.datepicker.dates['nl-BE'] = {
    days: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],
    daysShort: ["zo", "ma", "di", "wo", "do", "vr", "za"],
    daysMin: ["zo", "ma", "di", "wo", "do", "vr", "za"],
    months: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
    monthsShort: ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
    today: "Vandaag",
    monthsTitle: "Maanden",
    clear: "Leegmaken",
    weekStart: 1,
    format: "dd/mm/yyyy"
  };
}(jQuery));
/**
 * Dutch translation for bootstrap-datepicker
 * Reinier Goltstein <mrgoltstein@gmail.com>
 */

;(function($){
	$.fn.datepicker.dates['nl'] = {
		days: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],
		daysShort: ["zo", "ma", "di", "wo", "do", "vr", "za"],
		daysMin: ["zo", "ma", "di", "wo", "do", "vr", "za"],
		months: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
		monthsShort: ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
		today: "Vandaag",
		monthsTitle: "Maanden",
		clear: "Wissen",
		weekStart: 1,
		format: "dd-mm-yyyy"
	};
}(jQuery));
/**
 *  Norwegian translation for bootstrap-datepicker
 **/

;(function($){
  $.fn.datepicker.dates['no'] = {
    days: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'],
    daysShort: ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'],
    daysMin: ['Sø', 'Ma', 'Ti', 'On', 'To', 'Fr', 'Lø'],
    months: ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
    today: 'I dag',
    clear: 'Nullstill',
    weekStart: 1,
    format: 'dd.mm.yyyy'
  };
}(jQuery));
/**
 * Polish translation for bootstrap-datepicker
 * Robert <rtpm@gazeta.pl>
 */

;(function($){
    $.fn.datepicker.dates['pl'] = {
        days: ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"],
        daysShort: ["niedz.", "pon.", "wt.", "śr.", "czw.", "piąt.", "sob."],
        daysMin: ["ndz.", "pn.", "wt.", "śr.", "czw.", "pt.", "sob."],
        months: ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"],
        monthsShort: ["sty.", "lut.", "mar.", "kwi.", "maj", "cze.", "lip.", "sie.", "wrz.", "paź.", "lis.", "gru."],
        today: "dzisiaj",
        weekStart: 1,
        clear: "wyczyść",
        format: "dd.mm.yyyy"
    };
}(jQuery));
/**
 * Brazilian translation for bootstrap-datepicker
 * Cauan Cabral <cauan@radig.com.br>
 */

;(function($){
	$.fn.datepicker.dates['pt-BR'] = {
		days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
		daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
		daysMin: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa"],
		months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
		monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
		today: "Hoje",
		monthsTitle: "Meses",
		clear: "Limpar",
		format: "dd/mm/yyyy"
	};
}(jQuery));
/**
 * Portuguese translation for bootstrap-datepicker
 * Original code: Cauan Cabral <cauan@radig.com.br>
 * Tiago Melo <tiago.blackcode@gmail.com>
 */

;(function($){
	$.fn.datepicker.dates['pt'] = {
		days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
		daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
		daysMin: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa"],
		months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
		monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
		today: "Hoje",
		monthsTitle: "Meses",
		clear: "Limpar",
		format: "dd/mm/yyyy"
	};
}(jQuery));
/**
 * Romanian translation for bootstrap-datepicker
 * Cristian Vasile <cristi.mie@gmail.com>
 */

;(function($){
	$.fn.datepicker.dates['ro'] = {
		days: ["Duminică", "Luni", "Marţi", "Miercuri", "Joi", "Vineri", "Sâmbătă"],
		daysShort: ["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "Sâm"],
		daysMin: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ"],
		months: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
		monthsShort: ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		today: "Astăzi",
		clear: "Șterge",
		weekStart: 1
	};
}(jQuery));
/**
 * Serbian latin translation for bootstrap-datepicker
 * Bojan Milosavlević <milboj@gmail.com>
 */

;(function($){
	$.fn.datepicker.dates['rs-latin'] = {
		days: ["Nedelja","Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota"],
		daysShort: ["Ned", "Pon", "Uto", "Sre", "Čet", "Pet", "Sub"],
		daysMin: ["N", "Po", "U", "Sr", "Č", "Pe", "Su"],
		months: ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"],
		today: "Danas",
		weekStart: 1,
		format: "dd.mm.yyyy"
	};
}(jQuery));
/**
 * Serbian cyrillic translation for bootstrap-datepicker
 * Bojan Milosavlević <milboj@gmail.com>
 */

;(function($){
	$.fn.datepicker.dates['rs'] = {
		days: ["Недеља","Понедељак", "Уторак", "Среда", "Четвртак", "Петак", "Субота"],
		daysShort: ["Нед", "Пон", "Уто", "Сре", "Чет", "Пет", "Суб"],
		daysMin: ["Н", "По", "У", "Ср", "Ч", "Пе", "Су"],
		months: ["Јануар", "Фебруар", "Март", "Април", "Мај", "Јун", "Јул", "Август", "Септембар", "Октобар", "Новембар", "Децембар"],
		monthsShort: ["Јан", "Феб", "Мар", "Апр", "Мај", "Јун", "Јул", "Авг", "Сеп", "Окт", "Нов", "Дец"],
		today: "Данас",
		weekStart: 1,
		format: "dd.mm.yyyy"
	};
}(jQuery));
/**
 * Russian translation for bootstrap-datepicker
 * Victor Taranenko <darwin@snowdale.com>
 */

;(function($){
	$.fn.datepicker.dates['ru'] = {
		days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
		daysShort: ["Вск", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб"],
		daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
		months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
		monthsShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
		today: "Сегодня",
		clear: "Очистить",
		format: "dd.mm.yyyy",
		weekStart: 1
	};
}(jQuery));
/**
 * Slovak translation for bootstrap-datepicker
 * Marek Lichtner <marek@licht.sk>
 * Fixes by Michal Remiš <michal.remis@gmail.com>
 */

;(function($){
	$.fn.datepicker.dates["sk"] = {
		days: ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"],
		daysShort: ["Ned", "Pon", "Uto", "Str", "Štv", "Pia", "Sob"],
		daysMin: ["Ne", "Po", "Ut", "St", "Št", "Pia", "So"],
		months: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "Máj", "Jún", "Júl", "Aug", "Sep", "Okt", "Nov", "Dec"],
		today: "Dnes",
		clear: "Vymazať",
		weekStart: 1,
		format: "d.m.yyyy"
	};
}(jQuery));
/**
 * Slovene translation for bootstrap-datepicker
 * Gregor Rudolf <gregor.rudolf@gmail.com>
 */

;(function($){
	$.fn.datepicker.dates['sl'] = {
		days: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"],
		daysShort: ["Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"],
		daysMin: ["Ne", "Po", "To", "Sr", "Če", "Pe", "So"],
		months: ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"],
		today: "Danes"
	};
}(jQuery));
/**
 * Albanian translation for bootstrap-datepicker
 * Tomor Pupovci <http://www.github.com/ttomor>
 */

;(function($){
	$.fn.datepicker.dates['sq'] = {
		days: ["E Diel", "E Hënë", "E Martē", "E Mërkurë", "E Enjte", "E Premte", "E Shtunë"],
		daysShort: ["Die", "Hën", "Mar", "Mër", "Enj", "Pre", "Shtu"],
		daysMin: ["Di", "Hë", "Ma", "Më", "En", "Pr", "Sht"],
		months: ["Janar", "Shkurt", "Mars", "Prill", "Maj", "Qershor", "Korrik", "Gusht", "Shtator", "Tetor", "Nëntor", "Dhjetor"],
		monthsShort: ["Jan", "Shk", "Mar", "Pri", "Maj", "Qer", "Korr", "Gu", "Sht", "Tet", "Nën", "Dhjet"],
		today: "Sot"
	};
}(jQuery));

/**
 * Serbian latin translation for bootstrap-datepicker
 * Bojan Milosavlević <milboj@gmail.com>
 */

;(function($){
	$.fn.datepicker.dates['sr-latin'] = {
		days: ["Nedelja","Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota"],
		daysShort: ["Ned", "Pon", "Uto", "Sre", "Čet", "Pet", "Sub"],
		daysMin: ["N", "Po", "U", "Sr", "Č", "Pe", "Su"],
		months: ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"],
		today: "Danas",
		weekStart: 1,
		format: "dd.mm.yyyy"
	};
}(jQuery));
/**
 * Serbian cyrillic translation for bootstrap-datepicker
 * Bojan Milosavlević <milboj@gmail.com>
 */

;(function($){
	$.fn.datepicker.dates['sr'] = {
		days: ["Недеља","Понедељак", "Уторак", "Среда", "Четвртак", "Петак", "Субота"],
		daysShort: ["Нед", "Пон", "Уто", "Сре", "Чет", "Пет", "Суб"],
		daysMin: ["Н", "По", "У", "Ср", "Ч", "Пе", "Су"],
		months: ["Јануар", "Фебруар", "Март", "Април", "Мај", "Јун", "Јул", "Август", "Септембар", "Октобар", "Новембар", "Децембар"],
		monthsShort: ["Јан", "Феб", "Мар", "Апр", "Мај", "Јун", "Јул", "Авг", "Сеп", "Окт", "Нов", "Дец"],
		today: "Данас",
		weekStart: 1,
		format: "dd.mm.yyyy"
	};
}(jQuery));
/**
 * Swedish translation for bootstrap-datepicker
 * Patrik Ragnarsson <patrik@starkast.net>
 */

;(function($){
	$.fn.datepicker.dates['sv'] = {
		days: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"],
		daysShort: ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"],
		daysMin: ["Sö", "Må", "Ti", "On", "To", "Fr", "Lö"],
		months: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
		today: "Idag",
		format: "yyyy-mm-dd",
		weekStart: 1,
		clear: "Rensa"
	};
}(jQuery));
/**
 * Swahili translation for bootstrap-datepicker
 * Edwin Mugendi <https://github.com/edwinmugendi>
 * Source: http://scriptsource.org/cms/scripts/page.php?item_id=entry_detail&uid=xnfaqyzcku
 */

;(function($){
    $.fn.datepicker.dates['sw'] = {
        days: ["Jumapili", "Jumatatu", "Jumanne", "Jumatano", "Alhamisi", "Ijumaa", "Jumamosi"],
        daysShort: ["J2", "J3", "J4", "J5", "Alh", "Ij", "J1"],
        daysMin: ["2", "3", "4", "5", "A", "I", "1"],
        months: ["Januari", "Februari", "Machi", "Aprili", "Mei", "Juni", "Julai", "Agosti", "Septemba", "Oktoba", "Novemba", "Desemba"],
        monthsShort: ["Jan", "Feb", "Mac", "Apr", "Mei", "Jun", "Jul", "Ago", "Sep", "Okt", "Nov", "Des"],
        today: "Leo"
    };
}(jQuery));
/**
 * Thai translation for bootstrap-datepicker
 * Suchau Jiraprapot <seroz24@gmail.com>
 */

;(function($){
	$.fn.datepicker.dates['th'] = {
		days: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"],
		daysShort: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"],
		daysMin: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"],
		months: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"],
		monthsShort: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."],
		today: "วันนี้"
	};
}(jQuery));
/**
 * Turkish translation for bootstrap-datepicker
 * Serkan Algur <kaisercrazy_2@hotmail.com>
 */

;(function($){
	$.fn.datepicker.dates['tr'] = {
		days: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
		daysShort: ["Pz", "Pzt", "Sal", "Çrş", "Prş", "Cu", "Cts"],
		daysMin: ["Pz", "Pzt", "Sa", "Çr", "Pr", "Cu", "Ct"],
		months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
		monthsShort: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
		today: "Bugün",
		clear: "Temizle",
		weekStart: 1,
		format: "dd.mm.yyyy"
	};
}(jQuery));

/**
 * Ukrainian translation for bootstrap-datepicker
 * Igor Polynets
 */

;(function($){
	$.fn.datepicker.dates['ua'] = {
		days: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятница", "Субота", "Неділя"],
		daysShort: ["Нед", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб", "Нед"],
		daysMin: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
		months: ["Cічень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
		monthsShort: ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"],
		today: "Сьогодні",
		weekStart: 1
	};
}(jQuery));
/**
 * Ukrainian translation for bootstrap-datepicker
 * Igor Polynets
 */

;(function($){
	$.fn.datepicker.dates['uk'] = {
		days: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"],
		daysShort: ["Нед", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб"],
		daysMin: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
		months: ["Cічень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
		monthsShort: ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"],
		today: "Сьогодні",
		clear: "Очистити",
		format: "dd.mm.yyyy",
		weekStart: 1
	};
}(jQuery));
/**
 * Vietnamese translation for bootstrap-datepicker
 * An Vo <https://github.com/anvoz/>
 */

;(function($){
	$.fn.datepicker.dates['vi'] = {
		days: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"],
		daysShort: ["CN", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
		daysMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
		months: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
		monthsShort: ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9", "Th10", "Th11", "Th12"],
		today: "Hôm nay",
		clear: "Xóa",
		format: "dd/mm/yyyy"
	};
}(jQuery));
/**
 * Simplified Chinese translation for bootstrap-datepicker
 * Yuan Cheung <advanimal@gmail.com>
 */

;(function($){
	$.fn.datepicker.dates['zh-CN'] = {
		days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
		daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
		daysMin:  ["日", "一", "二", "三", "四", "五", "六"],
		months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
		today: "今日",
		clear: "清除",
		format: "yyyy年mm月dd日",
		titleFormat: "yyyy年mm月",
		weekStart: 1
	};
}(jQuery));
/**
 * Traditional Chinese translation for bootstrap-datepicker
 * Rung-Sheng Jang <daniel@i-trend.co.cc>
 * FrankWu  <frankwu100@gmail.com> Fix more appropriate use of Traditional Chinese habit
 */

;(function($){
	$.fn.datepicker.dates['zh-TW'] = {
		days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
		daysShort: ["週日", "週一", "週二", "週三", "週四", "週五", "週六"],
		daysMin:  ["日", "一", "二", "三", "四", "五", "六"],
		months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
		today: "今天",
		format: "yyyy年mm月dd日",
		weekStart: 1,
		clear: "清除"
	};
}(jQuery));


/*
 * iziToast | v1.0.1
 * http://izitoast.marcelodolce.com
 * by Marcelo Dolce.
 */

!function(e,t){"function"==typeof define&&define.amd?define([],t(e)):"object"==typeof exports?module.exports=t(e):e.iziToast=t(e)}("undefined"!=typeof global?global:this.window||this.global,function(e){"use strict";function t(){var e,t=document.createElement("fakeelement"),n={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"animationend",WebkitAnimation:"webkitAnimationEnd"};for(e in n)if(void 0!==t.style[e])return n[e]}function n(e){var t=document.createDocumentFragment(),n=document.createElement("div");for(n.innerHTML=e;n.firstChild;)t.appendChild(n.firstChild);return t}function i(e,t,n){var s=!1,a=!1,r=!1,d=null,l=e.querySelector("."+o+"-progressbar div"),c={hideEta:null,maxHideTime:null,currentTime:(new Date).getTime(),updateProgress:function(){if(s=!!e.classList.contains(o+"-paused"),a=!!e.classList.contains(o+"-reseted"),r=!!e.classList.contains(o+"-closed"),a&&(console.log("ok"),clearTimeout(d),l.style.width="100%",i(e,t,n),e.classList.remove(o+"-reseted")),r&&(clearTimeout(d),console.log("closed1"),e.classList.remove(o+"-closed")),!s&&!a&&!r){c.currentTime=c.currentTime+10;var u=(c.hideEta-c.currentTime)/c.maxHideTime*100;l.style.width=u+"%",(Math.round(u)<0||"object"!=typeof e)&&(clearTimeout(d),n.apply(),console.log("closed2"))}}};t.timeout>0&&(c.maxHideTime=parseFloat(t.timeout),c.hideEta=(new Date).getTime()+c.maxHideTime,d=setInterval(c.updateProgress,10))}var o="iziToast",s={},a=!!document.querySelector&&!!e.addEventListener,r=!!/Mobi/.test(navigator.userAgent),d=568,l={},c={"class":"",title:"",message:"",color:"",icon:"",iconText:"",iconColor:"",image:"",imageWidth:50,layout:1,balloon:!1,close:!0,rtl:!1,position:"bottomRight",target:"",timeout:5e3,pauseOnHover:!0,resetOnHover:!1,progressBar:!0,progressBarColor:"",animateInside:!0,buttons:{},transitionIn:"fadeInUp",transitionOut:"fadeOut",transitionInMobile:"fadeInUp",transitionOutMobile:"fadeOutDown",onOpen:function(){},onClose:function(){}};"remove"in Element.prototype||(Element.prototype.remove=function(){this.parentNode&&this.parentNode.removeChild(this)});var u=function(e,t,n){if("[object Object]"===Object.prototype.toString.call(e))for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.call(n,e[i],i,e);else if(e)for(var o=0,s=e.length;s>o;o++)t.call(n,e[o],o,e)},p=function(e,t){var n={};return u(e,function(t,i){n[i]=e[i]}),u(t,function(e,i){n[i]=t[i]}),n};t();return s.destroy=function(){u(document.querySelectorAll("."+o+"-wrapper"),function(e,t){e.remove()}),u(document.querySelectorAll("."+o),function(e,t){e.remove()}),document.removeEventListener(o+"-open",{},!1),document.removeEventListener(o+"-close",{},!1),l={}},s.settings=function(e){a&&(s.destroy(),l=e,c=p(c,e||{}))},s.info=function(e){var t={color:"blue",icon:"ico-info"},n=p(l,e||{});n=p(t,n||{}),this.show(n)},s.success=function(e){var t={color:"green",icon:"ico-check"},n=p(l,e||{});n=p(t,n||{}),this.show(n)},s.warning=function(e){var t={color:"yellow",icon:"ico-warning"},n=p(l,e||{});n=p(t,n||{}),this.show(n)},s.error=function(e){var t={color:"red",icon:"ico-error"},n=p(l,e||{});n=p(t,n||{}),this.show(n)},s.hide=function(e,t){var n=p(c,e||{});if("object"!=typeof t&&(t=document.querySelector(t)),t.classList.add(o+"-closed"),(n.transitionIn||n.transitionInMobile)&&t.classList.remove(n.transitionIn,n.transitionInMobile),n.transitionOut||n.transitionOutMobile){r||window.innerWidth<=d?n.transitionOutMobile.length>0&&t.classList.add(n.transitionOutMobile):n.transitionOut.length>0&&t.classList.add(n.transitionOut);var i=t.parentNode.offsetHeight;t.parentNode.style.height=i+"px",t.style.pointerEvents="none",r||window.innerWidth<=d||(t.parentNode.style.transitionDelay="0.2s"),setTimeout(function(){t.parentNode.style.height="0px",window.setTimeout(function(){t.parentNode.remove()},1e3)},200)}else t.parentNode.remove();if(n["class"])try{var s;window.CustomEvent?s=new CustomEvent("iziToast-close",{detail:{"class":n["class"]}}):(s=document.createEvent("CustomEvent"),s.initCustomEvent("iziToast-close",!0,!0,{"class":n["class"]})),document.dispatchEvent(s)}catch(a){console.warn(a)}"undefined"!=typeof n.onClose&&n.onClose.apply()},s.show=function(e){var t=this,s=p(l,e||{});s=p(c,s);var a=document.createElement("div");a.classList.add(o+"-capsule");var m=document.createElement("div");if(m.classList.add(o),r||window.innerWidth<=d?s.transitionInMobile.length>0&&m.classList.add(s.transitionInMobile):s.transitionIn.length>0&&m.classList.add(s.transitionIn),s.rtl&&m.classList.add(o+"-rtl"),s.color.length>0&&("#"==s.color.substring(0,1)||"rgb"==s.color.substring(0,3)||"hsl"==s.color.substring(0,3)?m.style.background=s.color:m.classList.add(o+"-color-"+s.color)),s["class"]&&m.classList.add(s["class"]),s.image){var h=document.createElement("div");h.classList.add(o+"-cover"),h.style.width=s.imageWidth+"px",h.style.backgroundImage="url("+s.image+")",m.appendChild(h)}var v;if(s.close?(v=document.createElement("button"),v.classList.add(o+"-close"),m.appendChild(v)):s.rtl?m.style.paddingLeft="30px":m.style.paddingRight="30px",s.progressBar){var f=document.createElement("div");f.classList.add(o+"-progressbar");var g=document.createElement("div");g.style.background=s.progressBarColor,f.appendChild(g),m.appendChild(f),setTimeout(function(){i(m,s,function(){t.hide(s,m)})},300)}else s.progressBar===!1&&s.timeout>0&&setTimeout(function(){t.hide(s,m)},s.timeout);var y=document.createElement("div");if(y.classList.add(o+"-body"),s.image&&(s.rtl?y.style.marginRight=s.imageWidth+10+"px":y.style.marginLeft=s.imageWidth+10+"px"),s.icon){var w=document.createElement("i");w.setAttribute("class",o+"-icon "+s.icon),s.iconText&&w.appendChild(document.createTextNode(s.iconText)),s.rtl?y.style.paddingRight="33px":y.style.paddingLeft="33px",s.iconColor&&(w.style.color=s.iconColor),y.appendChild(w)}var b=document.createElement("strong");b.appendChild(document.createTextNode(s.title));var L=document.createElement("p");L.appendChild(document.createTextNode(s.message)),s.layout>1&&(L.style.width="100%",m.classList.add(o+"-layout"+s.layout)),s.balloon&&m.classList.add(o+"-balloon"),y.appendChild(b),y.appendChild(L);var C;if(s.buttons.length>0){C=document.createElement("div"),C.classList.add(o+"-buttons"),L.style.marginRight="15px";var E=0;u(s.buttons,function(e,i){C.appendChild(n(e[0]));var o=C.childNodes;o[E].addEventListener("click",function(n){n.preventDefault();var i=e[1];return new i(t,m)}),E++}),y.appendChild(C)}m.appendChild(y),a.style.visibility="hidden",a.style.height="0px",a.appendChild(m),setTimeout(function(){var e=m.offsetHeight,t=m.currentStyle||window.getComputedStyle(m),n=t.marginTop;n=n.split("px"),n=parseInt(n[0]);var i=t.marginBottom;i=i.split("px"),i=parseInt(i[0]),a.style.visibility="",a.style.height=e+i+n+"px",setTimeout(function(){a.style.height="auto"},1e3)},100);var T,x=s.position;s.target?(T=document.querySelector(s.target),T.classList.add(o+"-target"),T.appendChild(a)):(x=r||window.innerWidth<=d?"bottomLeft"==s.position||"bottomRight"==s.position||"bottomCenter"==s.position?o+"-wrapper-bottomCenter":"topLeft"==s.position||"topRight"==s.position||"topCenter"==s.position?o+"-wrapper-topCenter":o+"-wrapper-center":o+"-wrapper-"+x,T=document.querySelector("."+o+"-wrapper."+x),T||(T=document.createElement("div"),T.classList.add(o+"-wrapper"),T.classList.add(x),document.body.appendChild(T)),"topLeft"==s.position||"topCenter"==s.position||"topRight"==s.position?T.insertBefore(a,T.firstChild):T.appendChild(a)),s.onOpen.apply();try{var I;window.CustomEvent?I=new CustomEvent("iziToast-open",{detail:{"class":s["class"]}}):(I=document.createEvent("CustomEvent"),I.initCustomEvent("iziToast-open",!0,!0,{"class":s["class"]})),document.dispatchEvent(I)}catch(O){console.warn(O)}if(s.animateInside){m.classList.add(o+"-animateInside");var M=200,N=100,H=300;if("bounceInLeft"==s.transitionIn&&(M=400,N=200,H=400),window.setTimeout(function(){b.classList.add("slideIn")},M),window.setTimeout(function(){L.classList.add("slideIn")},N),s.icon&&window.setTimeout(function(){w.classList.add("revealIn")},H),s.buttons.length>0&&C){var k=150;u(C.childNodes,function(e,t){window.setTimeout(function(){e.classList.add("revealIn")},k),k+=k})}}v&&v.addEventListener("click",function(e){e.target;t.hide(s,m)}),s.pauseOnHover&&(m.addEventListener("mouseenter",function(e){this.classList.add(o+"-paused")}),m.addEventListener("mouseleave",function(e){this.classList.remove(o+"-paused")})),s.resetOnHover&&(m.addEventListener("mouseenter",function(e){this.classList.add(o+"-reseted")}),m.addEventListener("mouseleave",function(e){this.classList.remove(o+"-reseted")}))},s});
function alert_info(message){

    iziToast.info({
        title: 'Hello',
        message: message,
        // imageWidth: 70,

        position: 'bottomLeft',
        transitionIn: 'bounceInRight',
        // rtl: true,
        // iconText: 'star',
        onOpen: function(){
            console.log('callback abriu! info');
        },
        onClose: function(){
            console.log("callback fechou! info");
        }
    });

}

function alert_success(message){

    iziToast.success({
        title: 'OK',
        message: message,
        position: 'bottomRight',
        transitionIn: 'bounceInLeft',
        // iconText: 'star',
        onOpen: function(){
            console.log('callback abriu! success');
        },
        onClose: function(){
            console.log("callback fechou! success");
        }
    });

}

function alert_error(message){

    iziToast.error({
        title: 'Error',
        message: message,
        position: 'topRight',
        transitionIn: 'fadeInDown'
    });

}

function alert_warning(message){

    iziToast.warning({
        title: 'Caution',
        message: message,
        position: 'topLeft',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX'
    });

}

function alert_task(message){

    iziToast.show({
        class: 'test',
        color: 'dark',
        icon: 'icon-contacts',
        title: 'Hello!',
        message: message,
        position: 'topCenter',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        progressBarColor: 'rgb(0, 255, 184)',
        image: '../assets/avatar.jpg',
        imageWidth: 70,
        layout:2,
        onClose: function(){
            console.info('onClose');
        },
        iconColor: 'rgb(0, 255, 184)'
    });

}

function alert_alert(message){

    iziToast.show({
        title: 'Hey',
        icon: 'icon-drafts',
        class: 'custom1',
        message: message,
        position: 'bottomCenter',
        image: '../assets/avatar.jpg',
        balloon: true,
        buttons: [
            ['<button>Photo</button>', function (instance, toast) {

                // instance.hide({ transitionOut: 'fadeOutUp' }, toast);

                iziToast.show({
                    color: 'dark',
                    icon: 'icon-photo',
                    title: 'OK',
                    message: 'Callback Photo!',
                    position: 'bottomCenter',
                    // iconText: 'star',
                });

            }],
            ['<button>Video</button>', function (instance, toast) {

                // instance.hide({ transitionOut: 'fadeOutUp' }, toast);

                iziToast.show({
                    color: 'dark',
                    icon: 'icon-ondemand_video',
                    title: 'OK',
                    message: 'Callback V铆deo!',
                    position: 'bottomCenter',
                    // iconText: 'star',
                });

            }],
            ['<button>Text</button>', function (instance, toast) {

                // instance.hide({ transitionOut: 'fadeOutUp' }, toast);

                iziToast.show({
                    color: 'dark',
                    icon: 'icon-event_note',
                    title: 'OK',
                    message: 'Callback Text!',
                    position: 'bottomCenter',
                    // iconText: 'star',
                });

            }],
        ]
    });

}

$(".trigger-info").on('click', function (event) {
    event.preventDefault();

    iziToast.info({
        title: 'Hello',
        message: 'Welcome!',
        // imageWidth: 70,

        position: 'bottomLeft',
        transitionIn: 'bounceInRight',
        // rtl: true,
        // iconText: 'star',
        onOpen: function(){
            console.log('callback abriu! info');
        },
        onClose: function(){
            console.log("callback fechou! info");
        }
    });
});

$(".trigger-success").on('click', function (event) {
    event.preventDefault();

    iziToast.success({
        title: 'OK',
        message: 'Successfully inserted record!',
        position: 'bottomRight',
        transitionIn: 'bounceInLeft',
        // iconText: 'star',
        onOpen: function(){
            console.log('callback abriu! success');
        },
        onClose: function(){
            console.log("callback fechou! success");
        }
    });
});
$(".trigger-warning").on('click', function (event) {
    event.preventDefault();

    iziToast.warning({
        title: 'Caution',
        message: 'You forgot important data',
        position: 'topLeft',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX'
    });
});
$(".trigger-error").on('click', function (event) {
    event.preventDefault();

    iziToast.error({
        title: 'Error',
        message: 'Illegal operation',
        position: 'topRight',
        transitionIn: 'fadeInDown'
    });
});

$(".trigger-custom1").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        title: 'Hey',
        icon: 'icon-drafts',
        class: 'custom1',
        message: 'What would you like to add?',
        position: 'bottomCenter',
        image: '../assets/avatar.jpg',
        balloon: true,
        buttons: [
            ['<button>Photo</button>', function (instance, toast) {

                // instance.hide({ transitionOut: 'fadeOutUp' }, toast);

                iziToast.show({
                    color: 'dark',
                    icon: 'icon-photo',
                    title: 'OK',
                    message: 'Callback Photo!',
                    position: 'bottomCenter',
                    // iconText: 'star',
                });

            }],
            ['<button>Video</button>', function (instance, toast) {

                // instance.hide({ transitionOut: 'fadeOutUp' }, toast);

                iziToast.show({
                    color: 'dark',
                    icon: 'icon-ondemand_video',
                    title: 'OK',
                    message: 'Callback V铆deo!',
                    position: 'bottomCenter',
                    // iconText: 'star',
                });

            }],
            ['<button>Text</button>', function (instance, toast) {

                // instance.hide({ transitionOut: 'fadeOutUp' }, toast);

                iziToast.show({
                    color: 'dark',
                    icon: 'icon-event_note',
                    title: 'OK',
                    message: 'Callback Text!',
                    position: 'bottomCenter',
                    // iconText: 'star',
                });

            }],
        ]
    });

});


$(".trigger-animInsideFalse").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        title: 'Hey',
        icon: 'icon-drafts',
        class: 'animInsideFalse',
        message: 'What would you like to add?',
        position: 'bottomCenter',
        animateInside: false,
        image: '../assets/avatar.jpg',
        buttons: [
            ['<button>Photo</button>', function (instance, toast) {

            }],
            ['<button>Video</button>', function (instance, toast) {

            }],
            ['<button>Text</button>', function (instance, toast) {

            }],
        ]
    });

});


document.addEventListener('iziToast-open', function(data){
    if(data.detail.class == 'test'){
        console.log('test open');
    }
});


document.addEventListener('iziToast-close', function(data){
    if(data.detail.class == 'test'){
        console.log('test close');
    }
});

$(".trigger-bounceInLeft").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        icon: 'icon-style',
        title: 'Transition',
        message: 'bounceInLeft',
        transitionIn: 'bounceInLeft',
        transitionInMobile: 'bounceInLeft',
        position: 'center'
    });
});

$(".trigger-bounceInRight").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        icon: 'icon-style',
        title: 'Transition',
        message: 'bounceInRight',
        transitionIn: 'bounceInRight',
        transitionInMobile: 'bounceInRight',
        position: 'center'
    });
});

$(".trigger-bounceInUp").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        icon: 'icon-style',
        title: 'Transition',
        message: 'bounceInUp',
        transitionIn: 'bounceInUp',
        transitionInMobile: 'bounceInUp',
        position: 'center'
    });
});

$(".trigger-bounceInDown").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        icon: 'icon-style',
        title: 'Transition',
        message: 'bounceInDown',
        transitionIn: 'bounceInDown',
        transitionInMobile: 'bounceInDown',
        position: 'center'
    });
});

$(".trigger-fadeIn").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        icon: 'icon-style',
        title: 'Transition',
        message: 'fadeIn',
        transitionIn: 'fadeIn',
        transitionInMobile: 'fadeIn',
        position: 'center'
    });
});

$(".trigger-fadeInDown").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        icon: 'icon-style',
        title: 'Transition',
        message: 'fadeInDown',
        transitionIn: 'fadeInDown',
        transitionInMobile: 'fadeInDown',
        position: 'center'
    });
});

$(".trigger-fadeInUp").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        icon: 'icon-style',
        title: 'Transition',
        message: 'fadeInUp',
        transitionIn: 'fadeInUp',
        transitionInMobile: 'fadeInUp',
        position: 'center'
    });
});

$(".trigger-fadeInLeft").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        icon: 'icon-style',
        title: 'Transition',
        message: 'fadeInLeft',
        transitionIn: 'fadeInLeft',
        transitionInMobile: 'fadeInLeft',
        position: 'center'
    });
});

$(".trigger-fadeInRight").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        icon: 'icon-style',
        title: 'Transition',
        message: 'fadeInRight',
        transitionIn: 'fadeInRight',
        transitionInMobile: 'fadeInRight',
        position: 'center'
    });
});

$(".trigger-flipInX").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        icon: 'icon-style',
        title: 'Transition',
        message: 'flipInX',
        transitionIn: 'flipInX',
        transitionInMobile: 'flipInX',
        position: 'center'
    });
});


$(".trigger-image").on('click', function (event) {
    event.preventDefault();
    iziToast.show({
        imageWidth: 50,
        image: '../assets/avatar.jpg',
        color: 'dark',
        icon: 'icon-person',
        title: 'Hey',
        message: 'How are you?',
        position: 'center',
        layout: 1
    });
});

$(".trigger-imageWidth").on('click', function (event) {
    event.preventDefault();
    iziToast.show({
        imageWidth: 100,
        image: 'img/avatar.jpg',
        color: 'dark',
        icon: 'icon-person',
        title: 'Hey',
        message: 'How are you?',
        position: 'center',
        layout: 2
    });
});


$(".trigger-layout1").on('click', function (event) {
    event.preventDefault();
    iziToast.show({
        title: 'Layout 1',
        icon: 'icon-palette',
        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
        position: 'center',
        layout: 1
    });
});
$(".trigger-layout2").on('click', function (event) {
    event.preventDefault();
    iziToast.show({
        title: 'Layout 2',
        icon: 'icon-palette',
        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
        position: 'center',
        layout: 2
    });
});

$(".trigger-balloon").on('click', function (event) {
    event.preventDefault();
    iziToast.show({
        color: 'dark',
        progressBarColor: '#d48d37',
        title: 'Balloon',
        icon: 'icon-chat_bubble',
        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
        position: 'center',
        balloon: true
    });
});

$(".trigger-bottomRight").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        color: 'dark',
        icon: 'icon-style',
        title: 'Position',
        message: 'bottomRight',
        position: 'bottomRight'
    });
});
$(".trigger-bottomLeft").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        color: 'dark',
        icon: 'icon-style',
        title: 'Position',
        message: 'bottomLeft',
        position: 'bottomLeft'
    });
});
$(".trigger-topRight").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        color: 'dark',
        icon: 'icon-style',
        title: 'Position',
        message: 'topRight',
        position: 'topRight'
    });
});
$(".trigger-topLeft").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        color: 'dark',
        icon: 'icon-style',
        title: 'Position',
        message: 'topLeft',
        position: 'topLeft'
    });
});
$(".trigger-topCenter").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        color: 'dark',
        icon: 'icon-style',
        title: 'Position',
        message: 'topCenter',
        position: 'topCenter'
    });
});
$(".trigger-bottomCenter").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        color: 'dark',
        icon: 'icon-style',
        title: 'Position',
        message: 'bottomCenter',
        position: 'bottomCenter'
    });
});
$(".trigger-center").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        color: 'dark',
        icon: 'icon-style',
        title: 'Position',
        message: 'center',
        position: 'center'
    });
});


$(".trigger-show").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        color: 'dark',
        icon: 'icon-person',
        title: 'Hey',
        message: 'Welcome!',
        position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
        progressBarColor: 'rgb(0, 255, 184)',
        buttons: [
            ['<button>Ok</button>', function (instance, toast) {
                alert("Hello world!");
            }],
            ['<button>Close</button>', function (instance, toast) {
                instance.hide({ transitionOut: 'fadeOutUp' }, toast);
            }]
        ]
    });
});


$(".trigger-pause").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        color: 'dark',
        icon: 'icon-mouse',
        title: 'Pause',
        message: 'OnHover',
        position: 'center',
        progressBarColor: 'rgb(0, 255, 184)',
    });
});

$(".trigger-reset").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        color: 'dark',
        icon: 'icon-mouse',
        title: 'Reset',
        message: 'OnHover',
        position: 'center',
        resetOnHover: true,
        progressBarColor: 'rgb(0, 255, 184)',
    });
});

$(".trigger-target").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        color: '#fff',
        icon: 'icon-style',
        title: 'Target',
        message: 'Specifying a Target',
        transitionIn: 'flipInX',
        transitionInMobile: 'flipInX',
        target: '.target-example',
        progressBarColor: '#d48d37',
    });
});
/* Blob.js
 * A Blob implementation.
 * 2014-07-24
 *
 * By Eli Grey, http://eligrey.com
 * By Devin Samarin, https://github.com/dsamarin
 * License: MIT
 *   See https://github.com/eligrey/Blob.js/blob/master/LICENSE.md
 */

/*global self, unescape */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/Blob.js/blob/master/Blob.js */


(function (view) {
	"use strict";

	view.URL = view.URL || view.webkitURL;

	if (view.Blob && view.URL) {
		try {
			new Blob;
			return;
		} catch (e) {}
	}

	// Internally we use a BlobBuilder implementation to base Blob off of
	// in order to support older browsers that only have BlobBuilder
	var BlobBuilder = view.BlobBuilder || view.WebKitBlobBuilder || view.MozBlobBuilder || (function(view) {
		var
			  get_class = function(object) {
				return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
			}
			, FakeBlobBuilder = function BlobBuilder() {
				this.data = [];
			}
			, FakeBlob = function Blob(data, type, encoding) {
				this.data = data;
				this.size = data.length;
				this.type = type;
				this.encoding = encoding;
			}
			, FBB_proto = FakeBlobBuilder.prototype
			, FB_proto = FakeBlob.prototype
			, FileReaderSync = view.FileReaderSync
			, FileException = function(type) {
				this.code = this[this.name = type];
			}
			, file_ex_codes = (
				  "NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR "
				+ "NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR"
			).split(" ")
			, file_ex_code = file_ex_codes.length
			, real_URL = view.URL || view.webkitURL || view
			, real_create_object_URL = real_URL.createObjectURL
			, real_revoke_object_URL = real_URL.revokeObjectURL
			, URL = real_URL
			, btoa = view.btoa
			, atob = view.atob

			, ArrayBuffer = view.ArrayBuffer
			, Uint8Array = view.Uint8Array

			, origin = /^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/
		;
		FakeBlob.fake = FB_proto.fake = true;
		while (file_ex_code--) {
			FileException.prototype[file_ex_codes[file_ex_code]] = file_ex_code + 1;
		}
		// Polyfill URL
		if (!real_URL.createObjectURL) {
			URL = view.URL = function(uri) {
				var
					  uri_info = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
					, uri_origin
				;
				uri_info.href = uri;
				if (!("origin" in uri_info)) {
					if (uri_info.protocol.toLowerCase() === "data:") {
						uri_info.origin = null;
					} else {
						uri_origin = uri.match(origin);
						uri_info.origin = uri_origin && uri_origin[1];
					}
				}
				return uri_info;
			};
		}
		URL.createObjectURL = function(blob) {
			var
				  type = blob.type
				, data_URI_header
			;
			if (type === null) {
				type = "application/octet-stream";
			}
			if (blob instanceof FakeBlob) {
				data_URI_header = "data:" + type;
				if (blob.encoding === "base64") {
					return data_URI_header + ";base64," + blob.data;
				} else if (blob.encoding === "URI") {
					return data_URI_header + "," + decodeURIComponent(blob.data);
				} if (btoa) {
					return data_URI_header + ";base64," + btoa(blob.data);
				} else {
					return data_URI_header + "," + encodeURIComponent(blob.data);
				}
			} else if (real_create_object_URL) {
				return real_create_object_URL.call(real_URL, blob);
			}
		};
		URL.revokeObjectURL = function(object_URL) {
			if (object_URL.substring(0, 5) !== "data:" && real_revoke_object_URL) {
				real_revoke_object_URL.call(real_URL, object_URL);
			}
		};
		FBB_proto.append = function(data/*, endings*/) {
			var bb = this.data;
			// decode data to a binary string
			if (Uint8Array && (data instanceof ArrayBuffer || data instanceof Uint8Array)) {
				var
					  str = ""
					, buf = new Uint8Array(data)
					, i = 0
					, buf_len = buf.length
				;
				for (; i < buf_len; i++) {
					str += String.fromCharCode(buf[i]);
				}
				bb.push(str);
			} else if (get_class(data) === "Blob" || get_class(data) === "File") {
				if (FileReaderSync) {
					var fr = new FileReaderSync;
					bb.push(fr.readAsBinaryString(data));
				} else {
					// async FileReader won't work as BlobBuilder is sync
					throw new FileException("NOT_READABLE_ERR");
				}
			} else if (data instanceof FakeBlob) {
				if (data.encoding === "base64" && atob) {
					bb.push(atob(data.data));
				} else if (data.encoding === "URI") {
					bb.push(decodeURIComponent(data.data));
				} else if (data.encoding === "raw") {
					bb.push(data.data);
				}
			} else {
				if (typeof data !== "string") {
					data += ""; // convert unsupported types to strings
				}
				// decode UTF-16 to binary string
				bb.push(unescape(encodeURIComponent(data)));
			}
		};
		FBB_proto.getBlob = function(type) {
			if (!arguments.length) {
				type = null;
			}
			return new FakeBlob(this.data.join(""), type, "raw");
		};
		FBB_proto.toString = function() {
			return "[object BlobBuilder]";
		};
		FB_proto.slice = function(start, end, type) {
			var args = arguments.length;
			if (args < 3) {
				type = null;
			}
			return new FakeBlob(
				  this.data.slice(start, args > 1 ? end : this.data.length)
				, type
				, this.encoding
			);
		};
		FB_proto.toString = function() {
			return "[object Blob]";
		};
		FB_proto.close = function() {
			this.size = 0;
			delete this.data;
		};
		return FakeBlobBuilder;
	}(view));

	view.Blob = function(blobParts, options) {
		var type = options ? (options.type || "") : "";
		var builder = new BlobBuilder();
		if (blobParts) {
			for (var i = 0, len = blobParts.length; i < len; i++) {
				if (Uint8Array && blobParts[i] instanceof Uint8Array) {
					builder.append(blobParts[i].buffer);
				}
				else {
					builder.append(blobParts[i]);
				}
			}
		}
		var blob = builder.getBlob(type);
		if (!blob.slice && blob.webkitSlice) {
			blob.slice = blob.webkitSlice;
		}
		return blob;
	};

	var getPrototypeOf = Object.getPrototypeOf || function(object) {
		return object.__proto__;
	};
	view.Blob.prototype = getPrototypeOf(new view.Blob());
}(typeof self !== "undefined" && self || typeof window !== "undefined" && window || this.content || this));
/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs=saveAs||function(e){"use strict";if("undefined"==typeof navigator||!/MSIE [1-9]\./.test(navigator.userAgent)){var t=e.document,n=function(){return e.URL||e.webkitURL||e},o=t.createElementNS("http://www.w3.org/1999/xhtml","a"),r="download"in o,i=function(e){var t=new MouseEvent("click");e.dispatchEvent(t)},a=/Version\/[\d\.]+.*Safari/.test(navigator.userAgent),c=e.webkitRequestFileSystem,f=e.requestFileSystem||c||e.mozRequestFileSystem,u=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},d="application/octet-stream",s=0,l=4e4,v=function(e){var t=function(){"string"==typeof e?n().revokeObjectURL(e):e.remove()};setTimeout(t,l)},p=function(e,t,n){t=[].concat(t);for(var o=t.length;o--;){var r=e["on"+t[o]];if("function"==typeof r)try{r.call(e,n||e)}catch(i){u(i)}}},w=function(e){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e},y=function(t,u,l){l||(t=w(t));var y,m,S,h=this,R=t.type,O=!1,g=function(){p(h,"writestart progress write writeend".split(" "))},b=function(){if(m&&a&&"undefined"!=typeof FileReader){var o=new FileReader;return o.onloadend=function(){var e=o.result;m.location.href="data:attachment/file"+e.slice(e.search(/[,;]/)),h.readyState=h.DONE,g()},o.readAsDataURL(t),void(h.readyState=h.INIT)}if((O||!y)&&(y=n().createObjectURL(t)),m)m.location.href=y;else{var r=e.open(y,"_blank");void 0===r&&a&&(e.location.href=y)}h.readyState=h.DONE,g(),v(y)},E=function(e){return function(){return h.readyState!==h.DONE?e.apply(this,arguments):void 0}},N={create:!0,exclusive:!1};return h.readyState=h.INIT,u||(u="download"),r?(y=n().createObjectURL(t),void setTimeout(function(){o.href=y,o.download=u,i(o),g(),v(y),h.readyState=h.DONE})):(e.chrome&&R&&R!==d&&(S=t.slice||t.webkitSlice,t=S.call(t,0,t.size,d),O=!0),c&&"download"!==u&&(u+=".download"),(R===d||c)&&(m=e),f?(s+=t.size,void f(e.TEMPORARY,s,E(function(e){e.root.getDirectory("saved",N,E(function(e){var n=function(){e.getFile(u,N,E(function(e){e.createWriter(E(function(n){n.onwriteend=function(t){m.location.href=e.toURL(),h.readyState=h.DONE,p(h,"writeend",t),v(e)},n.onerror=function(){var e=n.error;e.code!==e.ABORT_ERR&&b()},"writestart progress write abort".split(" ").forEach(function(e){n["on"+e]=h["on"+e]}),n.write(t),h.abort=function(){n.abort(),h.readyState=h.DONE},h.readyState=h.WRITING}),b)}),b)};e.getFile(u,{create:!1},E(function(e){e.remove(),n()}),E(function(e){e.code===e.NOT_FOUND_ERR?n():b()}))}),b)}),b)):void b())},m=y.prototype,S=function(e,t,n){return new y(e,t,n)};return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(e,t,n){return n||(e=w(e)),navigator.msSaveOrOpenBlob(e,t||"download")}:(m.abort=function(){var e=this;e.readyState=e.DONE,p(e,"abort")},m.readyState=m.INIT=0,m.WRITING=1,m.DONE=2,m.error=m.onwritestart=m.onprogress=m.onwrite=m.onabort=m.onerror=m.onwriteend=null,S)}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);"undefined"!=typeof module&&module.exports?module.exports.saveAs=saveAs:"undefined"!=typeof define&&null!==define&&null!==define.amd&&define([],function(){return saveAs});
/*!
 * TableExport.js v3.2.0 (http://www.clarketravis.com)
 * Copyright 2015 Travis Clarke
 * Licensed under the MIT license
 */

!function(t,e){function n(t){return String(t).replace(/[&<>'\/]/g,function(t){return l.fn.tableExport.entityMap[t]})}function o(t,e){e&&(t+=1462);var n=Date.parse(t);return(n-new Date(Date.UTC(1899,11,30)))/864e5}function a(t,e){for(var n={},a={s:{c:1e7,r:1e7},e:{c:0,r:0}},r=0;r!=t.length;++r)for(var i=0;i!=t[r].length;++i){a.s.r>r&&(a.s.r=r),a.s.c>i&&(a.s.c=i),a.e.r<r&&(a.e.r=r),a.e.c<i&&(a.e.c=i);var f={v:t[r][i]};if(null!=f.v){var l=XLSX.utils.encode_cell({c:i,r:r});"number"==typeof f.v?f.t="n":"boolean"==typeof f.v?f.t="b":f.v instanceof Date?(f.t="n",f.z=XLSX.SSF._table[14],f.v=o(f.v)):f.t="s",n[l]=f}}return a.s.c<1e7&&(n["!ref"]=XLSX.utils.encode_range(a)),n}function r(){return this instanceof r?(this.SheetNames=[],void(this.Sheets={})):new r}function i(t){for(var e=new ArrayBuffer(t.length),n=new Uint8Array(e),o=0;o!=t.length;++o)n[o]=255&t.charCodeAt(o);return e}function f(t,e,n,o){if(".xlsx"===o){var f=new r,s=a(t);f.SheetNames.push(n),f.Sheets[n]=s;var x={bookType:"xlsx",bookSST:!1,type:"binary"},p=XLSX.write(f,x);t=i(p)}saveAs(new Blob([t],{type:e+";"+l.fn.tableExport.charset}),n+o)}var l=t.jQuery;l.fn.tableExport=function(t){var e,o,a,r=l.extend({},l.fn.tableExport.defaults,t),i=l.fn.tableExport.rowDel,s=r.ignoreRows instanceof Array?r.ignoreRows:[r.ignoreRows],x=r.ignoreCols instanceof Array?r.ignoreCols:[r.ignoreCols];r.bootstrap?(e=l.fn.tableExport.bootstrap[0]+" ",o=l.fn.tableExport.bootstrap[1]+" ",a=l.fn.tableExport.bootstrap[2]+" "):(e=l.fn.tableExport.defaultButton+" ",o=a=""),this.each(function(){function t(t){var e=p.find("caption:not(.head)");e.length?e.append(t):p.prepend('<caption class="'+a+r.position+'">'+t+"</caption>")}function f(n,a,r){var i="<button data-fileblob='"+n+"' class='"+e+o+r+"'>"+a+"</button>";t(i)}var p=l(this),u=p.find("tbody").find("tr"),u=r.headings?u.add(p.find("thead>tr")):u,u=r.footers?u.add(p.find("tfoor>tr")):u,b=r.headings?p.find("thead>tr").length:0,d="id"===r.fileName?p.attr("id")?p.attr("id"):l.fn.tableExport.defaultFileName:r.fileName,c={xlsx:function(t,e){var o=u.map(function(t,e){if(!~s.indexOf(t-b)){var n=l(e).find("th, td");return[n.map(function(t,e){return~x.indexOf(t)?void 0:l(e).text()}).get()]}}).get(),a=n(JSON.stringify({data:o,fileName:e,mimeType:l.fn.tableExport.xlsx.mimeType,fileExtension:l.fn.tableExport.xlsx.fileExtension})),r=l.fn.tableExport.xlsx.buttonContent,i=l.fn.tableExport.xlsx.defaultClass;f(a,r,i)},xls:function(t,e){var o=l.fn.tableExport.xls.separator,a=u.map(function(t,e){if(!~s.indexOf(t-b)){var n=l(e).find("th, td");return n.map(function(t,e){return~x.indexOf(t)?void 0:l(e).text()}).get().join(o)}}).get().join(t),r=n(JSON.stringify({data:a,fileName:e,mimeType:l.fn.tableExport.xls.mimeType,fileExtension:l.fn.tableExport.xls.fileExtension})),i=l.fn.tableExport.xls.buttonContent,p=l.fn.tableExport.xls.defaultClass;f(r,i,p)},csv:function(t,e){var o=l.fn.tableExport.csv.separator,a=u.map(function(t,e){if(!~s.indexOf(t-b)){var n=l(e).find("th, td");return n.map(function(t,e){return~x.indexOf(t)?void 0:l(e).text()}).get().join(o)}}).get().join(t),r=n(JSON.stringify({data:a,fileName:e,mimeType:l.fn.tableExport.csv.mimeType,fileExtension:l.fn.tableExport.csv.fileExtension})),i=l.fn.tableExport.csv.buttonContent,p=l.fn.tableExport.csv.defaultClass;f(r,i,p)},txt:function(t,e){var o=l.fn.tableExport.txt.separator,a=u.map(function(t,e){if(!~s.indexOf(t-b)){var n=l(e).find("th, td");return n.map(function(t,e){return~x.indexOf(t)?void 0:l(e).text()}).get().join(o)}}).get().join(t),r=n(JSON.stringify({data:a,fileName:e,mimeType:l.fn.tableExport.txt.mimeType,fileExtension:l.fn.tableExport.txt.fileExtension})),i=l.fn.tableExport.txt.buttonContent,p=l.fn.tableExport.txt.defaultClass;f(r,i,p)}};r.formats.forEach(function(t){c[t](i,d)})}),l("button[data-fileblob]").on("click",function(){var t=l(this).data("fileblob"),e=t.data,n=t.fileName,o=t.mimeType,a=t.fileExtension;f(e,o,n,a)})},l.fn.tableExport.defaults={headings:!0,footers:!0,formats:["xls","csv","txt"],fileName:"id",bootstrap:!0,position:"bottom",ignoreRows:null,ignoreCols:null},l.fn.tableExport.charset="charset=utf-8",l.fn.tableExport.xlsx={defaultClass:"xlsx",buttonContent:"Export to xlsx",mimeType:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",fileExtension:".xlsx"},l.fn.tableExport.xls={defaultClass:"xls",buttonContent:"Export to xls",separator:"	",mimeType:"application/vnd.ms-excel",fileExtension:".xls"},l.fn.tableExport.csv={defaultClass:"csv",buttonContent:"Export to csv",separator:",",mimeType:"application/csv",fileExtension:".csv"},l.fn.tableExport.txt={defaultClass:"txt",buttonContent:"Export to txt",separator:"  ",mimeType:"text/plain",fileExtension:".txt"},l.fn.tableExport.defaultFileName="myDownload",l.fn.tableExport.defaultButton="button-default",l.fn.tableExport.bootstrap=["btn","btn-default","btn-toolbar"],l.fn.tableExport.rowDel="\r\n",l.fn.tableExport.entityMap={"&":"&#38;","<":"&#60;",">":"&#62;","'":"&#39;","/":"&#47"}}(window);
/* xlsx.js (C) 2013-2015 SheetJS -- http://sheetjs.com */

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.JSZip=e()}}(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}({1:[function(_dereq_,module,exports){"use strict";var _keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";exports.encode=function(input,utf8){var output="";var chr1,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;while(i<input.length){chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=(chr1&3)<<4|chr2>>4;enc3=(chr2&15)<<2|chr3>>6;enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64}else if(isNaN(chr3)){enc4=64}output=output+_keyStr.charAt(enc1)+_keyStr.charAt(enc2)+_keyStr.charAt(enc3)+_keyStr.charAt(enc4)}return output};exports.decode=function(input,utf8){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=_keyStr.indexOf(input.charAt(i++));enc2=_keyStr.indexOf(input.charAt(i++));enc3=_keyStr.indexOf(input.charAt(i++));enc4=_keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2)}if(enc4!=64){output=output+String.fromCharCode(chr3)}}return output}},{}],2:[function(_dereq_,module,exports){"use strict";function CompressedObject(){this.compressedSize=0;this.uncompressedSize=0;this.crc32=0;this.compressionMethod=null;this.compressedContent=null}CompressedObject.prototype={getContent:function(){return null},getCompressedContent:function(){return null}};module.exports=CompressedObject},{}],3:[function(_dereq_,module,exports){"use strict";exports.STORE={magic:"\x00\x00",compress:function(content){return content},uncompress:function(content){return content},compressInputType:null,uncompressInputType:null};exports.DEFLATE=_dereq_("./flate")},{"./flate":8}],4:[function(_dereq_,module,exports){"use strict";var utils=_dereq_("./utils");var table=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,2932959818,3654703836,1088359270,936918e3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117];module.exports=function crc32(input,crc){if(typeof input==="undefined"||!input.length){return 0}var isArray=utils.getTypeOf(input)!=="string";if(typeof crc=="undefined"){crc=0}var x=0;var y=0;var b=0;crc=crc^-1;for(var i=0,iTop=input.length;i<iTop;i++){b=isArray?input[i]:input.charCodeAt(i);y=(crc^b)&255;x=table[y];crc=crc>>>8^x}return crc^-1}},{"./utils":21}],5:[function(_dereq_,module,exports){"use strict";var utils=_dereq_("./utils");function DataReader(data){this.data=null;this.length=0;this.index=0}DataReader.prototype={checkOffset:function(offset){this.checkIndex(this.index+offset)},checkIndex:function(newIndex){if(this.length<newIndex||newIndex<0){throw new Error("End of data reached (data length = "+this.length+", asked index = "+newIndex+"). Corrupted zip ?")}},setIndex:function(newIndex){this.checkIndex(newIndex);this.index=newIndex},skip:function(n){this.setIndex(this.index+n)},byteAt:function(i){},readInt:function(size){var result=0,i;this.checkOffset(size);for(i=this.index+size-1;i>=this.index;i--){result=(result<<8)+this.byteAt(i)}this.index+=size;return result},readString:function(size){return utils.transformTo("string",this.readData(size))},readData:function(size){},lastIndexOfSignature:function(sig){},readDate:function(){var dostime=this.readInt(4);return new Date((dostime>>25&127)+1980,(dostime>>21&15)-1,dostime>>16&31,dostime>>11&31,dostime>>5&63,(dostime&31)<<1)}};module.exports=DataReader},{"./utils":21}],6:[function(_dereq_,module,exports){"use strict";exports.base64=false;exports.binary=false;exports.dir=false;exports.createFolders=false;exports.date=null;exports.compression=null;exports.comment=null},{}],7:[function(_dereq_,module,exports){"use strict";var utils=_dereq_("./utils");exports.string2binary=function(str){return utils.string2binary(str)};exports.string2Uint8Array=function(str){return utils.transformTo("uint8array",str)};exports.uint8Array2String=function(array){return utils.transformTo("string",array)};exports.string2Blob=function(str){var buffer=utils.transformTo("arraybuffer",str);return utils.arrayBuffer2Blob(buffer)};exports.arrayBuffer2Blob=function(buffer){return utils.arrayBuffer2Blob(buffer)};exports.transformTo=function(outputType,input){return utils.transformTo(outputType,input)};exports.getTypeOf=function(input){return utils.getTypeOf(input)};exports.checkSupport=function(type){return utils.checkSupport(type)};exports.MAX_VALUE_16BITS=utils.MAX_VALUE_16BITS;exports.MAX_VALUE_32BITS=utils.MAX_VALUE_32BITS;exports.pretty=function(str){return utils.pretty(str)};exports.findCompression=function(compressionMethod){return utils.findCompression(compressionMethod)};exports.isRegExp=function(object){return utils.isRegExp(object)}},{"./utils":21}],8:[function(_dereq_,module,exports){"use strict";var USE_TYPEDARRAY=typeof Uint8Array!=="undefined"&&typeof Uint16Array!=="undefined"&&typeof Uint32Array!=="undefined";var pako=_dereq_("pako");exports.uncompressInputType=USE_TYPEDARRAY?"uint8array":"array";exports.compressInputType=USE_TYPEDARRAY?"uint8array":"array";exports.magic="\b\x00";exports.compress=function(input){return pako.deflateRaw(input)};exports.uncompress=function(input){return pako.inflateRaw(input)}},{pako:24}],9:[function(_dereq_,module,exports){"use strict";var base64=_dereq_("./base64");function JSZip(data,options){if(!(this instanceof JSZip))return new JSZip(data,options);this.files={};this.comment=null;this.root="";if(data){this.load(data,options)}this.clone=function(){var newObj=new JSZip;for(var i in this){if(typeof this[i]!=="function"){newObj[i]=this[i]}}return newObj}}JSZip.prototype=_dereq_("./object");JSZip.prototype.load=_dereq_("./load");JSZip.support=_dereq_("./support");JSZip.defaults=_dereq_("./defaults");JSZip.utils=_dereq_("./deprecatedPublicUtils");JSZip.base64={encode:function(input){return base64.encode(input)},decode:function(input){return base64.decode(input)}};JSZip.compressions=_dereq_("./compressions");module.exports=JSZip},{"./base64":1,"./compressions":3,"./defaults":6,"./deprecatedPublicUtils":7,"./load":10,"./object":13,"./support":17}],10:[function(_dereq_,module,exports){"use strict";var base64=_dereq_("./base64");var ZipEntries=_dereq_("./zipEntries");module.exports=function(data,options){var files,zipEntries,i,input;options=options||{};if(options.base64){data=base64.decode(data)}zipEntries=new ZipEntries(data,options);files=zipEntries.files;for(i=0;i<files.length;i++){input=files[i];this.file(input.fileName,input.decompressed,{binary:true,optimizedBinaryString:true,date:input.date,dir:input.dir,comment:input.fileComment.length?input.fileComment:null,createFolders:options.createFolders})}if(zipEntries.zipComment.length){this.comment=zipEntries.zipComment}return this}},{"./base64":1,"./zipEntries":22}],11:[function(_dereq_,module,exports){(function(Buffer){"use strict";module.exports=function(data,encoding){return new Buffer(data,encoding)};module.exports.test=function(b){return Buffer.isBuffer(b)}}).call(this,typeof Buffer!=="undefined"?Buffer:undefined)},{}],12:[function(_dereq_,module,exports){"use strict";var Uint8ArrayReader=_dereq_("./uint8ArrayReader");function NodeBufferReader(data){this.data=data;this.length=this.data.length;this.index=0}NodeBufferReader.prototype=new Uint8ArrayReader;NodeBufferReader.prototype.readData=function(size){this.checkOffset(size);var result=this.data.slice(this.index,this.index+size);this.index+=size;return result};module.exports=NodeBufferReader},{"./uint8ArrayReader":18}],13:[function(_dereq_,module,exports){"use strict";var support=_dereq_("./support");var utils=_dereq_("./utils");var crc32=_dereq_("./crc32");var signature=_dereq_("./signature");var defaults=_dereq_("./defaults");var base64=_dereq_("./base64");var compressions=_dereq_("./compressions");var CompressedObject=_dereq_("./compressedObject");var nodeBuffer=_dereq_("./nodeBuffer");var utf8=_dereq_("./utf8");var StringWriter=_dereq_("./stringWriter");var Uint8ArrayWriter=_dereq_("./uint8ArrayWriter");var getRawData=function(file){if(file._data instanceof CompressedObject){file._data=file._data.getContent();file.options.binary=true;file.options.base64=false;if(utils.getTypeOf(file._data)==="uint8array"){var copy=file._data;file._data=new Uint8Array(copy.length);if(copy.length!==0){file._data.set(copy,0)}}}return file._data};var getBinaryData=function(file){var result=getRawData(file),type=utils.getTypeOf(result);if(type==="string"){if(!file.options.binary){if(support.nodebuffer){return nodeBuffer(result,"utf-8")}}return file.asBinary()}return result};var dataToString=function(asUTF8){var result=getRawData(this);if(result===null||typeof result==="undefined"){return""}if(this.options.base64){result=base64.decode(result)}if(asUTF8&&this.options.binary){result=out.utf8decode(result)}else{result=utils.transformTo("string",result)}if(!asUTF8&&!this.options.binary){result=utils.transformTo("string",out.utf8encode(result))}return result};var ZipObject=function(name,data,options){this.name=name;this.dir=options.dir;this.date=options.date;this.comment=options.comment;this._data=data;this.options=options;this._initialMetadata={dir:options.dir,date:options.date}};ZipObject.prototype={asText:function(){return dataToString.call(this,true)},asBinary:function(){return dataToString.call(this,false)},asNodeBuffer:function(){var result=getBinaryData(this);return utils.transformTo("nodebuffer",result)},asUint8Array:function(){var result=getBinaryData(this);return utils.transformTo("uint8array",result)},asArrayBuffer:function(){return this.asUint8Array().buffer}};var decToHex=function(dec,bytes){var hex="",i;for(i=0;i<bytes;i++){hex+=String.fromCharCode(dec&255);dec=dec>>>8}return hex};var extend=function(){var result={},i,attr;for(i=0;i<arguments.length;i++){for(attr in arguments[i]){if(arguments[i].hasOwnProperty(attr)&&typeof result[attr]==="undefined"){result[attr]=arguments[i][attr]}}}return result};var prepareFileAttrs=function(o){o=o||{};if(o.base64===true&&(o.binary===null||o.binary===undefined)){o.binary=true}o=extend(o,defaults);o.date=o.date||new Date;if(o.compression!==null)o.compression=o.compression.toUpperCase();return o};var fileAdd=function(name,data,o){var dataType=utils.getTypeOf(data),parent;o=prepareFileAttrs(o);if(o.createFolders&&(parent=parentFolder(name))){folderAdd.call(this,parent,true)}if(o.dir||data===null||typeof data==="undefined"){o.base64=false;o.binary=false;data=null}else if(dataType==="string"){if(o.binary&&!o.base64){if(o.optimizedBinaryString!==true){data=utils.string2binary(data)}}}else{o.base64=false;o.binary=true;if(!dataType&&!(data instanceof CompressedObject)){throw new Error("The data of '"+name+"' is in an unsupported format !")}if(dataType==="arraybuffer"){data=utils.transformTo("uint8array",data)}}var object=new ZipObject(name,data,o);this.files[name]=object;return object};var parentFolder=function(path){if(path.slice(-1)=="/"){path=path.substring(0,path.length-1)}var lastSlash=path.lastIndexOf("/");return lastSlash>0?path.substring(0,lastSlash):""};var folderAdd=function(name,createFolders){if(name.slice(-1)!="/"){name+="/"}createFolders=typeof createFolders!=="undefined"?createFolders:false;if(!this.files[name]){fileAdd.call(this,name,null,{dir:true,createFolders:createFolders})}return this.files[name]};var generateCompressedObjectFrom=function(file,compression){var result=new CompressedObject,content;if(file._data instanceof CompressedObject){result.uncompressedSize=file._data.uncompressedSize;result.crc32=file._data.crc32;if(result.uncompressedSize===0||file.dir){compression=compressions["STORE"];result.compressedContent="";result.crc32=0}else if(file._data.compressionMethod===compression.magic){result.compressedContent=file._data.getCompressedContent()}else{content=file._data.getContent();result.compressedContent=compression.compress(utils.transformTo(compression.compressInputType,content))}}else{content=getBinaryData(file);if(!content||content.length===0||file.dir){compression=compressions["STORE"];content=""}result.uncompressedSize=content.length;result.crc32=crc32(content);result.compressedContent=compression.compress(utils.transformTo(compression.compressInputType,content))}result.compressedSize=result.compressedContent.length;result.compressionMethod=compression.magic;return result};var generateZipParts=function(name,file,compressedObject,offset){var data=compressedObject.compressedContent,utfEncodedFileName=utils.transformTo("string",utf8.utf8encode(file.name)),comment=file.comment||"",utfEncodedComment=utils.transformTo("string",utf8.utf8encode(comment)),useUTF8ForFileName=utfEncodedFileName.length!==file.name.length,useUTF8ForComment=utfEncodedComment.length!==comment.length,o=file.options,dosTime,dosDate,extraFields="",unicodePathExtraField="",unicodeCommentExtraField="",dir,date;if(file._initialMetadata.dir!==file.dir){dir=file.dir}else{dir=o.dir}if(file._initialMetadata.date!==file.date){date=file.date}else{date=o.date}dosTime=date.getHours();dosTime=dosTime<<6;dosTime=dosTime|date.getMinutes();dosTime=dosTime<<5;dosTime=dosTime|date.getSeconds()/2;dosDate=date.getFullYear()-1980;dosDate=dosDate<<4;dosDate=dosDate|date.getMonth()+1;dosDate=dosDate<<5;dosDate=dosDate|date.getDate();if(useUTF8ForFileName){unicodePathExtraField=decToHex(1,1)+decToHex(crc32(utfEncodedFileName),4)+utfEncodedFileName;extraFields+="up"+decToHex(unicodePathExtraField.length,2)+unicodePathExtraField}if(useUTF8ForComment){unicodeCommentExtraField=decToHex(1,1)+decToHex(this.crc32(utfEncodedComment),4)+utfEncodedComment;extraFields+="uc"+decToHex(unicodeCommentExtraField.length,2)+unicodeCommentExtraField}var header="";header+="\n\x00";header+=useUTF8ForFileName||useUTF8ForComment?"\x00\b":"\x00\x00";header+=compressedObject.compressionMethod;header+=decToHex(dosTime,2);header+=decToHex(dosDate,2);header+=decToHex(compressedObject.crc32,4);header+=decToHex(compressedObject.compressedSize,4);header+=decToHex(compressedObject.uncompressedSize,4);header+=decToHex(utfEncodedFileName.length,2);header+=decToHex(extraFields.length,2);var fileRecord=signature.LOCAL_FILE_HEADER+header+utfEncodedFileName+extraFields;var dirRecord=signature.CENTRAL_FILE_HEADER+"\x00"+header+decToHex(utfEncodedComment.length,2)+"\x00\x00"+"\x00\x00"+(dir===true?"\x00\x00\x00":"\x00\x00\x00\x00")+decToHex(offset,4)+utfEncodedFileName+extraFields+utfEncodedComment;return{fileRecord:fileRecord,dirRecord:dirRecord,compressedObject:compressedObject}};var out={load:function(stream,options){throw new Error("Load method is not defined. Is the file jszip-load.js included ?")},filter:function(search){var result=[],filename,relativePath,file,fileClone;for(filename in this.files){if(!this.files.hasOwnProperty(filename)){continue}file=this.files[filename];fileClone=new ZipObject(file.name,file._data,extend(file.options));relativePath=filename.slice(this.root.length,filename.length);if(filename.slice(0,this.root.length)===this.root&&search(relativePath,fileClone)){result.push(fileClone)}}return result},file:function(name,data,o){if(arguments.length===1){if(utils.isRegExp(name)){var regexp=name;return this.filter(function(relativePath,file){return!file.dir&&regexp.test(relativePath)})}else{return this.filter(function(relativePath,file){return!file.dir&&relativePath===name})[0]||null}}else{name=this.root+name;fileAdd.call(this,name,data,o)}return this},folder:function(arg){if(!arg){return this}if(utils.isRegExp(arg)){return this.filter(function(relativePath,file){return file.dir&&arg.test(relativePath)})}var name=this.root+arg;var newFolder=folderAdd.call(this,name);var ret=this.clone();ret.root=newFolder.name;return ret},remove:function(name){name=this.root+name;var file=this.files[name];if(!file){if(name.slice(-1)!="/"){name+="/"}file=this.files[name]}if(file&&!file.dir){delete this.files[name]}else{var kids=this.filter(function(relativePath,file){return file.name.slice(0,name.length)===name});for(var i=0;i<kids.length;i++){delete this.files[kids[i].name]}}return this},generate:function(options){options=extend(options||{},{base64:true,compression:"STORE",type:"base64",comment:null});utils.checkSupport(options.type);var zipData=[],localDirLength=0,centralDirLength=0,writer,i,utfEncodedComment=utils.transformTo("string",this.utf8encode(options.comment||this.comment||""));for(var name in this.files){if(!this.files.hasOwnProperty(name)){continue}var file=this.files[name];var compressionName=file.options.compression||options.compression.toUpperCase();var compression=compressions[compressionName];if(!compression){throw new Error(compressionName+" is not a valid compression method !")}var compressedObject=generateCompressedObjectFrom.call(this,file,compression);var zipPart=generateZipParts.call(this,name,file,compressedObject,localDirLength);localDirLength+=zipPart.fileRecord.length+compressedObject.compressedSize;centralDirLength+=zipPart.dirRecord.length;zipData.push(zipPart)}var dirEnd="";dirEnd=signature.CENTRAL_DIRECTORY_END+"\x00\x00"+"\x00\x00"+decToHex(zipData.length,2)+decToHex(zipData.length,2)+decToHex(centralDirLength,4)+decToHex(localDirLength,4)+decToHex(utfEncodedComment.length,2)+utfEncodedComment;var typeName=options.type.toLowerCase();if(typeName==="uint8array"||typeName==="arraybuffer"||typeName==="blob"||typeName==="nodebuffer"){writer=new Uint8ArrayWriter(localDirLength+centralDirLength+dirEnd.length)}else{writer=new StringWriter(localDirLength+centralDirLength+dirEnd.length)}for(i=0;i<zipData.length;i++){writer.append(zipData[i].fileRecord);writer.append(zipData[i].compressedObject.compressedContent)}for(i=0;i<zipData.length;i++){writer.append(zipData[i].dirRecord)}writer.append(dirEnd);var zip=writer.finalize();switch(options.type.toLowerCase()){case"uint8array":case"arraybuffer":case"nodebuffer":return utils.transformTo(options.type.toLowerCase(),zip);case"blob":return utils.arrayBuffer2Blob(utils.transformTo("arraybuffer",zip));case"base64":return options.base64?base64.encode(zip):zip;default:return zip}},crc32:function(input,crc){return crc32(input,crc)},utf8encode:function(string){return utils.transformTo("string",utf8.utf8encode(string))},utf8decode:function(input){return utf8.utf8decode(input)}};module.exports=out},{"./base64":1,"./compressedObject":2,"./compressions":3,"./crc32":4,"./defaults":6,"./nodeBuffer":11,"./signature":14,"./stringWriter":16,"./support":17,"./uint8ArrayWriter":19,"./utf8":20,"./utils":21}],14:[function(_dereq_,module,exports){"use strict";exports.LOCAL_FILE_HEADER="PK";exports.CENTRAL_FILE_HEADER="PK";exports.CENTRAL_DIRECTORY_END="PK";exports.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK";exports.ZIP64_CENTRAL_DIRECTORY_END="PK";exports.DATA_DESCRIPTOR="PK\b"},{}],15:[function(_dereq_,module,exports){"use strict";var DataReader=_dereq_("./dataReader");var utils=_dereq_("./utils");function StringReader(data,optimizedBinaryString){this.data=data;if(!optimizedBinaryString){this.data=utils.string2binary(this.data)}this.length=this.data.length;this.index=0}StringReader.prototype=new DataReader;StringReader.prototype.byteAt=function(i){return this.data.charCodeAt(i)};StringReader.prototype.lastIndexOfSignature=function(sig){return this.data.lastIndexOf(sig)};StringReader.prototype.readData=function(size){this.checkOffset(size);var result=this.data.slice(this.index,this.index+size);this.index+=size;return result};module.exports=StringReader},{"./dataReader":5,"./utils":21}],16:[function(_dereq_,module,exports){"use strict";var utils=_dereq_("./utils");var StringWriter=function(){this.data=[]};StringWriter.prototype={append:function(input){input=utils.transformTo("string",input);this.data.push(input)},finalize:function(){return this.data.join("")}};module.exports=StringWriter},{"./utils":21}],17:[function(_dereq_,module,exports){(function(Buffer){"use strict";exports.base64=true;exports.array=true;exports.string=true;exports.arraybuffer=typeof ArrayBuffer!=="undefined"&&typeof Uint8Array!=="undefined";exports.nodebuffer=typeof Buffer!=="undefined";exports.uint8array=typeof Uint8Array!=="undefined";if(typeof ArrayBuffer==="undefined"){exports.blob=false}else{var buffer=new ArrayBuffer(0);try{exports.blob=new Blob([buffer],{type:"application/zip"}).size===0}catch(e){try{var Builder=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder;var builder=new Builder;builder.append(buffer);exports.blob=builder.getBlob("application/zip").size===0}catch(e){exports.blob=false}}}}).call(this,typeof Buffer!=="undefined"?Buffer:undefined)},{}],18:[function(_dereq_,module,exports){"use strict";var DataReader=_dereq_("./dataReader");function Uint8ArrayReader(data){if(data){this.data=data;this.length=this.data.length;this.index=0}}Uint8ArrayReader.prototype=new DataReader;Uint8ArrayReader.prototype.byteAt=function(i){return this.data[i]};Uint8ArrayReader.prototype.lastIndexOfSignature=function(sig){var sig0=sig.charCodeAt(0),sig1=sig.charCodeAt(1),sig2=sig.charCodeAt(2),sig3=sig.charCodeAt(3);for(var i=this.length-4;i>=0;--i){if(this.data[i]===sig0&&this.data[i+1]===sig1&&this.data[i+2]===sig2&&this.data[i+3]===sig3){return i}}return-1};Uint8ArrayReader.prototype.readData=function(size){this.checkOffset(size);if(size===0){return new Uint8Array(0)}var result=this.data.subarray(this.index,this.index+size);this.index+=size;return result};module.exports=Uint8ArrayReader},{"./dataReader":5}],19:[function(_dereq_,module,exports){"use strict";var utils=_dereq_("./utils");var Uint8ArrayWriter=function(length){this.data=new Uint8Array(length);this.index=0};Uint8ArrayWriter.prototype={append:function(input){if(input.length!==0){input=utils.transformTo("uint8array",input);this.data.set(input,this.index);this.index+=input.length}},finalize:function(){return this.data}};module.exports=Uint8ArrayWriter},{"./utils":21}],20:[function(_dereq_,module,exports){"use strict";var utils=_dereq_("./utils");var support=_dereq_("./support");var nodeBuffer=_dereq_("./nodeBuffer");var _utf8len=new Array(256);for(var i=0;i<256;i++){_utf8len[i]=i>=252?6:i>=248?5:i>=240?4:i>=224?3:i>=192?2:1}_utf8len[254]=_utf8len[254]=1;var string2buf=function(str){var buf,c,c2,m_pos,i,str_len=str.length,buf_len=0;for(m_pos=0;m_pos<str_len;m_pos++){c=str.charCodeAt(m_pos);if((c&64512)===55296&&m_pos+1<str_len){c2=str.charCodeAt(m_pos+1);if((c2&64512)===56320){c=65536+(c-55296<<10)+(c2-56320);m_pos++}}buf_len+=c<128?1:c<2048?2:c<65536?3:4}if(support.uint8array){buf=new Uint8Array(buf_len)}else{buf=new Array(buf_len)}for(i=0,m_pos=0;i<buf_len;m_pos++){c=str.charCodeAt(m_pos);if((c&64512)===55296&&m_pos+1<str_len){c2=str.charCodeAt(m_pos+1);if((c2&64512)===56320){c=65536+(c-55296<<10)+(c2-56320);m_pos++}}if(c<128){buf[i++]=c}else if(c<2048){buf[i++]=192|c>>>6;buf[i++]=128|c&63}else if(c<65536){buf[i++]=224|c>>>12;buf[i++]=128|c>>>6&63;buf[i++]=128|c&63}else{buf[i++]=240|c>>>18;buf[i++]=128|c>>>12&63;buf[i++]=128|c>>>6&63;buf[i++]=128|c&63}}return buf};var utf8border=function(buf,max){var pos;max=max||buf.length;if(max>buf.length){max=buf.length}pos=max-1;while(pos>=0&&(buf[pos]&192)===128){pos--}if(pos<0){return max}if(pos===0){return max}return pos+_utf8len[buf[pos]]>max?pos:max};var buf2string=function(buf){var str,i,out,c,c_len;var len=buf.length;var utf16buf=new Array(len*2);for(out=0,i=0;i<len;){c=buf[i++];if(c<128){utf16buf[out++]=c;continue}c_len=_utf8len[c];if(c_len>4){utf16buf[out++]=65533;i+=c_len-1;continue}c&=c_len===2?31:c_len===3?15:7;while(c_len>1&&i<len){c=c<<6|buf[i++]&63;c_len--}if(c_len>1){utf16buf[out++]=65533;continue}if(c<65536){utf16buf[out++]=c}else{c-=65536;utf16buf[out++]=55296|c>>10&1023;utf16buf[out++]=56320|c&1023}}if(utf16buf.length!==out){if(utf16buf.subarray){utf16buf=utf16buf.subarray(0,out)}else{utf16buf.length=out}}return utils.applyFromCharCode(utf16buf)};exports.utf8encode=function utf8encode(str){if(support.nodebuffer){return nodeBuffer(str,"utf-8")}return string2buf(str)};exports.utf8decode=function utf8decode(buf){if(support.nodebuffer){return utils.transformTo("nodebuffer",buf).toString("utf-8")}buf=utils.transformTo(support.uint8array?"uint8array":"array",buf);var result=[],k=0,len=buf.length,chunk=65536;while(k<len){var nextBoundary=utf8border(buf,Math.min(k+chunk,len));if(support.uint8array){result.push(buf2string(buf.subarray(k,nextBoundary)))}else{result.push(buf2string(buf.slice(k,nextBoundary)))}k=nextBoundary}return result.join("")}},{"./nodeBuffer":11,"./support":17,"./utils":21}],21:[function(_dereq_,module,exports){"use strict";var support=_dereq_("./support");var compressions=_dereq_("./compressions");var nodeBuffer=_dereq_("./nodeBuffer");exports.string2binary=function(str){var result="";for(var i=0;i<str.length;i++){result+=String.fromCharCode(str.charCodeAt(i)&255)}return result};exports.arrayBuffer2Blob=function(buffer){exports.checkSupport("blob");try{return new Blob([buffer],{type:"application/zip"})}catch(e){try{var Builder=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder;var builder=new Builder;builder.append(buffer);return builder.getBlob("application/zip")}catch(e){throw new Error("Bug : can't construct the Blob.")}}};function identity(input){return input}function stringToArrayLike(str,array){for(var i=0;i<str.length;++i){array[i]=str.charCodeAt(i)&255}return array}function arrayLikeToString(array){var chunk=65536;var result=[],len=array.length,type=exports.getTypeOf(array),k=0,canUseApply=true;try{switch(type){case"uint8array":String.fromCharCode.apply(null,new Uint8Array(0));break;case"nodebuffer":String.fromCharCode.apply(null,nodeBuffer(0));break}}catch(e){canUseApply=false}if(!canUseApply){var resultStr="";for(var i=0;i<array.length;i++){resultStr+=String.fromCharCode(array[i])}return resultStr}while(k<len&&chunk>1){try{if(type==="array"||type==="nodebuffer"){result.push(String.fromCharCode.apply(null,array.slice(k,Math.min(k+chunk,len))))}else{result.push(String.fromCharCode.apply(null,array.subarray(k,Math.min(k+chunk,len))))}k+=chunk}catch(e){chunk=Math.floor(chunk/2)}}return result.join("")}exports.applyFromCharCode=arrayLikeToString;function arrayLikeToArrayLike(arrayFrom,arrayTo){for(var i=0;i<arrayFrom.length;i++){arrayTo[i]=arrayFrom[i]}return arrayTo}var transform={};transform["string"]={string:identity,array:function(input){return stringToArrayLike(input,new Array(input.length))},arraybuffer:function(input){return transform["string"]["uint8array"](input).buffer},uint8array:function(input){return stringToArrayLike(input,new Uint8Array(input.length))},nodebuffer:function(input){return stringToArrayLike(input,nodeBuffer(input.length))}};transform["array"]={string:arrayLikeToString,array:identity,arraybuffer:function(input){return new Uint8Array(input).buffer},uint8array:function(input){return new Uint8Array(input)},nodebuffer:function(input){return nodeBuffer(input)}};transform["arraybuffer"]={string:function(input){return arrayLikeToString(new Uint8Array(input))},array:function(input){return arrayLikeToArrayLike(new Uint8Array(input),new Array(input.byteLength))},arraybuffer:identity,uint8array:function(input){return new Uint8Array(input)},nodebuffer:function(input){return nodeBuffer(new Uint8Array(input))}};transform["uint8array"]={string:arrayLikeToString,array:function(input){return arrayLikeToArrayLike(input,new Array(input.length))},arraybuffer:function(input){return input.buffer},uint8array:identity,nodebuffer:function(input){return nodeBuffer(input)}};transform["nodebuffer"]={string:arrayLikeToString,array:function(input){return arrayLikeToArrayLike(input,new Array(input.length))},arraybuffer:function(input){return transform["nodebuffer"]["uint8array"](input).buffer},uint8array:function(input){return arrayLikeToArrayLike(input,new Uint8Array(input.length))},nodebuffer:identity};exports.transformTo=function(outputType,input){if(!input){input=""}if(!outputType){return input}exports.checkSupport(outputType);var inputType=exports.getTypeOf(input);var result=transform[inputType][outputType](input);return result};exports.getTypeOf=function(input){if(typeof input==="string"){return"string"}if(Object.prototype.toString.call(input)==="[object Array]"){return"array"}if(support.nodebuffer&&nodeBuffer.test(input)){return"nodebuffer"}if(support.uint8array&&input instanceof Uint8Array){return"uint8array"}if(support.arraybuffer&&input instanceof ArrayBuffer){return"arraybuffer"}};exports.checkSupport=function(type){var supported=support[type.toLowerCase()];if(!supported){throw new Error(type+" is not supported by this browser")}};exports.MAX_VALUE_16BITS=65535;exports.MAX_VALUE_32BITS=-1;exports.pretty=function(str){var res="",code,i;for(i=0;i<(str||"").length;i++){code=str.charCodeAt(i);res+="\\x"+(code<16?"0":"")+code.toString(16).toUpperCase()
}return res};exports.findCompression=function(compressionMethod){for(var method in compressions){if(!compressions.hasOwnProperty(method)){continue}if(compressions[method].magic===compressionMethod){return compressions[method]}}return null};exports.isRegExp=function(object){return Object.prototype.toString.call(object)==="[object RegExp]"}},{"./compressions":3,"./nodeBuffer":11,"./support":17}],22:[function(_dereq_,module,exports){"use strict";var StringReader=_dereq_("./stringReader");var NodeBufferReader=_dereq_("./nodeBufferReader");var Uint8ArrayReader=_dereq_("./uint8ArrayReader");var utils=_dereq_("./utils");var sig=_dereq_("./signature");var ZipEntry=_dereq_("./zipEntry");var support=_dereq_("./support");var jszipProto=_dereq_("./object");function ZipEntries(data,loadOptions){this.files=[];this.loadOptions=loadOptions;if(data){this.load(data)}}ZipEntries.prototype={checkSignature:function(expectedSignature){var signature=this.reader.readString(4);if(signature!==expectedSignature){throw new Error("Corrupted zip or bug : unexpected signature "+"("+utils.pretty(signature)+", expected "+utils.pretty(expectedSignature)+")")}},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2);this.diskWithCentralDirStart=this.reader.readInt(2);this.centralDirRecordsOnThisDisk=this.reader.readInt(2);this.centralDirRecords=this.reader.readInt(2);this.centralDirSize=this.reader.readInt(4);this.centralDirOffset=this.reader.readInt(4);this.zipCommentLength=this.reader.readInt(2);this.zipComment=this.reader.readString(this.zipCommentLength);this.zipComment=jszipProto.utf8decode(this.zipComment)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8);this.versionMadeBy=this.reader.readString(2);this.versionNeeded=this.reader.readInt(2);this.diskNumber=this.reader.readInt(4);this.diskWithCentralDirStart=this.reader.readInt(4);this.centralDirRecordsOnThisDisk=this.reader.readInt(8);this.centralDirRecords=this.reader.readInt(8);this.centralDirSize=this.reader.readInt(8);this.centralDirOffset=this.reader.readInt(8);this.zip64ExtensibleData={};var extraDataSize=this.zip64EndOfCentralSize-44,index=0,extraFieldId,extraFieldLength,extraFieldValue;while(index<extraDataSize){extraFieldId=this.reader.readInt(2);extraFieldLength=this.reader.readInt(4);extraFieldValue=this.reader.readString(extraFieldLength);this.zip64ExtensibleData[extraFieldId]={id:extraFieldId,length:extraFieldLength,value:extraFieldValue}}},readBlockZip64EndOfCentralLocator:function(){this.diskWithZip64CentralDirStart=this.reader.readInt(4);this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8);this.disksCount=this.reader.readInt(4);if(this.disksCount>1){throw new Error("Multi-volumes zip are not supported")}},readLocalFiles:function(){var i,file;for(i=0;i<this.files.length;i++){file=this.files[i];this.reader.setIndex(file.localHeaderOffset);this.checkSignature(sig.LOCAL_FILE_HEADER);file.readLocalPart(this.reader);file.handleUTF8()}},readCentralDir:function(){var file;this.reader.setIndex(this.centralDirOffset);while(this.reader.readString(4)===sig.CENTRAL_FILE_HEADER){file=new ZipEntry({zip64:this.zip64},this.loadOptions);file.readCentralPart(this.reader);this.files.push(file)}},readEndOfCentral:function(){var offset=this.reader.lastIndexOfSignature(sig.CENTRAL_DIRECTORY_END);if(offset===-1){throw new Error("Corrupted zip : can't find end of central directory")}this.reader.setIndex(offset);this.checkSignature(sig.CENTRAL_DIRECTORY_END);this.readBlockEndOfCentral();if(this.diskNumber===utils.MAX_VALUE_16BITS||this.diskWithCentralDirStart===utils.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===utils.MAX_VALUE_16BITS||this.centralDirRecords===utils.MAX_VALUE_16BITS||this.centralDirSize===utils.MAX_VALUE_32BITS||this.centralDirOffset===utils.MAX_VALUE_32BITS){this.zip64=true;offset=this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);if(offset===-1){throw new Error("Corrupted zip : can't find the ZIP64 end of central directory locator")}this.reader.setIndex(offset);this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);this.readBlockZip64EndOfCentralLocator();this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);this.readBlockZip64EndOfCentral()}},prepareReader:function(data){var type=utils.getTypeOf(data);if(type==="string"&&!support.uint8array){this.reader=new StringReader(data,this.loadOptions.optimizedBinaryString)}else if(type==="nodebuffer"){this.reader=new NodeBufferReader(data)}else{this.reader=new Uint8ArrayReader(utils.transformTo("uint8array",data))}},load:function(data){this.prepareReader(data);this.readEndOfCentral();this.readCentralDir();this.readLocalFiles()}};module.exports=ZipEntries},{"./nodeBufferReader":12,"./object":13,"./signature":14,"./stringReader":15,"./support":17,"./uint8ArrayReader":18,"./utils":21,"./zipEntry":23}],23:[function(_dereq_,module,exports){"use strict";var StringReader=_dereq_("./stringReader");var utils=_dereq_("./utils");var CompressedObject=_dereq_("./compressedObject");var jszipProto=_dereq_("./object");function ZipEntry(options,loadOptions){this.options=options;this.loadOptions=loadOptions}ZipEntry.prototype={isEncrypted:function(){return(this.bitFlag&1)===1},useUTF8:function(){return(this.bitFlag&2048)===2048},prepareCompressedContent:function(reader,from,length){return function(){var previousIndex=reader.index;reader.setIndex(from);var compressedFileData=reader.readData(length);reader.setIndex(previousIndex);return compressedFileData}},prepareContent:function(reader,from,length,compression,uncompressedSize){return function(){var compressedFileData=utils.transformTo(compression.uncompressInputType,this.getCompressedContent());var uncompressedFileData=compression.uncompress(compressedFileData);if(uncompressedFileData.length!==uncompressedSize){throw new Error("Bug : uncompressed data size mismatch")}return uncompressedFileData}},readLocalPart:function(reader){var compression,localExtraFieldsLength;reader.skip(22);this.fileNameLength=reader.readInt(2);localExtraFieldsLength=reader.readInt(2);this.fileName=reader.readString(this.fileNameLength);reader.skip(localExtraFieldsLength);if(this.compressedSize==-1||this.uncompressedSize==-1){throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory "+"(compressedSize == -1 || uncompressedSize == -1)")}compression=utils.findCompression(this.compressionMethod);if(compression===null){throw new Error("Corrupted zip : compression "+utils.pretty(this.compressionMethod)+" unknown (inner file : "+this.fileName+")")}this.decompressed=new CompressedObject;this.decompressed.compressedSize=this.compressedSize;this.decompressed.uncompressedSize=this.uncompressedSize;this.decompressed.crc32=this.crc32;this.decompressed.compressionMethod=this.compressionMethod;this.decompressed.getCompressedContent=this.prepareCompressedContent(reader,reader.index,this.compressedSize,compression);this.decompressed.getContent=this.prepareContent(reader,reader.index,this.compressedSize,compression,this.uncompressedSize);if(this.loadOptions.checkCRC32){this.decompressed=utils.transformTo("string",this.decompressed.getContent());if(jszipProto.crc32(this.decompressed)!==this.crc32){throw new Error("Corrupted zip : CRC32 mismatch")}}},readCentralPart:function(reader){this.versionMadeBy=reader.readString(2);this.versionNeeded=reader.readInt(2);this.bitFlag=reader.readInt(2);this.compressionMethod=reader.readString(2);this.date=reader.readDate();this.crc32=reader.readInt(4);this.compressedSize=reader.readInt(4);this.uncompressedSize=reader.readInt(4);this.fileNameLength=reader.readInt(2);this.extraFieldsLength=reader.readInt(2);this.fileCommentLength=reader.readInt(2);this.diskNumberStart=reader.readInt(2);this.internalFileAttributes=reader.readInt(2);this.externalFileAttributes=reader.readInt(4);this.localHeaderOffset=reader.readInt(4);if(this.isEncrypted()){throw new Error("Encrypted zip are not supported")}this.fileName=reader.readString(this.fileNameLength);this.readExtraFields(reader);this.parseZIP64ExtraField(reader);this.fileComment=reader.readString(this.fileCommentLength);this.dir=this.externalFileAttributes&16?true:false},parseZIP64ExtraField:function(reader){if(!this.extraFields[1]){return}var extraReader=new StringReader(this.extraFields[1].value);if(this.uncompressedSize===utils.MAX_VALUE_32BITS){this.uncompressedSize=extraReader.readInt(8)}if(this.compressedSize===utils.MAX_VALUE_32BITS){this.compressedSize=extraReader.readInt(8)}if(this.localHeaderOffset===utils.MAX_VALUE_32BITS){this.localHeaderOffset=extraReader.readInt(8)}if(this.diskNumberStart===utils.MAX_VALUE_32BITS){this.diskNumberStart=extraReader.readInt(4)}},readExtraFields:function(reader){var start=reader.index,extraFieldId,extraFieldLength,extraFieldValue;this.extraFields=this.extraFields||{};while(reader.index<start+this.extraFieldsLength){extraFieldId=reader.readInt(2);extraFieldLength=reader.readInt(2);extraFieldValue=reader.readString(extraFieldLength);this.extraFields[extraFieldId]={id:extraFieldId,length:extraFieldLength,value:extraFieldValue}}},handleUTF8:function(){if(this.useUTF8()){this.fileName=jszipProto.utf8decode(this.fileName);this.fileComment=jszipProto.utf8decode(this.fileComment)}else{var upath=this.findExtraFieldUnicodePath();if(upath!==null){this.fileName=upath}var ucomment=this.findExtraFieldUnicodeComment();if(ucomment!==null){this.fileComment=ucomment}}},findExtraFieldUnicodePath:function(){var upathField=this.extraFields[28789];if(upathField){var extraReader=new StringReader(upathField.value);if(extraReader.readInt(1)!==1){return null}if(jszipProto.crc32(this.fileName)!==extraReader.readInt(4)){return null}return jszipProto.utf8decode(extraReader.readString(upathField.length-5))}return null},findExtraFieldUnicodeComment:function(){var ucommentField=this.extraFields[25461];if(ucommentField){var extraReader=new StringReader(ucommentField.value);if(extraReader.readInt(1)!==1){return null}if(jszipProto.crc32(this.fileComment)!==extraReader.readInt(4)){return null}return jszipProto.utf8decode(extraReader.readString(ucommentField.length-5))}return null}};module.exports=ZipEntry},{"./compressedObject":2,"./object":13,"./stringReader":15,"./utils":21}],24:[function(_dereq_,module,exports){"use strict";var assign=_dereq_("./lib/utils/common").assign;var deflate=_dereq_("./lib/deflate");var inflate=_dereq_("./lib/inflate");var constants=_dereq_("./lib/zlib/constants");var pako={};assign(pako,deflate,inflate,constants);module.exports=pako},{"./lib/deflate":25,"./lib/inflate":26,"./lib/utils/common":27,"./lib/zlib/constants":30}],25:[function(_dereq_,module,exports){"use strict";var zlib_deflate=_dereq_("./zlib/deflate.js");var utils=_dereq_("./utils/common");var strings=_dereq_("./utils/strings");var msg=_dereq_("./zlib/messages");var zstream=_dereq_("./zlib/zstream");var Z_NO_FLUSH=0;var Z_FINISH=4;var Z_OK=0;var Z_STREAM_END=1;var Z_DEFAULT_COMPRESSION=-1;var Z_DEFAULT_STRATEGY=0;var Z_DEFLATED=8;var Deflate=function(options){this.options=utils.assign({level:Z_DEFAULT_COMPRESSION,method:Z_DEFLATED,chunkSize:16384,windowBits:15,memLevel:8,strategy:Z_DEFAULT_STRATEGY,to:""},options||{});var opt=this.options;if(opt.raw&&opt.windowBits>0){opt.windowBits=-opt.windowBits}else if(opt.gzip&&opt.windowBits>0&&opt.windowBits<16){opt.windowBits+=16}this.err=0;this.msg="";this.ended=false;this.chunks=[];this.strm=new zstream;this.strm.avail_out=0;var status=zlib_deflate.deflateInit2(this.strm,opt.level,opt.method,opt.windowBits,opt.memLevel,opt.strategy);if(status!==Z_OK){throw new Error(msg[status])}if(opt.header){zlib_deflate.deflateSetHeader(this.strm,opt.header)}};Deflate.prototype.push=function(data,mode){var strm=this.strm;var chunkSize=this.options.chunkSize;var status,_mode;if(this.ended){return false}_mode=mode===~~mode?mode:mode===true?Z_FINISH:Z_NO_FLUSH;if(typeof data==="string"){strm.input=strings.string2buf(data)}else{strm.input=data}strm.next_in=0;strm.avail_in=strm.input.length;do{if(strm.avail_out===0){strm.output=new utils.Buf8(chunkSize);strm.next_out=0;strm.avail_out=chunkSize}status=zlib_deflate.deflate(strm,_mode);if(status!==Z_STREAM_END&&status!==Z_OK){this.onEnd(status);this.ended=true;return false}if(strm.avail_out===0||strm.avail_in===0&&_mode===Z_FINISH){if(this.options.to==="string"){this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output,strm.next_out)))}else{this.onData(utils.shrinkBuf(strm.output,strm.next_out))}}}while((strm.avail_in>0||strm.avail_out===0)&&status!==Z_STREAM_END);if(_mode===Z_FINISH){status=zlib_deflate.deflateEnd(this.strm);this.onEnd(status);this.ended=true;return status===Z_OK}return true};Deflate.prototype.onData=function(chunk){this.chunks.push(chunk)};Deflate.prototype.onEnd=function(status){if(status===Z_OK){if(this.options.to==="string"){this.result=this.chunks.join("")}else{this.result=utils.flattenChunks(this.chunks)}}this.chunks=[];this.err=status;this.msg=this.strm.msg};function deflate(input,options){var deflator=new Deflate(options);deflator.push(input,true);if(deflator.err){throw deflator.msg}return deflator.result}function deflateRaw(input,options){options=options||{};options.raw=true;return deflate(input,options)}function gzip(input,options){options=options||{};options.gzip=true;return deflate(input,options)}exports.Deflate=Deflate;exports.deflate=deflate;exports.deflateRaw=deflateRaw;exports.gzip=gzip},{"./utils/common":27,"./utils/strings":28,"./zlib/deflate.js":32,"./zlib/messages":37,"./zlib/zstream":39}],26:[function(_dereq_,module,exports){"use strict";var zlib_inflate=_dereq_("./zlib/inflate.js");var utils=_dereq_("./utils/common");var strings=_dereq_("./utils/strings");var c=_dereq_("./zlib/constants");var msg=_dereq_("./zlib/messages");var zstream=_dereq_("./zlib/zstream");var gzheader=_dereq_("./zlib/gzheader");var Inflate=function(options){this.options=utils.assign({chunkSize:16384,windowBits:0,to:""},options||{});var opt=this.options;if(opt.raw&&opt.windowBits>=0&&opt.windowBits<16){opt.windowBits=-opt.windowBits;if(opt.windowBits===0){opt.windowBits=-15}}if(opt.windowBits>=0&&opt.windowBits<16&&!(options&&options.windowBits)){opt.windowBits+=32}if(opt.windowBits>15&&opt.windowBits<48){if((opt.windowBits&15)===0){opt.windowBits|=15}}this.err=0;this.msg="";this.ended=false;this.chunks=[];this.strm=new zstream;this.strm.avail_out=0;var status=zlib_inflate.inflateInit2(this.strm,opt.windowBits);if(status!==c.Z_OK){throw new Error(msg[status])}this.header=new gzheader;zlib_inflate.inflateGetHeader(this.strm,this.header)};Inflate.prototype.push=function(data,mode){var strm=this.strm;var chunkSize=this.options.chunkSize;var status,_mode;var next_out_utf8,tail,utf8str;if(this.ended){return false}_mode=mode===~~mode?mode:mode===true?c.Z_FINISH:c.Z_NO_FLUSH;if(typeof data==="string"){strm.input=strings.binstring2buf(data)}else{strm.input=data}strm.next_in=0;strm.avail_in=strm.input.length;do{if(strm.avail_out===0){strm.output=new utils.Buf8(chunkSize);strm.next_out=0;strm.avail_out=chunkSize}status=zlib_inflate.inflate(strm,c.Z_NO_FLUSH);if(status!==c.Z_STREAM_END&&status!==c.Z_OK){this.onEnd(status);this.ended=true;return false}if(strm.next_out){if(strm.avail_out===0||status===c.Z_STREAM_END||strm.avail_in===0&&_mode===c.Z_FINISH){if(this.options.to==="string"){next_out_utf8=strings.utf8border(strm.output,strm.next_out);tail=strm.next_out-next_out_utf8;utf8str=strings.buf2string(strm.output,next_out_utf8);strm.next_out=tail;strm.avail_out=chunkSize-tail;if(tail){utils.arraySet(strm.output,strm.output,next_out_utf8,tail,0)}this.onData(utf8str)}else{this.onData(utils.shrinkBuf(strm.output,strm.next_out))}}}}while(strm.avail_in>0&&status!==c.Z_STREAM_END);if(status===c.Z_STREAM_END){_mode=c.Z_FINISH}if(_mode===c.Z_FINISH){status=zlib_inflate.inflateEnd(this.strm);this.onEnd(status);this.ended=true;return status===c.Z_OK}return true};Inflate.prototype.onData=function(chunk){this.chunks.push(chunk)};Inflate.prototype.onEnd=function(status){if(status===c.Z_OK){if(this.options.to==="string"){this.result=this.chunks.join("")}else{this.result=utils.flattenChunks(this.chunks)}}this.chunks=[];this.err=status;this.msg=this.strm.msg};function inflate(input,options){var inflator=new Inflate(options);inflator.push(input,true);if(inflator.err){throw inflator.msg}return inflator.result}function inflateRaw(input,options){options=options||{};options.raw=true;return inflate(input,options)}exports.Inflate=Inflate;exports.inflate=inflate;exports.inflateRaw=inflateRaw;exports.ungzip=inflate},{"./utils/common":27,"./utils/strings":28,"./zlib/constants":30,"./zlib/gzheader":33,"./zlib/inflate.js":35,"./zlib/messages":37,"./zlib/zstream":39}],27:[function(_dereq_,module,exports){"use strict";var TYPED_OK=typeof Uint8Array!=="undefined"&&typeof Uint16Array!=="undefined"&&typeof Int32Array!=="undefined";exports.assign=function(obj){var sources=Array.prototype.slice.call(arguments,1);while(sources.length){var source=sources.shift();if(!source){continue}if(typeof source!=="object"){throw new TypeError(source+"must be non-object")}for(var p in source){if(source.hasOwnProperty(p)){obj[p]=source[p]}}}return obj};exports.shrinkBuf=function(buf,size){if(buf.length===size){return buf}if(buf.subarray){return buf.subarray(0,size)}buf.length=size;return buf};var fnTyped={arraySet:function(dest,src,src_offs,len,dest_offs){if(src.subarray&&dest.subarray){dest.set(src.subarray(src_offs,src_offs+len),dest_offs);return}for(var i=0;i<len;i++){dest[dest_offs+i]=src[src_offs+i]}},flattenChunks:function(chunks){var i,l,len,pos,chunk,result;len=0;for(i=0,l=chunks.length;i<l;i++){len+=chunks[i].length}result=new Uint8Array(len);pos=0;for(i=0,l=chunks.length;i<l;i++){chunk=chunks[i];result.set(chunk,pos);pos+=chunk.length}return result}};var fnUntyped={arraySet:function(dest,src,src_offs,len,dest_offs){for(var i=0;i<len;i++){dest[dest_offs+i]=src[src_offs+i]}},flattenChunks:function(chunks){return[].concat.apply([],chunks)}};exports.setTyped=function(on){if(on){exports.Buf8=Uint8Array;exports.Buf16=Uint16Array;exports.Buf32=Int32Array;exports.assign(exports,fnTyped)}else{exports.Buf8=Array;exports.Buf16=Array;exports.Buf32=Array;exports.assign(exports,fnUntyped)}};exports.setTyped(TYPED_OK)},{}],28:[function(_dereq_,module,exports){"use strict";var utils=_dereq_("./common");var STR_APPLY_OK=true;var STR_APPLY_UIA_OK=true;try{String.fromCharCode.apply(null,[0])}catch(__){STR_APPLY_OK=false}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(__){STR_APPLY_UIA_OK=false}var _utf8len=new utils.Buf8(256);for(var i=0;i<256;i++){_utf8len[i]=i>=252?6:i>=248?5:i>=240?4:i>=224?3:i>=192?2:1}_utf8len[254]=_utf8len[254]=1;exports.string2buf=function(str){var buf,c,c2,m_pos,i,str_len=str.length,buf_len=0;for(m_pos=0;m_pos<str_len;m_pos++){c=str.charCodeAt(m_pos);if((c&64512)===55296&&m_pos+1<str_len){c2=str.charCodeAt(m_pos+1);if((c2&64512)===56320){c=65536+(c-55296<<10)+(c2-56320);m_pos++}}buf_len+=c<128?1:c<2048?2:c<65536?3:4}buf=new utils.Buf8(buf_len);for(i=0,m_pos=0;i<buf_len;m_pos++){c=str.charCodeAt(m_pos);if((c&64512)===55296&&m_pos+1<str_len){c2=str.charCodeAt(m_pos+1);if((c2&64512)===56320){c=65536+(c-55296<<10)+(c2-56320);m_pos++}}if(c<128){buf[i++]=c}else if(c<2048){buf[i++]=192|c>>>6;buf[i++]=128|c&63}else if(c<65536){buf[i++]=224|c>>>12;buf[i++]=128|c>>>6&63;buf[i++]=128|c&63}else{buf[i++]=240|c>>>18;buf[i++]=128|c>>>12&63;buf[i++]=128|c>>>6&63;buf[i++]=128|c&63}}return buf};function buf2binstring(buf,len){if(len<65537){if(buf.subarray&&STR_APPLY_UIA_OK||!buf.subarray&&STR_APPLY_OK){return String.fromCharCode.apply(null,utils.shrinkBuf(buf,len))}}var result="";for(var i=0;i<len;i++){result+=String.fromCharCode(buf[i])}return result}exports.buf2binstring=function(buf){return buf2binstring(buf,buf.length)};exports.binstring2buf=function(str){var buf=new utils.Buf8(str.length);for(var i=0,len=buf.length;i<len;i++){buf[i]=str.charCodeAt(i)}return buf};exports.buf2string=function(buf,max){var i,out,c,c_len;var len=max||buf.length;var utf16buf=new Array(len*2);for(out=0,i=0;i<len;){c=buf[i++];if(c<128){utf16buf[out++]=c;continue}c_len=_utf8len[c];if(c_len>4){utf16buf[out++]=65533;i+=c_len-1;continue}c&=c_len===2?31:c_len===3?15:7;while(c_len>1&&i<len){c=c<<6|buf[i++]&63;c_len--}if(c_len>1){utf16buf[out++]=65533;continue}if(c<65536){utf16buf[out++]=c}else{c-=65536;utf16buf[out++]=55296|c>>10&1023;utf16buf[out++]=56320|c&1023}}return buf2binstring(utf16buf,out)};exports.utf8border=function(buf,max){var pos;max=max||buf.length;if(max>buf.length){max=buf.length}pos=max-1;while(pos>=0&&(buf[pos]&192)===128){pos--}if(pos<0){return max}if(pos===0){return max}return pos+_utf8len[buf[pos]]>max?pos:max}},{"./common":27}],29:[function(_dereq_,module,exports){"use strict";function adler32(adler,buf,len,pos){var s1=adler&65535|0,s2=adler>>>16&65535|0,n=0;while(len!==0){n=len>2e3?2e3:len;len-=n;do{s1=s1+buf[pos++]|0;s2=s2+s1|0}while(--n);s1%=65521;s2%=65521}return s1|s2<<16|0}module.exports=adler32},{}],30:[function(_dereq_,module,exports){module.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],31:[function(_dereq_,module,exports){"use strict";function makeTable(){var c,table=[];for(var n=0;n<256;n++){c=n;for(var k=0;k<8;k++){c=c&1?3988292384^c>>>1:c>>>1}table[n]=c}return table}var crcTable=makeTable();function crc32(crc,buf,len,pos){var t=crcTable,end=pos+len;crc=crc^-1;for(var i=pos;i<end;i++){crc=crc>>>8^t[(crc^buf[i])&255]}return crc^-1}module.exports=crc32},{}],32:[function(_dereq_,module,exports){"use strict";var utils=_dereq_("../utils/common");var trees=_dereq_("./trees");var adler32=_dereq_("./adler32");var crc32=_dereq_("./crc32");var msg=_dereq_("./messages");var Z_NO_FLUSH=0;var Z_PARTIAL_FLUSH=1;var Z_FULL_FLUSH=3;var Z_FINISH=4;var Z_BLOCK=5;var Z_OK=0;var Z_STREAM_END=1;var Z_STREAM_ERROR=-2;var Z_DATA_ERROR=-3;var Z_BUF_ERROR=-5;var Z_DEFAULT_COMPRESSION=-1;var Z_FILTERED=1;var Z_HUFFMAN_ONLY=2;var Z_RLE=3;var Z_FIXED=4;var Z_DEFAULT_STRATEGY=0;var Z_UNKNOWN=2;var Z_DEFLATED=8;var MAX_MEM_LEVEL=9;var MAX_WBITS=15;var DEF_MEM_LEVEL=8;var LENGTH_CODES=29;var LITERALS=256;var L_CODES=LITERALS+1+LENGTH_CODES;var D_CODES=30;var BL_CODES=19;var HEAP_SIZE=2*L_CODES+1;var MAX_BITS=15;var MIN_MATCH=3;var MAX_MATCH=258;var MIN_LOOKAHEAD=MAX_MATCH+MIN_MATCH+1;var PRESET_DICT=32;var INIT_STATE=42;var EXTRA_STATE=69;var NAME_STATE=73;var COMMENT_STATE=91;var HCRC_STATE=103;var BUSY_STATE=113;var FINISH_STATE=666;var BS_NEED_MORE=1;var BS_BLOCK_DONE=2;var BS_FINISH_STARTED=3;var BS_FINISH_DONE=4;var OS_CODE=3;function err(strm,errorCode){strm.msg=msg[errorCode];return errorCode}function rank(f){return(f<<1)-(f>4?9:0)}function zero(buf){var len=buf.length;while(--len>=0){buf[len]=0}}function flush_pending(strm){var s=strm.state;var len=s.pending;if(len>strm.avail_out){len=strm.avail_out}if(len===0){return}utils.arraySet(strm.output,s.pending_buf,s.pending_out,len,strm.next_out);strm.next_out+=len;s.pending_out+=len;strm.total_out+=len;strm.avail_out-=len;s.pending-=len;if(s.pending===0){s.pending_out=0}}function flush_block_only(s,last){trees._tr_flush_block(s,s.block_start>=0?s.block_start:-1,s.strstart-s.block_start,last);s.block_start=s.strstart;flush_pending(s.strm)}function put_byte(s,b){s.pending_buf[s.pending++]=b}function putShortMSB(s,b){s.pending_buf[s.pending++]=b>>>8&255;s.pending_buf[s.pending++]=b&255}function read_buf(strm,buf,start,size){var len=strm.avail_in;if(len>size){len=size}if(len===0){return 0}strm.avail_in-=len;utils.arraySet(buf,strm.input,strm.next_in,len,start);if(strm.state.wrap===1){strm.adler=adler32(strm.adler,buf,len,start)}else if(strm.state.wrap===2){strm.adler=crc32(strm.adler,buf,len,start)}strm.next_in+=len;strm.total_in+=len;return len}function longest_match(s,cur_match){var chain_length=s.max_chain_length;var scan=s.strstart;var match;var len;var best_len=s.prev_length;var nice_match=s.nice_match;var limit=s.strstart>s.w_size-MIN_LOOKAHEAD?s.strstart-(s.w_size-MIN_LOOKAHEAD):0;var _win=s.window;var wmask=s.w_mask;var prev=s.prev;var strend=s.strstart+MAX_MATCH;var scan_end1=_win[scan+best_len-1];var scan_end=_win[scan+best_len];if(s.prev_length>=s.good_match){chain_length>>=2}if(nice_match>s.lookahead){nice_match=s.lookahead}do{match=cur_match;if(_win[match+best_len]!==scan_end||_win[match+best_len-1]!==scan_end1||_win[match]!==_win[scan]||_win[++match]!==_win[scan+1]){continue}scan+=2;match++;do{}while(_win[++scan]===_win[++match]&&_win[++scan]===_win[++match]&&_win[++scan]===_win[++match]&&_win[++scan]===_win[++match]&&_win[++scan]===_win[++match]&&_win[++scan]===_win[++match]&&_win[++scan]===_win[++match]&&_win[++scan]===_win[++match]&&scan<strend);len=MAX_MATCH-(strend-scan);scan=strend-MAX_MATCH;if(len>best_len){s.match_start=cur_match;best_len=len;if(len>=nice_match){break}scan_end1=_win[scan+best_len-1];scan_end=_win[scan+best_len]}}while((cur_match=prev[cur_match&wmask])>limit&&--chain_length!==0);if(best_len<=s.lookahead){return best_len}return s.lookahead}function fill_window(s){var _w_size=s.w_size;var p,n,m,more,str;do{more=s.window_size-s.lookahead-s.strstart;if(s.strstart>=_w_size+(_w_size-MIN_LOOKAHEAD)){utils.arraySet(s.window,s.window,_w_size,_w_size,0);s.match_start-=_w_size;s.strstart-=_w_size;s.block_start-=_w_size;n=s.hash_size;p=n;do{m=s.head[--p];s.head[p]=m>=_w_size?m-_w_size:0}while(--n);n=_w_size;p=n;do{m=s.prev[--p];s.prev[p]=m>=_w_size?m-_w_size:0}while(--n);more+=_w_size}if(s.strm.avail_in===0){break}n=read_buf(s.strm,s.window,s.strstart+s.lookahead,more);s.lookahead+=n;if(s.lookahead+s.insert>=MIN_MATCH){str=s.strstart-s.insert;s.ins_h=s.window[str];s.ins_h=(s.ins_h<<s.hash_shift^s.window[str+1])&s.hash_mask;while(s.insert){s.ins_h=(s.ins_h<<s.hash_shift^s.window[str+MIN_MATCH-1])&s.hash_mask;s.prev[str&s.w_mask]=s.head[s.ins_h];s.head[s.ins_h]=str;str++;s.insert--;if(s.lookahead+s.insert<MIN_MATCH){break}}}}while(s.lookahead<MIN_LOOKAHEAD&&s.strm.avail_in!==0)}function deflate_stored(s,flush){var max_block_size=65535;if(max_block_size>s.pending_buf_size-5){max_block_size=s.pending_buf_size-5}for(;;){if(s.lookahead<=1){fill_window(s);if(s.lookahead===0&&flush===Z_NO_FLUSH){return BS_NEED_MORE}if(s.lookahead===0){break}}s.strstart+=s.lookahead;s.lookahead=0;var max_start=s.block_start+max_block_size;if(s.strstart===0||s.strstart>=max_start){s.lookahead=s.strstart-max_start;s.strstart=max_start;flush_block_only(s,false);if(s.strm.avail_out===0){return BS_NEED_MORE}}if(s.strstart-s.block_start>=s.w_size-MIN_LOOKAHEAD){flush_block_only(s,false);if(s.strm.avail_out===0){return BS_NEED_MORE}}}s.insert=0;if(flush===Z_FINISH){flush_block_only(s,true);if(s.strm.avail_out===0){return BS_FINISH_STARTED}return BS_FINISH_DONE}if(s.strstart>s.block_start){flush_block_only(s,false);if(s.strm.avail_out===0){return BS_NEED_MORE}}return BS_NEED_MORE}function deflate_fast(s,flush){var hash_head;var bflush;for(;;){if(s.lookahead<MIN_LOOKAHEAD){fill_window(s);if(s.lookahead<MIN_LOOKAHEAD&&flush===Z_NO_FLUSH){return BS_NEED_MORE}if(s.lookahead===0){break}}hash_head=0;if(s.lookahead>=MIN_MATCH){s.ins_h=(s.ins_h<<s.hash_shift^s.window[s.strstart+MIN_MATCH-1])&s.hash_mask;hash_head=s.prev[s.strstart&s.w_mask]=s.head[s.ins_h];s.head[s.ins_h]=s.strstart}if(hash_head!==0&&s.strstart-hash_head<=s.w_size-MIN_LOOKAHEAD){s.match_length=longest_match(s,hash_head)}if(s.match_length>=MIN_MATCH){bflush=trees._tr_tally(s,s.strstart-s.match_start,s.match_length-MIN_MATCH);s.lookahead-=s.match_length;if(s.match_length<=s.max_lazy_match&&s.lookahead>=MIN_MATCH){s.match_length--;do{s.strstart++;s.ins_h=(s.ins_h<<s.hash_shift^s.window[s.strstart+MIN_MATCH-1])&s.hash_mask;hash_head=s.prev[s.strstart&s.w_mask]=s.head[s.ins_h];s.head[s.ins_h]=s.strstart}while(--s.match_length!==0);s.strstart++}else{s.strstart+=s.match_length;s.match_length=0;s.ins_h=s.window[s.strstart];s.ins_h=(s.ins_h<<s.hash_shift^s.window[s.strstart+1])&s.hash_mask}}else{bflush=trees._tr_tally(s,0,s.window[s.strstart]);s.lookahead--;s.strstart++}if(bflush){flush_block_only(s,false);if(s.strm.avail_out===0){return BS_NEED_MORE}}}s.insert=s.strstart<MIN_MATCH-1?s.strstart:MIN_MATCH-1;if(flush===Z_FINISH){flush_block_only(s,true);if(s.strm.avail_out===0){return BS_FINISH_STARTED}return BS_FINISH_DONE}if(s.last_lit){flush_block_only(s,false);if(s.strm.avail_out===0){return BS_NEED_MORE}}return BS_BLOCK_DONE}function deflate_slow(s,flush){var hash_head;var bflush;var max_insert;for(;;){if(s.lookahead<MIN_LOOKAHEAD){fill_window(s);if(s.lookahead<MIN_LOOKAHEAD&&flush===Z_NO_FLUSH){return BS_NEED_MORE}if(s.lookahead===0){break}}hash_head=0;if(s.lookahead>=MIN_MATCH){s.ins_h=(s.ins_h<<s.hash_shift^s.window[s.strstart+MIN_MATCH-1])&s.hash_mask;hash_head=s.prev[s.strstart&s.w_mask]=s.head[s.ins_h];s.head[s.ins_h]=s.strstart}s.prev_length=s.match_length;s.prev_match=s.match_start;s.match_length=MIN_MATCH-1;if(hash_head!==0&&s.prev_length<s.max_lazy_match&&s.strstart-hash_head<=s.w_size-MIN_LOOKAHEAD){s.match_length=longest_match(s,hash_head);if(s.match_length<=5&&(s.strategy===Z_FILTERED||s.match_length===MIN_MATCH&&s.strstart-s.match_start>4096)){s.match_length=MIN_MATCH-1}}if(s.prev_length>=MIN_MATCH&&s.match_length<=s.prev_length){max_insert=s.strstart+s.lookahead-MIN_MATCH;bflush=trees._tr_tally(s,s.strstart-1-s.prev_match,s.prev_length-MIN_MATCH);s.lookahead-=s.prev_length-1;s.prev_length-=2;do{if(++s.strstart<=max_insert){s.ins_h=(s.ins_h<<s.hash_shift^s.window[s.strstart+MIN_MATCH-1])&s.hash_mask;hash_head=s.prev[s.strstart&s.w_mask]=s.head[s.ins_h];s.head[s.ins_h]=s.strstart}}while(--s.prev_length!==0);s.match_available=0;s.match_length=MIN_MATCH-1;s.strstart++;if(bflush){flush_block_only(s,false);if(s.strm.avail_out===0){return BS_NEED_MORE}}}else if(s.match_available){bflush=trees._tr_tally(s,0,s.window[s.strstart-1]);if(bflush){flush_block_only(s,false)}s.strstart++;s.lookahead--;if(s.strm.avail_out===0){return BS_NEED_MORE}}else{s.match_available=1;s.strstart++;s.lookahead--}}if(s.match_available){bflush=trees._tr_tally(s,0,s.window[s.strstart-1]);s.match_available=0}s.insert=s.strstart<MIN_MATCH-1?s.strstart:MIN_MATCH-1;if(flush===Z_FINISH){flush_block_only(s,true);if(s.strm.avail_out===0){return BS_FINISH_STARTED}return BS_FINISH_DONE}if(s.last_lit){flush_block_only(s,false);if(s.strm.avail_out===0){return BS_NEED_MORE}}return BS_BLOCK_DONE}function deflate_rle(s,flush){var bflush;var prev;var scan,strend;var _win=s.window;for(;;){if(s.lookahead<=MAX_MATCH){fill_window(s);if(s.lookahead<=MAX_MATCH&&flush===Z_NO_FLUSH){return BS_NEED_MORE}if(s.lookahead===0){break}}s.match_length=0;if(s.lookahead>=MIN_MATCH&&s.strstart>0){scan=s.strstart-1;prev=_win[scan];if(prev===_win[++scan]&&prev===_win[++scan]&&prev===_win[++scan]){strend=s.strstart+MAX_MATCH;do{}while(prev===_win[++scan]&&prev===_win[++scan]&&prev===_win[++scan]&&prev===_win[++scan]&&prev===_win[++scan]&&prev===_win[++scan]&&prev===_win[++scan]&&prev===_win[++scan]&&scan<strend);s.match_length=MAX_MATCH-(strend-scan);if(s.match_length>s.lookahead){s.match_length=s.lookahead}}}if(s.match_length>=MIN_MATCH){bflush=trees._tr_tally(s,1,s.match_length-MIN_MATCH);s.lookahead-=s.match_length;s.strstart+=s.match_length;s.match_length=0}else{bflush=trees._tr_tally(s,0,s.window[s.strstart]);s.lookahead--;s.strstart++}if(bflush){flush_block_only(s,false);if(s.strm.avail_out===0){return BS_NEED_MORE}}}s.insert=0;if(flush===Z_FINISH){flush_block_only(s,true);if(s.strm.avail_out===0){return BS_FINISH_STARTED}return BS_FINISH_DONE}if(s.last_lit){flush_block_only(s,false);if(s.strm.avail_out===0){return BS_NEED_MORE}}return BS_BLOCK_DONE}function deflate_huff(s,flush){var bflush;
for(;;){if(s.lookahead===0){fill_window(s);if(s.lookahead===0){if(flush===Z_NO_FLUSH){return BS_NEED_MORE}break}}s.match_length=0;bflush=trees._tr_tally(s,0,s.window[s.strstart]);s.lookahead--;s.strstart++;if(bflush){flush_block_only(s,false);if(s.strm.avail_out===0){return BS_NEED_MORE}}}s.insert=0;if(flush===Z_FINISH){flush_block_only(s,true);if(s.strm.avail_out===0){return BS_FINISH_STARTED}return BS_FINISH_DONE}if(s.last_lit){flush_block_only(s,false);if(s.strm.avail_out===0){return BS_NEED_MORE}}return BS_BLOCK_DONE}var Config=function(good_length,max_lazy,nice_length,max_chain,func){this.good_length=good_length;this.max_lazy=max_lazy;this.nice_length=nice_length;this.max_chain=max_chain;this.func=func};var configuration_table;configuration_table=[new Config(0,0,0,0,deflate_stored),new Config(4,4,8,4,deflate_fast),new Config(4,5,16,8,deflate_fast),new Config(4,6,32,32,deflate_fast),new Config(4,4,16,16,deflate_slow),new Config(8,16,32,32,deflate_slow),new Config(8,16,128,128,deflate_slow),new Config(8,32,128,256,deflate_slow),new Config(32,128,258,1024,deflate_slow),new Config(32,258,258,4096,deflate_slow)];function lm_init(s){s.window_size=2*s.w_size;zero(s.head);s.max_lazy_match=configuration_table[s.level].max_lazy;s.good_match=configuration_table[s.level].good_length;s.nice_match=configuration_table[s.level].nice_length;s.max_chain_length=configuration_table[s.level].max_chain;s.strstart=0;s.block_start=0;s.lookahead=0;s.insert=0;s.match_length=s.prev_length=MIN_MATCH-1;s.match_available=0;s.ins_h=0}function DeflateState(){this.strm=null;this.status=0;this.pending_buf=null;this.pending_buf_size=0;this.pending_out=0;this.pending=0;this.wrap=0;this.gzhead=null;this.gzindex=0;this.method=Z_DEFLATED;this.last_flush=-1;this.w_size=0;this.w_bits=0;this.w_mask=0;this.window=null;this.window_size=0;this.prev=null;this.head=null;this.ins_h=0;this.hash_size=0;this.hash_bits=0;this.hash_mask=0;this.hash_shift=0;this.block_start=0;this.match_length=0;this.prev_match=0;this.match_available=0;this.strstart=0;this.match_start=0;this.lookahead=0;this.prev_length=0;this.max_chain_length=0;this.max_lazy_match=0;this.level=0;this.strategy=0;this.good_match=0;this.nice_match=0;this.dyn_ltree=new utils.Buf16(HEAP_SIZE*2);this.dyn_dtree=new utils.Buf16((2*D_CODES+1)*2);this.bl_tree=new utils.Buf16((2*BL_CODES+1)*2);zero(this.dyn_ltree);zero(this.dyn_dtree);zero(this.bl_tree);this.l_desc=null;this.d_desc=null;this.bl_desc=null;this.bl_count=new utils.Buf16(MAX_BITS+1);this.heap=new utils.Buf16(2*L_CODES+1);zero(this.heap);this.heap_len=0;this.heap_max=0;this.depth=new utils.Buf16(2*L_CODES+1);zero(this.depth);this.l_buf=0;this.lit_bufsize=0;this.last_lit=0;this.d_buf=0;this.opt_len=0;this.static_len=0;this.matches=0;this.insert=0;this.bi_buf=0;this.bi_valid=0}function deflateResetKeep(strm){var s;if(!strm||!strm.state){return err(strm,Z_STREAM_ERROR)}strm.total_in=strm.total_out=0;strm.data_type=Z_UNKNOWN;s=strm.state;s.pending=0;s.pending_out=0;if(s.wrap<0){s.wrap=-s.wrap}s.status=s.wrap?INIT_STATE:BUSY_STATE;strm.adler=s.wrap===2?0:1;s.last_flush=Z_NO_FLUSH;trees._tr_init(s);return Z_OK}function deflateReset(strm){var ret=deflateResetKeep(strm);if(ret===Z_OK){lm_init(strm.state)}return ret}function deflateSetHeader(strm,head){if(!strm||!strm.state){return Z_STREAM_ERROR}if(strm.state.wrap!==2){return Z_STREAM_ERROR}strm.state.gzhead=head;return Z_OK}function deflateInit2(strm,level,method,windowBits,memLevel,strategy){if(!strm){return Z_STREAM_ERROR}var wrap=1;if(level===Z_DEFAULT_COMPRESSION){level=6}if(windowBits<0){wrap=0;windowBits=-windowBits}else if(windowBits>15){wrap=2;windowBits-=16}if(memLevel<1||memLevel>MAX_MEM_LEVEL||method!==Z_DEFLATED||windowBits<8||windowBits>15||level<0||level>9||strategy<0||strategy>Z_FIXED){return err(strm,Z_STREAM_ERROR)}if(windowBits===8){windowBits=9}var s=new DeflateState;strm.state=s;s.strm=strm;s.wrap=wrap;s.gzhead=null;s.w_bits=windowBits;s.w_size=1<<s.w_bits;s.w_mask=s.w_size-1;s.hash_bits=memLevel+7;s.hash_size=1<<s.hash_bits;s.hash_mask=s.hash_size-1;s.hash_shift=~~((s.hash_bits+MIN_MATCH-1)/MIN_MATCH);s.window=new utils.Buf8(s.w_size*2);s.head=new utils.Buf16(s.hash_size);s.prev=new utils.Buf16(s.w_size);s.lit_bufsize=1<<memLevel+6;s.pending_buf_size=s.lit_bufsize*4;s.pending_buf=new utils.Buf8(s.pending_buf_size);s.d_buf=s.lit_bufsize>>1;s.l_buf=(1+2)*s.lit_bufsize;s.level=level;s.strategy=strategy;s.method=method;return deflateReset(strm)}function deflateInit(strm,level){return deflateInit2(strm,level,Z_DEFLATED,MAX_WBITS,DEF_MEM_LEVEL,Z_DEFAULT_STRATEGY)}function deflate(strm,flush){var old_flush,s;var beg,val;if(!strm||!strm.state||flush>Z_BLOCK||flush<0){return strm?err(strm,Z_STREAM_ERROR):Z_STREAM_ERROR}s=strm.state;if(!strm.output||!strm.input&&strm.avail_in!==0||s.status===FINISH_STATE&&flush!==Z_FINISH){return err(strm,strm.avail_out===0?Z_BUF_ERROR:Z_STREAM_ERROR)}s.strm=strm;old_flush=s.last_flush;s.last_flush=flush;if(s.status===INIT_STATE){if(s.wrap===2){strm.adler=0;put_byte(s,31);put_byte(s,139);put_byte(s,8);if(!s.gzhead){put_byte(s,0);put_byte(s,0);put_byte(s,0);put_byte(s,0);put_byte(s,0);put_byte(s,s.level===9?2:s.strategy>=Z_HUFFMAN_ONLY||s.level<2?4:0);put_byte(s,OS_CODE);s.status=BUSY_STATE}else{put_byte(s,(s.gzhead.text?1:0)+(s.gzhead.hcrc?2:0)+(!s.gzhead.extra?0:4)+(!s.gzhead.name?0:8)+(!s.gzhead.comment?0:16));put_byte(s,s.gzhead.time&255);put_byte(s,s.gzhead.time>>8&255);put_byte(s,s.gzhead.time>>16&255);put_byte(s,s.gzhead.time>>24&255);put_byte(s,s.level===9?2:s.strategy>=Z_HUFFMAN_ONLY||s.level<2?4:0);put_byte(s,s.gzhead.os&255);if(s.gzhead.extra&&s.gzhead.extra.length){put_byte(s,s.gzhead.extra.length&255);put_byte(s,s.gzhead.extra.length>>8&255)}if(s.gzhead.hcrc){strm.adler=crc32(strm.adler,s.pending_buf,s.pending,0)}s.gzindex=0;s.status=EXTRA_STATE}}else{var header=Z_DEFLATED+(s.w_bits-8<<4)<<8;var level_flags=-1;if(s.strategy>=Z_HUFFMAN_ONLY||s.level<2){level_flags=0}else if(s.level<6){level_flags=1}else if(s.level===6){level_flags=2}else{level_flags=3}header|=level_flags<<6;if(s.strstart!==0){header|=PRESET_DICT}header+=31-header%31;s.status=BUSY_STATE;putShortMSB(s,header);if(s.strstart!==0){putShortMSB(s,strm.adler>>>16);putShortMSB(s,strm.adler&65535)}strm.adler=1}}if(s.status===EXTRA_STATE){if(s.gzhead.extra){beg=s.pending;while(s.gzindex<(s.gzhead.extra.length&65535)){if(s.pending===s.pending_buf_size){if(s.gzhead.hcrc&&s.pending>beg){strm.adler=crc32(strm.adler,s.pending_buf,s.pending-beg,beg)}flush_pending(strm);beg=s.pending;if(s.pending===s.pending_buf_size){break}}put_byte(s,s.gzhead.extra[s.gzindex]&255);s.gzindex++}if(s.gzhead.hcrc&&s.pending>beg){strm.adler=crc32(strm.adler,s.pending_buf,s.pending-beg,beg)}if(s.gzindex===s.gzhead.extra.length){s.gzindex=0;s.status=NAME_STATE}}else{s.status=NAME_STATE}}if(s.status===NAME_STATE){if(s.gzhead.name){beg=s.pending;do{if(s.pending===s.pending_buf_size){if(s.gzhead.hcrc&&s.pending>beg){strm.adler=crc32(strm.adler,s.pending_buf,s.pending-beg,beg)}flush_pending(strm);beg=s.pending;if(s.pending===s.pending_buf_size){val=1;break}}if(s.gzindex<s.gzhead.name.length){val=s.gzhead.name.charCodeAt(s.gzindex++)&255}else{val=0}put_byte(s,val)}while(val!==0);if(s.gzhead.hcrc&&s.pending>beg){strm.adler=crc32(strm.adler,s.pending_buf,s.pending-beg,beg)}if(val===0){s.gzindex=0;s.status=COMMENT_STATE}}else{s.status=COMMENT_STATE}}if(s.status===COMMENT_STATE){if(s.gzhead.comment){beg=s.pending;do{if(s.pending===s.pending_buf_size){if(s.gzhead.hcrc&&s.pending>beg){strm.adler=crc32(strm.adler,s.pending_buf,s.pending-beg,beg)}flush_pending(strm);beg=s.pending;if(s.pending===s.pending_buf_size){val=1;break}}if(s.gzindex<s.gzhead.comment.length){val=s.gzhead.comment.charCodeAt(s.gzindex++)&255}else{val=0}put_byte(s,val)}while(val!==0);if(s.gzhead.hcrc&&s.pending>beg){strm.adler=crc32(strm.adler,s.pending_buf,s.pending-beg,beg)}if(val===0){s.status=HCRC_STATE}}else{s.status=HCRC_STATE}}if(s.status===HCRC_STATE){if(s.gzhead.hcrc){if(s.pending+2>s.pending_buf_size){flush_pending(strm)}if(s.pending+2<=s.pending_buf_size){put_byte(s,strm.adler&255);put_byte(s,strm.adler>>8&255);strm.adler=0;s.status=BUSY_STATE}}else{s.status=BUSY_STATE}}if(s.pending!==0){flush_pending(strm);if(strm.avail_out===0){s.last_flush=-1;return Z_OK}}else if(strm.avail_in===0&&rank(flush)<=rank(old_flush)&&flush!==Z_FINISH){return err(strm,Z_BUF_ERROR)}if(s.status===FINISH_STATE&&strm.avail_in!==0){return err(strm,Z_BUF_ERROR)}if(strm.avail_in!==0||s.lookahead!==0||flush!==Z_NO_FLUSH&&s.status!==FINISH_STATE){var bstate=s.strategy===Z_HUFFMAN_ONLY?deflate_huff(s,flush):s.strategy===Z_RLE?deflate_rle(s,flush):configuration_table[s.level].func(s,flush);if(bstate===BS_FINISH_STARTED||bstate===BS_FINISH_DONE){s.status=FINISH_STATE}if(bstate===BS_NEED_MORE||bstate===BS_FINISH_STARTED){if(strm.avail_out===0){s.last_flush=-1}return Z_OK}if(bstate===BS_BLOCK_DONE){if(flush===Z_PARTIAL_FLUSH){trees._tr_align(s)}else if(flush!==Z_BLOCK){trees._tr_stored_block(s,0,0,false);if(flush===Z_FULL_FLUSH){zero(s.head);if(s.lookahead===0){s.strstart=0;s.block_start=0;s.insert=0}}}flush_pending(strm);if(strm.avail_out===0){s.last_flush=-1;return Z_OK}}}if(flush!==Z_FINISH){return Z_OK}if(s.wrap<=0){return Z_STREAM_END}if(s.wrap===2){put_byte(s,strm.adler&255);put_byte(s,strm.adler>>8&255);put_byte(s,strm.adler>>16&255);put_byte(s,strm.adler>>24&255);put_byte(s,strm.total_in&255);put_byte(s,strm.total_in>>8&255);put_byte(s,strm.total_in>>16&255);put_byte(s,strm.total_in>>24&255)}else{putShortMSB(s,strm.adler>>>16);putShortMSB(s,strm.adler&65535)}flush_pending(strm);if(s.wrap>0){s.wrap=-s.wrap}return s.pending!==0?Z_OK:Z_STREAM_END}function deflateEnd(strm){var status;if(!strm||!strm.state){return Z_STREAM_ERROR}status=strm.state.status;if(status!==INIT_STATE&&status!==EXTRA_STATE&&status!==NAME_STATE&&status!==COMMENT_STATE&&status!==HCRC_STATE&&status!==BUSY_STATE&&status!==FINISH_STATE){return err(strm,Z_STREAM_ERROR)}strm.state=null;return status===BUSY_STATE?err(strm,Z_DATA_ERROR):Z_OK}exports.deflateInit=deflateInit;exports.deflateInit2=deflateInit2;exports.deflateReset=deflateReset;exports.deflateResetKeep=deflateResetKeep;exports.deflateSetHeader=deflateSetHeader;exports.deflate=deflate;exports.deflateEnd=deflateEnd;exports.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":27,"./adler32":29,"./crc32":31,"./messages":37,"./trees":38}],33:[function(_dereq_,module,exports){"use strict";function GZheader(){this.text=0;this.time=0;this.xflags=0;this.os=0;this.extra=null;this.extra_len=0;this.name="";this.comment="";this.hcrc=0;this.done=false}module.exports=GZheader},{}],34:[function(_dereq_,module,exports){"use strict";var BAD=30;var TYPE=12;module.exports=function inflate_fast(strm,start){var state;var _in;var last;var _out;var beg;var end;var dmax;var wsize;var whave;var wnext;var window;var hold;var bits;var lcode;var dcode;var lmask;var dmask;var here;var op;var len;var dist;var from;var from_source;var input,output;state=strm.state;_in=strm.next_in;input=strm.input;last=_in+(strm.avail_in-5);_out=strm.next_out;output=strm.output;beg=_out-(start-strm.avail_out);end=_out+(strm.avail_out-257);dmax=state.dmax;wsize=state.wsize;whave=state.whave;wnext=state.wnext;window=state.window;hold=state.hold;bits=state.bits;lcode=state.lencode;dcode=state.distcode;lmask=(1<<state.lenbits)-1;dmask=(1<<state.distbits)-1;top:do{if(bits<15){hold+=input[_in++]<<bits;bits+=8;hold+=input[_in++]<<bits;bits+=8}here=lcode[hold&lmask];dolen:for(;;){op=here>>>24;hold>>>=op;bits-=op;op=here>>>16&255;if(op===0){output[_out++]=here&65535}else if(op&16){len=here&65535;op&=15;if(op){if(bits<op){hold+=input[_in++]<<bits;bits+=8}len+=hold&(1<<op)-1;hold>>>=op;bits-=op}if(bits<15){hold+=input[_in++]<<bits;bits+=8;hold+=input[_in++]<<bits;bits+=8}here=dcode[hold&dmask];dodist:for(;;){op=here>>>24;hold>>>=op;bits-=op;op=here>>>16&255;if(op&16){dist=here&65535;op&=15;if(bits<op){hold+=input[_in++]<<bits;bits+=8;if(bits<op){hold+=input[_in++]<<bits;bits+=8}}dist+=hold&(1<<op)-1;if(dist>dmax){strm.msg="invalid distance too far back";state.mode=BAD;break top}hold>>>=op;bits-=op;op=_out-beg;if(dist>op){op=dist-op;if(op>whave){if(state.sane){strm.msg="invalid distance too far back";state.mode=BAD;break top}}from=0;from_source=window;if(wnext===0){from+=wsize-op;if(op<len){len-=op;do{output[_out++]=window[from++]}while(--op);from=_out-dist;from_source=output}}else if(wnext<op){from+=wsize+wnext-op;op-=wnext;if(op<len){len-=op;do{output[_out++]=window[from++]}while(--op);from=0;if(wnext<len){op=wnext;len-=op;do{output[_out++]=window[from++]}while(--op);from=_out-dist;from_source=output}}}else{from+=wnext-op;if(op<len){len-=op;do{output[_out++]=window[from++]}while(--op);from=_out-dist;from_source=output}}while(len>2){output[_out++]=from_source[from++];output[_out++]=from_source[from++];output[_out++]=from_source[from++];len-=3}if(len){output[_out++]=from_source[from++];if(len>1){output[_out++]=from_source[from++]}}}else{from=_out-dist;do{output[_out++]=output[from++];output[_out++]=output[from++];output[_out++]=output[from++];len-=3}while(len>2);if(len){output[_out++]=output[from++];if(len>1){output[_out++]=output[from++]}}}}else if((op&64)===0){here=dcode[(here&65535)+(hold&(1<<op)-1)];continue dodist}else{strm.msg="invalid distance code";state.mode=BAD;break top}break}}else if((op&64)===0){here=lcode[(here&65535)+(hold&(1<<op)-1)];continue dolen}else if(op&32){state.mode=TYPE;break top}else{strm.msg="invalid literal/length code";state.mode=BAD;break top}break}}while(_in<last&&_out<end);len=bits>>3;_in-=len;bits-=len<<3;hold&=(1<<bits)-1;strm.next_in=_in;strm.next_out=_out;strm.avail_in=_in<last?5+(last-_in):5-(_in-last);strm.avail_out=_out<end?257+(end-_out):257-(_out-end);state.hold=hold;state.bits=bits;return}},{}],35:[function(_dereq_,module,exports){"use strict";var utils=_dereq_("../utils/common");var adler32=_dereq_("./adler32");var crc32=_dereq_("./crc32");var inflate_fast=_dereq_("./inffast");var inflate_table=_dereq_("./inftrees");var CODES=0;var LENS=1;var DISTS=2;var Z_FINISH=4;var Z_BLOCK=5;var Z_TREES=6;var Z_OK=0;var Z_STREAM_END=1;var Z_NEED_DICT=2;var Z_STREAM_ERROR=-2;var Z_DATA_ERROR=-3;var Z_MEM_ERROR=-4;var Z_BUF_ERROR=-5;var Z_DEFLATED=8;var HEAD=1;var FLAGS=2;var TIME=3;var OS=4;var EXLEN=5;var EXTRA=6;var NAME=7;var COMMENT=8;var HCRC=9;var DICTID=10;var DICT=11;var TYPE=12;var TYPEDO=13;var STORED=14;var COPY_=15;var COPY=16;var TABLE=17;var LENLENS=18;var CODELENS=19;var LEN_=20;var LEN=21;var LENEXT=22;var DIST=23;var DISTEXT=24;var MATCH=25;var LIT=26;var CHECK=27;var LENGTH=28;var DONE=29;var BAD=30;var MEM=31;var SYNC=32;var ENOUGH_LENS=852;var ENOUGH_DISTS=592;var MAX_WBITS=15;var DEF_WBITS=MAX_WBITS;function ZSWAP32(q){return(q>>>24&255)+(q>>>8&65280)+((q&65280)<<8)+((q&255)<<24)}function InflateState(){this.mode=0;this.last=false;this.wrap=0;this.havedict=false;this.flags=0;this.dmax=0;this.check=0;this.total=0;this.head=null;this.wbits=0;this.wsize=0;this.whave=0;this.wnext=0;this.window=null;this.hold=0;this.bits=0;this.length=0;this.offset=0;this.extra=0;this.lencode=null;this.distcode=null;this.lenbits=0;this.distbits=0;this.ncode=0;this.nlen=0;this.ndist=0;this.have=0;this.next=null;this.lens=new utils.Buf16(320);this.work=new utils.Buf16(288);this.lendyn=null;this.distdyn=null;this.sane=0;this.back=0;this.was=0}function inflateResetKeep(strm){var state;if(!strm||!strm.state){return Z_STREAM_ERROR}state=strm.state;strm.total_in=strm.total_out=state.total=0;strm.msg="";if(state.wrap){strm.adler=state.wrap&1}state.mode=HEAD;state.last=0;state.havedict=0;state.dmax=32768;state.head=null;state.hold=0;state.bits=0;state.lencode=state.lendyn=new utils.Buf32(ENOUGH_LENS);state.distcode=state.distdyn=new utils.Buf32(ENOUGH_DISTS);state.sane=1;state.back=-1;return Z_OK}function inflateReset(strm){var state;if(!strm||!strm.state){return Z_STREAM_ERROR}state=strm.state;state.wsize=0;state.whave=0;state.wnext=0;return inflateResetKeep(strm)}function inflateReset2(strm,windowBits){var wrap;var state;if(!strm||!strm.state){return Z_STREAM_ERROR}state=strm.state;if(windowBits<0){wrap=0;windowBits=-windowBits}else{wrap=(windowBits>>4)+1;if(windowBits<48){windowBits&=15}}if(windowBits&&(windowBits<8||windowBits>15)){return Z_STREAM_ERROR}if(state.window!==null&&state.wbits!==windowBits){state.window=null}state.wrap=wrap;state.wbits=windowBits;return inflateReset(strm)}function inflateInit2(strm,windowBits){var ret;var state;if(!strm){return Z_STREAM_ERROR}state=new InflateState;strm.state=state;state.window=null;ret=inflateReset2(strm,windowBits);if(ret!==Z_OK){strm.state=null}return ret}function inflateInit(strm){return inflateInit2(strm,DEF_WBITS)}var virgin=true;var lenfix,distfix;function fixedtables(state){if(virgin){var sym;lenfix=new utils.Buf32(512);distfix=new utils.Buf32(32);sym=0;while(sym<144){state.lens[sym++]=8}while(sym<256){state.lens[sym++]=9}while(sym<280){state.lens[sym++]=7}while(sym<288){state.lens[sym++]=8}inflate_table(LENS,state.lens,0,288,lenfix,0,state.work,{bits:9});sym=0;while(sym<32){state.lens[sym++]=5}inflate_table(DISTS,state.lens,0,32,distfix,0,state.work,{bits:5});virgin=false}state.lencode=lenfix;state.lenbits=9;state.distcode=distfix;state.distbits=5}function updatewindow(strm,src,end,copy){var dist;var state=strm.state;if(state.window===null){state.wsize=1<<state.wbits;state.wnext=0;state.whave=0;state.window=new utils.Buf8(state.wsize)}if(copy>=state.wsize){utils.arraySet(state.window,src,end-state.wsize,state.wsize,0);state.wnext=0;state.whave=state.wsize}else{dist=state.wsize-state.wnext;if(dist>copy){dist=copy}utils.arraySet(state.window,src,end-copy,dist,state.wnext);copy-=dist;if(copy){utils.arraySet(state.window,src,end-copy,copy,0);state.wnext=copy;state.whave=state.wsize}else{state.wnext+=dist;if(state.wnext===state.wsize){state.wnext=0}if(state.whave<state.wsize){state.whave+=dist}}}return 0}function inflate(strm,flush){var state;var input,output;var next;var put;var have,left;var hold;var bits;var _in,_out;var copy;var from;var from_source;var here=0;var here_bits,here_op,here_val;var last_bits,last_op,last_val;var len;var ret;var hbuf=new utils.Buf8(4);var opts;var n;var order=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!strm||!strm.state||!strm.output||!strm.input&&strm.avail_in!==0){return Z_STREAM_ERROR}state=strm.state;if(state.mode===TYPE){state.mode=TYPEDO}put=strm.next_out;output=strm.output;left=strm.avail_out;next=strm.next_in;input=strm.input;have=strm.avail_in;hold=state.hold;bits=state.bits;_in=have;_out=left;ret=Z_OK;inf_leave:for(;;){switch(state.mode){case HEAD:if(state.wrap===0){state.mode=TYPEDO;break}while(bits<16){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}if(state.wrap&2&&hold===35615){state.check=0;hbuf[0]=hold&255;hbuf[1]=hold>>>8&255;state.check=crc32(state.check,hbuf,2,0);hold=0;bits=0;state.mode=FLAGS;break}state.flags=0;if(state.head){state.head.done=false}if(!(state.wrap&1)||(((hold&255)<<8)+(hold>>8))%31){strm.msg="incorrect header check";state.mode=BAD;break}if((hold&15)!==Z_DEFLATED){strm.msg="unknown compression method";state.mode=BAD;break}hold>>>=4;bits-=4;len=(hold&15)+8;if(state.wbits===0){state.wbits=len}else if(len>state.wbits){strm.msg="invalid window size";state.mode=BAD;break}state.dmax=1<<len;strm.adler=state.check=1;state.mode=hold&512?DICTID:TYPE;hold=0;bits=0;break;case FLAGS:while(bits<16){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}state.flags=hold;if((state.flags&255)!==Z_DEFLATED){strm.msg="unknown compression method";state.mode=BAD;break}if(state.flags&57344){strm.msg="unknown header flags set";state.mode=BAD;break}if(state.head){state.head.text=hold>>8&1}if(state.flags&512){hbuf[0]=hold&255;hbuf[1]=hold>>>8&255;state.check=crc32(state.check,hbuf,2,0)}hold=0;bits=0;state.mode=TIME;case TIME:while(bits<32){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}if(state.head){state.head.time=hold}if(state.flags&512){hbuf[0]=hold&255;hbuf[1]=hold>>>8&255;hbuf[2]=hold>>>16&255;hbuf[3]=hold>>>24&255;state.check=crc32(state.check,hbuf,4,0)}hold=0;bits=0;state.mode=OS;case OS:while(bits<16){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}if(state.head){state.head.xflags=hold&255;state.head.os=hold>>8}if(state.flags&512){hbuf[0]=hold&255;hbuf[1]=hold>>>8&255;state.check=crc32(state.check,hbuf,2,0)}hold=0;bits=0;state.mode=EXLEN;case EXLEN:if(state.flags&1024){while(bits<16){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}state.length=hold;if(state.head){state.head.extra_len=hold}if(state.flags&512){hbuf[0]=hold&255;hbuf[1]=hold>>>8&255;state.check=crc32(state.check,hbuf,2,0)}hold=0;bits=0}else if(state.head){state.head.extra=null}state.mode=EXTRA;case EXTRA:if(state.flags&1024){copy=state.length;if(copy>have){copy=have}if(copy){if(state.head){len=state.head.extra_len-state.length;if(!state.head.extra){state.head.extra=new Array(state.head.extra_len)}utils.arraySet(state.head.extra,input,next,copy,len)}if(state.flags&512){state.check=crc32(state.check,input,copy,next)}have-=copy;next+=copy;state.length-=copy}if(state.length){break inf_leave}}state.length=0;state.mode=NAME;case NAME:if(state.flags&2048){if(have===0){break inf_leave}copy=0;do{len=input[next+copy++];if(state.head&&len&&state.length<65536){state.head.name+=String.fromCharCode(len)}}while(len&&copy<have);if(state.flags&512){state.check=crc32(state.check,input,copy,next)}have-=copy;next+=copy;if(len){break inf_leave}}else if(state.head){state.head.name=null}state.length=0;state.mode=COMMENT;case COMMENT:if(state.flags&4096){if(have===0){break inf_leave}copy=0;do{len=input[next+copy++];if(state.head&&len&&state.length<65536){state.head.comment+=String.fromCharCode(len)}}while(len&&copy<have);if(state.flags&512){state.check=crc32(state.check,input,copy,next)}have-=copy;next+=copy;if(len){break inf_leave}}else if(state.head){state.head.comment=null}state.mode=HCRC;case HCRC:if(state.flags&512){while(bits<16){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}if(hold!==(state.check&65535)){strm.msg="header crc mismatch";state.mode=BAD;break}hold=0;bits=0}if(state.head){state.head.hcrc=state.flags>>9&1;state.head.done=true}strm.adler=state.check=0;state.mode=TYPE;break;case DICTID:while(bits<32){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}strm.adler=state.check=ZSWAP32(hold);hold=0;bits=0;state.mode=DICT;case DICT:if(state.havedict===0){strm.next_out=put;strm.avail_out=left;strm.next_in=next;strm.avail_in=have;state.hold=hold;state.bits=bits;return Z_NEED_DICT}strm.adler=state.check=1;state.mode=TYPE;case TYPE:if(flush===Z_BLOCK||flush===Z_TREES){break inf_leave}case TYPEDO:if(state.last){hold>>>=bits&7;bits-=bits&7;state.mode=CHECK;break}while(bits<3){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}state.last=hold&1;hold>>>=1;bits-=1;switch(hold&3){case 0:state.mode=STORED;break;case 1:fixedtables(state);state.mode=LEN_;if(flush===Z_TREES){hold>>>=2;bits-=2;break inf_leave}break;case 2:state.mode=TABLE;break;case 3:strm.msg="invalid block type";state.mode=BAD}hold>>>=2;bits-=2;break;case STORED:hold>>>=bits&7;bits-=bits&7;while(bits<32){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}if((hold&65535)!==(hold>>>16^65535)){strm.msg="invalid stored block lengths";state.mode=BAD;break}state.length=hold&65535;hold=0;bits=0;state.mode=COPY_;if(flush===Z_TREES){break inf_leave}case COPY_:state.mode=COPY;case COPY:copy=state.length;if(copy){if(copy>have){copy=have}if(copy>left){copy=left}if(copy===0){break inf_leave}utils.arraySet(output,input,next,copy,put);have-=copy;next+=copy;left-=copy;put+=copy;state.length-=copy;break}state.mode=TYPE;break;case TABLE:while(bits<14){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}state.nlen=(hold&31)+257;hold>>>=5;bits-=5;state.ndist=(hold&31)+1;hold>>>=5;bits-=5;state.ncode=(hold&15)+4;hold>>>=4;bits-=4;if(state.nlen>286||state.ndist>30){strm.msg="too many length or distance symbols";state.mode=BAD;break}state.have=0;state.mode=LENLENS;case LENLENS:while(state.have<state.ncode){while(bits<3){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}state.lens[order[state.have++]]=hold&7;hold>>>=3;bits-=3}while(state.have<19){state.lens[order[state.have++]]=0}state.lencode=state.lendyn;state.lenbits=7;opts={bits:state.lenbits};ret=inflate_table(CODES,state.lens,0,19,state.lencode,0,state.work,opts);state.lenbits=opts.bits;if(ret){strm.msg="invalid code lengths set";state.mode=BAD;break}state.have=0;state.mode=CODELENS;case CODELENS:while(state.have<state.nlen+state.ndist){for(;;){here=state.lencode[hold&(1<<state.lenbits)-1];here_bits=here>>>24;here_op=here>>>16&255;here_val=here&65535;if(here_bits<=bits){break}if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}if(here_val<16){hold>>>=here_bits;bits-=here_bits;state.lens[state.have++]=here_val}else{if(here_val===16){n=here_bits+2;while(bits<n){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}hold>>>=here_bits;bits-=here_bits;if(state.have===0){strm.msg="invalid bit length repeat";state.mode=BAD;break}len=state.lens[state.have-1];copy=3+(hold&3);hold>>>=2;bits-=2}else if(here_val===17){n=here_bits+3;while(bits<n){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}hold>>>=here_bits;bits-=here_bits;len=0;copy=3+(hold&7);hold>>>=3;bits-=3}else{n=here_bits+7;while(bits<n){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}hold>>>=here_bits;bits-=here_bits;len=0;copy=11+(hold&127);hold>>>=7;bits-=7}if(state.have+copy>state.nlen+state.ndist){strm.msg="invalid bit length repeat";state.mode=BAD;break}while(copy--){state.lens[state.have++]=len}}}if(state.mode===BAD){break}if(state.lens[256]===0){strm.msg="invalid code -- missing end-of-block";state.mode=BAD;break}state.lenbits=9;opts={bits:state.lenbits};ret=inflate_table(LENS,state.lens,0,state.nlen,state.lencode,0,state.work,opts);state.lenbits=opts.bits;if(ret){strm.msg="invalid literal/lengths set";state.mode=BAD;break}state.distbits=6;state.distcode=state.distdyn;opts={bits:state.distbits};ret=inflate_table(DISTS,state.lens,state.nlen,state.ndist,state.distcode,0,state.work,opts);state.distbits=opts.bits;if(ret){strm.msg="invalid distances set";state.mode=BAD;break}state.mode=LEN_;if(flush===Z_TREES){break inf_leave}case LEN_:state.mode=LEN;case LEN:if(have>=6&&left>=258){strm.next_out=put;strm.avail_out=left;strm.next_in=next;strm.avail_in=have;state.hold=hold;state.bits=bits;inflate_fast(strm,_out);put=strm.next_out;output=strm.output;left=strm.avail_out;next=strm.next_in;input=strm.input;have=strm.avail_in;hold=state.hold;bits=state.bits;if(state.mode===TYPE){state.back=-1}break}state.back=0;for(;;){here=state.lencode[hold&(1<<state.lenbits)-1];here_bits=here>>>24;here_op=here>>>16&255;here_val=here&65535;if(here_bits<=bits){break}if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}if(here_op&&(here_op&240)===0){last_bits=here_bits;last_op=here_op;last_val=here_val;for(;;){here=state.lencode[last_val+((hold&(1<<last_bits+last_op)-1)>>last_bits)];here_bits=here>>>24;here_op=here>>>16&255;here_val=here&65535;if(last_bits+here_bits<=bits){break}if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}hold>>>=last_bits;bits-=last_bits;state.back+=last_bits}hold>>>=here_bits;bits-=here_bits;state.back+=here_bits;state.length=here_val;if(here_op===0){state.mode=LIT;break}if(here_op&32){state.back=-1;state.mode=TYPE;break}if(here_op&64){strm.msg="invalid literal/length code";state.mode=BAD;break}state.extra=here_op&15;state.mode=LENEXT;case LENEXT:if(state.extra){n=state.extra;while(bits<n){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}state.length+=hold&(1<<state.extra)-1;hold>>>=state.extra;bits-=state.extra;state.back+=state.extra}state.was=state.length;state.mode=DIST;case DIST:for(;;){here=state.distcode[hold&(1<<state.distbits)-1];here_bits=here>>>24;here_op=here>>>16&255;here_val=here&65535;if(here_bits<=bits){break}if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}if((here_op&240)===0){last_bits=here_bits;last_op=here_op;last_val=here_val;for(;;){here=state.distcode[last_val+((hold&(1<<last_bits+last_op)-1)>>last_bits)];here_bits=here>>>24;here_op=here>>>16&255;here_val=here&65535;if(last_bits+here_bits<=bits){break}if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}hold>>>=last_bits;bits-=last_bits;state.back+=last_bits}hold>>>=here_bits;bits-=here_bits;state.back+=here_bits;if(here_op&64){strm.msg="invalid distance code";state.mode=BAD;break}state.offset=here_val;state.extra=here_op&15;state.mode=DISTEXT;case DISTEXT:if(state.extra){n=state.extra;while(bits<n){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}state.offset+=hold&(1<<state.extra)-1;hold>>>=state.extra;bits-=state.extra;state.back+=state.extra}if(state.offset>state.dmax){strm.msg="invalid distance too far back";state.mode=BAD;break}state.mode=MATCH;case MATCH:if(left===0){break inf_leave}copy=_out-left;if(state.offset>copy){copy=state.offset-copy;if(copy>state.whave){if(state.sane){strm.msg="invalid distance too far back";state.mode=BAD;break}}if(copy>state.wnext){copy-=state.wnext;from=state.wsize-copy}else{from=state.wnext-copy}if(copy>state.length){copy=state.length}from_source=state.window}else{from_source=output;from=put-state.offset;copy=state.length}if(copy>left){copy=left}left-=copy;state.length-=copy;do{output[put++]=from_source[from++]}while(--copy);if(state.length===0){state.mode=LEN}break;case LIT:if(left===0){break inf_leave}output[put++]=state.length;left--;state.mode=LEN;break;case CHECK:if(state.wrap){while(bits<32){if(have===0){break inf_leave}have--;hold|=input[next++]<<bits;bits+=8}_out-=left;strm.total_out+=_out;state.total+=_out;if(_out){strm.adler=state.check=state.flags?crc32(state.check,output,_out,put-_out):adler32(state.check,output,_out,put-_out)}_out=left;if((state.flags?hold:ZSWAP32(hold))!==state.check){strm.msg="incorrect data check";state.mode=BAD;break}hold=0;bits=0}state.mode=LENGTH;case LENGTH:if(state.wrap&&state.flags){while(bits<32){if(have===0){break inf_leave}have--;hold+=input[next++]<<bits;bits+=8}if(hold!==(state.total&4294967295)){strm.msg="incorrect length check";state.mode=BAD;break}hold=0;bits=0}state.mode=DONE;case DONE:ret=Z_STREAM_END;break inf_leave;case BAD:ret=Z_DATA_ERROR;break inf_leave;case MEM:return Z_MEM_ERROR;case SYNC:default:return Z_STREAM_ERROR}}strm.next_out=put;strm.avail_out=left;strm.next_in=next;strm.avail_in=have;state.hold=hold;state.bits=bits;if(state.wsize||_out!==strm.avail_out&&state.mode<BAD&&(state.mode<CHECK||flush!==Z_FINISH)){if(updatewindow(strm,strm.output,strm.next_out,_out-strm.avail_out)){state.mode=MEM;return Z_MEM_ERROR}}_in-=strm.avail_in;_out-=strm.avail_out;strm.total_in+=_in;strm.total_out+=_out;state.total+=_out;if(state.wrap&&_out){strm.adler=state.check=state.flags?crc32(state.check,output,_out,strm.next_out-_out):adler32(state.check,output,_out,strm.next_out-_out)}strm.data_type=state.bits+(state.last?64:0)+(state.mode===TYPE?128:0)+(state.mode===LEN_||state.mode===COPY_?256:0);if((_in===0&&_out===0||flush===Z_FINISH)&&ret===Z_OK){ret=Z_BUF_ERROR}return ret}function inflateEnd(strm){if(!strm||!strm.state){return Z_STREAM_ERROR}var state=strm.state;if(state.window){state.window=null}strm.state=null;return Z_OK}function inflateGetHeader(strm,head){var state;if(!strm||!strm.state){return Z_STREAM_ERROR}state=strm.state;if((state.wrap&2)===0){return Z_STREAM_ERROR}state.head=head;head.done=false;return Z_OK}exports.inflateReset=inflateReset;exports.inflateReset2=inflateReset2;exports.inflateResetKeep=inflateResetKeep;exports.inflateInit=inflateInit;exports.inflateInit2=inflateInit2;exports.inflate=inflate;exports.inflateEnd=inflateEnd;exports.inflateGetHeader=inflateGetHeader;
exports.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":27,"./adler32":29,"./crc32":31,"./inffast":34,"./inftrees":36}],36:[function(_dereq_,module,exports){"use strict";var utils=_dereq_("../utils/common");var MAXBITS=15;var ENOUGH_LENS=852;var ENOUGH_DISTS=592;var CODES=0;var LENS=1;var DISTS=2;var lbase=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0];var lext=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78];var dbase=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0];var dext=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];module.exports=function inflate_table(type,lens,lens_index,codes,table,table_index,work,opts){var bits=opts.bits;var len=0;var sym=0;var min=0,max=0;var root=0;var curr=0;var drop=0;var left=0;var used=0;var huff=0;var incr;var fill;var low;var mask;var next;var base=null;var base_index=0;var end;var count=new utils.Buf16(MAXBITS+1);var offs=new utils.Buf16(MAXBITS+1);var extra=null;var extra_index=0;var here_bits,here_op,here_val;for(len=0;len<=MAXBITS;len++){count[len]=0}for(sym=0;sym<codes;sym++){count[lens[lens_index+sym]]++}root=bits;for(max=MAXBITS;max>=1;max--){if(count[max]!==0){break}}if(root>max){root=max}if(max===0){table[table_index++]=1<<24|64<<16|0;table[table_index++]=1<<24|64<<16|0;opts.bits=1;return 0}for(min=1;min<max;min++){if(count[min]!==0){break}}if(root<min){root=min}left=1;for(len=1;len<=MAXBITS;len++){left<<=1;left-=count[len];if(left<0){return-1}}if(left>0&&(type===CODES||max!==1)){return-1}offs[1]=0;for(len=1;len<MAXBITS;len++){offs[len+1]=offs[len]+count[len]}for(sym=0;sym<codes;sym++){if(lens[lens_index+sym]!==0){work[offs[lens[lens_index+sym]]++]=sym}}if(type===CODES){base=extra=work;end=19}else if(type===LENS){base=lbase;base_index-=257;extra=lext;extra_index-=257;end=256}else{base=dbase;extra=dext;end=-1}huff=0;sym=0;len=min;next=table_index;curr=root;drop=0;low=-1;used=1<<root;mask=used-1;if(type===LENS&&used>ENOUGH_LENS||type===DISTS&&used>ENOUGH_DISTS){return 1}var i=0;for(;;){i++;here_bits=len-drop;if(work[sym]<end){here_op=0;here_val=work[sym]}else if(work[sym]>end){here_op=extra[extra_index+work[sym]];here_val=base[base_index+work[sym]]}else{here_op=32+64;here_val=0}incr=1<<len-drop;fill=1<<curr;min=fill;do{fill-=incr;table[next+(huff>>drop)+fill]=here_bits<<24|here_op<<16|here_val|0}while(fill!==0);incr=1<<len-1;while(huff&incr){incr>>=1}if(incr!==0){huff&=incr-1;huff+=incr}else{huff=0}sym++;if(--count[len]===0){if(len===max){break}len=lens[lens_index+work[sym]]}if(len>root&&(huff&mask)!==low){if(drop===0){drop=root}next+=min;curr=len-drop;left=1<<curr;while(curr+drop<max){left-=count[curr+drop];if(left<=0){break}curr++;left<<=1}used+=1<<curr;if(type===LENS&&used>ENOUGH_LENS||type===DISTS&&used>ENOUGH_DISTS){return 1}low=huff&mask;table[low]=root<<24|curr<<16|next-table_index|0}}if(huff!==0){table[next+huff]=len-drop<<24|64<<16|0}opts.bits=root;return 0}},{"../utils/common":27}],37:[function(_dereq_,module,exports){"use strict";module.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],38:[function(_dereq_,module,exports){"use strict";var utils=_dereq_("../utils/common");var Z_FIXED=4;var Z_BINARY=0;var Z_TEXT=1;var Z_UNKNOWN=2;function zero(buf){var len=buf.length;while(--len>=0){buf[len]=0}}var STORED_BLOCK=0;var STATIC_TREES=1;var DYN_TREES=2;var MIN_MATCH=3;var MAX_MATCH=258;var LENGTH_CODES=29;var LITERALS=256;var L_CODES=LITERALS+1+LENGTH_CODES;var D_CODES=30;var BL_CODES=19;var HEAP_SIZE=2*L_CODES+1;var MAX_BITS=15;var Buf_size=16;var MAX_BL_BITS=7;var END_BLOCK=256;var REP_3_6=16;var REPZ_3_10=17;var REPZ_11_138=18;var extra_lbits=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];var extra_dbits=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];var extra_blbits=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];var bl_order=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];var DIST_CODE_LEN=512;var static_ltree=new Array((L_CODES+2)*2);zero(static_ltree);var static_dtree=new Array(D_CODES*2);zero(static_dtree);var _dist_code=new Array(DIST_CODE_LEN);zero(_dist_code);var _length_code=new Array(MAX_MATCH-MIN_MATCH+1);zero(_length_code);var base_length=new Array(LENGTH_CODES);zero(base_length);var base_dist=new Array(D_CODES);zero(base_dist);var StaticTreeDesc=function(static_tree,extra_bits,extra_base,elems,max_length){this.static_tree=static_tree;this.extra_bits=extra_bits;this.extra_base=extra_base;this.elems=elems;this.max_length=max_length;this.has_stree=static_tree&&static_tree.length};var static_l_desc;var static_d_desc;var static_bl_desc;var TreeDesc=function(dyn_tree,stat_desc){this.dyn_tree=dyn_tree;this.max_code=0;this.stat_desc=stat_desc};function d_code(dist){return dist<256?_dist_code[dist]:_dist_code[256+(dist>>>7)]}function put_short(s,w){s.pending_buf[s.pending++]=w&255;s.pending_buf[s.pending++]=w>>>8&255}function send_bits(s,value,length){if(s.bi_valid>Buf_size-length){s.bi_buf|=value<<s.bi_valid&65535;put_short(s,s.bi_buf);s.bi_buf=value>>Buf_size-s.bi_valid;s.bi_valid+=length-Buf_size}else{s.bi_buf|=value<<s.bi_valid&65535;s.bi_valid+=length}}function send_code(s,c,tree){send_bits(s,tree[c*2],tree[c*2+1])}function bi_reverse(code,len){var res=0;do{res|=code&1;code>>>=1;res<<=1}while(--len>0);return res>>>1}function bi_flush(s){if(s.bi_valid===16){put_short(s,s.bi_buf);s.bi_buf=0;s.bi_valid=0}else if(s.bi_valid>=8){s.pending_buf[s.pending++]=s.bi_buf&255;s.bi_buf>>=8;s.bi_valid-=8}}function gen_bitlen(s,desc){var tree=desc.dyn_tree;var max_code=desc.max_code;var stree=desc.stat_desc.static_tree;var has_stree=desc.stat_desc.has_stree;var extra=desc.stat_desc.extra_bits;var base=desc.stat_desc.extra_base;var max_length=desc.stat_desc.max_length;var h;var n,m;var bits;var xbits;var f;var overflow=0;for(bits=0;bits<=MAX_BITS;bits++){s.bl_count[bits]=0}tree[s.heap[s.heap_max]*2+1]=0;for(h=s.heap_max+1;h<HEAP_SIZE;h++){n=s.heap[h];bits=tree[tree[n*2+1]*2+1]+1;if(bits>max_length){bits=max_length;overflow++}tree[n*2+1]=bits;if(n>max_code){continue}s.bl_count[bits]++;xbits=0;if(n>=base){xbits=extra[n-base]}f=tree[n*2];s.opt_len+=f*(bits+xbits);if(has_stree){s.static_len+=f*(stree[n*2+1]+xbits)}}if(overflow===0){return}do{bits=max_length-1;while(s.bl_count[bits]===0){bits--}s.bl_count[bits]--;s.bl_count[bits+1]+=2;s.bl_count[max_length]--;overflow-=2}while(overflow>0);for(bits=max_length;bits!==0;bits--){n=s.bl_count[bits];while(n!==0){m=s.heap[--h];if(m>max_code){continue}if(tree[m*2+1]!==bits){s.opt_len+=(bits-tree[m*2+1])*tree[m*2];tree[m*2+1]=bits}n--}}}function gen_codes(tree,max_code,bl_count){var next_code=new Array(MAX_BITS+1);var code=0;var bits;var n;for(bits=1;bits<=MAX_BITS;bits++){next_code[bits]=code=code+bl_count[bits-1]<<1}for(n=0;n<=max_code;n++){var len=tree[n*2+1];if(len===0){continue}tree[n*2]=bi_reverse(next_code[len]++,len)}}function tr_static_init(){var n;var bits;var length;var code;var dist;var bl_count=new Array(MAX_BITS+1);length=0;for(code=0;code<LENGTH_CODES-1;code++){base_length[code]=length;for(n=0;n<1<<extra_lbits[code];n++){_length_code[length++]=code}}_length_code[length-1]=code;dist=0;for(code=0;code<16;code++){base_dist[code]=dist;for(n=0;n<1<<extra_dbits[code];n++){_dist_code[dist++]=code}}dist>>=7;for(;code<D_CODES;code++){base_dist[code]=dist<<7;for(n=0;n<1<<extra_dbits[code]-7;n++){_dist_code[256+dist++]=code}}for(bits=0;bits<=MAX_BITS;bits++){bl_count[bits]=0}n=0;while(n<=143){static_ltree[n*2+1]=8;n++;bl_count[8]++}while(n<=255){static_ltree[n*2+1]=9;n++;bl_count[9]++}while(n<=279){static_ltree[n*2+1]=7;n++;bl_count[7]++}while(n<=287){static_ltree[n*2+1]=8;n++;bl_count[8]++}gen_codes(static_ltree,L_CODES+1,bl_count);for(n=0;n<D_CODES;n++){static_dtree[n*2+1]=5;static_dtree[n*2]=bi_reverse(n,5)}static_l_desc=new StaticTreeDesc(static_ltree,extra_lbits,LITERALS+1,L_CODES,MAX_BITS);static_d_desc=new StaticTreeDesc(static_dtree,extra_dbits,0,D_CODES,MAX_BITS);static_bl_desc=new StaticTreeDesc(new Array(0),extra_blbits,0,BL_CODES,MAX_BL_BITS)}function init_block(s){var n;for(n=0;n<L_CODES;n++){s.dyn_ltree[n*2]=0}for(n=0;n<D_CODES;n++){s.dyn_dtree[n*2]=0}for(n=0;n<BL_CODES;n++){s.bl_tree[n*2]=0}s.dyn_ltree[END_BLOCK*2]=1;s.opt_len=s.static_len=0;s.last_lit=s.matches=0}function bi_windup(s){if(s.bi_valid>8){put_short(s,s.bi_buf)}else if(s.bi_valid>0){s.pending_buf[s.pending++]=s.bi_buf}s.bi_buf=0;s.bi_valid=0}function copy_block(s,buf,len,header){bi_windup(s);if(header){put_short(s,len);put_short(s,~len)}utils.arraySet(s.pending_buf,s.window,buf,len,s.pending);s.pending+=len}function smaller(tree,n,m,depth){var _n2=n*2;var _m2=m*2;return tree[_n2]<tree[_m2]||tree[_n2]===tree[_m2]&&depth[n]<=depth[m]}function pqdownheap(s,tree,k){var v=s.heap[k];var j=k<<1;while(j<=s.heap_len){if(j<s.heap_len&&smaller(tree,s.heap[j+1],s.heap[j],s.depth)){j++}if(smaller(tree,v,s.heap[j],s.depth)){break}s.heap[k]=s.heap[j];k=j;j<<=1}s.heap[k]=v}function compress_block(s,ltree,dtree){var dist;var lc;var lx=0;var code;var extra;if(s.last_lit!==0){do{dist=s.pending_buf[s.d_buf+lx*2]<<8|s.pending_buf[s.d_buf+lx*2+1];lc=s.pending_buf[s.l_buf+lx];lx++;if(dist===0){send_code(s,lc,ltree)}else{code=_length_code[lc];send_code(s,code+LITERALS+1,ltree);extra=extra_lbits[code];if(extra!==0){lc-=base_length[code];send_bits(s,lc,extra)}dist--;code=d_code(dist);send_code(s,code,dtree);extra=extra_dbits[code];if(extra!==0){dist-=base_dist[code];send_bits(s,dist,extra)}}}while(lx<s.last_lit)}send_code(s,END_BLOCK,ltree)}function build_tree(s,desc){var tree=desc.dyn_tree;var stree=desc.stat_desc.static_tree;var has_stree=desc.stat_desc.has_stree;var elems=desc.stat_desc.elems;var n,m;var max_code=-1;var node;s.heap_len=0;s.heap_max=HEAP_SIZE;for(n=0;n<elems;n++){if(tree[n*2]!==0){s.heap[++s.heap_len]=max_code=n;s.depth[n]=0}else{tree[n*2+1]=0}}while(s.heap_len<2){node=s.heap[++s.heap_len]=max_code<2?++max_code:0;tree[node*2]=1;s.depth[node]=0;s.opt_len--;if(has_stree){s.static_len-=stree[node*2+1]}}desc.max_code=max_code;for(n=s.heap_len>>1;n>=1;n--){pqdownheap(s,tree,n)}node=elems;do{n=s.heap[1];s.heap[1]=s.heap[s.heap_len--];pqdownheap(s,tree,1);m=s.heap[1];s.heap[--s.heap_max]=n;s.heap[--s.heap_max]=m;tree[node*2]=tree[n*2]+tree[m*2];s.depth[node]=(s.depth[n]>=s.depth[m]?s.depth[n]:s.depth[m])+1;tree[n*2+1]=tree[m*2+1]=node;s.heap[1]=node++;pqdownheap(s,tree,1)}while(s.heap_len>=2);s.heap[--s.heap_max]=s.heap[1];gen_bitlen(s,desc);gen_codes(tree,max_code,s.bl_count)}function scan_tree(s,tree,max_code){var n;var prevlen=-1;var curlen;var nextlen=tree[0*2+1];var count=0;var max_count=7;var min_count=4;if(nextlen===0){max_count=138;min_count=3}tree[(max_code+1)*2+1]=65535;for(n=0;n<=max_code;n++){curlen=nextlen;nextlen=tree[(n+1)*2+1];if(++count<max_count&&curlen===nextlen){continue}else if(count<min_count){s.bl_tree[curlen*2]+=count}else if(curlen!==0){if(curlen!==prevlen){s.bl_tree[curlen*2]++}s.bl_tree[REP_3_6*2]++}else if(count<=10){s.bl_tree[REPZ_3_10*2]++}else{s.bl_tree[REPZ_11_138*2]++}count=0;prevlen=curlen;if(nextlen===0){max_count=138;min_count=3}else if(curlen===nextlen){max_count=6;min_count=3}else{max_count=7;min_count=4}}}function send_tree(s,tree,max_code){var n;var prevlen=-1;var curlen;var nextlen=tree[0*2+1];var count=0;var max_count=7;var min_count=4;if(nextlen===0){max_count=138;min_count=3}for(n=0;n<=max_code;n++){curlen=nextlen;nextlen=tree[(n+1)*2+1];if(++count<max_count&&curlen===nextlen){continue}else if(count<min_count){do{send_code(s,curlen,s.bl_tree)}while(--count!==0)}else if(curlen!==0){if(curlen!==prevlen){send_code(s,curlen,s.bl_tree);count--}send_code(s,REP_3_6,s.bl_tree);send_bits(s,count-3,2)}else if(count<=10){send_code(s,REPZ_3_10,s.bl_tree);send_bits(s,count-3,3)}else{send_code(s,REPZ_11_138,s.bl_tree);send_bits(s,count-11,7)}count=0;prevlen=curlen;if(nextlen===0){max_count=138;min_count=3}else if(curlen===nextlen){max_count=6;min_count=3}else{max_count=7;min_count=4}}}function build_bl_tree(s){var max_blindex;scan_tree(s,s.dyn_ltree,s.l_desc.max_code);scan_tree(s,s.dyn_dtree,s.d_desc.max_code);build_tree(s,s.bl_desc);for(max_blindex=BL_CODES-1;max_blindex>=3;max_blindex--){if(s.bl_tree[bl_order[max_blindex]*2+1]!==0){break}}s.opt_len+=3*(max_blindex+1)+5+5+4;return max_blindex}function send_all_trees(s,lcodes,dcodes,blcodes){var rank;send_bits(s,lcodes-257,5);send_bits(s,dcodes-1,5);send_bits(s,blcodes-4,4);for(rank=0;rank<blcodes;rank++){send_bits(s,s.bl_tree[bl_order[rank]*2+1],3)}send_tree(s,s.dyn_ltree,lcodes-1);send_tree(s,s.dyn_dtree,dcodes-1)}function detect_data_type(s){var black_mask=4093624447;var n;for(n=0;n<=31;n++,black_mask>>>=1){if(black_mask&1&&s.dyn_ltree[n*2]!==0){return Z_BINARY}}if(s.dyn_ltree[9*2]!==0||s.dyn_ltree[10*2]!==0||s.dyn_ltree[13*2]!==0){return Z_TEXT}for(n=32;n<LITERALS;n++){if(s.dyn_ltree[n*2]!==0){return Z_TEXT}}return Z_BINARY}var static_init_done=false;function _tr_init(s){if(!static_init_done){tr_static_init();static_init_done=true}s.l_desc=new TreeDesc(s.dyn_ltree,static_l_desc);s.d_desc=new TreeDesc(s.dyn_dtree,static_d_desc);s.bl_desc=new TreeDesc(s.bl_tree,static_bl_desc);s.bi_buf=0;s.bi_valid=0;init_block(s)}function _tr_stored_block(s,buf,stored_len,last){send_bits(s,(STORED_BLOCK<<1)+(last?1:0),3);copy_block(s,buf,stored_len,true)}function _tr_align(s){send_bits(s,STATIC_TREES<<1,3);send_code(s,END_BLOCK,static_ltree);bi_flush(s)}function _tr_flush_block(s,buf,stored_len,last){var opt_lenb,static_lenb;var max_blindex=0;if(s.level>0){if(s.strm.data_type===Z_UNKNOWN){s.strm.data_type=detect_data_type(s)}build_tree(s,s.l_desc);build_tree(s,s.d_desc);max_blindex=build_bl_tree(s);opt_lenb=s.opt_len+3+7>>>3;static_lenb=s.static_len+3+7>>>3;if(static_lenb<=opt_lenb){opt_lenb=static_lenb}}else{opt_lenb=static_lenb=stored_len+5}if(stored_len+4<=opt_lenb&&buf!==-1){_tr_stored_block(s,buf,stored_len,last)}else if(s.strategy===Z_FIXED||static_lenb===opt_lenb){send_bits(s,(STATIC_TREES<<1)+(last?1:0),3);compress_block(s,static_ltree,static_dtree)}else{send_bits(s,(DYN_TREES<<1)+(last?1:0),3);send_all_trees(s,s.l_desc.max_code+1,s.d_desc.max_code+1,max_blindex+1);compress_block(s,s.dyn_ltree,s.dyn_dtree)}init_block(s);if(last){bi_windup(s)}}function _tr_tally(s,dist,lc){s.pending_buf[s.d_buf+s.last_lit*2]=dist>>>8&255;s.pending_buf[s.d_buf+s.last_lit*2+1]=dist&255;s.pending_buf[s.l_buf+s.last_lit]=lc&255;s.last_lit++;if(dist===0){s.dyn_ltree[lc*2]++}else{s.matches++;dist--;s.dyn_ltree[(_length_code[lc]+LITERALS+1)*2]++;s.dyn_dtree[d_code(dist)*2]++}return s.last_lit===s.lit_bufsize-1}exports._tr_init=_tr_init;exports._tr_stored_block=_tr_stored_block;exports._tr_flush_block=_tr_flush_block;exports._tr_tally=_tr_tally;exports._tr_align=_tr_align},{"../utils/common":27}],39:[function(_dereq_,module,exports){"use strict";function ZStream(){this.input=null;this.next_in=0;this.avail_in=0;this.total_in=0;this.output=null;this.next_out=0;this.avail_out=0;this.total_out=0;this.msg="";this.state=null;this.data_type=2;this.adler=0}module.exports=ZStream},{}]},{},[9])(9)});var XLSX={};(function make_xlsx(XLSX){XLSX.version="0.8.0";var current_codepage=1200,current_cptable;if(typeof module!=="undefined"&&typeof require!=="undefined"){if(typeof cptable==="undefined")cptable=require("./dist/cpexcel");current_cptable=cptable[current_codepage]}function reset_cp(){set_cp(1200)}var set_cp=function(cp){current_codepage=cp};function char_codes(data){var o=[];for(var i=0,len=data.length;i<len;++i)o[i]=data.charCodeAt(i);return o}var debom_xml=function(data){return data};var _getchar=function _gc1(x){return String.fromCharCode(x)};if(typeof cptable!=="undefined"){set_cp=function(cp){current_codepage=cp;current_cptable=cptable[cp]};debom_xml=function(data){if(data.charCodeAt(0)===255&&data.charCodeAt(1)===254){return cptable.utils.decode(1200,char_codes(data.substr(2)))}return data};_getchar=function _gc2(x){if(current_codepage===1200)return String.fromCharCode(x);return cptable.utils.decode(current_codepage,[x&255,x>>8])[0]}}var Base64=function make_b64(){var map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";return{encode:function(input,utf8){var o="";var c1,c2,c3,e1,e2,e3,e4;for(var i=0;i<input.length;){c1=input.charCodeAt(i++);c2=input.charCodeAt(i++);c3=input.charCodeAt(i++);e1=c1>>2;e2=(c1&3)<<4|c2>>4;e3=(c2&15)<<2|c3>>6;e4=c3&63;if(isNaN(c2)){e3=e4=64}else if(isNaN(c3)){e4=64}o+=map.charAt(e1)+map.charAt(e2)+map.charAt(e3)+map.charAt(e4)}return o},decode:function b64_decode(input,utf8){var o="";var c1,c2,c3;var e1,e2,e3,e4;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");for(var i=0;i<input.length;){e1=map.indexOf(input.charAt(i++));e2=map.indexOf(input.charAt(i++));e3=map.indexOf(input.charAt(i++));e4=map.indexOf(input.charAt(i++));c1=e1<<2|e2>>4;c2=(e2&15)<<4|e3>>2;c3=(e3&3)<<6|e4;o+=String.fromCharCode(c1);if(e3!=64){o+=String.fromCharCode(c2)}if(e4!=64){o+=String.fromCharCode(c3)}}return o}}}();var has_buf=typeof Buffer!=="undefined";function new_raw_buf(len){return new(has_buf?Buffer:Array)(len)}function s2a(s){if(has_buf)return new Buffer(s,"binary");return s.split("").map(function(x){return x.charCodeAt(0)&255})}var bconcat=function(bufs){return[].concat.apply([],bufs)};var chr0=/\u0000/g,chr1=/[\u0001-\u0006]/;var SSF={};var make_ssf=function make_ssf(SSF){SSF.version="0.8.1";function _strrev(x){var o="",i=x.length-1;while(i>=0)o+=x.charAt(i--);return o}function fill(c,l){var o="";while(o.length<l)o+=c;return o}function pad0(v,d){var t=""+v;return t.length>=d?t:fill("0",d-t.length)+t}function pad_(v,d){var t=""+v;return t.length>=d?t:fill(" ",d-t.length)+t}function rpad_(v,d){var t=""+v;return t.length>=d?t:t+fill(" ",d-t.length)}function pad0r1(v,d){var t=""+Math.round(v);return t.length>=d?t:fill("0",d-t.length)+t}function pad0r2(v,d){var t=""+v;return t.length>=d?t:fill("0",d-t.length)+t}var p2_32=Math.pow(2,32);function pad0r(v,d){if(v>p2_32||v<-p2_32)return pad0r1(v,d);var i=Math.round(v);return pad0r2(i,d)}function isgeneral(s,i){return s.length>=7+i&&(s.charCodeAt(i)|32)===103&&(s.charCodeAt(i+1)|32)===101&&(s.charCodeAt(i+2)|32)===110&&(s.charCodeAt(i+3)|32)===101&&(s.charCodeAt(i+4)|32)===114&&(s.charCodeAt(i+5)|32)===97&&(s.charCodeAt(i+6)|32)===108}var opts_fmt=[["date1904",0],["output",""],["WTF",false]];function fixopts(o){for(var y=0;y!=opts_fmt.length;++y)if(o[opts_fmt[y][0]]===undefined)o[opts_fmt[y][0]]=opts_fmt[y][1]}SSF.opts=opts_fmt;var table_fmt={0:"General",1:"0",2:"0.00",3:"#,##0",4:"#,##0.00",9:"0%",10:"0.00%",11:"0.00E+00",12:"# ?/?",13:"# ??/??",14:"m/d/yy",15:"d-mmm-yy",16:"d-mmm",17:"mmm-yy",18:"h:mm AM/PM",19:"h:mm:ss AM/PM",20:"h:mm",21:"h:mm:ss",22:"m/d/yy h:mm",37:"#,##0 ;(#,##0)",38:"#,##0 ;[Red](#,##0)",39:"#,##0.00;(#,##0.00)",40:"#,##0.00;[Red](#,##0.00)",45:"mm:ss",46:"[h]:mm:ss",47:"mmss.0",48:"##0.0E+0",49:"@",56:'"上午/下午 "hh"時"mm"分"ss"秒 "',65535:"General"};var days=[["Sun","Sunday"],["Mon","Monday"],["Tue","Tuesday"],["Wed","Wednesday"],["Thu","Thursday"],["Fri","Friday"],["Sat","Saturday"]];var months=[["J","Jan","January"],["F","Feb","February"],["M","Mar","March"],["A","Apr","April"],["M","May","May"],["J","Jun","June"],["J","Jul","July"],["A","Aug","August"],["S","Sep","September"],["O","Oct","October"],["N","Nov","November"],["D","Dec","December"]];function frac(x,D,mixed){var sgn=x<0?-1:1;var B=x*sgn;var P_2=0,P_1=1,P=0;var Q_2=1,Q_1=0,Q=0;var A=Math.floor(B);while(Q_1<D){A=Math.floor(B);P=A*P_1+P_2;Q=A*Q_1+Q_2;if(B-A<5e-10)break;B=1/(B-A);P_2=P_1;P_1=P;Q_2=Q_1;Q_1=Q}if(Q>D){Q=Q_1;P=P_1}if(Q>D){Q=Q_2;P=P_2}if(!mixed)return[0,sgn*P,Q];if(Q===0)throw"Unexpected state: "+P+" "+P_1+" "+P_2+" "+Q+" "+Q_1+" "+Q_2;var q=Math.floor(sgn*P/Q);return[q,sgn*P-q*Q,Q]}function general_fmt_int(v,opts){return""+v}SSF._general_int=general_fmt_int;var general_fmt_num=function make_general_fmt_num(){var gnr1=/\.(\d*[1-9])0+$/,gnr2=/\.0*$/,gnr4=/\.(\d*[1-9])0+/,gnr5=/\.0*[Ee]/,gnr6=/(E[+-])(\d)$/;function gfn2(v){var w=v<0?12:11;var o=gfn5(v.toFixed(12));if(o.length<=w)return o;o=v.toPrecision(10);if(o.length<=w)return o;return v.toExponential(5)}function gfn3(v){var o=v.toFixed(11).replace(gnr1,".$1");if(o.length>(v<0?12:11))o=v.toPrecision(6);return o}function gfn4(o){for(var i=0;i!=o.length;++i)if((o.charCodeAt(i)|32)===101)return o.replace(gnr4,".$1").replace(gnr5,"E").replace("e","E").replace(gnr6,"$10$2");return o}function gfn5(o){return o.indexOf(".")>-1?o.replace(gnr2,"").replace(gnr1,".$1"):o}return function general_fmt_num(v,opts){var V=Math.floor(Math.log(Math.abs(v))*Math.LOG10E),o;if(V>=-4&&V<=-1)o=v.toPrecision(10+V);else if(Math.abs(V)<=9)o=gfn2(v);else if(V===10)o=v.toFixed(10).substr(0,12);else o=gfn3(v);return gfn5(gfn4(o))}}();SSF._general_num=general_fmt_num;function general_fmt(v,opts){switch(typeof v){case"string":return v;case"boolean":return v?"TRUE":"FALSE";case"number":return(v|0)===v?general_fmt_int(v,opts):general_fmt_num(v,opts)}throw new Error("unsupported value in General format: "+v)}SSF._general=general_fmt;function fix_hijri(date,o){return 0}function parse_date_code(v,opts,b2){if(v>2958465||v<0)return null;var date=v|0,time=Math.floor(86400*(v-date)),dow=0;var dout=[];var out={D:date,T:time,u:86400*(v-date)-time,y:0,m:0,d:0,H:0,M:0,S:0,q:0};if(Math.abs(out.u)<1e-6)out.u=0;fixopts(opts!=null?opts:opts=[]);if(opts.date1904)date+=1462;if(out.u>.999){out.u=0;if(++time==86400){time=0;++date}}if(date===60){dout=b2?[1317,10,29]:[1900,2,29];dow=3}else if(date===0){dout=b2?[1317,8,29]:[1900,1,0];dow=6}else{if(date>60)--date;var d=new Date(1900,0,1);d.setDate(d.getDate()+date-1);dout=[d.getFullYear(),d.getMonth()+1,d.getDate()];dow=d.getDay();if(date<60)dow=(dow+6)%7;if(b2)dow=fix_hijri(d,dout)}out.y=dout[0];out.m=dout[1];out.d=dout[2];out.S=time%60;time=Math.floor(time/60);out.M=time%60;time=Math.floor(time/60);out.H=time;out.q=dow;return out}SSF.parse_date_code=parse_date_code;function write_date(type,fmt,val,ss0){var o="",ss=0,tt=0,y=val.y,out,outl=0;switch(type){case 98:y=val.y+543;case 121:switch(fmt.length){case 1:case 2:out=y%100;outl=2;break;default:out=y%1e4;outl=4;break}break;case 109:switch(fmt.length){case 1:case 2:out=val.m;outl=fmt.length;break;case 3:return months[val.m-1][1];case 5:return months[val.m-1][0];default:return months[val.m-1][2]}break;case 100:switch(fmt.length){case 1:case 2:out=val.d;outl=fmt.length;break;case 3:return days[val.q][0];default:return days[val.q][1]}break;case 104:switch(fmt.length){case 1:case 2:out=1+(val.H+11)%12;outl=fmt.length;break;default:throw"bad hour format: "+fmt}break;case 72:switch(fmt.length){case 1:case 2:out=val.H;outl=fmt.length;break;default:throw"bad hour format: "+fmt}break;case 77:switch(fmt.length){case 1:case 2:out=val.M;outl=fmt.length;break;default:throw"bad minute format: "+fmt}break;case 115:if(val.u===0)switch(fmt){case"s":case"ss":return pad0(val.S,fmt.length);case".0":case".00":case".000":}switch(fmt){case"s":case"ss":case".0":case".00":case".000":if(ss0>=2)tt=ss0===3?1e3:100;else tt=ss0===1?10:1;ss=Math.round(tt*(val.S+val.u));if(ss>=60*tt)ss=0;if(fmt==="s")return ss===0?"0":""+ss/tt;o=pad0(ss,2+ss0);if(fmt==="ss")return o.substr(0,2);return"."+o.substr(2,fmt.length-1);default:throw"bad second format: "+fmt}case 90:switch(fmt){case"[h]":case"[hh]":out=val.D*24+val.H;break;case"[m]":case"[mm]":out=(val.D*24+val.H)*60+val.M;break;case"[s]":case"[ss]":out=((val.D*24+val.H)*60+val.M)*60+Math.round(val.S+val.u);break;default:throw"bad abstime format: "+fmt}outl=fmt.length===3?1:2;break;case 101:out=y;outl=1}if(outl>0)return pad0(out,outl);else return""}function commaify(s){if(s.length<=3)return s;var j=s.length%3,o=s.substr(0,j);for(;j!=s.length;j+=3)o+=(o.length>0?",":"")+s.substr(j,3);return o}var write_num=function make_write_num(){var pct1=/%/g;function write_num_pct(type,fmt,val){var sfmt=fmt.replace(pct1,""),mul=fmt.length-sfmt.length;return write_num(type,sfmt,val*Math.pow(10,2*mul))+fill("%",mul)}function write_num_cm(type,fmt,val){var idx=fmt.length-1;while(fmt.charCodeAt(idx-1)===44)--idx;return write_num(type,fmt.substr(0,idx),val/Math.pow(10,3*(fmt.length-idx)))}function write_num_exp(fmt,val){var o;var idx=fmt.indexOf("E")-fmt.indexOf(".")-1;if(fmt.match(/^#+0.0E\+0$/)){var period=fmt.indexOf(".");if(period===-1)period=fmt.indexOf("E");var ee=Math.floor(Math.log(Math.abs(val))*Math.LOG10E)%period;if(ee<0)ee+=period;o=(val/Math.pow(10,ee)).toPrecision(idx+1+(period+ee)%period);if(o.indexOf("e")===-1){var fakee=Math.floor(Math.log(Math.abs(val))*Math.LOG10E);if(o.indexOf(".")===-1)o=o[0]+"."+o.substr(1)+"E+"+(fakee-o.length+ee);else o+="E+"+(fakee-ee);while(o.substr(0,2)==="0."){o=o[0]+o.substr(2,period)+"."+o.substr(2+period);o=o.replace(/^0+([1-9])/,"$1").replace(/^0+\./,"0.")}o=o.replace(/\+-/,"-")}o=o.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/,function($$,$1,$2,$3){return $1+$2+$3.substr(0,(period+ee)%period)+"."+$3.substr(ee)+"E"})}else o=val.toExponential(idx);if(fmt.match(/E\+00$/)&&o.match(/e[+-]\d$/))o=o.substr(0,o.length-1)+"0"+o[o.length-1];if(fmt.match(/E\-/)&&o.match(/e\+/))o=o.replace(/e\+/,"e");return o.replace("e","E")}var frac1=/# (\?+)( ?)\/( ?)(\d+)/;function write_num_f1(r,aval,sign){var den=parseInt(r[4]),rr=Math.round(aval*den),base=Math.floor(rr/den);var myn=rr-base*den,myd=den;return sign+(base===0?"":""+base)+" "+(myn===0?fill(" ",r[1].length+1+r[4].length):pad_(myn,r[1].length)+r[2]+"/"+r[3]+pad0(myd,r[4].length))}function write_num_f2(r,aval,sign){return sign+(aval===0?"":""+aval)+fill(" ",r[1].length+2+r[4].length)}var dec1=/^#*0*\.(0+)/;var closeparen=/\).*[0#]/;var phone=/\(###\) ###\\?-####/;function hashq(str){var o="",cc;for(var i=0;i!=str.length;++i)switch(cc=str.charCodeAt(i)){case 35:break;case 63:o+=" ";break;case 48:o+="0";break;default:o+=String.fromCharCode(cc)}return o}function rnd(val,d){var dd=Math.pow(10,d);return""+Math.round(val*dd)/dd}function dec(val,d){return Math.round((val-Math.floor(val))*Math.pow(10,d))}function flr(val){if(val<2147483647&&val>-2147483648)return""+(val>=0?val|0:val-1|0);return""+Math.floor(val)}function write_num_flt(type,fmt,val){if(type.charCodeAt(0)===40&&!fmt.match(closeparen)){var ffmt=fmt.replace(/\( */,"").replace(/ \)/,"").replace(/\)/,"");if(val>=0)return write_num_flt("n",ffmt,val);return"("+write_num_flt("n",ffmt,-val)+")"}if(fmt.charCodeAt(fmt.length-1)===44)return write_num_cm(type,fmt,val);if(fmt.indexOf("%")!==-1)return write_num_pct(type,fmt,val);if(fmt.indexOf("E")!==-1)return write_num_exp(fmt,val);if(fmt.charCodeAt(0)===36)return"$"+write_num_flt(type,fmt.substr(fmt[1]==" "?2:1),val);var o,oo;var r,ri,ff,aval=Math.abs(val),sign=val<0?"-":"";if(fmt.match(/^00+$/))return sign+pad0r(aval,fmt.length);if(fmt.match(/^[#?]+$/)){o=pad0r(val,0);if(o==="0")o="";return o.length>fmt.length?o:hashq(fmt.substr(0,fmt.length-o.length))+o}if((r=fmt.match(frac1))!==null)return write_num_f1(r,aval,sign);if(fmt.match(/^#+0+$/)!==null)return sign+pad0r(aval,fmt.length-fmt.indexOf("0"));if((r=fmt.match(dec1))!==null){o=rnd(val,r[1].length).replace(/^([^\.]+)$/,"$1."+r[1]).replace(/\.$/,"."+r[1]).replace(/\.(\d*)$/,function($$,$1){return"."+$1+fill("0",r[1].length-$1.length)});return fmt.indexOf("0.")!==-1?o:o.replace(/^0\./,".")}fmt=fmt.replace(/^#+([0.])/,"$1");if((r=fmt.match(/^(0*)\.(#*)$/))!==null){return sign+rnd(aval,r[2].length).replace(/\.(\d*[1-9])0*$/,".$1").replace(/^(-?\d*)$/,"$1.").replace(/^0\./,r[1].length?"0.":".")}if((r=fmt.match(/^#,##0(\.?)$/))!==null)return sign+commaify(pad0r(aval,0));if((r=fmt.match(/^#,##0\.([#0]*0)$/))!==null){return val<0?"-"+write_num_flt(type,fmt,-val):commaify(""+Math.floor(val))+"."+pad0(dec(val,r[1].length),r[1].length)}if((r=fmt.match(/^#,#*,#0/))!==null)return write_num_flt(type,fmt.replace(/^#,#*,/,""),val);if((r=fmt.match(/^([0#]+)(\\?-([0#]+))+$/))!==null){o=_strrev(write_num_flt(type,fmt.replace(/[\\-]/g,""),val));ri=0;return _strrev(_strrev(fmt.replace(/\\/g,"")).replace(/[0#]/g,function(x){return ri<o.length?o[ri++]:x==="0"?"0":""}))}if(fmt.match(phone)!==null){o=write_num_flt(type,"##########",val);return"("+o.substr(0,3)+") "+o.substr(3,3)+"-"+o.substr(6)}var oa="";if((r=fmt.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))!==null){ri=Math.min(r[4].length,7);ff=frac(aval,Math.pow(10,ri)-1,false);o=""+sign;oa=write_num("n",r[1],ff[1]);if(oa[oa.length-1]==" ")oa=oa.substr(0,oa.length-1)+"0";o+=oa+r[2]+"/"+r[3];oa=rpad_(ff[2],ri);if(oa.length<r[4].length)oa=hashq(r[4].substr(r[4].length-oa.length))+oa;o+=oa;return o}if((r=fmt.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))!==null){ri=Math.min(Math.max(r[1].length,r[4].length),7);ff=frac(aval,Math.pow(10,ri)-1,true);return sign+(ff[0]||(ff[1]?"":"0"))+" "+(ff[1]?pad_(ff[1],ri)+r[2]+"/"+r[3]+rpad_(ff[2],ri):fill(" ",2*ri+1+r[2].length+r[3].length))}if((r=fmt.match(/^[#0?]+$/))!==null){o=pad0r(val,0);if(fmt.length<=o.length)return o;return hashq(fmt.substr(0,fmt.length-o.length))+o}if((r=fmt.match(/^([#0?]+)\.([#0]+)$/))!==null){o=""+val.toFixed(Math.min(r[2].length,10)).replace(/([^0])0+$/,"$1");ri=o.indexOf(".");var lres=fmt.indexOf(".")-ri,rres=fmt.length-o.length-lres;return hashq(fmt.substr(0,lres)+o+fmt.substr(fmt.length-rres))}if((r=fmt.match(/^00,000\.([#0]*0)$/))!==null){ri=dec(val,r[1].length);return val<0?"-"+write_num_flt(type,fmt,-val):commaify(flr(val)).replace(/^\d,\d{3}$/,"0$&").replace(/^\d*$/,function($$){return"00,"+($$.length<3?pad0(0,3-$$.length):"")+$$})+"."+pad0(ri,r[1].length)}switch(fmt){case"#,###":var x=commaify(pad0r(aval,0));return x!=="0"?sign+x:"";default:}throw new Error("unsupported format |"+fmt+"|")}function write_num_cm2(type,fmt,val){var idx=fmt.length-1;while(fmt.charCodeAt(idx-1)===44)--idx;return write_num(type,fmt.substr(0,idx),val/Math.pow(10,3*(fmt.length-idx)))}function write_num_pct2(type,fmt,val){var sfmt=fmt.replace(pct1,""),mul=fmt.length-sfmt.length;return write_num(type,sfmt,val*Math.pow(10,2*mul))+fill("%",mul)}function write_num_exp2(fmt,val){var o;var idx=fmt.indexOf("E")-fmt.indexOf(".")-1;if(fmt.match(/^#+0.0E\+0$/)){var period=fmt.indexOf(".");if(period===-1)period=fmt.indexOf("E");var ee=Math.floor(Math.log(Math.abs(val))*Math.LOG10E)%period;if(ee<0)ee+=period;o=(val/Math.pow(10,ee)).toPrecision(idx+1+(period+ee)%period);if(!o.match(/[Ee]/)){var fakee=Math.floor(Math.log(Math.abs(val))*Math.LOG10E);if(o.indexOf(".")===-1)o=o[0]+"."+o.substr(1)+"E+"+(fakee-o.length+ee);else o+="E+"+(fakee-ee);o=o.replace(/\+-/,"-")}o=o.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/,function($$,$1,$2,$3){return $1+$2+$3.substr(0,(period+ee)%period)+"."+$3.substr(ee)+"E"})}else o=val.toExponential(idx);if(fmt.match(/E\+00$/)&&o.match(/e[+-]\d$/))o=o.substr(0,o.length-1)+"0"+o[o.length-1];if(fmt.match(/E\-/)&&o.match(/e\+/))o=o.replace(/e\+/,"e");return o.replace("e","E")}function write_num_int(type,fmt,val){if(type.charCodeAt(0)===40&&!fmt.match(closeparen)){var ffmt=fmt.replace(/\( */,"").replace(/ \)/,"").replace(/\)/,"");if(val>=0)return write_num_int("n",ffmt,val);return"("+write_num_int("n",ffmt,-val)+")"}if(fmt.charCodeAt(fmt.length-1)===44)return write_num_cm2(type,fmt,val);if(fmt.indexOf("%")!==-1)return write_num_pct2(type,fmt,val);if(fmt.indexOf("E")!==-1)return write_num_exp2(fmt,val);if(fmt.charCodeAt(0)===36)return"$"+write_num_int(type,fmt.substr(fmt[1]==" "?2:1),val);var o;var r,ri,ff,aval=Math.abs(val),sign=val<0?"-":"";if(fmt.match(/^00+$/))return sign+pad0(aval,fmt.length);if(fmt.match(/^[#?]+$/)){o=""+val;if(val===0)o="";return o.length>fmt.length?o:hashq(fmt.substr(0,fmt.length-o.length))+o}if((r=fmt.match(frac1))!==null)return write_num_f2(r,aval,sign);if(fmt.match(/^#+0+$/)!==null)return sign+pad0(aval,fmt.length-fmt.indexOf("0"));if((r=fmt.match(dec1))!==null){o=(""+val).replace(/^([^\.]+)$/,"$1."+r[1]).replace(/\.$/,"."+r[1]).replace(/\.(\d*)$/,function($$,$1){return"."+$1+fill("0",r[1].length-$1.length)});return fmt.indexOf("0.")!==-1?o:o.replace(/^0\./,".")
}fmt=fmt.replace(/^#+([0.])/,"$1");if((r=fmt.match(/^(0*)\.(#*)$/))!==null){return sign+(""+aval).replace(/\.(\d*[1-9])0*$/,".$1").replace(/^(-?\d*)$/,"$1.").replace(/^0\./,r[1].length?"0.":".")}if((r=fmt.match(/^#,##0(\.?)$/))!==null)return sign+commaify(""+aval);if((r=fmt.match(/^#,##0\.([#0]*0)$/))!==null){return val<0?"-"+write_num_int(type,fmt,-val):commaify(""+val)+"."+fill("0",r[1].length)}if((r=fmt.match(/^#,#*,#0/))!==null)return write_num_int(type,fmt.replace(/^#,#*,/,""),val);if((r=fmt.match(/^([0#]+)(\\?-([0#]+))+$/))!==null){o=_strrev(write_num_int(type,fmt.replace(/[\\-]/g,""),val));ri=0;return _strrev(_strrev(fmt.replace(/\\/g,"")).replace(/[0#]/g,function(x){return ri<o.length?o[ri++]:x==="0"?"0":""}))}if(fmt.match(phone)!==null){o=write_num_int(type,"##########",val);return"("+o.substr(0,3)+") "+o.substr(3,3)+"-"+o.substr(6)}var oa="";if((r=fmt.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))!==null){ri=Math.min(r[4].length,7);ff=frac(aval,Math.pow(10,ri)-1,false);o=""+sign;oa=write_num("n",r[1],ff[1]);if(oa[oa.length-1]==" ")oa=oa.substr(0,oa.length-1)+"0";o+=oa+r[2]+"/"+r[3];oa=rpad_(ff[2],ri);if(oa.length<r[4].length)oa=hashq(r[4].substr(r[4].length-oa.length))+oa;o+=oa;return o}if((r=fmt.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))!==null){ri=Math.min(Math.max(r[1].length,r[4].length),7);ff=frac(aval,Math.pow(10,ri)-1,true);return sign+(ff[0]||(ff[1]?"":"0"))+" "+(ff[1]?pad_(ff[1],ri)+r[2]+"/"+r[3]+rpad_(ff[2],ri):fill(" ",2*ri+1+r[2].length+r[3].length))}if((r=fmt.match(/^[#0?]+$/))!==null){o=""+val;if(fmt.length<=o.length)return o;return hashq(fmt.substr(0,fmt.length-o.length))+o}if((r=fmt.match(/^([#0]+)\.([#0]+)$/))!==null){o=""+val.toFixed(Math.min(r[2].length,10)).replace(/([^0])0+$/,"$1");ri=o.indexOf(".");var lres=fmt.indexOf(".")-ri,rres=fmt.length-o.length-lres;return hashq(fmt.substr(0,lres)+o+fmt.substr(fmt.length-rres))}if((r=fmt.match(/^00,000\.([#0]*0)$/))!==null){return val<0?"-"+write_num_int(type,fmt,-val):commaify(""+val).replace(/^\d,\d{3}$/,"0$&").replace(/^\d*$/,function($$){return"00,"+($$.length<3?pad0(0,3-$$.length):"")+$$})+"."+pad0(0,r[1].length)}switch(fmt){case"#,###":var x=commaify(""+aval);return x!=="0"?sign+x:"";default:}throw new Error("unsupported format |"+fmt+"|")}return function write_num(type,fmt,val){return(val|0)===val?write_num_int(type,fmt,val):write_num_flt(type,fmt,val)}}();function split_fmt(fmt){var out=[];var in_str=false,cc;for(var i=0,j=0;i<fmt.length;++i)switch(cc=fmt.charCodeAt(i)){case 34:in_str=!in_str;break;case 95:case 42:case 92:++i;break;case 59:out[out.length]=fmt.substr(j,i-j);j=i+1}out[out.length]=fmt.substr(j);if(in_str===true)throw new Error("Format |"+fmt+"| unterminated string ");return out}SSF._split=split_fmt;var abstime=/\[[HhMmSs]*\]/;function eval_fmt(fmt,v,opts,flen){var out=[],o="",i=0,c="",lst="t",q,dt,j,cc;var hr="H";while(i<fmt.length){switch(c=fmt[i]){case"G":if(!isgeneral(fmt,i))throw new Error("unrecognized character "+c+" in "+fmt);out[out.length]={t:"G",v:"General"};i+=7;break;case'"':for(o="";(cc=fmt.charCodeAt(++i))!==34&&i<fmt.length;)o+=String.fromCharCode(cc);out[out.length]={t:"t",v:o};++i;break;case"\\":var w=fmt[++i],t=w==="("||w===")"?w:"t";out[out.length]={t:t,v:w};++i;break;case"_":out[out.length]={t:"t",v:" "};i+=2;break;case"@":out[out.length]={t:"T",v:v};++i;break;case"B":case"b":if(fmt[i+1]==="1"||fmt[i+1]==="2"){if(dt==null){dt=parse_date_code(v,opts,fmt[i+1]==="2");if(dt==null)return""}out[out.length]={t:"X",v:fmt.substr(i,2)};lst=c;i+=2;break}case"M":case"D":case"Y":case"H":case"S":case"E":c=c.toLowerCase();case"m":case"d":case"y":case"h":case"s":case"e":case"g":if(v<0)return"";if(dt==null){dt=parse_date_code(v,opts);if(dt==null)return""}o=c;while(++i<fmt.length&&fmt[i].toLowerCase()===c)o+=c;if(c==="m"&&lst.toLowerCase()==="h")c="M";if(c==="h")c=hr;out[out.length]={t:c,v:o};lst=c;break;case"A":q={t:c,v:"A"};if(dt==null)dt=parse_date_code(v,opts);if(fmt.substr(i,3)==="A/P"){if(dt!=null)q.v=dt.H>=12?"P":"A";q.t="T";hr="h";i+=3}else if(fmt.substr(i,5)==="AM/PM"){if(dt!=null)q.v=dt.H>=12?"PM":"AM";q.t="T";i+=5;hr="h"}else{q.t="t";++i}if(dt==null&&q.t==="T")return"";out[out.length]=q;lst=c;break;case"[":o=c;while(fmt[i++]!=="]"&&i<fmt.length)o+=fmt[i];if(o.substr(-1)!=="]")throw'unterminated "[" block: |'+o+"|";if(o.match(abstime)){if(dt==null){dt=parse_date_code(v,opts);if(dt==null)return""}out[out.length]={t:"Z",v:o.toLowerCase()}}else{o=""}break;case".":if(dt!=null){o=c;while((c=fmt[++i])==="0")o+=c;out[out.length]={t:"s",v:o};break}case"0":case"#":o=c;while("0#?.,E+-%".indexOf(c=fmt[++i])>-1||c=="\\"&&fmt[i+1]=="-"&&"0#".indexOf(fmt[i+2])>-1)o+=c;out[out.length]={t:"n",v:o};break;case"?":o=c;while(fmt[++i]===c)o+=c;q={t:c,v:o};out[out.length]=q;lst=c;break;case"*":++i;if(fmt[i]==" "||fmt[i]=="*")++i;break;case"(":case")":out[out.length]={t:flen===1?"t":c,v:c};++i;break;case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":o=c;while("0123456789".indexOf(fmt[++i])>-1)o+=fmt[i];out[out.length]={t:"D",v:o};break;case" ":out[out.length]={t:c,v:c};++i;break;default:if(",$-+/():!^&'~{}<>=€acfijklopqrtuvwxz".indexOf(c)===-1)throw new Error("unrecognized character "+c+" in "+fmt);out[out.length]={t:"t",v:c};++i;break}}var bt=0,ss0=0,ssm;for(i=out.length-1,lst="t";i>=0;--i){switch(out[i].t){case"h":case"H":out[i].t=hr;lst="h";if(bt<1)bt=1;break;case"s":if(ssm=out[i].v.match(/\.0+$/))ss0=Math.max(ss0,ssm[0].length-1);if(bt<3)bt=3;case"d":case"y":case"M":case"e":lst=out[i].t;break;case"m":if(lst==="s"){out[i].t="M";if(bt<2)bt=2}break;case"X":if(out[i].v==="B2");break;case"Z":if(bt<1&&out[i].v.match(/[Hh]/))bt=1;if(bt<2&&out[i].v.match(/[Mm]/))bt=2;if(bt<3&&out[i].v.match(/[Ss]/))bt=3}}switch(bt){case 0:break;case 1:if(dt.u>=.5){dt.u=0;++dt.S}if(dt.S>=60){dt.S=0;++dt.M}if(dt.M>=60){dt.M=0;++dt.H}break;case 2:if(dt.u>=.5){dt.u=0;++dt.S}if(dt.S>=60){dt.S=0;++dt.M}break}var nstr="",jj;for(i=0;i<out.length;++i){switch(out[i].t){case"t":case"T":case" ":case"D":break;case"X":out[i]=undefined;break;case"d":case"m":case"y":case"h":case"H":case"M":case"s":case"e":case"b":case"Z":out[i].v=write_date(out[i].t.charCodeAt(0),out[i].v,dt,ss0);out[i].t="t";break;case"n":case"(":case"?":jj=i+1;while(out[jj]!=null&&((c=out[jj].t)==="?"||c==="D"||(c===" "||c==="t")&&out[jj+1]!=null&&(out[jj+1].t==="?"||out[jj+1].t==="t"&&out[jj+1].v==="/")||out[i].t==="("&&(c===" "||c==="n"||c===")")||c==="t"&&(out[jj].v==="/"||"$€".indexOf(out[jj].v)>-1||out[jj].v===" "&&out[jj+1]!=null&&out[jj+1].t=="?"))){out[i].v+=out[jj].v;out[jj]=undefined;++jj}nstr+=out[i].v;i=jj-1;break;case"G":out[i].t="t";out[i].v=general_fmt(v,opts);break}}var vv="",myv,ostr;if(nstr.length>0){myv=v<0&&nstr.charCodeAt(0)===45?-v:v;ostr=write_num(nstr.charCodeAt(0)===40?"(":"n",nstr,myv);jj=ostr.length-1;var decpt=out.length;for(i=0;i<out.length;++i)if(out[i]!=null&&out[i].v.indexOf(".")>-1){decpt=i;break}var lasti=out.length;if(decpt===out.length&&ostr.indexOf("E")===-1){for(i=out.length-1;i>=0;--i){if(out[i]==null||"n?(".indexOf(out[i].t)===-1)continue;if(jj>=out[i].v.length-1){jj-=out[i].v.length;out[i].v=ostr.substr(jj+1,out[i].v.length)}else if(jj<0)out[i].v="";else{out[i].v=ostr.substr(0,jj+1);jj=-1}out[i].t="t";lasti=i}if(jj>=0&&lasti<out.length)out[lasti].v=ostr.substr(0,jj+1)+out[lasti].v}else if(decpt!==out.length&&ostr.indexOf("E")===-1){jj=ostr.indexOf(".")-1;for(i=decpt;i>=0;--i){if(out[i]==null||"n?(".indexOf(out[i].t)===-1)continue;j=out[i].v.indexOf(".")>-1&&i===decpt?out[i].v.indexOf(".")-1:out[i].v.length-1;vv=out[i].v.substr(j+1);for(;j>=0;--j){if(jj>=0&&(out[i].v[j]==="0"||out[i].v[j]==="#"))vv=ostr[jj--]+vv}out[i].v=vv;out[i].t="t";lasti=i}if(jj>=0&&lasti<out.length)out[lasti].v=ostr.substr(0,jj+1)+out[lasti].v;jj=ostr.indexOf(".")+1;for(i=decpt;i<out.length;++i){if(out[i]==null||"n?(".indexOf(out[i].t)===-1&&i!==decpt)continue;j=out[i].v.indexOf(".")>-1&&i===decpt?out[i].v.indexOf(".")+1:0;vv=out[i].v.substr(0,j);for(;j<out[i].v.length;++j){if(jj<ostr.length)vv+=ostr[jj++]}out[i].v=vv;out[i].t="t";lasti=i}}}for(i=0;i<out.length;++i)if(out[i]!=null&&"n(?".indexOf(out[i].t)>-1){myv=flen>1&&v<0&&i>0&&out[i-1].v==="-"?-v:v;out[i].v=write_num(out[i].t,out[i].v,myv);out[i].t="t"}var retval="";for(i=0;i!==out.length;++i)if(out[i]!=null)retval+=out[i].v;return retval}SSF._eval=eval_fmt;var cfregex=/\[[=<>]/;var cfregex2=/\[([=<>]*)(-?\d+\.?\d*)\]/;function chkcond(v,rr){if(rr==null)return false;var thresh=parseFloat(rr[2]);switch(rr[1]){case"=":if(v==thresh)return true;break;case">":if(v>thresh)return true;break;case"<":if(v<thresh)return true;break;case"<>":if(v!=thresh)return true;break;case">=":if(v>=thresh)return true;break;case"<=":if(v<=thresh)return true;break}return false}function choose_fmt(f,v){var fmt=split_fmt(f);var l=fmt.length,lat=fmt[l-1].indexOf("@");if(l<4&&lat>-1)--l;if(fmt.length>4)throw"cannot find right format for |"+fmt+"|";if(typeof v!=="number")return[4,fmt.length===4||lat>-1?fmt[fmt.length-1]:"@"];switch(fmt.length){case 1:fmt=lat>-1?["General","General","General",fmt[0]]:[fmt[0],fmt[0],fmt[0],"@"];break;case 2:fmt=lat>-1?[fmt[0],fmt[0],fmt[0],fmt[1]]:[fmt[0],fmt[1],fmt[0],"@"];break;case 3:fmt=lat>-1?[fmt[0],fmt[1],fmt[0],fmt[2]]:[fmt[0],fmt[1],fmt[2],"@"];break;case 4:break}var ff=v>0?fmt[0]:v<0?fmt[1]:fmt[2];if(fmt[0].indexOf("[")===-1&&fmt[1].indexOf("[")===-1)return[l,ff];if(fmt[0].match(cfregex)!=null||fmt[1].match(cfregex)!=null){var m1=fmt[0].match(cfregex2);var m2=fmt[1].match(cfregex2);return chkcond(v,m1)?[l,fmt[0]]:chkcond(v,m2)?[l,fmt[1]]:[l,fmt[m1!=null&&m2!=null?2:1]]}return[l,ff]}function format(fmt,v,o){fixopts(o!=null?o:o=[]);var sfmt="";switch(typeof fmt){case"string":sfmt=fmt;break;case"number":sfmt=(o.table!=null?o.table:table_fmt)[fmt];break}if(isgeneral(sfmt,0))return general_fmt(v,o);var f=choose_fmt(sfmt,v);if(isgeneral(f[1]))return general_fmt(v,o);if(v===true)v="TRUE";else if(v===false)v="FALSE";else if(v===""||v==null)return"";return eval_fmt(f[1],v,o,f[0])}SSF._table=table_fmt;SSF.load=function load_entry(fmt,idx){table_fmt[idx]=fmt};SSF.format=format;SSF.get_table=function get_table(){return table_fmt};SSF.load_table=function load_table(tbl){for(var i=0;i!=392;++i)if(tbl[i]!==undefined)SSF.load(tbl[i],i)}};make_ssf(SSF);var XLMLFormatMap={"General Number":"General","General Date":SSF._table[22],"Long Date":"dddd, mmmm dd, yyyy","Medium Date":SSF._table[15],"Short Date":SSF._table[14],"Long Time":SSF._table[19],"Medium Time":SSF._table[18],"Short Time":SSF._table[20],Currency:'"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',Fixed:SSF._table[2],Standard:SSF._table[4],Percent:SSF._table[10],Scientific:SSF._table[11],"Yes/No":'"Yes";"Yes";"No";@',"True/False":'"True";"True";"False";@',"On/Off":'"Yes";"Yes";"No";@'};var DO_NOT_EXPORT_CFB=true;var CFB=function _CFB(){var exports={};exports.version="0.10.2";function parse(file){var mver=3;var ssz=512;var nmfs=0;var ndfs=0;var dir_start=0;var minifat_start=0;var difat_start=0;var fat_addrs=[];var blob=file.slice(0,512);prep_blob(blob,0);var mv=check_get_mver(blob);mver=mv[0];switch(mver){case 3:ssz=512;break;case 4:ssz=4096;break;default:throw"Major Version: Expected 3 or 4 saw "+mver}if(ssz!==512){blob=file.slice(0,ssz);prep_blob(blob,28)}var header=file.slice(0,ssz);check_shifts(blob,mver);var nds=blob.read_shift(4,"i");if(mver===3&&nds!==0)throw"# Directory Sectors: Expected 0 saw "+nds;blob.l+=4;dir_start=blob.read_shift(4,"i");blob.l+=4;blob.chk("00100000","Mini Stream Cutoff Size: ");minifat_start=blob.read_shift(4,"i");nmfs=blob.read_shift(4,"i");difat_start=blob.read_shift(4,"i");ndfs=blob.read_shift(4,"i");for(var q,j=0;j<109;++j){q=blob.read_shift(4,"i");if(q<0)break;fat_addrs[j]=q}var sectors=sectorify(file,ssz);sleuth_fat(difat_start,ndfs,sectors,ssz,fat_addrs);var sector_list=make_sector_list(sectors,dir_start,fat_addrs,ssz);sector_list[dir_start].name="!Directory";if(nmfs>0&&minifat_start!==ENDOFCHAIN)sector_list[minifat_start].name="!MiniFAT";sector_list[fat_addrs[0]].name="!FAT";sector_list.fat_addrs=fat_addrs;sector_list.ssz=ssz;var files={},Paths=[],FileIndex=[],FullPaths=[],FullPathDir={};read_directory(dir_start,sector_list,sectors,Paths,nmfs,files,FileIndex);build_full_paths(FileIndex,FullPathDir,FullPaths,Paths);var root_name=Paths.shift();Paths.root=root_name;var find_path=make_find_path(FullPaths,Paths,FileIndex,files,root_name);return{raw:{header:header,sectors:sectors},FileIndex:FileIndex,FullPaths:FullPaths,FullPathDir:FullPathDir,find:find_path}}function check_get_mver(blob){blob.chk(HEADER_SIGNATURE,"Header Signature: ");blob.chk(HEADER_CLSID,"CLSID: ");var mver=blob.read_shift(2,"u");return[blob.read_shift(2,"u"),mver]}function check_shifts(blob,mver){var shift=9;blob.chk("feff","Byte Order: ");switch(shift=blob.read_shift(2)){case 9:if(mver!==3)throw"MajorVersion/SectorShift Mismatch";break;case 12:if(mver!==4)throw"MajorVersion/SectorShift Mismatch";break;default:throw"Sector Shift: Expected 9 or 12 saw "+shift}blob.chk("0600","Mini Sector Shift: ");blob.chk("000000000000","Reserved: ")}function sectorify(file,ssz){var nsectors=Math.ceil(file.length/ssz)-1;var sectors=new Array(nsectors);for(var i=1;i<nsectors;++i)sectors[i-1]=file.slice(i*ssz,(i+1)*ssz);sectors[nsectors-1]=file.slice(nsectors*ssz);return sectors}function build_full_paths(FI,FPD,FP,Paths){var i=0,L=0,R=0,C=0,j=0,pl=Paths.length;var dad=new Array(pl),q=new Array(pl);for(;i<pl;++i){dad[i]=q[i]=i;FP[i]=Paths[i]}for(;j<q.length;++j){i=q[j];L=FI[i].L;R=FI[i].R;C=FI[i].C;if(dad[i]===i){if(L!==-1&&dad[L]!==L)dad[i]=dad[L];if(R!==-1&&dad[R]!==R)dad[i]=dad[R]}if(C!==-1)dad[C]=i;if(L!==-1){dad[L]=dad[i];q.push(L)}if(R!==-1){dad[R]=dad[i];q.push(R)}}for(i=1;i!==pl;++i)if(dad[i]===i){if(R!==-1&&dad[R]!==R)dad[i]=dad[R];else if(L!==-1&&dad[L]!==L)dad[i]=dad[L]}for(i=1;i<pl;++i){if(FI[i].type===0)continue;j=dad[i];if(j===0)FP[i]=FP[0]+"/"+FP[i];else while(j!==0){FP[i]=FP[j]+"/"+FP[i];j=dad[j]}dad[i]=0}FP[0]+="/";for(i=1;i<pl;++i){if(FI[i].type!==2)FP[i]+="/";FPD[FP[i]]=FI[i]}}function make_find_path(FullPaths,Paths,FileIndex,files,root_name){var UCFullPaths=new Array(FullPaths.length);var UCPaths=new Array(Paths.length),i;for(i=0;i<FullPaths.length;++i)UCFullPaths[i]=FullPaths[i].toUpperCase().replace(chr0,"").replace(chr1,"!");for(i=0;i<Paths.length;++i)UCPaths[i]=Paths[i].toUpperCase().replace(chr0,"").replace(chr1,"!");return function find_path(path){var k;if(path.charCodeAt(0)===47){k=true;path=root_name+path}else k=path.indexOf("/")!==-1;var UCPath=path.toUpperCase().replace(chr0,"").replace(chr1,"!");var w=k===true?UCFullPaths.indexOf(UCPath):UCPaths.indexOf(UCPath);if(w===-1)return null;return k===true?FileIndex[w]:files[Paths[w]]}}function sleuth_fat(idx,cnt,sectors,ssz,fat_addrs){var q;if(idx===ENDOFCHAIN){if(cnt!==0)throw"DIFAT chain shorter than expected"}else if(idx!==-1){var sector=sectors[idx],m=(ssz>>>2)-1;for(var i=0;i<m;++i){if((q=__readInt32LE(sector,i*4))===ENDOFCHAIN)break;fat_addrs.push(q)}sleuth_fat(__readInt32LE(sector,ssz-4),cnt-1,sectors,ssz,fat_addrs)}}function get_sector_list(sectors,start,fat_addrs,ssz,chkd){var sl=sectors.length;var buf,buf_chain;if(!chkd)chkd=new Array(sl);var modulus=ssz-1,j,jj;buf=[];buf_chain=[];for(j=start;j>=0;){chkd[j]=true;buf[buf.length]=j;buf_chain.push(sectors[j]);var addr=fat_addrs[Math.floor(j*4/ssz)];jj=j*4&modulus;if(ssz<4+jj)throw"FAT boundary crossed: "+j+" 4 "+ssz;j=__readInt32LE(sectors[addr],jj)}return{nodes:buf,data:__toBuffer([buf_chain])}}function make_sector_list(sectors,dir_start,fat_addrs,ssz){var sl=sectors.length,sector_list=new Array(sl);var chkd=new Array(sl),buf,buf_chain;var modulus=ssz-1,i,j,k,jj;for(i=0;i<sl;++i){buf=[];k=i+dir_start;if(k>=sl)k-=sl;if(chkd[k]===true)continue;buf_chain=[];for(j=k;j>=0;){chkd[j]=true;buf[buf.length]=j;buf_chain.push(sectors[j]);var addr=fat_addrs[Math.floor(j*4/ssz)];jj=j*4&modulus;if(ssz<4+jj)throw"FAT boundary crossed: "+j+" 4 "+ssz;j=__readInt32LE(sectors[addr],jj)}sector_list[k]={nodes:buf,data:__toBuffer([buf_chain])}}return sector_list}function read_directory(dir_start,sector_list,sectors,Paths,nmfs,files,FileIndex){var blob;var minifat_store=0,pl=Paths.length?2:0;var sector=sector_list[dir_start].data;var i=0,namelen=0,name,o,ctime,mtime;for(;i<sector.length;i+=128){blob=sector.slice(i,i+128);prep_blob(blob,64);namelen=blob.read_shift(2);if(namelen===0)continue;name=__utf16le(blob,0,namelen-pl);Paths.push(name);o={name:name,type:blob.read_shift(1),color:blob.read_shift(1),L:blob.read_shift(4,"i"),R:blob.read_shift(4,"i"),C:blob.read_shift(4,"i"),clsid:blob.read_shift(16),state:blob.read_shift(4,"i")};ctime=blob.read_shift(2)+blob.read_shift(2)+blob.read_shift(2)+blob.read_shift(2);if(ctime!==0){o.ctime=ctime;o.ct=read_date(blob,blob.l-8)}mtime=blob.read_shift(2)+blob.read_shift(2)+blob.read_shift(2)+blob.read_shift(2);if(mtime!==0){o.mtime=mtime;o.mt=read_date(blob,blob.l-8)}o.start=blob.read_shift(4,"i");o.size=blob.read_shift(4,"i");if(o.type===5){minifat_store=o.start;if(nmfs>0&&minifat_store!==ENDOFCHAIN)sector_list[minifat_store].name="!StreamData"}else if(o.size>=4096){o.storage="fat";if(sector_list[o.start]===undefined)sector_list[o.start]=get_sector_list(sectors,o.start,sector_list.fat_addrs,sector_list.ssz);sector_list[o.start].name=o.name;o.content=sector_list[o.start].data.slice(0,o.size);prep_blob(o.content,0)}else{o.storage="minifat";if(minifat_store!==ENDOFCHAIN&&o.start!==ENDOFCHAIN){o.content=sector_list[minifat_store].data.slice(o.start*MSSZ,o.start*MSSZ+o.size);prep_blob(o.content,0)}}files[name]=o;FileIndex.push(o)}}function read_date(blob,offset){return new Date((__readUInt32LE(blob,offset+4)/1e7*Math.pow(2,32)+__readUInt32LE(blob,offset)/1e7-11644473600)*1e3)}var fs;function readFileSync(filename,options){if(fs===undefined)fs=require("fs");return parse(fs.readFileSync(filename),options)}function readSync(blob,options){switch(options!==undefined&&options.type!==undefined?options.type:"base64"){case"file":return readFileSync(blob,options);case"base64":return parse(s2a(Base64.decode(blob)),options);case"binary":return parse(s2a(blob),options)}return parse(blob)}var MSSZ=64;var ENDOFCHAIN=-2;var HEADER_SIGNATURE="d0cf11e0a1b11ae1";var HEADER_CLSID="00000000000000000000000000000000";var consts={MAXREGSECT:-6,DIFSECT:-4,FATSECT:-3,ENDOFCHAIN:ENDOFCHAIN,FREESECT:-1,HEADER_SIGNATURE:HEADER_SIGNATURE,HEADER_MINOR_VERSION:"3e00",MAXREGSID:-6,NOSTREAM:-1,HEADER_CLSID:HEADER_CLSID,EntryTypes:["unknown","storage","stream","lockbytes","property","root"]};exports.read=readSync;exports.parse=parse;exports.utils={ReadShift:ReadShift,CheckField:CheckField,prep_blob:prep_blob,bconcat:bconcat,consts:consts};return exports}();if(typeof require!=="undefined"&&typeof module!=="undefined"&&typeof DO_NOT_EXPORT_CFB==="undefined"){module.exports=CFB}function isval(x){return x!==undefined&&x!==null}function keys(o){return Object.keys(o)}function evert_key(obj,key){var o=[],K=keys(obj);for(var i=0;i!==K.length;++i)o[obj[K[i]][key]]=K[i];return o}function evert(obj){var o=[],K=keys(obj);for(var i=0;i!==K.length;++i)o[obj[K[i]]]=K[i];return o}function evert_num(obj){var o=[],K=keys(obj);for(var i=0;i!==K.length;++i)o[obj[K[i]]]=parseInt(K[i],10);return o}function evert_arr(obj){var o=[],K=keys(obj);for(var i=0;i!==K.length;++i){if(o[obj[K[i]]]==null)o[obj[K[i]]]=[];o[obj[K[i]]].push(K[i])}return o}function datenum(v,date1904){if(date1904)v+=1462;var epoch=Date.parse(v);return(epoch+22091616e5)/(24*60*60*1e3)}function cc2str(arr){var o="";for(var i=0;i!=arr.length;++i)o+=String.fromCharCode(arr[i]);return o}function getdata(data){if(!data)return null;if(data.name.substr(-4)===".bin"){if(data.data)return char_codes(data.data);if(data.asNodeBuffer&&has_buf)return data.asNodeBuffer();if(data._data&&data._data.getContent)return Array.prototype.slice.call(data._data.getContent())}else{if(data.data)return data.name.substr(-4)!==".bin"?debom_xml(data.data):char_codes(data.data);if(data.asNodeBuffer&&has_buf)return debom_xml(data.asNodeBuffer().toString("binary"));if(data.asBinary)return debom_xml(data.asBinary());if(data._data&&data._data.getContent)return debom_xml(cc2str(Array.prototype.slice.call(data._data.getContent(),0)))}return null}function safegetzipfile(zip,file){var f=file;if(zip.files[f])return zip.files[f];f=file.toLowerCase();if(zip.files[f])return zip.files[f];f=f.replace(/\//g,"\\");if(zip.files[f])return zip.files[f];return null}function getzipfile(zip,file){var o=safegetzipfile(zip,file);if(o==null)throw new Error("Cannot find file "+file+" in zip");return o}function getzipdata(zip,file,safe){if(!safe)return getdata(getzipfile(zip,file));if(!file)return null;try{return getzipdata(zip,file)}catch(e){return null}}var _fs,jszip;if(typeof JSZip!=="undefined")jszip=JSZip;if(typeof exports!=="undefined"){if(typeof module!=="undefined"&&module.exports){if(has_buf&&typeof jszip==="undefined")jszip=require("js"+"zip");if(typeof jszip==="undefined")jszip=require("./js"+"zip").JSZip;_fs=require("f"+"s")}}var attregexg=/([\w:]+)=((?:")([^"]*)(?:")|(?:')([^']*)(?:'))/g;var tagregex=/<[^>]*>/g;var nsregex=/<\w*:/,nsregex2=/<(\/?)\w+:/;function parsexmltag(tag,skip_root){var z=[];var eq=0,c=0;for(;eq!==tag.length;++eq)if((c=tag.charCodeAt(eq))===32||c===10||c===13)break;if(!skip_root)z[0]=tag.substr(0,eq);if(eq===tag.length)return z;var m=tag.match(attregexg),j=0,w="",v="",i=0,q="",cc="";if(m)for(i=0;i!=m.length;++i){cc=m[i];for(c=0;c!=cc.length;++c)if(cc.charCodeAt(c)===61)break;q=cc.substr(0,c);v=cc.substring(c+2,cc.length-1);for(j=0;j!=q.length;++j)if(q.charCodeAt(j)===58)break;if(j===q.length)z[q]=v;else z[(j===5&&q.substr(0,5)==="xmlns"?"xmlns":"")+q.substr(j+1)]=v}return z}function strip_ns(x){return x.replace(nsregex2,"<$1")}var encodings={"&quot;":'"',"&apos;":"'","&gt;":">","&lt;":"<","&amp;":"&"};var rencoding=evert(encodings);var rencstr="&<>'\"".split("");var unescapexml=function(){var encregex=/&[a-z]*;/g,coderegex=/_x([\da-fA-F]+)_/g;return function unescapexml(text){var s=text+"";return s.replace(encregex,function($$){return encodings[$$]}).replace(coderegex,function(m,c){return String.fromCharCode(parseInt(c,16))})}}();var decregex=/[&<>'"]/g,charegex=/[\u0000-\u0008\u000b-\u001f]/g;function escapexml(text){var s=text+"";return s.replace(decregex,function(y){return rencoding[y]}).replace(charegex,function(s){return"_x"+("000"+s.charCodeAt(0).toString(16)).substr(-4)+"_"})}var xlml_fixstr=function(){var entregex=/&#(\d+);/g;function entrepl($$,$1){return String.fromCharCode(parseInt($1,10))}return function xlml_fixstr(str){return str.replace(entregex,entrepl)}}();function parsexmlbool(value,tag){switch(value){case"1":case"true":case"TRUE":return true;default:return false}}var utf8read=function utf8reada(orig){var out="",i=0,c=0,d=0,e=0,f=0,w=0;while(i<orig.length){c=orig.charCodeAt(i++);if(c<128){out+=String.fromCharCode(c);continue}d=orig.charCodeAt(i++);if(c>191&&c<224){out+=String.fromCharCode((c&31)<<6|d&63);continue}e=orig.charCodeAt(i++);if(c<240){out+=String.fromCharCode((c&15)<<12|(d&63)<<6|e&63);continue}f=orig.charCodeAt(i++);w=((c&7)<<18|(d&63)<<12|(e&63)<<6|f&63)-65536;out+=String.fromCharCode(55296+(w>>>10&1023));out+=String.fromCharCode(56320+(w&1023))}return out};if(has_buf){var utf8readb=function utf8readb(data){var out=new Buffer(2*data.length),w,i,j=1,k=0,ww=0,c;for(i=0;i<data.length;i+=j){j=1;if((c=data.charCodeAt(i))<128)w=c;else if(c<224){w=(c&31)*64+(data.charCodeAt(i+1)&63);j=2}else if(c<240){w=(c&15)*4096+(data.charCodeAt(i+1)&63)*64+(data.charCodeAt(i+2)&63);j=3}else{j=4;w=(c&7)*262144+(data.charCodeAt(i+1)&63)*4096+(data.charCodeAt(i+2)&63)*64+(data.charCodeAt(i+3)&63);w-=65536;ww=55296+(w>>>10&1023);w=56320+(w&1023)}if(ww!==0){out[k++]=ww&255;out[k++]=ww>>>8;ww=0}out[k++]=w%256;out[k++]=w>>>8}out.length=k;return out.toString("ucs2")};var corpus="foo bar bazâð£";if(utf8read(corpus)==utf8readb(corpus))utf8read=utf8readb;var utf8readc=function utf8readc(data){return Buffer(data,"binary").toString("utf8")};if(utf8read(corpus)==utf8readc(corpus))utf8read=utf8readc}var matchtag=function(){var mtcache={};return function matchtag(f,g){var t=f+"|"+g;if(mtcache[t]!==undefined)return mtcache[t];return mtcache[t]=new RegExp("<(?:\\w+:)?"+f+'(?: xml:space="preserve")?(?:[^>]*)>([^☃]*)</(?:\\w+:)?'+f+">",g||"")}}();var vtregex=function(){var vt_cache={};return function vt_regex(bt){if(vt_cache[bt]!==undefined)return vt_cache[bt];return vt_cache[bt]=new RegExp("<vt:"+bt+">(.*?)</vt:"+bt+">","g")}}();var vtvregex=/<\/?vt:variant>/g,vtmregex=/<vt:([^>]*)>(.*)</;function parseVector(data){var h=parsexmltag(data);var matches=data.match(vtregex(h.baseType))||[];if(matches.length!=h.size)throw"unexpected vector length "+matches.length+" != "+h.size;var res=[];matches.forEach(function(x){var v=x.replace(vtvregex,"").match(vtmregex);res.push({v:v[2],t:v[1]})});return res}var wtregex=/(^\s|\s$|\n)/;function writetag(f,g){return"<"+f+(g.match(wtregex)?' xml:space="preserve"':"")+">"+g+"</"+f+">"}function wxt_helper(h){return keys(h).map(function(k){return" "+k+'="'+h[k]+'"'}).join("")}function writextag(f,g,h){return"<"+f+(isval(h)?wxt_helper(h):"")+(isval(g)?(g.match(wtregex)?' xml:space="preserve"':"")+">"+g+"</"+f:"/")+">"}function write_w3cdtf(d,t){try{return d.toISOString().replace(/\.\d*/,"")}catch(e){if(t)throw e}}function write_vt(s){switch(typeof s){case"string":return writextag("vt:lpwstr",s);case"number":return writextag((s|0)==s?"vt:i4":"vt:r8",String(s));case"boolean":return writextag("vt:bool",s?"true":"false")}if(s instanceof Date)return writextag("vt:filetime",write_w3cdtf(s));throw new Error("Unable to serialize "+s)}var XML_HEADER='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n';var XMLNS={dc:"http://purl.org/dc/elements/1.1/",dcterms:"http://purl.org/dc/terms/",dcmitype:"http://purl.org/dc/dcmitype/",mx:"http://schemas.microsoft.com/office/mac/excel/2008/main",r:"http://schemas.openxmlformats.org/officeDocument/2006/relationships",sjs:"http://schemas.openxmlformats.org/package/2006/sheetjs/core-properties",vt:"http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",xsi:"http://www.w3.org/2001/XMLSchema-instance",xsd:"http://www.w3.org/2001/XMLSchema"};XMLNS.main=["http://schemas.openxmlformats.org/spreadsheetml/2006/main","http://purl.oclc.org/ooxml/spreadsheetml/main","http://schemas.microsoft.com/office/excel/2006/main","http://schemas.microsoft.com/office/excel/2006/2"];function readIEEE754(buf,idx,isLE,nl,ml){if(isLE===undefined)isLE=true;if(!nl)nl=8;if(!ml&&nl===8)ml=52;var e,m,el=nl*8-ml-1,eMax=(1<<el)-1,eBias=eMax>>1;var bits=-7,d=isLE?-1:1,i=isLE?nl-1:0,s=buf[idx+i];i+=d;e=s&(1<<-bits)-1;s>>>=-bits;bits+=el;for(;bits>0;e=e*256+buf[idx+i],i+=d,bits-=8);m=e&(1<<-bits)-1;e>>>=-bits;bits+=ml;for(;bits>0;m=m*256+buf[idx+i],i+=d,bits-=8);if(e===eMax)return m?NaN:(s?-1:1)*Infinity;else if(e===0)e=1-eBias;else{m=m+Math.pow(2,ml);e=e-eBias}return(s?-1:1)*m*Math.pow(2,e-ml)}var __toBuffer,___toBuffer;__toBuffer=___toBuffer=function toBuffer_(bufs){var x=[];for(var i=0;i<bufs[0].length;++i){x.push.apply(x,bufs[0][i])}return x};var __utf16le,___utf16le;__utf16le=___utf16le=function utf16le_(b,s,e){var ss=[];for(var i=s;i<e;i+=2)ss.push(String.fromCharCode(__readUInt16LE(b,i)));return ss.join("")};var __hexlify,___hexlify;__hexlify=___hexlify=function hexlify_(b,s,l){return b.slice(s,s+l).map(function(x){return(x<16?"0":"")+x.toString(16)}).join("")};var __utf8,___utf8;__utf8=___utf8=function(b,s,e){var ss=[];for(var i=s;i<e;i++)ss.push(String.fromCharCode(__readUInt8(b,i)));return ss.join("")};var __lpstr,___lpstr;__lpstr=___lpstr=function lpstr_(b,i){var len=__readUInt32LE(b,i);return len>0?__utf8(b,i+4,i+4+len-1):""};var __lpwstr,___lpwstr;__lpwstr=___lpwstr=function lpwstr_(b,i){var len=2*__readUInt32LE(b,i);return len>0?__utf8(b,i+4,i+4+len-1):""};var __double,___double;__double=___double=function(b,idx){return readIEEE754(b,idx)};var is_buf=function is_buf_a(a){return Array.isArray(a)};if(has_buf){__utf16le=function utf16le_b(b,s,e){if(!Buffer.isBuffer(b))return ___utf16le(b,s,e);return b.toString("utf16le",s,e)};__hexlify=function(b,s,l){return Buffer.isBuffer(b)?b.toString("hex",s,s+l):___hexlify(b,s,l)};__lpstr=function lpstr_b(b,i){if(!Buffer.isBuffer(b))return ___lpstr(b,i);var len=b.readUInt32LE(i);return len>0?b.toString("utf8",i+4,i+4+len-1):""};__lpwstr=function lpwstr_b(b,i){if(!Buffer.isBuffer(b))return ___lpwstr(b,i);var len=2*b.readUInt32LE(i);return b.toString("utf16le",i+4,i+4+len-1)};__utf8=function utf8_b(s,e){return this.toString("utf8",s,e)};__toBuffer=function(bufs){return bufs[0].length>0&&Buffer.isBuffer(bufs[0][0])?Buffer.concat(bufs[0]):___toBuffer(bufs)};bconcat=function(bufs){return Buffer.isBuffer(bufs[0])?Buffer.concat(bufs):[].concat.apply([],bufs)};__double=function double_(b,i){if(Buffer.isBuffer(b))return b.readDoubleLE(i);return ___double(b,i)};is_buf=function is_buf_b(a){return Buffer.isBuffer(a)||Array.isArray(a)}}if(typeof cptable!=="undefined"){__utf16le=function(b,s,e){return cptable.utils.decode(1200,b.slice(s,e))};__utf8=function(b,s,e){return cptable.utils.decode(65001,b.slice(s,e))};__lpstr=function(b,i){var len=__readUInt32LE(b,i);return len>0?cptable.utils.decode(current_codepage,b.slice(i+4,i+4+len-1)):""};__lpwstr=function(b,i){var len=2*__readUInt32LE(b,i);return len>0?cptable.utils.decode(1200,b.slice(i+4,i+4+len-1)):""}}var __readUInt8=function(b,idx){return b[idx]};var __readUInt16LE=function(b,idx){return b[idx+1]*(1<<8)+b[idx]};var __readInt16LE=function(b,idx){var u=b[idx+1]*(1<<8)+b[idx];return u<32768?u:(65535-u+1)*-1};var __readUInt32LE=function(b,idx){return b[idx+3]*(1<<24)+(b[idx+2]<<16)+(b[idx+1]<<8)+b[idx]};var __readInt32LE=function(b,idx){return b[idx+3]<<24|b[idx+2]<<16|b[idx+1]<<8|b[idx]};var ___unhexlify=function(s){return s.match(/../g).map(function(x){return parseInt(x,16)})};var __unhexlify=typeof Buffer!=="undefined"?function(s){return Buffer.isBuffer(s)?new Buffer(s,"hex"):___unhexlify(s)}:___unhexlify;function ReadShift(size,t){var o="",oI,oR,oo=[],w,vv,i,loc;switch(t){case"dbcs":loc=this.l;if(has_buf&&Buffer.isBuffer(this))o=this.slice(this.l,this.l+2*size).toString("utf16le");else for(i=0;i!=size;++i){o+=String.fromCharCode(__readUInt16LE(this,loc));loc+=2}size*=2;break;case"utf8":o=__utf8(this,this.l,this.l+size);break;case"utf16le":size*=2;o=__utf16le(this,this.l,this.l+size);break;case"lpstr":o=__lpstr(this,this.l);size=5+o.length;break;case"lpwstr":o=__lpwstr(this,this.l);size=5+o.length;if(o[o.length-1]=="\x00")size+=2;break;case"cstr":size=0;o="";while((w=__readUInt8(this,this.l+size++))!==0)oo.push(_getchar(w));o=oo.join("");break;case"wstr":size=0;o="";while((w=__readUInt16LE(this,this.l+size))!==0){oo.push(_getchar(w));size+=2}size+=2;o=oo.join("");break;case"dbcs-cont":o="";loc=this.l;for(i=0;i!=size;++i){if(this.lens&&this.lens.indexOf(loc)!==-1){w=__readUInt8(this,loc);this.l=loc+1;vv=ReadShift.call(this,size-i,w?"dbcs-cont":"sbcs-cont");return oo.join("")+vv}oo.push(_getchar(__readUInt16LE(this,loc)));loc+=2}o=oo.join("");size*=2;break;case"sbcs-cont":o="";loc=this.l;for(i=0;i!=size;++i){if(this.lens&&this.lens.indexOf(loc)!==-1){w=__readUInt8(this,loc);this.l=loc+1;vv=ReadShift.call(this,size-i,w?"dbcs-cont":"sbcs-cont");return oo.join("")+vv}oo.push(_getchar(__readUInt8(this,loc)));loc+=1}o=oo.join("");break;default:switch(size){case 1:oI=__readUInt8(this,this.l);this.l++;return oI;case 2:oI=(t==="i"?__readInt16LE:__readUInt16LE)(this,this.l);this.l+=2;return oI;case 4:if(t==="i"||(this[this.l+3]&128)===0){oI=__readInt32LE(this,this.l);this.l+=4;return oI}else{oR=__readUInt32LE(this,this.l);this.l+=4;return oR}break;case 8:if(t==="f"){oR=__double(this,this.l);this.l+=8;return oR}case 16:o=__hexlify(this,this.l,size);break}}this.l+=size;return o}function WriteShift(t,val,f){var size,i;if(f==="dbcs"){for(i=0;i!=val.length;++i)this.writeUInt16LE(val.charCodeAt(i),this.l+2*i);size=2*val.length}else switch(t){case 1:size=1;this[this.l]=val&255;break;case 3:size=3;this[this.l+2]=val&255;val>>>=8;
this[this.l+1]=val&255;val>>>=8;this[this.l]=val&255;break;case 4:size=4;this.writeUInt32LE(val,this.l);break;case 8:size=8;if(f==="f"){this.writeDoubleLE(val,this.l);break}case 16:break;case-4:size=4;this.writeInt32LE(val,this.l);break}this.l+=size;return this}function CheckField(hexstr,fld){var m=__hexlify(this,this.l,hexstr.length>>1);if(m!==hexstr)throw fld+"Expected "+hexstr+" saw "+m;this.l+=hexstr.length>>1}function prep_blob(blob,pos){blob.l=pos;blob.read_shift=ReadShift;blob.chk=CheckField;blob.write_shift=WriteShift}function parsenoop(blob,length){blob.l+=length}function writenoop(blob,length){blob.l+=length}function new_buf(sz){var o=new_raw_buf(sz);prep_blob(o,0);return o}function recordhopper(data,cb,opts){var tmpbyte,cntbyte,length;prep_blob(data,data.l||0);while(data.l<data.length){var RT=data.read_shift(1);if(RT&128)RT=(RT&127)+((data.read_shift(1)&127)<<7);var R=XLSBRecordEnum[RT]||XLSBRecordEnum[65535];tmpbyte=data.read_shift(1);length=tmpbyte&127;for(cntbyte=1;cntbyte<4&&tmpbyte&128;++cntbyte)length+=((tmpbyte=data.read_shift(1))&127)<<7*cntbyte;var d=R.f(data,length,opts);if(cb(d,R,RT))return}}function buf_array(){var bufs=[],blksz=2048;var newblk=function ba_newblk(sz){var o=new_buf(sz);prep_blob(o,0);return o};var curbuf=newblk(blksz);var endbuf=function ba_endbuf(){curbuf.length=curbuf.l;if(curbuf.length>0)bufs.push(curbuf);curbuf=null};var next=function ba_next(sz){if(sz<curbuf.length-curbuf.l)return curbuf;endbuf();return curbuf=newblk(Math.max(sz+1,blksz))};var end=function ba_end(){endbuf();return __toBuffer([bufs])};var push=function ba_push(buf){endbuf();curbuf=buf;next(blksz)};return{next:next,push:push,end:end,_bufs:bufs}}function write_record(ba,type,payload,length){var t=evert_RE[type],l;if(!length)length=XLSBRecordEnum[t].p||(payload||[]).length||0;l=1+(t>=128?1:0)+1+length;if(length>=128)++l;if(length>=16384)++l;if(length>=2097152)++l;var o=ba.next(l);if(t<=127)o.write_shift(1,t);else{o.write_shift(1,(t&127)+128);o.write_shift(1,t>>7)}for(var i=0;i!=4;++i){if(length>=128){o.write_shift(1,(length&127)+128);length>>=7}else{o.write_shift(1,length);break}}if(length>0&&is_buf(payload))ba.push(payload)}function shift_cell_xls(cell,tgt){if(tgt.s){if(cell.cRel)cell.c+=tgt.s.c;if(cell.rRel)cell.r+=tgt.s.r}else{cell.c+=tgt.c;cell.r+=tgt.r}cell.cRel=cell.rRel=0;while(cell.c>=256)cell.c-=256;while(cell.r>=65536)cell.r-=65536;return cell}function shift_range_xls(cell,range){cell.s=shift_cell_xls(cell.s,range.s);cell.e=shift_cell_xls(cell.e,range.s);return cell}var OFFCRYPTO={};var make_offcrypto=function(O,_crypto){var crypto;if(typeof _crypto!=="undefined")crypto=_crypto;else if(typeof require!=="undefined"){try{crypto=require("cry"+"pto")}catch(e){crypto=null}}O.rc4=function(key,data){var S=new Array(256);var c=0,i=0,j=0,t=0;for(i=0;i!=256;++i)S[i]=i;for(i=0;i!=256;++i){j=j+S[i]+key[i%key.length].charCodeAt(0)&255;t=S[i];S[i]=S[j];S[j]=t}i=j=0;out=Buffer(data.length);for(c=0;c!=data.length;++c){i=i+1&255;j=(j+S[i])%256;t=S[i];S[i]=S[j];S[j]=t;out[c]=data[c]^S[S[i]+S[j]&255]}return out};if(crypto){O.md5=function(hex){return crypto.createHash("md5").update(hex).digest("hex")}}else{O.md5=function(hex){throw"unimplemented"}}};make_offcrypto(OFFCRYPTO,typeof crypto!=="undefined"?crypto:undefined);function parse_StrRun(data,length){return{ich:data.read_shift(2),ifnt:data.read_shift(2)}}function parse_RichStr(data,length){var start=data.l;var flags=data.read_shift(1);var str=parse_XLWideString(data);var rgsStrRun=[];var z={t:str,h:str};if((flags&1)!==0){var dwSizeStrRun=data.read_shift(4);for(var i=0;i!=dwSizeStrRun;++i)rgsStrRun.push(parse_StrRun(data));z.r=rgsStrRun}else z.r="<t>"+escapexml(str)+"</t>";if((flags&2)!==0){}data.l=start+length;return z}function write_RichStr(str,o){if(o==null)o=new_buf(5+2*str.t.length);o.write_shift(1,0);write_XLWideString(str.t,o);return o}function parse_XLSBCell(data){var col=data.read_shift(4);var iStyleRef=data.read_shift(2);iStyleRef+=data.read_shift(1)<<16;var fPhShow=data.read_shift(1);return{c:col,iStyleRef:iStyleRef}}function write_XLSBCell(cell,o){if(o==null)o=new_buf(8);o.write_shift(-4,cell.c);o.write_shift(3,cell.iStyleRef===undefined?cell.iStyleRef:cell.s);o.write_shift(1,0);return o}function parse_XLSBCodeName(data,length){return parse_XLWideString(data,length)}function parse_XLNullableWideString(data){var cchCharacters=data.read_shift(4);return cchCharacters===0||cchCharacters===4294967295?"":data.read_shift(cchCharacters,"dbcs")}function write_XLNullableWideString(data,o){if(!o)o=new_buf(127);o.write_shift(4,data.length>0?data.length:4294967295);if(data.length>0)o.write_shift(0,data,"dbcs");return o}function parse_XLWideString(data){var cchCharacters=data.read_shift(4);return cchCharacters===0?"":data.read_shift(cchCharacters,"dbcs")}function write_XLWideString(data,o){if(o==null)o=new_buf(4+2*data.length);o.write_shift(4,data.length);if(data.length>0)o.write_shift(0,data,"dbcs");return o}var parse_RelID=parse_XLNullableWideString;var write_RelID=write_XLNullableWideString;function parse_RkNumber(data){var b=data.slice(data.l,data.l+4);var fX100=b[0]&1,fInt=b[0]&2;data.l+=4;b[0]&=252;var RK=fInt===0?__double([0,0,0,0,b[0],b[1],b[2],b[3]],0):__readInt32LE(b,0)>>2;return fX100?RK/100:RK}function parse_UncheckedRfX(data){var cell={s:{},e:{}};cell.s.r=data.read_shift(4);cell.e.r=data.read_shift(4);cell.s.c=data.read_shift(4);cell.e.c=data.read_shift(4);return cell}function write_UncheckedRfX(r,o){if(!o)o=new_buf(16);o.write_shift(4,r.s.r);o.write_shift(4,r.e.r);o.write_shift(4,r.s.c);o.write_shift(4,r.e.c);return o}function parse_Xnum(data,length){return data.read_shift(8,"f")}function write_Xnum(data,o){return(o||new_buf(8)).write_shift(8,"f",data)}var BErr={0:"#NULL!",7:"#DIV/0!",15:"#VALUE!",23:"#REF!",29:"#NAME?",36:"#NUM!",42:"#N/A",43:"#GETTING_DATA",255:"#WTF?"};var RBErr=evert_num(BErr);function parse_BrtColor(data,length){var out={};var d=data.read_shift(1);out.fValidRGB=d&1;out.xColorType=d>>>1;out.index=data.read_shift(1);out.nTintAndShade=data.read_shift(2,"i");out.bRed=data.read_shift(1);out.bGreen=data.read_shift(1);out.bBlue=data.read_shift(1);out.bAlpha=data.read_shift(1)}function parse_FontFlags(data,length){var d=data.read_shift(1);data.l++;var out={fItalic:d&2,fStrikeout:d&8,fOutline:d&16,fShadow:d&32,fCondense:d&64,fExtend:d&128};return out}{var VT_EMPTY=0;var VT_NULL=1;var VT_I2=2;var VT_I4=3;var VT_R4=4;var VT_R8=5;var VT_CY=6;var VT_DATE=7;var VT_BSTR=8;var VT_ERROR=10;var VT_BOOL=11;var VT_VARIANT=12;var VT_DECIMAL=14;var VT_I1=16;var VT_UI1=17;var VT_UI2=18;var VT_UI4=19;var VT_I8=20;var VT_UI8=21;var VT_INT=22;var VT_UINT=23;var VT_LPSTR=30;var VT_LPWSTR=31;var VT_FILETIME=64;var VT_BLOB=65;var VT_STREAM=66;var VT_STORAGE=67;var VT_STREAMED_Object=68;var VT_STORED_Object=69;var VT_BLOB_Object=70;var VT_CF=71;var VT_CLSID=72;var VT_VERSIONED_STREAM=73;var VT_VECTOR=4096;var VT_ARRAY=8192;var VT_STRING=80;var VT_USTR=81;var VT_CUSTOM=[VT_STRING,VT_USTR]}var DocSummaryPIDDSI={1:{n:"CodePage",t:VT_I2},2:{n:"Category",t:VT_STRING},3:{n:"PresentationFormat",t:VT_STRING},4:{n:"ByteCount",t:VT_I4},5:{n:"LineCount",t:VT_I4},6:{n:"ParagraphCount",t:VT_I4},7:{n:"SlideCount",t:VT_I4},8:{n:"NoteCount",t:VT_I4},9:{n:"HiddenCount",t:VT_I4},10:{n:"MultimediaClipCount",t:VT_I4},11:{n:"Scale",t:VT_BOOL},12:{n:"HeadingPair",t:VT_VECTOR|VT_VARIANT},13:{n:"DocParts",t:VT_VECTOR|VT_LPSTR},14:{n:"Manager",t:VT_STRING},15:{n:"Company",t:VT_STRING},16:{n:"LinksDirty",t:VT_BOOL},17:{n:"CharacterCount",t:VT_I4},19:{n:"SharedDoc",t:VT_BOOL},22:{n:"HLinksChanged",t:VT_BOOL},23:{n:"AppVersion",t:VT_I4,p:"version"},26:{n:"ContentType",t:VT_STRING},27:{n:"ContentStatus",t:VT_STRING},28:{n:"Language",t:VT_STRING},29:{n:"Version",t:VT_STRING},255:{}};var SummaryPIDSI={1:{n:"CodePage",t:VT_I2},2:{n:"Title",t:VT_STRING},3:{n:"Subject",t:VT_STRING},4:{n:"Author",t:VT_STRING},5:{n:"Keywords",t:VT_STRING},6:{n:"Comments",t:VT_STRING},7:{n:"Template",t:VT_STRING},8:{n:"LastAuthor",t:VT_STRING},9:{n:"RevNumber",t:VT_STRING},10:{n:"EditTime",t:VT_FILETIME},11:{n:"LastPrinted",t:VT_FILETIME},12:{n:"CreatedDate",t:VT_FILETIME},13:{n:"ModifiedDate",t:VT_FILETIME},14:{n:"PageCount",t:VT_I4},15:{n:"WordCount",t:VT_I4},16:{n:"CharCount",t:VT_I4},17:{n:"Thumbnail",t:VT_CF},18:{n:"ApplicationName",t:VT_LPSTR},19:{n:"DocumentSecurity",t:VT_I4},255:{}};var SpecialProperties={2147483648:{n:"Locale",t:VT_UI4},2147483651:{n:"Behavior",t:VT_UI4},1919054434:{}};(function(){for(var y in SpecialProperties)if(SpecialProperties.hasOwnProperty(y))DocSummaryPIDDSI[y]=SummaryPIDSI[y]=SpecialProperties[y]})();var CountryEnum={1:"US",2:"CA",3:"",7:"RU",20:"EG",30:"GR",31:"NL",32:"BE",33:"FR",34:"ES",36:"HU",39:"IT",41:"CH",43:"AT",44:"GB",45:"DK",46:"SE",47:"NO",48:"PL",49:"DE",52:"MX",55:"BR",61:"AU",64:"NZ",66:"TH",81:"JP",82:"KR",84:"VN",86:"CN",90:"TR",105:"JS",213:"DZ",216:"MA",218:"LY",351:"PT",354:"IS",358:"FI",420:"CZ",886:"TW",961:"LB",962:"JO",963:"SY",964:"IQ",965:"KW",966:"SA",971:"AE",972:"IL",974:"QA",981:"IR",65535:"US"};var XLSFillPattern=[null,"solid","mediumGray","darkGray","lightGray","darkHorizontal","darkVertical","darkDown","darkUp","darkGrid","darkTrellis","lightHorizontal","lightVertical","lightDown","lightUp","lightGrid","lightTrellis","gray125","gray0625"];function rgbify(arr){return arr.map(function(x){return[x>>16&255,x>>8&255,x&255]})}var XLSIcv=rgbify([0,16777215,16711680,65280,255,16776960,16711935,65535,0,16777215,16711680,65280,255,16776960,16711935,65535,8388608,32768,128,8421376,8388736,32896,12632256,8421504,10066431,10040166,16777164,13434879,6684774,16744576,26316,13421823,128,16711935,16776960,65535,8388736,8388608,32896,255,52479,13434879,13434828,16777113,10079487,16751052,13408767,16764057,3368703,3394764,10079232,16763904,16750848,16737792,6710937,9868950,13158,3381606,13056,3355392,10040064,10040166,3355545,3355443,16777215,0]);var ct2type={"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml":"workbooks","application/vnd.ms-excel.binIndexWs":"TODO","application/vnd.ms-excel.chartsheet":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml":"TODO","application/vnd.ms-excel.dialogsheet":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml":"TODO","application/vnd.ms-excel.macrosheet":"TODO","application/vnd.ms-excel.macrosheet+xml":"TODO","application/vnd.ms-excel.intlmacrosheet":"TODO","application/vnd.ms-excel.binIndexMs":"TODO","application/vnd.openxmlformats-package.core-properties+xml":"coreprops","application/vnd.openxmlformats-officedocument.custom-properties+xml":"custprops","application/vnd.openxmlformats-officedocument.extended-properties+xml":"extprops","application/vnd.openxmlformats-officedocument.customXmlProperties+xml":"TODO","application/vnd.ms-excel.comments":"comments","application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml":"comments","application/vnd.ms-excel.pivotTable":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml":"TODO","application/vnd.ms-excel.calcChain":"calcchains","application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml":"calcchains","application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings":"TODO","application/vnd.ms-office.activeX":"TODO","application/vnd.ms-office.activeX+xml":"TODO","application/vnd.ms-excel.attachedToolbars":"TODO","application/vnd.ms-excel.connections":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml":"TODO","application/vnd.ms-excel.externalLink":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml":"TODO","application/vnd.ms-excel.sheetMetadata":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml":"TODO","application/vnd.ms-excel.pivotCacheDefinition":"TODO","application/vnd.ms-excel.pivotCacheRecords":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml":"TODO","application/vnd.ms-excel.queryTable":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml":"TODO","application/vnd.ms-excel.userNames":"TODO","application/vnd.ms-excel.revisionHeaders":"TODO","application/vnd.ms-excel.revisionLog":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml":"TODO","application/vnd.ms-excel.tableSingleCells":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml":"TODO","application/vnd.ms-excel.slicer":"TODO","application/vnd.ms-excel.slicerCache":"TODO","application/vnd.ms-excel.slicer+xml":"TODO","application/vnd.ms-excel.slicerCache+xml":"TODO","application/vnd.ms-excel.wsSortMap":"TODO","application/vnd.ms-excel.table":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml":"TODO","application/vnd.openxmlformats-officedocument.theme+xml":"themes","application/vnd.ms-excel.Timeline+xml":"TODO","application/vnd.ms-excel.TimelineCache+xml":"TODO","application/vnd.ms-office.vbaProject":"vba","application/vnd.ms-office.vbaProjectSignature":"vba","application/vnd.ms-office.volatileDependencies":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml":"TODO","application/vnd.ms-excel.controlproperties+xml":"TODO","application/vnd.openxmlformats-officedocument.model+data":"TODO","application/vnd.ms-excel.Survey+xml":"TODO","application/vnd.openxmlformats-officedocument.drawing+xml":"TODO","application/vnd.openxmlformats-officedocument.drawingml.chart+xml":"TODO","application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml":"TODO","application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml":"TODO","application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml":"TODO","application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml":"TODO","application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml":"TODO","application/vnd.openxmlformats-officedocument.vmlDrawing":"TODO","application/vnd.openxmlformats-package.relationships+xml":"rels","application/vnd.openxmlformats-officedocument.oleObject":"TODO",sheet:"js"};var CT_LIST=function(){var o={workbooks:{xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",xlsm:"application/vnd.ms-excel.sheet.macroEnabled.main+xml",xlsb:"application/vnd.ms-excel.sheet.binary.macroEnabled.main",xltx:"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml"},strs:{xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml",xlsb:"application/vnd.ms-excel.sharedStrings"},sheets:{xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",xlsb:"application/vnd.ms-excel.worksheet"},styles:{xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",xlsb:"application/vnd.ms-excel.styles"}};keys(o).forEach(function(k){if(!o[k].xlsm)o[k].xlsm=o[k].xlsx});keys(o).forEach(function(k){keys(o[k]).forEach(function(v){ct2type[o[k][v]]=k})});return o}();var type2ct=evert_arr(ct2type);XMLNS.CT="http://schemas.openxmlformats.org/package/2006/content-types";function parse_ct(data,opts){var ctext={};if(!data||!data.match)return data;var ct={workbooks:[],sheets:[],calcchains:[],themes:[],styles:[],coreprops:[],extprops:[],custprops:[],strs:[],comments:[],vba:[],TODO:[],rels:[],xmlns:""};(data.match(tagregex)||[]).forEach(function(x){var y=parsexmltag(x);switch(y[0].replace(nsregex,"<")){case"<?xml":break;case"<Types":ct.xmlns=y["xmlns"+(y[0].match(/<(\w+):/)||["",""])[1]];break;case"<Default":ctext[y.Extension]=y.ContentType;break;case"<Override":if(ct[ct2type[y.ContentType]]!==undefined)ct[ct2type[y.ContentType]].push(y.PartName);else if(opts.WTF)console.error(y);break}});if(ct.xmlns!==XMLNS.CT)throw new Error("Unknown Namespace: "+ct.xmlns);ct.calcchain=ct.calcchains.length>0?ct.calcchains[0]:"";ct.sst=ct.strs.length>0?ct.strs[0]:"";ct.style=ct.styles.length>0?ct.styles[0]:"";ct.defaults=ctext;delete ct.calcchains;return ct}var CTYPE_XML_ROOT=writextag("Types",null,{xmlns:XMLNS.CT,"xmlns:xsd":XMLNS.xsd,"xmlns:xsi":XMLNS.xsi});var CTYPE_DEFAULTS=[["xml","application/xml"],["bin","application/vnd.ms-excel.sheet.binary.macroEnabled.main"],["rels",type2ct.rels[0]]].map(function(x){return writextag("Default",null,{Extension:x[0],ContentType:x[1]})});function write_ct(ct,opts){var o=[],v;o[o.length]=XML_HEADER;o[o.length]=CTYPE_XML_ROOT;o=o.concat(CTYPE_DEFAULTS);var f1=function(w){if(ct[w]&&ct[w].length>0){v=ct[w][0];o[o.length]=writextag("Override",null,{PartName:(v[0]=="/"?"":"/")+v,ContentType:CT_LIST[w][opts.bookType||"xlsx"]})}};var f2=function(w){ct[w].forEach(function(v){o[o.length]=writextag("Override",null,{PartName:(v[0]=="/"?"":"/")+v,ContentType:CT_LIST[w][opts.bookType||"xlsx"]})})};var f3=function(t){(ct[t]||[]).forEach(function(v){o[o.length]=writextag("Override",null,{PartName:(v[0]=="/"?"":"/")+v,ContentType:type2ct[t][0]})})};f1("workbooks");f2("sheets");f3("themes");["strs","styles"].forEach(f1);["coreprops","extprops","custprops"].forEach(f3);if(o.length>2){o[o.length]="</Types>";o[1]=o[1].replace("/>",">")}return o.join("")}var RELS={WB:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",SHEET:"http://sheetjs.openxmlformats.org/officeDocument/2006/relationships/officeDocument"};function parse_rels(data,currentFilePath){if(!data)return data;if(currentFilePath.charAt(0)!=="/"){currentFilePath="/"+currentFilePath}var rels={};var hash={};var resolveRelativePathIntoAbsolute=function(to){var toksFrom=currentFilePath.split("/");toksFrom.pop();var toksTo=to.split("/");var reversed=[];while(toksTo.length!==0){var tokTo=toksTo.shift();if(tokTo===".."){toksFrom.pop()}else if(tokTo!=="."){toksFrom.push(tokTo)}}return toksFrom.join("/")};data.match(tagregex).forEach(function(x){var y=parsexmltag(x);if(y[0]==="<Relationship"){var rel={};rel.Type=y.Type;rel.Target=y.Target;rel.Id=y.Id;rel.TargetMode=y.TargetMode;var canonictarget=y.TargetMode==="External"?y.Target:resolveRelativePathIntoAbsolute(y.Target);rels[canonictarget]=rel;hash[y.Id]=rel}});rels["!id"]=hash;return rels}XMLNS.RELS="http://schemas.openxmlformats.org/package/2006/relationships";var RELS_ROOT=writextag("Relationships",null,{xmlns:XMLNS.RELS});function write_rels(rels){var o=[];o[o.length]=XML_HEADER;o[o.length]=RELS_ROOT;keys(rels["!id"]).forEach(function(rid){var rel=rels["!id"][rid];o[o.length]=writextag("Relationship",null,rel)});if(o.length>2){o[o.length]="</Relationships>";o[1]=o[1].replace("/>",">")}return o.join("")}var CORE_PROPS=[["cp:category","Category"],["cp:contentStatus","ContentStatus"],["cp:keywords","Keywords"],["cp:lastModifiedBy","LastAuthor"],["cp:lastPrinted","LastPrinted"],["cp:revision","RevNumber"],["cp:version","Version"],["dc:creator","Author"],["dc:description","Comments"],["dc:identifier","Identifier"],["dc:language","Language"],["dc:subject","Subject"],["dc:title","Title"],["dcterms:created","CreatedDate","date"],["dcterms:modified","ModifiedDate","date"]];XMLNS.CORE_PROPS="http://schemas.openxmlformats.org/package/2006/metadata/core-properties";RELS.CORE_PROPS="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties";var CORE_PROPS_REGEX=function(){var r=new Array(CORE_PROPS.length);for(var i=0;i<CORE_PROPS.length;++i){var f=CORE_PROPS[i];var g="(?:"+f[0].substr(0,f[0].indexOf(":"))+":)"+f[0].substr(f[0].indexOf(":")+1);r[i]=new RegExp("<"+g+"[^>]*>(.*)</"+g+">")}return r}();function parse_core_props(data){var p={};for(var i=0;i<CORE_PROPS.length;++i){var f=CORE_PROPS[i],cur=data.match(CORE_PROPS_REGEX[i]);if(cur!=null&&cur.length>0)p[f[1]]=cur[1];if(f[2]==="date"&&p[f[1]])p[f[1]]=new Date(p[f[1]])}return p}var CORE_PROPS_XML_ROOT=writextag("cp:coreProperties",null,{"xmlns:cp":XMLNS.CORE_PROPS,"xmlns:dc":XMLNS.dc,"xmlns:dcterms":XMLNS.dcterms,"xmlns:dcmitype":XMLNS.dcmitype,"xmlns:xsi":XMLNS.xsi});function cp_doit(f,g,h,o,p){if(p[f]!=null||g==null||g==="")return;p[f]=g;o[o.length]=h?writextag(f,g,h):writetag(f,g)}function write_core_props(cp,opts){var o=[XML_HEADER,CORE_PROPS_XML_ROOT],p={};if(!cp)return o.join("");if(cp.CreatedDate!=null)cp_doit("dcterms:created",typeof cp.CreatedDate==="string"?cp.CreatedDate:write_w3cdtf(cp.CreatedDate,opts.WTF),{"xsi:type":"dcterms:W3CDTF"},o,p);if(cp.ModifiedDate!=null)cp_doit("dcterms:modified",typeof cp.ModifiedDate==="string"?cp.ModifiedDate:write_w3cdtf(cp.ModifiedDate,opts.WTF),{"xsi:type":"dcterms:W3CDTF"},o,p);for(var i=0;i!=CORE_PROPS.length;++i){var f=CORE_PROPS[i];cp_doit(f[0],cp[f[1]],null,o,p)}if(o.length>2){o[o.length]="</cp:coreProperties>";o[1]=o[1].replace("/>",">")}return o.join("")}var EXT_PROPS=[["Application","Application","string"],["AppVersion","AppVersion","string"],["Company","Company","string"],["DocSecurity","DocSecurity","string"],["Manager","Manager","string"],["HyperlinksChanged","HyperlinksChanged","bool"],["SharedDoc","SharedDoc","bool"],["LinksUpToDate","LinksUpToDate","bool"],["ScaleCrop","ScaleCrop","bool"],["HeadingPairs","HeadingPairs","raw"],["TitlesOfParts","TitlesOfParts","raw"]];XMLNS.EXT_PROPS="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties";RELS.EXT_PROPS="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties";function parse_ext_props(data,p){var q={};if(!p)p={};EXT_PROPS.forEach(function(f){switch(f[2]){case"string":p[f[1]]=(data.match(matchtag(f[0]))||[])[1];break;case"bool":p[f[1]]=(data.match(matchtag(f[0]))||[])[1]==="true";break;case"raw":var cur=data.match(new RegExp("<"+f[0]+"[^>]*>(.*)</"+f[0]+">"));if(cur&&cur.length>0)q[f[1]]=cur[1];break}});if(q.HeadingPairs&&q.TitlesOfParts){var v=parseVector(q.HeadingPairs);var j=0,widx=0;for(var i=0;i!==v.length;++i){switch(v[i].v){case"Worksheets":widx=j;p.Worksheets=+v[++i].v;break;case"Named Ranges":++i;break}}var parts=parseVector(q.TitlesOfParts).map(function(x){return utf8read(x.v)});p.SheetNames=parts.slice(widx,widx+p.Worksheets)}return p}var EXT_PROPS_XML_ROOT=writextag("Properties",null,{xmlns:XMLNS.EXT_PROPS,"xmlns:vt":XMLNS.vt});function write_ext_props(cp,opts){var o=[],p={},W=writextag;if(!cp)cp={};cp.Application="SheetJS";o[o.length]=XML_HEADER;o[o.length]=EXT_PROPS_XML_ROOT;EXT_PROPS.forEach(function(f){if(cp[f[1]]===undefined)return;var v;switch(f[2]){case"string":v=cp[f[1]];break;case"bool":v=cp[f[1]]?"true":"false";break}if(v!==undefined)o[o.length]=W(f[0],v)});o[o.length]=W("HeadingPairs",W("vt:vector",W("vt:variant","<vt:lpstr>Worksheets</vt:lpstr>")+W("vt:variant",W("vt:i4",String(cp.Worksheets))),{size:2,baseType:"variant"}));o[o.length]=W("TitlesOfParts",W("vt:vector",cp.SheetNames.map(function(s){return"<vt:lpstr>"+s+"</vt:lpstr>"}).join(""),{size:cp.Worksheets,baseType:"lpstr"}));if(o.length>2){o[o.length]="</Properties>";o[1]=o[1].replace("/>",">")}return o.join("")}XMLNS.CUST_PROPS="http://schemas.openxmlformats.org/officeDocument/2006/custom-properties";RELS.CUST_PROPS="http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties";var custregex=/<[^>]+>[^<]*/g;function parse_cust_props(data,opts){var p={},name;var m=data.match(custregex);if(m)for(var i=0;i!=m.length;++i){var x=m[i],y=parsexmltag(x);switch(y[0]){case"<?xml":break;case"<Properties":if(y.xmlns!==XMLNS.CUST_PROPS)throw"unrecognized xmlns "+y.xmlns;if(y.xmlnsvt&&y.xmlnsvt!==XMLNS.vt)throw"unrecognized vt "+y.xmlnsvt;break;case"<property":name=y.name;break;case"</property>":name=null;break;default:if(x.indexOf("<vt:")===0){var toks=x.split(">");var type=toks[0].substring(4),text=toks[1];switch(type){case"lpstr":case"lpwstr":case"bstr":case"lpwstr":p[name]=unescapexml(text);break;case"bool":p[name]=parsexmlbool(text,"<vt:bool>");break;case"i1":case"i2":case"i4":case"i8":case"int":case"uint":p[name]=parseInt(text,10);break;case"r4":case"r8":case"decimal":p[name]=parseFloat(text);break;case"filetime":case"date":p[name]=new Date(text);break;case"cy":case"error":p[name]=unescapexml(text);break;default:if(typeof console!=="undefined")console.warn("Unexpected",x,type,toks)}}else if(x.substr(0,2)==="</"){}else if(opts.WTF)throw new Error(x)}}return p}var CUST_PROPS_XML_ROOT=writextag("Properties",null,{xmlns:XMLNS.CUST_PROPS,"xmlns:vt":XMLNS.vt});function write_cust_props(cp,opts){var o=[XML_HEADER,CUST_PROPS_XML_ROOT];if(!cp)return o.join("");var pid=1;keys(cp).forEach(function custprop(k){++pid;o[o.length]=writextag("property",write_vt(cp[k]),{fmtid:"{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",pid:pid,name:k})});if(o.length>2){o[o.length]="</Properties>";o[1]=o[1].replace("/>",">")}return o.join("")}function xlml_set_prop(Props,tag,val){switch(tag){case"Description":tag="Comments";break}Props[tag]=val}function parse_FILETIME(blob){var dwLowDateTime=blob.read_shift(4),dwHighDateTime=blob.read_shift(4);return new Date((dwHighDateTime/1e7*Math.pow(2,32)+dwLowDateTime/1e7-11644473600)*1e3).toISOString().replace(/\.000/,"")}function parse_lpstr(blob,type,pad){var str=blob.read_shift(0,"lpstr");if(pad)blob.l+=4-(str.length+1&3)&3;return str}function parse_lpwstr(blob,type,pad){var str=blob.read_shift(0,"lpwstr");if(pad)blob.l+=4-(str.length+1&3)&3;return str}function parse_VtStringBase(blob,stringType,pad){if(stringType===31)return parse_lpwstr(blob);return parse_lpstr(blob,stringType,pad)}function parse_VtString(blob,t,pad){return parse_VtStringBase(blob,t,pad===false?0:4)}function parse_VtUnalignedString(blob,t){if(!t)throw new Error("dafuq?");return parse_VtStringBase(blob,t,0)}function parse_VtVecUnalignedLpstrValue(blob){var length=blob.read_shift(4);var ret=[];for(var i=0;i!=length;++i)ret[i]=blob.read_shift(0,"lpstr");return ret}function parse_VtVecUnalignedLpstr(blob){return parse_VtVecUnalignedLpstrValue(blob)}function parse_VtHeadingPair(blob){var headingString=parse_TypedPropertyValue(blob,VT_USTR);var headerParts=parse_TypedPropertyValue(blob,VT_I4);return[headingString,headerParts]}function parse_VtVecHeadingPairValue(blob){var cElements=blob.read_shift(4);var out=[];for(var i=0;i!=cElements/2;++i)out.push(parse_VtHeadingPair(blob));return out}function parse_VtVecHeadingPair(blob){return parse_VtVecHeadingPairValue(blob)}function parse_dictionary(blob,CodePage){var cnt=blob.read_shift(4);var dict={};for(var j=0;j!=cnt;++j){var pid=blob.read_shift(4);var len=blob.read_shift(4);dict[pid]=blob.read_shift(len,CodePage===1200?"utf16le":"utf8").replace(chr0,"").replace(chr1,"!")}if(blob.l&3)blob.l=blob.l>>2+1<<2;return dict}function parse_BLOB(blob){var size=blob.read_shift(4);var bytes=blob.slice(blob.l,blob.l+size);if(size&3>0)blob.l+=4-(size&3)&3;return bytes}function parse_ClipboardData(blob){var o={};o.Size=blob.read_shift(4);blob.l+=o.Size;return o}function parse_VtVector(blob,cb){}function parse_TypedPropertyValue(blob,type,_opts){var t=blob.read_shift(2),ret,opts=_opts||{};blob.l+=2;if(type!==VT_VARIANT)if(t!==type&&VT_CUSTOM.indexOf(type)===-1)throw new Error("Expected type "+type+" saw "+t);switch(type===VT_VARIANT?t:type){case 2:ret=blob.read_shift(2,"i");if(!opts.raw)blob.l+=2;return ret;case 3:ret=blob.read_shift(4,"i");return ret;case 11:return blob.read_shift(4)!==0;case 19:ret=blob.read_shift(4);return ret;case 30:return parse_lpstr(blob,t,4).replace(chr0,"");case 31:return parse_lpwstr(blob);case 64:return parse_FILETIME(blob);case 65:return parse_BLOB(blob);case 71:return parse_ClipboardData(blob);case 80:return parse_VtString(blob,t,!opts.raw&&4).replace(chr0,"");case 81:return parse_VtUnalignedString(blob,t,4).replace(chr0,"");case 4108:return parse_VtVecHeadingPair(blob);case 4126:return parse_VtVecUnalignedLpstr(blob);default:throw new Error("TypedPropertyValue unrecognized type "+type+" "+t)}}function parse_PropertySet(blob,PIDSI){var start_addr=blob.l;var size=blob.read_shift(4);var NumProps=blob.read_shift(4);var Props=[],i=0;var CodePage=0;var Dictionary=-1,DictObj;for(i=0;i!=NumProps;++i){var PropID=blob.read_shift(4);var Offset=blob.read_shift(4);Props[i]=[PropID,Offset+start_addr]}var PropH={};for(i=0;i!=NumProps;++i){if(blob.l!==Props[i][1]){var fail=true;if(i>0&&PIDSI)switch(PIDSI[Props[i-1][0]].t){case 2:if(blob.l+2===Props[i][1]){blob.l+=2;fail=false}break;case 80:if(blob.l<=Props[i][1]){blob.l=Props[i][1];fail=false}break;case 4108:if(blob.l<=Props[i][1]){blob.l=Props[i][1];fail=false}break}if(!PIDSI&&blob.l<=Props[i][1]){fail=false;blob.l=Props[i][1]}if(fail)throw new Error("Read Error: Expected address "+Props[i][1]+" at "+blob.l+" :"+i)}if(PIDSI){var piddsi=PIDSI[Props[i][0]];PropH[piddsi.n]=parse_TypedPropertyValue(blob,piddsi.t,{raw:true});if(piddsi.p==="version")PropH[piddsi.n]=String(PropH[piddsi.n]>>16)+"."+String(PropH[piddsi.n]&65535);if(piddsi.n=="CodePage")switch(PropH[piddsi.n]){case 0:PropH[piddsi.n]=1252;case 1e4:case 1252:case 874:case 1250:case 1251:case 1253:case 1254:case 1255:case 1256:case 1257:case 1258:case 932:case 936:case 949:case 950:case 1200:case 1201:case 65e3:case-536:case 65001:case-535:set_cp(CodePage=PropH[piddsi.n]);break;default:throw new Error("Unsupported CodePage: "+PropH[piddsi.n])}}else{if(Props[i][0]===1){CodePage=PropH.CodePage=parse_TypedPropertyValue(blob,VT_I2);set_cp(CodePage);if(Dictionary!==-1){var oldpos=blob.l;blob.l=Props[Dictionary][1];DictObj=parse_dictionary(blob,CodePage);blob.l=oldpos}}else if(Props[i][0]===0){if(CodePage===0){Dictionary=i;blob.l=Props[i+1][1];continue}DictObj=parse_dictionary(blob,CodePage)}else{var name=DictObj[Props[i][0]];var val;switch(blob[blob.l]){case 65:blob.l+=4;val=parse_BLOB(blob);break;case 30:blob.l+=4;val=parse_VtString(blob,blob[blob.l-4]);break;case 31:blob.l+=4;val=parse_VtString(blob,blob[blob.l-4]);break;case 3:blob.l+=4;val=blob.read_shift(4,"i");break;case 19:blob.l+=4;val=blob.read_shift(4);break;case 5:blob.l+=4;val=blob.read_shift(8,"f");break;case 11:blob.l+=4;val=parsebool(blob,4);break;case 64:blob.l+=4;val=new Date(parse_FILETIME(blob));break;default:throw new Error("unparsed value: "+blob[blob.l])}PropH[name]=val}}}blob.l=start_addr+size;return PropH}function parse_PropertySetStream(file,PIDSI){var blob=file.content;prep_blob(blob,0);var NumSets,FMTID0,FMTID1,Offset0,Offset1;blob.chk("feff","Byte Order: ");var vers=blob.read_shift(2);var SystemIdentifier=blob.read_shift(4);blob.chk(CFB.utils.consts.HEADER_CLSID,"CLSID: ");NumSets=blob.read_shift(4);if(NumSets!==1&&NumSets!==2)throw"Unrecognized #Sets: "+NumSets;FMTID0=blob.read_shift(16);Offset0=blob.read_shift(4);if(NumSets===1&&Offset0!==blob.l)throw"Length mismatch";else if(NumSets===2){FMTID1=blob.read_shift(16);Offset1=blob.read_shift(4)}var PSet0=parse_PropertySet(blob,PIDSI);var rval={SystemIdentifier:SystemIdentifier};for(var y in PSet0)rval[y]=PSet0[y];rval.FMTID=FMTID0;if(NumSets===1)return rval;if(blob.l!==Offset1)throw"Length mismatch 2: "+blob.l+" !== "+Offset1;var PSet1;try{PSet1=parse_PropertySet(blob,null)}catch(e){}for(y in PSet1)rval[y]=PSet1[y];rval.FMTID=[FMTID0,FMTID1];return rval}function parsenoop2(blob,length){blob.read_shift(length);return null}function parslurp(blob,length,cb){var arr=[],target=blob.l+length;while(blob.l<target)arr.push(cb(blob,target-blob.l));if(target!==blob.l)throw new Error("Slurp error");return arr}function parslurp2(blob,length,cb){var arr=[],target=blob.l+length,len=blob.read_shift(2);while(len--!==0)arr.push(cb(blob,target-blob.l));if(target!==blob.l)throw new Error("Slurp error");return arr}function parsebool(blob,length){return blob.read_shift(length)===1}function parseuint16(blob){return blob.read_shift(2,"u")}function parseuint16a(blob,length){return parslurp(blob,length,parseuint16)}var parse_Boolean=parsebool;function parse_Bes(blob){var v=blob.read_shift(1),t=blob.read_shift(1);return t===1?v:v===1
}function parse_ShortXLUnicodeString(blob,length,opts){var cch=blob.read_shift(1);var width=1,encoding="sbcs-cont";var cp=current_codepage;if(opts&&opts.biff>=8)current_codepage=1200;if(opts===undefined||opts.biff!==5){var fHighByte=blob.read_shift(1);if(fHighByte){width=2;encoding="dbcs-cont"}}var o=cch?blob.read_shift(cch,encoding):"";current_codepage=cp;return o}function parse_XLUnicodeRichExtendedString(blob){var cp=current_codepage;current_codepage=1200;var cch=blob.read_shift(2),flags=blob.read_shift(1);var fHighByte=flags&1,fExtSt=flags&4,fRichSt=flags&8;var width=1+(flags&1);var cRun,cbExtRst;var z={};if(fRichSt)cRun=blob.read_shift(2);if(fExtSt)cbExtRst=blob.read_shift(4);var encoding=flags&1?"dbcs-cont":"sbcs-cont";var msg=cch===0?"":blob.read_shift(cch,encoding);if(fRichSt)blob.l+=4*cRun;if(fExtSt)blob.l+=cbExtRst;z.t=msg;if(!fRichSt){z.raw="<t>"+z.t+"</t>";z.r=z.t}current_codepage=cp;return z}function parse_XLUnicodeStringNoCch(blob,cch,opts){var retval;var fHighByte=blob.read_shift(1);if(fHighByte===0){retval=blob.read_shift(cch,"sbcs-cont")}else{retval=blob.read_shift(cch,"dbcs-cont")}return retval}function parse_XLUnicodeString(blob,length,opts){var cch=blob.read_shift(opts!==undefined&&opts.biff>0&&opts.biff<8?1:2);if(cch===0){blob.l++;return""}return parse_XLUnicodeStringNoCch(blob,cch,opts)}function parse_XLUnicodeString2(blob,length,opts){if(opts.biff!==5&&opts.biff!==2)return parse_XLUnicodeString(blob,length,opts);var cch=blob.read_shift(1);if(cch===0){blob.l++;return""}return blob.read_shift(cch,"sbcs-cont")}var parse_ControlInfo=parsenoop;var parse_URLMoniker=function(blob,length){var len=blob.read_shift(4),start=blob.l;var extra=false;if(len>24){blob.l+=len-24;if(blob.read_shift(16)==="795881f43b1d7f48af2c825dc4852763")extra=true;blob.l=start}var url=blob.read_shift((extra?len-24:len)>>1,"utf16le").replace(chr0,"");if(extra)blob.l+=24;return url};var parse_FileMoniker=function(blob,length){var cAnti=blob.read_shift(2);var ansiLength=blob.read_shift(4);var ansiPath=blob.read_shift(ansiLength,"cstr");var endServer=blob.read_shift(2);var versionNumber=blob.read_shift(2);var cbUnicodePathSize=blob.read_shift(4);if(cbUnicodePathSize===0)return ansiPath.replace(/\\/g,"/");var cbUnicodePathBytes=blob.read_shift(4);var usKeyValue=blob.read_shift(2);var unicodePath=blob.read_shift(cbUnicodePathBytes>>1,"utf16le").replace(chr0,"");return unicodePath};var parse_HyperlinkMoniker=function(blob,length){var clsid=blob.read_shift(16);length-=16;switch(clsid){case"e0c9ea79f9bace118c8200aa004ba90b":return parse_URLMoniker(blob,length);case"0303000000000000c000000000000046":return parse_FileMoniker(blob,length);default:throw"unsupported moniker "+clsid}};var parse_HyperlinkString=function(blob,length){var len=blob.read_shift(4);var o=blob.read_shift(len,"utf16le").replace(chr0,"");return o};var parse_Hyperlink=function(blob,length){var end=blob.l+length;var sVer=blob.read_shift(4);if(sVer!==2)throw new Error("Unrecognized streamVersion: "+sVer);var flags=blob.read_shift(2);blob.l+=2;var displayName,targetFrameName,moniker,oleMoniker,location,guid,fileTime;if(flags&16)displayName=parse_HyperlinkString(blob,end-blob.l);if(flags&128)targetFrameName=parse_HyperlinkString(blob,end-blob.l);if((flags&257)===257)moniker=parse_HyperlinkString(blob,end-blob.l);if((flags&257)===1)oleMoniker=parse_HyperlinkMoniker(blob,end-blob.l);if(flags&8)location=parse_HyperlinkString(blob,end-blob.l);if(flags&32)guid=blob.read_shift(16);if(flags&64)fileTime=parse_FILETIME(blob,8);blob.l=end;var target=targetFrameName||moniker||oleMoniker;if(location)target+="#"+location;return{Target:target}};function parse_LongRGBA(blob,length){var r=blob.read_shift(1),g=blob.read_shift(1),b=blob.read_shift(1),a=blob.read_shift(1);return[r,g,b,a]}function parse_LongRGB(blob,length){var x=parse_LongRGBA(blob,length);x[3]=0;return x}function parse_XLSCell(blob,length){var rw=blob.read_shift(2);var col=blob.read_shift(2);var ixfe=blob.read_shift(2);return{r:rw,c:col,ixfe:ixfe}}function parse_frtHeader(blob){var rt=blob.read_shift(2);var flags=blob.read_shift(2);blob.l+=8;return{type:rt,flags:flags}}function parse_OptXLUnicodeString(blob,length,opts){return length===0?"":parse_XLUnicodeString2(blob,length,opts)}var HIDEOBJENUM=["SHOWALL","SHOWPLACEHOLDER","HIDEALL"];var parse_HideObjEnum=parseuint16;function parse_XTI(blob,length){var iSupBook=blob.read_shift(2),itabFirst=blob.read_shift(2,"i"),itabLast=blob.read_shift(2,"i");return[iSupBook,itabFirst,itabLast]}function parse_RkRec(blob,length){var ixfe=blob.read_shift(2);var RK=parse_RkNumber(blob);return[ixfe,RK]}function parse_AddinUdf(blob,length){blob.l+=4;length-=4;var l=blob.l+length;var udfName=parse_ShortXLUnicodeString(blob,length);var cb=blob.read_shift(2);l-=blob.l;if(cb!==l)throw"Malformed AddinUdf: padding = "+l+" != "+cb;blob.l+=cb;return udfName}function parse_Ref8U(blob,length){var rwFirst=blob.read_shift(2);var rwLast=blob.read_shift(2);var colFirst=blob.read_shift(2);var colLast=blob.read_shift(2);return{s:{c:colFirst,r:rwFirst},e:{c:colLast,r:rwLast}}}function parse_RefU(blob,length){var rwFirst=blob.read_shift(2);var rwLast=blob.read_shift(2);var colFirst=blob.read_shift(1);var colLast=blob.read_shift(1);return{s:{c:colFirst,r:rwFirst},e:{c:colLast,r:rwLast}}}var parse_Ref=parse_RefU;function parse_FtCmo(blob,length){blob.l+=4;var ot=blob.read_shift(2);var id=blob.read_shift(2);var flags=blob.read_shift(2);blob.l+=12;return[id,ot,flags]}function parse_FtNts(blob,length){var out={};blob.l+=4;blob.l+=16;out.fSharedNote=blob.read_shift(2);blob.l+=4;return out}function parse_FtCf(blob,length){var out={};blob.l+=4;blob.cf=blob.read_shift(2);return out}var FtTab={21:parse_FtCmo,19:parsenoop,18:function(blob,length){blob.l+=12},17:function(blob,length){blob.l+=8},16:parsenoop,15:parsenoop,13:parse_FtNts,12:function(blob,length){blob.l+=24},11:function(blob,length){blob.l+=10},10:function(blob,length){blob.l+=16},9:parsenoop,8:function(blob,length){blob.l+=6},7:parse_FtCf,6:function(blob,length){blob.l+=6},4:parsenoop,0:function(blob,length){blob.l+=4}};function parse_FtArray(blob,length,ot){var s=blob.l;var fts=[];while(blob.l<s+length){var ft=blob.read_shift(2);blob.l-=2;try{fts.push(FtTab[ft](blob,s+length-blob.l))}catch(e){blob.l=s+length;return fts}}if(blob.l!=s+length)blob.l=s+length;return fts}var parse_FontIndex=parseuint16;function parse_BOF(blob,length){var o={};o.BIFFVer=blob.read_shift(2);length-=2;switch(o.BIFFVer){case 1536:case 1280:case 2:case 7:break;default:throw"Unexpected BIFF Ver "+o.BIFFVer}blob.read_shift(length);return o}function parse_InterfaceHdr(blob,length){if(length===0)return 1200;var q;if((q=blob.read_shift(2))!==1200)throw"InterfaceHdr codePage "+q;return 1200}function parse_WriteAccess(blob,length,opts){if(opts.enc){blob.l+=length;return""}var l=blob.l;var UserName=parse_XLUnicodeString(blob,0,opts);blob.read_shift(length+l-blob.l);return UserName}function parse_BoundSheet8(blob,length,opts){var pos=blob.read_shift(4);var hidden=blob.read_shift(1)>>6;var dt=blob.read_shift(1);switch(dt){case 0:dt="Worksheet";break;case 1:dt="Macrosheet";break;case 2:dt="Chartsheet";break;case 6:dt="VBAModule";break}var name=parse_ShortXLUnicodeString(blob,0,opts);if(name.length===0)name="Sheet1";return{pos:pos,hs:hidden,dt:dt,name:name}}function parse_SST(blob,length){var cnt=blob.read_shift(4);var ucnt=blob.read_shift(4);var strs=[];for(var i=0;i!=ucnt;++i){strs.push(parse_XLUnicodeRichExtendedString(blob))}strs.Count=cnt;strs.Unique=ucnt;return strs}function parse_ExtSST(blob,length){var extsst={};extsst.dsst=blob.read_shift(2);blob.l+=length-2;return extsst}function parse_Row(blob,length){var rw=blob.read_shift(2),col=blob.read_shift(2),Col=blob.read_shift(2),rht=blob.read_shift(2);blob.read_shift(4);var flags=blob.read_shift(1);blob.read_shift(1);blob.read_shift(2);return{r:rw,c:col,cnt:Col-col}}function parse_ForceFullCalculation(blob,length){var header=parse_frtHeader(blob);if(header.type!=2211)throw"Invalid Future Record "+header.type;var fullcalc=blob.read_shift(4);return fullcalc!==0}var parse_CompressPictures=parsenoop2;function parse_RecalcId(blob,length){blob.read_shift(2);return blob.read_shift(4)}function parse_DefaultRowHeight(blob,length){var f=blob.read_shift(2),miyRw;miyRw=blob.read_shift(2);var fl={Unsynced:f&1,DyZero:(f&2)>>1,ExAsc:(f&4)>>2,ExDsc:(f&8)>>3};return[fl,miyRw]}function parse_Window1(blob,length){var xWn=blob.read_shift(2),yWn=blob.read_shift(2),dxWn=blob.read_shift(2),dyWn=blob.read_shift(2);var flags=blob.read_shift(2),iTabCur=blob.read_shift(2),iTabFirst=blob.read_shift(2);var ctabSel=blob.read_shift(2),wTabRatio=blob.read_shift(2);return{Pos:[xWn,yWn],Dim:[dxWn,dyWn],Flags:flags,CurTab:iTabCur,FirstTab:iTabFirst,Selected:ctabSel,TabRatio:wTabRatio}}function parse_Font(blob,length,opts){blob.l+=14;var name=parse_ShortXLUnicodeString(blob,0,opts);return name}function parse_LabelSst(blob,length){var cell=parse_XLSCell(blob);cell.isst=blob.read_shift(4);return cell}function parse_Label(blob,length,opts){var cell=parse_XLSCell(blob,6);var str=parse_XLUnicodeString(blob,length-6,opts);cell.val=str;return cell}function parse_Format(blob,length,opts){var ifmt=blob.read_shift(2);var fmtstr=parse_XLUnicodeString2(blob,0,opts);return[ifmt,fmtstr]}function parse_Dimensions(blob,length){var w=length===10?2:4;var r=blob.read_shift(w),R=blob.read_shift(w),c=blob.read_shift(2),C=blob.read_shift(2);blob.l+=2;return{s:{r:r,c:c},e:{r:R,c:C}}}function parse_RK(blob,length){var rw=blob.read_shift(2),col=blob.read_shift(2);var rkrec=parse_RkRec(blob);return{r:rw,c:col,ixfe:rkrec[0],rknum:rkrec[1]}}function parse_MulRk(blob,length){var target=blob.l+length-2;var rw=blob.read_shift(2),col=blob.read_shift(2);var rkrecs=[];while(blob.l<target)rkrecs.push(parse_RkRec(blob));if(blob.l!==target)throw"MulRK read error";var lastcol=blob.read_shift(2);if(rkrecs.length!=lastcol-col+1)throw"MulRK length mismatch";return{r:rw,c:col,C:lastcol,rkrec:rkrecs}}function parse_CellStyleXF(blob,length,style){var o={};var a=blob.read_shift(4),b=blob.read_shift(4);var c=blob.read_shift(4),d=blob.read_shift(2);o.patternType=XLSFillPattern[c>>26];o.icvFore=d&127;o.icvBack=d>>7&127;return o}function parse_CellXF(blob,length){return parse_CellStyleXF(blob,length,0)}function parse_StyleXF(blob,length){return parse_CellStyleXF(blob,length,1)}function parse_XF(blob,length){var o={};o.ifnt=blob.read_shift(2);o.ifmt=blob.read_shift(2);o.flags=blob.read_shift(2);o.fStyle=o.flags>>2&1;length-=6;o.data=parse_CellStyleXF(blob,length,o.fStyle);return o}function parse_Guts(blob,length){blob.l+=4;var out=[blob.read_shift(2),blob.read_shift(2)];if(out[0]!==0)out[0]--;if(out[1]!==0)out[1]--;if(out[0]>7||out[1]>7)throw"Bad Gutters: "+out;return out}function parse_BoolErr(blob,length){var cell=parse_XLSCell(blob,6);var val=parse_Bes(blob,2);cell.val=val;cell.t=val===true||val===false?"b":"e";return cell}function parse_Number(blob,length){var cell=parse_XLSCell(blob,6);var xnum=parse_Xnum(blob,8);cell.val=xnum;return cell}var parse_XLHeaderFooter=parse_OptXLUnicodeString;function parse_SupBook(blob,length,opts){var end=blob.l+length;var ctab=blob.read_shift(2);var cch=blob.read_shift(2);var virtPath;if(cch>=1&&cch<=255)virtPath=parse_XLUnicodeStringNoCch(blob,cch);var rgst=blob.read_shift(end-blob.l);opts.sbcch=cch;return[cch,ctab,virtPath,rgst]}function parse_ExternName(blob,length,opts){var flags=blob.read_shift(2);var body;var o={fBuiltIn:flags&1,fWantAdvise:flags>>>1&1,fWantPict:flags>>>2&1,fOle:flags>>>3&1,fOleLink:flags>>>4&1,cf:flags>>>5&1023,fIcon:flags>>>15&1};if(opts.sbcch===14849)body=parse_AddinUdf(blob,length-2);o.body=body||blob.read_shift(length-2);return o}function parse_Lbl(blob,length,opts){if(opts.biff<8)return parse_Label(blob,length,opts);var target=blob.l+length;var flags=blob.read_shift(2);var chKey=blob.read_shift(1);var cch=blob.read_shift(1);var cce=blob.read_shift(2);blob.l+=2;var itab=blob.read_shift(2);blob.l+=4;var name=parse_XLUnicodeStringNoCch(blob,cch,opts);var rgce=parse_NameParsedFormula(blob,target-blob.l,opts,cce);return{chKey:chKey,Name:name,rgce:rgce}}function parse_ExternSheet(blob,length,opts){if(opts.biff<8)return parse_ShortXLUnicodeString(blob,length,opts);var o=parslurp2(blob,length,parse_XTI);var oo=[];if(opts.sbcch===1025){for(var i=0;i!=o.length;++i)oo.push(opts.snames[o[i][1]]);return oo}else return o}function parse_ShrFmla(blob,length,opts){var ref=parse_RefU(blob,6);blob.l++;var cUse=blob.read_shift(1);length-=8;return[parse_SharedParsedFormula(blob,length,opts),cUse]}function parse_Array(blob,length,opts){var ref=parse_Ref(blob,6);blob.l+=6;length-=12;return[ref,parse_ArrayParsedFormula(blob,length,opts,ref)]}function parse_MTRSettings(blob,length){var fMTREnabled=blob.read_shift(4)!==0;var fUserSetThreadCount=blob.read_shift(4)!==0;var cUserThreadCount=blob.read_shift(4);return[fMTREnabled,fUserSetThreadCount,cUserThreadCount]}function parse_NoteSh(blob,length,opts){if(opts.biff<8)return;var row=blob.read_shift(2),col=blob.read_shift(2);var flags=blob.read_shift(2),idObj=blob.read_shift(2);var stAuthor=parse_XLUnicodeString2(blob,0,opts);if(opts.biff<8)blob.read_shift(1);return[{r:row,c:col},stAuthor,idObj,flags]}function parse_Note(blob,length,opts){return parse_NoteSh(blob,length,opts)}function parse_MergeCells(blob,length){var merges=[];var cmcs=blob.read_shift(2);while(cmcs--)merges.push(parse_Ref8U(blob,length));return merges}function parse_Obj(blob,length){var cmo=parse_FtCmo(blob,22);var fts=parse_FtArray(blob,length-22,cmo[1]);return{cmo:cmo,ft:fts}}function parse_TxO(blob,length,opts){var s=blob.l;try{blob.l+=4;var ot=(opts.lastobj||{cmo:[0,0]}).cmo[1];var controlInfo;if([0,5,7,11,12,14].indexOf(ot)==-1)blob.l+=6;else controlInfo=parse_ControlInfo(blob,6,opts);var cchText=blob.read_shift(2);var cbRuns=blob.read_shift(2);var ifntEmpty=parse_FontIndex(blob,2);var len=blob.read_shift(2);blob.l+=len;var texts="";for(var i=1;i<blob.lens.length-1;++i){if(blob.l-s!=blob.lens[i])throw"TxO: bad continue record";var hdr=blob[blob.l];var t=parse_XLUnicodeStringNoCch(blob,blob.lens[i+1]-blob.lens[i]-1);texts+=t;if(texts.length>=(hdr?cchText:2*cchText))break}if(texts.length!==cchText&&texts.length!==cchText*2){throw"cchText: "+cchText+" != "+texts.length}blob.l=s+length;return{t:texts}}catch(e){blob.l=s+length;return{t:texts||""}}}var parse_HLink=function(blob,length){var ref=parse_Ref8U(blob,8);blob.l+=16;var hlink=parse_Hyperlink(blob,length-24);return[ref,hlink]};var parse_HLinkTooltip=function(blob,length){var end=blob.l+length;blob.read_shift(2);var ref=parse_Ref8U(blob,8);var wzTooltip=blob.read_shift((length-10)/2,"dbcs-cont");wzTooltip=wzTooltip.replace(chr0,"");return[ref,wzTooltip]};function parse_Country(blob,length){var o=[],d;d=blob.read_shift(2);o[0]=CountryEnum[d]||d;d=blob.read_shift(2);o[1]=CountryEnum[d]||d;return o}function parse_ClrtClient(blob,length){var ccv=blob.read_shift(2);var o=[];while(ccv-->0)o.push(parse_LongRGB(blob,8));return o}function parse_Palette(blob,length){var ccv=blob.read_shift(2);var o=[];while(ccv-->0)o.push(parse_LongRGB(blob,8));return o}function parse_XFCRC(blob,length){blob.l+=2;var o={cxfs:0,crc:0};o.cxfs=blob.read_shift(2);o.crc=blob.read_shift(4);return o}var parse_Style=parsenoop;var parse_StyleExt=parsenoop;var parse_ColInfo=parsenoop;var parse_Window2=parsenoop;var parse_Backup=parsebool;var parse_Blank=parse_XLSCell;var parse_BottomMargin=parse_Xnum;var parse_BuiltInFnGroupCount=parseuint16;var parse_CalcCount=parseuint16;var parse_CalcDelta=parse_Xnum;var parse_CalcIter=parsebool;var parse_CalcMode=parseuint16;var parse_CalcPrecision=parsebool;var parse_CalcRefMode=parsenoop2;var parse_CalcSaveRecalc=parsebool;var parse_CodePage=parseuint16;var parse_Compat12=parsebool;var parse_Date1904=parsebool;var parse_DefColWidth=parseuint16;var parse_DSF=parsenoop2;var parse_EntExU2=parsenoop2;var parse_EOF=parsenoop2;var parse_Excel9File=parsenoop2;var parse_FeatHdr=parsenoop2;var parse_FontX=parseuint16;var parse_Footer=parse_XLHeaderFooter;var parse_GridSet=parseuint16;var parse_HCenter=parsebool;var parse_Header=parse_XLHeaderFooter;var parse_HideObj=parse_HideObjEnum;var parse_InterfaceEnd=parsenoop2;var parse_LeftMargin=parse_Xnum;var parse_Mms=parsenoop2;var parse_ObjProtect=parsebool;var parse_Password=parseuint16;var parse_PrintGrid=parsebool;var parse_PrintRowCol=parsebool;var parse_PrintSize=parseuint16;var parse_Prot4Rev=parsebool;var parse_Prot4RevPass=parseuint16;var parse_Protect=parsebool;var parse_RefreshAll=parsebool;var parse_RightMargin=parse_Xnum;var parse_RRTabId=parseuint16a;var parse_ScenarioProtect=parsebool;var parse_Scl=parseuint16a;var parse_String=parse_XLUnicodeString;var parse_SxBool=parsebool;var parse_TopMargin=parse_Xnum;var parse_UsesELFs=parsebool;var parse_VCenter=parsebool;var parse_WinProtect=parsebool;var parse_WriteProtect=parsenoop;var parse_VerticalPageBreaks=parsenoop;var parse_HorizontalPageBreaks=parsenoop;var parse_Selection=parsenoop;var parse_Continue=parsenoop;var parse_Pane=parsenoop;var parse_Pls=parsenoop;var parse_DCon=parsenoop;var parse_DConRef=parsenoop;var parse_DConName=parsenoop;var parse_XCT=parsenoop;var parse_CRN=parsenoop;var parse_FileSharing=parsenoop;var parse_Uncalced=parsenoop;var parse_Template=parsenoop;var parse_Intl=parsenoop;var parse_WsBool=parsenoop;var parse_Sort=parsenoop;var parse_Sync=parsenoop;var parse_LPr=parsenoop;var parse_DxGCol=parsenoop;var parse_FnGroupName=parsenoop;var parse_FilterMode=parsenoop;var parse_AutoFilterInfo=parsenoop;var parse_AutoFilter=parsenoop;var parse_Setup=parsenoop;var parse_ScenMan=parsenoop;var parse_SCENARIO=parsenoop;var parse_SxView=parsenoop;var parse_Sxvd=parsenoop;var parse_SXVI=parsenoop;var parse_SxIvd=parsenoop;var parse_SXLI=parsenoop;var parse_SXPI=parsenoop;var parse_DocRoute=parsenoop;var parse_RecipName=parsenoop;var parse_MulBlank=parsenoop;var parse_SXDI=parsenoop;var parse_SXDB=parsenoop;var parse_SXFDB=parsenoop;var parse_SXDBB=parsenoop;var parse_SXNum=parsenoop;var parse_SxErr=parsenoop;var parse_SXInt=parsenoop;var parse_SXString=parsenoop;var parse_SXDtr=parsenoop;var parse_SxNil=parsenoop;var parse_SXTbl=parsenoop;var parse_SXTBRGIITM=parsenoop;var parse_SxTbpg=parsenoop;var parse_ObProj=parsenoop;var parse_SXStreamID=parsenoop;var parse_DBCell=parsenoop;var parse_SXRng=parsenoop;var parse_SxIsxoper=parsenoop;var parse_BookBool=parsenoop;var parse_DbOrParamQry=parsenoop;var parse_OleObjectSize=parsenoop;var parse_SXVS=parsenoop;var parse_BkHim=parsenoop;var parse_MsoDrawingGroup=parsenoop;var parse_MsoDrawing=parsenoop;var parse_MsoDrawingSelection=parsenoop;var parse_PhoneticInfo=parsenoop;var parse_SxRule=parsenoop;var parse_SXEx=parsenoop;var parse_SxFilt=parsenoop;var parse_SxDXF=parsenoop;var parse_SxItm=parsenoop;var parse_SxName=parsenoop;var parse_SxSelect=parsenoop;var parse_SXPair=parsenoop;var parse_SxFmla=parsenoop;var parse_SxFormat=parsenoop;var parse_SXVDEx=parsenoop;var parse_SXFormula=parsenoop;var parse_SXDBEx=parsenoop;var parse_RRDInsDel=parsenoop;var parse_RRDHead=parsenoop;var parse_RRDChgCell=parsenoop;var parse_RRDRenSheet=parsenoop;var parse_RRSort=parsenoop;var parse_RRDMove=parsenoop;var parse_RRFormat=parsenoop;var parse_RRAutoFmt=parsenoop;var parse_RRInsertSh=parsenoop;var parse_RRDMoveBegin=parsenoop;var parse_RRDMoveEnd=parsenoop;var parse_RRDInsDelBegin=parsenoop;var parse_RRDInsDelEnd=parsenoop;var parse_RRDConflict=parsenoop;var parse_RRDDefName=parsenoop;var parse_RRDRstEtxp=parsenoop;var parse_LRng=parsenoop;var parse_CUsr=parsenoop;var parse_CbUsr=parsenoop;var parse_UsrInfo=parsenoop;var parse_UsrExcl=parsenoop;var parse_FileLock=parsenoop;var parse_RRDInfo=parsenoop;var parse_BCUsrs=parsenoop;var parse_UsrChk=parsenoop;var parse_UserBView=parsenoop;var parse_UserSViewBegin=parsenoop;var parse_UserSViewEnd=parsenoop;var parse_RRDUserView=parsenoop;var parse_Qsi=parsenoop;var parse_CondFmt=parsenoop;var parse_CF=parsenoop;var parse_DVal=parsenoop;var parse_DConBin=parsenoop;var parse_Lel=parsenoop;var parse_XLSCodeName=parse_XLUnicodeString;var parse_SXFDBType=parsenoop;var parse_ObNoMacros=parsenoop;var parse_Dv=parsenoop;var parse_Index=parsenoop;var parse_Table=parsenoop;var parse_BigName=parsenoop;var parse_ContinueBigName=parsenoop;var parse_WebPub=parsenoop;var parse_QsiSXTag=parsenoop;var parse_DBQueryExt=parsenoop;var parse_ExtString=parsenoop;var parse_TxtQry=parsenoop;var parse_Qsir=parsenoop;var parse_Qsif=parsenoop;var parse_RRDTQSIF=parsenoop;var parse_OleDbConn=parsenoop;var parse_WOpt=parsenoop;var parse_SXViewEx=parsenoop;var parse_SXTH=parsenoop;var parse_SXPIEx=parsenoop;var parse_SXVDTEx=parsenoop;var parse_SXViewEx9=parsenoop;var parse_ContinueFrt=parsenoop;var parse_RealTimeData=parsenoop;var parse_ChartFrtInfo=parsenoop;var parse_FrtWrapper=parsenoop;var parse_StartBlock=parsenoop;var parse_EndBlock=parsenoop;var parse_StartObject=parsenoop;var parse_EndObject=parsenoop;var parse_CatLab=parsenoop;var parse_YMult=parsenoop;var parse_SXViewLink=parsenoop;var parse_PivotChartBits=parsenoop;var parse_FrtFontList=parsenoop;var parse_SheetExt=parsenoop;var parse_BookExt=parsenoop;var parse_SXAddl=parsenoop;var parse_CrErr=parsenoop;var parse_HFPicture=parsenoop;var parse_Feat=parsenoop;var parse_DataLabExt=parsenoop;var parse_DataLabExtContents=parsenoop;var parse_CellWatch=parsenoop;var parse_FeatHdr11=parsenoop;var parse_Feature11=parsenoop;var parse_DropDownObjIds=parsenoop;var parse_ContinueFrt11=parsenoop;var parse_DConn=parsenoop;var parse_List12=parsenoop;var parse_Feature12=parsenoop;var parse_CondFmt12=parsenoop;var parse_CF12=parsenoop;var parse_CFEx=parsenoop;var parse_AutoFilter12=parsenoop;var parse_ContinueFrt12=parsenoop;var parse_MDTInfo=parsenoop;var parse_MDXStr=parsenoop;var parse_MDXTuple=parsenoop;var parse_MDXSet=parsenoop;var parse_MDXProp=parsenoop;var parse_MDXKPI=parsenoop;var parse_MDB=parsenoop;var parse_PLV=parsenoop;var parse_DXF=parsenoop;var parse_TableStyles=parsenoop;var parse_TableStyle=parsenoop;var parse_TableStyleElement=parsenoop;var parse_NamePublish=parsenoop;var parse_NameCmt=parsenoop;var parse_SortData=parsenoop;var parse_GUIDTypeLib=parsenoop;var parse_FnGrp12=parsenoop;var parse_NameFnGrp12=parsenoop;var parse_HeaderFooter=parsenoop;var parse_CrtLayout12=parsenoop;var parse_CrtMlFrt=parsenoop;var parse_CrtMlFrtContinue=parsenoop;var parse_ShapePropsStream=parsenoop;var parse_TextPropsStream=parsenoop;var parse_RichTextStream=parsenoop;var parse_CrtLayout12A=parsenoop;var parse_Units=parsenoop;var parse_Chart=parsenoop;var parse_Series=parsenoop;var parse_DataFormat=parsenoop;var parse_LineFormat=parsenoop;var parse_MarkerFormat=parsenoop;var parse_AreaFormat=parsenoop;var parse_PieFormat=parsenoop;var parse_AttachedLabel=parsenoop;var parse_SeriesText=parsenoop;var parse_ChartFormat=parsenoop;var parse_Legend=parsenoop;var parse_SeriesList=parsenoop;var parse_Bar=parsenoop;var parse_Line=parsenoop;var parse_Pie=parsenoop;var parse_Area=parsenoop;var parse_Scatter=parsenoop;var parse_CrtLine=parsenoop;var parse_Axis=parsenoop;var parse_Tick=parsenoop;var parse_ValueRange=parsenoop;var parse_CatSerRange=parsenoop;var parse_AxisLine=parsenoop;var parse_CrtLink=parsenoop;var parse_DefaultText=parsenoop;var parse_Text=parsenoop;var parse_ObjectLink=parsenoop;var parse_Frame=parsenoop;var parse_Begin=parsenoop;var parse_End=parsenoop;var parse_PlotArea=parsenoop;var parse_Chart3d=parsenoop;var parse_PicF=parsenoop;var parse_DropBar=parsenoop;var parse_Radar=parsenoop;var parse_Surf=parsenoop;var parse_RadarArea=parsenoop;var parse_AxisParent=parsenoop;var parse_LegendException=parsenoop;var parse_ShtProps=parsenoop;var parse_SerToCrt=parsenoop;var parse_AxesUsed=parsenoop;var parse_SBaseRef=parsenoop;var parse_SerParent=parsenoop;var parse_SerAuxTrend=parsenoop;var parse_IFmtRecord=parsenoop;var parse_Pos=parsenoop;var parse_AlRuns=parsenoop;var parse_BRAI=parsenoop;var parse_SerAuxErrBar=parsenoop;var parse_SerFmt=parsenoop;var parse_Chart3DBarShape=parsenoop;var parse_Fbi=parsenoop;var parse_BopPop=parsenoop;var parse_AxcExt=parsenoop;var parse_Dat=parsenoop;var parse_PlotGrowth=parsenoop;var parse_SIIndex=parsenoop;var parse_GelFrame=parsenoop;var parse_BopPopCustom=parsenoop;var parse_Fbi2=parsenoop;function parse_BIFF5String(blob){var len=blob.read_shift(1);return blob.read_shift(len,"sbcs-cont")}function parse_BIFF2STR(blob,length,opts){var cell=parse_XLSCell(blob,6);++blob.l;var str=parse_XLUnicodeString2(blob,length-7,opts);cell.val=str;return cell}function parse_BIFF2NUM(blob,length,opts){var cell=parse_XLSCell(blob,6);++blob.l;var num=parse_Xnum(blob,8);cell.val=num;return cell}var CS2CP={0:1252,1:65001,2:65001,77:1e4,128:932,129:949,130:1361,134:936,136:950,161:1253,162:1254,163:1258,177:1255,178:1256,186:1257,204:1251,222:874,238:1250,255:1252,69:6969};var parse_rs=function parse_rs_factory(){var tregex=matchtag("t"),rpregex=matchtag("rPr"),rregex=/<r>/g,rend=/<\/r>/,nlregex=/\r\n/g;var parse_rpr=function parse_rpr(rpr,intro,outro){var font={},cp=65001;var m=rpr.match(tagregex),i=0;if(m)for(;i!=m.length;++i){var y=parsexmltag(m[i]);switch(y[0]){case"<condense":break;case"<extend":break;case"<shadow":case"<shadow/>":break;case"<charset":if(y.val=="1")break;cp=CS2CP[parseInt(y.val,10)];break;case"<outline":case"<outline/>":break;case"<rFont":font.name=y.val;break;case"<sz":font.sz=y.val;break;case"<strike":if(!y.val)break;case"<strike/>":font.strike=1;break;case"</strike>":break;case"<u":if(!y.val)break;case"<u/>":font.u=1;break;case"</u>":break;case"<b":if(!y.val)break;case"<b/>":font.b=1;break;case"</b>":break;case"<i":if(!y.val)break;case"<i/>":font.i=1;break;case"</i>":break;case"<color":if(y.rgb)font.color=y.rgb.substr(2,6);break;case"<family":font.family=y.val;break;case"<vertAlign":break;case"<scheme":break;default:if(y[0].charCodeAt(1)!==47)throw"Unrecognized rich format "+y[0]}}var style=[];if(font.b)style.push("font-weight: bold;");if(font.i)style.push("font-style: italic;");intro.push('<span style="'+style.join("")+'">');outro.push("</span>");return cp};function parse_r(r){var terms=[[],"",[]];var t=r.match(tregex),cp=65001;if(!isval(t))return"";terms[1]=t[1];var rpr=r.match(rpregex);if(isval(rpr))cp=parse_rpr(rpr[1],terms[0],terms[2]);return terms[0].join("")+terms[1].replace(nlregex,"<br/>")+terms[2].join("")}return function parse_rs(rs){return rs.replace(rregex,"").split(rend).map(parse_r).join("")}}();var sitregex=/<t[^>]*>([^<]*)<\/t>/g,sirregex=/<r>/;function parse_si(x,opts){var html=opts?opts.cellHTML:true;var z={};if(!x)return null;var y;if(x.charCodeAt(1)===116){z.t=utf8read(unescapexml(x.substr(x.indexOf(">")+1).split(/<\/t>/)[0]));z.r=x;if(html)z.h=z.t}else if(y=x.match(sirregex)){z.r=x;z.t=utf8read(unescapexml(x.match(sitregex).join("").replace(tagregex,"")));if(html)z.h=parse_rs(x)}return z}var sstr0=/<sst([^>]*)>([\s\S]*)<\/sst>/;var sstr1=/<(?:si|sstItem)>/g;var sstr2=/<\/(?:si|sstItem)>/;function parse_sst_xml(data,opts){var s=[],ss;var sst=data.match(sstr0);if(isval(sst)){ss=sst[2].replace(sstr1,"").split(sstr2);for(var i=0;i!=ss.length;++i){var o=parse_si(ss[i],opts);if(o!=null)s[s.length]=o}sst=parsexmltag(sst[1]);s.Count=sst.count;s.Unique=sst.uniqueCount}return s}RELS.SST="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings";var straywsregex=/^\s|\s$|[\t\n\r]/;function write_sst_xml(sst,opts){if(!opts.bookSST)return"";var o=[XML_HEADER];o[o.length]=writextag("sst",null,{xmlns:XMLNS.main[0],count:sst.Count,uniqueCount:sst.Unique});for(var i=0;i!=sst.length;++i){if(sst[i]==null)continue;var s=sst[i];var sitag="<si>";if(s.r)sitag+=s.r;else{sitag+="<t";if(s.t.match(straywsregex))sitag+=' xml:space="preserve"';sitag+=">"+escapexml(s.t)+"</t>"}sitag+="</si>";o[o.length]=sitag}if(o.length>2){o[o.length]="</sst>";o[1]=o[1].replace("/>",">")}return o.join("")}function parse_BrtBeginSst(data,length){return[data.read_shift(4),data.read_shift(4)]}function parse_sst_bin(data,opts){var s=[];var pass=false;recordhopper(data,function hopper_sst(val,R,RT){switch(R.n){case"BrtBeginSst":s.Count=val[0];s.Unique=val[1];break;case"BrtSSTItem":s.push(val);break;case"BrtEndSst":return true;case"BrtFRTBegin":pass=true;break;case"BrtFRTEnd":pass=false;break;default:if(!pass||opts.WTF)throw new Error("Unexpected record "+RT+" "+R.n)}});return s}function write_BrtBeginSst(sst,o){if(!o)o=new_buf(8);o.write_shift(4,sst.Count);o.write_shift(4,sst.Unique);return o}var write_BrtSSTItem=write_RichStr;function write_sst_bin(sst,opts){var ba=buf_array();write_record(ba,"BrtBeginSst",write_BrtBeginSst(sst));for(var i=0;i<sst.length;++i)write_record(ba,"BrtSSTItem",write_BrtSSTItem(sst[i]));write_record(ba,"BrtEndSst");return ba.end()}function _JS2ANSI(str){if(typeof cptable!=="undefined")return cptable.utils.encode(1252,str);return str.split("").map(function(x){return x.charCodeAt(0)})}function parse_Version(blob,length){var o={};o.Major=blob.read_shift(2);o.Minor=blob.read_shift(2);return o}function parse_EncryptionHeader(blob,length){var o={};o.Flags=blob.read_shift(4);var tmp=blob.read_shift(4);if(tmp!==0)throw"Unrecognized SizeExtra: "+tmp;o.AlgID=blob.read_shift(4);switch(o.AlgID){case 0:case 26625:case 26126:case 26127:case 26128:break;default:throw"Unrecognized encryption algorithm: "+o.AlgID}parsenoop(blob,length-12);return o}function parse_EncryptionVerifier(blob,length){return parsenoop(blob,length)}function parse_RC4CryptoHeader(blob,length){var o={};var vers=o.EncryptionVersionInfo=parse_Version(blob,4);length-=4;if(vers.Minor!=2)throw"unrecognized minor version code: "+vers.Minor;if(vers.Major>4||vers.Major<2)throw"unrecognized major version code: "+vers.Major;o.Flags=blob.read_shift(4);length-=4;var sz=blob.read_shift(4);length-=4;o.EncryptionHeader=parse_EncryptionHeader(blob,sz);length-=sz;o.EncryptionVerifier=parse_EncryptionVerifier(blob,length);return o}function parse_RC4Header(blob,length){var o={};var vers=o.EncryptionVersionInfo=parse_Version(blob,4);length-=4;if(vers.Major!=1||vers.Minor!=1)throw"unrecognized version code "+vers.Major+" : "+vers.Minor;o.Salt=blob.read_shift(16);o.EncryptedVerifier=blob.read_shift(16);o.EncryptedVerifierHash=blob.read_shift(16);return o}function crypto_CreatePasswordVerifier_Method1(Password){var Verifier=0,PasswordArray;var PasswordDecoded=_JS2ANSI(Password);var len=PasswordDecoded.length+1,i,PasswordByte;var Intermediate1,Intermediate2,Intermediate3;PasswordArray=new_raw_buf(len);PasswordArray[0]=PasswordDecoded.length;for(i=1;i!=len;++i)PasswordArray[i]=PasswordDecoded[i-1];for(i=len-1;i>=0;--i){PasswordByte=PasswordArray[i];Intermediate1=(Verifier&16384)===0?0:1;Intermediate2=Verifier<<1&32767;Intermediate3=Intermediate1|Intermediate2;Verifier=Intermediate3^PasswordByte}return Verifier^52811}var crypto_CreateXorArray_Method1=function(){var PadArray=[187,255,255,186,255,255,185,128,0,190,15,0,191,15,0];var InitialCode=[57840,7439,52380,33984,4364,3600,61902,12606,6258,57657,54287,34041,10252,43370,20163];var XorMatrix=[44796,19929,39858,10053,20106,40212,10761,31585,63170,64933,60267,50935,40399,11199,17763,35526,1453,2906,5812,11624,23248,885,1770,3540,7080,14160,28320,56640,55369,41139,20807,41614,21821,43642,17621,28485,56970,44341,19019,38038,14605,29210,60195,50791,40175,10751,21502,43004,24537,18387,36774,3949,7898,15796,31592,63184,47201,24803,49606,37805,14203,28406,56812,17824,35648,1697,3394,6788,13576,27152,43601,17539,35078,557,1114,2228,4456,30388,60776,51953,34243,7079,14158,28316,14128,28256,56512,43425,17251,34502,7597,13105,26210,52420,35241,883,1766,3532,4129,8258,16516,33032,4657,9314,18628];var Ror=function(Byte){return(Byte/2|Byte*128)&255};var XorRor=function(byte1,byte2){return Ror(byte1^byte2)};var CreateXorKey_Method1=function(Password){var XorKey=InitialCode[Password.length-1];var CurrentElement=104;for(var i=Password.length-1;i>=0;--i){var Char=Password[i];for(var j=0;j!=7;++j){if(Char&64)XorKey^=XorMatrix[CurrentElement];Char*=2;
--CurrentElement}}return XorKey};return function(password){var Password=_JS2ANSI(password);var XorKey=CreateXorKey_Method1(Password);var Index=Password.length;var ObfuscationArray=new_raw_buf(16);for(var i=0;i!=16;++i)ObfuscationArray[i]=0;var Temp,PasswordLastChar,PadIndex;if((Index&1)===1){Temp=XorKey>>8;ObfuscationArray[Index]=XorRor(PadArray[0],Temp);--Index;Temp=XorKey&255;PasswordLastChar=Password[Password.length-1];ObfuscationArray[Index]=XorRor(PasswordLastChar,Temp)}while(Index>0){--Index;Temp=XorKey>>8;ObfuscationArray[Index]=XorRor(Password[Index],Temp);--Index;Temp=XorKey&255;ObfuscationArray[Index]=XorRor(Password[Index],Temp)}Index=15;PadIndex=15-Password.length;while(PadIndex>0){Temp=XorKey>>8;ObfuscationArray[Index]=XorRor(PadArray[PadIndex],Temp);--Index;--PadIndex;Temp=XorKey&255;ObfuscationArray[Index]=XorRor(Password[Index],Temp);--Index;--PadIndex}return ObfuscationArray}}();var crypto_DecryptData_Method1=function(password,Data,XorArrayIndex,XorArray,O){if(!O)O=Data;if(!XorArray)XorArray=crypto_CreateXorArray_Method1(password);var Index,Value;for(Index=0;Index!=Data.length;++Index){Value=Data[Index];Value^=XorArray[XorArrayIndex];Value=(Value>>5|Value<<3)&255;O[Index]=Value;++XorArrayIndex}return[O,XorArrayIndex,XorArray]};var crypto_MakeXorDecryptor=function(password){var XorArrayIndex=0,XorArray=crypto_CreateXorArray_Method1(password);return function(Data){var O=crypto_DecryptData_Method1(null,Data,XorArrayIndex,XorArray);XorArrayIndex=O[1];return O[0]}};function parse_XORObfuscation(blob,length,opts,out){var o={key:parseuint16(blob),verificationBytes:parseuint16(blob)};if(opts.password)o.verifier=crypto_CreatePasswordVerifier_Method1(opts.password);out.valid=o.verificationBytes===o.verifier;if(out.valid)out.insitu_decrypt=crypto_MakeXorDecryptor(opts.password);return o}function parse_FilePassHeader(blob,length,oo){var o=oo||{};o.Info=blob.read_shift(2);blob.l-=2;if(o.Info===1)o.Data=parse_RC4Header(blob,length);else o.Data=parse_RC4CryptoHeader(blob,length);return o}function parse_FilePass(blob,length,opts){var o={Type:blob.read_shift(2)};if(o.Type)parse_FilePassHeader(blob,length-2,o);else parse_XORObfuscation(blob,length-2,opts,o);return o}function hex2RGB(h){var o=h.substr(h[0]==="#"?1:0,6);return[parseInt(o.substr(0,2),16),parseInt(o.substr(0,2),16),parseInt(o.substr(0,2),16)]}function rgb2Hex(rgb){for(var i=0,o=1;i!=3;++i)o=o*256+(rgb[i]>255?255:rgb[i]<0?0:rgb[i]);return o.toString(16).toUpperCase().substr(1)}function rgb2HSL(rgb){var R=rgb[0]/255,G=rgb[1]/255,B=rgb[2]/255;var M=Math.max(R,G,B),m=Math.min(R,G,B),C=M-m;if(C===0)return[0,0,R];var H6=0,S=0,L2=M+m;S=C/(L2>1?2-L2:L2);switch(M){case R:H6=((G-B)/C+6)%6;break;case G:H6=(B-R)/C+2;break;case B:H6=(R-G)/C+4;break}return[H6/6,S,L2/2]}function hsl2RGB(hsl){var H=hsl[0],S=hsl[1],L=hsl[2];var C=S*2*(L<.5?L:1-L),m=L-C/2;var rgb=[m,m,m],h6=6*H;var X;if(S!==0)switch(h6|0){case 0:case 6:X=C*h6;rgb[0]+=C;rgb[1]+=X;break;case 1:X=C*(2-h6);rgb[0]+=X;rgb[1]+=C;break;case 2:X=C*(h6-2);rgb[1]+=C;rgb[2]+=X;break;case 3:X=C*(4-h6);rgb[1]+=X;rgb[2]+=C;break;case 4:X=C*(h6-4);rgb[2]+=C;rgb[0]+=X;break;case 5:X=C*(6-h6);rgb[2]+=X;rgb[0]+=C;break}for(var i=0;i!=3;++i)rgb[i]=Math.round(rgb[i]*255);return rgb}function rgb_tint(hex,tint){if(tint===0)return hex;var hsl=rgb2HSL(hex2RGB(hex));if(tint<0)hsl[2]=hsl[2]*(1+tint);else hsl[2]=1-(1-hsl[2])*(1-tint);return rgb2Hex(hsl2RGB(hsl))}var DEF_MDW=7,MAX_MDW=15,MIN_MDW=1,MDW=DEF_MDW;function width2px(width){return(width+(128/MDW|0)/256)*MDW|0}function px2char(px){return((px-5)/MDW*100+.5|0)/100}function char2width(chr){return((chr*MDW+5)/MDW*256|0)/256}function cycle_width(collw){return char2width(px2char(width2px(collw)))}function find_mdw(collw,coll){if(cycle_width(collw)!=collw){for(MDW=DEF_MDW;MDW>MIN_MDW;--MDW)if(cycle_width(collw)===collw)break;if(MDW===MIN_MDW)for(MDW=DEF_MDW+1;MDW<MAX_MDW;++MDW)if(cycle_width(collw)===collw)break;if(MDW===MAX_MDW)MDW=DEF_MDW}}var XLMLPatternTypeMap={None:"none",Solid:"solid",Gray50:"mediumGray",Gray75:"darkGray",Gray25:"lightGray",HorzStripe:"darkHorizontal",VertStripe:"darkVertical",ReverseDiagStripe:"darkDown",DiagStripe:"darkUp",DiagCross:"darkGrid",ThickDiagCross:"darkTrellis",ThinHorzStripe:"lightHorizontal",ThinVertStripe:"lightVertical",ThinReverseDiagStripe:"lightDown",ThinHorzCross:"lightGrid"};var styles={};var themes={};function parse_fills(t,opts){styles.Fills=[];var fill={};t[0].match(tagregex).forEach(function(x){var y=parsexmltag(x);switch(y[0]){case"<fills":case"<fills>":case"</fills>":break;case"<fill>":break;case"</fill>":styles.Fills.push(fill);fill={};break;case"<patternFill":if(y.patternType)fill.patternType=y.patternType;break;case"<patternFill/>":case"</patternFill>":break;case"<bgColor":if(!fill.bgColor)fill.bgColor={};if(y.indexed)fill.bgColor.indexed=parseInt(y.indexed,10);if(y.theme)fill.bgColor.theme=parseInt(y.theme,10);if(y.tint)fill.bgColor.tint=parseFloat(y.tint);if(y.rgb)fill.bgColor.rgb=y.rgb.substring(y.rgb.length-6);break;case"<bgColor/>":case"</bgColor>":break;case"<fgColor":if(!fill.fgColor)fill.fgColor={};if(y.theme)fill.fgColor.theme=parseInt(y.theme,10);if(y.tint)fill.fgColor.tint=parseFloat(y.tint);if(y.rgb)fill.fgColor.rgb=y.rgb.substring(y.rgb.length-6);break;case"<fgColor/>":case"</fgColor>":break;default:if(opts.WTF)throw"unrecognized "+y[0]+" in fills"}})}function parse_numFmts(t,opts){styles.NumberFmt=[];var k=keys(SSF._table);for(var i=0;i<k.length;++i)styles.NumberFmt[k[i]]=SSF._table[k[i]];var m=t[0].match(tagregex);for(i=0;i<m.length;++i){var y=parsexmltag(m[i]);switch(y[0]){case"<numFmts":case"</numFmts>":case"<numFmts/>":case"<numFmts>":break;case"<numFmt":{var f=unescapexml(utf8read(y.formatCode)),j=parseInt(y.numFmtId,10);styles.NumberFmt[j]=f;if(j>0)SSF.load(f,j)}break;default:if(opts.WTF)throw"unrecognized "+y[0]+" in numFmts"}}}function write_numFmts(NF,opts){var o=["<numFmts>"];[[5,8],[23,26],[41,44],[63,66],[164,392]].forEach(function(r){for(var i=r[0];i<=r[1];++i)if(NF[i]!==undefined)o[o.length]=writextag("numFmt",null,{numFmtId:i,formatCode:escapexml(NF[i])})});if(o.length===1)return"";o[o.length]="</numFmts>";o[0]=writextag("numFmts",null,{count:o.length-2}).replace("/>",">");return o.join("")}function parse_cellXfs(t,opts){styles.CellXf=[];t[0].match(tagregex).forEach(function(x){var y=parsexmltag(x);switch(y[0]){case"<cellXfs":case"<cellXfs>":case"<cellXfs/>":case"</cellXfs>":break;case"<xf":delete y[0];if(y.numFmtId)y.numFmtId=parseInt(y.numFmtId,10);if(y.fillId)y.fillId=parseInt(y.fillId,10);styles.CellXf.push(y);break;case"</xf>":break;case"<alignment":case"<alignment/>":break;case"<protection":case"</protection>":case"<protection/>":break;case"<extLst":case"</extLst>":break;case"<ext":break;default:if(opts.WTF)throw"unrecognized "+y[0]+" in cellXfs"}})}function write_cellXfs(cellXfs){var o=[];o[o.length]=writextag("cellXfs",null);cellXfs.forEach(function(c){o[o.length]=writextag("xf",null,c)});o[o.length]="</cellXfs>";if(o.length===2)return"";o[0]=writextag("cellXfs",null,{count:o.length-2}).replace("/>",">");return o.join("")}var parse_sty_xml=function make_pstyx(){var numFmtRegex=/<numFmts([^>]*)>.*<\/numFmts>/;var cellXfRegex=/<cellXfs([^>]*)>.*<\/cellXfs>/;var fillsRegex=/<fills([^>]*)>.*<\/fills>/;return function parse_sty_xml(data,opts){var t;if(t=data.match(numFmtRegex))parse_numFmts(t,opts);if(t=data.match(fillsRegex))parse_fills(t,opts);if(t=data.match(cellXfRegex))parse_cellXfs(t,opts);return styles}}();var STYLES_XML_ROOT=writextag("styleSheet",null,{xmlns:XMLNS.main[0],"xmlns:vt":XMLNS.vt});RELS.STY="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles";function write_sty_xml(wb,opts){var o=[XML_HEADER,STYLES_XML_ROOT],w;if((w=write_numFmts(wb.SSF))!=null)o[o.length]=w;o[o.length]='<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>';o[o.length]='<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>';o[o.length]='<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>';o[o.length]='<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>';if(w=write_cellXfs(opts.cellXfs))o[o.length]=w;o[o.length]='<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>';o[o.length]='<dxfs count="0"/>';o[o.length]='<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>';if(o.length>2){o[o.length]="</styleSheet>";o[1]=o[1].replace("/>",">")}return o.join("")}function parse_BrtFmt(data,length){var ifmt=data.read_shift(2);var stFmtCode=parse_XLWideString(data,length-2);return[ifmt,stFmtCode]}function parse_BrtFont(data,length){var out={flags:{}};out.dyHeight=data.read_shift(2);out.grbit=parse_FontFlags(data,2);out.bls=data.read_shift(2);out.sss=data.read_shift(2);out.uls=data.read_shift(1);out.bFamily=data.read_shift(1);out.bCharSet=data.read_shift(1);data.l++;out.brtColor=parse_BrtColor(data,8);out.bFontScheme=data.read_shift(1);out.name=parse_XLWideString(data,length-21);out.flags.Bold=out.bls===700;out.flags.Italic=out.grbit.fItalic;out.flags.Strikeout=out.grbit.fStrikeout;out.flags.Outline=out.grbit.fOutline;out.flags.Shadow=out.grbit.fShadow;out.flags.Condense=out.grbit.fCondense;out.flags.Extend=out.grbit.fExtend;out.flags.Sub=out.sss&2;out.flags.Sup=out.sss&1;return out}function parse_BrtXF(data,length){var ixfeParent=data.read_shift(2);var ifmt=data.read_shift(2);parsenoop(data,length-4);return{ixfe:ixfeParent,ifmt:ifmt}}function parse_sty_bin(data,opts){styles.NumberFmt=[];for(var y in SSF._table)styles.NumberFmt[y]=SSF._table[y];styles.CellXf=[];var state="";var pass=false;recordhopper(data,function hopper_sty(val,R,RT){switch(R.n){case"BrtFmt":styles.NumberFmt[val[0]]=val[1];SSF.load(val[1],val[0]);break;case"BrtFont":break;case"BrtKnownFonts":break;case"BrtFill":break;case"BrtBorder":break;case"BrtXF":if(state==="CELLXFS"){styles.CellXf.push(val)}break;case"BrtStyle":break;case"BrtDXF":break;case"BrtMRUColor":break;case"BrtIndexedColor":break;case"BrtBeginStyleSheet":break;case"BrtEndStyleSheet":break;case"BrtBeginTableStyle":break;case"BrtTableStyleElement":break;case"BrtEndTableStyle":break;case"BrtBeginFmts":state="FMTS";break;case"BrtEndFmts":state="";break;case"BrtBeginFonts":state="FONTS";break;case"BrtEndFonts":state="";break;case"BrtACBegin":state="ACFONTS";break;case"BrtACEnd":state="";break;case"BrtBeginFills":state="FILLS";break;case"BrtEndFills":state="";break;case"BrtBeginBorders":state="BORDERS";break;case"BrtEndBorders":state="";break;case"BrtBeginCellStyleXFs":state="CELLSTYLEXFS";break;case"BrtEndCellStyleXFs":state="";break;case"BrtBeginCellXFs":state="CELLXFS";break;case"BrtEndCellXFs":state="";break;case"BrtBeginStyles":state="STYLES";break;case"BrtEndStyles":state="";break;case"BrtBeginDXFs":state="DXFS";break;case"BrtEndDXFs":state="";break;case"BrtBeginTableStyles":state="TABLESTYLES";break;case"BrtEndTableStyles":state="";break;case"BrtBeginColorPalette":state="COLORPALETTE";break;case"BrtEndColorPalette":state="";break;case"BrtBeginIndexedColors":state="INDEXEDCOLORS";break;case"BrtEndIndexedColors":state="";break;case"BrtBeginMRUColors":state="MRUCOLORS";break;case"BrtEndMRUColors":state="";break;case"BrtFRTBegin":pass=true;break;case"BrtFRTEnd":pass=false;break;case"BrtBeginStyleSheetExt14":break;case"BrtBeginSlicerStyles":break;case"BrtEndSlicerStyles":break;case"BrtBeginTimelineStylesheetExt15":break;case"BrtEndTimelineStylesheetExt15":break;case"BrtBeginTimelineStyles":break;case"BrtEndTimelineStyles":break;case"BrtEndStyleSheetExt14":break;default:if(!pass||opts.WTF)throw new Error("Unexpected record "+RT+" "+R.n)}});return styles}function write_sty_bin(data,opts){var ba=buf_array();write_record(ba,"BrtBeginStyleSheet");write_record(ba,"BrtEndStyleSheet");return ba.end()}RELS.THEME="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme";function parse_clrScheme(t,opts){themes.themeElements.clrScheme=[];var color={};t[0].match(tagregex).forEach(function(x){var y=parsexmltag(x);switch(y[0]){case"<a:clrScheme":case"</a:clrScheme>":break;case"<a:srgbClr":color.rgb=y.val;break;case"<a:sysClr":color.rgb=y.lastClr;break;case"<a:dk1>":case"</a:dk1>":case"<a:dk2>":case"</a:dk2>":case"<a:lt1>":case"</a:lt1>":case"<a:lt2>":case"</a:lt2>":case"<a:accent1>":case"</a:accent1>":case"<a:accent2>":case"</a:accent2>":case"<a:accent3>":case"</a:accent3>":case"<a:accent4>":case"</a:accent4>":case"<a:accent5>":case"</a:accent5>":case"<a:accent6>":case"</a:accent6>":case"<a:hlink>":case"</a:hlink>":case"<a:folHlink>":case"</a:folHlink>":if(y[0][1]==="/"){themes.themeElements.clrScheme.push(color);color={}}else{color.name=y[0].substring(3,y[0].length-1)}break;default:if(opts.WTF)throw"unrecognized "+y[0]+" in clrScheme"}})}function parse_fontScheme(t,opts){}function parse_fmtScheme(t,opts){}var clrsregex=/<a:clrScheme([^>]*)>[^\u2603]*<\/a:clrScheme>/;var fntsregex=/<a:fontScheme([^>]*)>[^\u2603]*<\/a:fontScheme>/;var fmtsregex=/<a:fmtScheme([^>]*)>[^\u2603]*<\/a:fmtScheme>/;function parse_themeElements(data,opts){themes.themeElements={};var t;[["clrScheme",clrsregex,parse_clrScheme],["fontScheme",fntsregex,parse_fontScheme],["fmtScheme",fmtsregex,parse_fmtScheme]].forEach(function(m){if(!(t=data.match(m[1])))throw m[0]+" not found in themeElements";m[2](t,opts)})}var themeltregex=/<a:themeElements([^>]*)>[^\u2603]*<\/a:themeElements>/;function parse_theme_xml(data,opts){if(!data||data.length===0)return themes;var t;if(!(t=data.match(themeltregex)))throw"themeElements not found in theme";parse_themeElements(t[0],opts);return themes}function write_theme(){return'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme"><a:themeElements><a:clrScheme name="Office"><a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1><a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="1F497D"/></a:dk2><a:lt2><a:srgbClr val="EEECE1"/></a:lt2><a:accent1><a:srgbClr val="4F81BD"/></a:accent1><a:accent2><a:srgbClr val="C0504D"/></a:accent2><a:accent3><a:srgbClr val="9BBB59"/></a:accent3><a:accent4><a:srgbClr val="8064A2"/></a:accent4><a:accent5><a:srgbClr val="4BACC6"/></a:accent5><a:accent6><a:srgbClr val="F79646"/></a:accent6><a:hlink><a:srgbClr val="0000FF"/></a:hlink><a:folHlink><a:srgbClr val="800080"/></a:folHlink></a:clrScheme><a:fontScheme name="Office"><a:majorFont><a:latin typeface="Cambria"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/><a:font script="Hang" typeface="맑은 고딕"/><a:font script="Hans" typeface="宋体"/><a:font script="Hant" typeface="新細明體"/><a:font script="Arab" typeface="Times New Roman"/><a:font script="Hebr" typeface="Times New Roman"/><a:font script="Thai" typeface="Tahoma"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="MoolBoran"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Times New Roman"/><a:font script="Uigh" typeface="Microsoft Uighur"/><a:font script="Geor" typeface="Sylfaen"/></a:majorFont><a:minorFont><a:latin typeface="Calibri"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/><a:font script="Hang" typeface="맑은 고딕"/><a:font script="Hans" typeface="宋体"/><a:font script="Hant" typeface="新細明體"/><a:font script="Arab" typeface="Arial"/><a:font script="Hebr" typeface="Arial"/><a:font script="Thai" typeface="Tahoma"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="DaunPenh"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Arial"/><a:font script="Uigh" typeface="Microsoft Uighur"/><a:font script="Geor" typeface="Sylfaen"/></a:minorFont></a:fontScheme><a:fmtScheme name="Office"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="16200000" scaled="1"/></a:gradFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="16200000" scaled="0"/></a:gradFill></a:fillStyleLst><a:lnStyleLst><a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln><a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln><a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst><a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw></a:effectLst></a:effectStyle><a:effectStyle><a:effectLst><a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw></a:effectLst></a:effectStyle><a:effectStyle><a:effectLst><a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw></a:effectLst><a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d><a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs><a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs></a:gsLst><a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path></a:gradFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs></a:gsLst><a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path></a:gradFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements><a:objectDefaults><a:spDef><a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style></a:spDef><a:lnDef><a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style></a:lnDef></a:objectDefaults><a:extraClrSchemeLst/></a:theme>'}function parse_Theme(blob,length){var dwThemeVersion=blob.read_shift(4);if(dwThemeVersion===124226)return;blob.l+=length-4}function parse_ColorTheme(blob,length){return blob.read_shift(4)}function parse_FullColorExt(blob,length){var o={};o.xclrType=blob.read_shift(2);o.nTintShade=blob.read_shift(2);switch(o.xclrType){case 0:blob.l+=4;break;case 1:o.xclrValue=parse_IcvXF(blob,4);break;case 2:o.xclrValue=parse_LongRGBA(blob,4);break;case 3:o.xclrValue=parse_ColorTheme(blob,4);break;case 4:blob.l+=4;break}blob.l+=8;return o}function parse_IcvXF(blob,length){return parsenoop(blob,length)}function parse_XFExtGradient(blob,length){return parsenoop(blob,length)}function parse_ExtProp(blob,length){var extType=blob.read_shift(2);var cb=blob.read_shift(2);var o=[extType];switch(extType){case 4:case 5:case 7:case 8:case 9:case 10:case 11:case 13:o[1]=parse_FullColorExt(blob,cb);break;case 6:o[1]=parse_XFExtGradient(blob,cb);break;case 14:case 15:o[1]=blob.read_shift(cb===5?1:2);break;default:throw new Error("Unrecognized ExtProp type: "+extType+" "+cb)}return o}function parse_XFExt(blob,length){var end=blob.l+length;blob.l+=2;var ixfe=blob.read_shift(2);blob.l+=2;var cexts=blob.read_shift(2);var ext=[];while(cexts-->0)ext.push(parse_ExtProp(blob,end-blob.l));return{ixfe:ixfe,ext:ext}}function update_xfext(xf,xfext){xfext.forEach(function(xfe){switch(xfe[0]){case 4:break;case 5:break;case 7:case 8:case 9:case 10:break;case 13:break;case 14:break;default:throw"bafuq"+xfe[0].toString(16)}})}function parse_cc_xml(data,opts){var d=[];var l=0,i=1;(data.match(tagregex)||[]).forEach(function(x){var y=parsexmltag(x);switch(y[0]){case"<?xml":break;case"<calcChain":case"<calcChain>":case"</calcChain>":break;case"<c":delete y[0];if(y.i)i=y.i;else y.i=i;d.push(y);break}});return d}function write_cc_xml(data,opts){}function parse_BrtCalcChainItem$(data,length){var out={};out.i=data.read_shift(4);var cell={};cell.r=data.read_shift(4);cell.c=data.read_shift(4);out.r=encode_cell(cell);var flags=data.read_shift(1);if(flags&2)out.l="1";if(flags&8)out.a="1";return out}function parse_cc_bin(data,opts){var out=[];var pass=false;recordhopper(data,function hopper_cc(val,R,RT){switch(R.n){case"BrtCalcChainItem$":out.push(val);break;case"BrtBeginCalcChain$":break;case"BrtEndCalcChain$":break;default:if(!pass||opts.WTF)throw new Error("Unexpected record "+RT+" "+R.n)}});return out}function write_cc_bin(data,opts){}function parse_comments(zip,dirComments,sheets,sheetRels,opts){for(var i=0;i!=dirComments.length;++i){var canonicalpath=dirComments[i];var comments=parse_cmnt(getzipdata(zip,canonicalpath.replace(/^\//,""),true),canonicalpath,opts);if(!comments||!comments.length)continue;var sheetNames=keys(sheets);for(var j=0;j!=sheetNames.length;++j){var sheetName=sheetNames[j];var rels=sheetRels[sheetName];if(rels){var rel=rels[canonicalpath];if(rel)insertCommentsIntoSheet(sheetName,sheets[sheetName],comments)}}}}function insertCommentsIntoSheet(sheetName,sheet,comments){comments.forEach(function(comment){var cell=sheet[comment.ref];if(!cell){cell={};sheet[comment.ref]=cell;var range=safe_decode_range(sheet["!ref"]||"BDWGO1000001:A1");var thisCell=decode_cell(comment.ref);if(range.s.r>thisCell.r)range.s.r=thisCell.r;if(range.e.r<thisCell.r)range.e.r=thisCell.r;if(range.s.c>thisCell.c)range.s.c=thisCell.c;if(range.e.c<thisCell.c)range.e.c=thisCell.c;var encoded=encode_range(range);if(encoded!==sheet["!ref"])sheet["!ref"]=encoded}if(!cell.c)cell.c=[];var o={a:comment.author,t:comment.t,r:comment.r};if(comment.h)o.h=comment.h;cell.c.push(o)})}function parse_comments_xml(data,opts){if(data.match(/<(?:\w+:)?comments *\/>/))return[];var authors=[];var commentList=[];data.match(/<(?:\w+:)?authors>([^\u2603]*)<\/(?:\w+:)?authors>/)[1].split(/<\/\w*:?author>/).forEach(function(x){if(x===""||x.trim()==="")return;authors.push(x.match(/<(?:\w+:)?author[^>]*>(.*)/)[1])});(data.match(/<(?:\w+:)?commentList>([^\u2603]*)<\/(?:\w+:)?commentList>/)||["",""])[1].split(/<\/\w*:?comment>/).forEach(function(x,index){if(x===""||x.trim()==="")return;var y=parsexmltag(x.match(/<(?:\w+:)?comment[^>]*>/)[0]);var comment={author:y.authorId&&authors[y.authorId]?authors[y.authorId]:undefined,ref:y.ref,guid:y.guid};var cell=decode_cell(y.ref);if(opts.sheetRows&&opts.sheetRows<=cell.r)return;var textMatch=x.match(/<text>([^\u2603]*)<\/text>/);if(!textMatch||!textMatch[1])return;var rt=parse_si(textMatch[1]);comment.r=rt.r;comment.t=rt.t;if(opts.cellHTML)comment.h=rt.h;commentList.push(comment)});return commentList}function write_comments_xml(data,opts){}function parse_BrtBeginComment(data,length){var out={};out.iauthor=data.read_shift(4);var rfx=parse_UncheckedRfX(data,16);out.rfx=rfx.s;out.ref=encode_cell(rfx.s);data.l+=16;return out}var parse_BrtCommentAuthor=parse_XLWideString;var parse_BrtCommentText=parse_RichStr;function parse_comments_bin(data,opts){var out=[];var authors=[];var c={};var pass=false;recordhopper(data,function hopper_cmnt(val,R,RT){switch(R.n){case"BrtCommentAuthor":authors.push(val);break;case"BrtBeginComment":c=val;break;case"BrtCommentText":c.t=val.t;c.h=val.h;c.r=val.r;break;case"BrtEndComment":c.author=authors[c.iauthor];delete c.iauthor;if(opts.sheetRows&&opts.sheetRows<=c.rfx.r)break;delete c.rfx;out.push(c);break;case"BrtBeginComments":break;case"BrtEndComments":break;case"BrtBeginCommentAuthors":break;case"BrtEndCommentAuthors":break;case"BrtBeginCommentList":break;case"BrtEndCommentList":break;default:if(!pass||opts.WTF)throw new Error("Unexpected record "+RT+" "+R.n)}});return out}function write_comments_bin(data,opts){}var rc_to_a1=function(){var rcregex=/(^|[^A-Za-z])R(\[?)(-?\d+|)\]?C(\[?)(-?\d+|)\]?/g;var rcbase;function rcfunc($$,$1,$2,$3,$4,$5){var R=$3.length>0?parseInt($3,10)|0:0,C=$5.length>0?parseInt($5,10)|0:0;if(C<0&&$4.length===0)C=0;if($4.length>0)C+=rcbase.c;if($2.length>0)R+=rcbase.r;return $1+encode_col(C)+encode_row(R)}return function rc_to_a1(fstr,base){rcbase=base;return fstr.replace(rcregex,rcfunc)}}();function parseread(l){return function(blob,length){blob.l+=l;return}}function parseread1(blob,length){blob.l+=1;return}function parse_ColRelU(blob,length){var c=blob.read_shift(2);return[c&16383,c>>14&1,c>>15&1]}function parse_RgceArea(blob,length){var r=blob.read_shift(2),R=blob.read_shift(2);var c=parse_ColRelU(blob,2);var C=parse_ColRelU(blob,2);return{s:{r:r,c:c[0],cRel:c[1],rRel:c[2]},e:{r:R,c:C[0],cRel:C[1],rRel:C[2]}}}function parse_RgceAreaRel(blob,length){var r=blob.read_shift(2),R=blob.read_shift(2);var c=parse_ColRelU(blob,2);var C=parse_ColRelU(blob,2);return{s:{r:r,c:c[0],cRel:c[1],rRel:c[2]},e:{r:R,c:C[0],cRel:C[1],rRel:C[2]}}}function parse_RgceLoc(blob,length){var r=blob.read_shift(2);var c=parse_ColRelU(blob,2);return{r:r,c:c[0],cRel:c[1],rRel:c[2]}}function parse_RgceLocRel(blob,length){var r=blob.read_shift(2);var cl=blob.read_shift(2);var cRel=(cl&32768)>>15,rRel=(cl&16384)>>14;cl&=16383;if(cRel!==0)while(cl>=256)cl-=256;return{r:r,c:cl,cRel:cRel,rRel:rRel}}function parse_PtgArea(blob,length){var type=(blob[blob.l++]&96)>>5;var area=parse_RgceArea(blob,8);return[type,area]}function parse_PtgArea3d(blob,length){var type=(blob[blob.l++]&96)>>5;var ixti=blob.read_shift(2);var area=parse_RgceArea(blob,8);return[type,ixti,area]}function parse_PtgAreaErr(blob,length){var type=(blob[blob.l++]&96)>>5;blob.l+=8;return[type]}function parse_PtgAreaErr3d(blob,length){var type=(blob[blob.l++]&96)>>5;var ixti=blob.read_shift(2);blob.l+=8;return[type,ixti]}function parse_PtgAreaN(blob,length){var type=(blob[blob.l++]&96)>>5;var area=parse_RgceAreaRel(blob,8);return[type,area]}function parse_PtgArray(blob,length){var type=(blob[blob.l++]&96)>>5;blob.l+=7;return[type]}function parse_PtgAttrBaxcel(blob,length){var bitSemi=blob[blob.l+1]&1;var bitBaxcel=1;blob.l+=4;return[bitSemi,bitBaxcel]}function parse_PtgAttrChoose(blob,length){blob.l+=2;var offset=blob.read_shift(2);var o=[];for(var i=0;i<=offset;++i)o.push(blob.read_shift(2));return o}function parse_PtgAttrGoto(blob,length){var bitGoto=blob[blob.l+1]&255?1:0;blob.l+=2;return[bitGoto,blob.read_shift(2)]}function parse_PtgAttrIf(blob,length){var bitIf=blob[blob.l+1]&255?1:0;blob.l+=2;return[bitIf,blob.read_shift(2)]}function parse_PtgAttrSemi(blob,length){var bitSemi=blob[blob.l+1]&255?1:0;blob.l+=4;return[bitSemi]}function parse_PtgAttrSpaceType(blob,length){var type=blob.read_shift(1),cch=blob.read_shift(1);return[type,cch]}function parse_PtgAttrSpace(blob,length){blob.read_shift(2);return parse_PtgAttrSpaceType(blob,2)}function parse_PtgAttrSpaceSemi(blob,length){blob.read_shift(2);return parse_PtgAttrSpaceType(blob,2)}function parse_PtgRef(blob,length){var ptg=blob[blob.l]&31;var type=(blob[blob.l]&96)>>5;blob.l+=1;var loc=parse_RgceLoc(blob,4);return[type,loc]}function parse_PtgRefN(blob,length){var ptg=blob[blob.l]&31;var type=(blob[blob.l]&96)>>5;blob.l+=1;var loc=parse_RgceLocRel(blob,4);return[type,loc]}function parse_PtgRef3d(blob,length){var ptg=blob[blob.l]&31;var type=(blob[blob.l]&96)>>5;blob.l+=1;var ixti=blob.read_shift(2);var loc=parse_RgceLoc(blob,4);return[type,ixti,loc]}function parse_PtgFunc(blob,length){var ptg=blob[blob.l]&31;var type=(blob[blob.l]&96)>>5;blob.l+=1;var iftab=blob.read_shift(2);return[FtabArgc[iftab],Ftab[iftab]]}function parse_PtgFuncVar(blob,length){blob.l++;var cparams=blob.read_shift(1),tab=parsetab(blob);return[cparams,(tab[0]===0?Ftab:Cetab)[tab[1]]]}function parsetab(blob,length){return[blob[blob.l+1]>>7,blob.read_shift(2)&32767]}var parse_PtgAttrSum=parseread(4);var parse_PtgConcat=parseread1;function parse_PtgExp(blob,length){blob.l++;var row=blob.read_shift(2);var col=blob.read_shift(2);return[row,col]}function parse_PtgErr(blob,length){blob.l++;return BErr[blob.read_shift(1)]}function parse_PtgInt(blob,length){blob.l++;return blob.read_shift(2)}function parse_PtgBool(blob,length){blob.l++;return blob.read_shift(1)!==0}function parse_PtgNum(blob,length){blob.l++;return parse_Xnum(blob,8)}function parse_PtgStr(blob,length){blob.l++;return parse_ShortXLUnicodeString(blob)}function parse_SerAr(blob){var val=[];switch(val[0]=blob.read_shift(1)){case 4:val[1]=parsebool(blob,1)?"TRUE":"FALSE";blob.l+=7;break;case 16:val[1]=BErr[blob[blob.l]];blob.l+=8;break;case 0:blob.l+=8;break;case 1:val[1]=parse_Xnum(blob,8);break;case 2:val[1]=parse_XLUnicodeString(blob);break}return val}function parse_PtgExtraMem(blob,cce){var count=blob.read_shift(2);var out=[];for(var i=0;i!=count;++i)out.push(parse_Ref8U(blob,8));return out}function parse_PtgExtraArray(blob){var cols=1+blob.read_shift(1);var rows=1+blob.read_shift(2);for(var i=0,o=[];i!=rows&&(o[i]=[]);++i)for(var j=0;j!=cols;++j)o[i][j]=parse_SerAr(blob);
return o}function parse_PtgName(blob,length){var type=blob.read_shift(1)>>>5&3;var nameindex=blob.read_shift(4);return[type,0,nameindex]}function parse_PtgNameX(blob,length){var type=blob.read_shift(1)>>>5&3;var ixti=blob.read_shift(2);var nameindex=blob.read_shift(4);return[type,ixti,nameindex]}function parse_PtgMemArea(blob,length){var type=blob.read_shift(1)>>>5&3;blob.l+=4;var cce=blob.read_shift(2);return[type,cce]}function parse_PtgMemFunc(blob,length){var type=blob.read_shift(1)>>>5&3;var cce=blob.read_shift(2);return[type,cce]}function parse_PtgRefErr(blob,length){var type=blob.read_shift(1)>>>5&3;blob.l+=4;return[type]}var parse_PtgAdd=parseread1;var parse_PtgDiv=parseread1;var parse_PtgEq=parseread1;var parse_PtgGe=parseread1;var parse_PtgGt=parseread1;var parse_PtgIsect=parseread1;var parse_PtgLe=parseread1;var parse_PtgLt=parseread1;var parse_PtgMissArg=parseread1;var parse_PtgMul=parseread1;var parse_PtgNe=parseread1;var parse_PtgParen=parseread1;var parse_PtgPercent=parseread1;var parse_PtgPower=parseread1;var parse_PtgRange=parseread1;var parse_PtgSub=parseread1;var parse_PtgUminus=parseread1;var parse_PtgUnion=parseread1;var parse_PtgUplus=parseread1;var parse_PtgMemErr=parsenoop;var parse_PtgMemNoMem=parsenoop;var parse_PtgRefErr3d=parsenoop;var parse_PtgTbl=parsenoop;var PtgTypes={1:{n:"PtgExp",f:parse_PtgExp},2:{n:"PtgTbl",f:parse_PtgTbl},3:{n:"PtgAdd",f:parse_PtgAdd},4:{n:"PtgSub",f:parse_PtgSub},5:{n:"PtgMul",f:parse_PtgMul},6:{n:"PtgDiv",f:parse_PtgDiv},7:{n:"PtgPower",f:parse_PtgPower},8:{n:"PtgConcat",f:parse_PtgConcat},9:{n:"PtgLt",f:parse_PtgLt},10:{n:"PtgLe",f:parse_PtgLe},11:{n:"PtgEq",f:parse_PtgEq},12:{n:"PtgGe",f:parse_PtgGe},13:{n:"PtgGt",f:parse_PtgGt},14:{n:"PtgNe",f:parse_PtgNe},15:{n:"PtgIsect",f:parse_PtgIsect},16:{n:"PtgUnion",f:parse_PtgUnion},17:{n:"PtgRange",f:parse_PtgRange},18:{n:"PtgUplus",f:parse_PtgUplus},19:{n:"PtgUminus",f:parse_PtgUminus},20:{n:"PtgPercent",f:parse_PtgPercent},21:{n:"PtgParen",f:parse_PtgParen},22:{n:"PtgMissArg",f:parse_PtgMissArg},23:{n:"PtgStr",f:parse_PtgStr},28:{n:"PtgErr",f:parse_PtgErr},29:{n:"PtgBool",f:parse_PtgBool},30:{n:"PtgInt",f:parse_PtgInt},31:{n:"PtgNum",f:parse_PtgNum},32:{n:"PtgArray",f:parse_PtgArray},33:{n:"PtgFunc",f:parse_PtgFunc},34:{n:"PtgFuncVar",f:parse_PtgFuncVar},35:{n:"PtgName",f:parse_PtgName},36:{n:"PtgRef",f:parse_PtgRef},37:{n:"PtgArea",f:parse_PtgArea},38:{n:"PtgMemArea",f:parse_PtgMemArea},39:{n:"PtgMemErr",f:parse_PtgMemErr},40:{n:"PtgMemNoMem",f:parse_PtgMemNoMem},41:{n:"PtgMemFunc",f:parse_PtgMemFunc},42:{n:"PtgRefErr",f:parse_PtgRefErr},43:{n:"PtgAreaErr",f:parse_PtgAreaErr},44:{n:"PtgRefN",f:parse_PtgRefN},45:{n:"PtgAreaN",f:parse_PtgAreaN},57:{n:"PtgNameX",f:parse_PtgNameX},58:{n:"PtgRef3d",f:parse_PtgRef3d},59:{n:"PtgArea3d",f:parse_PtgArea3d},60:{n:"PtgRefErr3d",f:parse_PtgRefErr3d},61:{n:"PtgAreaErr3d",f:parse_PtgAreaErr3d},255:{}};var PtgDupes={64:32,96:32,65:33,97:33,66:34,98:34,67:35,99:35,68:36,100:36,69:37,101:37,70:38,102:38,71:39,103:39,72:40,104:40,73:41,105:41,74:42,106:42,75:43,107:43,76:44,108:44,77:45,109:45,89:57,121:57,90:58,122:58,91:59,123:59,92:60,124:60,93:61,125:61};(function(){for(var y in PtgDupes)PtgTypes[y]=PtgTypes[PtgDupes[y]]})();var Ptg18={};var Ptg19={1:{n:"PtgAttrSemi",f:parse_PtgAttrSemi},2:{n:"PtgAttrIf",f:parse_PtgAttrIf},4:{n:"PtgAttrChoose",f:parse_PtgAttrChoose},8:{n:"PtgAttrGoto",f:parse_PtgAttrGoto},16:{n:"PtgAttrSum",f:parse_PtgAttrSum},32:{n:"PtgAttrBaxcel",f:parse_PtgAttrBaxcel},64:{n:"PtgAttrSpace",f:parse_PtgAttrSpace},65:{n:"PtgAttrSpaceSemi",f:parse_PtgAttrSpaceSemi},255:{}};function parse_Formula(blob,length,opts){var cell=parse_XLSCell(blob,6);var val=parse_FormulaValue(blob,8);var flags=blob.read_shift(1);blob.read_shift(1);var chn=blob.read_shift(4);var cbf="";if(opts.biff===5)blob.l+=length-20;else cbf=parse_XLSCellParsedFormula(blob,length-20,opts);return{cell:cell,val:val[0],formula:cbf,shared:flags>>3&1,tt:val[1]}}function parse_FormulaValue(blob){var b;if(__readUInt16LE(blob,blob.l+6)!==65535)return[parse_Xnum(blob),"n"];switch(blob[blob.l]){case 0:blob.l+=8;return["String","s"];case 1:b=blob[blob.l+2]===1;blob.l+=8;return[b,"b"];case 2:b=blob[blob.l+2];blob.l+=8;return[b,"e"];case 3:blob.l+=8;return["","s"]}}function parse_RgbExtra(blob,length,rgce,opts){if(opts.biff<8)return parsenoop(blob,length);var target=blob.l+length;var o=[];for(var i=0;i!==rgce.length;++i){switch(rgce[i][0]){case"PtgArray":rgce[i][1]=parse_PtgExtraArray(blob);o.push(rgce[i][1]);break;case"PtgMemArea":rgce[i][2]=parse_PtgExtraMem(blob,rgce[i][1]);o.push(rgce[i][2]);break;default:break}}length=target-blob.l;if(length!==0)o.push(parsenoop(blob,length));return o}function parse_NameParsedFormula(blob,length,opts,cce){var target=blob.l+length;var rgce=parse_Rgce(blob,cce);var rgcb;if(target!==blob.l)rgcb=parse_RgbExtra(blob,target-blob.l,rgce,opts);return[rgce,rgcb]}function parse_XLSCellParsedFormula(blob,length,opts){var target=blob.l+length;var rgcb,cce=blob.read_shift(2);if(cce==65535)return[[],parsenoop(blob,length-2)];var rgce=parse_Rgce(blob,cce);if(length!==cce+2)rgcb=parse_RgbExtra(blob,length-cce-2,rgce,opts);return[rgce,rgcb]}function parse_SharedParsedFormula(blob,length,opts){var target=blob.l+length;var rgcb,cce=blob.read_shift(2);var rgce=parse_Rgce(blob,cce);if(cce==65535)return[[],parsenoop(blob,length-2)];if(length!==cce+2)rgcb=parse_RgbExtra(blob,target-cce-2,rgce,opts);return[rgce,rgcb]}function parse_ArrayParsedFormula(blob,length,opts,ref){var target=blob.l+length;var rgcb,cce=blob.read_shift(2);if(cce==65535)return[[],parsenoop(blob,length-2)];var rgce=parse_Rgce(blob,cce);if(length!==cce+2)rgcb=parse_RgbExtra(blob,target-cce-2,rgce,opts);return[rgce,rgcb]}function parse_Rgce(blob,length){var target=blob.l+length;var R,id,ptgs=[];while(target!=blob.l){length=target-blob.l;id=blob[blob.l];R=PtgTypes[id];if(id===24||id===25){id=blob[blob.l+1];R=(id===24?Ptg18:Ptg19)[id]}if(!R||!R.f){ptgs.push(parsenoop(blob,length))}else{ptgs.push([R.n,R.f(blob,length)])}}return ptgs}function mapper(x){return x.map(function f2(y){return y[1]}).join(",")}function stringify_formula(formula,range,cell,supbooks,opts){if(opts!==undefined&&opts.biff===5)return"BIFF5??";var _range=range!==undefined?range:{s:{c:0,r:0}};var stack=[],e1,e2,type,c,ixti,nameidx,r;if(!formula[0]||!formula[0][0])return"";for(var ff=0,fflen=formula[0].length;ff<fflen;++ff){var f=formula[0][ff];switch(f[0]){case"PtgUminus":stack.push("-"+stack.pop());break;case"PtgUplus":stack.push("+"+stack.pop());break;case"PtgPercent":stack.push(stack.pop()+"%");break;case"PtgAdd":e1=stack.pop();e2=stack.pop();stack.push(e2+"+"+e1);break;case"PtgSub":e1=stack.pop();e2=stack.pop();stack.push(e2+"-"+e1);break;case"PtgMul":e1=stack.pop();e2=stack.pop();stack.push(e2+"*"+e1);break;case"PtgDiv":e1=stack.pop();e2=stack.pop();stack.push(e2+"/"+e1);break;case"PtgPower":e1=stack.pop();e2=stack.pop();stack.push(e2+"^"+e1);break;case"PtgConcat":e1=stack.pop();e2=stack.pop();stack.push(e2+"&"+e1);break;case"PtgLt":e1=stack.pop();e2=stack.pop();stack.push(e2+"<"+e1);break;case"PtgLe":e1=stack.pop();e2=stack.pop();stack.push(e2+"<="+e1);break;case"PtgEq":e1=stack.pop();e2=stack.pop();stack.push(e2+"="+e1);break;case"PtgGe":e1=stack.pop();e2=stack.pop();stack.push(e2+">="+e1);break;case"PtgGt":e1=stack.pop();e2=stack.pop();stack.push(e2+">"+e1);break;case"PtgNe":e1=stack.pop();e2=stack.pop();stack.push(e2+"<>"+e1);break;case"PtgIsect":e1=stack.pop();e2=stack.pop();stack.push(e2+" "+e1);break;case"PtgUnion":e1=stack.pop();e2=stack.pop();stack.push(e2+","+e1);break;case"PtgRange":break;case"PtgAttrChoose":break;case"PtgAttrGoto":break;case"PtgAttrIf":break;case"PtgRef":type=f[1][0];c=shift_cell_xls(decode_cell(encode_cell(f[1][1])),_range);stack.push(encode_cell(c));break;case"PtgRefN":type=f[1][0];c=shift_cell_xls(decode_cell(encode_cell(f[1][1])),cell);stack.push(encode_cell(c));break;case"PtgRef3d":type=f[1][0];ixti=f[1][1];c=shift_cell_xls(f[1][2],_range);stack.push(supbooks[1][ixti+1]+"!"+encode_cell(c));break;case"PtgFunc":case"PtgFuncVar":var argc=f[1][0],func=f[1][1];if(!argc)argc=0;var args=stack.slice(-argc);stack.length-=argc;if(func==="User")func=args.shift();stack.push(func+"("+args.join(",")+")");break;case"PtgBool":stack.push(f[1]?"TRUE":"FALSE");break;case"PtgInt":stack.push(f[1]);break;case"PtgNum":stack.push(String(f[1]));break;case"PtgStr":stack.push('"'+f[1]+'"');break;case"PtgErr":stack.push(f[1]);break;case"PtgArea":type=f[1][0];r=shift_range_xls(f[1][1],_range);stack.push(encode_range(r));break;case"PtgArea3d":type=f[1][0];ixti=f[1][1];r=f[1][2];stack.push(supbooks[1][ixti+1]+"!"+encode_range(r));break;case"PtgAttrSum":stack.push("SUM("+stack.pop()+")");break;case"PtgAttrSemi":break;case"PtgName":nameidx=f[1][2];var lbl=supbooks[0][nameidx];var name=lbl.Name;if(name in XLSXFutureFunctions)name=XLSXFutureFunctions[name];stack.push(name);break;case"PtgNameX":var bookidx=f[1][1];nameidx=f[1][2];var externbook;if(supbooks[bookidx+1])externbook=supbooks[bookidx+1][nameidx];else if(supbooks[bookidx-1])externbook=supbooks[bookidx-1][nameidx];if(!externbook)externbook={body:"??NAMEX??"};stack.push(externbook.body);break;case"PtgParen":stack.push("("+stack.pop()+")");break;case"PtgRefErr":stack.push("#REF!");break;case"PtgExp":c={c:f[1][1],r:f[1][0]};var q={c:cell.c,r:cell.r};if(supbooks.sharedf[encode_cell(c)]){var parsedf=supbooks.sharedf[encode_cell(c)];stack.push(stringify_formula(parsedf,_range,q,supbooks,opts))}else{var fnd=false;for(e1=0;e1!=supbooks.arrayf.length;++e1){e2=supbooks.arrayf[e1];if(c.c<e2[0].s.c||c.c>e2[0].e.c)continue;if(c.r<e2[0].s.r||c.r>e2[0].e.r)continue;stack.push(stringify_formula(e2[1],_range,q,supbooks,opts))}if(!fnd)stack.push(f[1])}break;case"PtgArray":stack.push("{"+f[1].map(mapper).join(";")+"}");break;case"PtgMemArea":break;case"PtgAttrSpace":break;case"PtgTbl":break;case"PtgMemErr":break;case"PtgMissArg":stack.push("");break;case"PtgAreaErr":break;case"PtgAreaN":stack.push("");break;case"PtgRefErr3d":break;case"PtgMemFunc":break;default:throw"Unrecognized Formula Token: "+f}}return stack[0]}function parse_XLSBCellParsedFormula(data,length){var cce=data.read_shift(4);return parsenoop(data,length-4)}var PtgDataType={1:"REFERENCE",2:"VALUE",3:"ARRAY"};var Cetab={0:"BEEP",1:"OPEN",2:"OPEN.LINKS",3:"CLOSE.ALL",4:"SAVE",5:"SAVE.AS",6:"FILE.DELETE",7:"PAGE.SETUP",8:"PRINT",9:"PRINTER.SETUP",10:"QUIT",11:"NEW.WINDOW",12:"ARRANGE.ALL",13:"WINDOW.SIZE",14:"WINDOW.MOVE",15:"FULL",16:"CLOSE",17:"RUN",22:"SET.PRINT.AREA",23:"SET.PRINT.TITLES",24:"SET.PAGE.BREAK",25:"REMOVE.PAGE.BREAK",26:"FONT",27:"DISPLAY",28:"PROTECT.DOCUMENT",29:"PRECISION",30:"A1.R1C1",31:"CALCULATE.NOW",32:"CALCULATION",34:"DATA.FIND",35:"EXTRACT",36:"DATA.DELETE",37:"SET.DATABASE",38:"SET.CRITERIA",39:"SORT",40:"DATA.SERIES",41:"TABLE",42:"FORMAT.NUMBER",43:"ALIGNMENT",44:"STYLE",45:"BORDER",46:"CELL.PROTECTION",47:"COLUMN.WIDTH",48:"UNDO",49:"CUT",50:"COPY",51:"PASTE",52:"CLEAR",53:"PASTE.SPECIAL",54:"EDIT.DELETE",55:"INSERT",56:"FILL.RIGHT",57:"FILL.DOWN",61:"DEFINE.NAME",62:"CREATE.NAMES",63:"FORMULA.GOTO",64:"FORMULA.FIND",65:"SELECT.LAST.CELL",66:"SHOW.ACTIVE.CELL",67:"GALLERY.AREA",68:"GALLERY.BAR",69:"GALLERY.COLUMN",70:"GALLERY.LINE",71:"GALLERY.PIE",72:"GALLERY.SCATTER",73:"COMBINATION",74:"PREFERRED",75:"ADD.OVERLAY",76:"GRIDLINES",77:"SET.PREFERRED",78:"AXES",79:"LEGEND",80:"ATTACH.TEXT",81:"ADD.ARROW",82:"SELECT.CHART",83:"SELECT.PLOT.AREA",84:"PATTERNS",85:"MAIN.CHART",86:"OVERLAY",87:"SCALE",88:"FORMAT.LEGEND",89:"FORMAT.TEXT",90:"EDIT.REPEAT",91:"PARSE",92:"JUSTIFY",93:"HIDE",94:"UNHIDE",95:"WORKSPACE",96:"FORMULA",97:"FORMULA.FILL",98:"FORMULA.ARRAY",99:"DATA.FIND.NEXT",100:"DATA.FIND.PREV",101:"FORMULA.FIND.NEXT",102:"FORMULA.FIND.PREV",103:"ACTIVATE",104:"ACTIVATE.NEXT",105:"ACTIVATE.PREV",106:"UNLOCKED.NEXT",107:"UNLOCKED.PREV",108:"COPY.PICTURE",109:"SELECT",110:"DELETE.NAME",111:"DELETE.FORMAT",112:"VLINE",113:"HLINE",114:"VPAGE",115:"HPAGE",116:"VSCROLL",117:"HSCROLL",118:"ALERT",119:"NEW",120:"CANCEL.COPY",121:"SHOW.CLIPBOARD",122:"MESSAGE",124:"PASTE.LINK",125:"APP.ACTIVATE",126:"DELETE.ARROW",127:"ROW.HEIGHT",128:"FORMAT.MOVE",129:"FORMAT.SIZE",130:"FORMULA.REPLACE",131:"SEND.KEYS",132:"SELECT.SPECIAL",133:"APPLY.NAMES",134:"REPLACE.FONT",135:"FREEZE.PANES",136:"SHOW.INFO",137:"SPLIT",138:"ON.WINDOW",139:"ON.DATA",140:"DISABLE.INPUT",142:"OUTLINE",143:"LIST.NAMES",144:"FILE.CLOSE",145:"SAVE.WORKBOOK",146:"DATA.FORM",147:"COPY.CHART",148:"ON.TIME",149:"WAIT",150:"FORMAT.FONT",151:"FILL.UP",152:"FILL.LEFT",153:"DELETE.OVERLAY",155:"SHORT.MENUS",159:"SET.UPDATE.STATUS",161:"COLOR.PALETTE",162:"DELETE.STYLE",163:"WINDOW.RESTORE",164:"WINDOW.MAXIMIZE",166:"CHANGE.LINK",167:"CALCULATE.DOCUMENT",168:"ON.KEY",169:"APP.RESTORE",170:"APP.MOVE",171:"APP.SIZE",172:"APP.MINIMIZE",173:"APP.MAXIMIZE",174:"BRING.TO.FRONT",175:"SEND.TO.BACK",185:"MAIN.CHART.TYPE",186:"OVERLAY.CHART.TYPE",187:"SELECT.END",188:"OPEN.MAIL",189:"SEND.MAIL",190:"STANDARD.FONT",191:"CONSOLIDATE",192:"SORT.SPECIAL",193:"GALLERY.3D.AREA",194:"GALLERY.3D.COLUMN",195:"GALLERY.3D.LINE",196:"GALLERY.3D.PIE",197:"VIEW.3D",198:"GOAL.SEEK",199:"WORKGROUP",200:"FILL.GROUP",201:"UPDATE.LINK",202:"PROMOTE",203:"DEMOTE",204:"SHOW.DETAIL",206:"UNGROUP",207:"OBJECT.PROPERTIES",208:"SAVE.NEW.OBJECT",209:"SHARE",210:"SHARE.NAME",211:"DUPLICATE",212:"APPLY.STYLE",213:"ASSIGN.TO.OBJECT",214:"OBJECT.PROTECTION",215:"HIDE.OBJECT",216:"SET.EXTRACT",217:"CREATE.PUBLISHER",218:"SUBSCRIBE.TO",219:"ATTRIBUTES",220:"SHOW.TOOLBAR",222:"PRINT.PREVIEW",223:"EDIT.COLOR",224:"SHOW.LEVELS",225:"FORMAT.MAIN",226:"FORMAT.OVERLAY",227:"ON.RECALC",228:"EDIT.SERIES",229:"DEFINE.STYLE",240:"LINE.PRINT",243:"ENTER.DATA",249:"GALLERY.RADAR",250:"MERGE.STYLES",251:"EDITION.OPTIONS",252:"PASTE.PICTURE",253:"PASTE.PICTURE.LINK",254:"SPELLING",256:"ZOOM",259:"INSERT.OBJECT",260:"WINDOW.MINIMIZE",265:"SOUND.NOTE",266:"SOUND.PLAY",267:"FORMAT.SHAPE",268:"EXTEND.POLYGON",269:"FORMAT.AUTO",272:"GALLERY.3D.BAR",273:"GALLERY.3D.SURFACE",274:"FILL.AUTO",276:"CUSTOMIZE.TOOLBAR",277:"ADD.TOOL",278:"EDIT.OBJECT",279:"ON.DOUBLECLICK",280:"ON.ENTRY",281:"WORKBOOK.ADD",282:"WORKBOOK.MOVE",283:"WORKBOOK.COPY",284:"WORKBOOK.OPTIONS",285:"SAVE.WORKSPACE",288:"CHART.WIZARD",289:"DELETE.TOOL",290:"MOVE.TOOL",291:"WORKBOOK.SELECT",292:"WORKBOOK.ACTIVATE",293:"ASSIGN.TO.TOOL",295:"COPY.TOOL",296:"RESET.TOOL",297:"CONSTRAIN.NUMERIC",298:"PASTE.TOOL",302:"WORKBOOK.NEW",305:"SCENARIO.CELLS",306:"SCENARIO.DELETE",307:"SCENARIO.ADD",308:"SCENARIO.EDIT",309:"SCENARIO.SHOW",310:"SCENARIO.SHOW.NEXT",311:"SCENARIO.SUMMARY",312:"PIVOT.TABLE.WIZARD",313:"PIVOT.FIELD.PROPERTIES",314:"PIVOT.FIELD",315:"PIVOT.ITEM",316:"PIVOT.ADD.FIELDS",318:"OPTIONS.CALCULATION",319:"OPTIONS.EDIT",320:"OPTIONS.VIEW",321:"ADDIN.MANAGER",322:"MENU.EDITOR",323:"ATTACH.TOOLBARS",324:"VBAActivate",325:"OPTIONS.CHART",328:"VBA.INSERT.FILE",330:"VBA.PROCEDURE.DEFINITION",336:"ROUTING.SLIP",338:"ROUTE.DOCUMENT",339:"MAIL.LOGON",342:"INSERT.PICTURE",343:"EDIT.TOOL",344:"GALLERY.DOUGHNUT",350:"CHART.TREND",352:"PIVOT.ITEM.PROPERTIES",354:"WORKBOOK.INSERT",355:"OPTIONS.TRANSITION",356:"OPTIONS.GENERAL",370:"FILTER.ADVANCED",373:"MAIL.ADD.MAILER",374:"MAIL.DELETE.MAILER",375:"MAIL.REPLY",376:"MAIL.REPLY.ALL",377:"MAIL.FORWARD",378:"MAIL.NEXT.LETTER",379:"DATA.LABEL",380:"INSERT.TITLE",381:"FONT.PROPERTIES",382:"MACRO.OPTIONS",383:"WORKBOOK.HIDE",384:"WORKBOOK.UNHIDE",385:"WORKBOOK.DELETE",386:"WORKBOOK.NAME",388:"GALLERY.CUSTOM",390:"ADD.CHART.AUTOFORMAT",391:"DELETE.CHART.AUTOFORMAT",392:"CHART.ADD.DATA",393:"AUTO.OUTLINE",394:"TAB.ORDER",395:"SHOW.DIALOG",396:"SELECT.ALL",397:"UNGROUP.SHEETS",398:"SUBTOTAL.CREATE",399:"SUBTOTAL.REMOVE",400:"RENAME.OBJECT",412:"WORKBOOK.SCROLL",413:"WORKBOOK.NEXT",414:"WORKBOOK.PREV",415:"WORKBOOK.TAB.SPLIT",416:"FULL.SCREEN",417:"WORKBOOK.PROTECT",420:"SCROLLBAR.PROPERTIES",421:"PIVOT.SHOW.PAGES",422:"TEXT.TO.COLUMNS",423:"FORMAT.CHARTTYPE",424:"LINK.FORMAT",425:"TRACER.DISPLAY",430:"TRACER.NAVIGATE",431:"TRACER.CLEAR",432:"TRACER.ERROR",433:"PIVOT.FIELD.GROUP",434:"PIVOT.FIELD.UNGROUP",435:"CHECKBOX.PROPERTIES",436:"LABEL.PROPERTIES",437:"LISTBOX.PROPERTIES",438:"EDITBOX.PROPERTIES",439:"PIVOT.REFRESH",440:"LINK.COMBO",441:"OPEN.TEXT",442:"HIDE.DIALOG",443:"SET.DIALOG.FOCUS",444:"ENABLE.OBJECT",445:"PUSHBUTTON.PROPERTIES",446:"SET.DIALOG.DEFAULT",447:"FILTER",448:"FILTER.SHOW.ALL",449:"CLEAR.OUTLINE",450:"FUNCTION.WIZARD",451:"ADD.LIST.ITEM",452:"SET.LIST.ITEM",453:"REMOVE.LIST.ITEM",454:"SELECT.LIST.ITEM",455:"SET.CONTROL.VALUE",456:"SAVE.COPY.AS",458:"OPTIONS.LISTS.ADD",459:"OPTIONS.LISTS.DELETE",460:"SERIES.AXES",461:"SERIES.X",462:"SERIES.Y",463:"ERRORBAR.X",464:"ERRORBAR.Y",465:"FORMAT.CHART",466:"SERIES.ORDER",467:"MAIL.LOGOFF",468:"CLEAR.ROUTING.SLIP",469:"APP.ACTIVATE.MICROSOFT",470:"MAIL.EDIT.MAILER",471:"ON.SHEET",472:"STANDARD.WIDTH",473:"SCENARIO.MERGE",474:"SUMMARY.INFO",475:"FIND.FILE",476:"ACTIVE.CELL.FONT",477:"ENABLE.TIPWIZARD",478:"VBA.MAKE.ADDIN",480:"INSERTDATATABLE",481:"WORKGROUP.OPTIONS",482:"MAIL.SEND.MAILER",485:"AUTOCORRECT",489:"POST.DOCUMENT",491:"PICKLIST",493:"VIEW.SHOW",494:"VIEW.DEFINE",495:"VIEW.DELETE",509:"SHEET.BACKGROUND",510:"INSERT.MAP.OBJECT",511:"OPTIONS.MENONO",517:"MSOCHECKS",518:"NORMAL",519:"LAYOUT",520:"RM.PRINT.AREA",521:"CLEAR.PRINT.AREA",522:"ADD.PRINT.AREA",523:"MOVE.BRK",545:"HIDECURR.NOTE",546:"HIDEALL.NOTES",547:"DELETE.NOTE",548:"TRAVERSE.NOTES",549:"ACTIVATE.NOTES",620:"PROTECT.REVISIONS",621:"UNPROTECT.REVISIONS",647:"OPTIONS.ME",653:"WEB.PUBLISH",667:"NEWWEBQUERY",673:"PIVOT.TABLE.CHART",753:"OPTIONS.SAVE",755:"OPTIONS.SPELL",808:"HIDEALL.INKANNOTS"};var Ftab={0:"COUNT",1:"IF",2:"ISNA",3:"ISERROR",4:"SUM",5:"AVERAGE",6:"MIN",7:"MAX",8:"ROW",9:"COLUMN",10:"NA",11:"NPV",12:"STDEV",13:"DOLLAR",14:"FIXED",15:"SIN",16:"COS",17:"TAN",18:"ATAN",19:"PI",20:"SQRT",21:"EXP",22:"LN",23:"LOG10",24:"ABS",25:"INT",26:"SIGN",27:"ROUND",28:"LOOKUP",29:"INDEX",30:"REPT",31:"MID",32:"LEN",33:"VALUE",34:"TRUE",35:"FALSE",36:"AND",37:"OR",38:"NOT",39:"MOD",40:"DCOUNT",41:"DSUM",42:"DAVERAGE",43:"DMIN",44:"DMAX",45:"DSTDEV",46:"VAR",47:"DVAR",48:"TEXT",49:"LINEST",50:"TREND",51:"LOGEST",52:"GROWTH",53:"GOTO",54:"HALT",55:"RETURN",56:"PV",57:"FV",58:"NPER",59:"PMT",60:"RATE",61:"MIRR",62:"IRR",63:"RAND",64:"MATCH",65:"DATE",66:"TIME",67:"DAY",68:"MONTH",69:"YEAR",70:"WEEKDAY",71:"HOUR",72:"MINUTE",73:"SECOND",74:"NOW",75:"AREAS",76:"ROWS",77:"COLUMNS",78:"OFFSET",79:"ABSREF",80:"RELREF",81:"ARGUMENT",82:"SEARCH",83:"TRANSPOSE",84:"ERROR",85:"STEP",86:"TYPE",87:"ECHO",88:"SET.NAME",89:"CALLER",90:"DEREF",91:"WINDOWS",92:"SERIES",93:"DOCUMENTS",94:"ACTIVE.CELL",95:"SELECTION",96:"RESULT",97:"ATAN2",98:"ASIN",99:"ACOS",100:"CHOOSE",101:"HLOOKUP",102:"VLOOKUP",103:"LINKS",104:"INPUT",105:"ISREF",106:"GET.FORMULA",107:"GET.NAME",108:"SET.VALUE",109:"LOG",110:"EXEC",111:"CHAR",112:"LOWER",113:"UPPER",114:"PROPER",115:"LEFT",116:"RIGHT",117:"EXACT",118:"TRIM",119:"REPLACE",120:"SUBSTITUTE",121:"CODE",122:"NAMES",123:"DIRECTORY",124:"FIND",125:"CELL",126:"ISERR",127:"ISTEXT",128:"ISNUMBER",129:"ISBLANK",130:"T",131:"N",132:"FOPEN",133:"FCLOSE",134:"FSIZE",135:"FREADLN",136:"FREAD",137:"FWRITELN",138:"FWRITE",139:"FPOS",140:"DATEVALUE",141:"TIMEVALUE",142:"SLN",143:"SYD",144:"DDB",145:"GET.DEF",146:"REFTEXT",147:"TEXTREF",148:"INDIRECT",149:"REGISTER",150:"CALL",151:"ADD.BAR",152:"ADD.MENU",153:"ADD.COMMAND",154:"ENABLE.COMMAND",155:"CHECK.COMMAND",156:"RENAME.COMMAND",157:"SHOW.BAR",158:"DELETE.MENU",159:"DELETE.COMMAND",160:"GET.CHART.ITEM",161:"DIALOG.BOX",162:"CLEAN",163:"MDETERM",164:"MINVERSE",165:"MMULT",166:"FILES",167:"IPMT",168:"PPMT",169:"COUNTA",170:"CANCEL.KEY",171:"FOR",172:"WHILE",173:"BREAK",174:"NEXT",175:"INITIATE",176:"REQUEST",177:"POKE",178:"EXECUTE",179:"TERMINATE",180:"RESTART",181:"HELP",182:"GET.BAR",183:"PRODUCT",184:"FACT",185:"GET.CELL",186:"GET.WORKSPACE",187:"GET.WINDOW",188:"GET.DOCUMENT",189:"DPRODUCT",190:"ISNONTEXT",191:"GET.NOTE",192:"NOTE",193:"STDEVP",194:"VARP",195:"DSTDEVP",196:"DVARP",197:"TRUNC",198:"ISLOGICAL",199:"DCOUNTA",200:"DELETE.BAR",201:"UNREGISTER",204:"USDOLLAR",205:"FINDB",206:"SEARCHB",207:"REPLACEB",208:"LEFTB",209:"RIGHTB",210:"MIDB",211:"LENB",212:"ROUNDUP",213:"ROUNDDOWN",214:"ASC",215:"DBCS",216:"RANK",219:"ADDRESS",220:"DAYS360",221:"TODAY",222:"VDB",223:"ELSE",224:"ELSE.IF",225:"END.IF",226:"FOR.CELL",227:"MEDIAN",228:"SUMPRODUCT",229:"SINH",230:"COSH",231:"TANH",232:"ASINH",233:"ACOSH",234:"ATANH",235:"DGET",236:"CREATE.OBJECT",237:"VOLATILE",238:"LAST.ERROR",239:"CUSTOM.UNDO",240:"CUSTOM.REPEAT",241:"FORMULA.CONVERT",242:"GET.LINK.INFO",243:"TEXT.BOX",244:"INFO",245:"GROUP",246:"GET.OBJECT",247:"DB",248:"PAUSE",251:"RESUME",252:"FREQUENCY",253:"ADD.TOOLBAR",254:"DELETE.TOOLBAR",255:"User",256:"RESET.TOOLBAR",257:"EVALUATE",258:"GET.TOOLBAR",259:"GET.TOOL",260:"SPELLING.CHECK",261:"ERROR.TYPE",262:"APP.TITLE",263:"WINDOW.TITLE",264:"SAVE.TOOLBAR",265:"ENABLE.TOOL",266:"PRESS.TOOL",267:"REGISTER.ID",268:"GET.WORKBOOK",269:"AVEDEV",270:"BETADIST",271:"GAMMALN",272:"BETAINV",273:"BINOMDIST",274:"CHIDIST",275:"CHIINV",276:"COMBIN",277:"CONFIDENCE",278:"CRITBINOM",279:"EVEN",280:"EXPONDIST",281:"FDIST",282:"FINV",283:"FISHER",284:"FISHERINV",285:"FLOOR",286:"GAMMADIST",287:"GAMMAINV",288:"CEILING",289:"HYPGEOMDIST",290:"LOGNORMDIST",291:"LOGINV",292:"NEGBINOMDIST",293:"NORMDIST",294:"NORMSDIST",295:"NORMINV",296:"NORMSINV",297:"STANDARDIZE",298:"ODD",299:"PERMUT",300:"POISSON",301:"TDIST",302:"WEIBULL",303:"SUMXMY2",304:"SUMX2MY2",305:"SUMX2PY2",306:"CHITEST",307:"CORREL",308:"COVAR",309:"FORECAST",310:"FTEST",311:"INTERCEPT",312:"PEARSON",313:"RSQ",314:"STEYX",315:"SLOPE",316:"TTEST",317:"PROB",318:"DEVSQ",319:"GEOMEAN",320:"HARMEAN",321:"SUMSQ",322:"KURT",323:"SKEW",324:"ZTEST",325:"LARGE",326:"SMALL",327:"QUARTILE",328:"PERCENTILE",329:"PERCENTRANK",330:"MODE",331:"TRIMMEAN",332:"TINV",334:"MOVIE.COMMAND",335:"GET.MOVIE",336:"CONCATENATE",337:"POWER",338:"PIVOT.ADD.DATA",339:"GET.PIVOT.TABLE",340:"GET.PIVOT.FIELD",341:"GET.PIVOT.ITEM",342:"RADIANS",343:"DEGREES",344:"SUBTOTAL",345:"SUMIF",346:"COUNTIF",347:"COUNTBLANK",348:"SCENARIO.GET",349:"OPTIONS.LISTS.GET",350:"ISPMT",351:"DATEDIF",352:"DATESTRING",353:"NUMBERSTRING",354:"ROMAN",355:"OPEN.DIALOG",356:"SAVE.DIALOG",357:"VIEW.GET",358:"GETPIVOTDATA",359:"HYPERLINK",360:"PHONETIC",361:"AVERAGEA",362:"MAXA",363:"MINA",364:"STDEVPA",365:"VARPA",366:"STDEVA",367:"VARA",368:"BAHTTEXT",369:"THAIDAYOFWEEK",370:"THAIDIGIT",371:"THAIMONTHOFYEAR",372:"THAINUMSOUND",373:"THAINUMSTRING",374:"THAISTRINGLENGTH",375:"ISTHAIDIGIT",376:"ROUNDBAHTDOWN",377:"ROUNDBAHTUP",378:"THAIYEAR",379:"RTD"};var FtabArgc={2:1,3:1,15:1,16:1,17:1,18:1,20:1,21:1,22:1,23:1,24:1,25:1,26:1,27:2,30:2,31:3,32:1,33:1,38:1,39:2,40:3,41:3,42:3,43:3,44:3,45:3,47:3,48:2,53:1,61:3,65:3,66:3,67:1,68:1,69:1,71:1,72:1,73:1,75:1,76:1,77:1,79:2,80:2,83:1,86:1,90:1,97:2,98:1,99:1,105:1,111:1,112:1,113:1,114:1,117:2,118:1,119:4,121:1,126:1,127:1,128:1,129:1,130:1,131:1,133:1,134:1,135:1,136:2,137:2,138:2,140:1,141:1,142:3,143:4,162:1,163:1,164:1,165:2,172:1,175:2,176:2,177:3,178:2,179:1,184:1,189:3,190:1,195:3,196:3,198:1,199:3,201:1,207:4,210:3,211:1,212:2,213:2,214:1,215:1,229:1,230:1,231:1,232:1,233:1,234:1,235:3,244:1,252:2,257:1,261:1,271:1,273:4,274:2,275:2,276:2,277:3,278:3,279:1,280:3,281:3,282:3,283:1,284:1,285:2,286:4,287:3,288:2,289:4,290:3,291:3,292:3,293:4,294:1,295:3,296:1,297:3,298:1,299:2,300:3,301:3,302:4,303:2,304:2,305:2,306:2,307:2,308:2,309:3,310:2,311:2,312:2,313:2,314:2,315:2,316:4,325:2,326:2,327:2,328:2,331:2,332:2,337:2,342:1,343:1,346:2,347:1,350:4,351:3,352:1,353:2,360:1,368:1,369:1,370:1,371:1,372:1,373:1,374:1,375:1,376:1,377:1,378:1,65535:0};var XLSXFutureFunctions={"_xlfn.ACOT":"ACOT","_xlfn.ACOTH":"ACOTH","_xlfn.AGGREGATE":"AGGREGATE","_xlfn.ARABIC":"ARABIC","_xlfn.AVERAGEIF":"AVERAGEIF","_xlfn.AVERAGEIFS":"AVERAGEIFS","_xlfn.BASE":"BASE","_xlfn.BETA.DIST":"BETA.DIST","_xlfn.BETA.INV":"BETA.INV","_xlfn.BINOM.DIST":"BINOM.DIST","_xlfn.BINOM.DIST.RANGE":"BINOM.DIST.RANGE","_xlfn.BINOM.INV":"BINOM.INV","_xlfn.BITAND":"BITAND","_xlfn.BITLSHIFT":"BITLSHIFT","_xlfn.BITOR":"BITOR","_xlfn.BITRSHIFT":"BITRSHIFT","_xlfn.BITXOR":"BITXOR","_xlfn.CEILING.MATH":"CEILING.MATH","_xlfn.CEILING.PRECISE":"CEILING.PRECISE","_xlfn.CHISQ.DIST":"CHISQ.DIST","_xlfn.CHISQ.DIST.RT":"CHISQ.DIST.RT","_xlfn.CHISQ.INV":"CHISQ.INV","_xlfn.CHISQ.INV.RT":"CHISQ.INV.RT","_xlfn.CHISQ.TEST":"CHISQ.TEST","_xlfn.COMBINA":"COMBINA","_xlfn.CONFIDENCE.NORM":"CONFIDENCE.NORM","_xlfn.CONFIDENCE.T":"CONFIDENCE.T","_xlfn.COT":"COT","_xlfn.COTH":"COTH","_xlfn.COUNTIFS":"COUNTIFS","_xlfn.COVARIANCE.P":"COVARIANCE.P","_xlfn.COVARIANCE.S":"COVARIANCE.S","_xlfn.CSC":"CSC","_xlfn.CSCH":"CSCH","_xlfn.DAYS":"DAYS","_xlfn.DECIMAL":"DECIMAL","_xlfn.ECMA.CEILING":"ECMA.CEILING","_xlfn.ERF.PRECISE":"ERF.PRECISE","_xlfn.ERFC.PRECISE":"ERFC.PRECISE","_xlfn.EXPON.DIST":"EXPON.DIST","_xlfn.F.DIST":"F.DIST","_xlfn.F.DIST.RT":"F.DIST.RT","_xlfn.F.INV":"F.INV","_xlfn.F.INV.RT":"F.INV.RT","_xlfn.F.TEST":"F.TEST","_xlfn.FILTERXML":"FILTERXML","_xlfn.FLOOR.MATH":"FLOOR.MATH","_xlfn.FLOOR.PRECISE":"FLOOR.PRECISE","_xlfn.FORMULATEXT":"FORMULATEXT","_xlfn.GAMMA":"GAMMA","_xlfn.GAMMA.DIST":"GAMMA.DIST","_xlfn.GAMMA.INV":"GAMMA.INV","_xlfn.GAMMALN.PRECISE":"GAMMALN.PRECISE","_xlfn.GAUSS":"GAUSS","_xlfn.HYPGEOM.DIST":"HYPGEOM.DIST","_xlfn.IFNA":"IFNA","_xlfn.IFERROR":"IFERROR","_xlfn.IMCOSH":"IMCOSH","_xlfn.IMCOT":"IMCOT","_xlfn.IMCSC":"IMCSC","_xlfn.IMCSCH":"IMCSCH","_xlfn.IMSEC":"IMSEC","_xlfn.IMSECH":"IMSECH","_xlfn.IMSINH":"IMSINH","_xlfn.IMTAN":"IMTAN","_xlfn.ISFORMULA":"ISFORMULA","_xlfn.ISO.CEILING":"ISO.CEILING","_xlfn.ISOWEEKNUM":"ISOWEEKNUM","_xlfn.LOGNORM.DIST":"LOGNORM.DIST","_xlfn.LOGNORM.INV":"LOGNORM.INV","_xlfn.MODE.MULT":"MODE.MULT","_xlfn.MODE.SNGL":"MODE.SNGL","_xlfn.MUNIT":"MUNIT","_xlfn.NEGBINOM.DIST":"NEGBINOM.DIST","_xlfn.NETWORKDAYS.INTL":"NETWORKDAYS.INTL","_xlfn.NIGBINOM":"NIGBINOM","_xlfn.NORM.DIST":"NORM.DIST","_xlfn.NORM.INV":"NORM.INV","_xlfn.NORM.S.DIST":"NORM.S.DIST","_xlfn.NORM.S.INV":"NORM.S.INV","_xlfn.NUMBERVALUE":"NUMBERVALUE","_xlfn.PDURATION":"PDURATION","_xlfn.PERCENTILE.EXC":"PERCENTILE.EXC","_xlfn.PERCENTILE.INC":"PERCENTILE.INC","_xlfn.PERCENTRANK.EXC":"PERCENTRANK.EXC","_xlfn.PERCENTRANK.INC":"PERCENTRANK.INC","_xlfn.PERMUTATIONA":"PERMUTATIONA","_xlfn.PHI":"PHI","_xlfn.POISSON.DIST":"POISSON.DIST","_xlfn.QUARTILE.EXC":"QUARTILE.EXC","_xlfn.QUARTILE.INC":"QUARTILE.INC","_xlfn.QUERYSTRING":"QUERYSTRING","_xlfn.RANK.AVG":"RANK.AVG","_xlfn.RANK.EQ":"RANK.EQ","_xlfn.RRI":"RRI","_xlfn.SEC":"SEC","_xlfn.SECH":"SECH","_xlfn.SHEET":"SHEET","_xlfn.SHEETS":"SHEETS","_xlfn.SKEW.P":"SKEW.P","_xlfn.STDEV.P":"STDEV.P","_xlfn.STDEV.S":"STDEV.S","_xlfn.SUMIFS":"SUMIFS","_xlfn.T.DIST":"T.DIST","_xlfn.T.DIST.2T":"T.DIST.2T","_xlfn.T.DIST.RT":"T.DIST.RT","_xlfn.T.INV":"T.INV","_xlfn.T.INV.2T":"T.INV.2T","_xlfn.T.TEST":"T.TEST","_xlfn.UNICHAR":"UNICHAR","_xlfn.UNICODE":"UNICODE","_xlfn.VAR.P":"VAR.P","_xlfn.VAR.S":"VAR.S","_xlfn.WEBSERVICE":"WEBSERVICE","_xlfn.WEIBULL.DIST":"WEIBULL.DIST","_xlfn.WORKDAY.INTL":"WORKDAY.INTL","_xlfn.XOR":"XOR","_xlfn.Z.TEST":"Z.TEST"};var strs={};var _ssfopts={};RELS.WS="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet";function get_sst_id(sst,str){for(var i=0,len=sst.length;i<len;++i)if(sst[i].t===str){sst.Count++;return i}sst[len]={t:str};sst.Count++;sst.Unique++;return len}function get_cell_style(styles,cell,opts){var z=opts.revssf[cell.z!=null?cell.z:"General"];for(var i=0,len=styles.length;i!=len;++i)if(styles[i].numFmtId===z)return i;styles[len]={numFmtId:z,fontId:0,fillId:0,borderId:0,xfId:0,applyNumberFormat:1};return len}function safe_format(p,fmtid,fillid,opts){try{if(p.t==="e")p.w=p.w||BErr[p.v];else if(fmtid===0){if(p.t==="n"){if((p.v|0)===p.v)p.w=SSF._general_int(p.v,_ssfopts);else p.w=SSF._general_num(p.v,_ssfopts)}else if(p.t==="d"){var dd=datenum(p.v);if((dd|0)===dd)p.w=SSF._general_int(dd,_ssfopts);else p.w=SSF._general_num(dd,_ssfopts)}else if(p.v===undefined)return"";else p.w=SSF._general(p.v,_ssfopts)}else if(p.t==="d")p.w=SSF.format(fmtid,datenum(p.v),_ssfopts);else p.w=SSF.format(fmtid,p.v,_ssfopts);if(opts.cellNF)p.z=SSF._table[fmtid]}catch(e){if(opts.WTF)throw e}if(fillid)try{p.s=styles.Fills[fillid];if(p.s.fgColor&&p.s.fgColor.theme){p.s.fgColor.rgb=rgb_tint(themes.themeElements.clrScheme[p.s.fgColor.theme].rgb,p.s.fgColor.tint||0);if(opts.WTF)p.s.fgColor.raw_rgb=themes.themeElements.clrScheme[p.s.fgColor.theme].rgb}if(p.s.bgColor&&p.s.bgColor.theme){p.s.bgColor.rgb=rgb_tint(themes.themeElements.clrScheme[p.s.bgColor.theme].rgb,p.s.bgColor.tint||0);if(opts.WTF)p.s.bgColor.raw_rgb=themes.themeElements.clrScheme[p.s.bgColor.theme].rgb}}catch(e){if(opts.WTF)throw e}}function parse_ws_xml_dim(ws,s){var d=safe_decode_range(s);if(d.s.r<=d.e.r&&d.s.c<=d.e.c&&d.s.r>=0&&d.s.c>=0)ws["!ref"]=encode_range(d)}var mergecregex=/<mergeCell ref="[A-Z0-9:]+"\s*\/>/g;var sheetdataregex=/<(?:\w+:)?sheetData>([^\u2603]*)<\/(?:\w+:)?sheetData>/;var hlinkregex=/<hyperlink[^>]*\/>/g;var dimregex=/"(\w*:\w*)"/;var colregex=/<col[^>]*\/>/g;function parse_ws_xml(data,opts,rels){if(!data)return data;var s={};var ridx=data.indexOf("<dimension");if(ridx>0){var ref=data.substr(ridx,50).match(dimregex);if(ref!=null)parse_ws_xml_dim(s,ref[1])}var mergecells=[];if(data.indexOf("</mergeCells>")!==-1){var merges=data.match(mergecregex);for(ridx=0;ridx!=merges.length;++ridx)mergecells[ridx]=safe_decode_range(merges[ridx].substr(merges[ridx].indexOf('"')+1))}var columns=[];if(opts.cellStyles&&data.indexOf("</cols>")!==-1){var cols=data.match(colregex);parse_ws_xml_cols(columns,cols)}var refguess={s:{r:1e6,c:1e6},e:{r:0,c:0}};var mtch=data.match(sheetdataregex);if(mtch)parse_ws_xml_data(mtch[1],s,opts,refguess);if(data.indexOf("</hyperlinks>")!==-1)parse_ws_xml_hlinks(s,data.match(hlinkregex),rels);if(!s["!ref"]&&refguess.e.c>=refguess.s.c&&refguess.e.r>=refguess.s.r)s["!ref"]=encode_range(refguess);if(opts.sheetRows>0&&s["!ref"]){var tmpref=safe_decode_range(s["!ref"]);if(opts.sheetRows<+tmpref.e.r){tmpref.e.r=opts.sheetRows-1;if(tmpref.e.r>refguess.e.r)tmpref.e.r=refguess.e.r;if(tmpref.e.r<tmpref.s.r)tmpref.s.r=tmpref.e.r;if(tmpref.e.c>refguess.e.c)tmpref.e.c=refguess.e.c;if(tmpref.e.c<tmpref.s.c)tmpref.s.c=tmpref.e.c;s["!fullref"]=s["!ref"];s["!ref"]=encode_range(tmpref)}}if(mergecells.length>0)s["!merges"]=mergecells;if(columns.length>0)s["!cols"]=columns;return s}function write_ws_xml_merges(merges){if(merges.length==0)return"";var o='<mergeCells count="'+merges.length+'">';for(var i=0;i!=merges.length;++i)o+='<mergeCell ref="'+encode_range(merges[i])+'"/>';return o+"</mergeCells>"}function parse_ws_xml_hlinks(s,data,rels){for(var i=0;i!=data.length;++i){var val=parsexmltag(data[i],true);if(!val.ref)return;var rel=rels?rels["!id"][val.id]:null;if(rel){val.Target=rel.Target;if(val.location)val.Target+="#"+val.location;val.Rel=rel}else{val.Target=val.location;rel={Target:val.location,TargetMode:"Internal"};val.Rel=rel}var rng=safe_decode_range(val.ref);for(var R=rng.s.r;R<=rng.e.r;++R)for(var C=rng.s.c;C<=rng.e.c;++C){var addr=encode_cell({c:C,r:R});if(!s[addr])s[addr]={t:"stub",v:undefined};s[addr].l=val}}}function parse_ws_xml_cols(columns,cols){var seencol=false;for(var coli=0;coli!=cols.length;++coli){var coll=parsexmltag(cols[coli],true);var colm=parseInt(coll.min,10)-1,colM=parseInt(coll.max,10)-1;delete coll.min;delete coll.max;if(!seencol&&coll.width){seencol=true;find_mdw(+coll.width,coll)}if(coll.width){coll.wpx=width2px(+coll.width);coll.wch=px2char(coll.wpx);coll.MDW=MDW}while(colm<=colM)columns[colm++]=coll}}function write_ws_xml_cols(ws,cols){var o=["<cols>"],col,width;for(var i=0;i!=cols.length;++i){if(!(col=cols[i]))continue;var p={min:i+1,max:i+1};width=-1;if(col.wpx)width=px2char(col.wpx);else if(col.wch)width=col.wch;if(width>-1){p.width=char2width(width);p.customWidth=1}o[o.length]=writextag("col",null,p)}o[o.length]="</cols>";return o.join("")
}function write_ws_xml_cell(cell,ref,ws,opts,idx,wb){if(cell.v===undefined)return"";var vv="";var oldt=cell.t,oldv=cell.v;switch(cell.t){case"b":vv=cell.v?"1":"0";break;case"n":vv=""+cell.v;break;case"e":vv=BErr[cell.v];break;case"d":if(opts.cellDates)vv=new Date(cell.v).toISOString();else{cell.t="n";vv=""+(cell.v=datenum(cell.v));if(typeof cell.z==="undefined")cell.z=SSF._table[14]}break;default:vv=cell.v;break}var v=writetag("v",escapexml(vv)),o={r:ref};var os=get_cell_style(opts.cellXfs,cell,opts);if(os!==0)o.s=os;switch(cell.t){case"n":break;case"d":o.t="d";break;case"b":o.t="b";break;case"e":o.t="e";break;default:if(opts.bookSST){v=writetag("v",""+get_sst_id(opts.Strings,cell.v));o.t="s";break}o.t="str";break}if(cell.t!=oldt){cell.t=oldt;cell.v=oldv}return writextag("c",v,o)}var parse_ws_xml_data=function parse_ws_xml_data_factory(){var cellregex=/<(?:\w+:)?c[ >]/,rowregex=/<\/(?:\w+:)?row>/;var rregex=/r=["']([^"']*)["']/,isregex=/<is>([\S\s]*?)<\/is>/;var match_v=matchtag("v"),match_f=matchtag("f");return function parse_ws_xml_data(sdata,s,opts,guess){var ri=0,x="",cells=[],cref=[],idx=0,i=0,cc=0,d="",p;var tag,tagr=0,tagc=0;var sstr;var fmtid=0,fillid=0,do_format=Array.isArray(styles.CellXf),cf;for(var marr=sdata.split(rowregex),mt=0,marrlen=marr.length;mt!=marrlen;++mt){x=marr[mt].trim();var xlen=x.length;if(xlen===0)continue;for(ri=0;ri<xlen;++ri)if(x.charCodeAt(ri)===62)break;++ri;tag=parsexmltag(x.substr(0,ri),true);tagr=typeof tag.r!=="undefined"?parseInt(tag.r,10):tagr+1;tagc=-1;if(opts.sheetRows&&opts.sheetRows<tagr)continue;if(guess.s.r>tagr-1)guess.s.r=tagr-1;if(guess.e.r<tagr-1)guess.e.r=tagr-1;cells=x.substr(ri).split(cellregex);for(ri=typeof tag.r==="undefined"?0:1;ri!=cells.length;++ri){x=cells[ri].trim();if(x.length===0)continue;cref=x.match(rregex);idx=ri;i=0;cc=0;x="<c "+(x.substr(0,1)=="<"?">":"")+x;if(cref!==null&&cref.length===2){idx=0;d=cref[1];for(i=0;i!=d.length;++i){if((cc=d.charCodeAt(i)-64)<1||cc>26)break;idx=26*idx+cc}--idx;tagc=idx}else++tagc;for(i=0;i!=x.length;++i)if(x.charCodeAt(i)===62)break;++i;tag=parsexmltag(x.substr(0,i),true);if(!tag.r)tag.r=utils.encode_cell({r:tagr-1,c:tagc});d=x.substr(i);p={t:""};if((cref=d.match(match_v))!==null&&cref[1]!=="")p.v=unescapexml(cref[1]);if(opts.cellFormula&&(cref=d.match(match_f))!==null)p.f=unescapexml(cref[1]);if(tag.t===undefined&&p.v===undefined){if(!opts.sheetStubs)continue;p.t="stub"}else p.t=tag.t||"n";if(guess.s.c>idx)guess.s.c=idx;if(guess.e.c<idx)guess.e.c=idx;switch(p.t){case"n":p.v=parseFloat(p.v);break;case"s":sstr=strs[parseInt(p.v,10)];p.v=sstr.t;p.r=sstr.r;if(opts.cellHTML)p.h=sstr.h;break;case"str":p.t="s";p.v=p.v!=null?utf8read(p.v):"";if(opts.cellHTML)p.h=p.v;break;case"inlineStr":cref=d.match(isregex);p.t="s";if(cref!==null){sstr=parse_si(cref[1]);p.v=sstr.t}else p.v="";break;case"b":p.v=parsexmlbool(p.v);break;case"d":if(!opts.cellDates){p.v=datenum(p.v);p.t="n"}break;case"e":p.w=p.v;p.v=RBErr[p.v];break}fmtid=fillid=0;if(do_format&&tag.s!==undefined){cf=styles.CellXf[tag.s];if(cf!=null){if(cf.numFmtId!=null)fmtid=cf.numFmtId;if(opts.cellStyles&&cf.fillId!=null)fillid=cf.fillId}}safe_format(p,fmtid,fillid,opts);s[tag.r]=p}}}}();function write_ws_xml_data(ws,opts,idx,wb){var o=[],r=[],range=safe_decode_range(ws["!ref"]),cell,ref,rr="",cols=[],R,C;for(C=range.s.c;C<=range.e.c;++C)cols[C]=encode_col(C);for(R=range.s.r;R<=range.e.r;++R){r=[];rr=encode_row(R);for(C=range.s.c;C<=range.e.c;++C){ref=cols[C]+rr;if(ws[ref]===undefined)continue;if((cell=write_ws_xml_cell(ws[ref],ref,ws,opts,idx,wb))!=null)r.push(cell)}if(r.length>0)o[o.length]=writextag("row",r.join(""),{r:rr})}return o.join("")}var WS_XML_ROOT=writextag("worksheet",null,{xmlns:XMLNS.main[0],"xmlns:r":XMLNS.r});function write_ws_xml(idx,opts,wb){var o=[XML_HEADER,WS_XML_ROOT];var s=wb.SheetNames[idx],sidx=0,rdata="";var ws=wb.Sheets[s];if(ws===undefined)ws={};var ref=ws["!ref"];if(ref===undefined)ref="A1";o[o.length]=writextag("dimension",null,{ref:ref});if(ws["!cols"]!==undefined&&ws["!cols"].length>0)o[o.length]=write_ws_xml_cols(ws,ws["!cols"]);o[sidx=o.length]="<sheetData/>";if(ws["!ref"]!==undefined){rdata=write_ws_xml_data(ws,opts,idx,wb);if(rdata.length>0)o[o.length]=rdata}if(o.length>sidx+1){o[o.length]="</sheetData>";o[sidx]=o[sidx].replace("/>",">")}if(ws["!merges"]!==undefined&&ws["!merges"].length>0)o[o.length]=write_ws_xml_merges(ws["!merges"]);if(o.length>2){o[o.length]="</worksheet>";o[1]=o[1].replace("/>",">")}return o.join("")}function parse_BrtRowHdr(data,length){var z=[];z.r=data.read_shift(4);data.l+=length-4;return z}var parse_BrtWsDim=parse_UncheckedRfX;var write_BrtWsDim=write_UncheckedRfX;function parse_BrtWsProp(data,length){var z={};data.l+=19;z.name=parse_XLSBCodeName(data,length-19);return z}function parse_BrtCellBlank(data,length){var cell=parse_XLSBCell(data);return[cell]}function write_BrtCellBlank(cell,val,o){if(o==null)o=new_buf(8);return write_XLSBCell(val,o)}function parse_BrtCellBool(data,length){var cell=parse_XLSBCell(data);var fBool=data.read_shift(1);return[cell,fBool,"b"]}function parse_BrtCellError(data,length){var cell=parse_XLSBCell(data);var fBool=data.read_shift(1);return[cell,fBool,"e"]}function parse_BrtCellIsst(data,length){var cell=parse_XLSBCell(data);var isst=data.read_shift(4);return[cell,isst,"s"]}function parse_BrtCellReal(data,length){var cell=parse_XLSBCell(data);var value=parse_Xnum(data);return[cell,value,"n"]}function parse_BrtCellRk(data,length){var cell=parse_XLSBCell(data);var value=parse_RkNumber(data);return[cell,value,"n"]}function parse_BrtCellSt(data,length){var cell=parse_XLSBCell(data);var value=parse_XLWideString(data);return[cell,value,"str"]}function parse_BrtFmlaBool(data,length,opts){var cell=parse_XLSBCell(data);var value=data.read_shift(1);var o=[cell,value,"b"];if(opts.cellFormula){var formula=parse_XLSBCellParsedFormula(data,length-9);o[3]=""}else data.l+=length-9;return o}function parse_BrtFmlaError(data,length,opts){var cell=parse_XLSBCell(data);var value=data.read_shift(1);var o=[cell,value,"e"];if(opts.cellFormula){var formula=parse_XLSBCellParsedFormula(data,length-9);o[3]=""}else data.l+=length-9;return o}function parse_BrtFmlaNum(data,length,opts){var cell=parse_XLSBCell(data);var value=parse_Xnum(data);var o=[cell,value,"n"];if(opts.cellFormula){var formula=parse_XLSBCellParsedFormula(data,length-16);o[3]=""}else data.l+=length-16;return o}function parse_BrtFmlaString(data,length,opts){var start=data.l;var cell=parse_XLSBCell(data);var value=parse_XLWideString(data);var o=[cell,value,"str"];if(opts.cellFormula){var formula=parse_XLSBCellParsedFormula(data,start+length-data.l)}else data.l=start+length;return o}var parse_BrtMergeCell=parse_UncheckedRfX;function parse_BrtHLink(data,length,opts){var end=data.l+length;var rfx=parse_UncheckedRfX(data,16);var relId=parse_XLNullableWideString(data);var loc=parse_XLWideString(data);var tooltip=parse_XLWideString(data);var display=parse_XLWideString(data);data.l=end;return{rfx:rfx,relId:relId,loc:loc,tooltip:tooltip,display:display}}function parse_ws_bin(data,opts,rels){if(!data)return data;if(!rels)rels={"!id":{}};var s={};var ref;var refguess={s:{r:1e6,c:1e6},e:{r:0,c:0}};var pass=false,end=false;var row,p,cf,R,C,addr,sstr,rr;var mergecells=[];recordhopper(data,function ws_parse(val,R){if(end)return;switch(R.n){case"BrtWsDim":ref=val;break;case"BrtRowHdr":row=val;if(opts.sheetRows&&opts.sheetRows<=row.r)end=true;rr=encode_row(row.r);break;case"BrtFmlaBool":case"BrtFmlaError":case"BrtFmlaNum":case"BrtFmlaString":case"BrtCellBool":case"BrtCellError":case"BrtCellIsst":case"BrtCellReal":case"BrtCellRk":case"BrtCellSt":p={t:val[2]};switch(val[2]){case"n":p.v=val[1];break;case"s":sstr=strs[val[1]];p.v=sstr.t;p.r=sstr.r;break;case"b":p.v=val[1]?true:false;break;case"e":p.v=val[1];p.w=BErr[p.v];break;case"str":p.t="s";p.v=utf8read(val[1]);break}if(opts.cellFormula&&val.length>3)p.f=val[3];if(cf=styles.CellXf[val[0].iStyleRef])safe_format(p,cf.ifmt,null,opts);s[encode_col(C=val[0].c)+rr]=p;if(refguess.s.r>row.r)refguess.s.r=row.r;if(refguess.s.c>C)refguess.s.c=C;if(refguess.e.r<row.r)refguess.e.r=row.r;if(refguess.e.c<C)refguess.e.c=C;break;case"BrtCellBlank":if(!opts.sheetStubs)break;p={t:"s",v:undefined};s[encode_col(C=val[0].c)+rr]=p;if(refguess.s.r>row.r)refguess.s.r=row.r;if(refguess.s.c>C)refguess.s.c=C;if(refguess.e.r<row.r)refguess.e.r=row.r;if(refguess.e.c<C)refguess.e.c=C;break;case"BrtBeginMergeCells":break;case"BrtEndMergeCells":break;case"BrtMergeCell":mergecells.push(val);break;case"BrtHLink":var rel=rels["!id"][val.relId];if(rel){val.Target=rel.Target;if(val.loc)val.Target+="#"+val.loc;val.Rel=rel}for(R=val.rfx.s.r;R<=val.rfx.e.r;++R)for(C=val.rfx.s.c;C<=val.rfx.e.c;++C){addr=encode_cell({c:C,r:R});if(!s[addr])s[addr]={t:"s",v:undefined};s[addr].l=val}break;case"BrtArrFmla":break;case"BrtShrFmla":break;case"BrtBeginSheet":break;case"BrtWsProp":break;case"BrtSheetCalcProp":break;case"BrtBeginWsViews":break;case"BrtBeginWsView":break;case"BrtPane":break;case"BrtSel":break;case"BrtEndWsView":break;case"BrtEndWsViews":break;case"BrtACBegin":break;case"BrtRwDescent":break;case"BrtACEnd":break;case"BrtWsFmtInfoEx14":break;case"BrtWsFmtInfo":break;case"BrtBeginColInfos":break;case"BrtColInfo":break;case"BrtEndColInfos":break;case"BrtBeginSheetData":break;case"BrtEndSheetData":break;case"BrtSheetProtection":break;case"BrtPrintOptions":break;case"BrtMargins":break;case"BrtPageSetup":break;case"BrtFRTBegin":pass=true;break;case"BrtFRTEnd":pass=false;break;case"BrtEndSheet":break;case"BrtDrawing":break;case"BrtLegacyDrawing":break;case"BrtLegacyDrawingHF":break;case"BrtPhoneticInfo":break;case"BrtBeginHeaderFooter":break;case"BrtEndHeaderFooter":break;case"BrtBrk":break;case"BrtBeginRwBrk":break;case"BrtEndRwBrk":break;case"BrtBeginColBrk":break;case"BrtEndColBrk":break;case"BrtBeginUserShViews":break;case"BrtBeginUserShView":break;case"BrtEndUserShView":break;case"BrtEndUserShViews":break;case"BrtBkHim":break;case"BrtBeginOleObjects":break;case"BrtOleObject":break;case"BrtEndOleObjects":break;case"BrtBeginListParts":break;case"BrtListPart":break;case"BrtEndListParts":break;case"BrtBeginSortState":break;case"BrtBeginSortCond":break;case"BrtEndSortCond":break;case"BrtEndSortState":break;case"BrtBeginConditionalFormatting":break;case"BrtEndConditionalFormatting":break;case"BrtBeginCFRule":break;case"BrtEndCFRule":break;case"BrtBeginDVals":break;case"BrtDVal":break;case"BrtEndDVals":break;case"BrtRangeProtection":break;case"BrtBeginDCon":break;case"BrtEndDCon":break;case"BrtBeginDRefs":break;case"BrtDRef":break;case"BrtEndDRefs":break;case"BrtBeginActiveXControls":break;case"BrtActiveX":break;case"BrtEndActiveXControls":break;case"BrtBeginAFilter":break;case"BrtEndAFilter":break;case"BrtBeginFilterColumn":break;case"BrtBeginFilters":break;case"BrtFilter":break;case"BrtEndFilters":break;case"BrtEndFilterColumn":break;case"BrtDynamicFilter":break;case"BrtTop10Filter":break;case"BrtBeginCustomFilters":break;case"BrtCustomFilter":break;case"BrtEndCustomFilters":break;case"BrtBeginSmartTags":break;case"BrtBeginCellSmartTags":break;case"BrtBeginCellSmartTag":break;case"BrtCellSmartTagProperty":break;case"BrtEndCellSmartTag":break;case"BrtEndCellSmartTags":break;case"BrtEndSmartTags":break;case"BrtBeginCellWatches":break;case"BrtCellWatch":break;case"BrtEndCellWatches":break;case"BrtTable":break;case"BrtBeginCellIgnoreECs":break;case"BrtCellIgnoreEC":break;case"BrtEndCellIgnoreECs":break;default:if(!pass||opts.WTF)throw new Error("Unexpected record "+R.n)}},opts);if(!s["!ref"]&&(refguess.s.r<1e6||ref.e.r>0||ref.e.c>0||ref.s.r>0||ref.s.c>0))s["!ref"]=encode_range(ref);if(opts.sheetRows&&s["!ref"]){var tmpref=safe_decode_range(s["!ref"]);if(opts.sheetRows<+tmpref.e.r){tmpref.e.r=opts.sheetRows-1;if(tmpref.e.r>refguess.e.r)tmpref.e.r=refguess.e.r;if(tmpref.e.r<tmpref.s.r)tmpref.s.r=tmpref.e.r;if(tmpref.e.c>refguess.e.c)tmpref.e.c=refguess.e.c;if(tmpref.e.c<tmpref.s.c)tmpref.s.c=tmpref.e.c;s["!fullref"]=s["!ref"];s["!ref"]=encode_range(tmpref)}}if(mergecells.length>0)s["!merges"]=mergecells;return s}function write_ws_bin_cell(ba,cell,R,C,opts){if(cell.v===undefined)return"";var vv="";switch(cell.t){case"b":vv=cell.v?"1":"0";break;case"n":case"e":vv=""+cell.v;break;default:vv=cell.v;break}var o={r:R,c:C};o.s=get_cell_style(opts.cellXfs,cell,opts);switch(cell.t){case"s":case"str":if(opts.bookSST){vv=get_sst_id(opts.Strings,cell.v);o.t="s";break}o.t="str";break;case"n":break;case"b":o.t="b";break;case"e":o.t="e";break}write_record(ba,"BrtCellBlank",write_BrtCellBlank(cell,o))}function write_CELLTABLE(ba,ws,idx,opts,wb){var range=safe_decode_range(ws["!ref"]||"A1"),ref,rr="",cols=[];write_record(ba,"BrtBeginSheetData");for(var R=range.s.r;R<=range.e.r;++R){rr=encode_row(R);for(var C=range.s.c;C<=range.e.c;++C){if(R===range.s.r)cols[C]=encode_col(C);ref=cols[C]+rr;if(!ws[ref])continue;write_ws_bin_cell(ba,ws[ref],R,C,opts)}}write_record(ba,"BrtEndSheetData")}function write_ws_bin(idx,opts,wb){var ba=buf_array();var s=wb.SheetNames[idx],ws=wb.Sheets[s]||{};var r=safe_decode_range(ws["!ref"]||"A1");write_record(ba,"BrtBeginSheet");write_record(ba,"BrtWsDim",write_BrtWsDim(r));write_CELLTABLE(ba,ws,idx,opts,wb);write_record(ba,"BrtEndSheet");return ba.end()}var WBPropsDef=[["allowRefreshQuery","0"],["autoCompressPictures","1"],["backupFile","0"],["checkCompatibility","0"],["codeName",""],["date1904","0"],["dateCompatibility","1"],["filterPrivacy","0"],["hidePivotFieldList","0"],["promptedSolutions","0"],["publishItems","0"],["refreshAllConnections",false],["saveExternalLinkValues","1"],["showBorderUnselectedTables","1"],["showInkAnnotation","1"],["showObjects","all"],["showPivotChartFilter","0"]];var WBViewDef=[["activeTab","0"],["autoFilterDateGrouping","1"],["firstSheet","0"],["minimized","0"],["showHorizontalScroll","1"],["showSheetTabs","1"],["showVerticalScroll","1"],["tabRatio","600"],["visibility","visible"]];var SheetDef=[["state","visible"]];var CalcPrDef=[["calcCompleted","true"],["calcMode","auto"],["calcOnSave","true"],["concurrentCalc","true"],["fullCalcOnLoad","false"],["fullPrecision","true"],["iterate","false"],["iterateCount","100"],["iterateDelta","0.001"],["refMode","A1"]];var CustomWBViewDef=[["autoUpdate","false"],["changesSavedWin","false"],["includeHiddenRowCol","true"],["includePrintSettings","true"],["maximized","false"],["minimized","false"],["onlySync","false"],["personalView","false"],["showComments","commIndicator"],["showFormulaBar","true"],["showHorizontalScroll","true"],["showObjects","all"],["showSheetTabs","true"],["showStatusbar","true"],["showVerticalScroll","true"],["tabRatio","600"],["xWindow","0"],["yWindow","0"]];function push_defaults_array(target,defaults){for(var j=0;j!=target.length;++j){var w=target[j];for(var i=0;i!=defaults.length;++i){var z=defaults[i];if(w[z[0]]==null)w[z[0]]=z[1]}}}function push_defaults(target,defaults){for(var i=0;i!=defaults.length;++i){var z=defaults[i];if(target[z[0]]==null)target[z[0]]=z[1]}}function parse_wb_defaults(wb){push_defaults(wb.WBProps,WBPropsDef);push_defaults(wb.CalcPr,CalcPrDef);push_defaults_array(wb.WBView,WBViewDef);push_defaults_array(wb.Sheets,SheetDef);_ssfopts.date1904=parsexmlbool(wb.WBProps.date1904,"date1904")}var wbnsregex=/<\w+:workbook/;function parse_wb_xml(data,opts){var wb={AppVersion:{},WBProps:{},WBView:[],Sheets:[],CalcPr:{},xmlns:""};var pass=false,xmlns="xmlns";data.match(tagregex).forEach(function xml_wb(x){var y=parsexmltag(x);switch(strip_ns(y[0])){case"<?xml":break;case"<workbook":if(x.match(wbnsregex))xmlns="xmlns"+x.match(/<(\w+):/)[1];wb.xmlns=y[xmlns];break;case"</workbook>":break;case"<fileVersion":delete y[0];wb.AppVersion=y;break;case"<fileVersion/>":break;case"<fileSharing":case"<fileSharing/>":break;case"<workbookPr":delete y[0];wb.WBProps=y;break;case"<workbookPr/>":delete y[0];wb.WBProps=y;break;case"<workbookProtection":break;case"<workbookProtection/>":break;case"<bookViews>":case"</bookViews>":break;case"<workbookView":delete y[0];wb.WBView.push(y);break;case"<sheets>":case"</sheets>":break;case"<sheet":delete y[0];y.name=utf8read(y.name);wb.Sheets.push(y);break;case"<functionGroups":case"<functionGroups/>":break;case"<functionGroup":break;case"<externalReferences":case"</externalReferences>":case"<externalReferences>":break;case"<externalReference":break;case"<definedNames/>":break;case"<definedNames>":case"<definedNames":pass=true;break;case"</definedNames>":pass=false;break;case"<definedName":case"<definedName/>":case"</definedName>":break;case"<calcPr":delete y[0];wb.CalcPr=y;break;case"<calcPr/>":delete y[0];wb.CalcPr=y;break;case"<oleSize":break;case"<customWorkbookViews>":case"</customWorkbookViews>":case"<customWorkbookViews":break;case"<customWorkbookView":case"</customWorkbookView>":break;case"<pivotCaches>":case"</pivotCaches>":case"<pivotCaches":break;case"<pivotCache":break;case"<smartTagPr":case"<smartTagPr/>":break;case"<smartTagTypes":case"<smartTagTypes>":case"</smartTagTypes>":break;case"<smartTagType":break;case"<webPublishing":case"<webPublishing/>":break;case"<fileRecoveryPr":case"<fileRecoveryPr/>":break;case"<webPublishObjects>":case"<webPublishObjects":case"</webPublishObjects>":break;case"<webPublishObject":break;case"<extLst>":case"</extLst>":case"<extLst/>":break;case"<ext":pass=true;break;case"</ext>":pass=false;break;case"<ArchID":break;case"<AlternateContent":pass=true;break;case"</AlternateContent>":pass=false;break;default:if(!pass&&opts.WTF)throw"unrecognized "+y[0]+" in workbook"}});if(XMLNS.main.indexOf(wb.xmlns)===-1)throw new Error("Unknown Namespace: "+wb.xmlns);parse_wb_defaults(wb);return wb}var WB_XML_ROOT=writextag("workbook",null,{xmlns:XMLNS.main[0],"xmlns:r":XMLNS.r});function safe1904(wb){try{return parsexmlbool(wb.Workbook.WBProps.date1904)?"true":"false"}catch(e){return"false"}}function write_wb_xml(wb,opts){var o=[XML_HEADER];o[o.length]=WB_XML_ROOT;o[o.length]=writextag("workbookPr",null,{date1904:safe1904(wb)});o[o.length]="<sheets>";for(var i=0;i!=wb.SheetNames.length;++i)o[o.length]=writextag("sheet",null,{name:wb.SheetNames[i].substr(0,31),sheetId:""+(i+1),"r:id":"rId"+(i+1)});o[o.length]="</sheets>";if(o.length>2){o[o.length]="</workbook>";o[1]=o[1].replace("/>",">")}return o.join("")}function parse_BrtBundleSh(data,length){var z={};z.hsState=data.read_shift(4);z.iTabID=data.read_shift(4);z.strRelID=parse_RelID(data,length-8);z.name=parse_XLWideString(data);return z}function write_BrtBundleSh(data,o){if(!o)o=new_buf(127);o.write_shift(4,data.hsState);o.write_shift(4,data.iTabID);write_RelID(data.strRelID,o);write_XLWideString(data.name.substr(0,31),o);return o}function parse_BrtWbProp(data,length){data.read_shift(4);var dwThemeVersion=data.read_shift(4);var strName=length>8?parse_XLWideString(data):"";return[dwThemeVersion,strName]}function write_BrtWbProp(data,o){if(!o)o=new_buf(8);o.write_shift(4,0);o.write_shift(4,0);return o}function parse_BrtFRTArchID$(data,length){var o={};data.read_shift(4);o.ArchID=data.read_shift(4);data.l+=length-8;return o}function parse_wb_bin(data,opts){var wb={AppVersion:{},WBProps:{},WBView:[],Sheets:[],CalcPr:{},xmlns:""};var pass=false,z;recordhopper(data,function hopper_wb(val,R){switch(R.n){case"BrtBundleSh":wb.Sheets.push(val);break;case"BrtBeginBook":break;case"BrtFileVersion":break;case"BrtWbProp":break;case"BrtACBegin":break;case"BrtAbsPath15":break;case"BrtACEnd":break;case"BrtWbFactoid":break;case"BrtBookProtection":break;case"BrtBeginBookViews":break;case"BrtBookView":break;case"BrtEndBookViews":break;case"BrtBeginBundleShs":break;case"BrtEndBundleShs":break;case"BrtBeginFnGroup":break;case"BrtEndFnGroup":break;case"BrtBeginExternals":break;case"BrtSupSelf":break;case"BrtSupBookSrc":break;case"BrtExternSheet":break;case"BrtEndExternals":break;case"BrtName":break;case"BrtCalcProp":break;case"BrtUserBookView":break;case"BrtBeginPivotCacheIDs":break;case"BrtBeginPivotCacheID":break;case"BrtEndPivotCacheID":break;case"BrtEndPivotCacheIDs":break;case"BrtWebOpt":break;case"BrtFileRecover":break;case"BrtFileSharing":break;case"BrtBeginSmartTagTypes":break;case"BrtSmartTagType":break;case"BrtEndSmartTagTypes":break;case"BrtFRTBegin":pass=true;break;case"BrtFRTArchID$":break;case"BrtWorkBookPr15":break;case"BrtFRTEnd":pass=false;break;case"BrtEndBook":break;default:if(!pass||opts.WTF)throw new Error("Unexpected record "+R.n)}});parse_wb_defaults(wb);return wb}function write_BUNDLESHS(ba,wb,opts){write_record(ba,"BrtBeginBundleShs");for(var idx=0;idx!=wb.SheetNames.length;++idx){var d={hsState:0,iTabID:idx+1,strRelID:"rId"+(idx+1),name:wb.SheetNames[idx]};write_record(ba,"BrtBundleSh",write_BrtBundleSh(d))}write_record(ba,"BrtEndBundleShs")}function write_BrtFileVersion(data,o){if(!o)o=new_buf(127);for(var i=0;i!=4;++i)o.write_shift(4,0);write_XLWideString("SheetJS",o);write_XLWideString(XLSX.version,o);write_XLWideString(XLSX.version,o);write_XLWideString("7262",o);o.length=o.l;return o}function write_BOOKVIEWS(ba,wb,opts){write_record(ba,"BrtBeginBookViews");write_record(ba,"BrtEndBookViews")}function write_BrtCalcProp(data,o){if(!o)o=new_buf(26);o.write_shift(4,0);o.write_shift(4,1);o.write_shift(4,0);write_Xnum(0,o);o.write_shift(-4,1023);o.write_shift(1,51);o.write_shift(1,0);return o}function write_BrtFileRecover(data,o){if(!o)o=new_buf(1);o.write_shift(1,0);return o}function write_wb_bin(wb,opts){var ba=buf_array();write_record(ba,"BrtBeginBook");write_record(ba,"BrtFileVersion",write_BrtFileVersion());write_record(ba,"BrtWbProp",write_BrtWbProp());write_BOOKVIEWS(ba,wb,opts);write_BUNDLESHS(ba,wb,opts);write_record(ba,"BrtCalcProp",write_BrtCalcProp());write_record(ba,"BrtFileRecover",write_BrtFileRecover());write_record(ba,"BrtEndBook");return ba.end()}function parse_wb(data,name,opts){return(name.substr(-4)===".bin"?parse_wb_bin:parse_wb_xml)(data,opts)}function parse_ws(data,name,opts,rels){return(name.substr(-4)===".bin"?parse_ws_bin:parse_ws_xml)(data,opts,rels)}function parse_sty(data,name,opts){return(name.substr(-4)===".bin"?parse_sty_bin:parse_sty_xml)(data,opts)}function parse_theme(data,name,opts){return parse_theme_xml(data,opts)}function parse_sst(data,name,opts){return(name.substr(-4)===".bin"?parse_sst_bin:parse_sst_xml)(data,opts)}function parse_cmnt(data,name,opts){return(name.substr(-4)===".bin"?parse_comments_bin:parse_comments_xml)(data,opts)}function parse_cc(data,name,opts){return(name.substr(-4)===".bin"?parse_cc_bin:parse_cc_xml)(data,opts)}function write_wb(wb,name,opts){return(name.substr(-4)===".bin"?write_wb_bin:write_wb_xml)(wb,opts)}function write_ws(data,name,opts,wb){return(name.substr(-4)===".bin"?write_ws_bin:write_ws_xml)(data,opts,wb)}function write_sty(data,name,opts){return(name.substr(-4)===".bin"?write_sty_bin:write_sty_xml)(data,opts)}function write_sst(data,name,opts){return(name.substr(-4)===".bin"?write_sst_bin:write_sst_xml)(data,opts)}var attregexg2=/([\w:]+)=((?:")([^"]*)(?:")|(?:')([^']*)(?:'))/g;var attregex2=/([\w:]+)=((?:")(?:[^"]*)(?:")|(?:')(?:[^']*)(?:'))/;var _chr=function(c){return String.fromCharCode(c)};function xlml_parsexmltag(tag,skip_root){var words=tag.split(/\s+/);var z=[];if(!skip_root)z[0]=words[0];if(words.length===1)return z;var m=tag.match(attregexg2),y,j,w,i;if(m)for(i=0;i!=m.length;++i){y=m[i].match(attregex2);if((j=y[1].indexOf(":"))===-1)z[y[1]]=y[2].substr(1,y[2].length-2);else{if(y[1].substr(0,6)==="xmlns:")w="xmlns"+y[1].substr(6);else w=y[1].substr(j+1);z[w]=y[2].substr(1,y[2].length-2)}}return z}function xlml_parsexmltagobj(tag){var words=tag.split(/\s+/);var z={};if(words.length===1)return z;var m=tag.match(attregexg2),y,j,w,i;if(m)for(i=0;i!=m.length;++i){y=m[i].match(attregex2);if((j=y[1].indexOf(":"))===-1)z[y[1]]=y[2].substr(1,y[2].length-2);else{if(y[1].substr(0,6)==="xmlns:")w="xmlns"+y[1].substr(6);else w=y[1].substr(j+1);z[w]=y[2].substr(1,y[2].length-2)}}return z}function xlml_format(format,value){var fmt=XLMLFormatMap[format]||unescapexml(format);if(fmt==="General")return SSF._general(value);return SSF.format(fmt,value)}function xlml_set_custprop(Custprops,Rn,cp,val){switch((cp[0].match(/dt:dt="([\w.]+)"/)||["",""])[1]){case"boolean":val=parsexmlbool(val);break;case"i2":case"int":val=parseInt(val,10);break;case"r4":case"float":val=parseFloat(val);break;case"date":case"dateTime.tz":val=new Date(val);break;case"i8":case"string":case"fixed":case"uuid":case"bin.base64":break;default:throw"bad custprop:"+cp[0]}Custprops[unescapexml(Rn[3])]=val}function safe_format_xlml(cell,nf,o){try{if(cell.t==="e"){cell.w=cell.w||BErr[cell.v]}else if(nf==="General"){if(cell.t==="n"){if((cell.v|0)===cell.v)cell.w=SSF._general_int(cell.v);else cell.w=SSF._general_num(cell.v)}else cell.w=SSF._general(cell.v)}else cell.w=xlml_format(nf||"General",cell.v);if(o.cellNF)cell.z=XLMLFormatMap[nf]||nf||"General"}catch(e){if(o.WTF)throw e}}function process_style_xlml(styles,stag,opts){if(opts.cellStyles){if(stag.Interior){var I=stag.Interior;if(I.Pattern)I.patternType=XLMLPatternTypeMap[I.Pattern]||I.Pattern}}styles[stag.ID]=stag}function parse_xlml_data(xml,ss,data,cell,base,styles,csty,row,o){var nf="General",sid=cell.StyleID,S={};o=o||{};var interiors=[];if(sid===undefined&&row)sid=row.StyleID;if(sid===undefined&&csty)sid=csty.StyleID;while(styles[sid]!==undefined){if(styles[sid].nf)nf=styles[sid].nf;if(styles[sid].Interior)interiors.push(styles[sid].Interior);if(!styles[sid].Parent)break;sid=styles[sid].Parent}switch(data.Type){case"Boolean":cell.t="b";cell.v=parsexmlbool(xml);break;case"String":cell.t="s";cell.r=xlml_fixstr(unescapexml(xml));cell.v=xml.indexOf("<")>-1?ss:cell.r;break;case"DateTime":cell.v=(Date.parse(xml)-new Date(Date.UTC(1899,11,30)))/(24*60*60*1e3);if(cell.v!==cell.v)cell.v=unescapexml(xml);else if(cell.v>=1&&cell.v<60)cell.v=cell.v-1;if(!nf||nf=="General")nf="yyyy-mm-dd";case"Number":if(cell.v===undefined)cell.v=+xml;if(!cell.t)cell.t="n";break;case"Error":cell.t="e";cell.v=RBErr[xml];cell.w=xml;break;default:cell.t="s";cell.v=xlml_fixstr(ss);break}safe_format_xlml(cell,nf,o);if(o.cellFormula!=null&&cell.Formula){cell.f=rc_to_a1(unescapexml(cell.Formula),base);cell.Formula=undefined}if(o.cellStyles){interiors.forEach(function(x){if(!S.patternType&&x.patternType)S.patternType=x.patternType});cell.s=S}cell.ixfe=cell.StyleID!==undefined?cell.StyleID:"Default"}function xlml_clean_comment(comment){comment.t=comment.v;comment.v=comment.w=comment.ixfe=undefined}function xlml_normalize(d){if(has_buf&&Buffer.isBuffer(d))return d.toString("utf8");if(typeof d==="string")return d;throw"badf"}var xlmlregex=/<(\/?)([a-z0-9]*:|)(\w+)[^>]*>/gm;function parse_xlml_xml(d,opts){var str=xlml_normalize(d);var Rn;var state=[],tmp;var sheets={},sheetnames=[],cursheet={},sheetname="";var table={},cell={},row={},dtag,didx;var c=0,r=0;var refguess={s:{r:1e6,c:1e6},e:{r:0,c:0}};var styles={},stag={};var ss="",fidx=0;var mergecells=[];var Props={},Custprops={},pidx=0,cp={};var comments=[],comment={};var cstys=[],csty;xlmlregex.lastIndex=0;while(Rn=xlmlregex.exec(str))switch(Rn[3]){case"Data":if(state[state.length-1][1])break;if(Rn[1]==="/")parse_xlml_data(str.slice(didx,Rn.index),ss,dtag,state[state.length-1][0]=="Comment"?comment:cell,{c:c,r:r},styles,cstys[c],row,opts);else{ss="";dtag=xlml_parsexmltag(Rn[0]);didx=Rn.index+Rn[0].length}break;case"Cell":if(Rn[1]==="/"){if(comments.length>0)cell.c=comments;if((!opts.sheetRows||opts.sheetRows>r)&&cell.v!==undefined)cursheet[encode_col(c)+encode_row(r)]=cell;if(cell.HRef){cell.l={Target:cell.HRef,tooltip:cell.HRefScreenTip};cell.HRef=cell.HRefScreenTip=undefined}if(cell.MergeAcross||cell.MergeDown){var cc=c+(parseInt(cell.MergeAcross,10)|0);var rr=r+(parseInt(cell.MergeDown,10)|0);mergecells.push({s:{c:c,r:r},e:{c:cc,r:rr}})}++c;if(cell.MergeAcross)c+=+cell.MergeAcross}else{cell=xlml_parsexmltagobj(Rn[0]);if(cell.Index)c=+cell.Index-1;if(c<refguess.s.c)refguess.s.c=c;if(c>refguess.e.c)refguess.e.c=c;if(Rn[0].substr(-2)==="/>")++c;comments=[]}break;case"Row":if(Rn[1]==="/"||Rn[0].substr(-2)==="/>"){if(r<refguess.s.r)refguess.s.r=r;if(r>refguess.e.r)refguess.e.r=r;if(Rn[0].substr(-2)==="/>"){row=xlml_parsexmltag(Rn[0]);if(row.Index)r=+row.Index-1}c=0;++r}else{row=xlml_parsexmltag(Rn[0]);if(row.Index)r=+row.Index-1}break;case"Worksheet":if(Rn[1]==="/"){if((tmp=state.pop())[0]!==Rn[3])throw"Bad state: "+tmp;sheetnames.push(sheetname);if(refguess.s.r<=refguess.e.r&&refguess.s.c<=refguess.e.c)cursheet["!ref"]=encode_range(refguess);if(mergecells.length)cursheet["!merges"]=mergecells;sheets[sheetname]=cursheet}else{refguess={s:{r:1e6,c:1e6},e:{r:0,c:0}};r=c=0;state.push([Rn[3],false]);tmp=xlml_parsexmltag(Rn[0]);sheetname=tmp.Name;cursheet={};mergecells=[]}break;case"Table":if(Rn[1]==="/"){if((tmp=state.pop())[0]!==Rn[3])throw"Bad state: "+tmp}else if(Rn[0].slice(-2)=="/>")break;else{table=xlml_parsexmltag(Rn[0]);state.push([Rn[3],false]);cstys=[]}break;case"Style":if(Rn[1]==="/")process_style_xlml(styles,stag,opts);else stag=xlml_parsexmltag(Rn[0]);break;case"NumberFormat":stag.nf=xlml_parsexmltag(Rn[0]).Format||"General";break;case"Column":if(state[state.length-1][0]!=="Table")break;csty=xlml_parsexmltag(Rn[0]);cstys[csty.Index-1||cstys.length]=csty;for(var i=0;i<+csty.Span;++i)cstys[cstys.length]=csty;break;case"NamedRange":break;case"NamedCell":break;case"B":break;case"I":break;case"U":break;case"S":break;case"Sub":break;case"Sup":break;case"Span":break;case"Border":break;case"Alignment":break;case"Borders":break;case"Font":if(Rn[0].substr(-2)==="/>")break;else if(Rn[1]==="/")ss+=str.slice(fidx,Rn.index);else fidx=Rn.index+Rn[0].length;break;case"Interior":if(!opts.cellStyles)break;stag.Interior=xlml_parsexmltag(Rn[0]);break;case"Protection":break;case"Author":case"Title":case"Description":case"Created":case"Keywords":case"Subject":case"Category":case"Company":case"LastAuthor":case"LastSaved":case"LastPrinted":case"Version":case"Revision":case"TotalTime":case"HyperlinkBase":case"Manager":if(Rn[0].substr(-2)==="/>")break;else if(Rn[1]==="/")xlml_set_prop(Props,Rn[3],str.slice(pidx,Rn.index));else pidx=Rn.index+Rn[0].length;break;case"Paragraphs":break;case"Styles":case"Workbook":if(Rn[1]==="/"){if((tmp=state.pop())[0]!==Rn[3])throw"Bad state: "+tmp}else state.push([Rn[3],false]);break;case"Comment":if(Rn[1]==="/"){if((tmp=state.pop())[0]!==Rn[3])throw"Bad state: "+tmp;xlml_clean_comment(comment);comments.push(comment)}else{state.push([Rn[3],false]);tmp=xlml_parsexmltag(Rn[0]);comment={a:tmp.Author}}break;case"Name":break;case"ComponentOptions":case"DocumentProperties":case"CustomDocumentProperties":case"OfficeDocumentSettings":case"PivotTable":case"PivotCache":case"Names":case"MapInfo":case"PageBreaks":case"QueryTable":case"DataValidation":case"AutoFilter":case"Sorting":case"Schema":case"data":case"ConditionalFormatting":case"SmartTagType":case"SmartTags":case"ExcelWorkbook":case"WorkbookOptions":case"WorksheetOptions":if(Rn[1]==="/"){if((tmp=state.pop())[0]!==Rn[3])throw"Bad state: "+tmp}else if(Rn[0].charAt(Rn[0].length-2)!=="/")state.push([Rn[3],true]);break;default:var seen=true;switch(state[state.length-1][0]){case"OfficeDocumentSettings":switch(Rn[3]){case"AllowPNG":break;case"RemovePersonalInformation":break;case"DownloadComponents":break;case"LocationOfComponents":break;case"Colors":break;case"Color":break;case"Index":break;case"RGB":break;case"PixelsPerInch":break;case"TargetScreenSize":break;case"ReadOnlyRecommended":break;default:seen=false}break;case"ComponentOptions":switch(Rn[3]){case"Toolbar":break;case"HideOfficeLogo":break;case"SpreadsheetAutoFit":break;case"Label":break;case"Caption":break;case"MaxHeight":break;case"MaxWidth":break;case"NextSheetNumber":break;default:seen=false}break;case"ExcelWorkbook":switch(Rn[3]){case"WindowHeight":break;case"WindowWidth":break;case"WindowTopX":break;case"WindowTopY":break;case"TabRatio":break;case"ProtectStructure":break;case"ProtectWindows":break;case"ActiveSheet":break;case"DisplayInkNotes":break;case"FirstVisibleSheet":break;case"SupBook":break;case"SheetName":break;
case"SheetIndex":break;case"SheetIndexFirst":break;case"SheetIndexLast":break;case"Dll":break;case"AcceptLabelsInFormulas":break;case"DoNotSaveLinkValues":break;case"Date1904":break;case"Iteration":break;case"MaxIterations":break;case"MaxChange":break;case"Path":break;case"Xct":break;case"Count":break;case"SelectedSheets":break;case"Calculation":break;case"Uncalced":break;case"StartupPrompt":break;case"Crn":break;case"ExternName":break;case"Formula":break;case"ColFirst":break;case"ColLast":break;case"WantAdvise":break;case"Boolean":break;case"Error":break;case"Text":break;case"OLE":break;case"NoAutoRecover":break;case"PublishObjects":break;case"DoNotCalculateBeforeSave":break;case"Number":break;case"RefModeR1C1":break;case"EmbedSaveSmartTags":break;default:seen=false}break;case"WorkbookOptions":switch(Rn[3]){case"OWCVersion":break;case"Height":break;case"Width":break;default:seen=false}break;case"WorksheetOptions":switch(Rn[3]){case"Unsynced":break;case"Visible":break;case"Print":break;case"Panes":break;case"Scale":break;case"Pane":break;case"Number":break;case"Layout":break;case"Header":break;case"Footer":break;case"PageSetup":break;case"PageMargins":break;case"Selected":break;case"ProtectObjects":break;case"EnableSelection":break;case"ProtectScenarios":break;case"ValidPrinterInfo":break;case"HorizontalResolution":break;case"VerticalResolution":break;case"NumberofCopies":break;case"ActiveRow":break;case"ActiveCol":break;case"ActivePane":break;case"TopRowVisible":break;case"TopRowBottomPane":break;case"LeftColumnVisible":break;case"LeftColumnRightPane":break;case"FitToPage":break;case"RangeSelection":break;case"PaperSizeIndex":break;case"PageLayoutZoom":break;case"PageBreakZoom":break;case"FilterOn":break;case"DoNotDisplayGridlines":break;case"SplitHorizontal":break;case"SplitVertical":break;case"FreezePanes":break;case"FrozenNoSplit":break;case"FitWidth":break;case"FitHeight":break;case"CommentsLayout":break;case"Zoom":break;case"LeftToRight":break;case"Gridlines":break;case"AllowSort":break;case"AllowFilter":break;case"AllowInsertRows":break;case"AllowDeleteRows":break;case"AllowInsertCols":break;case"AllowDeleteCols":break;case"AllowInsertHyperlinks":break;case"AllowFormatCells":break;case"AllowSizeCols":break;case"AllowSizeRows":break;case"NoSummaryRowsBelowDetail":break;case"TabColorIndex":break;case"DoNotDisplayHeadings":break;case"ShowPageLayoutZoom":break;case"NoSummaryColumnsRightDetail":break;case"BlackAndWhite":break;case"DoNotDisplayZeros":break;case"DisplayPageBreak":break;case"RowColHeadings":break;case"DoNotDisplayOutline":break;case"NoOrientation":break;case"AllowUsePivotTables":break;case"ZeroHeight":break;case"ViewableRange":break;case"Selection":break;case"ProtectContents":break;default:seen=false}break;case"PivotTable":case"PivotCache":switch(Rn[3]){case"ImmediateItemsOnDrop":break;case"ShowPageMultipleItemLabel":break;case"CompactRowIndent":break;case"Location":break;case"PivotField":break;case"Orientation":break;case"LayoutForm":break;case"LayoutSubtotalLocation":break;case"LayoutCompactRow":break;case"Position":break;case"PivotItem":break;case"DataType":break;case"DataField":break;case"SourceName":break;case"ParentField":break;case"PTLineItems":break;case"PTLineItem":break;case"CountOfSameItems":break;case"Item":break;case"ItemType":break;case"PTSource":break;case"CacheIndex":break;case"ConsolidationReference":break;case"FileName":break;case"Reference":break;case"NoColumnGrand":break;case"NoRowGrand":break;case"BlankLineAfterItems":break;case"Hidden":break;case"Subtotal":break;case"BaseField":break;case"MapChildItems":break;case"Function":break;case"RefreshOnFileOpen":break;case"PrintSetTitles":break;case"MergeLabels":break;case"DefaultVersion":break;case"RefreshName":break;case"RefreshDate":break;case"RefreshDateCopy":break;case"VersionLastRefresh":break;case"VersionLastUpdate":break;case"VersionUpdateableMin":break;case"VersionRefreshableMin":break;case"Calculation":break;default:seen=false}break;case"PageBreaks":switch(Rn[3]){case"ColBreaks":break;case"ColBreak":break;case"RowBreaks":break;case"RowBreak":break;case"ColStart":break;case"ColEnd":break;case"RowEnd":break;default:seen=false}break;case"AutoFilter":switch(Rn[3]){case"AutoFilterColumn":break;case"AutoFilterCondition":break;case"AutoFilterAnd":break;case"AutoFilterOr":break;default:seen=false}break;case"QueryTable":switch(Rn[3]){case"Id":break;case"AutoFormatFont":break;case"AutoFormatPattern":break;case"QuerySource":break;case"QueryType":break;case"EnableRedirections":break;case"RefreshedInXl9":break;case"URLString":break;case"HTMLTables":break;case"Connection":break;case"CommandText":break;case"RefreshInfo":break;case"NoTitles":break;case"NextId":break;case"ColumnInfo":break;case"OverwriteCells":break;case"DoNotPromptForFile":break;case"TextWizardSettings":break;case"Source":break;case"Number":break;case"Decimal":break;case"ThousandSeparator":break;case"TrailingMinusNumbers":break;case"FormatSettings":break;case"FieldType":break;case"Delimiters":break;case"Tab":break;case"Comma":break;case"AutoFormatName":break;case"VersionLastEdit":break;case"VersionLastRefresh":break;default:seen=false}break;case"Sorting":case"ConditionalFormatting":case"DataValidation":switch(Rn[3]){case"Range":break;case"Type":break;case"Min":break;case"Max":break;case"Sort":break;case"Descending":break;case"Order":break;case"CaseSensitive":break;case"Value":break;case"ErrorStyle":break;case"ErrorMessage":break;case"ErrorTitle":break;case"CellRangeList":break;case"InputMessage":break;case"InputTitle":break;case"ComboHide":break;case"InputHide":break;case"Condition":break;case"Qualifier":break;case"UseBlank":break;case"Value1":break;case"Value2":break;case"Format":break;default:seen=false}break;case"MapInfo":case"Schema":case"data":switch(Rn[3]){case"Map":break;case"Entry":break;case"Range":break;case"XPath":break;case"Field":break;case"XSDType":break;case"FilterOn":break;case"Aggregate":break;case"ElementType":break;case"AttributeType":break;case"schema":case"element":case"complexType":case"datatype":case"all":case"attribute":case"extends":break;case"row":break;default:seen=false}break;case"SmartTags":break;default:seen=false;break}if(seen)break;if(!state[state.length-1][1])throw"Unrecognized tag: "+Rn[3]+"|"+state.join("|");if(state[state.length-1][0]==="CustomDocumentProperties"){if(Rn[0].substr(-2)==="/>")break;else if(Rn[1]==="/")xlml_set_custprop(Custprops,Rn,cp,str.slice(pidx,Rn.index));else{cp=Rn;pidx=Rn.index+Rn[0].length}break}if(opts.WTF)throw"Unrecognized tag: "+Rn[3]+"|"+state.join("|")}var out={};if(!opts.bookSheets&&!opts.bookProps)out.Sheets=sheets;out.SheetNames=sheetnames;out.SSF=SSF.get_table();out.Props=Props;out.Custprops=Custprops;return out}function parse_xlml(data,opts){fix_read_opts(opts=opts||{});switch(opts.type||"base64"){case"base64":return parse_xlml_xml(Base64.decode(data),opts);case"binary":case"buffer":case"file":return parse_xlml_xml(data,opts);case"array":return parse_xlml_xml(data.map(_chr).join(""),opts)}}function write_xlml(wb,opts){}function parse_compobj(obj){var v={};var o=obj.content;var l=28,m;m=__lpstr(o,l);l+=4+__readUInt32LE(o,l);v.UserType=m;m=__readUInt32LE(o,l);l+=4;switch(m){case 0:break;case 4294967295:case 4294967294:l+=4;break;default:if(m>400)throw new Error("Unsupported Clipboard: "+m.toString(16));l+=m}m=__lpstr(o,l);l+=m.length===0?0:5+m.length;v.Reserved1=m;if((m=__readUInt32LE(o,l))!==1907550708)return v;throw"Unsupported Unicode Extension"}function slurp(R,blob,length,opts){var l=length;var bufs=[];var d=blob.slice(blob.l,blob.l+l);if(opts&&opts.enc&&opts.enc.insitu_decrypt)switch(R.n){case"BOF":case"FilePass":case"FileLock":case"InterfaceHdr":case"RRDInfo":case"RRDHead":case"UsrExcl":break;default:if(d.length===0)break;opts.enc.insitu_decrypt(d)}bufs.push(d);blob.l+=l;var next=XLSRecordEnum[__readUInt16LE(blob,blob.l)];while(next!=null&&next.n==="Continue"){l=__readUInt16LE(blob,blob.l+2);bufs.push(blob.slice(blob.l+4,blob.l+4+l));blob.l+=4+l;next=XLSRecordEnum[__readUInt16LE(blob,blob.l)]}var b=bconcat(bufs);prep_blob(b,0);var ll=0;b.lens=[];for(var j=0;j<bufs.length;++j){b.lens.push(ll);ll+=bufs[j].length}return R.f(b,b.length,opts)}function safe_format_xf(p,opts,date1904){if(!p.XF)return;try{var fmtid=p.XF.ifmt||0;if(p.t==="e"){p.w=p.w||BErr[p.v]}else if(fmtid===0){if(p.t==="n"){if((p.v|0)===p.v)p.w=SSF._general_int(p.v);else p.w=SSF._general_num(p.v)}else p.w=SSF._general(p.v)}else p.w=SSF.format(fmtid,p.v,{date1904:date1904||false});if(opts.cellNF)p.z=SSF._table[fmtid]}catch(e){if(opts.WTF)throw e}}function make_cell(val,ixfe,t){return{v:val,ixfe:ixfe,t:t}}function parse_workbook(blob,options){var wb={opts:{}};var Sheets={};var out={};var Directory={};var found_sheet=false;var range={};var last_formula=null;var sst=[];var cur_sheet="";var Preamble={};var lastcell,last_cell,cc,cmnt,rng,rngC,rngR;var shared_formulae={};var array_formulae=[];var temp_val;var country;var cell_valid=true;var XFs=[];var palette=[];var get_rgb=function getrgb(icv){if(icv<8)return XLSIcv[icv];if(icv<64)return palette[icv-8]||XLSIcv[icv];return XLSIcv[icv]};var process_cell_style=function pcs(cell,line){var xfd=line.XF.data;if(!xfd||!xfd.patternType)return;line.s={};line.s.patternType=xfd.patternType;var t;if(t=rgb2Hex(get_rgb(xfd.icvFore))){line.s.fgColor={rgb:t}}if(t=rgb2Hex(get_rgb(xfd.icvBack))){line.s.bgColor={rgb:t}}};var addcell=function addcell(cell,line,options){if(!cell_valid)return;if(options.cellStyles&&line.XF&&line.XF.data)process_cell_style(cell,line);lastcell=cell;last_cell=encode_cell(cell);if(range.s){if(cell.r<range.s.r)range.s.r=cell.r;if(cell.c<range.s.c)range.s.c=cell.c}if(range.e){if(cell.r+1>range.e.r)range.e.r=cell.r+1;if(cell.c+1>range.e.c)range.e.c=cell.c+1}if(options.sheetRows&&lastcell.r>=options.sheetRows)cell_valid=false;else out[last_cell]=line};var opts={enc:false,sbcch:0,snames:[],sharedf:shared_formulae,arrayf:array_formulae,rrtabid:[],lastuser:"",biff:8,codepage:0,winlocked:0,wtf:false};if(options.password)opts.password=options.password;var mergecells=[];var objects=[];var supbooks=[[]];var sbc=0,sbci=0,sbcli=0;supbooks.SheetNames=opts.snames;supbooks.sharedf=opts.sharedf;supbooks.arrayf=opts.arrayf;var last_Rn="";var file_depth=0;opts.codepage=1200;set_cp(1200);while(blob.l<blob.length-1){var s=blob.l;var RecordType=blob.read_shift(2);if(RecordType===0&&last_Rn==="EOF")break;var length=blob.l===blob.length?0:blob.read_shift(2),y;var R=XLSRecordEnum[RecordType];if(R&&R.f){if(options.bookSheets){if(last_Rn==="BoundSheet8"&&R.n!=="BoundSheet8")break}last_Rn=R.n;if(R.r===2||R.r==12){var rt=blob.read_shift(2);length-=2;if(!opts.enc&&rt!==RecordType)throw"rt mismatch";if(R.r==12){blob.l+=10;length-=10}}var val;if(R.n==="EOF")val=R.f(blob,length,opts);else val=slurp(R,blob,length,opts);var Rn=R.n;if(opts.biff===5||opts.biff===2)switch(Rn){case"Lbl":Rn="Label";break}switch(Rn){case"Date1904":wb.opts.Date1904=val;break;case"WriteProtect":wb.opts.WriteProtect=true;break;case"FilePass":if(!opts.enc)blob.l=0;opts.enc=val;if(opts.WTF)console.error(val);if(!options.password)throw new Error("File is password-protected");if(val.Type!==0)throw new Error("Encryption scheme unsupported");if(!val.valid)throw new Error("Password is incorrect");break;case"WriteAccess":opts.lastuser=val;break;case"FileSharing":break;case"CodePage":if(val===21010)val=1200;else if(val===32769)val=1252;opts.codepage=val;set_cp(val);break;case"RRTabId":opts.rrtabid=val;break;case"WinProtect":opts.winlocked=val;break;case"Template":break;case"RefreshAll":wb.opts.RefreshAll=val;break;case"BookBool":break;case"UsesELFs":break;case"MTRSettings":{if(val[0]&&val[1])throw"Unsupported threads: "+val}break;case"CalcCount":wb.opts.CalcCount=val;break;case"CalcDelta":wb.opts.CalcDelta=val;break;case"CalcIter":wb.opts.CalcIter=val;break;case"CalcMode":wb.opts.CalcMode=val;break;case"CalcPrecision":wb.opts.CalcPrecision=val;break;case"CalcSaveRecalc":wb.opts.CalcSaveRecalc=val;break;case"CalcRefMode":opts.CalcRefMode=val;break;case"Uncalced":break;case"ForceFullCalculation":wb.opts.FullCalc=val;break;case"WsBool":break;case"XF":XFs.push(val);break;case"ExtSST":break;case"BookExt":break;case"RichTextStream":break;case"BkHim":break;case"SupBook":supbooks[++sbc]=[val];sbci=0;break;case"ExternName":supbooks[sbc][++sbci]=val;break;case"Index":break;case"Lbl":supbooks[0][++sbcli]=val;break;case"ExternSheet":supbooks[sbc]=supbooks[sbc].concat(val);sbci+=val.length;break;case"Protect":out["!protect"]=val;break;case"Password":if(val!==0&&opts.WTF)console.error("Password verifier: "+val);break;case"Prot4Rev":case"Prot4RevPass":break;case"BoundSheet8":{Directory[val.pos]=val;opts.snames.push(val.name)}break;case"EOF":{if(--file_depth)break;if(range.e){out["!range"]=range;if(range.e.r>0&&range.e.c>0){range.e.r--;range.e.c--;out["!ref"]=encode_range(range);range.e.r++;range.e.c++}if(mergecells.length>0)out["!merges"]=mergecells;if(objects.length>0)out["!objects"]=objects}if(cur_sheet==="")Preamble=out;else Sheets[cur_sheet]=out;out={}}break;case"BOF":{if(opts.biff!==8);else if(val.BIFFVer===1280)opts.biff=5;else if(val.BIFFVer===2)opts.biff=2;else if(val.BIFFVer===7)opts.biff=2;if(file_depth++)break;cell_valid=true;out={};if(opts.biff===2){if(cur_sheet==="")cur_sheet="Sheet1";range={s:{r:0,c:0},e:{r:0,c:0}}}else cur_sheet=(Directory[s]||{name:""}).name;mergecells=[];objects=[]}break;case"Number":case"BIFF2NUM":{temp_val={ixfe:val.ixfe,XF:XFs[val.ixfe],v:val.val,t:"n"};if(temp_val.XF)safe_format_xf(temp_val,options,wb.opts.Date1904);addcell({c:val.c,r:val.r},temp_val,options)}break;case"BoolErr":{temp_val={ixfe:val.ixfe,XF:XFs[val.ixfe],v:val.val,t:val.t};if(temp_val.XF)safe_format_xf(temp_val,options,wb.opts.Date1904);addcell({c:val.c,r:val.r},temp_val,options)}break;case"RK":{temp_val={ixfe:val.ixfe,XF:XFs[val.ixfe],v:val.rknum,t:"n"};if(temp_val.XF)safe_format_xf(temp_val,options,wb.opts.Date1904);addcell({c:val.c,r:val.r},temp_val,options)}break;case"MulRk":{for(var j=val.c;j<=val.C;++j){var ixfe=val.rkrec[j-val.c][0];temp_val={ixfe:ixfe,XF:XFs[ixfe],v:val.rkrec[j-val.c][1],t:"n"};if(temp_val.XF)safe_format_xf(temp_val,options,wb.opts.Date1904);addcell({c:j,r:val.r},temp_val,options)}}break;case"Formula":{switch(val.val){case"String":last_formula=val;break;case"Array Formula":throw"Array Formula unsupported";default:temp_val={v:val.val,ixfe:val.cell.ixfe,t:val.tt};temp_val.XF=XFs[temp_val.ixfe];if(options.cellFormula)temp_val.f="="+stringify_formula(val.formula,range,val.cell,supbooks,opts);if(temp_val.XF)safe_format_xf(temp_val,options,wb.opts.Date1904);addcell(val.cell,temp_val,options);last_formula=val}}break;case"String":{if(last_formula){last_formula.val=val;temp_val={v:last_formula.val,ixfe:last_formula.cell.ixfe,t:"s"};temp_val.XF=XFs[temp_val.ixfe];if(options.cellFormula)temp_val.f="="+stringify_formula(last_formula.formula,range,last_formula.cell,supbooks,opts);if(temp_val.XF)safe_format_xf(temp_val,options,wb.opts.Date1904);addcell(last_formula.cell,temp_val,options);last_formula=null}}break;case"Array":{array_formulae.push(val)}break;case"ShrFmla":{if(!cell_valid)break;shared_formulae[encode_cell(last_formula.cell)]=val[0]}break;case"LabelSst":temp_val=make_cell(sst[val.isst].t,val.ixfe,"s");temp_val.XF=XFs[temp_val.ixfe];if(temp_val.XF)safe_format_xf(temp_val,options,wb.opts.Date1904);addcell({c:val.c,r:val.r},temp_val,options);break;case"Label":case"BIFF2STR":temp_val=make_cell(val.val,val.ixfe,"s");temp_val.XF=XFs[temp_val.ixfe];if(temp_val.XF)safe_format_xf(temp_val,options,wb.opts.Date1904);addcell({c:val.c,r:val.r},temp_val,options);break;case"Dimensions":{if(file_depth===1)range=val}break;case"SST":{sst=val}break;case"Format":{SSF.load(val[1],val[0])}break;case"MergeCells":mergecells=mergecells.concat(val);break;case"Obj":objects[val.cmo[0]]=opts.lastobj=val;break;case"TxO":opts.lastobj.TxO=val;break;case"HLink":{for(rngR=val[0].s.r;rngR<=val[0].e.r;++rngR)for(rngC=val[0].s.c;rngC<=val[0].e.c;++rngC)if(out[encode_cell({c:rngC,r:rngR})])out[encode_cell({c:rngC,r:rngR})].l=val[1]}break;case"HLinkTooltip":{for(rngR=val[0].s.r;rngR<=val[0].e.r;++rngR)for(rngC=val[0].s.c;rngC<=val[0].e.c;++rngC)if(out[encode_cell({c:rngC,r:rngR})])out[encode_cell({c:rngC,r:rngR})].l.tooltip=val[1]}break;case"Note":{if(opts.biff<=5&&opts.biff>=2)break;cc=out[encode_cell(val[0])];var noteobj=objects[val[2]];if(!cc)break;if(!cc.c)cc.c=[];cmnt={a:val[1],t:noteobj.TxO.t};cc.c.push(cmnt)}break;default:switch(R.n){case"ClrtClient":break;case"XFExt":update_xfext(XFs[val.ixfe],val.ext);break;case"NameCmt":break;case"Header":break;case"Footer":break;case"HCenter":break;case"VCenter":break;case"Pls":break;case"Setup":break;case"DefColWidth":break;case"GCW":break;case"LHRecord":break;case"ColInfo":break;case"Row":break;case"DBCell":break;case"MulBlank":break;case"EntExU2":break;case"SxView":break;case"Sxvd":break;case"SXVI":break;case"SXVDEx":break;case"SxIvd":break;case"SXDI":break;case"SXLI":break;case"SXEx":break;case"QsiSXTag":break;case"Selection":break;case"Feat":break;case"FeatHdr":case"FeatHdr11":break;case"Feature11":case"Feature12":case"List12":break;case"Blank":break;case"Country":country=val;break;case"RecalcId":break;case"DefaultRowHeight":case"DxGCol":break;case"Fbi":case"Fbi2":case"GelFrame":break;case"Font":break;case"XFCRC":break;case"Style":break;case"StyleExt":break;case"Palette":palette=val;break;case"Theme":break;case"ScenarioProtect":break;case"ObjProtect":break;case"CondFmt12":break;case"Table":break;case"TableStyles":break;case"TableStyle":break;case"TableStyleElement":break;case"SXStreamID":break;case"SXVS":break;case"DConRef":break;case"SXAddl":break;case"DConBin":break;case"DConName":break;case"SXPI":break;case"SxFormat":break;case"SxSelect":break;case"SxRule":break;case"SxFilt":break;case"SxItm":break;case"SxDXF":break;case"ScenMan":break;case"DCon":break;case"CellWatch":break;case"PrintRowCol":break;case"PrintGrid":break;case"PrintSize":break;case"XCT":break;case"CRN":break;case"Scl":{}break;case"SheetExt":{}break;case"SheetExtOptional":{}break;case"ObNoMacros":{}break;case"ObProj":{}break;case"CodeName":{}break;case"GUIDTypeLib":{}break;case"WOpt":break;case"PhoneticInfo":break;case"OleObjectSize":break;case"DXF":case"DXFN":case"DXFN12":case"DXFN12List":case"DXFN12NoCB":break;case"Dv":case"DVal":break;case"BRAI":case"Series":case"SeriesText":break;case"DConn":break;case"DbOrParamQry":break;case"DBQueryExt":break;case"IFmtRecord":break;case"CondFmt":case"CF":case"CF12":case"CFEx":break;case"Excel9File":break;case"Units":break;case"InterfaceHdr":case"Mms":case"InterfaceEnd":case"DSF":case"BuiltInFnGroupCount":case"Window1":case"Window2":case"HideObj":case"GridSet":case"Guts":case"UserBView":case"UserSViewBegin":case"UserSViewEnd":case"Pane":break;default:switch(R.n){case"Dat":case"Begin":case"End":case"StartBlock":case"EndBlock":case"Frame":case"Area":case"Axis":case"AxisLine":case"Tick":break;case"AxesUsed":case"CrtLayout12":case"CrtLayout12A":case"CrtLink":case"CrtLine":case"CrtMlFrt":case"CrtMlFrtContinue":break;case"LineFormat":case"AreaFormat":case"Chart":case"Chart3d":case"Chart3DBarShape":case"ChartFormat":case"ChartFrtInfo":break;case"PlotArea":case"PlotGrowth":break;case"SeriesList":case"SerParent":case"SerAuxTrend":break;case"DataFormat":case"SerToCrt":case"FontX":break;case"CatSerRange":case"AxcExt":case"SerFmt":break;case"ShtProps":break;case"DefaultText":case"Text":case"CatLab":break;case"DataLabExtContents":break;case"Legend":case"LegendException":break;case"Pie":case"Scatter":break;case"PieFormat":case"MarkerFormat":break;case"StartObject":case"EndObject":break;case"AlRuns":case"ObjectLink":break;case"SIIndex":break;case"AttachedLabel":case"YMult":break;case"Line":case"Bar":break;case"Surf":break;case"AxisParent":break;case"Pos":break;case"ValueRange":break;case"SXViewEx9":break;case"SXViewLink":break;case"PivotChartBits":break;case"SBaseRef":break;case"TextPropsStream":break;case"LnExt":break;case"MkrExt":break;case"CrtCoopt":break;case"Qsi":case"Qsif":case"Qsir":case"QsiSXTag":break;case"TxtQry":break;case"FilterMode":break;case"AutoFilter":case"AutoFilterInfo":break;case"AutoFilter12":break;case"DropDownObjIds":break;case"Sort":break;case"SortData":break;case"ShapePropsStream":break;case"MsoDrawing":case"MsoDrawingGroup":case"MsoDrawingSelection":break;case"ImData":break;case"WebPub":case"AutoWebPub":case"RightMargin":case"LeftMargin":case"TopMargin":case"BottomMargin":case"HeaderFooter":case"HFPicture":case"PLV":case"HorizontalPageBreaks":case"VerticalPageBreaks":case"Backup":case"CompressPictures":case"Compat12":break;case"Continue":case"ContinueFrt12":break;case"FrtFontList":case"FrtWrapper":break;case"ExternCount":break;case"RString":break;case"TabIdConf":case"Radar":case"RadarArea":case"DropBar":case"Intl":case"CoordList":case"SerAuxErrBar":break;default:switch(R.n){case"SCENARIO":case"DConBin":case"PicF":case"DataLabExt":case"Lel":case"BopPop":case"BopPopCustom":case"RealTimeData":case"Name":break;default:if(options.WTF)throw"Unrecognized Record "+R.n}}}}}else blob.l+=length}var sheetnamesraw=opts.biff===2?["Sheet1"]:Object.keys(Directory).sort(function(a,b){return Number(a)-Number(b)}).map(function(x){return Directory[x].name});var sheetnames=sheetnamesraw.slice();wb.Directory=sheetnamesraw;wb.SheetNames=sheetnamesraw;if(!options.bookSheets)wb.Sheets=Sheets;wb.Preamble=Preamble;wb.Strings=sst;wb.SSF=SSF.get_table();if(opts.enc)wb.Encryption=opts.enc;wb.Metadata={};if(country!==undefined)wb.Metadata.Country=country;return wb}function parse_xlscfb(cfb,options){if(!options)options={};fix_read_opts(options);reset_cp();var CompObj,Summary,Workbook;if(cfb.find){CompObj=cfb.find("!CompObj");Summary=cfb.find("!SummaryInformation");Workbook=cfb.find("/Workbook")}else{prep_blob(cfb,0);Workbook={content:cfb}}if(!Workbook)Workbook=cfb.find("/Book");var CompObjP,SummaryP,WorkbookP;if(CompObj)CompObjP=parse_compobj(CompObj);if(options.bookProps&&!options.bookSheets)WorkbookP={};else{if(Workbook)WorkbookP=parse_workbook(Workbook.content,options,!!Workbook.find);else throw new Error("Cannot find Workbook stream")}if(cfb.find)parse_props(cfb);var props={};for(var y in cfb.Summary)props[y]=cfb.Summary[y];for(y in cfb.DocSummary)props[y]=cfb.DocSummary[y];WorkbookP.Props=WorkbookP.Custprops=props;if(options.bookFiles)WorkbookP.cfb=cfb;WorkbookP.CompObjP=CompObjP;return WorkbookP}function parse_props(cfb){var DSI=cfb.find("!DocumentSummaryInformation");if(DSI)try{cfb.DocSummary=parse_PropertySetStream(DSI,DocSummaryPIDDSI)}catch(e){}var SI=cfb.find("!SummaryInformation");if(SI)try{cfb.Summary=parse_PropertySetStream(SI,SummaryPIDSI)}catch(e){}}var XLSBRecordEnum={0:{n:"BrtRowHdr",f:parse_BrtRowHdr},1:{n:"BrtCellBlank",f:parse_BrtCellBlank},2:{n:"BrtCellRk",f:parse_BrtCellRk},3:{n:"BrtCellError",f:parse_BrtCellError},4:{n:"BrtCellBool",f:parse_BrtCellBool},5:{n:"BrtCellReal",f:parse_BrtCellReal},6:{n:"BrtCellSt",f:parse_BrtCellSt},7:{n:"BrtCellIsst",f:parse_BrtCellIsst},8:{n:"BrtFmlaString",f:parse_BrtFmlaString},9:{n:"BrtFmlaNum",f:parse_BrtFmlaNum},10:{n:"BrtFmlaBool",f:parse_BrtFmlaBool},11:{n:"BrtFmlaError",f:parse_BrtFmlaError},16:{n:"BrtFRTArchID$",f:parse_BrtFRTArchID$},19:{n:"BrtSSTItem",f:parse_RichStr},20:{n:"BrtPCDIMissing",f:parsenoop},21:{n:"BrtPCDINumber",f:parsenoop},22:{n:"BrtPCDIBoolean",f:parsenoop},23:{n:"BrtPCDIError",f:parsenoop},24:{n:"BrtPCDIString",f:parsenoop},25:{n:"BrtPCDIDatetime",f:parsenoop},26:{n:"BrtPCDIIndex",f:parsenoop},27:{n:"BrtPCDIAMissing",f:parsenoop},28:{n:"BrtPCDIANumber",f:parsenoop},29:{n:"BrtPCDIABoolean",f:parsenoop},30:{n:"BrtPCDIAError",f:parsenoop},31:{n:"BrtPCDIAString",f:parsenoop},32:{n:"BrtPCDIADatetime",f:parsenoop},33:{n:"BrtPCRRecord",f:parsenoop},34:{n:"BrtPCRRecordDt",f:parsenoop},35:{n:"BrtFRTBegin",f:parsenoop},36:{n:"BrtFRTEnd",f:parsenoop},37:{n:"BrtACBegin",f:parsenoop},38:{n:"BrtACEnd",f:parsenoop},39:{n:"BrtName",f:parsenoop},40:{n:"BrtIndexRowBlock",f:parsenoop},42:{n:"BrtIndexBlock",f:parsenoop},43:{n:"BrtFont",f:parse_BrtFont},44:{n:"BrtFmt",f:parse_BrtFmt},45:{n:"BrtFill",f:parsenoop},46:{n:"BrtBorder",f:parsenoop},47:{n:"BrtXF",f:parse_BrtXF},48:{n:"BrtStyle",f:parsenoop},49:{n:"BrtCellMeta",f:parsenoop},50:{n:"BrtValueMeta",f:parsenoop},51:{n:"BrtMdb",f:parsenoop},52:{n:"BrtBeginFmd",f:parsenoop},53:{n:"BrtEndFmd",f:parsenoop},54:{n:"BrtBeginMdx",f:parsenoop},55:{n:"BrtEndMdx",f:parsenoop},56:{n:"BrtBeginMdxTuple",f:parsenoop},57:{n:"BrtEndMdxTuple",f:parsenoop},58:{n:"BrtMdxMbrIstr",f:parsenoop},59:{n:"BrtStr",f:parsenoop},60:{n:"BrtColInfo",f:parsenoop},62:{n:"BrtCellRString",f:parsenoop},63:{n:"BrtCalcChainItem$",f:parse_BrtCalcChainItem$},64:{n:"BrtDVal",f:parsenoop},65:{n:"BrtSxvcellNum",f:parsenoop},66:{n:"BrtSxvcellStr",f:parsenoop},67:{n:"BrtSxvcellBool",f:parsenoop},68:{n:"BrtSxvcellErr",f:parsenoop},69:{n:"BrtSxvcellDate",f:parsenoop},70:{n:"BrtSxvcellNil",f:parsenoop},128:{n:"BrtFileVersion",f:parsenoop},129:{n:"BrtBeginSheet",f:parsenoop},130:{n:"BrtEndSheet",f:parsenoop},131:{n:"BrtBeginBook",f:parsenoop,p:0},132:{n:"BrtEndBook",f:parsenoop},133:{n:"BrtBeginWsViews",f:parsenoop},134:{n:"BrtEndWsViews",f:parsenoop},135:{n:"BrtBeginBookViews",f:parsenoop},136:{n:"BrtEndBookViews",f:parsenoop},137:{n:"BrtBeginWsView",f:parsenoop},138:{n:"BrtEndWsView",f:parsenoop},139:{n:"BrtBeginCsViews",f:parsenoop},140:{n:"BrtEndCsViews",f:parsenoop},141:{n:"BrtBeginCsView",f:parsenoop},142:{n:"BrtEndCsView",f:parsenoop},143:{n:"BrtBeginBundleShs",f:parsenoop},144:{n:"BrtEndBundleShs",f:parsenoop},145:{n:"BrtBeginSheetData",f:parsenoop},146:{n:"BrtEndSheetData",f:parsenoop},147:{n:"BrtWsProp",f:parse_BrtWsProp},148:{n:"BrtWsDim",f:parse_BrtWsDim,p:16},151:{n:"BrtPane",f:parsenoop},152:{n:"BrtSel",f:parsenoop},153:{n:"BrtWbProp",f:parse_BrtWbProp},154:{n:"BrtWbFactoid",f:parsenoop},155:{n:"BrtFileRecover",f:parsenoop},156:{n:"BrtBundleSh",f:parse_BrtBundleSh},157:{n:"BrtCalcProp",f:parsenoop},158:{n:"BrtBookView",f:parsenoop},159:{n:"BrtBeginSst",f:parse_BrtBeginSst},160:{n:"BrtEndSst",f:parsenoop},161:{n:"BrtBeginAFilter",f:parsenoop},162:{n:"BrtEndAFilter",f:parsenoop},163:{n:"BrtBeginFilterColumn",f:parsenoop},164:{n:"BrtEndFilterColumn",f:parsenoop},165:{n:"BrtBeginFilters",f:parsenoop},166:{n:"BrtEndFilters",f:parsenoop},167:{n:"BrtFilter",f:parsenoop},168:{n:"BrtColorFilter",f:parsenoop},169:{n:"BrtIconFilter",f:parsenoop},170:{n:"BrtTop10Filter",f:parsenoop},171:{n:"BrtDynamicFilter",f:parsenoop},172:{n:"BrtBeginCustomFilters",f:parsenoop},173:{n:"BrtEndCustomFilters",f:parsenoop},174:{n:"BrtCustomFilter",f:parsenoop},175:{n:"BrtAFilterDateGroupItem",f:parsenoop},176:{n:"BrtMergeCell",f:parse_BrtMergeCell},177:{n:"BrtBeginMergeCells",f:parsenoop},178:{n:"BrtEndMergeCells",f:parsenoop},179:{n:"BrtBeginPivotCacheDef",f:parsenoop},180:{n:"BrtEndPivotCacheDef",f:parsenoop},181:{n:"BrtBeginPCDFields",f:parsenoop},182:{n:"BrtEndPCDFields",f:parsenoop},183:{n:"BrtBeginPCDField",f:parsenoop},184:{n:"BrtEndPCDField",f:parsenoop},185:{n:"BrtBeginPCDSource",f:parsenoop},186:{n:"BrtEndPCDSource",f:parsenoop},187:{n:"BrtBeginPCDSRange",f:parsenoop},188:{n:"BrtEndPCDSRange",f:parsenoop},189:{n:"BrtBeginPCDFAtbl",f:parsenoop},190:{n:"BrtEndPCDFAtbl",f:parsenoop},191:{n:"BrtBeginPCDIRun",f:parsenoop},192:{n:"BrtEndPCDIRun",f:parsenoop},193:{n:"BrtBeginPivotCacheRecords",f:parsenoop},194:{n:"BrtEndPivotCacheRecords",f:parsenoop},195:{n:"BrtBeginPCDHierarchies",f:parsenoop},196:{n:"BrtEndPCDHierarchies",f:parsenoop},197:{n:"BrtBeginPCDHierarchy",f:parsenoop},198:{n:"BrtEndPCDHierarchy",f:parsenoop},199:{n:"BrtBeginPCDHFieldsUsage",f:parsenoop},200:{n:"BrtEndPCDHFieldsUsage",f:parsenoop},201:{n:"BrtBeginExtConnection",f:parsenoop},202:{n:"BrtEndExtConnection",f:parsenoop},203:{n:"BrtBeginECDbProps",f:parsenoop},204:{n:"BrtEndECDbProps",f:parsenoop},205:{n:"BrtBeginECOlapProps",f:parsenoop},206:{n:"BrtEndECOlapProps",f:parsenoop},207:{n:"BrtBeginPCDSConsol",f:parsenoop},208:{n:"BrtEndPCDSConsol",f:parsenoop},209:{n:"BrtBeginPCDSCPages",f:parsenoop},210:{n:"BrtEndPCDSCPages",f:parsenoop},211:{n:"BrtBeginPCDSCPage",f:parsenoop},212:{n:"BrtEndPCDSCPage",f:parsenoop},213:{n:"BrtBeginPCDSCPItem",f:parsenoop},214:{n:"BrtEndPCDSCPItem",f:parsenoop},215:{n:"BrtBeginPCDSCSets",f:parsenoop},216:{n:"BrtEndPCDSCSets",f:parsenoop},217:{n:"BrtBeginPCDSCSet",f:parsenoop},218:{n:"BrtEndPCDSCSet",f:parsenoop},219:{n:"BrtBeginPCDFGroup",f:parsenoop},220:{n:"BrtEndPCDFGroup",f:parsenoop},221:{n:"BrtBeginPCDFGItems",f:parsenoop},222:{n:"BrtEndPCDFGItems",f:parsenoop},223:{n:"BrtBeginPCDFGRange",f:parsenoop},224:{n:"BrtEndPCDFGRange",f:parsenoop},225:{n:"BrtBeginPCDFGDiscrete",f:parsenoop},226:{n:"BrtEndPCDFGDiscrete",f:parsenoop},227:{n:"BrtBeginPCDSDTupleCache",f:parsenoop},228:{n:"BrtEndPCDSDTupleCache",f:parsenoop},229:{n:"BrtBeginPCDSDTCEntries",f:parsenoop},230:{n:"BrtEndPCDSDTCEntries",f:parsenoop},231:{n:"BrtBeginPCDSDTCEMembers",f:parsenoop},232:{n:"BrtEndPCDSDTCEMembers",f:parsenoop},233:{n:"BrtBeginPCDSDTCEMember",f:parsenoop},234:{n:"BrtEndPCDSDTCEMember",f:parsenoop},235:{n:"BrtBeginPCDSDTCQueries",f:parsenoop},236:{n:"BrtEndPCDSDTCQueries",f:parsenoop},237:{n:"BrtBeginPCDSDTCQuery",f:parsenoop},238:{n:"BrtEndPCDSDTCQuery",f:parsenoop},239:{n:"BrtBeginPCDSDTCSets",f:parsenoop},240:{n:"BrtEndPCDSDTCSets",f:parsenoop},241:{n:"BrtBeginPCDSDTCSet",f:parsenoop},242:{n:"BrtEndPCDSDTCSet",f:parsenoop},243:{n:"BrtBeginPCDCalcItems",f:parsenoop},244:{n:"BrtEndPCDCalcItems",f:parsenoop},245:{n:"BrtBeginPCDCalcItem",f:parsenoop},246:{n:"BrtEndPCDCalcItem",f:parsenoop},247:{n:"BrtBeginPRule",f:parsenoop},248:{n:"BrtEndPRule",f:parsenoop},249:{n:"BrtBeginPRFilters",f:parsenoop},250:{n:"BrtEndPRFilters",f:parsenoop},251:{n:"BrtBeginPRFilter",f:parsenoop},252:{n:"BrtEndPRFilter",f:parsenoop},253:{n:"BrtBeginPNames",f:parsenoop},254:{n:"BrtEndPNames",f:parsenoop},255:{n:"BrtBeginPName",f:parsenoop},256:{n:"BrtEndPName",f:parsenoop},257:{n:"BrtBeginPNPairs",f:parsenoop},258:{n:"BrtEndPNPairs",f:parsenoop},259:{n:"BrtBeginPNPair",f:parsenoop},260:{n:"BrtEndPNPair",f:parsenoop},261:{n:"BrtBeginECWebProps",f:parsenoop},262:{n:"BrtEndECWebProps",f:parsenoop},263:{n:"BrtBeginEcWpTables",f:parsenoop},264:{n:"BrtEndECWPTables",f:parsenoop},265:{n:"BrtBeginECParams",f:parsenoop},266:{n:"BrtEndECParams",f:parsenoop},267:{n:"BrtBeginECParam",f:parsenoop},268:{n:"BrtEndECParam",f:parsenoop},269:{n:"BrtBeginPCDKPIs",f:parsenoop},270:{n:"BrtEndPCDKPIs",f:parsenoop},271:{n:"BrtBeginPCDKPI",f:parsenoop},272:{n:"BrtEndPCDKPI",f:parsenoop},273:{n:"BrtBeginDims",f:parsenoop},274:{n:"BrtEndDims",f:parsenoop},275:{n:"BrtBeginDim",f:parsenoop},276:{n:"BrtEndDim",f:parsenoop},277:{n:"BrtIndexPartEnd",f:parsenoop},278:{n:"BrtBeginStyleSheet",f:parsenoop},279:{n:"BrtEndStyleSheet",f:parsenoop},280:{n:"BrtBeginSXView",f:parsenoop},281:{n:"BrtEndSXVI",f:parsenoop},282:{n:"BrtBeginSXVI",f:parsenoop},283:{n:"BrtBeginSXVIs",f:parsenoop},284:{n:"BrtEndSXVIs",f:parsenoop},285:{n:"BrtBeginSXVD",f:parsenoop},286:{n:"BrtEndSXVD",f:parsenoop},287:{n:"BrtBeginSXVDs",f:parsenoop},288:{n:"BrtEndSXVDs",f:parsenoop},289:{n:"BrtBeginSXPI",f:parsenoop},290:{n:"BrtEndSXPI",f:parsenoop},291:{n:"BrtBeginSXPIs",f:parsenoop},292:{n:"BrtEndSXPIs",f:parsenoop},293:{n:"BrtBeginSXDI",f:parsenoop},294:{n:"BrtEndSXDI",f:parsenoop},295:{n:"BrtBeginSXDIs",f:parsenoop},296:{n:"BrtEndSXDIs",f:parsenoop},297:{n:"BrtBeginSXLI",f:parsenoop},298:{n:"BrtEndSXLI",f:parsenoop},299:{n:"BrtBeginSXLIRws",f:parsenoop},300:{n:"BrtEndSXLIRws",f:parsenoop},301:{n:"BrtBeginSXLICols",f:parsenoop},302:{n:"BrtEndSXLICols",f:parsenoop},303:{n:"BrtBeginSXFormat",f:parsenoop},304:{n:"BrtEndSXFormat",f:parsenoop},305:{n:"BrtBeginSXFormats",f:parsenoop},306:{n:"BrtEndSxFormats",f:parsenoop},307:{n:"BrtBeginSxSelect",f:parsenoop},308:{n:"BrtEndSxSelect",f:parsenoop},309:{n:"BrtBeginISXVDRws",f:parsenoop},310:{n:"BrtEndISXVDRws",f:parsenoop},311:{n:"BrtBeginISXVDCols",f:parsenoop},312:{n:"BrtEndISXVDCols",f:parsenoop},313:{n:"BrtEndSXLocation",f:parsenoop},314:{n:"BrtBeginSXLocation",f:parsenoop},315:{n:"BrtEndSXView",f:parsenoop},316:{n:"BrtBeginSXTHs",f:parsenoop},317:{n:"BrtEndSXTHs",f:parsenoop},318:{n:"BrtBeginSXTH",f:parsenoop},319:{n:"BrtEndSXTH",f:parsenoop},320:{n:"BrtBeginISXTHRws",f:parsenoop},321:{n:"BrtEndISXTHRws",f:parsenoop},322:{n:"BrtBeginISXTHCols",f:parsenoop},323:{n:"BrtEndISXTHCols",f:parsenoop},324:{n:"BrtBeginSXTDMPS",f:parsenoop},325:{n:"BrtEndSXTDMPs",f:parsenoop},326:{n:"BrtBeginSXTDMP",f:parsenoop},327:{n:"BrtEndSXTDMP",f:parsenoop},328:{n:"BrtBeginSXTHItems",f:parsenoop},329:{n:"BrtEndSXTHItems",f:parsenoop},330:{n:"BrtBeginSXTHItem",f:parsenoop},331:{n:"BrtEndSXTHItem",f:parsenoop},332:{n:"BrtBeginMetadata",f:parsenoop},333:{n:"BrtEndMetadata",f:parsenoop},334:{n:"BrtBeginEsmdtinfo",f:parsenoop},335:{n:"BrtMdtinfo",f:parsenoop},336:{n:"BrtEndEsmdtinfo",f:parsenoop},337:{n:"BrtBeginEsmdb",f:parsenoop},338:{n:"BrtEndEsmdb",f:parsenoop},339:{n:"BrtBeginEsfmd",f:parsenoop},340:{n:"BrtEndEsfmd",f:parsenoop},341:{n:"BrtBeginSingleCells",f:parsenoop},342:{n:"BrtEndSingleCells",f:parsenoop},343:{n:"BrtBeginList",f:parsenoop},344:{n:"BrtEndList",f:parsenoop},345:{n:"BrtBeginListCols",f:parsenoop},346:{n:"BrtEndListCols",f:parsenoop},347:{n:"BrtBeginListCol",f:parsenoop},348:{n:"BrtEndListCol",f:parsenoop},349:{n:"BrtBeginListXmlCPr",f:parsenoop},350:{n:"BrtEndListXmlCPr",f:parsenoop},351:{n:"BrtListCCFmla",f:parsenoop},352:{n:"BrtListTrFmla",f:parsenoop},353:{n:"BrtBeginExternals",f:parsenoop},354:{n:"BrtEndExternals",f:parsenoop},355:{n:"BrtSupBookSrc",f:parsenoop},357:{n:"BrtSupSelf",f:parsenoop},358:{n:"BrtSupSame",f:parsenoop},359:{n:"BrtSupTabs",f:parsenoop},360:{n:"BrtBeginSupBook",f:parsenoop},361:{n:"BrtPlaceholderName",f:parsenoop},362:{n:"BrtExternSheet",f:parsenoop},363:{n:"BrtExternTableStart",f:parsenoop},364:{n:"BrtExternTableEnd",f:parsenoop},366:{n:"BrtExternRowHdr",f:parsenoop},367:{n:"BrtExternCellBlank",f:parsenoop},368:{n:"BrtExternCellReal",f:parsenoop},369:{n:"BrtExternCellBool",f:parsenoop},370:{n:"BrtExternCellError",f:parsenoop},371:{n:"BrtExternCellString",f:parsenoop},372:{n:"BrtBeginEsmdx",f:parsenoop},373:{n:"BrtEndEsmdx",f:parsenoop},374:{n:"BrtBeginMdxSet",f:parsenoop},375:{n:"BrtEndMdxSet",f:parsenoop},376:{n:"BrtBeginMdxMbrProp",f:parsenoop},377:{n:"BrtEndMdxMbrProp",f:parsenoop},378:{n:"BrtBeginMdxKPI",f:parsenoop},379:{n:"BrtEndMdxKPI",f:parsenoop},380:{n:"BrtBeginEsstr",f:parsenoop},381:{n:"BrtEndEsstr",f:parsenoop},382:{n:"BrtBeginPRFItem",f:parsenoop},383:{n:"BrtEndPRFItem",f:parsenoop},384:{n:"BrtBeginPivotCacheIDs",f:parsenoop},385:{n:"BrtEndPivotCacheIDs",f:parsenoop},386:{n:"BrtBeginPivotCacheID",f:parsenoop},387:{n:"BrtEndPivotCacheID",f:parsenoop},388:{n:"BrtBeginISXVIs",f:parsenoop},389:{n:"BrtEndISXVIs",f:parsenoop},390:{n:"BrtBeginColInfos",f:parsenoop},391:{n:"BrtEndColInfos",f:parsenoop},392:{n:"BrtBeginRwBrk",f:parsenoop},393:{n:"BrtEndRwBrk",f:parsenoop},394:{n:"BrtBeginColBrk",f:parsenoop},395:{n:"BrtEndColBrk",f:parsenoop},396:{n:"BrtBrk",f:parsenoop},397:{n:"BrtUserBookView",f:parsenoop},398:{n:"BrtInfo",f:parsenoop},399:{n:"BrtCUsr",f:parsenoop},400:{n:"BrtUsr",f:parsenoop},401:{n:"BrtBeginUsers",f:parsenoop},403:{n:"BrtEOF",f:parsenoop},404:{n:"BrtUCR",f:parsenoop},405:{n:"BrtRRInsDel",f:parsenoop},406:{n:"BrtRREndInsDel",f:parsenoop},407:{n:"BrtRRMove",f:parsenoop},408:{n:"BrtRREndMove",f:parsenoop},409:{n:"BrtRRChgCell",f:parsenoop},410:{n:"BrtRREndChgCell",f:parsenoop},411:{n:"BrtRRHeader",f:parsenoop},412:{n:"BrtRRUserView",f:parsenoop},413:{n:"BrtRRRenSheet",f:parsenoop},414:{n:"BrtRRInsertSh",f:parsenoop},415:{n:"BrtRRDefName",f:parsenoop},416:{n:"BrtRRNote",f:parsenoop},417:{n:"BrtRRConflict",f:parsenoop},418:{n:"BrtRRTQSIF",f:parsenoop},419:{n:"BrtRRFormat",f:parsenoop},420:{n:"BrtRREndFormat",f:parsenoop},421:{n:"BrtRRAutoFmt",f:parsenoop},422:{n:"BrtBeginUserShViews",f:parsenoop},423:{n:"BrtBeginUserShView",f:parsenoop},424:{n:"BrtEndUserShView",f:parsenoop},425:{n:"BrtEndUserShViews",f:parsenoop},426:{n:"BrtArrFmla",f:parsenoop},427:{n:"BrtShrFmla",f:parsenoop},428:{n:"BrtTable",f:parsenoop},429:{n:"BrtBeginExtConnections",f:parsenoop},430:{n:"BrtEndExtConnections",f:parsenoop},431:{n:"BrtBeginPCDCalcMems",f:parsenoop},432:{n:"BrtEndPCDCalcMems",f:parsenoop},433:{n:"BrtBeginPCDCalcMem",f:parsenoop},434:{n:"BrtEndPCDCalcMem",f:parsenoop},435:{n:"BrtBeginPCDHGLevels",f:parsenoop},436:{n:"BrtEndPCDHGLevels",f:parsenoop},437:{n:"BrtBeginPCDHGLevel",f:parsenoop},438:{n:"BrtEndPCDHGLevel",f:parsenoop},439:{n:"BrtBeginPCDHGLGroups",f:parsenoop},440:{n:"BrtEndPCDHGLGroups",f:parsenoop},441:{n:"BrtBeginPCDHGLGroup",f:parsenoop},442:{n:"BrtEndPCDHGLGroup",f:parsenoop},443:{n:"BrtBeginPCDHGLGMembers",f:parsenoop},444:{n:"BrtEndPCDHGLGMembers",f:parsenoop},445:{n:"BrtBeginPCDHGLGMember",f:parsenoop},446:{n:"BrtEndPCDHGLGMember",f:parsenoop},447:{n:"BrtBeginQSI",f:parsenoop},448:{n:"BrtEndQSI",f:parsenoop},449:{n:"BrtBeginQSIR",f:parsenoop},450:{n:"BrtEndQSIR",f:parsenoop},451:{n:"BrtBeginDeletedNames",f:parsenoop},452:{n:"BrtEndDeletedNames",f:parsenoop},453:{n:"BrtBeginDeletedName",f:parsenoop},454:{n:"BrtEndDeletedName",f:parsenoop},455:{n:"BrtBeginQSIFs",f:parsenoop},456:{n:"BrtEndQSIFs",f:parsenoop},457:{n:"BrtBeginQSIF",f:parsenoop},458:{n:"BrtEndQSIF",f:parsenoop},459:{n:"BrtBeginAutoSortScope",f:parsenoop},460:{n:"BrtEndAutoSortScope",f:parsenoop},461:{n:"BrtBeginConditionalFormatting",f:parsenoop},462:{n:"BrtEndConditionalFormatting",f:parsenoop},463:{n:"BrtBeginCFRule",f:parsenoop},464:{n:"BrtEndCFRule",f:parsenoop},465:{n:"BrtBeginIconSet",f:parsenoop},466:{n:"BrtEndIconSet",f:parsenoop},467:{n:"BrtBeginDatabar",f:parsenoop},468:{n:"BrtEndDatabar",f:parsenoop},469:{n:"BrtBeginColorScale",f:parsenoop},470:{n:"BrtEndColorScale",f:parsenoop},471:{n:"BrtCFVO",f:parsenoop},472:{n:"BrtExternValueMeta",f:parsenoop},473:{n:"BrtBeginColorPalette",f:parsenoop},474:{n:"BrtEndColorPalette",f:parsenoop},475:{n:"BrtIndexedColor",f:parsenoop},476:{n:"BrtMargins",f:parsenoop},477:{n:"BrtPrintOptions",f:parsenoop},478:{n:"BrtPageSetup",f:parsenoop},479:{n:"BrtBeginHeaderFooter",f:parsenoop},480:{n:"BrtEndHeaderFooter",f:parsenoop},481:{n:"BrtBeginSXCrtFormat",f:parsenoop},482:{n:"BrtEndSXCrtFormat",f:parsenoop},483:{n:"BrtBeginSXCrtFormats",f:parsenoop},484:{n:"BrtEndSXCrtFormats",f:parsenoop},485:{n:"BrtWsFmtInfo",f:parsenoop},486:{n:"BrtBeginMgs",f:parsenoop},487:{n:"BrtEndMGs",f:parsenoop},488:{n:"BrtBeginMGMaps",f:parsenoop},489:{n:"BrtEndMGMaps",f:parsenoop},490:{n:"BrtBeginMG",f:parsenoop},491:{n:"BrtEndMG",f:parsenoop},492:{n:"BrtBeginMap",f:parsenoop},493:{n:"BrtEndMap",f:parsenoop},494:{n:"BrtHLink",f:parse_BrtHLink},495:{n:"BrtBeginDCon",f:parsenoop},496:{n:"BrtEndDCon",f:parsenoop},497:{n:"BrtBeginDRefs",f:parsenoop},498:{n:"BrtEndDRefs",f:parsenoop},499:{n:"BrtDRef",f:parsenoop},500:{n:"BrtBeginScenMan",f:parsenoop},501:{n:"BrtEndScenMan",f:parsenoop},502:{n:"BrtBeginSct",f:parsenoop},503:{n:"BrtEndSct",f:parsenoop},504:{n:"BrtSlc",f:parsenoop},505:{n:"BrtBeginDXFs",f:parsenoop},506:{n:"BrtEndDXFs",f:parsenoop},507:{n:"BrtDXF",f:parsenoop},508:{n:"BrtBeginTableStyles",f:parsenoop},509:{n:"BrtEndTableStyles",f:parsenoop},510:{n:"BrtBeginTableStyle",f:parsenoop},511:{n:"BrtEndTableStyle",f:parsenoop},512:{n:"BrtTableStyleElement",f:parsenoop},513:{n:"BrtTableStyleClient",f:parsenoop},514:{n:"BrtBeginVolDeps",f:parsenoop},515:{n:"BrtEndVolDeps",f:parsenoop},516:{n:"BrtBeginVolType",f:parsenoop},517:{n:"BrtEndVolType",f:parsenoop},518:{n:"BrtBeginVolMain",f:parsenoop},519:{n:"BrtEndVolMain",f:parsenoop},520:{n:"BrtBeginVolTopic",f:parsenoop},521:{n:"BrtEndVolTopic",f:parsenoop},522:{n:"BrtVolSubtopic",f:parsenoop},523:{n:"BrtVolRef",f:parsenoop},524:{n:"BrtVolNum",f:parsenoop},525:{n:"BrtVolErr",f:parsenoop},526:{n:"BrtVolStr",f:parsenoop},527:{n:"BrtVolBool",f:parsenoop},528:{n:"BrtBeginCalcChain$",f:parsenoop},529:{n:"BrtEndCalcChain$",f:parsenoop},530:{n:"BrtBeginSortState",f:parsenoop},531:{n:"BrtEndSortState",f:parsenoop},532:{n:"BrtBeginSortCond",f:parsenoop},533:{n:"BrtEndSortCond",f:parsenoop},534:{n:"BrtBookProtection",f:parsenoop},535:{n:"BrtSheetProtection",f:parsenoop},536:{n:"BrtRangeProtection",f:parsenoop},537:{n:"BrtPhoneticInfo",f:parsenoop},538:{n:"BrtBeginECTxtWiz",f:parsenoop},539:{n:"BrtEndECTxtWiz",f:parsenoop},540:{n:"BrtBeginECTWFldInfoLst",f:parsenoop},541:{n:"BrtEndECTWFldInfoLst",f:parsenoop},542:{n:"BrtBeginECTwFldInfo",f:parsenoop},548:{n:"BrtFileSharing",f:parsenoop},549:{n:"BrtOleSize",f:parsenoop},550:{n:"BrtDrawing",f:parsenoop},551:{n:"BrtLegacyDrawing",f:parsenoop},552:{n:"BrtLegacyDrawingHF",f:parsenoop},553:{n:"BrtWebOpt",f:parsenoop},554:{n:"BrtBeginWebPubItems",f:parsenoop},555:{n:"BrtEndWebPubItems",f:parsenoop},556:{n:"BrtBeginWebPubItem",f:parsenoop},557:{n:"BrtEndWebPubItem",f:parsenoop},558:{n:"BrtBeginSXCondFmt",f:parsenoop},559:{n:"BrtEndSXCondFmt",f:parsenoop},560:{n:"BrtBeginSXCondFmts",f:parsenoop},561:{n:"BrtEndSXCondFmts",f:parsenoop},562:{n:"BrtBkHim",f:parsenoop},564:{n:"BrtColor",f:parsenoop},565:{n:"BrtBeginIndexedColors",f:parsenoop},566:{n:"BrtEndIndexedColors",f:parsenoop},569:{n:"BrtBeginMRUColors",f:parsenoop},570:{n:"BrtEndMRUColors",f:parsenoop},572:{n:"BrtMRUColor",f:parsenoop},573:{n:"BrtBeginDVals",f:parsenoop},574:{n:"BrtEndDVals",f:parsenoop},577:{n:"BrtSupNameStart",f:parsenoop},578:{n:"BrtSupNameValueStart",f:parsenoop},579:{n:"BrtSupNameValueEnd",f:parsenoop},580:{n:"BrtSupNameNum",f:parsenoop},581:{n:"BrtSupNameErr",f:parsenoop},582:{n:"BrtSupNameSt",f:parsenoop},583:{n:"BrtSupNameNil",f:parsenoop},584:{n:"BrtSupNameBool",f:parsenoop},585:{n:"BrtSupNameFmla",f:parsenoop},586:{n:"BrtSupNameBits",f:parsenoop},587:{n:"BrtSupNameEnd",f:parsenoop},588:{n:"BrtEndSupBook",f:parsenoop},589:{n:"BrtCellSmartTagProperty",f:parsenoop},590:{n:"BrtBeginCellSmartTag",f:parsenoop},591:{n:"BrtEndCellSmartTag",f:parsenoop},592:{n:"BrtBeginCellSmartTags",f:parsenoop},593:{n:"BrtEndCellSmartTags",f:parsenoop},594:{n:"BrtBeginSmartTags",f:parsenoop},595:{n:"BrtEndSmartTags",f:parsenoop},596:{n:"BrtSmartTagType",f:parsenoop},597:{n:"BrtBeginSmartTagTypes",f:parsenoop},598:{n:"BrtEndSmartTagTypes",f:parsenoop},599:{n:"BrtBeginSXFilters",f:parsenoop},600:{n:"BrtEndSXFilters",f:parsenoop},601:{n:"BrtBeginSXFILTER",f:parsenoop},602:{n:"BrtEndSXFilter",f:parsenoop},603:{n:"BrtBeginFills",f:parsenoop},604:{n:"BrtEndFills",f:parsenoop},605:{n:"BrtBeginCellWatches",f:parsenoop},606:{n:"BrtEndCellWatches",f:parsenoop},607:{n:"BrtCellWatch",f:parsenoop},608:{n:"BrtBeginCRErrs",f:parsenoop},609:{n:"BrtEndCRErrs",f:parsenoop},610:{n:"BrtCrashRecErr",f:parsenoop},611:{n:"BrtBeginFonts",f:parsenoop},612:{n:"BrtEndFonts",f:parsenoop},613:{n:"BrtBeginBorders",f:parsenoop},614:{n:"BrtEndBorders",f:parsenoop},615:{n:"BrtBeginFmts",f:parsenoop},616:{n:"BrtEndFmts",f:parsenoop},617:{n:"BrtBeginCellXFs",f:parsenoop},618:{n:"BrtEndCellXFs",f:parsenoop},619:{n:"BrtBeginStyles",f:parsenoop},620:{n:"BrtEndStyles",f:parsenoop},625:{n:"BrtBigName",f:parsenoop},626:{n:"BrtBeginCellStyleXFs",f:parsenoop},627:{n:"BrtEndCellStyleXFs",f:parsenoop},628:{n:"BrtBeginComments",f:parsenoop},629:{n:"BrtEndComments",f:parsenoop},630:{n:"BrtBeginCommentAuthors",f:parsenoop},631:{n:"BrtEndCommentAuthors",f:parsenoop},632:{n:"BrtCommentAuthor",f:parse_BrtCommentAuthor},633:{n:"BrtBeginCommentList",f:parsenoop},634:{n:"BrtEndCommentList",f:parsenoop},635:{n:"BrtBeginComment",f:parse_BrtBeginComment},636:{n:"BrtEndComment",f:parsenoop},637:{n:"BrtCommentText",f:parse_BrtCommentText},638:{n:"BrtBeginOleObjects",f:parsenoop},639:{n:"BrtOleObject",f:parsenoop},640:{n:"BrtEndOleObjects",f:parsenoop},641:{n:"BrtBeginSxrules",f:parsenoop},642:{n:"BrtEndSxRules",f:parsenoop},643:{n:"BrtBeginActiveXControls",f:parsenoop},644:{n:"BrtActiveX",f:parsenoop},645:{n:"BrtEndActiveXControls",f:parsenoop},646:{n:"BrtBeginPCDSDTCEMembersSortBy",f:parsenoop},648:{n:"BrtBeginCellIgnoreECs",f:parsenoop},649:{n:"BrtCellIgnoreEC",f:parsenoop},650:{n:"BrtEndCellIgnoreECs",f:parsenoop},651:{n:"BrtCsProp",f:parsenoop},652:{n:"BrtCsPageSetup",f:parsenoop},653:{n:"BrtBeginUserCsViews",f:parsenoop},654:{n:"BrtEndUserCsViews",f:parsenoop},655:{n:"BrtBeginUserCsView",f:parsenoop},656:{n:"BrtEndUserCsView",f:parsenoop},657:{n:"BrtBeginPcdSFCIEntries",f:parsenoop},658:{n:"BrtEndPCDSFCIEntries",f:parsenoop},659:{n:"BrtPCDSFCIEntry",f:parsenoop},660:{n:"BrtBeginListParts",f:parsenoop},661:{n:"BrtListPart",f:parsenoop},662:{n:"BrtEndListParts",f:parsenoop},663:{n:"BrtSheetCalcProp",f:parsenoop},664:{n:"BrtBeginFnGroup",f:parsenoop},665:{n:"BrtFnGroup",f:parsenoop},666:{n:"BrtEndFnGroup",f:parsenoop},667:{n:"BrtSupAddin",f:parsenoop},668:{n:"BrtSXTDMPOrder",f:parsenoop},669:{n:"BrtCsProtection",f:parsenoop},671:{n:"BrtBeginWsSortMap",f:parsenoop},672:{n:"BrtEndWsSortMap",f:parsenoop},673:{n:"BrtBeginRRSort",f:parsenoop},674:{n:"BrtEndRRSort",f:parsenoop},675:{n:"BrtRRSortItem",f:parsenoop},676:{n:"BrtFileSharingIso",f:parsenoop},677:{n:"BrtBookProtectionIso",f:parsenoop},678:{n:"BrtSheetProtectionIso",f:parsenoop},679:{n:"BrtCsProtectionIso",f:parsenoop},680:{n:"BrtRangeProtectionIso",f:parsenoop},1024:{n:"BrtRwDescent",f:parsenoop},1025:{n:"BrtKnownFonts",f:parsenoop},1026:{n:"BrtBeginSXTupleSet",f:parsenoop},1027:{n:"BrtEndSXTupleSet",f:parsenoop},1028:{n:"BrtBeginSXTupleSetHeader",f:parsenoop},1029:{n:"BrtEndSXTupleSetHeader",f:parsenoop},1030:{n:"BrtSXTupleSetHeaderItem",f:parsenoop},1031:{n:"BrtBeginSXTupleSetData",f:parsenoop},1032:{n:"BrtEndSXTupleSetData",f:parsenoop},1033:{n:"BrtBeginSXTupleSetRow",f:parsenoop},1034:{n:"BrtEndSXTupleSetRow",f:parsenoop},1035:{n:"BrtSXTupleSetRowItem",f:parsenoop},1036:{n:"BrtNameExt",f:parsenoop},1037:{n:"BrtPCDH14",f:parsenoop},1038:{n:"BrtBeginPCDCalcMem14",f:parsenoop},1039:{n:"BrtEndPCDCalcMem14",f:parsenoop},1040:{n:"BrtSXTH14",f:parsenoop},1041:{n:"BrtBeginSparklineGroup",f:parsenoop},1042:{n:"BrtEndSparklineGroup",f:parsenoop},1043:{n:"BrtSparkline",f:parsenoop},1044:{n:"BrtSXDI14",f:parsenoop},1045:{n:"BrtWsFmtInfoEx14",f:parsenoop},1046:{n:"BrtBeginConditionalFormatting14",f:parsenoop},1047:{n:"BrtEndConditionalFormatting14",f:parsenoop},1048:{n:"BrtBeginCFRule14",f:parsenoop},1049:{n:"BrtEndCFRule14",f:parsenoop},1050:{n:"BrtCFVO14",f:parsenoop},1051:{n:"BrtBeginDatabar14",f:parsenoop},1052:{n:"BrtBeginIconSet14",f:parsenoop},1053:{n:"BrtDVal14",f:parsenoop},1054:{n:"BrtBeginDVals14",f:parsenoop},1055:{n:"BrtColor14",f:parsenoop},1056:{n:"BrtBeginSparklines",f:parsenoop},1057:{n:"BrtEndSparklines",f:parsenoop},1058:{n:"BrtBeginSparklineGroups",f:parsenoop},1059:{n:"BrtEndSparklineGroups",f:parsenoop},1061:{n:"BrtSXVD14",f:parsenoop},1062:{n:"BrtBeginSxview14",f:parsenoop},1063:{n:"BrtEndSxview14",f:parsenoop},1066:{n:"BrtBeginPCD14",f:parsenoop},1067:{n:"BrtEndPCD14",f:parsenoop},1068:{n:"BrtBeginExtConn14",f:parsenoop},1069:{n:"BrtEndExtConn14",f:parsenoop},1070:{n:"BrtBeginSlicerCacheIDs",f:parsenoop},1071:{n:"BrtEndSlicerCacheIDs",f:parsenoop},1072:{n:"BrtBeginSlicerCacheID",f:parsenoop},1073:{n:"BrtEndSlicerCacheID",f:parsenoop},1075:{n:"BrtBeginSlicerCache",f:parsenoop},1076:{n:"BrtEndSlicerCache",f:parsenoop},1077:{n:"BrtBeginSlicerCacheDef",f:parsenoop},1078:{n:"BrtEndSlicerCacheDef",f:parsenoop},1079:{n:"BrtBeginSlicersEx",f:parsenoop},1080:{n:"BrtEndSlicersEx",f:parsenoop},1081:{n:"BrtBeginSlicerEx",f:parsenoop},1082:{n:"BrtEndSlicerEx",f:parsenoop},1083:{n:"BrtBeginSlicer",f:parsenoop},1084:{n:"BrtEndSlicer",f:parsenoop},1085:{n:"BrtSlicerCachePivotTables",f:parsenoop},1086:{n:"BrtBeginSlicerCacheOlapImpl",f:parsenoop},1087:{n:"BrtEndSlicerCacheOlapImpl",f:parsenoop},1088:{n:"BrtBeginSlicerCacheLevelsData",f:parsenoop},1089:{n:"BrtEndSlicerCacheLevelsData",f:parsenoop},1090:{n:"BrtBeginSlicerCacheLevelData",f:parsenoop},1091:{n:"BrtEndSlicerCacheLevelData",f:parsenoop},1092:{n:"BrtBeginSlicerCacheSiRanges",f:parsenoop},1093:{n:"BrtEndSlicerCacheSiRanges",f:parsenoop},1094:{n:"BrtBeginSlicerCacheSiRange",f:parsenoop},1095:{n:"BrtEndSlicerCacheSiRange",f:parsenoop},1096:{n:"BrtSlicerCacheOlapItem",f:parsenoop},1097:{n:"BrtBeginSlicerCacheSelections",f:parsenoop},1098:{n:"BrtSlicerCacheSelection",f:parsenoop},1099:{n:"BrtEndSlicerCacheSelections",f:parsenoop},1100:{n:"BrtBeginSlicerCacheNative",f:parsenoop},1101:{n:"BrtEndSlicerCacheNative",f:parsenoop},1102:{n:"BrtSlicerCacheNativeItem",f:parsenoop},1103:{n:"BrtRangeProtection14",f:parsenoop},1104:{n:"BrtRangeProtectionIso14",f:parsenoop},1105:{n:"BrtCellIgnoreEC14",f:parsenoop},1111:{n:"BrtList14",f:parsenoop},1112:{n:"BrtCFIcon",f:parsenoop},1113:{n:"BrtBeginSlicerCachesPivotCacheIDs",f:parsenoop},1114:{n:"BrtEndSlicerCachesPivotCacheIDs",f:parsenoop},1115:{n:"BrtBeginSlicers",f:parsenoop},1116:{n:"BrtEndSlicers",f:parsenoop},1117:{n:"BrtWbProp14",f:parsenoop},1118:{n:"BrtBeginSXEdit",f:parsenoop},1119:{n:"BrtEndSXEdit",f:parsenoop},1120:{n:"BrtBeginSXEdits",f:parsenoop},1121:{n:"BrtEndSXEdits",f:parsenoop},1122:{n:"BrtBeginSXChange",f:parsenoop},1123:{n:"BrtEndSXChange",f:parsenoop},1124:{n:"BrtBeginSXChanges",f:parsenoop},1125:{n:"BrtEndSXChanges",f:parsenoop},1126:{n:"BrtSXTupleItems",f:parsenoop},1128:{n:"BrtBeginSlicerStyle",f:parsenoop},1129:{n:"BrtEndSlicerStyle",f:parsenoop},1130:{n:"BrtSlicerStyleElement",f:parsenoop},1131:{n:"BrtBeginStyleSheetExt14",f:parsenoop},1132:{n:"BrtEndStyleSheetExt14",f:parsenoop},1133:{n:"BrtBeginSlicerCachesPivotCacheID",f:parsenoop},1134:{n:"BrtEndSlicerCachesPivotCacheID",f:parsenoop},1135:{n:"BrtBeginConditionalFormattings",f:parsenoop},1136:{n:"BrtEndConditionalFormattings",f:parsenoop},1137:{n:"BrtBeginPCDCalcMemExt",f:parsenoop},1138:{n:"BrtEndPCDCalcMemExt",f:parsenoop},1139:{n:"BrtBeginPCDCalcMemsExt",f:parsenoop},1140:{n:"BrtEndPCDCalcMemsExt",f:parsenoop},1141:{n:"BrtPCDField14",f:parsenoop},1142:{n:"BrtBeginSlicerStyles",f:parsenoop},1143:{n:"BrtEndSlicerStyles",f:parsenoop},1144:{n:"BrtBeginSlicerStyleElements",f:parsenoop},1145:{n:"BrtEndSlicerStyleElements",f:parsenoop},1146:{n:"BrtCFRuleExt",f:parsenoop},1147:{n:"BrtBeginSXCondFmt14",f:parsenoop},1148:{n:"BrtEndSXCondFmt14",f:parsenoop},1149:{n:"BrtBeginSXCondFmts14",f:parsenoop},1150:{n:"BrtEndSXCondFmts14",f:parsenoop},1152:{n:"BrtBeginSortCond14",f:parsenoop},1153:{n:"BrtEndSortCond14",f:parsenoop},1154:{n:"BrtEndDVals14",f:parsenoop},1155:{n:"BrtEndIconSet14",f:parsenoop},1156:{n:"BrtEndDatabar14",f:parsenoop},1157:{n:"BrtBeginColorScale14",f:parsenoop},1158:{n:"BrtEndColorScale14",f:parsenoop},1159:{n:"BrtBeginSxrules14",f:parsenoop},1160:{n:"BrtEndSxrules14",f:parsenoop},1161:{n:"BrtBeginPRule14",f:parsenoop},1162:{n:"BrtEndPRule14",f:parsenoop},1163:{n:"BrtBeginPRFilters14",f:parsenoop},1164:{n:"BrtEndPRFilters14",f:parsenoop},1165:{n:"BrtBeginPRFilter14",f:parsenoop},1166:{n:"BrtEndPRFilter14",f:parsenoop},1167:{n:"BrtBeginPRFItem14",f:parsenoop},1168:{n:"BrtEndPRFItem14",f:parsenoop},1169:{n:"BrtBeginCellIgnoreECs14",f:parsenoop},1170:{n:"BrtEndCellIgnoreECs14",f:parsenoop},1171:{n:"BrtDxf14",f:parsenoop},1172:{n:"BrtBeginDxF14s",f:parsenoop},1173:{n:"BrtEndDxf14s",f:parsenoop},1177:{n:"BrtFilter14",f:parsenoop},1178:{n:"BrtBeginCustomFilters14",f:parsenoop},1180:{n:"BrtCustomFilter14",f:parsenoop},1181:{n:"BrtIconFilter14",f:parsenoop},1182:{n:"BrtPivotCacheConnectionName",f:parsenoop},2048:{n:"BrtBeginDecoupledPivotCacheIDs",f:parsenoop},2049:{n:"BrtEndDecoupledPivotCacheIDs",f:parsenoop},2050:{n:"BrtDecoupledPivotCacheID",f:parsenoop},2051:{n:"BrtBeginPivotTableRefs",f:parsenoop},2052:{n:"BrtEndPivotTableRefs",f:parsenoop},2053:{n:"BrtPivotTableRef",f:parsenoop},2054:{n:"BrtSlicerCacheBookPivotTables",f:parsenoop},2055:{n:"BrtBeginSxvcells",f:parsenoop},2056:{n:"BrtEndSxvcells",f:parsenoop},2057:{n:"BrtBeginSxRow",f:parsenoop},2058:{n:"BrtEndSxRow",f:parsenoop},2060:{n:"BrtPcdCalcMem15",f:parsenoop},2067:{n:"BrtQsi15",f:parsenoop},2068:{n:"BrtBeginWebExtensions",f:parsenoop},2069:{n:"BrtEndWebExtensions",f:parsenoop},2070:{n:"BrtWebExtension",f:parsenoop},2071:{n:"BrtAbsPath15",f:parsenoop},2072:{n:"BrtBeginPivotTableUISettings",f:parsenoop},2073:{n:"BrtEndPivotTableUISettings",f:parsenoop},2075:{n:"BrtTableSlicerCacheIDs",f:parsenoop},2076:{n:"BrtTableSlicerCacheID",f:parsenoop},2077:{n:"BrtBeginTableSlicerCache",f:parsenoop},2078:{n:"BrtEndTableSlicerCache",f:parsenoop},2079:{n:"BrtSxFilter15",f:parsenoop},2080:{n:"BrtBeginTimelineCachePivotCacheIDs",f:parsenoop},2081:{n:"BrtEndTimelineCachePivotCacheIDs",f:parsenoop},2082:{n:"BrtTimelineCachePivotCacheID",f:parsenoop},2083:{n:"BrtBeginTimelineCacheIDs",f:parsenoop},2084:{n:"BrtEndTimelineCacheIDs",f:parsenoop},2085:{n:"BrtBeginTimelineCacheID",f:parsenoop},2086:{n:"BrtEndTimelineCacheID",f:parsenoop},2087:{n:"BrtBeginTimelinesEx",f:parsenoop},2088:{n:"BrtEndTimelinesEx",f:parsenoop},2089:{n:"BrtBeginTimelineEx",f:parsenoop},2090:{n:"BrtEndTimelineEx",f:parsenoop},2091:{n:"BrtWorkBookPr15",f:parsenoop},2092:{n:"BrtPCDH15",f:parsenoop},2093:{n:"BrtBeginTimelineStyle",f:parsenoop},2094:{n:"BrtEndTimelineStyle",f:parsenoop},2095:{n:"BrtTimelineStyleElement",f:parsenoop},2096:{n:"BrtBeginTimelineStylesheetExt15",f:parsenoop},2097:{n:"BrtEndTimelineStylesheetExt15",f:parsenoop},2098:{n:"BrtBeginTimelineStyles",f:parsenoop},2099:{n:"BrtEndTimelineStyles",f:parsenoop},2100:{n:"BrtBeginTimelineStyleElements",f:parsenoop},2101:{n:"BrtEndTimelineStyleElements",f:parsenoop},2102:{n:"BrtDxf15",f:parsenoop},2103:{n:"BrtBeginDxfs15",f:parsenoop},2104:{n:"brtEndDxfs15",f:parsenoop},2105:{n:"BrtSlicerCacheHideItemsWithNoData",f:parsenoop},2106:{n:"BrtBeginItemUniqueNames",f:parsenoop},2107:{n:"BrtEndItemUniqueNames",f:parsenoop},2108:{n:"BrtItemUniqueName",f:parsenoop},2109:{n:"BrtBeginExtConn15",f:parsenoop},2110:{n:"BrtEndExtConn15",f:parsenoop},2111:{n:"BrtBeginOledbPr15",f:parsenoop},2112:{n:"BrtEndOledbPr15",f:parsenoop},2113:{n:"BrtBeginDataFeedPr15",f:parsenoop},2114:{n:"BrtEndDataFeedPr15",f:parsenoop},2115:{n:"BrtTextPr15",f:parsenoop},2116:{n:"BrtRangePr15",f:parsenoop},2117:{n:"BrtDbCommand15",f:parsenoop},2118:{n:"BrtBeginDbTables15",f:parsenoop},2119:{n:"BrtEndDbTables15",f:parsenoop},2120:{n:"BrtDbTable15",f:parsenoop},2121:{n:"BrtBeginDataModel",f:parsenoop},2122:{n:"BrtEndDataModel",f:parsenoop},2123:{n:"BrtBeginModelTables",f:parsenoop},2124:{n:"BrtEndModelTables",f:parsenoop},2125:{n:"BrtModelTable",f:parsenoop},2126:{n:"BrtBeginModelRelationships",f:parsenoop},2127:{n:"BrtEndModelRelationships",f:parsenoop},2128:{n:"BrtModelRelationship",f:parsenoop},2129:{n:"BrtBeginECTxtWiz15",f:parsenoop},2130:{n:"BrtEndECTxtWiz15",f:parsenoop},2131:{n:"BrtBeginECTWFldInfoLst15",f:parsenoop},2132:{n:"BrtEndECTWFldInfoLst15",f:parsenoop},2133:{n:"BrtBeginECTWFldInfo15",f:parsenoop},2134:{n:"BrtFieldListActiveItem",f:parsenoop},2135:{n:"BrtPivotCacheIdVersion",f:parsenoop},2136:{n:"BrtSXDI15",f:parsenoop},65535:{n:"",f:parsenoop}};
var evert_RE=evert_key(XLSBRecordEnum,"n");var XLSRecordEnum={3:{n:"BIFF2NUM",f:parse_BIFF2NUM},4:{n:"BIFF2STR",f:parse_BIFF2STR},6:{n:"Formula",f:parse_Formula},9:{n:"BOF",f:parse_BOF},10:{n:"EOF",f:parse_EOF},12:{n:"CalcCount",f:parse_CalcCount},13:{n:"CalcMode",f:parse_CalcMode},14:{n:"CalcPrecision",f:parse_CalcPrecision},15:{n:"CalcRefMode",f:parse_CalcRefMode},16:{n:"CalcDelta",f:parse_CalcDelta},17:{n:"CalcIter",f:parse_CalcIter},18:{n:"Protect",f:parse_Protect},19:{n:"Password",f:parse_Password},20:{n:"Header",f:parse_Header},21:{n:"Footer",f:parse_Footer},23:{n:"ExternSheet",f:parse_ExternSheet},24:{n:"Lbl",f:parse_Lbl},25:{n:"WinProtect",f:parse_WinProtect},26:{n:"VerticalPageBreaks",f:parse_VerticalPageBreaks},27:{n:"HorizontalPageBreaks",f:parse_HorizontalPageBreaks},28:{n:"Note",f:parse_Note},29:{n:"Selection",f:parse_Selection},34:{n:"Date1904",f:parse_Date1904},35:{n:"ExternName",f:parse_ExternName},38:{n:"LeftMargin",f:parse_LeftMargin},39:{n:"RightMargin",f:parse_RightMargin},40:{n:"TopMargin",f:parse_TopMargin},41:{n:"BottomMargin",f:parse_BottomMargin},42:{n:"PrintRowCol",f:parse_PrintRowCol},43:{n:"PrintGrid",f:parse_PrintGrid},47:{n:"FilePass",f:parse_FilePass},49:{n:"Font",f:parse_Font},51:{n:"PrintSize",f:parse_PrintSize},60:{n:"Continue",f:parse_Continue},61:{n:"Window1",f:parse_Window1},64:{n:"Backup",f:parse_Backup},65:{n:"Pane",f:parse_Pane},66:{n:"CodePage",f:parse_CodePage},77:{n:"Pls",f:parse_Pls},80:{n:"DCon",f:parse_DCon},81:{n:"DConRef",f:parse_DConRef},82:{n:"DConName",f:parse_DConName},85:{n:"DefColWidth",f:parse_DefColWidth},89:{n:"XCT",f:parse_XCT},90:{n:"CRN",f:parse_CRN},91:{n:"FileSharing",f:parse_FileSharing},92:{n:"WriteAccess",f:parse_WriteAccess},93:{n:"Obj",f:parse_Obj},94:{n:"Uncalced",f:parse_Uncalced},95:{n:"CalcSaveRecalc",f:parse_CalcSaveRecalc},96:{n:"Template",f:parse_Template},97:{n:"Intl",f:parse_Intl},99:{n:"ObjProtect",f:parse_ObjProtect},125:{n:"ColInfo",f:parse_ColInfo},128:{n:"Guts",f:parse_Guts},129:{n:"WsBool",f:parse_WsBool},130:{n:"GridSet",f:parse_GridSet},131:{n:"HCenter",f:parse_HCenter},132:{n:"VCenter",f:parse_VCenter},133:{n:"BoundSheet8",f:parse_BoundSheet8},134:{n:"WriteProtect",f:parse_WriteProtect},140:{n:"Country",f:parse_Country},141:{n:"HideObj",f:parse_HideObj},144:{n:"Sort",f:parse_Sort},146:{n:"Palette",f:parse_Palette},151:{n:"Sync",f:parse_Sync},152:{n:"LPr",f:parse_LPr},153:{n:"DxGCol",f:parse_DxGCol},154:{n:"FnGroupName",f:parse_FnGroupName},155:{n:"FilterMode",f:parse_FilterMode},156:{n:"BuiltInFnGroupCount",f:parse_BuiltInFnGroupCount},157:{n:"AutoFilterInfo",f:parse_AutoFilterInfo},158:{n:"AutoFilter",f:parse_AutoFilter},160:{n:"Scl",f:parse_Scl},161:{n:"Setup",f:parse_Setup},174:{n:"ScenMan",f:parse_ScenMan},175:{n:"SCENARIO",f:parse_SCENARIO},176:{n:"SxView",f:parse_SxView},177:{n:"Sxvd",f:parse_Sxvd},178:{n:"SXVI",f:parse_SXVI},180:{n:"SxIvd",f:parse_SxIvd},181:{n:"SXLI",f:parse_SXLI},182:{n:"SXPI",f:parse_SXPI},184:{n:"DocRoute",f:parse_DocRoute},185:{n:"RecipName",f:parse_RecipName},189:{n:"MulRk",f:parse_MulRk},190:{n:"MulBlank",f:parse_MulBlank},193:{n:"Mms",f:parse_Mms},197:{n:"SXDI",f:parse_SXDI},198:{n:"SXDB",f:parse_SXDB},199:{n:"SXFDB",f:parse_SXFDB},200:{n:"SXDBB",f:parse_SXDBB},201:{n:"SXNum",f:parse_SXNum},202:{n:"SxBool",f:parse_SxBool},203:{n:"SxErr",f:parse_SxErr},204:{n:"SXInt",f:parse_SXInt},205:{n:"SXString",f:parse_SXString},206:{n:"SXDtr",f:parse_SXDtr},207:{n:"SxNil",f:parse_SxNil},208:{n:"SXTbl",f:parse_SXTbl},209:{n:"SXTBRGIITM",f:parse_SXTBRGIITM},210:{n:"SxTbpg",f:parse_SxTbpg},211:{n:"ObProj",f:parse_ObProj},213:{n:"SXStreamID",f:parse_SXStreamID},215:{n:"DBCell",f:parse_DBCell},216:{n:"SXRng",f:parse_SXRng},217:{n:"SxIsxoper",f:parse_SxIsxoper},218:{n:"BookBool",f:parse_BookBool},220:{n:"DbOrParamQry",f:parse_DbOrParamQry},221:{n:"ScenarioProtect",f:parse_ScenarioProtect},222:{n:"OleObjectSize",f:parse_OleObjectSize},224:{n:"XF",f:parse_XF},225:{n:"InterfaceHdr",f:parse_InterfaceHdr},226:{n:"InterfaceEnd",f:parse_InterfaceEnd},227:{n:"SXVS",f:parse_SXVS},229:{n:"MergeCells",f:parse_MergeCells},233:{n:"BkHim",f:parse_BkHim},235:{n:"MsoDrawingGroup",f:parse_MsoDrawingGroup},236:{n:"MsoDrawing",f:parse_MsoDrawing},237:{n:"MsoDrawingSelection",f:parse_MsoDrawingSelection},239:{n:"PhoneticInfo",f:parse_PhoneticInfo},240:{n:"SxRule",f:parse_SxRule},241:{n:"SXEx",f:parse_SXEx},242:{n:"SxFilt",f:parse_SxFilt},244:{n:"SxDXF",f:parse_SxDXF},245:{n:"SxItm",f:parse_SxItm},246:{n:"SxName",f:parse_SxName},247:{n:"SxSelect",f:parse_SxSelect},248:{n:"SXPair",f:parse_SXPair},249:{n:"SxFmla",f:parse_SxFmla},251:{n:"SxFormat",f:parse_SxFormat},252:{n:"SST",f:parse_SST},253:{n:"LabelSst",f:parse_LabelSst},255:{n:"ExtSST",f:parse_ExtSST},256:{n:"SXVDEx",f:parse_SXVDEx},259:{n:"SXFormula",f:parse_SXFormula},290:{n:"SXDBEx",f:parse_SXDBEx},311:{n:"RRDInsDel",f:parse_RRDInsDel},312:{n:"RRDHead",f:parse_RRDHead},315:{n:"RRDChgCell",f:parse_RRDChgCell},317:{n:"RRTabId",f:parse_RRTabId},318:{n:"RRDRenSheet",f:parse_RRDRenSheet},319:{n:"RRSort",f:parse_RRSort},320:{n:"RRDMove",f:parse_RRDMove},330:{n:"RRFormat",f:parse_RRFormat},331:{n:"RRAutoFmt",f:parse_RRAutoFmt},333:{n:"RRInsertSh",f:parse_RRInsertSh},334:{n:"RRDMoveBegin",f:parse_RRDMoveBegin},335:{n:"RRDMoveEnd",f:parse_RRDMoveEnd},336:{n:"RRDInsDelBegin",f:parse_RRDInsDelBegin},337:{n:"RRDInsDelEnd",f:parse_RRDInsDelEnd},338:{n:"RRDConflict",f:parse_RRDConflict},339:{n:"RRDDefName",f:parse_RRDDefName},340:{n:"RRDRstEtxp",f:parse_RRDRstEtxp},351:{n:"LRng",f:parse_LRng},352:{n:"UsesELFs",f:parse_UsesELFs},353:{n:"DSF",f:parse_DSF},401:{n:"CUsr",f:parse_CUsr},402:{n:"CbUsr",f:parse_CbUsr},403:{n:"UsrInfo",f:parse_UsrInfo},404:{n:"UsrExcl",f:parse_UsrExcl},405:{n:"FileLock",f:parse_FileLock},406:{n:"RRDInfo",f:parse_RRDInfo},407:{n:"BCUsrs",f:parse_BCUsrs},408:{n:"UsrChk",f:parse_UsrChk},425:{n:"UserBView",f:parse_UserBView},426:{n:"UserSViewBegin",f:parse_UserSViewBegin},427:{n:"UserSViewEnd",f:parse_UserSViewEnd},428:{n:"RRDUserView",f:parse_RRDUserView},429:{n:"Qsi",f:parse_Qsi},430:{n:"SupBook",f:parse_SupBook},431:{n:"Prot4Rev",f:parse_Prot4Rev},432:{n:"CondFmt",f:parse_CondFmt},433:{n:"CF",f:parse_CF},434:{n:"DVal",f:parse_DVal},437:{n:"DConBin",f:parse_DConBin},438:{n:"TxO",f:parse_TxO},439:{n:"RefreshAll",f:parse_RefreshAll},440:{n:"HLink",f:parse_HLink},441:{n:"Lel",f:parse_Lel},442:{n:"CodeName",f:parse_XLSCodeName},443:{n:"SXFDBType",f:parse_SXFDBType},444:{n:"Prot4RevPass",f:parse_Prot4RevPass},445:{n:"ObNoMacros",f:parse_ObNoMacros},446:{n:"Dv",f:parse_Dv},448:{n:"Excel9File",f:parse_Excel9File},449:{n:"RecalcId",f:parse_RecalcId,r:2},450:{n:"EntExU2",f:parse_EntExU2},512:{n:"Dimensions",f:parse_Dimensions},513:{n:"Blank",f:parse_Blank},515:{n:"Number",f:parse_Number},516:{n:"Label",f:parse_Label},517:{n:"BoolErr",f:parse_BoolErr},519:{n:"String",f:parse_String},520:{n:"Row",f:parse_Row},523:{n:"Index",f:parse_Index},545:{n:"Array",f:parse_Array},549:{n:"DefaultRowHeight",f:parse_DefaultRowHeight},566:{n:"Table",f:parse_Table},574:{n:"Window2",f:parse_Window2},638:{n:"RK",f:parse_RK},659:{n:"Style",f:parse_Style},1048:{n:"BigName",f:parse_BigName},1054:{n:"Format",f:parse_Format},1084:{n:"ContinueBigName",f:parse_ContinueBigName},1212:{n:"ShrFmla",f:parse_ShrFmla},2048:{n:"HLinkTooltip",f:parse_HLinkTooltip},2049:{n:"WebPub",f:parse_WebPub},2050:{n:"QsiSXTag",f:parse_QsiSXTag},2051:{n:"DBQueryExt",f:parse_DBQueryExt},2052:{n:"ExtString",f:parse_ExtString},2053:{n:"TxtQry",f:parse_TxtQry},2054:{n:"Qsir",f:parse_Qsir},2055:{n:"Qsif",f:parse_Qsif},2056:{n:"RRDTQSIF",f:parse_RRDTQSIF},2057:{n:"BOF",f:parse_BOF},2058:{n:"OleDbConn",f:parse_OleDbConn},2059:{n:"WOpt",f:parse_WOpt},2060:{n:"SXViewEx",f:parse_SXViewEx},2061:{n:"SXTH",f:parse_SXTH},2062:{n:"SXPIEx",f:parse_SXPIEx},2063:{n:"SXVDTEx",f:parse_SXVDTEx},2064:{n:"SXViewEx9",f:parse_SXViewEx9},2066:{n:"ContinueFrt",f:parse_ContinueFrt},2067:{n:"RealTimeData",f:parse_RealTimeData},2128:{n:"ChartFrtInfo",f:parse_ChartFrtInfo},2129:{n:"FrtWrapper",f:parse_FrtWrapper},2130:{n:"StartBlock",f:parse_StartBlock},2131:{n:"EndBlock",f:parse_EndBlock},2132:{n:"StartObject",f:parse_StartObject},2133:{n:"EndObject",f:parse_EndObject},2134:{n:"CatLab",f:parse_CatLab},2135:{n:"YMult",f:parse_YMult},2136:{n:"SXViewLink",f:parse_SXViewLink},2137:{n:"PivotChartBits",f:parse_PivotChartBits},2138:{n:"FrtFontList",f:parse_FrtFontList},2146:{n:"SheetExt",f:parse_SheetExt},2147:{n:"BookExt",f:parse_BookExt,r:12},2148:{n:"SXAddl",f:parse_SXAddl},2149:{n:"CrErr",f:parse_CrErr},2150:{n:"HFPicture",f:parse_HFPicture},2151:{n:"FeatHdr",f:parse_FeatHdr},2152:{n:"Feat",f:parse_Feat},2154:{n:"DataLabExt",f:parse_DataLabExt},2155:{n:"DataLabExtContents",f:parse_DataLabExtContents},2156:{n:"CellWatch",f:parse_CellWatch},2161:{n:"FeatHdr11",f:parse_FeatHdr11},2162:{n:"Feature11",f:parse_Feature11},2164:{n:"DropDownObjIds",f:parse_DropDownObjIds},2165:{n:"ContinueFrt11",f:parse_ContinueFrt11},2166:{n:"DConn",f:parse_DConn},2167:{n:"List12",f:parse_List12},2168:{n:"Feature12",f:parse_Feature12},2169:{n:"CondFmt12",f:parse_CondFmt12},2170:{n:"CF12",f:parse_CF12},2171:{n:"CFEx",f:parse_CFEx},2172:{n:"XFCRC",f:parse_XFCRC,r:12},2173:{n:"XFExt",f:parse_XFExt,r:12},2174:{n:"AutoFilter12",f:parse_AutoFilter12},2175:{n:"ContinueFrt12",f:parse_ContinueFrt12},2180:{n:"MDTInfo",f:parse_MDTInfo},2181:{n:"MDXStr",f:parse_MDXStr},2182:{n:"MDXTuple",f:parse_MDXTuple},2183:{n:"MDXSet",f:parse_MDXSet},2184:{n:"MDXProp",f:parse_MDXProp},2185:{n:"MDXKPI",f:parse_MDXKPI},2186:{n:"MDB",f:parse_MDB},2187:{n:"PLV",f:parse_PLV},2188:{n:"Compat12",f:parse_Compat12,r:12},2189:{n:"DXF",f:parse_DXF},2190:{n:"TableStyles",f:parse_TableStyles,r:12},2191:{n:"TableStyle",f:parse_TableStyle},2192:{n:"TableStyleElement",f:parse_TableStyleElement},2194:{n:"StyleExt",f:parse_StyleExt},2195:{n:"NamePublish",f:parse_NamePublish},2196:{n:"NameCmt",f:parse_NameCmt},2197:{n:"SortData",f:parse_SortData},2198:{n:"Theme",f:parse_Theme,r:12},2199:{n:"GUIDTypeLib",f:parse_GUIDTypeLib},2200:{n:"FnGrp12",f:parse_FnGrp12},2201:{n:"NameFnGrp12",f:parse_NameFnGrp12},2202:{n:"MTRSettings",f:parse_MTRSettings,r:12},2203:{n:"CompressPictures",f:parse_CompressPictures},2204:{n:"HeaderFooter",f:parse_HeaderFooter},2205:{n:"CrtLayout12",f:parse_CrtLayout12},2206:{n:"CrtMlFrt",f:parse_CrtMlFrt},2207:{n:"CrtMlFrtContinue",f:parse_CrtMlFrtContinue},2211:{n:"ForceFullCalculation",f:parse_ForceFullCalculation},2212:{n:"ShapePropsStream",f:parse_ShapePropsStream},2213:{n:"TextPropsStream",f:parse_TextPropsStream},2214:{n:"RichTextStream",f:parse_RichTextStream},2215:{n:"CrtLayout12A",f:parse_CrtLayout12A},4097:{n:"Units",f:parse_Units},4098:{n:"Chart",f:parse_Chart},4099:{n:"Series",f:parse_Series},4102:{n:"DataFormat",f:parse_DataFormat},4103:{n:"LineFormat",f:parse_LineFormat},4105:{n:"MarkerFormat",f:parse_MarkerFormat},4106:{n:"AreaFormat",f:parse_AreaFormat},4107:{n:"PieFormat",f:parse_PieFormat},4108:{n:"AttachedLabel",f:parse_AttachedLabel},4109:{n:"SeriesText",f:parse_SeriesText},4116:{n:"ChartFormat",f:parse_ChartFormat},4117:{n:"Legend",f:parse_Legend},4118:{n:"SeriesList",f:parse_SeriesList},4119:{n:"Bar",f:parse_Bar},4120:{n:"Line",f:parse_Line},4121:{n:"Pie",f:parse_Pie},4122:{n:"Area",f:parse_Area},4123:{n:"Scatter",f:parse_Scatter},4124:{n:"CrtLine",f:parse_CrtLine},4125:{n:"Axis",f:parse_Axis},4126:{n:"Tick",f:parse_Tick},4127:{n:"ValueRange",f:parse_ValueRange},4128:{n:"CatSerRange",f:parse_CatSerRange},4129:{n:"AxisLine",f:parse_AxisLine},4130:{n:"CrtLink",f:parse_CrtLink},4132:{n:"DefaultText",f:parse_DefaultText},4133:{n:"Text",f:parse_Text},4134:{n:"FontX",f:parse_FontX},4135:{n:"ObjectLink",f:parse_ObjectLink},4146:{n:"Frame",f:parse_Frame},4147:{n:"Begin",f:parse_Begin},4148:{n:"End",f:parse_End},4149:{n:"PlotArea",f:parse_PlotArea},4154:{n:"Chart3d",f:parse_Chart3d},4156:{n:"PicF",f:parse_PicF},4157:{n:"DropBar",f:parse_DropBar},4158:{n:"Radar",f:parse_Radar},4159:{n:"Surf",f:parse_Surf},4160:{n:"RadarArea",f:parse_RadarArea},4161:{n:"AxisParent",f:parse_AxisParent},4163:{n:"LegendException",f:parse_LegendException},4164:{n:"ShtProps",f:parse_ShtProps},4165:{n:"SerToCrt",f:parse_SerToCrt},4166:{n:"AxesUsed",f:parse_AxesUsed},4168:{n:"SBaseRef",f:parse_SBaseRef},4170:{n:"SerParent",f:parse_SerParent},4171:{n:"SerAuxTrend",f:parse_SerAuxTrend},4174:{n:"IFmtRecord",f:parse_IFmtRecord},4175:{n:"Pos",f:parse_Pos},4176:{n:"AlRuns",f:parse_AlRuns},4177:{n:"BRAI",f:parse_BRAI},4187:{n:"SerAuxErrBar",f:parse_SerAuxErrBar},4188:{n:"ClrtClient",f:parse_ClrtClient},4189:{n:"SerFmt",f:parse_SerFmt},4191:{n:"Chart3DBarShape",f:parse_Chart3DBarShape},4192:{n:"Fbi",f:parse_Fbi},4193:{n:"BopPop",f:parse_BopPop},4194:{n:"AxcExt",f:parse_AxcExt},4195:{n:"Dat",f:parse_Dat},4196:{n:"PlotGrowth",f:parse_PlotGrowth},4197:{n:"SIIndex",f:parse_SIIndex},4198:{n:"GelFrame",f:parse_GelFrame},4199:{n:"BopPopCustom",f:parse_BopPopCustom},4200:{n:"Fbi2",f:parse_Fbi2},22:{n:"ExternCount",f:parsenoop},126:{n:"RK",f:parsenoop},127:{n:"ImData",f:parsenoop},135:{n:"Addin",f:parsenoop},136:{n:"Edg",f:parsenoop},137:{n:"Pub",f:parsenoop},145:{n:"Sub",f:parsenoop},148:{n:"LHRecord",f:parsenoop},149:{n:"LHNGraph",f:parsenoop},150:{n:"Sound",f:parsenoop},169:{n:"CoordList",f:parsenoop},171:{n:"GCW",f:parsenoop},188:{n:"ShrFmla",f:parsenoop},194:{n:"AddMenu",f:parsenoop},195:{n:"DelMenu",f:parsenoop},214:{n:"RString",f:parsenoop},223:{n:"UDDesc",f:parsenoop},234:{n:"TabIdConf",f:parsenoop},354:{n:"XL5Modify",f:parsenoop},421:{n:"FileSharing2",f:parsenoop},536:{n:"Name",f:parsenoop},547:{n:"ExternName",f:parse_ExternName},561:{n:"Font",f:parsenoop},1030:{n:"Formula",f:parse_Formula},2157:{n:"FeatInfo",f:parsenoop},2163:{n:"FeatInfo11",f:parsenoop},2177:{n:"SXAddl12",f:parsenoop},2240:{n:"AutoWebPub",f:parsenoop},2241:{n:"ListObj",f:parsenoop},2242:{n:"ListField",f:parsenoop},2243:{n:"ListDV",f:parsenoop},2244:{n:"ListCondFmt",f:parsenoop},2245:{n:"ListCF",f:parsenoop},2246:{n:"FMQry",f:parsenoop},2247:{n:"FMSQry",f:parsenoop},2248:{n:"PLV",f:parsenoop},2249:{n:"LnExt",f:parsenoop},2250:{n:"MkrExt",f:parsenoop},2251:{n:"CrtCoopt",f:parsenoop},0:{}};function parse_ods(zip,opts){if(typeof module!=="undefined"&&typeof require!=="undefined"&&typeof ODS==="undefined")ODS=require("./od"+"s");if(typeof ODS==="undefined"||!ODS.parse_ods)throw new Error("Unsupported ODS");return ODS.parse_ods(zip,opts)}function fix_opts_func(defaults){return function fix_opts(opts){for(var i=0;i!=defaults.length;++i){var d=defaults[i];if(opts[d[0]]===undefined)opts[d[0]]=d[1];if(d[2]==="n")opts[d[0]]=Number(opts[d[0]])}}}var fix_read_opts=fix_opts_func([["cellNF",false],["cellHTML",true],["cellFormula",true],["cellStyles",false],["cellDates",false],["sheetStubs",false],["sheetRows",0,"n"],["bookDeps",false],["bookSheets",false],["bookProps",false],["bookFiles",false],["bookVBA",false],["password",""],["WTF",false]]);var fix_write_opts=fix_opts_func([["cellDates",false],["bookSST",false],["bookType","xlsx"],["WTF",false]]);function safe_parse_wbrels(wbrels,sheets){if(!wbrels)return 0;try{wbrels=sheets.map(function pwbr(w){return[w.name,wbrels["!id"][w.id].Target]})}catch(e){return null}return!wbrels||wbrels.length===0?null:wbrels}function safe_parse_ws(zip,path,relsPath,sheet,sheetRels,sheets,opts){try{sheetRels[sheet]=parse_rels(getzipdata(zip,relsPath,true),path);sheets[sheet]=parse_ws(getzipdata(zip,path),path,opts,sheetRels[sheet])}catch(e){if(opts.WTF)throw e}}var nodirs=function nodirs(x){return x.substr(-1)!="/"};function parse_zip(zip,opts){make_ssf(SSF);opts=opts||{};fix_read_opts(opts);reset_cp();if(safegetzipfile(zip,"META-INF/manifest.xml"))return parse_ods(zip,opts);var entries=keys(zip.files).filter(nodirs).sort();var dir=parse_ct(getzipdata(zip,"[Content_Types].xml"),opts);var xlsb=false;var sheets,binname;if(dir.workbooks.length===0){binname="xl/workbook.xml";if(getzipdata(zip,binname,true))dir.workbooks.push(binname)}if(dir.workbooks.length===0){binname="xl/workbook.bin";if(!getzipfile(zip,binname,true))throw new Error("Could not find workbook");dir.workbooks.push(binname);xlsb=true}if(dir.workbooks[0].substr(-3)=="bin")xlsb=true;if(xlsb)set_cp(1200);if(!opts.bookSheets&&!opts.bookProps){strs=[];if(dir.sst)strs=parse_sst(getzipdata(zip,dir.sst.replace(/^\//,"")),dir.sst,opts);styles={};if(dir.style)styles=parse_sty(getzipdata(zip,dir.style.replace(/^\//,"")),dir.style,opts);themes={};if(opts.cellStyles&&dir.themes.length)themes=parse_theme(getzipdata(zip,dir.themes[0].replace(/^\//,""),true),dir.themes[0],opts)}var wb=parse_wb(getzipdata(zip,dir.workbooks[0].replace(/^\//,"")),dir.workbooks[0],opts);var props={},propdata="";if(dir.coreprops.length!==0){propdata=getzipdata(zip,dir.coreprops[0].replace(/^\//,""),true);if(propdata)props=parse_core_props(propdata);if(dir.extprops.length!==0){propdata=getzipdata(zip,dir.extprops[0].replace(/^\//,""),true);if(propdata)parse_ext_props(propdata,props)}}var custprops={};if(!opts.bookSheets||opts.bookProps){if(dir.custprops.length!==0){propdata=getzipdata(zip,dir.custprops[0].replace(/^\//,""),true);if(propdata)custprops=parse_cust_props(propdata,opts)}}var out={};if(opts.bookSheets||opts.bookProps){if(props.Worksheets&&props.SheetNames.length>0)sheets=props.SheetNames;else if(wb.Sheets)sheets=wb.Sheets.map(function pluck(x){return x.name});if(opts.bookProps){out.Props=props;out.Custprops=custprops}if(typeof sheets!=="undefined")out.SheetNames=sheets;if(opts.bookSheets?out.SheetNames:opts.bookProps)return out}sheets={};var deps={};if(opts.bookDeps&&dir.calcchain)deps=parse_cc(getzipdata(zip,dir.calcchain.replace(/^\//,"")),dir.calcchain,opts);var i=0;var sheetRels={};var path,relsPath;if(!props.Worksheets){var wbsheets=wb.Sheets;props.Worksheets=wbsheets.length;props.SheetNames=[];for(var j=0;j!=wbsheets.length;++j){props.SheetNames[j]=wbsheets[j].name}}var wbext=xlsb?"bin":"xml";var wbrelsfile="xl/_rels/workbook."+wbext+".rels";var wbrels=parse_rels(getzipdata(zip,wbrelsfile,true),wbrelsfile);if(wbrels)wbrels=safe_parse_wbrels(wbrels,wb.Sheets);var nmode=getzipdata(zip,"xl/worksheets/sheet.xml",true)?1:0;for(i=0;i!=props.Worksheets;++i){if(wbrels)path="xl/"+wbrels[i][1].replace(/[\/]?xl\//,"");else{path="xl/worksheets/sheet"+(i+1-nmode)+"."+wbext;path=path.replace(/sheet0\./,"sheet.")}relsPath=path.replace(/^(.*)(\/)([^\/]*)$/,"$1/_rels/$3.rels");safe_parse_ws(zip,path,relsPath,props.SheetNames[i],sheetRels,sheets,opts)}if(dir.comments)parse_comments(zip,dir.comments,sheets,sheetRels,opts);out={Directory:dir,Workbook:wb,Props:props,Custprops:custprops,Deps:deps,Sheets:sheets,SheetNames:props.SheetNames,Strings:strs,Styles:styles,Themes:themes,SSF:SSF.get_table()};if(opts.bookFiles){out.keys=entries;out.files=zip.files}if(opts.bookVBA){if(dir.vba.length>0)out.vbaraw=getzipdata(zip,dir.vba[0],true);else if(dir.defaults.bin==="application/vnd.ms-office.vbaProject")out.vbaraw=getzipdata(zip,"xl/vbaProject.bin",true)}return out}function add_rels(rels,rId,f,type,relobj){if(!relobj)relobj={};if(!rels["!id"])rels["!id"]={};relobj.Id="rId"+rId;relobj.Type=type;relobj.Target=f;if(rels["!id"][relobj.Id])throw new Error("Cannot rewrite rId "+rId);rels["!id"][relobj.Id]=relobj;rels[("/"+relobj.Target).replace("//","/")]=relobj}function write_zip(wb,opts){if(wb&&!wb.SSF){wb.SSF=SSF.get_table()}if(wb&&wb.SSF){make_ssf(SSF);SSF.load_table(wb.SSF);opts.revssf=evert_num(wb.SSF);opts.revssf[wb.SSF[65535]]=0}opts.rels={};opts.wbrels={};opts.Strings=[];opts.Strings.Count=0;opts.Strings.Unique=0;var wbext=opts.bookType=="xlsb"?"bin":"xml";var ct={workbooks:[],sheets:[],calcchains:[],themes:[],styles:[],coreprops:[],extprops:[],custprops:[],strs:[],comments:[],vba:[],TODO:[],rels:[],xmlns:""};fix_write_opts(opts=opts||{});var zip=new jszip;var f="",rId=0;opts.cellXfs=[];get_cell_style(opts.cellXfs,{},{revssf:{General:0}});f="docProps/core.xml";zip.file(f,write_core_props(wb.Props,opts));ct.coreprops.push(f);add_rels(opts.rels,2,f,RELS.CORE_PROPS);f="docProps/app.xml";if(!wb.Props)wb.Props={};wb.Props.SheetNames=wb.SheetNames;wb.Props.Worksheets=wb.SheetNames.length;zip.file(f,write_ext_props(wb.Props,opts));ct.extprops.push(f);add_rels(opts.rels,3,f,RELS.EXT_PROPS);if(wb.Custprops!==wb.Props&&keys(wb.Custprops||{}).length>0){f="docProps/custom.xml";zip.file(f,write_cust_props(wb.Custprops,opts));ct.custprops.push(f);add_rels(opts.rels,4,f,RELS.CUST_PROPS)}f="xl/workbook."+wbext;zip.file(f,write_wb(wb,f,opts));ct.workbooks.push(f);add_rels(opts.rels,1,f,RELS.WB);for(rId=1;rId<=wb.SheetNames.length;++rId){f="xl/worksheets/sheet"+rId+"."+wbext;zip.file(f,write_ws(rId-1,f,opts,wb));ct.sheets.push(f);add_rels(opts.wbrels,rId,"worksheets/sheet"+rId+"."+wbext,RELS.WS)}if(opts.Strings!=null&&opts.Strings.length>0){f="xl/sharedStrings."+wbext;zip.file(f,write_sst(opts.Strings,f,opts));ct.strs.push(f);add_rels(opts.wbrels,++rId,"sharedStrings."+wbext,RELS.SST)}f="xl/theme/theme1.xml";zip.file(f,write_theme());ct.themes.push(f);add_rels(opts.wbrels,++rId,"theme/theme1.xml",RELS.THEME);f="xl/styles."+wbext;zip.file(f,write_sty(wb,f,opts));ct.styles.push(f);add_rels(opts.wbrels,++rId,"styles."+wbext,RELS.STY);zip.file("[Content_Types].xml",write_ct(ct,opts));zip.file("_rels/.rels",write_rels(opts.rels));zip.file("xl/_rels/workbook."+wbext+".rels",write_rels(opts.wbrels));return zip}function firstbyte(f,o){switch((o||{}).type||"base64"){case"buffer":return f[0];case"base64":return Base64.decode(f.substr(0,12)).charCodeAt(0);case"binary":return f.charCodeAt(0);case"array":return f[0];default:throw new Error("Unrecognized type "+o.type)}}function read_zip(data,opts){var zip,d=data;var o=opts||{};if(!o.type)o.type=has_buf&&Buffer.isBuffer(data)?"buffer":"base64";switch(o.type){case"base64":zip=new jszip(d,{base64:true});break;case"binary":case"array":zip=new jszip(d,{base64:false});break;case"buffer":zip=new jszip(d);break;case"file":zip=new jszip(d=_fs.readFileSync(data));break;default:throw new Error("Unrecognized type "+o.type)}return parse_zip(zip,o)}function readSync(data,opts){var zip,d=data,isfile=false,n;var o=opts||{};if(!o.type)o.type=has_buf&&Buffer.isBuffer(data)?"buffer":"base64";if(o.type=="file"){isfile=true;o.type="buffer";d=_fs.readFileSync(data)}switch(n=firstbyte(d,o)){case 208:if(isfile)o.type="file";return parse_xlscfb(CFB.read(data,o),o);case 9:return parse_xlscfb(s2a(o.type==="base64"?Base64.decode(data):data),o);case 60:return parse_xlml(d,o);case 80:if(isfile)o.type="file";return read_zip(data,opts);default:throw new Error("Unsupported file "+n)}}function readFileSync(data,opts){var o=opts||{};o.type="file";return readSync(data,o)}function write_zip_type(wb,opts){var o=opts||{};var z=write_zip(wb,o);switch(o.type){case"base64":return z.generate({type:"base64"});case"binary":return z.generate({type:"string"});case"buffer":return z.generate({type:"nodebuffer"});case"file":return _fs.writeFileSync(o.file,z.generate({type:"nodebuffer"}));default:throw new Error("Unrecognized type "+o.type)}}function writeSync(wb,opts){var o=opts||{};switch(o.bookType){case"xml":return write_xlml(wb,o);default:return write_zip_type(wb,o)}}function writeFileSync(wb,filename,opts){var o=opts||{};o.type="file";o.file=filename;switch(o.file.substr(-5).toLowerCase()){case".xlsx":o.bookType="xlsx";break;case".xlsm":o.bookType="xlsm";break;case".xlsb":o.bookType="xlsb";break;default:switch(o.file.substr(-4).toLowerCase()){case".xls":o.bookType="xls";break;case".xml":o.bookType="xml";break}}return writeSync(wb,o)}function decode_row(rowstr){return parseInt(unfix_row(rowstr),10)-1}function encode_row(row){return""+(row+1)}function fix_row(cstr){return cstr.replace(/([A-Z]|^)(\d+)$/,"$1$$$2")}function unfix_row(cstr){return cstr.replace(/\$(\d+)$/,"$1")}function decode_col(colstr){var c=unfix_col(colstr),d=0,i=0;for(;i!==c.length;++i)d=26*d+c.charCodeAt(i)-64;return d-1}function encode_col(col){var s="";for(++col;col;col=Math.floor((col-1)/26))s=String.fromCharCode((col-1)%26+65)+s;return s}function fix_col(cstr){return cstr.replace(/^([A-Z])/,"$$$1")}function unfix_col(cstr){return cstr.replace(/^\$([A-Z])/,"$1")}function split_cell(cstr){return cstr.replace(/(\$?[A-Z]*)(\$?\d*)/,"$1,$2").split(",")}function decode_cell(cstr){var splt=split_cell(cstr);return{c:decode_col(splt[0]),r:decode_row(splt[1])}}function encode_cell(cell){return encode_col(cell.c)+encode_row(cell.r)}function fix_cell(cstr){return fix_col(fix_row(cstr))}function unfix_cell(cstr){return unfix_col(unfix_row(cstr))}function decode_range(range){var x=range.split(":").map(decode_cell);return{s:x[0],e:x[x.length-1]}}function encode_range(cs,ce){if(ce===undefined||typeof ce==="number")return encode_range(cs.s,cs.e);if(typeof cs!=="string")cs=encode_cell(cs);if(typeof ce!=="string")ce=encode_cell(ce);return cs==ce?cs:cs+":"+ce}function safe_decode_range(range){var o={s:{c:0,r:0},e:{c:0,r:0}};var idx=0,i=0,cc=0;var len=range.length;for(idx=0;i<len;++i){if((cc=range.charCodeAt(i)-64)<1||cc>26)break;idx=26*idx+cc}o.s.c=--idx;for(idx=0;i<len;++i){if((cc=range.charCodeAt(i)-48)<0||cc>9)break;idx=10*idx+cc}o.s.r=--idx;if(i===len||range.charCodeAt(++i)===58){o.e.c=o.s.c;o.e.r=o.s.r;return o}for(idx=0;i!=len;++i){if((cc=range.charCodeAt(i)-64)<1||cc>26)break;idx=26*idx+cc}o.e.c=--idx;for(idx=0;i!=len;++i){if((cc=range.charCodeAt(i)-48)<0||cc>9)break;idx=10*idx+cc}o.e.r=--idx;return o}function safe_format_cell(cell,v){if(cell.z!==undefined)try{return cell.w=SSF.format(cell.z,v)}catch(e){}if(!cell.XF)return v;try{return cell.w=SSF.format(cell.XF.ifmt||0,v)}catch(e){return""+v}}function format_cell(cell,v){if(cell==null||cell.t==null)return"";if(cell.w!==undefined)return cell.w;if(v===undefined)return safe_format_cell(cell,cell.v);return safe_format_cell(cell,v)}function sheet_to_json(sheet,opts){var val,row,range,header=0,offset=1,r,hdr=[],isempty,R,C,v;var o=opts!=null?opts:{};var raw=o.raw;if(sheet==null||sheet["!ref"]==null)return[];range=o.range!==undefined?o.range:sheet["!ref"];if(o.header===1)header=1;else if(o.header==="A")header=2;else if(Array.isArray(o.header))header=3;switch(typeof range){case"string":r=safe_decode_range(range);break;case"number":r=safe_decode_range(sheet["!ref"]);r.s.r=range;break;default:r=range}if(header>0)offset=0;var rr=encode_row(r.s.r);var cols=new Array(r.e.c-r.s.c+1);var out=new Array(r.e.r-r.s.r-offset+1);var outi=0;for(C=r.s.c;C<=r.e.c;++C){cols[C]=encode_col(C);val=sheet[cols[C]+rr];switch(header){case 1:hdr[C]=C;break;case 2:hdr[C]=cols[C];break;case 3:hdr[C]=o.header[C-r.s.c];break;default:if(val===undefined)continue;hdr[C]=format_cell(val)}}for(R=r.s.r+offset;R<=r.e.r;++R){rr=encode_row(R);isempty=true;if(header===1)row=[];else{row={};if(Object.defineProperty)Object.defineProperty(row,"__rowNum__",{value:R,enumerable:false});else row.__rowNum__=R}for(C=r.s.c;C<=r.e.c;++C){val=sheet[cols[C]+rr];if(val===undefined||val.t===undefined)continue;v=val.v;switch(val.t){case"e":continue;case"s":break;case"b":case"n":break;default:throw"unrecognized type "+val.t}if(v!==undefined){row[hdr[C]]=raw?v:format_cell(val,v);isempty=false}}if(isempty===false||header===1)out[outi++]=row}out.length=outi;return out}function sheet_to_row_object_array(sheet,opts){return sheet_to_json(sheet,opts!=null?opts:{})}function sheet_to_csv(sheet,opts){var out="",txt="",qreg=/"/g;var o=opts==null?{}:opts;if(sheet==null||sheet["!ref"]==null)return"";var r=safe_decode_range(sheet["!ref"]);var FS=o.FS!==undefined?o.FS:",",fs=FS.charCodeAt(0);var RS=o.RS!==undefined?o.RS:"\n",rs=RS.charCodeAt(0);var row="",rr="",cols=[];var i=0,cc=0,val;var R=0,C=0;for(C=r.s.c;C<=r.e.c;++C)cols[C]=encode_col(C);for(R=r.s.r;R<=r.e.r;++R){row="";rr=encode_row(R);for(C=r.s.c;C<=r.e.c;++C){val=sheet[cols[C]+rr];txt=val!==undefined?""+format_cell(val):"";for(i=0,cc=0;i!==txt.length;++i)if((cc=txt.charCodeAt(i))===fs||cc===rs||cc===34){txt='"'+txt.replace(qreg,'""')+'"';break}row+=(C===r.s.c?"":FS)+txt}out+=row+RS}return out}var make_csv=sheet_to_csv;function sheet_to_formulae(sheet){var cmds,y="",x,val="";if(sheet==null||sheet["!ref"]==null)return"";var r=safe_decode_range(sheet["!ref"]),rr="",cols=[],C;cmds=new Array((r.e.r-r.s.r+1)*(r.e.c-r.s.c+1));var i=0;for(C=r.s.c;C<=r.e.c;++C)cols[C]=encode_col(C);for(var R=r.s.r;R<=r.e.r;++R){rr=encode_row(R);for(C=r.s.c;C<=r.e.c;++C){y=cols[C]+rr;x=sheet[y];val="";if(x===undefined)continue;if(x.f!=null)val=x.f;else if(x.w!==undefined)val="'"+x.w;else if(x.v===undefined)continue;else val=""+x.v;cmds[i++]=y+"="+val}}cmds.length=i;return cmds}var utils={encode_col:encode_col,encode_row:encode_row,encode_cell:encode_cell,encode_range:encode_range,decode_col:decode_col,decode_row:decode_row,split_cell:split_cell,decode_cell:decode_cell,decode_range:decode_range,format_cell:format_cell,get_formulae:sheet_to_formulae,make_csv:sheet_to_csv,make_json:sheet_to_json,make_formulae:sheet_to_formulae,sheet_to_csv:sheet_to_csv,sheet_to_json:sheet_to_json,sheet_to_formulae:sheet_to_formulae,sheet_to_row_object_array:sheet_to_row_object_array};XLSX.parse_xlscfb=parse_xlscfb;XLSX.parse_zip=parse_zip;XLSX.read=readSync;XLSX.readFile=readFileSync;XLSX.readFileSync=readFileSync;XLSX.write=writeSync;XLSX.writeFile=writeFileSync;XLSX.writeFileSync=writeFileSync;XLSX.utils=utils;XLSX.CFB=CFB;XLSX.SSF=SSF})(typeof exports!=="undefined"?exports:XLSX);var XLS=XLSX;
/*
Turbolinks 5.0.0
Copyright © 2016 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e,r=function(t,e){return function(){return t.apply(e,arguments)}};e=!1,addEventListener("load",function(){return t.defer(function(){return e=!0})},!1),t.History=function(){function n(t){this.delegate=t,this.onPopState=r(this.onPopState,this)}return n.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),this.started=!0)},n.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),this.started=!1):void 0},n.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},n.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},n.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},n.prototype.shouldHandlePopState=function(){return e===!0},n.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},n}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,c;for(this.element=t,this.elements={},c=this.element.childNodes,s=0,u=c.length;u>s;s++)i=c[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function t(t){this.delegate=t,this.onScroll=e(this.onScroll,this)}return t.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},t.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},t.prototype.scrollToElement=function(t){return t.scrollIntoView()},t.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},t.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},t.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},t}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){
var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
(function() {
  jQuery(function() {
    $("a[rel~=popover], .has-popover").popover();
    return $("a[rel~=tooltip], .has-tooltip").tooltip();
  });

}).call(this);
(function() {
  (function() {
    (function() {
      var slice = [].slice;

      this.ActionCable = {
        INTERNAL: {
          "message_types": {
            "welcome": "welcome",
            "ping": "ping",
            "confirmation": "confirm_subscription",
            "rejection": "reject_subscription"
          },
          "default_mount_path": "/cable",
          "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
        },
        createConsumer: function(url) {
          var ref;
          if (url == null) {
            url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
          }
          return new ActionCable.Consumer(this.createWebSocketURL(url));
        },
        getConfig: function(name) {
          var element;
          element = document.head.querySelector("meta[name='action-cable-" + name + "']");
          return element != null ? element.getAttribute("content") : void 0;
        },
        createWebSocketURL: function(url) {
          var a;
          if (url && !/^wss?:/i.test(url)) {
            a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
          } else {
            return url;
          }
        },
        startDebugging: function() {
          return this.debugging = true;
        },
        stopDebugging: function() {
          return this.debugging = null;
        },
        log: function() {
          var messages;
          messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this.debugging) {
            messages.push(Date.now());
            return console.log.apply(console, ["[ActionCable]"].concat(slice.call(messages)));
          }
        }
      };

    }).call(this);
  }).call(this);

  var ActionCable = this.ActionCable;

  (function() {
    (function() {
      var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

      ActionCable.ConnectionMonitor = (function() {
        var clamp, now, secondsSince;

        ConnectionMonitor.pollInterval = {
          min: 3,
          max: 30
        };

        ConnectionMonitor.staleThreshold = 6;

        function ConnectionMonitor(connection) {
          this.connection = connection;
          this.visibilityDidChange = bind(this.visibilityDidChange, this);
          this.reconnectAttempts = 0;
        }

        ConnectionMonitor.prototype.start = function() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            document.addEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
          }
        };

        ConnectionMonitor.prototype.stop = function() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            document.removeEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor stopped");
          }
        };

        ConnectionMonitor.prototype.isRunning = function() {
          return (this.startedAt != null) && (this.stoppedAt == null);
        };

        ConnectionMonitor.prototype.recordPing = function() {
          return this.pingedAt = now();
        };

        ConnectionMonitor.prototype.recordConnect = function() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          return ActionCable.log("ConnectionMonitor recorded connect");
        };

        ConnectionMonitor.prototype.recordDisconnect = function() {
          this.disconnectedAt = now();
          return ActionCable.log("ConnectionMonitor recorded disconnect");
        };

        ConnectionMonitor.prototype.startPolling = function() {
          this.stopPolling();
          return this.poll();
        };

        ConnectionMonitor.prototype.stopPolling = function() {
          return clearTimeout(this.pollTimeout);
        };

        ConnectionMonitor.prototype.poll = function() {
          return this.pollTimeout = setTimeout((function(_this) {
            return function() {
              _this.reconnectIfStale();
              return _this.poll();
            };
          })(this), this.getPollInterval());
        };

        ConnectionMonitor.prototype.getPollInterval = function() {
          var interval, max, min, ref;
          ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
          interval = 5 * Math.log(this.reconnectAttempts + 1);
          return Math.round(clamp(interval, min, max) * 1000);
        };

        ConnectionMonitor.prototype.reconnectIfStale = function() {
          if (this.connectionIsStale()) {
            ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
            } else {
              ActionCable.log("ConnectionMonitor reopening");
              return this.connection.reopen();
            }
          }
        };

        ConnectionMonitor.prototype.connectionIsStale = function() {
          var ref;
          return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.disconnectedRecently = function() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.visibilityDidChange = function() {
          if (document.visibilityState === "visible") {
            return setTimeout((function(_this) {
              return function() {
                if (_this.connectionIsStale() || !_this.connection.isOpen()) {
                  ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
                  return _this.connection.reopen();
                }
              };
            })(this), 200);
          }
        };

        now = function() {
          return new Date().getTime();
        };

        secondsSince = function(time) {
          return (now() - time) / 1000;
        };

        clamp = function(number, min, max) {
          return Math.max(min, Math.min(max, number));
        };

        return ConnectionMonitor;

      })();

    }).call(this);
    (function() {
      var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
        slice = [].slice,
        bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

      supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

      ActionCable.Connection = (function() {
        Connection.reopenDelay = 500;

        function Connection(consumer) {
          this.consumer = consumer;
          this.open = bind(this.open, this);
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new ActionCable.ConnectionMonitor(this);
          this.disconnected = true;
        }

        Connection.prototype.send = function(data) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
          } else {
            return false;
          }
        };

        Connection.prototype.open = function() {
          if (this.isActive()) {
            ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
            throw new Error("Existing connection must be closed before opening");
          } else {
            ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
            if (this.webSocket != null) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        };

        Connection.prototype.close = function(arg) {
          var allowReconnect, ref1;
          allowReconnect = (arg != null ? arg : {
            allowReconnect: true
          }).allowReconnect;
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isActive()) {
            return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
          }
        };

        Connection.prototype.reopen = function() {
          var error;
          ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error1) {
              error = error1;
              return ActionCable.log("Failed to reopen WebSocket", error);
            } finally {
              ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        };

        Connection.prototype.getProtocol = function() {
          var ref1;
          return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
        };

        Connection.prototype.isOpen = function() {
          return this.isState("open");
        };

        Connection.prototype.isActive = function() {
          return this.isState("open", "connecting");
        };

        Connection.prototype.isProtocolSupported = function() {
          var ref1;
          return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
        };

        Connection.prototype.isState = function() {
          var ref1, states;
          states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
        };

        Connection.prototype.getState = function() {
          var ref1, state, value;
          for (state in WebSocket) {
            value = WebSocket[state];
            if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
              return state.toLowerCase();
            }
          }
          return null;
        };

        Connection.prototype.installEventHandlers = function() {
          var eventName, handler;
          for (eventName in this.events) {
            handler = this.events[eventName].bind(this);
            this.webSocket["on" + eventName] = handler;
          }
        };

        Connection.prototype.uninstallEventHandlers = function() {
          var eventName;
          for (eventName in this.events) {
            this.webSocket["on" + eventName] = function() {};
          }
        };

        Connection.prototype.events = {
          message: function(event) {
            var identifier, message, ref1, type;
            if (!this.isProtocolSupported()) {
              return;
            }
            ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
            switch (type) {
              case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
              case message_types.ping:
                return this.monitor.recordPing();
              case message_types.confirmation:
                return this.subscriptions.notify(identifier, "connected");
              case message_types.rejection:
                return this.subscriptions.reject(identifier);
              default:
                return this.subscriptions.notify(identifier, "received", message);
            }
          },
          open: function() {
            ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
              ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
              return this.close({
                allowReconnect: false
              });
            }
          },
          close: function(event) {
            ActionCable.log("WebSocket onclose event");
            if (this.disconnected) {
              return;
            }
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
              willAttemptReconnect: this.monitor.isRunning()
            });
          },
          error: function() {
            return ActionCable.log("WebSocket onerror event");
          }
        };

        return Connection;

      })();

    }).call(this);
    (function() {
      var slice = [].slice;

      ActionCable.Subscriptions = (function() {
        function Subscriptions(consumer) {
          this.consumer = consumer;
          this.subscriptions = [];
        }

        Subscriptions.prototype.create = function(channelName, mixin) {
          var channel, params, subscription;
          channel = channelName;
          params = typeof channel === "object" ? channel : {
            channel: channel
          };
          subscription = new ActionCable.Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        };

        Subscriptions.prototype.add = function(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.sendCommand(subscription, "subscribe");
          return subscription;
        };

        Subscriptions.prototype.remove = function(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        };

        Subscriptions.prototype.reject = function(identifier) {
          var i, len, ref, results, subscription;
          ref = this.findAll(identifier);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            this.forget(subscription);
            this.notify(subscription, "rejected");
            results.push(subscription);
          }
          return results;
        };

        Subscriptions.prototype.forget = function(subscription) {
          var s;
          this.subscriptions = (function() {
            var i, len, ref, results;
            ref = this.subscriptions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              s = ref[i];
              if (s !== subscription) {
                results.push(s);
              }
            }
            return results;
          }).call(this);
          return subscription;
        };

        Subscriptions.prototype.findAll = function(identifier) {
          var i, len, ref, results, s;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            s = ref[i];
            if (s.identifier === identifier) {
              results.push(s);
            }
          }
          return results;
        };

        Subscriptions.prototype.reload = function() {
          var i, len, ref, results, subscription;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.sendCommand(subscription, "subscribe"));
          }
          return results;
        };

        Subscriptions.prototype.notifyAll = function() {
          var args, callbackName, i, len, ref, results, subscription;
          callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
          }
          return results;
        };

        Subscriptions.prototype.notify = function() {
          var args, callbackName, i, len, results, subscription, subscriptions;
          subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          results = [];
          for (i = 0, len = subscriptions.length; i < len; i++) {
            subscription = subscriptions[i];
            results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
          }
          return results;
        };

        Subscriptions.prototype.sendCommand = function(subscription, command) {
          var identifier;
          identifier = subscription.identifier;
          return this.consumer.send({
            command: command,
            identifier: identifier
          });
        };

        return Subscriptions;

      })();

    }).call(this);
    (function() {
      ActionCable.Subscription = (function() {
        var extend;

        function Subscription(consumer, params, mixin) {
          this.consumer = consumer;
          if (params == null) {
            params = {};
          }
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }

        Subscription.prototype.perform = function(action, data) {
          if (data == null) {
            data = {};
          }
          data.action = action;
          return this.send(data);
        };

        Subscription.prototype.send = function(data) {
          return this.consumer.send({
            command: "message",
            identifier: this.identifier,
            data: JSON.stringify(data)
          });
        };

        Subscription.prototype.unsubscribe = function() {
          return this.consumer.subscriptions.remove(this);
        };

        extend = function(object, properties) {
          var key, value;
          if (properties != null) {
            for (key in properties) {
              value = properties[key];
              object[key] = value;
            }
          }
          return object;
        };

        return Subscription;

      })();

    }).call(this);
    (function() {
      ActionCable.Consumer = (function() {
        function Consumer(url) {
          this.url = url;
          this.subscriptions = new ActionCable.Subscriptions(this);
          this.connection = new ActionCable.Connection(this);
        }

        Consumer.prototype.send = function(data) {
          return this.connection.send(data);
        };

        Consumer.prototype.connect = function() {
          return this.connection.open();
        };

        Consumer.prototype.disconnect = function() {
          return this.connection.close({
            allowReconnect: false
          });
        };

        Consumer.prototype.ensureActiveConnection = function() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        };

        return Consumer;

      })();

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = ActionCable;
  } else if (typeof define === "function" && define.amd) {
    define(ActionCable);
  }
}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);


$(function(){

})
;
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//













$(document).on('ready page:load', function() {

    $('.datepicker').datepicker({
        'format': 'yyyy/mm/dd',
        'language': 'ja',
        'minDate': 'today',
        'autoclose': true
    });

    $('.clearButton').click(function(e) {
        $('input').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
        $('select').find('option:first').prop('selected', 'selected');
    });

    $("input[data-loading-text]").click(function() {
        $(this).button('loading');
    });

});


function ajaxRequest(param) {
    if (param.before) {
        param.before();
    }
    return $.ajax({
        cache: param.cache ? param.cache : true,
        async: param.async ? param.async : true,
        type: param.type ? param.type : 'GET',
        url: param.url,
        data: param.data ? param.data : '',
        dataType: param.dataType ? param.dataType : 'html'
    }).done(function(data, status, xhr) {
        if (param.done) {
            return param.done(data, status, xhr);
        }
    }).fail(function(xhr, error, status) {
        if (xhr.status === 422 && param.invalidRecord) {
            return param.invalidRecord(xhr.responseText, status, xhr);
        } else {
            if (param.fail) {
                return param.fail(xhr, error, status);
            }
        }
    }).always(function(data, status, xhr) {
        if (param.always) {
            return param.always(data, status, xhr);
        }
    });
};

this.ajaxFormSubmit = function(param) {
    return param.form.submit(function(event) {
        var dataType, type, url;
        event.preventDefault();
        url = param.form.attr('action');
        if (param.url) {
            url = param.url;
        }
        dataType = 'html';
        if (param.dataType) {
            dataType = param.dataType;
        }
        type = param.form.attr('method');
        if (param.type) {
            type = param.type;
        }
        return ajaxRequest({
            cache: true,
            async: true,
            type: type,
            url: url,
            data: param.form.serialize(),
            dataType: dataType,
            before: param.before,
            done: param.done,
            fail: param.fail,
            invalidRecord: param.invalidRecord,
            always: param.always
        });
    });
};

