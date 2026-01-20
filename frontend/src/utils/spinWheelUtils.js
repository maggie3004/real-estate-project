// Utility functions for Spin Wheel feature

export const prizes = [
    {
        id: 1,
        name: 'Refrigerator',
        emoji: '❄️',
        color: '#991b1b', // Deep Red
        angle: 0
    },
    {
        id: 2,
        name: '42" Smart LED TV',
        emoji: '📺',
        color: '#dc2626', // Red-600
        angle: 72
    },
    {
        id: 3,
        name: 'Washing Machine',
        emoji: '🧺',
        color: '#ef4444', // Red-500
        angle: 144
    },
    {
        id: 4,
        name: 'Android Smartphone',
        emoji: '📱',
        color: '#b91c1c', // Red-700
        angle: 216
    },
    {
        id: 5,
        name: 'Kitchen Appliances',
        emoji: '🛒',
        color: '#7f1d1d', // Red-900
        angle: 288
    }
];

export const generateClaimCode = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9).toUpperCase();
    return `WIN-${timestamp}-${random}`;
};

export const getPrizeFromAngle = (finalAngle) => {
    // Normalize angle to 0-360
    const normalizedAngle = (360 - (finalAngle % 360)) % 360;

    // Each segment is 72 degrees (360/5)
    const segmentSize = 72;
    const prizeIndex = Math.floor(normalizedAngle / segmentSize);

    return prizes[prizeIndex];
};

export const hasUserSpun = () => {
    return localStorage.getItem('hasSpunWheel') === 'true';
};

export const markUserAsSpun = () => {
    localStorage.setItem('hasSpunWheel', 'true');
};

export const saveWinningData = (prize, claimCode) => {
    localStorage.setItem('prizeName', prize.name);
    localStorage.setItem('claimCode', claimCode);
    localStorage.setItem('prizeEmoji', prize.emoji);
};

export const getWinningData = () => {
    return {
        prizeName: localStorage.getItem('prizeName'),
        claimCode: localStorage.getItem('claimCode'),
        prizeEmoji: localStorage.getItem('prizeEmoji')
    };
};

export const isCampaignActive = () => {
    const now = new Date();
    // Campagin shows Jan 23-26 but active from Jan 18 for testing/engagement
    const startDate = new Date('2026-01-18T00:00:00');
    const endDate = new Date('2026-01-26T23:59:59');

    return now >= startDate && now <= endDate;
};
