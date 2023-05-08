using CourseManagement.Core.Entities;
using CourseManagement.Core.Interfaces.Infrastructure;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Infrastructure.Repository
{
    public class AuthenticationRepository : IAuthenticationRepository
    {
        IConfiguration _configuration;
        SqlConnection _SqlServerConnection;

        public AuthenticationRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Account GetAccount(string username, string password)
        {
            using (_SqlServerConnection = new SqlConnection(_configuration.GetConnectionString("NGOCNAM")))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Username", username);
                parameters.Add("@Password", password);

                var account = _SqlServerConnection.QueryFirstOrDefault<Account>("Proc_GetAccountByUsernamePassword", param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return account;
            }
        }
    }
}
