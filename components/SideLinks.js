import Link from "next/link"
import React from "react"
import { FcComboChart,FcBusinessman,FcPaid,FcTodoList,FcConferenceCall } from 'react-icons/fc'
import { AiOutlineFileSearch } from 'react-icons/ai'

export default function SideLinks() {
  return (
    <div className="card  text-2xl  py-2 px-1">
      <ul className="text-center">
        <Link href="/admin/adminProfile">
          <li className="admin-button !rounded-md hover:scale-100 cursor-pointer !px-2 !pb-3 !py-1" data-tip="Painel do Administrador">
            <span className="relative top-0.5"> <FcBusinessman className="text-3xl" /></span>
          </li>
        </Link>
        <Link href="/admin/informationSearch">
          <li className="admin-button !rounded-md hover:scale-100 cursor-pointer !px-2 !pb-3 !py-1" data-tip="Pesquisar">
            <span className="relative top-0.5"> <AiOutlineFileSearch className="text-3xl" /></span>
          </li>
        </Link>
        <hr className="mt-3" />
        <Link href="/admin/dashboard">
          <li className="admin-button !rounded-md   cursor-pointer !px-2 !pb-3 !py-1" data-tip="Dashboard">
            <span className="relative top-0.5"><FcComboChart className="text-3xl" /></span>
          </li>
        </Link>
        <Link href="/admin/orders">
          <li className="admin-button !rounded-md cursor-pointer !px-2 !pb-3 !py-1" data-tip="Pedidos">
            <span className="relative top-0.5"><FcTodoList className="text-3xl" /></span>
          </li>
        </Link>
        <Link href="/admin/products">
          <li className="admin-button !rounded-md  cursor-pointer !px-2 !pb-3 !py-1" data-tip="Produtos">
            <span className="relative top-0.5"> <FcPaid className="text-3xl" /></span>
          </li>
        </Link>
        <Link href="/admin/users">
          <li className="admin-button !rounded-md cursor-pointer !px-2 !pb-3 !py-1" data-tip='Usuários'>
            <span className="relative top-0.5"> <FcConferenceCall className="text-3xl" /></span>
          </li>
        </Link>
      </ul> 
    </div>
  );
}