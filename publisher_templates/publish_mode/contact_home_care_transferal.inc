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

                    <form action="#" class="form max-width-wrap contact-form" data-ajax="no" method="POST" enctype="multipart/form-data">
                        <div class="form_action hidden"><%= form_action_url('Home_Care_Transferal') %></div>

                        <input type="hidden" name="interests[]" value="6">

                        <div class="form-row clearfix">
                            <h2 class="form-row-heading">Your Details</h2>
                        </div>

                        <div class="form-row clearfix">
                            <div class="form-item">
                                <label>Title*</label>
                                <div class="fake-select">
                                    <div class="select-val">Please select</div>
                                    <div class="fake-toggle">
                                        <div class="icon icon--arrow-down icon--dark-gray"></div>
                                    </div>
                                    <select name="title" class="required">
                                        <option value="">Please select</option>
                                        <option value="Miss">Miss</option>
                                        <option value="Mr">Mr.</option>
                                        <option value="Mrs">Mrs.</option>
                                        <option value="Ms">Ms.</option>
                                        <option value="Dr">Dr.</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-item form-item-comment">
                                <em>* Mandatory Fields</em>
                            </div>
                        </div>

                        <div class="form-row clearfix">
                            <div class="form-item">
                                <label>First Name*</label>
                                <input type="text" class="text-input required" name="first_name">
                            </div>
                            <div class="form-item">
                                <label>Last Name*</label>
                                <input type="text" class="text-input required" name="last_name">
                            </div>
                        </div> <!-- .form-row clearfix -->

                        <div class="form-row clearfix">
                            <div class="form-item">
                                <label>Phone*</label>
                                <input type="text" class="text-input required" name="home_phone">
                            </div>
                            <div class="form-item">
                                <label>Phone Other</label>
                                <input type="text" class="text-input" name="mobile">
                            </div>
                        </div> <!-- .form-row clearfix -->

                        <div class="form-row clearfix">
                            <div class="form-item">
                                <label>Email</label>
                                <input type="text" class="text-input email required" name="email">
                            </div>
                            <div class="form-item">
                                <label>Preferred Method of Contact*</label>
                                <div class="fake-select">
                                    <div class="select-val">Please select</div>
                                    <div class="fake-toggle">
                                        <div class="icon icon--arrow-down icon--dark-gray"></div>
                                    </div>
                                    <select name="life_assist[method_of_contact]" class="required js-method-of-contact" data-target="js-interpreter-form-row">
                                        <option value="">Please select</option>
                                        <option value="phone">Phone</option>
                                        <option value="email">Email</option>
                                    </select>
                                </div>
                            </div>
                        </div> <!-- .form-row clearfix -->

                        <div class="form-row form-row--hidden clearfix js-interpreter-form-row">
                            <div class="form-item">
                                <label>Will an interpreter be required?</label>
                                <div class="fake-select">
                                    <div class="select-val">No</div>
                                    <div class="fake-toggle">
                                        <div class="icon icon--arrow-down icon--dark-gray"></div>
                                    </div>
                                    <select name="life_assist[personal_interpreter]" class="js-interpreter">
                                        <option value="no" selected>No</option>
                                        <option value="yes">Yes</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-item disabled">
                                <label>Language</label>
                                <input type="text" class="text-input js-language" name="life_assist[personal_interpreter_language]" disabled>
                            </div>
                        </div> <!-- .form-row clearfix -->

                        <div class="form-row clearfix">
                            <div class="form-item">
                                <label>Suburb*</label>
                                <input type="text" class="text-input required js-suburb-suggest" name="suburb" data-state-select="js-state-1">
                            </div>
                            <div class="form-item">
                                <label>State*</label>
                                <div class="fake-select">
                                    <div class="select-val">Please select</div>
                                    <div class="fake-toggle">
                                        <div class="icon icon--arrow-down icon--dark-gray"></div>
                                    </div>
                                    <select name="state" class="required" id="js-state-1">
                                        <option value="">Please select</option>
                                        <option value="ACT">ACT</option>
                                        <option value="NSW">NSW</option>
                                        <option value="NT">NT</option>
                                        <option value="QLD">QLD</option>
                                        <option value="SA">SA</option>
                                        <option value="TAS">TAS</option>
                                        <option value="VIC">VIC</option>
                                        <option value="WA">WA</option>
                                    </select>
                                </div>
                            </div>
                        </div> <!-- .form-row clearfix -->

                        
                        <div class="form-row clearfix">
                            <h2 class="form-row-heading">Home Care Package Information</h2>
                        </div>
                        

                        <div class="form-row clearfix">
                            <div class="form-item form-item--full">
                                <label>I currently have a Home Care Package with:</label>
                                <input type="text" class="text-input" name="life_assist[current_home_care_provider]">
                            </div>
                        </div> <!-- .form-row clearfix -->

                        <div class="form-row clearfix">
                            <div class="form-item form-item--full">
                                <label>My Home Care Package level is:</label>
                                <div class="fake-select">
                                    <div class="select-val">Please select</div>
                                    <div class="fake-toggle">
                                        <div class="icon icon--arrow-down icon--dark-gray"></div>
                                    </div>
                                    <select name="life_assist[home_care_package_level]" class="">
                                        <option value="">Please select</option>
                                        <option value="Level 1">Level 1</option>
                                        <option value="Level 2">Level 2</option>
                                        <option value="Level 3">Level 3</option>
                                        <option value="Level 4">Level 4</option>
                                        <option value="Not sure">Not sure</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        <hr class="form-hr">


                        <div class="form-row clearfix">
                            <div class="form-item form-item--full">
                                <label>Comments</label>
                                <textarea name="life_assist[msg_comments]" cols="30" rows="10" class="text-input"></textarea>
                            </div>
                        </div> <!-- .form-row clearfix -->


                        <div class="form-row form-row-submit clearfix">

                            <div class="form-item form-item--checkbox form-item--smaller">
                                <label>
                                    I have read the lifeAssist privacy policy*
                                    <span class="fake-checkbox">
                                        <input type="checkbox" name="terms" value="yes" class="required">
                                        <span class="icon icon--check icon--dark-gray"></span>
                                    </span>
                                </label>
                            </div>
                            
                            <div class="form-item form-item--smallprint">
                                <div class="smallprint">
                                    <%= page_data.content.terms_and_conditions.text.html_safe %>
                                </div>
                            </div>

                        </div> <!-- .form-row clearfix -->


                        <div class="form-row form-row-submit clearfix">
                            <div class="form-item form-item-action form-item--left">
                                <button class="btn btn--orange" type="submit">
                                    <span class="btn-state-default">SUBMIT YOUR DETAILS</span>
                                    <span class="btn-state-sending"><img src="/templates/life_assist/img/site/icon_loader_orange.gif" width="16" height="16" alt=""></span>
                                </button>
                            </div>
                        </div> <!-- .form-row clearfix -->



                        <div class="form-thank-you-wrap">
                            <div class="form-thank-you">
                                <%#= page_data.content.thank_you_message.text.strip.gsub(/\n/,'<br>').html_safe %>
                            </div>
                        </div>

                    </form> <!-- .form -->
                    
                </div>

            </div> <!-- .column-2 -->

        </div>
    </div> <!-- .column-layout -->


</div> <!-- .page-content -->