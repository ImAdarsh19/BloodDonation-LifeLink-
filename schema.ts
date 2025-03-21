import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema for donors and administrators
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  bloodGroup: text("blood_group"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  isAdmin: boolean("is_admin").default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
  phone: true,
  bloodGroup: true,
  address: true,
  city: true,
  state: true,
});

export const loginUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Blood banks schema
export const bloodBanks = pgTable("blood_banks", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  latitude: text("latitude"),
  longitude: text("longitude"),
});

export const insertBloodBankSchema = createInsertSchema(bloodBanks).pick({
  name: true,
  address: true,
  city: true,
  state: true,
  phone: true,
  email: true,
  latitude: true,
  longitude: true,
});

// Blood inventory schema
export const bloodInventory = pgTable("blood_inventory", {
  id: serial("id").primaryKey(),
  bloodBankId: integer("blood_bank_id").notNull(),
  bloodGroup: text("blood_group").notNull(),
  component: text("component").notNull(), // Whole Blood, Packed Red Cells, Plasma, Platelets
  quantity: integer("quantity").notNull().default(0),
  lastUpdated: timestamp("last_updated").notNull(),
});

export const insertBloodInventorySchema = createInsertSchema(bloodInventory).pick({
  bloodBankId: true,
  bloodGroup: true,
  component: true,
  quantity: true,
  lastUpdated: true,
});

// Donation camps schema
export const donationCamps = pgTable("donation_camps", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  organizer: text("organizer").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  date: text("date").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  contactPerson: text("contact_person").notNull(),
  contactPhone: text("contact_phone").notNull(),
  contactEmail: text("contact_email"),
  status: text("status").default("pending"), // pending, approved, completed, cancelled
});

export const insertDonationCampSchema = createInsertSchema(donationCamps).pick({
  name: true,
  organizer: true,
  address: true,
  city: true,
  state: true,
  date: true,
  startTime: true,
  endTime: true,
  contactPerson: true,
  contactPhone: true,
  contactEmail: true,
});

// Donations schema
export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  bloodBankId: integer("blood_bank_id").notNull(),
  campId: integer("camp_id"),
  donationDate: timestamp("donation_date").notNull(),
  bloodGroup: text("blood_group").notNull(),
  component: text("component").notNull(),
  quantity: text("quantity").notNull(),
});

export const insertDonationSchema = createInsertSchema(donations).pick({
  userId: true,
  bloodBankId: true,
  campId: true,
  donationDate: true,
  bloodGroup: true,
  component: true,
  quantity: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;

export type BloodBank = typeof bloodBanks.$inferSelect;
export type InsertBloodBank = z.infer<typeof insertBloodBankSchema>;

export type BloodInventory = typeof bloodInventory.$inferSelect;
export type InsertBloodInventory = z.infer<typeof insertBloodInventorySchema>;

export type DonationCamp = typeof donationCamps.$inferSelect;
export type InsertDonationCamp = z.infer<typeof insertDonationCampSchema>;

export type Donation = typeof donations.$inferSelect;
export type InsertDonation = z.infer<typeof insertDonationSchema>;
