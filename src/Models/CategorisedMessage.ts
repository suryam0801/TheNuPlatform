import React from 'react'
import { ChatMessage } from './ChatMessage'

export type CategorisedMessage = {
    Category: string
    Messages: ChatMessage[]
}