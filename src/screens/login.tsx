import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {useLogin} from "@/hooks/use-login.tsx";
import {useNavigate} from "@tanstack/react-router";
import {useIsAuthenticated} from "@/hooks/use-is-authenticated.tsx";
import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";

const formSchema = z.object({
    username: z.string(),
    password: z.string()
})

export const LoginScreen = () => {
    const navigate = useNavigate();
    const {isAuthenticated} = useIsAuthenticated();
    const {t} = useTranslation();

    const {mutateAsync: login} = useLogin({
        onSuccess: async (d) => {
            localStorage.setItem("access_token", d.access);
            localStorage.setItem("refresh_token", d.refresh);
            await navigate({
                to: '/chats'
            })
        },
        onError: (e) => {
            toast.error(e.status == 401 ? t("auth.incorrect-credentials"): t("common.error-occurred"));
        }
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        return login({username: values.username, password: values.password})
    }

    if (isAuthenticated) {
        navigate({
            to: '/chats'
        })
    }

    return (
        <div className="flex flex-col min-h-[50vh] h-full w-full items-center justify-center px-4">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">{t("auth.login")}</CardTitle>
                    <CardDescription>
                        {t("auth.message")}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid gap-4">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({field}) => (
                                        <FormItem className="grid">
                                            <div className="flex items-center">
                                                <FormLabel htmlFor="username">{t("auth.username")}</FormLabel>
                                            </div>
                                            <FormControl>
                                                <Input
                                                    id="username"
                                                    placeholder="johndoe"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem className="grid">
                                            <div className="flex justify-between items-center">
                                                <FormLabel htmlFor="password">{t("auth.password")}</FormLabel>
                                            </div>
                                            <FormControl>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    placeholder="******"
                                                    autoComplete="current-password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">
                                    {t("auth.login")}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}