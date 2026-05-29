import type {WiildMoodtrailssGuideAnimalImageKey} from './GuideAnimalImages';

export type WiildMoodtrailssGuideAnimal = {
  id: WiildMoodtrailssGuideAnimalImageKey;
  name: string;
  safeDistanceMeters: number;
  description: string;
  habitat: string;
  behaviorTips: string[];
  whatNotToDo: string[];
  insightNote: string;
};

export const WiildMoodtrailssGuideAnimals: WiildMoodtrailssGuideAnimal[] = [
  {
    id: 'wolf',
    name: 'Wolf',
    safeDistanceMeters: 100,
    description:
      'The largest wild member of the dog family. Wolves are intelligent, social predators that usually live in close family packs and communicate through body language, scent, and howling.',
    habitat:
      'Forests, mountains, tundra, grasslands, and remote wilderness areas across North America, Europe, and parts of Asia.',
    behaviorTips: [
      'Wolves rarely approach humans intentionally.',
      'Pack howling is communication, not always a threat.',
      'If a wolf notices you, stay calm and give it space.',
      'Watch from a distance using binoculars or a camera zoom.',
    ],
    whatNotToDo: [
      'Never run — it may activate pursuit behavior.',
      'Never feed wolves or leave food near trails.',
      'Never approach pups or a den site.',
      'Never try to call wolves closer for photos.',
    ],
    insightNote:
      'Wolves can travel many miles in one day while searching for food or moving through their territory.',
  },
  {
    id: 'brown-bear',
    name: 'Brown Bear',
    safeDistanceMeters: 100,
    description:
      'A powerful large bear known for its size, strength, and strong connection to wild rivers, forests, mountains, and salmon-rich landscapes. Brown bears are usually not looking for conflict, but they need serious distance and respect.',
    habitat:
      'Mountain forests, coastal areas, river valleys, tundra edges, and remote wilderness zones in North America, Europe, and Asia.',
    behaviorTips: [
      'Keep a long distance and use binoculars.',
      'Make calm human noise in dense vegetation.',
      'Store food properly in bear-safe containers.',
      'Slowly back away if you see a bear from a distance.',
    ],
    whatNotToDo: [
      'Never approach a bear for a photo.',
      'Never run from a bear.',
      'Never feed a bear or leave food scraps.',
      'Never get between a mother bear and her cubs.',
    ],
    insightNote:
      'Brown bears can smell food from very far away, which is why food storage rules are critical in bear country.',
  },
  {
    id: 'moose',
    name: 'Moose',
    safeDistanceMeters: 30,
    description:
      'The largest member of the deer family. Moose look calm and slow, but they are extremely strong and can become defensive, especially during mating season or when protecting calves.',
    habitat:
      'Boreal forests, wetlands, river valleys, lakeshores, mountain forests, and cold northern regions of North America and Eurasia.',
    behaviorTips: [
      'Keep distance even if the moose seems calm.',
      'Watch for warning signs like lowered ears or raised neck hair.',
      'Give moose a clear escape route.',
      'Be extra careful near calves.',
    ],
    whatNotToDo: [
      'Never walk close for a selfie.',
      'Never stand between a moose and its calf.',
      'Never block its path.',
      'Never assume a moose is harmless because it is eating.',
    ],
    insightNote:
      'Moose are excellent swimmers and can dive underwater to feed on aquatic plants.',
  },
  {
    id: 'bison',
    name: 'Bison',
    safeDistanceMeters: 25,
    description:
      'A massive grazing animal and one of the most iconic wild mammals of North America. Bison may look peaceful from far away, but they are fast, powerful, and unpredictable.',
    habitat:
      'Grasslands, open valleys, prairie landscapes, forest edges, and protected national park areas.',
    behaviorTips: [
      'Stay far away and never approach.',
      'Use zoom for photos.',
      'Keep inside your vehicle if bison are near the road.',
      'Move away if a bison turns toward you or starts watching you closely.',
    ],
    whatNotToDo: [
      'Never try to touch a bison.',
      'Never walk through a herd.',
      'Never stand between adults and calves.',
      'Never treat bison like farm animals.',
    ],
    insightNote:
      'Bison can run much faster than humans, even though they look heavy and slow.',
  },
  {
    id: 'bald-eagle',
    name: 'Bald Eagle',
    safeDistanceMeters: 50,
    description:
      'A large bird of prey known for its white head, strong wings, and powerful hunting skills. Bald eagles are often seen near rivers, lakes, coastlines, and open wild landscapes.',
    habitat:
      'Lakes, rivers, coastal areas, wetlands, forests near water, cliffs, and large open landscapes across North America.',
    behaviorTips: [
      'Watch with binoculars or a spotting scope.',
      'Stay quiet near nesting areas.',
      'Keep distance from perches and feeding spots.',
      'Respect closed zones during nesting season.',
    ],
    whatNotToDo: [
      'Never approach a nest.',
      'Never fly drones near eagles.',
      'Never use food to attract birds.',
      'Never disturb an eagle while it is feeding or resting.',
    ],
    insightNote:
      'Bald eagles often reuse the same nest for many years, adding new material each season until the nest becomes enormous.',
  },
  {
    id: 'lynx',
    name: 'Lynx',
    safeDistanceMeters: 50,
    description:
      'A quiet forest predator known for its tufted ears, short tail, and powerful paws. Lynx are elusive animals that usually avoid people and move silently through snowy forests and rocky wilderness.',
    habitat:
      'Boreal forests, mountain woodlands, cold northern regions, rocky slopes, and remote forest corridors across North America, Europe, and Asia.',
    behaviorTips: [
      'Observe from a distance if you are lucky enough to see one.',
      'Stay quiet and avoid following it.',
      'Use binoculars or camera zoom.',
      'Respect dense forest zones where lynx may rest or hunt.',
    ],
    whatNotToDo: [
      'Never chase a lynx for a photo.',
      'Never try to attract it with sounds or food.',
      'Never approach kittens or hidden den areas.',
      'Never leave food scraps that may attract smaller prey animals.',
    ],
    insightNote:
      'Lynx have wide, furry paws that work almost like natural snowshoes, helping them move across deep snow.',
  },
  {
    id: 'elk',
    name: 'Elk',
    safeDistanceMeters: 30,
    description:
      'A large member of the deer family, known for impressive antlers, strong herds, and loud bugling calls during rutting season. Elk can look peaceful, but they need plenty of space.',
    habitat:
      'Mountain valleys, grasslands, open forests, river corridors, alpine meadows, and protected national parks across North America and parts of Asia.',
    behaviorTips: [
      'Keep a safe distance from herds.',
      'Be extra careful during rutting season.',
      'Watch for warning signs like staring, raised head, or direct movement toward you.',
      'Stay inside your vehicle if elk are close to the road.',
    ],
    whatNotToDo: [
      'Never approach for a selfie.',
      'Never stand between elk and their calves.',
      'Never imitate elk calls near wild herds.',
      'Never feed elk or let them approach your campsite.',
    ],
    insightNote:
      'Male elk can produce a loud bugling call that carries across valleys during mating season.',
  },
  {
    id: 'red-fox',
    name: 'Red Fox',
    safeDistanceMeters: 25,
    description:
      'A clever and adaptable wild canid with sharp senses, a bushy tail, and a curious nature. Red foxes may appear near trails or visitor areas, but they should still be treated as wild animals.',
    habitat:
      'Forests, grasslands, mountains, coastal areas, tundra edges, farmland, and even areas near towns across North America, Europe, Asia, and North Africa.',
    behaviorTips: [
      'Watch quietly without approaching.',
      'Keep food sealed and packed away.',
      'Give foxes space if they cross a trail.',
      'Report unusually bold behavior to park staff if needed.',
    ],
    whatNotToDo: [
      'Never feed a fox.',
      'Never try to pet or touch it.',
      'Never leave snacks near a trail or picnic area.',
      'Never follow it toward a den.',
    ],
    insightNote:
      'Red foxes use their large ears to detect small animals moving under grass or snow.',
  },
  {
    id: 'mountain-goat',
    name: 'Mountain Goat',
    safeDistanceMeters: 25,
    description:
      'A strong alpine animal built for steep cliffs, rocky ridges, and high mountain terrain. Mountain goats are excellent climbers and often appear calm, but they can be defensive if crowded.',
    habitat:
      'High alpine cliffs, rocky slopes, mountain ridges, glacier edges, and steep wilderness areas in North America.',
    behaviorTips: [
      'Keep distance on narrow trails.',
      'Give mountain goats the right of way.',
      'Stay away from cliffs and steep edges when watching them.',
      'Secure salty items, because goats may be attracted to sweat or gear.',
    ],
    whatNotToDo: [
      'Never block a goat on a narrow path.',
      'Never approach kids or females with young.',
      'Never feed them.',
      'Never stand near dangerous drop-offs for a better photo.',
    ],
    insightNote:
      'Mountain goats can climb extremely steep rocky slopes thanks to specialized hooves with rough pads and sharp edges.',
  },
  {
    id: 'great-horned-owl',
    name: 'Great Horned Owl',
    safeDistanceMeters: 30,
    description:
      'A powerful nocturnal bird of prey with large ear-like feather tufts, strong talons, and silent flight. It is one of the most adaptable owls in North America.',
    habitat:
      'Forests, deserts, wetlands, cliffs, open woodlands, parks, and remote wilderness areas across the Americas.',
    behaviorTips: [
      'Observe quietly, especially at dusk or night.',
      'Use binoculars instead of getting closer.',
      'Avoid shining bright lights directly at owls.',
      'Respect nesting areas and closed zones.',
    ],
    whatNotToDo: [
      'Never approach a nest.',
      'Never use loud owl calls repeatedly to attract it.',
      'Never disturb an owl while it is hunting or resting.',
      'Never fly drones near nesting or roosting areas.',
    ],
    insightNote:
      'Great horned owls fly almost silently because their wing feathers are shaped to reduce noise.',
  },
];

export function WiildMoodtrailssGetGuideAnimal(id: string): WiildMoodtrailssGuideAnimal | undefined {
  return WiildMoodtrailssGuideAnimals.find(animal => animal.id === id);
}
