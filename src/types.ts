export type Chatbot = {
    id: string;
    name: string;
}

export type Chat = {
    id: string;
    phone_number: string;
    name: string;
    last_message_date: string;
    last_message: string;
}

export type UserInfo = {
    id: string;
    name: string;
    email: string;
}

export type ChatWithMessages = {
    id: string,
    phone_number: string;
    name: string;
    ai_response: boolean;
    messages: ChatMessage[];
}

type ChatMessage = {
    id: string;
    content: string;
    role: "customer" | "assistant" | "manual"
    created_at: Date;
}
