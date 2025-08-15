import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Navigation() {
  return (
    <nav className="hidden md:flex items-center gap-2">
      <Button variant="ghost" asChild>
        <Link href="/">Home</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="#about">About</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="#contact">Contact</Link>
      </Button>
    </nav>
  );
}
