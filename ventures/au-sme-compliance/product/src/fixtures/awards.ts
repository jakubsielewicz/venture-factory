/**
 * Award fixtures — curated data for 3 of the 12 MVP awards.
 *
 * These represent the DATA layer: adding a new award requires only adding a new entry here
 * (and to AWARD_RATES below). No engine code changes are needed.
 *
 * Rates are FWC Annual Wage Review effective 2025-07-01 (3.5% increase applied).
 * Source: Fair Work Commission Annual Wage Review 2024-25 determination.
 *
 * IMPORTANT: These rates are curated for build purposes only.
 * Production rates MUST be verified by an employment solicitor before use
 * (NFR-L7 pre-launch gate).
 */

export type EmploymentType = "full_time" | "part_time" | "casual";

export interface AwardClassification {
  id: string;
  awardCode: string;
  level: string;
  description: string;
  /** Keywords matched against the employee's role_title (lower-cased) */
  keywords: string[];
  /** How strongly each keyword contributes — higher = more signal */
  keywordWeights: Record<string, number>;
}

export interface AwardRate {
  classificationId: string;
  employmentType: EmploymentType;
  rateHourly: number;
  effectiveDate: string; // ISO date
}

export interface Award {
  id: string;
  code: string;
  name: string;
  isActive: boolean;
}

// ---------------------------------------------------------------------------
// Award definitions
// ---------------------------------------------------------------------------

export const AWARDS: Award[] = [
  {
    id: "awd-hospitality",
    code: "MA000009",
    name: "Hospitality Industry (General) Award 2020",
    isActive: true,
  },
  {
    id: "awd-retail",
    code: "MA000004",
    name: "General Retail Industry Award 2020",
    isActive: true,
  },
  {
    id: "awd-clerks",
    code: "MA000002",
    name: "Clerks — Private Sector Award 2020",
    isActive: true,
  },
];

// ---------------------------------------------------------------------------
// Classification definitions (keywords drive the engine — data, not logic)
// ---------------------------------------------------------------------------

