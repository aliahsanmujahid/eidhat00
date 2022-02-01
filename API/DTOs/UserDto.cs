namespace API.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string DisplayName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public string Image { get; set; }
        public string PhoneNumber { get; set; }
    }
}