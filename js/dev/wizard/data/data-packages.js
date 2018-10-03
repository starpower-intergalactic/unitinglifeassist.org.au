define([], function(){

	var packages = [
	  {
	  	"id": 1,
	    "title":"Carer Recognition book",
	    "shortText":"Full of entertainment and special offers to reward Carers with the opportunity to go out and enjoy themselves at discounted rates.",
	    "fullText":""
	  },
	  {
	  	"id": 2,
	    "title":"Carer Support",
	    "shortText":"Counselling and information, including one-on-one support and connections to other services",
	    "fullText":""
	  },
	  {
	  	"id": 4,
	    "title":"Equipment purchase funding",
	    "shortText":"Realising Your Dream is our charitable fund which can assist our clients with one-off grants to help realise a particular dream or goal.",
	    "fullText":"Realising Your Dream is our charitable fund which can assist our clients with one-off grants for the purchase of equipment to help realise a particular dream or goal."
	  },
	  {
	  	"id": 5,
	    "title":"Disability Support Packages",
	    "shortText":"Long term and  short term packages including \"Individual Support Package\" management to support a person with a disability",
	    "fullText":"Long term and  short term packages including \"Individual Support Package\" management to support a person with a disability; catering for people aged 0-65 years."
	  },
	  {
	  	"id": 6,
	    "title":"Getting Connected with other Young Carers",
	    "shortText":"Social events, trips, outings and chance to get to know other young carers, share experiences and support each other.",
	    "fullText":""
	  },
	  {
	  	"id": 7,
	    "title":"HARP",
	    "shortText":"Hospital Admission Risk Program is for people with chronic diseases and complex needs aimed to reduce/eliminate avoidable hospital stays.",
	    "fullText":"Hospital Admission Risk Program is for  people with defined chronic diseases and complex needs. Integrated care services aimed to reduce/eliminate avoidable hospital stays."
	  },
	  {
	  	"id": 8,
	    "title":"Home Care Packages",
	    "shortText":"Care management packages to support older people, assessed as having low-high level care needs to remain living in their home and community.",
	    "fullText":""
	  },
	  {
	  	"id": 9,
	    "title":"Homeshare",
	    "shortText":"Matches older people or people with a disability, with homesharers to provide assistance in return for affordable accommodation",
	    "fullText":"Matches frail older people or people with a disability, with secure tenure in their home and  looking for help and companionship with people who are able to provide assistance in return for affordable accommodation"
	  },
	  {
	  	"id": 10,
	    "title":"Housing for the Aged",
	    "shortText":"Short-term care management and support for people aged 55+ living in Office of Housing accommodation, at immediate risk of being homeless. ",
	    "fullText":"Short-term episodic care management and outreach support for people living in Office of Housing accommodation and are at immediate risk of being homeless. Targets people aged 55+ with complex  needs."
	  },
	  {
	  	"id": 11,
	    "title":"In Home Respite",
	    "shortText":"Short term respite services provided in your own home",
	    "fullText":""
	  },
	  {
	  	"id": 12,
	    "title":"Linkages Packages",
	    "shortText":"Tailored packages of care and care management targeting both older people and people with a disability who have complex care needs",
	    "fullText":"A Home and Community Care (HACC) program targeting both older people and people with a disability  with complex care needs by providing tailored packages of care and care management."
	  },
	  {
	  	"id": 13,
	    "title":"Medium or Long Term assistance in my own home",
	    "shortText":"Respite and Carer support for up to 3 months at a time (medium term) or 12 months (long term)",
	    "fullText":"Respite and Carer support for up to 3 months at a time (medium term) or 12 months (long term),  to develop care plans, referrals, respite options and support for carers."
	  },
	  {
	  	"id": 14,
	    "title":"myLifeAssist",
	    "shortText":"Self-funded services, from one-off service to care planning with no waiting period or eligibility requirements.",
	    "fullText":"Self-funded:  Flexible, affordable in-home support tailored to the needs of the individual, their family and carers. Full range of services from total care co-ordination to one-off services, current and future need planning.  Immediate service with no waiting period or eligibility requirements."
	  },
	  {
	  	"id": 15,
	    "title":"One-on-one Carer Support",
	    "shortText":"Counselling and individual support for carers to help maintain their own health and wellbeing.",
	    "fullText":""
	  },
	  {
	  	"id": 16,
	    "title":"Quick Response Service",
	    "shortText":"In-home support after a 'trigger event' such as flu, fall or accident resulting in a stay in a private hospital or rehabilitation",
	    "fullText":"Quick Response Service provides in-home support following a 'trigger event' such as flu, a fall or an accident resulting in a stay in a private hospital or rehabilitation. Services can usually be provided within 48 hours of assessment, depending on eligibility."
	  },
	  {
	  	"id": 17,
	    "title":"Referral Services",
	    "shortText":"Guided referral service for anyone who wants to know about community support to remain living at home ",
	    "fullText":""
	  },
	  {
	  	"id": 18,
	    "title":"Respite Care Centre",
	    "shortText":"Direct and indirect respite services to carers of people (aged under 65) with moderate, severe or profound disabilities.",
	    "fullText":""
	  },
	  {
	  	"id": 19,
	    "title":"Services and Referrals for Carers",
	    "shortText":"Support services for carers, including CRCC (Commonwealth Respite and Carelink Centre) along with connections to local support networks.",
	    "fullText":""
	  },
	  {
	  	"id": 20,
	    "title":"Short Term assistance in my own home",
	    "shortText":"Respite and short-term Carer support, including 24 hour emergency services ",
	    "fullText":"Respite and short-term Carer support, including 24 hour emergency services for any carers covered under Commonwealth Respite and Carelink Centre, mental health, young carers and carers of people with severe and profound disability."
	  },
	  {
	  	"id": 21,
	    "title":"Short Term or Emergency Respite",
	    "shortText":"Commonwealth Respite and Carelink Centre (CRCC) is a 24 hour, 7 day a week respite service for carers and their families living in Eastern Melbourne",
	    "fullText":""
	  },
	  {
	  	"id": 22,
	    "title":"Short term Planning and Assessment",
	    "shortText":"Information and guidance for obtaining short term Assessment and Planning, connecting you with the most appropriate services for your needs",
	    "fullText":""
	  },
	  {
	  	"id": 99,
	    "title":"Other/Custom",
	    "shortText":"Should none of these options suit please make this box selection then fill in your details on the next page. One of our staff will contact you shortly to discuss in detail how we can assist you.",
	    "fullText":""
	  },
	  {
	  	"id": 999,
	  	"title": "NDIS",
	  	"shortText":"I'm looking for more information on NDIS services and planning."
	  }
	];

	return packages;
});