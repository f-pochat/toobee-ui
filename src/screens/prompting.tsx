import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useUpdateChatbot } from "@/hooks/use-update-chatbot.tsx";
import { useGetChatbot } from "@/hooks/use-get-chatbot.tsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import {  Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "react-toastify";

export const PromptingScreen = () => {
  const { data, isLoading } = useGetChatbot();
  const { t } = useTranslation();

  const [instructionsValue, setInstructionsValue] = useState<string>("");
  const [selectedTone, setSelectedTone] = useState("");
  const [temperature, setTemperature] = useState(50);
  const { mutateAsync: updateChatbot, isPending } = useUpdateChatbot({
    onSuccess: () => {
      toast.success(t("prompting.saved"));
    },
    onError: () => {
      toast.error(t("prompting.error"));
    },
  });

  useEffect(() => {
    if (data) {
        setInstructionsValue(data.system_message ?? "")
        setSelectedTone(data.tone ?? "")
        setTemperature(data.temperature ?? 50)
    }
}, [data]);

  return (
    <div className="flex flex-col p-10 gap-10">
      <div className="flex flex-row justify-between items-center">
        <h1>{t("sections.prompting")}</h1>
        <Button
          onClick={async () =>
            await updateChatbot({
              system_message: instructionsValue,
              temperature: Math.round(temperature),
              tone: selectedTone,
            })
          }
          disabled={
            isPending ||
            isLoading ||
            (instructionsValue == data?.system_message &&
              temperature == data?.temperature &&
              selectedTone == data?.tone)
          }
        >
          {t("common.save-changes")}
        </Button>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Label className="flex items-center gap-1">
            {t("prompting.temperature")}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-black dark:text-white opacity-70 hover:opacity-100 transition-opacity cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{t("prompting.temperature-tooltip")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>

          <div className="flex flex-col w-1/3 gap-1 items-center">
            <p className="text-sm w-2 items-center">
              {Math.round(temperature)}%
            </p>
            <Progress value={temperature} onChange={setTemperature} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label>{t("prompting.tone")}</Label>
          <Input
            value={selectedTone}
            onChange={(e) => setSelectedTone(e.target.value)}
            placeholder={t("prompting.tone-placeholder")}
            />
        </div>

        <div className="flex flex-col gap-2">
          <Label>{t("prompting.general-instructions")}</Label>
          <Textarea
            value={instructionsValue}
            placeholder={t("prompting.instructions-placeholder")}
            onChange={(val) => setInstructionsValue(val.target.value)}
            className="col-span-3 resize-none"
          />
        </div>
      </div>
    </div>
  );
};
