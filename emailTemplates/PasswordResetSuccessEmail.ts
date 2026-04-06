export default (name: string) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Password Reset Successful</title>
</head>

<body style="margin:0; padding:0; background-color:#eef2f7; font-family:Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef2f7; padding:30px 0;">
<tr>
<td align="center">

<!-- Container -->
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:14px; overflow:hidden;">

  <!-- Header -->
  <tr>
    <td style="background:linear-gradient(135deg,#16a34a,#15803d); padding:28px; text-align:center;">
      <h1 style="color:#ffffff; margin:0; font-size:24px;">Linkdock</h1>
      <p style="color:#dcfce7; margin-top:6px; font-size:13px;">
        Your account is secure
      </p>
    </td>
  </tr>

  <!-- Content -->
  <tr>
    <td style="padding:35px 30px;">

      <h2 style="margin:0; color:#111827; font-size:20px;">
        Password updated successfully ✅
      </h2>

      <p style="margin-top:15px; font-size:14px; color:#374151; line-height:1.6;">
        Hi <strong>${name}</strong>,
      </p>

      <p style="font-size:14px; color:#374151; line-height:1.6;">
        Your password has been successfully reset. You can now log in to your Linkdock account using your new credentials.
      </p>

      <!-- Info Box -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
        <tr>
          <td style="background:#ecfdf5; padding:12px; border-radius:8px; font-size:13px; color:#065f46;">
            🔒 If you made this change, no further action is required.
          </td>
        </tr>
      </table>

      <!-- Warning -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:15px;">
        <tr>
          <td style="background:#fef2f2; padding:12px; border-radius:8px; font-size:13px; color:#991b1b;">
            ⚠️ If you did NOT reset your password, please secure your account immediately.
          </td>
        </tr>
      </table>

      <!-- CTA -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin:25px 0;">
        <tr>
          <td align="center">
            <a href="https://yourdomain.com/login"
               style="background:#16a34a; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:8px; font-size:14px; font-weight:bold; display:inline-block;">
              Login to your account
            </a>
          </td>
        </tr>
      </table>

      <p style="font-size:13px; color:#6b7280;">
        For security reasons, we recommend keeping your password confidential and using a strong, unique password.
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