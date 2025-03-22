import {Hono} from 'hono';
import {listFeebacks , getFeedbacks, createFeedbacks,  updateFeedbacks, deleteFeedbacks} from './feedbackfeedbackreports.Controller'

export const feedbackRouter = new Hono();

feedbackRouter.get('/feedback_reports', listFeebacks )

.get('/feedback_reports/:id', getFeedbacks)

.post('/feedback_reports', createFeedbacks)

.put('/feedback_reports/:id', updateFeedbacks)

.delete('/feedback_reports/:id', deleteFeedbacks);
