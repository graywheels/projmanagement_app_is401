import { useEffect, useState } from "react";
import CamperCard from "@/components/CamperCard";

interface Camper {
  id: number;
  name: string;
  username: string;
  emoji: string;
}

const Index = () => {
  const [campers, setCampers] = useState<Camper[]>([]);

  useEffect(() => {
    const fetchCampers = async () => {
      try {
        const response = await fetch("http://localhost:4000/users");
        if (!response.ok) {
          throw new Error("Failed to load campers");
        }
        const data = await response.json();
        setCampers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCampers();
  }, []);

  const updateUsername = async (id: number, newUsername: string) => {
    try {
      const response = await fetch(
        `http://localhost:4000/users/${id}/username`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: newUsername }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update username");
      }

      const updated = (await response.json()) as Camper;

      setCampers((prev) =>
        prev.map((c) => (c.id === id ? { ...c, username: updated.username } : c))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="py-10 text-center">
        <p className="text-4xl mb-2">🦕</p>
        <h1 className="font-display text-4xl font-bold text-foreground">
          Dino Discovery Camp
        </h1>
        <p className="mt-2 text-muted-foreground text-lg">
          Summer 2026 · Enrolled Campers
        </p>
      </header>

      <main className="mx-auto max-w-xl px-4 pb-16 space-y-4">
        {campers.map((c) => (
          <CamperCard
            key={c.id}
            name={c.name}
            username={c.username}
            emoji={c.emoji}
            onSave={(newUsername) => updateUsername(c.id, newUsername)}
          />
        ))}
      </main>
    </div>
  );
};

export default Index;
