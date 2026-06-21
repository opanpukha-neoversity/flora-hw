import { env } from '../config/env.js';
import { feedbacks, rawBestsellers } from './staticData.js';

export const bestsellers = rawBestsellers.map(({ photoFile, ...item }) => ({
  ...item,
  photoURL: `${env.baseUrl}/photos/${photoFile}`,
}));

export { feedbacks };
