export const SelectTravelersList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A Solo Traveler in Exploration",
    icon: "🧒🏻",
    people: "1",
  },
  {
    id: 2,
    title: "Couple",
    desc: "Two Travelers Together",
    icon: "👨🏻👩🏻",
    people: "2",
  },
  {
    id: 3,
    title: "Family",
    desc: "A Group of Loving Homies",
    icon: "🏠",
    people: "3 to 5 people",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A Squad of Adventurers",
    icon: "🫱🏻‍🫲🏼",
    people: "6 to 10 people",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay Concious of Costs",
    icon: "🪙",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep Costs on the Average Side",
    icon: "💵",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Don't worry about Costs",
    icon: "💰",
  },
];

export const AI_PROMPT = `Generate a travel plan for {location} for {noOfDays} days for a {traveler} on a  
{budget} budget.First, provide a list of hotel options with details including the hotel name,
    address, price, image URL, geo - coordinates, rating, and description.Next, suggest a complete
day - by - day itinerary with a detailed schedule, starting with breakfast options that include
   the restaurant name, address, price, image URL, geo - coordinates, rating, and description.
    After breakfast, recommend popular places to visit in the area with details such as the
     place name, description, image URL, geo - coordinates, ticket pricing, and rating.Follow
this with lunch options(again with restaurant name, address, price, image URL,
    geo - coordinates, rating, and description), then suggest enjoyable games, activities,
        or food experiences to explore until dinner time.Lastly, provide dinner recommendations
with the same details as above.Include estimated travel times between each location
          and organize the itinerary like BREAKFAST, MORNING, LUNCH, AFTERNOON, EVENING,
    DINNER, NIGHT specifying the best times to visit each place.Provide the entire
response in JSON format.`;
