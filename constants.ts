// Blood groups
export const BLOOD_GROUPS = [
  "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
];

// Blood components
export const BLOOD_COMPONENTS = [
  "Whole Blood", "Packed Red Cells", "Plasma", "Platelets"
];

// Indian states
export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

// Blood type compatibility chart
export const BLOOD_COMPATIBILITY = [
  { type: "A+", donatesTo: ["A+", "AB+"], receivesFrom: ["A+", "A-", "O+", "O-"] },
  { type: "O+", donatesTo: ["O+", "A+", "B+", "AB+"], receivesFrom: ["O+", "O-"] },
  { type: "B+", donatesTo: ["B+", "AB+"], receivesFrom: ["B+", "B-", "O+", "O-"] },
  { type: "AB+", donatesTo: ["AB+"], receivesFrom: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
  { type: "A-", donatesTo: ["A+", "A-", "AB+", "AB-"], receivesFrom: ["A-", "O-"] },
  { type: "O-", donatesTo: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], receivesFrom: ["O-"] },
  { type: "B-", donatesTo: ["B+", "B-", "AB+", "AB-"], receivesFrom: ["B-", "O-"] },
  { type: "AB-", donatesTo: ["AB+", "AB-"], receivesFrom: ["A-", "B-", "AB-", "O-"] }
];

// Blood components information
export const BLOOD_COMPONENTS_INFO = {
  redCells: {
    name: "Packed Red Blood Cells",
    whatIsIt: "Blood collected straight from the donor into a blood bag and mixed with an anticoagulant is called whole blood. This collected whole blood is then centrifuged and red cells, platelets, and plasma are separated. The separated Red cells are mixed with a preservative to be called as packed red blood cells.",
    whoCanDonate: "You need to be 18-65 years old, weight 45kg or more and be fit and healthy.",
    usedFor: "Correction of severe anemia in a number of conditions and blood loss in case of child birth, surgery or trauma settings.",
    lastsFor: "Red cells can be stored for 42 days at 2-6 degree celsius.",
    howLongDoesItTake: "15-30 minutes to donate, including the pre-donation check-up.",
    howOften: "Male donors can donate again after 90 days and female donors can donate again after 120 days."
  },
  plasma: {
    name: "Plasma",
    whatIsIt: "The straw-coloured liquid in which red blood cells, white blood cells, and platelets float in is called plasma. Contains special nutrients which can be used to create 18 different type of medical products to treat many different medical conditions. Plasma can be obtained from the collected whole blood after red blood cells and platelets have been separated.",
    whoCanDonate: "The donation criteria is similar to that of red blood cell. However, for apheresis plasma collection minimum weight is 50 kgs.",
    usedFor: "Used for bleeding patients with coagulation factor deficiency such as hemophilia A and B, von willibrand disease etc. also used in cases of blood loss due to trauma.",
    lastsFor: "Plasma after separation if frozen below -30 degrees can be stored up to one year.",
    howLongDoesItTake: "15-30 minutes to donate including the pre-donation check-up.",
    howOften: "Similar to the red cell donation."
  },
  platelets: {
    name: "Platelets",
    whatIsIt: "These are cellular elements in blood which wedge together to help to clot and reduce bleeding. Always in high demand, Vital for people with low platelet count, like hematology and cancer patients.",
    whoCanDonate: "One can donate whole blood from which the blood centre will separate platelets from other components. Criteria similar to whole blood donation apply. Alternatively, one can donate using apheresis equipment where only platelets are collected and rest components are returned back to donate.",
    usedFor: "Conditions with very low platelet count such as Cancer, blood diseases, trauma, dengue etc.",
    lastsFor: "Can be stored for 5 days at 20-24 degree celsius.",
    howLongDoesItTake: "45-60 minutes to donate. 2-3 hours for pre-donation screening.",
    howOften: "Every 2 weeks but should not exceed more than 24 times in a year."
  }
};

// Donation steps
export const DONATION_STEPS = [
  {
    icon: "clock",
    title: "It Takes Only an Hour",
    description: "Donate blood, save lives! The entire donation process from registration to refreshments takes about an hour."
  },
  {
    icon: "heart",
    title: "Save Lives",
    description: "There is nothing better than saving a life. Every blood donor is a hero in someone's story."
  },
  {
    icon: "dollar-sign",
    title: "It Costs Nothing",
    description: "Give blood and stay healthy. Donating blood is completely free and helps you maintain good health."
  },
  {
    icon: "coffee",
    title: "Free Refreshments",
    description: "You will get free refreshments after donation. Donation of blood is safe and promotes overall health."
  }
];

// Quick actions
export const QUICK_ACTIONS = [
  {
    icon: "search",
    title: "Blood Availability Search",
    description: "Find available blood units near you based on blood group and location.",
    link: "/blood-availability"
  },
  {
    icon: "hospital",
    title: "Blood Bank Directory",
    description: "Locate blood banks and donation centers in your area with contact details.",
    link: "/blood-banks"
  },
  {
    icon: "calendar",
    title: "Blood Donation Camps",
    description: "Find upcoming blood donation camps and events near your location.",
    link: "/donation-camps"
  },
  {
    icon: "user-plus",
    title: "Donor Login / Registration",
    description: "Register as a donor or login to manage your donations and appointments.",
    link: "/auth"
  },
  {
    icon: "clipboard",
    title: "Register Blood Donation Camp",
    description: "Organize a blood donation camp in your community or organization.",
    link: "/register-camp"
  }
];
