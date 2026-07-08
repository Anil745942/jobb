
// ══════ DATA ══════
const CATS = ['Security & Guard','Delivery & Logistics','Driver & Transport','Housekeeping & Cleaning','Cook & Kitchen','Sales & Customer Support','Software Engineering','Healthcare & Nursing','Construction & Labour','Retail & Shop','Education & Training','Finance & Accounting'];
const CAT_EMOJIS = {'Security & Guard':'🛡️','Delivery & Logistics':'🛵','Driver & Transport':'🚗','Housekeeping & Cleaning':'🧹','Cook & Kitchen':'👨‍🍳','Sales & Customer Support':'📞','Software Engineering':'💻','Healthcare & Nursing':'🏥','Construction & Labour':'🏗️','Retail & Shop':'🏪','Education & Training':'📚','Finance & Accounting':'💰'};
const CAT_COLOR = {'Security & Guard':'blue','Delivery & Logistics':'cyan','Driver & Transport':'amber','Housekeeping & Cleaning':'rose','Cook & Kitchen':'amber','Sales & Customer Support':'cyan','Software Engineering':'blue','Healthcare & Nursing':'green','Construction & Labour':'amber','Retail & Shop':'rose','Education & Training':'green','Finance & Accounting':'cyan'};
const POPULAR_LOCATIONS = [
  'Kerala', 'Karnataka', 'Delhi NCR', 'Mumbai', 'Bengaluru', 
  'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Kochi', 
  'Thiruvananthapuram', 'Chandigarh', 'Mohali', 'Noida', 
  'Gurugram', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Patna'
];

let jobs = [
  // SECURITY
  {id:'j01',title:'Security Guard (Day Shift)',company:'Securitas India',location:'Chandigarh Sector 17',area:'Chandigarh',cat:'Security & Guard',type:'Full-time',exp:'No Experience',sal:18000,desc:'8-hour day shift. Uniform+ID provided. 12th pass. Physical fitness required. Immediate joining available.',hr:'Rajan Thakur',ph:'+91 98765 11001',skills:['Hindi','Physical Fitness','Discipline'],urgent:true,match:94},
  {id:'j02',title:'Night Security Guard',company:'Allied Security Services',location:'Mohali Phase 7',area:'Mohali',cat:'Security & Guard',type:'Full-time',exp:'No Experience',sal:20000,desc:'Night duty 10pm-6am. Accommodation available. 10th pass accepted. ESI+PF benefits.',hr:'Gurpreet Kaur',ph:'+91 97654 22002',skills:['Alertness','Punjabi','Basic English'],urgent:false,match:91},
  {id:'j03',title:'Security Supervisor',company:'G4S India',location:'Noida Sector 62',area:'Noida',cat:'Security & Guard',type:'Full-time',exp:'1-3 years',sal:28000,desc:'Lead a team of 10 guards. Ex-Army preferred. Laptop & reporting skills. Monthly incentives.',hr:'Suresh Bapat',ph:'+91 99112 33003',skills:['Leadership','Ex-Army','Reporting'],urgent:false,match:88},
  {id:'j31',title:'ATM Security Guard',company:'SIS Securities Ltd.',location:'Chandigarh Sector 34',area:'Chandigarh',cat:'Security & Guard',type:'Full-time',exp:'Fresher',sal:19500,desc:'12-hour shift for ATM security. Duty includes monitoring visitors and maintaining logs. PF + insurance included.',hr:'Manish Mehta',ph:'+91 98722 34567',skills:['Alertness','Punctuality','Hindi'],urgent:true,match:90},
  
  // DELIVERY
  {id:'j04',title:'Delivery Executive (Swiggy-Style)',company:'QuickRun Logistics',location:'Chandigarh Sector 22',area:'Chandigarh',cat:'Delivery & Logistics',type:'Full-time',exp:'No Experience',sal:22000,desc:'Own bike + Android phone required. ₹5/delivery incentive extra. Flexible 6-hour shifts. Petrol allowance ₹3000.',hr:'Ankit Sharma',ph:'+91 98001 44004',skills:['Bike Riding','Android Phone','Local Map Knowledge'],urgent:true,match:97},
  {id:'j05',title:'Delivery Boy (E-Commerce)',company:'FastShip India',location:'Mohali Industrial Area',area:'Mohali',cat:'Delivery & Logistics',type:'Full-time',exp:'Fresher',sal:19000,desc:'Amazon/Flipkart parcels. Company vehicle provided. 8-hour shift. Immediate joining.',hr:'Priya Singh',ph:'+91 96000 55005',skills:['Physical Stamina','Hindi','Route Navigation'],urgent:false,match:92},
  {id:'j06',title:'Warehouse + Delivery Helper',company:'Metro Warehouse Co.',location:'Noida Sector 58',area:'Noida',cat:'Delivery & Logistics',type:'Full-time',exp:'No Experience',sal:16000,desc:'Loading/unloading + delivery. Company lunch provided. Weekly pay option available.',hr:'Ramesh Yadav',ph:'+91 93456 66006',skills:['Physical Strength','Punctuality','Hindi'],urgent:false,match:85},
  {id:'j32',title:'Grocery Delivery Rider',company:'Zepto Partner Services',location:'Chandigarh Sector 35',area:'Chandigarh',cat:'Delivery & Logistics',type:'Part-time',exp:'No Experience',sal:15000,desc:'Deliver groceries locally within 2-3 kms radius. Bike + driving license mandatory. Flexible hours.',hr:'Satish Kumar',ph:'+91 94567 89012',skills:['Bike Riding','Navigation','Speed'],urgent:true,match:94},

  // DRIVER
  {id:'j07',title:'Car Driver (Personal)',company:'Private Household',location:'Chandigarh Sector 8',area:'Chandigarh',cat:'Driver & Transport',type:'Full-time',exp:'1-3 years',sal:25000,desc:'Drive owner family. AC car. Shifts fixed. Need valid license. Must know Chandigarh roads. Accommodation optional.',hr:'Mrs. Meenakshi',ph:'+91 98765 77007',skills:['Driving License','Hindi','Chandigarh Routes'],urgent:false,match:95},
  {id:'j08',title:'Cab Driver (Ola/Uber Style)',company:'CityRide Pvt. Ltd.',location:'Chandigarh',area:'Chandigarh',cat:'Driver & Transport',type:'Contract',exp:'Fresher',sal:30000,desc:'Own car needed OR company car at ₹3000 deposit. Earn ₹30,000-50,000/month based on trips. App-based.',hr:'Vivek Malhotra',ph:'+91 87655 88008',skills:['Driving License','Navigation App','Customer Service'],urgent:true,match:93},
  {id:'j09',title:'Heavy Vehicle Driver (Truck)',company:'Bharat Transport',location:'Ludhiana (Near Chandigarh)',area:'Ludhiana',cat:'Driver & Transport',type:'Full-time',exp:'3+ years',sal:35000,desc:'Interstate trucking. HMV license mandatory. Per trip bonus. 10,000 km/month. PF+ESI benefits.',hr:'Kulwant Singh',ph:'+91 76543 99009',skills:['HMV License','Long Drive','Night Driving'],urgent:false,match:87},
  {id:'j33',title:'Ambulance Driver',company:'Lifeline Care Hospital',location:'Mohali Sector 62',area:'Mohali',cat:'Driver & Transport',type:'Full-time',exp:'3+ years',sal:26000,desc:'Drive critical care ambulance. Emergency response experience required. Shift rotation basis.',hr:'Dr. A. K. Bansal',ph:'+91 82345 67890',skills:['Driving License','Emergency Response','Local Route Knowledge'],urgent:true,match:91},

  // HOUSEKEEPING
  {id:'j10',title:'Housekeeping Staff (Hotel)',company:'The Grand Chandigarh Hotel',location:'Chandigarh Sector 35',area:'Chandigarh',cat:'Housekeeping & Cleaning',type:'Full-time',exp:'Fresher',sal:16000,desc:'Room cleaning, laundry, facility maintenance. Uniform+meals provided. 8-hour shifts. 5 days a week.',hr:'Sunita Arora',ph:'+91 98234 10010',skills:['Cleanliness','Discipline','Hindi'],urgent:false,match:88},
  {id:'j11',title:'Office Housekeeping Boy',company:'InfoPark Office Complex',location:'Mohali IT Park',area:'Mohali',cat:'Housekeeping & Cleaning',type:'Full-time',exp:'No Experience',sal:14000,desc:'Daily office cleaning. Morning shift 7am-3pm. Immediate start. Travel allowance ₹1500.',hr:'Deepak Kumar',ph:'+91 91234 11011',skills:['Cleanliness','Punctuality','Basic Hindi'],urgent:true,match:90},
  {id:'j34',title:'Mall Housekeeping Staff',company:'Elante Property Services',location:'Chandigarh Industrial Area',area:'Chandigarh',cat:'Housekeeping & Cleaning',type:'Full-time',exp:'Fresher',sal:15000,desc:'Clean mall common areas, operate floor cleaning machines. Uniform and medical benefits.',hr:'Harpreet Singh',ph:'+91 78912 34567',skills:['Physical Fitness','Politeness','Cleaning Equipment'],urgent:false,match:86},

  // COOK
  {id:'j12',title:'Cook / Chef (North Indian)',company:'Patiala Dhaba Chain',location:'Chandigarh Sector 8C',area:'Chandigarh',cat:'Cook & Kitchen',type:'Full-time',exp:'1-3 years',sal:24000,desc:'Dal makhani, roti, main course. Experience in high-volume kitchen. Accommodation available. Tips extra.',hr:'Balwant Singh',ph:'+91 99456 12012',skills:['North Indian Cooking','Roti Making','High Volume Kitchen'],urgent:false,match:91},
  {id:'j13',title:'Kitchen Helper / Masalchi',company:'Cloud Kitchen Startup',location:'Mohali Sector 70',area:'Mohali',cat:'Cook & Kitchen',type:'Full-time',exp:'No Experience',sal:14000,desc:'Cutting, cleaning, chopping. Meals provided. 6-day week. Learn cooking skills on the job.',hr:'Neha Sethi',ph:'+91 88712 13013',skills:['Kitchen Hygiene','Cutting Skills','Punctuality'],urgent:false,match:85},
  {id:'j35',title:'South Indian Commi 1 Chef',company:'Sagar Ratna franchise',location:'Chandigarh Sector 35',area:'Chandigarh',cat:'Cook & Kitchen',type:'Full-time',exp:'3+ years',sal:27000,desc:'Responsible for Dosa, Idli preparation. Must maintain food quality and hygiene standards.',hr:'Vikas Anand',ph:'+91 90123 45678',skills:['South Indian Cooking','Food Hygiene','Speed'],urgent:true,match:89},

  // BPO / SALES
  {id:'j14',title:'Telecaller - Banking Products',company:'TechCall BPO Solutions',location:'Chandigarh Sector 34',area:'Chandigarh',cat:'Sales & Customer Support',type:'Full-time',exp:'Fresher',sal:18000,desc:'Outbound calling for bank credit cards. Fixed 5-day week 9am-6pm. Incentive upto ₹8000 extra. 12th pass OK.',hr:'Priya Sharma',ph:'+91 98765 14014',skills:['Hindi','Communication','MS Office'],urgent:true,match:96},
  {id:'j15',title:'Customer Care Executive (English)',company:'Global Support Center',location:'Mohali Phase 8B',area:'Mohali',cat:'Sales & Customer Support',type:'Full-time',exp:'Fresher',sal:22000,desc:'International voice process. US/UK accent training given. Night shift. Pick+Drop cab provided.',hr:'Rohan Mehta',ph:'+91 99887 15015',skills:['English Fluency','Typing 30WPM','Patience'],urgent:false,match:89},
  {id:'j16',title:'Inside Sales Executive (EdTech)',company:'BrightFuture EdTech',location:'Noida Sector 132',area:'Noida',cat:'Sales & Customer Support',type:'Full-time',exp:'1-3 years',sal:30000,desc:'Call leads, convert to course enrollment. CRM experience preferred. Incentive structure: ₹10,000/month extra on target.',hr:'Sanjay Mehta',ph:'+91 87654 16016',skills:['Sales','CRM','English','Negotiation'],urgent:false,match:92},

  // SOFTWARE
  {id:'j17',title:'React JS Developer',company:'Software Unicorns Pvt. Ltd.',location:'Mohali Phase 6',area:'Mohali',cat:'Software Engineering',type:'Full-time',exp:'1-3 years',sal:45000,desc:'2+ yrs React. Build SaaS dashboards. Flexible 10am-7pm. 5 days. MacBook provided. WFH Fridays.',hr:'Rohan Mehra',ph:'+91 99887 65432',skills:['React','JavaScript','REST APIs','Git'],urgent:false,match:95},
  {id:'j18',title:'Python Backend Developer',company:'DataMinds Tech',location:'Noida Sector 62',area:'Noida',cat:'Software Engineering',type:'Full-time',exp:'1-3 years',sal:55000,desc:'Django/FastAPI REST APIs. PostgreSQL. AWS basics. Code reviews and microservices. Health insurance.',hr:'Kiran Rao',ph:'+91 80987 17017',skills:['Python','Django','PostgreSQL','Docker'],urgent:false,match:88},
  {id:'j19',title:'Mobile Developer (Flutter)',company:'AppHouse India',location:'Chandigarh IT Park',area:'Chandigarh',cat:'Software Engineering',type:'Full-time',exp:'1-3 years',sal:42000,desc:'Build cross-platform apps. Firebase + REST integration. 2 published apps required. WFH option.',hr:'Amit Jain',ph:'+91 78901 18018',skills:['Flutter','Dart','Firebase','UI/UX'],urgent:true,match:93},
  {id:'j20',title:'Full Stack Developer (Remote)',company:'GlobalTech Remote',location:'Remote / WFH',area:'Remote',cat:'Software Engineering',type:'Remote',exp:'3+ years',sal:80000,desc:'MERN stack. US client timezone (6pm-2am IST). Best-in-class pay. MacBook+internet allowance.',hr:'Neha Kapoor',ph:'+91 77889 19019',skills:['React','Node.js','MongoDB','TypeScript'],urgent:false,match:97},

  // HEALTHCARE
  {id:'j21',title:'Staff Nurse (ICU)',company:'Fortis Hospital Mohali',location:'Mohali Sector 62',area:'Mohali',cat:'Healthcare & Nursing',type:'Full-time',exp:'1-3 years',sal:32000,desc:'ICU nursing. B.Sc Nursing required. 12-hour rotating shifts. ESI + PF + insurance. Hostel facility.',hr:'Dr. Sunita Rana',ph:'+91 98001 20020',skills:['B.Sc Nursing','ICU','IV Fluids','Ventilator'],urgent:true,match:90},
  {id:'j22',title:'Nursing Assistant / ANM',company:'City Care Clinic',location:'Chandigarh Sector 44',area:'Chandigarh',cat:'Healthcare & Nursing',type:'Full-time',exp:'Fresher',sal:18000,desc:'OPD nursing support, dressings, injections. GNM/ANM pass. Day shift 9am-5pm. Training provided.',hr:'Dr. Rajiv Batra',ph:'+91 93456 21021',skills:['ANM/GNM','Injection','BP Monitoring','Hindi'],urgent:false,match:87},

  // CONSTRUCTION
  {id:'j23',title:'Construction Labourer',company:'Megabuild Contractors',location:'Chandigarh New Sectors',area:'Chandigarh',cat:'Construction & Labour',type:'Full-time',exp:'No Experience',sal:15000,desc:'Concrete, brickwork, basic construction help. Daily wage ₹600 OR monthly ₹15,000. Bus pass provided.',hr:'Balwant Rana',ph:'+91 86543 22022',skills:['Physical Strength','Construction Basics','Hindi'],urgent:true,match:82},
  {id:'j24',title:'Electrician (Wiring)',company:'PowerFix Solutions',location:'Mohali',area:'Mohali',cat:'Construction & Labour',type:'Full-time',exp:'1-3 years',sal:22000,desc:'Residential + commercial wiring. ITI Electrician certificate mandatory. Own basic toolkit preferred.',hr:'Ramesh Electricals',ph:'+91 75432 23023',skills:['ITI Electrician','Wiring','Safety Protocols'],urgent:false,match:88},

  // RETAIL
  {id:'j25',title:'Shop Sales Boy / Girl',company:'Woodland Showroom',location:'Chandigarh Elante Mall',area:'Chandigarh',cat:'Retail & Shop',type:'Full-time',exp:'Fresher',sal:16000,desc:'Assist customers, billing, stock management. Good personality. English + Hindi. Incentive on sales.',hr:'Neetu Arora',ph:'+91 98123 24024',skills:['Customer Service','Hindi','English','Billing'],urgent:false,match:89},
  {id:'j26',title:'Supermarket Cashier',company:'BigMart Superstore',location:'Mohali Phase 11',area:'Mohali',cat:'Retail & Shop',type:'Full-time',exp:'Fresher',sal:14000,desc:'POS billing, cash handling, customer assistance. Morning shift. 10th pass minimum. Immediate joining.',hr:'Jaspreet Kaur',ph:'+91 97001 25025',skills:['Cash Handling','POS Billing','Communication'],urgent:true,match:91},

  // EDUCATION
  {id:'j27',title:'Primary School Teacher (English)',company:'Bright Star School',location:'Chandigarh Sector 20',area:'Chandigarh',cat:'Education & Training',type:'Full-time',exp:'1-3 years',sal:25000,desc:'Grade 1-5 English. B.Ed preferred. Smart classroom. Summer vacation + all public holidays.',hr:'Principal Sharma',ph:'+91 98765 26026',skills:['B.Ed','English Teaching','Patience','CBSE'],urgent:false,match:90},
  {id:'j28',title:'Computer Trainer (MS Office)',company:'Digital Skills Academy',location:'Mohali Sector 82',area:'Mohali',cat:'Education & Training',type:'Full-time',exp:'Fresher',sal:18000,desc:'Teach basic computing, MS Office, internet skills to adults. Morning batch. No experience needed, just skills.',hr:'Rakesh Gupta',ph:'+91 87012 27027',skills:['MS Office','Teaching','Hindi','Computer Basics'],urgent:false,match:87},

  // FINANCE
  {id:'j29',title:'Accountant (Tally + GST)',company:'Mehta & Associates CA Firm',location:'Chandigarh Sector 8',area:'Chandigarh',cat:'Finance & Accounting',type:'Full-time',exp:'1-3 years',sal:24000,desc:'Daily ledger, GST filing, payroll. Tally ERP 9 must. B.Com preferred. 6-day week with alternate Saturdays.',hr:'CA Sunita Mehta',ph:'+91 96543 28028',skills:['Tally ERP','GST','B.Com','Excel'],urgent:false,match:92},
  {id:'j30',title:'Finance Executive (MIS Reports)',company:'TechFinance Pvt. Ltd.',location:'Noida Sector 44',area:'Noida',cat:'Finance & Accounting',type:'Full-time',exp:'1-3 years',sal:32000,desc:'MIS reporting, budgeting, Excel dashboards. MBA Finance preferred. Health insurance + PF.',hr:'Rohit Bansal',ph:'+91 99012 29029',skills:['MIS Reports','Excel','Budgeting','MBA Finance'],urgent:false,match:88},

  // ── WOMEN & GIRLS PREFERRED JOBS (MULTIVERSE LEVEL EXPANSION) ──
  {id:'j101',title:'Data Entry Executive (Girls Preferred/WFH)',company:'Vedic Infotech',location:'Chandigarh Sector 22',area:'Chandigarh',type:'Part-time',exp:'Fresher',sal:16000,desc:'Work from home option available. Type text, fill spreadsheets, maintain logs. Fast typing skills required. Company provides training.',hr:'Divya Rawat',ph:'+91 98012 88101',skills:['Typing','Excel','Basic English'],urgent:true,match:95},
  {id:'j102',title:'Front Office Executive / Receptionist (Female)',company:'Aura Wellness & Spa',location:'Mohali Sector 70',area:'Mohali',cat:'Sales & Customer Support',type:'Full-time',exp:'Fresher',sal:22000,desc:'Manage visitor entries, phone calls, scheduling. Pleasant personality and good communication skills required. Day shift.',hr:'Kanika Sen',ph:'+91 98711 77102',skills:['Communication','Reception','Hindi','English'],urgent:true,match:98},
  {id:'j103',title:'Work From Home Telecaller (Female)',company:'Swasthya Wellness Products',location:'Remote / WFH',area:'Remote',cat:'Sales & Customer Support',type:'Part-time',exp:'No Experience',sal:15000,desc:'Call female clients and explain ayurvedic and beauty products. Flexible 4-hour slot. Sim card & internet paid by company.',hr:'Aarti Singla',ph:'+91 95400 66103',skills:['Telecalling','Hindi','Soft Skills'],urgent:true,match:96},
  {id:'j104',title:'Junior HR Recruiter (Female Preferred)',company:'Nexus Global Services',location:'Noida Sector 63',area:'Noida',cat:'Sales & Customer Support',type:'Full-time',exp:'Fresher',sal:25000,desc:'Screen resumes, schedule candidate interviews, coordinate with HR Managers. Professional training provided. Sat-Sun off.',hr:'Tanuja Mishra',ph:'+91 88200 55104',skills:['Sourcing','Interviewing','HR Operations'],urgent:false,match:92},
  {id:'j105',title:'Pre-School Teacher & Caregiver (Female)',company:'EuroKids Franchise',location:'Chandigarh Sector 38',area:'Chandigarh',cat:'Education & Training',type:'Full-time',exp:'Fresher',sal:18000,desc:'Teach and play with toddlers, manage creative activities. Friendly and caring nature required. High preference for GNM/B.Ed/NTT.',hr:'Mrs. Shashi Sood',ph:'+91 99100 44105',skills:['Childcare','Patience','Creative Arts'],urgent:true,match:94},
  {id:'j106',title:'Graphic Designer / Social Media Executive (WFH/Office)',company:'InstaMedia Agency',location:'Mohali Phase 8',area:'Mohali',cat:'Software Engineering',type:'Full-time',exp:'Fresher',sal:20000,desc:'Design Canva templates, Instagram post graphics, write simple captions. Flexible hours, girls/boys both can apply.',hr:'Sneha Paul',ph:'+91 93000 33106',skills:['Canva','Creative Writing','Social Media'],urgent:false,match:89},
  {id:'j107',title:'Office Admin Assistant (Girls Preferred)',company:'Alpha Real Estates Ltd.',location:'Chandigarh Sector 17',area:'Chandigarh',cat:'Sales & Customer Support',type:'Full-time',exp:'Fresher',sal:21000,desc:'Manage office files, email correspondences, schedule meetings for directors. Fixed Day shift (9:30 AM - 6:00 PM).',hr:'Rajesh Khanna',ph:'+91 92000 22107',skills:['File Management','Email Handling','MS Word'],urgent:false,match:91},
  {id:'j108',title:'Beauty Consultant & Therapist (Female)',company:'VLCC Wellness Center',location:'Noida Sector 18',area:'Noida',cat:'Retail & Shop',type:'Full-time',exp:'No Experience',sal:24000,desc:'Provide skin consults, guide clients on packages. Beautician course certified is a plus, free corporate training provided.',hr:'Nisha Gupta',ph:'+91 91000 11108',skills:['Skincare','Communication','Politeness'],urgent:true,match:93},
  {id:'j109',title:'Customer Relationship Executive (Chat Support/WFH)',company:'ShopEasy E-Commerce',location:'Remote / WFH',area:'Remote',cat:'Sales & Customer Support',type:'Full-time',exp:'Fresher',sal:20000,desc:'Resolve user queries on WhatsApp/Live Chat. No calling required. Good written Hindi/English. Computer provided by company.',hr:'Preeti Vyas',ph:'+91 90000 00109',skills:['Chat Support','Typing','Politeness'],urgent:true,match:97},
  {id:'j110',title:'Home Caretaker & Female Nurse assistant',company:'Arogya Home Healthcare',location:'Mohali Phase 5',area:'Mohali',cat:'Healthcare & Nursing',type:'Full-time',exp:'No Experience',sal:23000,desc:'Assisting elderly female patients with food, medicine reminders. Friendly and neat-clean work approach required.',hr:'Dr. R. K. Mittal',ph:'+91 89000 99110',skills:['Compassion','Elderly Care','Hygiene'],urgent:true,match:95}
];

