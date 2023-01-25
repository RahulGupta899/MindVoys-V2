const {REACT_APP_BACKEND_API} = process.env

export const API_EndPoints = {
    API_GET_OldestAndNewestDates:                   `${REACT_APP_BACKEND_API}/api/get-oldest-newest-dates`,
    API_GET_EmployeeList:                           `${REACT_APP_BACKEND_API}/api/get-employee-list`,
    API_POST_calls_QS_AHT_AgentCount:               `${REACT_APP_BACKEND_API}/api/get-calls-QS-AHT-AgentCount`,
    API_POST_getTranscriptionsPagination:           `${REACT_APP_BACKEND_API}/api/get-transcription-pagination`,
    API_POST_getTranscriptionsPaginationOnSearch:   `${REACT_APP_BACKEND_API}/api/get-transcription-pagination-on-search`,
    API_GET_getSingleTranscription:                 `${REACT_APP_BACKEND_API}/api/get-single-transcription`
}