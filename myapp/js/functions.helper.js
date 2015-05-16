//Open map function
function openMap(address){
	
	//Desktop
	if(isDesktop()){
		window.open("http://maps.google.com/maps?q="+address);
		return;
	}
	//-------------------------------------------------------
	
	var url,windowOptions='location=yes';
	
	if (device.platform=="Android")
		url=encodeURI("geo:0,0?q="+address);
	if (device.platform=="iOS")
		url=encodeURI("http://maps.apple.com/?q="+address);
	
	var ref = window.open(url, '_system', windowOptions);
	
}
//--------------------------------------------------------------------------------------------------------------------------------------

function openLink(link){
	var ref = window.open(encodeURI(link), '_system');
}
//--------------------------------------------------------------------------------------------------------------------------------------------

//Share helpers
function initTwitterPage(){

	if(isDesktop()) loadTwitterPage();
	else{
		if(isOnline()) loadTwitterPage();
		else showTimedMask(myLang[myApp.lang].no_connection,3000);
	}
}

function initFacebookPage(){

	if(isDesktop()) loadFacebookPage();
	else{
		if(isOnline()) loadFacebookPage();
		else showTimedMask(myLang[myApp.lang].no_connection,3000);
	}
}

function loadTwitterPage(){
		
	var windowOptions;
	
	if(isDesktop())
		windowOptions='location=yes';
	else{
		if (device.platform=='Android')
			windowOptions='location=yes';
		if (device.platform=='iOS')
			windowOptions='location=no';
	}
	
	var ref = window.open(encodeURI('https://mobile.twitter.com/'+myApp.twitter.screen_name), '_blank', windowOptions);
}

function loadFacebookPage(){
		
	var windowOptions;
	
	if(isDesktop())
		windowOptions='location=yes';
	else{
		if (device.platform=='Android')
			windowOptions='location=yes';
		if (device.platform=='iOS')
			windowOptions='location=no';
	}
	var ref = window.open('http://m.facebook.com/'+myApp.facebook.url, '_blank', windowOptions);
}

function shareItem(){

	if(!isDesktop()){
	
 		if(device.platform=='Android'){
			
			var subject=myApp.share_text;
			var body=myLang[myApp.lang].share_text_1+myApp.share_text+myLang[myApp.lang].share_text_2+myApp.landingpage;
			
			window.plugins.socialsharing.share(body, subject, null, null);
		
			//var body=myLang[myApp.lang].share_text_1+myApp.share_text+myLang[myApp.lang].share_text_2+myApp.landingpage;

			// var extras = {};
			// extras[window.plugins.webintent.EXTRA_SUBJECT] = myApp.share_text;
			// extras[window.plugins.webintent.EXTRA_TEXT] = body;
			// window.plugins.webintent.startActivity({ 
				// action: window.plugins.webintent.ACTION_SEND,
				// type: 'text/plain', 
				// extras: extras 
			// }, 
			// function() {}, 
			// function() {alert('Failed to send email via Android Intent');}
			// );
		} 
		if(device.platform=='iOS'/* ||device.platform=='Android' */){
			showShareSheet();
		}
		
	}
	else
		showShareSheet();
		
}


function showShareSheet(){

	var subject=myLang[myApp.lang].share_subject_1+'&quot;'+myApp.share_text+'&quot;';
	var body=myLang[myApp.lang].share_text_1+'&quot;'+myApp.share_text+'&quot;'+myLang[myApp.lang].share_text_2+myApp.landingpage
    
	var html=	'<a onclick="initFacebookShare()" >Facebook</a>'+
				'<a onclick="initTwitterShare()" >Twitter</a>'+
				'<a href="mailto:?subject='+subject+'&body='+body+'" target="_system">Email</a>';
				//'<a href="sms:?body='+body+'" target="_system">SMS</a>';
	
	$("#jQUi").actionsheet(html);
}


function initFacebookShare(){

	var subject=myLang[myApp.lang].share_subject_1+myApp.share_text;
	var body=myLang[myApp.lang].share_text_1+myApp.share_text+myLang[myApp.lang].share_text_2+myApp.landingpage;

	var url="https://www.facebook.com/dialog/feed?";
	url+="app_id="+myApp.facebook.app_id+"&";
	url+="link=http://www.ask.org.cy&";
	url+="picture="+myApp.api.domain+myApp.icon_url+"&";
	url+="name="+subject+"&";
	url+="caption="+body+"&";
	//url+="description=Using%20Dialogs%20to%20interact%20with%20users.&";
	url+="redirect_uri=https://www.facebook.com/";

	var windowOptions;
	
	if(isDesktop())
		windowOptions='location=yes';
	else{
		if (device.platform=='Android')
			windowOptions='location=yes';
		if (device.platform=='iOS')
			windowOptions='location=no';
	}
	var ref = window.open(encodeURI(url), '_blank', windowOptions);
}

