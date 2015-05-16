function initCheckForUpdates(){
	
	$.ui.blockUI(0.5);			
	window.setTimeout(function(){
		

	if(!isDesktop()){
	
		if(isOnline())
			checkForUpdates();
		else{
			showTimedMask(myLang[myApp.lang].no_connection,3000);
			$.ui.unblockUI();
		}
	}
	else{
		checkForUpdates();
	}		
			return;
		},
		1000
	);


}

function checkForUpdates(){

	if (myApp.checkforupdates){
		
		var auth = make_base_auth(myApp.api.un,myApp.api.pw);
		$.ui.showMask(myLang[myApp.lang].check_for_updates);

		$.ajax({
	
			url:myApp.apiurl()+'&view=checkforupdates',
			beforeSend : function(req) {req.setRequestHeader('Authorization', auth);},
			success:function(data){
			
				var versionObj=$.parseJSON(data);	
			
				$.each(versionObj.timestamps,function(app,ts){
				
					var zootimestampLocal = new ZooTimestamp();
				
					zootimestampLocal.get(app+'_timestamp',function(el){
						if(el.timestamp!=ts)
							myApp.apps[app].needs_update=true;
					});
				
	
					var zootimestampNew = new ZooTimestamp();
					zootimestampNew.id=app+'_timestamp';
					zootimestampNew.timestamp=ts;
					zootimestampNew.save();
			
				});
			
				var apps_no=0;
				$.each(myApp.apps,function(app,obj){
					if(obj.needs_update){
						apps_no++;	
					}
				});
								
				$.ui.hideMask();
			
				if(apps_no==0){
					showTimedMask(myLang[myApp.lang].uptodate,3000);
					updateNewsBadge('news');
					myApp.updatedataonhomeload=false;
				}
				else
					getAppsData(apps_no);
			
				$.ui.unblockUI();
			
				if(!isDesktop()){
					if(device.platform=="Android"){
						myApp.market_version=versionObj.android;
						myApp.market_url=versionObj.android_url;
					}
					if(device.platform=="iOS"){
						myApp.market_version=versionObj.ios;
						myApp.market_url=versionObj.ios_url;
					}
					if(myApp.version!=myApp.market_version){
						forceAppUpdate();
					}
					else{
						return;
					}
				}
			},
			timeout:"30000",
			error:function(){
				showTimedMask(myLang[myApp.lang].network_error,3000);
				$.ui.unblockUI();
			}
		});	
	}else{
		getAppsData(myApp.appsno());
	}
}

function getAppsData(apps_no){

	$.ui.showMask(myLang[myApp.lang].update_in_progress);
	myApp.AppCounter=apps_no;
	$.each(myApp.apps,function(key,app){
		getAppData(app.alias);
	});
		
}

function getAppData(alias){

	var auth = make_base_auth(myApp.api.un,myApp.api.pw);

	$.ajax({
	
		url:myApp.apiurl()+'&app='+alias+'&view=all&items_order='+myApp.apps[alias].items_order+'&limit='+myApp.apps[alias].limit,
		beforeSend : function(req) {req.setRequestHeader('Authorization', auth);},
		success:function(data){

			var zooappObj=$.parseJSON(data);
		
			var zooapp = new ZooApp();
			zooapp.id=alias;
			zooapp.categories=zooappObj;
			zooapp.save();
			
			myApp.AppCounter--;
			if(myApp.AppCounter==0){
				$.ui.unblockUI();
				$.ui.hideMask();
				myApp.updatedataonhomeload=false;
				updateNewsBadge('news');
			}
			
			myApp.apps[alias].needs_update=false;
			
		},
		timeout:"45000",
		error:function(){
			showTimedMask(myLang[myApp.lang].network_error,3000);
			$.ui.unblockUI();
			
		}
	});

}

function refreshData(){
	
	$.each(myApp.apps,function(key,app){
						
		getAppData(app.alias);
							
	});
}

function updateNewsBadge(app){

	var c;
	var zooapp=new ZooApp();
	
	zooapp.get(app,function(el){

	if(el&&el.categories){
			var catsObj=el.categories;
			var catObj=catsObj[0];
			c=Object.keys(catObj.items).length;
			$.ui.updateBadge("#neaLI",c);
		}
	});

}