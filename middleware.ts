import { withAuth } from "next-auth/middleware";

const middleware = withAuth({
  pages: {
    signIn: "/",
  },
});

export default middleware;

// Opcional: Exporta la configuración en un archivo next.config.js
export const config = {
  // Configuración específica de Next.js
};