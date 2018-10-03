<div class="page-content">
    

    <h1 class="page-heading">
        <%= page_data.content.page_title.text.html_safe %>
    </h1>


    <div class="column-layout">
        <div class="max-width-wrap">
            
            <div class="column column-1">



                <div class="padded-content">
                    
                    <div class="contact-list">
                        <a href="tel:<%= page_data.content.hotline_number.text %>">
                            <span class="contact-icon contact-icon--hotline"></span>
                            <%= page_data.content.hotline_text.text %>
                        </a>
                        <a href="tel:<%= page_data.content.phone.text %>">
                            <span class="contact-icon contact-icon--phone"></span>
                            <%= page_data.content.phone.text %>
                        </a>
                        <a href="tel:<%= page_data.content.fax.text %>">
                            <span class="contact-icon contact-icon--fax"></span>
                            <%= page_data.content.fax.text %>
                        </a>
                        <a href="mailto:<%= page_data.content.email.text %>">
                            <span class="contact-icon contact-icon--email"></span>
                            <%= page_data.content.email.text %>
                        </a>
                    </div>

                    <%= page_data.content.left_column_text.text.html_safe %>

                </div>
                
                
                

            </div> <!-- .column-1 -->

            <div class="column column-2">
                
                <div class="padded-content">
                    <form action="#" class="form max-width-wrap contact-form">
                        <div class="form_action hidden"><%= form_action_url('Feedback_Form') %></div>
                        <input type="hidden" name="interests[]" value="5">

                        <div class="form-row clearfix">
                            <div class="form-item">
                                <label>Title*</label>
                                <div class="fake-select">
                                    <div class="select-val">Please select</div>
                                    <div class="fake-toggle">
                                        <div class="icon icon--arrow-down icon--dark-gray"></div>
                                    </div>
                                    <select name="title" class="">
                                        <option value="">Please select</option>
                                        <option value="Miss">Miss</option>
                                        <option value="Mr">Mr.</option>
                                        <option value="Mrs">Mrs.</option>
                                        <option value="Ms">Ms.</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-item form-item-comment">
                                <em>* If you would like a response to your feedback, please ensure you complete all fields marked *</em>
                            </div>
                        </div>

                        <div class="form-row clearfix">
                            <div class="form-item">
                                <label>First Name*</label>
                                <input type="text" class="text-input" name="first_name">
                            </div>
                            <div class="form-item">
                                <label>Last Name*</label>
                                <input type="text" class="text-input" name="last_name">
                            </div>
                        </div> <!-- .form-row clearfix -->

                        <div class="form-row clearfix">
                            <div class="form-item">
                                <label>Phone*</label>
                                <input type="text" class="text-input" name="home_phone">
                            </div>
                            <div class="form-item">
                                <label>Phone Other</label>
                                <input type="text" class="text-input" name="mobile">
                            </div>
                        </div> <!-- .form-row clearfix -->

                        <div class="form-row clearfix">
                            <div class="form-item">
                                <label>Email*</label>
                                <input type="text" class="text-input email" name="email">
                            </div>
                            <div class="form-item">
                                <label>Preferred Method of Contact*</label>
                                <div class="fake-select">
                                    <div class="select-val">Please select</div>
                                    <div class="fake-toggle">
                                        <div class="icon icon--arrow-down icon--dark-gray"></div>
                                    </div>
                                    <select name="life_assist[method_of_contact]" class="">
                                        <option value="">Please select</option>
                                        <option value="phone">Phone</option>
                                        <option value="email">Email</option>
                                    </select>
                                </div>
                            </div>
                        </div> <!-- .form-row clearfix -->

                        <div class="form-row clearfix">
                            <div class="form-item">
                                <label>Postcode*</label>
                                <input type="text" class="text-input " name="postcode">
                            </div>
                            <div class="form-item">
                                <label>Type of Feedback*</label>
                                <div class="fake-select">
                                    <div class="select-val">Please select</div>
                                    <div class="fake-toggle">
                                        <div class="icon icon--arrow-down icon--dark-gray"></div>
                                    </div>
                                    <select name="life_assist[feedback_type]" class="">
                                        <option value="">Please select</option>
                                        <option value="New client feedback">New client feedback</option>
                                        <option value="Existing client feedback">Existing client feedback</option>
                                        <option value="New Client complaint">New Client complaint</option>
                                        <option value="Existing Client complaint">Existing Client complaint</option>
                                    </select>
                                </div>
                            </div>
                        </div> <!-- .form-row clearfix -->

                        <div class="form-row clearfix">
                            <div class="form-item form-item--full">
                                <label>Do you identify as any of the following:</label>
                                <div class="fake-select">
                                    <div class="select-val">Please select</div>
                                    <div class="fake-toggle">
                                        <div class="icon icon--arrow-down icon--dark-gray"></div>
                                    </div>
                                    <select name="life_assist[identify_as]" class="">
                                        <option value="">Please select</option>
                                        <option value="Culturally or linguistically diverse community">Culturally or linguistically diverse community</option>
                                        <option value="Aboriginal or Torres Strait Islander">Aboriginal or Torres Strait Islander</option>
                                        <option value="GLBTIQ community member">GLBTIQ community member</option>
                                        <option value="homeless ">homeless </option>
                                        <option value="survivor of family violence">survivor of family violence</option>
                                        <option value="financially disadvantaged">financially disadvantaged</option>
                                        <option value="Rather not say">Rather not say</option>
                                        <option value="yes, but prefer to disclose verbally">yes, but prefer to disclose verbally</option>
                                        <option value="none of the above">none of the above</option>
                                    </select>
                                </div>
                            </div>
                        </div> <!-- .form-row clearfix -->

                        <div class="form-row clearfix">
                            <div class="form-item form-item--full">
                                <label>Comments*</label>
                                <textarea name="life_assist[msg_comments]" cols="30" rows="10" class="text-input required"></textarea>
                            </div>
                        </div> <!-- .form-row clearfix -->

                        <div class="form-row form-row-submit clearfix">
                            
                            <div class="form-item form-item-action">
                                <button class="btn btn--orange" type="submit">
                                    <span class="btn-state-default">SUBMIT YOUR DETAILS</span>
                                    <span class="btn-state-sending"><img src="/templates/life_assist/img/site/icon_loader_orange.gif" width="16" height="16" alt=""></span>
                                </button>
                            </div>
                        </div> <!-- .form-row clearfix -->

                        <div class="form-thank-you-wrap">
                            <div class="form-thank-you">
                                <%= page_data.content.thank_you_message.text.strip.gsub(/\n/,'<br>').html_safe %>
                            </div>
                        </div>

                    </form> <!-- .form -->

                    <div class="smallprint">
                        <%= page_data.content.terms_and_conditions.text.html_safe %>
                    </div>
                </div>

            </div> <!-- .column-2 -->

        </div>
    </div> <!-- .column-layout -->


</div> <!-- .page-content -->