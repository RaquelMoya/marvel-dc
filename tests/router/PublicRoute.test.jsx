import { PublicRoute } from "../../src/router/PublicRoute";
import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth/context/AuthContext";
import { MemoryRouter, Routes, Route } from "react-router-dom";


describe("Pruebas en PublicRoute", () => {

    test ("debe de mostrar el componente si no está autenticado y guardar en localStorage", () => {
            
        const contextValue = {
            logged: false,
        }

        
        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Listo</h1>
                </PublicRoute>
            </AuthContext.Provider>
        )
        expect( screen.getByText("Listo") ).toBeTruthy();
        })
    test ("debe de navegar si está autenticado", () => {
        const contextValue = {
            logged: true,           
            user: {
                name: "Juan",
                id: '123'
            },
        }
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={["/login"]}>
                    <Routes>
                        <Route path='login' element={
                            <PublicRoute>
                                <h1>Listo</h1>
                            </PublicRoute>
                        }/>
                        <Route path="/marvel" element={<h1>Marvel</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        )
        expect( screen.getByText("Marvel") ).toBeTruthy();
                
        })
})