import { Route, Routes } from "react-router-dom";
import Dashboard from './Dashboard'
import { BackendProvider } from "../stores/BackendContext";
// import { useRequireAuth } from "@/hooks/useAuth";


export const TaskRoutes = () => {
    // useRequireAuth();
    return(
        <BackendProvider>
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        </BackendProvider>
    )
}