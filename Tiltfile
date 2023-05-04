# Constants
basepath = "/usr/src/www/"

# Development server
docker_build(
  context=".",
  dockerfile="Dockerfile",
  ref="local/dev",
  live_update=[
    sync("src", basepath + "src"),
    sync("styles", basepath + "styles"),
    sync("public", basepath + "public"),
  ]
)
k8s_yaml(yaml="k8s.yaml")
k8s_resource(
  labels=["site"],
  workload="dev",
  port_forwards=[
    port_forward(
      8000,
      8000,
      name="vite",
      host="0.0.0.0"
    ),
  ],
)

# Production server
docker_build(
  context=".",
  dockerfile="nginx/Dockerfile",
  ref="local/prod",
)
k8s_yaml(yaml="nginx/k8s.yaml")
k8s_resource(
  labels=["site"],
  workload="prod",
  port_forwards=[
    port_forward(
      8080,
      80,
      name="nginx",
      host="0.0.0.0"
    ),
  ],
  trigger_mode=TRIGGER_MODE_MANUAL,
  auto_init=False,
)
