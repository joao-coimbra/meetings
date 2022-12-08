import { useState } from "react";


const Sidebar = () => {

    const [open, setOpen] = useState(true);

    return (
        <>
            {/* Desktop */}
            <aside className="sidebar sidebar-desktop w-[200px]">
                Desktop
            </aside>

            {/* Mobile */}
            {/* <aside className={`sidebar sidebar-mobile duration-300 ${open ? 'w-64 before:w-screen before:absolute before:h-screen before:bg-black before:top-0 before:right-0' : 'w-0'}`}>Mobile</aside> */}
        </>
    )
}

export default Sidebar;