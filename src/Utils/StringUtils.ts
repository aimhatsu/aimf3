export abstract class StringUtils{
    
    static capitalized(value: string): string{

        return value[0].toUpperCase() + value.substr(1);

    }
}