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
    public class TrainerRepository : BaseRepository<Trainer>, ITrainerRepository
    {
        public TrainerRepository(IConfiguration configuration): base(configuration) { }

        

        public IEnumerable<Course> GetPaging(int pageSize, int pageIndex)
        {
            throw new NotImplementedException();
        }

        public int Insert(Trainer trainer)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("NGOCNAM")))
            {
                var sqlComand = "Proc_InsertTrainer";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@TrainerID", trainer.TrainerID);
                parameters.Add("@TrainerName", trainer.TrainerName);
                parameters.Add("@Gender", trainer.Gender);
                parameters.Add("@DateOfBirth", trainer.DateOfBirth);
                parameters.Add("@Address", trainer.Address);
                parameters.Add("@PhoneNumber", trainer.PhoneNumber);
                parameters.Add("@Email", trainer.Email);
                parameters.Add("@Status", trainer.Status);
                parameters.Add("@Tlevel", trainer.TLevel);
                parameters.Add("@Major", trainer.Major);
                parameters.Add("@ExpOfYear", trainer.ExpOfYear);

                var rowEffect = SqlServerConnection.Execute(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return rowEffect;
            }
        }

        public int Update(Trainer trainer)
        {
            using (SqlServerConnection = new SqlConnection(Configuration.GetConnectionString("NGOCNAM")))
            {
                var sqlComand = "Proc_UpdateTrainer";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@TrainerID", trainer.TrainerID);
                parameters.Add("@TrainerName", trainer.TrainerName);
                parameters.Add("@Gender", trainer.Gender);
                parameters.Add("@DateOfBirth", trainer.DateOfBirth);
                parameters.Add("@Address", trainer.Address);
                parameters.Add("@PhoneNumber", trainer.PhoneNumber);
                parameters.Add("@Email", trainer.Email);
                parameters.Add("@Status", trainer.Status);
                parameters.Add("@Tlevel", trainer.TLevel);
                parameters.Add("@Major", trainer.Major);
                parameters.Add("@ExpOfYear", trainer.ExpOfYear);

                var rowEffect = SqlServerConnection.Execute(sqlComand, param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return rowEffect;
            }
        }
    }
}
