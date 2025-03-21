import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { BLOOD_COMPATIBILITY } from "@/lib/constants";

const BloodCompatibility = () => {
  return (
    <div className="mb-16 fade-in">
      <h3 className="text-2xl font-bold text-center mb-8 gradient-text">Blood Type Compatibility</h3>
      <Card className="hover-card">
        <CardContent className="p-0 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/30">
                <TableHead className="font-bold">Blood Type</TableHead>
                <TableHead className="font-bold">Donate Blood To</TableHead>
                <TableHead className="font-bold">Receive Blood From</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {BLOOD_COMPATIBILITY.map((type, index) => (
                <TableRow key={index} className="hover:bg-muted">
                  <TableCell className="font-bold text-primary">{type.type}</TableCell>
                  <TableCell>{type.donatesTo.join(", ")}</TableCell>
                  <TableCell>{type.receivesFrom.join(", ")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BloodCompatibility;
