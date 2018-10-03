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
                        <div class="form_action hidden"><%= form_action_url('Contact_Form_Expanded') %></div>
                        <div style="display:none;">
                            <select name="life_assist[target_email]">
                                <option selected>help@lifeassist.org.au</option>
                                <option>referrals@lifeassist.org.au</option>
                            </select>
                        </div>
                        <input type="hidden" name="interests[]" value="2">

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
                            <div class="form-item form-item--full">
                                <label>When will services be required</label>
                                <div class="fake-select">
                                    <div class="select-val">Please select</div>
                                    <div class="fake-toggle">
                                        <div class="icon icon--arrow-down icon--dark-gray"></div>
                                    </div>
                                    <select name="life_assist[services_start]" class="">
                                        <option value="">Please select</option>
                                        <option value="within next month">Within the next month</option>
                                        <option value="within next week">Within in the next week</option>
                                        <option value="asap">As soon as possible</option>
                                    </select>
                                </div>
                            </div>
                        </div> <!-- .form-row clearfix -->

                        <div class="form-row clearfix">
                            <div class="form-item form-item--full">
                                <label>This enquiry is in reference to:</label>
                            </div>
                        </div> <!-- .form-row clearfix -->

                        <div class="form-row clearfix">
                            <div class="form-item variable">
                                <label class="radio" for="enquiry_reference_1">
                                    <input type="radio" class="required js--enquiry_reference" name="life_assist[enquiry_reference]" id="enquiry_reference_1" checked value="myself">
                                    <div class="fake-radio"></div>
                                    Myself
                                </label>
                            </div>
                            <div class="form-item variable">
                                <label class="radio" for="enquiry_reference_2">
                                    <input type="radio" class="required js--enquiry_reference" name="life_assist[enquiry_reference]" id="enquiry_reference_2" value="friend/family member">
                                    <div class="fake-radio"></div>
                                    A friend/family member
                                </label>
                            </div>
                            <div class="form-item variable">
                                <label class="radio" for="enquiry_reference_3">
                                    <input type="radio" class="required js--enquiry_reference" name="life_assist[enquiry_reference]" id="enquiry_reference_3" value="client/patient">
                                    <div class="fake-radio"></div>
                                    A client/patient
                                </label>
                            </div>
                        </div> <!-- .form-row clearfix -->


                        <!-- EXTRA FIELDS :: FRIEND OR FAMILY -->
                        <div class="extra-form-fields friend">

                            <div class="form-row clearfix">
                                <h2 class="form-row-heading">Friend/Family Member's Details</h2>
                            </div>
                            
                            <div class="form-row clearfix">
                                <div class="form-item form-item--full">
                                    <label>The details of the person who needs assistance (if you are enquiring on behalf of someone else):</label>
                                </div>
                            </div> <!-- .form-row clearfix -->

                            <div class="form-row clearfix">
                                <div class="form-item">
                                    <label>Name</label>
                                    <input type="text" class="text-input" name="life_assist[family_name]">
                                </div>
                                <div class="form-item">
                                    <label>Relationship</label>
                                    <input type="text" class="text-input" name="life_assist[family_relationship]">
                                </div>
                            </div> <!-- .form-row clearfix -->

                            <div class="form-row clearfix">
                                <div class="form-item">
                                    <label>Suburb</label>
                                    <input type="text" class="text-input" name="life_assist[family_suburb]">
                                </div>
                                <div class="form-item">
                                    <label>State</label>
                                    <div class="fake-select">
                                        <div class="select-val">Please select</div>
                                        <div class="fake-toggle">
                                            <div class="icon icon--arrow-down icon--dark-gray"></div>
                                        </div>
                                        <select name="life_assist[family_state]" class="">
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
                                <div class="form-item">
                                    <label>Phone</label>
                                    <input type="text" class="text-input" name="life_assist[family_phone]">
                                </div>
                                <div class="form-item">
                                    <label>Email</label>
                                    <input type="text" class="text-input email" name="life_assist[family_email]">
                                </div>
                            </div> <!-- .form-row clearfix -->

                            <div class="form-row clearfix">
                                <div class="form-item">
                                    <label>Preferred Method of Contact</label>
                                    <div class="fake-select">
                                        <div class="select-val">Please select</div>
                                        <div class="fake-toggle">
                                            <div class="icon icon--arrow-down icon--dark-gray"></div>
                                        </div>
                                        <select name="life_assist[family_method_of_contact]" class="">
                                            <option value="">Please select</option>
                                            <option value="phone">Phone</option>
                                            <option value="email">Email</option>
                                        </select>
                                    </div>
                                </div>
                            </div> <!-- .form-row clearfix -->

                            <div class="form-row clearfix">
                                <div class="form-item form-item--full">
                                    <label>Who should <srong>lifeAssist</srong> contact?</label>
                                </div>
                            </div> <!-- .form-row clearfix -->

                            <div class="form-row clearfix">
                                <div class="form-item variable">
                                    <label class="radio" for="family_who_to_contact_1">
                                        <input type="radio" class="required" name="life_assist[family_who_to_contact]" id="family_who_to_contact_1" checked value="person enquiring">
                                        <div class="fake-radio"></div>
                                        You
                                    </label>
                                </div>
                                <div class="form-item variable">
                                    <label class="radio" for="family_who_to_contact_2">
                                        <input type="radio" class="required" name="life_assist[family_who_to_contact]" id="family_who_to_contact_2" value="person requiring assistance">
                                        <div class="fake-radio"></div>
                                        The person requiring assistance
                                    </label>
                                </div>
                            </div> <!-- .form-row clearfix -->

                            <div class="form-row clearfix">
                                <div class="form-item">
                                    <label>Will an interpreter be required?</label>
                                    <div class="fake-select">
                                        <div class="select-val">No</div>
                                        <div class="fake-toggle">
                                            <div class="icon icon--arrow-down icon--dark-gray"></div>
                                        </div>
                                        <select name="life_assist[family_interpreter]" class="js-interpreter">
                                            <option value="no" selected>No</option>
                                            <option value="yes">Yes</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-item disabled">
                                    <label>Language</label>
                                    <input type="text" class="text-input js-language" name="life_assist[family_interpreter_language]" disabled>
                                </div>
                            </div> <!-- .form-row clearfix -->

                            <div class="form-row clearfix">
                                <h3 class="form-row-heading">
                                    Please ensure you have the person's consent to share this information with lifeAssist and permission for lifeAssist to contact them.
                                </h3>
                            </div>

                            <div class="form-row clearfix">
                                <div class="form-item form-item--checkbox form-item--checkbox-left form-item--full">
                                    <label>
                                        <span class="fake-checkbox">
                                            <input type="checkbox" name="life_assist[family_consent]" value="yes" class="required">
                                            <span class="icon icon--check icon--dark-gray"></span>
                                        </span>
                                        <strong>YES</strong>, I have permission to provide the above personal details and give/have gained consent for lifeAssist to make contact regarding the above information.
                                    </label>
                                </div>
                            </div> <!-- .form-row clearfix -->

                        </div> <!-- extra form fields -->


                        <!-- EXTRA FIELDS :: CLIENT OR PATIENT -->
                        <div class="extra-form-fields patient">

                            <div class="form-row clearfix">
                                <h2 class="form-row-heading">Client/Patient's Details</h2>
                            </div>

                            <div class="form-row clearfix">
                                <div class="form-item">
                                    <label>Your Relationship to the Client/Patient</label>
                                    <input type="text" class="text-input" name="life_assist[patient_relationship]">
                                </div>
                                <div class="form-item">
                                    <label>Hospital Discharge Date</label>
                                    <input type="text" class="text-input" name="life_assist[patient_discharge_date]" placeholder="dd/mm/yyyy">
                                </div>
                            </div> <!-- .form-row clearfix -->

                            <div class="form-row clearfix">
                                <div class="form-item form-item--full">
                                    <label>Clinical Diagnosis (list if multiple)</label>
                                    <textarea name="life_assist[patient_diagnosis]" cols="30" rows="10" class="text-input"></textarea>
                                </div>
                            </div> <!-- .form-row clearfix -->

                            <div class="form-row clearfix">
                                <div class="form-item form-item--full">
                                    <h4>Formal Supports</h4>
                                </div>
                            </div> <!-- .form-row clearfix -->

                            <div class="form-row clearfix">
                                <div class="form-item variable">
                                    <label class="radio" for="patient_formal_supports_1">
                                        <input type="radio" class="" name="life_assist[patient_formal_supports]" id="patient_formal_supports_1" value="yes">
                                        <div class="fake-radio"></div>
                                        Yes
                                    </label>
                                </div>
                                <div class="form-item variable">
                                    <label class="radio" for="patient_formal_supports_2">
                                        <input type="radio" class="" name="life_assist[patient_formal_supports]" id="patient_formal_supports_2" value="no">
                                        <div class="fake-radio"></div>
                                        No
                                    </label>
                                </div>
                                <div class="form-item variable">
                                    <label class="radio" for="patient_formal_supports_3">
                                        <input type="radio" class="" name="life_assist[patient_formal_supports]" id="patient_formal_supports_3" value="none reported">
                                        <div class="fake-radio"></div>
                                        None Reported
                                    </label>
                                </div>
                            </div> <!-- .form-row clearfix -->

                            <div class="form-row clearfix">
                                <div class="form-item form-item--full">
                                    <label>Details</label>
                                </div>
                            </div> <!-- .form-row clearfix -->

                            <div class="form-row clearfix">
                                <div class="form-item">
                                    <label>Case Manager/Agency</label>
                                    <input type="text" class="text-input" name="life_assist[patient_formal_support_case_manager]">
                                </div>
                                <div class="form-item">
                                    <label>Contact</label>
                                    <input type="text" class="text-input" name="life_assist[patient_formal_support_contact]">
                                </div>
                            </div> <!-- .form-row clearfix -->

                            <div class="form-row clearfix">
                                <div class="form-item form-item--full">
                                    <label>Type</label>
                                    <input type="text" class="text-input" name="life_assist[patient_formal_support_type]">
                                </div>
                            </div> <!-- .form-row clearfix -->


                            <div class="form-row clearfix">
                                <div class="form-item form-item--full">
                                    <h4>Known Carers (Informal Support)</h4>
                                </div>
                            </div> <!-- .form-row clearfix -->

                            <div class="form-row clearfix">
                                <div class="form-item variable">
                                    <label class="radio" for="patinformal1">
                                        <input type="radio" class="" name="life_assist[patient_informal_support]" id="patinformal1" value="yes">
                                        <div class="fake-radio"></div>
                                        Yes
                                    </label>
                                </div>
                                <div class="form-item variable">
                                    <label class="radio" for="patinformal2">
                                        <input type="radio" class="" name="life_assist[patient_informal_support]" id="patinformal2" value="no">
                                        <div class="fake-radio"></div>
                                        No
                                    </label>
                                </div>
                                <div class="form-item variable">
                                    <label class="radio" for="patinformal3">
                                        <input type="radio" class="" name="life_assist[patient_informal_support]" id="patinformal3" value="none reported">
                                        <div class="fake-radio"></div>
                                        None Reported
                                    </label>
                                </div>
                            </div> <!-- .form-row clearfix -->

                            <div class="form-row clearfix">
                                <div class="form-item form-item--full">
                                    <label>Details</label>
                                </div>
                            </div> <!-- .form-row clearfix -->

                            <div class="form-row clearfix">
                                <div class="form-item">
                                    <label>Name/Relationship</label>
                                    <input type="text" class="text-input" name="life_assist[patient_informal_support_name]">
                                </div>
                                <div class="form-item">
                                    <label>Contact</label>
                                    <input type="text" class="text-input" name="life_assist[patient_informal_support_contact]">
                                </div>
                            </div> <!-- .form-row clearfix -->

                            <div class="form-row clearfix">
                                <div class="form-row clearfix">
                                    <div class="form-item form-item--full">
                                        <label>Service Type</label>
                                        <input type="text" class="text-input" name="life_assist[patient_informal_support_type]">
                                    </div>
                                </div> <!-- .form-row clearfix -->
                            </div> <!-- .form-row clearfix -->

                            <div class="form-row clearfix">
                                <div class="form-item form-item--full">
                                    <h3>Client/Patient details</h3>
                                </div>
                            </div> <!-- .form-row clearfix -->

                            <div class="form-row clearfix">
                                <div class="form-item form-item--full">
                                    <label>Name</label>
                                    <input type="text" class="text-input" name="life_assist[patient_name]">
                                </div>
                            </div> <!-- .form-row clearfix -->

                            <div class="form-row clearfix">
                                <div class="form-item">
                                    <label>Suburb of Residence</label>
                                    <input type="text" class="text-input" name="life_assist[patient_suburb]">
                                </div>
                                <div class="form-item">
                                    <label>State of Residence</label>
                                    <div class="fake-select">
                                        <div class="select-val">Please select</div>
                                        <div class="fake-toggle">
                                            <div class="icon icon--arrow-down icon--dark-gray"></div>
                                        </div>
                                        <select name="life_assist[patient_state]" class="">
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
                                <div class="form-item">
                                    <label>Phone</label>
                                    <input type="text" class="text-input" name="life_assist[patient_phone]">
                                </div>
                                <div class="form-item">
                                    <label>Email</label>
                                    <input type="text" class="text-input email" name="life_assist[patient_email]">
                                </div>
                            </div> <!-- .form-row clearfix -->

                            <div class="form-row clearfix">
                                <div class="form-item">
                                    <label>Their Preferred Method of Contact</label>
                                    <div class="fake-select">
                                        <div class="select-val">Please select</div>
                                        <div class="fake-toggle">
                                            <div class="icon icon--arrow-down icon--dark-gray"></div>
                                        </div>
                                        <select name="life_assist[patient_method_of_contact]" class="">
                                            <option value="">Please select</option>
                                            <option value="phone">Phone</option>
                                            <option value="email">Email</option>
                                        </select>
                                    </div>
                                </div>
                            </div> <!-- .form-row clearfix -->

                            <div class="form-row clearfix">
                                <div class="form-item form-item--full">
                                    <label>Who should <srong>lifeAssist</srong> contact?</label>
                                </div>
                            </div> <!-- .form-row clearfix -->

                            <div class="form-row clearfix">
                                <div class="form-item variable">
                                    <label class="radio" for="pat_who_to_contact1">
                                        <input type="radio" class="required" name="life_assist[patient_who_to_contact]" id="pat_who_to_contact1" checked value="person enquiring">
                                        <div class="fake-radio"></div>
                                        You
                                    </label>
                                </div>
                                <div class="form-item variable">
                                    <label class="radio" for="pat_who_to_contact2">
                                        <input type="radio" class="required" name="life_assist[patient_who_to_contact]" id="pat_who_to_contact2" value="patient/client">
                                        <div class="fake-radio"></div>
                                        The patient/client
                                    </label>
                                </div>
                            </div> <!-- .form-row clearfix -->

                            <div class="form-row clearfix">
                                <div class="form-item">
                                    <label>Will an interpreter be required?</label>
                                    <div class="fake-select">
                                        <div class="select-val">No</div>
                                        <div class="fake-toggle">
                                            <div class="icon icon--arrow-down icon--dark-gray"></div>
                                        </div>
                                        <select name="life_assist[patient_interpreter]" class="js-interpreter">
                                            <option value="no" selected>No</option>
                                            <option value="yes">Yes</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-item disabled">
                                    <label>Language</label>
                                    <input type="text" class="text-input js-language" name="life_assist[patient_interpreter_language]" disabled>
                                </div>
                            </div> <!-- .form-row clearfix -->

                            <div class="form-row clearfix">
                                <div class="form-item form-item--full">
                                    <h4>Document Upload</h4>
                                </div>
                            </div> <!-- .form-row clearfix -->

                            <div class="form-row clearfix">
                                <div class="form-item form-item--full">
                                    <label>Please attach any supporting documentation (PDF or Word DOC format only)</label>
                                    <input type="file" name="uploads" data-accept="application/pdf,msword,vnd.openxmlformats-officedocument.wordprocessingml.document">
                                </div>
                            </div> <!-- .form-row clearfix -->


                            <div class="form-row clearfix">
                                <h3 class="form-row-heading">
                                    Please ensure you have the person's consent to share this information with lifeAssist and permission for lifeAssist to contact them.
                                </h3>
                            </div>

                            <div class="form-row clearfix">
                                <div class="form-item form-item--checkbox form-item--checkbox-left form-item--full">
                                    <label>
                                        <span class="fake-checkbox">
                                            <input type="checkbox" name="life_assist[patient_consent]" value="yes" class="required">
                                            <span class="icon icon--check icon--dark-gray"></span>
                                        </span>
                                        <strong>YES</strong>, I have discussed with the consumer how and why certain information may be shared with other service providers. I am satisfied that this has been understood and that informed consent for the information to be shared as detailed has been given.
                                    </label>
                                </div>
                            </div> <!-- .form-row clearfix -->

                            <div class="form-row clearfix">
                                <div class="form-item form-item--full">
                                    <label></label>
                                </div>
                            </div> <!-- .form-row clearfix -->

                        </div> <!-- .extra-form-fields -->



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
                                <%= page_data.content.thank_you_message.text.strip.gsub(/\n/,'<br>').html_safe %>
                            </div>
                        </div>

                    </form> <!-- .form -->
                    
                </div>

            </div> <!-- .column-2 -->

        </div>
    </div> <!-- .column-layout -->


</div> <!-- .page-content -->