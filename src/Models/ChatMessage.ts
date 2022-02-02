import react from 'react';
import { ReplyTo } from './Reply';

export type ChatMessage = {
    _id: string
    Message: string
    InfluencerId: string
    SentBy: string //since its anonymous messages, do we need this?
    Date: Date
    ReplyTo?: ReplyTo
    Category?: string
};