export function createWelcomeEmailTemplate(name, clientURL) {
  const steps = [
    {
      icon: "🖼️",
      title: "Set up your profile picture",
      desc: "Add a photo so people know it's you.",
    },
    {
      icon: "👥",
      title: "Find and add your contacts",
      desc: "Search for people you know and connect.",
    },
    {
      icon: "💬",
      title: "Start a conversation",
      desc: "Say hello — send your very first message.",
    },
    {
      icon: "📸",
      title: "Share photos, videos & more",
      desc: "Share moments and express yourself freely.",
    },
  ];

  const stepRows = steps
    .map(
      (s, i) => `
        <tr>
          <td style="padding: 0 0 10px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="background-color:#1e1c2e; border-radius:12px; padding:16px 18px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="26" valign="middle" style="padding-right:12px; font-size:18px; line-height:1;">${s.icon}</td>
                      <td valign="middle">
                        <p style="margin:0 0 3px 0; font-family:Arial,sans-serif; font-size:14px; font-weight:700; color:#ffffff; line-height:1.3;">${s.title}</p>
                        <p style="margin:0; font-family:Arial,sans-serif; font-size:12px; color:#7b7899; line-height:1.55;">${s.desc}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Chatify</title>
</head>
<body style="margin:0; padding:0; background-color:#0d0d12;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background-color:#0d0d12;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Card -->
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0"
          style="max-width:560px; background-color:#13121a; border-radius:20px; border:1px solid #2a2740;">

          <!-- HEADER -->
          <tr>
            <td style="
              background:linear-gradient(135deg,#1a1830 0%,#0f0e1a 100%);
              padding:44px 40px 36px 40px;
              text-align:center;
              border-radius:20px 20px 0 0;
              border-bottom:1px solid #1e1c2d;
            ">
              <!-- Logo -->
              <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0"
                style="margin:0 auto 28px auto;">
                <tr>
                  <td style="
                    width:38px; height:38px;
                    background:linear-gradient(135deg,#6c5ce7,#00d2be);
                    border-radius:10px;
                    text-align:center;
                    vertical-align:middle;
                    font-size:20px;
                    line-height:38px;
                  ">💬</td>
                  <td style="
                    padding-left:10px;
                    font-family:Arial,sans-serif;
                    font-size:22px;
                    font-weight:800;
                    color:#ffffff;
                    vertical-align:middle;
                    letter-spacing:-0.5px;
                  ">Chatify</td>
                </tr>
              </table>

              <h1 style="
                margin:0 0 10px 0;
                font-family:Arial,sans-serif;
                font-size:34px;
                font-weight:800;
                color:#ffffff;
                line-height:1.15;
                letter-spacing:-1px;
              ">You're in.<br/>Let's talk.</h1>

              <p style="
                margin:0;
                font-family:Arial,sans-serif;
                font-size:14px;
                color:#7c78a0;
              ">Your account is ready and waiting.</p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:36px 40px 0 40px;">

              <p style="
                margin:0 0 10px 0;
                font-family:Arial,sans-serif;
                font-size:18px;
                font-weight:700;
                color:#ffffff;
              ">Hey ${name} 👋</p>

              <p style="
                margin:0 0 32px 0;
                font-family:Arial,sans-serif;
                font-size:14px;
                color:#9d99bb;
                line-height:1.75;
              ">Welcome aboard — we're excited to have you here. Chatify connects you with others
              in one calm place to chat, share, and stay close. Everything is set up and ready to go.</p>

              <!-- Steps heading -->
              <p style="
                margin:0 0 14px 0;
                font-family:Arial,sans-serif;
                font-size:11px;
                font-weight:700;
                color:#4a4760;
                text-transform:uppercase;
                letter-spacing:2px;
              ">Get started in a few steps</p>

              <!-- Steps table -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${stepRows}
              </table>

            </td>
          </tr>

          <!-- DIVIDER -->
          <tr>
            <td style="padding:32px 40px 0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="height:1px; background-color:#1e1c2d; font-size:0; line-height:0;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:32px 40px 40px 40px; text-align:center;">

              <p style="
                margin:0 0 18px 0;
                font-family:Arial,sans-serif;
                font-size:11px;
                font-weight:600;
                color:#4a4760;
                text-transform:uppercase;
                letter-spacing:2px;
              ">&#9679;&nbsp; Your account is live</p>

              <a href="${clientURL}" style="
                display:inline-block;
                padding:15px 46px;
                background:linear-gradient(135deg,#6c5ce7,#4834d4);
                color:#ffffff;
                text-decoration:none;
                font-family:Arial,sans-serif;
                font-size:15px;
                font-weight:700;
                border-radius:50px;
                letter-spacing:0.3px;
              ">Open Chatify &rarr;</a>

              <p style="
                margin:16px 0 0 0;
                font-family:Arial,sans-serif;
                font-size:11px;
                color:#3d3b58;
                line-height:1.6;
              ">
                Button not working? Copy this link:<br/>
                <a href="${clientURL}" style="color:#5a5580; text-decoration:none;">${clientURL}</a>
              </p>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="
              padding:22px 40px;
              background-color:#0f0e18;
              border-top:1px solid #1e1c2d;
              border-radius:0 0 20px 20px;
              text-align:center;
            ">
              <p style="margin:0 0 6px 0; font-family:Arial,sans-serif; font-size:11px; color:#3d3b58; line-height:1.8;">
                You received this because you signed up for Chatify.
              </p>
              <p style="margin:0 0 6px 0; font-family:Arial,sans-serif; font-size:11px; color:#3d3b58;">
                <a href="${clientURL}/unsubscribe" style="color:#5a5580; text-decoration:none;">Unsubscribe</a>
                &nbsp;&middot;&nbsp;
                <a href="${clientURL}/privacy" style="color:#5a5580; text-decoration:none;">Privacy Policy</a>
                &nbsp;&middot;&nbsp;
                <a href="${clientURL}/help" style="color:#5a5580; text-decoration:none;">Help Centre</a>
              </p>
              <p style="margin:0; font-family:Arial,sans-serif; font-size:11px; color:#2e2c44;">
                &copy; ${new Date().getFullYear()} Chatify, Inc. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

</body>
</html>`;
}
