import {
    APPLICATIONS_SUCCESS,
    InstalledApplicationsActionResponse
} from "../../actions/device/applications";
import {JSONAPIObject, isJSONAPIErrorResponsePayload} from "../../json-api";
import {InstalledApplication} from "../../models";
import {OtherAction} from "../../actions/constants";

export interface InstalledApplicationsState {
    items?: Array<JSONAPIObject<InstalledApplication>>;
    recordCount: number;
}

const initialState: InstalledApplicationsState = {
    items: [],
    recordCount: 0
};

type InstalledCertificatesAction = InstalledApplicationsActionResponse | OtherAction;

export function installed_applications(state: InstalledApplicationsState = initialState, action: InstalledCertificatesAction): InstalledApplicationsState {
    switch (action.type) {
        case APPLICATIONS_SUCCESS:
            if (isJSONAPIErrorResponsePayload(action.payload)) {
                return state;
            } else {
                return {
                    ...state,
                    items: action.payload.data,
                    recordCount: action.payload.meta.count
                };
            }
        default:
            return state;
    }
}
