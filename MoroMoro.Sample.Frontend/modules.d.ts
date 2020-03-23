declare module "*.styl" {
    const classNames: {
        [className: string]: string
    };
    export = classNames;
}

declare module "*" {
    const value: any;
    export default value;
}
