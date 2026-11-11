---
slug: docker-fundamentals
title: "Docker Fundamentals"
summary: "A complete beginner foundation in containers, images, Dockerfiles, volumes, networking, Compose, and safe workflows—with interactive quizzes that explain wrong answers."
category: "Development"
type: course
level: beginner
tier: deep
price: 4
minutes: 200
tags: [docker, containers, devops, images, compose]
featured: true
publishedAt: "2026-03-19"
---

## What You'll Learn

By the end of this lesson, you will be able to explain what containers are and how they differ from virtual machines. You will run containers, inspect them, and map ports thoughtfully. You will build images with Dockerfiles using clear layers and lean defaults. You will persist data with volumes, connect services with basic networking, and define multi-container apps with Docker Compose. You will recognize common mistakes around secrets, bloated images, and “it works on my machine” drift. You will practice safe beginner workflows for local development and leave with mental models that transfer to CI and cloud deployments.

Docker is a platform for building, shipping, and running applications in containers. Containers package software with its dependencies so it can run more consistently across laptops, servers, and pipelines. Docker is popular, but the underlying ideas—isolation, images as templates, declarative environment definition—matter more than any single command.


## Why Containers Exist

Classic deployment pain looks like this: an app works on a developer laptop, fails on a teammate’s machine, then fails differently in production. Versions of runtimes, system libraries, and configuration drift silently. Containers reduce that drift by bundling the application with the filesystem pieces it needs and running it in an isolated process environment.

Containers are not magic fairness for every problem. They do not replace good testing. They do not automatically secure a reckless app. They do make environment parity more achievable and make services easier to compose locally.


## Containers Versus Virtual Machines

A virtual machine emulates hardware and typically runs a full guest operating system. That is powerful and relatively heavy. A container shares the host kernel and isolates processes with kernel features, using an image’s filesystem as its world. Containers usually start faster and use fewer resources than full VMs for many app workloads.

Think of a VM as a house with its own utilities, and a container as an apartment with shared building infrastructure but private rooms. The analogy is imperfect, yet useful for beginners. You still need to understand what is shared and what is isolated, especially for security boundaries.


## Core Objects: Images, Containers, Registries

An **image** is a read-only template: layered filesystem snapshots plus metadata about how to start the program. A **container** is a running (or stopped) instance created from an image. A **registry** stores images so you can pull and push them—Docker Hub is a well-known public registry, and companies often run private registries.

If an image is a class, a container is an object instance. You can run many containers from one image. Changing a running container’s filesystem does not rewrite the image unless you commit or rebuild—beginners should prefer rebuilding from a Dockerfile rather than snowflake commits.


## Installing and Verifying Docker

Installation steps differ by operating system. Use official documentation for your platform. After install, verify with a hello-world style pull and run, then check `docker version` and that the engine responds. If commands fail with permission errors on Linux, you may need group membership or rootful vs rootless configuration guidance from current docs.

This course focuses on concepts and durable command patterns. Exact flags evolve; mental models endure.


## Running Your First Containers

A typical run specifies an image and optional settings: publish ports, set environment variables, mount volumes, name the container, and choose whether it runs interactively. Example shape:

```bash
docker run --rm -p 8080:80 --name web nginx:alpine
```

This pulls an nginx image if needed, names the container `web`, maps host port 8080 to container port 80, and removes the container on exit when `--rm` is used. Visit the mapped host port in a browser to confirm.

Useful companion commands: `docker ps` for running containers, `docker ps -a` to include stopped ones, `docker logs`, `docker stop`, `docker rm`, and `docker exec` to run a command inside a running container.


## Port Mapping and Process Mentality

Containers isolate networks by default relative to the host. Publishing a port creates a pathway. Map only what you need. Binding sensitive admin interfaces to the world without protection is a common mistake. Local learning setups still benefit from least exposure habits.

Remember that a container’s main process matters. If the main process exits, the container stops. Long-running services should run in the foreground appropriately for their image design. Daemonizing inside containers the old-fashioned way often fights the model.


<!-- quiz:docker-checkpoint-1 -->


## Images and Layers

Images are layered. Each Dockerfile instruction typically contributes a layer. Layers are cached. If an early layer changes, later layers rebuild. That is why instruction order matters for build speed: put slowly changing steps earlier and frequently changing app code later when practical.

