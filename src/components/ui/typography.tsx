

export const Heading = ({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
    return (
        <h1
            className={`text-3xl font-bold tracking-tight ${className}`}
            {...props}
        >
            {children}
        </h1>
    );
}

export const Paragraph = ({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
    return (
        <p
            className={`text-base leading-7 text-muted-foreground ${className}`}
            {...props}
        >
            {children}
        </p>
    );
}

export const Text = ({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
    return (
        <span
            className={`text-sm leading-6 text-muted-foreground ${className}`}
            {...props}
        >
            {children}
        </span>
    );
}