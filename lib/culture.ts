export type FoodItem = {
  name: string
  emoji?: string
  description?: string
  ingredients?: string[]
  instructions?: string
  image?: string
  prepTime?: string
  region?: string
}

export const CULTURE_FOODS: Record<string, FoodItem[]> = {
  // West Africa
  'Sierra Leone': [
    {
      name: 'Cassava Leaves',
      emoji: '🌿',
      description: 'Slow-simmered cassava leaves with palm oil, peppers, and smoked fish.',
      ingredients: ['cassava leaves', 'palm oil', 'onion', 'tomato', 'smoked fish'],
      instructions: 'Wash cassava leaves, chop finely, then simmer with aromatics, palm oil and protein until rich and fragrant.',
      image: 'https://images.unsplash.com/photo-1532634896-26909d0d1f3e?auto=format&fit=crop&w=900&q=80',
      prepTime: '45 min',
      region: 'Sierra Leone',
    },
    {
      name: 'Groundnut Soup',
      emoji: '🥜',
      description: 'Creamy peanut soup with tender meat, local spices and leafy greens.',
      ingredients: ['peanut butter', 'tomato', 'onion', 'ginger', 'meat or fish'],
      instructions: 'Brown protein and simmer with tomatoes, onions and ground peanuts until a silky sauce forms.',
      image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&w=900&q=80',
      prepTime: '50 min',
      region: 'Sierra Leone',
    },
    {
      name: 'Jollof Rice',
      emoji: '🍚',
      description: 'Signature West African rice cooked in a spiced tomato broth.',
      ingredients: ['rice', 'tomato paste', 'onion', 'scotch bonnet', 'spices'],
      instructions: 'Toast rice then simmer in a rich tomato stew with spices and vegetables until fluffy.',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
      prepTime: '40 min',
      region: 'Sierra Leone',
    },
    {
      name: 'Potato Leaves',
      emoji: '🌱',
      description: 'Leafy greens sautéed with tomatoes, coconut and chili for a hearty stew.',
      ingredients: ['potato leaves', 'tomato', 'onion', 'coconut milk', 'pepper'],
      instructions: 'Cook leaves slowly with tomatoes and seasonings until tender and fragrant.',
      image: 'https://images.unsplash.com/photo-1532634896-26909d0d1f3e?auto=format&fit=crop&w=900&q=80',
      prepTime: '35 min',
      region: 'Sierra Leone',
    },
    {
      name: 'Plasas',
      emoji: '🥘',
      description: 'A rich green stew made with palm oil, pumpkin leaves, and meat or fish.',
      ingredients: ['pumpkin leaves', 'palm oil', 'onion', 'groundnut', 'meat'],
      instructions: 'Simmer greens and meat in a seasoned palm oil base until thick and deeply flavored.',
      image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&w=900&q=80',
      prepTime: '55 min',
      region: 'Sierra Leone',
    },
  ],
  'Ghana': [
    {
      name: 'Fufu',
      emoji: '🥔',
      description: 'Smooth pounded cassava and plantain served with spicy soup.',
      ingredients: ['cassava', 'plantain', 'water', 'light soup'],
      instructions: 'Boil cassava and plantain, then pound until smooth and elastic, serving with soup on the side.',
      image: 'https://images.unsplash.com/photo-1545129976-1e5563d7d59e?auto=format&fit=crop&w=900&q=80',
      prepTime: '50 min',
      region: 'Ghana',
    },
    {
      name: 'Banku',
      emoji: '🍛',
      description: 'Fermented corn and cassava dough cooked into a smooth, tangy staple.',
      ingredients: ['corn dough', 'cassava dough', 'water'],
      instructions: 'Stir-cook fermented dough and water into a smooth, elastic paste for serving with soup.',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80',
      prepTime: '40 min',
      region: 'Ghana',
    },
    {
      name: 'Waakye',
      emoji: '🍲',
      description: 'Rice and beans steamed with red sorghum leaves for color and flavor.',
      ingredients: ['rice', 'black-eyed peas', 'sorghum leaves', 'spices'],
      instructions: 'Cook rice and beans together with sorghum leaves, then serve with stew and sides.',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
      prepTime: '45 min',
      region: 'Ghana',
    },
    {
      name: 'Light Soup',
      emoji: '🍲',
      description: 'A spicy tomato-based soup served with meat, fish, or fufu.',
      ingredients: ['tomato', 'onion', 'pepper', 'meat or fish'],
      instructions: 'Simmer tomatoes, peppers and meat until the broth is fragrant and slightly spicy.',
      image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=80',
      prepTime: '35 min',
      region: 'Ghana',
    },
    {
      name: 'Kenkey',
      emoji: '🥟',
      description: 'Fermented corn dough wrapped and steamed in plantain leaves.',
      ingredients: ['corn dough', 'water', 'plantain leaves'],
      instructions: 'Ferment corn dough, shape into portions, then wrap and steam until firm.',
      image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=900&q=80',
      prepTime: '48 min',
      region: 'Ghana',
    },
  ],
  'Nigeria': [
    {
      name: 'Jollof Rice',
      emoji: '🍚',
      description: 'A beloved rice dish cooked with tomato, chili and smoky spices.',
      ingredients: ['rice', 'tomato', 'pepper', 'onion', 'spices'],
      instructions: 'Cook rice in rich tomato broth until each grain soaks up savory heat.',
      image: 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=900&q=80',
      prepTime: '40 min',
      region: 'Nigeria',
    },
    {
      name: 'Egusi Soup',
      emoji: '🍲',
      description: 'Hearty soup made from ground melon seeds, leafy greens and spiced broth.',
      ingredients: ['egusi', 'leafy greens', 'meat', 'palm oil'],
      instructions: 'Cook ground seeds with greens, meat and spices until the soup thickens.',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80',
      prepTime: '55 min',
      region: 'Nigeria',
    },
    {
      name: 'Suya',
      emoji: '🍢',
      description: 'Charred skewers of spicy dry-rubbed beef served with sliced onions.',
      ingredients: ['beef', 'ground peanuts', 'chili', 'spices'],
      instructions: 'Thread seasoned beef onto skewers and grill until smoky with crisp edges.',
      image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=80',
      prepTime: '30 min',
      region: 'Nigeria',
    },
    {
      name: 'Pounded Yam',
      emoji: '🥔',
      description: 'Soft, stretchy yam mash served with rich soups like egusi or ogbono.',
      ingredients: ['yam', 'water'],
      instructions: 'Boil yam pieces and pound until smooth, then shape into balls for serving.',
      image: 'https://images.unsplash.com/photo-1545129976-1e5563d7d59e?auto=format&fit=crop&w=900&q=80',
      prepTime: '35 min',
      region: 'Nigeria',
    },
    {
      name: 'Pepper Soup',
      emoji: '🌶️',
      description: 'Spicy clear broth with meat, fish and fragrant West African seasonings.',
      ingredients: ['meat', 'pepper', 'onion', 'seasoning cubes'],
      instructions: 'Simmer protein and spices until the broth is spicy, warm and aromatic.',
      image: 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=900&q=80',
      prepTime: '40 min',
      region: 'Nigeria',
    },
  ],
  'Senegal': [
    { name: 'Thieboudienne', emoji: '🍚', description: 'Rice cooked in fish stock with vegetables.' },
    { name: 'Yassa Chicken', emoji: '🍗', description: 'Chicken marinated in lemon and onions.' },
    { name: 'Maafe', emoji: '🥜', description: 'Peanut butter stew with meat.' },
    { name: 'Couscous', emoji: '🌾', description: 'Steamed grain with vegetables.' },
  ],
  
  // East Africa
  'Kenya': [
    { name: 'Ugali', emoji: '🌾', description: 'Cornmeal porridge, a staple carb.' },
    { name: 'Sukuma Wiki', emoji: '🥬', description: 'Collard greens with tomatoes and onions.' },
    { name: 'Nyama Choma', emoji: '🍖', description: 'Grilled meat with lime and salt.' },
    { name: 'Chapati', emoji: '🫓', description: 'Flatbread stuffed with potatoes.' },
    { name: 'Githeri', emoji: '🌽', description: 'Corn and beans cooked together.' },
  ],
  
  // Southern Africa
  'South Africa': [
    { name: 'Boerewors', emoji: '🌭', description: 'Spiced farmer\'s sausage.' },
    { name: 'Bunny Chow', emoji: '🍞', description: 'Hollowed bread filled with curry.' },
    { name: 'Bobotie', emoji: '🍲', description: 'Spiced mincemeat baked with custard.' },
    { name: 'Biltong', emoji: '🥩', description: 'Dried and cured meat strips.' },
    { name: 'Pap', emoji: '🌾', description: 'Maize porridge staple.' },
  ],
  
  // North Africa
  'Egypt': [
    { name: 'Koshari', emoji: '🍝', description: 'Pasta, lentils, and tomato sauce.' },
    { name: 'Ful Medames', emoji: '🫘', description: 'Fava bean stew with spices.' },
    { name: 'Falafel', emoji: '🫓', description: 'Deep-fried chickpea fritters.' },
    { name: 'Molokheya', emoji: '🌿', description: 'Green leafy herb stew.' },
    { name: 'Shakshuka', emoji: '🍳', description: 'Eggs poached in tomato sauce.' },
  ],
  'Morocco': [
    { name: 'Tagine', emoji: '🍲', description: 'Slow-cooked stew with meat and fruit.' },
    { name: 'Couscous', emoji: '🌾', description: 'Steamed grain with seven vegetables.' },
    { name: 'Harira', emoji: '🍲', description: 'Tomato and lentil soup.' },
    { name: 'Pastilla', emoji: '🫓', description: 'Phyllo pastry with savory filling.' },
  ],
  
  // Middle East
  'Lebanon': [
    { name: 'Kibbeh', emoji: '🍖', description: 'Ground meat with bulgur and spices.' },
    { name: 'Hummus', emoji: '🫘', description: 'Chickpea and tahini dip.' },
    { name: 'Fattoush', emoji: '🥗', description: 'Mixed greens with pita chips.' },
    { name: 'Tabbouleh', emoji: '🌿', description: 'Parsley salad with bulgur.' },
  ],
  'Turkey': [
    { name: 'Kebab', emoji: '🍖', description: 'Skewered meat grilled to perfection.' },
    { name: 'Mezze', emoji: '🫓', description: 'Assorted small plates and dips.' },
    { name: 'Pide', emoji: '🍞', description: 'Turkish flatbread with toppings.' },
    { name: 'Baklava', emoji: '🍯', description: 'Layered pastry with nuts and honey.' },
  ],
  
  // South Asia
  'India': [
    { name: 'Butter Chicken', emoji: '🍗', description: 'Creamy tomato-based chicken curry.' },
    { name: 'Dosa', emoji: '🫓', description: 'Crispy fermented rice and lentil crepe.' },
    { name: 'Samosa', emoji: '🫓', description: 'Fried pastry with savory filling.' },
    { name: 'Biryani', emoji: '🍚', description: 'Fragrant rice with spiced meat.' },
    { name: 'Masala Dosa', emoji: '🫓', description: 'Dosa with spiced potato filling.' },
  ],
  
  // East Asia
  'Japan': [
    {
      name: 'Sushi',
      emoji: '🍣',
      description: 'Delicate vinegared rice topped with fresh seafood and vegetables.',
      ingredients: ['sushi rice', 'nori', 'fresh fish', 'soy sauce', 'wasabi'],
      instructions: 'Prepare seasoned sushi rice and assemble rolls or nigiri with fresh ingredients.',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
      prepTime: '30 min',
      region: 'Japan',
    },
    {
      name: 'Ramen',
      emoji: '🍜',
      description: 'Noodles served in a rich, savory broth with toppings like egg and pork.',
      ingredients: ['ramen noodles', 'broth', 'egg', 'pork', 'scallions'],
      instructions: 'Cook noodles and top them with a deeply flavored broth, meat and garnishes.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
      prepTime: '45 min',
      region: 'Japan',
    },
    {
      name: 'Tempura',
      emoji: '🍤',
      description: 'Lightly battered seafood and vegetables fried until crisp and airy.',
      ingredients: ['shrimp', 'vegetables', 'tempura batter', 'dipping sauce'],
      instructions: 'Dip ingredients into batter and fry quickly until golden and crisp.',
      image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=900&q=80',
      prepTime: '25 min',
      region: 'Japan',
    },
    {
      name: 'Tonkatsu',
      emoji: '🍖',
      description: 'Crispy breaded pork cutlet served with tangy sauce and cabbage.',
      ingredients: ['pork cutlet', 'breadcrumbs', 'cabbage', 'tonkatsu sauce'],
      instructions: 'Bread pork cutlets and fry until golden, then slice and serve with sauce.',
      image: 'https://images.unsplash.com/photo-1604908554095-04b22b8217e9?auto=format&fit=crop&w=900&q=80',
      prepTime: '35 min',
      region: 'Japan',
    },
    {
      name: 'Yakitori',
      emoji: '🍢',
      description: 'Chargrilled chicken skewers glazed in savory-sweet tare sauce.',
      ingredients: ['chicken', 'skewers', 'soy sauce', 'mirin', 'sugar'],
      instructions: 'Grill chicken over high heat while brushing with tare sauce until glossy.',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80',
      prepTime: '30 min',
      region: 'Japan',
    },
  ],
  'South Korea': [
    { name: 'Bibimbap', emoji: '🍚', description: 'Mixed rice with vegetables and egg.' },
    { name: 'Kimchi', emoji: '🌶️', description: 'Fermented spiced cabbage.' },
    { name: 'Bulgogi', emoji: '🍖', description: 'Marinated grilled beef.' },
    { name: 'Tteokbokki', emoji: '🍢', description: 'Spicy rice cakes in red sauce.' },
    { name: 'Korean BBQ', emoji: '🍗', description: 'Table-grilled meat and vegetables.' },
  ],
  'China': [
    { name: 'Peking Duck', emoji: '🦆', description: 'Roasted duck with crispy skin.' },
    { name: 'Mapo Tofu', emoji: '🌶️', description: 'Spicy tofu in chili sauce.' },
    { name: 'Dumplings', emoji: '🥟', description: 'Steamed or fried filled pockets.' },
    { name: 'Fried Rice', emoji: '🍚', description: 'Day-old rice with vegetables.' },
  ],
  
  // Southeast Asia
  'Thailand': [
    { name: 'Pad Thai', emoji: '🍜', description: 'Stir-fried rice noodles.' },
    { name: 'Tom Yum', emoji: '🍲', description: 'Spicy shrimp soup.' },
    { name: 'Green Curry', emoji: '🌶️', description: 'Creamy green chili curry.' },
    { name: 'Satay', emoji: '🍢', description: 'Grilled meat skewers with peanut sauce.' },
  ],
  'Vietnam': [
    { name: 'Pho', emoji: '🍲', description: 'Aromatic beef or chicken noodle soup.' },
    { name: 'Banh Mi', emoji: '🥖', description: 'Vietnamese baguette sandwich.' },
    { name: 'Spring Rolls', emoji: '🫓', description: 'Rice paper rolls with vegetables.' },
    { name: 'Bun Cha', emoji: '🍖', description: 'Grilled pork with noodles and sauce.' },
  ],
  'Philippines': [
    { name: 'Adobo', emoji: '🍖', description: 'Meat stewed in vinegar and garlic.' },
    { name: 'Sinigang', emoji: '🍲', description: 'Sour tamarind broth with meat.' },
    { name: 'Lumpia', emoji: '🫓', description: 'Fried spring rolls.' },
    { name: 'Lechon', emoji: '🍖', description: 'Roasted whole pig.' },
  ],
  
  // Americas
  'Mexico': [
    { name: 'Tacos', emoji: '🌮', description: 'Filled tortillas with meat and toppings.' },
    { name: 'Mole', emoji: '🌶️', description: 'Rich sauce with chocolate and spices.' },
    { name: 'Tamales', emoji: '🌽', description: 'Corn dough wrapped in husks.' },
    { name: 'Ceviche', emoji: '🐟', description: 'Marinated raw fish.' },
  ],
  'Brazil': [
    { name: 'Feijoada', emoji: '🍲', description: 'Black bean stew with pork.' },
    { name: 'Pão de Queijo', emoji: '🧀', description: 'Cheese bread puffs.' },
    { name: 'Brigadeiro', emoji: '🍫', description: 'Chocolate truffle candy.' },
    { name: 'Açai Bowl', emoji: '🫐', description: 'Frozen açai with granola.' },
  ],
  'Peru': [
    { name: 'Ceviche', emoji: '🐟', description: 'Fresh fish cured in citrus.' },
    { name: 'Lomo Saltado', emoji: '🍖', description: 'Stir-fried beef with peppers.' },
    { name: 'Quinoa', emoji: '🌾', description: 'Ancient grain staple.' },
    { name: 'Causa', emoji: '🥔', description: 'Layered potato dish.' },
  ],
  
  // Europe
  'France': [
    { name: 'Croissant', emoji: '🥐', description: 'Buttery flaky pastry.' },
    { name: 'Coq au Vin', emoji: '🍗', description: 'Chicken braised in wine.' },
    { name: 'Escargot', emoji: '🐌', description: 'Snails with garlic butter.' },
    { name: 'Cassoulet', emoji: '🍲', description: 'Bean and meat casserole.' },
  ],
  'Italy': [
    { name: 'Pasta', emoji: '🍝', description: 'Noodles with various sauces.' },
    { name: 'Risotto', emoji: '🍚', description: 'Creamy rice dish.' },
    { name: 'Osso Buco', emoji: '🍖', description: 'Braised veal shanks.' },
    { name: 'Tiramisu', emoji: '🍰', description: 'Layered coffee dessert.' },
  ],
  'Spain': [
    { name: 'Paella', emoji: '🍚', description: 'Saffron rice with seafood.' },
    { name: 'Tapas', emoji: '🫓', description: 'Small savory dishes.' },
    { name: 'Churro', emoji: '🫓', description: 'Fried pastry with chocolate.' },
    { name: 'Gazpacho', emoji: '🍅', description: 'Cold tomato soup.' },
  ],
  'Germany': [
    { name: 'Bratwurst', emoji: '🌭', description: 'Spiced pork sausage.' },
    { name: 'Schnitzel', emoji: '🍖', description: 'Breaded pork cutlet.' },
    { name: 'Pretzel', emoji: '🥨', description: 'Twisted bread.' },
    { name: 'Sauerkraut', emoji: '🥬', description: 'Fermented cabbage.' },
  ],
  'Greece': [
    { name: 'Souvlaki', emoji: '🍢', description: 'Grilled meat skewers.' },
    { name: 'Moussaka', emoji: '🍆', description: 'Layered eggplant casserole.' },
    { name: 'Tzatziki', emoji: '🥒', description: 'Yogurt and cucumber dip.' },
    { name: 'Baklava', emoji: '🍯', description: 'Phyllo pastry with honey.' },
  ],
}

export function getFoodsForCountry(countryName: string) {
  // Try exact match first
  if (CULTURE_FOODS[countryName]) return CULTURE_FOODS[countryName]

  // Try partial match by name inclusion
  const key = Object.keys(CULTURE_FOODS).find(k => countryName.includes(k) || k.includes(countryName))
  if (key) return CULTURE_FOODS[key]

  // If still no match, try alternative country name patterns
  const alternatives: Record<string, string> = {
    'Sri Lanka': 'Sri Lanka',
    'Ivory Coast': 'Côte d\'Ivoire',
    'Democratic Republic of the Congo': 'DR Congo',
    'Czech Republic': 'Czechia',
    'South Sudan': 'South Sudan',
    'United Kingdom': 'United Kingdom',
    'New Zealand': 'New Zealand',
  }

  const altKey = alternatives[countryName]
  if (altKey && CULTURE_FOODS[altKey]) return CULTURE_FOODS[altKey]

  // Return empty array if no match
  return []
}
