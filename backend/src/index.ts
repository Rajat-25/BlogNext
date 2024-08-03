import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import { connectDB } from './db/';
import indexRouter from './routes/index';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use('/api/v1/', indexRouter);

app.get('/test', (req: Request, res: Response) => {
  return res.status(201).send('Hello');
});

app.listen(PORT, () => {
  console.log('Server is running');
});
