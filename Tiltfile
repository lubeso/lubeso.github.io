# Transpile to JavaScript
local_resource(
  "bundler",
  serve_cmd=[
    "deno",
    "bundle",
    "--watch",
    "src/index.ts",
    "public/index.js"
  ]
)

# Build development server container image
docker_build(
  "local/www",
  ".",
  live_update=[sync("public", "/www")],
)

# Deploy development server
k8s_yaml("deployment.yml")
k8s_resource(
  "www",
  port_forwards=8000,
)