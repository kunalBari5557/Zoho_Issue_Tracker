import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/loginAuth";
import rolesSlice from "./features/roles";
import issuesSlice from "./features/issue";
import projectsSlice from "./features/projects";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        roles: rolesSlice,
        issue: issuesSlice,
        projectsState: projectsSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;