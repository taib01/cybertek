using System;

namespace API.Errors
{
    public class ApiResponse
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public ApiResponse(int statusCode, string message =null)
        {
            this.StatusCode = statusCode;
            this.Message = message ?? GetDefaultMessageForStatusCode(statusCode);

        }

        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch 
            {
                400 =>"A bad reques , you have mad ",
                401 =>"Authorized, you are not   ", 
                404 =>"Resource found , it was not" ,
                500 =>"Errors in the path ",
                _=> null
            };
        }
    }
}