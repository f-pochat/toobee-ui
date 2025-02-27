import {useMemo, useState} from "react";
import { Avatar } from "@radix-ui/react-avatar";
import { useGetMaintainers } from "@/hooks/use-get-maintainers.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useAddMaintainer } from "@/hooks/use-add-maintainer.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useDeleteMaintainer } from "@/hooks/use-delete-maintainer.tsx";
import { useTranslation } from "react-i18next";
import {toast} from "react-toastify";
import {useUserInfo} from "@/hooks/use-user-info.tsx";
import {Role} from "@/types.ts";
import {
    Dialog, DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";

export const Maintainers = () => {
    const { t } = useTranslation();
    const chatbotId = localStorage.getItem("active_chatbot_id") || undefined;
    const { data: maintainers, isPending: addMaintainerIsPending  } = useGetMaintainers(chatbotId);
    const { data: userInfo } = useUserInfo();
    const [searchQuery, setSearchQuery] = useState("");
    const [username, setUsername] = useState("");
    const [selectedUser, setSelectedUser] = useState("");

    const queryClient = useQueryClient();
    const { mutateAsync: addMaintainer } = useAddMaintainer({
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ['maintainers', chatbotId] });
            setSearchQuery("");
            setUsername("");
        },
        onError: () => {
            toast.error(t('maintainers.username_not_found'));
        }
    });

    const { mutateAsync: deleteMaintainer } = useDeleteMaintainer({
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ['maintainers', localStorage.getItem("active_chatbot_id")] });
        },
        onError: () => {
            toast.error(t('maintainers.failed_to_delete'));
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
        setSelectedUser("");
    };

    const isOwner = useMemo(() => {
        return maintainers?.find((maintainer) => maintainer.role === 'owner')?.id === userInfo?.id;
    }, [maintainers, userInfo?.id]);

    const parseRole = (role: Role) => {
        return t(`maintainers.${role}`)
    }

    return (
        <Dialog>
            <div className="space-y-4">
                <div className="flex gap-4">
                    <div className="flex flex-1 items-center gap-2">
                        <Input
                            type="text"
                            placeholder={t('maintainers.username_placeholder')}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Button
                            onClick={handleInviteClick}
                            disabled={addMaintainerIsPending || !username}
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
                                    style={{backgroundColor: getRandomLightColor(userInfo.username)}}
                                >
                                    {userInfo.username[0]}
                                </Avatar>
                                <span className="text-sm font-medium">{userInfo.username}</span>
                            </td>
                            <td className="py-2 px-4 text-sm text-gray-700">{userInfo.email}</td>
                            <td className="py-2 px-4 text-sm text-gray-700">{parseRole(userInfo.role)}</td>
                            <td className="py-2 px-4 text-sm">
                                {
                                    (userInfo.role === 'maintainer' && isOwner) && (
                                        <DialogTrigger onClick={() => setSelectedUser(userInfo.id)}>
                                            <Button variant="outline" size="icon">
                                                <Trash className="w-4 h-4" color="grey"/>
                                            </Button>
                                        </DialogTrigger>
                                    )
                                }
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("common.are-you-sure")}</DialogTitle>
                    <DialogDescription>
                        {t("maintainers.delete-warning")}

                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={() => handleDeleteClick(selectedUser)}>{t("common.confirm")}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