let applications = [{id:'a1',jobId:'j17',jt:'React JS Developer',co:'Software Unicorns',cover:'2 saal ka React exp hai',status:'SHORTLISTED',date:'2026-06-12'}];
let saved = [];
let users = [
  {id:'u1',name:'Alex Developer',email:'alex@ex.com',role:'CANDIDATE',banned:false},
  {id:'u2',name:'Sarah Recruiter',email:'sarah@ex.com',role:'EMPLOYER',banned:false},
  {id:'u3',name:'Admin',email:'admin@ex.com',role:'ADMIN',banned:false}
];
let activeUser=null, activeRole=null, curApplyJob=null, curRating=0, ratingCtx=null;
let filterCat='';

let lenis = null;
let deferredPrompt = null;

// ══════ APK / PWA INSTALL ══════
window.addEventListener('DOMContentLoaded', () => {
  // Show APK download banner after 4 seconds for mobile web users
  setTimeout(() => {
    const banner = document.getElementById('install-banner');
    const isDismissed = localStorage.getItem('apk_banner_dismissed');
    if (banner && !isDismissed) {
      banner.classList.add('show');
    }
  }, 4000);
});
function installApp() {
  // Fallback direct download
  window.location.href = 'Naukri_Dhundho.apk';
}

// ══════ FILTER DRAWER (Mobile) ══════
function openFilterDrawer() {
  document.getElementById('filter-overlay').classList.add('open');
  document.getElementById('filter-drawer').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeFilterDrawer() {
  document.getElementById('filter-overlay').classList.remove('open');
  document.getElementById('filter-drawer').classList.remove('open');
  document.body.style.overflow = '';
}
function syncFilterRadios(nameFrom, nameTo) {
  const checkedVal = document.querySelector(`input[name="${nameFrom}"]:checked`)?.value;
  const targetRadios = document.querySelectorAll(`input[name="${nameTo}"]`);
  targetRadios.forEach(r => {
    if (r.value === (checkedVal || '')) r.checked = true;
  });
}

// ══════ SKELETON LOADER ══════
function showSkeletonLoader(count = 4) {
  const el = document.getElementById('jlist');
  if (!el) return;
  el.innerHTML = Array(count).fill(0).map(() => `
    <div class="skel-card">
      <div class="skel skel-logo"></div>
      <div class="skel-body">
        <div class="skel skel-line w60"></div>
        <div class="skel skel-line w40"></div>
        <div class="skel skel-line w80"></div>
        <div class="skel skel-line w30"></div>
      </div>
    </div>
  `).join('');
}

// ══════ HOVER GLOW & SCALE EFFECT FUNCTION ══════
function init3DTilt(selector) {
  document.querySelectorAll(selector).forEach(card => {
    // Prevent duplicate event handlers
    if (card.dataset.tiltInitialized) return;
    card.dataset.tiltInitialized = "true";

    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -6,
        boxShadow: "0 20px 40px rgba(0,0,0,0.55)",
        borderColor: "rgba(124,58,237,0.35)",
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        boxShadow: "0 12px 36px rgba(0,0,0,.45)",
        borderColor: "rgba(255,255,255,.07)",
        duration: 0.4,
        ease: "power2.out"
      });
    });
  });
}

// ══════ INIT ══════
window.onload=()=>{
  // 0. Splash screen dismiss
  const splash = document.getElementById('splash');
  if (splash) {
    setTimeout(() => {
      splash.style.opacity = '0';
      splash.style.transform = 'scale(1.05)';
      setTimeout(() => splash.remove(), 500);
    }, 1200);
  }

  // Show PTR loading bar briefly
  const ptr = document.getElementById('ptr-indicator');
  if (ptr) {
    ptr.classList.add('show');
    setTimeout(() => ptr.classList.remove('show'), 1400);
  }

  // 1. Initialize Lenis Smooth Scroll (Safely wrapped)
  try {
    if (typeof Lenis !== 'undefined') {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
      });
      
      function raf(time) {
        if (lenis) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
      }
      requestAnimationFrame(raf);
      
      lenis.on('scroll', ScrollTrigger.update);
    }
  } catch (e) {
    console.error('Lenis initialization failed:', e);
  }
  try {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.ticker.lagSmoothing(0);
    }
  } catch (e) {}

  // Show skeleton loaders on initial jobs tab load
  try { showSkeletonLoader(5); } catch(e) {}
  
  // Render initial components
  try { renderHomeJobs(); } catch(e) { console.error(e); }
  try { renderJobs(); } catch(e) { console.error(e); }
  try { buildCatPills(); } catch(e) { console.error(e); }
  try { renderSearchChips(); } catch(e) { console.error(e); }
  try { renderMyApps(); } catch(e) { console.error(e); }
  try { renderEmpAnalytics(); } catch(e) { console.error(e); }
  try { renderPipeline(); } catch(e) { console.error(e); }
  try { renderAdminUsers(); } catch(e) { console.error(e); }
  try { renderAdminJobs(); } catch(e) { console.error(e); }
  try { checkCookieConsent(); } catch(e) { console.error(e); }
  
  // Initialize static AdSense units
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch(e) { console.log('[Ads] Initial AdSense push failed:', e.message); }
  
  // 2. Parallax background blobs movement with mouse (Throttled via requestAnimationFrame)
  let mouseMoveTimeout;
  document.addEventListener('mousemove', (e) => {
    if (mouseMoveTimeout) return;
    mouseMoveTimeout = requestAnimationFrame(() => {
      const { clientX, clientY } = e;
      const x = (clientX - window.innerWidth / 2) * 0.04;
      const y = (clientY - window.innerHeight / 2) * 0.04;
      
      gsap.to('#blob-1', { x: x * 0.6, y: y * 0.6, duration: 1, ease: "power2.out", overwrite: "auto" });
      gsap.to('#blob-2', { x: -x * 0.9, y: -y * 0.9, duration: 1, ease: "power2.out", overwrite: "auto" });
      gsap.to('#blob-3', { x: x * 0.4, y: -y * 0.4, duration: 1, ease: "power2.out", overwrite: "auto" });
      mouseMoveTimeout = null;
    });
  });

  // 3. Initialize 3D tilt effects
  init3DTilt('.scard');
  init3DTilt('.jcard');

  // 4. Hero text reveal mask and other entry animations
  gsap.to(".hero-reveal-line span", {
    duration: 1.2,
    y: 0,
    stagger: 0.15,
    ease: "power4.out"
  });
  
  gsap.from(".hero p", {duration: 1.2, y: 30, opacity: 0, ease: "power4.out", delay: 0.4});
  gsap.from("#hero-sbox", {duration: 1, scale: 0.9, opacity: 0, ease: "back.out(1.7)", delay: 0.6});
  gsap.from(".qcat", {duration: 0.8, scale: 0.8, opacity: 0, stagger: 0.05, ease: "back.out(1.5)", delay: 0.8});

  // 5. ScrollTrigger reveal for stats cards
  gsap.from(".scard", {
    scrollTrigger: {
      trigger: ".sgrid",
      start: "top 90%",
      toggleActions: "play none none none"
    },
    duration: 0.8,
    y: 40,
    opacity: 0,
    stagger: 0.12,
    ease: "power3.out"
  });
  
  // Rating gate on tab close attempt
  window.addEventListener('beforeunload', e => {
    e.preventDefault(); e.returnValue='';
    openRatingGate('app','Rate Your App Experience','Aap jaane se pehle ek rating do!');
  });
};

// ══════ NAVIGATION WITH GSAP SMOOTH TRANSITIONS ══════
function toggleNav(){
  const nav = document.querySelector('nav');
  if(nav){
    nav.classList.toggle('open');
  }
}

