declare module "svelte-tags-input" {
    import type { Component } from "svelte";

    export interface TagsProps {
        tags?: string[];
        addKeys?: number[];
        maxTags?: number | boolean;
        onlyUnique?: boolean;
        removeKeys?: number[];
        placeholder?: string;
        allowPaste?: boolean;
        allowDrop?: boolean;
        splitWith?: string;
        autoComplete?: any[] | ((value: string) => any) | ((value: string) => Promise<any>) | boolean;
        autoCompleteFilter?: boolean;
        autoCompleteKey?: string | boolean;
        autoCompleteMarkupKey?: string | boolean;
        autoCompleteStartFocused?: boolean;
        name?: string;
        id?: string;
        allowBlur?: boolean;
        disable?: boolean;
        minChars?: number;
        onlyAutocomplete?: boolean;
        labelText?: string;
        labelShow?: boolean;
        readonly?: boolean;
        onTagClick?: (tag: string | object) => void;
        autoCompleteShowKey?: string;
        onTagAdded?: (tag: string | object, tags: any[]) => void;
        onTagRemoved?: (tag: string | object, tags: any[]) => void;
        cleanOnBlur?: boolean;
        customValidation?: ((tag: string) => boolean) | false;
        [key: string]: any;
    }

    const Tags: Component<TagsProps>;
    export default Tags;
}
