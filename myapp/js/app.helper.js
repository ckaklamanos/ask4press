 $.ui.resetScrollers = true;
 var myMVCapp = new $.mvc.app();

myMVCapp.loadModels("comment");
myMVCapp.loadControllers(["zoocomments"]); 
	
myMVCapp.loadModels("zooitem");
myMVCapp.loadControllers(["zooitem"]); 	
	
myMVCapp.loadModels("zoocat");
myMVCapp.loadControllers(["zoocat"]); 	
	
myMVCapp.loadModels("zooapp");
	
myMVCapp.loadModels("version");
myMVCapp.loadModels("zootimestamp");

myMVCapp.ready(function(){


});

var myApp = {

	alias:'ASK4press',
	lang:'el',
	checkforupdates:true,
	updatedataonhomeload:true,
	landingpage:'',
	landingpage_encoded:'',
	icon_url:'',
	share_text:'',
	
	version:'1.0',
	market_url:'',
	market_version:'',

	pushwoosh:{
		appid:'',
	},
	name:'',
	google_project_number:'',

	api:{
		domain:'',
		component:'',
		un:'',
		pw:'',
		version:''
	},
	apiurl:function(){
		return this.api.domain+this.api.component
	},
	appsno:function(){
		return Object.keys(this.apps).length
	},
	apps:{

		stigma:{
			name:'Το στίγμα',
			alias:'stigma',
			limit:30,
			show_item_date:false,
			items_order:'priority',
			needs_update:false,
			show_auhtor:false
		
		},
		alitheies:{
			name:'20 Αλήθειες',
			alias:'alitheies',
			limit:30,
			show_item_date:false,
			items_order:'priority',
			needs_update:false,
			show_auhtor:false
		},
		therapeia:{
			name:'Θεραπεία',
			alias:'therapeia',
			limit:30,
			show_item_date:false,
			items_order:'priority',
			needs_update:false,
			show_auhtor:false
		},
		odigos:{
			name:'Οδηγός',
			alias:'odigos',
			limit:30,
			show_item_date:false,
			items_order:'priority',
			needs_update:false,
			show_auhtor:false
		},
		locations:{
			name:'Τοποθεσίες',
			alias:'locations',
			limit:30,
			show_item_date:false,
			items_order:'priority',
			needs_update:false,
			show_auhtor:false
		},
		news:{
			name:'ASKnews',
			alias:'news',
			limit:10,
			show_item_date:true,
			items_order:'latest',
			needs_update:false,
			show_auhtor:false
		}		
		
	},

	facebook:{	
		app_id:'',
		url:''
	},
	twitter:{
		screen_name:''
	}
}
