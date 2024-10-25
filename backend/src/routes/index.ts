import express from 'express';
import userRoute from './UserRoutes';
import bookRoute from './BookRoutes';
import reviewRoute from './ReviewRoutes';
import commentRoute from './CommentRoutes';

const router = express.Router();

const allRoutes = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/books',
    route: bookRoute,
  },
  {
    path: '/reviews',
    route: reviewRoute,
  },
  {
    path: '/comments',
    route: commentRoute,
  },
];
allRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
