import { Router } from 'express';
import {
  createProperty,
  deleteProperty,
  getAllProperties,
  getPropertyDetails,
  updateProperty,
} from '../controllers/property.controller';

const router = Router();

router.route('/').get(getAllProperties);
router.route('/:id').get(getPropertyDetails);
router.route('/').post(createProperty);
router.route('/:id').patch(updateProperty);
router.route('/:id').delete(deleteProperty);

export default router;
