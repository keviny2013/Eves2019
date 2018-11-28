
/**
	1-  Cache is disabled in eVe.ajaxCall()
		metaData['cachable'] = 'No';

	2-  Order of operations:
		a- Add tests : eVe.tests[requestName][inputsStr] = result;
		b- Save added tests :
			JSON.stringify(eVe.tests) will be downloaded
				Put this json string into tools/tests/testScenarios.js
		c- Run tests
		d- Show test results

	Tests are not working synchronously because of Ajax involment 
*/

// R**  localStorage.clear();

eVe.caches = {};
eVe.mode = 'tests';
eVe.testStarted = '';
eVe.countTests = 0;
eVe.testsNotCompleted = [];
eVe.FailedTests = {};
eVe.countSuccessfulTests = 0;
eVe.CountFailedTests = 0;
eVe.testsToRun = {};
	
	// This is called from eVe.init()
eVe.installTestModule = function() {
	
	eVe.addTestButtons();

	eVe.countTests = eVe.countObjectProperties(eVe.tests);
			
	alert('Currently there are ' + eVe.countTests + ' saved test scenarios.');

}

	// This is called from eVe.installTestModule()
eVe.addTestButtons = function() {

 	
	return true;
	
}



/////////////////////  add test scenarios and save  //////////////////////////////////

/**
*	Sets eVe.mode = 'addTests';
*/
eVe.set2AddTest = function() {
	eVe.mode = 'addTests';
	alert("You can add tests scenarios now. \nWhen you finished adding test scenarios please click 'Save New Tests' to save them.");
}


/**
*	Adds a test scenario when a FORM is submitted
*	@toDo : Needs improvement
	structure:
	eVe.tests[requestName] = {};
	eVe.tests[requestName][inputsStr] = result;
		requestName (string), inputsStr (JSON string), result (object)
*/
eVe.addAtestScenario = function(requestName, inputsStr, result) {

	return true;
	
}


/**
*	Saves all test scenarios in eVe.tests which includes old and new test scenarios.
	Warning: You must save the new test scenarios before clearing the cache. Otherwise the new ones will be lost.
*/
eVe.saveTests = function() {


	eVe.mode = 'tests';
	
	return true;	
	
	
}

	// eVe.download(content, 'eVe_testScenarios.txt' );
eVe.download = function(content, fileName) {

}


//////////////////////////////////////////////  run tests ////////////////////////////////////////////


/**	
*	Creates a link for each test scenario
	Places test links in tests_div
	Tester clicks each link one by one.
	When tester finishes testing, tester clicks 'show test results'. 
*
*/
eVe.runAllTests = function() {
	eVe.mode = 'runTests';

	
}


/**
*	This method runs a link test but the result is not evaluated here
*	Result is registered in eVe.addAtestResult()
*	eVe.addAtestResult() is called in eVe_tests1.js when a link operation is ended
*/	
eVe.runALinkTest = function(alink) {
	event.preventDefault();
	// console.log('304 alink.innerHTML: ' + alink.innerHTML + ' : ' + alink.text);

	eVe.analyzeLink(alink);
	
	return true;
	
}


/**
*	This method runs a form test. 
	When test is ended eVe.addAtestResult() is called in eVe_tests1.js, not from here.
	
	testnumber] structure: [requestName, datamStr]
*/		
eVe.runAformubmitTest = function(testnumber) {

	return true;
	
}


/**
* 	Inserts given values (datamStr) into the form fields.
	No multiselect in drop downs. Use checkboxes instead.
*/
eVe.insertFormInputs = function(formid, datamStr) {

	
	return true;
	
}


/**
*	This is called in eVe.tests1.js when running a test is finished
*	If program could run synchronously : 
		It would be possible to find out the test result programmatically 
			if(eVe.tests[requestName][inputsStr] == creturn) {
				// test was successful
			}
	Since Ajax is causing asynchronous operations we need the tester to confirm 
	each test result one by one.
*/
eVe.addAtestResult = function(requestName, inputsStr, creturn) {

	
	return true;
	
}

/**
*	Show test results by date in local storage, 
*/
eVe.showTestResults = function() {

	eVe.mode = 'tests';
	
}

