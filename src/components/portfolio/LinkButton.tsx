import type { ReactNode } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";

/**
 * A button that links somewhere when `href` is set, and shows a clear,
 * non-broken "coming soon" state when it is empty.
 */
export function LinkButton({
  href,
  children,
  soonLabel = "Coming soon",
  variant = "glass",
  size = "pill",
  download,
  external = true,
  className,
}: {
  href: string;
  children: ReactNode;
  soonLabel?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  download?: boolean;
  external?: boolean;
  className?: string;
}) {
  if (!href) {
    return (
      <Button
        type="button"
        variant="soon"
        size={size}
        aria-disabled="true"
        title={soonLabel}
        className={className}
        onClick={(e) => e.preventDefault()}
      >
        {children}
        <span className="text-xs font-normal opacity-80">· {soonLabel}</span>
      </Button>
    );
  }
  const isExternal = external && /^https?:\/\//.test(href);
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a
        href={href}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: "" } : {})}
      >
        {children}
      </a>
    </Button>
  );
}
