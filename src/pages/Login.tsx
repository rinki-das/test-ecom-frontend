import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="glass-effect border-white/20">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <span className="text-white font-bold text-2xl">E</span>
            </motion.div>
            <CardTitle className="text-2xl font-display font-bold text-white">
              Welcome to EliteStore
            </CardTitle>
            <CardDescription className="text-white/80">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>

              {/* Login Form */}
              <TabsContent value="login" className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 text-sm text-white/80">
                      <input type="checkbox" className="rounded border-white/20" />
                      <span>Remember me</span>
                    </label>
                    <Link to="/forgot-password" className="text-sm text-white/80 hover:text-white">
                      Forgot password?
                    </Link>
                  </div>

                  <Button className="w-full btn-hero">
                    Sign In
                  </Button>
                </motion.div>
              </TabsContent>

              {/* Register Form */}
              <TabsContent value="register" className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="regEmail" className="text-white">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                      <Input
                        id="regEmail"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="regPassword" className="text-white">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                      <Input
                        id="regPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4"
                >
                  <label className="flex items-start space-x-2 text-sm text-white/80">
                    <input type="checkbox" className="rounded border-white/20 mt-0.5" />
                    <span>
                      I agree to the <Link to="/terms" className="underline hover:text-white">Terms of Service</Link> and{' '}
                      <Link to="/privacy" className="underline hover:text-white">Privacy Policy</Link>
                    </span>
                  </label>

                  <Button className="w-full btn-hero">
                    Create Account
                  </Button>
                </motion.div>
              </TabsContent>
            </Tabs>

            {/* Social Login */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6"
            >
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-transparent px-2 text-white/60">Or continue with</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button variant="outline" className="glass-effect border-white/20 text-white hover:bg-white/10">
                  Google
                </Button>
                <Button variant="outline" className="glass-effect border-white/20 text-white hover:bg-white/10">
                  Apple
                </Button>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;