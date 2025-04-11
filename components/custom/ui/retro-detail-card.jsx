// components/custom/ui/retro-detail-card.jsx
"use client";

import { Card, CardContent } from "@/components/ui/card";

export function RetroDetailCard({ 
  title, 
  children, 
  variant = "primary", 
  className = "", 
  headerAction = null,
  contentClassName = "",
  withoutPadding = false,
}) {
  const variantMap = {
    primary: "retro-card-primary",
    secondary: "retro-card-secondary",
    accent: "retro-card-accent",
    tertiary: "retro-card-tertiary",
    plain: "retro-card-plain"
  };

  return (
    <Card className={`retro-card ${variantMap[variant]} overflow-hidden ${className}`}>
      {title && (
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-mono font-medium text-lg">{title}</h3>
          {headerAction}
        </div>
      )}
      <CardContent className={`${withoutPadding ? 'p-0' : 'p-4'} ${contentClassName}`}>
        {children}
      </CardContent>
    </Card>
  );
}

export function DetailRow({ label, value, valueClassName = "", spacing = "normal", icon }) {
  const spacingClasses = {
    normal: "mb-3",
    compact: "mb-2",
    loose: "mb-4"
  };
  
  const IconComponent = icon;

  return (
    <div className={`${spacingClasses[spacing]} last:mb-0`}>
      <p className="text-sm text-muted-foreground font-mono flex items-center gap-1">
        {IconComponent && <IconComponent className="h-3 w-3" />}
        {label}
      </p>
      <p className={`font-medium font-mono ${valueClassName}`}>{value}</p>
    </div>
  );
}

export function StatusBadge({ status, variant = "primary", className = "" }) {
  return (
    <span className={`retro-badge retro-badge-${variant} px-3 py-1 capitalize ${className}`}>
      {status}
    </span>
  );
}

export function TimelineEvent({ icon, title, timestamp, description, variant = "primary" }) {
  const variantColors = {
    primary: "text-retro-primary",
    secondary: "text-retro-secondary",
    accent: "text-retro-accent",
    tertiary: "text-retro-tertiary",
    muted: "text-muted-foreground"
  };
  
  const IconComponent = icon;
  
  return (
    <div className="flex gap-3 py-2">
      <div className="mt-1">
        <IconComponent className={`h-5 w-5 ${variantColors[variant]}`} />
      </div>
      <div className="flex-1">
        <p className="font-mono font-medium capitalize">{title}</p>
        <p className="text-sm text-muted-foreground font-mono">{timestamp}</p>
        {description && <p className="text-sm mt-1 font-mono">{description}</p>}
      </div>
    </div>
  );
}