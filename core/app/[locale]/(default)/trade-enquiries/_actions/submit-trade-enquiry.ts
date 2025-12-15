'use server';

import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { z } from 'zod';

const TradeEnquirySchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  companyName: z.string().min(1, 'Company name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  monthlySpend: z.string().optional(),
  message: z.string().optional(),
});

const SubmitContactUsMutation = graphql(`
  mutation SubmitContactUs($input: SubmitContactUsInput!) {
    submitContactUs(input: $input) {
      __typename
      errors {
        __typename
        ... on Error {
          message
        }
      }
    }
  }
`);

const GetContactPageQuery = graphql(`
  query GetContactPage {
    site {
      content {
        pages(filters: { pageType: CONTACT }) {
          edges {
            node {
              entityId
              name
            }
          }
        }
      }
    }
  }
`);

export type TradeEnquiryState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitTradeEnquiry(
  prevState: TradeEnquiryState,
  formData: FormData
): Promise<TradeEnquiryState> {
  try {
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      companyName: formData.get('companyName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string || '',
      monthlySpend: formData.get('monthlySpend') as string || '',
      message: formData.get('message') as string || '',
    };

    const validation = TradeEnquirySchema.safeParse(data);

    if (!validation.success) {
      const errors: Record<string, string[]> = {};
      validation.error.errors.forEach(err => {
        const field = err.path[0] as string;
        if (!errors[field]) errors[field] = [];
        errors[field].push(err.message);
      });
      return {
        status: 'error',
        message: 'Please correct the errors below',
        errors,
      };
    }

    // Get the contact page entity ID
    const pagesResponse = await client.fetch({
      document: GetContactPageQuery,
      fetchOptions: { cache: 'no-store' },
    });

    const contactPages = pagesResponse.data.site.content.pages.edges;

    if (!contactPages || contactPages.length === 0) {
      console.error('No contact page found in BigCommerce');
      return {
        status: 'error',
        message: 'Contact form is not configured. Please email us directly at sales@safetysignhub.co.uk',
      };
    }

    const pageEntityId = contactPages[0].node.entityId;

    // Build the message with trade enquiry details
    const fullMessage = `
TRADE ACCOUNT APPLICATION

Company: ${data.companyName}
Estimated Monthly Spend: ${data.monthlySpend || 'Not specified'}

Additional Details:
${data.message || 'None provided'}
    `.trim();

    // Submit to BigCommerce
    const response = await client.fetch({
      document: SubmitContactUsMutation,
      variables: {
        input: {
          pageEntityId,
          data: {
            fullName: `${data.firstName} ${data.lastName}`,
            email: data.email,
            phoneNumber: data.phone || undefined,
            comments: fullMessage,
          },
        },
      },
      fetchOptions: { cache: 'no-store' },
    });

    const result = response.data.submitContactUs;

    if (result.errors && result.errors.length > 0) {
      console.error('BigCommerce errors:', result.errors);
      return {
        status: 'error',
        message: result.errors.map((e: any) => e.message).join(', '),
      };
    }

    return {
      status: 'success',
      message: 'Thank you! Your trade application has been submitted. Our team will contact you within 1 working day.',
    };
  } catch (error) {
    console.error('Trade enquiry form error:', error);
    return {
      status: 'error',
      message: 'Something went wrong. Please try again or email us directly at sales@safetysignhub.co.uk',
    };
  }
}
