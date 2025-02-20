import {useLocation} from "@tanstack/react-router";

export const useChatId = () => {
    const location = useLocation();
    const chatId = location.hash.replace('#', ''); // if using hash for params
    return chatId;
}