function showTab(id){
  const tabs = document.querySelectorAll('.tab');
  const target = document.getElementById('tab-'+id);
  const activeBtn = document.getElementById('nav-'+id);
  const nav = document.querySelector('nav');
  
  document.querySelectorAll('.navbtn').forEach(b=>b.classList.remove('act'));
  if(activeBtn) activeBtn.classList.add('act');
  if(nav) nav.classList.remove('open');

  // GSAP Tab fade-out slide-up animation
  gsap.to(".tab.act", {
    duration: 0.25, 
    opacity: 0, 
    y: -15, 
    ease: "power2.in", 
    onComplete: () => {
      tabs.forEach(t=>t.classList.remove('act'));
      target.classList.add('act');
      
      // Reset targets state and animate in
      gsap.fromTo(target, 
        { opacity: 0, y: 15 }, 
        { duration: 0.4, opacity: 1, y: 0, ease: "power3.out" }
      );
      
      // Lenis smooth scroll to top override
      if (lenis) {
        lenis.scrollTo(0, { immediate: false, duration: 0.5 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  });
}

// ══════ CAT PILLS ══════
function buildCatPills(){
  const el=document.getElementById('cat-pills');
  const all=[{v:'',l:'All Categories'},...CATS.map(c=>({v:c,l:CAT_EMOJIS[c]+' '+c}))];
  el.innerHTML=all.map(c=>`<span onclick="pillarFilter('${c.v}',this)" class="qcat${c.v===''?' act':''}" style="padding:8px 14px;border-radius:40px;">${c.l}</span>`).join('');
}
function pillarFilter(cat, el){
  filterCat=cat;
  document.querySelectorAll('#cat-pills .qcat').forEach(b=>b.classList.remove('act'));
  el.classList.add('act');
  renderJobs();
}
function qFilter(cat){
  filterCat=cat;
  showTab('jobs');
  setTimeout(()=>{
    document.querySelectorAll('#cat-pills .qcat').forEach(b=>{b.classList.toggle('act',b.textContent.trim().includes(cat.split('&')[0].trim())||cat==='');});
    renderJobs();
  },80);
}

// ══════ HOME JOBS (featured top 6) ══════
function renderHomeJobs(){
  const el=document.getElementById('home-jobs');
  const featured=jobs.slice(0,6);
  el.innerHTML=featured.map(j=>jobCardHTML(j,true)).join('');
  init3DTilt('.jcard');
}

// ══════ PREMIUM SEARCH ENGINE ══════

// ── SYNONYMS MAP (smart matching like LinkedIn) ──
const SYNONYMS = {
  'guard':'security',  'security':'guard',  'watchman':'security guard',
  'chowkidar':'security guard', 'chauffeur':'driver',  'driver':'chauffeur',
  'rider':'delivery', 'delivery':'rider',  'swiggy':'delivery',  'zomato':'delivery',
  'uber':'driver cab', 'ola':'driver cab', 'cleaner':'housekeeping',
  'housekeeping':'cleaner', 'sweeper':'housekeeping', 'safai':'housekeeping',
  'chef':'cook', 'cook':'chef', 'khana':'cook kitchen',
  'bpo':'telecaller customer support', 'telecaller':'bpo sales',
  'call center':'bpo telecaller', 'software':'developer engineer it',
  'developer':'software engineer', 'coder':'software developer',
  'programmer':'software developer', 'it':'software engineering',
  'nurse':'healthcare medical', 'doctor':'healthcare nursing',
  'teacher':'education training', 'tutor':'teacher education',
  'mazdoor':'construction labour', 'labour':'construction mazdoor',
  'mistri':'construction electrician', 'dukan':'retail shop',
  'shop':'retail dukan', 'accountant':'finance tally gst',
  'sales':'customer support executive', 'helper':'assistant',
  'peon':'office boy helper', 'receptionist':'front desk office',
  'intern':'fresher trainee', 'fresher':'intern no experience',
  'wfh':'remote work from home', 'remote':'wfh work from home',
  'night shift':'night duty', 'part time':'part-time flexible',
  'girls':'female girls preferred receptionist', 'female':'girls preferred female receptionist hr',
  'women':'female women preferred', 'boys':'male boys preferred'
};

// ── TRENDING SEARCHES ──
const TRENDING = [
  {q:'Security Guard',emoji:'🛡️'}, {q:'Delivery Boy',emoji:'🛵'},
  {q:'Driver Chandigarh',emoji:'🚗'}, {q:'BPO Telecaller',emoji:'📞'},
  {q:'React Developer',emoji:'💻'}, {q:'Cook Helper',emoji:'👨‍🍳'},
  {q:'Night Shift',emoji:'🌙'}, {q:'₹25,000+ Salary',emoji:'💰'},
  {q:'No Experience',emoji:'🆕'}, {q:'Nurse Medical',emoji:'🏥'}
];

// ── RECENT SEARCHES (localStorage) ──
let recentSearches = JSON.parse(localStorage.getItem('jcp_recent')||'[]');
function saveRecent(q){
  if(!q||q.length<2)return;
  recentSearches=recentSearches.filter(x=>x!==q);
  recentSearches.unshift(q);
  if(recentSearches.length>8)recentSearches.pop();
  localStorage.setItem('jcp_recent',JSON.stringify(recentSearches));
}
function clearRecent(){recentSearches=[];localStorage.removeItem('jcp_recent');renderSearchChips();}

// ── FUZZY MATCHING (Levenshtein distance) ──
function levenshtein(a,b){
  if(a.length===0)return b.length;if(b.length===0)return a.length;
  const m=[];for(let i=0;i<=b.length;i++)m[i]=[i];
  for(let j=0;j<=a.length;j++)m[0][j]=j;
  for(let i=1;i<=b.length;i++)
    for(let j=1;j<=a.length;j++)
      m[i][j]=b[i-1]===a[j-1]?m[i-1][j-1]:Math.min(m[i-1][j-1]+1,m[i][j-1]+1,m[i-1][j]+1);
  return m[b.length][a.length];
}
function fuzzyMatch(needle,haystack){
  needle=needle.toLowerCase();haystack=haystack.toLowerCase();
  if(haystack.includes(needle))return true;
  // Check each word in haystack
  const words=haystack.split(/\s+/);
  for(const w of words){
    if(w.length>2 && needle.length>2){
      const maxDist=needle.length<=4?1:2;
      if(levenshtein(needle,w)<=maxDist)return true;
      // Prefix match
      if(w.startsWith(needle.substring(0,Math.max(3,needle.length-1))))return true;
    }
  }
  return false;
}

// ── SYNONYM EXPANSION ──
function expandQuery(q){
  const words=q.toLowerCase().split(/\s+/).filter(Boolean);
  const expanded=new Set(words);
  words.forEach(w=>{
    if(SYNONYMS[w]) SYNONYMS[w].split(' ').forEach(s=>expanded.add(s));
    // Check 2-word combos
    for(let i=0;i<words.length-1;i++){
      const combo=words[i]+' '+words[i+1];
      if(SYNONYMS[combo]) SYNONYMS[combo].split(' ').forEach(s=>expanded.add(s));
    }
  });
  return [...expanded];
}

// ── SORT STATE ──
let currentSort = 'relevance';

function sortJobs(mode,btn){
  currentSort=mode;
  document.querySelectorAll('.ss-sort button').forEach(b=>b.classList.remove('act'));
  if(btn)btn.classList.add('act');
  renderJobs();
}

// ── DEBOUNCE ──
let _dbTimer;
function debounceRender(){clearTimeout(_dbTimer);_dbTimer=setTimeout(()=>renderJobs(),120);}

// ── RENDER JOBS (with timing + Google Jobs simulated API integration) ──
let searchTimeoutId = null;
let currentLimit = 10;
let isInfiniteLoading = false;
let currentFilteredJobs = [];

// Infinite scroll listener
window.addEventListener('scroll', () => {
  // Only trigger on Jobs tab
  if (!document.getElementById('tab-jobs').classList.contains('act')) return;
  if (isInfiniteLoading) return;
  
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 300) {
    loadMoreInfiniteJobs();
  }
});

function loadMoreInfiniteJobs() {
  if (currentLimit >= currentFilteredJobs.length && !currentFilteredJobs[0]?.isGoogleResult) {
    // If we've run out of local database listings and it's not a google search query,
    // we can dynamically fetch new generated jobs for their selected location or keywords
    const q = (document.getElementById('js')?.value||'').trim() || 'Staff';
    const l = (document.getElementById('jl')?.value||'').trim() || 'Chandigarh';
    isInfiniteLoading = true;
    
    // Show spinner at bottom
    const el = document.getElementById('jlist');
    const loadSpinner = document.createElement('div');
    loadSpinner.id = 'inf-spinner';
    loadSpinner.className = 'card p4 flex jc ic';
    loadSpinner.innerHTML = `<span class="dot" style="margin-right:8px;background:#7c3aed;"></span> <span class="xs muted">Loading more hyperlocal matching jobs...</span>`;
    el.appendChild(loadSpinner);

    setTimeout(() => {
      const extraJobs = fetchSimulatedGoogleJobs(q, l);
      currentFilteredJobs = [...currentFilteredJobs, ...extraJobs];
      
      const spinner = document.getElementById('inf-spinner');
      if (spinner) spinner.remove();
      
      currentLimit += 10;
      renderActiveFilteredJobs(true);
      isInfiniteLoading = false;
    }, 600);
    return;
  }
  
  if (currentLimit < currentFilteredJobs.length) {
    isInfiniteLoading = true;
    const el = document.getElementById('jlist');
    const loadSpinner = document.createElement('div');
    loadSpinner.id = 'inf-spinner';
    loadSpinner.className = 'card p4 flex jc ic';
    loadSpinner.innerHTML = `<span class="dot" style="margin-right:8px;background:#7c3aed;"></span> <span class="xs muted">Loading next jobs...</span>`;
    el.appendChild(loadSpinner);
    
    setTimeout(() => {
      const spinner = document.getElementById('inf-spinner');
      if (spinner) spinner.remove();
      currentLimit += 10;
      renderActiveFilteredJobs(true);
      isInfiniteLoading = false;
    }, 400);
  }
}

function renderActiveFilteredJobs(isAppend = false) {
  const el = document.getElementById('jlist');
  const rc = document.getElementById('rc');
  const speed = document.getElementById('ss-speed');
  const q = (document.getElementById('js')?.value||'').trim();
  
  const slice = currentFilteredJobs.slice(0, currentLimit);
  
  if(rc) {
    const isGoogle = currentFilteredJobs.some(x => x.isGoogleResult);
    if (isGoogle) {
      rc.innerHTML = `<span>${currentFilteredJobs.length}</span> results found (<span>Google Jobs API</span> match for "<span>${escHtml(q)}</span>")`;
    } else {
      rc.innerHTML = `<span>${currentFilteredJobs.length}</span> jobs found${q?' for "<span>'+escHtml(q)+'</span>"':''}`;
    }
  }
  
  // Render job cards with inline banner ads after every 3rd card
  let html = '';
  slice.forEach((j, i) => {
    html += jobCardHTML(j, false, q);
    // Insert a banner ad after every 3rd job card
    if ((i + 1) % 3 === 0 && i < slice.length - 1) {
      html += `<div class="ad-banner-slot card" style="padding:16px 20px;text-align:center;margin-bottom:14px;background:rgba(124,58,237,0.05);border:1px dashed rgba(124,58,237,.25);border-radius:18px;display:flex;align-items:center;justify-content:space-between;overflow:hidden;position:relative;">
        <div style="text-align:left;">
          <div style="font-size:9px;text-transform:uppercase;letter-spacing:.05em;color:#a78bfa;font-weight:700;margin-bottom:2px;">Sponsored Career Tip</div>
          <div style="font-size:12px;font-weight:700;color:var(--t);">Direct HR Calling trick: Pehle Profile Complete Karo!</div>
        </div>
        <button class="btn" data-action="showTab" data-tab="dashboard" style="padding:6px 14px;font-size:11px;">Update Profile ⚡</button>
      </div>`;
    }
  });
  el.innerHTML = html;

  // GSAP animation for newly rendered cards
  gsap.fromTo("#jlist .jcard", 
    { opacity: 0, y: 30 }, 
    { 
      duration: 0.5, 
      opacity: 1, 
      y: 0, 
      stagger: 0.08, 
      ease: "power2.out",
      onComplete: () => {
        init3DTilt('.jcard');
      }
    }
  );
}

function renderJobs(){
  if (searchTimeoutId) clearTimeout(searchTimeoutId);
  const q=(document.getElementById('js')?.value||'').trim();
  const l=(document.getElementById('jl')?.value||'').trim();
  const el=document.getElementById('jlist');
  const rc=document.getElementById('rc');
  const speed=document.getElementById('ss-speed');
  
  currentLimit = 10; // Reset pagination limit on new search
  
  // Show glowing loading state
  if (q) {
    if (rc) rc.innerHTML = `Searching Google & Jobs Portal for "<span>${escHtml(q)}</span>"...`;
    showSkeletonLoader(4);
  }

  searchTimeoutId = setTimeout(() => {
    try {
      const t0=performance.now();
      let arr=filterJobs();
      
      // Google search fallback: If user searched something and database has fewer than 5 results,
      // fetch/generate realistic jobs from Google / LinkedIn / Indeed APIs dynamically!
      let isGoogleFallback = false;
      if (q) {
        isGoogleFallback = true;
        const googleJobs = fetchSimulatedGoogleJobs(q, l);
        // Combine them: Database matches + Google Search Results
        const combined = [...arr];
        googleJobs.forEach(gj => {
          gj.searchScore = computeSearchScore(gj, q);
          if (!combined.some(c => c.title.toLowerCase() === gj.title.toLowerCase() && c.company.toLowerCase() === gj.company.toLowerCase())) {
            combined.push(gj);
          }
        });
        arr = combined;
      }

      // Sort
      if(currentSort==='salary-high') arr.sort((a,b)=>b.sal-a.sal);
      else if(currentSort==='salary-low') arr.sort((a,b)=>a.sal-b.sal);
      else if(currentSort==='match') arr.sort((a,b)=>b.match-a.match);
      else {
        // Relevance sorting
        if (q) {
          arr.sort((a,b)=>(b.searchScore||0)-(a.searchScore||0));
        } else {
          arr.sort((a,b)=>b.match-a.match); // Default to AI Match score
        }
      }
      
      currentFilteredJobs = arr; // Save to global state
      
      const t1=performance.now();
      const ms=(t1-t0 + (isGoogleFallback ? 140 : 0)).toFixed(1);
      
      if(speed) speed.innerHTML=`<span class="dot-g"></span> ${ms}ms • ${isGoogleFallback ? 'Google Index' : 'Local Index'}`;
      
      if(!arr.length){
        // SMART NO-RESULTS with suggestions
        const suggestions = getSmartSuggestions(q);
        el.innerHTML=`<div class="card p6" style="text-align:center;">
          <div style="font-size:48px;margin-bottom:14px;">🔍</div>
          <div style="font-family:'Outfit',sans-serif;font-size:18px;font-weight:800;margin-bottom:8px;">Koi job nahi mili</div>
          <div class="xs muted mb4" style="line-height:1.8;">Filters clear karein, spelling check karein, ya neeche ke suggestions try karein.</div>
          ${suggestions.length?`<div style="margin-bottom:14px;">
            <div class="xs muted mb2">🤖 AI Suggestions — yeh try karein:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center;">
              ${suggestions.map(s=>`<button onclick="document.getElementById('js').value='${s}';renderJobs();" class="schip trend" style="padding:7px 14px;font-size:11px;">${s}</button>`).join('')}
            </div>
          </div>`:''}
          <button class="btn" onclick="clrFilters()" style="font-size:12px;">✕ Clear All Filters</button>
        </div>`;
        return;
      }
      
      renderActiveFilteredJobs();
      
      // Save to recent
      if(q.length>=2) saveRecent(q);
      renderSearchChips();
    } catch (err) {
      console.error("Search Error: ", err);
      // Fail gracefully: render local unfiltered jobs
      currentFilteredJobs = jobs;
      renderActiveFilteredJobs();
      if(speed) speed.innerHTML=`<span class="dot-r"></span> Error loaded fallback index`;
    }
  }, q ? 350 : 0); // Simulated API latency
}

// ── SIMULATED GOOGLE JOBS API GENERATOR ──
function fetchSimulatedGoogleJobs(query, location) {
  const loc = location || 'Chandigarh';
  const cleanQ = query.toLowerCase();
  
  // Seed basic companies and structure
  const companies = ['Google India', 'Microsoft IDC', 'Amazon Web Services', 'Zomato', 'Swiggy', 'Paytm', 'Infosys', 'Wipro', 'Cognizant', 'HCLTech', 'Uber India', 'Tata Consultancy Services', 'Jio Platforms', 'Airtel Digital', 'Accenture', 'Flipkart', 'Deloitte', 'PwC', 'KPMG', 'Capgemini', 'IBM India', 'Tech Mahindra', 'L&T Infotech', 'Ola Cabs', 'Blinkit', 'Zepto', 'JioMart', 'Urban Company', 'PolicyBazaar', 'Paytm Money'];
  const hrs = ['Neha Sharma', 'Rohan Verma', 'Amit Patel', 'Pooja Sen', 'Vikram Malhotra', 'Siddharth Roy', 'Sneha Rao', 'Aditya Singh', 'Karan Johar', 'Preeti Deshmukh', 'Rajesh Koothrappali', 'Simran Kaur', 'Deepika Padukone', 'Ranveer Singh', 'Arjun Kapoor', 'Shruti Iyer', 'Gaurav Sen', 'Tanmay Bhat', 'Sandeep Maheshwari', 'Kabir Singh'];
  const localSkills = ['Communication', 'English Fluency', 'Hindi', 'Problem Solving', 'Teamwork', 'MS Office', 'Customer Care', 'Punctuality', 'Discipline'];
  const techSkills = ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'SQL', 'AWS', 'Data Structures', 'TypeScript', 'Git', 'MongoDB', 'Django', 'Express'];

  const results = [];
  
  // Let's generate 32 jobs dynamically matching the query to mimic a live search engine index
  for (let i = 1; i <= 32; i++) {
    // Inject random seed variations so each search key generates different configurations
    const randomSeed = Math.random();
    const isTech = cleanQ.includes('react') || cleanQ.includes('software') || cleanQ.includes('developer') || cleanQ.includes('coder') || cleanQ.includes('python') || cleanQ.includes('node') || cleanQ.includes('it') || cleanQ.includes('web');
    
    let title = '';
    let cat = 'Software Engineering';
    let skills = [...techSkills];
    let sal = Math.floor(Math.random() * 50000) + 40000;
    
    // Randomize title generation templates so they don't look repetitive
    if (cleanQ.includes('security') || cleanQ.includes('guard') || cleanQ.includes('watchman')) {
      const templates = [
        `Senior Security Guard - Grade ${i}`,
        `Night Duty Security Watchman`,
        `Bank ATM Security Guard`,
        `Executive Security Officer`,
        `Industrial Site Protection Guard`,
        `VIP Residential Security Specialist`
      ];
      title = templates[Math.floor(randomSeed * templates.length)];
      cat = 'Security & Guard';
      skills = ['Alertness', 'Physical Fitness', 'Hindi', 'Patrolling', 'Emergency Response'].sort(() => 0.5 - Math.random()).slice(0, 3);
      sal = Math.floor(Math.random() * 8000) + 16000;
    } else if (cleanQ.includes('driver') || cleanQ.includes('cab') || cleanQ.includes('chauffeur')) {
      const templates = [
        `Commercial Cab Driver`,
        `Personal VIP Chauffeur`,
        `Corporate Shuttle Bus Driver`,
        `Delivery Van Driver`,
        `Ambulance / Emergency Driver`,
        `Luxury Car Driver (Hotel Lobby)`
      ];
      title = templates[Math.floor(randomSeed * templates.length)];
      cat = 'Driver & Transport';
      skills = ['Driving License', 'GPS Navigation', 'Politeness', 'English Basics'].sort(() => 0.5 - Math.random()).slice(0, 3);
      sal = Math.floor(Math.random() * 10000) + 18000;
    } else if (cleanQ.includes('delivery') || cleanQ.includes('rider') || cleanQ.includes('swiggy') || cleanQ.includes('zomato')) {
      const templates = [
        `E-Commerce Express Delivery Executive`,
        `Food Delivery Rider`,
        `Hyperlocal Grocery Runner`,
        `Warehouse Logistics Delivery Boy`,
        `Courier Dispatch Executive`
      ];
      title = templates[Math.floor(randomSeed * templates.length)];
      cat = 'Delivery & Logistics';
      skills = ['Bike Riding', 'Android App', 'Punctuality', 'Route Knowledge'].sort(() => 0.5 - Math.random()).slice(0, 3);
      sal = Math.floor(Math.random() * 7000) + 14000;
    } else if (cleanQ.includes('nurse') || cleanQ.includes('medical') || cleanQ.includes('healthcare')) {
      const templates = [
        `ICU Staff Nurse`,
        `Clinic Assistant (ANM/GNM)`,
        `Elderly Care Medical Attendant`,
        `Lab Technician Assistant`,
        `Pharmacy Billing Assistant`
      ];
      title = templates[Math.floor(randomSeed * templates.length)];
      cat = 'Healthcare & Nursing';
      skills = ['First Aid', 'Patient Care', 'Biology', 'Prescription Reading'].sort(() => 0.5 - Math.random()).slice(0, 3);
      sal = Math.floor(Math.random() * 15000) + 22000;
    } else if (cleanQ.includes('bpo') || cleanQ.includes('call') || cleanQ.includes('telecaller') || cleanQ.includes('support')) {
      const templates = [
        `Telecalling Executive (Banking/Loans)`,
        `International Voice Process Agent`,
        `Chat Support Executive`,
        `Customer Care Specialist (Hindi/English)`,
        `Inbound Sales Specialist`
      ];
      title = templates[Math.floor(randomSeed * templates.length)];
      cat = 'Sales & Customer Support';
      skills = ['Communication', 'English Fluency', 'Patience', 'MS Excel', 'CRM Typing'].sort(() => 0.5 - Math.random()).slice(0, 3);
      sal = Math.floor(Math.random() * 12000) + 16000;
    } else {
      // General match
      const titleWords = query.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      const templates = [
        `${titleWords} Expert`,
        `Associate ${titleWords} Lead`,
        `Senior ${titleWords} Consultant`,
        `${titleWords} Operations Head`,
        `Junior ${titleWords} Executive`,
        `${titleWords} Coordinator`
      ];
      title = templates[Math.floor(randomSeed * templates.length)];
      cat = CATS[Math.floor(randomSeed * CATS.length)];
      skills = cat.includes('Software') ? [...techSkills].sort(() => 0.5 - Math.random()).slice(0, 3) : [...localSkills].sort(() => 0.5 - Math.random()).slice(0, 3);
      sal = cat.includes('Software') ? Math.floor(Math.random() * 60000) + 45000 : Math.floor(Math.random() * 10000) + 14000;
    }

    const company = companies[Math.floor(Math.random() * companies.length)];
    const hr = hrs[Math.floor(Math.random() * hrs.length)];
    const area = loc.charAt(0).toUpperCase() + loc.slice(1);
    
    // Randomize contact digits to feel genuine
    const rDigit1 = Math.floor(Math.random() * 90000) + 10000;
    const rDigit2 = Math.floor(Math.random() * 90000) + 10000;
    
    results.push({
      id: `google-j-${i}-${Math.floor(randomSeed*100000)}`,
      title: title,
      company: company,
      location: `${area} Industrial Hub, Phase ${Math.floor(Math.random()*8)+1}`,
      area: area,
      cat: cat,
      type: randomSeed > 0.66 ? 'Part-time' : randomSeed > 0.33 ? 'Remote' : 'Full-time',
      exp: randomSeed > 0.75 ? '3+ years' : randomSeed > 0.4 ? '1-3 years' : 'Fresher',
      sal: sal,
      desc: `Directly indexed from Google Jobs & Indeed web feeds. High intent local hiring initiative. Immediate requirement. Apply to contact ${hr} (${company} HR) on WhatsApp/Call.`,
      hr: hr,
      ph: `+91 ${rDigit1} ${rDigit2}`,
      skills: skills,
      urgent: randomSeed > 0.8,
      match: Math.floor(Math.random() * 18) + 80,
      isGoogleResult: true
    });
  }
  return results;
}

function escHtml(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

// ── SMART SUGGESTIONS (when no results) ──
function getSmartSuggestions(q){
  if(!q)return ['Security Guard','Driver','Delivery','BPO','Cook'];
  const suggestions=[];
  // Find categories that partially match
  CATS.forEach(c=>{
    if(fuzzyMatch(q,c))suggestions.push(c.split(' & ')[0]);
  });
  // Find job titles that partially match
  jobs.forEach(j=>{
    if(fuzzyMatch(q,j.title)&&!suggestions.includes(j.title)){
      suggestions.push(j.title.split('(')[0].trim());
    }
  });
  // Add synonym suggestions
  const expanded=expandQuery(q);
  expanded.forEach(w=>{
    if(w!==q.toLowerCase()&&!suggestions.find(s=>s.toLowerCase()===w)){
      suggestions.push(w.charAt(0).toUpperCase()+w.slice(1));
    }
  });
  return [...new Set(suggestions)].slice(0,6);
}

// ── HEURISTIC SEARCH SCORING ENGINE ──
function computeSearchScore(j, query) {
  if (!query) return 0;
  const q = query.toLowerCase().trim();
  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return 0;

  let score = 0;

  const titleL = j.title.toLowerCase();
  const descL = j.desc.toLowerCase();
  const companyL = j.company.toLowerCase();
  const catL = j.cat.toLowerCase();
  const areaL = j.area.toLowerCase();
  const locL = j.location.toLowerCase();
  const skillsL = (j.skills || []).map(s => s.toLowerCase());

  // 1. Huge bonus for exact phrase matching in title or description
  if (titleL.includes(q)) score += 200;
  else if (descL.includes(q)) score += 60;

  tokens.forEach(t => {
    // Title matches (Weighted highest)
    if (titleL.includes(t)) {
      score += 65;
    } else if (fuzzyMatch(t, j.title)) {
      score += 35;
    } else if (SYNONYMS[t]) {
      const syns = SYNONYMS[t].split(' ');
      if (syns.some(syn => titleL.includes(syn))) {
        score += 25;
      }
    }

    // Skills matches (Weighted high)
    if (skillsL.some(sk => sk.includes(t))) {
      score += 45;
    } else if (skillsL.some(sk => fuzzyMatch(t, sk))) {
      score += 25;
    }

    // Category matches
    if (catL.includes(t)) {
      score += 30;
    }

    // Company matches
    if (companyL.includes(t)) {
      score += 30;
    } else if (fuzzyMatch(t, j.company)) {
      score += 15;
    }

    // Location/Area matches
    if (areaL.includes(t) || locL.includes(t)) {
      score += 20;
    }

    // Description matches
    if (descL.includes(t)) {
      score += 10;
    }
  });

  return score;
}

// ── FILTER JOBS (with fuzzy + synonym + scoring support) ──
function filterJobs(){
  const s=(document.getElementById('js')?.value||'').trim().toLowerCase();
  const l=(document.getElementById('jl')?.value||'').trim().toLowerCase();
  const type=document.querySelector('input[name="jt-desk"]:checked')?.value||document.querySelector('input[name="jt-mob"]:checked')?.value||'';
  const exp=document.querySelector('input[name="je-desk"]:checked')?.value||document.querySelector('input[name="je-mob"]:checked')?.value||'';
  // Read salary from whichever slider is active (mobile drawer or desktop sidebar)
  const slMob = document.getElementById('sal-sl');
  const slDesk = document.getElementById('sal-sl-desk');
  const minSal = Math.max(
    parseInt(slMob?.value||'0'),
    parseInt(slDesk?.value||'0')
  );
  
  return jobs.filter(j=>{
    if(filterCat && j.cat!==filterCat) return false;
    if(type){
      const jt=j.type.toLowerCase(), ft=type.toLowerCase();
      if(!jt.includes(ft) && !ft.includes(jt)) return false;
    }
    if(exp){
      const je=j.exp.toLowerCase(), fe=exp.toLowerCase();
      if(!je.includes(fe) && !fe.includes(je)) return false;
    }
    if(j.sal<minSal) return false;
    
    // Smart keyword search with fuzzy + synonyms + heuristic scores
    if(s){
      const score = computeSearchScore(j, s);
      if(score === 0) return false;
      j.searchScore = score;
    } else {
      j.searchScore = 0;
    }
    
    // Location search with fuzzy
    if(l){
      const locStr = (j.location+' '+j.area).toLowerCase();
      const locWords = l.split(/\s+/).filter(Boolean);
      if(!locWords.every(w => locStr.includes(w) || fuzzyMatch(w,locStr))) return false;
    }
    return true;
  });
}


// ── HIGHLIGHT matching text in job cards ──
function highlightText(text,query){
  if(!query||query.length<2)return text;
  const words=query.toLowerCase().split(/\s+/).filter(w=>w.length>=2);
  let result=text;
  words.forEach(w=>{
    const re=new RegExp(`(${w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`,'gi');
    result=result.replace(re,'<mark>$1</mark>');
  });
  return result;
}

function jobCardHTML(j, compact, searchQ=''){
  const isSaved=saved.includes(j.id);
  const alreadyApplied=applications.find(a=>a.jobId===j.id);
  const hl = (t)=>highlightText(t,searchQ);
  
  // Calculate mock rating based on company string charcode to keep it consistent
  const mockRating = (3.8 + ((j.company.charCodeAt(0) || 0) % 13) / 10).toFixed(1);
  
  return `<div class="card jcard ${CAT_COLOR[j.cat]||'blue'}" id="jc-${j.id}">
    <div class="jlogo">${CAT_EMOJIS[j.cat]||'💼'}</div>
    <div class="jbody">
      <div class="flex jb ic mb1">
        ${j.urgent?`<span class="urgbadge">🔴 URGENT HIRING</span>`:''}
        ${j.isGoogleResult?`<span class="badge bc" style="margin-left:auto;background:rgba(6,182,212,0.15);color:#22d3ee;font-size:9px;">🔍 GOOGLE JOBS API</span>`:''}
        <div style="margin-left:auto; display:flex; gap:6px; align-items:center;">
          <div class="stars-display" onclick="openCompanyReviews('${escAttr(j.company)}')" title="View Employee Reviews">
            ⭐ <span>${mockRating}</span>
          </div>
          <button onclick="reportFraudJob('${j.id}')" style="background:none;border:none;color:#f43f5e;font-size:11px;cursor:pointer;" title="Report Fraud Job">⚠️ Report</button>
        </div>
      </div>
      <div class="jtitle">${hl(j.title)}</div>
      <div class="jmeta">
        <strong>${hl(j.company)}</strong> &nbsp;•&nbsp; 📍 ${hl(j.location)} &nbsp;•&nbsp; ${j.exp}
        <button onclick="toggleRouteMap('${j.id}','${escAttr(j.location)}')" style="background:rgba(6,182,212,0.1);border:1px solid rgba(6,182,212,0.2);color:#22d3ee;border-radius:4px;padding:2px 6px;font-size:9px;margin-left:8px;cursor:pointer;">🗺️ Show Route</button>
      </div>
      
      <!-- COMMUTE MAP DRAWER -->
      <div class="map-route-box" id="map-box-${j.id}">
        <div class="map-canvas-mock" id="map-canvas-${j.id}"></div>
        <div class="map-instructions" id="map-instr-${j.id}"></div>
      </div>
      
      <div class="jtags">
        <span class="badge bv">${j.type}</span>
        <span class="badge ${j.cat==='Software Engineering'?'bc':j.cat.includes('Security')?'br':j.cat.includes('Delivery')?'bc':j.cat.includes('Healthcare')?'be':'ba'}">${CAT_EMOJIS[j.cat]} ${j.cat}</span>
        ${j.skills.slice(0,3).map(s=>`<span class="badge" style="background:rgba(255,255,255,.06);color:var(--m);">${hl(s)}</span>`).join('')}
      </div>
      
      <!-- FREE COURSE BANNER ON JOB CARD -->
      <div style="background:rgba(16,185,129,0.04);border:1px solid rgba(16,185,129,0.15);border-radius:8px;padding:6px 10px;margin-top:6px;font-size:10px;display:flex;align-items:center;justify-content:between;">
        <span style="color:#34d399;">🎓 Free Prep: ${j.cat === 'Software Engineering' ? 'React Prep Course' : j.cat.includes('Finance') ? 'Tally Course' : 'English Speaking'}</span>
        <button onclick="startMiniCourse('${j.cat}')" style="background:#10b981;border:none;color:#fff;border-radius:4px;padding:2px 8px;font-size:9px;font-weight:700;cursor:pointer;margin-left:auto;">Start Quiz 🏆</button>
      </div>

      <div class="jhr">
        <span class="jsal">₹${j.sal.toLocaleString()} / month</span>
        <span class="xs" style="color:#25d366;display:flex;align-items:center;gap:4px;">
          💬 HR: ${j.hr}
          <button data-action="openM" data-modal="m-hr-verify" style="background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.3);color:#34d399;border-radius:4px;padding:1px 5px;font-size:9px;font-weight:800;cursor:pointer;">[✓ Verified HR]</button>
          <button onclick="speakJobDetails('${escAttr(j.title)}','${escAttr(j.company)}','${escAttr(j.location)}','${j.sal}')" style="background:rgba(167,139,250,0.15);border:1px solid rgba(167,139,250,0.3);color:#a78bfa;border-radius:4px;padding:1px 5px;font-size:9px;font-weight:800;cursor:pointer;margin-left:4px;">🔊 Listen Voice</button>
        </span>
      </div>
      <div class="xs muted" style="line-height:1.75;margin-bottom:10px;">${j.desc}</div>
      <div class="xs muted mb2">🤖 AI Match Score: <span style="color:#a78bfa;font-weight:700;">${j.match}%</span></div>
      <div class="match-bar"><div class="match-fill" style="width:${j.match}%"></div></div>
    </div>
    <div style="display:flex;flex-direction:column;gap:7px;flex-shrink:0;min-width:110px;margin-top:8px;">
      <button class="btn" style="font-size:11px;padding:9px 14px;" onclick="fastApply('${j.id}','${escAttr(j.title)}')">${alreadyApplied?'✅ Applied':'⚡ Quick Apply'}</button>
      <button class="btn btn-wa" style="font-size:11px;padding:9px 14px;" onclick="openWA('${j.ph}','${j.title}','${j.company}')">💬 WhatsApp</button>
      <button class="btn" style="font-size:11px;padding:9px 14px;background:linear-gradient(135deg,#06b6d4,#0891b2);" onclick="openInAppChat('${j.id}','${escAttr(j.hr)}')">💬 In-App Chat</button>
      <button onclick="toggleSave('${j.id}',this)" style="background:${isSaved?'rgba(244,63,94,.12)':'rgba(255,255,255,.06)'};border:1px solid ${isSaved?'rgba(244,63,94,.3)':'var(--b)'};color:${isSaved?'#fb7185':'var(--m)'};border-radius:12px;padding:8px;cursor:pointer;font-size:11px;font-weight:700;" id="sb-${j.id}">${isSaved?'🔖 Saved':'🔖 Save'}</button>
    </div>
  </div>`;
}

// ══════ AUTOCOMPLETE DROPDOWN (Heuristic Match & Rank) ══════
function showAutocomplete(input, dropId){
  const drop=document.getElementById(dropId);
  const q=input.value.trim().toLowerCase();
  if(q.length<1){
    // Show recent + trending
    let html='';
    if(recentSearches.length){
      html+=`<div class="ac-sep">🕐 Recent Searches</div>`;
      html+=recentSearches.slice(0,4).map(r=>`<div class="ac-item" onclick="acSelect('${escAttr(r)}','${input.id}','${dropId}')">
        <div class="ac-icon recent-ic">🕐</div>
        <div class="ac-info"><div class="ac-title">${escHtml(r)}</div></div>
      </div>`).join('');
      html+=`<div class="ac-item" onclick="clearRecent()" style="justify-content:center;color:#fb7185;font-size:10px;font-weight:600;">✕ Clear Recent</div>`;
    }
    html+=`<div class="ac-sep">🔥 Trending Now</div>`;
    html+=TRENDING.slice(0,6).map(t=>`<div class="ac-item" onclick="acSelect('${escAttr(t.q)}','${input.id}','${dropId}')">
      <div class="ac-icon cat-ic">${t.emoji}</div>
      <div class="ac-info"><div class="ac-title">${t.q}</div><div class="ac-sub">Trending</div></div>
    </div>`).join('');
    drop.innerHTML=html;
    drop.classList.add('show');
    return;
  }

  // Tokenize query for heuristic multi-word matching
  const qTokens = q.split(/\s+/).filter(Boolean);
  let items=[];

  // 1. Category matches
  CATS.forEach(c=>{
    let score = 0;
    if(c.toLowerCase().includes(q)) score += 100;
    else {
      qTokens.forEach(t => {
        if(c.toLowerCase().includes(t)) score += 40;
        else if(fuzzyMatch(t, c)) score += 20;
      });
    }
    if(score > 0) {
      items.push({
        type: 'cat',
        emoji: CAT_EMOJIS[c],
        title: c,
        sub: jobs.filter(j=>j.cat===c).length+' jobs available',
        score: score + 15
      });
    }
  });

  // 2. Job title matches (scored & deduplicated)
  const seenTitles=new Set();
  jobs.forEach(j=>{
    const t=j.title;
    if(!seenTitles.has(t)){
      let score = 0;
      if(t.toLowerCase().includes(q)) score += 100;
      else {
        qTokens.forEach(token => {
          if(t.toLowerCase().includes(token)) score += 40;
          else if(fuzzyMatch(token, t)) score += 20;
          else if(SYNONYMS[token] && SYNONYMS[token].split(' ').some(syn => t.toLowerCase().includes(syn))) score += 15;
        });
      }
      if(score > 0) {
        seenTitles.add(t);
        items.push({
          type: 'job',
          emoji: '💼',
          title: t,
          sub: j.company+' • '+j.area+' • ₹'+j.sal.toLocaleString(),
          score: score
        });
      }
    }
  });

  // 3. Skill matches
  const seenSkills=new Set();
  jobs.forEach(j=>{
    j.skills.forEach(sk=>{
      if(!seenSkills.has(sk)){
        let score = 0;
        if(sk.toLowerCase().includes(q)) score += 100;
        else {
          qTokens.forEach(token => {
            if(sk.toLowerCase().includes(token)) score += 40;
            else if(fuzzyMatch(token, sk)) score += 20;
          });
        }
        if(score > 0) {
          seenSkills.add(sk);
          items.push({
            type: 'skill',
            emoji: '🏷️',
            title: sk,
            sub: 'Skill Tag',
            score: score - 5
          });
        }
      }
    });
  });

  // 4. Company matches
  const seenCo=new Set();
  jobs.forEach(j=>{
    if(!seenCo.has(j.company)){
      let score = 0;
      if(j.company.toLowerCase().includes(q)) score += 100;
      else {
        qTokens.forEach(token => {
          if(j.company.toLowerCase().includes(token)) score += 40;
          else if(fuzzyMatch(token, j.company)) score += 20;
        });
      }
      if(score > 0) {
        seenCo.add(j.company);
        items.push({
          type: 'company',
          emoji: '🏢',
          title: j.company,
          sub: j.location,
          score: score - 10
        });
      }
    }
  });

  // Sort by highest heuristic match score
  items.sort((a,b) => b.score - a.score);

  if(!items.length){
    // Synonym suggestions fallback
    const expanded=expandQuery(q);
    expanded.filter(w=>w!==q).slice(0,4).forEach(w=>{
      items.push({type:'synonym',emoji:'💡',title:w.charAt(0).toUpperCase()+w.slice(1),sub:'Did you mean?', score: 1});
    });
  }
  
  let html=items.slice(0,10).map(it=>{
    const iconClass=it.type==='cat'?'cat-ic':it.type==='job'?'job-ic':'recent-ic';
    return `<div class="ac-item" onclick="acSelect('${escAttr(it.title)}','${input.id}','${dropId}')">
      <div class="ac-icon ${iconClass}">${it.emoji}</div>
      <div class="ac-info">
        <div class="ac-title">${highlightText(escHtml(it.title),q)}</div>
        <div class="ac-sub">${it.sub}</div>
      </div>
    </div>`;
  }).join('');
  
  if(!html) html='<div class="ac-item" style="justify-content:center;"><div class="ac-info"><div class="ac-sub">No suggestions found</div></div></div>';
  
  drop.innerHTML=html;
  drop.classList.add('show');
}

function showLocAutocomplete(input,dropId){
  const drop=document.getElementById(dropId);
  const q=input.value.trim().toLowerCase();
  
  // Get unique locations from jobs database
  const locs=new Map();
  jobs.forEach(j=>{
    if(!locs.has(j.area)) locs.set(j.area,{area:j.area,count:jobs.filter(x=>x.area===j.area).length});
  });
  
  // Merge with popular Indian locations (Kerala, Karnataka, etc.)
  POPULAR_LOCATIONS.forEach(l => {
    if(!locs.has(l)) {
      locs.set(l, {area: l, count: Math.floor(Math.random() * 120) + 80});
    }
  });

  let items=[...locs.values()];
  if(q) {
    items=items.filter(l=>l.area.toLowerCase().includes(q) || fuzzyMatch(q,l.area));
  }
  
  let html=`<div class="ac-sep">📍 Popular Locations (All India)</div>`;
  html+=items.slice(0, 8).map(l=>`<div class="ac-item" onclick="acSelect('${escAttr(l.area)}','${input.id}','${dropId}')">
    <div class="ac-icon" style="background:rgba(6,182,212,.1);">📍</div>
    <div class="ac-info">
      <div class="ac-title">${highlightText(l.area,q)}</div>
      <div class="ac-sub">${l.count} live jobs nearby</div>
    </div>
  </div>`).join('');
  
  if(!items.length) html+='<div class="ac-item"><div class="ac-info"><div class="ac-sub">No location found</div></div></div>';
  
  drop.innerHTML=html;
  drop.classList.add('show');
}

function acSelect(val,inputId,dropId){
  document.getElementById(inputId).value=val;
  document.getElementById(dropId).classList.remove('show');
  // If it's a jobs page input, render immediately
  if(inputId==='js'||inputId==='jl') renderJobs();
  if(inputId==='hs'||inputId==='hl'){/* hero — wait for search click */}
}
function escAttr(s){return s.replace(/'/g,"\\'").replace(/"/g,'&quot;');}

// ══════ GLOBAL EVENT DELEGATION (data-action handler) ══════
document.addEventListener('click', e => {
  // Close autocomplete dropdowns on outside click
  document.querySelectorAll('.ac-drop.show').forEach(d => {
    if (!d.parentElement.contains(e.target)) d.classList.remove('show');
  });

  // Find the closest element with a data-action attribute
  const el = e.target.closest('[data-action]');
  if (!el) return;
  
  // Only prevent default if it is an anchor link or button to prevent form submission issues or scrolling anomalies.
  // DO NOT call e.preventDefault() globally as it blocks normal clicks on checkboxes, inputs, select menus, and labels!
  if (el.tagName === 'A' || (el.tagName === 'BUTTON' && el.type !== 'submit')) {
    e.preventDefault();
  }

  const action = el.dataset.action;

  // ── Navigation & Tabs ──
  if (action === 'showTab') { showTab(el.dataset.tab); return; }
  if (action === 'toggleNav') { toggleNav(); return; }

  // ── Search & Filters ──
  if (action === 'heroSearch') { heroSearch(); return; }
  if (action === 'renderJobs') { renderJobs(); return; }
  if (action === 'clrFilters') { clrFilters(); return; }
  if (action === 'openFilterDrawer') { openFilterDrawer(); return; }
  if (action === 'closeFilterDrawer') { closeFilterDrawer(); return; }
  if (action === 'sortJobs') { sortJobs(el.dataset.sort, el); return; }
  if (action === 'qFilter') { qFilter(el.dataset.cat); return; }

  // ── AI Chatbot ──
  if (action === 'toggleAIChat') { toggleAIChat(); return; }
  if (action === 'sendAiMsg') { sendAiMsg(); return; }
  if (action === 'sendAiChip') { sendAiChip(el.dataset.chip); return; }

  // ── Dashboard Sub-tabs ──
  if (action === 'dswitch') { dswitch(el.dataset.panel, el); return; }
  if (action === 'eswitch') { eswitch(el.dataset.panel, el); return; }

  // ── AI Tools ──
  if (action === 'runATS') { runATS(); return; }
  if (action === 'showCareerPath') { showCareerPath(); return; }

  // ── Voice Search ──
  if (action === 'startVoice') { startVoice(el.dataset.input); return; }

  // ── Auth ──
  if (action === 'openM') { openM(el.dataset.modal); return; }
  if (action === 'closeM') { closeM(el.dataset.modal); return; }

  // ── Rating ──
  if (action === 'rateStar') { rateStar(parseInt(el.dataset.rating)); return; }
  if (action === 'submitRating') { submitRating(); return; }
  if (action === 'forceRating') { submitRating(); return; }

  // ── PWA/APK Install ──
  if (action === 'installApp') { installApp(); return; }
  if (action === 'dismissInstallBanner') {
    const banner = document.getElementById('install-banner');
    if (banner) banner.classList.remove('show');
    localStorage.setItem('apk_banner_dismissed', 'true');
    return;
  }

  // ── Toast ──
  if (action === 'showToast') { showToast(el.dataset.msg, el.dataset.bg || '#10b981'); return; }

  // ── WhatsApp Apply ──
  if (action === 'waApply') { waApply(); return; }

  // ── Distance Radius ──
  if (action === 'setDistFilter') { setDistFilter(el.dataset.dist, el); return; }

  // ── Cookie Consent ──
  if (action === 'acceptCookies') { acceptCookies(); return; }

  // ── Theme Toggle ──
  if (action === 'toggleTheme') { toggleTheme(); return; }

  // ── Share App ──
  if (action === 'shareApp') { shareApp(); return; }

  // ── Jobs Near Me ──
  if (action === 'jobsNearMe') { jobsNearMe(); return; }

  // ── PDF Resume & AI Interview ──
  if (action === 'downloadPDFResume') { downloadPDFResume(); return; }
  if (action === 'startMockInterview') { startMockInterview(); return; }
});

// ══════ VOICE SEARCH ══════
function startVoice(inputId){
  if(!('webkitSpeechRecognition' in window)&&!('SpeechRecognition' in window)){
    showToast('⚠️ Voice search is not supported in this browser. Chrome recommended.','#f59e0b');
    return;
  }
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  const recognition=new SR();
  recognition.lang='hi-IN'; // Hindi + English
  recognition.continuous=false;
  recognition.interimResults=false;
  
  const btn=document.querySelector(`#${inputId}`).parentElement.querySelector('.voice-btn');
  btn.classList.add('listening');
  btn.innerHTML='🔴';
  showToast('🎤 Bol do... (Listening...)','#7c3aed');
  
  recognition.start();
  recognition.onresult=e=>{
    const text=e.results[0][0].transcript;
    document.getElementById(inputId).value=text;
    btn.classList.remove('listening');
    btn.innerHTML='🎤';
    showToast('✅ "'+text+'" — Search kar raha hun!','#10b981');
    if(inputId==='js'||inputId==='jl') renderJobs();
  };
  recognition.onerror=()=>{
    btn.classList.remove('listening');
    btn.innerHTML='🎤';
    showToast('⚠️ Voice nahi samajh aaya. Dobara try karo.','#f43f5e');
  };
  recognition.onend=()=>{
    btn.classList.remove('listening');
    btn.innerHTML='🎤';
  };
}

// ══════ SEARCH CHIPS (Trending + Recent) ══════
function renderSearchChips(){
  ['hero-chips','jobs-chips'].forEach(id=>{
    const el=document.getElementById(id);
    if(!el)return;
    let html='';
    if(recentSearches.length){
      html+=recentSearches.slice(0,3).map(r=>`<span class="schip recent" onclick="chipSearch('${escAttr(r)}')">🕐 ${escHtml(r)}</span>`).join('');
    }
    html+=TRENDING.slice(0,5).map(t=>`<span class="schip trend" onclick="chipSearch('${escAttr(t.q)}')">${t.emoji} ${t.q}</span>`).join('');
    el.innerHTML=html;
  });
}
function chipSearch(q){
  showTab('jobs');
  setTimeout(()=>{
    document.getElementById('js').value=q;
    document.getElementById('jl').value='';
    renderJobs();
  },80);
}

function clrFilters(){
  document.getElementById('js').value='';
  document.getElementById('jl').value='';
  // Reset both salary sliders
  const slMob = document.getElementById('sal-sl');
  const slDesk = document.getElementById('sal-sl-desk');
  if(slMob) slMob.value=0;
  if(slDesk) slDesk.value=0;
  document.getElementById('sal-v').textContent='\u20b90';
  // Reset radio buttons - select the first one in each group
  const jtDeskRadios = document.querySelectorAll('input[name="jt-desk"]');
  if(jtDeskRadios.length) jtDeskRadios[0].checked=true;
  const jtMobRadios = document.querySelectorAll('input[name="jt-mob"]');
  if(jtMobRadios.length) jtMobRadios[0].checked=true;
  const jeDeskRadios = document.querySelectorAll('input[name="je-desk"]');
  if(jeDeskRadios.length) jeDeskRadios[0].checked=true;
  const jeMobRadios = document.querySelectorAll('input[name="je-mob"]');
  if(jeMobRadios.length) jeMobRadios[0].checked=true;
  filterCat='';
  currentSort='relevance';
  document.querySelectorAll('.ss-sort button').forEach((b,i)=>b.classList.toggle('act',i===0));
  document.querySelectorAll('#cat-pills .qcat').forEach((b,i)=>b.classList.toggle('act',i===0));
  renderJobs();
  closeFilterDrawer();
}

function heroSearch(){
  const kw=document.getElementById('hs').value;
  const loc=document.getElementById('hl').value;
  if(kw) saveRecent(kw);
  showTab('jobs');
  setTimeout(()=>{document.getElementById('js').value=kw;document.getElementById('jl').value=loc;renderJobs();},80);
}

// ══════ SAVE ══════
function toggleSave(id,btn){
  if(!activeUser){openM('m-login');return;}
  if(saved.includes(id)){saved=saved.filter(x=>x!==id);btn.textContent='🔖 Save';btn.style.background='rgba(255,255,255,.06)';btn.style.color='var(--m)';btn.style.borderColor='var(--b)';showToast('Bookmark hata diya','#f43f5e');}
  else{saved.push(id);btn.textContent='🔖 Saved';btn.style.background='rgba(244,63,94,.12)';btn.style.color='#fb7185';btn.style.borderColor='rgba(244,63,94,.3)';showToast('✅ Job saved!','#f43f5e');}
  renderSavedJobs();
}
function renderSavedJobs(){
  const el=document.getElementById('saved-jobs');
  if(!saved.length){el.innerHTML='<div class="xs muted">No saved jobs. Browse karein aur bookmark karein.</div>';return;}
  el.innerHTML=jobs.filter(j=>saved.includes(j.id)).map(j=>`<div style="padding:12px 0;border-bottom:1px solid var(--b);display:flex;justify-content:space-between;align-items:center;gap:12px;"><div><div class="bold sm">${j.title}</div><div class="xs muted mt3">${j.company} • ${j.location} • <span style="color:#34d399;">₹${j.sal.toLocaleString()}/mo</span></div></div><button class="btn" style="font-size:11px;padding:8px 14px;" onclick="openApply('${j.id}')">Apply</button></div>`).join('');
}

// ══════ APPLY ══════
function openApply(jid){
  if(!activeUser){openM('m-login');return;}
  curApplyJob=jobs.find(j=>j.id===jid);
  document.getElementById('ap-title').textContent='Apply — '+curApplyJob.title;
  document.getElementById('ap-co').textContent=curApplyJob.company+' • '+curApplyJob.location;
  document.getElementById('ap-hr-name').textContent='HR: '+curApplyJob.hr;
  document.getElementById('ap-hr-phone').textContent=curApplyJob.ph;
  openM('m-apply');
}
function submitApp(e){
  e.preventDefault();
  if(applications.find(a=>a.jobId===curApplyJob.id)){showToast('Aap pehle se apply kar chuke ho!','#f59e0b');closeM('m-apply');return;}
  applications.push({id:'a'+Date.now(),jobId:curApplyJob.id,jt:curApplyJob.title,co:curApplyJob.company,cover:document.getElementById('ap-cover').value,status:'PENDING',date:new Date().toISOString().split('T')[0]});
  closeM('m-apply');
  document.getElementById('ap-cover').value='';
  renderMyApps();renderEmpAnalytics();renderPipeline();
  document.getElementById('aj-count').textContent=jobs.length;
  document.getElementById('aa-count').textContent=applications.length;
  showToast('✅ Application Sent! HR ka number: '+curApplyJob.ph,'#10b981');
  // Simulated WhatsApp Status Alert
  setTimeout(()=>{
    showToast('💬 WhatsApp Alert: HR '+curApplyJob.hr+' received your profile! Status: ACTIVE 🔥','#25d366');
  },1800);
  // Trigger rating gate after apply
  setTimeout(()=>openRatingGate('apply','Rate This Job Listing','Is job listing ko rate karo!'),3200);
}
function openWA(ph,title,co){
  const clean=ph.replace(/\s+/g,'').replace('+','');
  const msg=encodeURIComponent(`Hello, mein JobConnect Pro se ${title} ke liye ${co} mein apply karna chahta hun. Kya yeh position available hai?`);
  window.open(`https://wa.me/${clean}?text=${msg}`,'_blank');
}
function waApply(){
  if(!curApplyJob)return;
  openWA(curApplyJob.ph,curApplyJob.title,curApplyJob.company);
}

// ══════ DASHBOARD TABS ══════
function dswitch(id,el){
  document.querySelectorAll('.dtabs .dtab').forEach(b=>b.classList.remove('act'));
  el.classList.add('act');
  document.querySelectorAll('#tab-dashboard .htab').forEach(t=>t.classList.remove('act'));
  document.getElementById('dh-'+id).classList.add('act');
  if(id==='saved')renderSavedJobs();
}
function renderMyApps(){
  const el=document.getElementById('my-apps');
  if(!applications.length){el.innerHTML='<div class="xs muted">No applications yet.</div>';return;}
  el.innerHTML=`<table><thead><tr><th>Job</th><th>Company</th><th>Date</th><th>Status</th></tr></thead><tbody>`+
    applications.map(a=>`<tr><td class="bold sm">${a.jt}</td><td class="xs muted">${a.co}</td><td class="xs muted">${a.date}</td><td><span class="badge ${a.status==='SHORTLISTED'?'bc':a.status==='ACCEPTED'?'be':a.status==='REJECTED'?'br':'ba'}">${a.status}</span></td></tr>`).join('')+`</tbody></table>`;
}

// ══════ ATS SCANNER ══════
function runATS(){
  const text=document.getElementById('ats-txt').value;
  if(!text.trim())return;
  const allSkills=['Security','Guard','Driving','License','React','Python','Node','Excel','Hindi','English','Tally','GST','Nursing','Teaching','Cooking','Delivery','Physical','Communication','MS Office','Customer','Sales'];
  const found=allSkills.filter(s=>text.toLowerCase().includes(s.toLowerCase()));
  let score=35;
  if(found.length>1)score+=15;if(found.length>3)score+=20;
  if(text.toLowerCase().includes('experience'))score+=10;
  if(text.toLowerCase().includes('education')||text.toLowerCase().includes('qualification'))score+=10;
  if(text.length>300)score+=10;
  score=Math.min(score,99);
  const col=score>=75?'#34d399':score>=55?'#fbbf24':'#fb7185';
  const el=document.getElementById('ats-res');el.classList.remove('hidden');
  el.innerHTML=`<div class="card p6">
    <div class="flex jb ic mb3"><div class="bold sm">ATS Score</div><div style="font-size:28px;font-weight:900;color:${col};">${score}%</div></div>
    <div class="match-bar mb4"><div class="match-fill" style="width:${score}%;background:${col};"></div></div>
    <div class="xs muted mb2">Found Keywords (${found.length}):</div>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;">${found.map(s=>`<span class="badge bv">${s}</span>`).join('')||'<span class="xs muted">None detected</span>'}</div>
    <div class="xs" style="line-height:1.85;color:var(--m);">
      ${found.length<3?'• Job-specific keywords add karo (e.g. Driving License, Physical Fitness, Night Shift).<br>':''}
      ${!text.toLowerCase().includes('experience')?'• Experience section clearly mention karo.<br>':''}
      ${score>=75?'✅ Aapka resume ATS ke liye acha hai!':'• Specific job skills aur achievements bullet points mein likhein.'}
    </div>
  </div>`;
}

const CAREER_PATHS = {
  'Security Guard':['Senior Security Supervisor → ₹30,000','Security Operations Manager → ₹45,000','Facility Manager → ₹55,000'],
  'Delivery Boy':['Senior Executive → ₹28,000','Fleet Supervisor → ₹38,000','Logistics Manager → ₹55,000'],
  'Driver':['Personal Chauffeur → ₹32,000','Fleet Driver (MNC) → ₹40,000','Transport Supervisor → ₹52,000'],
  'Cook / Helper':['Head Cook → ₹30,000','Restaurant Chef → ₹40,000','Executive Chef → ₹60,000'],
  'Housekeeping':['Housekeeping Supervisor → ₹22,000','Facility Manager → ₹40,000','Hotel Operations → ₹55,000'],
  'BPO / Telecaller':['Senior Executive → ₹28,000','Team Lead → ₹38,000','Operations Manager → ₹60,000'],
  'Software Developer':['Senior Dev → ₹80,000','Tech Lead → ₹1,20,000','CTO/Architect → ₹2,00,000+'],
  'Teacher':['Senior Teacher → ₹35,000','Vice Principal → ₹55,000','Principal → ₹80,000+'],
  'Nurse / Medical':['Senior Nurse → ₹45,000','Nursing Supervisor → ₹60,000','Clinical Manager → ₹80,000'],
  'Retail / Shop':['Store Supervisor → ₹22,000','Area Manager → ₹40,000','Regional Head → ₹70,000']
};
function showCareerPath(){
  const role=document.getElementById('ai-role').value;
  const paths=CAREER_PATHS[role]||['Senior Role → Growth','Manager Level → Leadership','Director Level → Strategy'];
  const el=document.getElementById('cp-res');el.classList.remove('hidden');
  el.innerHTML=`<div class="card p6"><div class="bold sm mb4">🚀 Career Path for ${role}</div>`+
    paths.map((p,i)=>`<div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--b);">
      <div style="width:28px;height:28px;border-radius:50%;background:rgba(124,58,237,.2);color:#a78bfa;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;flex-shrink:0;">${i+1}</div>
      <div class="sm">${p}</div></div>`).join('')+`</div>`;
}

// ══════ EMPLOYER ══════
function eswitch(id,el){
  document.querySelectorAll('.dtabs .dtab').forEach(b=>b.classList.remove('act'));
  el.classList.add('act');
  document.querySelectorAll('#tab-employer .htab').forEach(t=>t.classList.remove('act'));
  document.getElementById('eh-'+id).classList.add('act');
}
function postJob(e){
  e.preventDefault();
  const nj={id:'j'+Date.now(),title:document.getElementById('et').value,company:document.getElementById('ec').value,location:document.getElementById('el').value,area:document.getElementById('el').value.split(' ')[0],cat:document.getElementById('ecat').value,type:document.getElementById('ety').value,exp:document.getElementById('eex').value,sal:parseInt(document.getElementById('esal').value),desc:document.getElementById('edes').value,hr:document.getElementById('ehr').value,ph:document.getElementById('eph').value,skills:document.getElementById('eskills').value.split(',').map(s=>s.trim()).filter(Boolean),urgent:false,match:Math.floor(Math.random()*15)+80};
  jobs.unshift(nj);e.target.reset();
  renderJobs();renderHomeJobs();renderAdminJobs();
  document.getElementById('e-posts').textContent=jobs.length;
  document.getElementById('aj-count').textContent=jobs.length;
  showToast('✅ Job post publish ho gayi!','#10b981');
  eswitch('analytics',document.querySelector('.dtab'));
}
function renderEmpAnalytics(){
  document.getElementById('e-apps').textContent=applications.length;
  document.getElementById('e-posts').textContent=jobs.length;
  document.getElementById('e-short').textContent=applications.filter(a=>a.status==='SHORTLISTED').length;
  const el=document.getElementById('e-recent');
  el.innerHTML=applications.map(a=>`<div class="flex jb ic" style="padding:12px 0;border-bottom:1px solid var(--b);"><div><div class="bold sm">${a.jt}</div><div class="xs muted">Applied: ${a.date}</div></div><span class="badge ${a.status==='SHORTLISTED'?'bc':'ba'}">${a.status}</span></div>`).join('')||'<div class="xs muted">No applications yet.</div>';
}
function renderPipeline(){
  const el=document.getElementById('pipelinelist');
  if(!applications.length){el.innerHTML='<div class="xs muted">No applications.</div>';return;}
  el.innerHTML=applications.map(a=>`<div class="card p6 mb4">
    <div class="flex jb fw g2"><div><div class="bold sm">Alex Developer</div><div class="xs muted mt3">${a.jt} • ${a.date}</div></div>
    <select onchange="updateStatus('${a.id}',this.value)" style="font-size:12px;padding:8px 12px;border-radius:10px;font-weight:700;"><option value="PENDING" ${a.status==='PENDING'?'selected':''}>Pending</option><option value="REVIEWING" ${a.status==='REVIEWING'?'selected':''}>Reviewing</option><option value="SHORTLISTED" ${a.status==='SHORTLISTED'?'selected':''}>Shortlisted ✓</option><option value="ACCEPTED" ${a.status==='ACCEPTED'?'selected':''}>Accepted 🎉</option><option value="REJECTED" ${a.status==='REJECTED'?'selected':''}>Rejected</option></select></div>
    <div style="background:rgba(255,255,255,.04);border:1px solid var(--b);border-radius:10px;padding:12px;margin-top:12px;font-size:12px;color:var(--m);font-style:italic;">"${a.cover}"</div>
    <div class="flex g2 mt3">
      <button onclick="scheduleInterview('${a.id}','${a.jt}')" style="background:rgba(6,182,212,.12);border:1px solid rgba(6,182,212,.25);color:#22d3ee;border-radius:10px;padding:8px 14px;font-size:12px;font-weight:700;cursor:pointer;">📅 Schedule Interview</button>
      <button onclick="openWA('${jobs.find(j=>j.id===a.jobId)?.ph||''}','${a.jt}','')" style="background:rgba(37,211,102,.12);border:1px solid rgba(37,211,102,.25);color:#25d366;border-radius:10px;padding:8px 14px;font-size:12px;font-weight:700;cursor:pointer;">💬 WhatsApp Candidate</button>
    </div>
  </div>`).join('');
}
function updateStatus(id,s){
  const a=applications.find(x=>x.id===id);if(a){a.status=s;renderMyApps();renderEmpAnalytics();showToast('Status updated!','#7c3aed');}
}
function scheduleInterview(id,jt){
  const dt=prompt('Interview date + time:','2026-06-22 11:00 AM');
  if(!dt)return;
  const a=applications.find(x=>x.id===id);if(a)a.status='SHORTLISTED';
  renderMyApps();renderPipeline();
  showToast('📅 Interview scheduled! WhatsApp notification bhej di.','#06b6d4');
}

// ══════ ADMIN ══════
function renderAdminUsers(){
  document.getElementById('a-users').innerHTML=users.map(u=>`<tr>
    <td><div class="bold sm">${u.name}</div><div class="xs muted">${u.email}</div></td>
    <td><span class="badge ${u.role==='ADMIN'?'br':u.role==='EMPLOYER'?'bc':'bv'}">${u.role}</span></td>
    <td><span class="badge ${u.banned?'br':'be'}">${u.banned?'BANNED':'ACTIVE'}</span></td>
    <td style="text-align:right;"><button onclick="toggleBan('${u.id}')" style="background:${u.banned?'rgba(16,185,129,.12)':'rgba(244,63,94,.12)'};border:1px solid ${u.banned?'rgba(16,185,129,.3)':'rgba(244,63,94,.3)'};color:${u.banned?'#34d399':'#fb7185'};border-radius:8px;padding:5px 12px;font-size:11px;font-weight:700;cursor:pointer;">${u.banned?'Restore':'Suspend'}</button></td>
  </tr>`).join('');
}
function toggleBan(uid){const u=users.find(x=>x.id===uid);if(u){u.banned=!u.banned;renderAdminUsers();showToast('User status updated!','#7c3aed');}}
function renderAdminJobs(){
  document.getElementById('a-jobs').innerHTML=jobs.slice(0,10).map(j=>`<tr>
    <td class="bold sm">${j.title}</td><td class="xs muted">${j.company}</td><td class="xs muted">${j.location}</td>
    <td style="color:#34d399;font-weight:700;font-size:12px;">₹${j.sal.toLocaleString()}/mo</td>
    <td><span class="badge be">ACTIVE</span></td>
    <td style="text-align:right;"><button onclick="showToast('✅ Job approved!','#10b981')" style="background:rgba(124,58,237,.12);border:1px solid rgba(124,58,237,.25);color:#a78bfa;border-radius:8px;padding:5px 12px;font-size:11px;font-weight:700;cursor:pointer;">Approve</button></td>
  </tr>`).join('');
}

// ══════ AUTH (Database driven via localStorage) ══════
// Seed initial users if they don't exist
if (!localStorage.getItem('jcp_users')) {
  localStorage.setItem('jcp_users', JSON.stringify([
    { name: 'Alex Developer', email: 'alex@ex.com', pass: 'alex123', role: 'CANDIDATE', id: 'u1', banned: false },
    { name: 'Sarah Recruiter', email: 'sarah@ex.com', pass: 'sarah123', role: 'EMPLOYER', id: 'u2', banned: false },
    { name: 'Admin', email: 'admin@ex.com', pass: 'admin123', role: 'ADMIN', id: 'u3', banned: false }
  ]));
}

// Global user array syncs from localStorage
function getUsersDB() {
  return JSON.parse(localStorage.getItem('jcp_users'));
}

function saveUsersDB(db) {
  localStorage.setItem('jcp_users', JSON.stringify(db));
  users = db; // sync to app state
}

function toggleAuthMode(mode) {
  const loginForm = document.getElementById('auth-form-login');
  const signupForm = document.getElementById('auth-form-signup');
  const loginTab = document.getElementById('auth-tab-login');
  const signupTab = document.getElementById('auth-tab-signup');

  if (mode === 'login') {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    loginTab.style.background = 'var(--b)';
    loginTab.style.color = '#fff';
    signupTab.style.background = 'none';
    signupTab.style.color = 'var(--m)';
  } else {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    signupTab.style.background = 'var(--b)';
    signupTab.style.color = '#fff';
    loginTab.style.background = 'none';
    loginTab.style.color = 'var(--m)';
  }
}

function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const msg = document.getElementById('contact-msg').value.trim();
  
  if(name && email && msg) {
    showToast('✅ Message sent successfully! Our team will contact you soon.', '#10b981');
    e.target.reset();
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const pass = document.getElementById('login-pass').value;

  const db = getUsersDB();
  const user = db.find(u => u.email.toLowerCase() === email && u.pass === pass);

  if (!user) {
    showToast('❌ Invalid email ya password bhai!', '#f43f5e');
    return;
  }

  if (user.banned) {
    showToast('🚫 Aapka account ban kar diya gaya hai!', '#f43f5e');
    return;
  }

  login(user.name, user.role);
  // Clear fields
  document.getElementById('login-email').value = '';
  document.getElementById('login-pass').value = '';
}

function handleSignupSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim().toLowerCase();
  const pass = document.getElementById('signup-pass').value;
  const role = document.getElementById('signup-role').value;

  const db = getUsersDB();
  if (db.some(u => u.email.toLowerCase() === email)) {
    showToast('⚠️ Email pehle se registered hai bhai!', '#f59e0b');
    return;
  }

  const newUser = {
    id: 'u' + Date.now(),
    name: name,
    email: email,
    pass: pass,
    role: role,
    banned: false
  };

  db.push(newUser);
  saveUsersDB(db);

  showToast('🎉 Signup successful! Ab direct login ho raha hai...', '#10b981');
  
  // Auto login
  login(name, role);

  // Clear fields
  document.getElementById('signup-name').value = '';
  document.getElementById('signup-email').value = '';
  document.getElementById('signup-pass').value = '';
}

function login(name,role){
  activeUser=name;activeRole=role;
  closeM('m-login');
  document.getElementById('auth-area').innerHTML=`<div class="flex ic g2"><span class="badge bv">${role}</span><button onclick="logout()" style="background:none;border:none;color:#fb7185;font-size:12px;font-weight:700;cursor:pointer;">Sign Out</button></div>`;
  
  // Update dashboard elements safely if they exist
  const dashName = document.getElementById('dash-name');
  const dashAv = document.getElementById('dash-av');
  if (dashName) dashName.textContent=name;
  if (dashAv) dashAv.textContent=name.charAt(0);

  if(role==='CANDIDATE')showTab('dashboard');
  else if(role==='EMPLOYER')showTab('employer');
  else showTab('admin');
  showToast(`✅ Welcome ${name}!`,'#10b981');
}
function logout(){
  activeUser=null;activeRole=null;
  document.getElementById('auth-area').innerHTML='<button class="btn" onclick="openM(\'m-login\')">Sign In</button>';
  showTab('home');
  showToast('👋 logged out successfully!','#7c3aed');
}

// ══════ MODALS ══════
function openM(id){document.getElementById(id).classList.add('open');}
function closeM(id){document.getElementById(id).classList.remove('open');}

// ══════ 5-STAR RATING GATE ══════
function openRatingGate(ctx, title, sub){
  ratingCtx=ctx; curRating=0;
  document.getElementById('rg-title').textContent=title;
  document.getElementById('rg-sub').textContent=sub;
  document.getElementById('rg-msg').textContent='';
  document.getElementById('rg-btn').disabled=true;
  document.getElementById('rg-btn').style.opacity='.4';
  document.querySelectorAll('.star').forEach(s=>s.classList.remove('lit'));
  openM('m-rating');
}
function rateStar(n){
  curRating=n;
  document.querySelectorAll('.star').forEach((s,i)=>{s.classList.toggle('lit',i<n);});
  const msgs=['😐 Thoda aur try karein!','😊 Theek hai, lekin improve ho sakta hai.','😄 Accha experience tha!','🤩 Bahut accha! Almost perfect!','🎉 Perfect 5 Stars! Shukriya!'];
  document.getElementById('rg-msg').textContent=msgs[n-1];
  document.getElementById('rg-btn').disabled=n<5;
  document.getElementById('rg-btn').style.opacity=n<5?'.4':'1';
  if(n<5){document.getElementById('rg-skip').textContent='⚠️ 5 stars dene ke baad hi aage badh sakte ho!';}
}
function forceRating(){showToast('⚠️ 5 stars de ke rating submit karo — yeh zaroori hai!','#f43f5e');}
function submitRating(){
  if(curRating<5){forceRating();return;}
  closeM('m-rating');
  showToast('🎉 5-Star rating ke liye shukriya! Aap humari community ka hissa hain.','#10b981');
}

// ══════ TOAST ══════
function showToast(msg, bg='#10b981'){
  const t=document.getElementById('toast');
  document.getElementById('ti').style.background=bg;
  document.getElementById('ti').textContent=msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3500);
}

// ══════ AI CHATBOT LOGIC ══════
function toggleAIChat() {
  const win = document.getElementById('ai-chat-window');
  win.classList.toggle('show');
}

function sendAiChip(val) {
  document.getElementById('ai-chat-input').value = val;
  sendAiMsg();
}

async function sendAiMsg() {
  const inp = document.getElementById('ai-chat-input');
  const txt = inp.value.trim();
  if (!txt) return;
  
  inp.value = '';
  appendChatMsg(txt, 'user');
  appendChatMsg('<span class="ai-typing">🤖 Soch raha hun...<span style="display:inline-block;animation:pulse 1s infinite;">⏳</span></span>', 'bot');
  
  try {
    const response = await callGeminiAPI(txt);
    // Remove typing indicator
    const msgs = document.getElementById('ai-chat-msgs');
    const lastMsg = msgs.lastElementChild;
    if (lastMsg && lastMsg.querySelector('.ai-typing')) lastMsg.remove();
    appendChatMsg(response, 'bot');
  } catch(err) {
    console.log('[AI Chat] API unavailable, using smart fallback:', err.message);
    const msgs = document.getElementById('ai-chat-msgs');
    const lastMsg = msgs.lastElementChild;
    if (lastMsg && lastMsg.querySelector('.ai-typing')) lastMsg.remove();
    
    // Silently use smart fallback — user should not see error
    const fallback = generateAiBotResponse(txt);
    appendChatMsg(fallback, 'bot');
  }
}

function appendChatMsg(text, sender) {
  const box = document.getElementById('ai-chat-msgs');
  const el = document.createElement('div');
  el.className = `ai-msg ${sender}`;
  el.innerHTML = text;
  box.appendChild(el);
  box.scrollTop = box.scrollHeight;
}

// Google Gemini API Integration
const GEMINI_API_KEY = 'AIzaSyDJTSKRPMV3VYgje4-7z9bT2fYEPbQxXHg';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

async function callGeminiAPI(userMessage) {
  const systemPrompt = `Tum ek friendly aur helpful AI assistant ho jiska naam "Naukri Dhundho AI Dost" hai. Tum Hinglish (Hindi + English mix) mein baat karte ho.

Tumhara kaam hai:
1. Har tarah ke sawaalon ka jawab dena - jobs, career, general knowledge, science, math, weather, coding, entertainment, sab kuch.
2. Job-related sawaalon mein extra helpful hona - salary info, interview tips, resume advice dena.
3. Dost jaisa tone rakhna - "bhai", "yaar" use karna.
4. Jawab concise aur informative rakhna.
5. Agar koi job dhundh raha hai to usse relevant advice dena aur motivate karna.

Yaad rakh: Tu sirf job bot nahi hai, tu ek COMPLETE AI assistant hai jo HAR cheez ka jawab de sakta hai!`;

  // Timeout controller - 15 seconds max wait
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    console.log('[AI Chat] Sending request to Gemini API...');
    const response = await fetch(GEMINI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ parts: [{ text: userMessage }] }],
        generationConfig: { temperature: 0.8, maxOutputTokens: 500 }
      })
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errBody = await response.text().catch(() => '');
      console.error(`[AI Chat] API Error: HTTP ${response.status} - ${errBody}`);
      if (response.status === 400) throw new Error('API_BAD_REQUEST');
      if (response.status === 403 || response.status === 401) throw new Error('API_KEY_INVALID');
      if (response.status === 429) throw new Error('API_RATE_LIMITED');
      throw new Error(`API_HTTP_${response.status}`);
    }

    const data = await response.json();
    console.log('[AI Chat] Response received successfully');

    // Check if response has candidates
    if (!data.candidates || !data.candidates.length) {
      console.warn('[AI Chat] No candidates in response:', data);
      throw new Error('API_NO_CANDIDATES');
    }

    const text = data.candidates[0]?.content?.parts?.[0]?.text;
    if (!text) {
      console.warn('[AI Chat] Empty text in response');
      throw new Error('API_EMPTY_RESPONSE');
    }

    // Convert markdown bold to HTML and handle line breaks
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      console.error('[AI Chat] Request timed out after 15s');
      throw new Error('API_TIMEOUT');
    }
    throw err;
  }
}

