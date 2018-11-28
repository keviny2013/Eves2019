<?php
//securityCheck.php

/**

	SecurityCheck class approves or denies a request.
		$Visa = new $SecurityCheck;
		If approved: $Visa->getStatus() === 'Ok' Use $Visa->getRequest() and $Visa->getProperties() to proceed 
		If denied: $Visa->getStatus() != 'Ok'. Use $this-Privates['out']
	
	Status standards:
		1- "Ok"
		2- "invalidInput"
		3- "OperationFailed"
		4- "Unsafe"		(Does not require denial of service. Not to be saved in database but must be tracked in session)
		5- "Security_Issue"	(Requires denial of service. To be saved in database.)	
	
	Encryption: 
		related functions are public for now. 	// @toDo
		It is public so, a token is needed to access them. This token should expire in seconds. 
		( Check eVe/encryption_openssl1.php ) 

	
	Structure to respond Ajax requests = structure of a FORM output to pass to a page:
	'out' => array('status' => '', 'toCaller' => '', 'unacceptables' => '', 'html' => array(), 'JsFiles' => array(), 'tokens' => array(), 'runAfter' => array()) 
		
*/
class SecurityCheck 
{
	
	// $EncryptionKeysStr = ["Cf6oW1JQMQrRW+tjr9a1lNiQhPLczDsu","aes-256-cbc",32,44,24,44,24]
	
	protected $protecteds = array();

	private $privates = array(
		'status' => ''
		, 'securityIssues' => array()
		, 'tracks' => array()
		, 'toCaller' => array()
		, 'toDeveloper' => array()
		, 'gets' => array()
		, 'posts' => array()
		, 'requestName' => ''
		, 'requestType' => ''
		, 'folder' => ''
		, 'method' => ''
		, 'checked' => array()
		, 'accessNeeded' => array()
		, 'settings' => array()
		, 'cached' => ''
		, 'cachableResponse' => 'No'
		, 'Cipher' => 'aes-256-cbc'
		, 'encToken' => ''
		, 'encTokenExpire' => ''
	);
	
	public $publics = array();
	
	
	function __CONSTRUCT() {
		$this->privates['tracks'][] = get_class($this) . '/' . __FUNCTION__ . '() started';

		if(!empty($_POST)) {
			//  requests only. Not page
			
			$this->processPost();

		}
		else {
			// page only. Not requests

			// @toDo : $this->processPage();


			// Home page
			$pageName = 'page_first';
			$this->privates['requestName'] = $pageName;
			$this->privates['folder'] = 'page/first';
			$this->privates['requestType'] = 'page';
	

		}
		
		$_POST = array();
		$_GET = array();
		

		require('common/settings.php');
			// environment, urlRoot, eVe_mode, eVe_validTestIps, adminEmail
		$this->privates['settings'] = $settings;
		
			// @toDo : Need better source than settings.php		
		$this->privates['settings']['dbAccess'] = '';
		$this->privates['settings']['fileAccess'] = '';
		
		if(empty($this->privates['status']) ) {


			if(!empty($this->privates['accessNeeded'])) {
					// defining $this->privates['settings'] : dbAccess and fileAccess permissions
					
					// accessNeeded is defined in security instructions file (under SecurityInstructions folder)
				$this->privates['settings']['dbAccess'] = $this->privates['accessNeeded']['dbAccess'];
				$userName = $this->privates['accessNeeded']['dbAccess']['dbUsername'];
					// $dbAccess comes from settings.php
				$this->privates['settings']['dbAccess']['dbUser'] = $dbAccess[$userName];
				
				if($this->privates['settings']['eVe_mode'] == 'tests') {
						// changing the database name to 'tests_{databaseName}' but keeping the same credentials
					$this->privates['settings']['dbAccess']['dbUser'][1] = 'tests_' . $this->privates['settings']['dbAccess']['dbUser'][1];
				}

				$this->privates['settings']['fileAccess'] = $this->privates['accessNeeded']['fileAccess'];
			}

			$this->privates['status'] = 'Ok';
			
				// caching
			if($this->privates['cachableResponse'] === 'Yes' && !$this->privates['cached']) {
				$cacheFile = DOCROOT . '/caches/' . $this->privates['folder'] . '/' . $this->privates['requestName'] . '.txt';
				file_put_contents($cacheFile, $this->getOut());
				
			}
		}
		else {
			$this->generateOut();
		}
	}
	
	
	/**
	*	all _POST requests come in with 2 keys 'metaData' and datam'. Both's values are formatted as Json string.

		Structure of acceptabels and unacceptabels are different. 
		The reason is: We want to pass $unacceptabels to Javascript as array (in Json string) not as Javascript object.
			$acceptabels[$key] = array($key, $value, $privacy, $fieldType);
			$unacceptabels[] = array($key, $value, $privacy);
			
	*	Steps in processPost():
		1- Check requestName, requestType
		2- Check token
		3- Check if there is any security instructions 
		4- Check if cached
		5- If no security instructions
		
		21- If no issue: Sets $this->privates['posts'] value

	*/
	private function processPost()
	{
	
			// security check on $_POST completed		
		$this->privates['tracks'][] = 'Finished processPost()';		
	}

		
	/**
	*	1- Checks size and characters of $datam against $pattern
		2- Checks if required
	*	3- Generates $this->privates['checked']['unacceptables'] and $this->privates['checked']['acceptables'] 
	*	4- Returns the $datain that does not have pattern. Possible unexpected data. 
		
		Assuming that if $vals[0] is empty there is no $vals[1]
		
	*/
	private function checkPregMatch($patterns, $datain, $requireds) 
	{

		
		return $datain;
		
	}

	
	public function getStatus()
	{
		return $this->privates['status'];
	}
	public function getMode()
	{
		return $this->privates['settings']['eVe_mode'];
	}
	public function getRequest() {
		return array(
			'requestName' => $this->privates['requestName']
			, 'folder' => $this->privates['folder']
			, 'requestType' => $this->privates['requestType']
			, 'method' => $this->privates['method']
			,'cached' => $this->privates['cached']
		);

	}
	public function getProperties()
	{
		if($this->privates['status'] === 'Ok') {
			return array(
				'datam' => $this->privates['posts']
				, 'metaData' => $this->privates['settings']
			);
		}
		else if($this->privates['status'] === 'invalidInput') {
			return $this->privates['checked']['unacceptables'];
		}
		else {
// var_dump('<pre>424 toDeveloper:', $this->privates['toDeveloper']);
			return null;
		}
		
	}
	
