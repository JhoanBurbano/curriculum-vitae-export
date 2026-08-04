import type { BlogPost } from "@/types/blog";
import { agenticEnProduccion } from "./agentic-en-produccion";
import { expoSdk57NuevaArquitectura } from "./expo-sdk-57-nueva-arquitectura";
import { ios27AppIntents } from "./ios-27-app-intents";
import { compose111ComposeFirst } from "./compose-1-11-compose-first";

/**
 * Registro de posts. Para publicar uno nuevo: crea el módulo en esta carpeta y
 * añádelo aquí. El orden no importa — `getAllPosts()` ordena por fecha.
 */
export const posts: BlogPost[] = [
  agenticEnProduccion,
  expoSdk57NuevaArquitectura,
  ios27AppIntents,
  compose111ComposeFirst,
];
