using Microsoft.EntityFrameworkCore;
using WebApiUsuarios.Entidades;
//using WebApiUsuarios.Entidades;
//using WebApiUsuarios.Entidades.Enums;

namespace WebApiUsuarios.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Usuario> Usuarios { get; set; }
    }
}
