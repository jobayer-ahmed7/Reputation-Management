import cors from 'cors';
import express, {
  type Application,
  type Request,
  type Response,
} from 'express';

const app: Application = express();

// parser

app.use(express.json());
app.use(cors({
  origin: '*',
  credentials: true,
}));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
