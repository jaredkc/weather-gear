// Gear for each sport supported by the app
//
// Guidelines:
// - The order for each gear list is head to toe, in the order you would put them on.
// - [What to wear in different temperatures](https://www.pactimo.com/blogs/cycling-people-places-things/cycling-clothing-what-to-wear)

export interface Gear {
  id: number;
  sort: number;
  name: string;
  weight: string;
  description: string;
  min_temp: number;
  max_temp: number;
}

export interface GearTip {
  heading: string;
  description: string;
  min_temp: number;
  max_temp: number;
}

/**
 * For given temperature, return every gear item were:
 * - min_temp is less than or equal to the temperature
 * - max_temp is greater than or equal to the temperature
 */
export function gearForTemp(gear: Gear[], temp: number): Gear[] {
  return gear.filter((item) => {
    return item.min_temp <= temp && item.max_temp >= temp;
  });
}


//
// List of gear for each sport
//
export const cyclingGear: Gear[] = [
  {
    id: 1,
    sort: 1,
    name: "Skull Cap",
    weight: "Light",
    description: "",
    min_temp: 40,
    max_temp: 50,
  },
  {
    id: 1,
    sort: 1,
    name: "Skull Cap",
    weight: "Mid Weight",
    description: "",
    min_temp: 32,
    max_temp: 40,
  },
  {
    id: 1,
    sort: 1,
    name: "Short Sleeve Jersey",
    weight: "Light",
    description: "",
    min_temp: 65,
    max_temp: 120,
  },
  {
    id: 1,
    sort: 1,
    name: "Arm Warmers",
    weight: "Light",
    description: "",
    min_temp: 44,
    max_temp: 55,
  },
  {
    id: 1,
    sort: 1,
    name: "Gloves",
    weight: "Light",
    description: "",
    min_temp: 40,
    max_temp: 50,
  },
];

export const cyclingTips: GearTip[] = [
  {
    heading: "Are you crazy?",
    description: "It's too cold to ride! Get on the trainer.",
    min_temp: -100,
    max_temp: 0,
  },
  {
    heading: "Yikes!",
    description: "It's below freezing. You should probably stay inside.",
    min_temp: 0,
    max_temp: 32,
  }
];

/**
 * Create a starting Gear[] list from a list of strings,
 * assign a unique id and increment the sort value for each item
 */
export function createGearList(gearList: string[]): Gear[] {
  let sort = 0;
  const date = new Date().getTime();
  return gearList.map((item) => {
    sort++;
    return {
      id: sort + date,
      sort: sort,
      name: item,
      weight: "",
      description: "",
      min_temp: 0,
      max_temp: 0,
    };
  });
}

// List of gear items for each sport,
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cyclingGearItems = [
  // Head
  "Balaclava (0:32)",
  "Under Helmet Cap (32:40)",
  "Skull Cap (40:50)",
  "Neck Warmer (32:45)",
  // Body
  "Base Layer (45:65",
  "Arm Warmers (45:55)",
  "Long Sleeve Jersery (40:60)",
  "Short Sleeve Jersey (60:120)",
  "Thermal Jacket (0:45)",
  "Vest (40:55)",
  // Hands
  "Thermal Gloves (00:32)",
  "Full Finger Gloves (32:50)",
  // Legs
  "Thermal Tights (0:40)",
  "Bib Shorts (40:120)",
  "Knee Warmers (40:55)",
  // Feet
  "Socks",
  "Shoe Covers",
  "Toe Covers",
];