import { User } from "../../Models/User";
import { Action } from "../ActionType";

export enum Category_Types {
    SET_SELECTED_CATEGORY = "SET_SELECTED_CATEGORY"
}

export interface CategoryState {
    category: number
    categories: any[]
}

const initialState: CategoryState = {
    category: 0,
    categories:
        [{ key: 0, label: "All", categorizedName: "All" },
        { key: 1, label: "Hate", categorizedName: "Hate Comment"  },
        { key: 2, label: "Questions", categorizedName: "Question"  },
        { key: 3, label: "Comments", categorizedName: "Normal Comment"  },
        { key: 4, label: "Heartfelt Messages", categorizedName: "Heart felt comment"  }]
}

export const SelectedCategoryReducer = (state: CategoryState = initialState, action: Action): CategoryState => {
    switch (action.type) {
        case Category_Types.SET_SELECTED_CATEGORY:
            return {
                ...state,
                category: action.payload
            }
        default:
            return state
    }
};
