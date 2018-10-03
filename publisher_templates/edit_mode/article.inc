<div id="edit_container">

	<!-- EDIT SECTION 01 -->
	<div class="edit_section">
		<div class="section_heading">
			<label for="section_01" class="h1">Page title</label>
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


	<!-- EDIT SECTION 02 -->
	<div class="edit_section">
		<div class="section_heading">
			<label for="section_02" class="h1">Hero image &amp; video popup section</label>
			<label for="section_02" class="section_toggle">show/hide</label>
		</div>
		<input type="checkbox" class="section_checkbox" name="section_02" id="section_02">
		<div class="section_content">


			<div class="el_wrap">
				<label>Do you want this section to be visible?</label>
				<%= render :set => 'hero_section_visible', :values => [ [ 'No, hide this section', :no ], [ 'Yes, show hero image (and optionally video)', :yes ] ] %>
			</div>

			<div class="el_wrap">
				<label>Hero image</label>
				<%= render :image => 'hero_image', :default => "http://placehold.it/1026x559", :width => 1000..1100, :height => 500..600 %>
			</div>

			<div class="el_wrap">
				<label>Add video lightbox option to this element:</label>
				<%= render :set => 'hero_video_toggle', :values => [ [ 'No, do not show video popup', :no ], [ 'Yes, show video popup', :yes ] ] %>
			</div>

			<div class="el_wrap">
				<label>Video title</label>
				<%= render :textual => 'hero_video_title', :default => '', :maxlength => '75' %>
			</div>

			<div class="el_wrap">
				<label>Choose video source</label>
				<%= render :video => 'hero_video',  :default => "http://placehold.it/1920x1080", :width => 1..1920, :height => 1..1080, :videojs => false %>
			</div> <!-- .el_wrap -->

						

		</div>
	</div> <!-- .edit_section 02 -->



	<!-- EDIT SECTION 03 -->
	<div class="edit_section">
		<div class="section_heading">
			<label for="section_03" class="h1">Article text</label>
			<label for="section_03" class="section_toggle">show/hide</label>
		</div>
		<input type="checkbox" class="section_checkbox" name="section_03" id="section_03" checked>
		<div class="section_content">

			<div class="el_wrap">
				<label>Full article text</label>
				<%= render :textual => 'article_bodycopy', :type => :multi, :default => "" %>
			</div>

			<div class="el_wrap">
				<label></label>
			</div>

		</div>
	</div> <!-- .edit_section 03 -->



	<!-- EDIT SECTION 04 -->
	<div class="edit_section">
		<div class="section_heading">
			<label for="section_04" class="h1">Article summary / feature box info</label>
			<label for="section_04" class="section_toggle">show/hide</label>
		</div>
		<input type="checkbox" class="section_checkbox" name="section_04" id="section_04">
		<div class="section_content">
			
			<p>
				This information will be used whenever this article page is represented as a feature box on any other page. <br>
				A <strong>feature box</strong> consists of the page title + article summary and an optional preview image. If you choose not to use a preview image, the feature box's text will appear larger instead.
			</p>
			
			<div class="el_wrap">
				<label>Article summary (2 short sentences max)</label>
				<%= render :textual => 'article_summary', :default => '', :maxlength => '100' %>
			</div>

			<div class="el_wrap">
				<label>Feature box style</label>
				<%= render :set => 'feature_box_style', :values => [ [ 'Use preview image below', :previewimage ], [ 'No image, larger text instead', :largetext ] ] %>
			</div>

			<div class="el_wrap">
				<label>Feature box preview image</label>
				<%= render :image => 'feature_image', :default => "http://placehold.it/341x243", :width => 341, :height => 243 %>
			</div>

		</div>
	</div> <!-- .edit_section 04 -->



	<!-- EDIT SECTION 05 -->
	<div class="edit_section">
		<div class="section_heading">
			<label for="section_05" class="h1">Related articles</label>
			<label for="section_05" class="section_toggle">show/hide</label>
		</div>
		<input type="checkbox" class="section_checkbox" name="section_05" id="section_05">
		<div class="section_content">
			
			<p>Choose up to 2 related articles that will appear as feature boxes.</p>

			<%= render :region => 'related_articles', :max_repeats => 2, :elective => true, :elected => false do %>
				<div class="el_wrap">
					<%= render :link => "article_link", :text_editable => true, :link_value => "#", :text => "Article page link" %>
				</div>
			<% end %>

		</div>
	</div> <!-- .edit_section 05 -->



</div> <!-- #edit_container -->