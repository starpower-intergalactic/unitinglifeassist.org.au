<div id="edit_container">


	<!-- EDIT SECTION 03 -->
	<div class="edit_section">
		<div class="section_heading">
			<label for="section_03" class="h1">Page title</label>
			<label for="section_03" class="section_toggle">show/hide</label>
		</div>
		<input type="checkbox" class="section_checkbox" name="section_03" id="section_03" checked>
		<div class="section_content">

			<div class="el_wrap">
				<label>Page title (H1)</label>
				<%= render :textual => 'page_title', :default => 'I Need Assistance Now', :maxlength => '175' %>
			</div>

		</div>
	</div> <!-- .edit_section 03 -->


</div> <!-- #edit_container -->