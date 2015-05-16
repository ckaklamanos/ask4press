$.mvc.controller.create("zoocat", {
    "views":{"zoocat":"views/zoocat.tpl"}, //These are the views we will use with the controller
    "view":function(app,cat_id){
		loadZooCatPage(app,cat_id);
	},
    "init":function(){},
    "default":function(){}
});

function loadZooCatPage(app,cat_id){

  	var zooapp=new ZooApp();
	var parentCatID,parentCatName;
	
	var catObj; 
	
	zooapp.get(app,function(el){
		
		if (typeof el.categories === "undefined") {
			showTimedMask(myLang[myApp.lang].please_update,3000);
			return;
		}
		
		console.log(el.categories);

		
		var catsObj=el.categories;
		catObj=catsObj[cat_id];
				
		if(catObj.parent){
			parentCatID=catObj.parent;
			parentCatName=catsObj[parentCatID].name;
		}
		else{
			parentCatName=myApp.alias;
		}
		
		var itemsObj=catObj.items;
		
		var itemsNo=Object.keys(itemsObj).length;
		var itemsNo_total=catObj.items_no;
		
		var subcatsSortedObj=sortZooCategories(cat_id,catsObj);
		var itemsSortedObj=sortZooItems(app,itemsObj);
		
		if(catObj.params["content.image"])
			var imageurl=catObj.params["content.image"];
	
		$("#zoocatWrapper").html($.template('zoocat',{
			app:app,
			cat_id:cat_id,
			imageurl:imageurl,
			showItemsDate:myApp.apps[app].show_item_date,
			title:catObj.name,
			subtitle:catObj.params["content.subtitle"],
			description:catObj.description,
			catlistCSS:app,
			itemlistCSS:app,
			subcats:subcatsSortedObj,
			itemsNo_total:itemsNo_total,
			itemsNo:itemsNo,
			offset:itemsNo,
			items:itemsSortedObj
		}
		));
		
		$.ui.loadContent("#zoocatPage",false,false,'slide');
		
		$("#header .hide").hide();
		$("#customBack").show();
		
		if(parentCatID)
			updateBackButton("zoocat/view/"+app+"/"+parentCatID,parentCatName);
		else{
			$("#customBack").unbind();
 			$("#customBack").bind("click",function(evt){
				loadMainPanel();
			}); 
			$("#customBack").text(parentCatName);
		}
		
		window.setTimeout( function () { $.ui.scrollToTop('zoocatPage'); }, 300);
		
	});
	
}

function initLoadMoreCategoryItems(app,cat_id,offset){
	
	$.ui.blockUI(0.5);			
	window.setTimeout(function(){
		if(!isDesktop()){
	
			if(isOnline())
				loadMoreCategoryItems(app,cat_id,offset);
			else
				showTimedMask(myLang[myApp.lang].no_connection,3000);
		}
		else{
			loadMoreCategoryItems(app,cat_id,offset);
		}		
		return;
		},
		1000
	);
}

function loadMoreCategoryItems(app,cat_id,offset){
	$.ui.blockUI(0.5);
	$.ui.showMask(myLang[myApp.lang].update_in_progress);
	var auth = make_base_auth(myApp.api.un,myApp.api.pw);

	$.ajax({
	
		url:myApp.apiurl()+'&app='+app+'&view=category&items_order='+myApp.apps[app].items_order+'&app='+app+'&cat_id='+cat_id+'&limit='+myApp.apps[app].limit+'&offset='+offset,
		beforeSend : function(req) {req.setRequestHeader('Authorization', auth);},
		success:function(data){

			var itemsObj=$.parseJSON(data);
		
			var zooapp=new ZooApp();
			zooapp.get(app,function(el){
				var catsObj=el.categories;
				catObj=catsObj[cat_id];
		
				var updatedItemsObj={};
				$.each(itemsObj.items,function(key,item){
					updatedItemsObj[key]=item;
				});
			
				$.each(el.categories[cat_id].items,function(key,item){
					updatedItemsObj[key]=item;
				});		
		
				updateAppObjectwithItems(app,cat_id,updatedItemsObj);
				updateNewsBadge('news');
				$.mvc.route("zoocat/view/"+app+"/"+cat_id);
				
				$.ui.unblockUI();
				$.ui.hideMask();
			});
	
		},
		timeout:"45000",
		error:function(){showTimedMask(myLang[myApp.lang].network_error,3000);$.ui.unblockUI();}
	});

}

function updateAppObjectwithItems(app,cat_id,updatedItemsObj){
	
	var zooapp = new ZooApp();
	var updatedCategoriesObj;
	zooapp.get(app,function(el){
		el.categories[cat_id].items=updatedItemsObj;
		updatedCategoriesObj=el.categories;
	});
	
	zooapp.id=app;
	zooapp.categories=updatedCategoriesObj;
	zooapp.save();
}
