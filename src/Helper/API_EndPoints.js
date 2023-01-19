const host = `http://localhost:5000/api`

export const API_EndPoints = {
    API_GET_OldestAndNewestDates:                   `${host}/get-oldest-newest-dates`,
    API_GET_EmployeeList:                           `${host}/get-employee-list`,
    API_POST_calls_QS_AHT_AgentCount:               `${host}/get-calls-QS-AHT-AgentCount`,
    API_POST_getTranscriptionsPagination:           `${host}/get-transcription-pagination`,
    API_POST_getTranscriptionsPaginationOnSearch:   `${host}/get-transcription-pagination-on-search`
}