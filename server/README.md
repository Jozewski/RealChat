# Real-Chat Server

## Getting Started

### .env
Create a .env file at the top level of the client folder.
- PORT: Used by Express for the server port
- MONGODB_URL: Location of MongoDB server, protocol domain and port. Dev setup is local.
- JWT_SECRET: This is used by the JWT package to encrypt and create tokens. It hould be sufficiently long and complex string.
- - Example: yvy)'lc]ZO(P<J%{-d`w;63QC^+!;4
- COOKIE_SECRET: Same as above, but used by Express sessions for cookies. Express sessions is required by Passport and generates cookies automatically. The frontend will not used them.
- TOKEN_EXPIRATION: This the expiration in time from the moment the token is created. The math is seconds * minutes * hours * days, 60 * 60 * 24 * 30. What I do is just assume I want it to expire in 30 days for example, then do the math and put the result in the .env. That way we don't have to run eval on it.
- WHITELISTED_DOMAINS: A comma separated list of other hosts/computers we want to allow to connect to our computer. In our case it's on the frontend. It must match the protocol, domain and port.

```
PORT=8000
MONGODB_URL=mongodb://localhost:27017/chat
JWT_SECRET=.JNL!@4rZ7<wIY/}#yC3W.@9wh,.)h
COOKIE_SECRET=B7salv;c'rgts@xf>g'"ax%QiX974R
TOKEN_EXPIRATION=2592000
WHITELISTED_DOMAINS=http://localhost:3000
OLLAMA_API=http://localhost:11434/api/generate
```

### NPM install
```
cd server
npm install
npm run dev
```

## Technologies
- Node ... obviously
- Express 4
- Passport 0.7.0 for authentication
- argon2 for hashing (not encrypting) passwords
- JWTs using passport-jwt

## Leasons Learned info from instructor Mr. Dean:
express-session is only for SSR, server side rendering, like handlerbars, but not MERN
express-session is required though, for passport, regardless if you actually
JWT is the most common and least annoying way to handle real-chat in MERN/React
We use local strategy for users in our own database
We use jwt strategy once a user is logged in, to verify them
We use passport.authenticate("jwt", { session: false }) middleware for the routes we want to protect
Example: userRouter.post("/", passport.authenticate("jwt", { session: false }), userCreate)
On the frontend, we include the token in the request header for API calls that require authentication
Example:
const response = await axios.get(
${import.meta.env.VITE_API_SERVER_URL}/auth/status,
{ withCredentials: true, headers: { "Content-Type": "application/json", Authorization: Bearer ${token} }}
)
In React protected or private routes, you can't use async. React will thrown an error and also you could get an infinite loop. To verify login, use a state manager or other library, outside of the private route. The private route just waits on the state.
To have more control over the password and username fields, don't use the passport-local-mongoose plugin.