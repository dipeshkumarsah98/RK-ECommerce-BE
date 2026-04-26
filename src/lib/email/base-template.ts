import {
  BRAND_COLORS,
  BRAND_LOGO_URL,
  BRAND_INFO,
  SOCIAL_LINKS,
  FONT_FAMILY,
  EMAIL_SETTINGS,
} from "./constants.js";

/**
 * Base email template wrapper
 * Provides consistent header, footer, and styling for all emails
 */
export function createEmailTemplate(content: string, preheader = ""): string {
  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>${BRAND_INFO.NAME}</title>
  
  <!-- Google Fonts - Poppins -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      padding: 0;
      font-family: ${FONT_FAMILY};
      background-color: ${BRAND_COLORS.BACKGROUND};
      color: ${BRAND_COLORS.TEXT_PRIMARY};
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }
    
    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      max-width: 100%;
    }
    
    .preheader {
      display: none;
      max-height: 0;
      max-width: 0;
      opacity: 0;
      overflow: hidden;
      mso-hide: all;
      font-size: 1px;
      line-height: 1px;
      color: transparent;
    }
    
    .email-container {
      max-width: ${EMAIL_SETTINGS.MAX_WIDTH};
      margin: 0 auto;
    }
    
    .email-header {
      background: linear-gradient(135deg, ${BRAND_COLORS.PRIMARY} 0%, ${BRAND_COLORS.PRIMARY}dd 100%);
      padding: 30px 20px;
      text-align: center;
      border-radius: ${EMAIL_SETTINGS.BORDER_RADIUS} ${EMAIL_SETTINGS.BORDER_RADIUS} 0 0;
    }
    
    .email-body {
      background-color: ${BRAND_COLORS.WHITE};
      padding: ${EMAIL_SETTINGS.PADDING};
    }
    
    .email-footer {
      background-color: ${BRAND_COLORS.TEXT_PRIMARY};
      color: ${BRAND_COLORS.WHITE};
      padding: 30px 20px;
      text-align: center;
      font-size: 13px;
      border-radius: 0 0 ${EMAIL_SETTINGS.BORDER_RADIUS} ${EMAIL_SETTINGS.BORDER_RADIUS};
    }
    
    .button {
      display: inline-block;
      padding: 14px 32px;
      background-color: ${BRAND_COLORS.PRIMARY};
      color: ${BRAND_COLORS.WHITE} !important;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      font-size: 16px;
      transition: background-color 0.3s ease;
    }
    
    .button:hover {
      background-color: ${BRAND_COLORS.PRIMARY}dd;
    }
    
    .button-secondary {
      background-color: ${BRAND_COLORS.ACCENT};
    }
    
    .button-secondary:hover {
      background-color: ${BRAND_COLORS.ACCENT}dd;
    }
    
    .divider {
      height: 1px;
      background-color: ${BRAND_COLORS.BORDER};
      margin: 24px 0;
    }
    
    .social-icons {
      margin: 20px 0;
    }
    
    .social-icons a {
      display: inline-block;
      margin: 0 8px;
      width: 36px;
      height: 36px;
      background-color: ${BRAND_COLORS.PRIMARY};
      border-radius: 50%;
      line-height: 36px;
      text-align: center;
      color: ${BRAND_COLORS.WHITE};
      text-decoration: none;
      font-size: 18px;
    }
    
    .highlight-box {
      background-color: ${BRAND_COLORS.BACKGROUND};
      border-left: 4px solid ${BRAND_COLORS.PRIMARY};
      padding: 16px 20px;
      margin: 20px 0;
      border-radius: 4px;
    }
    
    .info-box {
      background-color: ${BRAND_COLORS.BACKGROUND};
      padding: 20px;
      border-radius: 6px;
      margin: 20px 0;
    }
    
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid ${BRAND_COLORS.BORDER};
    }
    
    .info-row:last-child {
      border-bottom: none;
    }
    
    .text-small {
      font-size: 14px;
      color: ${BRAND_COLORS.TEXT_SECONDARY};
    }
    
    .text-center {
      text-align: center;
    }
    
    .text-bold {
      font-weight: 600;
    }
    
    .mt-20 {
      margin-top: 20px;
    }
    
    .mb-20 {
      margin-bottom: 20px;
    }
    
    @media only screen and (max-width: 600px) {
      .email-container {
        width: 100% !important;
      }
      
      .email-body {
        padding: 20px 16px !important;
      }
      
      .button {
        display: block !important;
        width: 100% !important;
        text-align: center;
      }
    }
  </style>
</head>

