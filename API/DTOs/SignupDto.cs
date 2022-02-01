using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class SignupDto
    {
        public string username { get; set; }
        [Required]
        public string phonenumber { get; set; }
        public string password { get; set; }
        public string image { get; set; }
    }
}
