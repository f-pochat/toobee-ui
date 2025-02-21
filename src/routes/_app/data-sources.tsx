import {createFileRoute} from '@tanstack/react-router'
import {DataSourceScreen} from "@/screens/data-sources.tsx";

export const Route = createFileRoute('/_app/data-sources')({
    component: dataSource,
})

function dataSource() {
    return (
        <DataSourceScreen/>
    )
}