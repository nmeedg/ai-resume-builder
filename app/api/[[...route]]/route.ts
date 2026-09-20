import authController from '@/server/modules/auth'
import profileController from '@/server/modules/profile'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'

const app = new Hono().basePath('/api')
app.route('/auth', authController)
app.route("/profile", profileController)

export type AppType = typeof app
export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
