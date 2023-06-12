import Sidebar from "@/app/components/sidebar/Sidebar";

export default async function UserLayout ({
    children
}:{
    children: React.ReactNode;
}) {
    return(
        // @ts-ignore
        <>
            <div className="h-full">
                <Sidebar>
                    {children}
                </Sidebar>
            </div>
        </>
    )
};
