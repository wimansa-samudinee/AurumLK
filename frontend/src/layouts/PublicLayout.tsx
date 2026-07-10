import { Outlet } from "react-router-dom";

export default function PublicLayout() {
    return (
        <div>
            <header>Navbar</header>

            <main>
                <Outlet />
            </main>

            <footer>Footer</footer>
        </div>
    );
}