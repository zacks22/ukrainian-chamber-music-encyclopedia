// Composer data type
export type Composer = {
    composer: string;
    gender: string;
    birth: string;
    currently: string;
    diaspora: string;
    death: string;
    studied: string;
    taught: string;
    worked: string;
    member_of_NUCU: string;
    sources: string;
    personal_website: string;
    in_contact: string;
};

export type Piece = {
    composer: string;
    composer_cyrillic: string;
    piece_title: string;
    instrumentation: string;
    instrumentation_category: string;
    date_written: string;
    published: string;
    unpublished: string;
    dedicated: string;
    premiere: string;
    recordings: string;
    length: string;
    difficulty_level: string;
    style: string;
    range: string;
    key: string;
    metre: string;
    extended_techniques: string;
    performace_considerations: string;
    description: string;
};


export type InstrumentationCategory = {
    instrumentation_category: string;
}

export type Difficulty = {
    difficulty_level: string;
}

export type PieceLength = {
    length: string;
}

