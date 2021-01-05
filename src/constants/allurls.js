
var baseURL             =   "https://reqres.in";
var allUrlList          =   {
    "createAgent"           :   baseURL +   "/api/users",
    "agentLogin"            :   baseURL +   "/api/login",
    "getAgentDetails"       :   baseURL +   "/api/users",
    "getReportingAgentList" :   baseURL +   "/api/users?page=1",
    "createNewLead"         :   baseURL +   "/api/users"
}

var allUrls =   {
     getURL :   function(urlName){
        return allUrlList[urlName];
    }
}

module.exports = allUrls;