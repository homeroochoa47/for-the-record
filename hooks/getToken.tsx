export async function getToken(userId: string) {
  // Construct the Clerk API URL
  const clerkApiUrl = `https://api.clerk.com/v1/users/${userId}/oauth_access_tokens/spotify`;

  try {
    // Fetch the OAuth access token from the Clerk API
    const response = await fetch(clerkApiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const { token: spotifyAccessToken } = data[0];

      return spotifyAccessToken;
    } else {
      // Handle API response error
      console.error("Failed to fetch OAuth access token from Clerk API");
      throw new Error("Failed to fetch OAuth access token");
    }
  } catch (error) {
    // Handle any network or unexpected errors
    console.error("An error occurred while fetching the access token:", error);
    throw error;
  }
}
