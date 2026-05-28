// Comprehensive world currencies mapping
export const WORLD_CURRENCIES: Record<string, { name: string; symbol: string; countries: string[] }> = {
  'USD': { name: 'US Dollar', symbol: '$', countries: ['United States'] },
  'EUR': { name: 'Euro', symbol: '€', countries: ['Austria', 'Belgium', 'France', 'Germany', 'Greece', 'Ireland', 'Italy', 'Netherlands', 'Spain', 'Portugal'] },
  'GBP': { name: 'British Pound', symbol: '£', countries: ['United Kingdom'] },
  'JPY': { name: 'Japanese Yen', symbol: '¥', countries: ['Japan'] },
  'CNY': { name: 'Chinese Yuan', symbol: '¥', countries: ['China'] },
  'INR': { name: 'Indian Rupee', symbol: '₹', countries: ['India'] },
  'CHF': { name: 'Swiss Franc', symbol: 'CHF', countries: ['Switzerland'] },
  'CAD': { name: 'Canadian Dollar', symbol: '$', countries: ['Canada'] },
  'AUD': { name: 'Australian Dollar', symbol: '$', countries: ['Australia'] },
  'NZD': { name: 'New Zealand Dollar', symbol: '$', countries: ['New Zealand'] },
  'SGD': { name: 'Singapore Dollar', symbol: '$', countries: ['Singapore'] },
  'HKD': { name: 'Hong Kong Dollar', symbol: '$', countries: ['Hong Kong'] },
  'SEK': { name: 'Swedish Krona', symbol: 'kr', countries: ['Sweden'] },
  'NOK': { name: 'Norwegian Krone', symbol: 'kr', countries: ['Norway'] },
  'DKK': { name: 'Danish Krone', symbol: 'kr', countries: ['Denmark'] },
  'KRW': { name: 'South Korean Won', symbol: '₩', countries: ['South Korea'] },
  'THB': { name: 'Thai Baht', symbol: '฿', countries: ['Thailand'] },
  'MYR': { name: 'Malaysian Ringgit', symbol: 'RM', countries: ['Malaysia'] },
  'PHP': { name: 'Philippine Peso', symbol: '₱', countries: ['Philippines'] },
  'IDR': { name: 'Indonesian Rupiah', symbol: 'Rp', countries: ['Indonesia'] },
  'VND': { name: 'Vietnamese Dong', symbol: '₫', countries: ['Vietnam'] },
  'BRL': { name: 'Brazilian Real', symbol: 'R$', countries: ['Brazil'] },
  'MXN': { name: 'Mexican Peso', symbol: '$', countries: ['Mexico'] },
  'ARS': { name: 'Argentine Peso', symbol: '$', countries: ['Argentina'] },
  'CLP': { name: 'Chilean Peso', symbol: '$', countries: ['Chile'] },
  'COP': { name: 'Colombian Peso', symbol: '$', countries: ['Colombia'] },
  'PEN': { name: 'Peruvian Sol', symbol: 'S/', countries: ['Peru'] },
  'ZAR': { name: 'South African Rand', symbol: 'R', countries: ['South Africa'] },
  'EGP': { name: 'Egyptian Pound', symbol: '£', countries: ['Egypt'] },
  'NGN': { name: 'Nigerian Naira', symbol: '₦', countries: ['Nigeria'] },
  'GHS': { name: 'Ghanaian Cedi', symbol: '₵', countries: ['Ghana'] },
  'KES': { name: 'Kenyan Shilling', symbol: 'KSh', countries: ['Kenya'] },
  'ILS': { name: 'Israeli Shekel', symbol: '₪', countries: ['Israel'] },
  'SAR': { name: 'Saudi Riyal', symbol: 'SR', countries: ['Saudi Arabia'] },
  'AED': { name: 'UAE Dirham', symbol: 'د.إ', countries: ['United Arab Emirates'] },
  'QAR': { name: 'Qatari Riyal', symbol: 'QR', countries: ['Qatar'] },
  'KWD': { name: 'Kuwaiti Dinar', symbol: 'د.ك', countries: ['Kuwait'] },
  'BHD': { name: 'Bahraini Dinar', symbol: '.د.ب', countries: ['Bahrain'] },
  'OMR': { name: 'Omani Rial', symbol: 'R.O.', countries: ['Oman'] },
  'JOD': { name: 'Jordanian Dinar', symbol: 'د.ا', countries: ['Jordan'] },
  'LBP': { name: 'Lebanese Pound', symbol: 'ل.ل', countries: ['Lebanon'] },
  'TRY': { name: 'Turkish Lira', symbol: '₺', countries: ['Turkey'] },
  'PKR': { name: 'Pakistani Rupee', symbol: 'Rs', countries: ['Pakistan'] },
  'BDT': { name: 'Bangladeshi Taka', symbol: '৳', countries: ['Bangladesh'] },
  'RUB': { name: 'Russian Ruble', symbol: '₽', countries: ['Russia'] },
  'UAH': { name: 'Ukrainian Hryvnia', symbol: '₴', countries: ['Ukraine'] },
  'PLN': { name: 'Polish Zloty', symbol: 'zł', countries: ['Poland'] },
  'CZK': { name: 'Czech Koruna', symbol: 'Kč', countries: ['Czechia'] },
  'HUF': { name: 'Hungarian Forint', symbol: 'Ft', countries: ['Hungary'] },
  'RON': { name: 'Romanian Leu', symbol: 'lei', countries: ['Romania'] },
  'HRK': { name: 'Croatian Kuna', symbol: 'kn', countries: ['Croatia'] },
  'BGN': { name: 'Bulgarian Lev', symbol: 'лв', countries: ['Bulgaria'] },
  'RSD': { name: 'Serbian Dinar', symbol: 'дин.', countries: ['Serbia'] },
  'SLE': { name: 'Sierra Leonean Leone', symbol: 'Le', countries: ['Sierra Leone'] },
  'LRD': { name: 'Liberian Dollar', symbol: '$', countries: ['Liberia'] },
  'GMD': { name: 'Gambian Dalasi', symbol: 'D', countries: ['Gambia'] },
  'MZN': { name: 'Mozambican Metical', symbol: 'MT', countries: ['Mozambique'] },
  'ZWL': { name: 'Zimbabwean Dollar', symbol: '$', countries: ['Zimbabwe'] },
  'UGX': { name: 'Ugandan Shilling', symbol: 'USh', countries: ['Uganda'] },
  'ETB': { name: 'Ethiopian Birr', symbol: 'Br', countries: ['Ethiopia'] },
  'TZS': { name: 'Tanzanian Shilling', symbol: 'TSh', countries: ['Tanzania'] },
  'XOF': { name: 'West African CFA Franc', symbol: 'Fr', countries: ['Benin', 'Burkina Faso', "Côte d'Ivoire", 'Mali', 'Niger', 'Senegal', 'Togo'] },
  'XAF': { name: 'Central African CFA Franc', symbol: 'Fr', countries: ['Cameroon', 'Central African Republic', 'Chad', 'Congo', 'Equatorial Guinea', 'Gabon'] },
  'DZD': { name: 'Algerian Dinar', symbol: 'د.ج', countries: ['Algeria'] },
  'MAD': { name: 'Moroccan Dirham', symbol: 'د.م.', countries: ['Morocco'] },
  'TND': { name: 'Tunisian Dinar', symbol: 'د.ت', countries: ['Tunisia'] },
  'LYD': { name: 'Libyan Dinar', symbol: 'ل.د', countries: ['Libya'] },
}

export const SUPPORTED_CURRENCIES = Object.keys(WORLD_CURRENCIES).sort()

export function getCurrencyInfo(code: string) {
  return WORLD_CURRENCIES[code.toUpperCase()] || null
}

export function getSortedCurrencies(priorityCode?: string) {
  if (!priorityCode) return SUPPORTED_CURRENCIES
  
  const priority = priorityCode.toUpperCase()
  if (!WORLD_CURRENCIES[priority]) return SUPPORTED_CURRENCIES
  
  return [priority, ...SUPPORTED_CURRENCIES.filter(c => c !== priority)]
}