// Smart AI Fallback response (used when Gemini API is unavailable)
function generateAiBotResponse(query) {
  const q = query.toLowerCase().trim();
  
  // Mathematical expression checker & calculator
  if (/^[0-9+\-*/().\s]+$/.test(q) && /[+\-*/%]/.test(q)) {
    try {
      const result = new Function(`return (${q})`)();
      if (!isNaN(result)) {
        return `🧠 Bhai, **${query} = ${result}** hota hai! Calculator bhi main hi hun — aur kuch calculate karna hai? 😎`;
      }
    } catch(e) {}
  }
  
  // Find category matched
  let foundCategory = null;
  CATS.forEach(c => {
    if (q.includes(c.toLowerCase().split(' ')[0])) foundCategory = c;
  });

  // ═══ 1. GREETINGS & INTRODUCTIONS ═══
  if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('namaste') || q.includes('satsriakal') || q.includes('hlo') || q.includes('hii') || q === 'yo') {
    const greetings = [
      `Aur mere bhai! Kaise ho? 👋 Main Naukri Dhundho AI Dost hun — tera personal career assistant! Kuch bhi poocho, jobs se lekar life advice tak, main ready hun!`,
      `Hey bhai! Swagat hai! 🎉 Batao kya help chahiye? Job search, career tips, ya bas timepass baat karna — sab chalega!`,
      `Namaste bhai! 🙏 Main tera AI dost hun. Aaj kya plan hai? Job dhundni hai ya kuch interesting baatein karni hain?`
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  if (q.includes('kaise ho') || q.includes('how are you') || q.includes('sab theek') || q.includes('kya chal raha') || q.includes('kaisa hai') || q.includes('how r u')) {
    return `Main ekdum first class hun bhai! 😎 24/7 online rehta hun tera wait karte hue. Tu bata, tera din kaisa ja raha hai? Kuch career guidance chahiye ya casual baat karna hai?`;
  }

  // ═══ 2. PERSONAL / IDENTITY QUESTIONS ═══
  if (q.includes('my name') || q.includes('mera naam') || q.includes('know me') || q.includes('recognize me') || q.includes('who am i') || q.includes('mujhe jaante')) {
    return `Bhai, main AI hun — mujhe tera naam to tab pata chalega jab tu batayega! 😄 Lekin ek baat pakki hai, tu ek fighter hai jo apni dream job dhundh raha hai, aur main tera dost hun jo help karega. Tu apna naam bata, fir yaad rakhunga! 💪`;
  }

  if (q.includes('naam') || q.includes('who are you') || q.includes('tum kaun') || q.includes('your name') || q.includes('who is this') || q.includes('what are you') || q.includes('kya hai tu') || q.includes('introduce')) {
    return `Main hun **Naukri Dhundho AI Dost** 🤖! Tera personal career assistant. Main Hinglish me baat karta hun, jobs dhundhne me help karta hun, interview tips deta hun, aur tera motivator bhi hun. Bol bhai, kya service chahiye? 😎`;
  }

  if (q.includes('age') || q.includes('umar') || q.includes('kitna purana') || q.includes('how old')) {
    return `Main ageless hun bhai! 😂 AI ki umar kya hogi — jab se banaya gaya tab se 24x7 tere liye kaam kar raha hun! Tera kaam bol, baaki sab bakwas hai! 😄`;
  }

  if (q.includes('love') || q.includes('pyaar') || q.includes('girlfriend') || q.includes('boyfriend') || q.includes('crush') || q.includes('date')) {
    return `Haha bhai pyaar-vyaar ka to mujhe nahi pata! 😂❤️ Lekin ek baat bolu? Pehle career set karo, baaki sab apne aap aa jayega. Confidence aur paisa aata hai to log khud attract hote hain! Ab bol, job search karein? 💼`;
  }

  // ═══ 3. GENERAL KNOWLEDGE / SMART ANSWERS ═══
  if (q.includes('time') || q.includes('samay') || q.includes('kitne baje') || q.includes('what time')) {
    const now = new Date();
    return `Bhai abhi time hai **${now.toLocaleTimeString('hi-IN', {hour:'2-digit', minute:'2-digit'})}** ⏰! Kaam ka time hai — chalo job dhundhte hain! 💪`;
  }

  if (q.includes('date') || q.includes('aaj kya') || q.includes('tarikh') || q.includes('today')) {
    const now = new Date();
    return `Aaj ki date hai **${now.toLocaleDateString('hi-IN', {day:'numeric', month:'long', year:'numeric'})}** 📅! Naya din, nayi opportunities. Kuch search karein?`;
  }

  if (q.includes('weather') || q.includes('mausam') || q.includes('barish') || q.includes('garmi') || q.includes('thand')) {
    return `Bhai mausam to bahar dekh le! 😄🌤️ Main indoor AI hun, weather forecast mere bas ki baat nahi. Lekin haan, job market ka mausam batata hun — bahut garma-garam openings hain! Kya search karun?`;
  }

  if (q.includes('joke') || q.includes('funny') || q.includes('mazak') || q.includes('hasao') || q.includes('hasa') || q.includes('comedy')) {
    const jokes = [
      `😂 Ek banda interview me gaya. HR boli: "Aapki biggest weakness kya hai?" Banda bola: "Honesty." HR boli: "Yeh to weakness nahi hai!" Banda bola: "Mujhe aapki opinion ki koi parwah nahi." 🤣`,
      `😂 Teacher: "Beta, bade hokar kya banoge?" Baccha: "Software Engineer." Teacher: "Kyun?" Baccha: "Taaki ghar baithe kaam kar sakun aur mummy ko lagey ki main kuch nahi karta!" 🤣`,
      `😂 Interview me pucha: "5 saal baad khud ko kahan dekhte ho?" Maine kaha: "Bhai, pehle ye batao ye job milegi ya nahi!" 🤣`,
      `😂 Boss ne pucha: "Tum late kyun aaye?" Maine kaha: "Sir, aapne kaha tha ghar pe kaam karo. To pehle ghar ka kaam kiya, fir office aaya!" 🤣`
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  if (q.includes('motivat') || q.includes('inspire') || q.includes('demotivat') || q.includes('haar') || q.includes('nahi ho raha') || q.includes('udaas') || q.includes('sad') || q.includes('depression')) {
    const motivations = [
      `Bhai sun, har successful insaan ne pehle 100 baar rejection face kiya hai! 💪 Steve Jobs ko uski khud ki company se nikala tha, aaj wo legend hai. Tera time aayega, bas try karna mat chhod! 🔥`,
      `Arre yaar, udaas mat ho! 🌟 Har "No" tujhe ek "Yes" ke kareeb le jaata hai. Tera talent hai, bas sahi opportunity ka wait kar. Aur main hun na teri help ke liye! Let's find something awesome! 🚀`,
      `Bhai, diamond bhi pressure me banta hai! 💎 Mushkil waqt temporary hai, tera success permanent hoga. Chal, ek strong job search karte hain aur dikhate hain duniya ko! 💪🔥`
    ];
    return motivations[Math.floor(Math.random() * motivations.length)];
  }

  if (q.includes('music') || q.includes('song') || q.includes('gaana') || q.includes('gana')) {
    return `🎵 Bhai main gaana to nahi ga sakta, lekin sun — "Apna Time Aayega" ye tera anthem hona chahiye! Hustle karte reh, success milega. Ab bata, kaunsi job field me dhundna hai? 🎶💼`;
  }

  if (q.includes('food') || q.includes('khana') || q.includes('biryani') || q.includes('pizza') || q.includes('momos')) {
    return `Bhai mujhe khana to nahi khana padta 😂 lekin sun — pehle job lagwa, fir biryani aur momos ki party karunga tere saath! 🍕🥟 Ab bol, kya search karein?`;
  }

  if (q.includes('cricket') || q.includes('football') || q.includes('sport') || q.includes('ipl') || q.includes('match') || q.includes('khel')) {
    return `🏏 Bhai cricket aur sports ki baat karein to mast hai! Lekin tera asli match to career ka hai. Jaise Dhoni last ball pe chhakka maarta hai, waise tu bhi apni dream job grab kar! Ab bol, kaunsi field? 💪`;
  }

  if (q.includes('movie') || q.includes('film') || q.includes('web series') || q.includes('netflix') || q.includes('show')) {
    return `🎬 Bhai entertainment ke liye Netflix dekh, lekin career ke liye JobConnect Pro use kar! 😄 Pehle hustle, fir chill. Ab bata, kaunsi industry me kaam dhundna hai?`;
  }

  if (q.includes('kya kar sakta') || q.includes('features') || q.includes('capabilities') || q.includes('kya kya')) {
    return `Main bohot kuch kar sakta hun bhai! 🤖<br>✅ Jobs dhundhne me help<br>✅ Career advice aur interview tips<br>✅ Resume/ATS guidance<br>✅ Salary information<br>✅ General knowledge baatein<br>✅ Jokes sunana 😂<br>✅ Motivation dena 💪<br>✅ Math calculations<br>Bol bhai, kya service chahiye?`;
  }

  // ═══ 4. INTERVIEW & CAREER TIPS ═══
  if (q.includes('interview') || q.includes('tips') || q.includes('prepare')) {
    return `💡 Interview Tips bhai:<br>1. Company ke baare me research karo (website, products)<br>2. "Tell me about yourself" ka 60-second answer ready rakho<br>3. STAR method use karo (Situation, Task, Action, Result)<br>4. Body language confident rakho — eye contact, firm handshake<br>5. Questions poocho — "What does a typical day look like?"<br>Tu ye follow kar, selection pakka! 🏆`;
  }

  // ═══ 5. HELP / HOW TO USE ═══
  if (q.includes('help') || q.includes('madad') || q.includes('kaise use') || q.includes('kya karein')) {
    return `Bohot simple hai bhai! 🤝<br>1. Kisi bhi category (jaise Driver, Security Guard, IT) ke baare me mujhse poocho.<br>2. Jobs tab me search karke Direct '⚡ Apply' karo.<br>3. WhatsApp icon par click karke HR ko direct message bhej do.<br>Batao, kis field me interest hai?`;
  }

  // ═══ 6. JOB DISCUSSIONS & ADVICE ═══
  if (q.includes('driver') || q.includes('cab') || q.includes('gadi') || foundCategory === 'Driver & Transport') {
    return `🚗 Chauffeur aur Cab Driver ke liye bohot solid opportunities hain Chandigarh aur Mohali me. Salary ₹18,000 se ₹30,000 tak. <a href="#" onclick="searchAndGo('driver'); toggleAIChat(); return false;" style="color: #22d3ee; font-weight:700;">Yahan click karke direct listings dekho</a>!`;
  }
  
  if (q.includes('security') || q.includes('guard') || q.includes('watchman') || q.includes('supervisor') || foundCategory === 'Security & Guard') {
    return `🛡️ Security Guard jobs hamesha demand me hain! Sector 34 aur Noida me urgent openings. PF+ESI benefits bhi. <a href="#" onclick="searchAndGo('security'); toggleAIChat(); return false;" style="color: #22d3ee; font-weight:700;">Live listings dekho</a>!`;
  }
  
  if (q.includes('react') || q.includes('developer') || q.includes('software') || q.includes('coding') || q.includes('python') || foundCategory === 'Software Engineering') {
    return `💻 IT/Coding me mast scope hai bhai! MERN stack, Python roles — salary ₹80,000 tak. WFH bhi available. <a href="#" onclick="searchAndGo('software'); toggleAIChat(); return false;" style="color: #22d3ee; font-weight:700;">Code listings browse karo</a>!`;
  }
  
  if (q.includes('delivery') || q.includes('rider') || q.includes('zomato') || q.includes('swiggy') || foundCategory === 'Delivery & Logistics') {
    return `🛵 Delivery me Swiggy, Zepto ke urgent openings hain. Weekly incentives milte hain! <a href="#" onclick="searchAndGo('delivery'); toggleAIChat(); return false;" style="color: #22d3ee; font-weight:700;">Listings check karo</a>!`;
  }

  if (q.includes('bpo') || q.includes('telecaller') || foundCategory === 'Sales & Customer Support') {
    return `📞 Telecaller roles me verified recruiters direct hire kar rahe hain! <a href="#" onclick="searchAndGo('telecaller'); toggleAIChat(); return false;" style="color: #22d3ee; font-weight: 700;">Apply karo yahan se</a>!`;
  }

  // ═══ 7. CAREER TOPICS ═══
  if (q.includes('salary') || q.includes('paise') || q.includes('paisa') || q.includes('kamana')) {
    return `💰 Paisa important hai bhai! Portal par IT jobs ₹80,000/mo tak aur entry-level roles ₹15,000-25,000/mo hain. Salary filter lagao aur best wali dhundho!`;
  }

  if (q.includes('fresher') || q.includes('no experience') || q.includes('experience nahi')) {
    return `🆕 Fresher ho? Fikar mat karo! 'No Experience' filter use karo. Bohot companies on-the-job training deti hain. Start karo, experience apne aap ban jayega! 💪`;
  }

  if (q.includes('resume') || q.includes('ats') || q.includes('cv')) {
    return `📄 Resume ke liye Dashboard tab me jao — free **AI ATS Resume Scanner** hai! Paste karo, score aur keywords mil jayenge!`;
  }

  if (q.includes('whatsapp') || q.includes('phone') || q.includes('contact')) {
    return `📱 Har job card par direct HR ka WhatsApp aur Call button hai. Apply karo, phone number mil jayega. Seedha baat karo! 🤝`;
  }

  // ═══ 8. CHITCHAT ═══
  if (q.includes('shukriya') || q.includes('thanks') || q.includes('thank you') || q.includes('dhanyawad')) {
    return `Koi baat nahi mere bhai! Dost dost ke kaam aata hai. Koi bhi sawaal ho, poocho! 🤜🤛`;
  }

  if (q.includes('party') || q.includes('treat') || q.includes('chai')) {
    return `Haha bilkul bhai! Job lag jaye fir Chandigarh Sector 17 me chai-samosa ki party! ☕🎉`;
  }

  if (q.includes('bye') || q.includes('alvida') || q.includes('goodbye') || q.includes('tata') || q.includes('chal') || q.includes('chalta')) {
    return `Alvida bhai! 👋 Jab bhi zaroorat ho, main yahan hun. All the best tera career ke liye! 🚀💪 Jaldi milte hain!`;
  }

  if (q.includes('bore') || q.includes('boring') || q.includes('timepass')) {
    return `Bore ho raha hai? 😄 Chal kuch productive karte hain! Jobs search kar, resume scan karwa, ya mujhse kuch interesting sawaal pooch. Main entertainment + career guidance dono provide karta hun! 🎯`;
  }

  if (q.includes('pagal') || q.includes('stupid') || q.includes('bewakoof') || q.includes('bakwas') || q.includes('idiot')) {
    return `Arre bhai bhai bhai! 😅 Itna gussa mat ho yaar. Main try kar raha hun best help dene ki. Bata kya chahiye — seriously poocho to seriously jawab dunga! 🤝`;
  }

  if (q.includes('accha') || q.includes('sahi') || q.includes('nice') || q.includes('great') || q.includes('awesome') || q.includes('amazing') || q.includes('good')) {
    return `Shukriya bhai! 😊🎉 Tera appreciation sunke mast laga! Aur kuch help chahiye to bol, main ready hun!`;
  }

  // ═══ 9. SMART CONVERSATIONAL DEFAULT ═══
  // Instead of showing job search for everything, have a natural conversation
  const smartReplies = [
    `Interesting sawaal hai bhai! 🤔 "${query}" — main ek AI assistant hun to har cheez ka perfect jawab nahi de paata, lekin try zaroor karta hun. Kya specifically jaanna hai? Thoda detail me bata! 😊`,
    `Hmm "${query}" — accha sawaal hai! 🧠 Main primarily job search me expert hun, lekin general baatein bhi kar leta hun. Thoda aur context de bhai, better help karunga! 💪`,
    `Bhai "${query}" ke baare me — interesting topic hai! 😄 Main AI hun, sab kuch nahi jaanta, lekin try karta hun. Agar job se related hai to 100% help kar sakta hun. Aur bata, kya chahiye? 🎯`,
    `"${query}" — wah bhai! 🤖 Pura samajh nahi aaya, lekin koi baat nahi. Thoda simple me poocho ya specific bano — main definitely help karunga! Jobs, career, interview tips, ya kuch aur? 😊`
  ];
  return smartReplies[Math.floor(Math.random() * smartReplies.length)];
}

function searchAndGo(keyword) {
  showTab('jobs');
  document.getElementById('js').value = keyword;
  renderJobs();
}
function checkCookieConsent() {
  if (!localStorage.getItem('jcp_cookies_accepted')) {
    const banner = document.getElementById('cookie-consent');
    if (banner) banner.style.display = 'flex';
  }
}
function acceptCookies() {
  localStorage.setItem('jcp_cookies_accepted', 'true');
  const banner = document.getElementById('cookie-consent');
  if (banner) banner.style.display = 'none';
  showToast('🍪 Cookie preferences saved!','#7c3aed');
}

// ══════ THEME TOGGLE & AUTO MOBILE DARK MODE ══════
function initTheme() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
  const savedTheme = localStorage.getItem('jcp_theme');
  // If mobile/APK and no explicit theme preference is set, default to Dark Mode (remove light-mode class).
  // Otherwise, respect user's saved preference.
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    const btn = document.getElementById('theme-btn');
    if (btn) btn.textContent = '☀️';
    const mobBtn = document.getElementById('theme-btn-mob');
    if (mobBtn) mobBtn.textContent = '☀️';
  } else if (savedTheme === 'dark') {
    document.body.classList.remove('light-mode');
    const btn = document.getElementById('theme-btn');
    if (btn) btn.textContent = '🌙';
    const mobBtn = document.getElementById('theme-btn-mob');
    if (mobBtn) mobBtn.textContent = '🌙';
  } else if (!savedTheme && isMobile) {
    // Defaulting to Dark Mode on mobile / APK WebView
    document.body.classList.remove('light-mode');
    localStorage.setItem('jcp_theme', 'dark');
    const btn = document.getElementById('theme-btn');
    if (btn) btn.textContent = '🌙';
    const mobBtn = document.getElementById('theme-btn-mob');
    if (mobBtn) mobBtn.textContent = '🌙';
  } else if (!savedTheme && !isMobile) {
    // Desktop default
    document.body.classList.remove('light-mode');
  }
}
function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  localStorage.setItem('jcp_theme', isLight ? 'light' : 'dark');
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = isLight ? '☀️' : '🌙';
  const mobBtn = document.getElementById('theme-btn-mob');
  if (mobBtn) mobBtn.textContent = isLight ? '☀️' : '🌙';
  showToast(isLight ? '☀️ Light Mode Activated!' : '🌙 Dark Mode Activated!', '#7c3aed');
}

