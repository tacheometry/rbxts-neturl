interface NetUrl {
	/**
	 * url options
	 *
	 * `separator` is set to `&` by default but could be anything like `&amp;amp;` or `;`
	 *
	 * `cumulative_parameters` is false by default. If true, query parameters with the same name will be stored in a table.
	 *
	 * `legal_in_path` is a table of characters that will not be url encoded in path components
	 *
	 * `legal_in_query` is a table of characters that will not be url encoded in query values. Query parameters only support a small set of legal characters (-_.).
	 *
	 * `query_plus_is_space` is true by default, so a plus sign in a query value will be converted to %20 (space), not %2B (plus)
	 */
	options: {
		separator: string;
		cumulative_parameters: boolean;
		legal_in_path: Set<string>;
		legal_in_query: Set<string>;
		query_plus_is_space: boolean;
	};

	/**
	 * list of known and common scheme ports as documented in IANA URI scheme list
	 * @link http://www.iana.org/assignments/uri-schemes.html
	 */
	services: Map<string, number>;

	/**
	 * builds the querystring
	 * @param tab The key/value parameters
	 * @param sep The separator to use (optional)
	 * @param key The parent key if the value is multi-dimensional (optional)
	 * @returns a string representing the built querystring
	 */
	buildQuery: (tab: Map<string, any>, sep?: string, key?: string) => string;

	/**
	 * Parses the querystring to a table
	 *
	 * This function can parse multidimensional pairs and is mostly compatible with PHP usage of brackets in key names like `?param[key]=value`
	 * @param str The querystring to parse
	 * @param sep The separator between key/value pairs, defaults to `&`
	 * @param T Replace with `string | string[]` to have proper typings when using brackets in the query
	 * @returns
	 */
	parseQuery: <T extends string | string[] = string>(str: string, sep?: string) => Map<string, T>;

	/**
	 * Parse the url into the designated parts.
	 *
	 * Depending on the url, the following parts can be available:
	 * scheme, userinfo, user, password, authority, host, port, path, query, fragment
	 * @param url Url string
	 * @returns a table with the different parts and a few other functions
	 */
	parse: (url: string) => NetUrlInstance;

	/**
	 * removes dots and slashes in urls when possible
	 *
	 * This function will also remove multiple slashes
	 * @param path The string representing the path to clean
	 * @returns a string of the path without unnecessary dots and segments
	 */
	removeDotSegments: (path: string) => string;
}

interface NetUrlInstance {
	/**
	 * Same as `host`, but, if specified, includes the port, host, and user information
	 * @example "google.com:8080"
	 */
	authority: string;
	/** @example "google.com" */
	host: string;
	/** @example "/some/page.html" */
	path: string;
	/** @example { someParam: "abc", someOtherParam: "def" } */
	query: Map<string, string>;
	/** @example "http" */
	scheme: string;

	addSegment(path: string): NetUrlInstance;

	/**
	 * builds the url
	 * @returns a string representing the built url
	 */
	build(): string;

	/**
	 * set the url query
	 * @param query Can be a string to parse or a table of key/value pairs
	 */
	setQuery(query: string | Map<string, any>): string;

	/**
	 * set the authority part of the url
	 *
	 * The authority is parsed to find the user, password, port and host if available.
	 * @param authority The string representing the authority
	 * @returns a string with what remains after the authority was parsed
	 */
	setAuthority(authority: string): string;

	/**
	 * builds a new url by using the one given as parameter and resolving paths
	 * @param other  A string or a table representing a url
	 * @returns a new url table
	 */
	resolve(other: string | NetUrl): NetUrlInstance;

	/**
	 * normalize a url path following some common normalization rules
	 * @link http://en.wikipedia.org/wiki/URL_normalization
	 * @returns the normalized path
	 */
	normalize(): NetUrlInstance;
}

declare const NetUrl: NetUrl;
export = NetUrl;
