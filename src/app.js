import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from './routes/productRoute.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger-output.json' assert { type: 'json' };
import cors from 'cors';
dotenv.config();
import connectToDB from './database/connect.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    limits: { fileSize: 6 * 1024 * 1024 }, // Setting file size limit
  }),
);

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

app.use(morgan('dev'));

// API Routes
app.use('/api', productRoutes);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('*', (req, res) => {
  console.log('Route not found');
  res.status(404).json({ message: 'Requested resource not found' });
});

// Start Server
const startServer = async () => {
  await connectToDB(process.env.MONGODB_URI);
  console.log(`CONNECTED TO DATABASE SUCCESSFULLY.`);
  app.listen(PORT, () => {
    console.log(
      `Server is running on port ${PORT}. Press Ctrl+C to terminate.`,
    );
  });
};

startServer();

export default app;
