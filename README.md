# Rayovi

Rayovi is a personal project built for people who love watching YouTube but wish it offered more—like ranking, reviewing, and creating lists of videos. If you enjoy discovering, organizing, and sharing your favorite YouTube content, but find YouTube itself lacking in social and curation features, Rayovi is for you.

## Features

- **YouTube Integration:** Connect your YouTube account via Google OAuth to import your profile, liked videos, playlists, and subscriptions.
- **Personalized Recommendations:** Get video suggestions based on your YouTube activity and preferences.
- **Lists & Curation:** Create, curate, and share custom video lists. Discover featured and popular lists from the community.
- **Social Profiles:** Build your profile, track your video-watching history, rate and review videos, and showcase your favorite content.
- **Community:** Follow other members, see recent activity, and connect with friends who share your interests.
- **Privacy First:** Only access the data you consent to. Your information is never shared with third parties, and you can revoke access at any time.

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **UI Components:** shadcn/ui, Radix UI, Tailwind CSS
- **State & Data:** React Query, React Hook Form, Zod
- **Routing:** React Router DOM
- **Icons:** Lucide React

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd Rayovi
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   bun install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env` and add your Google OAuth credentials (see the Auth page for required scopes).

4. Start the development server:
   ```sh
   npm run dev
   # or
   bun run dev
   ```

5. Open [http://localhost:8080](http://localhost:8080) in your browser.


## Customization
- **UI Theme:** The app uses a dark, Letterboxd-inspired theme with Tailwind CSS and custom CSS variables.
- **Component Library:** Built with shadcn/ui and Radix UI for accessible, composable components.

## License

This project is for educational and demonstration purposes. See [LICENSE](LICENSE) for more details.
---

**Rayovi** — For YouTube lovers who want more than YouTube offers. 