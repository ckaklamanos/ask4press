<%if(imageurl){%>
	<div class="item-image"><img src="<%= myApp.api.domain+imageurl %>"></div>
<%}%>
<h2><%= subtitle %></h2>
<h1><%= title %></h1>
<div class="cat-text"><%= description %></div>
<ul id="cats-list" class="<%=catlistCSS%>">
    <% for(var i=0;i<subcats.length;i++){%>
    <li>
		<a onclick='$.mvc.route("zoocat/view/<%=app%>/<%=subcats[i].id%>")' class="icon arrow-right-after"><%=subcats[i].name%></a>
    </li>
    <%}%>
</ul>

<ul id="items-list" class="<%=itemlistCSS%>">
    <% for(var key in items){%>
    <li>
		<a onclick='$.mvc.route("zooitem/view/<%=app%>/<%=cat_id%>/<%=items[key].id%>")' class="icon arrow-right-after">
			<%=items[key].name%>
			<% if (showItemsDate){%>
				<br><span class="date"><%= moment(items[key].created).format("dddd, D MMMM YYYY")%></span>
			<%}%>
		</a>
    </li>
    <%}%>
	
	
	<%if(itemsNo_total>itemsNo){%>
	<li class="double download_more">
		<a onclick='initLoadMoreCategoryItems("<%=app%>",<%=cat_id%>,<%=offset%>)' >
			
			<%=myLang[myApp.lang].download_more%>

		</a>
	</li>		

	<%}%>
</ul>
