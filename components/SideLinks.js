import Link from "next/link";
import React from "react"

export default function SideLinks() {
    return (
        <div className="card md:col-span-1 text-2xl py-5 px-4">
            <ul className="text-center">
                <li className="text-center"><i className="ri-admin-fill text-4xl text-blue-700"></i></li>
                <li className="card p-2 hover:bg-blue-100">
                    <Link href="/admin/dashboard">
                        <span><i className="ri-dashboard-line"></i></span>
                    </Link>
                </li>
                <li className="card !bg-blue-700 p-2">
                    <Link href="/admin/orders">
                        <span><i className="ri-list-unordered"></i></span>
                    </Link>
                </li>
                <li className="card p-2 hover:bg-blue-100">
                    <Link href="/admin/products">
                        <span> <i className="ri-user-settings-line"></i></span>
                    </Link>
                </li>
                <li className="card p-2 hover:bg-blue-100">
                    <Link href="/admin/users">
                        <span> <i className="ri-user-settings-line"></i></span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}