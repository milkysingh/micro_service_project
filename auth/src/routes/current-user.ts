import express from 'express';
import { currentUser } from '@milkysinghtickets/common';
import { requireAuth } from '@milkysinghtickets/common';
const router = express();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});
export { router as currentUserRoute };
