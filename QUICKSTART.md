# QUICKSTART.md - Get Running in 30 Seconds

## 🚀 Start Development Server

```bash
npm install
npm run dev
```

Open **http://localhost:3000** in your browser. Done! ✅

---

## 🏗️ Production Build

```bash
npm run build
npm start
```

---

## 📤 Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/globe-lingo.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repo
   - Click "Deploy"

**That's it!** Your app is live. 🎉

---

## 🧪 Test It Out

### Test Country Search
- Type: `Japan`
- Click: Search
- See: Flag, Capital, Population, Languages, Currency

### Test Currency Converter  
- Keep defaults: `100 USD to EUR`
- Click: Convert
- See: Exchange rate result

### Test Dictionary Search
- Type: `serendipity`
- Click: Search
- See: Pronunciation, Definition, Example

---

## 📁 Project Structure

```
app/
  ├── api/convert/       ← Currency API proxy
  ├── page.tsx          ← Main page
  ├── layout.tsx        ← Root layout
  └── globals.css       ← Tailwind CSS

components/
  ├── CountrySearch.tsx       ← Country info feature
  ├── CurrencyConverter.tsx    ← Currency conversion feature
  └── DictionarySearch.tsx     ← Word definitions feature
```

---

## 🔧 Available Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server on :3000 |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run linter |

---

## 🌐 Live APIs

- 🌍 **Countries**: https://restcountries.com
- 💱 **Currency**: https://frankfurter.app
- 📚 **Dictionary**: https://dictionaryapi.dev

No configuration or API keys needed! 

---

## ✅ Features Included

- [x] Search countries with full details
- [x] Convert currencies with live rates
- [x] Look up English words with pronunciation
- [x] Responsive mobile-friendly design
- [x] Error handling & loading states
- [x] TypeScript for type safety
- [x] Tailwind CSS for styling
- [x] Production-ready code
- [x] Vercel deployment-ready

---

## 🐛 Troubleshooting

**Port 3000 in use?**
```bash
npm run dev -- -p 3001
```

**Need to reinstall?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build failing?**
```bash
npm run build -- --debug
```

---

## 📚 Docs

- **Features**: See `FEATURES.md`
- **Deployment**: See `DEPLOYMENT.md`
- **Full README**: See `README.md`

---

## 🎯 Next Steps

1. Run `npm install && npm run dev`
2. Open http://localhost:3000
3. Test all 3 features
4. Deploy to Vercel when ready
5. Share with friends! 🌍

Happy coding! 🚀
