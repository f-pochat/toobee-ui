import {useLocation} from "@tanstack/react-router";

export const useChatId = () => {
    const location = useLocation();
     // if using hash for params
    return location.hash.replace('#', '');
}