import { useState } from "react";
import { Avatar } from "@radix-ui/react-avatar";
import { useGetMaintainers } from "@/hooks/use-get-maintainers.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useAddMaintainer } from "@/hooks/use-add-maintainer.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useDeleteMaintainer } from "@/hooks/use-delete-maintainer.tsx";
import { useTranslation } from "react-i18next";

export const Maintainers = () => {
    const { t } = useTranslation();
    const chatbotId = localStorage.getItem("active_chatbot_id") || undefined;
    const { data: maintainers } = useGetMaintainers(chatbotId);
    const [searchQuery, setSearchQuery] = useState("");
    const [username, setUsername] = useState("");

    const queryClient = useQueryClient();
    const { mutateAsync: addMaintainer, isPending: addMaintainerIsLoading } = useAddMaintainer({
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ['maintainers', chatbotId] });
            setSearchQuery("");
            setUsername("");
        },
        onError: () => {
            alert(t('maintainers.username_not_found'));
        }
    });

    const { mutateAsync: deleteMaintainer } = useDeleteMaintainer({
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ['maintainers', localStorage.getItem("active_chatbot_id")] });
        },
        onError: () => {
            alert(t('maintainers.failed_to_delete'));
        }
    });

    const getRandomLightColor = (username: string) => {
        const colors = ["#A8E6A1", "#A2D8FF", "#D9A8FF"];
        return colors[username.charCodeAt(1) % colors.length];
    };

    const filteredMaintainers = maintainers?.filter((userInfo) =>
        userInfo?.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleInviteClick = async () => {
        await addMaintainer({ username });
    };

    const handleDeleteClick = async (userId: string) => {
        await deleteMaintainer({ userId, chatbotId: localStorage.getItem('active_chatbot_id') || '' });
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <Input
                    type="text"
                    placeholder={t("maintainers.search_placeholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                />
                <div className="flex flex-1 items-center gap-2">
                    <Input
                        type="text"
                        placeholder={t('maintainers.username_placeholder')}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Button
                        onClick={handleInviteClick}
                        disabled={addMaintainerIsLoading || !username}
                    >
                        {t('maintainers.invite_button')}
                    </Button>
                </div>
            </div>
            <table className="min-w-full table-auto">
                <tbody>
                {filteredMaintainers?.map((userInfo) => (
                    <tr key={userInfo.id} className="border-b">
                        <td className="py-2 px-4 flex items-center gap-2">
                            <Avatar
                                className="flex aspect-square size-8 items-center justify-center rounded-lg"
                                style={{ backgroundColor: getRandomLightColor(userInfo.username) }}
                            >
                                {userInfo.username[0]}
                            </Avatar>
                            <span className="text-sm font-medium">{userInfo.username}</span>
                        </td>
                        <td className="py-2 px-4 text-sm text-gray-700">{userInfo.email}</td>
                        <td className="py-2 px-4 text-sm text-gray-700">{userInfo.role}</td>
                        <td className="py-2 px-4 text-sm">
                            {
                                userInfo.role === 'maintainer' && (
                                    <Button variant="outline" size="icon" onClick={() => handleDeleteClick(userInfo.id)}>
                                        <Trash className="w-4 h-4" color="grey" />
                                    </Button>
                                )
                            }
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
