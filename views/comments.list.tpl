<h2><%=title%> <span class="comments_no">(<%=items.length%> <%=myLang[myApp.lang].comments%>)</span></h2>
<% if(items.length!=0){%>
<ul id="comments-list" class="<%=listCSS%>">
    <% for(var i=0;i<items.length;i++){%>
    <li>
		<div class="comment-author" ><%= items[i].author %></div>
		<div class="comment-created" ><%= moment(items[i].created).format("dddd, D MMMM YYYY") %></div>
		<div class="todo-text" ><%= items[i].content %></div>
    </li>
    <%}%>
</ul>
<%} %>
<% if(items.length==0){%>
<p><%= myLang[myApp.lang].no_comments %></br>
<%= myLang[myApp.lang].be_first_to_comment %></p>
<%} %>

