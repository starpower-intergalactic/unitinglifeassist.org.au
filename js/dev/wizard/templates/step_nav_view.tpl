<%
	var showIcon  = false;
	var iconColor = '';
	var iconType  = '';
%>

<!-- (1) -->

<div class="step step--1 step--<%= step_1_status %> <%= (currentStep === 1) ? 'step--showing' : '' %>" data-step-index="1">
	<!--<div>(<%= selectedAnswers[1] || '--' %>)</div>-->
	<div class="step-icon"></div>
	
	<%
		showIcon  = false;
		iconColor = '';
		iconType  = '';

		if( currentStep === 1 && step_1_status === 'done' ){
			showIcon  = true;
			iconColor = 'check';
			iconType  = 'orange';
		}
		else if( step_1_status === 'done' ){
			showIcon  = true;
			iconColor = 'check';
			iconType  = 'light-blue';
		}
		else if( step_1_status === 'inactive' ){
			showIcon  = true;
			iconColor = 'light-gray';
			iconType  = 'cross';
		}
	%>
	
	<% if( showIcon ){ %>
		<div class="icon icon--<%= iconColor %> icon--<%= iconType %>"></div>
	<% } %>

	<div class="step-caption">
		<% if( step_1_status === 'active' ){ %>
			<em>1.</em> For whom?
		<% } else if( step_1_status === 'done' ) { %>
			<%= step_1_breadcrumb %>
		<% } %>
	</div>
</div>


<!-- (2) -->

<div class="step step--2 step--<%= step_2_status %> <%= (currentStep === 2) ? 'step--showing' : '' %>" data-step-index="2">
	<!-- <div>(<%= selectedAnswers[2] || '--' %>)</div> -->
	<div class="step-icon"></div>

	<%
		showIcon  = false;
		iconColor = '';
		iconType  = '';

		if( currentStep === 2 && step_2_status === 'done' ){
			showIcon  = true;
			iconColor = 'check';
			iconType  = 'orange';
		}
		else if( step_2_status === 'done' ){
			showIcon  = true;
			iconColor = 'check';
			iconType  = 'light-blue';
		}
		else if( step_2_status === 'inactive' ){
			showIcon  = true;
			iconColor = 'light-gray';
			iconType  = 'cross';
		}
	%>
	
	<% if( showIcon ){ %>
		<div class="icon icon--<%= iconColor %> icon--<%= iconType %>"></div>
	<% } %>

	<div class="step-caption">
		<% if( step_2_status === 'active' ){ %>
			<em>2.</em> Because?
		<% } else if( step_2_status === 'done' ) { %>
			<%= step_2_breadcrumb %>
		<% } %>
	</div>
</div>


<!-- (3) -->

<div class="step step--3 step--<%= step_3_status %> <%= (currentStep === 3) ? 'step--showing' : '' %>" data-step-index="3">
	<!-- <div>(<%= selectedAnswers[3] || '--' %>)</div> -->
	<div class="step-icon"></div>
	
	<%
		showIcon  = false;
		iconColor = '';
		iconType  = '';

		if( currentStep === 3 && step_3_status === 'done' ){
			showIcon  = true;
			iconColor = 'check';
			iconType  = 'orange';
		}
		else if( step_3_status === 'done' ){
			showIcon  = true;
			iconColor = 'check';
			iconType  = 'light-blue';
		}
		else if( step_3_status === 'inactive' ){
			showIcon  = true;
			iconColor = 'light-gray';
			iconType  = 'cross';
		}
	%>
	
	<% if( showIcon ){ %>
		<div class="icon icon--<%= iconColor %> icon--<%= iconType %>"></div>
	<% } %>

	<div class="step-caption">
		<% if( step_3_status === 'active' ){ %>
			<em>3.</em> What?
		<% } else if( step_3_status === 'done' || step_3_status === 'inactive' ) { %>
			<%= step_3_breadcrumb %>
		<% } %>
	</div>
</div>


<!-- (4) -->

<div class="step step--4 step--<%= step_4_status %> <%= (currentStep === 4) ? 'step--showing' : '' %>" data-step-index="4">
	<!-- <div>(<%= selectedAnswers[4] || '--' %>)</div> -->
	<div class="step-icon"></div>
	
	<%
		showIcon  = false;
		iconColor = '';
		iconType  = '';

		if( currentStep === 4 && step_4_status === 'done' ){
			showIcon  = true;
			iconColor = 'check';
			iconType  = 'orange';
		}
		else if( step_4_status === 'done' ){
			showIcon  = true;
			iconColor = 'check';
			iconType  = 'light-blue';
		}
		else if( step_4_status === 'inactive' ){
			showIcon  = true;
			iconColor = 'light-gray';
			iconType  = 'cross';
		}
	%>
	
	<% if( showIcon ){ %>
		<div class="icon icon--<%= iconColor %> icon--<%= iconType %>"></div>
	<% } %>

	<div class="step-caption">
		<% if( step_4_status === 'active' ){ %>
			<em>4.</em> Why?
		<% } else if( step_4_status === 'done' || step_4_status === 'inactive' ) { %>
			<%= step_4_breadcrumb %>
		<% } %>
	</div>
</div>


<!-- (5) -->

<div class="step step--5 step--<%= step_5_status %> <%= (currentStep === 5) ? 'step--showing' : '' %>" data-step-index="5">
	<!-- <div>(<%= selectedPackages.join(',') || '--' %>)</div> -->
	<div class="step-icon"></div>
	
	<%
		showIcon  = false;
		iconColor = '';
		iconType  = '';

		if( currentStep === 5 && step_5_status === 'done' ){
			showIcon  = true;
			iconColor = 'check';
			iconType  = 'orange';
		}
		else if( step_5_status === 'done' ){
			showIcon  = true;
			iconColor = 'check';
			iconType  = 'light-blue';
		}
		else if( step_5_status === 'inactive' ){
			showIcon  = true;
			iconColor = 'light-gray';
			iconType  = 'cross';
		}
	%>
	
	<% if( showIcon ){ %>
		<div class="icon icon--<%= iconColor %> icon--<%= iconType %>"></div>
	<% } %>

	<div class="step-caption">
		<% if( step_5_status === 'active' ){ %>
			<em>5.</em> Your options
		<% } else if( step_5_status === 'done' ) { %>
			<%= step_5_breadcrumb %>
		<% } %>
	</div>
</div>


<!-- (6) -->

<div class="step step--6 step--<%= step_6_status %> <%= (currentStep === 6) ? 'step--showing' : '' %>" data-step-index="6">
	<!-- <div>&nbsp;</div> -->
	<div class="step-icon"></div>
	
	<%
		showIcon  = false;
		iconColor = '';
		iconType  = '';

		if( currentStep === 6 && step_6_status === 'done' ){
			showIcon  = true;
			iconColor = 'check';
			iconType  = 'orange';
		}
		else if( step_6_status === 'done' ){
			showIcon  = true;
			iconColor = 'check';
			iconType  = 'light-blue';
		}
		else if( step_6_status === 'inactive' ){
			showIcon  = true;
			iconColor = 'light-gray';
			iconType  = 'cross';
		}
	%>
	
	<% if( showIcon ){ %>
		<div class="icon icon--<%= iconColor %> icon--<%= iconType %>"></div>
	<% } %>

	<div class="step-caption">
		<% if( step_6_status === 'active' ){ %>
			<em>6.</em> Let's talk
		<% } else if( step_6_status === 'done' ) { %>
			<%= step_6_breadcrumb %>
		<% } %>
	</div>
</div>