import { Category_Types } from "../Reducers/SelectedCategoryReducer";

export function SetCategoryAction(category: number | null) {
    return {
        type: Category_Types.SET_SELECTED_CATEGORY,
        payload: category
    };
}