/**
	First Javascript file in web application.
	check eVe_mode in htmlHead.php 

		
*/


let eVe = {};
eVe.regions = {};
// Tracks ajax operations. Value comes from Ajax response.
eVe.ajaxUnsafe = false;
eVe.runAfter = {};
eVe.form = {};
eVe.tokens = {};
eVe.internalLinks = {};
eVe.requireds = {};
eVe.patterns = {};
eVe.caches = {};
eVe.mode = '-';
eVe.labels = {};
eVe.selectedLanguage = 'english';
		// R***
	eVe.selectedLanguage = 'turkish';


		
/**
	el can be document or a region or a block
	Use eVe.init when you need to add something after (window.onload and rendering the page)
	Document.ready level tasks must be in eVe.init(document).
*/
eVe.init = function(el){
	
		// This function was created in htmlHead.php
	eVe.jsCodeAfterLoad(); 
	
	// Controlling links 
	eVe.controlLinks(el);

		// Controlling submit 
	eVe.preventformubmit();
	
	window.addEventListener('resize', eVe.resize);

	if(eVe.mode === 'tests') {
		eVe.installTestModule();
	}
	
	return true;
}



//--------- start control links ------------------------------------------------

/*
*	control links in el
	if any links clicked should go through validation first.
	
*/
eVe.controlLinks = function(el) {

	let els = el.getElementsByTagName('a');
	for(let i = 0; i < els.length; i++) {
		let el = els[i];
		els[i].onclick = function(event) {
			event.preventDefault();
			eVe.analyzeLink(this)
		}
	}
	
	return true;
	
}

/*
*	control links in el
*/
eVe.analyzeLink = function(alink) {

	let isinternal = eVe.isInternalLink(alink);
	if(isinternal === 'page_first') {
		let el1 = document.getElementsByTagName('body')[0];
		el1.innerHTML = eVe.renderedBody;
		eVe.jsCodeAfterLoad();
		eVe.init(document);
		if(eVe.mode === 'tests' || eVe.mode === 'addAtest') {				
			eVe.addTestButtons();
		}
		else if(eVe.mode === 'runTests') {
			eVe.addAtestResult('page_first', '', 'page_first');	
			eVe.addTestButtons();			
		}
		
		return true;
	}
	if(isinternal === 'external') {
		eVe.runExternalLink(alink);
	}
	else if(isinternal === 'hash') {
		let pos1 = alink.href.indexOf('#');
		alert('hash: ' + alink.href.substring(pos1));
		location.hash = alink.href.substring(pos1);	
		
	}
	else if(isinternal) {
		eVe.runInternalLink(isinternal);
	}
	else {
		alert('Invalid link.');
		return false;
	}
	
}


/*
*	Extracts domain1 name from el and domain2 name from current page's url (location)
	Returns 
	1- 'external': If domain1 is not equal to domain2
	2- 'hash': If the link is pointing to a part on the same page
	3- any string: If the link is internal. Returned string is the request name. 
	4- else returns false.
	
*/
eVe.isInternalLink = function(el) {



}


/*
*	Runs a link through Ajax 
	Format of an internal link(request): 
		contactus/b_5_1/arg1/arg2/arg3
		{requestName}/{replaceId}/arg1/arg2/arg3/  etc.

	target url = 'security.php';  
	
	Terminology: 'request', 'requests' do not include page. All requests go through Ajax.
	page do not go through Ajax.
	
*/
eVe.runInternalLink = function(clink){

	
	return true;
	
}



/*
*	@toDo : Add confirm or cancel options
	@toDo : Open in new window
*/
eVe.runExternalLink = function(el){
	msg = 'You are leaving our website';
	alert(msg);
	
	if(eVe.mode === 'runTests') {
		eVe.addAtestResult(el.text, '', msg);			
	}
		
	return true;
	
}

//--------- end control links ------------------------------------------------


//--------- start control form ------------------------------------------------

/*
*	control form in el
	if any form submitted it should go through validation first.
*/
eVe.preventformubmit = function() {
	let form = document.getElementsByTagName('form');
	if(form.length > 0) {
		for(let i = 0; i < form.length; i++) {
			form[i].onsubmit = function(event) {
				event.preventDefault();
				eVe.submitForm1(this);
				// return false;
			}
		}
	}
}

/*
*	Submitting form:
	eVe.submitForm1() -> eVe.validateForm()
	eVe.submitForm2() -> eVe.ajaxCall()
*/
eVe.submitForm1 = function(cform) {

			
	return true;
}

/*

*/
eVe.getFormInputs = function(cform) {
	
	
	return datam;
}

	
/*
*	Form validation through Javascript
*	form must be in a wrapper div with an ID
*   This function needs: eVe.requireds[formid], eVe.patterns[formid]
*	- returns $checked if all fields are validated
*	- If validation fails: Issues will be displayed next to form fields. This function returns false.
*/
eVe.validateForm = function(cform, requireds, patterns) {


	
}



