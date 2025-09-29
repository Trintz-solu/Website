import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      version: "1.0.0"
    });
  });

  // API routes
  app.get("/api/users", async (req, res) => {
    try {
      // This would normally fetch from database
      res.json({ users: [] });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  // Projects endpoint to align with client constants
  app.get("/api/projects", async (_req, res) => {
    try {
      const projects: any[] = [];
      res.json({ projects });
    } catch (_error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message, subject } = req.body;

      // Basic validation
      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          message: "Name, email, and message are required"
        });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address"
        });
      }

      // Log the contact form submission
      console.log("📧 Contact form submission:", { name, email, subject, message });

      res.json({
        success: true,
        message: "Message received successfully!"
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to process contact form"
      });
    }
  });



  // Team data endpoint
  app.get("/api/team", async (req, res) => {
    try {
      // Fetch team data from backend API (if you have a team endpoint)
      // For now, return empty array since team data might not be in the backend yet
      const team: any[] = [];
      
      // If you want to add team data to your backend, you can uncomment this:
      /*
      const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001'}/projectflow/team`);
      if (!response.ok) {
        throw new Error(`Backend API error: ${response.status}`);
      }
      const result = await response.json();
      const team = result.data || [];
      */

      res.json({ team });
    } catch (error) {
      console.error('Error fetching team data from backend:', error);
      res.status(500).json({ error: "Failed to fetch team data from backend" });
    }
  });

  // Services data endpoint
  app.get("/api/services", async (req, res) => {
    try {
      const services = [
        {
          id: 1,
          title: "AI Integration",
          description: "Seamless AI integration into existing business processes",
          icon: "brain",
          features: ["Custom AI Models", "API Development", "Data Processing"]
        },
        {
          id: 2,
          title: "Custom Development",
          description: "Tailored software solutions for your unique business needs",
          icon: "code",
          features: ["Web Applications", "Mobile Apps", "Enterprise Software"]
        },
        {
          id: 3,
          title: "Data Analytics",
          description: "Transform raw data into actionable business insights",
          icon: "chart",
          features: ["Data Visualization", "Predictive Analytics", "Business Intelligence"]
        }
      ];

      res.json({ services });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
