/*
 * This pre-request script retrieves a Bearer token from the client credentials
 * you provide in your environment file.
 */
// Retrieve env variables currently configured


//const addToken = () => {
//  console.log(env_variables)

//  pm.sendRequest({
//	url: 'https://api.twitter.com/oauth2/token',
//	method: 'POST',
//	auth: {
//	  type: 'basic',
//	  basic: {
//		username: env_variables.consumer_key,
//		password: env_variables.consumer_secret
//	  }
//	},
//	headers: {
//	  'Content-type': 'Content-type: application/x-www-form-urlencoded; charset: utf-8'
//	},
//	body: {
//	  mode: 'urlencoded',
//	  urlencoded: 'grant_type=client_credentials'
//	}
//  }, (err, res) => {
//	if (err) {
//	  console.error('Error while generating a bearer token:', err);
//	} else {
//	  const { access_token } = res.json();
//	  env_variables.bearer_token = access_token;
//	  pm.environment.set('bearer_token', access_token);
//	}
//  });
//}

//const prepareBearerToken = () => {
//  // Check if the required variables are set
//  for (const key of ['consumer_key', 'consumer_secret']) {
//	if (typeof env_variables[key] === 'undefined' || !env_variables[key]) {
//	  console.error('Missing required env variable:', key);
//	  return;
//	}
//  }

//  // Use an existing Bearer token, if already provided
//  if (typeof env_variables.bearer_token === 'undefined' || env_variables.bearer_token === '' || env_variables.bearer_token === null || env_variables.bearer_token.toLowerCase() === 'your bearer token') {
//	addToken();
//  }
//}

//prepareBearerToken();

//const prepareOAuthSignature = () => {
//  /*
//   * This is a Pre-request script for Postman client to remediate OAuth 1.0a issue
//   * where certain request fails if the query parameter includes some specific characters.
//   * https://tools.ietf.org/html/rfc3986#section-2.2 (rfc3986, gen-delims reserved characters)
//   *
//   * NOTE: This Pre-script is intended to use with "GET" request but might be able to
//   *       work with other methods that have no request body.
//   *       For "POST" request, there's another workaround.
//   *       See: https://github.com/twitterdev/postman-twitter-ads-api/issues/2
//   *
//   * In order to use this Pre-request script, you need to change your "Authorization" type to
//   * "No Auth" only for the target request and do not apply to the top-level object.
//   */


//function toArray(object) {
//	let array = [];
//	Object.keys(object).forEach(key => {
//		array.push(`${key}=${object[key]}`);
//	});
//	return array
//}

//// fetch all env variables that are currently defined
//const env_variables = pm.environment.toObject({
//	excludeDisabled: true
//});

//const oauth_consumer_key = env_variables.consumer_key;
//const oauth_consumer_secret = env_variables.consumer_secret;
//const oauth_token = env_variables.access_token;
//const oauth_secret = env_variables.token_secret;
//const oauth_signing_key = `${oauth_consumer_secret}&${oauth_secret}`;
//console.log(oauth_consumer_key)
//// create random oauth_nonce string
//const random_source = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//let oauth_nonce = '';
//for (let i = 0; i < 32; i++) {
//	oauth_nonce += random_source.charAt(Math.floor(Math.random() * random_source.length));
//}

//const oauth_parameter_string_object = {};
//oauth_parameter_string_object.oauth_consumer_key = oauth_consumer_key;
//oauth_parameter_string_object.oauth_token = oauth_token;
//const oauth_nonce_array = CryptoJS.enc.Utf8.parse(oauth_nonce);
//oauth_parameter_string_object.oauth_nonce = encodeURIComponent(CryptoJS.enc.Base64.stringify(oauth_nonce_array));
//oauth_parameter_string_object.oauth_signature_method = 'HMAC-SHA1';
//oauth_parameter_string_object.oauth_version = '1.0';
//oauth_parameter_string_object.oauth_timestamp = Math.round((new Date()).getTime() / 1000);

//// for Authorization request header (copy object)
//const oauth_authorization_header_object = Object.assign({}, oauth_parameter_string_object);

//// convert query string into object (+ encode)
//const url_query_string_object = {};

//const url_query_string_object_array = sdk.QueryParam.parse(
//	pm.request.url.getQueryString({
//		ignoreDisabled: true
//	})
//).filter(el => !!el.key);

//url_query_string_object_array.forEach(item => {
//	url_query_string_object[item.key] = encodeURIComponent(item.value);
//});

//// merge query parameter
//Object.assign(oauth_parameter_string_object, url_query_string_object);

//// sort object by key
//const oauth_parameter_string_object_ordered = {};
//Object.keys(oauth_parameter_string_object).sort().forEach(function (key) {
//	oauth_parameter_string_object_ordered[key] = oauth_parameter_string_object[key];
//});

//// generate parameter string
//const oauth_parameter_string = toArray(oauth_parameter_string_object_ordered).join('&');

//// replace dynamic variables
//let base_host = pm.request.url.getOAuth1BaseUrl();
//let regexp = /{{(.*?)}}/g;
//let result = null;
//while (result = regexp.exec(base_host)) {
//	let value = env_variables[result[1]];
//	base_host = base_host.replace(new RegExp(`{{${result[1]}}}`, 'g'), value);
//}

//// generate base string
//const oauth_base_string = `${pm.request.method}&${encodeURIComponent(base_host)}&${encodeURIComponent(oauth_parameter_string)}`;

//// generate signature
//const oauth_signature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(oauth_base_string, oauth_signing_key));

//oauth_authorization_header_object.oauth_signature = encodeURIComponent(oauth_signature);

//// generate Authorization header string
//const oauth_authorization_header = toArray(oauth_authorization_header_object).join(', ');

//// generate Authorization header
//pm.request.headers.add({
//	key: 'Authorization',
//	value: `OAuth ${oauth_authorization_header}`
//});

//// Escape URI parameters using encodeURIComponent => RFC3986
//if (Object.keys(url_query_string_object).length !== 0) {
//	// generate query parameter string
//	const request_parameter_string = toArray(url_query_string_object).join('&');

//	pm.request.url = `${pm.request.url.getOAuth1BaseUrl()}?${request_parameter_string}`;
//}
//}

//if (typeof pm.request.auth !== 'undefined' && pm.request.auth.type === 'oauth1') {
//	prepareOAuthSignature();
//}




const tweet_id = 1576508215537201153
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer AAAAAAAAAAAAAAAAAAAAACt2ZwAAAAAAQwTFZ0M87%2B7ynAkbUVUrWGEGrus%3DY4fiTyPPJ4HEus0WtX2RynHB4EAkep5A4Pr9F8IFNiIwvwfnfw");
myHeaders.append("Cookie", "guest_id=v1%3A165865221501677794");

var requestOptions: RequestInit = {
	method: 'GET',
	headers: myHeaders,
	redirect: "follow"
};

fetch("https://api.twitter.com/2/tweets/1576508215537201153?expansions=referenced_tweets.id", requestOptions)
	.then(response => response.text())
	.then(result => console.log(result))
	.catch(error => console.log('error', error));


let response = pm.response.json().data
let referenced_tweets = response?.referenced_tweets
console.log(response.text)

if (referenced_tweets) {

	pm.collectionVariables.set("tweet_id", referenced_tweets[referenced_tweets.length - 1].id);
	if (referenced_tweets.length > 0) {

		referenced_tweets.forEach(tweet => console.log(tweet.id))
	}
	postman.setNextRequest("Single Tweet");
} else {
	pm.collectionVariables.clear()
	postman.setNextRequest(null);

}




https://github.com/sindresorhus/p-queue