/**
*	@explanation :	checks size and characters of datam (inputs) against patterns

	datam structure: datam[el.name] = [value, value2, etc.]
	patterns structure: patterns[el.name] = pattern 
	requireds structure: [el1.name, el2.name, el3.name etc ]
	
	Returns validated fields and unmatched fields as arrays
	This function does not complain for data(input) that is not included in pattaerns.
	
*	@toDo : Warning: Sensitive data like password must be protected from display
*/
eVe.checkPregMatch = function(patterns, datam, requireds) {

	if(requireds.length < 1 || !eVe.getProperties(datam) || !eVe.getProperties(patterns) ) {
		alert('Error 484: Missing parameters.');
		return false;
	}

	let checked = {};
	checked.unacceptables = [];
	checked.validateds = [];

	let inputs = [];
	let cinput, aMatch, fieldName;
	let row = [];
	for(fieldName in patterns) {
		if(patterns.hasOwnProperty(fieldName))	{

			if(typeof(datam[fieldName]) !== 'object' || typeof(datam[fieldName].length) === 'undefined'  || datam[fieldName].length < 1) {
				if(requireds.indexOf(fieldName) > -1) {
					row = [fieldName, 'Don\'t leave blank.'];
					checked.unacceptables.push(row);
				}
				continue;
			}
			
			inputs = datam[fieldName];
				// It is ok if pattern is set but empty
			if(typeof(patterns[fieldName]) === 'undefined') {
				row = [fieldName, inputs];
				checked.validateds.push(row);				
				continue;
			}
			
			pattern = patterns[fieldName];
			let newpattern = new RegExp(pattern);			
			for(let j = 0; j < inputs.length; j++) {
				cinput = inputs[j];
// console.log('538: ' + fieldName + ' : ' + cinput);
				if(typeof(cinput) === 'string'){			
					aMatch = cinput.match(newpattern);
					if(aMatch) {
						row = [fieldName, cinput];
						checked.validateds.push(row);											
					}
					else {	
							// checked.unacceptables[fieldName] = cinput + ' : Does not comply: ';
						row = [fieldName, 'Does not comply'];
						checked.unacceptables.push(row);							
					}				
				}
				else {
console.log('552: ' + fieldName + ' : ' + cinput);
					row = [fieldName, 'Missing field'];
					checked.unacceptables.push(row);				
					
				}
			}
		}
	}
	
	return checked;
	
}


/*
*	gets validateds form inputs and token
	metaData['requestName'] = cform.id + '_submit';
	
*/
eVe.submitForm2 = function(cform, validateds){


	return true;

	
}


eVe.showInputIssues = function(formid, unacceptables) {

}
 



	
//--------- end control form ------------------------------------------------


//--------------------  begin: Ajax operations ------------------------------



/**
* 
* generic ajax call with customized callback function
	eVe.ajaxUnsafe = response['eVe.ajaxUnsafe']
	https://xhr.spec.whatwg.org/
	sends json strings, uses POST method
	checks cache before sending
	if eVe.mode = tests : process automated test action
	
	passes response to eVe.processAjaxResponse()
	
	
*/
eVe.ajaxCall = function(metaData, datam) {

	xhr.eVe = eVe.processAjaxResponse(xhr.responseText, metaData, datam);'
			
			
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 
	xhr.send(params2);
	 
     return xhr; 
	
}	



/*
*	
*	response from server - structure: 
	response = { 
		'status' : ''
		, 'html' : {}
		, 'JsFiles' : {}
		, 'tokens' : {}
	}
	css is added to elements as 

*	options for request['positionInTarget']: top, bottom, replace

	Adding Javascript to Ajax response: Check form_contactus1.php 
*/
eVe.processAjaxResponse = function(response, metaData, datam){

	return true;
	
}



/**
*	Checks if we cached the exact same request
*/
eVe.isCached = function(requestName, datamStr, metaDataStr) {
	if(typeof(eVe.caches[requestName]) === 'undefined') {
		return false;
	}
	if(eVe.caches[requestName]['datamStr'] == datamStr && eVe.caches[requestName]['metaDataStr'] == metaDataStr) {
		return eVe.caches[requestName]['response'];
	}
	return false;	
}


//--------------------  end: Ajax operations ------------------------------

//--------------------  begin: Tools ------------------------------


/**
*	Gets array of own properties
*/
eVe.getProperties = function(obj) {
	let props = [];
	for(key in obj) {
		if(obj.hasOwnProperty(key))	{
			props.push(obj[key]);
		}
	}
	
	if(props.length > 0) {
		return props;
	}
	
	return 0;
	
}


/*
*	hide seek on el
*/
eVe.hideNseekThat = function(elid) {
	let el = document.getElementById(elid);

	
	return true;
}


/* 
	Applies to next 1 sibling of el only
*/
eVe.hideNseekNext = function(el) {

	
	return true;
	
}



/**
*   finds index of an element in array
*/
eVe.findIndex = function(el) {

	
	return index1;		
	
}



//--------------------  end: Tools ------------------------------

