// components/auth/register-form.jsx
import { Eye, EyeOff, Lock, Mail, User, Phone } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

export function RegisterForm({ defaultEmail = "" }) {
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(null);
    const [password, setPassword] = useState("");

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className="flex flex-col space-y-4">
            {/* Full Name Field */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <div className={cn(
                        "p-1.5 rounded-full transition-colors duration-200",
                        focused === "name" ? "bg-primary/15 text-primary" : "text-muted-foreground"
                    )}>
                        <User className="w-4 h-4" />
                    </div>
                    <Label 
                        htmlFor="name" 
                        className={cn(
                            "font-medium text-sm transition-colors duration-200",
                            focused === "name" ? "text-primary" : "text-muted-foreground"
                        )}
                    >
                        Full Name
                    </Label>
                </div>
                <Input
                    id="name"
                    name="name"
                    className="bg-background/50 border-input focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                    type="text"
                    placeholder="John Doe"
                    autoComplete="name"
                    required
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <div className={cn(
                        "p-1.5 rounded-full transition-colors duration-200",
                        focused === "email" ? "bg-primary/15 text-primary" : "text-muted-foreground"
                    )}>
                        <Mail className="w-4 h-4" />
                    </div>
                    <Label 
                        htmlFor="email" 
                        className={cn(
                            "font-medium text-sm transition-colors duration-200",
                            focused === "email" ? "text-primary" : "text-muted-foreground"
                        )}
                    >
                        Email Address
                    </Label>
                </div>
                <Input
                    id="email"
                    name="email"
                    className="bg-background/50 border-input focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                    type="email"
                    placeholder="user@mail.com"
                    autoComplete="email"
                    required
                    defaultValue={defaultEmail}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                />
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <div className={cn(
                        "p-1.5 rounded-full transition-colors duration-200",
                        focused === "phone" ? "bg-primary/15 text-primary" : "text-muted-foreground"
                    )}>
                        <Phone className="w-4 h-4" />
                    </div>
                    <Label 
                        htmlFor="phone" 
                        className={cn(
                            "font-medium text-sm transition-colors duration-200",
                            focused === "phone" ? "text-primary" : "text-muted-foreground"
                        )}
                    >
                        Phone Number
                    </Label>
                </div>
                <Input
                    id="phone"
                    name="phone"
                    className="bg-background/50 border-input focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    autoComplete="tel"
                    required
                    onFocus={() => setFocused("phone")}
                    onBlur={() => setFocused(null)}
                />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <div className={cn(
                        "p-1.5 rounded-full transition-colors duration-200",
                        focused === "password" ? "bg-primary/15 text-primary" : "text-muted-foreground"
                    )}>
                        <Lock className="w-4 h-4" />
                    </div>
                    <Label 
                        htmlFor="password" 
                        className={cn(
                            "font-medium text-sm transition-colors duration-200",
                            focused === "password" ? "text-primary" : "text-muted-foreground"
                        )}
                    >
                        Password
                    </Label>
                </div>
                <div className="relative">
                    <Input
                        id="password"
                        name="password"
                        className="bg-background/50 border-input focus:border-primary/50 focus:ring-primary/20 pr-10 transition-all duration-200"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                        onFocus={() => setFocused("password")}
                        onBlur={() => setFocused(null)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={cn(
                            "absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200",
                            focused === "password" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                        )}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                    </button>
                </div>
                
                {/* Password Requirements Hint */}
                <div className={cn(
                    "text-xs flex items-center gap-1.5 transition-colors duration-200",
                    password.length >= 6 ? "text-green-500" : "text-muted-foreground"
                )}>
                    <div className={cn(
                        "w-1.5 h-1.5 rounded-full transition-colors duration-200",
                        password.length >= 6 ? "bg-green-500" : "bg-muted-foreground"
                    )} />
                    Password must be at least 6 characters long
                </div>
            </div>
        </div>
    );
}