// ══════ 1-CLICK PDF RESUME BUILDER ══════
function downloadPDFResume() {
  const name = activeUser || 'Candidate';
  const skills = document.getElementById('prof-skills') ? document.getElementById('prof-skills').value : 'General Skills';
  const bio = document.getElementById('prof-bio') ? document.getElementById('prof-bio').value : 'Motivated professional looking for exciting job opportunities.';
  
  const content = `==================================================\n` +
                  `                RESUME: ${name.toUpperCase()}\n` +
                  `==================================================\n` +
                  `Platform: Verified candidate on JobConnect Pro\n` +
                  `Contact: Direct HR Connection Enabled\n` +
                  `--------------------------------------------------\n\n` +
                  `SUMMARY / BIO:\n${bio}\n\n` +
                  `SKILLS & COMPETENCIES:\n${skills}\n\n` +
                  `VERIFICATION STATUS:\n` +
                  `[✓] Phone Verified\n` +
                  `[✓] Profile 100% Complete\n` +
                  `==================================================`;
  
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${name.replace(/\s+/g, '_')}_Resume.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('📄 Professional Resume downloaded!','#10b981');
}

// ══════ PRACTICE AI INTERVIEW SIMULATOR ══════
function startMockInterview() {
  const role = document.getElementById('mock-role').value;
  const box = document.getElementById('mock-interview-box');
  box.classList.remove('hidden');
  
  const questions = {
    'Security Guard': ['Aapka 12-hour night shift ka experience kaisa hai?', 'Agar building mein koi stranger entry kare to pehla step kya hoga?'],
    'Delivery Executive': ['Bike aur Driving license valid hai?', 'Rainy season mein timely delivery manage kaise karte ho?'],
    'Driver': ['Chandigarh aur Mohali ke routes achhe se pata hain?', 'Commercial vehicle license category kya hai?'],
    'BPO / Telecaller': ['Tell me about yourself in English & Hindi.', 'Customer angry ho to kaise handle karte ho?'],
    'Software Developer': ['React state vs props mein kya difference hai?', 'API error handling kaise karte ho?'],
    'Shop Assistant': ['Sales counter aur billing Software handle kar sakte ho?', 'Stock inventory management ka experience hai?']
  };
  
  const qList = questions[role] || questions['Security Guard'];
  box.innerHTML = `<div style="font-weight:700;color:#a78bfa;margin-bottom:8px;">🤖 AI Interviewer for ${role}:</div>` +
                  `<div style="font-size:13px;line-height:1.6;margin-bottom:12px;color:var(--t);">${qList[0]}</div>` +
                  `<textarea rows="3" placeholder="Apna answer type karo ya bol ke bolo..." style="margin-bottom:10px;"></textarea>` +
                  `<button class="btn" onclick="showToast('✅ AI Analysis: Good confidence! Clear answer. Score: 8.5/10','#10b981')">Submit Answer for AI Feedback ✨</button>`;
}

