import { Metadata } from "next";
import Sidebar from "./ui/sidebar";
import PageWrapper from "@/components/page-wrapper";

export const metadata: Metadata = {
    title: "Login | Quackfy",
    description: "Awesome TailwindCSS templates for your next project",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <PageWrapper className="flex flex-col md:flex-row">
            <Sidebar />
            {children}
        </PageWrapper>
    );
}