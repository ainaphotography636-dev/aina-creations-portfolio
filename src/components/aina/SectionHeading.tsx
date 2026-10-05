type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  body?: string;
  large?: boolean;
};

export function SectionHeading({ eyebrow, title, body, large }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p
        className={`font-medium tracking-[0.16em] text-amber-300 uppercase ${
          large ? "text-xs" : "text-[11px]"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-1 font-semibold tracking-tight text-white ${
          large ? "text-4xl sm:text-5xl" : "text-xl sm:text-2xl"
        }`}
      >
        {title}
      </h2>
      {body ? (
        <p
          className={`mt-1.5 leading-snug text-slate-400 ${
            large ? "text-base" : "text-sm"
          }`}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}
