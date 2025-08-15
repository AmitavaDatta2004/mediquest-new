import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-16">
        <section className="py-12">
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-foreground tracking-tight mb-4">
            Welcome to Next Starter
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
            A clean and simple starting point for your Next.js projects, styled with Tailwind CSS and ShadCN UI.
          </p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
            Get Started
          </Button>
        </section>
      </main>
    </div>
  );
}
