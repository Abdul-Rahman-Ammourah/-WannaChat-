using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class UpdateData
    {
        public string? OldEmail { get; set; }
        public string? NewEmail { get; set; }
        public string? Username { get; set; }
        public int ProfilePic  { get; set; }
    }
}