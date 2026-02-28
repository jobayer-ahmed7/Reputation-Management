import cors from 'cors';
import router from './app/routes/index.js';
import express, {
  type Application,
  type Request,
  type Response,
} from 'express';

const app: Application = express();

// parser

app.use(cors({
  origin: ['http://localhost:3000', 'https://reputation-management-frontend.vercel.app'],
  credentials: true,
}));
app.use(express.json());
app.use("/api", router);

app.get('/', (req: Request, res: Response) => {
 try {
   res.status(200).send('Hello World!');
 } catch (err) {
  console.log(err)
   res.status(500).send('Internal Server Error');
 }
});

export default app;
