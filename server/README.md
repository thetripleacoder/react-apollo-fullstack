# API

## Installation

1. Copy `env.example` file as a new `.env` file in the root directory. Replace the paths in the `.env` file as instructed.
2. Run `npm install`.
3. Run `npm start` to start the API server.

## Updating the Database

1. Make sure that the `galileo_api` server is running.
2. Using the MongoDB client of your choice, e.g. Compass, Robo 3T, etc., make the desired changes to the data.
3. When you're done and ready to commit your updates to the repo, run the `npm run export-pnr` command.
   This will generate a new `.json` file containing the records in the `pnrs` collection that you currently have in your local database on your machine. This will overwrite the `data/pnrs.json`
4. Commit and push your changes.

## Building & Deploying Updates to Staging

1. Go to **CI/CD > Pipelines**. Look for the job that contains the changes you want to build and deploy.
2. Click the Play button next to the `build_galileo_client` job.
3. Wait for the job to finish.
4. When the `build_galileo_client` job is finished, the `deploy:galileo_client:stage` job will automatically be run next.
5. Once the `deploy:galileo_client:stage` job is finished, verify changes in staging.

## Building & Deploying Updates to Production

1. Go to **CI/CD > Pipelines**. Look for the job that contains the changes you want to build and deploy.
2. CLick the Play button next to the `build_galileo_client` job.
3. Wait for the job to finish.
4. When the `build_galileo_client` job is finsihed, click the Play button next to the `deploy:galileo_client:prod` job to deploy our updates.
5. Once the `deploy:galileo_client:prod` job is finished, verify your changes in production.
