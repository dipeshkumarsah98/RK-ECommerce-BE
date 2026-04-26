import {
  createEmailTemplate,
  createInfoBox,
  createButton,
} from "../base-template.js";
import { BRAND_COLORS, BRAND_INFO } from "../constants.js";

/**
 * Withdrawal Requested Email Template (for Admin)
 */
export function createWithdrawalRequestedEmail(data: {
  vendorName: string;
  vendorEmail: string;
  amount: number;
  withdrawalId: string;
}): { subject: string; html: string } {
  const content = `
    <div style="background-color: ${BRAND_COLORS.ACCENT}; color: ${BRAND_COLORS.WHITE}; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
      <h1 style="margin: 0; font-size: 24px; font-weight: 600;">
        💰 New Withdrawal Request
      </h1>
    </div>
    
    <p style="margin: 0 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.TEXT_SECONDARY};">
      A vendor has submitted a withdrawal request that requires your review.
    </p>
    
    ${createInfoBox([
      { label: "Vendor", value: data.vendorName },
      { label: "Email", value: data.vendorEmail },
      { label: "Amount", value: `NPR ${data.amount.toLocaleString()}` },
      {
        label: "Withdrawal ID",
        value: `#${data.withdrawalId.slice(0, 8).toUpperCase()}`,
      },
    ])}
    
    ${createButton("Review Request", `${BRAND_INFO.WEBSITE_URL}/admin/withdrawals/${data.withdrawalId}`, true)}
    
    <p style="margin: 30px 0 0 0; font-size: 14px; color: ${BRAND_COLORS.TEXT_SECONDARY}; text-align: center;">
      Please review and process this withdrawal request in the admin panel.
    </p>
  `;

  return {
    subject: `Withdrawal Request — ${data.vendorName}`,
    html: createEmailTemplate(
      content,
      `New withdrawal request from ${data.vendorName} for NPR ${data.amount.toLocaleString()}`,
    ),
  };
}

/**
 * Withdrawal Processed Email Template (Approved)
 */
export function createWithdrawalApprovedEmail(data: {
  vendorName: string;
  amount: number;
  transactionProof?: string;
  remarks?: string;
}): { subject: string; html: string } {
  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; background-color: ${BRAND_COLORS.SUCCESS}; color: ${BRAND_COLORS.WHITE}; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; margin-bottom: 20px;">
        ✓ Approved
      </div>
      <h1 style="margin: 0 0 10px 0; font-size: 32px; font-weight: 700; color: ${BRAND_COLORS.TEXT_PRIMARY};">
        Withdrawal Approved!
      </h1>
      <p style="margin: 0; font-size: 16px; color: ${BRAND_COLORS.TEXT_SECONDARY};">
        Your withdrawal request has been processed.
      </p>
    </div>
    
    <p style="margin: 0 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.TEXT_SECONDARY}; line-height: 1.6;">
      Hi <strong>${data.vendorName}</strong>,
    </p>
    
    <p style="margin: 0 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.TEXT_SECONDARY}; line-height: 1.6;">
      Great news! Your withdrawal request for <strong style="color: ${BRAND_COLORS.PRIMARY};">NPR ${data.amount.toLocaleString()}</strong> has been approved and processed.
    </p>
    
    ${
      data.transactionProof
        ? `
    ${createInfoBox([
      { label: "Transaction Proof", value: data.transactionProof },
    ])}
    `
        : ""
    }
    
    ${
      data.remarks
        ? `
    <div class="highlight-box" style="background-color: ${BRAND_COLORS.BACKGROUND}; border-left: 4px solid ${BRAND_COLORS.SUCCESS}; padding: 16px 20px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0; font-size: 14px;">
        <strong style="color: ${BRAND_COLORS.TEXT_PRIMARY};">Admin Remarks:</strong><br>
        ${data.remarks}
      </p>
    </div>
    `
        : ""
    }
    
    <p style="margin: 30px 0 0 0; font-size: 14px; color: ${BRAND_COLORS.TEXT_SECONDARY}; text-align: center;">
      The amount should reflect in your account within 1-3 business days.
    </p>
  `;

  return {
    subject: "Withdrawal Request Approved ✓",
    html: createEmailTemplate(
      content,
      `Your withdrawal request for NPR ${data.amount.toLocaleString()} has been approved`,
    ),
  };
}

/**
 * Withdrawal Processed Email Template (Rejected)
 */
export function createWithdrawalRejectedEmail(data: {
  vendorName: string;
  amount: number;
  rejectionReason?: string;
  remarks?: string;
}): { subject: string; html: string } {
  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; background-color: ${BRAND_COLORS.DANGER}; color: ${BRAND_COLORS.WHITE}; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; margin-bottom: 20px;">
        ✕ Rejected
      </div>
      <h1 style="margin: 0 0 10px 0; font-size: 32px; font-weight: 700; color: ${BRAND_COLORS.TEXT_PRIMARY};">
        Withdrawal Request Declined
      </h1>
      <p style="margin: 0; font-size: 16px; color: ${BRAND_COLORS.TEXT_SECONDARY};">
        We couldn't process your withdrawal request.
      </p>
    </div>
    
    <p style="margin: 0 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.TEXT_SECONDARY}; line-height: 1.6;">
      Hi <strong>${data.vendorName}</strong>,
    </p>
    
    <p style="margin: 0 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.TEXT_SECONDARY}; line-height: 1.6;">
      Unfortunately, your withdrawal request for <strong style="color: ${BRAND_COLORS.PRIMARY};">NPR ${data.amount.toLocaleString()}</strong> has been declined.
    </p>
    
    ${
      data.rejectionReason
        ? `
    <div class="highlight-box" style="background-color: ${BRAND_COLORS.BACKGROUND}; border-left: 4px solid ${BRAND_COLORS.DANGER}; padding: 16px 20px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0; font-size: 14px;">
        <strong style="color: ${BRAND_COLORS.TEXT_PRIMARY};">Reason:</strong><br>
        ${data.rejectionReason}
      </p>
    </div>
    `
        : ""
    }
    
    ${
      data.remarks
        ? `
    <div class="highlight-box" style="background-color: ${BRAND_COLORS.BACKGROUND}; border-left: 4px solid ${BRAND_COLORS.PRIMARY}; padding: 16px 20px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0; font-size: 14px;">
        <strong style="color: ${BRAND_COLORS.TEXT_PRIMARY};">Admin Remarks:</strong><br>
        ${data.remarks}
      </p>
    </div>
    `
        : ""
    }
    
    ${createButton("Contact Support", `mailto:${BRAND_INFO.SUPPORT_EMAIL}`)}
    
    <p style="margin: 30px 0 0 0; font-size: 14px; color: ${BRAND_COLORS.TEXT_SECONDARY}; text-align: center;">
      If you have questions, please contact our support team.
    </p>
  `;

  return {
    subject: "Withdrawal Request Rejected",
    html: createEmailTemplate(
      content,
      `Your withdrawal request for NPR ${data.amount.toLocaleString()} was declined`,
    ),
  };
}
