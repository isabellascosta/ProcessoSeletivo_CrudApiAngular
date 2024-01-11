using System.ComponentModel.DataAnnotations;
using WebApiUsuarios.Entidades.Enums;

namespace WebApiUsuarios.Entidades
{
    public class Usuario
    {
        //Criando propriedades 
        public int Id { get; set; }
        [StringLength(20)]
        public string Nome { get; set; } = string.Empty;
        [StringLength(20)]
        public string Sobrenome { get; set; } = string.Empty;
        [StringLength(70)]
        public string Email { get; set; } = string.Empty;
        [DataType(DataType.Date)]
        public DateTime? DataNascimento { get; set; }
        [EnumDataType(typeof(TipoEscolaridade))]
        public TipoEscolaridade? Escolaridade { get; set; }

    }
}