<body>
  <!-- Preheader Text -->
  <div class="preheader">
    ${preheader}
  </div>
  
  <!-- Email Container -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: ${BRAND_COLORS.BACKGROUND}; padding: 20px 0;">
    <tr>
      <td align="center">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="email-container" style="max-width: ${EMAIL_SETTINGS.MAX_WIDTH}; width: 100%;">
          
          <!-- Header -->
          <tr>
            <td class="email-header">
              <img src="${BRAND_LOGO_URL}" alt="${BRAND_INFO.NAME}" style="height: 50px; width: auto;">
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td class="email-body">
              ${content}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td class="email-footer">
              <p style="margin: 0 0 10px 0; font-weight: 500;">${BRAND_INFO.NAME}</p>
              <p style="margin: 0 0 20px 0; font-size: 12px; color: #999;">${BRAND_INFO.TAGLINE}</p>
              
              <!-- Social Icons -->
              <div class="social-icons">
                <a href="${SOCIAL_LINKS.FACEBOOK}" style="color: ${BRAND_COLORS.WHITE};">f</a>
                <a href="${SOCIAL_LINKS.INSTAGRAM}" style="color: ${BRAND_COLORS.WHITE};">📷</a>
                <a href="${SOCIAL_LINKS.TWITTER}" style="color: ${BRAND_COLORS.WHITE};">🐦</a>
              </div>
              
              <p style="margin: 20px 0 10px 0; font-size: 12px; color: #999;">
                ${BRAND_INFO.ADDRESS}
              </p>
              <p style="margin: 0; font-size: 12px; color: #999;">
                ${BRAND_INFO.PHONE} | <a href="mailto:${BRAND_INFO.SUPPORT_EMAIL}" style="color: ${BRAND_COLORS.ACCENT};">${BRAND_INFO.SUPPORT_EMAIL}</a>
              </p>
              
              <div class="divider" style="background-color: #444; margin: 20px 40px;"></div>
              
              <p style="margin: 0; font-size: 11px; color: #999;">
                © ${new Date().getFullYear()} ${BRAND_INFO.NAME}. All rights reserved.
              </p>
              <p style="margin: 10px 0 0 0; font-size: 11px; color: #999;">
                You're receiving this email because you have an account with us.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Helper to create OTP code display
 */
export function createOTPDisplay(otp: string): string {
  return `
    <div style="text-align: center; margin: 30px 0;">
      <div style="display: inline-block; background: linear-gradient(135deg, ${BRAND_COLORS.PRIMARY}, ${BRAND_COLORS.PRIMARY}); padding: 20px 40px; border-radius: 12px; box-shadow: 0 4px 12px rgba(214, 11, 71, 0.2);">
        <p style="margin: 0 0 8px 0; font-size: 12px; color: ${BRAND_COLORS.WHITE}; text-transform: uppercase; letter-spacing: 1px; font-weight: 500;">Your OTP Code</p>
        <p style="margin: 0; font-size: 36px; font-weight: 700; color: ${BRAND_COLORS.WHITE}; letter-spacing: 8px; font-family: 'Courier New', monospace;">${otp}</p>
      </div>
      <p style="margin: 16px 0 0 0; font-size: 13px; color: ${BRAND_COLORS.TEXT_SECONDARY};">
        This code expires in 5 minutes
      </p>
    </div>
  `;
}

/**
 * Helper to create order items table
 */
export function createOrderItemsTable(
  items: Array<{ title: string; quantity: number; price: number }>,
): string {
  const itemRows = items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid ${BRAND_COLORS.BORDER};">
        ${item.title}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid ${BRAND_COLORS.BORDER}; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid ${BRAND_COLORS.BORDER}; text-align: right; font-weight: 600;">
        NPR ${item.price.toLocaleString()}
      </td>
    </tr>
  `,
    )
    .join("");

  return `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0; background-color: ${BRAND_COLORS.WHITE}; border: 1px solid ${BRAND_COLORS.BORDER}; border-radius: 6px; overflow: hidden;">
      <thead>
        <tr style="background-color: ${BRAND_COLORS.BACKGROUND};">
          <th style="padding: 12px; text-align: left; font-weight: 600; font-size: 14px;">Item</th>
          <th style="padding: 12px; text-align: center; font-weight: 600; font-size: 14px;">Qty</th>
          <th style="padding: 12px; text-align: right; font-weight: 600; font-size: 14px;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${itemRows}
      </tbody>
    </table>
  `;
}

/**
 * Helper to create info box with key-value pairs
 */
export function createInfoBox(
  data: Array<{ label: string; value: string | number }>,
): string {
  const rows = data
    .map(
      (item) => `
    <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid ${BRAND_COLORS.BORDER};">
      <span style="color: ${BRAND_COLORS.TEXT_SECONDARY}; font-size: 14px; margin-right: 4px;">${item.label}</span>
      <span style="color: ${BRAND_COLORS.TEXT_PRIMARY}; font-weight: 600; font-size: 14px;">${item.value}</span>
    </div>
  `,
    )
    .join("");

  return `
    <div style="background-color: ${BRAND_COLORS.BACKGROUND}; padding: 20px; border-radius: 6px; margin: 20px 0;">
      ${rows}
    </div>
  `;
}

/**
 * Helper to create button
 */
export function createButton(
  text: string,
  url: string,
  secondary = false,
): string {
  const bgColor = secondary ? BRAND_COLORS.ACCENT : BRAND_COLORS.PRIMARY;
  return `
    <div style="text-align: center; margin: 30px 0;">
      <a href="${url}" class="button" style="background-color: ${bgColor}; color: ${BRAND_COLORS.WHITE}; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; display: inline-block;">
        ${text}
      </a>
    </div>
  `;
}