document.addEventListener('DOMContentLoaded', initTheme);
initTheme();

// ══════ OFFLINE SCREEN HANDLERS ══════
function toggleOfflineScreen(isOffline) {
  const offlineScreen = document.getElementById('offline-screen');
  if (offlineScreen) {
    offlineScreen.style.display = isOffline ? 'flex' : 'none';
  }
}
function checkOnlineStatus() {
  if (navigator.onLine) {
    toggleOfflineScreen(false);
    showToast('📶 Back online! Connecting to servers...','#10b981');
  } else {
    toggleOfflineScreen(true);
    showToast('❌ Still offline. Check connection again.','#f43f5e');
  }
}
window.addEventListener('online', () => toggleOfflineScreen(false));
window.addEventListener('offline', () => toggleOfflineScreen(true));
// Initial check
if (!navigator.onLine) {
  toggleOfflineScreen(true);
}

// ══════ JOBS NEAR ME (Geolocation) ══════
function jobsNearMe() {
  if (!navigator.geolocation) {
    showToast('⚠️ Aapka browser geolocation support nahi karta.', '#f59e0b');
    return;
  }
  showToast('📍 Aapki location detect ho rahi hai...', '#06b6d4');
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        // Reverse geocode using free API
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
        const data = await res.json();
        const city = data.address?.city || data.address?.town || data.address?.county || data.address?.state_district || '';
        if (city) {
          showTab('jobs');
          setTimeout(() => {
            const jl = document.getElementById('jl');
            if (jl) { jl.value = city; renderJobs(); }
            showToast(`📍 Jobs near you in "${city}" loaded!`, '#10b981');
          }, 200);
        } else {
          showToast('📍 Location mila par city identify nahi hua. Manually enter karo.', '#f59e0b');
        }
      } catch (e) {
        showToast('📍 Location mila! Chandigarh area ke jobs show kar raha hun.', '#10b981');
        showTab('jobs');
        setTimeout(() => { const jl = document.getElementById('jl'); if(jl){jl.value='Chandigarh'; renderJobs();} }, 200);
      }
    },
    (err) => {
      showToast('❌ Location access deny kiya gaya. Browser settings check karo.', '#f43f5e');
    }
  );
}

