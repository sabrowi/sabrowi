export const profile = {
  name: "Kukuh Sabrowi",
  firstName: "Kukuh",
  tagline: "Front-End Programmer · Mobile & Web Apps Developer · Internet of Things",
  location: "Indonesia",
  email: "ku2h.sabrowi@gmail.com",
  roles: [
    "Front-End Engineer",
    "Mobile App Developer",
    "Three.js Enthusiast",
    "IoT & Smart-Home Tinkerer",
    "Design & Art Lover",
  ],
  socials: {
    github: "https://github.com/sabrowi",
    linkedin: "https://www.linkedin.com/in/kukuh-sabrowi-1b8b0b64/",
    facebook: "https://www.facebook.com/anonyfamous/",
    email: "mailto:ku2h.sabrowi@gmail.com",
  },
  about: [
    "I'm a programmer from Indonesia who has spent years building web and mobile products — from public-safety and emergency-response apps used by police and health agencies, to travel, cooperative-finance and crowdfunding platforms.",
    "Outside of shipping products, I live at the intersection of code and craft: I care deeply about design and art, and I channel that into real-time 3D — crafting interactive scenes rendered in the browser with Three.js and WebGL.",
    "My curiosity also runs into the physical world. I build IoT systems with microcontrollers, wire up my own smart home, and work with industrial hardware like PLCs — anything that connects software to the real world.",
  ],
};

export interface SkillGroup {
  title: string;
  blurb: string;
  icon: "code" | "cube" | "cpu" | "server";
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend & Mobile",
    blurb: "Product interfaces for web and mobile, shipped to real users.",
    icon: "code",
    skills: ["TypeScript", "React", "React Native", "Ionic", "Tailwind CSS", "Vite", "Redux", "CodePush"],
  },
  {
    title: "3D & Creative Coding",
    blurb: "Real-time graphics as a design medium — the room above is hand-built in code.",
    icon: "cube",
    skills: ["Three.js", "WebGL", "GLSL Shaders"],
  },
  {
    title: "IoT & Hardware",
    blurb: "Bridging software and the physical world, from living room to factory floor.",
    icon: "cpu",
    skills: ["ESP32 / Arduino", "Raspberry Pi", "MQTT", "Home Assistant", "Smart Home Automation", "PLC & Modbus", "Sensors & Actuators"],
  },
  {
    title: "Backend & Realtime",
    blurb: "APIs and realtime systems behind the apps I've shipped.",
    icon: "server",
    skills: ["Node.js", "Laravel", "CodeIgniter", "Firebase", "Socket.IO", "MySQL", "PostgreSQL", "REST APIs"],
  },
];

export interface Project {
  id: string;
  name: string;
  category: string;
  year: string;
  stack: string[];
  description: string;
  link: string | null;
  linkName: string | null;
  images: string[];
}

export const projects: Project[] = [
  {
    id: "bawor-satria",
    name: "Bawor Satria Apps",
    category: "Public Safety",
    year: "Mobile",
    stack: ["React Native", "CodeIgniter", "LeafletJS"],
    description:
      "Incident-reporting app for Polres Banyumas (Banyumas Regency Police). Citizens report crimes, accidents and disasters in real time — a built-in panic button calls the police and lets them live-track the caller's location.",
    link: "https://play.google.com/store/apps/details?id=com.polresbanyumas&hl=en",
    linkName: "Play Store",
    images: ["bsa-1.jpg", "bsa-2.jpg", "bsa-3.jpg", "bsa-4.jpg", "bsa-5.jpg"],
  },
  {
    id: "psc-119",
    name: "PSC 119 Purbalingga",
    category: "HealthTech",
    year: "Mobile",
    stack: ["React Native", "Laravel", "Node.js", "Firebase", "Socket.IO"],
    description:
      "Emergency-call app for the Purbalingga Health Agency. Connects people in critical situations — medical emergencies, disasters, accidents — to responders, with realtime communication powered by Socket.IO and Firebase.",
    link: "https://play.google.com/store/apps/details?id=id.dinkespbg.psc119",
    linkName: "Play Store",
    images: ["psc119-1.png", "psc119-2.png", "psc119-3.png", "psc119-4.png", "psc119-5.png"],
  },
  {
    id: "e-patroli",
    name: "E-Patroli",
    category: "Public Safety",
    year: "Mobile",
    stack: ["Ionic", "CodeIgniter", "LeafletJS"],
    description:
      "Patrol-activity reporting for the Sabhara unit of Polres Banyumas. Officers log patrol activities from the field while command tracks patrol coverage on live maps.",
    link: null,
    linkName: null,
    images: ["Picture1.png", "Picture2.png", "Picture3.png", "Picture4.png", "Picture5.png"],
  },
  {
    id: "mobiltravel",
    name: "MobilTravel",
    category: "Travel",
    year: "Web",
    stack: ["ReactJS", "Laravel"],
    description:
      "Online travel-booking platform — reserve a seat anytime, anywhere. I developed the frontend of the platform, from booking flows to schedules and seat selection.",
    link: "https://www.mobiltravel.id/",
    linkName: "mobiltravel.id",
    images: ["mt-1.png", "mt-2.png", "mt-3.png", "mt-4.png", "mt-5.png"],
  },
  {
    id: "simkop",
    name: "Sistem Manajemen Koperasi",
    category: "FinTech",
    year: "Web",
    stack: ["ReactJS", "Laravel"],
    description:
      "Savings & loan cooperative management system — members, deposits, loans, installments and reporting. Designed and built from scratch, end to end.",
    link: null,
    linkName: null,
    images: ["simkop-1.png", "simkop-2.png", "simkop-3.png", "simkop-4.png"],
  },
  {
    id: "syirkah",
    name: "Syirkah Umat Mulia",
    category: "FinTech",
    year: "Mobile",
    stack: ["React Native", "CodePush", "Laravel"],
    description:
      "Sharia-compliant crowdfunding (urun dana) platform owned by Koperasi Syirkah Ummat Mulia. I developed the frontend, with over-the-air updates via CodePush.",
    link: "https://play.google.com/store/apps/details?id=id.sis.syirkahummatmulia&hl=en",
    linkName: "Play Store",
    images: ["sum-1.jpeg", "sum-2.jpeg", "sum-3.jpeg", "sum-4.jpeg", "sum-5.jpeg"],
  },
];
