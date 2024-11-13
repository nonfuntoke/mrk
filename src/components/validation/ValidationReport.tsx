import { useState } from 'react';
import { Download, Mail, AlertTriangle, XCircle, Shield, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { ValidationResult, ValidationCategory } from '@/lib/types';

const categories: ValidationCategory[] = [
  {
    type: 'valid',
    label: 'Valid Emails',
    color: 'bg-green-100 text-green-800',
    description: 'These emails are valid and safe to send to',
    icon: 'mail',
  },
  {
    type: 'invalid',
    label: 'Invalid Emails',
    color: 'bg-red-100 text-red-800',
    description: 'These emails are invalid or non-existent',
    icon: 'x-circle',
  },
  {
    type: 'risky',
    label: 'Risky Emails',
    color: 'bg-yellow-100 text-yellow-800',
    description: 'These emails might have deliverability issues',
    icon: 'alert-triangle',
  },
  {
    type: 'spamTraps',
    label: 'Spam Traps',
    color: 'bg-purple-100 text-purple-800',
    description: 'Known spam trap addresses',
    icon: 'shield',
  },
  {
    type: 'disposable',
    label: 'Disposable Emails',
    color: 'bg-blue-100 text-blue-800',
    description: 'Temporary email addresses',
    icon: 'trash-2',
  },
];

interface ValidationReportProps {
  result: ValidationResult;
}

export function ValidationReport({ result }: ValidationReportProps) {
  const [currentCategory, setCurrentCategory] = useState<string>('valid');
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'mail':
        return Mail;
      case 'x-circle':
        return XCircle;
      case 'alert-triangle':
        return AlertTriangle;
      case 'shield':
        return Shield;
      case 'trash-2':
        return Trash2;
      default:
        return Mail;
    }
  };

  const getCategoryEmails = (category: string) => {
    switch (category) {
      case 'valid':
        return result.valid;
      case 'invalid':
        return result.invalid;
      case 'risky':
        return result.risky;
      case 'spamTraps':
        return result.spamTraps;
      case 'disposable':
        return result.disposable;
      default:
        return [];
    }
  };

  const itemsPerPage = 10;
  const emails = getCategoryEmails(currentCategory);
  const filteredEmails = emails.filter(email => 
    email.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredEmails.length / itemsPerPage);
  const currentEmails = filteredEmails.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const downloadCategory = (category: string) => {
    const emails = getCategoryEmails(category);
    const blob = new Blob([emails.join('\n')], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${category}-emails.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-5">
        {categories.map((category) => {
          const emails = getCategoryEmails(category.type);
          const Icon = getIconComponent(category.icon);
          return (
            <Card
              key={category.type}
              className={`cursor-pointer hover:shadow-md transition-shadow ${
                currentCategory === category.type ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setCurrentCategory(category.type)}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {category.label}
                </CardTitle>
                <Icon className={`h-4 w-4 ${category.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{emails.length}</div>
                <p className="text-xs text-muted-foreground">
                  {((emails.length / result.totalEmails) * 100).toFixed(1)}%
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {categories.find(c => c.type === currentCategory)?.label}
          </CardTitle>
          <Button
            variant="outline"
            onClick={() => downloadCategory(currentCategory)}
          >
            <Download className="mr-2 h-4 w-4" />
            Download List
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Search emails..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email Address</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentEmails.map((email, index) => (
                    <TableRow key={index}>
                      <TableCell>{email}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                          categories.find(c => c.type === currentCategory)?.color
                        }`}>
                          {categories.find(c => c.type === currentCategory)?.label}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}