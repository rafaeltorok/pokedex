# Pokédex

## Table of Contents
- [About](#about)
- [Commands](#commands)
- [Docker](#docker)
- [Access](#access)


## About

This repository is used for the CI/CD module of the Full Stack Open course.

Live test available on [Render⇗](https://kantopokedex.onrender.com)


## Commands

- Install dependencies
  ```bash
  npm install
  ```

- Run the webpack dev server
  ```bash
  npm run start
  ```

- Build the project
  ```bash
  npm run build
  ```

- Start the production build
  ```bash
  npm run start-prod
  ```

- Run Jest tests
  ```bash
  npm run test
  ```

- Run ESLint
  ```bash
  npm run eslint
  ```

### E2E tests

- CLI mode
  ```bash
  npm run e2e
  ```

- UI mode (browser window)
  ```bash
  npm run e2e:ui
  ```

- Playwright report mode
  ```bash
  npm run e2e:report
  ```


## Docker
Build the image
```bash
docker build -t kanto-pokedex .
```

Run the container
```bash
docker run --name kanto-pokedex -p 8080:80 kanto-pokedex
```


## Access

Access the Web UI on http://localhost:8080
