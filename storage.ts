import { 
  User, InsertUser, 
  BloodBank, InsertBloodBank, 
  BloodInventory, InsertBloodInventory,
  DonationCamp, InsertDonationCamp,
  Donation, InsertDonation
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// Define the storage interface with CRUD operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  
  // Blood bank operations
  getBloodBank(id: number): Promise<BloodBank | undefined>;
  getBloodBanks(): Promise<BloodBank[]>;
  getBloodBanksByState(state: string): Promise<BloodBank[]>;
  getBloodBanksByCity(city: string): Promise<BloodBank[]>;
  createBloodBank(bloodBank: InsertBloodBank): Promise<BloodBank>;
  
  // Blood inventory operations
  getBloodInventory(id: number): Promise<BloodInventory | undefined>;
  getBloodInventoryByBank(bloodBankId: number): Promise<BloodInventory[]>;
  getBloodInventoryByGroupAndBank(bloodGroup: string, bloodBankId: number): Promise<BloodInventory[]>;
  getBloodInventoryByGroup(bloodGroup: string): Promise<BloodInventory[]>;
  createBloodInventory(inventory: InsertBloodInventory): Promise<BloodInventory>;
  updateBloodInventory(id: number, inventory: Partial<InsertBloodInventory>): Promise<BloodInventory | undefined>;
  
  // Donation camp operations
  getDonationCamp(id: number): Promise<DonationCamp | undefined>;
  getDonationCamps(): Promise<DonationCamp[]>;
  getApprovedDonationCamps(): Promise<DonationCamp[]>;
  getDonationCampsByState(state: string): Promise<DonationCamp[]>;
  getDonationCampsByCity(city: string): Promise<DonationCamp[]>;
  createDonationCamp(camp: InsertDonationCamp): Promise<DonationCamp>;
  updateDonationCamp(id: number, camp: Partial<InsertDonationCamp>): Promise<DonationCamp | undefined>;
  
  // Donation operations
  getDonation(id: number): Promise<Donation | undefined>;
  getDonationsByUser(userId: number): Promise<Donation[]>;
  getDonationsByBloodBank(bloodBankId: number): Promise<Donation[]>;
  getDonationsByCamp(campId: number): Promise<Donation[]>;
  createDonation(donation: InsertDonation): Promise<Donation>;
  
  // Statistics
  getDonorsCount(): Promise<number>;
  getBloodUnitsCollectedCount(): Promise<number>;
  getApprovedCampsCount(): Promise<number>;
  
  // Session store
  sessionStore: session.SessionStore;
}

