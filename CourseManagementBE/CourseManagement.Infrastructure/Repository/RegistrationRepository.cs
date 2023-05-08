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
using static Dapper.SqlMapper;

namespace CourseManagement.Infrastructure.Repository
{
    public class RegistrationRepository:BaseRepository<Registration>, IRegistrationRepository
    {
        public RegistrationRepository(IConfiguration configuration):base(configuration) { }

 

        public IEnumerable<Registration> GetByCourseID(string courseID)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("NGOCNAM")))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add($"CourseID", courseID);
                var entities = SqlServerConnection.Query<Registration>($"Proc_GetRegistrationByCourseID", param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return entities;
            }
        }

        public object GetMemberOfCourse(string courseID)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("NGOCNAM")))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add($"CourseID", courseID);
                var entities = SqlServerConnection.Query<Registration>($"Proc_GetMemberOfCourse", param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return entities;
            }
        }

        public int Insert(Registration registration)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("NGOCNAM")))
            {
                var sqlComand = "Proc_InsertRegistration";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CourseID", registration.CourseID);
                parameters.Add("@EmployeeID", registration.EmployeeID);
                parameters.Add("@Status", registration.Status);
                //parameters.Add("@RegistrationDate", registration.RegistrationDate);

                var rowEffect = SqlServerConnection.Execute(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return rowEffect;
            }
        }

        public string IsDuplicated(string employeeID, string courseID)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("NGOCNAM")))
            {
                var sqlComand = "Proc_GetRegistrationByID";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@EmployeeID", employeeID);
                parameters.Add("@CourseID", courseID);
                var result = SqlServerConnection.QueryFirstOrDefault<string>(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return result;
            }
        }

        public int Update(Registration registration)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("NGOCNAM")))
            {
                var sqlComand = "Proc_Registration_Approve";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CourseID", registration.CourseID);
                parameters.Add("@EmployeeID", registration.EmployeeID);
                parameters.Add("@Status", registration.Status);

                var rowEffect = SqlServerConnection.Execute(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return rowEffect;
            }
        }

    }
}
