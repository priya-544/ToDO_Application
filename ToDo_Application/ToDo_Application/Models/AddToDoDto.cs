

using Microsoft.EntityFrameworkCore.Migrations;

namespace ToDo_Application.Models
{
    public class AddToDoDto
    {
        public required string Title { get; set; }
        public string? Priority { get; set; }
        public string? Category { get; set; }

        public string? Status { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime? DueDate { get; set; }
    }
}

