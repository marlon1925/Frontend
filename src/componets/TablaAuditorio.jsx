import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react';
import Mensaje from "./Alertas/Mensaje";
import { Link, useNavigate } from "react-router-dom";
import { format, parseISO, isValid, parse } from 'date-fns';
import {
    useTable,
    useFilters,
    useGlobalFilter,
    usePagination,
} from "react-table";
import { FaTrashAlt, FaEdit, FaFolderOpen, FaClock, FaAngleRight, FaAngleDoubleRight, FaAngleLeft, FaAngleDoubleLeft } from "react-icons/fa";


const TablaAuditorio = () => {
    const navigate = useNavigate();
    const [auditorio, setAuditorio] = useState([]);
    const [noMorePages, setNoMorePages] = useState(false);
    const [filtroTiempo, setFiltroTiempo] = useState("today");
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(""); // Declaración de fechaSeleccionada
    const [resultadosEncontrados, setResultadosEncontrados] = useState(true);


    const listarAuditorio = async () => {
        try {
            const token = localStorage.getItem("token");
            const url = `${import.meta.env.VITE_BACKEND_URL}/auditorios`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.get(url, options);
            const data = respuesta.data;
            console.log(data)

            if (data.length === 0) {
                setNoMorePages(true);
            } else {
                setNoMorePages(false);
            }

            setAuditorio(data);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        listarAuditorio();
    }, [resultadosEncontrados, setResultadosEncontrados]);

    const handleDelete = async (id) => {
        try {
            const confirmar = window.confirm(
                "You are going to check out a patient, are you sure to perform this action?"
            );
            if (confirmar) {
                const token = localStorage.getItem("token");
                const url = `${import.meta.env.VITE_BACKEND_URL
                    }/clientes/eliminar/${id}`;
                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                };
                const data = {
                    salida: new Date().toString(),
                };
                await axios.delete(url, { headers, data });
                listarAuditorio();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const data = React.useMemo(() => auditorio, [auditorio]);
    const columns = React.useMemo(
        () => [
            {
                Header: "N°",
                accessor: (row, index) => index + 1,
                // Puedes utilizar un accessor personalizado para la numeración
            },
            {
                Header: "Codigo",
                accessor: "codigo",
            },
            {
                Header: "Nombre",
                accessor: "nombre",
            },
            {
                Header: "Ubicación",
                accessor: "ubicacion",
            },
            {
                Header: "Capacidad",
                accessor: "capacidad",
            },
            {
                Header: "Descripción",
                accessor: "descripcion",
            },
            {
                Header: "Acciones",
                accessor: "acciones",
                Cell: ({ row }) => (
                    <div className="py-2 text-center">
                        {/* Reemplaza MdDeleteForever con FaTrashAlt */}
                        <FaEdit
                            className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                            onClick={() =>
                                navigate(`/dashboard/actualizar/auditorio/${row.original._id}`)
                            }
                        />
                        <FaTrashAlt
                            className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                            onClick={() => {
                                handleDelete(row.original._id);
                            }}
                        />
                    </div>
                ),
            },
        ],
        []
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        setGlobalFilter,
        state: { globalFilter, pageIndex, pageSize },
        page,
        gotoPage,
        setPageSize,
        previousPage,
        canPreviousPage,
        canNextPage,
        pageCount,
        nextPage
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 5, defaultCanSort: true }, // Agrega defaultCanSort
        },
        useFilters,
        useGlobalFilter,
        usePagination
    );


    return (

        <div className="mt-4">
            <div className="flex justify-end">
                <Link to="/dashboard/formularioAuditorio" className="bg-blue-500 px-4 py-2 text-white rounded">Crear nuevo auditorio</Link>
            </div>

            {auditorio.length === 0 ? (
                <Mensaje tipo={"active"}>{"No records"}</Mensaje>

            ) : (
                <>

                    <div className="flex justify-between items-center mb-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={globalFilter || ""}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                                placeholder="Search by owner's name..."
                                className="w-full px-4 py-2 border rounded-md pr-10 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300"
                            />
                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <svg
                                    className="w-4 h-4 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-5.2-5.2"
                                    />
                                    <circle cx="10" cy="10" r="7" />
                                </svg>
                            </span>
                        </div>
                    </div>

           
                    {resultadosEncontrados ? (

                        <table {...getTableProps()} className="w-full mt-5 table-auto shadow-lg bg-white">
                            <thead className="bg-gray-800 text-slate-400">
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderProps()} className="p-2">
                                                {column.render("Header")}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {page.map((row) => {
                                    prepareRow(row);
                                    const { original } = row;
                                    return (
                                        <tr {...row.getRowProps()} className="border-b hover:bg-gray-300 text-center" key={original._id}>
                                            {row.cells.map((cell) => {
                                                const { render, getCellProps } = cell;
                                                return <td {...getCellProps()}>{render("Cell")}</td>;
                                            })}
                                        </tr>
                                    );
                                })}

                            </tbody>
                        </table>
                    ) : (
                        <Mensaje tipo={"activ"}>{"No records"}</Mensaje>
                    )}
                    <div className="pagination flex items-center justify-center mt-4">
                        <button
                            className="px-3 py-1 border rounded-md mr-2 hover:bg-gray-400 hover:text-white bg-gray-800 text-slate-400"
                            onClick={() => gotoPage(0)}
                            disabled={!canPreviousPage}
                        >
                            {<FaAngleDoubleLeft />}
                        </button>{" "}
                        <button
                            className="px-3 py-1 border rounded-md hover:bg-gray-400 hover:text-white bg-gray-800 text-slate-400"
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                        >
                            {<FaAngleLeft />}
                        </button>{" "}


                        <span className="mr-2">
                            {" | "}
                            {Array.from({ length: pageCount }).map((_, page) => (
                                <button
                                    key={page}
                                    onClick={() => gotoPage(page)}
                                    className={`px-3 py-1 border rounded-md mr-2 hover:bg-gray-400 hover:text-white ${pageIndex === page ? "bg-gray-800 text-slate-400" : ""
                                        }`}
                                >
                                    {page + 1}
                                </button>
                            ))}
                        </span>


                        <select
                            className="px-2 py-1 border rounded-md mr-2"
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                            }}
                        >
                            {[1, 5, 10, 15, 20].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                        <button
                            className="px-3 py-1 border rounded-md hover:bg-gray-400 hover:text-white bg-gray-800 text-slate-400"
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                        >
                            {<FaAngleRight />}
                        </button>{" "}
                        <button
                            className="px-3 py-1 border rounded-md hover:bg-gray-400 hover:text-white bg-gray-800 text-slate-400"
                            onClick={() => gotoPage(pageCount - 1)}
                            disabled={!canNextPage}
                        >
                            {<FaAngleDoubleRight />}
                        </button>{" "}
                    </div>
                    <span className="mr-2">
                        <strong>Page</strong>{" "}
                        <strong>
                            {pageIndex + 1} de {pageCount}
                        </strong>
                    </span>

                </>
            )}
        </div>
    );
};

export default TablaAuditorio;
