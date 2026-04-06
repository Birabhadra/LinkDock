export default (name: string, url: string) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reset Your Password</title>
</head>

<body style="margin:0; padding:0; background-color:#eef2f7; font-family:Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef2f7; padding:30px 0;">
<tr>
<td align="center">

<!-- Container -->
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:14px; overflow:hidden;">

  <!-- Header -->
  <tr>
    <td style="background:linear-gradient(135deg,#2563eb,#1e40af); padding:28px; text-align:center;">
      <h1 style="color:#ffffff; margin:0; font-size:24px;">Linkdock</h1>
      <p style="color:#dbeafe; margin-top:6px; font-size:13px;">
        Secure account recovery
      </p>
    </td>
  </tr>

  <!-- Content -->
  <tr>
    <td style="padding:35px 30px;">

      <h2 style="margin:0; color:#111827; font-size:20px;">
        Reset your password 🔐
      </h2>

      <p style="margin-top:15px; font-size:14px; color:#374151; line-height:1.6;">
        Hi <strong>${name}</strong>,
      </p>

      <p style="font-size:14px; color:#374151; line-height:1.6;">
        We received a request to reset your password for your Linkdock account.
        Click the button below to set a new password.
      </p>

      <!-- CTA -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin:25px 0;">
        <tr>
          <td align="center">
            <a href="${url}"
               style="background:#2563eb; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:8px; font-size:14px; font-weight:bold; display:inline-block;">
              Reset Password
            </a>
          </td>
        </tr>
      </table>

      <!-- Backup Link -->
      <p style="font-size:13px; color:#6b7280; word-break:break-all;">
        If the button doesn’t work, copy and paste this link into your browser:<br>
        <a href="${url}" style="color:#2563eb;">${url}</a>
      </p>

      <!-- Warning -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
        <tr>
          <td style="background:#fef3c7; padding:12px; border-radius:8px; font-size:13px; color:#92400e;">
            ⚠️ This link will expire in 10 minutes for security reasons.
          </td>
        </tr>
      </table>

      <p style="margin-top:20px; font-size:13px; color:#6b7280;">
        If you didn’t request this, you can safely ignore this email.
      </p>

      <p style="margin-top:20px; font-size:14px; color:#111827;">
        — Team Linkdock
      </p>

    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="background:#f9fafb; padding:18px; text-align:center; font-size:12px; color:#9ca3af;">
      © 2026 Linkdock. All rights reserved.
    </td>
  </tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;