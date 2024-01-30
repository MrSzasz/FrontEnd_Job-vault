# Job Vault

Effortlessly curate and save your preferred job listings with Job Vault's intuitive interface. Seamlessly store and organize opportunities that match your career goals, all at your fingertips. Start building your personalized job archive with Job Vault now.

[![NextJS](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/) [![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) [![Shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/) [![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)](https://www.cypress.io/) [![PNPM](https://img.shields.io/badge/pnpm-yellow?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/) [![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Tests](#tests)
- [License](#license)

## Introduction

_Job Vault_ is a web application that allows users to have a record of their job applications and their status. This project was created to showcase my skills in front-end development and to provide a useful tool for the people who need to have a record of their job search history.

## Features

- CRUD operations for managing jobs.
- Responsive design for a seamless experience on multiple devices.
- Download of the record as JSON and CSV.
- Upload of a record as JSON and CSV.

## Technologies Used

- NextJs
- Shadcn/ui
- Tailwind
- Typescript
- pnpm

- **Deployment:**
  - Vercel

## Installation

1. Clone the repository:

```bash
git clone https://github.com/MrSzasz/FrontEnd_Job-vault.git
cd frontend-job_vault
```

Open the console on the root folder to start the server and the client.

```bash
pnpm dev
```

## Usage

Open your browser and navigate to `http://localhost:3000` to access the app.
Click on the `Add job` button to create a new job, then save it.
Now, you can edit and delete the job by clicking on the `...` button. If you want to edit, just modify the fields and save it. If you want to delete it, click on `Delete job`.

## Tests

This app utilizes Cypress for end-to-end testing.

### Prerequisites

Before running the tests, make sure you have the following dependencies installed:

- Node.js: [Download Node.js](https://nodejs.org/)

### Installing Dependencies

```bash
# Install project dependencies
pnpm install
```

### Running tests

```bash
# Run end-to-end tests with Cypress
npm run cypress:open
```

## License

This project is licensed under the MIT License.
