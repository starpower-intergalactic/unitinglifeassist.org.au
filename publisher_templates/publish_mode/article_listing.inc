<%
    def check_children( nav_item, page_id )

        nav_item.children.each do |child_item|
            
            return child_item.children if child_item.navigable_id == page_id

            if child_item.children.size > 0
                result = check_children(child_item, page_id)
                return result unless result.blank?
            end
        end

        return nil
    end



    def find_page_children(page_id)

        site_data.navigation_sets.each do |nav_set|

            nav_set.children.each do |nav_item|
                return nav_item.children if nav_item.navigable_id == page_id 
                result = check_children( nav_item, page_id )
                return result unless result.blank?
            end
        end

        return nil
    end


    def split_into_groups(items, per_row)

        rearranged = items.inject([]) do |memo, n|
            if memo.last && memo.last.length < per_row
                memo.last << n
            else
                memo << [n]
            end
            memo
        end

        rearranged
    end

%>

<div class="page-content">
    <div class="page-heading">
        <div class="max-width-wrap">
            <h1><%= page_data.content.page_title.text.html_safe %></h1>
            <div class="listing-nav">
                <a href="#prev" class="listing-nav-item nav-item--prev">
                    <i class="icon icon--dark-gray icon--arrow-left"></i>
                    Previous
                </a>
                <a href="#next" class="listing-nav-item nav-item--next">
                    Next
                    <i class="icon icon--dark-gray icon--arrow-right"></i>
                </a>
            </div>
        </div>
        
    </div>

    <div class="media-block-listing animate max-width-wrap">

        <%
            page_id = page_data.page.id
            if page_id.blank?
                # getting page id from hidden content region if blank
                page_id = page_data.content.page_id.text.to_i
            end
            page = Page.find(page_id)

            child_pages =  page.children.map(&:navigable_object)  #find_page_children( page_id )
            child_pages = child_pages.select{ |e| e.navigation_item.type == "Page" && e.template.name == "publisher_templates/article.page" } unless child_pages.blank?

            groups      = []
            groups      = split_into_groups( child_pages, 3) unless child_pages.blank? || child_pages.length == 0
        %>

        <% groups.each_with_index do |group,i| %>
            
            <div class="three-media-blocks <%= i < 2 ? "animate-in" : "blocks-hidden" %>">

                <% group.each do |page| %>

                    <%
                        _other_page    = site.pages.detect{ |e| e.id == page.id }

                        next if _other_page.blank?

                        page_info = PageData.new(_other_page)

                        page_slug     = "/#{page.slug}"
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

        <% end %>

        <% if groups.size  % 2 == 1 %>
            <div class="three-media-blocks dummy-row <%= groups.size == 1 ? "animate-in" : "blocks-hidden" %>">
                <div class="media-block media-block-largetext">
                    <div class="media-body">
                        <div class="media-heading">
                            &nbsp;
                            <i class="arrow"></i>
                        </div>
                        <div class="media-copy">
                            <p>&nbsp;</p>
                        </div>
                    </div>
                </div>
            </div>
        <% end %>


    </div> <!-- .media-block-listing -->

</div> <!-- .page-content -->


