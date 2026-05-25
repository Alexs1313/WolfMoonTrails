import type {PlaceCategoryId} from '../consts/places';
import type {PlaceImageKey} from './placeImages';

export type Place = {
  id: string;
  title: string;
  category: PlaceCategoryId;
  country: string;
  location: string;
  shortDescription: string;
  fullDescription: string;
  address: string;
  latitude: number;
  longitude: number;
  animals: string[];
  accessibility: string;
  bestTimeToVisit: string;
  safetyNote: string;
  scenicHighlight: string;
  imageKey: PlaceImageKey;
  featured?: boolean;
};

export const places: Place[] = [
  {
    id: 'lamar-valley',
    title: 'Lamar Valley',
    category: 'wolf-lands',
    country: 'United States',
    location: 'Yellowstone National Park, Wyoming',
    shortDescription:
      'One of the most iconic wolf-watching areas in North America.',
    fullDescription:
      'Lamar Valley is a wide, open valley in the northeastern part of Yellowstone National Park, often associated with wolf observation, large grazing herds, and dramatic mountain scenery. Its open landscape makes it one of the strongest locations for visitors who want to experience a real wilderness atmosphere from established park roads and viewpoints. Wolves are never guaranteed, but this area is widely known for wildlife watching, especially during early morning and evening hours.',
    address:
      'Lamar Valley, Northeast Entrance Road, Yellowstone National Park, WY, USA',
    latitude: 44.9009,
    longitude: -110.234,
    animals: [
      'Gray wolf',
      'Bison',
      'Elk',
      'Pronghorn',
      'Coyote',
      'Grizzly bear',
      'Black bear',
      'Bald eagle',
    ],
    accessibility:
      'Moderate — accessible by park road and viewpoints, but wildlife viewing requires patience, distance, and binoculars.',
    bestTimeToVisit: 'May – October',
    safetyNote:
      'Keep safe distance from wildlife. Stay on roads and designated viewing areas.',
    scenicHighlight:
      'Open valley views with grazing herds and distant mountain ridges at dawn.',
    imageKey: 'lamar-valley',
    featured: true,
  },
  {
    id: 'northern-range',
    title: 'Northern Range',
    category: 'wolf-lands',
    country: 'United States',
    location: 'Yellowstone National Park, Wyoming / Montana',
    shortDescription:
      'A broad Yellowstone wildlife zone strongly connected with wolves and large predator ecology.',
    fullDescription:
      'The Northern Range is one of Yellowstone’s most important wildlife landscapes. It includes open valleys, grasslands, river corridors, and mountain foothills where wolves, elk, bison, bears, coyotes, and other animals are part of a dynamic ecosystem. This is a strong location for the app because it feels larger than a single trail — more like a complete wilderness region where visitors can explore different viewpoints and wildlife routes while staying within official park access areas.',
    address: 'Northern Range, Yellowstone National Park, WY / MT, USA',
    latitude: 44.9746,
    longitude: -110.6895,
    animals: [
      'Gray wolf',
      'Elk',
      'Bison',
      'Coyote',
      'Grizzly bear',
      'Black bear',
      'Mule deer',
      'Raven',
      'Bald eagle',
    ],
    accessibility:
      'Moderate — accessible through park roads and established viewing areas; best experienced by car with short stops and viewing points.',
    bestTimeToVisit: 'April – November',
    safetyNote:
      'Never approach wildlife. Use binoculars and follow ranger guidance on roads.',
    scenicHighlight:
      'River corridors and grasslands stretching toward mountain foothills.',
    imageKey: 'northern-range',
  },
  {
    id: 'isle-royale-national-park',
    title: 'Isle Royale National Park',
    category: 'wolf-lands',
    country: 'United States',
    location: 'Houghton, Michigan / Lake Superior',
    shortDescription:
      'A remote island national park famous for its wolf and moose relationship.',
    fullDescription:
      'Isle Royale National Park is a remote wilderness island in Lake Superior, known for its long-running wolf and moose ecological story. It is one of the most atmospheric locations in this category because it feels isolated, quiet, and deeply wild. Visitors come for hiking, backpacking, boating, kayaking, camping, and nature observation. Access requires planning because the island is reached by ferry, seaplane, or private boat during the visitor season.',
    address: '800 East Lakeshore Drive, Houghton, MI 49931, USA',
    latitude: 48.011,
    longitude: -88.8278,
    animals: [
      'Gray wolf',
      'Moose',
      'Red fox',
      'Beaver',
      'Red squirrel',
      'Otter',
      'Bald eagle',
      'Common loon',
    ],
    accessibility:
      'Difficult — remote island access, seasonal transportation, hiking trails, and limited services.',
    bestTimeToVisit: 'June – September',
    safetyNote:
      'Plan ferry or flight access in advance. Carry supplies for remote island conditions.',
    scenicHighlight:
      'Quiet Lake Superior shoreline and dense boreal forest trails.',
    imageKey: 'isle-royale-national-park',
  },
  {
    id: 'bavarian-forest-national-park',
    title: 'Bavarian Forest National Park',
    category: 'wolf-lands',
    country: 'Germany',
    location: 'Grafenau, Bavaria',
    shortDescription:
      'A European forest destination with wolves, lynx, bison, and accessible nature routes.',
    fullDescription:
      'Bavarian Forest National Park offers dense forest scenery, mountain trails, visitor facilities, and wildlife-focused areas. It works well for a European Wolf Lands category because visitors can explore forest routes and also experience animal enclosures connected with native and formerly native species. The park combines real wilderness atmosphere with structured visitor access, making it easier to adapt into a travel app without turning the experience into unsafe wildlife chasing.',
    address: 'Freyunger Straße 2, 94481 Grafenau, Germany',
    latitude: 48.967,
    longitude: 13.383,
    animals: [
      'Wolf',
      'Lynx',
      'Bison',
      'Wildcat',
      'Deer',
      'Wild boar',
      'Owl',
      'Eagle owl',
    ],
    accessibility:
      'Easy to Moderate — visitor centers and some animal enclosure routes are accessible, while forest trails vary by distance and terrain.',
    bestTimeToVisit: 'May – October',
    safetyNote:
      'Follow park signage on enclosure routes and forest trail conditions.',
    scenicHighlight:
      'Dense mountain forest canopy with structured wildlife observation areas.',
    imageKey: 'bavarian-forest-national-park',
  },
  {
    id: 'algonquin-provincial-park',
    title: 'Algonquin Provincial Park',
    category: 'wolf-lands',
    country: 'Canada',
    location: 'Ontario, near Whitney / Dwight',
    shortDescription:
      'A classic Canadian wilderness park associated with eastern wolves and forest wildlife.',
    fullDescription:
      'Algonquin Provincial Park is one of Ontario’s most famous wilderness destinations, known for forests, lakes, canoe routes, camping, hiking, and wildlife observation. It is strongly connected with eastern wolves, while also being home to moose, black bears, deer, beavers, foxes, owls, and many bird species. For the app, this location fits perfectly as a dark-blue forest wilderness route with a strong wolf identity and a calm, atmospheric travel mood.',
    address: 'Algonquin Provincial Park, Highway 60 Corridor, Ontario, Canada',
    latitude: 45.5839,
    longitude: -78.3595,
    animals: [
      'Eastern wolf',
      'Moose',
      'Black bear',
      'White-tailed deer',
      'Beaver',
      'Red fox',
      'Great gray owl',
      'Canada jay',
    ],
    accessibility:
      'Easy to Difficult — Highway 60 areas and visitor facilities are accessible, while interior canoe and backcountry routes require experience and planning.',
    bestTimeToVisit: 'May – October',
    safetyNote:
      'Prepare for backcountry travel if leaving Highway 60 corridor routes.',
    scenicHighlight:
      'Forest lakes and canoe routes beneath eastern wolf habitat.',
    imageKey: 'algonquin-provincial-park',
  },
  {
    id: 'brooks-falls',
    title: 'Brooks Falls',
    category: 'bear-country',
    country: 'United States',
    location: 'King Salmon, Alaska',
    shortDescription:
      'A famous bear-viewing location with platforms overlooking brown bears fishing for salmon.',
    fullDescription:
      'Brooks Falls is one of the most recognizable bear-viewing places in Alaska. Located inside Katmai National Park and Preserve, it is known for brown bears gathering near Brooks River during the salmon run. Visitors can watch from designated viewing platforms, which makes the experience more structured and safer than open wilderness viewing. The location is especially strong for an app because it has a clear visual identity: river, waterfall, salmon, forest, and powerful bears in their natural habitat. The Falls Platform has limited capacity, and rangers manage access during busy periods.',
    address:
      'Brooks Falls, Katmai National Park and Preserve, King Salmon, AK, USA',
    latitude: 58.5546,
    longitude: -155.7775,
    animals: [
      'Brown bear',
      'Sockeye salmon',
      'Bald eagle',
      'Gulls',
      'Red fox',
      'Moose',
    ],
    accessibility:
      'Moderate to Difficult — remote access by air taxi or boat connection; viewing platforms are structured, but reaching the area requires planning.',
    bestTimeToVisit: 'July – September',
    safetyNote:
      'Stay on viewing platforms. Rangers manage access during peak salmon season.',
    scenicHighlight:
      'Brown bears fishing at the waterfall during the salmon run.',
    imageKey: 'brooks-falls',
  },
  {
    id: 'chinitna-bay',
    title: 'Chinitna Bay',
    category: 'bear-country',
    country: 'United States',
    location: 'Port Alsworth / Lake Clark National Park and Preserve, Alaska',
    shortDescription:
      'A coastal bear-viewing area where brown bears feed along beaches, meadows, and tidal flats.',
    fullDescription:
      'Chinitna Bay is one of Lake Clark National Park and Preserve’s strongest coastal bear-viewing destinations. Brown bears are often observed feeding on sedge grasses, digging for clams, moving along the shoreline, or fishing during seasonal runs. The landscape feels wide, cinematic, and raw: mountains, coastal flats, water, and open bear habitat. This location should be presented with a strong safety tone, because viewing often happens in open terrain with guides and strict distance awareness.',
    address: 'Chinitna Bay, Lake Clark National Park and Preserve, AK, USA',
    latitude: 59.8675,
    longitude: -153.1197,
    animals: [
      'Brown bear',
      'Bald eagle',
      'Shorebirds',
      'Salmon',
      'Fox',
      'Harbor seal',
    ],
    accessibility:
      'Difficult — remote coastal access, usually by small aircraft; best experienced with professional guides.',
    bestTimeToVisit: 'June – August',
    safetyNote:
      'Travel with licensed guides. Maintain strict distance in open coastal terrain.',
    scenicHighlight:
      'Mountains rising above coastal flats where bears feed along the shoreline.',
    imageKey: 'chinitna-bay',
  },
  {
    id: 'crescent-lake',
    title: 'Crescent Lake',
    category: 'bear-country',
    country: 'United States',
    location: 'Port Alsworth / Lake Clark National Park and Preserve, Alaska',
    shortDescription:
      'A remote mountain lake where bears may be seen near salmon-rich shorelines.',
    fullDescription:
      'Crescent Lake is a dramatic wilderness lake inside Lake Clark National Park and Preserve, surrounded by mountains, forest, and bear habitat. During salmon season, bears may use the shoreline and nearby corridors while feeding and moving through the area. The National Park Service notes that visitors are likely to encounter bears around Crescent Lake and warns that low visibility near dense shoreline brush requires extra caution. This makes Crescent Lake a strong Bear Country location, but it should always be framed as remote, serious, and guide-oriented rather than casual sightseeing.',
    address: 'Crescent Lake, Lake Clark National Park and Preserve, AK, USA',
    latitude: 60.418,
    longitude: -152.879,
    animals: [
      'Brown bear',
      'Black bear',
      'Sockeye salmon',
      'Bald eagle',
      'Moose',
      'Waterfowl',
    ],
    accessibility:
      'Difficult — remote fly-in destination with limited facilities; bear safety knowledge and guided travel are strongly recommended.',
    bestTimeToVisit: 'July – September',
    safetyNote:
      'Extra caution near dense shoreline brush. Guided travel strongly recommended.',
    scenicHighlight:
      'Mountain-ringed lake with salmon-rich shorelines at peak season.',
    imageKey: 'crescent-lake',
  },
  {
    id: 'grand-teton-national-park',
    title: 'Grand Teton National Park',
    category: 'bear-country',
    country: 'United States',
    location: 'Moose, Wyoming',
    shortDescription:
      'A scenic mountain park where visitors may encounter grizzly bears, black bears, and other large wildlife.',
    fullDescription:
      'Grand Teton National Park is a powerful Bear Country destination because it combines accessible scenic roads with serious wildlife habitat. Visitors may see grizzly bears or black bears, but safe viewing requires distance, binoculars, patience, and respect for ranger instructions. The park is not a controlled bear-viewing platform location like Brooks Falls; it is a real mountain ecosystem where wildlife encounters can happen near roads, trails, rivers, and forest edges. The app should present this place with a clear warning: never approach bears, never block roads, and never treat a sighting like a photo opportunity at close range.',
    address: 'Grand Teton National Park, Moose, WY 83012, USA',
    latitude: 43.7904,
    longitude: -110.6818,
    animals: [
      'Grizzly bear',
      'Black bear',
      'Moose',
      'Elk',
      'Bison',
      'Mule deer',
      'Pronghorn',
      'Bald eagle',
      'Coyote',
    ],
    accessibility:
      'Easy to Moderate — many viewpoints are road-accessible, but trails and wildlife areas require caution and preparation.',
    bestTimeToVisit: 'May – October',
    safetyNote:
      'Never approach bears. Never block roads. Keep safe distance at all times.',
    scenicHighlight:
      'Teton Range rising above river corridors and open wildlife habitat.',
    imageKey: 'grand-teton-national-park',
  },
  {
    id: 'hayden-valley',
    title: 'Hayden Valley',
    category: 'bear-country',
    country: 'United States',
    location: 'Yellowstone National Park, Wyoming',
    shortDescription:
      'A wide Yellowstone valley known for wildlife viewing, including bears, bison, wolves, and elk.',
    fullDescription:
      'Hayden Valley is one of Yellowstone National Park’s major wildlife-viewing landscapes. The open valley, river corridor, meadows, and surrounding slopes create strong conditions for observing large animals from established roads and pullouts. It fits the Bear Country category because grizzly bears and black bears may be seen in the wider valley area, but it also belongs to a broader predator-and-grazing ecosystem with bison, wolves, coyotes, and elk. This location should be shown with a strict safety note: keep distance, stay near approved viewing areas, do not walk toward wildlife, and never leave food accessible.',
    address:
      'Hayden Valley, Grand Loop Road, Yellowstone National Park, WY 82190, USA',
    latitude: 44.6438,
    longitude: -110.4554,
    animals: [
      'Grizzly bear',
      'Black bear',
      'Bison',
      'Wolf',
      'Elk',
      'Coyote',
      'River otter',
      'Bald eagle',
      'Raven',
    ],
    accessibility:
      'Easy to Moderate — accessible by park road and viewpoints; safe viewing depends on distance, traffic rules, and ranger guidance.',
    bestTimeToVisit: 'May – October',
    safetyNote:
      'Keep distance from wildlife. Stay near approved viewing areas and never leave food accessible.',
    scenicHighlight:
      'Wide valley meadows along the Yellowstone River at sunrise.',
    imageKey: 'hayden-valley',
  },
  {
    id: 'hayden-valley-forest-giants',
    title: 'Hayden Valley',
    category: 'forest-giants',
    country: 'United States',
    location: 'Yellowstone National Park, Wyoming',
    shortDescription:
      'A wide Yellowstone valley known for bison, elk, and classic large-wildlife viewing.',
    fullDescription:
      'Hayden Valley is one of the most recognizable wildlife landscapes in Yellowstone National Park. Its open meadows, river corridor, distant ridges, and broad viewing areas make it a strong destination for observing large animals from safe distances. Bison are often the main visual symbol of the valley, while elk and other wildlife may also be seen across the grasslands and near the Yellowstone River. This location works perfectly as a hero card for the Forest Giants category because it feels spacious, powerful, and deeply connected to large North American wildlife.',
    address:
      'Hayden Valley, Grand Loop Road, Yellowstone National Park, WY 82190, USA',
    latitude: 44.6438,
    longitude: -110.4554,
    animals: [
      'Bison',
      'Elk',
      'Mule deer',
      'Grizzly bear',
      'Black bear',
      'Wolf',
      'Coyote',
      'Bald eagle',
      'Raven',
    ],
    accessibility:
      'Easy to Moderate — accessible by park road and viewpoints, but wildlife viewing requires distance, patience, and safe roadside behavior.',
    bestTimeToVisit: 'May – October',
    safetyNote:
      'Observe bison and elk from safe roadside distances. Do not approach herds.',
    scenicHighlight:
      'Bison herds grazing across open meadows beside the Yellowstone River.',
    imageKey: 'hayden-valley-forest-giants',
  },
  {
    id: 'elk-island-national-park',
    title: 'Elk Island National Park',
    category: 'forest-giants',
    country: 'Canada',
    location: 'Fort Saskatchewan / Edmonton Region, Alberta',
    shortDescription:
      'A Canadian prairie-forest park famous for bison, elk, deer, and birdlife.',
    fullDescription:
      'Elk Island National Park is one of the strongest locations for the Forest Giants category because it is closely associated with bison conservation and large grazing animals. The park combines open meadows, forest edges, wetlands, and scenic driving routes, making it accessible for visitors who want to experience wildlife without entering deep backcountry. Bison are the signature animals here, while elk, deer, moose, coyotes, and many bird species add variety to the landscape.',
    address:
      'Elk Island National Park, 54401 Range Road 203, Fort Saskatchewan, AB T8L 0V3, Canada',
    latitude: 53.5946,
    longitude: -112.8346,
    animals: [
      'Plains bison',
      'Wood bison',
      'Elk',
      'Moose',
      'White-tailed deer',
      'Mule deer',
      'Coyote',
      'Beaver',
      'Waterfowl',
      'Birds of prey',
    ],
    accessibility:
      'Easy to Moderate — road-accessible areas, visitor facilities, short trails, and scenic wildlife viewing routes are available.',
    bestTimeToVisit: 'May – September',
    safetyNote:
      'Keep distance from bison herds on scenic driving routes.',
    scenicHighlight:
      'Open meadows where plains and wood bison graze near forest edges.',
    imageKey: 'elk-island-national-park',
  },
  {
    id: 'grand-teton-national-park-forest-giants',
    title: 'Grand Teton National Park',
    category: 'forest-giants',
    country: 'United States',
    location: 'Moose, Wyoming',
    shortDescription:
      'A mountain wildlife destination with moose, elk, bison, pronghorn, and dramatic alpine scenery.',
    fullDescription:
      'Grand Teton National Park is a powerful scenic destination for large wildlife viewing. The park’s mountains, river corridors, wetlands, grasslands, and forest edges create strong habitat for moose, elk, bison, deer, and pronghorn. It is especially useful for the app because it combines iconic landscapes with accessible wildlife-viewing areas. Visitors can explore roads, pullouts, trails, and viewpoints, but all wildlife should be observed from a safe distance.',
    address: 'Grand Teton National Park, Moose, WY 83012, USA',
    latitude: 43.7904,
    longitude: -110.6818,
    animals: [
      'Moose',
      'Elk',
      'Bison',
      'Pronghorn',
      'Mule deer',
      'Black bear',
      'Grizzly bear',
      'Coyote',
      'Bald eagle',
    ],
    accessibility:
      'Easy to Moderate — many viewpoints are road-accessible, while hiking areas require preparation and wildlife awareness.',
    bestTimeToVisit: 'May – October',
    safetyNote:
      'Watch for moose near wetlands. Maintain distance from all large wildlife.',
    scenicHighlight:
      'Moose and elk habitat along the Snake River beneath the Teton Range.',
    imageKey: 'grand-teton-national-park-forest-giants',
  },
  {
    id: 'jasper-national-park',
    title: 'Jasper National Park',
    category: 'forest-giants',
    country: 'Canada',
    location: 'Jasper, Alberta',
    shortDescription:
      'A vast Canadian Rockies park known for elk, deer, moose, mountain wildlife, and wilderness scenery.',
    fullDescription:
      'Jasper National Park fits the Forest Giants category through its strong connection to large animals and mountain wilderness. Visitors may encounter elk around open valleys, deer near forest edges, moose in wetland areas, and other wildlife across the park’s scenic routes. The park has a wide range of accessible viewpoints, lakeside areas, drives, and hiking routes, making it suitable for both casual travelers and more experienced outdoor visitors. Its deep forests, cold lakes, and dramatic peaks also match the dark-blue wilderness mood of the app.',
    address: 'Jasper National Park, Jasper, AB T0E 1E0, Canada',
    latitude: 52.8737,
    longitude: -118.0814,
    animals: [
      'Elk',
      'Moose',
      'Mule deer',
      'White-tailed deer',
      'Caribou',
      'Bighorn sheep',
      'Mountain goat',
      'Black bear',
      'Grizzly bear',
      'Wolf',
      'Coyote',
    ],
    accessibility:
      'Easy to Difficult — townside and roadside viewing areas are accessible, while remote trails require planning and outdoor experience.',
    bestTimeToVisit: 'June – September',
    safetyNote:
      'Carry bear spray on trails. Keep distance from elk during rutting season.',
    scenicHighlight:
      'Cold alpine lakes framed by deep forest and dramatic Rocky Mountain peaks.',
    imageKey: 'jasper-national-park',
  },
  {
    id: 'moose-area',
    title: 'Moose Area',
    category: 'forest-giants',
    country: 'United States',
    location: 'Moose, Wyoming',
    shortDescription:
      'A scenic Grand Teton area near the Snake River, associated with moose and classic mountain views.',
    fullDescription:
      'The Moose area is a useful standalone app location because it offers a strong connection between wildlife, river scenery, and the Teton Range. Located near the Snake River and central Grand Teton access points, this area is often associated with moose habitat, wetlands, cottonwood corridors, and open views of the mountains. It works well as a more focused Forest Giants destination, especially for users interested in moose, river valleys, and quieter wildlife-viewing moments.',
    address: 'Moose, Grand Teton National Park, WY 83012, USA',
    latitude: 43.6566,
    longitude: -110.7183,
    animals: [
      'Moose',
      'Elk',
      'Mule deer',
      'Bison',
      'Pronghorn',
      'Beaver',
      'Coyote',
      'Bald eagle',
      'Osprey',
    ],
    accessibility:
      'Easy to Moderate — accessible by road and nearby visitor areas, with some trails and riverside zones requiring basic outdoor caution.',
    bestTimeToVisit: 'May – October',
    safetyNote:
      'Approach wetlands quietly. Moose can be unpredictable — keep distance.',
    scenicHighlight:
      'Snake River wetlands with Teton peaks reflected at dawn.',
    imageKey: 'moose-area',
  },
  {
    id: 'hawk-mountain-sanctuary',
    title: 'Hawk Mountain Sanctuary',
    category: 'sky-hunters',
    country: 'United States',
    location: 'Kempton, Pennsylvania',
    shortDescription:
      'A classic raptor-watching sanctuary known for hawks, eagles, falcons, and seasonal migration counts.',
    fullDescription:
      'Hawk Mountain Sanctuary is one of the strongest bird-of-prey destinations for the Sky Hunters category. Located along an important migration route in eastern Pennsylvania, it is known for lookout points where visitors can watch hawks, eagles, falcons, vultures, and other raptors moving across the ridgeline. The location works well for app content because it combines accessible trails, conservation history, scenic overlooks, and a clear wildlife focus. It should be presented as a respectful observation site where binoculars, patience, and quiet behavior matter.',
    address: '1700 Hawk Mountain Road, Kempton, PA 19529, USA',
    latitude: 40.6386,
    longitude: -75.9919,
    animals: [
      'Red-tailed hawk',
      'Broad-winged hawk',
      'Bald eagle',
      'Golden eagle',
      'Peregrine falcon',
      'Kestrel',
      'Turkey vulture',
      'Black vulture',
      'Owl species',
    ],
    accessibility:
      'Moderate — visitor areas and trails are available, but lookout access can include rocky paths and uneven terrain.',
    bestTimeToVisit: 'September – November',
    safetyNote:
      'Use binoculars and stay quiet at lookout points. Trails can be rocky.',
    scenicHighlight:
      'Raptors crossing the Appalachian ridgeline during autumn migration.',
    imageKey: 'hawk-mountain-sanctuary',
  },
  {
    id: 'hawk-hill',
    title: 'Hawk Hill',
    category: 'sky-hunters',
    country: 'United States',
    location: 'Marin Headlands, California',
    shortDescription:
      'A coastal raptor migration viewpoint above the Golden Gate area.',
    fullDescription:
      'Hawk Hill is a scenic raptor-watching location in the Marin Headlands, within Golden Gate National Recreation Area. It is known for autumn migration, when hawks, falcons, eagles, vultures, osprey, and other birds of prey move through the coastal flyway. For the app, this location gives the Sky Hunters category a strong coastal identity: ocean air, cliffs, Golden Gate views, blue sky, and birds crossing the headlands.',
    address:
      'Hawk Hill, Conzelman Road, Marin Headlands, Golden Gate National Recreation Area, Sausalito, CA, USA',
    latitude: 37.8277,
    longitude: -122.4994,
    animals: [
      'Red-tailed hawk',
      "Cooper's hawk",
      "Sharp-shinned hawk",
      'Peregrine falcon',
      'American kestrel',
      'Bald eagle',
      'Osprey',
      'Northern harrier',
      'Turkey vulture',
    ],
    accessibility:
      'Easy to Moderate — road access and viewpoints are available, but some paths and lookout areas may involve slopes, wind, and exposed terrain.',
    bestTimeToVisit: 'September – November',
    safetyNote:
      'Watch for wind on exposed headland paths. Stay on designated viewpoints.',
    scenicHighlight:
      'Coastal flyway views with Golden Gate panoramas during autumn migration.',
    imageKey: 'hawk-hill',
  },
  {
    id: 'falsterbo-bird-observatory',
    title: 'Falsterbo Bird Observatory',
    category: 'sky-hunters',
    country: 'Sweden',
    location: 'Falsterbo, Skåne County',
    shortDescription:
      'A major European bird migration point, especially strong during autumn raptor movement.',
    fullDescription:
      'Falsterbo Bird Observatory is one of Europe’s most important migration-monitoring areas. The Falsterbo peninsula acts like a natural funnel for migrating birds moving south and southwest, making it especially valuable for watching raptors during the autumn season. This location fits the Sky Hunters category because it feels scientific, coastal, and atmospheric at the same time. The observatory’s migration monitoring includes standardized counts, and raptors are counted as long as significant migration continues during the day.',
    address: 'Falsterbo Bird Observatory, Falsterbo, Skåne County, Sweden',
    latitude: 55.3833,
    longitude: 12.8167,
    animals: [
      'Honey buzzard',
      'Common buzzard',
      'Sparrowhawk',
      'Red kite',
      'Marsh harrier',
      'Peregrine falcon',
      'Kestrel',
      'White-tailed eagle',
      'Owls',
      'Migratory passerines',
    ],
    accessibility:
      'Easy to Moderate — observation areas are generally accessible, but the best viewing depends on season, wind direction, and weather.',
    bestTimeToVisit: 'August – October',
    safetyNote:
      'Check wind direction before choosing an observation spot on the peninsula.',
    scenicHighlight:
      'Coastal funnel skies filled with raptors during peak autumn migration.',
    imageKey: 'falsterbo-bird-observatory',
  },
  {
    id: 'south-flommen',
    title: 'South Flommen',
    category: 'sky-hunters',
    country: 'Sweden',
    location: 'Falsterbo, Skåne County',
    shortDescription:
      'A secondary Falsterbo observation area for watching migrating birds and raptors near the coast.',
    fullDescription:
      'South Flommen is a useful additional birdwatching zone on the Falsterbo peninsula. It can be presented in the app as a quieter observation area near coastal terrain, golf-course edges, beach paths, and open sky. This location is especially relevant when wind conditions shift bird movement across the peninsula. Falsterbo Bird Observatory notes that suitable observation spots may change depending on wind drift, which makes South Flommen a logical secondary Sky Hunters location rather than just a duplicate of the main observatory.',
    address: 'South Flommen, Falsterbo, Skåne County, Sweden',
    latitude: 55.388,
    longitude: 12.822,
    animals: [
      'Buzzards',
      'Harriers',
      'Sparrowhawks',
      'Falcons',
      'White-tailed eagle',
      'Gulls',
      'Waders',
      'Migratory songbirds',
      'Coastal birds',
    ],
    accessibility:
      'Easy to Moderate — mostly coastal walking and observation, but conditions can be windy and seasonal visibility changes.',
    bestTimeToVisit: 'August – October',
    safetyNote:
      'Wind conditions may shift — choose observation spots based on daily drift.',
    scenicHighlight:
      'Open coastal sky when wind pushes migration across the peninsula.',
    imageKey: 'south-flommen',
  },
  {
    id: 'capitol-reef-country',
    title: 'Capitol Reef Country',
    category: 'sky-hunters',
    country: 'United States',
    location: 'Torrey, Utah',
    shortDescription:
      'A desert raptor landscape with cliffs, canyons, open sky, eagles, and peregrine falcons.',
    fullDescription:
      'Capitol Reef Country brings a different visual mood to the Sky Hunters category: red cliffs, desert canyons, open air, and wide skies. It is a strong location for spotting birds in dramatic terrain, especially around Capitol Reef National Park and nearby scenic areas. More than 230 bird species have been documented in Capitol Reef National Park, and birding locations include the Fruita area, Fremont River Trail, Ripple Rock Nature Center area, picnic zones, and riparian vegetation along Sulphur Creek. Raptors such as peregrine falcons and golden eagles may be seen in the wider cliff and desert landscape, though sightings are never guaranteed.',
    address:
      'Capitol Reef National Park / Capitol Reef Country, Torrey, UT 84775, USA',
    latitude: 38.2919,
    longitude: -111.2622,
    animals: [
      'Peregrine falcon',
      'Golden eagle',
      'Red-tailed hawk',
      'Turkey vulture',
      'Raven',
      'Owl species',
      'Canyon wren',
      'Mule deer',
      'Desert bighorn sheep',
    ],
    accessibility:
      'Easy to Difficult — scenic roads and short trails are accessible, while canyon routes and remote areas require heat awareness, water, and preparation.',
    bestTimeToVisit: 'March – May, September – October',
    safetyNote:
      'Carry water in desert terrain. Heat awareness required on longer canyon routes.',
    scenicHighlight:
      'Red cliffs and wide desert skies above canyon wren habitat.',
    imageKey: 'capitol-reef-country',
  },
];

export const featuredPlace = places.find(p => p.featured)!;

export function getPlaceById(id: string): Place | undefined {
  return places.find(p => p.id === id);
}

export function formatCoordinates(lat: number, lng: number): string {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lngDir = lng >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`;
}
