export const useLogout = () => {
    const logout = () => {
        localStorage.removeItem("active_chatbot_id");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_id");
    };
    return {logout}
};
