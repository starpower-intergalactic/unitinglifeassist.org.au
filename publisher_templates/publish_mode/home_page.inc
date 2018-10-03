<div class="page-content">

    <div class="hero-gallery">

        <div class="item-wrap">

            <% page_data.content.carousel_items.repeats.each_with_index do |item,i| %>
                <%
                    has_video = item.item_video_toggle.selected == 'yes' && item.item_video.url != '' && item.item_video.url != '#'
                    image_url = item.item_image.external_url
                    image_url = 'http://placehold.it/1366x669' if image_url == '#' || image_url == ''
                %>
                
                <div class="gallery-item">
                    <img <%= "data-" if i > 0 %>src="<%= image_url %>" height="669" width="1366">
                    <% if has_video %>
                        <div class="video-item-overlay">
                            <div class="play-icon">
                                <span class="pi1"></span>
                                <span class="pi2"></span>
                                <span class="pi3"></span>
                            </div>
                        </div>
                    <% end %>
                    <div class="item-text-wrap">
                        <div class="max-width-wrap">
                            <div class="item-text <%= 'item-text-right' if item.item_text_alignment.selected == 'right' %>">
                                <%
                                    text_color = ''
                                    text_color = 'item-text-white' if item.item_text_color.selected == 'white'
                                %>
                                <p class="<%= text_color %>">
                                    <%= item.item_text.text.strip.gsub(/\n/,'<br>').html_safe %>
                                </p>
                                <% if item.item_btn_link.url != '' %>
                                    <a href="<%= item.item_btn_link.url %>" class="btn"><%= item.item_btn_link.text %></a>
                                <% end %>
                            </div>
                        </div>
                    </div>
                    <% if has_video %>
                        <div class="video-box-wrap">
                            <div class="video-backdrop"></div>
                            <div class="video-box">
                                <video nocontrols>
                                    <source src="http://lifeassist0.blocksassets.com<%= item.item_video.webm_url %>" type="video/webm">
                                    <source src="http://lifeassist0.blocksassets.com<%= item.item_video.mp4_url %>" type="video/mp4">
                                </video>
                                <div class="video-controls">
                                    <div class="video-control-item video-stop"></div>
                                    <div class="video-control-item video-play"></div>                               
                                </div>
                                <div class="video-title"><%= item.item_video_title.text.strip %></div>
                                <div class="video-close">
                                    <div class="icon icon--cross icon--orange"></div>
                                </div>
                            </div>
                        </div>
                    <% end %>
                </div>

            <% end %>
                
        </div>
        
        <div class="gallery-nav">
            <div class="max-width-wrap">
                <!-- <div class="nav-dot"></div> -->
            </div>
        </div>
    </div> <!-- .hero-gallery -->
    
  
    
    

    <div class="max-width-wrap">
    
        <div class="text-teasers">
            <%
                text_boxes = [
                    {
                        :heading    => page_data.content.textbox_1_heading,
                        :link       => page_data.content.textbox_1_link,
                        :paragraphs => page_data.content.textbox_1_text,
                        :hover_text => page_data.content.textbox_1_hover_text,
                        :readmore   => page_data.content.textbox_1_readmore
                   },
                    {
                        :heading    => page_data.content.textbox_2_heading,
                        :link       => page_data.content.textbox_2_link,
                        :paragraphs => page_data.content.textbox_2_text,
                        :hover_text => page_data.content.textbox_2_hover_text,
                        :readmore   => page_data.content.textbox_2_readmore
                   },
                    {
                        :heading    => page_data.content.textbox_3_heading,
                        :link       => page_data.content.textbox_3_link,
                        :paragraphs => page_data.content.textbox_3_text,
                        :hover_text => page_data.content.textbox_3_hover_text,
                        :readmore   => page_data.content.textbox_3_readmore
                   }
               ]


            %>
            
            <% text_boxes.each_with_index do |text_box,i| %>
                <a href="<%= text_box[:link].url %>" class="teaser-item">
                    <% if i == 0 %>
                        <h1 class="teaser-heading"><%= text_box[:heading].text %> <i class="arrow"></i> </h1>
                    <% else %>
                        <h2 class="teaser-heading"><%= text_box[:heading].text %> <i class="arrow"></i> </h2>
                    <% end %>
                    <div class="teaser-body">
                        <% text_box[:paragraphs].text.split(/\n/).each do |paragraph| %>
                            <p><%= paragraph %></p>
                        <% end %>
                    </div>
                    <div class="teaser-overlay">
                        <%= text_box[:hover_text].text.strip.gsub(/\n/,'<br>').html_safe %>
                        <% if text_box[:readmore].text != '' %>
                            <div class="teaser-bottom-link"><%= text_box[:readmore].text %> <i class="arrow"></i></div>
                        <% end %>
                    </div>
                </a> <!-- .teaser-item -->

            <% end %>

        </div> <!-- .text-teasers -->
            

        <div class="three-media-blocks">

                <%
                    feature_boxes = []

                    feature_boxes << page_data.content.mediabox_1_link
                    feature_boxes << page_data.content.mediabox_2_link
                    feature_boxes << page_data.content.mediabox_3_link

                %>
                <% feature_boxes.each do |box_link| %>
                    <%
                        page_id = box_link.link_value.to_i
                        next if page_id.blank?

                        _other_page    = site.pages.detect{ |e| e.id == page_id }

                        next if _other_page.blank?
                        next if _other_page.template.name != "publisher_templates/article.page"

                        page_info = PageData.new(_other_page)

                        page_slug     = "/#{page_info.slug}"
                        box_style     = page_info.content.feature_box_style.selected != 'largetext' ? 'previewimage' : 'largetext'
                        page_title    = page_info.content.page_title.text
                        page_summary  = page_info.content.article_summary.text
                        preview_image = page_info.content.feature_image.external_url
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

        </div> <!-- .three-media-blocks -->


    </div> <!-- .max-width-wrap -->



</div> <!-- .page-content -->