export default interface Pokemon {
    abilities: {
        ability: {
            name: string;
        };
    }[];
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
    name: string;
    types: {
        type: {
            name: string;
            url: string;
        };
    }[];
    sprites: {
        front_default: string;
    };
    weight: number;
    height: number;
}
