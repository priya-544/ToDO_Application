namespace ToDo_Application.Models
{
    public class UpdateToDoDto
    {
        public required string Title { get; set; }
        public string? Priority { get; set; }
        public string? Category { get; set; }

        public string? Status { get; set; }

        public DateTime? DueDate { get; set; }
    }
}
