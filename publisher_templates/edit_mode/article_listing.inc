<div id="edit_container">
	<!-- EDIT SECTION 01 -->
	<div class="edit_section">
		<div class="section_heading">
			<label for="section_01" class="h1">Page title </label>
			<label for="section_01" class="section_toggle">show/hide</label>
		</div>
		<input type="checkbox" class="section_checkbox" name="section_01" id="section_01" checked>
		<div class="section_content">

			<div class="el_wrap">
				<label>Page title (H1)</label>
				<%= render :textual => 'page_title', :default => '', :maxlength => '175' %>
			</div>

		</div>
	</div> <!-- .edit_section 01 -->

	<div class="hidden">
		<!--
			Saving Page ID in a hidden content field to use it within preview mode,
			as page_data.page.id or @page.id won't work there
		-->
		<%= page_data.page.id %>
		<%= render :textual => 'page_id', :default => page_data.page.id, :maxlength => '10' %>
	</div>
</div>