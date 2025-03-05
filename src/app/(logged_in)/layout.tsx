export default function LoggedInLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <main className="flex h-screen bg-gdg-white-light">{children}</main>
        </div>
    );
}
