import Link from 'next/link';
import { Rocket } from 'lucide-react';
import { Navigation } from '@/components/navigation';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-foreground transition-colors hover:text-accent">
            <Rocket className="w-6 h-6 text-accent" />
            <span className="font-headline">Next Starter</span>
          </Link>
          <Navigation />
        </div>
      </div>
    </header>
  );
}
