using CourseManagement.Core.Interfaces.Infrastructure;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseManagement.Infrastructure.Repository
{
    /// <summary>
    /// 
    /// </summary>
    /// <typeparam name="Entity"></typeparam>
    public class BaseRepository<Entity> : IBaseRepository<Entity> where Entity : class
    {

        protected readonly IConfiguration Configuration;
        protected SqlConnection SqlServerConnection;
        string _class;

        public BaseRepository(IConfiguration configuration)
        {
            Configuration = configuration;
            _class = typeof(Entity).Name;
        }

        public IEnumerable<Entity> GetAll()
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("NGOCNAM")))
            {
                //Tạo biến result lưu trữ kết quả sau khi querry
                var entities = SqlServerConnection.Query<Entity>($"Proc_GetAll{_class}", commandType: System.Data.CommandType.StoredProcedure);
                //Trả kết quả
                return entities;
            }
        }

        public Entity GetByID(string ID)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("NGOCNAM")))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add($"{_class}ID", ID);
                var entity = SqlServerConnection.QueryFirstOrDefault<Entity>($"Proc_Get{_class}ByID", param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return entity;
            }
        }

        public object GetSearchAndPaging(int? pageSize, int? pageNumber, string? filter)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("NGOCNAM")))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@KeyFilter", filter);
                parameters.Add("@PageSize", pageSize);
                parameters.Add("@PageIndex", pageNumber);
                parameters.Add("@TotalPage", DbType.Int32, direction: ParameterDirection.Output);
                parameters.Add("@TotalRecord", DbType.Int32, direction: ParameterDirection.Output);
                var Data = SqlServerConnection.Query<Entity>($"Proc_{_class}Filter", param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                var TotalPage = parameters.Get<int>("@TotalPage");
                var TotalRecord = parameters.Get<int>("@TotalRecord");
                Object data = new
                {
                    TotalPage,
                    TotalRecord,
                    Data
                };
                return data;
            }
        }
    }

}
