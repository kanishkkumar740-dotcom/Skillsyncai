export function QuestionMarkLogo() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Gradient Definition */}
      <defs>
        <linearGradient id="questionMarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#8b5cf6" }} />
          <stop offset="100%" style={{ stopColor: "#6366f1" }} />
        </linearGradient>
      </defs>
      
      {/* Outer Circle with gradient */}
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="url(#questionMarkGrad)"
        opacity="0.2"
      />
      
      {/* Inner Circle */}
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="url(#questionMarkGrad)"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Question Mark */}
      <path
        d="M12 17.5V17.5C12 17.2239 12.2239 17 12.5 17H12.5C12.7761 17 13 17.2239 13 17.5V17.5C13 17.7761 12.7761 18 12.5 18H12.5C12.2239 18 12 17.7761 12 17.5Z"
        fill="url(#questionMarkGrad)"
      />
      <path
        d="M10.5 9C10.5 7.61929 11.6193 6.5 13 6.5C14.3807 6.5 15.5 7.61929 15.5 9C15.5 9.88252 15.0627 10.6574 14.3985 11.1301C13.9884 11.4252 13.5 11.6791 13.5 12.5V14"
        stroke="url(#questionMarkGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 14V14.5"
        stroke="url(#questionMarkGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}