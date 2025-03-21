import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BLOOD_COMPONENTS_INFO } from "@/lib/constants";

const BloodComponentTabs = () => {
  const [activeTab, setActiveTab] = useState("redCells");

  return (
    <div>
      <Tabs defaultValue="redCells" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="redCells">Red Blood Cells</TabsTrigger>
          <TabsTrigger value="plasma">Plasma</TabsTrigger>
          <TabsTrigger value="platelets">Platelets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="redCells" className="p-4 bg-white rounded-lg shadow-sm mt-4">
          <h4 className="text-xl font-bold mb-4">{BLOOD_COMPONENTS_INFO.redCells.name}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <h5 className="font-bold mb-2">What is it?</h5>
                <p className="text-gray-600">{BLOOD_COMPONENTS_INFO.redCells.whatIsIt}</p>
              </div>
              <div className="mb-4">
                <h5 className="font-bold mb-2">Who can donate?</h5>
                <p className="text-gray-600">{BLOOD_COMPONENTS_INFO.redCells.whoCanDonate}</p>
              </div>
              <div className="mb-4">
                <h5 className="font-bold mb-2">Used For?</h5>
                <p className="text-gray-600">{BLOOD_COMPONENTS_INFO.redCells.usedFor}</p>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <h5 className="font-bold mb-2">Lasts For?</h5>
                <p className="text-gray-600">{BLOOD_COMPONENTS_INFO.redCells.lastsFor}</p>
              </div>
              <div className="mb-4">
                <h5 className="font-bold mb-2">How long does it take to donate?</h5>
                <p className="text-gray-600">{BLOOD_COMPONENTS_INFO.redCells.howLongDoesItTake}</p>
              </div>
              <div className="mb-4">
                <h5 className="font-bold mb-2">How often can I donate?</h5>
                <p className="text-gray-600">{BLOOD_COMPONENTS_INFO.redCells.howOften}</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="plasma" className="p-4 bg-white rounded-lg shadow-sm mt-4">
          <h4 className="text-xl font-bold mb-4">{BLOOD_COMPONENTS_INFO.plasma.name}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <h5 className="font-bold mb-2">What is it?</h5>
                <p className="text-gray-600">{BLOOD_COMPONENTS_INFO.plasma.whatIsIt}</p>
              </div>
              <div className="mb-4">
                <h5 className="font-bold mb-2">Who can donate?</h5>
                <p className="text-gray-600">{BLOOD_COMPONENTS_INFO.plasma.whoCanDonate}</p>
              </div>
              <div className="mb-4">
                <h5 className="font-bold mb-2">Used For?</h5>
                <p className="text-gray-600">{BLOOD_COMPONENTS_INFO.plasma.usedFor}</p>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <h5 className="font-bold mb-2">Lasts For?</h5>
                <p className="text-gray-600">{BLOOD_COMPONENTS_INFO.plasma.lastsFor}</p>
              </div>
              <div className="mb-4">
                <h5 className="font-bold mb-2">How long does it take?</h5>
                <p className="text-gray-600">{BLOOD_COMPONENTS_INFO.plasma.howLongDoesItTake}</p>
              </div>
              <div className="mb-4">
                <h5 className="font-bold mb-2">How often can I donate?</h5>
                <p className="text-gray-600">{BLOOD_COMPONENTS_INFO.plasma.howOften}</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="platelets" className="p-4 bg-white rounded-lg shadow-sm mt-4">
          <h4 className="text-xl font-bold mb-4">{BLOOD_COMPONENTS_INFO.platelets.name}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <h5 className="font-bold mb-2">What is it?</h5>
                <p className="text-gray-600">{BLOOD_COMPONENTS_INFO.platelets.whatIsIt}</p>
              </div>
              <div className="mb-4">
                <h5 className="font-bold mb-2">Who can donate?</h5>
                <p className="text-gray-600">{BLOOD_COMPONENTS_INFO.platelets.whoCanDonate}</p>
              </div>
              <div className="mb-4">
                <h5 className="font-bold mb-2">Used For?</h5>
                <p className="text-gray-600">{BLOOD_COMPONENTS_INFO.platelets.usedFor}</p>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <h5 className="font-bold mb-2">Lasts For?</h5>
                <p className="text-gray-600">{BLOOD_COMPONENTS_INFO.platelets.lastsFor}</p>
              </div>
              <div className="mb-4">
                <h5 className="font-bold mb-2">How long does it take?</h5>
                <p className="text-gray-600">{BLOOD_COMPONENTS_INFO.platelets.howLongDoesItTake}</p>
              </div>
              <div className="mb-4">
                <h5 className="font-bold mb-2">How often can I donate?</h5>
                <p className="text-gray-600">{BLOOD_COMPONENTS_INFO.platelets.howOften}</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BloodComponentTabs;
