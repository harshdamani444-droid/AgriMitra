// jobs/invoiceQueue.js
import { Queue } from 'bullmq';
import redisClient from '../utils/redisClient.js';
const invoiceQueue = new Queue('invoiceQueue', { connection: redisClient });

export {
    invoiceQueue
}