Inspect images with `docker images` or newer `docker image ls`, and remove unused ones carefully with prune workflows once you understand what you are deleting.


## Writing Dockerfiles

A Dockerfile is a recipe. A beginner web app recipe might:

1. Start `FROM` a base image with the right runtime.
2. Set a working directory.
3. Copy dependency manifests first.
4. Install dependencies.
5. Copy application source.
6. Set environment defaults if needed.
7. `EXPOSE` documentation ports (documentation, not a publish action).
8. Define `CMD` or `ENTRYPOINT` to start the app.

Example sketch for a Node app:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]
```

Refine for your ecosystem. Use official base images when possible. Prefer specific tags over `latest` for reproducibility. Alpine or slim variants reduce size but can surprise you with missing libraries—learn the trade-off.


## Build Context and `.dockerignore`

The build context is the set of files sent to the daemon for `docker build`. A bloated context slows builds and risks copying secrets. Add a `.dockerignore` file to exclude `node_modules`, `.git`, local env files, and build artifacts you do not need in the image.

Never bake production secrets into images. Pass runtime secrets via orchestrator mechanisms, environment injection patterns approved by your team, or secret managers—not `COPY .env` into a public image.


## Tagging and Versioning Images

Tags label image versions: `myapp:1.2.0`, `myapp:dev`, digests for immutable references. Tag thoughtfully in teams. Avoid overwriting tags that other systems rely on without a scheme. For learning, tag local experiments clearly so you do not confuse yourself.


## Volumes and Persistent Data

Container filesystems are ephemeral relative to container lifecycle expectations. Databases and uploaded files need persistence. Volumes store data outside the container’s writable layer in Docker-managed ways. Bind mounts map a host directory into the container—handy for local development, less ideal as a blunt production default without care.

Example:

```bash
docker run -d --name db -v pgdata:/var/lib/postgresql/data postgres:16
```

Know whether you need a named volume, a bind mount, or ephemeral storage. Losing a database container without a volume is a rite of passage you can skip by learning this early.


## Networking Basics

Containers on a user-defined bridge network can resolve each other by container name. Compose creates networks for services automatically in typical setups. Avoid hardcoding host-only assumptions when services should talk container-to-container.

For local apps: frontend or API publishes a host port; backend database often stays unpublished and reachable only on the Docker network. That reduces accidental exposure.


## Docker Compose for Multi-Container Apps

Compose uses a YAML file—commonly `compose.yaml` or `docker-compose.yml`—to declare services, networks, and volumes. Example sketch:

```yaml
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://app:app@db:5432/app
    depends_on:
      - db
  db:
    image: postgres:16
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=app
      - POSTGRES_USER=app
      - POSTGRES_DB=app
volumes:
  pgdata:
