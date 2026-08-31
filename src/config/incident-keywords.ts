
// List of keywords to poll from Bluesky for crowdsourced incident detection
// Add more keywords here as needed

export const KEYWORD_MATCH_THRESHOLD = 1; // Post must match at least this many keywords to be processed

export const EXCLUDED_KEYWORDS = [
    'game', 'movie', 'song', 'lyrics', 'deal', 'sale', 'metaphor', 'like fire', 'on fire',
    'trailer', 'review', 'stock market', 'crypto', 'app crashed', 'server down', 'metaphorical',
    'software crash', 'gaming', 'esports', 'box office', 'fiction', 'novel', 'story'
];

export const REQUIRED_KEYWORDS: string[] = [];

export const INCIDENT_KEYWORDS = [
    // --- WATER & FLOODING (Needs Boats / Rafts) ---
    'waterlogging', 'waterlogged', 'rising fast', 'water level', 'flash flood',
    'send boat', 'need boat', 'life raft', 'stranded in water', 'flooded',
    'water entering', 'submerged', 'drowning', 'washed away', 'minor waterlogging',
    'heavy rain', 'inundated', 'floodwaters', 'river overflowing', 'dam open',
    'water inside house', 'neck deep water', 'boat needed', 'rescue boat', 'ndrf boat',
    'water rising', 'flooding', 'current is strong', 'water rescue', 'deep water',
    'waist deep water', 'chest deep water', 'cars floating', 'stuck on roof',
    'trapped on terrace', 'river breached', 'embankment broken', 'rescue dinghy',
    'coast guard', 'need evacuation', 'swept away', 'submerging', 'deluge',

    // --- STRUCTURAL COLLAPSE (Needs Excavator / Crane) ---
    'total collapse', 'structural collapse', 'bridge is down', 'bridge collapse',
    'building collapsed', 'trapped under debris', 'crane needed', 'heavy excavator',
    'rubble', 'caved in', 'roof collapsed', 'wall collapsed', 'buried', 'earthquake', 'landslide',
    'house collapsed', 'debris', 'under the debris', 'send jcb', 'need excavator', 
    'earth mover', 'structural damage', 'foundation washed away', 'road caved in',
    'building fell', 'trapped in ruins', 'heavy machinery', 'clear debris', 'crater',
    'pancaked', 'building tilted', 'roof gave way', 'wall cracked', 'infrastructure collapse',
    'buried alive', 'people trapped', 'concrete slabs', 'heavy lifting equipment',
    'gas cutter', 'search and rescue dog', 'sniffer dogs', 'flattened', 'shattered',

    // --- MEDICAL & INJURIES (Needs Medical Team / Ambulance) ---
    'severe injuries', 'unconscious', 'medical team', 'ambulance', 'bleeding',
    'fatal', 'casualties', 'dead', 'medical help', 'first aid', 'high-mortality',
    'dying', 'critical condition', 'need doctor',
    'injured', 'fracture', 'head injury', 'crushed', 'cannot breathe', 'medical emergency',
    'medic needed', 'send paramedics', 'no hospital', 'hospital unreachable', 'broken bones',
    'blood loss', 'fainted', 'trauma', 'pain', 'lifesaving', 'oxygen cylinder',
    'open wound', 'crush injury', 'no pulse', 'emergency medical services', 'ems',
    'triage', 'field hospital', 'stretcher', 'tourniquet', 'urgent blood required',
    'hypothermia', 'shock', 'infection risk', 'paramedic', 'resuscitation',

    // --- ISOLATION & RESCUE ---
    'cut off', 'no route', 'routes severed', 'trapped', 'send rescue',
    'SOS', 'need help asap', 'evacuation', 'stuck', 'remote settlement',
    'no signal', 'airdrop', 'rescue team',
    'no network', 'satellite phone', 'stranded', 'isolated', 'no road access',
    'food shortage', 'airlift', 'chopper rescue', 'helicopter needed', 'winch rescue',
    'cannot reach', 'no way out', 'encircled by water', 'safe zone', 'relief camp',
    'battery dying', 'last message', 'no electricity', 'blackout', 'power grid down',
    'supplies running out', 'need drinking water', 'need rations', 'starving', 'marooned',
    'impassable', 'roads blocked', 'tree fallen on road', 'helipad', 'winched up', 'ham radio'
];
