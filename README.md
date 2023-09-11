<p align="center">
  <img src="public/for-the-record.svg" align="center" width="400"/>
</p>
<p align="center">
  <strong>A Spotify Commenting Social App buil with <a href="https://nextjs.org">Next.js</a></strong><br />
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-automatic-set-up">Set Up</a> •
  <a href="#-spin-up">Spin Up</a> •
    <a href="#-deployment">Deployment</a> •
  <a href="#-extrastips">Extras</a>
</p>
<br />



# Features
- Full-stack Next.js with API routes made using Typescript
- Components made with with [Tailwind CSS](https://tailwindcss.com) and [Shadcn/UI](https://ui.shadcn.com/)
- Server state management with [TanStack Query](https://tanstack.com/)
- [Clerk](https://clerk.com/) Authentication flow using Spotify Oauth2 integration
- [DrizzleORM](https://orm.drizzle.team/) paired with [PlanetScale](https://planetscale.com/) for the MySQL database.
- Spotify API integration for gathering user information and song data
- Youtube API for populating songs with comments from users

<br />

# Set Up

- Clone this repository from your GitHub account.
- Open up the .env.example file in your IDE

### 1) Clerk

1. **Set up a Clerk account and project**
   - Create an account with [Clerk](https://clerk.com/)
   - From the dashbpord, create a new project
   - Once the project is created, enable Spotify under 'Social Connections'. Click the settings icon once enabled and save the Redirect URI for later.
   - Add the following spotify scopes to the project:
    1. user-read-playback-state
    2. user-read-currently-playing
    3. user-read-recently-played
    4. user-read-email
    5. user-read-private
2. **Add Clerk keys to your .env file**
   - From your project dashboard, head to the API keys tab and paste the two keys into your .env file.

### 2) Spotify API

1. **Create a Spotify project**
   - In the [Spotify Developer Site](https://developer.spotify.com/), create a new app
   - Using the redirect URI from Clerk from earlier, set the project redirect URI in the Spotify project.
   - Get the clientID and Client secret keys from the Spotify project and add them to the Clerk dashboard under the Spotify settings.

### 3) Youtube API
1. **Create a Google Developer API key**
   - Head to the [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project
   - In the project dashboard, create a new API key (Enable API keys and services) for the Youtube Data API v3
   - Add the API key to the .env file

### 4) Database

1. **Connect a database**
  - Select a MySQL database of your choice and connect it to the project. 
  - Add the database credentials to your project in the .env file. 
  - Run migrations locally using 
  ```
  Npm run generate
  ```
  - Then push migrations to your database using
  ```
  Npm run migrations:push
  ```

# Spin Up

### Next (Front End)

`npm run dev` in the project folder to start the front end locally

- Your front end should be running on [http://localhost:3000](http://localhost:3000)

<br />

# Deployment

### Vercel

This is setup to work seamlessly with Vercel, which I highly recommend as your hosting provider for this. It's free and super easy to set up. Simply follow the on-screen instructions to setup your new project, and be sure to **add the same `.env.local` variables to your Vercel Project**


<br />
<br />