import { format } from 'date-fns';
import { FileText } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Eye, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const historyData = [
  {
    id: '1',
    date: new Date('2024-03-10'),
    fileName: 'marketing-list-march.csv',
    totalEmails: 1234,
    valid: 1000,
    invalid: 200,
    risky: 34,
    status: 'completed',
  },
  {
    id: '2',
    date: new Date('2024-03-09'),
    fileName: 'newsletter-subscribers.csv',
    totalEmails: 5678,
    valid: 4500,
    invalid: 1000,
    risky: 178,
    status: 'completed',
  },
  {
    id: '3',
    date: new Date('2024-03-08'),
    fileName: 'customer-database.xlsx',
    totalEmails: 3456,
    valid: 3000,
    invalid: 400,
    risky: 56,
    status: 'completed',
  },
];

export function ValidationHistory() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search files..."
            className="w-[300px]"
            type="search"
          />
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Select defaultValue="newest">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="largest">Largest Files</SelectItem>
            <SelectItem value="smallest">Smallest Files</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>File Name</TableHead>
              <TableHead>Total Emails</TableHead>
              <TableHead>Results</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{format(item.date, 'MMM d, yyyy')}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{item.fileName}</span>
                  </div>
                </TableCell>
                <TableCell>{item.totalEmails.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {item.valid} valid
                    </Badge>
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      {item.invalid} invalid
                    </Badge>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      {item.risky} risky
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" title="View Details">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Download Report">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}