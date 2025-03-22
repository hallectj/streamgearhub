'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";

const NotFound = () => {
  return (
    <MainLayout>
      <div className="container max-w-3xl mx-auto py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </MainLayout>
  );
};

export default NotFound;
