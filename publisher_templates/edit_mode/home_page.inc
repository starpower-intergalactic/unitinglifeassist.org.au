<div id="edit_container">

	<div class="edit_section">
		<div class="section_heading">
			<label for="section_01" class="h1">Carousel</label>
			<label for="section_01" class="section_toggle">show/hide</label>
		</div>
		<input type="checkbox" class="section_checkbox" name="section_01" id="section_01">
		<div class="section_content">
			
			<%= render :region => 'carousel_items', :max_repeats => 6 do %>

				<div class="el_wrap">
					<label>Item image</label>
					<%= render :image => 'item_image', :default => "http://placehold.it/1366x669", :width => 1366, :height => 669 %>
				</div> <!-- .el_wrap -->

				<div class="spacer"></div>

				<div class="el_row">
					<div class="el_wrap">
						<label>Text overlaying image</label>
						<%= render :textual => 'item_text', :type => :multi, :wysiwyg => false, :default => "Welcome\nto lifeAssist" %>
					</div> <!-- .el_wrap -->

					<div class="el_wrap">
						<label>Choose text alignment</label>
						<%= render :set => 'item_text_alignment', :values => [ [ 'Align left', :left ], [ 'Align right', :right ] ] %>

						<br><label>Choose text color</label>
						<%= render :set => 'item_text_color', :values => [ [ 'Gray', :gray ], [ 'White', :white ] ] %>
					</div> <!-- .el_wrap -->
				</div>

				<div class="el_wrap">
					<label>Link button - choose a page to link to</label>
					<%= render :link => "item_btn_link", :text_editable => true, :link_value => "#", :text => "How can we assist you?" %>
				</div> <!-- .el_wrap -->

				<div class="spacer"></div>

				<div class="el_wrap">
					<label>Add video lightbox option to this element:</label>
					<%= render :set => 'item_video_toggle', :values => [ [ 'No, do not show video popup', :no ], [ 'Yes, show video popup', :yes ] ] %>
				</div> <!-- .el_wrap -->

				<div class="el_wrap">
					<label>Video title</label>
					<%= render :textual => 'item_video_title', :default => '', :maxlength => '75' %>
				</div>

				<div class="el_wrap">
					<label>Choose video source</label>
					<%= render :video => 'item_video',  :default => "http://placehold.it/1920x1080", :width => 1..1920, :height => 1..1080, :videojs => false %>
				</div> <!-- .el_wrap -->

			<% end %>

		</div>
	</div> <!-- .edit_section 01 -->

	<div class="edit_section">
		<div class="section_heading">
			<label for="section_02" class="h1">Text boxes</label>
			<label for="section_02" class="section_toggle">show/hide</label>
		</div>
		<input type="checkbox" class="section_checkbox" name="section_02" id="section_02">
		<div class="section_content">

			<!-- TEXT BOX 1 -->
			
			<h2 class="h2">Box 1</h2>

			<div class="el_wrap">
				<label>Choose a page this box is linked to</label>
				<%= render :link => "textbox_1_link", :text_editable => true, :link_value => "#", :text => "Text box link" %>
			</div>

			<div class="el_row">
				<div class="el_wrap">
					<label>Heading</label>
					<%= render :textual => 'textbox_1_heading', :default => '', :maxlength => '75' %>

					<label>Text</label>
					<%= render :textual => 'textbox_1_text', :type => :multi, :wysiwyg => false, :default => "Lorem ipsum dolor sit amet, consectetur adipisicing elit.\nSed, autem, ullam quod aperiam voluptatum voluptas fugit ea. Officiis, veritatis, perferendis, laudantium, sapiente soluta voluptas eligendi deserunt omnis natus amet incidunt." %>
				</div>
				<div class="el_wrap">
					<label>On hover text</label>
					<%= render :textual => 'textbox_1_hover_text', :type => :multi, :wysiwyg => false, :default => "Professional advice.\nPositive care.\nPersonal touch." %>

					<label>On hover link label</label>
					<%= render :textual => 'textbox_1_readmore', :default => 'Read more', :maxlength => '75' %>
				</div>
			</div>

			<div class="spacer"></div>

			<!-- TEXT BOX 2 -->

			<h2 class="h2">Box 2</h2>

			<div class="el_wrap">
				<label>Choose a page this box is linked to</label>
				<%= render :link => "textbox_2_link", :text_editable => true, :link_value => "#", :text => "Text box link" %>
			</div>

			<div class="el_row">
				<div class="el_wrap">
					<label>Heading</label>
					<%= render :textual => 'textbox_2_heading', :default => '', :maxlength => '75' %>

					<label>Text</label>
					<%= render :textual => 'textbox_2_text', :type => :multi, :wysiwyg => false, :default => "Lorem ipsum dolor sit amet, consectetur adipisicing elit.\nSed, autem, ullam quod aperiam voluptatum voluptas fugit ea. Officiis, veritatis, perferendis, laudantium, sapiente soluta voluptas eligendi deserunt omnis natus amet incidunt." %>
				</div>
				<div class="el_wrap">
					<label>On hover text</label>
					<%= render :textual => 'textbox_2_hover_text', :type => :multi, :wysiwyg => false, :default => "Professional advice.\nPositive care.\nPersonal touch." %>

					<label>On hover link label</label>
					<%= render :textual => 'textbox_2_readmore', :default => 'Read more', :maxlength => '75' %>
				</div>
			</div>

			<div class="spacer"></div>

			<!-- TEXT BOX 3 -->

			<h2 class="h2">Box 3</h2>

			<div class="el_wrap">
				<label>Choose a page this box is linked to</label>
				<%= render :link => "textbox_3_link", :text_editable => true, :link_value => "#", :text => "Text box link" %>
			</div>

			<div class="el_row">
				<div class="el_wrap">
					<label>Heading</label>
					<%= render :textual => 'textbox_3_heading', :default => '', :maxlength => '75' %>

					<label>Text</label>
					<%= render :textual => 'textbox_3_text', :type => :multi, :wysiwyg => false, :default => "Lorem ipsum dolor sit amet, consectetur adipisicing elit.\nSed, autem, ullam quod aperiam voluptatum voluptas fugit ea. Officiis, veritatis, perferendis, laudantium, sapiente soluta voluptas eligendi deserunt omnis natus amet incidunt." %>
				</div>
				<div class="el_wrap">
					<label>On hover text</label>
					<%= render :textual => 'textbox_3_hover_text', :type => :multi, :wysiwyg => false, :default => "Professional advice.\nPositive care.\nPersonal touch." %>

					<label>On hover link label</label>
					<%= render :textual => 'textbox_3_readmore', :default => 'Read more', :maxlength => '75' %>
				</div>
			</div>

		</div>
	</div> <!-- .edit_section 02 -->

	<div class="edit_section">
		<div class="section_heading">
			<label for="section_03" class="h1">Feature boxes</label>
			<label for="section_03" class="section_toggle">show/hide</label>
		</div>
		<input type="checkbox" class="section_checkbox" name="section_03" id="section_03">
		<div class="section_content">

			<p>Please choose what appears in the image/text boxes by linking to an article page. Preview image and text will be automatically pulled from that page.</p>

			<div class="el_wrap">
				<label>Box 1</label>
				<%= render :link => "mediabox_1_link", :text_editable => true, :link_value => "#", :text => "Article page link" %>
			</div>

			<div class="el_wrap">
				<label>Box 2</label>
				<%= render :link => "mediabox_2_link", :text_editable => true, :link_value => "#", :text => "Article page link" %>
			</div>

			<div class="el_wrap">
				<label>Box 3</label>
				<%= render :link => "mediabox_3_link", :text_editable => true, :link_value => "#", :text => "Article page link" %>
			</div>

		</div>
	</div> <!-- .edit_section 03 -->



		
</div>