```

Commands typically include `docker compose up`, `docker compose down`, `docker compose logs`, and `docker compose build`. Compose is the beginner-friendly way to run realistic stacks locally.


<!-- quiz:docker-checkpoint-2 -->


## Development Workflows That Feel Good

A healthy loop: edit code → rebuild or mount source → run tests in containers → compose logs when something breaks → commit Dockerfile and Compose changes with the app. Keep README steps short: “Install Docker, run `docker compose up --build`.” Onboarding improves when the repo carries its environment.


## Debugging Containers

When something fails: check `docker ps -a` for exit status, read logs, `docker exec` into a running container if appropriate, inspect environment variables, confirm port mappings, and verify volume mounts. `docker inspect` reveals low-level details when needed.

Common failures: wrong working directory, missing dependencies in slim images, app binding to `127.0.0.1` inside the container instead of `0.0.0.0`, and incorrect file permissions on mounted volumes.


## Image Size and Hygiene

Large images slow pulls and widen attack surface. Techniques: smaller base images, multi-stage builds, fewer unnecessary packages, cleanup in the same layer that installs when using package managers, and not copying build tools into final runtime images.

Multi-stage build idea: compile in a builder stage, copy artifacts into a slim runtime stage. Beginners can adopt this once single-stage Dockerfiles feel comfortable.


## Security Mindset for Beginners

- Do not run containers as root in the app process if you can avoid it; many base images support creating a user.
- Do not publish admin ports broadly.
- Do not put secrets in Dockerfiles or public repos.
- Pull images from trusted sources; pin versions.
- Keep engine and dependencies updated in real projects.
- Understand that container escape and misconfiguration risks exist; isolation is strong but not a substitute for defense in depth.

This is not a penetration course. It is a habit set that prevents obvious foot-guns.


## Containers in CI and Beyond

CI systems often build images, run tests in them, and push tagged artifacts. The same Dockerfile that helps local dev becomes the pipeline unit. Later you may deploy to orchestrators like Kubernetes. Compose is not Kubernetes, but learning services, health expectations, and immutable images transfers.

Do not rush orchestration until containers and Compose feel natural. Foundations first.


## Common Docker Mistakes

1. Using `latest` everywhere and wondering why builds drift.
2. Copying secrets into images.
3. Gigantic build contexts without `.dockerignore`.
4. Treating containers as mutable pets instead of rebuilding.
5. Binding apps to localhost inside containers.
6. Forgetting volumes for databases.
7. Publishing every port “just in case.”
8. One giant container running many unrelated processes without reason.
9. Ignoring logs and only restarting until “it works.”
10. Assuming containers replace application security.


## Worked Example: Containerizing a Simple API

Suppose you have a Python API with `requirements.txt` and `app.py`. Dockerfile installs dependencies, copies code, and starts `uvicorn` bound to `0.0.0.0`. Compose adds Postgres with a volume and passes a connection string. You hit `localhost:8000` on the host. Logs show migrations failing—you fix credentials and rebuild. That loop is ordinary professional Docker use.


## Worked Example: Front End and API Together

Compose services: `web` (static or Node), `api`, `db`. The browser talks to published web/API ports on localhost. The API talks to `db` by service name on the Docker network. Environment variables differ per service. You learn boundaries: browser ≠ container DNS names unless you design for that carefully.


## ENTRYPOINT Versus CMD

`ENTRYPOINT` sets the main executable; `CMD` supplies default arguments that can be overridden more easily depending on style. You can combine them. Beginners should read the base image docs—some images already define entrypoints that expect specific commands. Fighting an image’s entrypoint without reading docs wastes hours.


## Healthchecks and Depends_On Nuance

`depends_on` in Compose waits for container start, not full readiness, unless you add richer health-aware patterns. A database accepting TCP may still be warming up. Apps should retry connections. Healthchecks help orchestrate readiness more honestly as you advance.


## Resource Limits and Local Fairness

On shared machines, unbounded containers can consume heavy CPU or memory. Learn that limits exist and matter in production. Locally, notice when a runaway container freezes your laptop—then stop it and investigate.


## Practice Lab: Run, Inspect, Clean

1. Run `nginx:alpine` with a port map.  
2. Check `docker ps` and fetch the page.  
3. Read logs.  
4. Stop and remove containers.  
5. List images and identify what you pulled.  
6. Prune only when you understand the command’s blast radius.


## Practice Lab: Dockerfile From Scratch

Containerize a tiny app you already know. Add `.dockerignore`. Build with a tag. Run it. Break it by changing a dependency and watch layer cache behavior. Fix and rebuild. Write README steps for a teammate.


## Practice Lab: Compose a Two-Service Stack

Define app + database. Use a named volume. Confirm data survives `docker compose down` and `up` when volumes are preserved. Then intentionally remove the volume in a disposable learning project to see data loss—on purpose, on fake data.


## Choosing Base Images

Official language images are a solid default. Distroless and scratch images are advanced hardening/size moves. Windows containers exist for Windows workloads; this course focuses on typical Linux container learning paths. Match base image OS lineage to native dependencies.


## Logging and Observability Basics

Containers log to stdout/stderr by convention. Docker captures those streams. In broader systems, ship logs aggregators later. For now, structured logs from your app make `docker logs` usable. Do not log secrets.


## File Permissions and Line Endings

Bind mounts can surface permission mismatches between host user IDs and container users. Line endings from Windows editors can break shell scripts in Linux containers. These are practical foot-guns; diagnose calmly with `exec`, `ls -l`, and script header checks.


## Idempotent Rebuilds and Documentation

Your repo should describe how to build and run with Docker in a few commands. Prefer declarative files committed to git over tribal lore in chat. Idempotence—run the same commands get the same shape—makes teams faster.


## When Not to Use Docker

Tiny scripts, simple static file opens, or constrained environments without the engine may not need containers. Docker adds a moving part. Use it when dependency isolation, parity, or multi-service composition pays rent.


## Glossary

**Image:** Immutable-ish template of filesystem + start metadata.  
**Container:** Runnable instance of an image.  
**Dockerfile:** Build recipe for images.  
**Layer:** Cached filesystem diff contributing to an image.  
**Volume:** Persistent storage managed for containers.  
**Bind mount:** Host path mounted into a container.  
**Registry:** Remote store for images.  
**Compose:** Declarative multi-container project tool.  
**Build context:** Files sent for build.  
**Tag:** Human name for an image variant.


## Capstone Assignment

Pick a small multi-file app. Write a Dockerfile with a sensible base tag and `.dockerignore`. Write Compose with one dependency service (database or cache). Document ports, env vars, and startup. Include a section on secrets you deliberately did not hardcode. Record five failure modes you hit and how logs revealed them.


## Mentorship Notes

Type commands yourself. Reading is not muscle memory. Prefer rebuilds over mysterious manual edits inside containers for anything you want to keep. Ask “what is ephemeral?” whenever you store data. Curiosity about layers will save hours of rebuild pain.


## Extended Comparison: VM, Container, Process

A normal process trusts the host filesystem layout. A container process sees a curated filesystem and isolated namespaces. A VM boots another OS. You can nest ideas—but start by placing your app in a container image you can rebuild. Promotion paths to VMs or orchestrators become easier when the app is already packaged cleanly.


## Registry Hygiene

Learn to `docker logout` from shared machines, avoid storing sensitive images on public registries, and understand that public base images still require trust and updates. Scan images in real organizations. As a beginner, at least track what you run and why.


## Environment Variables and Config

Twelve-factor style config via environment variables fits containers well. Provide defaults carefully. Distinguish build-time args (`ARG`) from runtime env (`ENV` and orchestrator injection). Do not confuse them or you will bake the wrong values into layers.


## Windows, Mac, and Linux Hosts

Docker Desktop and engine setups differ. File system performance for bind mounts can vary by platform. If hot reload feels slow, research current best practices for your OS rather than assuming Linux-native speed everywhere. Concepts remain shared.


## Team Agreements Worth Making

- Default compose command documented.  
- Base image tags pinned.  
- Secrets pattern agreed.  
- Production vs local Compose overrides strategy.  
- Who rebuilds and publishes CI images.  

Social contracts prevent Docker from becoming chaos with YAML.


## Recap Before the Final Quiz

Images template containers. Dockerfiles build images in layers. Volumes persist. Networks connect. Compose declares stacks. Secrets stay out of images. Logs tell truth. Rebuild over snowflake. Pin tags. Expose less. Bind your app to reachable interfaces inside containers. Practice on purpose.

<!-- quiz:docker-final -->


## Troubleshooting Playbook

1. Is the engine running?  
2. Is the container running or exited?  
3. What do logs say?  
4. Is the port mapped and free on the host?  
5. Is the app listening on the right interface?  
6. Are env vars present?  
7. Is the volume path correct?  
8. Did the build use stale cache when you needed a refresh?  

Work the list in order before random reinstalls.


## Final Synthesis

Docker fundamentals give you a portable unit of runtime packaging. Mastery at beginner level means you can containerize an app, persist data correctly, compose services, and avoid secret and reproducibility disasters. From here, cloud deployments and orchestrators make more sense because you already understand the artifact being scheduled: a container from an image you can build again.


## Reflection Prompts

Which dependency on your machine is most fragile? What would a Dockerfile freeze? Where might you have been tempted to put a secret? Which service needs a volume? What tag scheme would help your team? Write answers, then implement one improvement in a real repo.


## Closing Encouragement

Run the labs. Break disposable setups. Read logs without fear. Docker becomes comfortable through repetition, not through memorizing every flag. When quizzes mark a miss, rerun the matching command family the same day until the model sticks.


## Afterword: From Laptop to Pipeline

The same image that runs on your laptop can run in CI and beyond if you treat Dockerfiles as first-class product code. Review them in pull requests. Refuse mystery `latest` tags in shared systems. Keep Compose files honest about local passwords versus production secret injection. Professional Docker use is mostly discipline wrapped around simple primitives.

You now have those primitives: image, container, volume, network, Dockerfile, Compose. Use them to make “works on my machine” a less common story—and when it still happens, you will have the tools to see why.


## Workshop: Layer Cache Detective

Build an image. Change only an application source file. Rebuild and notice which steps are cached. Then change an early dependency file and rebuild again. Write down what invalidated. This workshop teaches why copying lockfiles before full source copies is a common pattern. Speed is not vanity; faster builds mean tighter feedback loops and fewer abandoned Docker efforts.


## Workshop: The Secret That Should Not Exist

Create a disposable project. Intentionally add a fake API key to a file, build without `.dockerignore`, then add ignore rules and rebuild with a clean approach using runtime env instead. Practice `docker history` / inspect habits cautiously to think about what layers might contain. The point is visceral: secrets in build context are sticky. Prefer prevention.


## Workshop: Data Survival Test

Compose a database with a named volume. Insert a row using a client container or exec. Run `docker compose down` then `up`. Confirm the row survives. In a throwaway project, run a volume-removing down and watch the data disappear. You will never forget why volumes matter after you have seen both outcomes on purpose.


## Init Containers and Sidecars as Ideas

You may hear about init containers and sidecars in orchestration. At Docker fundamentals level, translate the idea: sometimes a helper task must run before the main app, or a helper process sits beside it for logging or proxying. Prefer simple one-primary-process containers until you have a clear reason for more. Complexity needs a story.


## Distroless and Scratch: Later Tools

Minimal images reduce attack surface and size but make debugging harder because shells may be missing. Beginners should not start there. Graduate after you can debug normal images confidently. Knowing these options exist keeps you from believing huge images are inevitable forever.


## HTTP Proxies and Corporate Networks

Some environments require proxy settings to pull images. That is operational reality, not a Docker conceptual failure. Document proxy env vars for your team when relevant. Learning environments at home may not need this; workplace laptops often do.


## Migrations and Container Starts

Apps that migrate databases on start can race with database readiness. Add retry logic, startup scripts with waits, or job containers for migrations. Compose `depends_on` alone is not a complete readiness solution. Design for eventual readiness rather than one-shot hope.


## Copy Versus Add

`COPY` is preferred for local files in most beginner Dockerfiles because it is explicit. `ADD` has extra behaviors such as fetching URLs or unpacking archives that can surprise you. Prefer boring and explicit unless you have a deliberate reason.


## Stopping Softly

`docker stop` sends a termination signal and waits; `docker kill` is harsher. Apps should handle graceful shutdown when possible so in-flight work can finish. In Compose, down patterns should match how careful you need to be with data services.


## Local Overrides Without Chaos

Teams often use Compose override files for local ports or bind mounts while keeping a base file clean. Agree on names and gitignore rules for personal overrides that contain machine-specific paths. Shared files stay shared; personal tweaks stay personal.


## Observability Bridge

Metrics and tracing are later chapters in many careers. For now, export clear logs and health endpoints from apps you containerize. Future you will thank present you when dashboards need something to scrape.


## Performance Footguns

Bind-mounting huge node_modules trees, syncing entire monorepos unintentionally, and rebuilding from scratch every time because of broken cache patterns all hurt. Measure before you invent exotic solutions. Often a better `.dockerignore` and dependency copy order fix enough.


## Checklist: Before You Push an Image

- Tag is meaningful  
- No secrets in layers  
- Runs with documented env vars  
- Non-root user where feasible  
- Minimal unnecessary packages  
- CI can build it non-interactively  
- README matches reality  

Treat images as release artifacts, even when you are a beginner on a side project. Habits transfer.


## Checklist: Before You Compose Up on a Shared Laptop

- Ports do not collide with other projects  
- Volume names will not overwrite precious local data unexpectedly  
- Fake passwords are fine locally but labeled as local-only  
- You know how to down the stack  

Courtesy is part of craft when multiple stacks share a machine.


## Bridging to Cloud Concepts

Managed container services and Kubernetes schedule containers onto machines with CPU/memory requests, probes, and registries. Your Dockerfile quality becomes everyone’s runtime quality. Learning fundamentals now is leverage later—not a detour.


## Encouragement for the Stuck Afternoon

Everyone loses an afternoon to a wrong WORKDIR or a missing lockfile. Take a break, draw the network on paper, and come back to logs. Stubborn calm beats random flag pasting. You are learning a production dialect of software delivery; fluency takes reps.


## Final Practical Rule

If you changed it and you care about it, put it in version control as a Dockerfile, Compose file, or documented script—not as an unrepeatable manual edit inside a running container. That single rule prevents most beginner Docker regret.
