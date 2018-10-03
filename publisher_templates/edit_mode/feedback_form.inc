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
				<%= render :textual => 'page_title', :default => 'Client Feedback or Complaint', :maxlength => '175' %>
			</div>

		</div>
	</div> <!-- .edit_section 03 -->


	<!-- EDIT SECTION 01 -->
	<div class="edit_section">
		<div class="section_heading">
			<label for="section_01" class="h1">Contact details (left column)</label>
			<label for="section_01" class="section_toggle">show/hide</label>
		</div>
		<input type="checkbox" class="section_checkbox" name="section_01" id="section_01" checked>
		<div class="section_content">


			<div class="el_wrap">
				<label>Hotline Number (plain number, is used as the link value)</label>
				<%= render :textual => 'hotline_number', :default => '1300 277 478', :maxlength => '50' %>
				<label>Hotline Text (can include text like vanity number)</label>
				<%= render :textual => 'hotline_text', :default => '1300 ASSIST (1300 277 478)', :maxlength => '50' %>
			</div>

			<div class="el_wrap">
				<label>Phone</label>
				<%= render :textual => 'phone', :default => '03 9239 2500', :maxlength => '50' %>
			</div>

			<div class="el_wrap">
				<label>Fax</label>
				<%= render :textual => 'fax', :default => '03 9239 2522', :maxlength => '50' %>
			</div>

			<div class="el_wrap">
				<label>Email</label>
				<%= render :textual => 'email', :default => 'info@lifeassist.org.au', :maxlength => '50' %>
			</div>
			
			<div class="el_wrap">
				<label>Text</label>
				<%= render :textual => 'left_column_text', :type => :multi, :default => "<p><strong>Do you need urgent assistance?</strong></p> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic, nobis, expedita, laboriosam, fugiat commodi deserunt harum sint quia ut minima temporibus incidunt architecto cum libero officia nesciunt enim autem non!</p> <p> <strong>Head Office:</strong><br> 33 Grey Street, Melbourne VIC 3000 </p> <p> <strong>Postal Address:</strong><br> PO Box 2459, Melbourne VIC 3000 </p>" %>
			</div>


		</div>
	</div> <!-- .edit_section 01 -->


	<!-- EDIT SECTION 04 -->
	<div class="edit_section">
		<div class="section_heading">
			<label for="section_04" class="h1">Thank you message</label>
			<label for="section_04" class="section_toggle">show/hide</label>
		</div>
		<input type="checkbox" class="section_checkbox" name="section_04" id="section_04" checked>
		<div class="section_content">
			
			<div class="el_wrap">
				<label>Text</label>
				<%= render :textual => 'thank_you_message', :wysiwyg => false, :type => :multi, :default => "Thank you for contacting lifeAssist.\n\nEnquiries will be responded to within 2 business days or earlier.\n\nClient feedback and complaints will be handled within the guidelines and timeframes specified in the lifeAssist Client Information Packs." %>
			</div>

		</div>
	</div> <!-- .edit_section 04 -->
	


	<!-- EDIT SECTION 02 -->
	<div class="edit_section">
		<div class="section_heading">
			<label for="section_02" class="h1">Terms &amp; Conditions</label>
			<label for="section_02" class="section_toggle">show/hide</label>
		</div>
		<input type="checkbox" class="section_checkbox" name="section_02" id="section_02" checked>
		<div class="section_content">
			
			<div class="el_wrap">
				<label>Text</label>
				<%= render :textual => 'terms_and_conditions', :type => :multi, :default => "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, excepturi, enim perspiciatis reiciendis eaque recusandae et dolores iusto inventore soluta. Explicabo, distinctio mollitia officiis dolor perferendis ut numquam aperiam eveniet.</p>" %>
			</div>

		</div>
	</div> <!-- .edit_section 02 -->



</div> <!-- #edit_container -->