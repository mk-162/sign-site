
export type Industry = 'Construction' | 'Warehousing' | 'Office' | 'Hospitality' | 'Healthcare' | 'Education' | 'Retail' | 'Transport';
export type Urgency = 'Critical' | 'Mandatory' | 'Upcoming' | 'Advisory';

export interface ComplianceUpdate {
    id: string;
    title: string;
    summary: string;
    industries: Industry[];
    urgency: Urgency;
    date: string;
    deadline?: string;
    actionItems: string[];
    relatedProducts: {
        name: string;
        image: string;
        price: string;
        link: string;
    }[];
    relatedGuide?: {
        title: string;
        link: string;
    };
}

export const complianceUpdates: ComplianceUpdate[] = [
    {
        id: '1',
        title: 'New Fire Exit Signage Requirements for Low-Light Areas',
        summary: 'Effective April 1st, 2025. All workplaces must replace non-photoluminescent signs in areas with low natural light to ensure visibility during power failures.',
        industries: ['Construction', 'Warehousing', 'Office', 'Hospitality', 'Healthcare', 'Education', 'Retail', 'Transport'],
        urgency: 'Critical',
        date: 'Jan 15, 2025',
        deadline: 'April 1, 2025',
        actionItems: [
            'Audit all fire exit routes for low-light conditions.',
            'Replace standard vinyl signs with photoluminescent (glow-in-the-dark) equivalents.',
            'Update fire safety logbook with new signage details.'
        ],
        relatedProducts: [
            { name: 'Photoluminescent Fire Exit (Right)', image: '/stock_images/imgi_56_evacuation.jpg', price: '£8.95', link: '#' },
            { name: 'Glow-in-Dark Exit Arrow', image: '/stock_images/imgi_56_evacuation.jpg', price: '£4.50', link: '#' },
        ],
        relatedGuide: { title: 'Guide to Photoluminescent Signage', link: '#' }
    },
    {
        id: '2',
        title: 'Updated Hard Hat Colour Codes (Build UK Standard)',
        summary: 'Sites adopting the Build UK standard must enforce the new colour coding system: Black for Supervisors, Orange for Slinger/Signaller, White for Site Manager/Competent Operative.',
        industries: ['Construction'],
        urgency: 'Mandatory',
        date: 'Jan 10, 2025',
        actionItems: [
            'Brief all site staff on the new colour code.',
            'Replace non-compliant helmets immediately.',
            'Update site induction materials.'
        ],
        relatedProducts: [
            { name: 'JSP Evo Hard Hat (White)', image: '/stock_images/imgi_9_safer_maintenance.webp', price: '£12.50', link: '#' },
            { name: 'JSP Evo Hard Hat (Black)', image: '/stock_images/imgi_9_safer_maintenance.webp', price: '£12.50', link: '#' },
        ]
    },
    {
        id: '3',
        title: 'Warehouse Racking Inspection Frequency Update',
        summary: 'HSE guidance now recommends increasing "expert" racking inspections to every 6 months for high-throughput distribution centres.',
        industries: ['Warehousing', 'Retail', 'Transport'],
        urgency: 'Advisory',
        date: 'Jan 05, 2025',
        actionItems: [
            'Review current inspection schedule.',
            'Book an SEMA approved rack inspector if due.',
            'Ensure "Load Notice" signs are visible on all bays.'
        ],
        relatedProducts: [
            { name: 'Safe Working Load Sign', image: '/stock_images/imgi_54_danger.jpg', price: '£5.95', link: '#' },
            { name: 'Racking Inspection Checklist', image: '/stock_images/imgi_46_Signs-Materials-Finishes-Guide.jpg', price: '£15.00', link: '#' },
        ]
    },
    {
        id: '4',
        title: 'Display Screen Equipment (DSE) Assessment Changes',
        summary: 'New guidance for hybrid workers. Employers must provide DSE assessments for home workstations if employees work from home regularly.',
        industries: ['Office', 'Education', 'Healthcare', 'Retail'],
        urgency: 'Mandatory',
        date: 'Dec 20, 2024',
        actionItems: [
            'Send DSE self-assessment forms to all hybrid staff.',
            'Provide laptop stands and separate keyboards where necessary.',
            'Update "Working from Home" policy.'
        ],
        relatedProducts: [
            { name: 'Adjustable Laptop Stand', image: '/stock_images/imgi_14_traffic_management.webp', price: '£25.00', link: '#' },
            { name: 'Ergonomic Footrest', image: '/stock_images/imgi_14_traffic_management.webp', price: '£18.50', link: '#' },
        ]
    },
    {
        id: '5',
        title: 'Food Allergen Labelling (Natasha\'s Law) Enforcement',
        summary: 'Stricter enforcement penalties introduced for pre-packed for direct sale (PPDS) foods. Ensure all labels list full ingredients with allergens emphasized.',
        industries: ['Hospitality', 'Education', 'Retail'],
        urgency: 'Critical',
        date: 'Jan 02, 2025',
        actionItems: [
            'Review all PPDS food labels.',
            'Ensure allergen matrix is up to date.',
            'Display "Ask Before You Eat" signs at till points.'
        ],
        relatedProducts: [
            { name: 'Food Allergen Notice Sign', image: '/stock_images/imgi_52_Prohibition.jpg', price: '£3.95', link: '#' },
            { name: 'Allergen Stickers (Roll)', image: '/stock_images/imgi_52_Prohibition.jpg', price: '£8.95', link: '#' },
        ]
    },
    {
        id: '6',
        title: 'EV Charging Point Signage Standards',
        summary: 'New ISO standards for marking electric vehicle charging bays to prevent misuse and ensure accessibility.',
        industries: ['Office', 'Retail', 'Hospitality', 'Transport'],
        urgency: 'Upcoming',
        date: 'Feb 01, 2025',
        actionItems: [
            'Mark EV bays with green background paint.',
            'Install "Electric Vehicle Charging Only" vertical signs.',
            'Ensure cables do not present a trip hazard.'
        ],
        relatedProducts: [
            { name: 'EV Charging Point Sign', image: '/stock_images/imgi_14_traffic_management.webp', price: '£14.95', link: '#' },
            { name: 'Trip Hazard Cable Cover', image: '/stock_images/imgi_54_danger.jpg', price: '£22.00', link: '#' },
        ]
    },
    {
        id: '7',
        title: 'Clinical Waste Bin Colour Coding',
        summary: 'Reminder: Ensure all clinical waste bins follow HTM 07-01 colour coding. Orange for treatment, Yellow for incineration.',
        industries: ['Healthcare'],
        urgency: 'Mandatory',
        date: 'Jan 12, 2025',
        actionItems: [
            'Audit waste bin colours in all wards.',
            'Replace non-compliant bin lids.',
            'Display waste segregation posters.'
        ],
        relatedProducts: [
            { name: 'Clinical Waste Sign (Yellow)', image: '/stock_images/imgi_54_danger.jpg', price: '£4.95', link: '#' },
            { name: 'Clinical Waste Sign (Orange)', image: '/stock_images/imgi_54_danger.jpg', price: '£4.95', link: '#' },
        ],
    },
    {
        id: '8',
        title: 'New ISO 7010 Symbol for "Evacuation Chair"',
        summary: 'A new standard symbol has been introduced for evacuation chairs. Buildings with these devices should update signage to ensure quick identification during emergencies.',
        industries: ['Healthcare', 'Office', 'Education', 'Hospitality'],
        urgency: 'Advisory',
        date: 'Jan 20, 2025',
        actionItems: [
            'Check location of evacuation chairs.',
            'Install new ISO 7010 sign above each chair.',
            'Include in PEEP (Personal Emergency Evacuation Plan) training.'
        ],
        relatedProducts: [
            { name: 'Evacuation Chair Sign', image: '/stock_images/imgi_56_evacuation.jpg', price: '£6.95', link: '#' },
            { name: 'Evacuation Chair', image: '/stock_images/imgi_57_first-aid.jpg', price: '£850.00', link: '#' },
        ]
    }
];

export const upcomingDeadlines = [
    { title: 'Fire Safety Act 2021 (Full Enforcement)', date: 'April 1, 2025' },
    { title: 'Plastic Packaging Tax Increase', date: 'April 1, 2025' },
    { title: 'Martyn\'s Law (Protect Duty)', date: 'TBC 2025' },
];

export const topProducts = [
    { name: 'Fire Exit Running Man', price: '£4.95', image: '/stock_images/imgi_56_evacuation.jpg' },
    { name: 'No Smoking Sign', price: '£2.99', image: '/stock_images/imgi_52_Prohibition.jpg' },
    { name: 'First Aid Kit', price: '£24.99', image: '/stock_images/imgi_57_first-aid.jpg' },
];
