import { Bitcoin, CreditCard, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CreditPackage } from '@/lib/types';

const packages: CreditPackage[] = [
  {
    id: 'starter',
    name: 'Starter',
    credits: 1000,
    price: 9.99,
    description: 'Perfect for small businesses and startups',
    features: [
      '1,000 email validations',
      'Basic API access',
      'Email support',
      'Valid for 30 days',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    credits: 5000,
    price: 39.99,
    description: 'Most popular choice for growing companies',
    features: [
      '5,000 email validations',
      'Advanced API access',
      'Priority support',
      'Valid for 60 days',
      'Detailed reporting',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    credits: 20000,
    price: 149.99,
    description: 'Ideal for large-scale email validation needs',
    features: [
      '20,000 email validations',
      'Premium API access',
      '24/7 priority support',
      'Valid for 90 days',
      'Advanced analytics',
      'Dedicated account manager',
    ],
  },
];

export function CreditPackages() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Choose Your Plan</h2>
        <p className="text-muted-foreground mt-2">
          Select the package that best fits your needs
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {packages.map((pkg) => (
          <Card 
            key={pkg.id} 
            className={`flex flex-col hover:shadow-lg transition-shadow ${
              pkg.id === 'professional' ? 'border-primary' : ''
            }`}
          >
            <CardHeader>
              {pkg.id === 'professional' && (
                <div className="text-center mb-2">
                  <span className="bg-primary/10 text-primary text-sm py-1 px-3 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardTitle>{pkg.name}</CardTitle>
              <CardDescription>{pkg.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-4xl font-bold mb-2">
                ${pkg.price}
                <span className="text-lg text-muted-foreground font-normal">
                  /package
                </span>
              </div>
              <div className="text-lg text-muted-foreground mb-6">
                {pkg.credits.toLocaleString()} Credits
              </div>
              <ul className="space-y-2">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                className="w-full" 
                variant={pkg.id === 'professional' ? 'default' : 'outline'}
              >
                Get Started
              </Button>
              <div className="flex justify-center space-x-3">
                <Bitcoin className="h-6 w-6 text-[#F7931A]" />
                <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/visa.svg" alt="Visa" className="h-6" />
                <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/mastercard.svg" alt="Mastercard" className="h-6" />
                <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/americanexpress.svg" alt="American Express" className="h-6" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}