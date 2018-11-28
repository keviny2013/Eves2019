<?php
/**
*	@name			:	index.php
*	@owner			: 	eVe
*	@description	:	Calls first page
*	@steps	 		: 	
*
*/

session_start();

define("DOCROOT", getcwd());
define("URLROOT", $_SERVER['HTTP_HOST']);

// exit('<br>exit 15: ');

	// security check and validation
try{
	require_once(DOCROOT . '/eVe/SecurityCheck.php');
	$securityCheck = new SecurityCheck();
}
catch(Exception $e) {
	exit('<br>exit 25: ' . $e->getMessage());
}
// echo '25- status: ' . $securityCheck->getStatus();
if($securityCheck->getStatus() == 'Security issue') {
	exit('<br>exit 29: ');
}
if($securityCheck->getStatus() != 'Ok') {
	echo json_encode($securityCheck->getOut());
	return;
	
	// exit('<br>exit 31: ');
}


// exit('<br> exit 43');

/*
	/** 
		@toDo : 2 levels of cache.
			- Standard cache (cachable Requests)
			- Backup cache: Loads only if server is too busy. (all page, etc.) 
		@toDo : Updating caches
	
if(!empty($request['cached'])) {
	if(file_exists($request['cached'])) {
		require($request['cached']);
		return;
	}
	exit('<br>Error-52: Sorry an error occurred in the system. ' . $secured['cached']);
}
else 
*/

$request = $securityCheck->getRequest();

if(empty($request['requestName'])) {
	// loading from cache
	require_once(DOCROOT . '/caches/page/first/page_first.html');
	return;
}
else if($request['requestType'] == 'page') {
	$method = $request['requestName'];
	$pos1 = strpos($method, '_');
	$folder = substr($method, $pos1 + 1);

// exit('file: ' . DOCROOT . '/requests/' . $folder . '/' . $method . '.php');
// var_dump('<pre>posts-73: ', $secured['posts']); exit;

	require_once(DOCROOT . '/page/' . $folder . '/' . $method . '.php');
	$response = new $method($securityCheck);
	$out = $response->getOut();
	echo $out;	
	
}
else {
	$method = $request['requestName'];
	$folder = $request['folder'];
	// $pos1 = strpos($method, '_');
	// $folder = substr($method, 0, $pos1);

// exit('file: ' . DOCROOT  . '/' . $folder . '/' . $method . '.php');
// var_dump('<pre>posts-73: ', $request['posts']); exit;

	require_once(DOCROOT . '/' . $folder . '/' . $method . '.php');
	$response = new $method($securityCheck);
	$out = $response->getOut();
	echo json_encode($out);

}


// @toDo  list($secured['toCaller']);
// @toDo writeToLog('todeveloper', $securityCheck->toDeveloper);



/** 
*	@objectId : Maybe formid or something else	
*	@rule	:	Register token in session with time and IP
*/
function  generateToken($objectId, $expires) {
	$chars = array( 's', 't', 'u', 'V', 'w', 'X', 'y', 'z', '0', '1', '2', '3', '4', '_', '-', '5', '6', '7', '8', '9', '10', 'a', 'b', 'C', 'd', 'e', 'F', 'g', 'h', 'i', 'j', 'K', 'l', 'm', 'n', 'o', 'p', 'q', 'r');
	$random_keys = array_rand($chars, 7);
	$replaced = array_replace($random_keys, $chars);
	$token1 = implode($replaced);
	$expires = date('U') + $expires;
	$_SESSION['tokens'][$token1] = $expires;
	
	return $token1;
}

