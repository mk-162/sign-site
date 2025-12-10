/**
 * Gemini Image Generator for Blog/KB Content
 * UK-Focused Safety Signage Images
 * 
 * Usage: node scripts/generate-images.mjs
 * 
 * Requires GEMINI_API_KEY in .env.local
 */

import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY not found in .env.local');
    process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// UK-SPECIFIC IMAGE PROMPTS
// All prompts reference BS EN ISO 7010 UK standard signage

const blogImages = [
    {
        filename: 'fire-safety-guide.png',
        prompt: `Ultra high quality professional photograph of UK BS EN ISO 7010 compliant fire safety signs in a modern British office building. 
        Green rectangular fire exit signs with running man symbol, red square fire extinguisher location signs, white fire action notice. 
        Clean corporate office environment with grey carpet, glass partitions. 
        Shot on Canon EOS R5, 35mm lens, natural lighting, editorial photography style.
        16:9 landscape format, 4K resolution quality.`
    },
    {
        filename: 'osha-2025-updates.png',
        prompt: `Professional photograph of UK health and safety compliance concept in a British workplace.
        HSE (Health and Safety Executive) documentation, British Standard BS EN ISO 7010 safety sign catalogue, hard hat with UK company logo.
        Modern UK office desk with regulation paperwork, calculator, laptop showing HSE website.
        High-end commercial photography, soft lighting, shallow depth of field.
        16:9 landscape format, premium stock photo quality.`
    },
    {
        filename: 'choosing-sign-materials.png',
        prompt: `Product photography of UK safety sign materials arranged on white background.
        1mm rigid plastic safety sign, 3mm aluminium composite fire exit sign, self-adhesive vinyl warning sticker, photoluminescent glow-in-dark emergency sign.
        All showing BS EN ISO 7010 UK standard symbols.
        Clean studio lighting, material textures visible, professional product photography.
        16:9 landscape format, e-commerce quality image.`
    },
    {
        filename: 'safety-sign-trends-2024.png',
        prompt: `Modern UK warehouse with innovative safety technology.
        Digital LED safety displays, smart connected signs, IoT sensors on safety equipment.
        British warehouse setting with UK-style yellow and black floor markings, forklift truck, racking systems.
        Contemporary industrial photography, dramatic lighting, technology-forward aesthetic.
        16:9 landscape format, editorial quality.`
    },
    {
        filename: 'photoluminescent-signs.png',
        prompt: `Dramatic photograph of UK photoluminescent safety signs glowing in darkness.
        Green glowing fire exit signs illuminating an emergency escape route corridor.
        BS EN ISO 7010 compliant running man exit symbols, directional arrows glowing bright green.
        Low-light photography, long exposure effect, emergency lighting atmosphere.
        16:9 landscape format, cinematic quality.`
    },
    {
        filename: 'covid-workplace-signage.png',
        prompt: `Modern UK office with hygiene and safety signage post-pandemic.
        Hand washing instruction signs, sanitiser station with blue mandatory signs, social distancing floor markers.
        Contemporary British open-plan office, natural daylight from large windows.
        Clean, reassuring professional photography style.
        16:9 landscape format, corporate stock photo quality.`
    },
    {
        filename: 'hidden-costs-non-compliance.png',
        prompt: `Conceptual business photograph showing cost of safety non-compliance.
        HSE improvement notice document, calculator showing large figures, warning signs, invoice paperwork.
        UK business office setting, serious corporate atmosphere.
        Professional editorial photography, selective focus, business magazine style.
        16:9 landscape format, premium quality.`
    },
    {
        filename: 'warehouse-safety-signs.png',
        prompt: `Wide shot of large UK distribution warehouse interior with comprehensive safety signage.
        Yellow triangular warning signs for forklift trucks, blue circular PPE required signs (hard hat, hi-vis, safety boots).
        Red prohibition signs, green fire exit routes marked on floor.
        British industrial setting with UK-style racking, pallet trucks.
        Industrial photography, wide-angle lens, professional lighting.
        16:9 landscape format, high resolution.`
    }
];

