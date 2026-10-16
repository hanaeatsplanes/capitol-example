# Comments API

This is a small in-memory API built with TypeScript, Bun, and Elysia. Data is cleared when the server restarts.

## Run the API

```bash
bun run dev
```

The API runs at `http://localhost:3000`.

## Routes

Create a user:

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Ada"}'
```

List users:

```bash
curl http://localhost:3000/users
```

Create a comment for a user:

```bash
curl -X POST http://localhost:3000/comments \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello from Ada","userId":1}'
```

List comments:

```bash
curl http://localhost:3000/comments
```

Delete a comment:

```bash
curl -X DELETE http://localhost:3000/comments/1
```