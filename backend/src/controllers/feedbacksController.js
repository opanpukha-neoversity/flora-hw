import * as feedbacksService from '../services/feedbacksService.js';

export async function getFeedbacks(_req, res, next) {
  try {
    const feedbacks = await feedbacksService.listFeedbacks();
    res.status(200).json(feedbacks);
  } catch (error) {
    next(error);
  }
}

export async function addFeedback(req, res, next) {
  try {
    const feedback = await feedbacksService.createFeedback(req.body);
    res.status(201).json(feedback);
  } catch (error) {
    next(error);
  }
}
