import express from 'express';
import authRoutes from './routes/auth.routes';
import adminRoutes from './routes/admin.routes';

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use(adminRoutes);

export default app;



