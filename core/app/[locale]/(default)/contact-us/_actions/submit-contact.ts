'use server';

import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { z } from 'zod';

const ContactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
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

// Get the contact page entity ID from BigCommerce
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

export type ContactFormState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    // Validate form data
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string || '',
      message: formData.get('message') as string,
    };

    const validation = ContactFormSchema.safeParse(data);

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

    if (!contactPages || contactPages.length === 0 || !contactPages[0]?.node) {
      console.error('No contact page found in BigCommerce');
      return {
        status: 'error',
        message: 'Contact form is not configured. Please email us directly at sales@caledoniasigns.co.uk',
      };
    }

    const pageEntityId = contactPages[0].node.entityId;
    console.log('Using contact page ID:', pageEntityId);

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
            comments: data.message,
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
      message: 'Thank you! Your message has been sent. We\'ll get back to you within 1 working day.',
    };
  } catch (error) {
    console.error('Contact form error:', error);
    return {
      status: 'error',
      message: 'Something went wrong. Please try again or email us directly at sales@caledoniasigns.co.uk',
    };
  }
}
