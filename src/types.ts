// Composer data type
export type Composer = {
    Composer: string;
    Gender: string;
    Birth: string;
    Currently: string;
    Diaspora: string;
    Death: string;
    Studied: string;
    Taught: string;
    Worked: string;
    "Member of NUCU": string;
    Sources: string;
    "Personal Website": string;
    "In contact": string;
};

export type Piece = {
    Composer: string;
    "Piece Title": string;
    Instrumentation: string;
    instrumentation_category: string;
    "Date Written": string;
    Published: string;
    Unpublished: string;
    Dedicated: string;
    Premiere: string;
    Recordings: string;
    Length: string;
    Difficulty: string;
    Style: string;
    Range: string;
    Key: string;
    Metre: string;
    "Extended Tech": string;
    "Perf Consid": string;
    Description: string;
};

export type InstrumentationCategory = {
    instrumentation_category: string;
}

