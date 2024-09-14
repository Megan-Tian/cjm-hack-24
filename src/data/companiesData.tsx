export interface Company {
    name: string;
    industry: string;
    missionStatement: string;
  }
  
  export const companies: Company[] = [
    {
      name: "TechCorp",
      industry: "Software Development",
      missionStatement: "Empowering businesses through innovative software solutions."
    },
    {
      name: "InnovateSoft",
      industry: "IT Consulting",
      missionStatement: "Driving digital transformation for enterprises worldwide."
    },
    {
      name: "DataDynamics",
      industry: "Data Analytics",
      missionStatement: "Unlocking insights from data to fuel business growth."
    },
    {
      name: "CloudSolutions",
      industry: "Cloud Computing",
      missionStatement: "Enabling seamless cloud adoption for businesses of all sizes."
    },
    {
      name: "AIVentures",
      industry: "Artificial Intelligence",
      missionStatement: "Advancing AI technologies to solve real-world problems."
    }
  ];