// Memory storage implementation for development
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private bloodBanks: Map<number, BloodBank>;
  private bloodInventory: Map<number, BloodInventory>;
  private donationCamps: Map<number, DonationCamp>;
  private donations: Map<number, Donation>;
  
  sessionStore: session.SessionStore;
  
  private userId: number;
  private bloodBankId: number;
  private bloodInventoryId: number;
  private donationCampId: number;
  private donationId: number;
  
  constructor() {
    this.users = new Map();
    this.bloodBanks = new Map();
    this.bloodInventory = new Map();
    this.donationCamps = new Map();
    this.donations = new Map();
    
    this.userId = 1;
    this.bloodBankId = 1;
    this.bloodInventoryId = 1;
    this.donationCampId = 1;
    this.donationId = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // Prune expired entries every 24h
    });
    
    // Seed initial data
    this.seedSampleData();
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id, isAdmin: false };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  // Blood bank operations
  async getBloodBank(id: number): Promise<BloodBank | undefined> {
    return this.bloodBanks.get(id);
  }
  
  async getBloodBanks(): Promise<BloodBank[]> {
    return Array.from(this.bloodBanks.values());
  }
  
  async getBloodBanksByState(state: string): Promise<BloodBank[]> {
    return Array.from(this.bloodBanks.values()).filter(
      (bank) => bank.state.toLowerCase() === state.toLowerCase()
    );
  }
  
  async getBloodBanksByCity(city: string): Promise<BloodBank[]> {
    return Array.from(this.bloodBanks.values()).filter(
      (bank) => bank.city.toLowerCase() === city.toLowerCase()
    );
  }
  
  async createBloodBank(bloodBank: InsertBloodBank): Promise<BloodBank> {
    const id = this.bloodBankId++;
    const newBloodBank: BloodBank = { ...bloodBank, id };
    this.bloodBanks.set(id, newBloodBank);
    return newBloodBank;
  }
  
  // Blood inventory operations
  async getBloodInventory(id: number): Promise<BloodInventory | undefined> {
    return this.bloodInventory.get(id);
  }
  
  async getBloodInventoryByBank(bloodBankId: number): Promise<BloodInventory[]> {
    return Array.from(this.bloodInventory.values()).filter(
      (inventory) => inventory.bloodBankId === bloodBankId
    );
  }
  
  async getBloodInventoryByGroupAndBank(bloodGroup: string, bloodBankId: number): Promise<BloodInventory[]> {
    return Array.from(this.bloodInventory.values()).filter(
      (inventory) => 
        inventory.bloodGroup === bloodGroup && 
        inventory.bloodBankId === bloodBankId
    );
  }
  
  async getBloodInventoryByGroup(bloodGroup: string): Promise<BloodInventory[]> {
    return Array.from(this.bloodInventory.values()).filter(
      (inventory) => inventory.bloodGroup === bloodGroup
    );
  }
  
  async createBloodInventory(inventory: InsertBloodInventory): Promise<BloodInventory> {
    const id = this.bloodInventoryId++;
    const newInventory: BloodInventory = { ...inventory, id };
    this.bloodInventory.set(id, newInventory);
    return newInventory;
  }
  
  async updateBloodInventory(id: number, inventoryData: Partial<InsertBloodInventory>): Promise<BloodInventory | undefined> {
    const inventory = this.bloodInventory.get(id);
    if (!inventory) return undefined;
    
    const updatedInventory = { ...inventory, ...inventoryData };
    this.bloodInventory.set(id, updatedInventory);
    return updatedInventory;
  }
  
  // Donation camp operations
  async getDonationCamp(id: number): Promise<DonationCamp | undefined> {
    return this.donationCamps.get(id);
  }
  
  async getDonationCamps(): Promise<DonationCamp[]> {
    return Array.from(this.donationCamps.values());
  }
  
  async getApprovedDonationCamps(): Promise<DonationCamp[]> {
    return Array.from(this.donationCamps.values()).filter(
      (camp) => camp.status === "approved"
    );
  }
  
  async getDonationCampsByState(state: string): Promise<DonationCamp[]> {
    return Array.from(this.donationCamps.values()).filter(
      (camp) => camp.state.toLowerCase() === state.toLowerCase()
    );
  }
  
  async getDonationCampsByCity(city: string): Promise<DonationCamp[]> {
    return Array.from(this.donationCamps.values()).filter(
      (camp) => camp.city.toLowerCase() === city.toLowerCase()
    );
  }
  
  async createDonationCamp(camp: InsertDonationCamp): Promise<DonationCamp> {
    const id = this.donationCampId++;
    const newCamp: DonationCamp = { ...camp, id, status: "pending" };
    this.donationCamps.set(id, newCamp);
    return newCamp;
  }
  
  async updateDonationCamp(id: number, campData: Partial<InsertDonationCamp>): Promise<DonationCamp | undefined> {
    const camp = this.donationCamps.get(id);
    if (!camp) return undefined;
    
    const updatedCamp = { ...camp, ...campData };
    this.donationCamps.set(id, updatedCamp);
    return updatedCamp;
  }
  
  // Donation operations
  async getDonation(id: number): Promise<Donation | undefined> {
    return this.donations.get(id);
  }
  
  async getDonationsByUser(userId: number): Promise<Donation[]> {
    return Array.from(this.donations.values()).filter(
      (donation) => donation.userId === userId
    );
  }
  
  async getDonationsByBloodBank(bloodBankId: number): Promise<Donation[]> {
    return Array.from(this.donations.values()).filter(
      (donation) => donation.bloodBankId === bloodBankId
    );
  }
  
  async getDonationsByCamp(campId: number): Promise<Donation[]> {
    return Array.from(this.donations.values()).filter(
      (donation) => donation.campId === campId
    );
  }
  
  async createDonation(donation: InsertDonation): Promise<Donation> {
    const id = this.donationId++;
    const newDonation: Donation = { ...donation, id };
    this.donations.set(id, newDonation);
    return newDonation;
  }
  
  // Statistics
  async getDonorsCount(): Promise<number> {
    return this.users.size;
  }
  
  async getBloodUnitsCollectedCount(): Promise<number> {
    return this.donations.size;
  }
  
  async getApprovedCampsCount(): Promise<number> {
    return Array.from(this.donationCamps.values()).filter(
      (camp) => camp.status === "approved"
    ).length;
  }
  
  // Seed sample data for demonstration
  private seedSampleData() {
    // Sample blood banks
    const bloodBankData: InsertBloodBank[] = [
      {
        name: "City General Hospital Blood Bank",
        address: "123 Main Street",
        city: "New Delhi",
        state: "Delhi",
        phone: "011-12345678",
        email: "blood@citygeneral.org",
        latitude: "28.6139",
        longitude: "77.2090"
      },
      {
        name: "Regional Medical Center",
        address: "456 Hospital Road",
        city: "Mumbai",
        state: "Maharashtra",
        phone: "022-87654321",
        email: "blood@rmc.org",
        latitude: "19.0760",
        longitude: "72.8777"
      },
      {
        name: "Community Blood Services",
        address: "789 Health Avenue",
        city: "Bangalore",
        state: "Karnataka",
        phone: "080-23456789",
        email: "donate@communityblood.org",
        latitude: "12.9716",
        longitude: "77.5946"
      }
    ];
    
    bloodBankData.forEach(bank => {
      this.createBloodBank(bank);
    });
    
    // Sample blood inventory
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const components = ["Whole Blood", "Packed Red Cells", "Plasma", "Platelets"];
    
    for (let bankId = 1; bankId <= 3; bankId++) {
      for (const group of bloodGroups) {
        for (const component of components) {
          this.createBloodInventory({
            bloodBankId: bankId,
            bloodGroup: group,
            component: component,
            quantity: Math.floor(Math.random() * 20) + 5,
            lastUpdated: new Date()
          });
        }
      }
    }
    
    // Sample donation camps
    const campData: InsertDonationCamp[] = [
      {
        name: "Community Donation Drive",
        organizer: "City General Hospital",
        address: "City Park",
        city: "New Delhi",
        state: "Delhi",
        date: "2025-04-10",
        startTime: "09:00",
        endTime: "17:00",
        contactPerson: "Dr. Sharma",
        contactPhone: "9876543210",
        contactEmail: "drsharma@citygeneral.org"
      },
      {
        name: "College Blood Donation Camp",
        organizer: "Regional Medical Center",
        address: "XYZ College Campus",
        city: "Mumbai",
        state: "Maharashtra",
        date: "2025-04-15",
        startTime: "10:00",
        endTime: "16:00",
        contactPerson: "Prof. Patel",
        contactPhone: "9876543211",
        contactEmail: "profpatel@college.edu"
      },
      {
        name: "Corporate Blood Drive",
        organizer: "Community Blood Services",
        address: "Tech Park",
        city: "Bangalore",
        state: "Karnataka",
        date: "2025-04-20",
        startTime: "09:30",
        endTime: "18:00",
        contactPerson: "Ms. Reddy",
        contactPhone: "9876543212",
        contactEmail: "reddy@techcorp.com"
      }
    ];
    
    campData.forEach(camp => {
      const newCamp = this.createDonationCamp(camp);
      // Mark all as approved for demo
      this.updateDonationCamp(newCamp.id, { status: "approved" } as any);
    });
  }
}

export const storage = new MemStorage();
