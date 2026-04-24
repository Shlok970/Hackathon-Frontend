# ReviewIQ - AI Product Review Intelligence

AI-powered product review intelligence platform for deep consumer insights and sentiment mapping.

## Features
- **AI Sentiment Mapping**: Analyze thousands of reviews in seconds.
- **Strategic Insights**: Get automated recommendations for product improvement and marketing.
- **Regional Analysis**: See how your product performs across different geographic segments.
- **Fake Review Detection**: Identify potential integrity issues in your review data.

## Getting Started Locally

### Prerequisites
- Node.js (v18 or higher)
- npm (installed with Node.js)
- MongoDB (optional, but recommended for caching and history)

### Installation
1. Extract the project files to a folder on your system.
2. Open your terminal in that folder.
3. Install the dependencies:
   ```bash
   npm install
   ```

### Configuration
1. Create a `.env` file in the root directory.
2. Add your API keys and configuration:
   ```env
   RAPIDAPI_KEY=your_rapidapi_key_here
   DATABASE_URL=mongodb://localhost:27017/reviewiq
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *Note: If you don't have a RapidAPI key yet, the app will run with mock data for demo purposes. This app uses the "Real-Time Amazon Data" API from RapidAPI.*

### Running the App
Start the development server (runs both Vite and Express):
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

---

## How to Upload to GitHub

1. **Create a GitHub Repository**: 
   - Go to [github.com/new](https://github.com/new).
   - Give it a name (e.g., `review-iq`) and click "Create repository".

2. **Initialize Git Locally**:
   Open your terminal in the project folder and run:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   ```

3. **Link to GitHub**:
   Copy the commands provided by GitHub (under "push an existing repository") which look like this:
   ```bash
   git remote add origin https://github.com/yourusername/review-iq.git
   git branch -M main
   git push -u origin main
   ```

---

## Technical Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Recharts.
- **Backend**: Node.js, Express, Mongoose.
- **APIs**: Rainforest API (Amazon Data), Gemini API (AI Insights).
