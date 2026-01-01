import { Signals } from "@/types/types";

export function generateRoasts(signals: Signals): string[] {
  const roasts: string[] = [];

  if (signals.obsessionScore > 0.4) {
    roasts.push(
      `Bhai ${signals.topArtistName} ko sunta hai ya shaadi karni hai? 💀`
    );
  }

  if (signals.nightOwl) {
    roasts.push(
      "2-4 AM listening detected. Career plan hai ya bas vibes pe jee raha hai?"
    );
  }

  if (signals.avgPopularity < 40) {
    roasts.push("Tu underground nahi hai, tu bas mainstream se allergic hai.");
  }

  if (signals.sadBoi) {
    roasts.push(
      "Itna sad music… therapy Spotify ke free trial me milti hai kya?"
    );
  }

  if (roasts.length === 0) {
    roasts.push(
      "Surprisingly normal music taste. Thoda risky jeena seekh bhai."
    );
  }

  return roasts;
}
