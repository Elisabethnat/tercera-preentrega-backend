import { Router } from 'express';
import userRouter from './user.routes.js';
import productRouter from './product.routes.js';
import cartRouter from './carts.routes.js'; 
import messageRouter from './messages.routes.js';
import sessionRouter from './sessions.routes.js';
import profileRouter from './profile.routes.js';
import ticketRouter from './tickets.routes.js';

const router = Router();

router.use('/api/products', productRouter); //aca se enlaza la ruta al use
router.use('/api/carts', cartRouter);
router.use('/api/users', userRouter);
router.use('/api/message', messageRouter );
router.use('/api/sessions', sessionRouter );
router.use('/api/profile', profileRouter);
router.use('/api/tickets',ticketRouter);


export default router;