const kbImages = [
    {
        filename: 'compliance.png',
        prompt: `UK regulatory compliance concept photograph.
        BS EN ISO 7010:2020 standard documentation, HSE Health and Safety at Work Act poster, compliance certificate.
        British office environment with regulation binders, safety sign samples.
        Professional corporate photography, serious trustworthy aesthetic.
        16:9 landscape format, premium quality.`
    },
    {
        filename: 'installation.png',
        prompt: `Step-by-step safety sign installation in UK workplace.
        Professional installer mounting BS EN ISO 7010 fire exit sign on wall using drill.
        Spirit level, wall plugs, screws visible. British tradesperson in work clothes.
        How-to instructional photography style, clear and educational.
        16:9 landscape format, tutorial quality.`
    },
    {
        filename: 'materials.png',
        prompt: `Close-up product photography of UK safety sign material samples.
        Cross-section showing 1mm rigid plastic, aluminium composite panel, vinyl layers, photoluminescent coating.
        Material textures and thicknesses clearly visible.
        Clean white background, macro photography style, material comparison shot.
        16:9 landscape format, e-commerce product quality.`
    },
    {
        filename: 'getting-started.png',
        prompt: `Welcoming UK workplace safety orientation scene.
        New employee receiving safety induction, pointing at BS EN ISO 7010 safety signs on wall.
        British office setting, diverse professionals, friendly educational atmosphere.
        Warm corporate photography, approachable and informative.
        16:9 landscape format, stock photo quality.`
    },
    {
        filename: 'sign-types.png',
        prompt: `Educational display of all UK BS EN ISO 7010 safety sign categories.
        Red circular prohibition signs, yellow triangular warning signs, blue circular mandatory signs, green rectangular safe condition signs.
        Professionally arranged on neutral background, clearly labeled categories.
        Educational infographic photography style.
        16:9 landscape format, reference quality.`
    },
    {
        filename: 'industry-guides.png',
        prompt: `Split collage of UK industry workplaces with appropriate BS EN ISO 7010 safety signage.
        Construction site with hard hat signs, warehouse with forklift warnings, office with fire exits, factory with machine hazard warnings.
        Four distinct British workplace settings, each with industry-specific signage.
        Editorial photography quality, professional lighting in each scene.
        16:9 landscape format, magazine quality.`
    }
];

async function generateImage(prompt, outputPath) {
    try {
        console.log(`🎨 Generating: ${path.basename(outputPath)}`);

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: prompt,
        });

        // Check for images in the response
        for (const part of response.candidates[0].content.parts) {
            if (part.text) {
                console.log(`   Text: ${part.text.substring(0, 50)}...`);
            } else if (part.inlineData) {
                const imageData = part.inlineData.data;
                const buffer = Buffer.from(imageData, 'base64');
                fs.writeFileSync(outputPath, buffer);
                console.log(`✅ Saved: ${outputPath}`);
                return true;
            }
        }

        console.log(`⚠️ No image generated for: ${path.basename(outputPath)}`);
        return false;
    } catch (error) {
        console.error(`❌ Error generating ${path.basename(outputPath)}:`, error.message);
        return false;
    }
}

async function main() {
    console.log('🚀 Gemini Image Generator for SafetySignHub');
    console.log('🇬🇧 UK-Focused BS EN ISO 7010 Compliant Imagery');
    console.log('📷 Using model: gemini-2.5-flash-image\n');

    const blogDir = path.join(__dirname, '..', 'content', 'public', 'images', 'blog');
    const kbDir = path.join(__dirname, '..', 'content', 'public', 'images', 'kb');

    // Ensure directories exist
    fs.mkdirSync(blogDir, { recursive: true });
    fs.mkdirSync(kbDir, { recursive: true });

    console.log('📝 Generating Blog Images (8 images)...\n');
    for (const img of blogImages) {
        const outputPath = path.join(blogDir, img.filename);
        await generateImage(img.prompt, outputPath);
        // Rate limiting - wait between requests
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    console.log('\n📚 Generating KB Images (6 images)...\n');
    for (const img of kbImages) {
        const outputPath = path.join(kbDir, img.filename);
        await generateImage(img.prompt, outputPath);
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    console.log('\n✨ Image generation complete!');
    console.log(`📁 Blog images: ${blogDir}`);
    console.log(`📁 KB images: ${kbDir}`);
}

main().catch(console.error);