function initTwitterShare(){
	
	var body=myLang[myApp.lang].share_text_twitter+myApp.share_text;
	
	var intenturl='https://twitter.com/intent/tweet?';
	var text='text='+encodeURI(body);
	var url='url='+encodeURIComponent(myApp.landingpage);
	var totalurl=intenturl+text+'&'+url;

	var windowOptions;
	
	if(isDesktop())
		windowOptions='location=yes';
	else{
		if (device.platform=='Android')
			windowOptions='location=yes';
		if (device.platform=='iOS')
			windowOptions='location=no';
	}
	var ref = window.open(totalurl, '_blank', windowOptions);
}
//End of Share helpers --------------------------------------------------------------------------------------------------//

// Contacts helper --------------------------------------------------------------------------------------------------------//

function saveContact(title,tel){

	var contact = navigator.contacts.create();
		
	//id: A globally unique identifier. (DOMString)
	contact.displayName = title;//The name of this Contact, suitable for display to end-users. (DOMString)		
		
	contact.nickname = title;//A casual name to address the contact by. (DOMString)
		
	//name: An object containing all components of a persons name. (ContactName)
	var name = new ContactName();
	//name.formatted=''; //The complete name of the contact. (DOMString) Not supported by iOS and Android
	//name.familyName='Χάρης'; //(DOMString)
	name.givenName=title; //(DOMString)
	//name.middleName='Γ.'; //(DOMString)
	//name.honorificPrefix=''; //example Mr. or Dr.(DOMString)
	//name.honorificSuffix=''; //example Esq. (DOMString)		
		
	//phoneNumbers: An array of all the contact's phone numbers. (ContactField[])
	var phoneNumbers = [];
	phoneNumbers[0] = new ContactField('work', tel, false); // true for preferred number. Not supported by iOS and Andoird, always eturn false
/* 	phoneNumbers[1] = new ContactField('fax', fax, false); // true for preferred number. Not supported by iOS and Andoird, always eturn false
	phoneNumbers[2] = new ContactField('mobile', mobile, false); // true for preferred number. Not supported by iOS and Andoird, always eturn false */
 		
	//emails: An array of all the contact's email addresses. (ContactField[])
	//var emails = [];
	//emails[0] = new ContactField('work', email, true); // true for preferred number. Not supported by iOS and Andoird, always eturn false		//addresses: An array of all the contact's addresses. (ContactAddress[])
	
	//addresses: An array of all the contact's addresses. (ContactAddress[])
	//var addresses = [];
	//addresses[0] = new ContactAddress(true,'work',address,'','','','',''); // true for preferred number. Not supported by iOS and Andoird, always eturn false		//addresses: An array of all the contact's addresses. (ContactAddress[])
	//ims: An array of all the contact's IM addresses. (ContactField[])
		
		//organizations: An array of all the contact's organizations. (ContactOrganization[])
		
		//birthday: The birthday of the contact. (Date)
		
		//note: A note about the contact. (DOMString)
		
		//photos: An array of the contact's photos. (ContactField[])
		
		//categories: An array of all the contacts user defined categories. (ContactField[])
		
	//urls: An array of web pages associated to the contact. (ContactField[])
	//var urls = [];
	//urls[0] = new ContactField('work', website, true); // true for preferred number. Not supported by iOS and Andoird, always return false		
	// Populate contact object
		
	contact.name=name;
	contact.phoneNumbers = phoneNumbers;
	//contact.emails = emails;
	//contact.addresses = addresses;
	//contact.urls = urls;
	
	// save to device
	contact.save(saveContactSuccess,saveContactError);
}

function saveContactSuccess(contact) {

	showTimedMask(myLang[myApp.lang].contact_saved,3000);
};

function saveContactError(contactError) {

	showTimedMask(myLang[myApp.lang].error,3000);

}; 

//End of Contacts helpers ------------------------------------------------------------------------------------------------------------------------

