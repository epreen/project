'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles, ShieldCheck, Store } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Build. Sell. Scale.
            <span className="block text-primary">All in One Marketplace</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            A modern multi-vendor platform designed for creators, sellers, and
            ambitious businesses that want to move fast without breaking things.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10 flex justify-center gap-4"
          >
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={<Store className="h-6 w-6" />}
            title="Multi-Vendor Ready"
            description="Let multiple sellers run their own stores with powerful tools and analytics."
          />
          <FeatureCard
            icon={<ShieldCheck className="h-6 w-6" />}
            title="Secure by Default"
            description="Authentication, payments, and permissions designed with security in mind."
          />
          <FeatureCard
            icon={<Sparkles className="h-6 w-6" />}
            title="Beautiful UX"
            description="A clean, responsive interface that feels fast and delightful on every device."
          />
        </div>
      </section>

      {/* Call To Action */}
      <section className="border-t">
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Ready to launch your marketplace?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Stop wiring everything from scratch. Focus on growth while the platform
            handles the heavy lifting.
          </p>
          <div className="mt-8">
            <Button size="lg">Create Your Account</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="h-full rounded-2xl">
        <CardContent className="p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>
          <h3 className="mt-4 text-xl font-semibold">{title}</h3>
          <p className="mt-2 text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