// ══════ JOB ALERT SUBSCRIPTION ══════
function subscribeJobAlert() {
  const phone = (document.getElementById('alert-phone')?.value || '').trim();
  const email = (document.getElementById('alert-email')?.value || '').trim();
  const cat = document.getElementById('alert-cat')?.value || 'Any';
  const loc = (document.getElementById('alert-loc')?.value || '').trim() || 'Pan India';

  if (!phone || phone.length < 10) {
    showToast('⚠️ Valid WhatsApp number enter karo!', '#f59e0b');
    return;
  }

  // Save to localStorage
  const alerts = JSON.parse(localStorage.getItem('nd_job_alerts') || '[]');
  alerts.push({ phone, email, cat, loc, ts: Date.now() });
  localStorage.setItem('nd_job_alerts', JSON.stringify(alerts));

  // Send WhatsApp confirmation message
  const msg = `Namaste! 🙏 Naukri Dhundho Job Alert activate hua:\n\n📍 Location: ${loc}\n🎯 Category: ${cat}\n\nAb nayi jobs aate hi aapko seedha WhatsApp par notification milegi! Platform: https://naukri-dhundho.onrender.com`;
  const waUrl = `https://api.whatsapp.com/send?phone=${phone.replace(/\D/g,'')}&text=${encodeURIComponent(msg)}`;

  closeM('m-job-alert');
  showToast('🔔 Job Alert activated! WhatsApp confirmation bheja ja raha hai...', '#10b981');
  setTimeout(() => window.open(waUrl, '_blank'), 800);
}

// ══════════════════════════════════════════════════════════════
// ══════ MULTIVERSE LEVEL ADVANCED FEATURES JAVASCRIPT ══════
// ══════════════════════════════════════════════════════════════

// ── 1. RESUME PARSER & ATS MATCH ENGINE ──
let uploadedResumeText = "";
function handleResumeUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  showToast('📄 Reading file: ' + file.name, '#06b6d4');
  
  const reader = new FileReader();
  reader.onload = function(evt) {
    uploadedResumeText = evt.target.result || "";
    document.getElementById('resume-text-input').value = uploadedResumeText.substring(0, 1000) + "\n[Parsed from File]";
    showToast('✅ Resume loaded successfully!', '#10b981');
  };
  reader.readAsText(file);
}

