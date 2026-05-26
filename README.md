# GlobeLingo - Travel & Language Companion

A modern, production-ready Next.js web application that combines travel and language tools in one elegant interface.

## Features

### 🌍 Country Search
- Search for any country in the world
- View country flag, official name, capital, population
- See languages spoken and currencies used
- Real-time data from REST Countries API

### 💱 Currency Converter
- Convert between multiple currencies
- Support for 10+ major currencies (USD, EUR, GBP, JPY, etc.)
- Live exchange rates from Frankfurter API
- Instant conversion calculations

### 📚 Dictionary Search
- Look up English word definitions
- View pronunciation guides
- Read example sentences
- Get part-of-speech information
- Data from Free Dictionary API

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **API Calls**: Native Fetch API
- **Deployment**: Vercel-ready

## Project Structure

```
globe-lingo/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── CountrySearch.tsx   # Country search component
│   ├── CurrencyConverter.tsx # Currency converter component
│   └── DictionarySearch.tsx # Dictionary search component
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── next.config.js
```

## Installation

1. Clone the repository or navigate to the project folder
2. Install dependencies:

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The app automatically reloads when you make changes.

## Building

Build the application for production:

```bash
npm run build
```

## Production

Start the production server:

```bash
npm start
```

## API Integrations

### REST Countries API
- Base URL: `https://restcountries.com/v3.1/name/`
- Used for: Country information (flags, capitals, populations, languages, currencies)
- No authentication required

### Frankfurter Currency API
- Base URL: `https://api.frankfurter.app/latest`
- Used for: Real-time currency conversion
- Supports: Major world currencies
- No authentication required

### Free Dictionary API
- Base URL: `https://api.dictionaryapi.dev/api/v2/entries/en/`
- Used for: English word definitions, pronunciations, examples
- No authentication required

## Key Features

✅ **Production Ready** - Fully functional, no placeholders
✅ **Responsive Design** - Works on mobile, tablet, and desktop
✅ **Error Handling** - Graceful error messages for all scenarios
✅ **Loading States** - Clear visual feedback during API calls
✅ **TypeScript** - Full type safety throughout the application
✅ **No Authentication** - Works out of the box, no setup required
✅ **Vercel Compatible** - Deploy directly to Vercel
✅ **Fast Performance** - Optimized bundle size and rendering
✅ **Clean UI** - Modern, minimalist design with Tailwind CSS

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Click "Deploy"
4. Your app will be live!

No additional configuration needed. The app works immediately after deployment.

### Environment Variables

No environment variables are required. All APIs are public and require no authentication.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Fast initial load (<2s)
- Optimized images
- Minimal JavaScript bundle
- Efficient API caching
- Mobile-first responsive design

## License

MIT

## Contributing

Feel free to fork and submit pull requests for any improvements.

## Support

For issues with the APIs:
- REST Countries: https://restcountries.com
- Frankfurter: https://frankfurter.app
- Dictionary API: https://dictionaryapi.dev
