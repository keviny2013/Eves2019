/**
	This page is dedicated to rendering structured data into HTML
	This method is called in htmlHead.php
	
	eVe.render.allRegions(eVe.regions) 
		- will generate eVe.renderedBody 
		- and replace body[0].innerHTML with eVe.renderedBody 
		
	Any changes should be applied to eVe.regions first. 
	Then only the relevant DOM element must be changed using the right method:  
	eVe.render.aRegion() or eVe.render.aBlock()
	
	
	Incoming data must be a Javascript object structured like below:
	$regions = array($region1, $region2, $region3, etc])
		$aregion = array('regionAttr' => $regionAttr, 'blocks' => $blocks );
	$blocks = array($block1, $block2, $block3, etc)
		$ablock = array('elements' => $elements);
	$elements = array($element1, $element2, $element3, etc)		
		$anelement = array('renderBy', 'name', 'attributes')  // varies
			Each renderBy is a mini template like: input, input_login, input_vertical, etc
			Element structure of renderBys are not the same. 
				If an attribute is mandatory: It should not be in the attributes array		

*	eVe.render.allRegions(regions) method renders regions, blocks, elements 
		and replaces the result with body.innerHTML
		
*	Steps:  
		1- looping through regions: eVe.render.allRegions
		2- looping through blocks: eVe.render.aRegion 
		3- looping through a block: eVe.render.aBlock
		4- render each html tag: eVe.render.{tag}
			examples: eVe.render.form, eVe.render.a, eVe.render.ul
			Exception (asis is not an html tag): eVe.render.asis
			Customized renders: Use custom tag names like eVe.render.form_login, eVe.render.form_registration
			, eVe.render.form_horizontal, eVe.render.form1, eVe.render.form2,  etc.
			
		5- Replace body.innerHTML
	

	 
*/

eVe.jsAfterRender = [];
eVe.renderedBody = '';
eVe.render = {};
// prevents infinite loops in sanitization
eVe.sanitizationDeep = 0;

/**
*	loops through regions in a region
*  	Incoming data must be like: 
		$regions = array($region1, $region2, $region3, etc])
		$aregion = array('regionAttr' => $regionAttr, 'blocks' => $blocks );
*/
eVe.render.allRegions = function(regions){
		

	document.getElementsByTagName('body')[0].innerHTML = eVe.renderedBody;

	 
	return true;
}


/**
*	a region is made of blocks
*	Incoming data must be like: 
		$blocks = array($block1, $block2, $block3, etc)
		$ablock = array('elements' => $elements);
*/
eVe.render.aRegion = function (blocks, regionnumber) {
	
	return rendered;
	
}


/**
*	a block is made of elements
*	Incoming data must be like: 
		var elements = array(element1, element2, element3, etc)
		elements' array structures are not the same. Check templates: eVe.render.{renderBy}
				element = array(renderBy, type, name, options, optionalAttributes, etc.)
				
	If renderBy is not defined "eVe.render.text_center(anElement)" will be used to render the element
*/
eVe.render.aBlock = function (elements) {

	
	return rendered;
	
}			


//---------- start: utility methods ---------------------------------------------------------

/**
*	Checks if a function exists
  http://kevin.vanzonneveld.net
  original by: Brett Zamir (http://brett-zamir.me)
*
*/
eVe.methodExists = function(method) {

  return typeof eVe.render[method] === 'function';
  
}



/*
	Takes attributes object and converts it to an HTML element's attribute string  
*	If an attribute is mandatory: It should not be in optionalAttributes. 
	Reason: Attributes array can be empty. Program does not complain for empty optionalAttributes.
		But, program throws error if any other attribute is missing. 
	Example: All html tags require name attribute. Don't put name attribute inside the optionalAttributes.
*/
eVe.optionalAttributes = function(attributes) {

	
	return str;

}


//----------- end: utility methods ----------------------------------------------------------------


//----------------------------- start: Filters ------------------------------------------


/**
*	Converts < and > to htmlentities
*/
eVe.htmlEntities = function (str) {
	if(typeof(str) !== 'string') {
		return str;
	}
	
	return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;');

}


/**
*	Applies eVe.htmlEntities to el
*/
 eVe.sanitizeAnElement = function(el) {

	

 
 }
 
 
/**
*	Minimized filter for asis content
*/
eVe.filterAsis = function (str) {


}



//----------------------------- end: Filters ------------------------------------------


//----------------------------- start: most common Templates ------------------------------------------


/**
*	To add CSS file
*/	
eVe.render.cssFile = function (el) {
	return '<link rel="stylesheet" type="text/css" href="' + el[1] + '" >';

}

/**
*	To add Javascript file
*/	
eVe.render.jsFile = function (el) {
	return '<script src="' + el[1] + '" ></script>';
}

/**
*  Opens any tag : div, p, etc.
*	structure: array(open, HTML renderBy, name, attributes)
*/	
eVe.render.open = function (el) {

	return '<' + el[1] + ' ' + eVe.optionalAttributes(el[2]) + '>';

}

/**
*  Closes any tag : div, p, etc.
	structure: renderBy, tag
*/	
eVe.render.close = function (el) {
		
	return '</' + el[1] + '>';

}


/**
*	Places text inside the tags
	structure: renderBy, text, attributes 
*/	
eVe.render.text_center = function (el) {
	
	let rendered = '<' + el[0] + eVe.optionalAttributes(el[2]) + ' >' + el[1] + '</' + el[0] + '>';
	rendered += '<span id="' + el[1] + 'Error" class="error"></span>';
	
	return rendered;

}



/**
*	For HTML codes to copy as is
*/	
eVe.render.asis = function (el) {

	var filtered = eVe.filterAsis(el[1]);
	return filtered;

	
}

//----------------------------- end: most common Templates ------------------------------------------
