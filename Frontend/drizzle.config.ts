import { defineConfig } from "drizzle-kit";

// Check for DATABASE_URL with better error handling
if (!process.env.DATABASE_URL) {
  console.warn("⚠️ DATABASE_URL not found in environment variables");
  console.warn("Database migrations will be disabled");
  console.warn("To enable database features, set DATABASE_URL in your environment");
  
  // Provide a fallback configuration for development
  export default defineConfig({
    out: "./migrations",
    schema: "./shared/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
      url: "postgresql://localhost:5432/trintz_dev", // Fallback URL
    },
    verbose: true,
    strict: false,
  });
} else {
  export default defineConfig({
    out: "./migrations",
    schema: "./shared/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
      url: process.env.DATABASE_URL,
    },
    verbose: true,
    strict: true,
  });
}
