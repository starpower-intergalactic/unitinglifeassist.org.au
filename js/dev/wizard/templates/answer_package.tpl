<div class="answer-text" data-answer-id="<%= id %>">
	<%= answer %>
</div>
<div class="answer-description">
	<p><%= shortText %></p>
	<% if( fullText ){ %>
		<p><a href="#" class="package-read-more">Read more</a></p>
		
	<% } %>
</div>
<button class="btn">
	SELECT
</button>

<div class="package-full-text">
	<div class="answer-text">
		<%= answer %>
	</div>
	<p><%= fullText %></p>
	<div class="full-text-close">
		<div class="icon icon--cross"></div>
	</div>
</div>