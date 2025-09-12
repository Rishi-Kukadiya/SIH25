import * as React from "react";
import { cva } from "class-variance-authority";
import { X, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const popupVariants = cva(
  "fixed z-50 w-80 max-w-[calc(100vw-2rem)] rounded-lg shadow-card border backdrop-blur-sm transition-all duration-300 ease-out transform",
  {
    variants: {
      type: {
        success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200",
        error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200",
      },
      position: {
        desktop: "bottom-4 right-4",
        mobile: "top-4 left-1/2 -translate-x-1/2",
      },
      visible: {
        true: "opacity-100 scale-100 translate-y-0",
        false: "opacity-0 scale-95 translate-y-2",
      },
    },
    defaultVariants: {
      type: "success",
      position: "desktop",
      visible: true,
    },
  }
);

const Popup = React.forwardRef(({ 
  className, 
  type = "success", 
  message, 
  onClose, 
  visible = true,
  autoClose = true,
  duration = 5000,
  image,
  ...props 
}, ref) => {
  const [isVisible, setIsVisible] = React.useState(visible);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  React.useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  React.useEffect(() => {
    if (autoClose && isVisible && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  const getIcon = () => {
    if (image) {
      return <img src={image} alt={type} className="w-6 h-6 flex-shrink-0" />;
    }
    
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 flex-shrink-0 text-green-600 dark:text-green-400" />;
      case 'error':
        return <XCircle className="w-6 h-6 flex-shrink-0 text-red-600 dark:text-red-400" />;
      default:
        return null;
    }
  };

  if (!visible && !isVisible) return null;

  return (
    <div
      ref={ref}
      className={cn(
        popupVariants({ 
          type, 
          position: isMobile ? 'mobile' : 'desktop',
          visible: isVisible 
        }),
        className
      )}
      style={{
        backgroundColor: props.backgroundColor || undefined,
      }}
      {...props}
    >
      <div className="flex items-start gap-3 p-4">
        {getIcon()}
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-relaxed break-words">
            {message}
          </p>
        </div>

        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2 focus:ring-offset-transparent"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
});

Popup.displayName = "Popup";

export { Popup };