import nodecache from 'node-cache';
const cache = new nodecache();
import { Router } from 'express';
import faq from '../models/faq.js';
const router = Router();
import { translate } from '@vitalets/google-translate-api';

router.get('/faq', async (req, res) => {
  const lang = req.query.lang || 'en';
  const cachedData = cache.get(lang);
  if (cachedData) {
    return res.json(cachedData);
  }
  const allfaqs = await faq.find();
  const translatedFAQs = await Promise.all(
    allfaqs.map(async (faq) => {
      let tranqS = faq.question;
      let tranAS = faq.answer;
      if (lang !== 'en') {
        const [tranq, tranA] = await Promise.all([
          translate(faq.question, { to: lang }),
          translate(faq.answer, { to: lang }),
        ]);
        tranqS = tranq.text;
        tranAS = tranA.text;
      }
      return { question: tranqS, answer: tranAS };
    })
  );
  cache.set(lang, translatedFAQs);
  res.json(translatedFAQs);
});

router.post('/addfaq', async (req, res) => {
  const { question, answer } = req.body;
  const newFaq = await faq.create({ question, answer });
  if (newFaq) res.json({ message: 'FAQ added successfully' });
});

export default router;