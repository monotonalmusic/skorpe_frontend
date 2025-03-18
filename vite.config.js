import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { basename } from "./src/services/settings";

export default defineConfig({
    plugins: [react()],
    base: basename
});