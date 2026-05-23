'use client';

interface CodeBlockProps {
  node: any;
  inline: boolean;
  className: string;
  children: any;
}

export function CodeBlock({
  node,
  inline,
  className,
  children,
  ...props
}: CodeBlockProps) {
  if (!inline) {
    return (
      <div className="not-prose flex flex-col max-w-full min-w-0 overflow-hidden">
        <pre
          {...props}
          className={`text-sm w-full max-w-full overflow-x-auto bg-app-hover p-3 sm:p-4 border border-app-border rounded-xl text-text-main`}
        >
          <code className="whitespace-pre-wrap break-words text-xs sm:text-sm">{children}</code>
        </pre>
      </div>
    );
  } else {
    return (
      <code
        className={`${className} text-xs sm:text-sm bg-app-hover py-0.5 px-1 rounded-md break-words`}
        {...props}
      >
        {children}
      </code>
    );
  }
}
