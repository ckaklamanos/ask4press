$.mvc.controller.create("zooitem", {
    "views":{"contentitem":"views/contentitem.tpl","locationitem":"views/locationitem.tpl","newsitem":"views/newsitem.tpl"},
    "view":function(app,cat_id,item_id){
		loadZooItemPage(app,cat_id,item_id);
	},
    "init":function(){},
    "default":function(){}
});

function loadZooItemPage(app,cat_id,item_id){

	var zooapp=new ZooApp();
	var catName;
	
	zooapp.get(app,function(el){

		var catsObj=el.categories;
		var catObj=catsObj[cat_id];
		catName=catsObj[cat_id].name;

		var itemsObj=catObj.items;
		
		var itemObj=itemsObj[item_id];
	
		var elementsObj=itemObj.elements;
	
		var view=itemObj.type;
		var subtitle,text,imageurl,address,location,tel,email,fax,website,author, link1,link2,link3;
		
		var author=itemObj.created_by_alias;
					
		myApp.share_text=itemObj.name;

		$.each(elementsObj,function(key,element){
			if(element.typedata){
				if(element.typedata.name=="Subtitle")
					subtitle=element[0].value;
				if(element.typedata.name=="Text")
					text=element[0].value;
				if(element.typedata.name=="Image")
					imageurl=element.file;
				if(element.typedata.name=="Address")
					address=share_text=element[0].value;
				if(element.typedata.name=="GMAPS")
					location=element['location'];
				if(element.typedata.name=="Telephone")
					tel=element[0].value;
				if(element.typedata.name=="Email")
					email=element[0];
				if(element.typedata.name=="FAX")
					fax=element[0].value;
				if(element.typedata.name=="Website")
					website=element[0];	
				if(element.typedata.name=="Link 1")
					link1=element[0];
				if(element.typedata.name=="Link 2")
					link2=element[0];	
				if(element.typedata.name=="Link 3")
					link3=element[0];						
			}
		}); 

		$("#zooitemWrapper").html($.template(view,{
			cssclass:view,
			app:app,
			imageurl:imageurl,
			title:itemObj.name,
			subtitle:subtitle,
			created:moment(itemObj.created).format("dddd, D MMMM YYYY"),
			author:author,
			text:text,
			address:address,
			tel:tel,
			website:website,
			link1:link1,
			link2:link2,
			link3:link3,
			email:email,
			fax:fax
		}));

		$.ui.loadContent("#zooitemPage",false,false,'slide');
		$("#header .hide").hide();

		var comments=(el.categories[0].params['global.comments.enable_comments']=='1')?true:false;
		
		if(comments){
			$('#zoocommentsBtn').show();
			$.ui.updateBadge("#zoocommentsBtn",itemObj.comments_no);
		}
		
		$('#navbar .previousItem').unbind();
		$('#navbar .nextItem').unbind();
		$("#zooitemWrapper .openmap").unbind();
		$("#zooitemWrapper .openwebsite").unbind();
		$("#navbar .share").unbind();
		$("#zoocommentsBtn").unbind();
		
		$("#zooitemWrapper .openlink1,#zooitemWrapper .openlink2,#zooitemWrapper .openlink3").unbind();

		var pItem=previousItem(app,cat_id,itemsObj,item_id);

		if(pItem){
			$("#navbar .previousItem").bind("click",function(evt){
				$.mvc.route("zooitem/view/"+app+"/"+cat_id+"/"+pItem);
			});
		}
		else{
			$("#navbar .previousItem").bind("click",function(evt){
				showTimedMask(myLang[myApp.lang].no_prev_item,2000);
			});
		}		
		
		var nItem=nextItem(app,cat_id,itemsObj,item_id);

		if(nItem){
			$("#navbar .nextItem").bind("click",function(evt){
				$.mvc.route("zooitem/view/"+app+"/"+cat_id+"/"+nItem);
			});
		}
		else{
			$("#navbar .nextItem").bind("click",function(evt){
				showTimedMask(myLang[myApp.lang].no_next_item,2000);
			});
		}
		
		$("#zoocommentsBtn").bind("click",function(evt){
			$.mvc.route("comments/view/"+app+"/"+cat_id+"/"+item_id+"/"+itemObj.name);
		});
		
		updateBackButton("zoocat/view/"+app+"/"+cat_id,catName);
		
		$("#zooitemWrapper .openmap").bind("click",function(evt){openMap(location);});
		
		$("#zooitemWrapper .openwebsite").bind("click",function(evt){openLink(website.value);});
		$("#zooitemWrapper .openlink1").bind("click",function(evt){openLink(link1.value);});
		$("#zooitemWrapper .openlink2").bind("click",function(evt){openLink(link2.value);});
		$("#zooitemWrapper .openlink3").bind("click",function(evt){openLink(link3.value);});
		
		$("#navbar .share").bind("click",function(evt){
			shareItem();
		});
		window.setTimeout( function () { $.ui.scrollToTop('zooitemPage'); }, 300);

	});

} 
