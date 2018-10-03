<div class="page-content">
   
    <h1 class="page-heading">
        <%= page_data.content.page_title.text.html_safe %>
    </h1>

    <div class="max-width-wrap">
    	<% if page_data.content.hero_section_visible.selected != 'no' %>
    		<div class="hero-image">
    			<%
    				image_url = page_data.content.hero_image.external_url
    				image_url = 'http://placehold.it/1026x559' if image_url == '' || image_url == '#'
    			%>
    		    <img src="<%= image_url %>">
    		    <% if page_data.content.hero_video_toggle.selected != 'no' %>
    		    	<% hero_video = page_data.content.hero_video %>
	    		    <div class="video-item-overlay">
	    		        <div class="play-icon">
	    		            <span class="pi1"></span>
	    		            <span class="pi2"></span>
	    		            <span class="pi3"></span>
	    		        </div>
	    		    </div>
	    		    <div class="video-box-wrap">
	    		        <div class="video-backdrop"></div>
	    		        <div class="video-box">
	    		            <video nocontrols>
	    		                <source src="http://s3.blocksassets.com<%= hero_video.webm_url %>" type="video/webm">
	    		                <source src="http://s3.blocksassets.com<%= hero_video.mp4_url %>" type="video/mp4">
	    		            </video>
	    		            <div class="video-controls">
	    		                <div class="video-control-item video-stop"></div>
	    		                <div class="video-control-item video-play"></div>                               
	    		            </div>
	    		            <div class="video-title"><%= page_data.content.hero_video_title.text.strip %></div>
	    		            <div class="video-close">
	    		                <div class="icon icon--cross icon--orange"></div>
	    		            </div>
	    		        </div>
	    		    </div>
    		    <% end %>
    		</div>
    	<% end %>
        

        <div class="column-layout ">
            <div class="column column-2">

                <div class="editable-text">
                    <%= page_data.content.article_bodycopy.text.html_safe %>
                </div>

            </div>
            <div class="column column-1">

                <% if page_data.content.related_articles.elected %>
                    
                    <div class="two-media-blocks">

                        <% page_data.content.related_articles.repeats.each do |repeat| %>
                            <% 
                                related_link = repeat.article_link
                                
                                next if related_link.link_kind != 'page'

                                page_id = related_link.link_value.to_i
                                
                                _other_page    = site.pages.detect{ |e| e.id == page_id }

                                next if _other_page.blank?
                                next if _other_page.template.name != 'publisher_templates/article.page'

                                _other_page_data = PageData.new(_other_page)
                                
                                page_slug     = "/#{_other_page_data.slug}"
                                box_style     = _other_page_data.content.feature_box_style.selected != 'largetext' ? 'previewimage' : 'largetext'
                                page_title    = _other_page_data.content.page_title.text
                                page_summary  = _other_page_data.content.article_summary.text
                                preview_image = _other_page_data.content.feature_image.external_url
                                preview_image = 'http://placehold.it/341x243' if preview_image == '' || preview_image == '#'
                            %>

                            <a href="<%= page_slug %>" class="media-block media-block-<%= box_style %>">
                                <% if box_style == 'previewimage' %>
                                    <div class="media-img">
                                        <img src="<%= preview_image %>" height="243" width="341">
                                    </div>
                                <% end %>
                                <div class="media-body">
                                    <div class="media-heading">
                                        <%= page_title.html_safe %>
                                        <i class="arrow"></i>
                                    </div>
                                    <div class="media-copy">
                                        <p><%= page_summary.html_safe %></p>
                                    </div>
                                </div>
                            </a>

                        <% end %>

                    </div> <!-- .two-media-blocks -->
                                    
                <% end %>
                
            </div>
        </div>

    </div> <!-- .max-width-wrap -->


</div> <!-- .page-content -->