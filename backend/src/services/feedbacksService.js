import { Feedback } from '../models/index.js';

function serializeFeedback(feedback) {
  return feedback.toJSON ? feedback.toJSON() : feedback;
}

export async function listFeedbacks() {
  const feedbacks = await Feedback.findAll({ order: [['id', 'ASC']] });
  return feedbacks.map(serializeFeedback);
}

export async function createFeedback(data) {
  const feedback = await Feedback.create(data);
  return serializeFeedback(feedback);
}
