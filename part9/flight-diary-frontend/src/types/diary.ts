export type Diary = {
    id: string;
    date: string;
    weather: 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';
    visibility: 'great' | 'good' | 'ok' | 'poor';
    comment: string;
};

export type NewDiary = Omit<Diary, 'id'>;