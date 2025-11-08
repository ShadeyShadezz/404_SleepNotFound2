# 📚 Najah - Your Peaceful Companion for Productive Studying

Najah is a beautiful, feature-rich study companion web application designed to help students stay focused, organized, and productive. With a calming aesthetic and intuitive interface, Najah combines task management, Pomodoro timers, AI-powered homework assistance, and ambient music to create the perfect study environment.

![Najah Logo](/Public/najah-logo.png)

## ✨ Features

### 🏠 Home Dashboard
- **Overview Dashboard**: Quick stats showing total tasks, completed tasks, and subjects
- **Recent Tasks**: View and manage your most recent tasks with filtering options
- **Points System**: Track your productivity with a gamified points system
- **Beautiful UI**: Warm, calming color scheme with floating bubble animations

### ⏱️ Pomodoro Timer
- **Customizable Timer**: Set your own timer duration (1-120 minutes)
- **Play/Pause Controls**: Full control over your study sessions
- **Timer Persistence**: Your preferred timer setting is saved automatically
- **Integrated Music Player**: Built-in lofi music player for focus

### 📝 Task Management
- **Create & Organize Tasks**: Add tasks with subjects, descriptions, and priorities
- **Priority Levels**: Organize tasks by High, Medium, or Low priority
- **Due Dates**: Set and track due dates for your assignments
- **Subtasks**: Break down complex tasks into manageable subtasks
- **Filtering**: Filter tasks by priority, due date, or completion status
- **Color Coding**: Visual organization with color-coded task cards

### 🤖 AI Homework Helper
- **Gemini AI Integration**: Powered by Google's Gemini 2.5 Flash Lite model
- **Markdown Support**: Beautifully formatted responses with code blocks, lists, and more
- **Conversational Interface**: Chat-based interface for natural interactions
- **Context-Aware**: Maintains conversation history for better assistance

### 🎵 Music Player
- **Lofi Music Collection**: Four curated lofi tracks for focused studying
  - Honey Jam
  - Peach Prosecco
  - Aromatic
  - Noon
- **Playlist Controls**: Navigate between tracks, loop individual songs or entire playlist
- **Volume Control**: Adjustable volume with global volume control
- **Progress Tracking**: Visual progress bar with time indicators

### 👤 Profile & Settings
- **Customizable Profile**: Set your name and upload a profile picture
- **Achievement System**: Track your study milestones and achievements
- **Timer Preferences**: Save your default timer duration
- **Content Filtering**: Built-in inappropriate content filter for profile names

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Gemini API key (for homework help feature)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   To get a Gemini API key:
   - Visit [Google AI Studio](https://ai.google.dev/)
   - Sign in with your Google account
   - Create a new API key
   - Copy it to your `.env` file

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## 🛠️ Tech Stack

- **React 19** - Modern React with latest features
- **Vite 7** - Fast build tool and dev server
- **React Router 7** - Client-side routing
- **Lucide React** - Beautiful icon library
- **React Markdown** - Markdown rendering for AI responses
- **Gemini API** - Google's AI for homework assistance
- **LocalStorage** - Client-side data persistence

## 📁 Project Structure

```
my-app/
├── Public/                 # Static assets (music, images)
│   ├── Lofi.mp3
│   ├── Lofi1.mp3
│   ├── Lofi2.mp3
│   ├── Lofi3.mp3
│   └── najah-logo.png
├── src/
│   ├── Pages/              # Page components
│   │   ├── HomePage.jsx
│   │   ├── TimerPage.jsx
│   │   ├── TasksPage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── HomeworkHelpPage.jsx
│   ├── components/         # Reusable components
│   │   ├── Navigation.jsx
│   │   ├── VolumeControl.jsx
│   │   ├── DashboardCard.jsx
│   │   └── CloudDecoration.jsx
│   ├── Styles/             # CSS styles
│   │   └── Pages.css
│   ├── Utils/              # Utility functions
│   │   └── audioService.js
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies
```

## 🎨 Features in Detail

### Task Management
- Create tasks with subject, description, priority, and due date
- Add subtasks to break down complex assignments
- Filter by priority (High/Medium/Low), due date (Today), or view all
- Mark tasks as complete with visual feedback
- Edit tasks inline
- Color-coded task cards for visual organization

### Timer Features
- Customizable timer (1-120 minutes)
- Visual countdown display
- Play/pause functionality
- Timer settings saved to profile
- Integrated with music player for focused sessions

### AI Homework Helper
- Powered by Google Gemini 2.5 Flash Lite
- Natural language conversation interface
- Markdown-formatted responses
- Maintains conversation context
- Handles code, math, and general homework questions

### Music Player
- Four lofi tracks included
- Crossfade transitions between tracks
- Loop individual tracks or entire playlist
- Volume control with persistence
- Visual progress indicators

## 🔧 Configuration

### Vite Configuration
The app uses a custom Vite configuration to handle the `Public` folder correctly. The configuration is in `vite.config.js`.

### Environment Variables
- `VITE_GEMINI_API_KEY`: Required for the homework help feature. Get your key from [Google AI Studio](https://ai.google.dev/).

## 📱 Usage

### Navigation
Use the bottom navigation bar to switch between:
- **Home** 🏠 - Dashboard and overview
- **Timer** ⏱️ - Pomodoro timer with music
- **Tasks** 📖 - Task management
- **Homework Help** 💬 - AI assistant
- **Profile** 👤 - Settings and achievements

### Creating Tasks
1. Navigate to the Tasks page
2. Fill in the task form (subject, description, priority, due date)
3. Click "Add Task"
4. Tasks are automatically saved to localStorage

### Using the Timer
1. Go to the Timer page
2. Click the timer display to edit duration
3. Click play to start
4. Use the music player controls to play focus music
5. Your timer preference is saved automatically

### Getting Homework Help
1. Navigate to Homework Help
2. Type your question in the chat input
3. The AI will respond with helpful explanations
4. Continue the conversation for follow-up questions

## 🎯 Future Enhancements

Potential features for future versions:
- Cloud sync for tasks and settings
- More music tracks and playlists
- Study statistics and analytics
- Dark mode
- Mobile app version
- Collaboration features
- Export tasks to calendar

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- **Google Gemini API** - For AI-powered homework assistance
- **Lucide Icons** - Beautiful icon set
- **React Community** - Amazing framework and ecosystem

## 📞 Support

For issues, questions, or suggestions, please open an issue in the repository.

---

**Made with ❤️ for students who want to study better**

*Najah - Your peaceful companion for productive studying*
