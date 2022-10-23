
import axios from "axios"
import { getError } from "../../utils/error"
import Layout from "../../components/Layout"
import Link from "next/link"
import React, { useEffect, useReducer } from "react"
import { toast } from "react-toastify"

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" }
    case "FETCH_SUCCESS":
      return { ...state, loading: false, users: action.payload, error: "" }
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload }
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true }
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true }
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false }
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false }
    default:
      return state
  }
}

function AdminUsersScreen() {
  const [{ loading, error, users, successDelete, loadingDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      users: [],
      error: "",
    })

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" })
        const { data } = await axios.get(`/api/admin/users`)
        dispatch({ type: "FETCH_SUCCESS", payload: data })
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) })
      }
    }
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" })
    } else {
      fetchData()
    }
  }, [successDelete])

  const deleteHandler = async (userId) => {
    if (!window.confirm("Você tem certeza?")) {
      return
    }
    try {
      dispatch({ type: "DELETE_REQUEST" })
      await axios.delete(`/api/admin/users/${userId}`)
      dispatch({ type: "DELETE_SUCCESS" })
      toast.success("Usuario deletado.")
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" })
      toast.error(getError(err))
    }
  }

  return (
    <Layout title="Usuários">
      <div className="grid md:grid-cols-6 md:gap-5">
        <div className="overflow-x-auto md:col-span-6">
          <h1 className="mb-4 grid-cols-1 text-center text-indigo-600 text-3xl ">
            Usuários cadastrados
          </h1>
          {loadingDelete && <div>Deletando...</div>}
          {loading ? (
            <div>Carregando...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="flex mb-5 justify-center">
              <table className="w-full mx-2">
                <thead className="border-b-8  border-2 border-b-indigo-500">
                  <tr className="text-sm text-slate-800">
                    <th className="p-5 text-center">ID</th>
                    <th className="p-5 text-center">Nome</th>
                    <th className="p-5 text-center">Sobrenome</th>
                    <th className="p-5 text-center">E-mail</th>
                    <th className="p-5 text-center">Status</th>
                    <th className="p-5 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="rounded text-md shadow-sm shadow-slate-500 hover:translate-x-1 ease-in-out transition-all  hover:shadow-md hover:shadow-slate-700"
                    >
                      <td className="p-5">{user._id.substring(20, 24)}</td>
                      <td className="p-5">{user.name}</td>
                      <td className="p-5">{user.lastName}</td>
                      <td className="p-5">{user.email}</td>
                      <td className="p-5">{user.isAdmin ? "Adm" : "Comum"}</td>
                      <td className="p-5">
                        <Link href={`/admin/user/${user._id}`} passHref>
                          <button className="cursor-pointer">
                          <i className="ri-pencil-line text-lg"></i>
                          </button>
                        </Link>
                        &nbsp;
                        <button
                          type="button"
                          className="cursor-pointer  !bg-red-400"
                          onClick={() => deleteHandler(user._id)}
                        >
                          <i className="ri-delete-bin-2-line text-lg"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

AdminUsersScreen.auth = { adminOnly: true }
export default AdminUsersScreen
