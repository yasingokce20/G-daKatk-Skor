namespace AdditiveIndex.Api.Models.DTOs;

public class DiscussionDto
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}

public class CreateDiscussionDto
{
    public string Username { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}
