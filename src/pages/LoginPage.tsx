import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { User, Globe, MapPin } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  language: z.string({ required_error: "Please select a language." }),
  region: z.string({ required_error: "Please select your farming region." }),
});

interface LoginPageProps {
  onLogin: (userData: any) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      language: "",
      region: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Save user preferences
    localStorage.setItem("agrishield_user", JSON.stringify(values));
    
    onLogin(values);
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <img 
              src="/agrishield-logo.png" 
              alt="AGRISHIELD Logo" 
              className="h-16 w-16"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-display text-foreground">Welcome to AGRISHIELD</h1>
            <p className="text-muted-foreground">Set up your farming profile to get started</p>
          </div>
        </div>

        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Profile Setup
            </CardTitle>
            <CardDescription className="text-center">
              Customize your experience with AGRISHIELD
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="farmer@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-primary" />
                        Preferred Language
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                          <SelectItem value="bengali">বাংলা (Bengali)</SelectItem>
                          <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
                          <SelectItem value="gujarati">ગુજરાતી (Gujarati)</SelectItem>
                          <SelectItem value="punjabi">ਪੰਜਾਬੀ (Punjabi)</SelectItem>
                          <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
                          <SelectItem value="telugu">తెలుగు (Telugu)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        Farming Region
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your region" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="north">North India (Punjab, Haryana, UP)</SelectItem>
                          <SelectItem value="west">West India (Maharashtra, Gujarat, Rajasthan)</SelectItem>
                          <SelectItem value="south">South India (Karnataka, Tamil Nadu, Andhra Pradesh)</SelectItem>
                          <SelectItem value="east">East India (West Bengal, Bihar, Odisha)</SelectItem>
                          <SelectItem value="northeast">Northeast India</SelectItem>
                          <SelectItem value="central">Central India (MP, Chhattisgarh)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Setting up your profile..." : "Continue to AGRISHIELD"}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;