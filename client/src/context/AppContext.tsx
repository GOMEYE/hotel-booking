import { createContext } from "react";
import type { AppContextType } from "../interfaces/appcontextType";

const AppContext = createContext<AppContextType | null>(null);

export default AppContext;
