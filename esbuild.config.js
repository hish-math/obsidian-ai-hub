// esbuild.config.js
const esbuild = require("esbuild");

esbuild
	.build({
		entryPoints: ["src/main.ts"],
		bundle: true,
		outfile: "main.js",
		platform: "node",
		target: "es2020",
		external: ["obsidian"], // Prevent bundling Obsidian API
		sourcemap: false,
		minify: false,
		format: "cjs", // CommonJS format for Obsidian
		define: {
			"process.env.NODE_ENV": '"production"',
		},
	})
	.catch(() => process.exit(1));