export const AWARD_CLASSIFICATIONS: AwardClassification[] = [
  // --- Hospitality Industry (General) Award 2020 (MA000009) ---
  // 7 grades; rates are full-time base (casual adds 25% loading)
  {
    id: "cls-hosp-grade1",
    awardCode: "MA000009",
    level: "Grade 1",
    description:
      "An employee at this level performs routine duties under direct supervision. Includes kitchen hand, cleaner, car park attendant, trolley collector, laundry hand.",
    keywords: [
      "kitchen hand",
      "kitchenhand",
      "cleaner",
      "cleaning",
      "car park",
      "laundry",
      "trolley",
      "offsider",
      "hand",
    ],
    keywordWeights: {
      "kitchen hand": 10,
      kitchenhand: 10,
      cleaner: 8,
      cleaning: 6,
      "car park": 8,
      laundry: 8,
      trolley: 7,
      offsider: 7,
      hand: 3,
    },
  },
  {
    id: "cls-hosp-grade2",
    awardCode: "MA000009",
    level: "Grade 2",
    description:
      "An employee at this level performs duties with limited supervision. Includes food and beverage attendant, room attendant, houseperson, cashier.",
    keywords: [
      "food and beverage",
      "f&b",
      "room attendant",
      "houseperson",
      "cashier",
      "waitstaff",
      "waiter",
      "waitress",
      "floor staff",
      "bar attendant",
      "bar",
      "gaming attendant",
    ],
    keywordWeights: {
      "food and beverage": 10,
      "f&b": 9,
      "room attendant": 10,
      houseperson: 9,
      cashier: 8,
      waitstaff: 10,
      waiter: 9,
      waitress: 9,
      "floor staff": 7,
      "bar attendant": 10,
      bar: 4,
      "gaming attendant": 9,
    },
  },
  {
    id: "cls-hosp-grade3",
    awardCode: "MA000009",
    level: "Grade 3",
    description:
      "Cook (tradesperson or equivalent); senior food and beverage attendant; front desk receptionist; concierge.",
    keywords: [
      "cook",
      "commis chef",
      "apprentice chef",
      "front desk",
      "receptionist",
      "concierge",
      "senior food",
      "senior bar",
      "senior room",
    ],
    keywordWeights: {
      cook: 9,
      "commis chef": 10,
      "apprentice chef": 10,
      "front desk": 9,
      receptionist: 8,
      concierge: 9,
      "senior food": 10,
      "senior bar": 10,
      "senior room": 10,
    },
  },
  {
    id: "cls-hosp-grade4",
    awardCode: "MA000009",
    level: "Grade 4",
    description:
      "Pastry cook (tradesperson); senior cook; head bartender; leading hand; gaming supervisor.",
    keywords: [
      "pastry cook",
      "pastry chef",
      "senior cook",
      "head bartender",
      "leading hand",
      "gaming supervisor",
      "sous chef",
    ],
    keywordWeights: {
      "pastry cook": 10,
      "pastry chef": 10,
      "senior cook": 10,
      "head bartender": 10,
      "leading hand": 8,
      "gaming supervisor": 9,
      "sous chef": 9,
    },
  },
  {
    id: "cls-hosp-grade5",
    awardCode: "MA000009",
    level: "Grade 5",
    description:
      "Chef de partie; senior supervisor; duty manager (operational); front office team leader.",
    keywords: [
      "chef de partie",
      "senior supervisor",
      "duty manager",
      "front office team leader",
      "team leader",
      "supervisor",
    ],
    keywordWeights: {
      "chef de partie": 10,
      "senior supervisor": 10,
      "duty manager": 9,
      "front office team leader": 10,
      "team leader": 6,
      supervisor: 5,
    },
  },
  {
    id: "cls-hosp-grade6",
    awardCode: "MA000009",
    level: "Grade 6",
    description:
      "Sous chef; senior supervisor with 10+ staff; assistant manager (F&B or rooms).",
    keywords: [
      "sous chef",
      "assistant manager",
      "asst manager",
      "assistant food",
      "rooms manager",
    ],
    keywordWeights: {
      "sous chef": 10,
      "assistant manager": 9,
      "asst manager": 9,
      "assistant food": 9,
      "rooms manager": 9,
    },
  },
  {
    id: "cls-hosp-grade7",
    awardCode: "MA000009",
    level: "Grade 7",
    description:
      "Head chef; executive chef; food and beverage manager; operations manager; general manager (up to 150 seats).",
    keywords: [
      "head chef",
      "executive chef",
      "food and beverage manager",
      "f&b manager",
      "operations manager",
      "general manager",
      "chef",
      "manager",
    ],
    keywordWeights: {
      "head chef": 15,
      "executive chef": 15,
      "food and beverage manager": 10,
      "f&b manager": 10,
      "operations manager": 9,
      "general manager": 9,
      chef: 5,
      manager: 3,
    },
  },

  // --- General Retail Industry Award 2020 (MA000004) ---
  // 8 levels (Retail Employee Grade 1–8)
  {
    id: "cls-retail-grade1",
    awardCode: "MA000004",
    level: "Grade 1",
    description:
      "Introductory level. An employee performing basic retail duties under direct supervision in the first 3 months. Includes shelf-filler, trolley collector.",
    keywords: ["shelf filler", "shelf-filler", "shelves", "trolley", "packer", "offsider"],
    keywordWeights: {
      "shelf filler": 10,
      "shelf-filler": 10,
      shelves: 6,
      trolley: 7,
      packer: 8,
      offsider: 7,
    },
  },
  {
    id: "cls-retail-grade2",
    awardCode: "MA000004",
    level: "Grade 2",
    description:
      "Sales assistant; checkout operator; customer service officer after completing probation.",
    keywords: [
      "sales assistant",
      "checkout",
      "customer service",
      "retail assistant",
      "shop assistant",
      "sales",
    ],
    keywordWeights: {
      "sales assistant": 10,
      checkout: 9,
      "customer service": 8,
      "retail assistant": 10,
      "shop assistant": 10,
      sales: 4,
    },
  },
  {
    id: "cls-retail-grade3",
    awardCode: "MA000004",
    level: "Grade 3",
    description:
      "Experienced sales assistant; handles cash; responsible for own work area without supervision.",
    keywords: [
      "senior sales",
      "experienced sales",
      "senior assistant",
      "cashier",
      "stock controller",
    ],
    keywordWeights: {
      "senior sales": 10,
      "experienced sales": 9,
      "senior assistant": 9,
      cashier: 7,
      "stock controller": 8,
    },
  },
  {
    id: "cls-retail-grade4",
    awardCode: "MA000004",
    level: "Grade 4",
    description:
      "Skilled employee; may supervise others; visual merchandiser; specialist product adviser.",
    keywords: [
      "visual merchandiser",
      "merchandiser",
      "specialist",
      "key holder",
      "keyholder",
      "leading hand",
    ],
    keywordWeights: {
      "visual merchandiser": 10,
      merchandiser: 8,
      specialist: 7,
      "key holder": 9,
      keyholder: 9,
      "leading hand": 8,
    },
  },
  {
    id: "cls-retail-grade5",
    awardCode: "MA000004",
    level: "Grade 5",
    description:
      "Supervisor; team leader in charge of a section or department.",
    keywords: [
      "team leader",
      "supervisor",
      "section leader",
      "department supervisor",
      "department leader",
    ],
    keywordWeights: {
      "team leader": 8,
      supervisor: 7,
      "section leader": 9,
      "department supervisor": 10,
      "department leader": 10,
    },
  },
  {
    id: "cls-retail-grade6",
    awardCode: "MA000004",
    level: "Grade 6",
    description:
      "Senior supervisor or assistant manager in a small store; in-store trainer.",
    keywords: ["senior supervisor", "assistant manager", "asst manager", "2ic", "second in charge"],
    keywordWeights: {
      "senior supervisor": 10,
      "assistant manager": 9,
      "asst manager": 9,
      "2ic": 8,
      "second in charge": 8,
    },
  },
  {
    id: "cls-retail-grade7",
    awardCode: "MA000004",
    level: "Grade 7",
    description:
      "Store manager (small store, < 15 employees) or department manager (large store).",
    keywords: [
      "store manager",
      "shop manager",
      "department manager",
      "retail manager",
    ],
    keywordWeights: {
      "store manager": 10,
      "shop manager": 10,
      "department manager": 9,
      "retail manager": 9,
    },
  },
  {
    id: "cls-retail-grade8",
    awardCode: "MA000004",
    level: "Grade 8",
    description:
      "Store manager (large store) or state/area manager under Modern Award; senior retail management.",
    keywords: [
      "area manager",
      "regional manager",
      "state manager",
      "general manager",
      "senior manager",
    ],
    keywordWeights: {
      "area manager": 10,
      "regional manager": 10,
      "state manager": 10,
      "general manager": 8,
      "senior manager": 8,
    },
  },

  // --- Clerks — Private Sector Award 2020 (MA000002) ---
  // Levels 1–6
  {
    id: "cls-clerks-level1",
    awardCode: "MA000002",
    level: "Level 1",
    description:
      "A clerical employee at the introductory level. Performs simple and routine clerical tasks under direct supervision. Filing, photocopying, data entry.",
    keywords: [
      "data entry",
      "filing",
      "photocopying",
      "administrative assistant",
      "admin assistant",
      "clerk",
      "junior clerk",
      "receptionist junior",
    ],
    keywordWeights: {
      "data entry": 9,
      filing: 7,
      photocopying: 6,
      "administrative assistant": 8,
      "admin assistant": 8,
      clerk: 5,
      "junior clerk": 10,
      "receptionist junior": 9,
    },
  },
  {
    id: "cls-clerks-level2",
    awardCode: "MA000002",
    level: "Level 2",
    description:
      "Performs clerical duties under limited supervision. Includes typist, word processing operator, records officer, accounts receivable/payable officer.",
    keywords: [
      "accounts receivable",
      "accounts payable",
      "accounts officer",
      "records officer",
      "typist",
      "word processing",
      "receptionist",
      "administration officer",
      "admin officer",
    ],
    keywordWeights: {
      "accounts receivable": 10,
      "accounts payable": 10,
      "accounts officer": 10,
      "records officer": 9,
      typist: 8,
      "word processing": 7,
      receptionist: 7,
      "administration officer": 9,
      "admin officer": 9,
    },
  },
  {
    id: "cls-clerks-level3",
    awardCode: "MA000002",
    level: "Level 3",
    description:
      "Experienced clerical employee. May supervise Level 1 or 2. Includes office administrator, bookkeeper, payroll officer.",
    keywords: [
      "bookkeeper",
      "payroll officer",
      "payroll clerk",
      "office administrator",
      "senior admin",
      "executive assistant",
      "pa",
      "personal assistant",
    ],
    keywordWeights: {
      bookkeeper: 10,
      "payroll officer": 10,
      "payroll clerk": 10,
      "office administrator": 9,
      "senior admin": 9,
      "executive assistant": 9,
      pa: 4,
      "personal assistant": 8,
    },
  },
  {
    id: "cls-clerks-level4",
    awardCode: "MA000002",
    level: "Level 4",
    description:
      "Senior clerical employee; often responsible for a section. Includes senior bookkeeper, senior payroll officer, office supervisor.",
    keywords: [
      "senior bookkeeper",
      "senior payroll",
      "office supervisor",
      "accounts supervisor",
      "finance officer",
      "senior office",
    ],
    keywordWeights: {
      "senior bookkeeper": 10,
      "senior payroll": 10,
      "office supervisor": 10,
      "accounts supervisor": 10,
      "finance officer": 8,
      "senior office": 8,
    },
  },
  {
    id: "cls-clerks-level5",
    awardCode: "MA000002",
    level: "Level 5",
    description:
      "Highly skilled clerical employee; may have management responsibilities. Includes office manager, practice manager, senior finance officer.",
    keywords: [
      "office manager",
      "practice manager",
      "senior finance",
      "accounts manager",
      "finance manager",
      "administration manager",
    ],
    keywordWeights: {
      "office manager": 10,
      "practice manager": 10,
      "senior finance": 9,
      "accounts manager": 9,
      "finance manager": 9,
      "administration manager": 9,
    },
  },
  {
    id: "cls-clerks-level6",
    awardCode: "MA000002",
    level: "Level 6",
    description:
      "Senior management clerical role; typically reports to executive. Includes business manager, operations coordinator, senior practice manager.",
    keywords: [
      "business manager",
      "operations coordinator",
      "senior practice manager",
      "chief of staff",
      "operations manager",
      "general manager",
    ],
    keywordWeights: {
      "business manager": 10,
      "operations coordinator": 9,
      "senior practice manager": 10,
      "chief of staff": 9,
      "operations manager": 8,
      "general manager": 7,
    },
  },
];

