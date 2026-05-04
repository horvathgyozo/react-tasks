import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { products } from './data'
import type { CreateProductBody, UpdateProductBody } from './types'

const PORT = Number(process.env.PORT ?? 3001)
const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-change-me'

const app = Fastify({ logger: true })

await app.register(cors, { origin: true })
await app.register(jwt, { secret: JWT_SECRET })

type User = { email: string; password: string }
const users: User[] = [{ email: 'demo@demo.hu', password: 'demo' }]

const authenticate = async (req: any, reply: any) => {
  try {
    await req.jwtVerify()
  } catch {
    return reply.code(401).send({ message: 'Unauthorized' })
  }
}

// ─── Health ──────────────────────────────────────────────────────────────────

app.get('/health', async () => ({ ok: true }))

// ─── Auth ────────────────────────────────────────────────────────────────────

app.post<{ Body: { email: string; password: string } }>(
  '/auth/login',
  {
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 1 },
        },
      },
    },
  },
  async (req, reply) => {
    const { email, password } = req.body
    const user = users.find((u) => u.email === email)
    if (!user || user.password !== password) {
      return reply.code(401).send({ message: 'Bad credentials' })
    }
    const token = app.jwt.sign({ sub: email })
    return { token, user: { email } }
  },
)

app.post<{ Body: { email: string; password: string } }>(
  '/auth/register',
  {
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 1 },
        },
      },
    },
  },
  async (req, reply) => {
    const { email, password } = req.body
    const exists = users.some((u) => u.email === email)
    if (exists) return reply.code(409).send({ message: 'Email already exists' })
    users.push({ email, password })
    const token = app.jwt.sign({ sub: email })
    return reply.code(201).send({ token, user: { email } })
  },
)

app.get('/me', { preHandler: authenticate }, async (req: any) => {
  return { user: { email: req.user?.sub } }
})

// ─── Products ────────────────────────────────────────────────────────────────

app.get('/products', async () => ({ items: products }))

app.get<{ Params: { id: string } }>('/products/:id', async (req, reply) => {
  const product = products.find((p) => p.id === req.params.id)
  if (!product) return reply.code(404).send({ message: 'Not found' })
  return product
})

app.post<{ Body: CreateProductBody }>(
  '/products',
  {
    preHandler: authenticate,
    schema: {
      body: {
        type: 'object',
        required: ['name', 'priceHuf', 'imageUrl', 'description'],
        properties: {
          id: { type: 'string' },
          name: { type: 'string', minLength: 1 },
          priceHuf: { type: 'number', minimum: 1 },
          imageUrl: { type: 'string', minLength: 1 },
          description: { type: 'string', minLength: 1 },
          origin: { type: 'string' },
          preparation: { type: 'string' },
        },
      },
    },
  },
  async (req, reply) => {
    const id = req.body.id ?? `p${Date.now()}`
    const product = {
      id,
      name: req.body.name,
      priceHuf: req.body.priceHuf,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      origin: req.body.origin,
      preparation: req.body.preparation,
    }
    products.unshift(product)
    return reply.code(201).send(product)
  },
)

app.put<{ Params: { id: string }; Body: UpdateProductBody }>(
  '/products/:id',
  {
    preHandler: authenticate,
    schema: {
      body: {
        type: 'object',
        properties: {
          name: { type: 'string', minLength: 1 },
          priceHuf: { type: 'number', minimum: 1 },
          imageUrl: { type: 'string', minLength: 1 },
          description: { type: 'string', minLength: 1 },
          origin: { type: 'string' },
          preparation: { type: 'string' },
        },
        additionalProperties: false,
      },
    },
  },
  async (req, reply) => {
    const idx = products.findIndex((p) => p.id === req.params.id)
    if (idx < 0) return reply.code(404).send({ message: 'Not found' })
    products[idx] = { ...products[idx], ...req.body, id: products[idx].id }
    return products[idx]
  },
)

app.delete<{ Params: { id: string } }>(
  '/products/:id',
  { preHandler: authenticate },
  async (req, reply) => {
    const idx = products.findIndex((p) => p.id === req.params.id)
    if (idx < 0) return reply.code(404).send({ message: 'Not found' })
    const [removed] = products.splice(idx, 1)
    return { ok: true, removed }
  },
)

await app.listen({ port: PORT, host: '0.0.0.0' })

