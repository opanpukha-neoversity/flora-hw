import { Feedback } from '../models/index.js';
import { feedbacks } from './staticData.js';

export async function seedFeedbacksIfNeeded() {
  const count = await Feedback.count();
  if (count > 0) return;

  await Feedback.bulkCreate(feedbacks.map(({ id, ...feedback }) => feedback));
  console.info(`Seeded ${feedbacks.length} feedbacks`);
}
