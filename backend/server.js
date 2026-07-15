import express from 'express';
import cors from 'cors';
import 'dotenv/config'; 
import categoryRoutes from './src/Routes/categoryRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/categories', categoryRoutes);

app.get('/', (req, res) => {
    res.send('SALA E-Commerce Backend API is running smoothly! 🚀');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});