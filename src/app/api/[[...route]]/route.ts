import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { secureHeaders } from 'hono/secure-headers'
import { initAuthConfig } from '@hono/auth-js';
import { cors } from "hono/cors";
import { logger } from 'hono/logger'
import Google from '@auth/core/providers/google';
import isAuthenticated from '@/helpers/middleware/isAuthenticated';
import userAuthentication from '@/helpers/middleware/userMiddleware';
import { admin, branch, course, dashboard, feedback, formulaSheet, playlist, pyq, repeatedQna, resources, subject, user, users } from "./index"
const app = new Hono().basePath('/api')

app.use('/api/*', logger())
app.use(secureHeaders())

// adminstration related routes
app.use("/admin/protected/*", isAuthenticated);
app.use("/course/*", isAuthenticated);
app.use("/branch/*", isAuthenticated);
app.use("/subject/*", isAuthenticated);
app.use("/resource/*", isAuthenticated)
app.use("/pyq/*", isAuthenticated)
app.use("/users/*", isAuthenticated)
app.use("/repated/*", isAuthenticated)
app.use("/playlist/admin/*", isAuthenticated)
app.use("/formula/admin/*", isAuthenticated)


// user related routes
app.use("/user/*", userAuthentication)
app.use("/feedback/*", userAuthentication)
app.use("/formula/*", userAuthentication)

// app.use("/playlist/*", userAuthentication)







app.use(
    cors({
        origin: ["https://kprep.in", "http://localhost:3000"],
        credentials: true,
    })
);
app.use("/user/*", initAuthConfig((c) => ({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
})))

const _routePath = app.route("/admin", admin).route("/course", course).route("/branch", branch).route("/subject", subject)
    .route("/resource", resources).route("/user", user).route("/pyq", pyq).route("/users", users).route("/repated", repeatedQna).route("/dashboard", dashboard).route("/feedback", feedback).route("/playlist", playlist).route("/formula", formulaSheet)

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);


app.get('/notfound', (c) => {
    return c.notFound()
})


export type AppType = typeof _routePath;