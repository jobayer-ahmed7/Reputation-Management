import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';

const app: Application = express();

// parser

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://reputationmanage.vercel.app'],
    credentials: true,
  }),
);
app.use(express.json());
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  try {
    res.status(200).send('Hello World!');
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

export default app;
