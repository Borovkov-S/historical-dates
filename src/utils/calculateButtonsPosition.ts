import { EventData } from "../types/event.interface";

export const calculateButtonsPosition = (
  index: number,
  data: { category: string; events: EventData[] }[],
  viewportWidth: number
): { x: number; y: number } => {
  const radius = viewportWidth / 2;
  const angleStep = (2 * Math.PI) / data.length;
  const startOffset = -60 * (Math.PI / 180);

  const angle = startOffset + index * angleStep;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return { x, y };
};
