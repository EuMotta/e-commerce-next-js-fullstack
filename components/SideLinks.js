import Link from "next/link";
import React from "react"

export default function SideLinks() {
    return (
        <div className="card  text-2xl py-2 px-2">
            <ul className="text-center">
                <li className="text-center"><i className="ri-admin-fill text-4xl text-blue-700"></i></li>
                <li className="primary-button !px-2">
                    <Link href="/admin/dashboard">
                        <span><i className="ri-dashboard-line"></i></span>
                    </Link>
                </li>
                <li className="primary-button !px-2">
                    <Link href="/admin/orders">
                        <span><i className="ri-list-unordered"></i></span>
                    </Link>
                </li>
                <li className="primary-button !px-2">
                    <Link href="/admin/products">
                        <span> <i className="ri-shopping-bag-line"></i></span>
                    </Link>
                </li>
                <li className="primary-button !px-2">
                    <Link href="/admin/users">
                        <span> <i className="ri-user-settings-line"></i></span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}