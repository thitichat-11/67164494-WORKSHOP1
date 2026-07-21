import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import categoryRoutes from './src/Routes/categoryRoutes.js';
import productRoutes from './src/Routes/productRoutes.js';
import itemRouter from './src/Routes/itemRouter.js';
import cartRoutes from './src/Routes/cartRoutes.js';
import authRouter from './src/Routes/authRouter.js';
import salapickRoutes from './src/Routes/salapickRoutes.js';
import wishlistRoutes from './src/Routes/wishlistRoutes.js';
import searchRoutes from './src/Routes/searchRoutes.js';
import checkoutRouter from './src/Routes/checkoutRouter.js';
import accountRouter from './src/Routes/accountRouter.js';
import singupRouter from './src/Routes/singupRouter.js';
import userRouter from './src/Routes/userRoutes.js'
import orderRoutes from './src/Routes/orderRoutes.js';
import dashboardRoutes from './src/Routes/dashboardRoutes.js';

console.log('Server starting... imported all routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  if (req.path.includes('/dashboard')) {
    console.log('[DASHBOARD REQUEST]', req.method, req.path);
  }
  next();
});

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/item', itemRouter);
app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRouter);
app.use('/api/salapicks', salapickRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/checkout', checkoutRouter);
app.use('/api/accounts', accountRouter);
app.use('/api/signup', singupRouter);
app.use('/api/users', userRouter)
app.use('/api/orders', orderRoutes);
app.use('/api/dashboard', dashboardRoutes);


app.use('/uploads', express.static('uploads'));
app.use('/api/search', searchRoutes);

app.get('/', (req, res) => {
    res.send('SALA E-Commerce Backend API is running smoothly! 🚀');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Version: FIXED');
});