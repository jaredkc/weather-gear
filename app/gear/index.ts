// Gear for each sport supported by the app
//
// Guidelines:
// - The order for each gear list is head to toe, in the order you would put them on.
// - [What to wear in different temperatures](https://www.pactimo.com/blogs/cycling-people-places-things/cycling-clothing-what-to-wear)
// - [Winter running gear](https://tinamuir.com/winter-running-what-to-wear-at-every-temperature/)

export { cyclingGear } from "./cycling-gear";
export { runningGear } from "./running-gear";

export interface Gear {
  id: number;
  sort: number;
  name: string;
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
  temp = Math.round(temp);
  return gear.filter((item) => {
    return item.min_temp <= temp && item.max_temp >= temp;
  });
}

/**
 * Create a starting Gear[] list from a list of strings,
 * assign a unique id and increment the sort value for each item
 */
export function createGearList(gearList: string[]): Gear[] {
  let sort = 0;
  const date = new Date().getTime();
  return gearList.map((item) => {
    const name = item.split(" (")[0];
    const min = parseInt(item.split(" (")[1].split("-")[0]);
    const max = parseInt(item.split(" (")[1].split("-")[1].split(")")[0]);

    sort++;
    return {
      id: sort + date,
      sort: sort,
      name: name,
      description: "",
      min_temp: min,
      max_temp: max,
    };
  });
}

// List of gear items for each sport,
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cyclingGearItems = [
  // Head
  "Balaclava (0-32)",
  "Under Helmet Cap (33-39)",
  "Neck Gaiter (33-39)",
  "Skull Cap (40-55)",
  // Body
  "Thermal Jacket (0-32)",
  "Thermal Long Sleeve Base Layer (0-39)",
  "Long Sleeve Jersery (33-39)",
  "Short Sleeve Base Layer (40-64)",
  "Arm Warmers (40-64)",
  "Windproof Vest (40-64)",
  "Short Sleeve Jersey (40-120)",
  "Sun Sleeves (65-120)",
  // Hands
  "Thermal Gloves (0-32)",
  "Full Finger Gloves (33-50)",
  "Short Finger Gloves (51-120)",
  // Legs
  "Thermal Tights (0-39)",
  "Bib Knickers (40-60)",
  "Bib Shorts (60-120)",
  "Knee Warmers (50-68)",
  // Feet
  "Winter or Wool Socks (0-32)",
  "Mid-weight Socks (33-64)",
  "Light-weight Socks (65-120)",
  "Shoe Covers (0-32)",
  "Toe Covers (40-55)",
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const runningGearItems = [
  // Head
  "Headband (26-39)",
  "Balaclava/Neck Gaiter (0-25)",
  "Beanie (0-25)",
  // Body
  "Short-Sleeve Shirt (60-120)",
  "Long-Sleeve Shirt (36-59)",
  "Light Base Layer (36-45)",
  "Thermal Base Layer (0-35)",
  "Windproof Vest (31-40)",
  "Insulated Vest (0-39)",
  // Hands
  "Gloves (21-39)",
  "Thermal Gloves (0-20)",
  // Legs
  "Running Shorts (40-120)",
  "Pants/Tights (21-39)",
  "Thermal Tights (0-20)",
  // Feet
  "Light Socks (39-120)",
  "Mid-weight Socks (26-39)",
  "Wool Socks (0-25)",
];

// To run the createGearList function, uncomment the following lines.
// Then run `npx tsx index.ts` in the terminal.
// console.log(createGearList(cyclingGearItems));
// console.log(createGearList(runningGearItems));
