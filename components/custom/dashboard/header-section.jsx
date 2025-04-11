"use client";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const HeaderSection = ({
  title,
  description,
  actions = null,
  icon: Icon = null,
  iconClassName,
  loading = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between 
        px-6 py-5 mb-4 rounded-xl shadow-sm border bg-background
        transition-all duration-300 hover:shadow-md"
    >
      <div className="flex items-center gap-4 sm:mb-0">
        {Icon && (
          <div
            className={cn(
              "flex aspect-square size-10 items-center justify-center rounded-lg",
              "bg-primary/10 text-primary",
              iconClassName
            )}
          >
            <Icon className="size-5" />
          </div>
        )}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight leading-none">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      {actions && (
        <div className="flex-shrink-0 space-x-2 mt-4 sm:mt-0">
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={action.onClick}
              disabled={loading}
              variant={action.variant || "default"}
              size={action.size || "default"}
              className={cn("shadow-sm", action.className)}
            >
              {action.icon && (
                <action.icon className={cn("size-4", action.iconPosition === "right" ? "ml-2" : "mr-2")} />
              )}
              <span>{loading ? action.loadingText : action.text}</span>
            </Button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default HeaderSection;