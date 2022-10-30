import Link from "next/link"
import React from "react"
import { FaUsers } from 'react-icons/fa'
import { FaClipboardList } from 'react-icons/fa'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { MdDashboardCustomize } from 'react-icons/md'

export default function SideLinks() {
  return (
    <div className="card  text-2xl  py-2 px-1">
      <ul className="text-center">
        <li className="text-center cursor-pointer hover:bg-slate-800 hover:text-indigo-600  transition-all !rounded-md shadow-sm  shadow-slate-300"><i className="ri-admin-fill  text-3xl"></i></li>
        <hr className="mt-3"/>
        <Link href="/admin/dashboard">
          <li className="primary-button !rounded-full   cursor-pointer !px-2 !pb-3 !py-2">
            <span className="relative top-0.5"><MdDashboardCustomize/></span>
          </li>
        </Link>
        
        <Link href="/admin/orders">
          <li className="primary-button !rounded-full cursor-pointer !px-2 !pb-3 !py-2">
            <span className="relative top-0.5"><FaClipboardList/></span>
          </li>
        </Link>
        <Link href="/admin/products">
          <li className="primary-button !rounded-full  cursor-pointer !px-2 !pb-3 !py-2">
            <span className="relative top-0.5"> <BsFillBagCheckFill/></span>
          </li>
        </Link>
        <Link href="/admin/users">
          <li className="primary-button !rounded-full cursor-pointer !px-2 !pb-3 !py-2">
            <span className="relative top-0.5"> <FaUsers/></span>
          </li>
        </Link>
      </ul>
    </div>
  );
}