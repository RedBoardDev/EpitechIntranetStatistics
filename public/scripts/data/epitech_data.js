const epitechData = {
  "update_date": "2024-02-05",
  "roadblocks_name": {
    "professional_writings": "Professional Communication",
    "technical_foundation": "Technical Foundation",
    "technical_supplement": "Technical Supplement",
    "innovation": "Innovation & Professionalization",
    "softskills": "Soft Skills"
  },
  "promo_requirements": {
    "pge1": {
      "units": {
        "professional_writings": ["B-PRO-100", "B-PRO-200"],
        "technical_foundation": ["B-CPE-100", "B-CPE-101", "B-CPE-110", "B-PSU-100", "B-CPE-200", "B-PSU-200"],
        "technical_supplement": ["B-MUL-100", "B-MAT-100", "B-MUL-200", "B-AIA-200", "B-NSA-100", "B-WEB-200", "B-MAT-200", "B-DOP-200", "B-SEC-200"],
        "innovation": ["G-JAM-001", "B-INN-200" ,"G-CUS-001" ,"G-CUS-002" ,"G-CUS-003" ,"G-CUS-004" ,"G-CUS-005" ,"G-CUS-006" ,"G-CUS-007" ,"G-CUS-008"],
        "softskills": ["B-PRO-100", "B-PRO-200", "B-PMP-100", "B-PMP-200", "B-PCP-000"],
        "solo_stumper": ["B-CPE-210"],
        "duo_stumper": ["B-CPE-210"]
      },
      "roadblocks": {
        "technical_foundation": 20,
        "technical_supplement": 8,
        "innovation": 3,
        "softskills": 3,
        "tepitech": 600,
        "solo_stumper": 15,
        "duo_stumper": 15,
        "professional_writings": 0,
        "total_credits": 60
      }
    },
    "pge2": {
      "units": {
        "professional_writings": ["B-PRO-100", "B-PRO-200", "B-PRO-400"],
        "technical_foundation": ["B-CCP-400", "B-NWP-400", "B-OOP-400", "B-PDG-300", "B-YEP-400"],
        "technical_supplement": ["B-CNA-410", "B-MAT-400", "B-ASM-400", "B-FUN-400", "B-DOP-400", "B-PSU-400", "B-SEC-400"],
        "innovation": ["G-JAM-001", "B-INN-400" ,"G-CUS-001" ,"G-CUS-002" ,"G-CUS-003" ,"G-CUS-004" ,"G-CUS-005" ,"G-CUS-006" ,"G-CUS-007" ,"G-CUS-008"],
        "softskills": ["B-PRO-400", "B-PCP-000", "B-PMP-400"]
      },
      "roadblocks": {
        "technical_foundation": 13,
        "technical_supplement": 6,
        "innovation": 4,
        "softskills": 3,
        "tepitech": 700,
        "professional_writings": 1,
        "total_credits": 120
      }
    },
    "pge3": {
      "units": {
        "professional_writings": ["B-PRO-100", "B-PRO-200", "B-PRO-400", "B-PRO-510"],
        "technical_foundation": ["B-CPP-500", "B-DEV-500", "B-FUN-500"],
        "technical_supplement": ["B-AIA-500", "B-DOP-500", "B-MAT-500", "B-SEC-500", "B-CNA-500"],
        "innovation": ["G-JAM-001", "B-INN-500" ,"G-CUS-001" ,"G-CUS-002" ,"G-CUS-003" ,"G-CUS-004" ,"G-CUS-005" ,"G-CUS-006" ,"G-CUS-007" ,"G-CUS-008", "B-PRO-500"],
        "softskills": ["B-DES-500", "B-SVR-500", "B-PRO-510", "B-PCP-000"]
      },
      "roadblocks": {
        "technical_foundation": 8,
        "technical_supplement": 6,
        "innovation": 6,
        "softskills": 4,
        "tepitech": 750,
        "professional_writings": 2,
        "total_credits": 180
      }
    }
  },
  "hub": {
    "unit": "B-INN-000",
    "max_credits": {
      "pge1": 5,
      "pge2": 8,
      "pge3": 8
    },
    "activities": [
      {
        "name": "Talk",
        "alias": [
          "Meetup"
        ],
        "xpWinPart": 1,
        "xpWinOrg": 4,
        "xpLostPart": 1,
        "limitPart": 15,
        "limitOrg": 6
      },
      {
        "name": "Workshop",
        "alias": [],
        "xpWinPart": 2,
        "xpWinOrg": 7,
        "xpLostPart": 2,
        "limitPart": 10,
        "limitOrg": 3
      },
      {
        "name": "Hackathon",
        "alias": [],
        "xpWinPart": 6,
        "xpWinOrg": 15,
        "xpLostPart": 6,
        "limitPart": -1,
        "limitOrg": -1
      },
      {
        "name": "Experience",
        "alias": [],
        "xpWinPart": 3,
        "xpWinOrg": 0,
        "xpLostPart": 0,
        "limitPart": 8,
        "limitOrg": 0
      },
      {
        "name": "Project",
        "alias": [],
        "xpWinPart": -1,
        "xpLostPart": -1,
        "limitPart": -1,
        "limitOrg": -1
      }
    ]
  }
}

export { epitechData };
