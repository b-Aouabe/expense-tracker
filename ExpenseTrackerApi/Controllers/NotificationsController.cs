using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTrackerApi.Controllers
{
    using ExpenseTrackerApi.Services;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("api/notifications")]
    public class NotificationsController : ControllerBase
    {
        private readonly EmailService _emailService;

        public NotificationsController(EmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendNotification([FromBody] NotificationRequest request)
        {
            string subject = "Budget Alert: You’ve Exhausted Your Budget";
            string body = $"Hello,\n\nYou have reached your budget limit.\n\nBest regards,\nExpense Tracker Team";

            await _emailService.SendEmailAsync(request.email, subject, body);
            return Ok(new { message = "Notification sent successfully." });
        }
    }

    public class NotificationRequest
    {
        public string email { get; set; }
    }

}
