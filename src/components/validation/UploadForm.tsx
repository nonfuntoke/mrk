import { useState } from 'react';
import { Upload, FileText, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { validateEmails } from '@/lib/api';
import { ValidationResult } from '@/lib/types';
import { ValidationReport } from './ValidationReport';

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (
      selectedFile &&
      (selectedFile.type === 'text/csv' ||
        selectedFile.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    ) {
      setFile(selectedFile);
      setProgress(0);
      setValidationResult(null);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV or Excel file",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsProcessing(true);
    try {
      // Read file content
      const reader = new FileReader();
      reader.onload = async (event) => {
        const content = event.target?.result as string;
        const emails = content
          .split(/[\r\n,]+/)
          .map(email => email.trim())
          .filter(email => email);

        // Simulate progress
        const interval = setInterval(() => {
          setProgress(prev => Math.min(prev + 10, 90));
        }, 500);

        try {
          const result = await validateEmails(emails);
          clearInterval(interval);
          setProgress(100);
          setValidationResult(result);
          toast({
            title: "Validation Complete",
            description: "Your email list has been processed successfully.",
          });
        } catch (error) {
          toast({
            title: "Validation Failed",
            description: "An error occurred while validating emails.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to read the file.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (validationResult) {
    return <ValidationReport result={validationResult} />;
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>Upload Email List</CardTitle>
        <CardDescription>
          Upload your CSV or Excel file containing email addresses for validation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-2 border-dashed border-muted rounded-lg p-8 transition-colors hover:border-primary/50">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
              accept=".csv,.xlsx"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <Upload className="h-10 w-10 text-muted-foreground mb-4" />
              <span className="text-sm font-medium">
                {file ? (
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>{file.name}</span>
                  </div>
                ) : (
                  'Drop your file here or click to browse'
                )}
              </span>
              <span className="text-xs text-muted-foreground mt-2">
                Supports CSV and Excel files
              </span>
            </label>
          </div>

          {file && (
            <>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Credits Required</AlertTitle>
                <AlertDescription>
                  This file contains approximately {Math.floor(file.size / 50)}{' '}
                  emails. You'll need {Math.floor(file.size / 50)} credits to
                  process it.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                {isProcessing && (
                  <>
                    <Progress value={progress} className="w-full" />
                    <p className="text-sm text-muted-foreground text-center">
                      Processing... {progress}%
                    </p>
                  </>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isProcessing}
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : (
                  'Start Validation'
                )}
              </Button>
            </>
          )}
        </form>
      </CardContent>
    </Card>
  );
}