// ---------------------------------------------------------------------------
// Rate tables (effective 2025-07-01 — FWC Annual Wage Review 3.5% increase)
// All rates in AUD/hr.
// Casual loading = 25% on top of base rate.
// Part-time = same as full-time base rate.
// ---------------------------------------------------------------------------

export const AWARD_RATES: AwardRate[] = [
  // Hospitality Grade 1
  { classificationId: "cls-hosp-grade1", employmentType: "full_time",  rateHourly: 23.23, effectiveDate: "2025-07-01" },
  { classificationId: "cls-hosp-grade1", employmentType: "part_time",  rateHourly: 23.23, effectiveDate: "2025-07-01" },
  { classificationId: "cls-hosp-grade1", employmentType: "casual",     rateHourly: 29.04, effectiveDate: "2025-07-01" },

  // Hospitality Grade 2
  { classificationId: "cls-hosp-grade2", employmentType: "full_time",  rateHourly: 23.87, effectiveDate: "2025-07-01" },
  { classificationId: "cls-hosp-grade2", employmentType: "part_time",  rateHourly: 23.87, effectiveDate: "2025-07-01" },
  { classificationId: "cls-hosp-grade2", employmentType: "casual",     rateHourly: 29.84, effectiveDate: "2025-07-01" },

  // Hospitality Grade 3
  { classificationId: "cls-hosp-grade3", employmentType: "full_time",  rateHourly: 25.42, effectiveDate: "2025-07-01" },
  { classificationId: "cls-hosp-grade3", employmentType: "part_time",  rateHourly: 25.42, effectiveDate: "2025-07-01" },
  { classificationId: "cls-hosp-grade3", employmentType: "casual",     rateHourly: 31.78, effectiveDate: "2025-07-01" },

  // Hospitality Grade 4
  { classificationId: "cls-hosp-grade4", employmentType: "full_time",  rateHourly: 26.64, effectiveDate: "2025-07-01" },
  { classificationId: "cls-hosp-grade4", employmentType: "part_time",  rateHourly: 26.64, effectiveDate: "2025-07-01" },
  { classificationId: "cls-hosp-grade4", employmentType: "casual",     rateHourly: 33.30, effectiveDate: "2025-07-01" },

  // Hospitality Grade 5
  { classificationId: "cls-hosp-grade5", employmentType: "full_time",  rateHourly: 28.19, effectiveDate: "2025-07-01" },
  { classificationId: "cls-hosp-grade5", employmentType: "part_time",  rateHourly: 28.19, effectiveDate: "2025-07-01" },
  { classificationId: "cls-hosp-grade5", employmentType: "casual",     rateHourly: 35.24, effectiveDate: "2025-07-01" },

  // Hospitality Grade 6
  { classificationId: "cls-hosp-grade6", employmentType: "full_time",  rateHourly: 29.73, effectiveDate: "2025-07-01" },
  { classificationId: "cls-hosp-grade6", employmentType: "part_time",  rateHourly: 29.73, effectiveDate: "2025-07-01" },
  { classificationId: "cls-hosp-grade6", employmentType: "casual",     rateHourly: 37.16, effectiveDate: "2025-07-01" },

  // Hospitality Grade 7
  { classificationId: "cls-hosp-grade7", employmentType: "full_time",  rateHourly: 32.10, effectiveDate: "2025-07-01" },
  { classificationId: "cls-hosp-grade7", employmentType: "part_time",  rateHourly: 32.10, effectiveDate: "2025-07-01" },
  { classificationId: "cls-hosp-grade7", employmentType: "casual",     rateHourly: 40.13, effectiveDate: "2025-07-01" },

  // Retail Grade 1
  { classificationId: "cls-retail-grade1", employmentType: "full_time",  rateHourly: 22.38, effectiveDate: "2025-07-01" },
  { classificationId: "cls-retail-grade1", employmentType: "part_time",  rateHourly: 22.38, effectiveDate: "2025-07-01" },
  { classificationId: "cls-retail-grade1", employmentType: "casual",     rateHourly: 27.98, effectiveDate: "2025-07-01" },

  // Retail Grade 2
  { classificationId: "cls-retail-grade2", employmentType: "full_time",  rateHourly: 23.23, effectiveDate: "2025-07-01" },
  { classificationId: "cls-retail-grade2", employmentType: "part_time",  rateHourly: 23.23, effectiveDate: "2025-07-01" },
  { classificationId: "cls-retail-grade2", employmentType: "casual",     rateHourly: 29.04, effectiveDate: "2025-07-01" },

  // Retail Grade 3
  { classificationId: "cls-retail-grade3", employmentType: "full_time",  rateHourly: 23.87, effectiveDate: "2025-07-01" },
  { classificationId: "cls-retail-grade3", employmentType: "part_time",  rateHourly: 23.87, effectiveDate: "2025-07-01" },
  { classificationId: "cls-retail-grade3", employmentType: "casual",     rateHourly: 29.84, effectiveDate: "2025-07-01" },

  // Retail Grade 4
  { classificationId: "cls-retail-grade4", employmentType: "full_time",  rateHourly: 24.52, effectiveDate: "2025-07-01" },
  { classificationId: "cls-retail-grade4", employmentType: "part_time",  rateHourly: 24.52, effectiveDate: "2025-07-01" },
  { classificationId: "cls-retail-grade4", employmentType: "casual",     rateHourly: 30.65, effectiveDate: "2025-07-01" },

  // Retail Grade 5
  { classificationId: "cls-retail-grade5", employmentType: "full_time",  rateHourly: 25.42, effectiveDate: "2025-07-01" },
  { classificationId: "cls-retail-grade5", employmentType: "part_time",  rateHourly: 25.42, effectiveDate: "2025-07-01" },
  { classificationId: "cls-retail-grade5", employmentType: "casual",     rateHourly: 31.78, effectiveDate: "2025-07-01" },

  // Retail Grade 6
  { classificationId: "cls-retail-grade6", employmentType: "full_time",  rateHourly: 26.64, effectiveDate: "2025-07-01" },
  { classificationId: "cls-retail-grade6", employmentType: "part_time",  rateHourly: 26.64, effectiveDate: "2025-07-01" },
  { classificationId: "cls-retail-grade6", employmentType: "casual",     rateHourly: 33.30, effectiveDate: "2025-07-01" },

  // Retail Grade 7
  { classificationId: "cls-retail-grade7", employmentType: "full_time",  rateHourly: 29.73, effectiveDate: "2025-07-01" },
  { classificationId: "cls-retail-grade7", employmentType: "part_time",  rateHourly: 29.73, effectiveDate: "2025-07-01" },
  { classificationId: "cls-retail-grade7", employmentType: "casual",     rateHourly: 37.16, effectiveDate: "2025-07-01" },

  // Retail Grade 8
  { classificationId: "cls-retail-grade8", employmentType: "full_time",  rateHourly: 32.10, effectiveDate: "2025-07-01" },
  { classificationId: "cls-retail-grade8", employmentType: "part_time",  rateHourly: 32.10, effectiveDate: "2025-07-01" },
  { classificationId: "cls-retail-grade8", employmentType: "casual",     rateHourly: 40.13, effectiveDate: "2025-07-01" },

  // Clerks Level 1
  { classificationId: "cls-clerks-level1", employmentType: "full_time",  rateHourly: 22.38, effectiveDate: "2025-07-01" },
  { classificationId: "cls-clerks-level1", employmentType: "part_time",  rateHourly: 22.38, effectiveDate: "2025-07-01" },
  { classificationId: "cls-clerks-level1", employmentType: "casual",     rateHourly: 27.98, effectiveDate: "2025-07-01" },

  // Clerks Level 2
  { classificationId: "cls-clerks-level2", employmentType: "full_time",  rateHourly: 23.23, effectiveDate: "2025-07-01" },
  { classificationId: "cls-clerks-level2", employmentType: "part_time",  rateHourly: 23.23, effectiveDate: "2025-07-01" },
  { classificationId: "cls-clerks-level2", employmentType: "casual",     rateHourly: 29.04, effectiveDate: "2025-07-01" },

  // Clerks Level 3
  { classificationId: "cls-clerks-level3", employmentType: "full_time",  rateHourly: 24.52, effectiveDate: "2025-07-01" },
  { classificationId: "cls-clerks-level3", employmentType: "part_time",  rateHourly: 24.52, effectiveDate: "2025-07-01" },
  { classificationId: "cls-clerks-level3", employmentType: "casual",     rateHourly: 30.65, effectiveDate: "2025-07-01" },

  // Clerks Level 4
  { classificationId: "cls-clerks-level4", employmentType: "full_time",  rateHourly: 26.64, effectiveDate: "2025-07-01" },
  { classificationId: "cls-clerks-level4", employmentType: "part_time",  rateHourly: 26.64, effectiveDate: "2025-07-01" },
  { classificationId: "cls-clerks-level4", employmentType: "casual",     rateHourly: 33.30, effectiveDate: "2025-07-01" },

  // Clerks Level 5
  { classificationId: "cls-clerks-level5", employmentType: "full_time",  rateHourly: 29.73, effectiveDate: "2025-07-01" },
  { classificationId: "cls-clerks-level5", employmentType: "part_time",  rateHourly: 29.73, effectiveDate: "2025-07-01" },
  { classificationId: "cls-clerks-level5", employmentType: "casual",     rateHourly: 37.16, effectiveDate: "2025-07-01" },

  // Clerks Level 6
  { classificationId: "cls-clerks-level6", employmentType: "full_time",  rateHourly: 32.10, effectiveDate: "2025-07-01" },
  { classificationId: "cls-clerks-level6", employmentType: "part_time",  rateHourly: 32.10, effectiveDate: "2025-07-01" },
  { classificationId: "cls-clerks-level6", employmentType: "casual",     rateHourly: 40.13, effectiveDate: "2025-07-01" },
];

export const RATE_TABLE_EFFECTIVE_DATE = "2025-07-01";
