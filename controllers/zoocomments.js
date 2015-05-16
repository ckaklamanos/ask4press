$.mvc.controller.create("comments", {
  	"views":{"comments_list":"views/comments.list.tpl","post_comment":"views/comment.post.tpl"}, //These are the views we will use with the controller
    "view":function(app,cat_id,item_id,item_name){
		initCommentsPage(app,cat_id,item_id,item_name);
	},
    "post":function(app,cat_id,item_id,item_name){
		initPostCommentPage(app,cat_id,item_id,item_name);
	},
    "init":function(){},
    "default":function(){}
});

function initPostCommentPage(app,cat_id,item_id,item_name){

	if(isDesktop()) loadPostCommentPage(app,cat_id,item_id,item_name);
	else{
		if(isOnline()) 
			loadPostCommentPage(app,cat_id,item_id,item_name);
		else 
			showTimedMask(myLang[myApp.lang].no_connection,3000);
	}
}

function loadPostCommentPage(app,cat_id,item_id,item_name){

	$("#postcommentWrapper").html($.template('post_comment'));
	$.ui.loadContent("#postcomment",false,false,'slide');
	$("#header .hide").hide();
		
	$("#postCommentBtn").unbind();
	$("#postCommentBtn").bind("click",function(evt){
		initPostComment(item_id);
	});
}

function initPostComment(item_id){

	if(isDesktop()) postComment(item_id);
	else{
		if(isOnline()) 
			postComment(item_id);
		else 
			showTimedMask(myLang[myApp.lang].no_connection,3000);
	}
}

function postComment(item_id){
	
	var auth = make_base_auth(myApp.api.un,myApp.api.pw);
		
	var comment_name=$("input#comment_name").val();
	var comment_email=$("input#comment_email").val();
	var comment_comment=$("textarea#comment_comment").val();
	
	if(comment_name==''){
		showTimedMask(myLang[myApp.lang].comment_name_required,2000);
		return;
	}
	if(comment_email==''){
		showTimedMask(myLang[myApp.lang].comment_email_required,2000);
		return;
	}	
	if(comment_comment==''){
		showTimedMask(myLang[myApp.lang].comment_comment_required,2000);
		return;
	}		
	
	$.ui.showMask(myLang[myApp.lang].posting_comment);
	
	var posturl='&add=comment';
	posturl+='&item_id='+item_id;
	posturl+='&content='+comment_comment;
	posturl+='&email='+comment_email;
	posturl+='&author='+comment_name;
	posturl+='&created='+moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
	
	$.ajax({
	
		url:myApp.apiurl()+posturl,
		beforeSend : function(req) {req.setRequestHeader('Authorization', auth);},
		success:function(data){
			showTimedMask(myLang[myApp.lang].comment_posted,3000);
			var myEvt = document.createEvent('MouseEvents');
			myEvt.initEvent(
				'click'      // event type
				,true      // can bubble?
				,true      // cancelable?
			);
			document.getElementById('customBack').dispatchEvent(myEvt);
			
		},
		timeout:"15000",
		error:function(){showTimedMask(myLang[myApp.lang].network_error,3000);$.ui.unblockUI();}
	}); 	 
	$.ui.hideMask();
}

function initCommentsPage(app,cat_id,item_id,item_name){

	if(isDesktop()) loadCommentsPage(app,cat_id,item_id,item_name);
	else{
		if(isOnline()) 
			loadCommentsPage(app,cat_id,item_id,item_name);
		else 
			showTimedMask(myLang[myApp.lang].no_connection,3000);
	}
}


function loadCommentsPage(app,cat_id,item_id,item_name){
	
	$.ui.showMask(myLang[myApp.lang].loading_comments);
	var auth = make_base_auth(myApp.api.un,myApp.api.pw);
		
	$.ajax({
	
		url:myApp.apiurl()+'&view=comments&item_id='+item_id,
		beforeSend : function(req) {req.setRequestHeader('Authorization', auth);},
		success:function(data){
			
			var commentsObj=$.parseJSON(data);
			var c=0;
			 $.each(commentsObj,function(k,v){
				c++;
				var comment = new Comment();
				comment.id=v.id;
				comment.author=v.author;
				comment.content=v.content;
				comment.created=v.created;
				comment.item_id=v.item_id;
				comment.parent_id=v.parent_id;
				comment.url=v.url;
				comment.user_type=v.user_type;
				comment.save();
			}); 
		
			var comment = new Comment();
		
			comment.getAll(function(all){
				var itemcomments=all.filter(function(obj){return obj.item_id==item_id;});

				$("#commentsWrapper").html($.template('comments_list',{
					title:item_name,
					listCSS:'commentsUL',
					items:itemcomments
				}));
				
			$.ui.loadContent("#comments",false,false,'slide');
			$("#header .hide").hide();
			$("#zoocommentAddBtn").show();
	
			
			updateBackButton("zooitem/view/"+app+"/"+cat_id+"/"+item_id,item_name);
			
			$("#zoocommentAddBtn").unbind();
			$("#zoocommentAddBtn").bind("click",function(evt){
				$.mvc.route("comments/post/"+app+"/"+cat_id+"/"+item_id+"/"+item_name);		
			});
	
		});
			
		$.ui.hideMask();
						
		},
		timeout:"30000",
		error:function(){
			showTimedMask(myLang[myApp.lang].network_error,3000);
			$.ui.hideMask();
		}
	});	
	
} 