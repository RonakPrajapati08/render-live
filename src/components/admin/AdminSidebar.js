import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    BsHouse,
    BsPeople,
    BsChatDots,
    BsGear,
    BsBoxArrowRight,
    BsList,
    BsX,
} from "react-icons/bs";

const AdminSidebar = ({ onLogout, activeTab, setActiveTab }) => {
    const [isOpen, setIsOpen] = useState(window.innerWidth >= 992);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 992;
            setIsMobile(mobile);
            setIsOpen(!mobile); // auto open for desktop, closed for mobile
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: <BsHouse size={18} /> },
        { id: "users", label: "Manage Users", icon: <BsPeople size={18} /> },
        { id: "messages", label: "Messages", icon: <BsChatDots size={18} /> },
        { id: "settings", label: "Settings", icon: <BsGear size={18} /> },
    ];

    return (
        <>
            {/* 🔹 Toggle Button */}
            {isMobile && (
                <button
                    className="btn btn-primary position-fixed top-0 end-0 m-3"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        zIndex: 2001,
                        borderRadius: "8px",
                        padding: "6px 10px",
                    }}
                >
                    {isOpen ? <BsX size={22} /> : <BsList size={22} />}
                </button>
            )}

            {/* 🔹 Sidebar */}
            <div
                className={`bg-dark text-light d-flex flex-column shadow-lg ${isOpen ? "p-3" : "p-0"
                    }`}
                style={{
                    width: isOpen ? "240px" : "0px",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    overflow: "hidden",
                    transition: "width 0.3s ease-in-out, padding 0.3s ease-in-out",
                    zIndex: 2000,
                }}
            >

                <div
                    className="d-flex justify-content-between align-items-center mb-4"
                    style={{
                        opacity: isOpen ? 1 : 0,
                        transition: "opacity 0.2s ease-in-out",
                    }}
                >
                    <h4 className="fw-bold text-primary m-0">Admin</h4>
                </div>

                <ul className="nav nav-pills flex-column mb-auto">
                    {menuItems.map((item) => (
                        <li
                            key={item.id}
                            className={`nav-item mb-2 ${activeTab === item.id ? "bg-primary rounded-3" : ""
                                }`}
                        >
                            <button
                                onClick={() => {
                                    setActiveTab(item.id);
                                    if (isMobile) setIsOpen(false);
                                }}
                                className={`btn w-100 text-start text-light d-flex align-items-center gap-2 ${activeTab === item.id ? "fw-bold" : ""
                                    }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="mt-auto">
                    <button
                        className="btn btn-outline-danger w-100 d-flex align-items-center gap-2 justify-content-center"
                        onClick={onLogout}
                    >
                        <BsBoxArrowRight size={18} /> Logout
                    </button>
                </div>
            </div>

            {/* 🔹 Overlay when sidebar open on mobile */}
            {isMobile && isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 1500,
                    }}
                ></div>
            )}
        </>
    );
};

export default AdminSidebar;
