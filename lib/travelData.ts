export interface TravelInfo {
  visa: VisaInfo
  bestTime: BestTimeInfo
  safety: SafetyInfo
  emergency: EmergencyInfo
  transport: TransportInfo
  costs: CostInfo
  phrases: PhraseInfo[]
}

interface VisaInfo {
  requirements: string
  type: 'visa-free' | 'visa-required' | 'evisa' | 'visa-on-arrival'
  details: string
}

interface BestTimeInfo {
  seasons: string[]
  recommendation: string
  climateNote: string
}

interface SafetyInfo {
  level: 'low' | 'moderate' | 'high'
  tips: string[]
  culturalEtiquette: string[]
  thingsToAvoid: string[]
}

interface EmergencyInfo {
  police: string
  ambulance: string
  fire: string
  general: string
}

interface TransportInfo {
  summary: string
  options: string[]
}

interface CostInfo {
  budget: string
  midRange: string
  luxury: string
  notes: string[]
}

export interface PhraseInfo {
  english: string
  translation: string
  pronunciation: string
  script: string
}

export const TRAVEL_DATA: Record<string, TravelInfo> = {
  'Japan': {
    visa: { requirements: 'Visa-free for many countries (up to 90 days)', type: 'visa-free', details: 'Tourist visa waiver available for 68 countries. Check with local embassy for your nationality.' },
    bestTime: { seasons: ['Spring (Mar-May)', 'Autumn (Sep-Nov)'], recommendation: 'Visit during cherry blossom season (late March to early April) or autumn foliage (October-November).', climateNote: 'Mild temperatures, low rainfall. Avoid summer humidity and typhoon season (June-October).' },
    safety: { level: 'low', tips: ['Keep valuables secure in crowded areas', 'Follow local disaster preparedness guidelines', 'Register with your embassy on arrival'], culturalEtiquette: ['Bow when greeting', 'Remove shoes before entering homes', 'Use honorific language (-san)', 'Do not tip — it is considered rude'], thingsToAvoid: ['Walking while eating', 'Loud phone calls on public transport', 'Tattoos in public baths/sento'] },
    emergency: { police: '110', ambulance: '119', fire: '119', general: '03 3501 0111 (Tokyo English helpline)' },
    transport: { summary: 'World-class public transportation system with punctual trains and extensive coverage.', options: ['Shinkansen (bullet trains)', 'JR Rail Pass', 'Tokyo Metro & Toei Subway', 'Local buses in rural areas', 'Taxis (expensive but reliable)', 'IC Cards (Suica/Pasmo)'] },
    costs: { budget: '$70-100/day', midRange: '$150-250/day', luxury: '$350+/day', notes: ['Japan Rail Pass offers significant savings', 'Convenience stores have affordable meals', 'Capsule hotels from $20/night', 'Museums: $5-15 entry'] },
    phrases: [
      { english: 'Hello', translation: 'こんにちは', pronunciation: 'Konnichiwa', script: 'Konnichiwa' },
      { english: 'Thank you', translation: 'ありがとうございます', pronunciation: 'Arigatou gozaimasu', script: 'Arigatou gozaimasu' },
      { english: 'How much?', translation: 'いくらですか？', pronunciation: 'Ikura desu ka?', script: 'Ikura desu ka?' },
      { english: 'Where is the hotel?', translation: 'ホテルはどこですか？', pronunciation: 'Hoteru wa doko desu ka?', script: 'Hoteru wa doko desu ka?' },
      { english: 'Help!', translation: '助けて！', pronunciation: 'Tasukete!', script: 'Tasukete!' },
    ],
  },
  'Ghana': {
    visa: { requirements: 'Visa required for most countries. eVisa available.', type: 'evisa', details: 'Apply online via Ghana Immigration Service. Processing takes 3-5 business days. Single entry $60-100.' },
    bestTime: { seasons: ['Dry Season (Nov-Mar)', 'Harmattan (Dec-Feb)'], recommendation: 'Visit between November and March for the best weather — less humidity and minimal rainfall.', climateNote: 'Coastal areas are warm year-round (24-32°C). Northern regions are hotter with distinct wet/dry seasons.' },
    safety: { level: 'moderate', tips: ['Avoid walking alone at night in cities', 'Use registered taxis or ride-hailing apps', 'Keep valuables out of sight', 'Drink bottled water only'], culturalEtiquette: ['Greet elders first in any gathering', 'Use right hand for eating and handshakes', 'Sunday church attendance is widespread', 'Dress modestly outside tourist areas'], thingsToAvoid: ['Pointing with your left hand', 'Public displays of PDA', 'Photographing government buildings', 'Disrespecting traditional chiefs'] },
    emergency: { police: '191', ambulance: '193', fire: '192', general: '+233 302 773 344' },
    transport: { summary: 'Public transport is affordable but can be chaotic. Major cities have tro-tros and taxis.', options: ['Tro-tro (shared minibuses)', 'STC intercity buses', 'Ride-hailing (Uber/Bolt in Accra)', 'Taxis (negotiate price first)', 'Domestic flights between major cities'] },
    costs: { budget: '$35-50/day', midRange: '$80-120/day', luxury: '$200+/day', notes: ['Local food is very affordable ($2-5)', 'Tro-tro rides cost under $1', 'Budget hotels from $25/night', 'National park tours from $50'] },
    phrases: [
      { english: 'Hello', translation: 'Akwaaba', pronunciation: 'Ak-waa-ba', script: 'Akwaaba' },
      { english: 'Thank you', translation: 'Medaase', pronunciation: 'Me-daa-se', script: 'Medaase' },
      { english: 'How much?', translation: 'E sen?', pronunciation: 'Eh sen?', script: 'E sen?' },
      { english: 'Good morning', translation: 'Maakye', pronunciation: 'Maa-chay', script: 'Maakye' },
      { english: 'Please', translation: 'Mepa wo kyew', pronunciation: 'Me-pa wo cheu', script: 'Mepa wo kyew' },
    ],
  },
  'Nigeria': {
    visa: { requirements: 'Visa required. eVisa available for some nationalities.', type: 'visa-required', details: 'Apply at Nigerian embassy or via eVisa portal. Requires invitation letter for business visits.' },
    bestTime: { seasons: ['Dry Season (Nov-Mar)'], recommendation: 'November to March offers the most pleasant weather with lower humidity.', climateNote: 'Tropical climate. Rainy season from April to October. Harmattan winds December-February.' },
    safety: { level: 'high', tips: ['Avoid non-essential travel to certain regions', 'Use reputable hotels and transport', 'Keep a low profile', 'Always travel with ID'], culturalEtiquette: ['Respect for elders is paramount', 'Nodding or waving is a respectful greeting', 'Business attire is formal', 'Gifts are appreciated when visiting homes'], thingsToAvoid: ['Discussing religion or politics openly', 'Showing wealth in public', 'Walking alone in unfamiliar areas at night', 'Rushing greetings'] },
    emergency: { police: '199', ambulance: '112', fire: '112', general: '+234 9 523 9107' },
    transport: { summary: 'Road transport dominates. Buses, taxis, and ride-hailing services available in major cities.', options: ['Danfo (minibuses)', 'Ride-hailing (Uber/Bolt)', 'Intercity luxury buses', 'Domestic flights', 'Okada (motorcycle taxis)'] },
    costs: { budget: '$30-50/day', midRange: '$70-120/day', luxury: '$200+/day', notes: ['Local meals from $3', 'Intercity bus $10-20', 'Hotel rooms from $30/night', 'Domestic flights $50-150'] },
    phrases: [
      { english: 'Hello', translation: 'Sannu', pronunciation: 'San-nu', script: 'Sannu' },
      { english: 'Thank you', translation: 'Na gode', pronunciation: 'Na go-day', script: 'Na gode' },
      { english: 'How are you?', translation: 'Kana lafiya?', pronunciation: 'Ka-na la-fi-ya?', script: 'Kana lafiya?' },
      { english: 'Goodbye', translation: 'Sai anjima', pronunciation: 'Sai an-ji-ma', script: 'Sai anjima' },
      { english: 'Please', translation: 'Don Allah', pronunciation: 'Don Al-lah', script: 'Don Allah' },
    ],
  },
  'France': {
    visa: { requirements: 'Schengen visa required for non-EU/non-EEA nationals', type: 'visa-required', details: 'Apply at French consulate. Schengen visa allows travel across 27 European countries. Processing: 15 days.' },
    bestTime: { seasons: ['Spring (Apr-Jun)', 'Autumn (Sep-Oct)'], recommendation: 'April-June offers pleasant weather and fewer crowds. September-October has beautiful autumn colors.', climateNote: 'Mediterranean in south, oceanic in north. Mild winters, warm summers. July-August is peak tourist season.' },
    safety: { level: 'moderate', tips: ['Watch for pickpockets in tourist areas', 'Use official taxis or ride-hailing', 'Keep copies of travel documents', 'Avoid protests and demonstrations'], culturalEtiquette: ['Always say Bonjour before speaking', 'Use formal vous instead of tu', 'Kiss on both cheeks as a greeting', 'Bread goes directly on the table'], thingsToAvoid: ['Loud conversations in public', 'Wearing athleisure in cities', 'Assuming everyone speaks English', 'Tipping is not required (service included)'] },
    emergency: { police: '17', ambulance: '15', fire: '18', general: '112 (EU emergency)' },
    transport: { summary: 'Excellent transport infrastructure. High-speed TGV trains connect major cities.', options: ['TGV high-speed trains', 'Paris Metro & RER', 'Regional TER trains', 'Buses and trams in cities', 'Vélib bike-sharing in Paris', 'Domestic flights'] },
    costs: { budget: '$60-90/day', midRange: '$150-200/day', luxury: '$350+/day', notes: ['Lunch menu (formule) from €15', 'Museum pass €15/day', 'Hotel rooms from €80/night', 'Wine from €5/bottle'] },
    phrases: [
      { english: 'Hello', translation: 'Bonjour', pronunciation: 'Bohn-joor', script: 'Bonjour' },
      { english: 'Thank you', translation: 'Merci', pronunciation: 'Mair-see', script: 'Merci' },
      { english: 'How much?', translation: 'Combien?', pronunciation: 'Kom-byen?', script: 'Combien?' },
      { english: 'Where is...?', translation: 'Où est...?', pronunciation: 'Oo eh...?', script: 'Où est...?' },
      { english: 'Help me', translation: 'Aidez-moi', pronunciation: 'Eh-day mwa', script: 'Aidez-moi' },
    ],
  },
  'Brazil': {
    visa: { requirements: 'Visa-free for many countries (up to 90 days)', type: 'visa-free', details: 'Citizens of US, Canada, Japan, Australia, and most European countries get 90-day tourist visas on arrival.' },
    bestTime: { seasons: ['Dry Season (May-Sep)', 'Carnival (Feb/Mar)'], recommendation: 'May to September for sunshine and fewer crowds. December-March for beaches and Carnival.', climateNote: 'Tropical climate. Amazon is hot and humid year-round. Southern regions have distinct seasons.' },
    safety: { level: 'high', tips: ['Avoid favelas unless with a guide', 'Use registered taxis or Uber', 'Keep phones hidden in public', 'Stay in well-reviewed hotels'], culturalEtiquette: ['Brazilians are warm and expressive', 'Greetings often include a hug or kiss', 'Portuguese is spoken, not Spanish', 'Be prepared for flexible punctuality'], thingsToAvoid: ['Wearing expensive jewelry in cities', 'Strolling alone after dark in cities', 'Drinking tap water', 'Comparing Brazil to other Latin countries'] },
    emergency: { police: '190', ambulance: '192', fire: '193', general: '188 (emergency)' },
    transport: { summary: 'Major cities have metro systems. Long-distance buses are common between cities.', options: ['Metro in São Paulo, Rio, Brasília', 'Interstate buses', 'Domestic flights (extensive network)', 'Uber/99 (ride-hailing)', 'Taxis (metered)'] },
    costs: { budget: '$35-55/day', midRange: '$80-130/day', luxury: '$250+/day', notes: ['Street food from $3', 'Churrascaria (BBQ) from $15', 'Hostels from $12/night', 'Domestic flights from $50'] },
    phrases: [
      { english: 'Hello', translation: 'Olá', pronunciation: 'O-lá', script: 'Olá' },
      { english: 'Thank you', translation: 'Obrigado', pronunciation: 'O-bree-ga-doo', script: 'Obrigado' },
      { english: 'How much?', translation: 'Quanto custa?', pronunciation: 'Kwan-to koos-ta?', script: 'Quanto custa?' },
      { english: 'Where is the hotel?', translation: 'Onde fica o hotel?', pronunciation: 'On-de fee-ka oo o-tel?', script: 'Onde fica o hotel?' },
      { english: 'Help!', translation: 'Socorro!', pronunciation: 'So-ko-ho!', script: 'Socorro!' },
    ],
  },
  'India': {
    visa: { requirements: 'eVisa available for 170+ countries', type: 'evisa', details: 'Apply online for e-Tourist Visa (30 days, 1 year, 5 year options). Fee: $10-80 depending on duration.' },
    bestTime: { seasons: ['Winter (Oct-Mar)', 'Monsoon (Jun-Sep)'], recommendation: 'October to March is ideal for most regions. Avoid the monsoon season unless visiting the deserts.', climateNote: 'Diverse climate — tropical in south, temperate in north. Monsoon season June-September.' },
    safety: { level: 'moderate', tips: ['Avoid tap water (use bottled)', 'Dress modestly especially at religious sites', 'Use reputable transport services', 'Keep valuables in hotel safe'], culturalEtiquette: ['Namaste is the traditional greeting', 'Remove shoes before entering temples/homes', 'Eating with right hand only', 'Head wobble means "yes/I understand"'], thingsToAvoid: ['Public displays of affection', 'Pointing feet at people or deities', 'Leather items inside temples', 'Touching people\'s heads'] },
    emergency: { police: '100', ambulance: '102', fire: '101', general: '112 (emergency)' },
    transport: { summary: 'Extensive rail network connects all regions. Auto-rickshaws are common for short trips.', options: ['Indian Railways (huge network)', 'Metro in Delhi, Mumbai, Bangalore, etc.', 'Auto-rickshaws (negotiate price)', 'Ola/Uber ride-hailing', 'Domestic flights (budget carriers)', 'Government/private buses'] },
    costs: { budget: '$20-35/day', midRange: '$50-80/day', luxury: '$150+/day', notes: ['Street meals from $2', 'Train rides $5-30', 'Budget hotels from $15/night', 'Auto-rickshaw rides under $5'] },
    phrases: [
      { english: 'Hello', translation: 'नमस्ते', pronunciation: 'Na-mas-te', script: 'Namaste' },
      { english: 'Thank you', translation: 'धन्यवाद', pronunciation: 'Dhan-ya-vaad', script: 'Dhanyavaad' },
      { english: 'How much?', translation: 'कितना है?', pronunciation: 'Kit-na hai?', script: 'Kitna hai?' },
      { english: 'Where?', translation: 'कहाँ है?', pronunciation: 'Ka-han hai?', script: 'Kahan hai?' },
      { english: 'Help me', translation: 'मेरी मदद करें', pronunciation: 'Me-ri ma-dad ka-ren', script: 'Meri madad karein' },
    ],
  },
  'Italy': {
    visa: { requirements: 'Schengen visa required for non-EU/non-EEA nationals', type: 'visa-required', details: 'Apply at Italian consulate or VFS Global. Schengen visa: €80. Processing: 15 calendar days.' },
    bestTime: { seasons: ['Spring (Apr-Jun)', 'Autumn (Sep-Oct)'], recommendation: 'April-June and September-October for mild weather and fewer tourists.', climateNote: 'Mediterranean climate. Hot summers in the south. Alpine in the north. August is very hot and crowded.' },
    safety: { level: 'low', tips: ['Beware of pickpockets in crowded areas', 'Validate train tickets before boarding', 'Keep passport safe and have copies', 'Learn basic Italian phrases'], culturalEtiquette: ['Greet with "Buongiorno" or "Buonasera"', 'Italians gesture expressively', 'Dress well even casually', 'Coffees are drunk standing at the bar'], thingsToAvoid: ['Ordering cappuccino after 11am', 'Expecting dinner before 7pm', 'Touching produce in markets', 'Rushing meals'] },
    emergency: { police: '113', ambulance: '118', fire: '115', general: '112 (EU emergency)' },
    transport: { summary: 'High-speed trains connect major cities. Regional trains reach smaller towns.', options: ['Trenitalia high-speed (Frecciarossa)', 'Italo Treno', 'Regional trains', 'Metro in Rome, Milan, Naples', 'Buses and trams', 'Ferries to islands'] },
    costs: { budget: '$55-80/day', midRange: '$120-180/day', luxury: '$300+/day', notes: ['Pizza from €8', 'Espresso at bar €1.20', 'Train Rome-Florence from €25', 'Hotel rooms from €70/night'] },
    phrases: [
      { english: 'Hello', translation: 'Ciao', pronunciation: 'Chow', script: 'Ciao' },
      { english: 'Thank you', translation: 'Grazie', pronunciation: 'Grat-see-eh', script: 'Grazie' },
      { english: 'How much?', translation: 'Quanto costa?', pronunciation: 'Kwan-to kos-ta?', script: 'Quanto costa?' },
      { english: 'Where is...?', translation: 'Dov\'è...?', pronunciation: 'Dov-eh...?', script: 'Dov\'è...?' },
      { english: 'Good evening', translation: 'Buonasera', pronunciation: 'Bwo-na-seh-ra', script: 'Buonasera' },
    ],
  },
  'Thailand': {
    visa: { requirements: 'Visa-free for 60+ countries (30-60 days)', type: 'visa-free', details: 'Tourist visa exemption for many countries. Extendable for 30 days at immigration offices.' },
    bestTime: { seasons: ['Cool Season (Nov-Feb)', 'Hot Season (Mar-May)'], recommendation: 'November to February is the most comfortable time to visit.', climateNote: 'Tropical monsoon climate. Cool season is pleasant. Hot season reaches 35-40°C. Rainy season June-October.' },
    safety: { level: 'low', tips: ['Beware of scammers in tourist areas', 'Keep belongings on you at beaches', 'Use official taxis (meter) or Grab', 'Drink only bottled water'], culturalEtiquette: ['Wai greeting (press palms together)', 'Never touch someone\'s head', 'Remove shoes before entering homes', 'Always show respect for the King'], thingsToAvoid: ['Disrespecting the monarchy (illegal)', 'Touching monks or their robes (women)', 'Pointing feet at Buddha images', 'Raising your voice'] },
    emergency: { police: '191', ambulance: '1669', fire: '199', general: '1155 (Tourist Police)' },
    transport: { summary: 'Affordable transport options. Tuk-tuks are iconic for short trips.', options: ['BTS Skytrain (Bangkok)', 'MRT subway', 'Tuk-tuks', 'Grab ride-hailing', 'Songthaews (shared pickups)', 'Domestic flights (AirAsia, Nok Air)'] },
    costs: { budget: '$25-40/day', midRange: '$60-100/day', luxury: '$180+/day', notes: ['Street food from $1.50', 'Massages from $6', 'Hostels from $8/night', 'Domestic flights from $30'] },
    phrases: [
      { english: 'Hello', translation: 'สวัสดี', pronunciation: 'Sa-wat-dee', script: 'Sawasdee' },
      { english: 'Thank you', translation: 'ขอบคุณ', pronunciation: 'Khawp-khun', script: 'Khawp khun' },
      { english: 'How much?', translation: 'เท่าไหร่?', pronunciation: 'Thao-rai?', script: 'Thao rai?' },
      { english: 'Where is...?', translation: '...อยู่ที่ไหน?', pronunciation: '...yoo thee nai?', script: '...yoo thee nai?' },
      { english: 'Help!', translation: 'ช่วยด้วย!', pronunciation: 'Chuay duay!', script: 'Chuay duay!' },
    ],
  },
  'United Kingdom': {
    visa: { requirements: 'Visa required for many non-EU/non-EEA nationals', type: 'visa-required', details: 'Standard Visitor Visa £115. Apply online via UK Visas and Immigration. Biometric appointment required.' },
    bestTime: { seasons: ['Spring (Mar-May)', 'Summer (Jun-Aug)', 'Autumn (Sep-Oct)'], recommendation: 'May-June and September for pleasant weather and fewer crowds.', climateNote: 'Temperate maritime climate. Mild year-round. Rain is possible any time. Summer peaks at 25-30°C.' },
    safety: { level: 'low', tips: ['Watch for pickpockets in central London', 'Stand on the right on escalators', 'Carry an umbrella at all times', 'Tipping is optional (10% for good service)'], culturalEtiquette: ['Queueing is a national virtue', 'Say "sorry" and "please" frequently', 'Tea is a cultural staple', 'Pubs are social hubs — order at the bar'], thingsToAvoid: ['Cutting in line', 'Calling the UK "England" (includes Scotland/Wales/NI)', 'Loud behavior on public transport', 'Tipping excessively'] },
    emergency: { police: '999', ambulance: '999', fire: '999', general: '101 (non-emergency police)' },
    transport: { summary: 'Comprehensive public transport network. London has an extensive Tube system.', options: ['London Underground (Tube)', 'National Rail trains', 'London buses', 'Black cabs and Uber', 'National Express coaches', 'Domestic flights'] },
    costs: { budget: '$60-90/day', midRange: '$140-200/day', luxury: '$350+/day', notes: ['Pub meal from £12', 'Tea from £2.50', 'Hotel rooms from £80/night', 'Museum entry: free (donations)'] },
    phrases: [
      { english: 'Hello', translation: 'Hello', pronunciation: 'Hel-loh', script: 'Hello' },
      { english: 'Thank you', translation: 'Thank you', pronunciation: 'Thank yoo', script: 'Thank you' },
      { english: 'Sorry', translation: 'Sorry', pronunciation: 'Sor-ee', script: 'Sorry' },
      { english: 'How much?', translation: 'How much?', pronunciation: 'How much?', script: 'How much?' },
      { english: 'Cheers (thanks)', translation: 'Cheers', pronunciation: 'Cheerz', script: 'Cheers' },
    ],
  },
  'Egypt': {
    visa: { requirements: 'Visa on arrival for many countries ($25). eVisa also available.', type: 'visa-on-arrival', details: 'Tourist visa on arrival at Egyptian airports for $25 USD. eVisa available for 180+ countries.' },
    bestTime: { seasons: ['Winter (Oct-Apr)', 'Spring (Mar-Apr)'], recommendation: 'October to April for comfortable temperatures. Avoid summer (June-August) when heat is extreme.', climateNote: 'Desert climate. Hot summers (35-45°C). Mild winters (15-25°C). Very dry year-round.' },
    safety: { level: 'high', tips: ['Use registered tour guides', 'Dress conservatively outside resorts', 'Bargain in markets (50% of asking price)', 'Avoid political demonstrations'], culturalEtiquette: ['Greet with "As-salamu alaykum"', 'Use right hand for eating', 'Respect Ramadan traditions', 'Conservative dress at religious sites'], thingsToAvoid: ['Photographing military/police', 'Public drunkenness', 'Showing soles of feet', 'Eating in public during Ramadan (daytime)'] },
    emergency: { police: '122', ambulance: '123', fire: '180', general: '+20 2 2795 6800' },
    transport: { summary: 'Taxis are common. Uber operates in Cairo and major cities. Nile ferries connect some areas.', options: ['Uber/Careem (ride-hailing)', 'White taxis (metered)', 'Cairo Metro', 'Nile ferries', 'Go Bus (intercity)', 'Domestic flights'] },
    costs: { budget: '$25-40/day', midRange: '$60-100/day', luxury: '$180+/day', notes: ['Local meal from $3', 'Koshari (national dish) from $1', 'Hotel rooms from $30/night', 'Nile cruise from $60/night'] },
    phrases: [
      { english: 'Hello', translation: 'السلام عليكم', pronunciation: 'As-salamu alaykum', script: 'As-salamu alaykum' },
      { english: 'Thank you', translation: 'شكرا', pronunciation: 'Shuk-ran', script: 'Shukran' },
      { english: 'How much?', translation: 'بكام؟', pronunciation: 'Bi-kam?', script: 'Bikam?' },
      { english: 'Yes', translation: 'أيوة', pronunciation: 'Ay-wa', script: 'Aywa' },
      { english: 'Please', translation: 'من فضلك', pronunciation: 'Min fad-lik', script: 'Min fadlik' },
    ],
  },
  'South Africa': {
    visa: { requirements: 'Visa-free for many countries (30-90 days)', type: 'visa-free', details: 'Tourist visa exemption for US, UK, EU, Japan, and many other countries. Max 90 days.' },
    bestTime: { seasons: ['Winter (May-Sep)', 'Summer (Oct-Apr)'], recommendation: 'May-September for wildlife viewing (dry season). October-April for beaches and green landscapes.', climateNote: 'Temperate climate. Mediterranean in Cape Town. Subtropical in Durban. Dry winters, wet summers.' },
    safety: { level: 'high', tips: ['Avoid walking alone in cities after dark', 'Use Uber or official taxis', 'Keep car doors locked while driving', 'Stay in well-secured accommodations'], culturalEtiquette: ['Friendly and informal greetings', '"Howzit" is a common greeting', 'Tipping 10-15% is expected', 'Respect all 11 official languages'], thingsToAvoid: ['Flashing valuables in public', 'Walking alone on empty beaches', 'Ignoring security advice at guesthouses', 'Driving through unlit areas at night'] },
    emergency: { police: '10111', ambulance: '10177', fire: '10177', general: '112 (mobile emergency)' },
    transport: { summary: 'Car rental is recommended for most tourists. Uber operates in major cities.', options: ['Rental cars (self-drive popular)', 'Uber/Bolt in cities', 'Gautrain (Johannesburg-Pretoria)', 'Intercity buses (Greyhound, Intercape)', 'Domestic flights'] },
    costs: { budget: '$30-50/day', midRange: '$80-130/day', luxury: '$250+/day', notes: ['Braai (BBQ) from $8', 'Wine tasting from $5', 'Safari day trip from $80', 'Hotel rooms from $40/night'] },
    phrases: [
      { english: 'Hello', translation: 'Howzit', pronunciation: 'How-zit', script: 'Howzit' },
      { english: 'Thank you', translation: 'Thank you', pronunciation: 'Thank yoo', script: 'Thank you' },
      { english: 'How much?', translation: 'How much?', pronunciation: 'How much?', script: 'How much?' },
      { english: 'Yes', translation: 'Ja', pronunciation: 'Yah', script: 'Ja' },
      { english: 'Food', translation: 'Chow', pronunciation: 'Chow', script: 'Chow' },
    ],
  },
}

export function getTravelInfo(countryName: string): TravelInfo | null {
  if (TRAVEL_DATA[countryName]) return TRAVEL_DATA[countryName]

  const key = Object.keys(TRAVEL_DATA).find(
    k => countryName.includes(k) || k.includes(countryName)
  )

  if (key) return TRAVEL_DATA[key]

  return null
}
