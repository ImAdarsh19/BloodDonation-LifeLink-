import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import BloodCompatibility from "@/components/home/blood-compatibility";
import BloodComponentTabs from "@/components/blood/blood-component-tabs";

const Education = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Learn About Blood Donation</h1>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="general">General Information</TabsTrigger>
          <TabsTrigger value="components">Blood Components</TabsTrigger>
          <TabsTrigger value="faq">FAQs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Why Donate Blood?</h2>
              <div className="prose max-w-none">
                <p>
                  Blood cannot be manufactured – it can only come from generous donors. Every two seconds someone in our country needs blood. It is essential for surgeries, cancer treatment, chronic illnesses, and traumatic injuries. Whether a patient receives whole blood, red cells, platelets or plasma, this lifesaving care starts with one person making a generous donation.
                </p>
                <p className="bg-gray-50 border-l-4 border-primary-500 p-4 my-4 italic">
                  After donating blood, the body works to replenish the blood loss. This stimulates the production of new blood cells and in turn, helps in maintaining good health.
                </p>
                <h3 className="text-xl font-bold mt-6">Blood Donation Facts</h3>
                <ul>
                  <li>One donation can save up to three lives</li>
                  <li>The average adult has about 10 pints of blood in their body</li>
                  <li>A healthy person can donate red blood cells every 56 days</li>
                  <li>A blood donor card or driver's license are usually sufficient ID to donate</li>
                  <li>Only 38% of the population is eligible to donate blood</li>
                  <li>Less than 10% of those eligible actually donate each year</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Who Can Donate Blood?</h2>
              <div className="prose max-w-none">
                <p>
                  While most people can donate blood, there are some basic requirements donors must meet to ensure the safety of both the donor and the recipient:
                </p>
                <ul>
                  <li>Be in good general health and feeling well</li>
                  <li>Be at least 18 years old</li>
                  <li>Weigh at least 45 kg</li>
                  <li>Have not donated blood in the last 3 months (for males) or 4 months (for females)</li>
                  <li>Have a hemoglobin level of at least 12.5 g/dL</li>
                </ul>
                <h3 className="text-xl font-bold mt-6">Reasons You May Not Be Able to Donate</h3>
                <ul>
                  <li>Low hemoglobin or iron levels</li>
                  <li>Cold, flu, or other illness symptoms</li>
                  <li>Certain medical conditions or medications</li>
                  <li>Recent surgery or pregnancy</li>
                  <li>Travel to certain countries with high risk of infectious diseases</li>
                </ul>
                <p>
                  Always check with the blood donation center if you're unsure about your eligibility to donate.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <BloodCompatibility />
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">The Donation Process</h2>
              <div className="prose max-w-none">
                <p>
                  The blood donation process from the time you arrive until the time you leave takes about an hour. The donation itself is only about 8-10 minutes on average.
                </p>
                <ol>
                  <li><strong>Registration:</strong> You'll be asked to complete a donor registration form that includes your contact information, identification, and a brief medical history.</li>
                  <li><strong>Health History and Mini-Physical:</strong> A trained staff member will ask you some questions about your health history and check your temperature, pulse, blood pressure, and hemoglobin level.</li>
                  <li><strong>Donation:</strong> The actual donation takes about 8-10 minutes. A trained healthcare professional will cleanse an area on your arm and insert a brand new sterile needle for the blood draw.</li>
                  <li><strong>Refreshment and Recovery:</strong> After donating, you'll be given a snack and drink. You'll be asked to relax for about 15 minutes before leaving to ensure you're feeling well.</li>
                </ol>
                <p>
                  After donation, your body replaces the fluid in hours and the red blood cells within a few weeks. Donors can give whole blood every 3-4 months.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="components">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Blood Components</h2>
              <p className="mb-6">
                The donated blood is separated into several components, each serving different medical purposes. Each component can potentially save a different life, making your single donation multiply in impact.
              </p>
              <BloodComponentTabs />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="faq">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Does blood donation hurt?</AccordionTrigger>
                  <AccordionContent>
                    Most people feel a quick pinch when the needle is inserted, but it's over quickly and usually painless. Some people may experience slight discomfort during the donation, but it's generally well-tolerated.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>How much blood is taken during a donation?</AccordionTrigger>
                  <AccordionContent>
                    During a whole blood donation, approximately 450 ml (about one pint) of blood is collected. This is only about 10% of the blood in an adult's body. Your body replaces the fluid in hours and the red blood cells within a few weeks.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I donate if I'm taking medication?</AccordionTrigger>
                  <AccordionContent>
                    Many medications do not prevent you from donating blood. Common medications like blood pressure medicine, birth control pills, and over-the-counter pain relievers usually don't disqualify you. However, some medications may require a waiting period after your last dose. Always inform the donation staff about any medications you're taking.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>What should I eat before donating blood?</AccordionTrigger>
                  <AccordionContent>
                    Have a healthy meal within 3 hours of your donation. Avoid fatty foods like french fries or ice cream. Include iron-rich foods like red meat, fish, poultry, beans, spinach, or raisins in your diet before donating. Stay well-hydrated by drinking plenty of water before and after donation.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>How long does it take to recover after donating blood?</AccordionTrigger>
                  <AccordionContent>
                    Most people feel fine after donating blood. Your body replaces the plasma (liquid) within about 24 hours. Red blood cells are replaced over the course of approximately 4-6 weeks. That's why there's a minimum waiting period between whole blood donations.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger>What happens to my blood after I donate?</AccordionTrigger>
                  <AccordionContent>
                    After donation, your blood is tested for infectious diseases and blood type. It's then processed into components (red cells, plasma, platelets), labeled, and stored appropriately. When hospitals request blood for patients, it is sent from the blood bank to the hospital for transfusion.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-7">
                  <AccordionTrigger>Can I exercise after donating blood?</AccordionTrigger>
                  <AccordionContent>
                    It's recommended to avoid strenuous physical activity or heavy lifting for at least 5 hours after donation. This includes activities like running, weightlifting, or other high-intensity workouts. Light activities like walking are usually fine. Make sure to stay hydrated and listen to your body.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-8">
                  <AccordionTrigger>Will donating blood make me lose weight?</AccordionTrigger>
                  <AccordionContent>
                    No, donating blood is not an effective weight loss strategy. While you might burn around 650 calories as your body works to replace the donated blood, this is a one-time calorie burn and not significant for weight loss purposes. Blood donation should be done for altruistic reasons, not for weight management.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-9">
                  <AccordionTrigger>How long does donated blood last?</AccordionTrigger>
                  <AccordionContent>
                    Different blood components have different shelf lives: Red blood cells can be stored for 42 days, platelets for just 5 days, and plasma can be frozen for up to a year. This is why regular blood donations are so important to maintain adequate supplies.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-10">
                  <AccordionTrigger>Can I donate specific blood components instead of whole blood?</AccordionTrigger>
                  <AccordionContent>
                    Yes, through a process called apheresis, you can donate specific blood components like platelets, plasma, or red cells. These specialized donations often help specific patient populations, and the equipment returns the components you're not donating back to your body. These donations may take longer than whole blood donation but can have a targeted impact.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Education;
