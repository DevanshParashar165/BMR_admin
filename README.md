# BMR Mandir Admin Portal (Admin Frontend)

This is the administrative frontend portal for the BMR Mandir application. It provides authenticated controls for managing the image gallery displayed on the public client frontend.

## Tech Stack
- **Core**: React 19 (JSX)
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **State & Context**: React Context API (`AuthContext`, `ImageContext`)
- **HTTP Client**: Axios

## Features
- **Admin Authentication**: Secure login portal for administrative access. Session is managed via JWT stored in `localStorage` and sent automatically on request headers.
- **Upload Image**: Publish new photos with captions directly to the MongoDB database and Cloudinary storage.
- **Edit Caption**: Update captions/descriptions dynamically with a modal editing overlay.
- **Delete Image**: Remove photos from both MongoDB and Cloudinary storage.

## Installation & Local Development

1. Navigate to the `Admin` directory:
   ```bash
   cd Admin
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   *The application typically starts on port `5174` (or next available).*

## Configuration & Environment Variables

For production or target deployment, configure the backend API endpoint URL:
- **`VITE_API_URL`**: URL of the deployed backend server (e.g., `https://your-api.vercel.app/api/v1`). If not set, it defaults to `http://localhost:5000/api/v1` for local development.

## Deployment on Vercel
This repository is configured for single-page app (SPA) rewrites on Vercel. 
Simply link the `Admin` directory as a Vercel project, select **Vite** as the framework preset, configure your `VITE_API_URL` environment variable, and trigger the deploy.
