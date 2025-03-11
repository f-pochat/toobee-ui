import { useGetChats } from "@/hooks/use-get-chats.tsx";
import { Input } from "@/components/ui/input.tsx";
import { ReactNode, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ChatSidebarSkeleton } from "@/components/sidebar/chat-sidebar-skeleton.tsx";
import { Badge } from "@/components/ui/badge";

const parseDate = (date: string): string => {
  const now = new Date();
  const inputDate = new Date(date);

  // Normalize times to compare dates correctly
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (inputDate >= today) {
    // Message is from today, return HH:mm format
    return inputDate.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (inputDate >= yesterday) {
    // Message is from yesterday
    return "Yesterday";
  } else {
    // Message is older than yesterday, return dd/mm/yyyy
    return inputDate.toLocaleDateString("en-GB"); // "dd/mm/yyyy"
  }
};

export const ChatSidebar = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();
  const allPill = t("chats.all-pill")
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedChannels, setSelectedChannels] = useState<string[]>([allPill]);

  const chatbot_id = localStorage.getItem("active_chatbot_id");
  const { data: chats, isLoading } = useGetChats(chatbot_id ?? undefined);

  const channels = useMemo(() => {
    const uniqueChannels = new Set(chats?.map((chat) => chat.channel));
    return [allPill, ...Array.from(uniqueChannels)];
  }, [chats]);

  const handleChannelClick = (channel: string) => {
    if (channel === allPill) {
      setSelectedChannels([allPill]);
    } else {
      setSelectedChannels((prevChannels) => {
        if (prevChannels.includes(channel)) {
          const newChannels = prevChannels.filter((ch) => ch !== channel);
          return newChannels.length === 0 ? [allPill] : newChannels;
        } else {
          const newChannels = prevChannels.filter((ch) => ch !== allPill);
          return [...newChannels, channel];
        }
      });
    }
  };

  const filteredChats = useMemo(() => {
    return chats?.filter((chat) => {
      const matchesSearchTerm = chat.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesChannel =
        selectedChannels.includes(allPill) ||
        selectedChannels.includes(chat.channel);
      return matchesSearchTerm && matchesChannel;
    });
  }, [chats, searchTerm, selectedChannels]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-wrap gap-4 p-2 border-b">
        {channels.map((channel) => (
          <Badge
            key={channel}
            variant={selectedChannels.includes(channel) ? "default" : "secondary"}
            onClick={() => handleChannelClick(channel)}
            className="cursor-pointer"
          >
            {channel.toLocaleUpperCase()}
          </Badge>
        ))}
      </div>
      <div className="flex flex-row h-[calc(100vh-3rem)]">
        <div className="w-[24rem] pt-2 px-2 overflow-y-auto">
          <div className="flex flex-col gap-2">
            <Input
              placeholder={t("chats.search")}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {isLoading || !filteredChats ? (
              <ChatSidebarSkeleton />
            ) : (
              <div>
                {filteredChats.map((chat) => (
                  <a
                    href={`#${chat.id}`}
                    onClick={() => {
                      setSelectedChatId(chat.id);
                    }}
                    key={chat.id}
                    className={`flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                      chat.id === selectedChatId
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : ""
                    }`}
                  >
                    <div className="flex w-full items-center gap-2">
                      <h3 className="font-bold">{chat.name}</h3>
                      <span className="ml-auto text-xs">
                        {parseDate(chat.last_message_date)}
                      </span>
                    </div>
                    <div className="flex w-full items-center gap-2">
                      <span>{chat.phone_number}</span>
                    </div>
                    <span className="line-clamp-2 w-full whitespace-break-spaces text-xs">
                      {chat.last_message}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};