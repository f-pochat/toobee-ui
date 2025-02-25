export type Chatbot = {
    id: string;
    name: string;
    system_message?: string;
    phone_number_id?: string;
    whatsapp_client_id?: string;
    whatsapp_client_secret?: string;
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

export type DataSource = {
    id: string;
    name: string;
    status: string;
    type: string;
}

export type Maintainer = {
    id: string,
    username: string;
    email: string;
    role: string;
}

export type TiendanubeConfiguration = {
    status: "CONNECTED" | "DISCONNECTED";
}