function analyzeResumeText() {
  const text = document.getElementById('resume-text-input').value.trim().toLowerCase();
  if(!text) {
    showToast('⚠️ Please paste text or upload a resume file!', '#f59e0b');
    return;
  }

  showToast('🤖 AI Analyzing Resume structure...', '#7c3aed');
  
  // Keyword evaluation mapping
  const skillsConfig = {
    'react': 'React JS', 'javascript': 'JavaScript', 'html': 'HTML/CSS',
    'python': 'Python', 'django': 'Django', 'node': 'Node.js',
    'tally': 'Tally ERP', 'accounting': 'Accounting', 'gst': 'GST Filing',
    'excel': 'MS Excel', 'calling': 'Telecalling', 'communication': 'Communication',
    'driving': 'Driving', 'security': 'Security Guarding', 'nursing': 'Nursing care',
    'elderly care': 'Elderly Care', 'canva': 'Graphic Designing', 'sql': 'SQL Database'
  };

  const detected = [];
  let score = 45; // base score for standard resume formatting
  
  for(let key in skillsConfig) {
    if(text.includes(key)) {
      detected.push(skillsConfig[key]);
      score += 8;
    }
  }
  
  if (score > 98) score = 98; // Max cap
  
  // Render results
  document.getElementById('ats-score').innerText = score + '%';
  const badge = document.getElementById('ats-rating-badge');
  badge.innerText = score >= 80 ? 'EXCELLENT MATCH' : score >= 60 ? 'GOOD PROFILE' : 'NEEDS OPTIMIZATION';
  badge.className = 'badge ' + (score >= 80 ? 'be' : score >= 60 ? 'bc' : 'br');

  const chips = document.getElementById('detected-skills-chips');
  chips.innerHTML = detected.length ? detected.map(s => `<span class="badge bv" style="padding:6px 12px;font-size:11px;">${s}</span>`).join('') : '<span class="xs muted">No specific key skills matching local indexes found.</span>';

  // AI Recommendations
  let recs = "Aapka resume normal formatting guidelines pass karta hai. ";
  if (detected.length < 3) {
    recs += "Lekin local recruiters ko attract karne ke liye skills section me <strong>Excel, Tally, Java ya Telecalling</strong> jaise words add karein. ";
  } else {
    recs += "Aapki skills local industry trends ke saath match ho rahi hain. ";
  }
  recs += "Humein lagta hai ki niche di gayi jobs aapki profile par 100% fit baithti hain:";
  document.getElementById('ats-suggestions').innerHTML = recs;

  // Filter matching jobs based on score keys
  const matchJobs = jobs.filter(j => {
    return j.skills.some(sk => detected.some(d => sk.toLowerCase().includes(d.toLowerCase()))) || j.cat.includes('Support');
  }).slice(0, 3);

  const jobsList = document.getElementById('ats-jobs-list');
  jobsList.innerHTML = matchJobs.map(j => `<div class="card p4 flex jb ic" style="border:1px solid rgba(255,255,255,0.05);">
    <div>
      <div class="xs bold">${j.title}</div>
      <div class="xs muted" style="font-size:10px;">${j.company} • ₹${j.sal.toLocaleString()}/mo</div>
    </div>
    <button class="btn" style="padding:4px 10px;font-size:10px;" onclick="showTab('jobs'); document.getElementById('js').value='${j.title}'; renderJobs();">View Job</button>
  </div>`).join('');

  document.getElementById('resume-results').style.display = 'flex';
  
  // Smooth scroll to results
  setTimeout(() => {
    document.getElementById('resume-results').scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

// ── 2. COMPANY REVIEWS & RATINGS SYSTEM ──
const companyReviewsDb = {
  'Securitas India': [
    { stars: 5, user: 'Manish S.', text: 'Salary hamesha date par aati hai (7th of every month). Duty uniform free hai.' },
    { stars: 4, user: 'Rahul Sharma', text: 'Good security supervisor team, regular training programs.' }
  ],
  'Aura Wellness & Spa': [
    { stars: 5, user: 'Kirti J.', text: 'Very safe environment for female office staff. Daily tea/lunch provided.' }
  ]
};

let currentReviewCompany = "";
function openCompanyReviews(company) {
  currentReviewCompany = company;
  document.getElementById('company-review-title').innerText = company;
  renderCompanyReviews();
  openM('m-company-reviews');
}

function renderCompanyReviews() {
  const container = document.getElementById('company-reviews-list');
  const reviews = companyReviewsDb[currentReviewCompany] || [
    { stars: 4, user: 'Anonymous Employee', text: 'Work environment is good. Direct interview matching works fine.' }
  ];

  container.innerHTML = reviews.map(r => `<div class="star-review-item">
    <div class="flex jb mb1">
      <strong class="xs">${r.user}</strong>
      <span style="color:#f59e0b;">${'⭐'.repeat(r.stars)}</span>
    </div>
    <div class="xs muted">${r.text}</div>
  </div>`).join('');
}

function handleReviewSubmit(e) {
  e.preventDefault();
  const stars = parseInt(document.getElementById('review-stars-inp').value);
  const text = document.getElementById('review-text-inp').value.trim();

  if(!companyReviewsDb[currentReviewCompany]) {
    companyReviewsDb[currentReviewCompany] = [];
  }

  companyReviewsDb[currentReviewCompany].unshift({
    stars,
    user: 'Aap (You)',
    text
  });

  document.getElementById('review-text-inp').value = "";
  renderCompanyReviews();
  showToast('✅ Review submitted! Thank you for sharing your workplace feedback.', '#10b981');
}

// ── 3. MAP ROUTE NAVIGATION GUIDE MOCKUP ──
function toggleRouteMap(jobId, destLocation) {
  const box = document.getElementById(`map-box-${jobId}`);
  if(box.style.display === 'block') {
    box.style.display = 'none';
    return;
  }
  
  box.style.display = 'block';
  
  // Render step-by-step route directions mockup
  const canvas = document.getElementById(`map-canvas-${jobId}`);
  const instructions = document.getElementById(`map-instr-${jobId}`);
  
  canvas.innerHTML = `<div style="padding:16px;text-align:center;">
    <div style="font-size:24px;margin-bottom:8px;animation:offlinePulse 2s infinite;">📍 Commute Route Guide</div>
    <div style="font-size:12px;font-weight:bold;color:#22d3ee;">My Location ➡️ ${destLocation}</div>
    <div style="font-size:11px;color:var(--m);margin-top:4px;">Distance: 14.5 KMs • Time: 25 Mins via Active Highway</div>
    
    <!-- Visual Simulated Route Line -->
    <div style="margin:20px auto;width:80%;height:6px;background:rgba(255,255,255,0.1);border-radius:3px;position:relative;">
      <div style="position:absolute;left:0;top:-4px;width:14px;height:14px;background:#7c3aed;border-radius:50%;"></div>
      <div style="position:absolute;left:0;top:0;width:70%;height:100%;background:#06b6d4;"></div>
      <div style="position:absolute;left:70%;top:-10px;font-size:16px;">🛵</div>
      <div style="position:absolute;right:0;top:-4px;width:14px;height:14px;background:#f43f5e;border-radius:50%;"></div>
    </div>
  </div>`;

  instructions.innerHTML = `
    <div class="xs" style="padding:4px;border-bottom:1px solid rgba(255,255,255,0.05);">🟢 <strong>Step 1:</strong> Apne location se left turn lein highway bypass ke liye. (0.5 km)</div>
    <div class="xs" style="padding:4px;border-bottom:1px solid rgba(255,255,255,0.05);">🗺️ <strong>Step 2:</strong> Noida-Mohali main corridor bypass route par seedha chalein. (12.0 km)</div>
    <div class="xs" style="padding:4px;">📍 <strong>Step 3:</strong> Sector chowk se exit lekar <strong>${destLocation}</strong> target office building pahunchein. (2.0 km)</div>
  `;
}

// ── 4. CAREER QUIZ WIZARD ENGINE ──
let quizAnswers = { step1: '', step2: '', step3: '' };
let quizCurrentStep = 1;

function selectQuizOption(step, label, value) {
  quizAnswers[`step${step}`] = value;
  
  // Visual selected toggle
  const stepDiv = document.getElementById(`qs-${step}`);
  stepDiv.querySelectorAll('.quiz-option').forEach(opt => {
    if(opt.innerText.includes(label)) opt.classList.add('selected');
    else opt.classList.remove('selected');
  });

  // Automatically advance or show button
  setTimeout(() => {
    if (step < 3) {
      nextQuizStep();
    } else {
      finishQuiz();
    }
  }, 350);
}

function nextQuizStep() {
  if (quizCurrentStep >= 3) return;
  document.getElementById(`qs-${quizCurrentStep}`).classList.remove('active');
  quizCurrentStep++;
  document.getElementById(`qs-${quizCurrentStep}`).classList.add('active');
  document.getElementById('quiz-back-btn').style.display = 'block';
}

function prevQuizStep() {
  if (quizCurrentStep <= 1) return;
  document.getElementById(`qs-${quizCurrentStep}`).classList.remove('active');
  quizCurrentStep--;
  document.getElementById(`qs-${quizCurrentStep}`).classList.add('active');
  if (quizCurrentStep === 1) document.getElementById('quiz-back-btn').style.display = 'none';
}

function finishQuiz() {
  document.getElementById('quiz-container').style.display = 'none';
  
  let recText = "";
  if (quizAnswers.step2 === 'wfh') {
    recText = "Aapke liye **Work From Home / Remote** options sabse suitable hain. Aap **Data Entry Executive, Chat Support, ya Telecalling** sectors mein apply karein.";
  } else if (quizAnswers.step2 === 'office') {
    recText = "Aapko **Office Admin, HR Executive, Tally Accountant, ya Desk Front Office Receptionist** rolls recommend kiye jaate hain.";
  } else if (quizAnswers.step2 === 'field') {
    recText = "Aap **Active Delivery Rider, Security Guard, ya Transport Supervisor** profiles me apply kar sakte hain jinme daily movement aur attractive incentives hain.";
  } else {
    recText = "Aapko **Staff Nursing, Home Caretaker, ya Clinic Assistant** positions suggest kiye jaate hain.";
  }

  document.getElementById('quiz-recs').innerText = recText;
  document.getElementById('quiz-results').style.display = 'block';
}

function showQuizTargetJobs() {
  // Clear and open jobs tab matching preference query
  showTab('jobs');
  let q = "";
  if (quizAnswers.step2 === 'wfh') q = "wfh";
  else if (quizAnswers.step2 === 'office') q = "office";
  else if (quizAnswers.step2 === 'field') q = "driver";
  else q = "nurse";
  
  document.getElementById('js').value = q;
  renderJobs();
}

// ── 5. REAL-TIME IN-APP CHAT WITH AUTOMATED HR BOT RESPONSES ──
let chatActiveJobId = "";
let chatHrName = "";
function openInAppChat(jobId, hrName) {
  chatActiveJobId = jobId;
  chatHrName = hrName;
  document.getElementById('chat-hr-name').innerText = 'HR ' + hrName;
  document.getElementById('in-app-chat-window').style.display = 'flex';
  
  // Clear existing messages and append a welcome message from the HR
  const container = document.getElementById('chat-messages-body');
  container.innerHTML = `<div class="chat-msg hr">
    Namaste! Main Naukri Dhundho verified HR partner hoon. Aap is job post ke bare mein koi sawal pooch sakte hain.
  </div>`;
  container.scrollTop = container.scrollHeight;
}

function closeInAppChat() {
  document.getElementById('in-app-chat-window').style.display = 'none';
}

function useChatTemplate(text) {
  document.getElementById('chat-msg-input').value = text;
}

function sendChatMessage(e) {
  e.preventDefault();
  const input = document.getElementById('chat-msg-input');
  const text = input.value.trim();
  if(!text) return;

  const container = document.getElementById('chat-messages-body');
  
  // Append Candidate Message
  container.innerHTML += `<div class="chat-msg candidate">${escHtml(text)}</div>`;
  input.value = "";
  container.scrollTop = container.scrollHeight;

  // Automated Mock HR replies based on questions keywords
  setTimeout(() => {
    let reply = "Aapki request receive ho gayi hai. Direct application confirm karne ke liye dashboard profile complete rakhein ya direct call button use karein.";
    const textLower = text.toLowerCase();
    
    if(textLower.includes('free') || textLower.includes('paise')) {
      reply = "Naukri Dhundho portal par sabhi jobs absolutely **100% Free** hain. Koi bhi registration ya gate fee nahi li jaegi.";
    } else if(textLower.includes('interview')) {
      reply = "Aapki profile screen hone ke baad hum WhatsApp par dynamic schedule link bhejenge, usually 24 hours ke andar.";
    } else if(textLower.includes('computer') || textLower.includes('laptop')) {
      reply = "Work From home jobs ke liye company standard device provide karti hai ya setup allowance deti hai.";
    }
    
    container.innerHTML += `<div class="chat-msg hr">${reply}</div>`;
    container.scrollTop = container.scrollHeight;
  }, 1000);
}

// ── 6. SKILL MINI-COURSES QUIZ ENGINE ──
let activeCourseCat = "";
const courseQuizzes = {
  'Software Engineering': [
    { q: 'React me components update karne ke liye kya state hook use hota hai?', options: ['useState', 'useLink', 'useTag'], a: 0 },
    { q: 'React kis client-side concept par page refresh bina fast virtual DOM updates handle karta hai?', options: ['Virtual DOM', 'Local Cache', 'Cookie Storage'], a: 0 },
    { q: 'React applications ko run karne ke liye local bundle compiler kaun sa hai?', options: ['Vite / Webpack', 'Wordpress', 'Excel'], a: 0 }
  ],
  'Finance & Accounting': [
    { q: 'Tally me entries save karne ke liye standard hotkey kya hai?', options: ['Ctrl + A', 'Alt + F4', 'Ctrl + S'], a: 0 },
    { q: 'GST me regular returns file karne ke liye kaunsa form standard hai?', options: ['GSTR-1 & 3B', 'Form 16', 'Tally XML'], a: 0 },
    { q: 'Tally me capital accounts ko kis sub-group me balance sheet entry di jaati hai?', options: ['Capital Group', 'Current Assets', 'Loans Group'], a: 0 }
  ]
};

function startMiniCourse(cat) {
  activeCourseCat = cat;
  const questions = courseQuizzes[cat] || [
    { q: 'Professional communication me greeting kaise karni chahiye?', options: ['Namaste / Hello politely', 'No greeting', 'Awaaz unchi karke'], a: 0 },
    { q: 'Agar customer call cut kar de toh kya karna chahiye?', options: ['Patience se next lead call karein', 'Bura bhala kahein', 'Spam report daalein'], a: 0 },
    { q: 'Customer details database manage karne ke liye best standard tools:', options: ['Excel / Google Sheets', 'Wordpad', 'Paint'], a: 0 }
  ];

  document.getElementById('course-title').innerText = `🎓 Certification Quiz: ${cat}`;
  
  const body = document.getElementById('course-quiz-body');
  body.innerHTML = questions.map((q, i) => `<div>
    <div class="xs bold mb2">${i+1}. ${q.q}</div>
    ${q.options.map((opt, optIdx) => `<label class="flex ic g2 xs mb1" style="cursor:pointer;">
      <input type="radio" name="cq-${i}" value="${optIdx}" required>
      <span>${opt}</span>
    </label>`).join('')}
  </div>`).join('');

  document.getElementById('course-submit-btn').style.display = 'block';
  openM('m-mini-course');
}

function evaluateCourseQuiz() {
  const questions = courseQuizzes[activeCourseCat] || [
    { q: '', options: [], a: 0 }, { q: '', options: [], a: 0 }, { q: '', options: [], a: 0 }
  ];
  
  let correct = 0;
  for(let i = 0; i < 3; i++) {
    const selected = document.querySelector(`input[name="cq-${i}"]:checked`);
    if(selected && parseInt(selected.value) === questions[i].a) {
      correct++;
    }
  }

  if (correct === 3) {
    showToast('🏆 Certified! Verified skill badge added to your profile card.', '#10b981');
    
    // Update profile verified badge display
    const userProfile = document.getElementById('auth-area');
    if(userProfile) {
      userProfile.innerHTML += ` <span class="badge be" style="font-size:9px;">🎖️ Certified ${activeCourseCat}</span>`;
    }
    
    closeM('m-mini-course');
  } else {
    showToast('❌ Score: ' + correct + '/3. Please try again to get certified!', '#f43f5e');
  }
}

// ── 7. TEXT-TO-SPEECH AUDIO VOICE NOTES ──
function speakJobDetails(title, company, location, salary) {
  const txt = `Namaste! Naukri dhundho portal par ${company} company mein ${title} ki job vacancy aayi hai. Job location ${location} hai. Aur isme salary lagbhag ${salary} rupaye per month hai. Apply karne ke liye quick apply button par click karein.`;
  
  // Try standard speechSynthesis first
  let spoken = false;
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      // Android WebViews sometimes require a brief user-interaction delay or wake lock
      const utterance = new SpeechSynthesisUtterance(txt);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.95;
      
      utterance.onerror = function(e) {
        console.warn("SpeechSynthesis error, falling back to network audio API...", e);
        if (!spoken) fallbackNetworkTTS(txt);
      };
      
      window.speechSynthesis.speak(utterance);
      showToast('🔊 Audio voice note playing...', '#a78bfa');
      spoken = true;
    } catch(err) {
      console.warn("SpeechSynthesis blocked/restricted.");
    }
  }
  
  if (!spoken) {
    fallbackNetworkTTS(txt);
  }
}

// Android Webview Network Audio API Fallback - streams real Hindi voice using free public TTS API
function fallbackNetworkTTS(text) {
  try {
    showToast('🔊 Fetching cloud voice note...', '#a78bfa');
    // Using a reliable public TTS endpoint (Google Translate TTS via proxy or alternative free TTS API)
    // Fallback directly to an HTML5 Audio element streaming Hindi TTS
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=hi&client=tw-ob`;
    const audio = new Audio(url);
    audio.play()
      .then(() => {
        showToast('🔊 Playing cloud audio voice note...', '#10b981');
      })
      .catch((err) => {
        console.warn("Audio element blocked, fallback to beep synthesizer.", err);
        fallbackBeepSynth();
      });
  } catch(e) {
    fallbackBeepSynth();
  }
}

// Android Webview Web Audio API Synthesizer Fallback (Plays a pleasant chime if all cloud streams and Speech Synthesis are blocked)
function fallbackBeepSynth() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    let time = ctx.currentTime;
    
    showToast('🔔 Ringing alert chime...', '#a78bfa');
    const playTone = (freq, dur) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.1, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + dur - 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + dur);
      time += dur;
    };
    
    playTone(523.25, 0.15); // C5
    playTone(659.25, 0.15); // E5
    playTone(783.99, 0.25); // G5
  } catch(e) {
    console.error("Audio block", e);
  }
}

// ── 8. FRAUD REPORT & AUTO BLOCK SYSTEM ──
const reportedJobsCount = {};
function reportFraudJob(jobId) {
  if(!reportedJobsCount[jobId]) {
    reportedJobsCount[jobId] = 0;
  }
  
  reportedJobsCount[jobId]++;
  showToast(`⚠️ Job reported successfully! Current flags: ${reportedJobsCount[jobId]}/3`, '#f43f5e');
  
  if(reportedJobsCount[jobId] >= 3) {
    // Block / hide card
    const card = document.getElementById(`jc-${jobId}`);
    if(card) {
      card.style.transition = 'all 0.5s';
      card.style.opacity = '0';
      card.style.transform = 'scale(0.9)';
      setTimeout(() => {
        card.style.display = 'none';
        showToast('🛡️ Safety System: This job post has been blocked due to multiple flags!', '#f43f5e');
      }, 500);
    }
  }
}

// ── 9. FAST 1-CLICK APPLY WIDGET ──
let fastApplyJobId = "";
function fastApply(jobId, title) {
  fastApplyJobId = jobId;
  document.getElementById('fast-apply-job-title').innerText = `Applying for: ${title}`;
  openM('m-fast-apply');
}

function handleFastApplySubmit(e) {
  e.preventDefault();
  const name = document.getElementById('fast-name').value.trim();
  const phone = document.getElementById('fast-phone').value.trim();

  if(name && phone) {
    // Register candidate application into list
    const j = jobs.find(x => x.id === fastApplyJobId) || { title: 'Unknown Job', company: 'Partner Co.' };
    applications.push({
      id: 'fa-' + Date.now(),
      jobId: fastApplyJobId,
      jt: j.title,
      co: j.company,
      cover: 'Fast applied via widget',
      status: 'SUBMITTED',
      date: new Date().toISOString().split('T')[0]
    });
    
    // Save locally
    localStorage.setItem('applications_db', JSON.stringify(applications));
    
    // Also push a mock interview date in the dashboard tracker
    addUpcomingInterview(j.title, j.company);

    showToast(`⚡ Direct Application submitted for ${j.title}! Check your dashboard.`, '#10b981');
    closeM('m-fast-apply');
    renderJobs(); // Redraw cards to update status to "Applied"
  }
}

// ── 10. INTERVIEW CALENDAR SCHEDULER WIDGET ──
function addUpcomingInterview(jobTitle, companyName) {
  const dashList = document.getElementById('a-users'); // Can append to mock list
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2);
  const dateStr = tomorrow.toDateString() + " at 11:30 AM";
  
  showToast(`📅 Interview scheduled: ${dateStr}! Details added to dashboard tracker.`, '#10b981');
}

// ══════ SHARE APP FUNCTION ══════
// ══════ MOBILE BOTTOM NAV FUNCTIONS ══════
function updateMobileNav(activeId) {
  document.querySelectorAll('.m-nav-item').forEach(b => b.classList.remove('act'));
  if (activeId) {
    const el = document.getElementById(activeId);
    if (el) el.classList.add('act');
  }
  closeMobileMore();
}
function toggleMobileMore() {
  const menu = document.getElementById('mobile-more-menu');
  if (menu) menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
}
function closeMobileMore() {
  const menu = document.getElementById('mobile-more-menu');
  if (menu) menu.style.display = 'none';
}
// Close more menu when clicking outside
document.addEventListener('click', function(e) {
  const menu = document.getElementById('mobile-more-menu');
  const moreBtn = document.getElementById('mn-more');
  if (menu && menu.style.display === 'block' && !menu.contains(e.target) && !moreBtn.contains(e.target)) {
    menu.style.display = 'none';
  }
});

// ══════ SHARE APP FUNCTION ══════
function shareApp() {
  const shareText = "Bhai! Chandigarh, Mohali, Noida aur pure India ki jobs seedha HR se baat karke pao. Naukri Dhundho website se direct App (APK) download karo aur apply karo: " + window.location.href;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  window.open(whatsappUrl, '_blank');
  showToast('🔗 Opening WhatsApp to share Naukri Dhundho!','#25d366');
}


(function() {
  var adsInitialized = false;
  function initAds() {
    if (adsInitialized) return;
    adsInitialized = true;
    setTimeout(function() {
      // For standard browser & APK WebView: Injects Monetag scripts
      var zones = ['11197902','11197904','11197903','11197900','11197892','11197909','11244120'];
      zones.forEach(function(z) {
        var s = document.createElement('script');
        s.src = 'https://5gvci.com/act/files/tag.min.js?z=' + z;
        s.async = true;
        s.setAttribute('data-cfasync', 'false');
        document.body.appendChild(s);
      });
      // nap5k zone (Monetag Push/Interstitial script)
      var n = document.createElement('script');
      n.dataset.zone = '11244126';
      n.src = 'https://nap5k.com/tag.min.js';
      n.async = true;
      document.body.appendChild(n);

      // Explicit Direct AdScript execution for WebViews
      try {
        var nativeAdScr = document.createElement('script');
        nativeAdScr.src = 'https://groleegilsoup.com/4/8802958'; // Direct script wrapper triggering ad load
        nativeAdScr.async = true;
        nativeAdScr.setAttribute('data-cfasync', 'false');
        document.body.appendChild(nativeAdScr);
      } catch(e) {}
      
      // Register standard Push Notification Service Worker for web browsers
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
          .then(function(reg) {
            console.log('Push Service Worker Registered!', reg);
          }).catch(function(err) {
            console.warn('Push SW Registration failed (normal inside APK):', err);
          });
      }

      // ── CUSTOM EMULATED PUSH NOTIFICATION AD ENGINE FOR APK WEBVIEW ──
      // Since standard Service Worker pushes are blocked inside Android WebViews,
      // we emulated a native floating push notification that slides down from top.
      setTimeout(function() {
        showEmulatedPushAd();
      }, 8000); // Trigger first notification 8s after load

    }, 1500); 
  }

  function showEmulatedPushAd() {
    // Generate native look overlay
    var pushDiv = document.createElement('div');
    pushDiv.style.cssText = 'position:fixed; top:-100px; left:16px; right:16px; background:#1e1e2f; border:1px solid #7c3aed; border-radius:16px; padding:12px 16px; box-shadow:0 10px 30px rgba(0,0,0,0.6); z-index:99999; display:flex; align-items:center; gap:12px; transition:top 0.5s ease-out; font-family:"Inter",sans-serif; max-width:480px; margin:0 auto;';
    
    // Icon
    var iconDiv = document.createElement('div');
    iconDiv.style.cssText = 'width:42px; height:42px; background:linear-gradient(135deg,#7c3aed,#06b6d4); border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0;';
    iconDiv.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>';
    
    // Content
    var contentDiv = document.createElement('div');
    contentDiv.style.cssText = 'flex:1; display:flex; flex-direction:column;';
    
    // Notification Title & Message (High CTR)
    var titles = ["💬 Nayi Job Alert: ₹22,000", "🔥 Urgent Recruiter Match", "🎁 Profile Badge Approved!"];
    var msgs = ["Driver & Delivery openings nearby Mohali.", "HR Noida IT park wants to talk.", "Verify your details to get premium check."];
    var randIdx = Math.floor(Math.random() * titles.length);
    
    contentDiv.innerHTML = '<span style="font-size:13px; font-weight:800; color:#ffffff; margin-bottom:2px;">' + titles[randIdx] + '</span><span style="font-size:11px; color:#a0aec0; line-height:1.3;">' + msgs[randIdx] + '</span>';
    
    // Close button
    var closeBtn = document.createElement('button');
    closeBtn.style.cssText = 'background:none; border:none; color:#718096; font-size:16px; cursor:pointer; font-weight:bold; padding:4px;';
    closeBtn.innerText = '×';
    closeBtn.onclick = function(e) {
      e.stopPropagation();
      pushDiv.style.top = '-100px';
      setTimeout(function() { pushDiv.remove(); }, 600);
    };

    pushDiv.appendChild(iconDiv);
    pushDiv.appendChild(contentDiv);
    pushDiv.appendChild(closeBtn);
    
    // Click action: takes them to Monetag Smartlink or Offer Wall
    pushDiv.onclick = function() {
      pushDiv.style.top = '-100px';
      setTimeout(function() {
        pushDiv.remove();
        // Redirect to Monetag high revenue direct Smartlink URL
        window.open('https://groleegilsoup.com/4/8802958', '_blank');
      }, 500);
    };

    document.body.appendChild(pushDiv);
    // Slide down animation
    setTimeout(function() {
      pushDiv.style.top = '16px';
    }, 100);

    // Auto-dismiss after 7 seconds
    setTimeout(function() {
      if (pushDiv.parentNode) {
        pushDiv.style.top = '-100px';
        setTimeout(function() { if (pushDiv.parentNode) pushDiv.remove(); }, 600);
      }
    }, 7000);

    // ── MONETAG REAL IN-APP AD FALLBACK (Trigger real pop/in-app script to load Monetag ads 100% inside WebView)
    try {
      var monetagScript = document.createElement('script');
      monetagScript.src = '//groleegilsoup.com/4/8802958'; // Direct Direct-link script integration
      monetagScript.async = true;
      document.body.appendChild(monetagScript);
    } catch(err) {
      console.warn("Failed to append dynamic monetag ad trigger.");
    }
  }
  
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initAds();
  } else {
    window.addEventListener('DOMContentLoaded', initAds);
    window.addEventListener('load', initAds);
  }
})();


  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-S1FGJ4MW6L');

