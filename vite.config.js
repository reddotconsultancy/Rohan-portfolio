import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import contactHandler from "./api/contact.js";

function localContactApi() {
  return {
    name: "local-contact-api",
    configureServer(server) {
      server.middlewares.use("/api/contact", (req, res, next) => {
        if (req.method !== "POST") {
          next();
          return;
        }

        let body = "";

        req.on("data", (chunk) => {
          body += chunk;
        });

        req.on("end", async () => {
          const localResponse = {
            setHeader(key, value) {
              res.setHeader(key, value);
            },
            status(code) {
              res.statusCode = code;
              return this;
            },
            json(payload) {
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(payload));
            },
          };

          try {
            await contactHandler(
              {
                method: req.method,
                headers: req.headers,
                body,
              },
              localResponse,
            );
          } catch (error) {
            server.config.logger.error(error);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                ok: false,
                message: "Local contact API failed.",
              }),
            );
          }
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  return {
    plugins: [localContactApi(), react(), tailwindcss()],
  };
});
