import './App.css'
import MaInPage from "./page/MaInPage.tsx";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";

function App() {
    const queryClient = new QueryClient()

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <MaInPage />
            </QueryClientProvider>
        </Provider>
    )
}

export default App;
