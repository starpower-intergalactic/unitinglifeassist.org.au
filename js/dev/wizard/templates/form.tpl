<form id="signup_form" action="<%= form_action %>" class="form max-width-wrap" method="POST" enctype="multipart/form-data">

	<input type="hidden" name="interests[]" value="3">
	<input type="hidden" name="life_assist[answers]" value="<%= selectedAnswers %>">
	<input type="hidden" name="life_assist[packages]" value="<%= selectedPackages %>">
	<input type="hidden" name="life_assist[target_email]" value="<%= targetEmail %>">

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
					<option value="Miss" <%= title == 'Miss' ? 'selected' : ''  %>>Miss</option>
					<option value="Mr" <%= title == 'Mr' ? 'selected' : ''  %>>Mr.</option>
					<option value="Mrs" <%= title == 'Mrs' ? 'selected' : ''  %>>Mrs.</option>
					<option value="Ms" <%= title == 'Ms' ? 'selected' : ''  %>>Ms.</option>
					<option value="Dr" <%= title == 'Dr' ? 'selected' : ''  %>>Dr.</option>
					<option value="other" <%= title == 'other' ? 'selected' : ''  %>>Other</option>
				</select>
			</div>
		</div>
		<div class="form-item form-item-comment">
			<em>* Mandatory Fields</em>
		</div>
	</div> <!-- .form-row clearfix -->

	<div class="form-row clearfix">
		<div class="form-item">
			<label>First Name*</label>
			<input type="text" class="text-input required" name="first_name" value="<%= first_name || '' %>">
		</div>
		<div class="form-item">
			<label>Last Name*</label>
			<input type="text" class="text-input required" name="last_name" value="<%= last_name %>">
		</div>
	</div> <!-- .form-row clearfix -->

	<div class="form-row clearfix">
		<div class="form-item">
			<label>Phone*</label>
			<input type="text" class="text-input required" name="home_phone" value="<%= home_phone %>">
		</div>
		<div class="form-item">
			<label>Phone Other</label>
			<input type="text" class="text-input" name="mobile" value="<%= mobile %>">
		</div>
	</div> <!-- .form-row clearfix -->

	<div class="form-row clearfix">
		<div class="form-item">
			<label>Email</label>
			<input type="text" class="text-input email" name="email" value="<%= email %>">
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
					<option value="phone" <%= method_of_contact == 'phone' ? 'selected' : ''  %>>Phone</option>
					<option value="email" <%= method_of_contact == 'email' ? 'selected' : ''  %>>Email</option>
				</select>
			</div>
		</div>
	</div> <!-- .form-row clearfix -->

	<div class="form-row clearfix js-interpreter-form-row <%= method_of_contact == 'phone' ? '' : 'form-row--hidden' %>">
	    <div class="form-item">
	        <label>Will an interpreter be required?</label>
	        <div class="fake-select">
	            <div class="select-val">No</div>
	            <div class="fake-toggle">
	                <div class="icon icon--arrow-down icon--dark-gray"></div>
	            </div>
	            <select name="life_assist[personal_interpreter]" class="js-interpreter">
	                <option <%= personal_interpreter != 'yes'  ? 'selected' : '' %> value="no">No</option>
	                <option <%= personal_interpreter == 'yes'  ? 'selected' : '' %> value="yes">Yes</option>
	            </select>
	        </div>
	    </div>
	    <div class="form-item <%= personal_interpreter == 'yes' ? '' : 'disabled' %>">
	        <label>Language</label>
	        <input type="text" class="text-input js-language" name="life_assist[personal_interpreter_language]" <%= personal_interpreter == 'yes' ? '' : 'disabled' %>  value="<%= personal_interpreter_language %>">
	    </div>
	</div> <!-- .form-row clearfix -->

	<div class="form-row clearfix">
	    <div class="form-item">
	        <label>Suburb*</label>
	        <input type="text" class="text-input required js-suburb-suggest" name="suburb" value="<%= suburb %>" data-state-select="state-select-1">
	    </div>
	    <div class="form-item">
	        <label>State*</label>
	        <div class="fake-select">
	            <div class="select-val">Please select</div>
	            <div class="fake-toggle">
	                <div class="icon icon--arrow-down icon--dark-gray"></div>
	            </div>
	            <select name="state" class="required" id="state-select-1">
	                <option value="">Please select</option>
	                <option <%= state == 'ACT' ? 'selected' : '' %> value="ACT">ACT</option>
	                <option <%= state == 'NSW' ? 'selected' : '' %> value="NSW">NSW</option>
	                <option <%= state == 'NT' ? 'selected' : '' %> value="NT">NT</option>
	                <option <%= state == 'QLD' ? 'selected' : '' %> value="QLD">QLD</option>
	                <option <%= state == 'SA' ? 'selected' : '' %> value="SA">SA</option>
	                <option <%= state == 'TAS' ? 'selected' : '' %> value="TAS">TAS</option>
	                <option <%= state == 'VIC' ? 'selected' : '' %> value="VIC">VIC</option>
	                <option <%= state == 'WA' ? 'selected' : '' %> value="WA">WA</option>
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
	                <option <%= services_start == 'within next month' ? 'selected' : '' %> value="within next month">Within the next month</option>
	                <option <%= services_start == 'within next week' ? 'selected' : '' %> value="within next week">Within in the next week</option>
	                <option <%= services_start == 'asap' ? 'selected' : '' %> value="asap">As soon as possible</option>
	            </select>
	        </div>
	    </div>
	</div> <!-- .form-row clearfix -->


	<% if( enquiryReference === 'family') { %>
		<!-- EXTRA FIELDS :: FRIEND OR FAMILY -->
		<div class="extra-form-fields friend" style="display:block;">

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
		            <input type="text" class="text-input" name="life_assist[family_name]" value="<%= family_name %>">
		        </div>
		        <div class="form-item">
		            <label>Relationship</label>
		            <input type="text" class="text-input" name="life_assist[family_relationship]" value="<%= family_relationship %>">
		        </div>
		    </div> <!-- .form-row clearfix -->

		    <div class="form-row clearfix">
		        <div class="form-item">
		            <label>Suburb</label>
		            <input type="text" class="text-input js-suburb-suggest" name="life_assist[family_suburb]" value="<%= family_suburb %>" data-state-select="state-select-2">
		        </div>
		        <div class="form-item">
		            <label>State</label>
		            <div class="fake-select">
		                <div class="select-val">Please select</div>
		                <div class="fake-toggle">
		                    <div class="icon icon--arrow-down icon--dark-gray"></div>
		                </div>
		                <select name="life_assist[family_state]" class="" id="state-select-2">
		                    <option value="">Please select</option>
			                <option <%= family_state == 'ACT' ? 'selected' : '' %> value="ACT">ACT</option>
			                <option <%= family_state == 'NSW' ? 'selected' : '' %> value="NSW">NSW</option>
			                <option <%= family_state == 'NT' ? 'selected' : '' %> value="NT">NT</option>
			                <option <%= family_state == 'QLD' ? 'selected' : '' %> value="QLD">QLD</option>
			                <option <%= family_state == 'SA' ? 'selected' : '' %> value="SA">SA</option>
			                <option <%= family_state == 'TAS' ? 'selected' : '' %> value="TAS">TAS</option>
			                <option <%= family_state == 'VIC' ? 'selected' : '' %> value="VIC">VIC</option>
			                <option <%= family_state == 'WA' ? 'selected' : '' %> value="WA">WA</option>
		                </select>
		            </div>
		        </div>
		    </div> <!-- .form-row clearfix -->

		    <div class="form-row clearfix">
		        <div class="form-item">
		            <label>Phone</label>
		            <input type="text" class="text-input" name="life_assist[family_phone]" value="<%= family_phone %>">
		        </div>
		        <div class="form-item">
		            <label>Email</label>
		            <input type="text" class="text-input email" name="life_assist[family_email]" value="<%= family_email %>">
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
		                    <option <%= family_method_of_contact == 'phone' ? 'selected' : '' %> value="phone">Phone</option>
		                    <option <%= family_method_of_contact == 'email' ? 'selected' : '' %> value="email">Email</option>
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
		                <input type="radio" class="required" name="life_assist[family_who_to_contact]" id="family_who_to_contact_1" value="person enquiring" <%= family_who_to_contact != 'person requiring assistance' ? 'checked' : '' %>>
		                <div class="fake-radio"></div>
		                You
		            </label>
		        </div>
		        <div class="form-item variable">
		            <label class="radio" for="family_who_to_contact_2">
		                <input type="radio" class="required" name="life_assist[family_who_to_contact]" id="family_who_to_contact_2" value="person requiring assistance" <%= family_who_to_contact == 'person requiring assistance' ? 'checked' : '' %>>
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
		                    <option <%= family_interpreter != 'yes' ? 'selected' : '' %> value="no" selected>No</option>
		                    <option <%= family_interpreter == 'yes' ? 'selected' : '' %> value="yes">Yes</option>
		                </select>
		            </div>
		        </div>
		        <div class="form-item <%= family_interpreter != 'yes' ? 'disabled' : '' %>">
		            <label>Language</label>
		            <input type="text" class="text-input js-language" name="life_assist[family_interpreter_language]" <%= family_interpreter != 'yes' ? 'disabled' : '' %> value="<%= family_interpreter_language %>">
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
		                    <input type="checkbox" name="life_assist[family_consent]" value="yes" class="required" <%= family_consent == 'yes' ? 'checked' : '' %>>
		                    <span class="icon icon--check icon--dark-gray"></span>
		                </span>
		                <strong>YES</strong>, I have permission to provide the above personal details and give/have gained consent for lifeAssist to make contact regarding the above information.
		            </label>
		        </div>
		    </div> <!-- .form-row clearfix -->

		</div> <!-- extra form fields -->
	<% } %>

	
	<% if( enquiryReference === 'patient') { %>
		<!-- EXTRA FIELDS :: CLIENT OR PATIENT -->
		<div class="extra-form-fields patient" style="display:block;">

		    <div class="form-row clearfix">
		        <h2 class="form-row-heading">Client/Patient's Details</h2>
		    </div>

		    <div class="form-row clearfix">
		        <div class="form-item">
		            <label>Your Relationship to the Client/Patient</label>
		            <input type="text" class="text-input" name="life_assist[patient_relationship]" value="<%= patient_relationship %>">
		        </div>
		        <div class="form-item">
		            <label>Hospital Discharge Date</label>
		            <input type="text" class="text-input" name="life_assist[patient_discharge_date]" placeholder="dd/mm/yyyy" value="<%= patient_discharge_date %>">
		        </div>
		    </div> <!-- .form-row clearfix -->

		    <div class="form-row clearfix">
		        <div class="form-item form-item--full">
		            <label>Clinical Diagnosis (list if multiple)</label>
		            <textarea name="life_assist[patient_diagnosis]" cols="30" rows="10" class="text-input"><%= patient_diagnosis %></textarea>
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
		                <input type="radio" class="" name="life_assist[patient_formal_supports]" id="patient_formal_supports_1" value="yes" <%= patient_formal_supports == 'yes' ? 'checked' : '' %>>
		                <div class="fake-radio"></div>
		                Yes
		            </label>
		        </div>
		        <div class="form-item variable">
		            <label class="radio" for="patient_formal_supports_2">
		                <input type="radio" class="" name="life_assist[patient_formal_supports]" id="patient_formal_supports_2" value="no" <%= patient_formal_supports == 'no' ? 'checked' : '' %>>
		                <div class="fake-radio"></div>
		                No
		            </label>
		        </div>
		        <div class="form-item variable">
		            <label class="radio" for="patient_formal_supports_3">
		                <input type="radio" class="" name="life_assist[patient_formal_supports]" id="patient_formal_supports_3" value="none reported" <%= patient_formal_supports == 'none reported' ? 'checked' : '' %>>
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
		            <input type="text" class="text-input" name="life_assist[patient_formal_support_case_manager]" value="<%= patient_formal_support_case_manager %>">
		        </div>
		        <div class="form-item">
		            <label>Contact</label>
		            <input type="text" class="text-input" name="life_assist[patient_formal_support_contact]" value="<%= patient_formal_support_contact %>">
		        </div>
		    </div> <!-- .form-row clearfix -->

		    <div class="form-row clearfix">
		        <div class="form-item form-item--full">
		            <label>Type</label>
		            <input type="text" class="text-input" name="life_assist[patient_formal_support_type]" value="<%= patient_formal_support_type %>">
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
		                <input type="radio" class="" name="life_assist[patient_informal_support]" id="patinformal1" value="yes" <%= patient_informal_support == 'yes' ? 'checked' : '' %>>
		                <div class="fake-radio"></div>
		                Yes
		            </label>
		        </div>
		        <div class="form-item variable">
		            <label class="radio" for="patinformal2">
		                <input type="radio" class="" name="life_assist[patient_informal_support]" id="patinformal2" value="no" <%= patient_informal_support == 'no' ? 'checked' : '' %>>
		                <div class="fake-radio"></div>
		                No
		            </label>
		        </div>
		        <div class="form-item variable">
		            <label class="radio" for="patinformal3">
		                <input type="radio" class="" name="life_assist[patient_informal_support]" id="patinformal3" value="none reported" <%= patient_informal_support == 'none reported' ? 'checked' : '' %>>
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
		            <input type="text" class="text-input" name="life_assist[patient_informal_support_name]" value="<%= patient_informal_support_name %>">
		        </div>
		        <div class="form-item">
		            <label>Contact</label>
		            <input type="text" class="text-input" name="life_assist[patient_informal_support_contact]" value="<%= patient_informal_support_contact %>">
		        </div>
		    </div> <!-- .form-row clearfix -->

		    <div class="form-row clearfix">
		        <div class="form-row clearfix">
		            <div class="form-item form-item--full">
		                <label>Service Type</label>
		                <input type="text" class="text-input" name="life_assist[patient_informal_support_type]" value="<%= patient_informal_support_type %>">
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
		            <input type="text" class="text-input" name="life_assist[patient_name]" value="<%= patient_name %>">
		        </div>
		    </div> <!-- .form-row clearfix -->

		    <div class="form-row clearfix">
		        <div class="form-item">
		            <label>Suburb of Residence</label>
		            <input type="text" class="text-input js-suburb-suggest" name="life_assist[patient_suburb]" value="<%= patient_suburb %>" data-state-select="state-select-3">
		        </div>
		        <div class="form-item">
		            <label>State of Residence</label>
		            <div class="fake-select">
		                <div class="select-val">Please select</div>
		                <div class="fake-toggle">
		                    <div class="icon icon--arrow-down icon--dark-gray"></div>
		                </div>
		                <select name="life_assist[patient_state]" class="" id="state-select-3">
		                    <option value="">Please select</option>
			                <option <%= patient_state == 'ACT' ? 'selected' : '' %> value="ACT">ACT</option>
			                <option <%= patient_state == 'NSW' ? 'selected' : '' %> value="NSW">NSW</option>
			                <option <%= patient_state == 'NT' ? 'selected' : '' %> value="NT">NT</option>
			                <option <%= patient_state == 'QLD' ? 'selected' : '' %> value="QLD">QLD</option>
			                <option <%= patient_state == 'SA' ? 'selected' : '' %> value="SA">SA</option>
			                <option <%= patient_state == 'TAS' ? 'selected' : '' %> value="TAS">TAS</option>
			                <option <%= patient_state == 'VIC' ? 'selected' : '' %> value="VIC">VIC</option>
			                <option <%= patient_state == 'WA' ? 'selected' : '' %> value="WA">WA</option>
		                </select>
		            </div>
		        </div>
		    </div> <!-- .form-row clearfix -->

		    <div class="form-row clearfix">
		        <div class="form-item">
		            <label>Phone</label>
		            <input type="text" class="text-input" name="life_assist[patient_phone]" value="<%= patient_phone %>">
		        </div>
		        <div class="form-item">
		            <label>Email</label>
		            <input type="text" class="text-input email" name="life_assist[patient_email]" value="<%= patient_email %>">
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
		                    <option <%= patient_method_of_contact == 'phone' ? 'selected' : '' %> value="phone">Phone</option>
		                    <option <%= patient_method_of_contact == 'email' ? 'selected' : '' %> value="email">Email</option>
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
		                <input type="radio" class="required" name="life_assist[patient_who_to_contact]" id="pat_who_to_contact1" value="person enquiring" <%= patient_who_to_contact != 'patient/client' ? 'checked' : '' %>>
		                <div class="fake-radio"></div>
		                You
		            </label>
		        </div>
		        <div class="form-item variable">
		            <label class="radio" for="pat_who_to_contact2">
		                <input type="radio" class="required" name="life_assist[patient_who_to_contact]" id="pat_who_to_contact2" value="patient/client" <%= patient_who_to_contact == 'patient/client' ? 'checked' : '' %>>
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
		                    <option <%= patient_interpreter != 'yes' ? 'selected' : '' %> value="no" selected>No</option>
		                    <option <%= patient_interpreter == 'yes' ? 'selected' : '' %> value="yes">Yes</option>
		                </select>
		            </div>
		        </div>
		        <div class="form-item <%= patient_interpreter != 'yes' ? 'disabled' : '' %>">
		            <label>Language</label>
		            <input type="text" class="text-input js-language" name="life_assist[patient_interpreter_language]" <%= patient_interpreter != 'yes' ? 'disabled' : '' %>  value="<%= patient_interpreter_language %>">
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
		                    <input type="checkbox" name="life_assist[patient_consent]" value="yes" class="required" <%= patient_consent == 'yes' ? 'checked' : '' %>>
		                    <span class="icon icon--check icon--dark-gray"></span>
		                </span>
		                <strong>YES</strong>, I have discussed with the consumer how and why certain information may be shared with other service providers. I am satisfied that this has been understood and that informed consent for the information to be shared as detailed has been given.
		            </label>
		        </div>
		    </div> <!-- .form-row clearfix -->

		</div> <!-- .extra-form-fields -->
	<% } %>


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
			<textarea name="life_assist[msg_comments]" cols="30" rows="10" class="text-input"><%= msg_comments %></textarea>
		</div>
	</div> <!-- .form-row clearfix -->



	<div class="form-row form-row-submit clearfix">

		<div class="form-item form-item--checkbox form-item--smaller">
			<label>
				I have read the lifeAssist privacy policy*
				<span class="fake-checkbox">
					<input type="checkbox" name="terms" value="yes" <%= terms === 'yes' ? 'checked' : '' %> class="required">
					<span class="icon icon--check icon--dark-gray"></span>
				</span>
			</label>
		</div>

		<div class="form-item form-item--smallprint">
			<div class="smallprint"><%= smallprint %></div>
		</div>

	</div> <!-- .form-row clearfix -->



	<div class="form-row form-row-submit clearfix">
		<div class="form-item form-item-action form-item--left">
			<button class="btn btn--orange" type="submit">
				<span class="btn-state-default">SUBMIT YOUR DETAILS</span>
				<span class="btn-state-sending"><img src="/templates/life_assist/img/site/icon_loader_orange.gif" width="16" height="16" alt=""></span>
				<span class="btn-state-done">THANK YOU</span>
			</button>
		</div>
	</div> <!-- .form-row clearfix -->


</form> <!-- .form -->