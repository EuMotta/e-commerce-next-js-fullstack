import Link from "next/link"
import React from "react"

export default function SideLinks() {
  return (
    <div className="card  text-2xl  py-2 px-1">
      <ul className="text-center">
        <li className="text-center"><i className="ri-admin-fill text-4xl text-blue-700"></i></li>
        <Link href="/admin/dashboard">
          <li className="primary-button !rounded-full   cursor-pointer !px-2">
            <span className="relative top-0.5"><i className="ri-dashboard-line"></i></span>
          </li>
        </Link>
        <Link href="/admin/orders">
          <li className="primary-button !rounded-full cursor-pointer !px-2">
            <span className="relative top-0.5"><i className="ri-list-unordered"></i></span>
          </li>
        </Link>
        <Link href="/admin/products">
          <li className="primary-button !rounded-full  cursor-pointer !px-2">
            <span className="relative top-0.5"> <i className="ri-shopping-bag-line "></i></span>
          </li>
        </Link>
        <Link href="/admin/users">
          <li className="primary-button !rounded-full cursor-pointer !px-2">
            <span className="relative top-0.5"> <i className="ri-user-settings-line"></i></span>
          </li>
        </Link>
      </ul>
    </div>
  );
}