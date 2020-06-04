import { Router } from 'https://deno.land/x/oak/mod.ts';
import * as indexCtrl from '../controllers/index.controllers.ts';

const router = new Router();

router.get('/', ({ response }) => {
  response.body = 'Hello world!';
});

router.get('/users', indexCtrl.getUsers);
router.get('/user/:id', indexCtrl.getUser);
router.post('/createUser', indexCtrl.createUser);
router.delete('/user/:id', indexCtrl.deleteUser);
router.put('/user/:id', indexCtrl.updateUser);

export default router;
