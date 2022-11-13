import Link from "next/link"
import React from "react"
import { FcConferenceCall } from 'react-icons/fc'
import { FcTodoList } from 'react-icons/fc'
import { FcPaid } from 'react-icons/fc'
import { FcComboChart } from 'react-icons/fc'
import { FcBusinessman } from 'react-icons/fc'

export default function SideLinks() {
  return (
    <div className="card  text-2xl  py-2 px-1">
      <ul className="text-center">
      <Link href="/admin/adminProfile">
      <li className="admin-button !rounded-md hover:scale-100 cursor-pointer !px-2 !pb-3 !py-1" title="Painel do Administrador">
            <span className="relative top-0.5"> <FcBusinessman className="text-3xl"/></span>
          </li>
          </Link>
        <hr className="mt-3"/>
        <Link href="/admin/dashboard">
          <li className="admin-button !rounded-md   cursor-pointer !px-2 !pb-3 !py-1" title="Dashboard">
            <span className="relative top-0.5"><FcComboChart className="text-3xl"/></span>
          </li>
        </Link>
        
        <Link href="/admin/orders">
          <li className="admin-button !rounded-md cursor-pointer !px-2 !pb-3 !py-1" title="Pedidos">
            <span className="relative top-0.5"><FcTodoList className="text-3xl"/></span>
          </li>
        </Link>
        <Link href="/admin/products">
          <li className="admin-button !rounded-md  cursor-pointer !px-2 !pb-3 !py-1" title="Produtos">
            <span className="relative top-0.5"> <FcPaid className="text-3xl"/></span>
          </li>
        </Link>
        <Link href="/admin/users">
          <li className="admin-button !rounded-md cursor-pointer !px-2 !pb-3 !py-1" title="Usuários">
            <span className="relative top-0.5"> <FcConferenceCall className="text-3xl"/></span>
          </li>
        </Link>
      </ul>
    </div>
  );
}