const soundEffects = {
    'clicked': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/click.mp3',
    'clickedUp': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/clickUp.mp3',
    'ack': 'https://www.myinstants.com/media/sounds/ack.mp3',
    'shocked': 'https://www.myinstants.com/media/sounds/shocked-sound-effect.mp3',
    'sepuh': 'https://www.myinstants.com/media/sounds/sepuh.mp3',
    'jarjit': 'https://www.myinstants.com/media/sounds/suara-jarjit.mp3',
    'ashiap': 'https://www.myinstants.com/media/sounds/ashiap.mp3',
};

export const clickedDown = new Audio(soundEffects.clickedUp);

export const clickedUp = new Audio(soundEffects.clicked);