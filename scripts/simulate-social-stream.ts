
// import fetch from 'node-fetch'; // Native fetch in Node 18+


const API_URL = 'http://localhost:3001/api/ingest';


const MOCK_DATA = [
    {
        text: 'Huge fire near Connaught Place inner circle! Smoke everywhere. #DelhiFire',
        photoDataUri: 'data:image/jpeg;base66,mock-image-data', // Simulate image for validation
        authorType: 'unverified'
    },
    {
        text: 'Huge fire near Connaught Place inner circle! Smoke everywhere. #DelhiFire',
        photoDataUri: null,
        authorType: 'verified' // Verify aggregation boost
    },
    {
        text: 'Bad accident on Ring Road near South Ex. Traffic jammed completely. Need ambulance.',
        photoDataUri: null,
        authorType: 'unverified'
    },
    {
        text: 'Water logging in Laxmi Nagar due to pipe burst. Road blocked.',
        photoDataUri: null,
        authorType: 'unverified'
    },
    {
        text: 'Crowd gathering at India Gate, looks like a protest starting. #Delhi',
        photoDataUri: null,
        authorType: 'verified'
    },
    {
        text: 'Tree fallen on parked cars in GK-1 M block market. No injuries.',
        photoDataUri: 'data:image/jpeg;base66,mock-image-data',
        authorType: 'unverified'
    }
];

async function simulateStream() {
    console.log('Starting social media stream simulation...');

    let index = 0;

    setInterval(async () => {
        const data = MOCK_DATA[index];
        console.log(`Sending report: "${data.text.substring(0, 30)}..." [${data.authorType}]`);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log('Response:', response.status, result);
        } catch (error) {
            console.error('Error sending report:', error);
        }

        index = (index + 1) % MOCK_DATA.length;
    }, 8000); // Send every 8 seconds
}

simulateStream();