	public function getToCaller()
	{
		return $this->privates['toCaller'];
	}
	public function getOut()
	{
		return $this->privates['out'];
	}
	
	
	
	private function encryptPrivacyFields($privacyFields) {
		
		
	}
	
	/**
	*	You can add more here
	*/
	private function getKeys() {
		
		// return array of keys?;

	}
	
	/**
	*	This will create a new IV each time.
		EncryptionKey and IV
	*/
	public function myEncrypt1($key, $str ) {

		return $encryptedStr;
		
	}

	/**
	*	This decrypts a string that was encrypted by myEncrypt1()
		EncryptionKey and IV must be encoded inside the incoming $EncryptionKey
	*/
	public function myDecrypt1($key, $encryptedStr ) {

		return $decrypted;
	}


			
	/**
	*	This method is used only if SecurityCheck fails.
		Method displays the issues for front end user 
	*	These messages must be placed in div id='toCaller'
	*	Structure to respond Ajax requests = structure of a FORM output to pass to a page:
	*	'out' => array('status' => '', 'toCaller' => '', 'unacceptables' => '', 'html' => array(), 'JsFiles' => array(), 'tokens' => array(), 'runAfter' => array()) 
	*/
	private function generateOut() {
		$this->privates['tracks'][] = get_class($this) . '/' . __FUNCTION__ . '() started';

		$this->privates['out'] = array();
		$this->privates['out']['unacceptables'] = $this->getProperties();
		$this->privates['out']['status'] = $this->privates['status'];
			
		require_once('tools/templates/writeMessages.php');
		$aBlock = writeMessages($this->privates['toCaller'], 'Validation issues');
		$this->privates['out']['toCaller'] = $aBlock;


		// $this->privates['out'] = json_encode($this->privates['out']);	
		
	}

	
	

	/**
		Get security instructions file under securityInstructions folder
		Implement security instructions: Check user's inputs against security check instructions	
		$datam will be reduced after each check. 
		At the end: $datam will be empty if passed security check.
				$fieldNames	: fieldNames only
				( $labels	: labels only )
				$requireds	: fieldNames only
				$patterns	: key => value pairs
				$options : fieldNames => array of options.
				$piiFields : fieldNames only
				$passwordFields : fieldNames only
				$cachableResponse : 
				$customValidationMethods : function names only

		accessNeeded = array('dbAccess' => $dbAccess, 'fileAccess' => $fileAccess);	
			dbAccess = array('dbUsername' => 'crud', 'dbTables' => array('users'), 'dbMethod' => 'insert');
			fileAccess = array();

	*/
	private function runSecurityInstructions($metaData, $datam) {


	}

	
}