//HTTP authorization helpers
var Base64 = {
 
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = Base64._utf8_encode(input);
 
		while (i < input.length) {
 
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
 
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
 
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
 
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
		}
 
		return output;
	},
 
	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
		while (i < input.length) {
 
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));
 
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
 
			output = output + String.fromCharCode(chr1);
 
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
 
		}
 
		output = Base64._utf8_decode(output);
 
		return output;
 
	},
 
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	},
 
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
 
		while ( i < utftext.length ) {
 
			c = utftext.charCodeAt(i);
 
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
 
		}
 
		return string;
	}
 
}

function make_base_auth(user, password) {
  var tok = user + ':' + password;
  var hash = Base64.encode(tok);
  return "Basic " + hash;
}

//End of HTTP authorization helper

// Font functions
function increaseFont() {

	var max=20;
	var p = document.getElementsByTagName('p');

	for(i=0;i<p.length;i++) {
		var s=(p[i].style.fontSize)? parseInt(p[i].style.fontSize.replace("px","")):14;
		if(s!=max) 
			s += 1;
		p[i].style.fontSize = s+"px";
	}
	var ss=(document.body.style.fontSize)?parseInt(document.body.style.fontSize.replace("px","")):14;
	if(ss!=max)
		ss += 1;
	document.body.style.fontSize= ss+"px";
}

function decreaseFont() {

	var min=8;
	var p = document.getElementsByTagName('p');
	
	for(i=0;i<p.length;i++) {
		var s=(p[i].style.fontSize)? parseInt(p[i].style.fontSize.replace("px","")):14;
		if(s!=min) 
			s -= 1;
		p[i].style.fontSize = s+"px"
	}
   var ss=(document.body.style.fontSize)?parseInt(document.body.style.fontSize.replace("px","")):14;
   if(ss!=min)
		ss -= 1;

	document.body.style.fontSize= ss+"px";	
}
//-----------------------------------------------------------------------------------------------------
// Item sorting
function sortZooItems(app,itemsObj){
	
	var itemsSortedObj=[];
	$.each(itemsObj,function(key,item){
		itemsSortedObj.push(item);
	}); 

	if(myApp.apps[app].items_order=='priority')
		itemsSortedObj.sort(function(a, b) {return b.priority - a.priority;});		
	if(myApp.apps[app].items_order=='latest'){
		itemsSortedObj.sort(function(a, b) {
			if(a.created<b.created) return 1;
			if(a.created>b.created) return -1;
				return 0;
			});
	}
	else
		itemsSortedObj.sort(function(a, b) {return b.priority - a.priority;});
			
	return itemsSortedObj;
}

//Categories sorting
function sortZooCategories(cat_id,catsObj){
	
	var subcatsSortedObj=[];
	$.each(catsObj,function(key,cat){
		if(cat.parent==cat_id)				
			subcatsSortedObj.push(cat);
	}); 
	subcatsSortedObj.sort(function(a, b) {return a.ordering - b.ordering;});
	
	return subcatsSortedObj;
}
//Previous/Next item
function nextItem(app,cat_id,itemsObj,item_id){

	var next_flag=false,next_item;
	var sorteditems=[];
	sorteditems=sortZooItems(app,itemsObj);

	$.each(sorteditems,function(key,item){
		if(next_flag){
			next_item=item.id;
			next_flag=false;
		}
		if(item.id==item_id)
			next_flag=true;	
	});
	return next_item;
}
function previousItem(app,cat_id,itemsObj,item_id){

	var prev_flag=true,prev_item;
	var sorteditems=[];
	sorteditems=sortZooItems(app,itemsObj);
	
	$.each(sorteditems,function(key,item){
		if(item.id==item_id)
			prev_flag=false;
			
		if(prev_flag)
			prev_item=item.id;
	});

	return prev_item;
	
}
//---------------------------------------------------------------------------------------------

//Back button
function updateBackButton(route,text){
	$("#customBack").unbind();
	$("#customBack").bind("click",function(evt){
		$.mvc.route(route);
	}).text(text);
	
}
//---------------------------------------------------------------------------------------------

//Ask for updates------------------------------------------
function forceAppUpdate(){
		navigator.notification.confirm(
			myLang[myApp.lang].new_update_available,  // message
			onforceAppUpdateConfirm,              // callback to invoke with index of button pressed
			myLang[myApp.lang].new_update_available_title,            // title
			myLang[myApp.lang].upgrade+','+myLang[myApp.lang].later          // buttonLabels
		);
}

function onforceAppUpdateConfirm(button) {
	if(button==1)
			window.open(myApp.market_url, '_system');

}

function isDesktop(){

	if(!((window.DocumentTouch&&document instanceof DocumentTouch)||'ontouchstart' in window))
		return true;
	else
		return false;
}



