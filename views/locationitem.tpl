<div class="<%= cssclass %>">
<%if(imageurl){%>
<div class="item-image"><img src="<%= myApp.api.domain+imageurl %>"></div>
<%}%>
<%if(imageurl){%>
<h2><%= subtitle %></h2>
<%}%>
<h1><%= title %></h1>
<%if(address){%>
	<p class="icon map"><%= address %></p>
<%}%>

<%if(tel){%>
	<p class="icon phone"><%= tel %></p>
<%}%>
<%if(fax){%>
<p class="icon file"><%= fax %></p>
<%}%>
<ul class="nomargin">
	<%if(tel){%>
	<li class="double telephone">
		<a href="tel:<%= tel %>" target="_blank">
			<span class="icon phone"></span>
			<span class="li-title"><%= myLang[myApp.lang].call_now%></span>	
			<span class="li-subtitle"><%= tel %></span>		
		</a>
	</li>
	<%}%>	
	<%if(address){%>
	<li class="double openmap">
		<a>
			<span class="icon map"></span>
			<span class="li-title"><%= myLang[myApp.lang].get_directions %></span>	
			<span class="li-subtitle"><%= address %></span>		
		</a>
	</li>
	<%}%>
	<%if(email.value){%>
	<li class="double sendmail">
		<a href="mailto:<%= email.value %>?subject=<%=myLang[myApp.lang].email_subject%>&body=<%=myLang[myApp.lang].to%><%= title %>" target="_system">
			<span class="icon mail"></span>
			<span class="li-title"><%= myLang[myApp.lang].send_email %></span>	
			<span class="li-subtitle"><%= email.value %></span>		
		</a>
	</li>
	<%}%>	
	<%if(website.value){%>
	<li class="double openwebsite">
		<a>
			<span class="icon link"></span>
			<span class="li-title"><%if(website.text){%><%=website.text%><%}else{%><%= myLang[myApp.lang].open_website%><%}%></span>	
			<span class="li-subtitle"><%= website.value %></span>		
		</a>
	</li>
	<%}%>

	<li class="double addtocontacts">
		<a onclick=' saveContact("<%=title%>","<%=tel%>")'>
			<span class="icon user-2"></span>
			<span class="li-title"><%= myLang[myApp.lang].save_contact %></span>	
			<span class="li-subtitle"><%= title %></span>		
		</a>
	</li>	
</ul>

<%if(text){%>
	<p><%= text %></p>
<%}%>
</div>