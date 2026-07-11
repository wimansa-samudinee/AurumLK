import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">
        Welcome to AurumLK
      </h1>

      <p>
        Compare gold loan offers from trusted financial institutions.
      </p>

      <Button>Browse Offers</Button>
    </div>
  );
}