import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { z } from "zod";
import { insertDonationCampSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes and middleware
  setupAuth(app);
  
  // Blood availability search API
  app.get("/api/blood-availability", async (req, res) => {
    try {
      const { bloodGroup, state, city } = req.query;
      
      // Validate query parameters
      if (!bloodGroup) {
        return res.status(400).json({ message: "Blood group is required" });
      }
      
      let result = [];
      
      if (Array.isArray(bloodGroup)) {
        // Handle multiple blood groups
        const bloodGroupsArray = bloodGroup as string[];
        result = [];
        
        for (const group of bloodGroupsArray) {
          const inventory = await storage.getBloodInventoryByGroup(group);
          result.push(...inventory);
        }
      } else {
        // Handle single blood group
        result = await storage.getBloodInventoryByGroup(bloodGroup as string);
      }
      
      // Filter by state if provided
      if (state) {
        const bankIds = (await storage.getBloodBanksByState(state as string)).map(bank => bank.id);
        result = result.filter(item => bankIds.includes(item.bloodBankId));
      }
      
      // Filter by city if provided
      if (city) {
        const bankIds = (await storage.getBloodBanksByCity(city as string)).map(bank => bank.id);
        result = result.filter(item => bankIds.includes(item.bloodBankId));
      }
      
      // Add blood bank information to each inventory item
      const enhancedResult = await Promise.all(
        result.map(async (item) => {
          const bank = await storage.getBloodBank(item.bloodBankId);
          return {
            ...item,
            bloodBank: bank
          };
        })
      );
      
      res.json(enhancedResult);
    } catch (error) {
      console.error("Error fetching blood availability:", error);
      res.status(500).json({ message: "Failed to fetch blood availability" });
    }
  });
  
  // Blood banks API
  app.get("/api/blood-banks", async (req, res) => {
    try {
      const { state, city } = req.query;
      
      let result;
      
      if (state) {
        result = await storage.getBloodBanksByState(state as string);
      } else if (city) {
        result = await storage.getBloodBanksByCity(city as string);
      } else {
        result = await storage.getBloodBanks();
      }
      
      res.json(result);
    } catch (error) {
      console.error("Error fetching blood banks:", error);
      res.status(500).json({ message: "Failed to fetch blood banks" });
    }
  });
  
  // Donation camps API
  app.get("/api/donation-camps", async (req, res) => {
    try {
      const { state, city, status } = req.query;
      
      let result;
      
      if (status === "approved") {
        result = await storage.getApprovedDonationCamps();
      } else {
        result = await storage.getDonationCamps();
      }
      
      // Filter by state if provided
      if (state) {
        result = result.filter(camp => 
          camp.state.toLowerCase() === (state as string).toLowerCase()
        );
      }
      
      // Filter by city if provided
      if (city) {
        result = result.filter(camp => 
          camp.city.toLowerCase() === (city as string).toLowerCase()
        );
      }
      
      res.json(result);
    } catch (error) {
      console.error("Error fetching donation camps:", error);
      res.status(500).json({ message: "Failed to fetch donation camps" });
    }
  });
  
  // Register donation camp
  app.post("/api/donation-camps", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "You must be logged in to register a camp" });
      }
      
      const campData = insertDonationCampSchema.parse(req.body);
      const camp = await storage.createDonationCamp(campData);
      
      res.status(201).json(camp);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid camp data", 
          errors: error.errors 
        });
      }
      
      console.error("Error registering donation camp:", error);
      res.status(500).json({ message: "Failed to register donation camp" });
    }
  });
  
  // User donations API
  app.get("/api/user/donations", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "You must be logged in to view your donations" });
      }
      
      const userId = req.user!.id;
      const donations = await storage.getDonationsByUser(userId);
      
      // Add blood bank information to each donation
      const enhancedDonations = await Promise.all(
        donations.map(async (donation) => {
          const bank = await storage.getBloodBank(donation.bloodBankId);
          let camp = undefined;
          
          if (donation.campId) {
            camp = await storage.getDonationCamp(donation.campId);
          }
          
          return {
            ...donation,
            bloodBank: bank,
            camp: camp
          };
        })
      );
      
      res.json(enhancedDonations);
    } catch (error) {
      console.error("Error fetching user donations:", error);
      res.status(500).json({ message: "Failed to fetch user donations" });
    }
  });
  
  // Statistics API
  app.get("/api/statistics", async (req, res) => {
    try {
      const donorsCount = await storage.getDonorsCount();
      const bloodUnitsCollected = await storage.getBloodUnitsCollectedCount();
      const approvedCamps = await storage.getApprovedCampsCount();
      
      const livesSaved = Math.floor(bloodUnitsCollected * 3); // Estimation: 1 donation can save up to 3 lives
      
      res.json({
        donorsRegistered: donorsCount,
        bloodUnitsCollected,
        approvedCamps,
        livesSaved,
        lastUpdated: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error fetching statistics:", error);
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });
  
  const httpServer = createServer(app);
  
  return httpServer;
}
