using ExpenseTrackerApi.Config;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;

namespace ExpenseTrackerApi.Services
{
    

    public class EmailService
    {
        private readonly EmailConfig _emailConfig;

        public EmailService(IOptions<EmailConfig> emailConfig)
        {
            _emailConfig = emailConfig.Value;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            var email = new MimeMessage();
            email.From.Add(new MailboxAddress("Expense Tracker", _emailConfig.SenderEmail));
            email.To.Add(new MailboxAddress("", toEmail));
            email.Subject = subject;

            var builder = new BodyBuilder { TextBody = body };
            email.Body = builder.ToMessageBody();

            using var smtp = new SmtpClient();
            await smtp.ConnectAsync(_emailConfig.SmtpServer, _emailConfig.Port, MailKit.Security.SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(_emailConfig.SenderEmail, _emailConfig.SenderPassword);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }
    }

}
