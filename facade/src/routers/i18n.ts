import express from 'express';
import { getTranslation, getLanguages } from '../controllers/i18n';

const router = express.Router();

router.get('/i18n', getTranslation);
router.get('/i18n/languages', getLanguages);

export default router;
