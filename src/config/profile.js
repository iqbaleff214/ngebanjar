const profileKey = 'ngebanjar-bareng-iqbaleff214';

export let profile = {
    "name": null,
    "score": 0,
    "words": [],
    "reports": {},
    "lastUpdatedAt": null,
};

export const getProfile = () => {
    try {
        const existing = localStorage.getItem(profileKey);
        if (existing) {
            return JSON.parse(existing);
        }
    } catch (e) {
        console.log('error loading data:', e);
    }

    profile.reports[(new Date()).toDateString()] = {
        "words": [],
        "score": 0,
    };

    return profile;
}

export const saveProfile = (p) => {
    try {
        localStorage.setItem(profileKey, JSON.stringify(p))
    } catch (e) {
        console.log('error saving data:', e);
        return false;
    }
}
