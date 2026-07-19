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


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

// เรียกดูรูปสลิปผ่าน URL ได้ เช่น http://localhost:5000/uploads/payment-slips/ชื่อไฟล์.png
app.use('/uploads', express.static('uploads'));


app.use('/api/search', searchRoutes); 

app.get('/', (req, res) => {
    res.send('SALA E-Commerce Backend API is running smoothly! 🚀');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});