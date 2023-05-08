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
    public class ResultRepository : BaseRepository<Result>, IResultRepository
    {
        public ResultRepository(IConfiguration configuration) : base (configuration)
        {
        }

        public IEnumerable<Course> GetPaging(int pageSize, int pageIndex)
        {
            throw new NotImplementedException();
        }

        public object GetResultByCourseID(string courseID)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("NGOCNAM")))
            {
                var sqlComand = "Proc_GetResultByCourseID";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CourseID", courseID);
                var result = SqlServerConnection.Query<object>(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return result;
            }
        }

        public object GetResultByEmployeeID(string employeeID)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("NGOCNAM")))
            {
                var sqlComand = "Proc_GetResultByEmployeeID";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@EmployeeID", employeeID);
                var result = SqlServerConnection.Query<object>(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return result;
            }
        }

        public int Update(Result result)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("NGOCNAM")))
            {
                var sqlComand = "Proc_UpdateResult";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@EmployeeID", result.EmployeeID);
                parameters.Add("@CourseID", result.CourseID);
                parameters.Add("@Score", result.Score);
                parameters.Add("@Note", result.Note);
                var rowEffect = SqlServerConnection.Execute(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return rowEffect;
            }
        }

        IEnumerable<Result> IResultRepository.GetPaging(int pageSize, int pageIndex)
        {
            throw new NotImplementedException();
        }
    }
}
