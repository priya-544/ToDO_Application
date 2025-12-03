namespace ToDo_Application.Models.Entities
{
    public class ToDo
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Priority { get; set; }
        public string? Category { get; set; }

        public string? Status { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime? DueDate { get; set; }

    }
}

