import { Elysia, t } from "elysia";

type User = {
  id: number;
  name: string;
};

type Comment = {
  id: number;
  text: string;
  userId: number;
};

const users: User[] = [];
const comments: Comment[] = [];

let nextUserId = 1;
let nextCommentId = 1;

const app = new Elysia();

app.get("/", () => ({
  message: "Comments API",
  routes: [
    "GET /users",
    "POST /users",
    "GET /comments",
    "POST /comments",
    "DELETE /comments/:id",
  ],
}));

app.get("/users", () => users);

app.post(
  "/users",
  ({ body, set }) => {
    const user = {
      id: nextUserId++,
      name: body.name,
    };

    users.push(user);
    set.status = 201;
    return user;
  },
  {
    body: t.Object({
      name: t.String({ minLength: 1 }),
    }),
  }
);

app.get("/comments", () =>
  comments.map((comment) => ({
    ...comment,
    user: users.find((user) => user.id === comment.userId),
  }))
);

app.post(
  "/comments",
  ({ body, set }) => {
    const user = users.find((item) => item.id === body.userId);

    if (!user) {
      set.status = 404;
      return { error: "User not found" };
    }

    const comment = {
      id: nextCommentId++,
      text: body.text,
      userId: body.userId,
    };

    comments.push(comment);
    set.status = 201;
    return comment;
  },
  {
    body: t.Object({
      text: t.String({ minLength: 1 }),
      userId: t.Number(),
    }),
  }
);

app.delete("/comments/:id", ({ params, set }) => {
  const commentId = Number(params.id);
  const commentIndex = comments.findIndex(
    (comment) => comment.id === commentId
  );

  if (commentIndex === -1) {
    set.status = 404;
    return { error: "Comment not found" };
  }

  comments.splice(commentIndex, 1);
  return { message: "Comment deleted" };
});

app.listen(3000);

console.log(
  `Comments API is running at ${app.server?.hostname}:${app.server?.port}`
);
