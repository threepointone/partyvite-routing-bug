import { Connection, Server, routePartykitRequest } from "partyserver";
import { Hono } from "hono";
import { partyserverMiddleware } from "hono-party";

type Env = {
  ASSETS: Fetcher;
};

export class MyServer extends Server<Env> {
  onMessage(connection: Connection<unknown>, message: string) {
    console.log("message from client:", message);
  }
}

const app = new Hono<{ Bindings: Env }>();

// WebSocket handling for real-time updates
app.use(
  "*",
  partyserverMiddleware({
    onError: (error) => {
      console.error("Error", error);
    },
    options: {
      onBeforeConnect: (connection) => {},
    },
  })
);

app.get("*", async (c) => {
  return await c.env.ASSETS.fetch(c.req.raw);
});

// export default app;

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    return (
      (await routePartykitRequest(request, env)) ||
      (await env.ASSETS.fetch(request))
    );
  },
} satisfies ExportedHandler<Env>;
