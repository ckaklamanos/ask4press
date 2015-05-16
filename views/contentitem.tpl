<%if(imageurl){%>
<div class="item-image"><img src="<%= myApp.api.domain+imageurl %>"></div>
<%}%>
<h2><%= subtitle %></h2>
<h1><%= title %></h1>
<div class="item-text"><%= text %></div>

<ul class="nomargin">
<%if(link1){%>
<%if(link1.value){%>
	<li class="double openlink1">
		<a>
			<span class="icon link"></span>
			<span class="li-title"><%if(link1.text){%><%=link1.text%><%}else{%><%= myLang[myApp.lang].open_link%><%}%></span>	
			<span class="li-subtitle"><%= link1.value %></span>		
		</a>
	</li>
<%}%>
<%}%>

<%if(link2){%>
<%if(link2.value){%>
	<li class="double openlink2">
		<a>
			<span class="icon link"></span>
			<span class="li-title"><%if(link2.text){%><%=link2.text%><%}else{%><%= myLang[myApp.lang].open_link%><%}%></span>	
			<span class="li-subtitle"><%= link2.value %></span>		
		</a>
	</li>
<%}%>
<%}%>


<%if(link3){%>
<%if(link3.value){%>
	<li class="double openlink3">
		<a>
			<span class="icon link"></span>
			<span class="li-title"><%if(link3.text){%><%=link3.text%><%}else{%><%= myLang[myApp.lang].open_link%><%}%></span>	
			<span class="li-subtitle"><%= link3.value %></span>		
		</a>
	</li>
<%}%>
<%}%>
</ul>