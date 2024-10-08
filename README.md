# Dembrane Take Home Assignment

This is the repo for Dembranes Take Home Assignment

It is split in two folders. The front-end and the back-end folder. The back-end folder contains an express api and the front-end folder contains the Vite React Application.

## Deployment

To deploy this project, you will need to set up a Postgresql database. You can use the postgresSchema.sql file to quickly set up the database.
After that navigate inside the back-end folder, open the .env file and fill in the correct information so that the database connection can be made and finally run the following command

```bash
  npm run dev
```

After that navigate inside the front-end folder and run the following command

```bash
    npm run dev
```

## Demo

To sample the app head to the link : http://localhost:5173/host/createForm and create a form. When you submit it, you will get the shareable link. Click the link to be navigated to the place where guests can give answers to the form. Give some sample answers (you can click submit multiple times on purpose). Finally, navigate to http://localhost:5173/host/statistics to choose a form for which you want to see statistics for. When you choose a form, you should be navigated to the form statistics.

## Tech Stack

**Client:** React, Vite, Shadcnui

**Server:** Node, Express

**Databse:** Postgres
