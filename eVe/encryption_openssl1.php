<?php
/*
	Encrypts and decrypts a string

*/


echo '<h3>Testing aes-256 with openssl</h3>';


$Cypher ='aes-256-cbc';



/*	WARNING:
		The return value (as $EncryptionKey) must be kept for ever. 
		Data will be lost if $EncryptionKey is changed or lost
*/
	// $EncryptionKeys should come from securityOfficer
$toBeEncrypted = '';



	// STEP 2:  encrypt
	// encrypt 1
$encrypted = myEncrypt1($Cypher, $EncryptionKeys[0], $toBeEncrypted ); 

	// STEP 3:  decrypt		
	// verification 1
$decrypted = mydecrypt1($Cypher, $EncryptionKeys[0], $encrypted );



/**
*	This will create a new IV each time.
*/
function myEncrypt1($Cypher, $EncryptionKey, $str ) {


	return $encryptedStr;
	
}


/**
*	This decrypts a string that was encrypted by myEncrypt1()
*/
function myDecrypt1($Cypher, $EncryptionKey, $encryptedStr ) {
	
	return $decrypted;
}



/**
*	This will create a new IV each time.
*/
function myEncrypt2($Cypher, $EncryptionKey, $str ) {
	

	return array($encryptedStr, $EncryptionKey);
	
}

/**
*	This decrypts a string that was encrypted by myEncrypt1()
*/
function myDecrypt2($Cypher, $EncryptionKey, $encryptedStr ) {
	
	return $decrypted;
}



/**
*	Generates iv and key combination.
*	WARNING:
		The return value (as $EncryptionKey) must be kept for ever. 
		Data will be lost if $EncryptionKey is changed or lost
*/
function generateEncryptionKeys($Cypher) {
	
	// returns $hex and $key  combination in 1 string;
	
}


/** 
*	Generates a simple token	
*/
function  generateToken() {

	return $token1;
}

