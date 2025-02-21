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

const formSchema = z.object({
    username: z.string(),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
})

export const LoginScreen = () => {
    const navigate = useNavigate()
    const {isAuthenticated} = useIsAuthenticated()

    const {mutateAsync: login} = useLogin({
        onSuccess: async () => {
            await navigate({
                to: '/chats'
            })
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
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email and password to login to your account.
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
                                                <FormLabel htmlFor="username">Username</FormLabel>
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
                                                <FormLabel htmlFor="password">Password</FormLabel>
                                            </div>
                                            <FormControl>
                                                <Input
                                                    id="password"
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
                                    Login
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}