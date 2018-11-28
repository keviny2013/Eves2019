
eves2019

A base for web applications  ( Alternative to Wordpress, Drupal, etc. ) 

Step 1: Abstract plan

Step 2: Implementation of step 1

Step 3: Warrior Games registration  ( as in husnu.net/a3 )
		Testing database API, report API, automated testing , etc on Warrior Games.

Main idea:
Backend: 
	SecurityCheck first. Security check includes input validation. 
	Structured for multilanguage menus and labels and short texts. 
	Encryption on PII fields. Double encryption on high risk fields.
	One page only but hundreds of requests.
	Cachable
	Database API
	Report API ( Views) 
	

Front end:
	Theming and templates through Javascript 
	Javascript holds all DOM structure in eVe.regions object;
	Hundreds of requests will be performed through Ajax (or webworkers)
	Automated tests through Javascript.
	Cachable through local storage
	Mobile friendly

Check documents folder. 
	- To do list
	- What to do
	- How to do
	and other documentations


