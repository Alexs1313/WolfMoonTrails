export type QuizOption = {id: string; text: string; correct: boolean};
export type QuizQuestion = {
  id: string;
  text: string;
  options: QuizOption[];
  explanation: string;
};
export type QuizLevel = {
  id: string;
  title: string;
  order: number;
  questions: QuizQuestion[];
};

function q(
  id: string,
  text: string,
  options: [string, string, string, string],
  correctIndex: 0 | 1 | 2 | 3,
  explanation: string,
): QuizQuestion {
  return {
    id,
    text,
    options: options.map((optionText, index) => ({
      id: `${id}-opt-${index}`,
      text: optionText,
      correct: index === correctIndex,
    })),
    explanation,
  };
}

export const quizLevels: QuizLevel[] = [
  {
    id: 'trail-awareness',
    title: 'Trail Awareness',
    order: 1,
    questions: [
      q(
        'trail-awareness-1',
        'What should you do before starting a wildlife trail?',
        [
          'Start quickly before checking the area',
          'Read trail signs, weather updates, and park rules',
          'Walk off-trail to avoid other tourists',
          'Feed animals to keep them calm',
        ],
        1,
        'Checking signs, weather, and rules helps you understand current risks, closures, and safety requirements before entering wild areas.',
      ),
      q(
        'trail-awareness-2',
        'Why should visitors stay on marked trails?',
        [
          'Marked trails are only for beginners',
          'Animals cannot cross marked trails',
          'Marked trails reduce the risk of getting lost and protect habitats',
          'It makes wildlife come closer',
        ],
        2,
        'Marked trails are designed for safer movement and help prevent damage to fragile plants, nesting areas, and animal habitats.',
      ),
      q(
        'trail-awareness-3',
        'What is the safest way to observe wildlife?',
        [
          'From a safe distance with binoculars',
          'By walking closer for a better photo',
          'By calling the animal loudly',
          'By blocking the animal’s path',
        ],
        0,
        'Binoculars allow visitors to enjoy wildlife without disturbing animals or placing themselves in danger.',
      ),
      q(
        'trail-awareness-4',
        'What should you do if a trail is closed?',
        [
          'Enter quickly if nobody is watching',
          'Find another official route',
          'Move the closure sign',
          'Follow animal tracks around the closure',
        ],
        1,
        'Trail closures may exist because of wildlife activity, weather damage, fire risk, or unsafe terrain. Official alternative routes are the safest option.',
      ),
      q(
        'trail-awareness-5',
        'Why is hiking alone in remote wildlife areas risky?',
        [
          'Animals prefer groups',
          'You may have no help if injured or lost',
          'Trails become longer when walking alone',
          'Phones always work in remote places',
        ],
        1,
        'Remote areas may have poor signal and limited access. Having another person nearby improves safety if something goes wrong.',
      ),
      q(
        'trail-awareness-6',
        'What should you carry on a wildlife trail?',
        [
          'Only a phone',
          'Water, map, first-aid kit, layers, and safety essentials',
          'Food scraps for animals',
          'Loud speakers for music',
        ],
        1,
        'Basic gear helps with navigation, weather changes, small injuries, hydration, and unexpected delays.',
      ),
      q(
        'trail-awareness-7',
        'What should you do if weather changes suddenly?',
        [
          'Ignore it and continue faster',
          'Leave the trail safely or seek proper shelter',
          'Stand under the tallest tree',
          'Climb higher for a better view',
        ],
        1,
        'Sudden weather can create real danger. Leaving safely or finding suitable shelter is better than pushing deeper into exposed terrain.',
      ),
    ],
  },
  {
    id: 'bear-country-basics',
    title: 'Bear Country Basics',
    order: 2,
    questions: [
      q(
        'bear-country-basics-1',
        'What should you do if you see a bear far away?',
        [
          'Stay calm, keep distance, and slowly move away',
          'Run immediately',
          'Move closer for a photo',
          'Throw food toward it',
        ],
        0,
        'Keeping distance and moving away calmly lowers the chance of surprising or provoking the bear.',
      ),
      q(
        'bear-country-basics-2',
        'Why should you never feed a bear?',
        [
          'Bears only eat fish',
          'Feeding makes bears lose fear of people and creates danger',
          'Bears dislike human food',
          'It helps bears survive winter better',
        ],
        1,
        'Fed bears may return to people for food, which can lead to dangerous encounters and serious consequences for both humans and bears.',
      ),
      q(
        'bear-country-basics-3',
        'What is the safest way to store food in bear areas?',
        [
          'Keep it inside an open backpack',
          'Leave it near the tent',
          'Use approved bear-safe storage or follow park rules',
          'Hide it under leaves',
        ],
        2,
        'Bear-safe storage reduces smells and prevents bears from associating campsites or trails with food.',
      ),
      q(
        'bear-country-basics-4',
        'What should you avoid doing near a bear?',
        [
          'Speaking calmly',
          'Giving the bear space',
          'Turning your back and running',
          'Slowly backing away',
        ],
        2,
        'Running can trigger a chase response. Staying calm and backing away slowly is safer.',
      ),
      q(
        'bear-country-basics-5',
        'Why is it dangerous to surprise a bear?',
        [
          'Bears cannot hear humans',
          'A surprised bear may react defensively',
          'Bears always run away',
          'Bears only react at night',
        ],
        1,
        'Many bear encounters become dangerous when the animal feels trapped, startled, or forced to defend itself.',
      ),
      q(
        'bear-country-basics-6',
        'What should hikers do in dense bear habitat?',
        [
          'Move quietly to surprise wildlife',
          'Make reasonable human noise so animals know you are nearby',
          'Walk with headphones on',
          'Follow fresh bear tracks',
        ],
        1,
        'Human noise helps reduce surprise encounters, especially near thick vegetation, rivers, or blind corners.',
      ),
      q(
        'bear-country-basics-7',
        'What should you do if a bear is blocking the trail?',
        [
          'Wait at a safe distance or turn back',
          'Push past it quickly',
          'Throw rocks near it',
          'Try to scare it with food',
        ],
        0,
        'A bear needs space. Waiting safely or choosing another route prevents pressure and lowers risk.',
      ),
    ],
  },
  {
    id: 'wolves-and-predators',
    title: 'Wolves and Predators',
    order: 3,
    questions: [
      q(
        'wolves-and-predators-1',
        'What should you do if you see a wolf from a distance?',
        [
          'Watch quietly from a safe distance',
          'Try to call it closer',
          'Follow it into the forest',
          'Offer food to keep it nearby',
        ],
        0,
        'Wolves should be observed respectfully from far away. Calling, following, or feeding them creates risk and disturbs natural behavior.',
      ),
      q(
        'wolves-and-predators-2',
        'Why should visitors avoid approaching wolf pups or dens?',
        [
          'Dens are usually public viewpoints',
          'Adult wolves may defend the area',
          'Pups need human contact',
          'Wolves cannot smell people',
        ],
        1,
        'Dens and pups are highly sensitive. Approaching them can cause defensive behavior and serious stress to the animals.',
      ),
      q(
        'wolves-and-predators-3',
        'What is a safe reaction if a wolf notices you?',
        [
          'Stay calm, stand tall, and slowly back away',
          'Run downhill',
          'Kneel down and look smaller',
          'Throw snacks on the ground',
        ],
        0,
        'Standing calmly and backing away shows you are not prey and gives the animal space.',
      ),
      q(
        'wolves-and-predators-4',
        'Why should you not follow predator tracks?',
        [
          'Tracks always lead to viewpoints',
          'You may move closer to an animal without knowing it',
          'Predators leave fake tracks',
          'Tracks disappear only in summer',
        ],
        1,
        'Following tracks can lead you into active predator territory or toward an animal resting, feeding, or caring for young.',
      ),
      q(
        'wolves-and-predators-5',
        'What should you do if you hear wolves howling?',
        [
          'Howl back repeatedly',
          'Move calmly and avoid searching for them',
          'Run toward the sound',
          'Leave food nearby',
        ],
        1,
        'Howling can indicate communication between wolves. Searching for them may disturb their behavior or bring you too close.',
      ),
      q(
        'wolves-and-predators-6',
        'Why are predators important in wild ecosystems?',
        [
          'They make trails more exciting only',
          'They help balance animal populations and ecosystem health',
          'They remove all herbivores',
          'They avoid all human areas',
        ],
        1,
        'Predators influence prey movement, population balance, and overall ecosystem structure.',
      ),
      q(
        'wolves-and-predators-7',
        'What should you do if you see an animal feeding on a carcass?',
        [
          'Leave the area quietly and give it space',
          'Move closer to inspect it',
          'Take a photo from a few steps away',
          'Try to scare birds away',
        ],
        0,
        'Carcasses can attract wolves, bears, coyotes, eagles, and other animals. Staying away reduces risk.',
      ),
    ],
  },
  {
    id: 'forest-giants',
    title: 'Forest Giants',
    order: 4,
    questions: [
      q(
        'forest-giants-1',
        'What should you do near bison?',
        [
          'Keep a large distance and never approach',
          'Walk beside them calmly',
          'Touch them if they seem relaxed',
          'Feed them grass by hand',
        ],
        0,
        'Bison may look slow, but they are powerful, fast, and unpredictable. Distance is essential.',
      ),
      q(
        'forest-giants-2',
        'Why are moose dangerous during certain seasons?',
        [
          'They become invisible in forests',
          'They may be defensive during rutting season or when protecting calves',
          'They only attack vehicles',
          'They dislike water',
        ],
        1,
        'Moose can become aggressive when stressed, during mating season, or when a calf is nearby.',
      ),
      q(
        'forest-giants-3',
        'What should you do if an elk approaches the road?',
        [
          'Stop safely and keep distance',
          'Exit the vehicle for a selfie',
          'Honk repeatedly',
          'Try to guide it away by hand',
        ],
        0,
        'Large animals near roads can behave unpredictably. Staying inside or near your vehicle safely is better than approaching.',
      ),
      q(
        'forest-giants-4',
        'Why should tourists not surround a large animal?',
        [
          'It makes better photos',
          'It may feel trapped and react defensively',
          'Animals enjoy attention',
          'It helps rangers count them',
        ],
        1,
        'Animals need an escape route. Crowding can increase stress and lead to sudden charges or defensive movement.',
      ),
      q(
        'forest-giants-5',
        'What is the best way to photograph large wildlife?',
        [
          'Use zoom from a safe distance',
          'Stand close to show scale',
          'Use flash directly in its face',
          'Walk behind it quietly',
        ],
        0,
        'Zoom allows a good photo without getting too close or disturbing the animal.',
      ),
      q(
        'forest-giants-6',
        'What should you do if a moose lowers its ears or raises its neck hair?',
        [
          'Move away and put distance between you and the animal',
          'Clap loudly beside it',
          'Walk closer to calm it',
          'Turn your back and sit down',
        ],
        0,
        'These can be warning signs. Moving away reduces the chance of escalation.',
      ),
      q(
        'forest-giants-7',
        'Why is feeding deer or elk unsafe?',
        [
          'They only eat from trees',
          'It changes natural behavior and can make animals approach people',
          'It makes them leave the park forever',
          'It prevents migration',
        ],
        1,
        'Feeding wildlife teaches animals to seek humans, which can cause injuries, road risks, and unhealthy dependence.',
      ),
    ],
  },
  {
    id: 'sky-hunters-field-ethics',
    title: 'Sky Hunters and Field Ethics',
    order: 5,
    questions: [
      q(
        'sky-hunters-field-ethics-1',
        'What should you use to watch eagles or hawks safely?',
        [
          'Binoculars or a spotting scope',
          'A drone flown close to the nest',
          'Loud calls from a speaker',
          'Food bait near the trail',
        ],
        0,
        'Binoculars and scopes allow safe observation without disturbing birds or nesting areas.',
      ),
      q(
        'sky-hunters-field-ethics-2',
        'Why should visitors avoid nesting areas?',
        [
          'Birds do not return to nests',
          'Disturbance can cause stress or nest abandonment',
          'Nests are always empty in daylight',
          'Birds prefer crowded areas',
        ],
        1,
        'Raptors and other birds may abandon or defend nests if people come too close.',
      ),
      q(
        'sky-hunters-field-ethics-3',
        'What should you do if you find an injured wild bird?',
        [
          'Pick it up immediately',
          'Contact park staff or a licensed wildlife rescue',
          'Feed it bread',
          'Take it home overnight',
        ],
        1,
        'Wildlife professionals know how to handle injured animals safely and legally.',
      ),
      q(
        'sky-hunters-field-ethics-4',
        'Why is drone use risky around wildlife?',
        [
          'Drones make animals easier to count',
          'Drones can disturb, stress, or scare animals',
          'Animals always ignore drones',
          'Drones only affect insects',
        ],
        1,
        'Drones may trigger stress, escape behavior, or nesting disruption. Many parks restrict or ban drone use.',
      ),
      q(
        'sky-hunters-field-ethics-5',
        'What is respectful behavior at a birdwatching viewpoint?',
        [
          'Stay quiet, give space, and avoid blocking others',
          'Play music while waiting',
          'Shout when a bird appears',
          'Walk into closed habitat for a better angle',
        ],
        0,
        'Quiet, patient behavior improves the experience for people and reduces disturbance to wildlife.',
      ),
      q(
        'sky-hunters-field-ethics-6',
        'What should you do with trash on a wildlife route?',
        [
          'Leave organic waste only',
          'Pack out everything you bring',
          'Hide it behind rocks',
          'Burn it on the trail',
        ],
        1,
        'Trash can attract animals, damage habitats, and create safety problems for future visitors.',
      ),
      q(
        'sky-hunters-field-ethics-7',
        'Why should wildlife sightings never be guaranteed in the app?',
        [
          'Animals are not real routes',
          'Wildlife moves naturally and sightings depend on season, weather, and behavior',
          'Tourists always arrive too late',
          'Maps cannot show forests',
        ],
        1,
        'Wild animals are unpredictable. A responsible travel app should describe habitats and viewing opportunities, not promise guaranteed sightings.',
      ),
    ],
  },
  {
    id: 'remote-trail-preparation',
    title: 'Remote Trail Preparation',
    order: 6,
    questions: [
      q(
        'remote-trail-preparation-1',
        'What should you tell someone before entering a remote trail?',
        [
          'Only the name of the park',
          'Your route, expected return time, and emergency plan',
          'Nothing, because remote trails are usually safe',
          'Only the number of photos you plan to take',
        ],
        1,
        'Sharing your route and return time helps others react quickly if you are delayed, lost, or injured.',
      ),
      q(
        'remote-trail-preparation-2',
        'Why is a paper map useful even if you have a phone?',
        [
          'It looks more professional',
          'Phones can lose signal or battery',
          'Paper maps attract wildlife',
          'Phones cannot show trails',
        ],
        1,
        'Remote areas often have poor signal, and batteries can die. A paper map is a reliable backup.',
      ),
      q(
        'remote-trail-preparation-3',
        'What is the best clothing approach for wild nature routes?',
        [
          'Wear only light clothes to move faster',
          'Dress in layers suitable for changing weather',
          'Wear bright party clothes for visibility',
          'Wear sandals on rocky trails',
        ],
        1,
        'Layering helps you adapt to cold, heat, wind, rain, and sudden weather changes.',
      ),
      q(
        'remote-trail-preparation-4',
        'Why should you avoid starting a difficult trail late in the day?',
        [
          'Animals only appear at noon',
          'Darkness can make navigation and wildlife awareness harder',
          'Trails close automatically at sunset',
          'Photos look worse at night',
        ],
        1,
        'Low light makes it easier to get lost, miss hazards, or surprise wildlife.',
      ),
      q(
        'remote-trail-preparation-5',
        'What should you do if you become lost?',
        [
          'Keep walking randomly until something appears',
          'Stop, stay calm, check your map, and avoid making the situation worse',
          'Run downhill immediately',
          'Follow the loudest animal sound',
        ],
        1,
        'Stopping and thinking clearly prevents panic decisions and helps you reconnect with your route safely.',
      ),
      q(
        'remote-trail-preparation-6',
        'Why should hikers carry enough water?',
        [
          'Water scares animals away',
          'Dehydration can reduce focus, strength, and decision-making',
          'Water makes backpacks look complete',
          'Streams are always safe to drink from',
        ],
        1,
        'Dehydration can become dangerous quickly, especially in heat, altitude, or long routes.',
      ),
      q(
        'remote-trail-preparation-7',
        'What should you do before crossing a river or stream?',
        [
          'Cross wherever the water looks pretty',
          'Check depth, current, footing, and safer crossing points',
          'Jump across without stopping',
          'Cross at night to avoid insects',
        ],
        1,
        'Water crossings can be stronger than they look. Checking conditions helps prevent falls or being swept away.',
      ),
    ],
  },
  {
    id: 'campsite-food-safety',
    title: 'Campsite and Food Safety',
    order: 7,
    questions: [
      q(
        'campsite-food-safety-1',
        'Where should food be stored overnight in wildlife areas?',
        [
          'Inside your sleeping bag',
          'In approved bear-safe storage or according to park rules',
          'Under the tent',
          'On a nearby rock',
        ],
        1,
        'Proper food storage helps prevent animals from being attracted to campsites.',
      ),
      q(
        'campsite-food-safety-2',
        'Why should you keep cooking areas away from sleeping areas?',
        [
          'It makes breakfast more dramatic',
          'Food smells can attract wildlife near your tent',
          'Animals dislike tents',
          'Cooking far away saves battery',
        ],
        1,
        'Food odors may attract bears, foxes, raccoons, and other animals. Separating cooking and sleeping areas reduces risk.',
      ),
      q(
        'campsite-food-safety-3',
        'What should you do with food scraps?',
        [
          'Throw them into bushes',
          'Pack them out or dispose of them in approved containers',
          'Leave them for birds',
          'Burn them beside the trail',
        ],
        1,
        'Food scraps attract wildlife and teach animals to search for human food.',
      ),
      q(
        'campsite-food-safety-4',
        'Why should scented items be stored carefully?',
        [
          'They make trails slippery',
          'Animals may be attracted to toothpaste, deodorant, and cosmetics',
          'Scented items attract only insects',
          'They confuse GPS signals',
        ],
        1,
        'Many animals investigate strong smells, not only food. Scented items should be treated like attractants.',
      ),
      q(
        'campsite-food-safety-5',
        'What should you do if an animal enters your campsite?',
        [
          'Feed it so it leaves faster',
          'Keep distance, secure yourself, and follow park guidance',
          'Try to pet it',
          'Chase it into the forest alone',
        ],
        1,
        'Wild animals near campsites can be unpredictable. Distance and official safety guidance are the safest response.',
      ),
      q(
        'campsite-food-safety-6',
        'Why is a messy campsite dangerous?',
        [
          'It makes photos look bad',
          'It can attract wildlife and create unsafe encounters',
          'It makes tents heavier',
          'It causes trails to move',
        ],
        1,
        'Loose food, trash, and gear with smells can invite animals into human areas.',
      ),
      q(
        'campsite-food-safety-7',
        'What should campers do before leaving a site?',
        [
          'Leave leftovers for the next visitor',
          'Clean the area and remove all trash',
          'Hide trash under leaves',
          'Leave scented items behind',
        ],
        1,
        'A clean campsite protects wildlife, future visitors, and the natural environment.',
      ),
    ],
  },
  {
    id: 'photography-observation-ethics',
    title: 'Photography and Observation Ethics',
    order: 8,
    questions: [
      q(
        'photography-observation-ethics-1',
        'What is the safest way to photograph wildlife?',
        [
          'Use zoom from a safe distance',
          'Walk closer until the animal reacts',
          'Use food to bring the animal near',
          'Block the trail for the best angle',
        ],
        0,
        'Zoom allows close-looking photos without disturbing or endangering the animal.',
      ),
      q(
        'photography-observation-ethics-2',
        'Why should flash be avoided near wildlife?',
        [
          'It makes animals pose',
          'It can startle, stress, or disturb animals',
          'It improves animal vision',
          'It helps animals find food',
        ],
        1,
        'Sudden bright light can disturb animals, especially at night or near nesting/resting areas.',
      ),
      q(
        'photography-observation-ethics-3',
        'What should you do if your presence changes an animal’s behavior?',
        [
          'Move closer because it noticed you',
          'Back away and give it more space',
          'Wave your arms for attention',
          'Wait until it becomes aggressive',
        ],
        1,
        'If an animal stops feeding, moves away, stares, or shows stress, you are too close.',
      ),
      q(
        'photography-observation-ethics-4',
        'Why should visitors avoid posting exact locations of sensitive wildlife online?',
        [
          'It makes photos less popular',
          'It can attract crowds and disturb animals or habitats',
          'GPS does not work in forests',
          'Animals read social media',
        ],
        1,
        'Exact public locations can increase pressure on nests, dens, and fragile habitats.',
      ),
      q(
        'photography-observation-ethics-5',
        'What should you do if other visitors crowd an animal?',
        [
          'Join them quickly',
          'Keep distance and avoid adding pressure',
          'Shout at the animal to move',
          'Push through the group',
        ],
        1,
        'Crowding can stress wildlife. Staying back helps reduce pressure and keeps you safer.',
      ),
      q(
        'photography-observation-ethics-6',
        'Why are drones usually a bad idea around wildlife?',
        [
          'They are too quiet',
          'They can disturb animals and may be restricted by park rules',
          'They make animals easier to feed',
          'They only affect trees',
        ],
        1,
        'Drones can scare animals, disrupt nesting, and violate protected-area regulations.',
      ),
      q(
        'photography-observation-ethics-7',
        'What should be the goal of wildlife observation?',
        [
          'Getting the closest possible photo',
          'Watching without changing animal behavior',
          'Making animals look at the camera',
          'Touching the animal if it approaches',
        ],
        1,
        'Responsible observation means the animal continues natural behavior without being disturbed.',
      ),
    ],
  },
  {
    id: 'emergency-decisions',
    title: 'Emergency Decisions',
    order: 9,
    questions: [
      q(
        'emergency-decisions-1',
        'What should you do first if someone is injured on a trail?',
        [
          'Keep walking to finish the route',
          'Stop, assess the situation, and call for help if needed',
          'Leave them alone to find the road',
          'Give them food immediately',
        ],
        1,
        'Assessing the injury and calling for help prevents the situation from becoming worse.',
      ),
      q(
        'emergency-decisions-2',
        'What should you do if you lose mobile signal?',
        [
          'Panic and run',
          'Use offline tools, stay calm, and move only with a clear plan',
          'Delete maps to save battery',
          'Follow animal tracks to civilization',
        ],
        1,
        'Remote areas often lack signal. Offline maps, calm thinking, and planned movement are safer.',
      ),
      q(
        'emergency-decisions-3',
        'Why should you save phone battery in remote areas?',
        [
          'To take more sunset photos',
          'You may need it for navigation or emergency communication',
          'Wildlife dislikes bright screens',
          'It makes the phone lighter',
        ],
        1,
        'Battery can become critical for maps, emergency calls, flashlight use, and location sharing.',
      ),
      q(
        'emergency-decisions-4',
        'What should you do if you hear thunder nearby?',
        [
          'Go to an exposed ridge',
          'Move away from exposed areas, water, and tall isolated trees',
          'Stand under the tallest tree',
          'Hold metal poles above your head',
        ],
        1,
        'Lightning risk increases near exposed ridges, water, and tall isolated objects.',
      ),
      q(
        'emergency-decisions-5',
        'What is the safest response to extreme heat on a trail?',
        [
          'Walk faster to finish sooner',
          'Rest, hydrate, seek shade, and consider turning back',
          'Avoid drinking water',
          'Remove all supplies from your pack',
        ],
        1,
        'Heat can cause exhaustion or heatstroke. Slowing down and cooling off reduces danger.',
      ),
      q(
        'emergency-decisions-6',
        'What should you do if you encounter a fast-moving wildfire smoke area?',
        [
          'Walk toward the smoke to inspect it',
          'Leave the area using official guidance and safe routes',
          'Climb higher for a better view',
          'Hide under rocks',
        ],
        1,
        'Smoke and fire conditions can change quickly. Official evacuation guidance and safe routes matter.',
      ),
      q(
        'emergency-decisions-7',
        'Why should emergency numbers and park contacts be saved before the trip?',
        [
          'They make the phone look organized',
          'You may need them when stress or poor signal makes searching harder',
          'They improve camera quality',
          'They unlock closed trails',
        ],
        1,
        'Having emergency contacts ready saves time when quick action matters.',
      ),
    ],
  },
  {
    id: 'respecting-wild-places',
    title: 'Respecting Wild Places',
    order: 10,
    questions: [
      q(
        'respecting-wild-places-1',
        'What does “Leave No Trace” mean in wildlife areas?',
        [
          'Take only the best rocks',
          'Minimize your impact and leave nature as you found it',
          'Walk anywhere you want',
          'Leave food for animals',
        ],
        1,
        'Leave No Trace means protecting landscapes, wildlife, and future visitor experiences.',
      ),
      q(
        'respecting-wild-places-2',
        'Why should visitors avoid picking plants or moving natural objects?',
        [
          'Plants grow faster after picking',
          'Small changes can damage habitats and disturb ecosystems',
          'Rocks need exercise',
          'Animals prefer empty ground',
        ],
        1,
        'Plants, rocks, branches, and soil can be part of shelter, food sources, and natural processes.',
      ),
      q(
        'respecting-wild-places-3',
        'What should you do if you see people feeding wildlife?',
        [
          'Join them if the animal is calm',
          'Keep distance and report it to park staff if appropriate',
          'Take the food and feed another animal',
          'Make loud noises beside them',
        ],
        1,
        'Feeding wildlife is dangerous. Reporting helps protect animals and visitors.',
      ),
      q(
        'respecting-wild-places-4',
        'Why should quiet behavior matter on wild trails?',
        [
          'It makes the trail shorter',
          'It reduces stress for wildlife and improves observation chances',
          'It guarantees animal sightings',
          'It prevents rain',
        ],
        1,
        'Noise can disturb animals and other visitors. Quiet movement supports respectful observation.',
      ),
      q(
        'respecting-wild-places-5',
        'What is the responsible way to use marked viewpoints?',
        [
          'Stay within safe areas and avoid crossing barriers',
          'Climb over barriers for better photos',
          'Stand on fragile edges',
          'Push others away from the view',
        ],
        0,
        'Viewpoints and barriers are designed for safety and habitat protection.',
      ),
      q(
        'respecting-wild-places-6',
        'Why should dogs be controlled or restricted in wildlife areas?',
        [
          'Wild animals like playing with dogs',
          'Dogs can disturb wildlife, trigger defensive behavior, or be at risk',
          'Dogs always scare bears away',
          'Dogs can guide predators away',
        ],
        1,
        'Pets can stress wildlife or provoke dangerous encounters. Many protected areas have strict rules for this reason.',
      ),
      q(
        'respecting-wild-places-7',
        'What is the best mindset for visiting wild places?',
        [
          'Nature exists mainly for content',
          'Observe carefully, respect distance, and accept that wildlife is unpredictable',
          'Get as close as possible',
          'Follow animals until you see them clearly',
        ],
        1,
        'Wild places are not controlled attractions. Respect, patience, and distance keep both people and animals safer.',
      ),
    ],
  },
].sort((a, b) => a.order - b.order);

export function getQuizLevel(id: string): QuizLevel | undefined {
  return quizLevels.find(level => level.id === id);
}

export function getNextLevelId(id: string): string | undefined {
  const index = quizLevels.findIndex(level => level.id === id);
  if (index === -1 || index >= quizLevels.length - 1) {
    return undefined;
  }
  return quizLevels[index + 1].id;
}

export function getStarCount(correct: number, total: number): number {
  if (total <= 0) {
    return 0;
  }
  if (correct >= total) {
    return 3;
  }
  if (correct >= 5) {
    return 2;
  }
  if (correct >= 3) {
    return 1;
  }
  return 0;
}
