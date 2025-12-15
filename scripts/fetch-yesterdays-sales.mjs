import 'dotenv/config';
import fs from 'fs';
import path from 'path';

// Load .env.local from current dir or core/
const envPaths = ['.env.local', 'core/.env.local'];
let loaded = false;

for (const envPath of envPaths) {
    try {
        const fullPath = path.resolve(process.cwd(), envPath);
        if (fs.existsSync(fullPath)) {
            console.log(`Loading env from ${envPath}`);
            const envConfig = fs.readFileSync(fullPath);
            const envLines = envConfig.toString().split('\n');
            for (const line of envLines) {
                const match = line.match(/^([^=]+)=(.*)$/);
                if (match) {
                    process.env[match[1]] = match[2].trim();
                }
            }
            loaded = true;
            break; // Stop after loading the first found .env.local
        }
    } catch (e) {
        // Ignore error, continue to next path
    }
}

if (!loaded) {
    console.log('Warning: No .env.local found.');
}

const STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH;
const ACCESS_TOKEN = process.env.BIGCOMMERCE_ACCESS_TOKEN;

if (!STORE_HASH || !ACCESS_TOKEN) {
    console.error('Error: BIGCOMMERCE_STORE_HASH or BIGCOMMERCE_ACCESS_TOKEN is missing in environment variables.');
    process.exit(1);
}

async function fetchYesterdaySales() {
    const now = new Date();

    // Calculate Yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    // Set to start of day (00:00:00)
    const minDate = new Date(yesterday);
    minDate.setHours(0, 0, 0, 0);

    // Set to end of day (23:59:59)
    const maxDate = new Date(yesterday);
    maxDate.setHours(23, 59, 59, 999);

    console.log(`Fetching sales for: ${minDate.toISOString().split('T')[0]}`);
    console.log(`Time Range: ${minDate.toISOString()} to ${maxDate.toISOString()}`);
    console.log(`Store Hash: ${STORE_HASH}`);

    const url = `https://api.bigcommerce.com/stores/${STORE_HASH}/v2/orders?min_date_created=${minDate.toISOString()}&max_date_created=${maxDate.toISOString()}&limit=250`;

    try {
        const response = await fetch(url, {
            headers: {
                'X-Auth-Token': ACCESS_TOKEN,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText} - ${await response.text()}`);
        }

        const orders = await response.json();

        if (!Array.isArray(orders)) {
            console.error('Unexpected response format:', orders);
            return;
        }

        let totalIncTax = 0;
        let totalExTax = 0;
        let orderCount = orders.length;

        // TODO: Handle pagination if orderCount >= 250
        // For now, assuming < 250 orders/day for the sandbox/demo or simple report

        for (const order of orders) {
            // Create a float from string if necessary, API returns strings for decimals often
            const incTax = parseFloat(order.total_inc_tax);
            const exTax = parseFloat(order.total_ex_tax);

            if (!isNaN(incTax)) totalIncTax += incTax;
            if (!isNaN(exTax)) totalExTax += exTax;
        }

        console.log('\n--- Sales Report ---\n');
        console.log(`Number of Orders: ${orderCount}`);
        console.log(`Total Sales (Inc Tax): ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalIncTax)}`); // Assuming USD, check currency later
        console.log(`Total Sales (Ex Tax):  ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalExTax)}`);

        if (orderCount > 0) {
            console.log(`Currency: ${orders[0].currency_code}`);
        }

    } catch (error) {
        console.error('Failed to fetch sales:', error);
    }
}

fetchYesterdaySales();
