export type FoodItem = {
  name: string
  emoji?: string
  description?: string
}

export const CULTURE_FOODS: Record<string, FoodItem[]> = {
  // West Africa
  'Sierra Leone': [
    { name: 'Cassava Leaves', emoji: '🌿', description: 'Tender cassava leaves cooked with spices, palm oil, and meat.' },
    { name: 'Groundnut Soup', emoji: '🥜', description: 'Rich peanut-based soup with meat or fish.' },
    { name: 'Jollof Rice', emoji: '🍚', description: 'Spiced tomato rice with vegetables and protein.' },
    { name: 'Potato Leaves', emoji: '🌱', description: 'Leafy green stew with potatoes and seasoning.' },
    { name: 'Fufu', emoji: '🥔', description: 'Pounded cassava or plantain with sauce.' },
  ],
  'Ghana': [
    { name: 'Fufu', emoji: '🥔', description: 'Pounded plantain and cassava with soup.' },
    { name: 'Banku', emoji: '🍛', description: 'Cornmeal and cassava dough served with soup.' },
    { name: 'Waakye', emoji: '🍲', description: 'Rice and beans cooked with spices.' },
    { name: 'Light Soup', emoji: '🍲', description: 'Tomato-based soup with meat and vegetables.' },
    { name: 'Kontomire Stew', emoji: '🌿', description: 'Cocoyam leaf stew with groundnuts.' },
  ],
  'Nigeria': [
    { name: 'Jollof Rice', emoji: '🍚', description: 'Signature West African rice dish.' },
    { name: 'Egusi Soup', emoji: '🍲', description: 'Melon seed soup with vegetables.' },
    { name: 'Suya', emoji: '🍢', description: 'Spicy grilled meat skewers.' },
    { name: 'Pounded Yam', emoji: '🥔', description: 'Smooth yam puree with soup.' },
    { name: 'Pepper Soup', emoji: '🌶️', description: 'Aromatic broth with meat and spices.' },
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
    { name: 'Sushi', emoji: '🍣', description: 'Vinegared rice with fresh seafood.' },
    { name: 'Ramen', emoji: '🍜', description: 'Noodle soup with rich broth.' },
    { name: 'Tempura', emoji: '🍤', description: 'Lightly battered and fried seafood.' },
    { name: 'Tonkatsu', emoji: '🍖', description: 'Breaded and fried pork cutlet.' },
    { name: 'Yakitori', emoji: '🍢', description: 'Grilled chicken skewers.' },
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

  // Return empty array if no match
  return []
}
